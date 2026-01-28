# Pricing Management Module (Complete): Allkons M

## Executive Summary
Module สำหรับการจัดการราคา (Pricing Management) ในระบบ Allkons M โดยรองรับ Base Price, Promotion Price, Customer Group Pricing, และ Branch-level Pricing

---

## 1. Module Overview

### 1.1 Purpose
- **Price Management**: จัดการราคาสินค้า
- **Pricing Rules**: กฎการตั้งราคา
- **Price History**: ประวัติราคา
- **Price Comparison**: เปรียบเทียบราคา

### 1.2 Scope
- Base Price Management
- Promotion Price Management
- Bulk Pricing Rules
- Customer Group Pricing
- Branch-level Pricing
- Price History
- Price Comparison Tools
- Price Synchronization

---

## 2. Common Functions & Features

### 2.1 Base Price Management

#### 2.1.1 Base Price Settings

**Price Configuration**:
- **Set at Head Office Only**: ตั้งราคาพื้นฐานได้เฉพาะที่ Head Office
- **In VAT**: ราคารวม VAT
- **Ex VAT**: ราคาไม่รวม VAT
- **Currency**: สกุลเงิน (THB default)

**Price Display**:
- Show price with/without VAT
- Show both prices
- Price format (1,000.00 THB)

---

#### 2.1.2 Base Price Management

**Price Operations**:
- Set base price
- Update base price
- View base price
- Price validation
- Price approval (if required)

**Price Rules**:
- Minimum price (prevent loss)
- Maximum price (prevent overpricing)
- Price change limits (prevent drastic changes)
- Price approval workflow (for large changes)

---

### 2.2 Promotion Price Management

#### 2.2.1 Promotion Price Types

**Customer Group Pricing**:
- Set price for specific customer groups
- Job Role-based pricing
- Business Type-based pricing
- Volume-based pricing

**Special Price**:
- **At Head Office**: ราคาพิเศษที่สำนักงานใหญ่
- **At Sub-branch**: ราคาพิเศษที่สาขาย่อย
- Time-limited special price
- Quantity-based special price

**Discount (Promotion Center)**:
- Percentage discount
- Fixed amount discount
- Tiered discount

---

#### 2.2.2 Promotion Price Rules

**Price Priority**:
1. Special Price (highest priority)
2. Customer Group Price
3. Promotion Discount
4. Base Price (lowest priority)

**Price Stacking**:
- Can stack: Customer Group Price + Promotion Discount
- Cannot stack: Special Price + Promotion Discount (use Special Price only)

---

### 2.3 Bulk Pricing Rules

#### 2.3.1 Bulk Pricing Tiers

**Volume-based Pricing**:
- Tier 1: 1-10 ชิ้น = Base Price
- Tier 2: 11-50 ชิ้น = Base Price - 5%
- Tier 3: 51-100 ชิ้น = Base Price - 10%
- Tier 4: 101+ ชิ้น = Base Price - 15%

**Value-based Pricing**:
- Tier 1: 0-10,000 THB = Base Price
- Tier 2: 10,001-50,000 THB = Base Price - 3%
- Tier 3: 50,001-100,000 THB = Base Price - 5%
- Tier 4: 100,001+ THB = Base Price - 8%

**Bulk Pricing Configuration**:
- Create pricing tiers
- Set minimum quantity/value
- Set discount per tier
- Apply to products/categories

---

#### 2.3.2 Bulk Pricing Application

**Automatic Application**:
- Applied automatically at checkout
- Based on cart quantity or value
- Best price selected
- Price breakdown shown

**Bulk Pricing Display**:
- Show pricing tiers on product page
- Show applicable price based on quantity
- Show savings amount

---

### 2.4 Customer Group Pricing

#### 2.4.1 Group-based Pricing

**Customer Groups**:
- **Job Role Groups**: ช่างประปา, ช่างไฟฟ้า, ช่างก่อสร้าง
- **Business Type Groups**: ธุรกิจก่อสร้าง, อสังหาริมทรัพย์
- **Volume Groups**: High Volume, Medium Volume, Low Volume
- **Custom Groups**: สร้างกลุ่มเองได้

**Pricing per Group**:
- Set price for each customer group
- Different prices for different groups
- Group-specific discounts
- Group-specific special prices

---

#### 2.4.2 Group Price Management

**Price Operations**:
- Set group price
- Update group price
- View group prices
- Delete group price
- Bulk update group prices

**Price Display**:
- Show price based on customer group
- Show group-specific prices
- Hide prices for non-qualified groups

---

### 2.5 Branch-level Pricing

#### 2.5.1 Branch Pricing

**Pricing per Branch**:
- Head Office: Base price
- Sub-branch 1: Different price
- Sub-branch 2: Different price

**Branch Price Rules**:
- Can set different prices per branch
- Can set special price per branch
- Price inheritance (from Head Office)
- Price override (at branch)

---

#### 2.5.2 Branch Price Management

**Price Operations**:
- Set branch price
- Update branch price
- View branch prices
- Sync prices from Head Office
- Override Head Office price

**Price Sync**:
- Sync base price from Head Office
- Branch can override
- Sync special price (optional)
- Manual sync or auto-sync

---

### 2.6 Price History

#### 2.6.1 History Tracking

**Tracked Events**:
- Base price changed
- Promotion price changed
- Special price changed
- Customer group price changed
- Branch price changed
- Bulk pricing changed

**History Details**:
- Timestamp
- User who made change
- Change type
- Previous price
- New price
- Reason (optional)
- Effective date

---

#### 2.6.2 History Features

**View History**:
- All price changes
- Filter by date
- Filter by product
- Filter by branch
- Filter by change type
- Price trend chart

**History Reports**:
- Price change report
- Price trend report
- Price comparison report
- Export history

---

### 2.7 Price Comparison Tools

#### 2.7.1 Comparison Features

**Price Comparison**:
- Compare prices across sellers
- Compare prices across branches
- Compare historical prices
- Compare customer group prices

**Comparison Display**:
- Side-by-side comparison
- Price difference highlighted
- Best price indicator
- Price trend visualization

---

## 3. User Stories

### 3.1 Pricing User Stories

**US-PRICE-001: Set Customer Group Price**
- **As a** Seller
- **I want to** set price for specific customer group
- **So that** I can offer special prices to targeted customers
- **Acceptance Criteria**:
  - Can select customer group
  - Can set price for group
  - Price automatically applied to qualified customers
  - Price visible only to qualified customers

**US-PRICE-002: View Price History**
- **As a** Seller
- **I want to** view price history
- **So that** I can track price changes
- **Acceptance Criteria**:
  - Can view all price changes
  - Can see price trends
  - Can export price history
  - Can compare prices over time

---

## 4. Technical Requirements

### 4.1 Pricing Service

**Components**:
- Pricing Service (API)
- Price Calculation Engine
- Price Rules Engine
- Price History Service

---

### 4.2 APIs

**Pricing APIs**:
- `GET /api/pricing/product/{productId}` - Get product price
- `PUT /api/pricing/product/{productId}/base` - Update base price
- `POST /api/pricing/product/{productId}/promotion` - Set promotion price
- `POST /api/pricing/product/{productId}/group` - Set customer group price
- `GET /api/pricing/product/{productId}/history` - Get price history
- `POST /api/pricing/calculate` - Calculate price for order

**Seller Pricing APIs**:
- `GET /api/seller/pricing/products` - Get all product prices
- `PUT /api/seller/pricing/bulk-update` - Bulk update prices
- `GET /api/seller/pricing/rules` - Get pricing rules
- `POST /api/seller/pricing/rules` - Create pricing rule

---

## 5. Common Functions Reference

### 5.1 Pricing Functions

```typescript
// Price Management
getPrice(productId: string, customerId?: string, branchId?: string): Promise<Price>
setBasePrice(productId: string, price: number, branchId?: string): Promise<void>
setPromotionPrice(productId: string, price: number, branchId?: string): Promise<void>
setCustomerGroupPrice(productId: string, groupId: string, price: number): Promise<void>
setBulkPricing(productId: string, tiers: PricingTier[]): Promise<void>

// Price Calculation
calculatePrice(productId: string, quantity: number, customerId: string, branchId?: string): Promise<PriceCalculation>
getApplicablePrice(productId: string, customerId: string, branchId?: string): Promise<Price>

// Price History
getPriceHistory(productId: string, branchId?: string, filters: HistoryFilters): Promise<PriceHistory[]>
exportPriceHistory(filters: HistoryFilters): Promise<File>

// Price Comparison
comparePrices(productId: string, sellers: string[]): Promise<PriceComparison>
compareBranchPrices(productId: string, branches: string[]): Promise<PriceComparison>
```

---

## 6. Success Metrics

### 6.1 Pricing Metrics

- Price accuracy
- Price update frequency
- Customer group pricing adoption
- Bulk pricing usage
- Price competitiveness

---

## 7. Implementation Priority

### Current scope
- ✅ Base price management
- ✅ Basic promotion price
- ✅ Customer group pricing (basic)

### Designed to support
- ✅ Bulk pricing
- ✅ Branch-level pricing
- ✅ Price history
- ✅ Price comparison

### Designed to support (advanced)
- ✅ Advanced pricing rules
- ✅ Price optimization
- ✅ Dynamic pricing

---

## 8. Dependencies

### 8.1 External Dependencies
- None (internal module)

### 8.2 Internal Dependencies
- Product Module
- Promotion Module
- Customer Group Management
- Branch Management Module

---

## Appendix

### A. Price Calculation Examples

**Base Price**:
- Product: 1,000 THB (Ex VAT)
- VAT: 70 THB (7%)
- Total: 1,070 THB

**Customer Group Price**:
- Base: 1,000 THB
- Group Discount: 10%
- Group Price: 900 THB
- VAT: 63 THB
- Total: 963 THB

**Bulk Pricing**:
- 1-10 ชิ้น: 1,000 THB/ชิ้น
- 11-50 ชิ้น: 950 THB/ชิ้น
- 51+ ชิ้น: 900 THB/ชิ้น

### B. References
- [Project Scope Document](../business_user/project-scope.md)
- Product Module Document
- Promotion Module Document
