"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@/components";
import { ds } from "@/design-system";

export default function SellerRegisterWelcomePage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    setPhoneNumber(value);
    // Validate Thai phone number (10 digits, starting with 0)
    setIsValid(value.length === 10 && value.startsWith("0"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Navigate to next step (OTP verification)
      router.push(`/seller/register/verify-phone?phone=${encodeURIComponent(phoneNumber)}`);
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
            {/* Note: In production, replace with actual illustration component */}
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div
          style={{
            width: "60%",
            padding: ds.spacing("12"),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Welcome Message */}
          <div style={{ marginBottom: ds.spacing("8") }}>
            <p
              style={{
                fontSize: ds.typography.size("sm"),
                color: ds.color.text("secondary"),
                marginBottom: ds.spacing("2"),
              }}
            >
              ยินดีต้อนรับสู่ Allkons Seller Center
            </p>
            <h1
              style={{
                fontSize: ds.typography.size("4xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("primary"),
                lineHeight: ds.typography.lineHeight("4xl"),
                margin: 0,
              }}
            >
              สมัครบัญชีกับเรา
            </h1>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
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
              <Input
                type="tel"
                placeholder="กรอกหมายเลขโทรศัพท์"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
                style={{
                  width: "100%",
                }}
              />
            </div>

            {/* Login Link */}
            <div style={{ marginBottom: ds.spacing("8") }}>
              <p
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("secondary"),
                }}
              >
                หากท่านเคยมีบัญชีอยู่แล้ว{" "}
                <Link
                  href="/login"
                  style={{
                    color: ds.color.text("brand-default"),
                    textDecoration: "underline",
                    cursor: ds.common.cursor.pointer,
                  }}
                >
                  เข้าสู่ระบบที่นี่
                </Link>
              </p>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={!isValid}
              style={{
                width: "100%",
              }}
            >
              สมัครใช้งาน
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
