# Project Scope: Marketplace วัสดุก่อสร้าง

## 1. Executive Summary

### 1.1 Project Overview
**Allkons M** - Marketplace วัสดุก่อสร้างที่เน้น B2B เป็นหลัก โดยมี Master SKU เป็นจุดแข็งให้ผู้ขายหลายรายสามารถดึงข้อมูลสินค้าไปขายได้ แต่ควบคุมคุณภาพข้อมูลจากจุดกลาง

**Key Differentiator**: Master SKU เป็นจุดเริ่มต้นของสินค้า และ Seller สามารถสร้าง “สินค้าในร้าน” ได้โดยการอ้างอิง Master SKU เท่านั้น (พร้อมปรับแต่ง Unique content บางส่วนตามกติกา)

### 1.2 Project Goals
1. สร้าง Marketplace ที่เน้น B2B เป็นหลัก
2. เป็นเจ้าตลาดด้านข้อมูลสินค้าวัสดุก่อสร้าง (Master SKU)
3. ให้ผู้ขายหลายรายสามารถแข่งขันกันขายสินค้าเดียวกันได้
4. รองรับทั้ง B2C และ B2B แต่เน้น B2B

---

## 2. Business Model

### 2.1 Marketplace Model
- **Multi-vendor Platform**: ผู้ขายหลายรายขายสินค้าเดียวกันได้
- **Master SKU**: บริษัทเป็นเจ้าของ Master SKU ให้ผู้ขายดึงข้อมูลไปใช้
- **Flexible Content**: ผู้ขายสามารถปรับแต่งเนื้อหาบางส่วนได้ (เช่น ราคา, คำอธิบาย)
- **Data Quality**: บริษัทควบคุมคุณภาพข้อมูลหลัก (รูปภาพ, ข้อมูลเทคนิค, หมวดหมู่)

### 2.2 Marketplace-Only Model
- **Marketplace Only**: ไม่มี concept ของช่องทางแยกนอก Marketplace
- **Single Source of Discovery**: ผู้ซื้อค้นหา/เลือกซื้อผ่าน Marketplace เป็นหลัก
- **Seller Product Listings**: ผู้ขายจัดการ “สินค้าในร้าน” จาก Seller Dashboard และสินค้าแสดงใน Marketplace ตามสถานะ/กติกา
- **Branch-aware Operations**: ราคา/สต็อก/การเปิดขาย เป็นข้อมูลระดับ Branch และต้องทำงานโดยมีบริบท ORG + Branch เสมอ

### 2.2 Revenue Model (Potential)
- Commission from sellers (transaction fee)
- Subscription fees for sellers (premium features)
- Advertising fees
- B2B membership fees
- Service fees (installation, consultation)

---

## 3. User Types & Permissions

### 3.1 Buyers

#### 3.1.1 บุคคลธรรมดา (Individual Consumer)
- **Registration Flow**:
  1. ยืนยันหมายเลขโทรศัพท์ (OTP)
  2. ตั้งรหัสผ่าน
  3. กรอกข้อมูลส่วนตัว (ชื่อ, นามสกุล, อีเมล) และยอมรับ Terms & Conditions
  4. เลือกประเภทโปรไฟล์ธุรกิจ (เช่น บุคคลธรรมดา) และกรอก Tax ID/ID Number
  5. ยอมรับข้อกำหนดเพิ่มเติม (สำหรับนิติบุคคล/ร้านค้า)
- **KYC**: ต้องทำการ KYC ถึงจะสามารถซื้อสินค้าได้
- **Login Methods**: Username + Password, Phone Number + OTP, OAuth (Google, Facebook, Line)
- **Permissions**: 
  - ซื้อสินค้าได้
  - ดูราคาแบบ B2C
  - ไม่มีสิทธิ์ดูราคา B2B
  - ไม่มีสิทธิ์ใช้ฟีเจอร์ B2B (PO, credit terms)
- **Personalization**: 
  - แสดงสินค้าแนะนำตามอาชีพ/ความสนใจ
  - แสดงเนื้อหาที่เกี่ยวข้อง (บทความ, tips)
- **Use Case**: ผู้ซื้อทั่วไป ซื้อวัสดุก่อสร้างสำหรับบ้านตัวเอง

#### 3.1.2 บุคคลธรรมดาจดทะเบียนพาณิชย์ (Registered Individual Merchant)
- **Registration Flow**: เช่นเดียวกับ Individual Consumer แต่ต้องยืนยันเอกสารเพิ่มเติม
- **Login Methods**: Username + Password, Phone Number + OTP, OAuth (Google, Facebook, Line)
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

#### 3.1.3 นิติบุคคล (Legal Entity / Company)
- **Registration Flow**: เช่นเดียวกับ Individual Consumer แต่ต้องยืนยันเอกสารนิติบุคคล และต้องทำการ KYC/KYB
- **Login Methods**: Username + Password, Phone Number + OTP, OAuth (Google, Facebook, Line)
- **Structure**: Account → ORG (KYB) → Shop → Branch → Team Members
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

### 3.2 Sellers

#### 3.2.1 Seller Structure
**Hierarchy**:
```
Account (KYC)
  └── ORG (KYB / Organization Verified)
        └── Shop (1 ร้านต่อ 1 ORG)
              └── Branch (หลายสาขา)
                    └── Branch (ร้านหลัก = สาขาแรก)
```

**Key Points**:
- **Account (KYC)**: ผู้ใช้ Seller ที่ผ่านการยืนยันตัวตน
  - สามารถสร้างองค์กรได้มากกว่า 1 องค์กร
- **ORG (Organization)**: องค์กรที่สร้างโดย Account
  - 1 ORG = 1 Shop
  - **สร้าง ORG ได้ทันที**: สามารถสร้าง ORG และจัดการข้อมูลเบื้องต้นได้โดยไม่ต้องผ่าน KYB ก่อน
  - **KYB Required for Selling**: ต้องผ่านการยืนยัน KYB (ORG Verified) ก่อนถึงจะสามารถเริ่มขายสินค้าได้
  - เมื่อ ORG ผ่าน KYB → ร้านค้าสามารถเริ่มขายและทำธุรกรรมได้เต็มรูปแบบ
- **Shop**: ร้านของผู้ขาย
  - สามารถสร้างสาขาได้มากกว่า 1 สาขา
- **Branch**: สาขาของร้าน
  - ร้านหลักนับเป็น 1 สาขา (level เดียวกัน)
  - Branch สามารถตั้งราคา, สต็อก, shelf แยกกันได้

#### 3.2.2 บุคคลธรรมดาจดทะเบียนพาณิชย์ (Registered Individual Merchant)
- **Registration Flow**: ทำตามขั้นตอนเดียวกับ Buyer แต่เพิ่มการสร้าง ORG/Shop และระบุ Branch (อย่างน้อย 1 Branch: Main)
  - ยอมรับ Business Layer Terms & Conditions
- **Structure**: Account → ORG (KYB) → Shop → Branch
- **Login Methods**: Username + Password, Phone Number + OTP, OAuth (Google, Facebook, Line)
- **Permissions**:
  - สร้าง ORG (สร้างได้ทันทีโดยไม่ต้องรอผล KYB)
  - จัดการ KYB (ต้องผ่านการอนุมัติก่อนถึงจะสามารถขายสินค้าได้)
  - สร้าง Shop (1 Shop ต่อ 1 ORG)
  - สร้าง Branch (หลายสาขา)
  - ดึง Master SKU ไปใช้ได้
  - ปรับแต่งเนื้อหาสินค้าบางส่วนได้ (ราคา, คำอธิบาย)
  - จัดการสินค้าของตัวเอง (สินค้าแสดงใน Marketplace ตามสถานะ/กติกา)
  - จัดการข้อมูล Shop/Branch (เช่น ข้อมูลติดต่อ, ที่อยู่, ข้อมูลจัดส่ง)
  - จัดการออเดอร์
  - ดูรายงานการขาย
  - **Organization Management**: จัดการ ORG, Team Members, Role & Permissions
- **Use Case**: ช่างรับเหมาที่ขายวัสดุก่อสร้างเสริม

#### 3.2.3 นิติบุคคล (Legal Entity / Company)
- **Registration Flow**: ทำตามขั้นตอนเดียวกับ Seller ปกติ (KYC + ORG Creation + Shop Setup)
  - หมายเหตุ: สามารถสร้าง ORG ได้เลย ส่วน KYB สามารถดำเนินการภายหลังได้ แต่จะยังขายของไม่ได้จนกว่าจะได้รับการอนุมัติ
- **Login Methods**: Username + Password, Phone Number + OTP, OAuth (Google, Facebook, Line)
- **Structure**: Account → ORG (KYB) → Shop → Branch
- **Permissions**:
  - สร้างหลาย ORG ได้ (1 Account → หลาย ORG)
  - แต่ละ ORG สร้าง Shop ได้ 1 Shop
  - แต่ละ Shop สร้าง Branch ได้หลายสาขา
  - ดึง Master SKU ไปใช้ได้
  - ปรับแต่งเนื้อหาสินค้าบางส่วนได้ (ราคา, คำอธิบาย)
  - จัดการสินค้าของตัวเอง (สินค้าแสดงใน Marketplace ตามสถานะ/กติกา)
  - จัดการข้อมูล Shop/Branch (เช่น ข้อมูลติดต่อ, ที่อยู่, ข้อมูลจัดส่ง)
  - จัดการออเดอร์ B2B และ B2C
  - ดูรายงานการขาย
  - ใช้ฟีเจอร์ B2B เต็มรูปแบบ
  - **Organization Management**: จัดการ ORG, Team Members, Role & Permissions, Financial
  - **Team Management**: เพิ่มสมาชิกทีมเข้า ORG และ Assign เข้า Shop
- **Use Case**: ผู้ขายวัสดุก่อสร้าง, ผู้จำหน่าย, ผู้ผลิต

---

## 4. Core Features

### 4.1 Master SKU Management

#### 4.1.1 Master SKU Creation
- สร้าง Master SKU โดยทีมงาน/เจ้าของแพลตฟอร์ม
- ข้อมูลหลัก: ชื่อสินค้า, รูปภาพ, ข้อมูลเทคนิค, หมวดหมู่, มาตรฐาน
- ควบคุมคุณภาพข้อมูล

#### 4.1.2 Master SKU Distribution
- ผู้ขายสามารถดึง Master SKU ไปใช้ได้
- ผู้ขายไม่สามารถแก้ไขข้อมูลหลักได้ (รูปภาพ, ข้อมูลเทคนิคหลัก)
- ผู้ขายสามารถปรับแต่งได้: ราคา, คำอธิบาย, สต็อก, shipping options

#### 4.1.3 Master SKU Updates
- อัปเดต Master SKU โดยทีมงาน
- ผู้ขายได้รับแจ้งเตือนเมื่อ Master SKU ที่ใช้มีการอัปเดต
- ผู้ขายสามารถเลือก sync หรือไม่ sync

---

### 4.2 Product Management (Seller)

#### 4.2.1 Product Listing
- ดึง Master SKU ไปใช้
- ตั้งราคา
- ตั้งสต็อก
- ปรับแต่งคำอธิบาย
- เพิ่มรูปภาพเพิ่มเติม (ถ้าต้องการ)
- ตั้ง shipping options

#### 4.2.2 Product Variation
- จัดการ variants (ขนาด, สี, ฯลฯ)
- ตั้งราคาตาม variant

#### 4.2.3 Add Products

**4.2.3.1 On Web (Search Import Product)**
- ค้นหาสินค้าจาก Master SKU
- Search criteria: Name, ID, Barcode, Filter status
- Import สินค้าไปใช้

**4.2.3.2 Import Excel**
- Download template
- Bulk import products
- Handle product status:
  - In system (Master SKU): สินค้าที่มีในระบบ
  - Matching: สินค้าที่ match กับ Master SKU
  - Not in system: สินค้าที่ไม่มีในระบบ (ส่งคำขอเพิ่ม Master SKU ให้ Admin ตรวจสอบ)

**4.2.3.3 Manage Import Product**
- View import product (Export Excel)
- Edit import product (Name, Description, Price, Promotion, Date Promotion, Status)
- Delete import product

#### 4.2.4 Bulk Import/Export
- Import/Export สินค้าจาก Excel/CSV
- Template สำหรับ bulk import
- Export product list เป็น Excel

---

### 4.3 Search & Discovery

#### 4.3.1 Product Search (Elastic1)
- **Search Criteria**:
  - Product name
  - Merchant name
  - All product
  - Product Brand
- Full-text search
- Auto-complete suggestions
- Search history

#### 4.3.2 Category Navigation
- **System Category**: หมวดหมู่ระบบ (Master SKU categories)
- **Custom Category**: หมวดหมู่ที่ปรับแต่งเอง (Personalized categories)
- Sub-categories
- Breadcrumb navigation

#### 4.3.3 Filtering
- ตามหมวดหมู่
- ตามราคา (B2B/B2C)
- ตามผู้ขาย
- ตามแบรนด์
- ตาม location/shipping
- ตามคุณสมบัติสินค้า (technical specs)

#### 4.3.4 Sorting
- **Price**: เรียงตามราคา (ต่ำ-สูง, สูง-ต่ำ)
- **Name**: เรียงตามชื่อ (A-Z, Z-A)
- ตามความเกี่ยวข้อง
- ตามจำนวนรีวิว
- ตาม rating

#### 4.3.5 Merchant Features
- **Catalog**:
  - Custom Catalog: แคตตาล็อกที่ปรับแต่งเอง
  - จัดสินค้าเข้าหมวดหมู่ที่คุณอาจสนใจ (อิงตาม shopdit) - Personalization
- **Location**:
  - Near User: ผู้ขายที่อยู่ใกล้ผู้ใช้ (Location-based)
  - Regular Shop: ร้านที่ซื้อบ่อย (Preferred merchants)
- **Product All**: ดูสินค้าทั้งหมดจากผู้ขาย

---

### 4.4 Product Comparison

#### 4.4.1 Multi-vendor Comparison
- เปรียบเทียบสินค้าเดียวกันจากผู้ขายหลายราย
- เปรียบเทียบราคา, shipping, rating
- เปรียบเทียบสินค้าต่างกัน (cross-product comparison)

#### 4.4.2 Side-by-side View
- แสดงสินค้าหลายรายการในรูปแบบตาราง
- Highlight ความแตกต่าง

---

### 4.5 Shopping & Cart

#### 4.5.1 Shopping Cart
- **Add**: เพิ่มสินค้าลงตะกร้า
- **Delete**: ลบสินค้าออกจากตะกร้า
- **Update (quantity)**: อัปเดตจำนวนสินค้า
- ดูราคารวม
- ตรวจสอบ shipping options

#### 4.5.2 Wishlist / Favorites
- บันทึกรายการโปรด
- แชร์รายการโปรด

---

### 4.6 Order Management

#### 4.6.1 Order Placement (Buyer)
- สร้างออเดอร์
- **Promotion Application**:
  - Customer Group promotions (Personalization)
  - Discount
  - Special Price
- **Price Display**: แสดง Base Price และ Promotion Price
- เลือกที่อยู่จัดส่ง
- เลือกวิธีการชำระเงิน
- Review order summary
- Confirm order

#### 4.6.2 Order Tracking (Buyer)
- ติดตามสถานะออเดอร์
- ดูประวัติการสั่งซื้อ
- **Export Documents**:
  - ดาวน์โหลดใบแจ้งหนี้/ใบกำกับภาษี (Invoice)
  - ส่งออก BOQ (Bill of Quantity)

#### 4.6.3 Order Management (Seller)
- ดูออเดอร์ใหม่
- ยืนยันออเดอร์
- จัดการสถานะออเดอร์
- สร้าง shipping label
- ดาวน์โหลดใบแจ้งหนี้/ใบกำกับภาษี

---

### 4.7 B2B Features

#### 4.7.1 Purchase Order (PO)
- สร้าง PO
- อัปโหลด PO file
- จัดการ PO
- Approve/Reject PO
- Track PO status

#### 4.7.2 Bulk Pricing
- ราคาตามจำนวน (volume-based pricing)
- ราคาตามมูลค่า (value-based pricing)
- Custom pricing (negotiated prices)

#### 4.7.3 Credit Terms
- จัดการ credit terms
- Payment terms (Net 30, Net 60, ฯลฯ)
- Credit limit management

#### 4.7.4 Invoice Management
- สร้าง invoice อัตโนมัติ
- จัดการ invoice
- ดาวน์โหลด invoice
- Invoice tracking

#### 4.7.5 B2B Account Dashboard
- ดูยอดซื้อรวม
- ดูรายงานการซื้อ
- จัดการ credit terms
- จัดการทีม (multi-user accounts)

---

### 4.8 Seller Dashboard

#### 4.8.1 Overview
- ยอดขายรวม
- จำนวนออเดอร์
- สินค้าที่ขายดี
- Performance metrics

#### 4.8.2 Product Management

**4.8.2.1 View Products**
- ดูสินค้าทั้งหมด (On web, Export Excel)
- ดูรายละเอียดสินค้า
- Filter และ search สินค้า

**4.8.2.2 Add Products**
- **On Web**: ค้นหาและ import จาก Master SKU
  - Search import product (Name, ID, Barcode, Filter status)
- **Import Excel**: Import สินค้าจาก Excel
  - Download template
  - Bulk import
  - Handle products: In system (Master SKU), Matching, Not in system
- **Manage Import Product**:
  - View import product (Export Excel)
  - Edit import product (Name, Description, Price, Promotion, Date Promotion, Status)
  - Delete import product

**4.8.2.3 Edit Products**
- แก้ไขชื่อสินค้า
- แก้ไขคำอธิบาย
- **Picture Management**:
  - ไม่สามารถแก้ไขรูปเก่า
  - สามารถเพิ่มรูปใหม่ได้
- จัดการแคตตาล็อก (เชื่อมโยงกับ shopdit)

**4.8.2.4 Delete Products**
- ลบสินค้า (At head office, At sub-branch)

**4.8.2.5 Price Management**
- **Base Price** (ตั้งได้เฉพาะ Head Office):
  - In VAT (ราคารวม VAT)
  - Ex VAT (ราคาไม่รวม VAT)
- **Promotion Price**:
  - Customer Group-based pricing
  - Special Price (At head office, At sub-branch)
  - Discount (Promotion Center)

**4.8.2.6 Stock Management**
- **Current scope**: Manual Stock Status Management
  - Seller manually sets stock status for each product
  - No automatic stock tracking or quantity management
  - Simple status-based system
- **Stock Status** (Manual):
  - Stocked (มีสต็อก) - Seller sets manually
  - Out of Stock (Can Sale) - หมดสต็อก แต่ยังขายได้ (pre-order)
  - Out of Stock (Can Not Sale) - หมดสต็อก และไม่สามารถขายได้
- **Branch-Level Stock**: จัดการสต็อกแยกตามสาขา (Manual status per branch)
- **Designed to support**: Full Inventory System
  - Automatic stock tracking
  - Stock quantity management
  - Stock alerts
  - Stock history
  - Multi-location inventory
  - Stock transfer

**4.8.2.7 Shelf Management**
- Set on shelf product (At Head office, At Sub-branch)

**4.8.2.8 Multi-Branch Support**
- **Head Office**: สำนักงานใหญ่
- **Sub-branch**: สาขาย่อย
- **Link to Head Office**: เชื่อมโยงกับสำนักงานใหญ่
- Branch-level pricing, stock, shelf management

#### 4.8.3 Order Management
- จัดการออเดอร์
- ตรวจสอบสถานะ
- Print shipping labels

#### 4.8.4 Reports & Analytics
- รายงานการขาย
- รายงานสินค้า
- รายงานลูกค้า
- Analytics dashboard

#### 4.8.5 Team Management
- จัดการสมาชิกทีม (เชิญ, ลบ, เปลี่ยน role)
- ดูรายชื่อสมาชิกทีม
- ดู activity log
- จัดการ permissions

---

### 4.9 Organization & Shop Management

#### 4.9.1 Organization (ORD) Creation

**For Sellers**:
1. Account สร้าง ORD
2. กรอกข้อมูลองค์กร
3. อัปโหลดเอกสาร KYB
4. รอการอนุมัติจาก Allkons Admin
5. เมื่อผ่าน KYB → ORD Verified
6. สร้าง Shop (1 Shop ต่อ 1 ORD)

**For Buyers**:
1. Account สร้าง ORD
2. กรอกข้อมูลองค์กร
3. อัปโหลดเอกสาร KYB
4. รอการอนุมัติจาก Allkons Admin
5. เมื่อผ่าน KYB → ORD Verified
6. สร้าง Shop (1 Shop ต่อ 1 ORD)
7. สร้าง Branch (อย่างน้อย 1 Branch: Main)

---

#### 4.9.2 Shop Creation & Setup (Seller Only)

**Shop Setup**:
- 1 ORD = 1 Shop
- Shop เป็นบริบทการทำงานของ Seller ใน Marketplace (ไม่ใช่หน้าเว็บร้านแยก)
- Shop ใช้เก็บข้อมูลโปรไฟล์ร้านเพื่อการแสดงผลใน Marketplace และเอกสาร/ธุรกรรม
  - ชื่อร้าน
  - โลโก้ร้าน
  - คำอธิบายร้าน
  - ข้อมูลติดต่อ (ที่อยู่, เบอร์โทร, อีเมล)

**Branch Creation**:
- สร้าง Branch (หลายสาขา)
- ร้านหลัก = Branch แรก (is_main = true)
- Branch สามารถตั้งราคา, สต็อก, shelf แยกกันได้

#### 4.9.8 Requirements for Selling (Seller Readiness)

เพื่อให้สามารถเริ่มขายสินค้าและเปิดร้านได้ (Active Selling), ผู้ขายจะต้องดำเนินการให้ครบ 4 เงื่อนไขดังนี้:

1. **KYB (Know Your Business)**: ต้องผ่านการตรวจสอบและอนุมัติ (ORD Verified)
2. **Product Listing**: ต้องมีสินค้าที่ Active อย่างน้อย 1 รายการ
3. **Financial Setup**: ตั้งค่าช่องทางการชำระเงินและบัญชีธนาคารให้เรียบร้อย (Payment method + Bank account)
4. **Shop Information**: ระบุข้อมูลร้านค้าให้ครบถ้วน 100% (ที่อยู่ร้าน, ช่องทางการจัดส่ง, ข้อมูลติดต่อ, พื้นที่ที่ขาย)

---

### 4.10 Personalization & Recommendations

#### 4.10.1 User Profile & Preferences
- **Profile Information**: อาชีพ, กลุ่มธุรกิจ, ความสนใจ
- **Business Type**: ประเภทธุรกิจ (ก่อสร้าง, อสังหาริมทรัพย์, รับเหมา, ฯลฯ)
- **Job Role**: บทบาทงาน (ช่างประปา, ช่างไฟฟ้า, สถาปนิก, วิศวกร, ฯลฯ)
- **Preferences**: ความสนใจ, สินค้าที่ใช้บ่อย

#### 4.10.2 Personalized Product Recommendations
- **Job-Based Recommendations**: แนะนำสินค้าตามอาชีพ
  - ช่างประปา → สินค้าประปา (ท่อ, วาล์ว, ก๊อกน้ำ, ฯลฯ)
  - ช่างไฟฟ้า → สินค้าไฟฟ้า (สายไฟ, ปลั๊ก, สวิตช์, ฯลฯ)
  - ช่างก่อสร้าง → สินค้าก่อสร้าง (ปูน, อิฐ, เหล็ก, ฯลฯ)
- **Business-Based Recommendations**: แนะนำสินค้าตามกลุ่มธุรกิจ
  - บริษัทก่อสร้าง → สินค้าก่อสร้างทั้งหมด
  - บริษัทพัฒนาอสังหาริมทรัพย์ → สินค้าสำหรับโครงการ
- **Purchase History-Based**: แนะนำสินค้าตามประวัติการซื้อ
- **Frequently Bought Together**: แนะนำสินค้าที่มักซื้อคู่กัน

#### 4.10.3 Personalized Content
- **Articles & Tips**: แสดงบทความและ tips ที่เกี่ยวข้องกับอาชีพ/กลุ่มธุรกิจ
- **Product Guides**: แสดงคู่มือสินค้าที่เกี่ยวข้อง
- **Industry News**: แสดงข่าวสารที่เกี่ยวข้องกับกลุ่มธุรกิจ

#### 4.10.4 Personalized Homepage
- **Personalized Banner**: แสดง banner ที่เกี่ยวข้องกับอาชีพ/กลุ่มธุรกิจ
- **Featured Categories**: แสดงหมวดหมู่สินค้าที่เกี่ยวข้อง
- **Recommended Products**: แสดงสินค้าแนะนำตามอาชีพ/กลุ่มธุรกิจ
- **Quick Access**: แสดงสินค้าที่ใช้บ่อย

#### 4.10.5 Personalized Search Results
- **Relevance Ranking**: จัดอันดับผลการค้นหาตามอาชีพ/กลุ่มธุรกิจ
- **Category Suggestions**: แนะนำหมวดหมู่ที่เกี่ยวข้อง
- **Related Products**: แสดงสินค้าที่เกี่ยวข้อง

#### 4.10.6 Personalized Promotions
- **Targeted Promotions**: แสดงโปรโมชั่นที่เหมาะกับอาชีพ/กลุ่มธุรกิจ
- **Bulk Pricing Alerts**: แจ้งเตือนเมื่อมี bulk pricing สำหรับสินค้าที่เกี่ยวข้อง
- **New Product Alerts**: แจ้งเตือนสินค้าใหม่ที่เกี่ยวข้อง

---

### 4.11 Buyer Dashboard

#### 4.11.1 Overview
- ยอดซื้อรวม
- จำนวนออเดอร์
- สถานะออเดอร์ล่าสุด
- Personalized Recommendations
- Quick Access (สินค้าที่ใช้บ่อย)

#### 4.11.2 Order History
- ประวัติการสั่งซื้อ
- ติดตามออเดอร์
- ดาวน์โหลดเอกสาร

#### 4.11.3 Account Management
- จัดการข้อมูลส่วนตัว (อาชีพ, กลุ่มธุรกิจ, ความสนใจ)
- จัดการที่อยู่
- จัดการวิธีการชำระเงิน
- จัดการ Preferences (Personalization settings)

#### 4.11.4 Team Management (Multi-User Accounts)
- **Invite Team Members**: เชิญสมาชิกทีมเข้าร่วมบัญชี
- **Role Management**: กำหนด role และ permissions สำหรับสมาชิกทีม
- **Team Member List**: ดูรายชื่อสมาชิกทีมทั้งหมด
- **Activity Log**: ดูประวัติการทำงานของสมาชิกทีม
- **Remove Team Members**: ลบสมาชิกทีมออกจากบัญชี

---

### 4.12 Organization Management

#### 4.12.1 KYB (Know Your Business)

**KYB Process**:
1. Account สร้าง ORD (สร้างได้ทันที)
2. กรอกข้อมูลองค์กรและจัดการตั้งค่าเบื้องต้น
3. ดำเนินการ KYB (อัปโหลดหนังสือรับรองบริษัท, เอกสารอื่นๆ)
4. รอการอนุมัติจาก Allkons Admin (Pending status)
5. เมื่อผ่าน KYB → ORD Verified → สามารถเริ่มขายสินค้าและทำธุรกรรมได้ตามสิทธิ์ของ User Type

**KYB Status**:
- Pending: รอการอนุมัติ
- Approved: อนุมัติแล้ว (ORD Verified)
- Rejected: ไม่อนุมัติ
- Suspended: ถูกระงับ

**KYB Documents**:
- หนังสือรับรองบริษัท
- เอกสารอื่นๆ ตามที่ Allkons Admin กำหนด

---

#### 4.12.2 Organization Information Management

**Organization Profile**:
- ชื่อองค์กร
- ที่อยู่
- เบอร์โทรศัพท์
- อีเมล
- ข้อมูลอื่นๆ

**Edit Organization Information**:
- แก้ไขข้อมูลองค์กร
- อัปเดตเอกสาร (ถ้าจำเป็น)
- ต้องผ่านการอนุมัติจาก Allkons Admin (ถ้าเปลี่ยนข้อมูลสำคัญ)

---

#### 4.12.3 Financial Management

**Bank Account Management**:
- เพิ่มบัญชีรับเงิน
- แก้ไขบัญชีรับเงิน
- ลบบัญชีรับเงิน
- ตั้งบัญชีหลัก (Primary account)

**Payment Settings**:
- วิธีการรับเงิน
- Payment terms
- Credit terms (สำหรับ Buyer)

**Financial Reports**:
- รายงานการเงิน
- Transaction history
- Invoice management

---

### 4.13 Team Management (Multi-User Accounts)

#### 4.13.1 Two-Layer Permission System

**Layer 1: Organization Level (ORG)**
- Role และ permissions สำหรับจัดการใน ORD
- **ORG Owner**: สิทธิ์เต็มรูปแบบใน ORD
- **ORG Admin**: จัดการ ORD (แต่ไม่สามารถลบ ORD)
- **ORG Member**: สมาชิกทั่วไป

**Layer 2: Application Level (App)**
- Role และ permissions สำหรับใช้งานใน app (Buyer/Seller)
- **For Buyers**: Purchaser, Admin, Viewer
- **For Sellers**: Product Manager, Order Manager, Viewer

**Permission Resolution**:
- User ต้องมีสิทธิ์ทั้ง 2 layers
- สำหรับ Seller: ต้องมีสิทธิ์ใน Shop ที่ต้องการทำงานด้วย

---

#### 4.13.2 Team Roles & Permissions

**Organization Level (Layer 1)**:

**1. ORG Owner**
- สิทธิ์เต็มรูปแบบใน ORD
- จัดการข้อมูลองค์กร
- จัดการ KYB documents
- จัดการทีม (เชิญ, ลบ, เปลี่ยน role)
- จัดการ role และ permissions
- จัดการการเงิน
- ลบ ORD

**2. ORG Admin**
- จัดการข้อมูลองค์กร (แต่ไม่สามารถจัดการ KYB)
- จัดการทีม (เชิญ, ลบ, เปลี่ยน role)
- จัดการ role และ permissions
- จัดการการเงิน
- ไม่สามารถลบ ORD

**3. ORG Member**
- ดูข้อมูลองค์กร
- ไม่สามารถจัดการอะไร

**Application Level - For Buyers (Layer 2)**:

**1. Purchaser**
- สร้างออเดอร์
- ดูออเดอร์ที่สร้างเอง
- ไม่สามารถจัดการ PO หรือ Invoice

**2. Admin**
- จัดการออเดอร์ (สร้าง, ดู, แก้ไข, ยกเลิก)
- จัดการ PO และ Invoice
- ดูรายงาน

**3. Viewer (Read-Only)**
- ดูออเดอร์ทั้งหมด (read-only)
- ดูรายงาน (read-only)

**Application Level - For Sellers (Layer 2)**:

**1. Product Manager**
- จัดการสินค้า (เพิ่ม, แก้ไข, อัปเดตราคา, สต็อก)
- ดูรายงานสินค้า

**2. Order Manager**
- จัดการออเดอร์ (ยืนยัน, จัดการสถานะ, ส่งสินค้า)
- ดูรายงานการขาย

**3. Viewer (Read-Only)**
- ดูสินค้าทั้งหมด (read-only)
- ดูออเดอร์ทั้งหมด (read-only)
- ดูรายงาน (read-only)

---

#### 4.13.3 Custom Roles & Permissions

**Create Custom Role**:
- สร้าง role เองได้
- กำหนด permissions เองได้
- ใช้ได้ทั้ง Organization Level และ Application Level

**Edit Permissions**:
- แก้ไข permissions ของ role ได้
- Assign role ให้สมาชิกทีม

**Permission Granularity**:
- **Organization Permissions**: จัดการข้อมูลองค์กร, จัดการทีม, จัดการการเงิน, จัดการ role
- **Application Permissions**: Buyer (สร้างออเดอร์, จัดการ PO), Seller (จัดการสินค้า, จัดการออเดอร์)

#### 4.13.4 Team Member Management

**Add Team Members to Organization**:
- เชิญสมาชิกทีมเข้า ORD
- กำหนด role ทั้ง 2 layers (ORG level และ App level)
- สมาชิกทีมสามารถทำงานใน ORD ได้

**Assign Team Members to Shop (Seller Only)**:
- สำหรับ Seller: สามารถเอา team member เข้าไปที่ Shop ได้
- Team member สามารถทำงานใน Shop นั้นได้
- 1 team member สามารถอยู่ในหลาย Shop ได้ (ถ้าเป็น ORD เดียวกัน)

**View Team Members**:
- ดูรายชื่อสมาชิกทีมทั้งหมดใน ORD
- ดู role และ permissions ของแต่ละคน
- ดู Shop assignment (Seller only)

---

#### 4.13.5 Team Member Invitation

**Invitation Process**:
1. Account Owner/Admin ส่งคำเชิญ (email)
2. ผู้รับคำเชิญได้รับ email พร้อม link
3. ผู้รับคำเชิญคลิก link และลงทะเบียน/เข้าสู่ระบบ
4. ผู้รับคำเชิญยอมรับคำเชิญ
5. ระบบเพิ่มสมาชิกทีมเข้าระบบ

**Invitation Information**:
- Email ของผู้รับคำเชิญ
- Role ที่ต้องการให้ (Owner, Admin, Purchaser, Viewer, etc.)
- Permissions ที่ต้องการให้ (optional, สามารถปรับได้ภายหลัง)

#### 4.12.3 Team Member Management

**Features**:
- **View Team Members**: ดูรายชื่อสมาชิกทีมทั้งหมด
- **Edit Role**: เปลี่ยน role ของสมาชิกทีม
- **Edit Permissions**: ปรับ permissions ของสมาชิกทีม
- **Remove Member**: ลบสมาชิกทีมออกจากบัญชี
- **Resend Invitation**: ส่งคำเชิญใหม่ (ถ้ายังไม่ได้ยอมรับ)

#### 4.12.4 Activity Log & Audit Trail

**Tracked Activities**:
- การสร้าง/แก้ไข/ลบออเดอร์
- การจัดการสินค้า (สำหรับ Seller)
- การจัดการ PO และ Invoice (สำหรับ Buyer)
- การเปลี่ยนแปลง settings
- การจัดการทีม (เชิญ, ลบ, เปลี่ยน role)

**Activity Log Features**:
- ดูประวัติการทำงานของสมาชิกทีม
- Filter ตามสมาชิก, วันที่, ประเภทกิจกรรม
- Export activity log

#### 4.13.7 Team Notifications

**Notification Types**:
- แจ้งเตือนเมื่อมีออเดอร์ใหม่ (สำหรับ Seller)
- แจ้งเตือนเมื่อออเดอร์เปลี่ยนสถานะ
- แจ้งเตือนเมื่อมีสมาชิกทีมใหม่
- แจ้งเตือนเมื่อ role หรือ permissions เปลี่ยน

**Notification Settings**:
- แต่ละสมาชิกสามารถตั้งค่า notifications ได้เอง
- Account Owner/Admin สามารถตั้งค่า notifications สำหรับทีมได้

---

### 4.13 Payment & Invoicing

#### 4.13.1 Payment Methods
- Credit/Debit Card
- Bank Transfer
- Payment Gateway (PromptPay, TrueMoney, ฯลฯ)
- Credit Terms (B2B)
- Installment (optional)

#### 4.13.2 Invoice Generation
- สร้าง invoice อัตโนมัติ
- Customize invoice template
- ดาวน์โหลด PDF
- ส่ง invoice ผ่าน email

---

### 4.14 Shipping & Delivery

#### 4.14.1 Shipping Options
- Standard shipping
- Express shipping
- Pickup (click & collect)
- Custom shipping (B2B)

#### 4.14.2 Shipping Management (Seller)
- ตั้งค่า shipping rates
- ตั้งค่า shipping zones
- จัดการ courier integration

#### 4.14.3 Tracking
- Track shipping status
- Real-time updates
- Notification when delivered

---

### 4.15 Reviews & Ratings

#### 4.15.1 Product Reviews
- ให้คะแนนสินค้า
- เขียนรีวิว
- อัปโหลดรูปภาพรีวิว
- Verified purchase badge

#### 4.15.2 Seller Reviews
- ให้คะแนนผู้ขาย
- เขียนรีวิวผู้ขาย
- Overall seller rating

---

### 4.16 Communication

#### 4.16.1 Buyer-Seller Messaging
- ระบบข้อความระหว่างผู้ซื้อและผู้ขาย
- Chat support
- In-app notifications

#### 4.16.2 Support
- FAQ
- Help center
- Contact support
- Live chat (optional)

---

### 4.17 Admin Panel

#### 4.17.1 Master SKU Management
- สร้าง/แก้ไข/ลบ Master SKU
- จัดการหมวดหมู่
- จัดการแบรนด์

#### 4.17.2 User Management
- จัดการผู้ใช้ (buyers, sellers)
- Approve/Reject registration
- Manage user permissions
- Suspend/Ban users

#### 4.17.3 Organization Management (KYB)
- อนุมัติ/ปฏิเสธ KYB
- จัดการเอกสาร KYB
- ดูรายการ ORD ทั้งหมด
- Suspend/Activate ORD

#### 4.17.4 Order Management
- ดูออเดอร์ทั้งหมด
- จัดการ dispute
- Refund management

#### 4.17.6 Analytics & Reports
- Dashboard analytics
- Sales reports
- User reports
- Product reports
- Store reports

#### 4.17.7 Personalization Management
- จัดการอาชีพ/กลุ่มธุรกิจ
- จัดการ product-category mapping
- จัดการ recommendation rules
- จัดการ content personalization

#### 4.17.8 System Configuration
- Payment gateway settings
- Shipping settings
- Tax settings
- Commission settings

---

## 5. Technical Requirements

### 5.1 Platform
- Web application (responsive)
- Mobile web (PWA)
- Mobile app (iOS, Android)

### 5.2 Technology Stack (Suggestion)

**Marketplace System**:
- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js / Python / Java
- **Database**: PostgreSQL / MySQL
- **Search**: Database query / Elasticsearch
- **Personalization**: Shopdit (Personalization Engine)
- **Caching**: Redis
- **Storage**: S3 / Cloud Storage
- **Payment**: Payment Gateway Integration
- **Shipping**: Shipping API Integration
- **Multi-Branch**: Branch management system

**Allkons Admin System** (Separate System):
- **Frontend**: Admin Dashboard (React, Vue, หรือ Admin template)
- **Backend**: Node.js / Python / Java
- **Database**: PostgreSQL / MySQL (shared หรือ separate)
- **Search**: Database query (ไม่ใช้ Elasticsearch ใน current scope)
- **File Storage**: S3 / Cloud Storage (for KYC/KYB documents)

### 5.3 Integrations

**Marketplace System**:
- Payment gateway (PromptPay, TrueMoney, Credit Card)
- Shipping providers (Kerry, Flash Express, ฯลฯ)
- Tax calculation
- Invoice generation
- Email/SMS notifications
- **Shopdit Integration**: Personalization engine สำหรับจัดหมวดหมู่สินค้าตามความสนใจ
- **Allkons Admin System**: Integration สำหรับ Master SKU, KYC/KYB, User Management

**Allkons Admin System**:
- **Marketplace System**: Integration สำหรับ sync Master SKU, KYC/KYB status, User status
- **File Storage**: สำหรับเก็บ KYC/KYB documents
- Email/SMS notifications (for approval notifications)

## 6. Non-Functional Requirements

### 6.1 Performance
- Page load time < 3 seconds
- Search results < 1 second
- Handle 10,000+ concurrent users

### 6.2 Security
- SSL/TLS encryption
- PCI DSS compliance (for payment)
- Data encryption
- User authentication & authorization
- GDPR / PDPA compliance

### 6.3 Scalability
- Horizontal scaling
- Load balancing
- CDN for static assets
- Database optimization

### 6.4 Availability
- 99.9% uptime
- Backup & disaster recovery
- Monitoring & alerting

---

## 7. Out of Current Scope

### 7.1 Features Not Included
- Mobile app (iOS, Android)
- Live chat support
- Video product reviews
- Augmented Reality (AR) preview
- Blockchain-based supply chain tracking
- AI-powered recommendations

### 7.2 Services Not Included
- Physical warehouse management
- Delivery service (using 3rd party only)
- Installation service marketplace
- Consultation service

---

## 8. Success Metrics (KPIs)

### 8.1 Business Metrics
- GMV (Gross Merchandise Volume)
- Number of active sellers
- Number of active buyers
- Number of transactions
- Average order value (AOV)
- Commission revenue

### 8.2 User Metrics
- User registration rate
- User activation rate
- User retention rate
- Average session duration
- Bounce rate

### 8.3 Product Metrics
- Number of Master SKUs
- Number of product listings
- Product view rate
- Product conversion rate

### 8.4 Quality Metrics
- Seller rating
- Product rating
- Order fulfillment rate
- Dispute rate
- Customer satisfaction (CSAT)

## 10. Assumptions & Constraints

### 10.1 Assumptions
- ผู้ขายต้องการใช้ Master SKU เพื่อลดภาระการจัดการข้อมูล
- ผู้ซื้อ B2B ต้องการฟีเจอร์เฉพาะ เช่น PO, credit terms
- ตลาดวัสดุก่อสร้างในไทยพร้อมสำหรับ Marketplace

### 10.2 Constraints
- งบประมาณ
- Schedule constraints
- Technical limitations
- Regulatory requirements (PDPA, Tax)
- Market competition

---

## 11. Risks & Mitigation

### 11.1 Risks
1. **Competition**: คู่แข่งอาจมี features ดีกว่า
   - **Mitigation**: Focus on Master SKU + B2B features

2. **Seller Adoption**: ผู้ขายอาจไม่อยากใช้ Master SKU
   - **Mitigation**: Show benefits, make it easy to use

3. **Data Quality**: ข้อมูล Master SKU อาจไม่ถูกต้อง
   - **Mitigation**: Quality control process, regular updates

4. **Technical Issues**: ระบบอาจมีปัญหา
   - **Mitigation**: Thorough testing, monitoring

### 11.2 Dependencies
- Payment gateway integration
- Shipping provider integration
- Master SKU data collection
- Seller onboarding
- Buyer acquisition

---

## 12. Stakeholders

### 12.1 Internal Stakeholders
- Product Owner / Business Analyst
- Development Team
- Design Team
- Marketing Team
- Operations Team
- Management

### 12.2 External Stakeholders
- Buyers (B2B, B2C)
- Sellers (merchants, companies)
- Payment providers
- Shipping providers
- Regulatory bodies (government)

---

## 13. Deliverables

### 13.1 Documentation
- Competitive analysis [x]
- Project scope (this document) [x]
- Personas
- User stories
- Technical specifications
- API documentation

### 13.2 Design
- Wireframes
- UI/UX designs
- Design system
- Prototypes

### 13.3 Development
- Web application
- Admin panel
- APIs
- Database schema

---

## 14. Approval & Sign-off

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Status**: Draft / In Review / Approved

**Approved By:**
- [ ] Product Owner
- [ ] Business Analyst
- [ ] Technical Lead
- [ ] Management

---

## Appendix

### A. Glossary
- **Master SKU**: ข้อมูลสินค้าหลักที่ควบคุมโดยแพลตฟอร์ม
- **Marketplace**: ตลาดออนไลน์ที่ผู้ขายหลายรายขายสินค้า
- **B2B**: Business-to-Business
- **B2C**: Business-to-Consumer
- **PO**: Purchase Order (ใบสั่งซื้อ)
- **GMV**: Gross Merchandise Volume

### B. References
- Competitive Analysis Document
- Personas Document
- Stakeholder Analysis Document
