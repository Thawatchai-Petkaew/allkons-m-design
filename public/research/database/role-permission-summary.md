# Role & Permission Schema Summary

## Executive Summary
สรุป Role & Permission Schema สำหรับ Allkons M - Two-Layer Permission System

**Status**: ✅ **Complete**

---

## Schema Files

1. **role-permission-schema.sql** - Main schema (tables, enums, indexes, RLS)
2. **role-permission-seed-data.sql** - Seed data และ functions สำหรับสร้าง default roles

---

## Two-Layer Permission System

### ✅ Layer 1: Organization Level (ORG)
- **Purpose**: จัดการใน ORG (Organization)
- **Roles**: ORG_OWNER, ORG_ADMIN, ORG_MEMBER (default) + Custom roles
- **Permissions**: จัดการข้อมูลองค์กร, สมาชิก, บทบาท, การเงิน, ร้านค้า/สาขา

### ✅ Layer 2: Application Level (APP)
- **Purpose**: ใช้งานใน app (Buyer/Seller)
- **Roles**: 
  - **Buyer**: BUYER_PURCHASER, BUYER_ADMIN, BUYER_VIEWER (default) + Custom roles
  - **Seller**: SELLER_PRODUCT_MANAGER, SELLER_ORDER_MANAGER, SELLER_VIEWER (default) + Custom roles
- **Permissions**: จัดการสินค้า, ออเดอร์, PO, Invoice, Reports (Phase 2+)

---

## Tables Created

### 1. Master Data

#### ✅ permissions
- **Purpose**: Master data สำหรับ permissions ทั้งหมด
- **Key Fields**:
  - `code` - Unique code (e.g., 'ORG_VIEW_LIST')
  - `name_th`, `name_en` - ชื่อสิทธิ์
  - `category` - หมวดหมู่ (ORGANIZATION_INFO, MEMBER_MANAGEMENT, etc.)
  - `action` - Action (VIEW, CREATE, UPDATE, DELETE)
  - `layer` - ORGANIZATION or APPLICATION
  - `application_type` - BUYER, SELLER, BOTH (สำหรับ APPLICATION layer)
  - `is_system` - System permission (ไม่สามารถลบได้)

**Seed Data**: 35+ permissions (Organization Level)

---

### 2. Organization Level Roles

#### ✅ org_roles
- **Purpose**: Organization Level Roles (Layer 1)
- **Key Fields**:
  - `organization_id` - Reference to organizations
  - `code` - Unique code (e.g., 'ORG_OWNER')
  - `name_th`, `name_en` - ชื่อบทบาท
  - `is_system` - System role (ORG_OWNER, ORG_ADMIN, ORG_MEMBER)
  - `is_default` - Default role สำหรับสมาชิกใหม่
  - `created_by` - Account ID ที่สร้าง role นี้

**Default Roles** (auto-created):
- ORG_OWNER - เจ้าขององค์กร (สิทธิ์เต็มรูปแบบ)
- ORG_ADMIN - ผู้ดูแลองค์กร (จัดการได้ แต่ไม่สามารถลบองค์กร)
- ORG_MEMBER - สมาชิกองค์กร (สิทธิ์พื้นฐาน - View only)

#### ✅ org_role_permissions
- **Purpose**: Many-to-many ระหว่าง org_roles และ permissions
- **Key Fields**:
  - `org_role_id` - Reference to org_roles
  - `permission_id` - Reference to permissions
  - `granted` - true = granted, false = denied

---

### 3. Application Level Roles

#### ✅ app_roles
- **Purpose**: Application Level Roles (Layer 2)
- **Key Fields**:
  - `organization_id` - Reference to organizations
  - `code` - Unique code (e.g., 'BUYER_PURCHASER')
  - `name_th`, `name_en` - ชื่อบทบาท
  - `application_type` - BUYER, SELLER, BOTH
  - `is_system` - System role
  - `is_default` - Default role สำหรับสมาชิกใหม่
  - `created_by` - Account ID ที่สร้าง role นี้

**Default Roles** (auto-created):

**Buyer**:
- BUYER_PURCHASER - ผู้ซื้อ (สร้างออเดอร์ได้)
- BUYER_ADMIN - ผู้ดูแลการซื้อ (จัดการ PO, Invoice, Reports)
- BUYER_VIEWER - ผู้ดูข้อมูล (Read-only)

**Seller**:
- SELLER_PRODUCT_MANAGER - ผู้จัดการสินค้า (จัดการสินค้าได้)
- SELLER_ORDER_MANAGER - ผู้จัดการออเดอร์ (จัดการออเดอร์ได้)
- SELLER_VIEWER - ผู้ดูข้อมูล (Read-only)

#### ✅ app_role_permissions
- **Purpose**: Many-to-many ระหว่าง app_roles และ permissions
- **Key Fields**:
  - `app_role_id` - Reference to app_roles
  - `permission_id` - Reference to permissions
  - `granted` - true = granted, false = denied

---

## Permission Categories

### ✅ Organization Level Permissions (35+ permissions)

1. **ข้อมูลองค์กร (ORGANIZATION_INFO)**
   - ORG_VIEW_LIST, ORG_VIEW_DETAIL, ORG_UPDATE_DETAIL, ORG_REQUEST_KYC

2. **จัดการสมาชิก (MEMBER_MANAGEMENT)**
   - MEMBER_VIEW_LIST, MEMBER_VIEW_DETAIL, MEMBER_UPDATE, MEMBER_INVITE, MEMBER_APPROVE_JOIN, MEMBER_REMOVE, MEMBER_APPROVE_LEAVE, MEMBER_BE_REMOVED, MEMBER_LEAVE

3. **บทบาทและสิทธิ์ (ROLE_PERMISSION)**
   - ROLE_VIEW_LIST, ROLE_VIEW_DETAIL, ROLE_CREATE, ROLE_UPDATE, ROLE_DELETE

4. **จัดการข้อมูลเบอร์องค์กร (ORGANIZATION_NUMBER)**
   - ORG_NUMBER_VIEW_LIST, ORG_NUMBER_VIEW_DETAIL, ORG_NUMBER_CREATE, ORG_NUMBER_DELETE

5. **การชำระเงิน (PAYMENT)**
   - PAYMENT_UPDATE_CHANNEL

6. **ข้อมูลบัญชีธนาคาร (BANK_ACCOUNT)**
   - BANK_ACCOUNT_VIEW_LIST, BANK_ACCOUNT_VIEW_DETAIL, BANK_ACCOUNT_CREATE, BANK_ACCOUNT_UPDATE, BANK_ACCOUNT_DELETE

7. **ข้อมูลบัญชีพร้อมเพย์ (PROMPTPAY_ACCOUNT)**
   - PROMPTPAY_VIEW_LIST, PROMPTPAY_VIEW_DETAIL, PROMPTPAY_CREATE, PROMPTPAY_UPDATE, PROMPTPAY_DELETE

8. **ร้านค้า/สาขา (STORE_BRANCH)**
   - STORE_MEMBER_ASSIGN, STORE_UPDATE, STORE_MEMBER_DELETE, STORE_VIEW_LIST, STORE_VIEW_DETAIL

### ✅ Application Level Permissions (Product Module)
- **PRODUCT**: 9 permissions (VIEW_LIST, VIEW_DETAIL, ADD_FROM_MASTER, EDIT_STORE_FIELDS, EDIT_PRICE, TOGGLE_ACTIVE, DELETE, BULK_ACTION, EXPORT)
- **PRODUCT_IMPORT**: 15 permissions (VIEW_SESSIONS, CREATE_SESSION, CANCEL_MATCHING, DOWNLOAD_ORIGINAL, DELETE_SESSION, VIEW_REPORT, MANAGE_RESULT, EDIT_TEMPLATE_FIELDS, CONFIRM_NEAR_MATCH, SET_NOT_MATCH_REASON, SUBMIT_FOR_ADMIN_REVIEW, MARK_DONE_MATCHING, IMPORT_EXECUTE, IMPORT_FINISH, VIEW_IMPORTED_IN_STORE)
- **Total**: 24 Product Module permissions

### ⚠️ Application Level Permissions (Other Modules - Phase 2+)
- ORDER, PO, INVOICE, REPORT permissions จะเพิ่มใน Phase 2+

---

## Functions Created

### ✅ create_default_org_roles(org_id, created_by_account_id)
- สร้าง default org roles (ORG_OWNER, ORG_ADMIN, ORG_MEMBER)
- Assign permissions ให้แต่ละ role

### ✅ create_default_buyer_app_roles(org_id, created_by_account_id)
- สร้าง default buyer app roles (BUYER_PURCHASER, BUYER_ADMIN, BUYER_VIEWER)

### ✅ create_default_seller_app_roles(org_id, created_by_account_id)
- สร้าง default seller app roles (SELLER_PRODUCT_MANAGER, SELLER_ORDER_MANAGER, SELLER_VIEWER)

### ✅ auto_create_default_roles()
- Trigger function ที่ auto-create default roles เมื่อสร้าง organization ใหม่

---

## Auto-Creation Flow

### ✅ เมื่อสร้าง Organization ใหม่

1. **Trigger**: `trigger_auto_create_default_roles` ทำงาน
2. **Function**: `auto_create_default_roles()` ถูกเรียก
3. **Actions**:
   - สร้าง default org roles (ORG_OWNER, ORG_ADMIN, ORG_MEMBER)
   - Assign permissions ให้แต่ละ role
   - App roles จะสร้างเมื่อ user กำหนดว่าเป็น Buyer หรือ Seller

---

## Custom Roles

### ✅ ผู้ใช้สามารถสร้าง Custom Roles ได้

**Organization Level**:
- สร้าง role ใหม่ใน `org_roles`
- Assign permissions ผ่าน `org_role_permissions`
- `is_system = false` สำหรับ custom roles

**Application Level**:
- สร้าง role ใหม่ใน `app_roles`
- Assign permissions ผ่าน `app_role_permissions`
- `is_system = false` สำหรับ custom roles

---

## Permission Matrix (Default)

### ✅ Organization Level

| Permission | ORG_OWNER | ORG_ADMIN | ORG_MEMBER |
|------------|-----------|-----------|------------|
| View Organization Info | ✅ | ✅ | ✅ |
| Update Organization Info | ✅ | ✅ | ❌ |
| Request KYC | ✅ | ✅ | ❌ |
| View Members | ✅ | ✅ | ✅ |
| Invite Members | ✅ | ✅ | ❌ |
| Remove Members | ✅ | ✅ | ❌ |
| Manage Roles | ✅ | ✅ | ❌ |
| Manage Financial | ✅ | ✅ | ❌ |
| Manage Store/Branch | ✅ | ✅ | ❌ |

---

## Usage Examples

### ✅ Query User Permissions

```sql
-- Get all permissions for a user in an organization
SELECT DISTINCT p.code, p.name_th, p.action, p.category
FROM permissions p
JOIN org_role_permissions orp ON p.id = orp.permission_id
JOIN org_roles or ON orp.org_role_id = or.id
JOIN user_organizations uo ON uo.organization_id = or.organization_id
WHERE uo.account_id = '...' 
    AND uo.organization_id = '...'
    AND orp.granted = true
    AND p.is_active = true;
```

### ✅ Create Custom Role

```sql
-- Create custom org role
INSERT INTO org_roles (organization_id, code, name_th, name_en, is_system, created_by)
VALUES (
    'org-id',
    'CUSTOM_ROLE',
    'บทบาทพิเศษ',
    'Custom Role',
    false,
    'account-id'
) RETURNING id;

-- Assign permissions to custom role
INSERT INTO org_role_permissions (org_role_id, permission_id, granted)
SELECT 'role-id', id, true
FROM permissions
WHERE code IN ('ORG_VIEW_LIST', 'MEMBER_VIEW_LIST', 'ROLE_VIEW_LIST');
```

---

## Next Steps

### Immediate
1. ✅ Run `/database/sql/role-permission-schema.sql`
2. ✅ Run `/database/sql/role-permission-seed-data.sql`
3. ✅ Test auto-creation of default roles

### Completed
1. ✅ Add Product Module Permissions (24 permissions)
2. ✅ Assign permissions to default app roles (SELLER_PRODUCT_MANAGER, SELLER_ORDER_MANAGER, SELLER_VIEWER)

### Future (Phase 2+)
1. ⚠️ Add more Application Level Permissions (ORDER, PO, INVOICE, REPORT)
2. ⚠️ Create permission checking functions
3. ⚠️ Add more RLS policies
4. ⚠️ Add Buyer permissions

---

**Last Updated**: 2024
**Status**: ✅ Ready for Setup
