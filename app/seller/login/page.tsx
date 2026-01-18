"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components";
import { ds } from "@/design-system";

type LoginMethod = "phone" | "username";

// Illustration will be added later - using placeholder for now

export default function SellerLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("phone");
  
  // Phone login state
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // Username login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validate form
  const isPhoneValid = phoneNumber.length >= 10;
  const isUsernameValid = username.length >= 3 && password.length >= 6;
  const canSubmit = loginMethod === "phone" ? isPhoneValid : isUsernameValid;

  const handlePhoneLogin = () => {
    if (isPhoneValid) {
      // Navigate to OTP verification
      router.push(`/seller/register/verify-phone?phone=${encodeURIComponent(phoneNumber)}&mode=login`);
    }
  };

  const handleUsernameLogin = () => {
    if (isUsernameValid) {
      // TODO: Implement username/password login
      // Login logic will be implemented here
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === "phone") {
      handlePhoneLogin();
    } else {
      handleUsernameLogin();
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100vh",
        backgroundColor: ds.color.background("primary"),
        gap: ds.spacing("8"),
        padding: `0 ${ds.spacing("8")}`,
      }}
    >
      {/* Left Section - Illustration */}
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
            background: "linear-gradient(to bottom, #e5f7ec, #bdf5d2)",
            borderRadius: ds.radius('xl'),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Illustration placeholder - will be replaced with actual image */}
          <div
            style={{
              width: "80%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ds.color.text("secondary"),
              fontSize: ds.typography.size("lg"),
              opacity: 0.3,
            }}
          >
            Illustration
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${ds.spacing("8")} ${ds.spacing("16")}`,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: ds.spacing("6"),
            padding: ds.spacing("6"),
          }}
        >
          {/* Title */}
          <div
            style={{
              paddingBottom: ds.spacing("6"),
            }}
          >
            <p
              style={{
                fontSize: ds.typography.size("sm"),
                lineHeight: ds.typography.lineHeight("sm"),
                color: ds.color.text("quaternary"),
                margin: 0,
              }}
            >
              ยินดีต้อนรับสู่ Allkons Seller Center
            </p>
            <h1
              style={{
                fontSize: ds.typography.size("3xl"),
                lineHeight: ds.typography.lineHeight("3xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("secondary"),
                margin: 0,
              }}
            >
              เข้าสู่ระบบเพื่อใช้งาน
            </h1>
          </div>

          {/* Tab Switcher */}
          <div
            style={{
              backgroundColor: ds.color.background("secondary"),
              borderRadius: ds.radius('md'),
              padding: ds.spacing("1"),
              display: "flex",
              gap: ds.spacing("2"),
            }}
          >
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              style={{
                flex: 1,
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: ds.radius('sm'),
                border: "none",
                cursor: "pointer",
                fontSize: ds.typography.size("sm"),
                lineHeight: ds.typography.lineHeight("sm"),
                fontFamily: ds.typography.fontFamily.notoSans,
                transition: `all ${ds.common.animation.fast} ease`,
                backgroundColor: loginMethod === "phone" 
                  ? ds.color.background("brand-default")
                  : "transparent",
                color: loginMethod === "phone"
                  ? ds.color.text("white")
                  : ds.color.text("secondary"),
              }}
            >
              หมายเลขโทรศัพท์
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("username")}
              style={{
                flex: 1,
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: ds.radius('sm'),
                border: "none",
                cursor: "pointer",
                fontSize: ds.typography.size("sm"),
                lineHeight: ds.typography.lineHeight("sm"),
                fontFamily: ds.typography.fontFamily.notoSans,
                transition: `all ${ds.common.animation.fast} ease`,
                backgroundColor: loginMethod === "username"
                  ? ds.color.background("brand-default")
                  : "transparent",
                color: loginMethod === "username"
                  ? ds.color.text("white")
                  : ds.color.text("secondary"),
              }}
            >
              ชื่อผู้ใช้
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ds.spacing("4"),
              }}
            >
              {loginMethod === "phone" ? (
                /* Phone Number Input */
                <Input
                  label="หมายเลขโทรศัพท์"
                  placeholder="กรอกหมายเลขโทรศัพท์"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  maxLength={10}
                />
              ) : (
                /* Username/Password Inputs */
                <>
                  <Input
                    label="ชื่อผู้ใช้"
                    placeholder="กรอกอีเมล หรือ เบอร์โทรศัพท์"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    label="รหัสผ่าน"
                    placeholder="กรอกรหัสผ่าน"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          color: "inherit",
                          pointerEvents: "auto",
                        }}
                      >
                        <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
                      </button>
                    }
                  />
                </>
              )}

              {/* Register Link */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ds.spacing("1"),
                  fontSize: ds.typography.size("sm"),
                  lineHeight: ds.typography.lineHeight("sm"),
                }}
              >
                <span style={{ color: ds.color.text("secondary") }}>
                  หากท่านยังไม่เป็นสมาชิก เราแนะนำให้ท่าน
                </span>
                <Link
                  href="/seller/register"
                  style={{
                    color: ds.component.button.tertiaryBrand.text(),
                    fontWeight: ds.typography.weight("semibold"),
                    textDecoration: "none",
                  }}
                >
                  สมัครสมาชิก
                </Link>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: ds.spacing("3") }}>
                <Button
                  type="submit"
                  variant="primary"
                  color="brand"
                  disabled={!canSubmit}
                  style={{ width: "100%" }}
                >
                  เข้าสู่ระบบ
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
