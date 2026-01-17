/**
 * Legacy Supabase Client
 * For backward compatibility
 * 
 * @deprecated Use `getBrowserClient()` from `browserClient.ts` or `getServerClient()` from `serverClient.ts` instead
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Don't throw error if not configured (allows fallback to Mock OTP)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
