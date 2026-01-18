"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components";
import { ds } from "@/design-system";
import { sendOTP as sendMockOTP, verifyOTP as verifyMockOTP } from "@/lib/supabase/mock-otp";
import { sendOTP as sendSupabaseOTP, verifyOTP as verifySupabaseOTP } from "@/lib/supabase/auth";

// Check if Supabase is configured
const USE_SUPABASE_AUTH = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function SellerRegisterVerifyPhonePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";
  
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30); // 30 seconds
  const [canResend, setCanResend] = useState(false);
  const [referenceCode, setReferenceCode] = useState("HLYVC"); // Mock reference code
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Format phone number for display
  const formattedPhone = phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    const numValue = value.replace(/\D/g, "");
    
    if (numValue.length > 1) {
      // Handle paste: fill multiple inputs
      const pastedDigits = numValue.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedDigits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus next empty input or last input
      const nextIndex = Math.min(index + pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Single digit input
      const newOtp = [...otp];
      newOtp[index] = numValue;
      setOtp(newOtp);
      setError("");

      // Auto-focus next input
      if (numValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length > 0) {
      const newOtp = [...otp];
      pastedData.split("").forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      setError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let result;
      
      if (USE_SUPABASE_AUTH) {
        try {
          result = await verifySupabaseOTP(phoneNumber, otpCode);
          if (!result.success) {
            // Fallback to mock OTP
            const isValid = await verifyMockOTP(phoneNumber, otpCode);
            if (isValid) {
              router.push(`/seller/register/set-password?phone=${encodeURIComponent(phoneNumber)}`);
              return;
            } else {
              setError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
            }
          } else {
            // Success - navigate to next step
            router.push(`/seller/register/set-password?phone=${encodeURIComponent(phoneNumber)}`);
            return;
          }
        } catch (err: any) {
          // Fallback to mock OTP
          const isValid = await verifyMockOTP(phoneNumber, otpCode);
          if (isValid) {
            router.push(`/seller/register/set-password?phone=${encodeURIComponent(phoneNumber)}`);
            return;
          } else {
            setError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
          }
        }
      } else {
        // Use Mock OTP
        const isValid = await verifyMockOTP(phoneNumber, otpCode);
        if (isValid) {
          router.push(`/seller/register/set-password?phone=${encodeURIComponent(phoneNumber)}`);
        } else {
          setError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
        }
      }
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      setError(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError("");

    try {
      let result;
      
      if (USE_SUPABASE_AUTH) {
        try {
          result = await sendSupabaseOTP(phoneNumber);
          if (!result.success) {
            result = await sendMockOTP(phoneNumber);
          }
        } catch (err) {
          result = await sendMockOTP(phoneNumber);
        }
      } else {
        result = await sendMockOTP(phoneNumber);
      }

      if (result.success) {
        setTimer(30);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        // Generate new reference code (mock)
        setReferenceCode(Math.random().toString(36).substring(2, 7).toUpperCase());
      } else {
        setError("ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (err: any) {
      console.error("Error resending OTP:", err);
      setError(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

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

        {/* Right Section - OTP Form */}
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
            href={`/seller/register?phone=${encodeURIComponent(phoneNumber)}`}
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

          {/* Security Icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: ds.spacing("6"),
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: ds.spacing("4"),
              }}
            >
              {/* Dashed circles */}
              <div
                style={{
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                  border: `2px dashed ${ds.color.border("brand-default")}`,
                  borderRadius: "50%",
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "100px",
                  height: "100px",
                  border: `2px dashed ${ds.color.border("brand-default")}`,
                  borderRadius: "50%",
                  opacity: 0.2,
                }}
              />
              {/* Lock icon */}
              <i
                className="ri-lock-line"
                style={{
                  fontSize: ds.typography.size("5xl"),
                  color: ds.color.text("brand-default"),
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: ds.typography.size("3xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("primary"),
                margin: 0,
                marginBottom: ds.spacing("2"),
                textAlign: "center",
              }}
            >
              กรุณากรอกรหัสยืนยัน (OTP)
            </h1>

            {/* Instructions */}
            <p
              style={{
                fontSize: ds.typography.size("md"),
                color: ds.color.text("secondary"),
                textAlign: "center",
                margin: 0,
              }}
            >
              ที่ส่งไปยัง{" "}
              <span style={{ color: ds.color.text("brand-default") }}>
                {formattedPhone}
              </span>{" "}
              รหัสอ้างอิง{" "}
              <span style={{ color: ds.color.text("brand-default") }}>
                {referenceCode}
              </span>
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

          {/* OTP Input Fields */}
          <div
            style={{
              display: "flex",
              gap: ds.spacing("3"),
              justifyContent: "center",
              marginBottom: ds.spacing("6"),
            }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                style={{
                  width: "56px",
                  height: "56px",
                  textAlign: "center",
                  fontSize: ds.typography.size("2xl"),
                  fontWeight: ds.typography.weight("bold"),
                  border: `1px solid ${ds.color.border("primary")}`,
                  borderRadius: ds.radius("md"),
                  backgroundColor: ds.color.background("primary"),
                  color: ds.color.text("primary"),
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = ds.color.border("brand-default");
                  e.target.style.boxShadow = `0 0 0 2px ${ds.color.common.transparent}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = ds.color.border("primary");
                  e.target.style.boxShadow = "none";
                }}
              />
            ))}
          </div>

          {/* Resend OTP Timer */}
          <div
            style={{
              textAlign: "center",
              marginBottom: ds.spacing("8"),
            }}
          >
            <p
              style={{
                fontSize: ds.typography.size("sm"),
                color: ds.color.text("secondary"),
                margin: 0,
              }}
            >
              ขอรหัสยืนยัน (OTP) ใหม่ในอีก{" "}
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  style={{
                    background: "none",
                    border: "none",
                    color: ds.color.text("brand-default"),
                    fontSize: ds.typography.size("sm"),
                    fontWeight: ds.typography.weight("semibold"),
                    textDecoration: "underline",
                    cursor: canResend ? ds.common.cursor.pointer : ds.common.cursor.notAllowed,
                    padding: 0,
                  }}
                >
                  ส่งใหม่
                </button>
              ) : (
                <span style={{ color: ds.color.text("brand-default") }}>
                  ({String(Math.floor(timer / 60)).padStart(2, "0")}:
                  {String(timer % 60).padStart(2, "0")} วินาที)
                </span>
              )}
            </p>
          </div>

          {/* Confirm Button */}
          <Button
            type="button"
            onClick={handleVerify}
            disabled={!isOtpComplete || isLoading}
            loading={isLoading}
            style={{
              width: "100%",
            }}
          >
            ยืนยัน
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SellerRegisterVerifyPhonePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellerRegisterVerifyPhonePageContent />
    </Suspense>
  );
}
