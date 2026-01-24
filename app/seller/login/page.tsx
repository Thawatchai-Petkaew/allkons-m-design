"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button, Alert, Illustration } from "@/components";
import { ds } from "@/design-system";
import { sendOTP as sendSupabaseOTP, verifyOTP as verifySupabaseOTP } from "@/lib/supabase/auth";
import { sendOTP as sendMockOTP, verifyOTP as verifyMockOTP } from "@/lib/supabase/mock-otp";
import { MOCK_PHONE_NUMBERS, MOCK_OTP_CODES } from "@/lib/supabase/mock-data";

// Check if Supabase is configured
const USE_SUPABASE_AUTH = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

type LoginMethod = "phone" | "username";

export default function SellerLoginPage() {
  const router = useRouter();

  // Logic State
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usedMockOTP, setUsedMockOTP] = useState(false);

  // UI State
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("phone");
  // Username login state (kept for UI completeness, though not main focus)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // lg breakpoint is 1024px.
      setIsMobile(window.innerWidth < ds.breakpoint.pixel('lg'));
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // OTP State for new Design
  const [otpDigits, setOtpDigits] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(30);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp') {
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }
    } else {
      // Reset timer when not in OTP step
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle OTP Digit Change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    if (value.length > 1) {
      // Handle Paste (simple version)
      const pasted = value.split("").slice(0, 6 - index);
      const newOtp = [...otpDigits];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtpDigits(newOtp);
      setOtpCode(newOtp.join(""));
      // Focus last filled
      const nextIndex = Math.min(index + pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    setOtpCode(newOtp.join(""));

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Validation
  const isPhoneValid = phoneNumber.length >= 10;
  const isOtpValid = otpCode.length === 6;
  const isUsernameValid = username.length >= 3 && password.length >= 6;

  // Logic Handlers
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid) return;

    setError('');
    setLoading(true);

    try {
      let result;

      if (USE_SUPABASE_AUTH) {
        try {
          result = await sendSupabaseOTP(phoneNumber);
          if (!result.success) {
            // Simple fallback check
            console.warn('[Auth] Supabase failed, using Mock fallback');
            result = await sendMockOTP(phoneNumber);
            setUsedMockOTP(true);
          }
        } catch (err) {
          console.warn('[Auth] Supabase error, using Mock fallback');
          result = await sendMockOTP(phoneNumber);
          setUsedMockOTP(true);
        }
      } else {
        result = await sendMockOTP(phoneNumber);
        setUsedMockOTP(true);
      }

      if (result.success) {
        setStep('otp');
      } else {
        setError(String(('error' in result ? result.error : undefined) || 'ไม่สามารถส่ง OTP ได้'));
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) return;

    setError('');
    setLoading(true);

    try {
      let result;
      let isValid = false;

      // Verification Logic
      if (USE_SUPABASE_AUTH && !usedMockOTP) {
        try {
          result = await verifySupabaseOTP(phoneNumber, otpCode);
          if (result.success && result.session) {
            isValid = true;
          } else {
            // Fallback
            isValid = await verifyMockOTP(phoneNumber, otpCode);
          }
        } catch (err) {
          isValid = await verifyMockOTP(phoneNumber, otpCode);
        }
      } else {
        isValid = await verifyMockOTP(phoneNumber, otpCode);
      }

      if (isValid) {
        // Redirection Logic
        const phone = phoneNumber.replace(/\D/g, '');
        if (phone === '0834567890') { // Preecha (Admin)
          router.push('/analytics'); // For now, all go to analytics in the seller group
        } else {
          // All other mock sellers (Dechwit, Somchai, Somsri)
          router.push('/analytics');
        }
      } else {
        setError('รหัส OTP ไม่ถูกต้อง');
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      style={{
        display: isMobile ? "flex" : "grid",
        flexDirection: isMobile ? "column" : undefined,
        gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
        minHeight: "100vh",
        backgroundColor: ds.color.background("primary"),
        gap: ds.spacing("8"),
        padding: isMobile ? ds.spacing("4") : `0 ${ds.spacing("8")}`,
        overflowX: "hidden",
        maxWidth: "100vw",
        boxSizing: "border-box",
      }}
    >
      {/* Left Section - Illustration */}
      <div
        style={{
          display: isMobile ? "none" : "flex",
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
            borderRadius: ds.radius('xl'),
            overflow: "hidden",
            background: `linear-gradient(to bottom, var(--special-green-sg90), var(--special-green-sg30))`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/login/login-illustration.svg"
            alt="Seller Center Illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? `${ds.spacing("4")} ${ds.spacing("4")}` : `${ds.spacing("8")} ${ds.spacing("16")}`,
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
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
          {step === 'otp' && (
            <div style={{ position: 'absolute', top: ds.spacing("8"), left: isMobile ? ds.spacing("4") : ds.spacing("8") }}>
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtpDigits(new Array(6).fill(""));
                  setOtpCode("");
                  setError("");
                }}
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
          )}

          {step === 'phone' ? (
            <>
              {/* Phone Step Header */}
              <div style={{ paddingBottom: ds.spacing("2") }}>
                <p
                  style={{
                    fontSize: ds.typography.size("sm"),
                    color: ds.color.text("quaternary"),
                    margin: 0,
                  }}
                >
                  ยินดีต้อนรับสู่ Allkons Seller Center
                </p>
                <h1
                  style={{
                    fontSize: ds.typography.size("3xl"),
                    fontWeight: ds.typography.weight("bold"),
                    color: ds.color.text("secondary"),
                    margin: 0,
                  }}
                >
                  เข้าสู่ระบบเพื่อใช้งาน
                </h1>
              </div>

              {error && (
                <Alert type="error" title={error} variant="compact" />
              )}

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

              {/* Form Content */}
              {loginMethod === "phone" ? (
                <form onSubmit={handlePhoneSubmit}>
                  <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("4") }}>
                    <Input
                      label="หมายเลขโทรศัพท์"
                      placeholder="กรุณากรอกหมายเลขโทรศัพท์"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="tel"
                      maxLength={10}
                    />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: ds.spacing("2"),
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ds.spacing("1"),
                          fontSize: ds.typography.size("sm"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        <span style={{ color: ds.color.text("secondary") }}>
                          หากท่านยังไม่เป็นสมาชิก เราแนะนำให้ท่าน
                        </span>
                        <Link
                          href="/seller/register"
                          style={{
                            color: "#00B14F", // Brand Green
                            fontWeight: ds.typography.weight("semibold"),
                            textDecoration: "none",
                          }}
                        >
                          สมัครสมาชิก
                        </Link>
                      </div>
                    </div>

                    <div style={{ marginTop: ds.spacing("1") }}>
                      <Button
                        type="submit"
                        variant="primary"
                        color="brand"
                        disabled={!isPhoneValid || loading}
                        loading={loading}
                        style={{ width: "100%" }}
                      >
                        เข้าสู่ระบบ
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <form>
                  <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("4") }}>
                    <Input
                      label="ชื่อผู้ใช้"
                      placeholder="กรุณากรอกชื่อผู้ใช้"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                      label="รหัสผ่าน"
                      placeholder="กรุณากรอกรหัสผ่าน"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      suffix={
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: ds.color.text("tertiary") }}>
                          <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"} />
                        </button>
                      }
                    />
                    <div style={{ marginTop: ds.spacing("3") }}>
                      <Button
                        type="button"
                        variant="primary"
                        color="brand"
                        disabled={true}
                        style={{ width: "100%" }}
                      >
                        เข้าสู่ระบบ
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* OTP STEP */
            <form onSubmit={handleOTPSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: ds.spacing("6") }}>

              {/* Illustration and Header */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: ds.spacing("6") }}>
                <Illustration
                  type="remix"
                  icon="ri-lock-2-fill"
                  color="brand"
                  variant="withoutBackground"
                  size="xl"
                />

                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: ds.spacing("2") }}>
                  <h1
                    style={{
                      fontSize: ds.typography.size("xl"),
                      fontWeight: ds.typography.weight("bold"),
                      color: ds.color.text("secondary"),
                      margin: 0,
                    }}
                  >
                    กรุณากรอกรหัสยืนยัน (OTP)
                  </h1>
                  <p style={{ color: ds.color.text("quaternary"), fontSize: ds.typography.size("md"), margin: 0 }}>
                    ที่ส่งไปยัง <span style={{ color: ds.color.text("brand-default") }}>{phoneNumber}</span> รหัสอ้างอิง HLYVC
                  </p>
                </div>
              </div>

              {/* 6 Digit Input */}
              <div style={{ display: 'flex', gap: ds.spacing("2"), justifyContent: 'center' }}>
                {otpDigits.map((digit, index) => (
                  <div key={index} style={{ width: '48px' }}>
                    <Input
                      ref={(el) => { inputRefs.current[index] = el; }}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      placeholder="0"
                      size="large"
                      maxLength={1}
                      style={{
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Timer/Resend */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("quaternary") }}>
                  ขอรหัสยืนยัน (OTP) ใหม่ในอีก <span style={{ color: ds.color.text("brand-default") }}>({String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')} วินาที)</span>
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{ width: '100%' }}>
                  <Alert type="error" title={error} variant="compact" />
                </div>
              )}

              {/* Confirm Button */}
              <div style={{ width: '100%', marginTop: ds.spacing("2") }}>
                <Button
                  type="submit"
                  variant="primary"
                  color="brand"
                  loading={loading}
                  disabled={!isOtpValid || loading}
                  style={{ width: '100%' }}
                >
                  ยืนยัน
                </Button>

              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
