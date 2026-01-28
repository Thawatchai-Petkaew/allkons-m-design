# B2B Strategy Analysis: Factory to Retailer (RFQ Model)

## 1. Context & Problem Statement
**โจทย์**: การซื้อขายระหว่าง "โรงงานผู้ผลิต" (Factory) และ "ร้านค้าช่วง" (Retailer/Sub-distributor) มีพฤติกรรมที่ต่างจาก B2C ทั่วไป โดยมักเริ่มจากการขอใบเสนอราคา (Request for Quotation - RFQ) แทนการกดซื้อทันที

**คำถาม**: ควรปรับระบบเพื่อแยกกลุ่ม B2B และ B2C หรือไม่?

---

## 2. Analysis: B2B vs B2C Nature

| Feature | B2C (End User) | B2B (Factory to Retailer) |
| :--- | :--- | :--- |
| **Buying Trigger** | Need for specific item, Emotional buy | Re-stocking, Project requiment |
| **Price** | Fixed Price (ราคาตายตัว) | Volume-based, Negotiable (ต่อรองได้) |
| **Process** | Add to Cart → Checkout → Pay | RFQ → Quotation → Negotiation → PO → Invoice |
| **Relationship** | Transactional (ซื้อแล้วจบ) | Long-term (คู่ค้าต่อเนื่อง) |
| **Payment** | Instant (Credit Card, QR) | Credit Terms (30/60 days) |

## 3. Recommendation: Hybrid Model (Separated Flows, Unified Platform)

**"แยก Flow การซื้อขาย"** ตามประเภทสินค้าและประเภทผู้ซื้อ

### 3.1 Why Hybrid?
- **Unified Inventory**: โรงงานบางแห่งอาจขายปลีก (Direct to Consumer) ในบางสินค้า
- **Seamless Experience**: ร้านค้าช่วง (Retailer) อาจต้องการซื้อสินค้าบางอย่างแบบด่วน (Buy Now) และบางอย่างแบบล็อตใหญ่ (RFQ) ในบัญชีเดียวกัน

### 3.2 Proposed New Flows

#### A. RFQ Flow (สำหรับ B2B / Factory Products)
เหมาะสำหรับ: สินค้าสั่งผลิต, สินค้าขายส่งจำนวนมาก (Bulk), สินค้าจากโรงงาน
1. **User Action**: แทนปุ่ม "Add to Cart" → แสดงปุ่ม **"ขอใบเสนอราคา" (Request Quotation)**
2. **RFQ Process**:
    - ผู้ซื้อระบุจำนวน, สเปค, วันที่ต้องการ
    - ผู้ขาย (โรงงาน) ส่งใบเสนอราคา (Quotation) กลับมา
    - ผู้ซื้อกด Accept → ระบบแปลงเป็น PO (Purchase Order)
3. **Price Visibility**: อาจซ่อนราคา (Show Price just for Member) หรือแสดงราคาตั้งต้น (Base Price) แต่จบจริงที่ราคาเสนอ

#### B. Wholesale/Tiered Pricing Flow (สำหรับ "ร้านค้าช่วง" ซื้อของทั่วไป)
เหมาะสำหรับ: สินค้ามาตรฐานที่มีสต็อกพร้อมส่ง
1. **Tiered Pricing**: แสดงตารางราคาตามจำนวน (เช่น 1-10 ชิ้น 100 บาท, 100+ ชิ้น 80 บาท)
2. **Instant B2B Checkout**: กดใส่ตะกร้าได้เลย ระบบคำนวณราคาส่งอัตโนมัติ
3. **Payment**: รองรับ Credit Terms ในหน้า Checkout

---

## 4. Updates Required (สิ่งที่ต้องปรับในระบบ)

1. **User Types**:
    - เพิ่ม/ขยายนิยาม **"Factory/Manufacturer"** ในฝั่ง Seller (เน้น RFQ)
    - ร้านค้าช่วงคือ **"Registered Individual Merchant"** หรือ **"Legal Entity"** (ฝั่ง Buyer)

2. **Product Module**:
    - เพิ่ม Attribute: `allow_rfq` (Boolean) - สินค้านี้ต้องขอราคาหรือไม่
    - เพิ่ม Attribute: `min_order_quantity` (MOQ)

3. **Order Module**:
    - เพิ่มสถานะใหม่: `QUOTATION_REQUESTED`, `QUOTATION_SENT`, `PO_ISSUED`

---

## 5. Conclusion
**"ควรปรับ"** โดยการเพิ่ม feature **RFQ System** เข้ามาซ้อนทับใน Marketplace เดิม ไม่ใช่การแยกเว็บใหม่ เพื่อให้ platform รองรับ transaction หลายรูปแบบ (Flexible B2B2C Marketplace)
