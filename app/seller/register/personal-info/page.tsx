"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input as AntInput, Checkbox } from "antd";
import { Button } from "@/components";
import { ds } from "@/design-system";

function SellerRegisterPersonalInfoPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(true); // Default checked
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Format phone number for display
  const formattedPhone = phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "กรุณากรอกชื่อ";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "กรุณากรอกนามสกุล";
    }

    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "กรุณายอมรับเงื่อนไขการให้บริการและนโยบายความเป็นส่วนตัว";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // In production, save personal info to backend
      // For now, just navigate to next step
      router.push(
        `/seller/register/business-profile?phone=${encodeURIComponent(phoneNumber)}&firstName=${encodeURIComponent(formData.firstName)}&lastName=${encodeURIComponent(formData.lastName)}&email=${encodeURIComponent(formData.email)}`
      );
    } catch (err: any) {
      console.error("Error saving personal info:", err);
      setErrors({ submit: err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    acceptTerms;

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
          boxShadow: ds.component.modal.shadow(), // Use design system shadow
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

        {/* Right Section - Personal Info Form */}
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
            href={`/seller/register/set-password?phone=${encodeURIComponent(phoneNumber)}`}
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
              กรอกข้อมูลส่วนตัวสำหรับสร้างบัญชี
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

          {/* Personal Info Form */}
          <form onSubmit={handleSubmit}>
            {/* First Name */}
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
                ชื่อ <span style={{ color: ds.color.system("error") }}>*</span>
              </label>
              <AntInput
                placeholder="กรุณากรอกชื่อ"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                status={errors.firstName ? "error" : ""}
                size="large"
                style={{
                  width: "100%",
                }}
                styles={{
                  input: {
                    fontSize: ds.typography.size("md"),
                    lineHeight: ds.typography.lineHeight("md"),
                    height: ds.common.height.inputMiddle,
                    borderRadius: ds.common.borderRadius.input,
                    borderColor: errors.firstName
                      ? ds.color.system("error")
                      : ds.color.border("primary"),
                    padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                  },
                }}
              />
              {errors.firstName && (
                <p
                  style={{
                    fontSize: ds.typography.size("xs"),
                    color: ds.color.system("error"),
                    margin: `${ds.spacing("1")} 0 0 0`,
                  }}
                >
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Middle Name */}
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
                ชื่อกลาง
              </label>
              <AntInput
                placeholder="กรุณากรอกชื่อกลาง"
                value={formData.middleName}
                onChange={(e) => handleInputChange("middleName", e.target.value)}
                size="large"
                style={{
                  width: "100%",
                }}
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

            {/* Last Name */}
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
                นามสกุล <span style={{ color: ds.color.system("error") }}>*</span>
              </label>
              <AntInput
                placeholder="กรุณากรอกนามสกุล"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                status={errors.lastName ? "error" : ""}
                size="large"
                style={{
                  width: "100%",
                }}
                styles={{
                  input: {
                    fontSize: ds.typography.size("md"),
                    lineHeight: ds.typography.lineHeight("md"),
                    height: ds.common.height.inputMiddle,
                    borderRadius: ds.common.borderRadius.input,
                    borderColor: errors.lastName
                      ? ds.color.system("error")
                      : ds.color.border("primary"),
                    padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                  },
                }}
              />
              {errors.lastName && (
                <p
                  style={{
                    fontSize: ds.typography.size("xs"),
                    color: ds.color.system("error"),
                    margin: `${ds.spacing("1")} 0 0 0`,
                  }}
                >
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Phone Number (Disabled & Prefilled) */}
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
                หมายเลขโทรศัพท์
              </label>
              <AntInput
                value={formattedPhone}
                disabled
                size="large"
                style={{
                  width: "100%",
                }}
                styles={{
                  input: {
                    fontSize: ds.typography.size("md"),
                    lineHeight: ds.typography.lineHeight("md"),
                    height: ds.common.height.inputMiddle,
                    borderRadius: ds.common.borderRadius.input,
                    backgroundColor: ds.color.background("secondary"),
                    color: ds.color.text("disabled"),
                    padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                  },
                }}
              />
            </div>

            {/* Email */}
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
                อีเมล <span style={{ color: ds.color.system("error") }}>*</span>
              </label>
              <AntInput
                type="email"
                placeholder="กรุณากรอกอีเมล"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                status={errors.email ? "error" : ""}
                size="large"
                style={{
                  width: "100%",
                }}
                styles={{
                  input: {
                    fontSize: ds.typography.size("md"),
                    lineHeight: ds.typography.lineHeight("md"),
                    height: ds.common.height.inputMiddle,
                    borderRadius: ds.common.borderRadius.input,
                    borderColor: errors.email
                      ? ds.color.system("error")
                      : ds.color.border("primary"),
                    padding: `${ds.common.padding.inputVerticalMiddle} ${ds.spacing("4")}`,
                  },
                }}
              />
              {errors.email && (
                <p
                  style={{
                    fontSize: ds.typography.size("xs"),
                    color: ds.color.system("error"),
                    margin: `${ds.spacing("1")} 0 0 0`,
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Checkboxes */}
            <div style={{ marginBottom: ds.spacing("8") }}>
              {/* Terms & Privacy Policy */}
              <div style={{ marginBottom: ds.spacing("4") }}>
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  style={{
                    fontSize: ds.typography.size("sm"),
                    color: acceptTerms
                      ? ds.color.text("brand-default")
                      : ds.color.text("secondary"),
                  }}
                >
                  <span
                    style={{
                      color: ds.color.text("brand-default"),
                      cursor: ds.common.cursor.pointer,
                    }}
                  >
                    ยอมรับ เงื่อนไขการให้บริการ และ นโยบายความเป็นส่วนตัว
                  </span>
                </Checkbox>
                {errors.acceptTerms && (
                  <p
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.system("error"),
                      margin: `${ds.spacing("1")} 0 0 ${ds.spacing("6")}`,
                    }}
                  >
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              {/* Marketing Consent */}
              <div>
                <Checkbox
                  checked={acceptMarketing}
                  onChange={(e) => setAcceptMarketing(e.target.checked)}
                  style={{
                    fontSize: ds.typography.size("sm"),
                    color: acceptMarketing
                      ? ds.color.text("brand-default")
                      : ds.color.text("secondary"),
                  }}
                >
                  <span
                    style={{
                      color: ds.color.text("brand-default"),
                      cursor: ds.common.cursor.pointer,
                    }}
                  >
                    ยอมรับ การนำข้อมูลไปใช้เพื่อการตลาด
                  </span>
                </Checkbox>
              </div>
            </div>

            {/* Next Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              loading={isLoading}
              style={{
                width: "100%",
              }}
            >
              ต่อไป
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SellerRegisterPersonalInfoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellerRegisterPersonalInfoPageContent />
    </Suspense>
  );
}
