"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input as AntInput, Radio, Checkbox, Select } from "antd";
import { Button } from "@/components";
import { ConsentModal } from "@/components";
import { ds } from "@/design-system";

type BusinessProfileType = "individual" | "juristic";

interface DBDJuristicPersonData {
  juristicPersonId: string;
  juristicPersonName: string;
  juristicPersonType: string;
  branchName?: string;
  prefix?: string;
  suffix?: string;
}

const businessTypes = [
  { value: "AGENT", label: "ร้านค้าตัวแทนจำหน่าย (AGENT)" },
  { value: "BIGBOX", label: "ร้านค้าตัวแทนขนาดใหญ่ (BIGBOX)" },
  { value: "MDT", label: "ห้าง Modern trade (MDT)" },
  { value: "ONL", label: "ขาย Online (ONL) / SP นักขายอิสระ (SP)" },
  { value: "FAC", label: "โรงงานผู้ผลิต (FAC)" },
];

const juristicPersonTypes = [
  { value: "บริษัทจำกัด", label: "บริษัทจำกัด" },
  { value: "บริษัทมหาชนจำกัด", label: "บริษัทมหาชนจำกัด" },
  { value: "ห้างหุ้นส่วนจำกัด", label: "ห้างหุ้นส่วนจำกัด" },
  { value: "ห้างหุ้นส่วนสามัญ", label: "ห้างหุ้นส่วนสามัญ" },
  { value: "อื่นๆ", label: "อื่นๆ" },
];


function SellerRegisterBusinessProfilePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";
  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const email = searchParams.get("email") || "";

  const [profileType, setProfileType] = useState<BusinessProfileType>("individual");
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>(["AGENT"]);
  
  // Type 1: Individual
  const [commercialRegNumber, setCommercialRegNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isCheckingRegNumber, setIsCheckingRegNumber] = useState(false);
  const [regNumberStatus, setRegNumberStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [regNumberError, setRegNumberError] = useState("");

  // Type 2: Juristic Person
  const [juristicPersonId, setJuristicPersonId] = useState("");
  const [juristicPersonType, setJuristicPersonType] = useState("บริษัทจำกัด");
  const [organizationName, setOrganizationName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [isCheckingJuristicId, setIsCheckingJuristicId] = useState(false);
  const [juristicIdStatus, setJuristicIdStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [juristicIdError, setJuristicIdError] = useState("");
  const [dbdData, setDbdData] = useState<DBDJuristicPersonData | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);

  // Check if commercial registration number already exists (Type 1)
  const checkCommercialRegNumber = async () => {
    if (!commercialRegNumber.trim()) {
      setRegNumberError("กรุณากรอกเลขทะเบียนพาณิชย์");
      return;
    }

    setIsCheckingRegNumber(true);
    setRegNumberStatus("checking");
    setRegNumberError("");

    try {
      const apiResponse = await fetch(
        `/api/commercial-reg/check?number=${encodeURIComponent(commercialRegNumber)}`
      );

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        setRegNumberStatus("error");
        setRegNumberError(errorData.error || "เกิดข้อผิดพลาดในการตรวจสอบ");
        return;
      }

      const apiData = await apiResponse.json();

      if (!apiData.success) {
        setRegNumberStatus("error");
        setRegNumberError(apiData.error || "เกิดข้อผิดพลาดในการตรวจสอบ");
        return;
      }

      // Success - number is available
      setRegNumberStatus("success");
      setRegNumberError("");
    } catch (err: any) {
      setRegNumberStatus("error");
      setRegNumberError(err.message || "เกิดข้อผิดพลาดในการตรวจสอบ");
    } finally {
      setIsCheckingRegNumber(false);
    }
  };

  // Check juristic person ID and fetch from DBD API (Type 2)
  const checkJuristicPersonId = async () => {
    if (!juristicPersonId.trim()) {
      setJuristicIdError("กรุณากรอกเลขประจำตัวนิติบุคคล");
      return;
    }

    setIsCheckingJuristicId(true);
    setJuristicIdStatus("checking");
    setJuristicIdError("");

    try {
      // Step 1: Check if already exists in our system
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockExistingIds = ["0105537012345"];
      if (mockExistingIds.includes(juristicPersonId)) {
        setJuristicIdStatus("error");
        setJuristicIdError("เลขประจำตัวนิติบุคคลนี้เคยลงทะเบียนไปแล้ว");
        return;
      }

      // Step 2: Fetch from DBD API via our API route
      const apiResponse = await fetch(
        `/api/dbd/check-juristic?id=${encodeURIComponent(juristicPersonId)}`
      );

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        setJuristicIdStatus("error");
        setJuristicIdError(errorData.error || "เกิดข้อผิดพลาดในการตรวจสอบ");
        return;
      }

      const apiData = await apiResponse.json();

      if (!apiData.success) {
        setJuristicIdStatus("error");
        setJuristicIdError(apiData.error || "เกิดข้อผิดพลาดในการตรวจสอบ");
        return;
      }

      // Use mapped data from API
      const mappedData = apiData.data;
      setDbdData(mappedData);

      // Prefill form fields
      setOrganizationName(mappedData.juristicPersonName);
      if (mappedData.branchName) {
        setBranchName(mappedData.branchName);
      }
      if (mappedData.juristicPersonType) {
        setJuristicPersonType(mappedData.juristicPersonType);
      }

      setJuristicIdStatus("success");
      setJuristicIdError("");
    } catch (err: any) {
      console.error("Error checking juristic person ID:", err);
      setJuristicIdStatus("error");
      setJuristicIdError(err.message || "เกิดข้อผิดพลาดในการตรวจสอบ");
    } finally {
      setIsCheckingJuristicId(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (selectedBusinessTypes.length === 0) {
      newErrors.businessTypes = "กรุณาเลือกประเภทธุรกิจอย่างน้อย 1 รายการ";
    }

    if (profileType === "individual") {
      if (!commercialRegNumber.trim()) {
        newErrors.commercialRegNumber = "กรุณากรอกเลขทะเบียนพาณิชย์";
      } else if (regNumberStatus !== "success") {
        newErrors.commercialRegNumber = "กรุณาตรวจสอบเลขทะเบียนพาณิชย์";
      }
      if (!businessName.trim()) {
        newErrors.businessName = "กรุณากรอกชื่อที่ใช้ในการประกอบพาณิชยกิจ";
      }
    } else {
      if (!juristicPersonId.trim()) {
        newErrors.juristicPersonId = "กรุณากรอกเลขประจำตัวนิติบุคคล";
      } else if (juristicIdStatus !== "success") {
        newErrors.juristicPersonId = "กรุณาตรวจสอบเลขประจำตัวนิติบุคคล";
      }
      if (!juristicPersonType) {
        newErrors.juristicPersonType = "กรุณาเลือกประเภทนิติบุคคล";
      }
      if (!organizationName.trim()) {
        newErrors.organizationName = "กรุณากรอกชื่อองค์กร";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show consent modal before proceeding
    setShowConsentModal(true);
  };

  const handleConsentAgree = (marketingConsentValue: boolean) => {
    setMarketingConsent(marketingConsentValue);
    setShowConsentModal(false);
    
    // Navigate to create shop page after consent
    const params = new URLSearchParams({
      phone: phoneNumber,
      firstName,
      lastName,
      email,
      profileType,
      businessTypes: selectedBusinessTypes.join(","),
      marketingConsent: marketingConsentValue.toString(),
    });

    if (profileType === "individual") {
      params.append("commercialRegNumber", commercialRegNumber);
      params.append("businessName", businessName);
    } else {
      params.append("juristicPersonId", juristicPersonId);
      params.append("juristicPersonType", juristicPersonType);
      params.append("organizationName", organizationName);
      if (branchName) {
        params.append("branchName", branchName);
      }
    }

    router.push(`/seller/register/create-shop?${params.toString()}`);
  };

  const isFormValid =
    selectedBusinessTypes.length > 0 &&
    ((profileType === "individual" && regNumberStatus === "success" && businessName.trim()) ||
      (profileType === "juristic" &&
        juristicIdStatus === "success" &&
        juristicPersonType &&
        organizationName.trim()));

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ds.color.background("secondary"),
        padding: ds.spacing("4"),
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: ds.color.background("primary"),
          borderRadius: ds.radius("lg"),
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Left Section - Illustration & Branding */}
        <div
          style={{
            width: "40%",
            backgroundColor: "var(--brand-m-primary-light-80)",
            background: `linear-gradient(180deg, var(--brand-m-primary-00) 0%, var(--brand-m-primary-light-80) 100%)`,
            padding: ds.spacing("12"),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Logo */}
          <div
            style={{
              marginBottom: ds.spacing("12"),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ds.spacing("2"),
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ds.spacing("2"),
                marginBottom: ds.spacing("2"),
              }}
            >
              <span
                style={{
                  fontSize: ds.typography.size("3xl"),
                  fontWeight: ds.typography.weight("bold"),
                  color: ds.color.text("white"),
                }}
              >
                ALLKONS
              </span>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: ds.color.system("error"),
                  borderRadius: ds.radius("sm"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: ds.typography.size("lg"),
                    fontWeight: ds.typography.weight("bold"),
                    color: ds.color.text("white"),
                  }}
                >
                  M
                </span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: ds.color.system("error"),
                borderRadius: ds.radius("full"),
                padding: `${ds.spacing("2")} ${ds.spacing("4")}`,
              }}
            >
              <span
                style={{
                  fontSize: ds.typography.size("sm"),
                  fontWeight: ds.typography.weight("semibold"),
                  color: ds.color.text("white"),
                }}
              >
                Seller Center
              </span>
            </div>
          </div>

          {/* Illustration Placeholder */}
          <div
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "300px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: ds.radius("lg"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <i
              className="ri-store-3-line"
              style={{
                fontSize: ds.typography.size("11xl"),
                color: ds.color.text("white"),
                opacity: 0.2,
              }}
            />
          </div>
        </div>

        {/* Right Section - Business Profile Form */}
        <div
          style={{
            width: "60%",
            padding: ds.spacing("12"),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Back Button */}
          <Link
            href={`/seller/register/personal-info?phone=${encodeURIComponent(phoneNumber)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`}
            style={{
              position: "absolute",
              top: ds.spacing("12"),
              left: ds.spacing("12"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              color: ds.color.text("brand-default"),
              textDecoration: "none",
              cursor: ds.common.cursor.pointer,
            }}
          >
            <i className="ri-arrow-left-line" style={{ fontSize: ds.typography.size("xl") }} />
          </Link>

          {/* Header */}
          <div style={{ marginBottom: ds.spacing("8") }}>
            <h1
              style={{
                fontSize: ds.typography.size("4xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("primary"),
                margin: 0,
                marginBottom: ds.spacing("2"),
              }}
            >
              ลงทะเบียน
            </h1>
            <p
              style={{
                fontSize: ds.typography.size("md"),
                color: ds.color.text("secondary"),
                margin: 0,
              }}
            >
              กรอกข้อมูลเบื้องต้นเพื่อเริ่มต้นเปิดร้านของคุณบน ALLKONS
            </p>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div
              style={{
                padding: ds.spacing("3"),
                marginBottom: ds.spacing("4"),
                backgroundColor: "var(--alert-error-bg-compact)",
                border: `1px solid ${ds.color.system("error")}`,
                borderRadius: ds.radius("sm"),
                color: ds.color.system("error"),
                fontSize: ds.typography.size("sm"),
                textAlign: "center",
              }}
            >
              {errors.submit}
            </div>
          )}

          {/* Business Profile Form */}
          <form onSubmit={handleSubmit}>
            {/* Profile Type Selection */}
            <div style={{ marginBottom: ds.spacing("8") }}>
              <p
                style={{
                  fontSize: ds.typography.size("md"),
                  fontWeight: ds.typography.weight("medium"),
                  color: ds.color.text("primary"),
                  marginBottom: ds.spacing("4"),
                }}
              >
                คุณต้องการเปิดร้านบน Allkons ในนาม?
              </p>
              <Radio.Group
                value={profileType}
                onChange={(e) => {
                  setProfileType(e.target.value);
                  setRegNumberStatus("idle");
                  setJuristicIdStatus("idle");
                  setRegNumberError("");
                  setJuristicIdError("");
                }}
                style={{ width: "100%" }}
              >
                <div style={{ display: "flex", gap: ds.spacing("4"), marginBottom: ds.spacing("4") }}>
                  <Radio.Button
                    value="individual"
                    style={{
                      flex: 1,
                      height: "auto",
                      padding: ds.spacing("4"),
                      borderRadius: ds.radius("md"),
                      border:
                        profileType === "individual"
                          ? `2px solid ${ds.color.text("brand-default")}`
                          : `1px solid ${ds.color.border("primary")}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <i
                        className="ri-file-text-line"
                        style={{
                          fontSize: ds.typography.size("2xl"),
                          color:
                            profileType === "individual"
                              ? ds.color.text("brand-default")
                              : ds.color.text("secondary"),
                        }}
                      />
                      <span
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color:
                            profileType === "individual"
                              ? ds.color.text("brand-default")
                              : ds.color.text("secondary"),
                        }}
                      >
                        บุคคลธรรมดาที่จดทะเบียนพาณิชย์
                      </span>
                    </div>
                  </Radio.Button>
                  <Radio.Button
                    value="juristic"
                    style={{
                      flex: 1,
                      height: "auto",
                      padding: ds.spacing("4"),
                      borderRadius: ds.radius("md"),
                      border:
                        profileType === "juristic"
                          ? `2px solid ${ds.color.text("brand-default")}`
                          : `1px solid ${ds.color.border("primary")}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <i
                        className="ri-building-line"
                        style={{
                          fontSize: ds.typography.size("2xl"),
                          color:
                            profileType === "juristic"
                              ? ds.color.text("brand-default")
                              : ds.color.text("secondary"),
                        }}
                      />
                      <span
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color:
                            profileType === "juristic"
                              ? ds.color.text("brand-default")
                              : ds.color.text("secondary"),
                        }}
                      >
                        นิติบุคคล
                      </span>
                    </div>
                  </Radio.Button>
                </div>
              </Radio.Group>
            </div>

            {/* Business Type Selection */}
            <div style={{ marginBottom: ds.spacing("6") }}>
              <label
                style={{
                  display: "block",
                  fontSize: ds.typography.size("md"),
                  fontWeight: ds.typography.weight("medium"),
                  color: ds.color.text("primary"),
                  marginBottom: ds.spacing("2"),
                }}
              >
                ประเภทธุรกิจ <span style={{ color: ds.color.system("error") }}>*</span>
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("2") }}>
                {businessTypes.map((type) => (
                  <Checkbox
                    key={type.value}
                    checked={selectedBusinessTypes.includes(type.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBusinessTypes([...selectedBusinessTypes, type.value]);
                      } else {
                        setSelectedBusinessTypes(
                          selectedBusinessTypes.filter((t) => t !== type.value)
                        );
                      }
                    }}
                    style={{
                      fontSize: ds.typography.size("sm"),
                    }}
                  >
                    {type.label}
                  </Checkbox>
                ))}
              </div>
              {errors.businessTypes && (
                <p
                  style={{
                    fontSize: ds.typography.size("xs"),
                    color: ds.color.system("error"),
                    margin: `${ds.spacing("1")} 0 0 0`,
                  }}
                >
                  {errors.businessTypes}
                </p>
              )}
            </div>

            {/* Type 1: Individual Registered with Commercial Registration */}
            {profileType === "individual" && (
              <>
                {/* Commercial Registration Number */}
                <div style={{ marginBottom: ds.spacing("6") }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("medium"),
                      color: ds.color.text("primary"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    เลขทะเบียนพาณิชย์ <span style={{ color: ds.color.system("error") }}>*</span>
                  </label>
                  <div style={{ display: "flex", gap: ds.spacing("2") }}>
                    <AntInput
                      placeholder="กรอกเลขทะเบียนพาณิชย์"
                      value={commercialRegNumber}
                      onChange={(e) => {
                        setCommercialRegNumber(e.target.value);
                        setRegNumberStatus("idle");
                        setRegNumberError("");
                      }}
                      status={errors.commercialRegNumber || regNumberError ? "error" : regNumberStatus === "success" ? "" : ""}
                      size="large"
                      style={{ flex: 1 }}
                      styles={{
                        input: {
                          fontSize: ds.typography.size("md"),
                          lineHeight: ds.typography.lineHeight("md"),
                          height: ds.common.height.inputMiddle,
                          borderRadius: ds.common.borderRadius.input,
                          borderColor:
                            regNumberStatus === "success"
                              ? ds.color.text("brand-default")
                              : errors.commercialRegNumber || regNumberError
                              ? ds.color.system("error")
                              : ds.color.border("primary"),
                          padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                        },
                      }}
                    />
                    <Button
                      type="button"
                      onClick={checkCommercialRegNumber}
                      loading={isCheckingRegNumber}
                      disabled={!commercialRegNumber.trim() || regNumberStatus === "success"}
                      style={{ minWidth: "120px" }}
                    >
                      {regNumberStatus === "success" ? (
                        <>
                          <i className="ri-check-line" style={{ marginRight: ds.spacing("1") }} />
                          ยืนยันแล้ว
                        </>
                      ) : (
                        "ตรวจสอบ"
                      )}
                    </Button>
                  </div>
                  {regNumberStatus === "success" && (
                    <p
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("brand-default"),
                        margin: `${ds.spacing("1")} 0 0 0`,
                      }}
                    >
                      เลขทะเบียนพาณิชย์สามารถใช้งานได้
                    </p>
                  )}
                  {(errors.commercialRegNumber || regNumberError) && (
                    <p
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.system("error"),
                        margin: `${ds.spacing("1")} 0 0 0`,
                      }}
                    >
                      {errors.commercialRegNumber || regNumberError}
                    </p>
                  )}
                </div>

                {/* Business Name */}
                <div style={{ marginBottom: ds.spacing("8") }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("medium"),
                      color: ds.color.text("primary"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    ชื่อที่ใช้ในการประกอบพาณิชยกิจ{" "}
                    <span style={{ color: ds.color.system("error") }}>*</span>
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                    <span
                      style={{
                        fontSize: ds.typography.size("md"),
                        color: ds.color.text("secondary"),
                        whiteSpace: "nowrap",
                      }}
                    >
                      ร้าน
                    </span>
                    <AntInput
                      placeholder="กรอกชื่อที่ใช้ในการประกอบพาณิชยกิจ"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      status={errors.businessName ? "error" : ""}
                      size="large"
                      style={{ flex: 1 }}
                      styles={{
                        input: {
                          fontSize: ds.typography.size("md"),
                          lineHeight: ds.typography.lineHeight("md"),
                          height: ds.common.height.inputMiddle,
                          borderRadius: ds.common.borderRadius.input,
                          borderColor: errors.businessName
                            ? ds.color.system("error")
                            : ds.color.border("primary"),
                          padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                        },
                      }}
                    />
                  </div>
                  {errors.businessName && (
                    <p
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.system("error"),
                        margin: `${ds.spacing("1")} 0 0 0`,
                      }}
                    >
                      {errors.businessName}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Type 2: Juristic Person */}
            {profileType === "juristic" && (
              <>
                {/* Juristic Person ID */}
                <div style={{ marginBottom: ds.spacing("6") }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("medium"),
                      color: ds.color.text("primary"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    เลขประจำตัวนิติบุคคล <span style={{ color: ds.color.system("error") }}>*</span>
                  </label>
                  <div style={{ display: "flex", gap: ds.spacing("2") }}>
                    <AntInput
                      placeholder="กรอกเลขประจำตัวนิติบุคคล"
                      value={juristicPersonId}
                      onChange={(e) => {
                        setJuristicPersonId(e.target.value);
                        setJuristicIdStatus("idle");
                        setJuristicIdError("");
                        setDbdData(null);
                        setOrganizationName("");
                        setBranchName("");
                      }}
                      status={errors.juristicPersonId || juristicIdError ? "error" : juristicIdStatus === "success" ? "" : ""}
                      size="large"
                      style={{ flex: 1 }}
                      styles={{
                        input: {
                          fontSize: ds.typography.size("md"),
                          lineHeight: ds.typography.lineHeight("md"),
                          height: ds.common.height.inputMiddle,
                          borderRadius: ds.common.borderRadius.input,
                          borderColor:
                            juristicIdStatus === "success"
                              ? ds.color.text("brand-default")
                              : errors.juristicPersonId || juristicIdError
                              ? ds.color.system("error")
                              : ds.color.border("primary"),
                          padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                        },
                      }}
                    />
                    <Button
                      type="button"
                      onClick={checkJuristicPersonId}
                      loading={isCheckingJuristicId}
                      disabled={!juristicPersonId.trim() || juristicIdStatus === "success"}
                      style={{ minWidth: "120px" }}
                    >
                      {juristicIdStatus === "success" ? (
                        <>
                          <i className="ri-check-line" style={{ marginRight: ds.spacing("1") }} />
                          ยืนยันแล้ว
                        </>
                      ) : (
                        "ตรวจสอบ"
                      )}
                    </Button>
                  </div>
                  {juristicIdStatus === "success" && (
                    <p
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("brand-default"),
                        margin: `${ds.spacing("1")} 0 0 0`,
                      }}
                    >
                      เลขประจำตัวนิติบุคคลสามารถใช้งานได้
                    </p>
                  )}
                  {(errors.juristicPersonId || juristicIdError) && (
                    <p
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.system("error"),
                        margin: `${ds.spacing("1")} 0 0 0`,
                      }}
                    >
                      {errors.juristicPersonId || juristicIdError}
                    </p>
                  )}
                </div>

                {/* Juristic Person Type */}
                <div style={{ marginBottom: ds.spacing("6") }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("medium"),
                      color: ds.color.text("primary"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    ประเภทนิติบุคคล <span style={{ color: ds.color.system("error") }}>*</span>
                  </label>
                  <Select
                    value={juristicPersonType}
                    onChange={setJuristicPersonType}
                    size="large"
                    style={{ width: "100%" }}
                    options={juristicPersonTypes}
                    status={errors.juristicPersonType ? "error" : ""}
                  />
                  {errors.juristicPersonType && (
                    <p
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.system("error"),
                        margin: `${ds.spacing("1")} 0 0 0`,
                      }}
                    >
                      {errors.juristicPersonType}
                    </p>
                  )}
                </div>

                {/* Organization Name with Prefix and Suffix */}
                <div style={{ marginBottom: ds.spacing("6") }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("medium"),
                      color: ds.color.text("primary"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    ชื่อองค์กร <span style={{ color: ds.color.system("error") }}>*</span>
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                    <span
                      style={{
                        fontSize: ds.typography.size("md"),
                        color: ds.color.text("secondary"),
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dbdData?.prefix || "บริษัท"}
                    </span>
                    <AntInput
                      placeholder="กรอกองค์กร"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      status={errors.organizationName ? "error" : ""}
                      size="large"
                      style={{ flex: 1 }}
                      styles={{
                        input: {
                          fontSize: ds.typography.size("md"),
                          lineHeight: ds.typography.lineHeight("md"),
                          height: ds.common.height.inputMiddle,
                          borderRadius: ds.common.borderRadius.input,
                          borderColor: errors.organizationName
                            ? ds.color.system("error")
                            : ds.color.border("primary"),
                          padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                        },
                      }}
                    />
                    <span
                      style={{
                        fontSize: ds.typography.size("md"),
                        color: ds.color.text("secondary"),
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dbdData?.suffix || "จำกัด"}
                    </span>
                  </div>
                  {errors.organizationName && (
                    <p
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.system("error"),
                        margin: `${ds.spacing("1")} 0 0 0`,
                      }}
                    >
                      {errors.organizationName}
                    </p>
                  )}
                </div>

                {/* Branch Name */}
                <div style={{ marginBottom: ds.spacing("8") }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("medium"),
                      color: ds.color.text("primary"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    ชื่อสาขา
                  </label>
                  <AntInput
                    placeholder="สำนักงานใหญ่"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    size="large"
                    style={{ width: "100%" }}
                    styles={{
                      input: {
                        fontSize: ds.typography.size("md"),
                        lineHeight: ds.typography.lineHeight("md"),
                        height: ds.common.height.inputMiddle,
                        borderRadius: ds.common.borderRadius.input,
                        borderColor: ds.color.border("primary"),
                        padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                      },
                    }}
                  />
                </div>
              </>
            )}

            {/* Register Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              loading={isLoading}
              style={{
                width: "100%",
              }}
            >
              ลงทะเบียน
            </Button>
          </form>
        </div>
      </div>

      {/* Consent Modal */}
      <ConsentModal
        open={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onAgree={handleConsentAgree}
      />
    </div>
  );
}

export default function SellerRegisterBusinessProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellerRegisterBusinessProfilePageContent />
    </Suspense>
  );
}
