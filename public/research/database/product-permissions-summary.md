# Product Module Permissions Summary

## Executive Summary
สรุป Product Module Permissions จาก Google Sheets สำหรับ Seller

**Source**: [Google Sheets - Permission](https://docs.google.com/spreadsheets/d/1d84we4IVJxmBog5TFCy3vTtgzcDatyIXLJzRw188C-4/edit?gid=0#gid=0)

**Status**: ✅ **Added to Schema**

---

## Permission Categories

### 1. Seller — Product Management (9 permissions)

#### Product List & Detail
- **SELLER_PRODUCT.VIEW_LIST** - มีสิทธิ์ดูรายชื่อสินค้า
  - Scope: Shop
  - UI: แสดงเมนู "สินค้า" + เข้าหน้า Product list ได้
  - API: `GET /seller/shops/{shopId}/products`
  - Notes: เป็น permission ขั้นต่ำของ Product feature

- **SELLER_PRODUCT.VIEW_DETAIL** - มีสิทธิ์ดูรายละเอียดสินค้า
  - Scope: Shop
  - UI: เปิดหน้า/Drawer รายละเอียดสินค้าได้
  - API: `GET /seller/shops/{shopId}/products/{id}`
  - Notes: แนะนำให้รวมกับ VIEW_LIST

#### Product Actions
- **SELLER_PRODUCT.ADD_FROM_MASTER** - มีสิทธิ์เพิ่มสินค้าจาก Master SKU
  - Scope: Shop
  - UI: ปุ่ม "เพิ่มสินค้าเข้าร้าน" / เลือกจาก Master SKU
  - API: `POST /seller/shops/{shopId}/products (payload=masterSkuId)`
  - Notes: ห้าม add แบบ manual item

- **SELLER_PRODUCT.EDIT_STORE_FIELDS** - มีสิทธิ์แก้ไขข้อมูลสินค้าฝั่งร้าน
  - Scope: Shop
  - UI: ปุ่ม/ไอคอน "แก้ไข"
  - API: `PATCH /seller/shops/{shopId}/products/{id}`
  - Notes: เฉพาะ field ฝั่งร้าน (เช่น status, remark, flags)

- **SELLER_PRODUCT.EDIT_PRICE** - มีสิทธิ์แก้ไขราคา
  - Scope: Shop
  - UI: แก้ราคา/ราคาพิเศษ/สอบถามราคา
  - API: `PATCH /seller/shops/{shopId}/products/{id}/price`
  - Notes: แนะนำแยกจาก edit ปกติเพื่อคุมความเสี่ยง

- **SELLER_PRODUCT.TOGGLE_ACTIVE** - มีสิทธิ์เปิด/ปิดการขาย
  - Scope: Shop
  - UI: Toggle "เปิดขาย/ปิดขาย"
  - API: `PATCH /seller/shops/{shopId}/products/{id}/status`
  - Notes: ถ้าปิดขาย = ไม่โชว์ใน buyer/market

- **SELLER_PRODUCT.DELETE** - มีสิทธิ์ลบสินค้า
  - Scope: Shop
  - UI: ไอคอนถังขยะ / "ลบที่เลือก"
  - API: `DELETE /seller/shops/{shopId}/products/{id}`
  - Notes: ลบจาก "ร้าน" ไม่กระทบ Master SKU

- **SELLER_PRODUCT.BULK_ACTION** - มีสิทธิ์จัดการสินค้าแบบ Bulk
  - Scope: Shop
  - UI: Bulk select + bulk toolbar
  - API: `PATCH/DELETE /seller/shops/{shopId}/products/bulk`
  - Notes: ถ้าไม่มี bulk ให้ fallback เป็นรายชิ้น

- **SELLER_PRODUCT.EXPORT** - มีสิทธิ์ Export สินค้า
  - Scope: Shop
  - UI: ปุ่ม Export/Download
  - API: `GET /seller/shops/{shopId}/products/export`
  - Notes: สำหรับทีมหลังบ้าน/แอดมินร้าน

---

### 2. Seller — Import Session (6 permissions)

#### Import Session Management
- **SELLER_IMPORT.VIEW_SESSIONS** - มีสิทธิ์ดูรายการ Import Session
  - Scope: Shop
  - UI: เมนู "นำเข้าสินค้า" + หน้า session list
  - API: `GET /seller/shops/{shopId}/imports`
  - Notes: ขั้นต่ำของ import feature

- **SELLER_IMPORT.CREATE_SESSION** - มีสิทธิ์สร้าง Import Session
  - Scope: Shop
  - UI: ปุ่ม "อัปโหลดไฟล์" / "เริ่มรอบนำเข้า"
  - API: `POST /seller/shops/{shopId}/imports`
  - Notes: สร้าง session ใหม่ (ตามไฟล์)

- **SELLER_IMPORT.CANCEL_MATCHING** - มีสิทธิ์ยกเลิกการจับคู่
  - Scope: Shop
  - UI: Action "ยกเลิกการจับคู่" (ระหว่างจับคู่)
  - API: `POST /seller/shops/{shopId}/imports/{sessionId}/cancel`
  - Notes: ใช้ได้เฉพาะ status = "กำลังจับคู่"

- **SELLER_IMPORT.DOWNLOAD_ORIGINAL** - มีสิทธิ์ดาวน์โหลดไฟล์ต้นฉบับ
  - Scope: Shop
  - UI: Action "ดาวน์โหลดไฟล์ต้นฉบับ"
  - API: `GET /seller/shops/{shopId}/imports/{sessionId}/file`

- **SELLER_IMPORT.DELETE_SESSION** - มีสิทธิ์ลบ Import Session
  - Scope: Shop
  - UI: Action "ลบรายการ"
  - API: `DELETE /seller/shops/{shopId}/imports/{sessionId}`
  - Notes: ควรกำหนดเงื่อนไขลบได้เฉพาะบาง status

- **SELLER_IMPORT.VIEW_REPORT** - มีสิทธิ์ดูรายงาน Import
  - Scope: Shop
  - UI: Action "ดูรายงาน/ดาวน์โหลดรายงาน"
  - API: `GET /seller/shops/{shopId}/imports/{sessionId}/report`
  - Notes: หลังนำเข้าเสร็จสิ้น

---

### 3. Manage Matching Result (6 permissions)

- **SELLER_IMPORT.MANAGE_RESULT** - มีสิทธิ์จัดการผลลัพธ์การจับคู่
  - Scope: Shop
  - UI: "จัดการผลลัพธ์การจับคู่" (หลัง matching)
  - API: `GET/PATCH /imports/{sessionId}/results`
  - Notes: สิทธิ์หลักของขั้นจัดการ

- **SELLER_IMPORT.EDIT_TEMPLATE_FIELDS** - มีสิทธิ์แก้ไข Template Fields
  - Scope: Shop
  - UI: แก้ราคา, ราคาพิเศษ, เปิด/ปิดขาย, สอบถามราคา
  - API: `PATCH /imports/{sessionId}/rows/{rowId}`
  - Notes: แก้ได้เฉพาะ field ที่กำหนด

- **SELLER_IMPORT.CONFIRM_NEAR_MATCH** - มีสิทธิ์ยืนยัน Near Match
  - Scope: Shop
  - UI: กด "ใช่/ไม่ใช่" สำหรับ near match
  - API: `POST /imports/{sessionId}/rows/{rowId}/confirm-match`
  - Notes: ถ้า "ไม่ใช่" ต้องส่ง reason

- **SELLER_IMPORT.SET_NOT_MATCH_REASON** - มีสิทธิ์ระบุเหตุผลที่ไม่ใช่
  - Scope: Shop
  - UI: ฟอร์ม "ระบุเหตุผลที่ไม่ใช่"
  - API: `POST /imports/{sessionId}/rows/{rowId}/not-match`
  - Notes: ตาม requirement ข้อ 4

- **SELLER_IMPORT.SUBMIT_FOR_ADMIN_REVIEW** - มีสิทธิ์ส่งให้ Admin ตรวจสอบ
  - Scope: Shop
  - UI: ส่งรายการ "ไม่พบ" ให้ MSKU Admin ตรวจ
  - API: `POST /imports/{sessionId}/submit-not-found`
  - Notes: สถานะ "รอแอดมินตรวจสอบ"

- **SELLER_IMPORT.MARK_DONE_MATCHING** - มีสิทธิ์ทำเครื่องหมายเสร็จสิ้นการจับคู่
  - Scope: Shop
  - UI: ปุ่ม "เสร็จสิ้นการจับคู่"
  - API: `POST /imports/{sessionId}/complete-matching`
  - Notes: "ยังไม่กด = session ยังทำงานอยู่" ตาม requirement

---

### 4. Import to Store Products (3 permissions)

- **SELLER_IMPORT.IMPORT_EXECUTE** - มีสิทธิ์นำเข้าสินค้า
  - Scope: Shop
  - UI: ปุ่ม "นำเข้าสินค้า"
  - API: `POST /imports/{sessionId}/import`
  - Notes: ใช้ได้เมื่อ "ผู้ใช้จัดการรายการครบก่อนนำเข้า"

- **SELLER_IMPORT.IMPORT_FINISH** - มีสิทธิ์เสร็จสิ้น Import Session
  - Scope: Shop
  - UI: ปุ่ม "เสร็จสิ้น" (จบ session)
  - API: `POST /imports/{sessionId}/finish`
  - Notes: เป็น end-of-session อย่างเป็นทางการ

- **SELLER_IMPORT.VIEW_IMPORTED_IN_STORE** - มีสิทธิ์ดูสินค้าที่นำเข้าแล้วในร้าน
  - Scope: Shop
  - UI: CTA "ไปยังสินค้าภายในร้านค้า"
  - API: `GET /shops/{shopId}/products?importSessionId=`
  - Notes: ช่วยปิด loop ให้ user

---

## Total Permissions

**Product Management**: 9 permissions
**Import Session**: 6 permissions
**Manage Matching Result**: 6 permissions
**Import Execution**: 3 permissions

**Total**: 24 permissions

---

## Default Role Assignments

### SELLER_PRODUCT_MANAGER
- ✅ All Product Management permissions (9)
- ✅ All Import Session permissions (15)
- **Total**: 24 permissions

### SELLER_ORDER_MANAGER
- ✅ View Product List & Detail only (2)
- ❌ No Import permissions
- **Total**: 2 permissions (view only)

### SELLER_VIEWER
- ✅ View Product List & Detail only (2)
- ❌ No Import permissions
- **Total**: 2 permissions (view only)

---

## Permission Matrix

| Permission | Product Manager | Order Manager | Viewer |
|------------|----------------|---------------|--------|
| VIEW_LIST | ✅ | ✅ | ✅ |
| VIEW_DETAIL | ✅ | ✅ | ✅ |
| ADD_FROM_MASTER | ✅ | ❌ | ❌ |
| EDIT_STORE_FIELDS | ✅ | ❌ | ❌ |
| EDIT_PRICE | ✅ | ❌ | ❌ |
| TOGGLE_ACTIVE | ✅ | ❌ | ❌ |
| DELETE | ✅ | ❌ | ❌ |
| BULK_ACTION | ✅ | ❌ | ❌ |
| EXPORT | ✅ | ❌ | ❌ |
| All Import Permissions | ✅ | ❌ | ❌ |

---

## Schema Updates

### ✅ Added to `/database/sql/role-permission-schema.sql`

1. **New Category**: `PRODUCT_IMPORT` (เพิ่มใน enum)
2. **24 New Permissions**: ทั้งหมดเป็น APPLICATION layer, SELLER type
3. **Default Role Assignments**: อัปเดตใน `/database/sql/role-permission-seed-data.sql`

---

## Next Steps

1. ✅ Run updated `/database/sql/role-permission-schema.sql`
2. ✅ Verify permissions created (24 new permissions)
3. ✅ Test default role assignments
4. ⚠️ Add more permissions for other modules (Order, PO, Invoice, etc.)

---

**Last Updated**: 2024
**Status**: ✅ Added to Schema
