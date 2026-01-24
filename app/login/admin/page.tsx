"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components";
import { ds } from "@/design-system";
import { sendOTP, verifyOTP } from "@/lib/auth/mockAuth";

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
      const result = await sendOTP(phoneNumber);

      if (result.success) {
        setStep('otp');
      } else {
        setError(result.error || 'ไม่สามารถส่ง OTP ได้');
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await verifyOTP(phoneNumber, otpCode);

      if (result.success) {
        router.push('/dashboard/admin');
      } else {
        setError(result.error || 'รหัส OTP ไม่ถูกต้อง');
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ds.color.background('secondary'),
        padding: ds.spacing('4'),
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: ds.color.background('primary'),
          borderRadius: ds.radius('md'),
          padding: ds.spacing('8'),
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: ds.typography.size('4xl'),
            fontWeight: ds.typography.weight('bold'),
            color: ds.color.text('primary'),
            marginBottom: ds.spacing('2'),
            textAlign: 'center',
          }}
        >
          Admin Login
        </h1>
        <p
          style={{
            fontSize: ds.typography.size('md'),
            color: ds.color.text('secondary'),
            marginBottom: ds.spacing('8'),
            textAlign: 'center',
          }}
        >
          {step === 'phone' ? 'กรุณากรอกเบอร์โทรศัพท์' : 'กรุณากรอกรหัส OTP'}
        </p>

        {error && (
          <div
            style={{
              padding: ds.spacing('3'),
              marginBottom: ds.spacing('4'),
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
            <div style={{ marginBottom: ds.spacing('6') }}>
              <label
                style={{
                  display: 'block',
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('medium'),
                  color: ds.color.text('secondary'),
                  marginBottom: ds.spacing('2'),
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
                style={{ width: '100%' }}
              />
            </div>
            <Button
              type="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              ส่งรหัส OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <div style={{ marginBottom: ds.spacing('6') }}>
              <label
                style={{
                  display: 'block',
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('medium'),
                  color: ds.color.text('secondary'),
                  marginBottom: ds.spacing('2'),
                }}
              >
                รหัส OTP
              </label>
              <Input
                type="text"
                placeholder="123456"
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
            </div>
            <div style={{ display: 'flex', gap: ds.spacing('3') }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setStep('phone');
                  setOtpCode('');
                  setError('');
                }}
                style={{ flex: 1 }}
              >
                ย้อนกลับ
              </Button>
              <Button
                type="submit"
                loading={loading}
                style={{ flex: 1 }}
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
