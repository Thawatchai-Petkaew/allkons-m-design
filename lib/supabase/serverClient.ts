/**
 * Supabase Server Client
 * For use in Server Components, Route Handlers, Server Actions
 * 
 * @example
 * ```tsx
 * import { getServerClient } from '@/lib/supabase/serverClient';
 * 
 * export default async function Page() {
 *   const supabase = await getServerClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 *   return <div>User: {user?.phone}</div>;
 * }
 * ```
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getServerClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: Array<{ name: string; value: string; options?: any }>) => {
        cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: any }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
