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

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usedMockOTP, setUsedMockOTP] = useState(false); // Track if we used Mock OTP for sending

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      
      if (USE_SUPABASE_AUTH) {
        // Try Supabase Auth first
        try {
          result = await sendSupabaseOTP(phoneNumber);
          
          // If Supabase returns error (e.g., SMS provider not configured), fallback to Mock OTP
          if (!result.success) {
            const errorMsg = (result.error || '').toLowerCase();
            if (errorMsg.includes('twilio') || 
                errorMsg.includes('sms provider') || 
                errorMsg.includes('invalid username') ||
                errorMsg.includes('authentication error') ||
                errorMsg.includes('error sending confirmation otp')) {
              console.warn('[Auth] Supabase SMS not configured, using Mock OTP fallback');
              result = await sendMockOTP(phoneNumber);
              setUsedMockOTP(true); // Remember we used Mock OTP
            }
          }
        } catch (err: any) {
          // If Supabase throws error, fallback to Mock OTP
          const errorMsg = (err.message || '').toLowerCase();
          if (errorMsg.includes('twilio') || 
              errorMsg.includes('sms provider') || 
              errorMsg.includes('invalid username') ||
              errorMsg.includes('authentication error') ||
              errorMsg.includes('error sending confirmation otp')) {
              console.warn('[Auth] Supabase error, using Mock OTP fallback:', err.message);
            result = await sendMockOTP(phoneNumber);
            setUsedMockOTP(true); // Remember we used Mock OTP
          } else {
            // Re-throw if it's not a SMS provider error
            throw err;
          }
        }
      } else {
        // Use Mock OTP (fallback)
        result = await sendMockOTP(phoneNumber);
        setUsedMockOTP(true); // Remember we used Mock OTP
      }
      
      if (result.success) {
        setStep('otp');
      } else {
        setError(('error' in result ? result.error : undefined) || 'ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่อีกครั้ง');
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
      
      // If we used Mock OTP for sending, we must use Mock OTP for verification too
      if (USE_SUPABASE_AUTH && !usedMockOTP) {
        // Try Supabase Auth first
        try {
          result = await verifySupabaseOTP(phoneNumber, otpCode);
          
          if (result.success && result.session && result.user) {
            // User is authenticated, sync account with Prisma
            try {
              const syncResponse = await fetch('/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: result.user.id,
                  phoneNumber: phoneNumber,
                }),
              });

              const syncData = await syncResponse.json();

              if (syncData.success && syncData.account) {
                // Account synced, redirect based on user type
                // For MVP, still use phone number check (will be replaced with role check later)
                const phone = phoneNumber.replace(/\D/g, '');
                if (phone === '0812345678' || phone === '0823456789') {
                  router.push('/dashboard/seller');
                } else if (phone === '0834567890') {
                  router.push('/dashboard/admin');
                } else {
                  router.push('/buyer/marketplace');
                }
                return; // Success, exit early
              } else {
                console.warn('[Auth] Account sync failed, redirecting anyway');
                // Still redirect even if sync fails (for MVP)
                const phone = phoneNumber.replace(/\D/g, '');
                if (phone === '0812345678' || phone === '0823456789') {
                  router.push('/dashboard/seller');
                } else if (phone === '0834567890') {
                  router.push('/dashboard/admin');
                } else {
                  router.push('/buyer/marketplace');
                }
                return;
              }
            } catch (syncError: any) {
              console.error('[Auth] Error syncing account:', syncError);
              // Still redirect even if sync fails (for MVP)
              const phone = phoneNumber.replace(/\D/g, '');
              if (phone === '0812345678' || phone === '0823456789') {
                router.push('/dashboard/seller');
              } else if (phone === '0834567890') {
                router.push('/dashboard/admin');
              } else {
                router.push('/buyer/marketplace');
              }
              return;
            }
          } else if (result.error) {
            // If Supabase verification fails (e.g., token expired/invalid), fallback to Mock OTP
            const errorMsg = (result.error || '').toLowerCase();
            if (errorMsg.includes('token has expired') || 
                errorMsg.includes('invalid') ||
                errorMsg.includes('token')) {
              console.warn('[Auth] Supabase verification failed, trying Mock OTP fallback');
              const isValid = await verifyMockOTP(phoneNumber, otpCode);
              if (isValid) {
                // Determine user type and redirect
                // Normalize phone number for comparison
                const phoneNormalized = phoneNumber.replace(/\D/g, '');
                const seller1Normalized = MOCK_PHONE_NUMBERS.SELLER_1.replace(/\D/g, '');
                const seller2Normalized = MOCK_PHONE_NUMBERS.SELLER_2.replace(/\D/g, '');
                const adminNormalized = MOCK_PHONE_NUMBERS.ADMIN.replace(/\D/g, '');

                if (phoneNormalized === seller1Normalized || phoneNormalized === seller2Normalized) {
                  router.push('/dashboard/seller');
                } else if (phoneNormalized === adminNormalized) {
                  router.push('/dashboard/admin');
                } else {
                  router.push('/buyer/marketplace');
                }
                return; // Success with Mock OTP
              } else {
                setError('รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
                return; // Exit early
              }
            } else {
              // Other errors, show error message but try Mock OTP as fallback
              console.warn('[Auth] Supabase verification error, trying Mock OTP fallback:', result.error);
              const isValid = await verifyMockOTP(phoneNumber, otpCode);
              if (isValid) {
                // Determine user type and redirect
                // Normalize phone number for comparison
                const phoneNormalized = phoneNumber.replace(/\D/g, '');
                const seller1Normalized = MOCK_PHONE_NUMBERS.SELLER_1.replace(/\D/g, '');
                const seller2Normalized = MOCK_PHONE_NUMBERS.SELLER_2.replace(/\D/g, '');
                const adminNormalized = MOCK_PHONE_NUMBERS.ADMIN.replace(/\D/g, '');

                if (phoneNormalized === seller1Normalized || phoneNormalized === seller2Normalized) {
                  router.push('/dashboard/seller');
                } else if (phoneNormalized === adminNormalized) {
                  router.push('/dashboard/admin');
                } else {
                  router.push('/buyer/marketplace');
                }
                return; // Success with Mock OTP
              } else {
                setError(result.error || 'รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
                return; // Exit early
              }
            }
          }
        } catch (err: any) {
          // If Supabase throws error (e.g., token expired/invalid), fallback to Mock OTP
          const errorMsg = (err.message || '').toLowerCase();
          if (errorMsg.includes('token has expired') || 
              errorMsg.includes('invalid') ||
              errorMsg.includes('token')) {
            console.warn('[Auth] Supabase error, using Mock OTP fallback:', err.message);
            const isValid = await verifyMockOTP(phoneNumber, otpCode);
            if (isValid) {
              // Determine user type and redirect
              // Normalize phone number for comparison
                const phoneNormalized = phoneNumber.replace(/\D/g, '');
                const seller1Normalized = MOCK_PHONE_NUMBERS.SELLER_1.replace(/\D/g, '');
                const seller2Normalized = MOCK_PHONE_NUMBERS.SELLER_2.replace(/\D/g, '');
                const adminNormalized = MOCK_PHONE_NUMBERS.ADMIN.replace(/\D/g, '');

                if (phoneNormalized === seller1Normalized || phoneNormalized === seller2Normalized) {
                  router.push('/dashboard/seller');
                } else if (phoneNormalized === adminNormalized) {
                  router.push('/dashboard/admin');
                } else {
                  router.push('/buyer/marketplace');
                }
              return; // Success with Mock OTP
            } else {
              setError('รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
            }
          } else {
            // Re-throw if it's not a token-related error
            throw err;
          }
        }
      } else {
        // Use Mock OTP (fallback) - either no Supabase or used Mock OTP for sending
        const isValid = await verifyMockOTP(phoneNumber, otpCode);
        
        if (isValid) {
          // Determine user type and redirect
          // Normalize phone number for comparison
          const phoneNormalized = phoneNumber.replace(/\D/g, '');
          const seller1Normalized = MOCK_PHONE_NUMBERS.SELLER_1.replace(/\D/g, '');
          const seller2Normalized = MOCK_PHONE_NUMBERS.SELLER_2.replace(/\D/g, '');
          const adminNormalized = MOCK_PHONE_NUMBERS.ADMIN.replace(/\D/g, '');
          
          if (phoneNormalized === seller1Normalized || phoneNormalized === seller2Normalized) {
            router.push('/seller/dashboard');
          } else if (phoneNormalized === adminNormalized) {
            router.push('/admin/dashboard');
          } else {
            // Default: Buyer
            router.push('/buyer/marketplace');
          }
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
          เข้าสู่ระบบ
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
                placeholder="0812345678"
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
                  marginTop: ds.spacing('2'),
                }}
              >
                สำหรับทดสอบ: {MOCK_PHONE_NUMBERS.SELLER_1} (Seller 1), {MOCK_PHONE_NUMBERS.SELLER_2} (Seller 2), {MOCK_PHONE_NUMBERS.ADMIN} (Admin)
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
              <p
                style={{
                  fontSize: ds.typography.size('xs'),
                  color: ds.color.text('tertiary'),
                  marginTop: ds.spacing('2'),
                }}
              >
                {phoneNumber in MOCK_OTP_CODES
                  ? `รหัส OTP สำหรับทดสอบ: ${MOCK_OTP_CODES[phoneNumber as keyof typeof MOCK_OTP_CODES]}`
                  : USE_SUPABASE_AUTH
                  ? 'กรุณาตรวจสอบ SMS'
                  : 'กรุณาตรวจสอบ SMS หรือใช้ Mock OTP'}
              </p>
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
