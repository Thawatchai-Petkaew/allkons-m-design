/**
 * Supabase Authentication Utilities
 * Helper functions for authentication flows
 */

import { getBrowserClient } from './browserClient';

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
 * Send OTP to phone number using Supabase Auth
 */
export async function sendOTP(phoneNumber: string) {
  const supabase = getBrowserClient();
  const formattedPhone = formatPhoneNumber(phoneNumber);

  const { data, error } = await supabase.auth.signInWithOtp({
    phone: formattedPhone,
    options: {
      // Optional: Set channel to 'sms'
      channel: 'sms',
    },
  });

  if (error) {
    // Don't log error to console.error if it's a SMS provider configuration issue
    // (will be handled by fallback in calling code)
    if (!error.message?.includes('Twilio') && 
        !error.message?.includes('SMS provider') &&
        !error.message?.includes('invalid username')) {
      console.error('[Supabase Auth] Error sending OTP:', error.message);
    }
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    data,
  };
}

/**
 * Verify OTP code using Supabase Auth
 */
export async function verifyOTP(phoneNumber: string, token: string) {
  const supabase = getBrowserClient();
  const formattedPhone = formatPhoneNumber(phoneNumber);

  const { data, error } = await supabase.auth.verifyOtp({
    phone: formattedPhone,
    token: token,
    type: 'sms',
  });

  if (error) {
    // Don't log error to console.error if it's a token-related issue
    // (will be handled by fallback in calling code)
    const errorMsg = (error.message || '').toLowerCase();
    if (!errorMsg.includes('token has expired') && 
        !errorMsg.includes('invalid') &&
        !errorMsg.includes('token')) {
      console.error('[Supabase Auth] Error verifying OTP:', error.message);
    }
    return {
      success: false,
      error: error.message,
      session: null,
    };
  }

  return {
    success: true,
    session: data.session,
    user: data.user,
  };
}

/**
 * Get current user session
 */
export async function getSession() {
  const supabase = getBrowserClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('[Supabase Auth] Error getting session:', error.message);
    return {
      session: null,
      user: null,
    };
  }

  return {
    session,
    user: session?.user ?? null,
  };
}

/**
 * Get current user
 */
export async function getUser() {
  const supabase = getBrowserClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('[Supabase Auth] Error getting user:', error.message);
    return null;
  }

  return user;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const supabase = getBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('[Supabase Auth] Error signing out:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return user !== null;
}
