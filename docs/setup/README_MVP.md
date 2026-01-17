# MVP Implementation: Allkons M

## Executive Summary
MVP Implementation สำหรับ Allkons M - Seller Dashboard, Buyer Marketplace, Admin Login

**Status**: ✅ **Ready for Testing**

---

## Features Implemented

### ✅ 1. Seller Login & Dashboard

**Route**: `/app/(auth)/login` → `/seller/dashboard`

**Features**:
- OTP Login (Mock OTP service)
- Seller Dashboard แสดง:
  - ข้อมูลองค์กร (Organization)
  - ข้อมูลร้าน (Shop)
  - สาขา 2 แห่ง (สำนักงานใหญ่ + สาขา 1)

**Mock Data**:
- Seller 1: `0812345678` (Registered Individual Merchant)
- Seller 2: `0823456789` (Legal Entity)

---

### ✅ 2. Buyer Marketplace (Guest Mode)

**Route**: `/buyer/marketplace` หรือ `/` (root)

**Features**:
- Guest Mode (ไม่ต้อง login)
- แสดงสินค้าจากร้านต่างๆ
- Product Grid Layout
- แสดงข้อมูล: ชื่อสินค้า, ราคา, ร้าน, หมวดหมู่, สถานะสต็อก

**Mock Data**:
- 4 products จาก 2 ร้าน

---

### ✅ 3. Admin Login

**Route**: `/admin/login` → `/admin/dashboard`

**Features**:
- OTP Login (Mock OTP service)
- Admin Dashboard (placeholder)

**Mock Data**:
- Admin: `0834567890`

---

## Project Structure

```
app/
├── app/
│   ├── (auth)/
│   │   └── login/              # Login page (OTP)
│   ├── (seller)/
│   │   └── dashboard/           # Seller Dashboard
│   ├── (buyer)/
│   │   └── marketplace/         # Buyer Marketplace (Guest Mode)
│   └── (admin)/
│       ├── login/               # Admin Login
│       └── dashboard/           # Admin Dashboard
├── lib/
│   └── supabase/
│       ├── client.ts            # Supabase client
│       ├── mock-otp.ts          # Mock OTP service
│       └── mock-data.ts         # Mock data (2 Sellers, Products)
├── types/
│   └── index.ts                 # TypeScript types
└── page.tsx                     # Root (redirects to marketplace)
```

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

## Design System Usage

ทุกหน้าใช้ design system variables ผ่าน `ds` object:

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

## Testing Guide

### Test Seller Login

1. ไปที่ `/login` หรือ `/app/(auth)/login`
2. กรอกเบอร์โทรศัพท์: `0812345678` (Seller 1) หรือ `0823456789` (Seller 2)
3. กด "ส่งรหัส OTP"
4. กรอกรหัส OTP: `123456` (Seller 1) หรือ `234567` (Seller 2)
5. กด "ยืนยัน"
6. จะ redirect ไปที่ `/seller/dashboard`
7. ตรวจสอบว่าเห็น:
   - ข้อมูลองค์กร
   - ข้อมูลร้าน
   - สาขา 2 แห่ง

### Test Buyer Marketplace

1. ไปที่ `/buyer/marketplace` หรือ `/` (root)
2. ตรวจสอบว่าเห็นสินค้า 4 รายการ
3. ตรวจสอบว่าแต่ละสินค้ามี:
   - ชื่อสินค้า
   - ราคา
   - ชื่อร้าน
   - หมวดหมู่
   - สถานะสต็อก

### Test Admin Login

1. ไปที่ `/admin/login`
2. กรอกเบอร์โทรศัพท์: `0834567890`
3. กด "ส่งรหัส OTP"
4. กรอกรหัส OTP: `345678`
5. กด "ยืนยัน"
6. จะ redirect ไปที่ `/admin/dashboard`

---

## Dependencies Required

เพิ่มใน `package.json`:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x.x",
    "uuid": "^9.x.x"
  },
  "devDependencies": {
    "@types/uuid": "^9.x.x"
  }
}
```

**Note**: ถ้า network ไม่สามารถติดตั้งได้ ให้เพิ่มใน `package.json` แล้วรัน `npm install` ทีหลัง

---

## Environment Variables

สร้างไฟล์ `.env.local`:

```env
# Supabase (Optional for MVP - ใช้ mock data ก่อน)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Allkons M Design
```

---

## Next Steps

1. ✅ Test all pages
2. ⚠️ Connect to Supabase (when ready)
3. ⚠️ Replace mock data with real API calls
4. ⚠️ Add session management
5. ⚠️ Add more features

---

**Last Updated**: 2024
**Status**: ✅ Ready for Testing
