/**
 * Supabase Browser Client
 * For use in Client Components (use client)
 * 
 * @example
 * ```tsx
 * 'use client';
 * import { getBrowserClient } from '@/lib/supabase/browserClient';
 * 
 * const supabase = getBrowserClient();
 * const { data } = await supabase.auth.signInWithOtp({ phone: '+66812345678' });
 * ```
 */

import { createBrowserClient } from '@supabase/ssr';

export function getBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
