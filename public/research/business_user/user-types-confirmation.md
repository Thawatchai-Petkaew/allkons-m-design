# User Types Confirmation: Allkons M

## Executive Summary
สรุปประเภทผู้ใช้ (User Types) ในแต่ละ context (Buyer และ Seller)

**Status**: ✅ **Confirmed**

---

## Context: Buyer (ผู้ซื้อ)

### ✅ Buyer มี 3 แบบ

#### 1. บุคคลธรรมดา (Individual Consumer)
- **Registration**: ต้องลงทะเบียน + ระบุข้อมูลส่วนตัว (อาชีพ, ความสนใจ - optional)
- **KYC**: ต้องทำการ KYC ถึงจะสามารถซื้อสินค้าได้
- **Structure**: Account (KYC) → ORG → Shop → Branch
- **Permissions**: 
  - ซื้อสินค้าได้
  - ดูราคาแบบ B2C
  - ไม่มีสิทธิ์ดูราคา B2B
  - ไม่มีสิทธิ์ใช้ฟีเจอร์ B2B (PO, credit terms)
- **Personalization**: 
  - แสดงสินค้าแนะนำตามอาชีพ/ความสนใจ
  - แสดงเนื้อหาที่เกี่ยวข้อง (บทความ, tips)
- **Use Case**: ผู้ซื้อทั่วไป ซื้อวัสดุก่อสร้างสำหรับบ้านตัวเอง

---

#### 2. บุคคลธรรมดาจดทะเบียนพาณิชย์ (Registered Individual Merchant)
- **Registration**: ต้องลงทะเบียน + ยืนยันเอกสารพาณิชย์ + ระบุอาชีพ/กลุ่มธุรกิจ
- **KYC**: ต้อง KYC
- **Structure**: Account (KYC) → ORG → Shop → Branch
- **Permissions**:
  - ซื้อสินค้าได้
  - ดูราคาแบบ B2B (ถ้าได้รับการอนุมัติ)
  - ใช้ฟีเจอร์ B2B ได้ (PO, bulk pricing)
  - ไม่มีสิทธิ์ขายสินค้า
- **Personalization**:
  - แสดงสินค้าแนะนำตามอาชีพ/กลุ่มธุรกิจ (เช่น ช่างประปา → สินค้าประปา)
  - แสดงสินค้าที่ใช้บ่อยตามอาชีพ
  - แสดงเนื้อหาที่เกี่ยวข้อง (บทความ, tips สำหรับอาชีพ)
- **Use Case**: ช่างรับเหมา บุคคลที่รับงานก่อสร้าง

---

#### 3. นิติบุคคล (Legal Entity / Company)
- **Registration**: ต้องลงทะเบียน + ยืนยันเอกสารบริษัท + ระบุกลุ่มธุรกิจ/ประเภทบริษัท + KYC
- **KYC**: ต้อง KYC
- **Structure**: Account (KYC) → ORG (KYB) → Shop → Branch → Team Members
- **Permissions**:
  - สร้างหลาย ORG ได้ (1 Account → หลาย ORG)
  - ซื้อสินค้าได้
  - ดูราคาแบบ B2B (ถ้าได้รับการอนุมัติ)
  - ใช้ฟีเจอร์ B2B เต็มรูปแบบ (PO, credit terms, invoice)
  - ไม่มีสิทธิ์ขายสินค้า (ถ้าไม่ได้สมัครเป็น seller)
  - **Organization Management**: จัดการ ORG, Team Members, Role & Permissions, Financial
  - **Team Management**: เพิ่มสมาชิกทีมเข้า ORG เพื่อช่วยจัดการคำสั่งซื้อ
- **Personalization**:
  - แสดงสินค้าแนะนำตามกลุ่มธุรกิจ (เช่น บริษัทก่อสร้าง → สินค้าก่อสร้างทั้งหมด)
  - แสดงสินค้าที่ใช้บ่อยตามประเภทบริษัท
  - แสดงเนื้อหาที่เกี่ยวข้อง (บทความ, tips สำหรับธุรกิจ)
  - แสดงโปรโมชั่นที่เหมาะกับกลุ่มธุรกิจ
- **Use Case**: บริษัทก่อสร้าง, บริษัทพัฒนาอสังหาริมทรัพย์

---

## Context: Seller (ผู้ขาย)

### ✅ Seller มี 2 แบบ

#### 1. บุคคลธรรมดาจดทะเบียนพาณิชย์ (Registered Individual Merchant)
- **Registration**: ต้องลงทะเบียน + ยืนยันเอกสารพาณิชย์ + KYC
- **KYC**: ต้อง KYC
- **Structure**: Account (KYC) → ORG (KYB) → Shop → Branch
- **Permissions**:
  - สร้าง ORG (ต้องผ่าน KYB)
  - สร้าง Shop (1 Shop ต่อ 1 ORG)
  - สร้าง Branch (หลายสาขา)
  - ดึง Master SKU ไปใช้ได้
  - ปรับแต่งเนื้อหาสินค้าบางส่วนได้ (ราคา, คำอธิบาย)
  - จัดการสินค้าของตัวเอง (สินค้าแสดงใน Marketplace ตามสถานะ/กติกา)
  - จัดการออเดอร์
  - ดูรายงานการขาย
  - **Organization Management**: จัดการ ORG, Team Members, Role & Permissions
- **Use Case**: ช่างรับเหมาที่ขายวัสดุก่อสร้างเสริม

---

#### 2. นิติบุคคล (Legal Entity / Company)
- **Registration**: ต้องลงทะเบียน + ยืนยันเอกสารบริษัท + KYC
- **KYC**: ต้อง KYC
- **Structure**: Account (KYC) → ORG (KYB) → Shop → Branch
  - สามารถสร้างหลาย ORG ได้ (1 Account → หลาย ORG)
  - แต่ละ ORG สร้าง Shop ได้ 1 Shop
  - แต่ละ Shop สร้าง Branch ได้หลายสาขา
- **Permissions**:
  - สร้างหลาย ORG ได้ (1 Account → หลาย ORG)
  - แต่ละ ORG สร้าง Shop ได้ 1 Shop
  - แต่ละ Shop สร้าง Branch ได้หลายสาขา
  - ดึง Master SKU ไปใช้ได้
  - ปรับแต่งเนื้อหาสินค้าบางส่วนได้ (ราคา, คำอธิบาย)
  - จัดการสินค้าของตัวเอง (สินค้าแสดงใน Marketplace ตามสถานะ/กติกา)
  - จัดการออเดอร์ B2B และ B2C
  - ดูรายงานการขาย
  - ใช้ฟีเจอร์ B2B เต็มรูปแบบ
  - **Organization Management**: จัดการ ORG, Team Members, Role & Permissions, Financial
  - **Team Management**: เพิ่มสมาชิกทีมเข้า ORG และ Assign เข้า Shop
- **Use Case**: ผู้ขายวัสดุก่อสร้าง, ผู้จำหน่าย, ผู้ผลิต

---

## Summary Table

| Context | User Type | KYC Required | ORG Required | Shop Required | Branch Required |
|---------|-----------|--------------|--------------|---------------|-----------------|
| **Buyer** | บุคคลธรรมดา | ❌ | ✅ | ✅ | ✅ |
| **Buyer** | บุคคลธรรมดาจดทะเบียนพาณิชย์ | ✅ | ✅ | ✅ | ✅ |
| **Buyer** | นิติบุคคล | ✅ | ✅ | ✅ | ✅ |
| **Seller** | บุคคลธรรมดาจดทะเบียนพาณิชย์ | ✅ | ✅ | ✅ | ✅ (Optional) |
| **Seller** | นิติบุคคล | ✅ | ✅ | ✅ | ✅ (Optional) |

---

## Key Differences

### ✅ Buyer vs Seller

| Feature | Buyer | Seller |
|---------|-------|--------|
| **Shop** | ✅ มี (1 ORG = 1 Shop) | ✅ มี (1 ORG = 1 Shop) |
| **Branch** | ✅ มี (อย่างน้อย 1) | ✅ มี (หลายสาขา) |
| **Master SKU** | ❌ ไม่สามารถดึง | ✅ ดึงไปใช้ได้ |
| **Product Management** | ❌ ไม่มี | ✅ จัดการสินค้าได้ |
| **Order Management** | ✅ สร้างออเดอร์ | ✅ จัดการออเดอร์ |
| **Team Members** | ✅ มี (ใน ORG) | ✅ มี (ใน ORG + Shop) |

---

## Structure Comparison

### Buyer Structure

```
บุคคลธรรมดา:
Account (KYC) → ORG → Shop → Branch

บุคคลธรรมดาจดทะเบียนพาณิชย์:
Account (KYC) → ORG → Shop → Branch

นิติบุคคล:
Account (KYC) → ORG (KYB) → Shop → Branch → Team Members
```

### Seller Structure

```
บุคคลธรรมดาจดทะเบียนพาณิชย์:
Account (KYC) → ORG (KYB) → Shop → Branch (Optional)

นิติบุคคล:
Account (KYC) → ORG (KYB) → Shop → Branch (Optional)
  └── (สามารถมีหลาย ORG)
      └── แต่ละ ORG → Shop → Branch
```

---

## Registration Flow

### Buyer Registration

1. **บุคคลธรรมดา**:
   - ลงทะเบียน → กรอกข้อมูลส่วนตัว (optional) → ใช้งานได้

2. **บุคคลธรรมดาจดทะเบียนพาณิชย์**:
   - ลงทะเบียน → อัปโหลดเอกสารพาณิชย์ → KYC → ใช้งานได้

3. **นิติบุคคล**:
   - ลงทะเบียน → สร้าง ORG → อัปโหลดเอกสารบริษัท → KYC → KYB → ใช้งานได้

### Seller Registration

1. **บุคคลธรรมดาจดทะเบียนพาณิชย์**:
   - ลงทะเบียน → อัปโหลดเอกสารพาณิชย์ → KYC → สร้าง ORG → อัปโหลดเอกสาร → KYB → สร้าง Shop → ใช้งานได้

2. **นิติบุคคล**:
   - ลงทะเบียน → สร้าง ORG → อัปโหลดเอกสารบริษัท → KYC → KYB → สร้าง Shop → ใช้งานได้

---

## Confirmation

### ✅ Buyer: 3 แบบ
1. ✅ บุคคลธรรมดา (Individual Consumer)
2. ✅ บุคคลธรรมดาจดทะเบียนพาณิชย์ (Registered Individual Merchant)
3. ✅ นิติบุคคล (Legal Entity / Company)

### ✅ Seller: 2 แบบ
1. ✅ บุคคลธรรมดาจดทะเบียนพาณิชย์ (Registered Individual Merchant)
2. ✅ นิติบุคคล (Legal Entity / Company)

---

**Last Updated**: 2024
**Status**: ✅ Confirmed
