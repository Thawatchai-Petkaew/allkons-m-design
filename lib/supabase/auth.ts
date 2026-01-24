/**
 * Supabase Authentication Utilities (DYNAMIC MOCK VERSION)
 * Persists session in localStorage for prototype consistency.
 */

const SESSION_KEY = 'allkons_mock_session';

const DEFAULT_MOCK_USER = {
  id: '550e8400-e29b-41d4-a716-446655440000', // Dechwit's ID from mockUsers
  aud: 'authenticated',
  role: 'authenticated',
  email: 'dechwit@gmail.com',
  phone: '+66938311673',
  app_metadata: { provider: 'phone' },
  user_metadata: { full_name: 'เดชวิทย์ มงคลจิต' },
  created_at: new Date('2025-10-15T09:00:00Z').toISOString(),
};

/**
 * Format phone number to E.164 format
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return `+66${digits.slice(1)}`;
  if (!digits.startsWith('66')) return `+66${digits}`;
  return `+${digits}`;
}

/**
 * Send OTP (MOCK)
 */
export async function sendOTP(phoneNumber: string) {
  console.log('[Mock Auth] sending OTP to:', phoneNumber);
  return { success: true, data: { messageId: 'mock-message-id' } };
}

/**
 * Verify OTP code (MOCK) - Now stores session
 */
export async function verifyOTP(phoneNumber: string, token: string) {
  console.log('[Mock Auth] verifying OTP for:', phoneNumber, 'Token:', token);

  // In a real mock, we'd lookup the user in mockUsers here
  // For now, let's just create a session based on the phone
  const formattedPhone = formatPhoneNumber(phoneNumber);

  // Mapping phone numbers to mock user IDs
  // Dechwit (Owner of Dechwit Con & Thammasorn): +66938311673 OR +66834567890
  // Somchai (Seller 1): +66812345678
  // Somsri (Seller 2): +66823456789

  let userId = '550e8400-e29b-41d4-a716-446655440000'; // Default to Dechwit
  if (formattedPhone === '+66812345678') userId = '550e8400-e29b-41d4-a716-446655440001';
  if (formattedPhone === '+66823456789') userId = '550e8400-e29b-41d4-a716-446655440002';
  if (formattedPhone === '+66834567890') userId = '550e8400-e29b-41d4-a716-446655440000';

  const user = {
    ...DEFAULT_MOCK_USER,
    id: userId,
    phone: formattedPhone,
  };

  const session = {
    access_token: 'mock-access-token-' + Date.now(),
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'bearer',
    user,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return {
    success: true,
    session,
    user,
  };
}

/**
 * Get current user session
 */
export async function getSession() {
  if (typeof window === 'undefined') return { session: null, user: null };

  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return { session: null, user: null };

  try {
    const session = JSON.parse(stored);
    return { session, user: session.user };
  } catch (e) {
    return { session: null, user: null };
  }
}

/**
 * Get current user
 */
export async function getUser() {
  const { user } = await getSession();
  return user;
}

/**
 * Sign out
 */
export async function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
  return { success: true };
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return !!user;
}
