# Glossary (Source of Truth): Allkons M

เอกสารนี้คือ “คำศัพท์กลาง” สำหรับใช้ในการพัฒนา/ออกแบบ/เขียนเอกสาร เพื่อให้ทุกคนใช้คำและความหมายตรงกัน

---

## 1) Core Principles

### Marketplace-only
Allkons M เป็น **Marketplace-only**
- การค้นหา/แสดงผล/ซื้อขายเกิดขึ้นผ่าน Marketplace เป็นหลัก
- ไม่มีแนวคิดของ “เว็บไซต์ร้านค้าแยก” หรือช่องทางแยกนอก Marketplace

### Context Required: ORG + Branch
ทุกการทำงานที่เกี่ยวกับข้อมูลธุรกิจ/การซื้อขาย ต้องอยู่ภายใต้บริบท:
- **ORG** (องค์กร)
- **Branch** (สาขา)

---

## 2) Identity & Verification

### Account
ตัวตนของผู้ใช้ระดับบุคคล (เช่น เจ้าของ, พนักงาน) ที่ใช้ login

### KYC (Know Your Customer)
การยืนยันตัวตนของ **Account**

### ORG (Organization)
องค์กรที่ผู้ใช้ทำงานด้วย (เช่น บริษัท/ร้านค้าในเชิงกฎหมาย)

### KYB (Know Your Business)
การยืนยันตัวตนของ **ORG** (เอกสารธุรกิจ/นิติบุคคล)

---

## 3) Business Structure

### Shop
หน่วยธุรกิจภายใต้ ORG (1 ORG = 1 Shop)
- ใช้เก็บ “โปรไฟล์ร้าน” สำหรับแสดงใน Marketplace และใช้ในเอกสาร/ธุรกรรม

### Branch
สาขาของ Shop
- 1 Shop มีได้หลาย Branch
- ต้องมีอย่างน้อย 1 Branch (Main)

### Main Branch
สาขาหลักของ Shop (ระบุด้วย flag เช่น `is_main`)

---

## 4) Product Domain

### Master SKU
ข้อมูลหลักของสินค้า (single source of truth)
- ถูกดูแล/ควบคุมคุณภาพจากฝั่งระบบ/แอดมิน Master SKU
- ใช้เป็น “จุดเริ่มต้น” ของสินค้าทั้งระบบ

### Store Product (Listing)
สินค้า “ที่อยู่ในร้าน” ของผู้ขาย โดย **อ้างอิง Master SKU เท่านั้น**
- ผู้ขายไม่สามารถสร้าง Master SKU เอง
- ถ้าไม่พบ Master SKU: ต้อง **ส่งคำขอให้ Master SKU Admin ตรวจสอบ/เพิ่ม**

### Unique Content (Store Product editable fields)
ข้อมูลที่ผู้ขายแก้ได้เพื่อทำให้ listing ของร้านมีความแตกต่าง (ไม่กระทบ Master SKU)
- Product name
- Description
- Product thumbnail
- Discount price + time period

### Branch-level Data (ownership)
ข้อมูลที่เป็นของระดับ Branch (ต้องมีบริบท ORG + Branch)
- ราคา (Base/Special/Discount ตามกติกา)
- สต็อก
- การเปิด/ปิดขาย (active/visibility)

---

## 5) Permissions & Scope

### Two-layer permissions
สิทธิ์มี 2 ชั้น:
- **ORG level**: สิทธิ์การจัดการองค์กร (เชิญทีม, จัดการ role, จัดการข้อมูล ORG)
- **App level**: สิทธิ์การทำงานในแอปตามบริบท (เช่น Buyer/Seller features)

### Scope
ขอบเขตของ permission/ข้อมูล (ตัวอย่าง)
- ORG scope
- Shop scope
- Branch scope

---

## 6) Key Terms Mapping (Common Confusions)

- **Master SKU**: ข้อมูลสินค้ากลางของระบบ
- **Store Product**: listing ของร้านที่ผูกกับ Master SKU
- **ORG**: องค์กรที่ทำงานด้วย
- **Shop**: หน่วยธุรกิจใต้ ORG (1:1)
- **Branch**: สาขาใต้ Shop (1:N)

---

## 7) Rules Snapshot

- Seller เพิ่มสินค้าได้จาก **Master SKU เท่านั้น**
- Not in system → **ส่งคำขอให้ Master SKU Admin ตรวจสอบ/เพิ่ม**
- การทำงานเชิงธุรกรรม/การจัดการข้อมูลระดับสาขา → ต้องระบุ **ORG + Branch**
