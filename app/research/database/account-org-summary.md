# Account & ORG Schema Summary

## Executive Summary
สรุป Account และ ORG Schema ที่สร้างตามข้อมูลที่ให้มา

**Status**: ✅ **Complete**

---

## Schema File

**Location**: `/app/research/database/account-org-schema.sql`

---

## Tables Created

### 0. Master Data: Juristic Types ✅

**Table**: `juristic_types`

**Purpose**: Master Data สำหรับประเภทนิติบุคคล ใช้สำหรับแสดงชื่อองค์กรที่ถูกต้องตามกฎหมาย

**Fields**:
- `code` - Unique code (REGISTERED_INDIVIDUAL, LIMITED_COMPANY, etc.)
- `prefix_th` - คำนำหน้าภาษาไทย (เช่น "บริษัท")
- `suffix_th` - คำต่อท้ายภาษาไทย (เช่น "จำกัด")
- `description_th` - คำอธิบายภาษาไทย
- `prefix_en`, `suffix_en`, `description_en` - สำหรับอนาคต (multi-language)
- `is_active` - สถานะใช้งาน
- `display_order` - ลำดับการแสดงผล

**Seed Data**:
- REGISTERED_INDIVIDUAL (ร้านค้าจดทะเบียนพาณิชย์)
- PUBLIC_LIMITED_COMPANY (บริษัทมหาชนจำกัด)
- LIMITED_COMPANY (บริษัทจำกัด)
- LIMITED_PARTNERSHIP (ห้างหุ้นส่วนจำกัด)
- GENERAL_PARTNERSHIP (ห้างหุ้นส่วนสามัญ)
- OTHER (อื่นๆ)

**หมายเหตุ**: ตัด PERSONAL ออกเพราะ Account ไม่ใช่ juristic person

---

### 1. Account Table ✅

**Table**: `accounts`

**Fields** (ตาม schema ที่ให้มา):
- `app_id` (string, required) - App ID ของระบบ
- `allkons_id` (string | null) - รหัส Allkons ID
- `customer_code` (string | null) - รหัสลูกค้า
- `customer_profile_type` (enum, required) - ประเภทโปรไฟล์ข้อมูล (PERSONAL)
- `customer_status` (enum, required) - สถานะความเป็นลูกค้า (VISITOR, CUSTOMER)
- `juristic_name` (string, optional) - ชื่อข้อมูล (ถ้ามี)
- `juristic_type_id` (UUID, optional) - Reference to juristic_types (Optional เพราะ Account ไม่ใช่ juristic person)
- `juristic_type_remark` (string | null) - หมายเหตุประเภทนิติบุคคล
- `organize_type` (enum, required) - ประเภทองค์กร (HEAD_OFFICE, BRANCH)
- `tax_id` (string, required) - เลขประจำตัวผู้เสียภาษี
- `branch_number` (string | null) - เลขสาขา
- `contact_shown_highest_authority` (boolean, required) - สถานะว่าข้อมูลผู้ติดต่อ/รับมอบอำนาจเหมือนกับข้อมูลผู้มีอำนาจสูงสุด
- `is_dopa` (boolean, required) - สถานะว่ามีการเช็คข้อมูลกับ DOPA แล้ว
- `is_dbd` (boolean, required) - สถานะว่ามีการเช็คข้อมูลกับ DBD แล้ว
- `kyc_status` (enum, required) - สถานะการ KYC (NONE, WAIT_FOR_APPROVE, REQUEST_MORE, APPROVE, REJECT)
- `active_status` (boolean | null) - สถานะเปิด/ปิดการใช้งานบัญชี
- `highest_authority_id` (UUID | null) - Reference to highest_authority
- `contact_id` (UUID | null) - Reference to contact

---

### 2. Organization (ORD) Table ✅

**Table**: `organizations`

**Fields** (ตาม schema ที่ให้มา):
- `allkons_org_id` (string | null) - Allkons Organization ID
- `organization_code` (string | null) - Organization Code
- `name` (string, required) - ชื่อองค์กร
- `juristic_name` (string, required) - ชื่อนิติบุคคล (ชื่อองค์กร)
- `juristic_type_id` (UUID, required) - Reference to juristic_types (Required เพราะ Organization = นิติบุคคล)
- `organize_type` (enum, required) - ประเภทองค์กร (HEAD_OFFICE, BRANCH)
- `tax_id` (string, required) - เลขประจำตัวผู้เสียภาษี
- `branch_number` (string | null) - เลขสาขา
- `business_registration_number` (string) - เลขทะเบียนบริษัท
- `contact_shown_highest_authority` (boolean, required)
- `is_dopa` (boolean, required)
- `is_dbd` (boolean, required)
- `kyb_status` (enum, required) - ใช้ enum เดียวกับ KYC
- `is_verified` (boolean) - ORD Verified
- `active_status` (boolean | null)
- `highest_authority_id` (UUID | null)
- `contact_id` (UUID | null)

---

### 3. Reference Tables ✅

#### 3.1 Highest Authority
**Table**: `highest_authority`
- first_name, last_name
- id_card_number, passport_number
- date_of_birth, nationality
- address (line1, line2, city, province, postal_code, country)
- phone_number, email

#### 3.2 Contact
**Table**: `contact`
- first_name, last_name
- id_card_number, passport_number
- date_of_birth, nationality
- address (line1, line2, city, province, postal_code, country)
- phone_number, email
- position, is_authorized_person

---

### 4. ERD Tables ✅

#### 4.1 User Registration
**Table**: `user_registration`
- registration_type (email_password, oauth_google, oauth_facebook, etc.)
- registration_source
- ip_address, user_agent

#### 4.2 User Attributes
**Table**: `user_attributes`
- attribute_key, attribute_value (key-value pairs)

#### 4.3 User Preferences
**Table**: `user_preferences`
- preference_key, preference_value (key-value pairs)

#### 4.4 KYC
**Table**: `kyc`
- document_type (id_card, passport, driver_license)
- document_number, document_expiry
- verification_status (ใช้ enum เดียวกับ kyc_status)
- document_url

#### 4.5 User Organization
**Table**: `user_organizations`
- account_id, organization_id
- role_in_org (owner, admin, member)
- joined_at

---

## Master Data

### ✅ Juristic Types (Lookup Table)
- เปลี่ยนจาก ENUM เป็น Lookup Table เพื่อรองรับ prefix_th, suffix_th
- ใช้สำหรับแสดงชื่อองค์กรที่ถูกต้องตามกฎหมาย
- รองรับ multi-language (prefix_en, suffix_en)

---

## Enums Created

### ✅ Customer Status
```sql
CREATE TYPE customer_status AS ENUM (
    'VISITOR',
    'CUSTOMER'
);
```

### ✅ Customer Profile Type
```sql
CREATE TYPE customer_profile_type AS ENUM (
    'PERSONAL'
);
```

### ⚠️ Juristic Type
**เปลี่ยนเป็น Lookup Table** (`juristic_types`) แทน ENUM เพื่อรองรับ prefix_th, suffix_th

### ✅ Organize Type
```sql
CREATE TYPE organize_type AS ENUM (
    'HEAD_OFFICE',
    'BRANCH'
);
```

### ✅ KYC Status
```sql
CREATE TYPE kyc_status AS ENUM (
    'NONE',
    'WAIT_FOR_APPROVE',
    'REQUEST_MORE',
    'APPROVE',
    'REJECT'
);
```

---

## Relationships

### ✅ Account Relationships
- `accounts.user_id` → `auth.users.id` (1:1)
- `accounts.highest_authority_id` → `highest_authority.id` (many:1)
- `accounts.contact_id` → `contact.id` (many:1)
- `accounts.juristic_type_id` → `juristic_types.id` (many:1, optional)

### ✅ Organization Relationships
- `organizations.account_id` → `accounts.id` (many:1)
- `organizations.juristic_type_id` → `juristic_types.id` (many:1, required)
- `organizations.highest_authority_id` → `highest_authority.id` (many:1)
- `organizations.contact_id` → `contact.id` (many:1)

### ✅ User Organization (Many-to-Many)
- `user_organizations.account_id` → `accounts.id` (many:1)
- `user_organizations.organization_id` → `organizations.id` (many:1)

---

## Key Features

### ✅ Implemented
- Account table ตาม schema ที่ให้มา
- Organization table ตาม schema ที่ให้มา
- Enums ครบถ้วน (Customer Status, Organize Type, KYC Status, Juristic Type)
- Reference tables (HighestAuthority, Contact)
- ERD tables (user_registration, user_attributes, user_preferences, kyc, user_organizations)
- Indexes สำหรับ performance
- Triggers สำหรับ updated_at
- Basic RLS policies

---

## Next Steps

1. ✅ Review schema
2. ⚠️ Test in Supabase
3. ⚠️ Add more RLS policies (if needed)
4. ⚠️ Add validation constraints
5. ⚠️ Create seed data (optional)

---

**Last Updated**: 2024
**Status**: ✅ Ready for Testing
