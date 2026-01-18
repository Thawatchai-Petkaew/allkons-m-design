"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input as AntInput } from "antd";
import { Button } from "@/components";
import { ds } from "@/design-system";

const { Password: AntPassword } = AntInput;

interface PasswordRule {
  id: string;
  label: string;
  validator: (password: string, confirmPassword: string) => boolean;
}

const passwordRules: PasswordRule[] = [
  {
    id: "length",
    label: "ต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
    validator: (password) => password.length >= 8,
  },
  {
    id: "alphanumeric",
    label: "ต้องประกอบด้วย ตัวเลขและตัวอักษร (1234567A)",
    validator: (password) => {
      const hasNumber = /\d/.test(password);
      const hasLetter = /[a-zA-Z]/.test(password);
      return hasNumber && hasLetter;
    },
  },
  {
    id: "match",
    label: "ยืนยันรหัสผ่านตรงกัน",
    validator: (password, confirmPassword) => password === confirmPassword && password !== "",
  },
];

function SellerRegisterSetPasswordPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate password strength
  const getPasswordStrength = (pwd: string): { level: number; label: string } => {
    if (pwd.length === 0) return { level: 0, label: "" };
    
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[a-zA-Z]/.test(pwd)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength++;
    if (pwd.length >= 12) strength++;

    if (strength <= 2) return { level: 1, label: "อ่อน" };
    if (strength === 3) return { level: 2, label: "ปานกลาง" };
    if (strength === 4) return { level: 3, label: "แข็งแรง" };
    return { level: 4, label: "สูงมาก" };
  };

  // Check if all rules are met
  const allRulesMet = passwordRules.every((rule) => rule.validator(password, confirmPassword));
  const passwordStrength = getPasswordStrength(password);
  const showStrengthIndicator = allRulesMet && password.length > 0;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allRulesMet) {
      setError("กรุณาตรวจสอบให้แน่ใจว่ารหัสผ่านตรงตามข้อกำหนดทั้งหมด");
      return;
    }

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // In production, save password to backend
      // For now, just navigate to next step
      router.push(`/seller/register/personal-info?phone=${encodeURIComponent(phoneNumber)}`);
    } catch (err: any) {
      console.error("Error setting password:", err);
      setError(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Right Section - Password Form */}
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
            href={`/seller/register/verify-phone?phone=${encodeURIComponent(phoneNumber)}`}
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
              การตั้งค่ารหัสผ่าน
            </p>
          </div>

          {/* Error Message */}
          {error && (
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
              {error}
            </div>
          )}

          {/* Password Form */}
          <form onSubmit={handleSubmit}>
            {/* Password Input */}
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
                รหัสผ่าน <span style={{ color: ds.color.system("error") }}>*</span>
              </label>
              <AntPassword
                placeholder="กรุณากรอกรหัสผ่าน"
                value={password}
                onChange={handlePasswordChange}
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

              {/* Password Strength Indicator */}
              {showStrengthIndicator && (
                <div style={{ marginTop: ds.spacing("2") }}>
                  <div
                    style={{
                      width: "100%",
                      height: "4px",
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("full"),
                      overflow: "hidden",
                      marginBottom: ds.spacing("1"),
                    }}
                  >
                    <div
                      style={{
                        width: `${(passwordStrength.level / 4) * 100}%`,
                        height: "100%",
                        backgroundColor: ds.color.text("brand-default"),
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("brand-default"),
                      margin: 0,
                    }}
                  >
                    ความปลอดภัยรหัสผ่าน : {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
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
                ยืนยันรหัสผ่านอีกครั้ง{" "}
                <span style={{ color: ds.color.system("error") }}>*</span>
              </label>
              <AntPassword
                placeholder="กรุณายืนยันรหัสผ่าน"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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

            {/* Password Rules */}
            <div style={{ marginBottom: ds.spacing("8") }}>
              {passwordRules.map((rule) => {
                const isValid = rule.validator(password, confirmPassword);
                return (
                  <div
                    key={rule.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ds.spacing("2"),
                      marginBottom: ds.spacing("3"),
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: isValid
                          ? ds.color.background("brand-default")
                          : ds.color.background("secondary"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className={isValid ? "ri-check-line" : "ri-close-line"}
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color: isValid
                            ? ds.color.text("white")
                            : ds.color.text("secondary"),
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: isValid
                          ? ds.color.text("brand-default")
                          : ds.color.text("secondary"),
                      }}
                    >
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={!allRulesMet || isLoading}
              loading={isLoading}
              style={{
                width: "100%",
              }}
            >
              ดำเนินการต่อ
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SellerRegisterSetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellerRegisterSetPasswordPageContent />
    </Suspense>
  );
}
