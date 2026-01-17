# Promotion & Campaign Module: Allkons M

## Executive Summary
Module สำหรับการจัดการโปรโมชั่นและแคมเปญ (Promotions & Campaigns) ในระบบ Allkons M โดยรองรับ Customer Group-based promotions และ Personalization

---

## 1. Module Overview

### 1.1 Purpose
- **Promotion Management**: จัดการโปรโมชั่นต่างๆ
- **Campaign Management**: จัดการแคมเปญการตลาด
- **Customer Group Pricing**: ตั้งราคาตามกลุ่มลูกค้า
- **Promotion Analytics**: วิเคราะห์ผลโปรโมชั่น

### 1.2 Scope
- Promotion Center
- Promotion Types (Discount, Special Price, Customer Group, Bulk Pricing)
- Promotion Rules & Conditions
- Promotion Scheduling
- Coupon/Voucher Management
- Promotion Analytics
- Integration with Product & Order Modules

---

## 2. Common Functions & Features

### 2.1 Promotion Types

#### 2.1.1 Customer Group Promotions

**Definition**: โปรโมชั่นที่กำหนดให้เฉพาะกลุ่มลูกค้า

**Customer Groups**:
- **Job Role Groups**: ช่างประปา, ช่างไฟฟ้า, ช่างก่อสร้าง, สถาปนิก, วิศวกร
- **Business Type Groups**: ธุรกิจก่อสร้าง, อสังหาริมทรัพย์, รับเหมา
- **Volume Groups**: High Volume, Medium Volume, Low Volume
- **Custom Groups**: สร้างกลุ่มเองได้

**Promotion Types**:
- **Percentage Discount**: ส่วนลดเป็นเปอร์เซ็นต์ (เช่น 10% off)
- **Fixed Discount**: ส่วนลดเป็นจำนวนเงิน (เช่น 500 บาท off)
- **Special Price**: ราคาพิเศษ (เช่น ราคา 1,000 บาท แทน 1,500 บาท)
- **Buy X Get Y**: ซื้อ X แถม Y (เช่น ซื้อ 3 แถม 1)
- **Free Shipping**: ส่งฟรี

**Example**:
- ช่างประปา → ส่วนลด 15% สำหรับสินค้าประปา
- บริษัทก่อสร้าง → ราคาพิเศษสำหรับวัสดุก่อสร้าง
- High Volume → ส่วนลดเพิ่มตามจำนวน

---

#### 2.1.2 Discount Promotions

**Discount Types**:
- **Percentage Discount**: ส่วนลดเป็นเปอร์เซ็นต์
- **Fixed Amount Discount**: ส่วนลดเป็นจำนวนเงิน
- **Tiered Discount**: ส่วนลดตามจำนวน (เช่น ซื้อ 10 ชิ้น = 10%, ซื้อ 50 ชิ้น = 15%)

**Discount Scope**:
- **Product-level**: ส่วนลดเฉพาะสินค้า
- **Category-level**: ส่วนลดทั้งหมวดหมู่
- **Cart-level**: ส่วนลดทั้งตะกร้า
- **Order-level**: ส่วนลดทั้งออเดอร์

**Discount Rules**:
- Minimum order value
- Minimum quantity
- Maximum discount amount
- Stackability (can combine with other promotions)

---

#### 2.1.3 Special Price Promotions

**Special Price Types**:
- **Fixed Price**: ราคาคงที่ (เช่น 1,000 บาท)
- **Percentage Off**: ลดเปอร์เซ็นต์ (เช่น ลด 20%)
- **Volume-based Price**: ราคาตามจำนวน (เช่น 10 ชิ้น = 900 บาท/ชิ้น)

**Special Price Scope**:
- **Product-level**: ราคาพิเศษเฉพาะสินค้า
- **Category-level**: ราคาพิเศษทั้งหมวดหมู่
- **Customer Group**: ราคาพิเศษสำหรับกลุ่มลูกค้า

---

#### 2.1.4 Bulk Pricing Promotions

**Bulk Pricing Tiers**:
- **Volume-based**: ราคาตามจำนวน (เช่น 1-10 ชิ้น = 1,000 บาท, 11-50 ชิ้น = 900 บาท)
- **Value-based**: ราคาตามมูลค่า (เช่น 10,000-50,000 บาท = 5% off, >50,000 บาท = 10% off)

**Bulk Pricing Rules**:
- Minimum quantity
- Maximum quantity (optional)
- Price per tier
- Automatic application

---

### 2.2 Promotion Center

#### 2.2.1 Create Promotion

**Promotion Creation Flow**:
1. Seller/Admin goes to Promotion Center
2. Click "Create Promotion"
3. Select promotion type
4. Configure promotion details:
   - Name, Description
   - Promotion type (Discount, Special Price, etc.)
   - Target (Products, Categories, Customer Groups)
   - Rules & Conditions
   - Schedule (Start date, End date)
5. Preview promotion
6. Save and activate

**Promotion Configuration**:
- **Basic Info**:
  - Promotion name
  - Description
  - Promotion code (optional)
  - Promotion image/banner

- **Promotion Type**:
  - Discount (Percentage, Fixed)
  - Special Price
  - Customer Group Pricing
  - Bulk Pricing
  - Buy X Get Y
  - Free Shipping

- **Target**:
  - Products (specific products, all products)
  - Categories (specific categories, all categories)
  - Customer Groups (specific groups, all groups)

- **Rules & Conditions**:
  - Minimum order value
  - Minimum quantity
  - Maximum discount amount
  - Usage limit (per customer, total)
  - Stackability

- **Schedule**:
  - Start date/time
  - End date/time
  - Timezone

---

#### 2.2.2 Promotion Management

**Promotion Operations**:
- View all promotions
- Edit promotion
- Activate/Deactivate promotion
- Delete promotion
- Duplicate promotion
- View promotion analytics

**Promotion Status**:
- **Draft**: ยังไม่ได้เปิดใช้งาน
- **Active**: กำลังใช้งาน
- **Scheduled**: ตั้งเวลาไว้
- **Expired**: หมดอายุ
- **Paused**: ถูกหยุดชั่วคราว
- **Cancelled**: ถูกยกเลิก

---

#### 2.2.3 Promotion Rules & Conditions

**Common Rules**:
- **Minimum Order Value**: ออเดอร์ขั้นต่ำ (เช่น 5,000 บาท)
- **Minimum Quantity**: จำนวนขั้นต่ำ (เช่น 10 ชิ้น)
- **Maximum Discount**: ส่วนลดสูงสุด (เช่น ไม่เกิน 2,000 บาท)
- **Usage Limit**: จำกัดการใช้งาน
  - Per customer: ใช้ได้กี่ครั้งต่อลูกค้า
  - Total: ใช้ได้ทั้งหมดกี่ครั้ง
- **Stackability**: สามารถใช้ร่วมกับโปรโมชั่นอื่นได้หรือไม่
- **Exclusions**: สินค้าที่ไม่รวมในโปรโมชั่น

**Condition Types**:
- **AND Conditions**: ต้องครบทุกเงื่อนไข
- **OR Conditions**: ต้องมีเงื่อนไขใดเงื่อนไขหนึ่ง
- **Complex Conditions**: เงื่อนไขซับซ้อน (AND + OR)

---

#### 2.2.4 Promotion Scheduling

**Schedule Features**:
- **Start Date/Time**: วันที่และเวลาที่เริ่มโปรโมชั่น
- **End Date/Time**: วันที่และเวลาที่สิ้นสุดโปรโมชั่น
- **Timezone**: เขตเวลา
- **Recurring**: โปรโมชั่นที่ทำซ้ำ (เช่น ทุกวันศุกร์)
- **Auto-activate**: เปิดใช้งานอัตโนมัติตามเวลา
- **Auto-deactivate**: ปิดใช้งานอัตโนมัติตามเวลา

---

### 2.3 Coupon/Voucher Management

#### 2.3.1 Coupon Types

**Coupon Types**:
- **Percentage Coupon**: ส่วนลดเป็นเปอร์เซ็นต์ (เช่น COUPON10 = 10% off)
- **Fixed Amount Coupon**: ส่วนลดเป็นจำนวนเงิน (เช่น COUPON500 = 500 บาท off)
- **Free Shipping Coupon**: ส่งฟรี
- **Buy X Get Y Coupon**: ซื้อ X แถม Y

**Coupon Generation**:
- **Single-use**: ใช้ได้ครั้งเดียว
- **Multi-use**: ใช้ได้หลายครั้ง
- **Per Customer**: ใช้ได้ครั้งเดียวต่อลูกค้า
- **Bulk Generation**: สร้างหลายโค้ดพร้อมกัน

---

#### 2.3.2 Coupon Management

**Coupon Operations**:
- Create coupon
- Generate coupon codes
- View coupon usage
- Deactivate coupon
- Delete coupon
- Export coupon codes

**Coupon Settings**:
- Coupon code format
- Code length
- Prefix/Suffix
- Expiration date
- Usage limit

---

### 2.4 Promotion Analytics

#### 2.4.1 Promotion Metrics

**Key Metrics**:
- **Promotion Performance**:
  - Number of uses
  - Total discount given
  - Revenue generated
  - Conversion rate
  - Average order value (AOV)

- **Customer Engagement**:
  - Number of customers used
  - Repeat usage rate
  - Customer acquisition

- **Product Performance**:
  - Products sold with promotion
  - Sales increase
  - Inventory impact

---

#### 2.4.2 Promotion Reports

**Report Types**:
- Promotion performance report
- Customer group performance report
- Product performance report
- Revenue impact report
- ROI analysis

**Report Features**:
- Filter by date range
- Filter by promotion type
- Filter by customer group
- Export to Excel/PDF
- Scheduled reports

---

## 3. Integration with Other Modules

### 3.1 Product Module Integration

**Integration Points**:
- Apply promotion to products
- Show promotion price on product page
- Promotion badge/indicator
- Promotion in product listing

**Features**:
- Product-level promotions
- Category-level promotions
- Bulk pricing display
- Price comparison (original vs promotion price)

---

### 3.2 Order Module Integration

**Integration Points**:
- Apply promotion at checkout
- Calculate discount
- Apply coupon code
- Promotion validation

**Features**:
- Automatic promotion application
- Manual coupon entry
- Promotion stacking rules
- Discount calculation
- Order total with promotion

---

### 3.3 Personalization Module Integration

**Integration Points**:
- Customer Group-based promotions
- Job Role-based promotions
- Business Type-based promotions
- Personalized promotion display

**Features**:
- Show relevant promotions to users
- Targeted promotions
- Promotion recommendations

---

## 4. User Stories

### 4.1 Seller User Stories

**US-PROMO-001: Create Customer Group Promotion**
- **As a** Seller
- **I want to** create promotion for specific customer group
- **So that** I can offer special prices to targeted customers
- **Acceptance Criteria**:
  - Can select customer group
  - Can set promotion type (discount, special price)
  - Can set rules and conditions
  - Can schedule promotion

**US-PROMO-002: Create Bulk Pricing Promotion**
- **As a** Seller
- **I want to** create bulk pricing promotion
- **So that** I can offer volume discounts
- **Acceptance Criteria**:
  - Can set pricing tiers
  - Can set minimum quantity
  - Can apply to specific products/categories
  - Price automatically applied at checkout

---

### 4.2 Buyer User Stories

**US-PROMO-003: View Available Promotions**
- **As a** Buyer
- **I want to** see available promotions
- **So that** I can take advantage of discounts
- **Acceptance Criteria**:
  - Can see promotions relevant to me (customer group)
  - Can see promotion details
  - Can see promotion price on products
  - Can apply coupon code

**US-PROMO-004: Apply Coupon Code**
- **As a** Buyer
- **I want to** apply coupon code at checkout
- **So that** I can get discount
- **Acceptance Criteria**:
  - Can enter coupon code
  - System validates coupon
  - Discount applied to order
  - Can see discount amount

---

## 5. Technical Requirements

### 5.1 Promotion Engine

**Components**:
- Promotion Rule Engine
- Promotion Calculator
- Promotion Validator
- Promotion Cache

**Promotion Calculation Flow**:
1. User adds products to cart
2. System checks applicable promotions
3. System applies promotions based on rules
4. System calculates final price
5. System displays promotion details

---

### 5.2 APIs

**Promotion APIs**:
- `GET /api/promotions` - Get available promotions
- `GET /api/promotions/{id}` - Get promotion details
- `POST /api/promotions` - Create promotion (Seller/Admin)
- `PUT /api/promotions/{id}` - Update promotion
- `DELETE /api/promotions/{id}` - Delete promotion
- `POST /api/promotions/{id}/activate` - Activate promotion
- `POST /api/promotions/{id}/deactivate` - Deactivate promotion

**Coupon APIs**:
- `POST /api/coupons/validate` - Validate coupon code
- `POST /api/coupons/apply` - Apply coupon to cart
- `GET /api/coupons` - Get coupons (Admin)
- `POST /api/coupons/generate` - Generate coupon codes

**Promotion Calculation APIs**:
- `POST /api/promotions/calculate` - Calculate promotion for cart
- `GET /api/promotions/applicable` - Get applicable promotions for user

---

## 6. Common Functions Reference

### 6.1 Promotion Functions

```typescript
// Promotion Management
createPromotion(data: PromotionData): Promise<Promotion>
updatePromotion(id: string, data: PromotionData): Promise<Promotion>
deletePromotion(id: string): Promise<void>
activatePromotion(id: string): Promise<void>
deactivatePromotion(id: string): Promise<void>
getPromotion(id: string): Promise<Promotion>
getPromotions(filters: PromotionFilters): Promise<Promotion[]>

// Promotion Calculation
calculatePromotion(cart: Cart, userId: string): Promise<PromotionResult>
getApplicablePromotions(userId: string, products: Product[]): Promise<Promotion[]>
applyPromotion(cart: Cart, promotionId: string): Promise<Cart>

// Coupon Management
createCoupon(data: CouponData): Promise<Coupon>
validateCoupon(code: string, cart: Cart): Promise<CouponValidation>
applyCoupon(cart: Cart, code: string): Promise<Cart>
generateCouponCodes(couponId: string, count: number): Promise<CouponCode[]>
```

---

## 7. Success Metrics

### 7.1 Promotion Metrics

- Promotion usage rate
- Average discount per order
- Revenue increase from promotions
- Conversion rate increase
- Customer acquisition from promotions
- ROI of promotions

---

## 8. Implementation Priority

### Phase 1 (MVP)
- ✅ Basic discount promotions
- ✅ Customer group promotions
- ✅ Special price promotions
- ✅ Coupon codes
- ✅ Basic promotion rules

### Phase 2
- ✅ Bulk pricing promotions
- ✅ Promotion scheduling
- ✅ Promotion analytics
- ✅ Advanced rules

### Phase 3
- ✅ Recurring promotions
- ✅ A/B testing
- ✅ Advanced analytics

---

## 9. Dependencies

### 9.1 External Dependencies
- None (internal module)

### 9.2 Internal Dependencies
- Product Module
- Order Module
- Personalization Module (Customer Groups)
- User Management Module

---

## Appendix

### A. Promotion Examples

**Customer Group Promotion**:
- ช่างประปา → 15% off สินค้าประปา
- บริษัทก่อสร้าง → Special price วัสดุก่อสร้าง

**Bulk Pricing**:
- 1-10 ชิ้น: 1,000 บาท/ชิ้น
- 11-50 ชิ้น: 900 บาท/ชิ้น
- 51+ ชิ้น: 800 บาท/ชิ้น

**Coupon**:
- COUPON10: 10% off (min order 5,000 บาท)
- FREESHIP: Free shipping (min order 1,000 บาท)

### B. References
- Project Scope Document
- Product Module Document
- Personalization Strategy Document
- Web Search: B2B Promotion Campaign Management
