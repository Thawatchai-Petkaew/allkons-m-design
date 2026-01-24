# Logic: Pricing, Promotion & Visibility Strategy

เอกสารนี้อธิบายตรรกะการทำงาน (Logic) ของการแสดงผลสินค้าและราคา โดยแบ่งตาม **พื้นที่การขาย (Sales Area)** และ **กลุ่มลูกค้า (Customer Group)** เพื่อรองรับ Model B2B และ B2C ใน Platform เดียวกัน

---

## 1. Location-Based Visibility (พื้นที่การขาย)

**โจทย์:** สินค้าบางอย่าง (เช่น วัสดุก่อสร้างขนาดใหญ่) ไม่สามารถส่งข้ามจังหวัดได้ หรือผู้ขายกำหนดพื้นที่ให้บริการเฉพาะ

### 1.1 Data Structure
*   **Seller (Shop)**: กำหนด `Service Area` ได้
    *   *Level 1*: Nationwide (ส่งทั่วประเทศ)
    *   *Level 2*: Region/Province (ระบุจังหวัด)
    *   *Level 3*: District/Zipcode (ระบุเขต/รหัสไปรษณีย์)
*   **Buyer**: ระบุ `Shipping Address` (หรือใช้ Location ปัจจุบันในการค้นหา)

### 1.2 Matching Logic (Algorithm)
เมื่อผู้ซื้อค้นหาสินค้า ระบบจะ Filter สินค้าที่จะแสดงผลดังนี้:

1.  **ตรวจสอบที่อยู่ผู้ซื้อ (User Context)**:
    *   *ถ้า Login*: ใช้ Default Shipping Address
    *   *ถ้า Guest*: ขอ Permission ที่อยู่ปัจจุบัน หรือให้เลือกจังหวัดตั้งต้น
2.  **Query Logic**:
    ```sql
    SELECT * FROM Products
    WHERE product.status = 'ACTIVE'
    AND (
        shop.service_area = 'NATIONWIDE' 
        OR shop.service_provinces IN (user.current_province)
    )
    ```
3.  **Result**: ผู้ซื้อจะเห็นเฉพาะสินค้าที่ **"ผู้ขายยินดีไปส่ง"** ในพื้นที่นั้นๆ

---

## 2. Dynamic Pricing Engine (ราคาสินค้า)

**โจทย์:** สินค้าชิ้นเดียวกัน แต่ราคาแสดงผลไม่เท่ากัน ขึ้นอยู่กับว่า "ใคร" เป็นคนดู (B2C vs B2B)

### 2.1 Pricing Hierarchy (ลำดับการคำนวณราคา)
ระบบจะตรวจสอบเงื่อนไขตามลำดับความสำคัญ (Priority) ดังนี้:

| Priority | Type | Description | Condition |
| :--- | :--- | :--- | :--- |
| **1 (High)** | **Customer Specific Price** | ราคาเฉพาะรายบริษัท (Negotiated) | `User.ORG_ID` ตรงกับเงื่อนไข |
| **2** | **Customer Group Price** | ราคาตามกลุ่มลูกค้า (Tier) | `User.Group` (e.g., Retailer, VIP) |
| **3** | **Promotion / Campaign** | โปรโมชั่นชั่วคราว (Flash Sale) | อยู่ในช่วงเวลา & User มีสิทธิ์ |
| **4** | **Volume Discount (Tier)** | ลดตามจำนวน (ตั้งแต่ชิ้นที่ X) | จำนวนในตะกร้า >= Terms |
| **5 (Low)** | **Base Price (Retail)** | ราคาขายปลีกมาตรฐาน | Default (Guest / General User) |

### 2.2 Customer Group Logic
1.  **Assign Group**: ผู้ขาย (Seller) สามารถจัดกลุ่มผู้ซื้อได้ หรือ Platform จัดกลุ่มให้
    *   *Group A*: ลูกค้าทั่วไป (General)
    *   *Group B*: ช่างรับเหมา (Registered Merchant)
    *   *Group C*: ร้านค้าช่วง/ตัวแทน (Wholesaler/Retailer)
2.  **Price Mapping**:
    *   *Product A*: Base Price = 100 บาท
    *   *Rule*: Group B ลด 5% (Show 95), Group C ลด 20% (Show 80)

### 2.3 Display Logic (การแสดงผลหน้าเว็บ)

*   **Guest / General User**:
    *   Price: แสดง **Base Price** (เช่น 100.-)
    *   Label: ราคาปกติ
*   **B2B Logged-in User (e.g., Retailer)**:
    *   Price: แสดง **Group Price** (เช่น 80.-)
    *   Original Price: ~~100.-~~ (ขีดฆ่าเพื่อให้เห็น Benefit)
    *   Label: "ราคาสมาชิก" หรือ "ราคาส่ง"

---

## 3. Promotion Visibility

### 3.1 Targeted Promotion
*   โปรโมชั่นบางอย่างแสดงเฉพาะกลุ่ม
    *   *Example*: "ส่วนลดท้ายบิล 5% สำหรับร้านค้าช่วงเท่านั้น"
*   **Logic**:
    ```javascript
    if (user.groups.includes('RETAILER')) {
        showPromotionBanner('PROMO_RETAILER_01');
    }
    ```

### 3.2 Volume Discount (Bulk)
*   แสดงตารางราคาแบบขั้นบันไดในหน้า Product Detail เพื่อกระตุ้นยอดซื้อ
    *   1-9 ชิ้น: 100 บาท
    *   10-49 ชิ้น: 90 บาท
    *   50+ ชิ้น: 85 บาท

---

## 4. Summary Table

| User Type | Location Filter | Price Shown | Can See Promo? |
| :--- | :--- | :--- | :--- |
| **Guest** | อิง Location ปัจจุบัน | Base Price | General Promo Only |
| **B2C Buyer** | อิง Default Address | Base Price | General + Member Promo |
| **B2B Buyer** (Retailer) | อิง Warehouse Address | **Group Price (Lower)** | **Exclusive B2B Promo** |
