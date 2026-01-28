# Module Summary: Allkons M

## Executive Summary
เอกสารนี้นำเสนอสรุป Module ทั้งหมดของ Allkons M ตาม Miro Board และเอกสารวิจัย

---

## 1. Product Module

### 1.1 Buyer Perspective

**Core Features**:
- **Search (Elastic1)**: Product name, Merchant name, All product, Product Brand, Sort (Price, Name)
- **Merchant**: Catalog (Custom, Personalized), Category (System, Custom), Location (Near user, Regular shop)
- **Cart**: Add, Delete, Update quantity
- **Buy Product**: Promotion (Customer group, Discount, Special price), Price (Base price)
- **Delivery**: Single, Multiple
- **Export**: Invoice, BOQ (Bill of Quantity)

**Key Personalization Features**:
- Custom Catalog
- จัดสินค้าเข้าหมวดหมู่ที่คุณอาจสนใจ (อิงตาม shopdit)
- Custom Category
- Location-based (Near user, Regular shop)
- Customer Group promotions

---

### 1.2 Seller Perspective

**Core Features**:
- **Search (Elastic2)**: Name, Barcode, Brand, All
- **View Product**: All (On web, Export Excel), Detail
- **Add Product**: 
  - On web (Search import from Master SKU)
  - Import Excel (Template, Bulk import)
  - Manage import product
- **Edit Product**: Name, Description, Picture (Not edit old, Can add new), Catalog
- **Delete Product**: At head office, At sub-branch
- **Set Price**: Base price (Head office only, In VAT/Ex VAT), Promotion price (Customer group, Special price, Discount)
- **Set Stock**: Stocked, Out of stock (can sale), Out of stock (can not sale)
- **Set On Shelf**: At Head office, At Sub-branch

**Key Features**:
- Multi-Branch Support (Head Office, Sub-branch)
- Master SKU Integration
- Picture Management (Not edit old, Can add new)
- Branch-level pricing and stock

---

## 2. Module Mapping to Project Scope

| Module Feature | Project Scope Section | Status |
|---------------|----------------------|--------|
| Search (Elastic1/2) | 4.3 Search & Discovery | ✅ Updated |
| Merchant/Catalog (Personalization) | 4.10 Personalization | ✅ Updated |
| Cart | 4.5 Shopping & Cart | ✅ Updated |
| Buy Product | 4.6 Order Management | ✅ Updated |
| Delivery (Single/Multiple) | 4.14 Shipping & Delivery | ✅ Updated |
| Export (Invoice/BOQ) | 4.6 Order Management | ✅ Updated |
| Add Product (On web/Excel) | 4.2 Product Management | ✅ Updated |
| Manage Product | 4.8 Seller Dashboard | ✅ Updated |
| Multi-Branch Support | 4.8.2 Product Management | ✅ Added |
| Price Management (Base/Promotion) | 4.8.2 Product Management | ✅ Updated |
| Stock Management (3 statuses) | 4.8.2 Product Management | ✅ Updated |
| Picture Management | 4.8.2 Product Management | ✅ Added |

---

## 3. Key Technical Requirements

### 3.1 Search Engine
- **Elastic1**: สำหรับ Buyer search
- **Elastic2**: สำหรับ Seller search
- Support: Product name, Merchant name, Brand, Barcode

### 3.2 Personalization Engine
- **Shopdit**: Personalization engine
- Features: Custom catalog, จัดสินค้าตามความสนใจ, Customer group

### 3.3 Multi-Branch System
- Head Office และ Sub-branch support
- Branch-level pricing, stock, shelf management
- Link products between branches

### 3.4 Master SKU Integration
- Search Master SKU
- Import from Master SKU
- Match products with Master SKU
- Submit request to Master SKU Admin if not found (seller cannot create Master SKU)

---

## 5. Dependencies

### 5.1 External Dependencies
- Elasticsearch (Elastic1, Elastic2)
- Shopdit (Personalization engine)
- Master SKU System
- Promotion Center

### 5.2 Internal Dependencies
- User Management
- Branch Management
- Cart System
- Order Management
- Delivery System
- Export System

---

## 6. Open Questions

1. **"change to kat"**: ใน Import Excel → Not in system (api) [change to kat]
   - หมายถึงอะไร? ต้องส่งคำขอให้ Master SKU Admin ตรวจสอบ/เพิ่ม Master SKU?

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

## 7. Next Steps

1. **Clarify Open Questions**: ตอบคำถามที่ยังไม่ชัดเจน
2. **Update Project Scope**: อัปเดต Project Scope ตาม Module นี้ ✅ Done
3. **Create User Stories**: สร้าง User Stories ที่ละเอียดขึ้น
4. **Technical Design**: ออกแบบระบบตาม Module นี้

---

## Appendix

### A. Module Features Checklist

**Buyer Features**:
- [x] Search (Elastic1)
- [x] Merchant/Catalog
- [x] Cart
- [x] Buy Product
- [x] Delivery
- [x] Export

**Seller Features**:
- [x] Search (Elastic2)
- [x] View Product
- [x] Add Product (On web, Excel)
- [x] Edit Product
- [x] Delete Product
- [x] Set Price
- [x] Set Stock
- [x] Set On Shelf
- [x] Multi-Branch

### B. References
- Product Module Detailed Document
- Project Scope Document
- Personalization Strategy Document
