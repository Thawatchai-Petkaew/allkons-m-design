/**
 * Supabase Authentication Utilities (MOCK VERSION)
 * Pure mock implementation for Designer/Frontend-only mode.
 */

const MOCK_USER = {
  id: 'mock-seller-id',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'seller@example.com',
  phone: '+66812345678',
  app_metadata: { provider: 'phone' },
  user_metadata: { full_name: 'Mock Seller' },
  created_at: new Date().toISOString(),
};

const MOCK_SESSION = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: MOCK_USER,
};

/**
 * Format phone number to E.164 format (required by Supabase)
 * @example +66812345678
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // If starts with 0, replace with +66 (Thailand country code)
  if (digits.startsWith('0')) {
    return `+66${digits.slice(1)}`;
  }

  // If doesn't start with +, add +66
  if (!digits.startsWith('66')) {
    return `+66${digits}`;
  }

  // If starts with 66, add +
  return `+${digits}`;
}

/**
 * Send OTP to phone number (MOCK)
 */
export async function sendOTP(phoneNumber: string) {
  console.log('[Mock Auth] sending OTP to:', phoneNumber);
  return { success: true, data: { messageId: 'mock-message-id' } };
}

/**
 * Verify OTP code (MOCK)
 */
export async function verifyOTP(phoneNumber: string, token: string) {
  console.log('[Mock Auth] verifying OTP for:', phoneNumber, 'Token:', token);

  // Determine user based on phone number for better mock experience
  let user = { ...MOCK_USER };
  if (phoneNumber.includes('834567890')) { // Admin mock phone
    user.id = 'mock-admin-id';
    user.email = 'admin@example.com';
    user.user_metadata.full_name = 'Mock Admin';
  } else if (phoneNumber.includes('912345678')) { // Buyer mock phone
    user.id = 'mock-buyer-id';
    user.email = 'buyer@example.com';
    user.user_metadata.full_name = 'Mock Buyer';
  }

  // Also update phone number in mock user to match input
  user.phone = formatPhoneNumber(phoneNumber);

  const session = { ...MOCK_SESSION, user };

  return {
    success: true,
    session: session,
    user: user,
  };
}

/**
 * Get current user session (MOCK)
 * Returns a session by default to simulate logged-in state.
 * In a real app we'd check cookies/localstorage, but for design mode 
 * we can assume logged in or implement a simple client-side toggle if needed.
 */
export async function getSession() {
  // Return session to simulate logged in state
  return {
    session: MOCK_SESSION,
    user: MOCK_USER,
  };
}

/**
 * Get current user (MOCK)
 */
export async function getUser() {
  return MOCK_USER;
}

/**
 * Sign out current user (MOCK)
 */
export async function signOut() {
  console.log('[Mock Auth] User signed out');
  return { success: true };
}

/**
 * Check if user is authenticated (MOCK)
 */
export async function isAuthenticated(): Promise<boolean> {
  return true;
}


