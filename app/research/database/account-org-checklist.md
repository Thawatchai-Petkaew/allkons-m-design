# Account & ORG Schema Checklist

## Executive Summary
Checklist สำหรับ Account และ ORG Schema ตามข้อมูลที่ให้มา

**Status**: ✅ **Complete**

---

## Account Table Fields

### ✅ Required Fields
- [x] **app_id** (string, required) - App ID ของระบบ
- [x] **allkons_id** (string | null) - รหัส Allkons ID
- [x] **customer_code** (string | null) - รหัสลูกค้า
- [x] **customer_profile_type** (number, required) - ประเภทโปรไฟล์ข้อมูล (PERSONAL)
- [x] **customer_status** (number, required) - สถานะความเป็นลูกค้า (VISITOR, CUSTOMER)
- [x] **juristic_name** (string, required) - ชื่อข้อมูล
- [x] **juristic_type** (number, required) - ประเภทนิติบุคคล (เพิ่ม REGISTERED_INDIVIDUAL)
- [x] **juristic_type_remark** (string | null) - หมายเหตุประเภทนิติบุคคล
- [x] **organize_type** (number, required) - ประเภทองค์กร (HEAD_OFFICE, BRANCH)
- [x] **tax_id** (string, required) - เลขประจำตัวผู้เสียภาษี
- [x] **branch_number** (string | null) - เลขสาขา
- [x] **contact_shown_highest_authority** (boolean, required) - สถานะว่าข้อมูลผู้ติดต่อ/รับมอบอำนาจเหมือนกับข้อมูลผู้มีอำนาจสูงสุด
- [x] **is_dopa** (boolean, required) - สถานะว่ามีการเช็คข้อมูลกับ DOPA แล้ว
- [x] **is_dbd** (boolean, required) - สถานะว่ามีการเช็คข้อมูลกับ DBD แล้ว
- [x] **kyc_status** (string, required) - สถานะการ KYC (NONE, WAIT_FOR_APPROVE, REQUEST_MORE, APPROVE, REJECT)
- [x] **active_status** (boolean | null) - สถานะเปิด/ปิดการใช้งานบัญชี
- [x] **highest_authority** (HighestAuthority | null) - ข้อมูลผู้มีอำนาจสูงสุด
- [x] **contact** (Contact | null) - ข้อมูลผู้ติดต่อ/ผู้รับมอบอำนาจ

---

## Enums Created

### ✅ Customer Status
- [x] VISITOR
- [x] CUSTOMER

### ✅ Customer Profile Type
- [x] PERSONAL

### ✅ Juristic Type (Master Data - Lookup Table)
- [x] **juristic_types** table created (Master Data)
- [x] REGISTERED_INDIVIDUAL (ร้านค้าจดทะเบียนพาณิชย์)
- [x] PUBLIC_LIMITED_COMPANY (บริษัทมหาชนจำกัด)
- [x] LIMITED_COMPANY (บริษัทจำกัด)
- [x] LIMITED_PARTNERSHIP (ห้างหุ้นส่วนจำกัด)
- [x] GENERAL_PARTNERSHIP (ห้างหุ้นส่วนสามัญ)
- [x] OTHER (อื่นๆ)
- [x] **ตัด PERSONAL ออก** (ไม่เหมาะสม - Account ไม่ใช่ juristic person)
- [x] Fields: code, prefix_th, suffix_th, description_th, prefix_en, suffix_en, description_en, is_active, display_order

### ✅ Organize Type
- [x] HEAD_OFFICE
- [x] BRANCH

### ✅ KYC Status
- [x] NONE
- [x] WAIT_FOR_APPROVE
- [x] REQUEST_MORE
- [x] APPROVE
- [x] REJECT

---

## Reference Tables

### ✅ HighestAuthority
- [x] **highest_authority** table created
- [x] Fields: first_name, last_name, id_card_number, passport_number, address, phone, email, etc.

### ✅ Contact
- [x] **contact** table created
- [x] Fields: first_name, last_name, id_card_number, passport_number, address, phone, email, position, is_authorized_person, etc.

---

## Organization (ORD) Table

### ✅ Fields
- [x] **allkons_org_id** - Allkons Organization ID
- [x] **organization_code** - Organization Code
- [x] **name** - ชื่อองค์กร
- [x] **juristic_name** - ชื่อนิติบุคคล
- [x] **juristic_type** - ประเภทนิติบุคคล
- [x] **organize_type** - ประเภทองค์กร
- [x] **tax_id** - เลขประจำตัวผู้เสียภาษี
- [x] **branch_number** - เลขสาขา
- [x] **business_registration_number** - เลขทะเบียนบริษัท
- [x] **contact_shown_highest_authority** - Flag
- [x] **is_dopa** - DOPA check flag
- [x] **is_dbd** - DBD check flag
- [x] **kyb_status** - KYB status (ใช้ enum เดียวกับ KYC)
- [x] **is_verified** - ORD Verified
- [x] **active_status** - Active status
- [x] **highest_authority_id** - Reference to highest_authority
- [x] **contact_id** - Reference to contact

---

## ERD Tables (from provided ERD)

### ✅ User Registration
- [x] **user_registration** table created
- [x] Fields: registration_type, registration_source, ip_address, user_agent

### ✅ User Attributes
- [x] **user_attributes** table created
- [x] Fields: attribute_key, attribute_value (key-value pairs)

### ✅ User Preferences
- [x] **user_preferences** table created
- [x] Fields: preference_key, preference_value (key-value pairs)

### ✅ KYC
- [x] **kyc** table created
- [x] Fields: document_type, document_number, document_expiry, verification_status, document_url

### ✅ User Organization
- [x] **user_organizations** table created
- [x] Fields: account_id, organization_id, role_in_org, joined_at

---

## Indexes

### ✅ Account Indexes
- [x] idx_accounts_user_id
- [x] idx_accounts_app_id
- [x] idx_accounts_allkons_id
- [x] idx_accounts_customer_code
- [x] idx_accounts_customer_status
- [x] idx_accounts_kyc_status
- [x] idx_accounts_tax_id
- [x] idx_accounts_active_status

### ✅ Organization Indexes
- [x] idx_organizations_account_id
- [x] idx_organizations_allkons_org_id
- [x] idx_organizations_organization_code
- [x] idx_organizations_tax_id
- [x] idx_organizations_kyb_status
- [x] idx_organizations_is_verified
- [x] idx_organizations_active_status

---

## Triggers

### ✅ Updated At Triggers
- [x] update_accounts_updated_at
- [x] update_organizations_updated_at
- [x] update_highest_authority_updated_at
- [x] update_contact_updated_at
- [x] update_user_registration_updated_at
- [x] update_user_attributes_updated_at
- [x] update_user_preferences_updated_at
- [x] update_kyc_updated_at
- [x] update_user_organizations_updated_at

---

## RLS Policies

### ✅ Basic RLS Policies
- [x] Users can view own account
- [x] Users can view own organizations
- [x] Users can view own KYC

---

## Progress

**Status**: ✅ **Complete**

**Tables Created**: 10 tables (เพิ่ม juristic_types)
- accounts
- organizations
- organization_profiles
- highest_authority
- contact
- user_registration
- user_attributes
- user_preferences
- kyc
- user_organizations

**Enums Created**: 4 enums (ลดลง 1 เพราะ juristic_type เปลี่ยนเป็น lookup table)
- customer_status
- customer_profile_type
- organize_type
- kyc_status

**Master Data Tables**: 1 table
- juristic_types (Master Data สำหรับแสดงชื่อองค์กร)

---

**Last Updated**: 2024
**Schema File**: `/app/research/database/account-org-schema.sql`
