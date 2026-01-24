/**
 * Mock Authentication System
 * Pure localStorage-based auth for UXUI prototype (no Supabase)
 */

import { getUserByPhone } from "@/lib/data/mock";

const SESSION_KEY = "allkons_mock_session";
const OTP_KEY = "allkons_mock_otp";

export interface MockUser {
  id: string;
  phone: string;
  email?: string;
  displayName?: string;
}

export interface MockSession {
  user: MockUser;
  accessToken: string;
  expiresAt: number;
}

/**
 * Format phone number to normalized format (remove non-digits, handle Thai format)
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // Convert 0xx to +66xx
  if (digits.startsWith("0")) return `+66${digits.slice(1)}`;
  if (!digits.startsWith("66")) return `+66${digits}`;
  return `+${digits}`;
}

/**
 * Send OTP (Mock - always succeeds)
 */
export async function sendOTP(phoneNumber: string): Promise<{ success: boolean; error?: string }> {
  console.log("[Mock Auth] Sending OTP to:", phoneNumber);
  
  // Store OTP request for verification (mock: OTP is always 123456)
  if (typeof window !== "undefined") {
    localStorage.setItem(OTP_KEY, JSON.stringify({
      phone: formatPhoneNumber(phoneNumber),
      code: "123456",
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    }));
  }
  
  return { success: true };
}

/**
 * Verify OTP and create session
 */
export async function verifyOTP(
  phoneNumber: string,
  otpCode: string
): Promise<{ success: boolean; session?: MockSession; user?: MockUser; error?: string }> {
  console.log("[Mock Auth] Verifying OTP for:", phoneNumber, "Code:", otpCode);
  
  const formattedPhone = formatPhoneNumber(phoneNumber);
  
  // Mock validation: accept 123456 or any 6-digit code for prototype flexibility
  const isValidOTP = otpCode === "123456" || otpCode.length === 6;
  
  if (!isValidOTP) {
    return { success: false, error: "รหัส OTP ไม่ถูกต้อง" };
  }
  
  // Find user by phone from mock data
  const mockUser = getUserByPhone(formattedPhone);
  
  // Create user object (use mock data if found, otherwise create basic user)
  const user: MockUser = mockUser
    ? {
        id: mockUser.id,
        phone: formattedPhone,
        email: mockUser.email,
        displayName: mockUser.displayName,
      }
    : {
        id: `user-${Date.now()}`,
        phone: formattedPhone,
      };
  
  const session: MockSession = {
    user,
    accessToken: `mock-token-${Date.now()}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  
  // Store session
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.removeItem(OTP_KEY);
  }
  
  return { success: true, session, user };
}

/**
 * Get current session
 */
export async function getSession(): Promise<{ session: MockSession | null; user: MockUser | null }> {
  if (typeof window === "undefined") {
    return { session: null, user: null };
  }
  
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) {
    return { session: null, user: null };
  }
  
  try {
    const session: MockSession = JSON.parse(stored);
    
    // Check if expired
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return { session: null, user: null };
    }
    
    return { session, user: session.user };
  } catch {
    return { session: null, user: null };
  }
}

/**
 * Get current user
 */
export async function getUser(): Promise<MockUser | null> {
  const { user } = await getSession();
  return user;
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(OTP_KEY);
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const { session } = await getSession();
  return session !== null;
}
