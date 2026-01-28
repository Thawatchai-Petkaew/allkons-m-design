# Database Schema: Allkons M

## Executive Summary
Database Schema สำหรับ Allkons M Marketplace บน Supabase (PostgreSQL)

**Status**: ✅ **Ready for Setup**

---

## Files

### 1. [account-org-schema.sql](../../../database/sql/account-org-schema.sql) ✅ **MAIN SCHEMA**
**Status**: Account & ORG Schema Complete (พร้อมใช้งาน)

**Content**:
- Master Data: juristic_types lookup table
- Account table (ตาม schema specification)
- Organization (ORG) table (ตาม schema specification)
- Enums (Customer Status, Organize Type, KYC Status)
- Reference tables (HighestAuthority, Contact)
- ERD tables (user_registration, user_attributes, user_preferences, kyc, user_organizations)

---

### 2. [role-permission-schema.sql](../../../database/sql/role-permission-schema.sql) ✅ **NEW**
**Status**: Role & Permission Schema Complete (พร้อมใช้งาน)

**Content**:
- **Master Data**: permissions table (35+ Organization Level permissions)
- **Organization Level**: org_roles, org_role_permissions
- **Application Level**: app_roles, app_role_permissions
- **Enums**: permission_action, permission_category, role_layer, application_type
- **Updates**: user_organizations table (เพิ่ม org_role_id, app_role_id)

**Key Features**:
- ✅ Two-Layer Permission System
- ✅ Custom roles support
- ✅ Master data for permissions
- ✅ RLS policies

---

### 3. [role-permission-seed-data.sql](../../../database/sql/role-permission-seed-data.sql) ✅ **NEW**
**Status**: Seed Data & Functions Complete

**Content**:
- **Functions**: 
  - `create_default_org_roles()` - สร้าง default org roles
  - `create_default_buyer_app_roles()` - สร้าง default buyer app roles
  - `create_default_seller_app_roles()` - สร้าง default seller app roles
  - `auto_create_default_roles()` - Auto-create เมื่อสร้าง organization
- **Trigger**: `trigger_auto_create_default_roles` - Auto-create default roles

**Default Roles**:
- **ORG**: ORG_OWNER, ORG_ADMIN, ORG_MEMBER
- **Buyer APP**: BUYER_PURCHASER, BUYER_ADMIN, BUYER_VIEWER
- **Seller APP**: SELLER_PRODUCT_MANAGER, SELLER_ORDER_MANAGER, SELLER_VIEWER

---

### 4. [account-org-checklist.md](./account-org-checklist.md) ✅
**Status**: Account & ORG Schema Complete (พร้อมใช้งาน)

**Content**:
- **Master Data**: `juristic_types` lookup table (พร้อม prefix_th, suffix_th สำหรับแสดงชื่อองค์กร)
- **Account Table**: Account level (KYC status) - บุคคลธรรมดา
- **Organization Table**: ORG (KYB status) - นิติบุคคล
- **Enums**: Customer Status, Organize Type, KYC Status
- **Reference Tables**: HighestAuthority, Contact
- **ERD Tables**: user_registration, user_attributes, user_preferences, kyc, user_organizations

**Key Features**:
- ✅ All fields from provided schema specification
- ✅ All enums from provided specification
- ✅ ERD relationships implemented
- ✅ Indexes and constraints
- ✅ RLS policies (basic)
- ✅ Master Data (juristic_types) with seed data

---

### 2. [account-org-checklist.md](./account-org-checklist.md) ✅
**Status**: Checklist สำหรับ Account & ORG Schema

**Content**:
- Checklist ของ fields ทั้งหมด
- Enums และ Master Data
- Indexes, Triggers, RLS Policies
- Progress tracking

---

### 3. [account-org-summary.md](./account-org-summary.md) ✅
**Status**: Summary ของ Account & ORG Schema

**Content**:
- สรุป tables ที่สร้าง
- Relationships
- Key features
- Usage examples

---

### 4. [juristic-types-summary.md](./juristic-types-summary.md) ✅
**Status**: Summary of Juristic Types Master Data

**Content**:
- การเปลี่ยนแปลง (ตัด PERSONAL, เก็บ types ที่เหมาะสม)
- Schema changes (ENUM → Lookup Table)
- Usage examples (การแสดงผลชื่อองค์กร)
- Seed data

---

## Schema Overview

### Core Tables (Account & ORG)

**Master Data**:
- `juristic_types` - ประเภทนิติบุคคล (Master Data)

**Account & Organization**:
- `accounts` - Account level (KYC status) - บุคคลธรรมดา
- `organizations` - ORG (KYB status) - นิติบุคคล
- `organization_profiles` - Organization profile information
- `highest_authority` - ข้อมูลผู้มีอำนาจสูงสุด
- `contact` - ข้อมูลผู้ติดต่อ/ผู้รับมอบอำนาจ

**User Data**:
- `user_registration` - User registration details
- `user_attributes` - Custom user attributes (key-value pairs)
- `user_preferences` - User preferences (key-value pairs)
- `kyc` - KYC (Know Your Customer) data
- `user_organizations` - User-Organization relationship (many-to-many)

**Total Tables**: 10 tables

---

## Setup Instructions

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Wait for project to be ready

### 2. Run Schema (Order Matters!)
1. Open Supabase SQL Editor
2. **Step 1**: Copy content from `/database/sql/account-org-schema.sql` and run
3. **Step 2**: Copy content from `/database/sql/role-permission-schema.sql` and run
4. **Step 3**: Copy content from `/database/sql/role-permission-seed-data.sql` and run
5. Verify tables created:
   - `juristic_types` (Master Data - ควรมี 6 records)
   - `accounts`
   - `organizations`
   - `highest_authority`
   - `contact`
   - `user_registration`
   - `user_attributes`
   - `user_preferences`
   - `kyc`
   - `user_organizations`
   - `organization_profiles`
   - `permissions` (Master Data - ควรมี 35+ records)
   - `org_roles` (จะสร้างเมื่อมี organization)
   - `app_roles` (จะสร้างเมื่อมี organization)
   - `org_role_permissions`
   - `app_role_permissions`

### 3. Verify Master Data

**3.1 Juristic Types**
```sql
SELECT * FROM juristic_types ORDER BY display_order;
```
ควรมี 6 records:
- REGISTERED_INDIVIDUAL
- PUBLIC_LIMITED_COMPANY
- LIMITED_COMPANY
- LIMITED_PARTNERSHIP
- GENERAL_PARTNERSHIP
- OTHER

**3.2 Permissions**
```sql
SELECT category, COUNT(*) as count 
FROM permissions 
WHERE is_active = true 
GROUP BY category 
ORDER BY category;
```
ควรมี 35+ permissions (Organization Level)

### 4. Configure RLS (Optional)
- Review RLS policies in schema (basic policies already included)
- Add additional policies as needed
- Test access control

---

## Quick Start

1. **Setup**: ดู [SETUP.md](./SETUP.md) สำหรับคู่มือการ setup
2. **Schema Order**:
   - Step 1: `/database/sql/account-org-schema.sql` (Account & ORG)
   - Step 2: `/database/sql/role-permission-schema.sql` (Role & Permission)
   - Step 3: `/database/sql/role-permission-seed-data.sql` (Seed Data & Functions)
3. **Checklist**: ดู `account-org-checklist.md` สำหรับรายการตรวจสอบ
4. **Summary**: 
   - `account-org-summary.md` - Account & ORG
   - `role-permission-summary.md` - Role & Permission

---

**Last Updated**: 2024
