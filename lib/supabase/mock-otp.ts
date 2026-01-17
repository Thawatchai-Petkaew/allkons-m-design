/**
 * Mock OTP Service for MVP
 * In production, this would be replaced with a real SMS service (SMS2PRO)
 */

import { MOCK_PHONE_NUMBERS, MOCK_OTP_CODES } from './mock-data';

// Mock OTP storage (in-memory for MVP)
// In production, this should be stored in database
const mockOtpStore = new Map<string, { code: string; expiresAt: number }>();

// OTP expiration time: 5 minutes
const OTP_EXPIRATION_TIME = 5 * 60 * 1000;

/**
 * Generate a 6-digit OTP code
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP to phone number (Mock implementation)
 * In production, this would call SMS2PRO or similar service
 */
export async function sendOTP(phoneNumber: string): Promise<{ success: boolean; code?: string }> {
  // For MVP: Use predefined OTP for mock phone numbers, otherwise generate random
  const isMockPhone = Object.values(MOCK_PHONE_NUMBERS).includes(phoneNumber);
  const code = isMockPhone 
    ? MOCK_OTP_CODES[phoneNumber as keyof typeof MOCK_OTP_CODES] || generateOTP()
    : generateOTP();
  
  const expiresAt = Date.now() + OTP_EXPIRATION_TIME;

  // Store OTP (in production, store in database)
  mockOtpStore.set(phoneNumber, { code, expiresAt });

  // In development, log the OTP to console
  if (process.env.NODE_ENV === 'development') {
    console.log(`[MOCK OTP] Phone: ${phoneNumber}, OTP: ${code}`);
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true, code: process.env.NODE_ENV === 'development' ? code : undefined };
}

/**
 * Verify OTP code
 */
export async function verifyOTP(phoneNumber: string, code: string): Promise<boolean> {
  // Normalize phone number (remove spaces, dashes, etc.)
  const normalizedPhone = phoneNumber.replace(/\D/g, '');
  
  // First, check if it's a mock phone number with predefined OTP (always allow this)
  const isMockPhone = Object.values(MOCK_PHONE_NUMBERS).some(mockPhone => {
    const mockPhoneNormalized = mockPhone.replace(/\D/g, '');
    return mockPhoneNormalized === normalizedPhone;
  });
  
  if (isMockPhone) {
    // Find the matching mock phone number
    const matchingMockPhone = Object.values(MOCK_PHONE_NUMBERS).find(mockPhone => {
      const mockPhoneNormalized = mockPhone.replace(/\D/g, '');
      return mockPhoneNormalized === normalizedPhone;
    });
    
    if (matchingMockPhone && MOCK_OTP_CODES[matchingMockPhone as keyof typeof MOCK_OTP_CODES]) {
      const expectedCode = MOCK_OTP_CODES[matchingMockPhone as keyof typeof MOCK_OTP_CODES];
      if (code === expectedCode) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[MOCK OTP] Verified predefined OTP for ${matchingMockPhone}: ${code}`);
        }
        return true; // Direct match with predefined OTP
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[MOCK OTP] Predefined OTP mismatch for ${matchingMockPhone}: expected ${expectedCode}, got ${code}`);
        }
      }
    }
  }
  
  // Try to find OTP by exact match first
  let stored = mockOtpStore.get(phoneNumber);
  
  // If not found, try normalized phone number
  if (!stored) {
    // Try to find by matching normalized phone numbers
    for (const [storedPhone, storedData] of Array.from(mockOtpStore.entries())) {
      const storedPhoneNormalized = storedPhone.replace(/\D/g, '');
      if (storedPhoneNormalized === normalizedPhone) {
        stored = storedData;
        if (process.env.NODE_ENV === 'development') {
          console.log(`[MOCK OTP] Found stored OTP for normalized phone: ${normalizedPhone}`);
        }
        break;
      }
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MOCK OTP] Found stored OTP for exact phone: ${phoneNumber}`);
    }
  }
  
  if (!stored) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MOCK OTP] No stored OTP found for phone: ${phoneNumber} (normalized: ${normalizedPhone})`);
      console.log(`[MOCK OTP] Store contents:`, Array.from(mockOtpStore.entries()));
    }
    return false;
  }

  // Check expiration
  if (Date.now() > stored.expiresAt) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MOCK OTP] OTP expired for phone: ${phoneNumber}`);
    }
    mockOtpStore.delete(phoneNumber);
    return false;
  }

  // Verify code
  if (stored.code !== code) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MOCK OTP] Code mismatch: expected ${stored.code}, got ${code}`);
    }
    return false;
  }

  // Remove OTP after successful verification
  if (process.env.NODE_ENV === 'development') {
    console.log(`[MOCK OTP] Verification successful for phone: ${phoneNumber}`);
  }
  mockOtpStore.delete(phoneNumber);
  return true;
}

/**
 * Clear expired OTPs (cleanup function)
 */
export function clearExpiredOTPs(): void {
  const now = Date.now();
  for (const [phone, data] of Array.from(mockOtpStore.entries())) {
    if (now > data.expiresAt) {
      mockOtpStore.delete(phone);
    }
  }
}

// Cleanup expired OTPs every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(clearExpiredOTPs, 5 * 60 * 1000);
}
