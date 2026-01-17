"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components";
import { ds } from "@/design-system";
import { sendOTP as sendSupabaseOTP, verifyOTP as verifySupabaseOTP } from "@/lib/supabase/auth";
import { sendOTP as sendMockOTP, verifyOTP as verifyMockOTP } from "@/lib/supabase/mock-otp";
import { MOCK_PHONE_NUMBERS, MOCK_OTP_CODES } from "@/lib/supabase/mock-data";

// Check if Supabase is configured
const USE_SUPABASE_AUTH = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      
      if (USE_SUPABASE_AUTH) {
        result = await sendSupabaseOTP(phoneNumber);
      } else {
        result = await sendMockOTP(phoneNumber);
      }
      
      if (result.success) {
        setStep('otp');
      } else {
        setError(result.error || 'ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err: any) {
      console.error('Error sending OTP:', err);
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      
      if (USE_SUPABASE_AUTH) {
        result = await verifySupabaseOTP(phoneNumber, otpCode);
        
        if (result.success && result.session) {
          router.push('/admin/dashboard');
        } else {
          setError(result.error || 'รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
        }
      } else {
        const isValid = await verifyMockOTP(phoneNumber, otpCode);
        
        if (isValid) {
          router.push('/admin/dashboard');
        } else {
          setError('รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
        }
      }
    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ds.color.background('secondary'),
        padding: ds.spacing(4),
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: ds.color.background('primary'),
          borderRadius: ds.radius('md'),
          padding: ds.spacing(8),
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: ds.typography.size('4xl'),
            fontWeight: ds.typography.weight('bold'),
            color: ds.color.text('primary'),
            marginBottom: ds.spacing(2),
            textAlign: 'center',
          }}
        >
          Allkons Admin
        </h1>
        <p
          style={{
            fontSize: ds.typography.size('md'),
            color: ds.color.text('secondary'),
            marginBottom: ds.spacing(8),
            textAlign: 'center',
          }}
        >
          {step === 'phone' ? 'กรุณากรอกเบอร์โทรศัพท์' : 'กรุณากรอกรหัส OTP'}
        </p>

        {error && (
          <div
            style={{
              padding: ds.spacing(3),
              marginBottom: ds.spacing(4),
              backgroundColor: '#fff5f5',
              border: `1px solid ${ds.color.system('error')}`,
              borderRadius: ds.radius('sm'),
              color: ds.color.system('error'),
              fontSize: ds.typography.size('sm'),
            }}
          >
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit}>
            <div style={{ marginBottom: ds.spacing(6) }}>
              <label
                style={{
                  display: 'block',
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('medium'),
                  color: ds.color.text('secondary'),
                  marginBottom: ds.spacing(2),
                }}
              >
                เบอร์โทรศัพท์
              </label>
              <Input
                type="tel"
                placeholder="0834567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                style={{
                  width: '100%',
                }}
              />
              <p
                style={{
                  fontSize: ds.typography.size('xs'),
                  color: ds.color.text('tertiary'),
                  marginTop: ds.spacing(2),
                }}
              >
                สำหรับทดสอบ: {MOCK_PHONE_NUMBERS.ADMIN}
              </p>
            </div>
            <Button
              type="submit"
              loading={loading}
              style={{
                width: '100%',
              }}
            >
              ส่งรหัส OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <div style={{ marginBottom: ds.spacing(6) }}>
              <label
                style={{
                  display: 'block',
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('medium'),
                  color: ds.color.text('secondary'),
                  marginBottom: ds.spacing(2),
                }}
              >
                รหัส OTP
              </label>
              <Input
                type="text"
                placeholder="345678"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: ds.typography.size('xl'),
                  letterSpacing: '0.5em',
                }}
              />
              <p
                style={{
                  fontSize: ds.typography.size('xs'),
                  color: ds.color.text('tertiary'),
                  marginTop: ds.spacing(2),
                }}
              >
                {!USE_SUPABASE_AUTH
                  ? `รหัส OTP สำหรับทดสอบ: ${MOCK_OTP_CODES[MOCK_PHONE_NUMBERS.ADMIN]}`
                  : 'กรุณาตรวจสอบ SMS'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: ds.spacing(3) }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setStep('phone');
                  setOtpCode('');
                  setError('');
                }}
                style={{
                  flex: 1,
                }}
              >
                ย้อนกลับ
              </Button>
              <Button
                type="submit"
                loading={loading}
                style={{
                  flex: 1,
                }}
              >
                ยืนยัน
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
