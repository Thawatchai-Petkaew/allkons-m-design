# Product Module: Detailed Requirements

## Executive Summary
เอกสารนี้อธิบาย Product Module โดยละเอียดตาม Miro Board โดยแบ่งเป็น Buyer Perspective และ Seller Perspective

---

## 1. Buyer Perspective - Product Module

### 1.1 Search (Elastic1)

#### 1.1.1 Search Criteria
- **Product Name**: ค้นหาตามชื่อสินค้า
- **Merchant Name**: ค้นหาตามชื่อผู้ขาย
- **All Product**: ค้นหาทุกสินค้า
- **Product Brand**: ค้นหาตามแบรนด์สินค้า

#### 1.1.2 Sort Options
- **Price**: เรียงตามราคา (ต่ำ-สูง, สูง-ต่ำ)
- **Name**: เรียงตามชื่อ (A-Z, Z-A)

---

### 1.2 Merchant

#### 1.2.1 Catalog
- **Custom Catalog**: แคตตาล็อกที่ปรับแต่งเอง
- **จัดสินค้าเข้าหมวดหมู่ที่คุณอาจสนใจ (อิงตาม shopdit)**: 
  - Personalization feature
  - จัดหมวดหมู่สินค้าตามความสนใจของผู้ซื้อ
  - อิงตามข้อมูลจาก shopdit (personalization engine)

#### 1.2.2 Category
- **System Category**: หมวดหมู่ระบบ (Master SKU categories)
- **Custom Category**: หมวดหมู่ที่ปรับแต่งเอง (Personalized categories)

#### 1.2.3 Location
- **Near User**: ผู้ขายที่อยู่ใกล้ผู้ใช้ (Location-based)
- **Regular Shop**: ร้านที่ซื้อบ่อย (Preferred merchants)

#### 1.2.4 Product All
- ดูสินค้าทั้งหมดจากผู้ขาย

---

### 1.3 Cart

#### 1.3.1 Cart Actions
- **Add**: เพิ่มสินค้าลงตะกร้า
- **Delete**: ลบสินค้าออกจากตะกร้า
- **Update (quantity)**: อัปเดตจำนวนสินค้า

---

### 1.4 Buy Product

#### 1.4.1 Promotion (Promotion Center)
- **Customer Group**: โปรโมชั่นตามกลุ่มลูกค้า (Personalization)
- **Discount**: ส่วนลด
- **Special Price**: ราคาพิเศษ

#### 1.4.2 Price
- **Base Price**: ราคาพื้นฐาน

---

### 1.5 Delivery

#### 1.5.1 Delivery Types
- **Single**: จัดส่งครั้งเดียว (จากผู้ขายเดียว)
- **Multiple**: จัดส่งหลายครั้ง (จากหลายผู้ขาย)

---

### 1.6 Export

#### 1.6.1 Export Types
- **Invoice**: ส่งออกใบแจ้งหนี้
- **BOQ (Bill of Quantity)**: ส่งออก BOQ

---

## 2. Seller Perspective - Manage Product

### 2.1 View Product (in branch)

#### 2.1.1 View Product All
- **On Web**: ดูบนเว็บ
- **Export Excel (Product)**: ส่งออกเป็น Excel

#### 2.1.2 View Product Detail
- ดูรายละเอียดสินค้า

---

### 2.2 Add Product (in branch)

#### 2.2.1 Add Locations
- **At Head Office**: เพิ่มที่สำนักงานใหญ่
- **At Sub-branch**: เพิ่มที่สาขาย่อย
  - **Link to Head Office**: เชื่อมโยงกับสำนักงานใหญ่

---

### 2.3 Edit Product

#### 2.3.1 Editable Fields
- **Name**: ชื่อสินค้า
- **Description**: คำอธิบายสินค้า
- **Picture**: รูปภาพสินค้า
  - **Not Edit Old Picture**: ไม่สามารถแก้ไขรูปเก่า
  - **Can Add New Picture**: สามารถเพิ่มรูปใหม่ได้
- **Manage Catalog (aline shopdit)**: จัดการแคตตาล็อก (เชื่อมโยงกับ shopdit)

---

### 2.4 Delete Product

#### 2.4.1 Delete Locations
- **At Head Office**: ลบที่สำนักงานใหญ่
- **At Sub-branch**: ลบที่สาขาย่อย

---

### 2.5 Set Price

#### 2.5.1 Base Price
- **Set Only Head Office**: ตั้งราคาพื้นฐานได้เฉพาะที่สำนักงานใหญ่
- **In VAT**: ราคารวม VAT
- **Ex VAT**: ราคาไม่รวม VAT

#### 2.5.2 Promotion Price
- **Customer Group**: ตั้งราคาตามกลุ่มลูกค้า
  - **Set Customer Group**: กำหนดกลุ่มลูกค้า
- **Special Price**: ราคาพิเศษ
  - **At Head Office**: ตั้งที่สำนักงานใหญ่
  - **At Sub-branch**: ตั้งที่สาขาย่อย
- **Discount (Promotion Center)**: ส่วนลดผ่าน Promotion Center

---

### 2.6 Set Stock

#### 2.6.1 Stock Status
- **Stocked**: มีสต็อก
- **Out of Stock (Can Sale)**: หมดสต็อก แต่ยังขายได้ (pre-order)
- **Out of Stock (Can Not Sale)**: หมดสต็อก และไม่สามารถขายได้

---

### 2.7 Set On Shelf Product

#### 2.7.1 Shelf Locations
- **At Head Office**: วางบนชั้นที่สำนักงานใหญ่
- **At Sub-branch**: วางบนชั้นที่สาขาย่อย

---

## 3. Seller Perspective - Add Product

### 3.1 Search (Elastic2)

#### 3.1.1 Search Criteria
- **Name**: ค้นหาตามชื่อ
- **Barcode**: ค้นหาตามบาร์โค้ด
- **Brand**: ค้นหาตามแบรนด์
- **All**: ค้นหาทั้งหมด

---

### 3.2 Add Product

#### 3.2.1 On Web

**Search Import Product**:
- **Name**: ค้นหาตามชื่อ
- **ID**: ค้นหาตาม ID
- **Filter Status**: กรองตามสถานะ
- **Barcode**: ค้นหาตามบาร์โค้ด

---

#### 3.2.2 Import Excel

**Download Template**:
- ดาวน์โหลด template สำหรับ import

**Bulk Template (Add Product)**:
- **In System (Master SKU)**: สินค้าที่มีในระบบ (Master SKU)
- **Matching**: สินค้าที่ match กับ Master SKU
- **Not in System (API) [change to kat]**: สินค้าที่ไม่มีในระบบ (ต้องเปลี่ยนเป็น kat - อาจหมายถึงต้องสร้าง Master SKU ใหม่)

---

#### 3.2.3 Manage Import Product

**View Import Product**:
- **Export Excel**: ส่งออกเป็น Excel

**Edit Import Product**:
- **Name**: ชื่อสินค้า
- **Description**: คำอธิบาย
- **Price**: ราคา
- **Promotion**: โปรโมชั่น
- **Date Promotion**: วันที่โปรโมชั่น
- **Status**: สถานะ

**Delete Import Product**:
- ลบสินค้าที่ import

---

### 3.3 View Product (in branch)

#### 3.3.1 View Product All
- **On Web**: ดูบนเว็บ
- **Export Excel (Product)**: ส่งออกเป็น Excel

#### 3.3.2 View Product Detail
- ดูรายละเอียดสินค้า

---

## 4. Key Features Analysis

### 4.1 Personalization Features

**From Buyer Perspective**:
- **Custom Catalog**: แคตตาล็อกที่ปรับแต่งเอง
- **จัดสินค้าเข้าหมวดหมู่ที่คุณอาจสนใจ (อิงตาม shopdit)**: Personalization ตามความสนใจ
- **Custom Category**: หมวดหมู่ที่ปรับแต่งเอง
- **Near User**: Location-based recommendations
- **Regular Shop**: Preferred merchants
- **Customer Group (Promotion)**: โปรโมชั่นตามกลุ่มลูกค้า

**Implementation**:
- ใช้ shopdit (personalization engine) เพื่อจัดหมวดหมู่สินค้า
- Location-based recommendations
- Customer group-based promotions

---

### 4.2 Multi-Branch Support

**Features**:
- **Head Office**: สำนักงานใหญ่
- **Sub-branch**: สาขาย่อย
- **Link to Head Office**: เชื่อมโยงกับสำนักงานใหญ่

**Use Cases**:
- ตั้งราคาได้เฉพาะที่ Head Office
- จัดการสต็อกแยกตามสาขา
- ตั้งราคาพิเศษได้ทั้ง Head Office และ Sub-branch

---

### 4.3 Master SKU Integration

**Features**:
- **Search Import Product**: ค้นหาสินค้าจาก Master SKU เพื่อ import
- **In System (Master SKU)**: สินค้าที่มีในระบบ Master SKU
- **Matching**: สินค้าที่ match กับ Master SKU
- **Not in System**: สินค้าที่ไม่มีในระบบ (ต้องสร้าง Master SKU ใหม่)

**Workflow**:
1. Seller ค้นหาสินค้าจาก Master SKU
2. Import สินค้าไปใช้
3. ถ้าไม่มีในระบบ → สร้าง Master SKU ใหม่

---

### 4.4 Price Management

**Price Types**:
- **Base Price**: ราคาพื้นฐาน (ตั้งได้เฉพาะ Head Office)
- **Promotion Price**: ราคาโปรโมชั่น
  - Customer Group-based
  - Special Price (Head Office / Sub-branch)
  - Discount (Promotion Center)

**VAT Handling**:
- **In VAT**: ราคารวม VAT
- **Ex VAT**: ราคาไม่รวม VAT

---

### 4.5 Stock Management

**Stock Status**:
- **Stocked**: มีสต็อก
- **Out of Stock (Can Sale)**: หมดสต็อก แต่ยังขายได้ (pre-order)
- **Out of Stock (Can Not Sale)**: หมดสต็อก และไม่สามารถขายได้

**Branch-Level Stock**:
- จัดการสต็อกแยกตามสาขา

---

### 4.6 Product Image Management

**Rules**:
- **Not Edit Old Picture**: ไม่สามารถแก้ไขรูปเก่า
- **Can Add New Picture**: สามารถเพิ่มรูปใหม่ได้

**Rationale**: 
- รักษาประวัติภาพสินค้า
- อนุญาตให้เพิ่มภาพใหม่ได้

---

### 4.7 Export Features

**For Buyers**:
- **Invoice**: ส่งออกใบแจ้งหนี้
- **BOQ (Bill of Quantity)**: ส่งออก BOQ

**For Sellers**:
- **Export Excel (Product)**: ส่งออกข้อมูลสินค้าเป็น Excel
- **Export Excel (Import Product)**: ส่งออกข้อมูล import เป็น Excel

---

## 5. Technical Requirements

### 5.1 Search Engine

**Elastic1 (Buyer)**:
- Product name search
- Merchant name search
- Brand search
- Sort by price, name

**Elastic2 (Seller)**:
- Product name search
- Barcode search
- Brand search
- All products search

---

### 5.2 Personalization Engine

**Shopdit Integration**:
- จัดสินค้าเข้าหมวดหมู่ที่คุณอาจสนใจ
- Custom catalog
- Customer group-based recommendations

---

### 5.3 Multi-Branch Architecture

**Requirements**:
- Support Head Office และ Sub-branch
- Link products between branches
- Branch-level pricing
- Branch-level stock management
- Branch-level shelf placement

---

### 5.4 Master SKU Integration

**Requirements**:
- Search Master SKU
- Import from Master SKU
- Match products with Master SKU
- Create new Master SKU if not found

---

## 6. User Stories

### 6.1 Buyer User Stories

**US-B-001: Search Products**
- **As a** Buyer
- **I want to** search products by name, merchant, brand
- **So that** I can find products I need quickly

**US-B-002: View Personalized Catalog**
- **As a** Buyer (ช่างประปา)
- **I want to** see products organized in categories I'm interested in
- **So that** I can discover relevant products easily

**US-B-003: Add to Cart**
- **As a** Buyer
- **I want to** add products to cart and update quantity
- **So that** I can prepare for purchase

**US-B-004: Export Invoice/BOQ**
- **As a** Buyer (B2B)
- **I want to** export invoice and BOQ
- **So that** I can use them for accounting and project management

---

### 6.2 Seller User Stories

**US-S-001: Import Products from Master SKU**
- **As a** Seller
- **I want to** search and import products from Master SKU
- **So that** I can add products to my store easily

**US-S-002: Bulk Import via Excel**
- **As a** Seller
- **I want to** import products in bulk via Excel
- **So that** I can add many products at once

**US-S-003: Set Branch-Level Pricing**
- **As a** Seller
- **I want to** set different prices for Head Office and Sub-branch
- **So that** I can manage pricing flexibly

**US-S-004: Manage Stock by Branch**
- **As a** Seller
- **I want to** manage stock separately for each branch
- **So that** I can track inventory accurately

---

## 7. Dependencies

### 7.1 External Dependencies

- **Elasticsearch**: สำหรับ search (Elastic1, Elastic2)
- **Shopdit**: Personalization engine
- **Master SKU System**: ระบบ Master SKU
- **Promotion Center**: ระบบโปรโมชั่น

### 7.2 Internal Dependencies

- **User Management**: สำหรับ Buyer และ Seller
- **Branch Management**: สำหรับ Multi-branch support
- **Cart System**: สำหรับ Cart functionality
- **Order Management**: สำหรับ Buy Product
- **Delivery System**: สำหรับ Delivery options
- **Export System**: สำหรับ Export features

---

## 8. Implementation Priority

### 8.1 Phase 1 (MVP)

**Buyer**:
- ✅ Basic Search (Product name, Brand)
- ✅ Cart (Add, Delete, Update quantity)
- ✅ Buy Product (Base price)
- ✅ Basic Delivery (Single)

**Seller**:
- ✅ View Product (All, Detail)
- ✅ Add Product (On web - Search import from Master SKU)
- ✅ Edit Product (Name, Description, Price)
- ✅ Set Stock (Stocked, Out of stock)

---

### 8.2 Phase 2

**Buyer**:
- ✅ Advanced Search (Merchant name, All product)
- ✅ Sort (Price, Name)
- ✅ Personalized Catalog (shopdit integration)
- ✅ Multiple Delivery
- ✅ Export (Invoice, BOQ)

**Seller**:
- ✅ Import Excel
- ✅ Manage Import Product
- ✅ Multi-branch support
- ✅ Promotion Price (Customer group, Special price)
- ✅ Set On Shelf Product

---

### 8.3 Phase 3

**Buyer**:
- ✅ Custom Category
- ✅ Location-based (Near user, Regular shop)

**Seller**:
- ✅ Advanced Stock Management (Out of stock can sale)
- ✅ Picture Management (Add new, not edit old)
- ✅ Advanced Export features

---

## 9. Open Questions / Clarifications Needed

1. **"change to kat"**: ใน Import Excel → Not in system (api) [change to kat] - หมายถึงอะไร?
   - อาจหมายถึงต้องสร้าง Master SKU ใหม่?
   - หรือต้องใช้ระบบอื่น?

2. **Shopdit Integration**: 
   - Shopdit คือ personalization engine ภายในหรือ external?
   - ต้อง integrate อย่างไร?

3. **Multi-Branch**:
   - Sub-branch สามารถตั้งราคาเองได้หรือไม่?
   - หรือต้องอิงจาก Head Office เท่านั้น?

4. **Stock Management**:
   - "Out of stock (can sale)" หมายถึง pre-order หรือ backorder?
   - มีระบบแจ้งเตือนเมื่อสต็อกต่ำหรือไม่?

---

## 10. Next Steps

1. **Clarify Open Questions**: ตอบคำถามที่ยังไม่ชัดเจน
2. **Update Project Scope**: อัปเดต Project Scope ตาม Module นี้
3. **Create User Stories**: สร้าง User Stories ที่ละเอียดขึ้น
4. **Technical Design**: ออกแบบระบบตาม Module นี้

---

## Appendix

### A. Module Mapping

| Module Feature | Current Project Scope Section |
|---------------|------------------------------|
| Search (Elastic1/2) | 4.3 Search & Discovery |
| Merchant/Catalog | 4.10 Personalization |
| Cart | 4.5 Shopping & Cart |
| Buy Product | 4.6 Order Management |
| Delivery | 4.13 Shipping & Delivery |
| Export | 4.6 Order Management |
| Manage Product | 4.8 Seller Dashboard |
| Add Product | 4.2 Product Management |
| Multi-Branch | New Feature (to be added) |

### B. References
- Project Scope Document
- Personalization Strategy Document
- Competitive Analysis
