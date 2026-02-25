"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Select, Checkbox as AntCheckbox } from "antd";
import { Button, ConsentModal } from "@/components";
import { Alert } from "@/components";
import { ds } from "@/design-system";
import {
  mockProvinces,
  getDistrictsByProvince,
  getEligibleShopsByTerritory,
  getShopById,
} from "@/lib/mock/partnerData";
import type { District, EligibleShop } from "@/lib/types/partner";

export default function PartnerRegisterPage() {
  const router = useRouter();

  // Form state
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>([]);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock KYC status (in production, get from session/API)
  const isKycVerified = true;
  const hasExistingApplication = false;

  // Derived data
  const districts = useMemo<District[]>(
    () => (selectedProvinceId ? getDistrictsByProvince(selectedProvinceId) : []),
    [selectedProvinceId]
  );

  const eligibleShops = useMemo<EligibleShop[]>(
    () =>
      selectedProvinceId
        ? getEligibleShopsByTerritory(selectedProvinceId, selectedDistrictId || undefined)
        : [],
    [selectedProvinceId, selectedDistrictId]
  );

  // Handlers
  const handleProvinceChange = (value: string) => {
    setSelectedProvinceId(value);
    setSelectedDistrictId("");
    setSelectedShopIds([]);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.province;
      return next;
    });
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrictId(value);
    setSelectedShopIds([]);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.district;
      return next;
    });
  };

  const handleShopToggle = (shopId: string, checked: boolean) => {
    setSelectedShopIds((prev) =>
      checked ? [...prev, shopId] : prev.filter((id) => id !== shopId)
    );
    setErrors((prev) => {
      const next = { ...prev };
      delete next.shops;
      return next;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!selectedProvinceId) newErrors.province = "กรุณาเลือกจังหวัด";
    if (!selectedDistrictId) newErrors.district = "กรุณาเลือกอำเภอ/เขต";
    if (selectedShopIds.length === 0) newErrors.shops = "กรุณาเลือกร้านค้าอย่างน้อย 1 ร้าน";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConsentModal(true);
  };

  const handleConsentAgree = async (marketingConsent: boolean) => {
    setShowConsentModal(false);
    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const province = mockProvinces.find((p) => p.id === selectedProvinceId);
      const district = districts.find((d) => d.id === selectedDistrictId);

      // Navigate to loading page with params
      const params = new URLSearchParams({
        provinceId: selectedProvinceId,
        provinceName: province?.name || "",
        districtId: selectedDistrictId,
        districtName: district?.name || "",
        shopIds: selectedShopIds.join(","),
        marketingConsent: marketingConsent.toString(),
      });
      router.push(`/seller/partner/register/loading?${params.toString()}`);
    } catch {
      setErrors({ submit: "เกิดข้อผิดพลาดในการส่งใบสมัคร กรุณาลองใหม่อีกครั้ง" });
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    selectedProvinceId && selectedDistrictId && selectedShopIds.length > 0;

  // Shared left panel for grid layout
  const leftPanel = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${ds.spacing("8")} 0`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: ds.radius("xl"),
          overflow: "hidden",
          background: `linear-gradient(to bottom, var(--brand-m-primary-light-80), var(--brand-m-primary-00))`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: ds.spacing("1"),
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: ds.spacing("8"),
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
              Partner Center
            </span>
          </div>
        </div>

        {/* Illustration */}
        <div
          style={{
            width: "100%",
            maxWidth: "280px",
            height: "280px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: ds.radius("lg"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="ri-team-line"
            style={{
              fontSize: ds.typography.size("11xl"),
              color: ds.color.text("white"),
              opacity: 0.2,
            }}
          />
        </div>

        {/* Info text */}
        <div style={{ marginTop: ds.spacing("6"), textAlign: "center" }}>
          <p
            style={{
              fontSize: ds.typography.size("md"),
              color: ds.color.text("white"),
              opacity: 0.9,
              margin: 0,
              marginBottom: ds.spacing("2"),
            }}
          >
            สมัครเป็น Startup Partner
          </p>
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("white"),
              opacity: 0.7,
              margin: 0,
            }}
          >
            เลือกพื้นที่และร้านค้าที่ต้องการเป็นพาร์ทเนอร์
          </p>
        </div>
      </div>
    </div>
  );

  // Guard: KYC not verified
  if (!isKycVerified) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
          backgroundColor: ds.color.background("primary"),
          gap: ds.spacing("8"),
          padding: `0 ${ds.spacing("8")}`,
          overflowX: "hidden",
          maxWidth: "100vw",
          boxSizing: "border-box",
        }}
      >
        {leftPanel}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `${ds.spacing("8")} ${ds.spacing("16")}`,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
            <i
              className="ri-shield-check-line"
              style={{
                fontSize: ds.typography.size("5xl"),
                color: ds.color.system("warning"),
                marginBottom: ds.spacing("4"),
                display: "block",
              }}
            />
            <h2
              style={{
                fontSize: ds.typography.size("2xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("primary"),
                marginBottom: ds.spacing("2"),
              }}
            >
              ต้องยืนยันตัวตน (KYC) ก่อน
            </h2>
            <p
              style={{
                fontSize: ds.typography.size("md"),
                color: ds.color.text("secondary"),
                marginBottom: ds.spacing("6"),
              }}
            >
              กรุณาดำเนินการยืนยันตัวตนให้เรียบร้อยก่อนสมัครเป็นพาร์ทเนอร์
            </p>
            <Button
              onClick={() => router.push("/seller/admin/profile")}
              style={{ width: "100%" }}
            >
              ไปยืนยันตัวตน
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Guard: existing application
  if (hasExistingApplication) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
          backgroundColor: ds.color.background("primary"),
          gap: ds.spacing("8"),
          padding: `0 ${ds.spacing("8")}`,
          overflowX: "hidden",
          maxWidth: "100vw",
          boxSizing: "border-box",
        }}
      >
        {leftPanel}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: `${ds.spacing("8")} ${ds.spacing("16")}`,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
            <i
              className="ri-file-list-3-line"
              style={{
                fontSize: ds.typography.size("5xl"),
                color: ds.color.system("info"),
                marginBottom: ds.spacing("4"),
                display: "block",
              }}
            />
            <h2
              style={{
                fontSize: ds.typography.size("2xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("primary"),
                marginBottom: ds.spacing("2"),
              }}
            >
              คุณมีใบสมัครอยู่แล้ว
            </h2>
            <p
              style={{
                fontSize: ds.typography.size("md"),
                color: ds.color.text("secondary"),
                marginBottom: ds.spacing("6"),
              }}
            >
              ไม่สามารถส่งใบสมัครใหม่ได้ในขณะที่ยังมีใบสมัครที่กำลังดำเนินการ
            </p>
            <Button
              onClick={() => router.push("/seller/partner/register/status")}
              style={{ width: "100%" }}
            >
              ดูสถานะใบสมัคร
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100vh",
        backgroundColor: ds.color.background("primary"),
        gap: ds.spacing("8"),
        padding: `0 ${ds.spacing("8")}`,
        overflowX: "hidden",
        maxWidth: "100vw",
        boxSizing: "border-box",
      }}
    >
      {/* Left Section - Branding */}
      {leftPanel}

      {/* Right Section - Application Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${ds.spacing("8")} ${ds.spacing("16")}`,
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            gap: ds.spacing("6"),
            padding: ds.spacing("6"),
          }}
        >
          {/* Back Button */}
          <div>
            <button
              type="button"
              onClick={() => router.push("/seller/login")}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: ds.radius("sm"),
                border: `1px solid ${ds.color.border("brand-default")}`,
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ds.color.text("brand-default"),
              }}
            >
              <i className="ri-arrow-left-s-line" style={{ fontSize: "24px" }} />
            </button>
          </div>

          {/* Header */}
          <div style={{ paddingBottom: ds.spacing("2") }}>
            <p
              style={{
                fontSize: ds.typography.size("sm"),
                color: ds.color.text("quaternary"),
                margin: 0,
              }}
            >
              ยินดีต้อนรับสู่ Allkons Partner Center
            </p>
            <h1
              style={{
                fontSize: ds.typography.size("3xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("secondary"),
                margin: 0,
              }}
            >
              สมัครพาร์ทเนอร์
            </h1>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <Alert type="error" title={errors.submit} variant="compact" />
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: ds.spacing("6") }}>
            {/* Step 1: Territory Selection */}
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("4") }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ds.spacing("2"),
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: ds.radius("full"),
                    backgroundColor: ds.color.background("brand-default"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("bold"),
                      color: ds.color.text("white"),
                    }}
                  >
                    1
                  </span>
                </div>
                <span
                  style={{
                    fontSize: ds.typography.size("lg"),
                    fontWeight: ds.typography.weight("semibold"),
                    color: ds.color.text("primary"),
                  }}
                >
                  เลือกพื้นที่ (Territory)
                </span>
              </div>

              {/* Province */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: ds.typography.size("md"),
                    fontWeight: ds.typography.weight("medium"),
                    color: ds.color.text("primary"),
                    marginBottom: ds.spacing("2"),
                  }}
                >
                  จังหวัด <span style={{ color: ds.color.system("error") }}>*</span>
                </label>
                <Select
                  placeholder="เลือกจังหวัด"
                  value={selectedProvinceId || undefined}
                  onChange={handleProvinceChange}
                  size="large"
                  style={{ width: "100%" }}
                  status={errors.province ? "error" : undefined}
                  showSearch
                  optionFilterProp="label"
                  options={mockProvinces.map((p) => ({
                    value: p.id,
                    label: p.name,
                  }))}
                />
                {errors.province && (
                  <p
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.system("error"),
                      margin: `${ds.spacing("1")} 0 0 0`,
                    }}
                  >
                    {errors.province}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: ds.typography.size("md"),
                    fontWeight: ds.typography.weight("medium"),
                    color: ds.color.text("primary"),
                    marginBottom: ds.spacing("2"),
                  }}
                >
                  อำเภอ/เขต <span style={{ color: ds.color.system("error") }}>*</span>
                </label>
                <Select
                  placeholder="เลือกอำเภอ/เขต"
                  value={selectedDistrictId || undefined}
                  onChange={handleDistrictChange}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={!selectedProvinceId}
                  status={errors.district ? "error" : undefined}
                  showSearch
                  optionFilterProp="label"
                  options={districts.map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                />
                {errors.district && (
                  <p
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.system("error"),
                      margin: `${ds.spacing("1")} 0 0 0`,
                    }}
                  >
                    {errors.district}
                  </p>
                )}
              </div>
            </div>

            {/* Step 2: Shop Selection */}
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("4") }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ds.spacing("2"),
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: ds.radius("full"),
                    backgroundColor:
                      selectedProvinceId && selectedDistrictId
                        ? ds.color.background("brand-default")
                        : ds.color.background("secondary"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("bold"),
                      color:
                        selectedProvinceId && selectedDistrictId
                          ? ds.color.text("white")
                          : ds.color.text("secondary"),
                    }}
                  >
                    2
                  </span>
                </div>
                <span
                  style={{
                    fontSize: ds.typography.size("lg"),
                    fontWeight: ds.typography.weight("semibold"),
                    color:
                      selectedProvinceId && selectedDistrictId
                        ? ds.color.text("primary")
                        : ds.color.text("disabled"),
                  }}
                >
                  เลือกร้านค้า{" "}
                  {selectedShopIds.length > 0 && (
                    <span
                      style={{
                        fontSize: ds.typography.size("sm"),
                        fontWeight: ds.typography.weight("regular"),
                        color: ds.color.text("brand-default"),
                      }}
                    >
                      ({selectedShopIds.length} ร้านค้า)
                    </span>
                  )}
                </span>
              </div>

              {selectedProvinceId && selectedDistrictId ? (
                eligibleShops.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
                    {eligibleShops.map((shop) => {
                      const isSelected = selectedShopIds.includes(shop.id);
                      return (
                        <div
                          key={shop.id}
                          style={{
                            padding: ds.spacing("4"),
                            border: `${isSelected ? "2px" : "1px"} solid ${
                              isSelected
                                ? ds.color.border("brand-default")
                                : ds.color.border("primary")
                            }`,
                            borderRadius: ds.radius("md"),
                            backgroundColor: isSelected
                              ? "var(--brand-m-primary-light-95)"
                              : ds.color.background("primary"),
                            cursor: ds.common.cursor.pointer,
                            transition: `all ${ds.common.animation.fast} ease`,
                          }}
                          onClick={() => handleShopToggle(shop.id, !isSelected)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: ds.spacing("3"),
                            }}
                          >
                            <AntCheckbox checked={isSelected} />
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: ds.spacing("2"),
                                  marginBottom: ds.spacing("1"),
                                }}
                              >
                                <i
                                  className="ri-store-2-line"
                                  style={{
                                    fontSize: ds.typography.size("lg"),
                                    color: isSelected
                                      ? ds.color.text("brand-default")
                                      : ds.color.text("secondary"),
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: ds.typography.size("md"),
                                    fontWeight: ds.typography.weight("medium"),
                                    color: ds.color.text("primary"),
                                  }}
                                >
                                  {shop.name}
                                </span>
                              </div>
                              <p
                                style={{
                                  fontSize: ds.typography.size("sm"),
                                  color: ds.color.text("secondary"),
                                  margin: 0,
                                  marginBottom: ds.spacing("2"),
                                }}
                              >
                                {shop.address}
                              </p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: ds.spacing("1") }}>
                                {shop.categories.map((cat) => (
                                  <span
                                    key={cat}
                                    style={{
                                      display: "inline-block",
                                      fontSize: ds.typography.size("xs"),
                                      color: ds.color.text("brand-default"),
                                      backgroundColor: "var(--brand-m-primary-light-90)",
                                      padding: `2px ${ds.spacing("2")}`,
                                      borderRadius: ds.radius("full"),
                                    }}
                                  >
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: ds.spacing("8"),
                      textAlign: "center",
                      color: ds.color.text("secondary"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("md"),
                    }}
                  >
                    <i
                      className="ri-store-line"
                      style={{
                        fontSize: ds.typography.size("3xl"),
                        display: "block",
                        marginBottom: ds.spacing("2"),
                      }}
                    />
                    <p style={{ margin: 0, fontSize: ds.typography.size("sm") }}>
                      ไม่พบร้านค้าที่เข้าร่วมโปรแกรมในพื้นที่นี้
                    </p>
                  </div>
                )
              ) : (
                <div
                  style={{
                    padding: ds.spacing("6"),
                    textAlign: "center",
                    color: ds.color.text("disabled"),
                    backgroundColor: ds.color.background("secondary"),
                    borderRadius: ds.radius("md"),
                  }}
                >
                  <p style={{ margin: 0, fontSize: ds.typography.size("sm") }}>
                    กรุณาเลือกจังหวัดและอำเภอ/เขตก่อน
                  </p>
                </div>
              )}

              {errors.shops && (
                <p
                  style={{
                    fontSize: ds.typography.size("xs"),
                    color: ds.color.system("error"),
                    margin: `${ds.spacing("1")} 0 0 0`,
                  }}
                >
                  {errors.shops}
                </p>
              )}
            </div>

            {/* Step 3 hint */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ds.spacing("2"),
                  marginBottom: ds.spacing("2"),
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: ds.radius("full"),
                    backgroundColor: isFormValid
                      ? ds.color.background("brand-default")
                      : ds.color.background("secondary"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("bold"),
                      color: isFormValid
                        ? ds.color.text("white")
                        : ds.color.text("secondary"),
                    }}
                  >
                    3
                  </span>
                </div>
                <span
                  style={{
                    fontSize: ds.typography.size("lg"),
                    fontWeight: ds.typography.weight("semibold"),
                    color: isFormValid
                      ? ds.color.text("primary")
                      : ds.color.text("disabled"),
                  }}
                >
                  ยืนยัน PDPA Consent
                </span>
              </div>
              <p
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("secondary"),
                  margin: 0,
                  paddingLeft: ds.spacing("10"),
                }}
              >
                ระบบจะแสดงข้อกำหนดและเงื่อนไขเมื่อคุณกดส่งใบสมัคร
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              loading={isSubmitting}
              style={{ width: "100%" }}
            >
              ส่งใบสมัครพาร์ทเนอร์
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
