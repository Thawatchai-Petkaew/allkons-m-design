# Juristic Types Master Data Summary

## Executive Summary
สรุปการปรับปรุง Juristic Types ให้เข้ากับ Master SKU System และตัดส่วนที่ไม่เหมาะสม

**Status**: ✅ **Complete**

---

## การเปลี่ยนแปลง

### ✅ ตัดออก
- **PERSONAL** (บุคคลทั่วไป) - **ตัดออก** เพราะ:
  - Account = บุคคลธรรมดา (ไม่ใช่ juristic person)
  - Organization = นิติบุคคล (ต้องเป็น juristic person)
  - PERSONAL ไม่เหมาะสมสำหรับ organizations table

---

### ✅ เก็บไว้ (Master Data)

#### 1. REGISTERED_INDIVIDUAL
- **Code**: `REGISTERED_INDIVIDUAL`
- **Description TH**: ร้านค้าจดทะเบียนพาณิชย์
- **Description EN**: Registered Individual Merchant
- **Prefix TH**: NULL
- **Suffix TH**: NULL
- **ใช้สำหรับ**: บุคคลธรรมดาจดทะเบียนพาณิชย์ที่เป็น Seller/Organization

#### 2. PUBLIC_LIMITED_COMPANY
- **Code**: `PUBLIC_LIMITED_COMPANY`
- **Description TH**: บริษัทมหาชนจำกัด (บลจ.)
- **Description EN**: Public Company Limited (PLC)
- **Prefix TH**: บริษัท
- **Suffix TH**: จำกัด (มหาชน)
- **ใช้สำหรับ**: บริษัทมหาชนจำกัด

#### 3. LIMITED_COMPANY
- **Code**: `LIMITED_COMPANY`
- **Description TH**: บริษัทจำกัด (บลจ.)
- **Description EN**: Limited Company (Co., Ltd.)
- **Prefix TH**: บริษัท
- **Suffix TH**: จำกัด
- **ใช้สำหรับ**: บริษัทจำกัด

#### 4. LIMITED_PARTNERSHIP
- **Code**: `LIMITED_PARTNERSHIP`
- **Description TH**: ห้างหุ้นส่วนจำกัด (หจก.)
- **Description EN**: Limited Partnership (Ltd. P.)
- **Prefix TH**: ห้างหุ้นส่วนจำกัด
- **Suffix TH**: NULL
- **ใช้สำหรับ**: ห้างหุ้นส่วนจำกัด

#### 5. GENERAL_PARTNERSHIP
- **Code**: `GENERAL_PARTNERSHIP`
- **Description TH**: ห้างหุ้นส่วนสามัญ (หสม.)
- **Description EN**: Ordinary Partnership (O.P.)
- **Prefix TH**: ห้างหุ้นส่วนสามัญ
- **Suffix TH**: NULL
- **ใช้สำหรับ**: ห้างหุ้นส่วนสามัญ

#### 6. OTHER
- **Code**: `OTHER`
- **Description TH**: อื่นๆ
- **Description EN**: Other
- **Prefix TH**: NULL
- **Suffix TH**: NULL
- **ใช้สำหรับ**: กรณีพิเศษ

---

## Schema Changes

### ✅ เปลี่ยนจาก ENUM เป็น Lookup Table

**Before**:
```sql
CREATE TYPE juristic_type AS ENUM (
    'REGISTERED_INDIVIDUAL',
    'LIMITED_COMPANY',
    'PUBLIC_COMPANY'
);
```

**After**:
```sql
CREATE TABLE juristic_types (
    id UUID PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    prefix_th VARCHAR(255),
    suffix_th VARCHAR(255),
    description_th TEXT NOT NULL,
    prefix_en VARCHAR(255),
    suffix_en VARCHAR(255),
    description_en TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0
);
```

---

### ✅ Account Table

**Before**:
```sql
juristic_type juristic_type NOT NULL, -- ประเภทนิติบุคคล
```

**After**:
```sql
-- หมายเหตุ: Account ไม่ใช่ juristic person (เป็นบุคคลธรรมดา)
juristic_type_id UUID REFERENCES juristic_types(id) ON DELETE SET NULL, -- Optional
```

**เหตุผล**: Account = บุคคลธรรมดา ไม่จำเป็นต้องมี juristic_type (แต่เก็บไว้เป็น optional สำหรับกรณีพิเศษ)

---

### ✅ Organization Table

**Before**:
```sql
juristic_type juristic_type NOT NULL, -- ประเภทนิติบุคคล
```

**After**:
```sql
juristic_type_id UUID NOT NULL REFERENCES juristic_types(id) ON DELETE RESTRICT, -- Required
```

**เหตุผล**: Organization = นิติบุคคล ต้องมี juristic_type เสมอ

---

## การแสดงผลชื่อองค์กร

### ✅ Format การแสดงผล

**Full Name (TH)**:
```
{prefix_th} {juristic_name} {suffix_th}
```

**Example**:
- juristic_type: `LIMITED_COMPANY` (prefix_th: "บริษัท", suffix_th: "จำกัด")
- juristic_name: "วัสดุก่อสร้าง"
- **ผลลัพธ์**: "บริษัท วัสดุก่อสร้าง จำกัด"

---

## Master Data Benefits

### ✅ ข้อดี
1. **Centralized Management**: จัดการ Master Data ที่เดียว
2. **Display Format**: ใช้ prefix_th + suffix_th แสดงชื่อองค์กรที่ถูกต้อง
3. **Flexibility**: เพิ่ม/แก้ไข juristic types ได้ง่าย
4. **Internationalization**: รองรับ prefix_en, suffix_en สำหรับอนาคต
5. **Consistency**: ข้อมูลสอดคล้องกันทั้งระบบ

---

## Usage Example

### ✅ Query Organization with Full Name

```sql
SELECT 
    o.id,
    o.name,
    o.juristic_name,
    jt.prefix_th,
    jt.suffix_th,
    jt.description_th,
    -- Full name in Thai
    CONCAT(
        COALESCE(jt.prefix_th || ' ', ''),
        o.juristic_name,
        COALESCE(' ' || jt.suffix_th, '')
    ) AS full_name_th
FROM organizations o
JOIN juristic_types jt ON o.juristic_type_id = jt.id
WHERE o.id = '...';
```

---

## Seed Data

### ✅ Initial Data

```sql
INSERT INTO juristic_types (code, prefix_th, suffix_th, description_th, prefix_en, suffix_en, description_en, display_order) VALUES
('REGISTERED_INDIVIDUAL', NULL, NULL, 'ร้านค้าจดทะเบียนพาณิชย์', 'Registered Individual Merchant', NULL, 'Registered Individual Merchant', 1),
('PUBLIC_LIMITED_COMPANY', 'บริษัท', 'จำกัด (มหาชน)', 'บริษัทมหาชนจำกัด (บลจ.)', 'Public Company', 'Limited', 'Public Company Limited (PLC)', 2),
('LIMITED_COMPANY', 'บริษัท', 'จำกัด', 'บริษัทจำกัด (บลจ.)', 'Company', 'Limited', 'Limited Company (Co., Ltd.)', 3),
('LIMITED_PARTNERSHIP', 'ห้างหุ้นส่วนจำกัด', NULL, 'ห้างหุ้นส่วนจำกัด (หจก.)', 'Limited Partnership', NULL, 'Limited Partnership (Ltd. P.)', 4),
('GENERAL_PARTNERSHIP', 'ห้างหุ้นส่วนสามัญ', NULL, 'ห้างหุ้นส่วนสามัญ (หสม.)', 'Ordinary Partnership', NULL, 'Ordinary Partnership (O.P.)', 5),
('OTHER', NULL, NULL, 'อื่นๆ', 'Other', NULL, 'Other', 99);
```

---

## Migration Notes

### ⚠️ สำหรับ Existing Data

1. **Drop ENUM**: ต้อง drop `juristic_type` enum หลังจาก migrate data
2. **Migrate Data**: 
   - Map old enum values → new juristic_types.code
   - Update foreign keys
3. **Update Application Code**: เปลี่ยนจาก enum comparison เป็น lookup table query

---

**Last Updated**: 2024
**Status**: ✅ Ready for Implementation
