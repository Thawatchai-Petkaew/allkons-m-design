# Supabase Authentication Setup Guide

## Executive Summary
คู่มือการ Setup Supabase Authentication สำหรับ Allkons M

**Status**: ✅ **Implementation Complete**

---

## 1. Overview

ระบบ Authentication ใช้ Supabase Auth สำหรับ Phone OTP (One-Time Password) ซึ่งรองรับทั้ง:
- ✅ Supabase Auth (เมื่อ configure แล้ว)
- ✅ Mock OTP (fallback สำหรับ development)

---

## 2. Architecture

### 2.1 Client Structure

```
lib/supabase/
├── browserClient.ts    # Browser client (Client Components)
├── serverClient.ts     # Server client (Server Components)
├── middleware.ts       # Middleware helper
├── auth.ts             # Auth utilities (sendOTP, verifyOTP)
├── mock-otp.ts         # Mock OTP service (fallback)
└── client.ts           # Legacy client (kept for compatibility)
```

### 2.2 Flow

1. **Send OTP**: User enters phone number → `sendOTP()` → Supabase sends SMS
2. **Verify OTP**: User enters OTP → `verifyOTP()` → Supabase verifies → Session created
3. **Session Management**: Middleware refreshes session on each request
4. **Protected Routes**: Server/client checks user session

---

## 3. Setup Steps

### Step 1: Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

**Note**: `@supabase/ssr` is required for Next.js 15 App Router with proper cookie handling.

---

### Step 2: Configure Supabase Project

1. **Enable Phone Auth**:
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable "Phone" provider
   - Configure SMS provider (Twilio, MessageBird, etc.)

2. **Set up SMS Provider** (Required for production):
   - Configure Twilio, MessageBird, or other SMS provider
   - Enter API credentials in Supabase Dashboard
   - Test SMS sending

3. **Get Credentials**:
   - Go to Supabase Dashboard → Settings → API
   - Copy `Project URL` and `anon/public` key

---

### Step 3: Environment Variables

สร้างไฟล์ `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Allkons M
```

**Note**: 
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Never commit `.env.local` to git
- Use `.env.local.example` as a template

---

### Step 4: Test Authentication

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Test Login Flow**:
   - Go to `/login`
   - Enter phone number (E.164 format: `+66812345678`)
   - Click "Send OTP"
   - Enter OTP from SMS
   - Click "Verify"
   - Should redirect to dashboard

---

## 4. Implementation Details

### 4.1 Phone Number Format

Supabase requires **E.164 format** (e.g., `+66812345678`).

**Auto-formatting**:
- Input: `0812345678` (Thai format)
- Output: `+66812345678` (E.164 format)

Function: `formatPhoneNumber()` in `lib/supabase/auth.ts`

---

### 4.2 Send OTP

**Code**:
```typescript
import { sendOTP } from '@/lib/supabase/auth';

const result = await sendOTP('0812345678');
// Formats to: +66812345678
// Sends SMS via Supabase
```

**Returns**:
```typescript
{
  success: boolean;
  error?: string;
}
```

---

### 4.3 Verify OTP

**Code**:
```typescript
import { verifyOTP } from '@/lib/supabase/auth';

const result = await verifyOTP('0812345678', '123456');
```

**Returns**:
```typescript
{
  success: boolean;
  session?: Session;
  user?: User;
  error?: string;
}
```

---

### 4.4 Session Management

**Middleware** (`middleware.ts`):
- Automatically refreshes session on each request
- Sets cookies for server/client sync

**Get Session**:
```typescript
// Client Component
import { getSession } from '@/lib/supabase/auth';
const { session, user } = await getSession();

// Server Component
import { getServerClient } from '@/lib/supabase/serverClient';
const supabase = await getServerClient();
const { data: { user } } = await supabase.auth.getUser();
```

---

### 4.5 Protected Routes

**Server Component**:
```typescript
import { getServerClient } from '@/lib/supabase/serverClient';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <div>Protected content</div>;
}
```

**Client Component**:
```typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';

export default function ProtectedPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const { user } = await getSession();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    }
    checkAuth();
  }, [router]);

  if (!user) return <div>Loading...</div>;
  
  return <div>Protected content</div>;
}
```

---

## 5. Fallback: Mock OTP

**Automatic Fallback**:
- If Supabase credentials are missing, uses Mock OTP
- Works without Supabase setup (development only)

**Mock Phone Numbers**:
- `0812345678` → OTP: `123456` (Seller 1)
- `0823456789` → OTP: `234567` (Seller 2)
- `0834567890` → OTP: `345678` (Admin)

---

## 6. Error Handling

### Common Errors

1. **"Missing Supabase environment variables"**:
   - Solution: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`

2. **"Invalid phone number format"**:
   - Solution: Use E.164 format (`+66812345678`) or let `formatPhoneNumber()` handle it

3. **"Rate limit exceeded"**:
   - Solution: Wait 60 seconds before requesting another OTP

4. **"OTP expired"**:
   - Solution: Request a new OTP (expires after ~1 hour)

---

## 7. Production Checklist

- [ ] Supabase project created
- [ ] Phone Auth enabled
- [ ] SMS provider configured (Twilio, MessageBird, etc.)
- [ ] Environment variables set (production)
- [ ] Middleware configured
- [ ] Protected routes tested
- [ ] Error handling tested
- [ ] Session management tested

---

## 8. Files Reference

| File | Purpose |
|------|---------|
| `lib/supabase/browserClient.ts` | Browser client for Client Components |
| `lib/supabase/serverClient.ts` | Server client for Server Components |
| `lib/supabase/middleware.ts` | Middleware helper for session refresh |
| `lib/supabase/auth.ts` | Auth utilities (sendOTP, verifyOTP, etc.) |
| `middleware.ts` | Next.js middleware configuration |
| `app/(auth)/login/page.tsx` | Login page (uses Supabase Auth or Mock OTP) |

---

## 9. Next Steps

1. ✅ Setup Supabase project
2. ✅ Configure Phone Auth
3. ✅ Set environment variables
4. ⚠️ Test authentication flow
5. ⚠️ Configure SMS provider (production)
6. ⚠️ Add user role checking
7. ⚠️ Add protected routes

---

**Last Updated**: 2024
**Status**: ✅ Ready for Testing
