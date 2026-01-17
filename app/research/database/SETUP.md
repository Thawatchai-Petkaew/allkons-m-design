# Setup Guide: Account & ORG Schema

## Executive Summary
คู่มือการ Setup Account & ORG Schema สำหรับ Allkons M

**Status**: ✅ **Ready for Setup**

---

## Prerequisites

1. **Supabase Account**: มีบัญชี Supabase (https://supabase.com)
2. **Supabase Project**: สร้าง project ใหม่หรือใช้ project ที่มีอยู่
3. **SQL Editor Access**: เข้าถึง Supabase SQL Editor

---

## Step 1: Create Supabase Project

1. ไปที่ https://supabase.com
2. Sign in หรือ Sign up
3. คลิก "New Project"
4. กรอกข้อมูล:
   - **Project Name**: `allkons-m` (หรือชื่อที่ต้องการ)
   - **Database Password**: ตั้งรหัสผ่านที่แข็งแรง
   - **Region**: เลือก region ที่ใกล้ที่สุด (แนะนำ: Southeast Asia)
5. รอให้ project สร้างเสร็จ (ประมาณ 2-3 นาที)

---

## Step 2: Run Schema

### 2.1 Open SQL Editor

1. ใน Supabase Dashboard
2. ไปที่ **SQL Editor** (เมนูซ้าย)
3. คลิก **New Query**

### 2.2 Copy & Run Schema (Order Matters!)

**Step 1: Account & ORG Schema**
1. เปิดไฟล์ `account-org-schema.sql`
2. Copy ทั้งหมด (Ctrl+A, Ctrl+C)
3. Paste ลงใน SQL Editor
4. คลิก **Run** หรือกด `Ctrl+Enter`
5. รอให้ script รันเสร็จ (ประมาณ 10-30 วินาที)

**Step 2: Role & Permission Schema**
1. เปิดไฟล์ `role-permission-schema.sql`
2. Copy ทั้งหมด
3. Paste ลงใน SQL Editor (New Query)
4. คลิก **Run**
5. รอให้ script รันเสร็จ

**Step 3: Seed Data & Functions**
1. เปิดไฟล์ `role-permission-seed-data.sql`
2. Copy ทั้งหมด
3. Paste ลงใน SQL Editor (New Query)
4. คลิก **Run**
5. รอให้ script รันเสร็จ

### 2.3 Verify Execution

ตรวจสอบว่าไม่มี error:
- ✅ ควรเห็น "Success. No rows returned"
- ❌ ถ้ามี error ให้อ่าน error message และแก้ไข

---

## Step 3: Verify Tables

### 3.1 Check Tables Created

รัน query นี้ใน SQL Editor:

```sql
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_name IN (
        'juristic_types',
        'accounts',
        'organizations',
        'organization_profiles',
        'highest_authority',
        'contact',
        'user_registration',
        'user_attributes',
        'user_preferences',
        'kyc',
        'user_organizations'
    )
ORDER BY table_name;
```

**Expected Result**: ควรเห็น 11 tables

### 3.2 Check Master Data

**3.2.1 Juristic Types**

รัน query นี้:

```sql
SELECT 
    code,
    prefix_th,
    suffix_th,
    description_th,
    is_active,
    display_order
FROM juristic_types
ORDER BY display_order;
```

**Expected Result**: ควรเห็น 6 records:
1. REGISTERED_INDIVIDUAL
2. PUBLIC_LIMITED_COMPANY
3. LIMITED_COMPANY
4. LIMITED_PARTNERSHIP
5. GENERAL_PARTNERSHIP
6. OTHER

**3.2.2 Permissions**
```sql
SELECT category, COUNT(*) as count 
FROM permissions 
WHERE is_active = true 
GROUP BY category 
ORDER BY category;
```

**Expected Result**: ควรเห็น 8 categories:
- ORGANIZATION_INFO
- MEMBER_MANAGEMENT
- ROLE_PERMISSION
- ORGANIZATION_NUMBER
- PAYMENT
- BANK_ACCOUNT
- PROMPTPAY_ACCOUNT
- STORE_BRANCH

**Total**: 35+ permissions

---

## Step 4: Verify Enums

### 4.1 Check Enums Created

```sql
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN (
    'customer_status',
    'customer_profile_type',
    'organize_type',
    'kyc_status'
)
ORDER BY t.typname, e.enumsortorder;
```

**Expected Result**: ควรเห็น enums:
- `customer_status`: VISITOR, CUSTOMER
- `customer_profile_type`: PERSONAL
- `organize_type`: HEAD_OFFICE, BRANCH
- `kyc_status`: NONE, WAIT_FOR_APPROVE, REQUEST_MORE, APPROVE, REJECT

---

## Step 5: Test Basic Queries

### 5.1 Test Master Data Query

```sql
-- Get juristic type by code
SELECT * FROM juristic_types WHERE code = 'LIMITED_COMPANY';
```

### 5.2 Test Account Structure

```sql
-- Check account table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'accounts'
ORDER BY ordinal_position;
```

### 5.3 Test Organization Structure

```sql
-- Check organization table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'organizations'
ORDER BY ordinal_position;
```

---

## Step 6: Verify RLS Policies

### 6.1 Check RLS Enabled

```sql
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
    AND tablename IN (
        'juristic_types',
        'accounts',
        'organizations',
        'kyc',
        'user_organizations'
    );
```

**Expected Result**: `rowsecurity` ควรเป็น `true` สำหรับทุก table

### 6.2 Check Policies Created

```sql
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

**Expected Result**: ควรเห็น policies:
- `juristic_types`: "Juristic types are publicly readable"
- `accounts`: "Users can view own account"
- `organizations`: "Users can view own organizations"
- `kyc`: "Users can view own KYC"

---

## Step 7: Test Insert (Optional)

### 7.1 Test Insert Account (Requires auth.users)

```sql
-- Note: ต้องมี auth.users record ก่อน
-- ตัวอย่าง (ต้องแก้ไข user_id ให้ตรงกับ auth.users.id จริง)
INSERT INTO accounts (
    user_id,
    app_id,
    customer_profile_type,
    customer_status,
    juristic_name,
    organize_type,
    tax_id,
    kyc_status
) VALUES (
    '00000000-0000-0000-0000-000000000000'::uuid, -- แก้ไขเป็น user_id จริง
    'allkons-m',
    'PERSONAL',
    'VISITOR',
    'Test Account',
    'HEAD_OFFICE',
    '1234567890123',
    'NONE'
);
```

### 7.2 Test Insert Organization

```sql
-- Note: ต้องมี account_id ก่อน
-- ตัวอย่าง (ต้องแก้ไข account_id ให้ตรงกับ accounts.id จริง)
INSERT INTO organizations (
    account_id,
    name,
    juristic_name,
    juristic_type_id,
    organize_type,
    tax_id,
    kyb_status
) VALUES (
    '00000000-0000-0000-0000-000000000000'::uuid, -- แก้ไขเป็น account_id จริง
    'Test Organization',
    'Test Organization Name',
    (SELECT id FROM juristic_types WHERE code = 'LIMITED_COMPANY'),
    'HEAD_OFFICE',
    '1234567890123',
    'NONE'
);
```

---

## Troubleshooting

### Error: "relation already exists"
**Solution**: Table ถูกสร้างแล้ว อาจจะต้อง drop table ก่อน:
```sql
DROP TABLE IF EXISTS table_name CASCADE;
```

### Error: "type already exists"
**Solution**: Enum ถูกสร้างแล้ว อาจจะต้อง drop type ก่อน:
```sql
DROP TYPE IF EXISTS type_name CASCADE;
```

### Error: "permission denied"
**Solution**: ตรวจสอบว่าใช้ Supabase SQL Editor (ไม่ใช่ client connection)

### Master Data ไม่ครบ
**Solution**: รัน INSERT statements ใน `account-org-schema.sql` อีกครั้ง:
```sql
INSERT INTO juristic_types (...) VALUES (...);
```

---

## Next Steps

### Immediate
1. ✅ Verify all tables created
2. ✅ Verify master data
3. ✅ Test basic queries

### Future
1. ⚠️ Add more RLS policies (if needed)
2. ⚠️ Create test data
3. ⚠️ Setup authentication (Supabase Auth)
4. ⚠️ Add more tables (Product, Order, Payment, etc.)

---

## Support

ถ้ามีปัญหา:
1. ตรวจสอบ error message ใน SQL Editor
2. ดู documentation ใน `account-org-summary.md`
3. ตรวจสอบ checklist ใน `account-org-checklist.md`

---

**Last Updated**: 2024
**Status**: ✅ Ready for Setup
