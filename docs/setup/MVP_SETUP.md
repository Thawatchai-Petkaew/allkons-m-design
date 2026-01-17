# MVP Setup Guide: Allkons M

## Executive Summary
คู่มือการ Setup MVP สำหรับ Allkons M

**Status**: ✅ **Ready for Development**

---

## Prerequisites

1. **Node.js**: v18+ installed
2. **npm**: Latest version
3. **Supabase Account**: (Optional for MVP - ใช้ mock data ก่อน)

---

## Step 1: Install Dependencies

```bash
npm install @supabase/supabase-js uuid @types/uuid
```

**Note**: ถ้า network ไม่สามารถติดตั้งได้ ให้เพิ่มใน `package.json` แล้วรัน `npm install` ทีหลัง

---

## Step 2: Environment Variables

สร้างไฟล์ `.env.local` ใน root directory:

```env
# Supabase Configuration (Optional for MVP)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Allkons M Design
```

**Note**: สำหรับ MVP สามารถใช้ mock data ได้โดยไม่ต้อง setup Supabase

---

## Step 3: Run Development Server

```bash
npm run dev
```

เปิด browser ไปที่: http://localhost:3000

---

## Step 4: Test MVP Features

### Seller Login & Dashboard

1. ไปที่ `/app/(auth)/login` หรือ `/login`
2. กรอกเบอร์โทรศัพท์:
   - `0812345678` → Seller 1 (Registered Individual Merchant)
   - `0823456789` → Seller 2 (Legal Entity)
3. กรอกรหัส OTP: `123456` (development mode)
4. จะ redirect ไปที่ `/seller/dashboard`
5. Dashboard จะแสดง:
   - ข้อมูลองค์กร
   - ข้อมูลร้าน
   - สาขา 2 แห่ง (สำนักงานใหญ่ + สาขา 1)

### Buyer Marketplace (Guest Mode)

1. ไปที่ `/buyer/marketplace` หรือ root page (`/`)
2. จะเห็นสินค้าจากร้านต่างๆ (Mock data)
3. แสดงในรูปแบบ Grid
4. แสดงข้อมูล: ชื่อสินค้า, ราคา, ร้าน, หมวดหมู่, สถานะสต็อก

### Admin Login

1. ไปที่ `/admin/login`
2. กรอกเบอร์โทรศัพท์: `0834567890`
3. กรอกรหัส OTP: `345678` (development mode)
4. จะ redirect ไปที่ `/admin/dashboard`

---

## Mock Data

### Seller Accounts

**Seller 1** (Registered Individual Merchant):
- Phone: `0812345678`
- OTP: `123456`
- Organization: ร้านวัสดุก่อสร้างสมชาย
- Shop: `somchai.allkons.com`
- Branches: 2 (สำนักงานใหญ่, สาขา 1)

**Seller 2** (Legal Entity):
- Phone: `0823456789`
- OTP: `234567`
- Organization: บริษัทวัสดุก่อสร้าง จำกัด
- Shop: `construction-materials.allkons.com`
- Branches: 2 (สำนักงานใหญ่, สาขา 1)

### Admin Account

- Phone: `0834567890`
- OTP: `345678`

### Products (Mock)

- 4 products จาก 2 ร้าน
- แสดงใน Buyer Marketplace

---

## Project Structure

```
app/
├── app/
│   ├── (auth)/
│   │   └── login/          # Login page (OTP)
│   ├── (seller)/
│   │   └── dashboard/      # Seller Dashboard
│   ├── (buyer)/
│   │   └── marketplace/    # Buyer Marketplace (Guest Mode)
│   └── (admin)/
│       ├── login/          # Admin Login
│       └── dashboard/      # Admin Dashboard
├── lib/
│   └── supabase/
│       ├── client.ts       # Supabase client
│       ├── mock-otp.ts     # Mock OTP service
│       └── mock-data.ts    # Mock data
├── types/
│   └── index.ts            # TypeScript types
└── page.tsx                # Root (redirects to marketplace)
```

---

## Design System Usage

ใช้ design system variables ผ่าน `ds` object:

```tsx
import { ds } from "@/design-system";

// Spacing
padding: ds.spacing('8')
margin: ds.spacing('4')

// Colors
color: ds.color.text('primary')
backgroundColor: ds.color.background('secondary')

// Typography
fontSize: ds.typography.size('md')
fontWeight: ds.typography.weight('bold')

// Border Radius
borderRadius: ds.radius('md')
```

---

## Next Steps

1. ✅ Test Seller Login & Dashboard
2. ✅ Test Buyer Marketplace
3. ✅ Test Admin Login
4. ⚠️ Connect to Supabase (when ready)
5. ⚠️ Replace mock data with real API calls
6. ⚠️ Add more features

---

**Last Updated**: 2024
**Status**: ✅ Ready for Testing
