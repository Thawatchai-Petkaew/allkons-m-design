# Shipping & Delivery Module (Complete): Allkons M

## Executive Summary
Module สำหรับการจัดการการจัดส่งสินค้า (Shipping & Delivery) ในระบบ Allkons M

---

## 1. Module Overview

### 1.1 Purpose
- **Shipping Management**: จัดการการจัดส่งสินค้า
- **Shipping Rate Calculation**: คำนวณค่าจัดส่ง
- **Shipping Label Generation**: สร้าง shipping label
- **Delivery Tracking**: ติดตามการจัดส่ง

### 1.2 Scope
- Shipping Options (Single, Multiple)
- Shipping Rate Calculation
- Shipping Label Generation
- Shipping Provider Integration
- Delivery Tracking
- Delivery Confirmation

---

## 2. Common Functions & Features

### 2.1 Shipping Options

#### 2.1.1 Shipping Types

**Single Delivery**:
- จัดส่งครั้งเดียว (จากผู้ขายเดียว)
- 1 order = 1 shipment
- Single tracking number

**Multiple Delivery**:
- จัดส่งหลายครั้ง (จากหลายผู้ขาย)
- 1 order = multiple shipments
- Multiple tracking numbers
- Different delivery dates

**Delivery Methods**:
- **Standard Shipping**: จัดส่งมาตรฐาน (3-5 วัน)
- **Express Shipping**: จัดส่งด่วน (1-2 วัน)
- **Same-day Delivery**: จัดส่งวันเดียวกัน (1 ชั่วโมง - สำหรับบางพื้นที่)
- **Pickup (Click & Collect)**: รับที่สาขา
- **Custom Shipping (B2B)**: จัดส่งแบบกำหนดเอง

---

#### 2.1.2 Shipping Zones

**Zone Definition**:
- **Local Zone**: ในเมือง/จังหวัดเดียวกัน
- **Regional Zone**: ในภูมิภาคเดียวกัน
- **National Zone**: ทั่วประเทศ
- **International Zone**: ต่างประเทศ (Designed to support)

**Zone-based Pricing**:
- Different rates for different zones
- Distance-based pricing
- Weight-based pricing
- Volume-based pricing

---

### 2.2 Shipping Rate Calculation

#### 2.2.1 Rate Calculation Methods

**Calculation Methods**:
- **Fixed Rate**: ราคาคงที่
- **Weight-based**: ตามน้ำหนัก
- **Distance-based**: ตามระยะทาง
- **Volume-based**: ตามปริมาตร
- **Value-based**: ตามมูลค่า
- **Tiered Pricing**: ราคาตาม tier

**Rate Rules**:
- Minimum charge
- Maximum charge
- Free shipping threshold
- Additional charges (insurance, COD)

---

#### 2.2.2 Shipping Rate Calculation Flow

**Calculation Flow**:
1. Get shipping address
2. Get product weight/dimensions
3. Determine shipping zone
4. Get shipping method
5. Calculate base rate
6. Apply additional charges
7. Apply discounts (free shipping)
8. Return shipping rate

**Real-time Calculation**:
- Calculate at cart
- Calculate at checkout
- Update when address changes
- Show shipping options with rates

---

### 2.3 Shipping Label Generation

#### 2.3.1 Label Generation

**Label Generation Flow**:
1. Order confirmed
2. Seller prepares shipment
3. Seller requests shipping label
4. System generates label
5. Label includes:
   - Shipping address
   - Return address
   - Tracking number
   - Barcode
   - Shipping method
6. Seller prints label
7. Seller attaches label to package

**Label Features**:
- Print label
- Download label (PDF)
- Email label
- Label format (A4, thermal)
- Barcode/QR code

---

#### 2.3.2 Shipping Provider Integration

**Provider Integration**:
- **Kerry Express**: API integration
- **Flash Express**: API integration
- **J&T Express**: API integration
- **Thailand Post**: API integration
- **Custom Courier**: Manual entry

**Integration Features**:
- Auto-generate tracking number
- Auto-create shipment
- Real-time tracking sync
- Delivery confirmation

---

### 2.4 Delivery Tracking

#### 2.4.1 Tracking Features

**Tracking Information**:
- Tracking number
- Shipping status
- Current location
- Estimated delivery date
- Delivery history
- Delivery proof (signature, photo)

**Tracking Status**:
- **Label Created**: สร้าง shipping label แล้ว
- **Picked Up**: รับพัสดุแล้ว
- **In Transit**: กำลังจัดส่ง
- **Out for Delivery**: กำลังส่งถึงผู้รับ
- **Delivered**: ส่งถึงผู้รับแล้ว
- **Failed Delivery**: ส่งไม่สำเร็จ
- **Returned**: ส่งกลับ

---

#### 2.4.2 Real-time Tracking

**Real-time Updates**:
- Webhook from shipping provider
- Status sync
- Location updates
- Delivery confirmation
- Notification on status change

**Tracking Display**:
- Tracking status history
- Current status
- Estimated delivery
- Map view (if available)
- Delivery proof

---

### 2.5 Delivery Confirmation

#### 2.5.1 Confirmation Methods

**Confirmation Types**:
- **Signature**: ลายเซ็นผู้รับ
- **Photo**: รูปภาพการส่ง
- **OTP**: OTP verification
- **Auto-confirm**: ยืนยันอัตโนมัติ (ถ้าไม่มีปัญหา)

**Confirmation Flow**:
1. Delivery attempted
2. Delivery person gets confirmation
3. Confirmation recorded
4. Buyer notified
5. Order status updated

---

## 3. User Stories

### 3.1 Shipping User Stories

**US-SHIP-001: Calculate Shipping Cost**
- **As a** Buyer
- **I want to** see shipping cost before checkout
- **So that** I know the total cost
- **Acceptance Criteria**:
  - Shipping cost calculated automatically
  - Different shipping options shown
  - Shipping cost included in total
  - Free shipping shown if applicable

**US-SHIP-002: Track Delivery**
- **As a** Buyer
- **I want to** track my order delivery
- **So that** I know when my order will arrive
- **Acceptance Criteria**:
  - Can view tracking number
  - Can see delivery status
  - Can see estimated delivery date
  - Receive updates on status change

---

## 4. Technical Requirements

### 4.1 Shipping Service

**Components**:
- Shipping Service (API)
- Rate Calculation Engine
- Label Generation Service
- Tracking Service
- Shipping Provider Integration

---

### 4.2 APIs

**Shipping APIs**:
- `POST /api/shipping/calculate` - Calculate shipping rate
- `GET /api/shipping/methods` - Get available shipping methods
- `POST /api/shipping/label/generate` - Generate shipping label
- `GET /api/shipping/label/{id}` - Get shipping label
- `GET /api/shipping/track/{trackingNumber}` - Track shipment

**Seller Shipping APIs**:
- `GET /api/seller/shipping/settings` - Get shipping settings
- `PUT /api/seller/shipping/settings` - Update shipping settings
- `GET /api/seller/shipping/rates` - Get shipping rates
- `PUT /api/seller/shipping/rates` - Update shipping rates

---

## 5. Common Functions Reference

### 5.1 Shipping Functions

```typescript
// Shipping Rate Calculation
calculateShippingRate(address: Address, products: Product[], method: string): Promise<ShippingRate>
getShippingMethods(address: Address): Promise<ShippingMethod[]>
getShippingZones(): Promise<ShippingZone[]>

// Shipping Label
generateShippingLabel(orderId: string, provider: string): Promise<ShippingLabel>
getShippingLabel(labelId: string): Promise<ShippingLabel>
printShippingLabel(labelId: string): Promise<File>

// Tracking
trackShipment(trackingNumber: string): Promise<TrackingInfo>
getTrackingHistory(trackingNumber: string): Promise<TrackingEvent[]>
updateTrackingStatus(trackingNumber: string, status: string): Promise<void>

// Shipping Settings
getShippingSettings(sellerId: string): Promise<ShippingSettings>
updateShippingSettings(sellerId: string, settings: ShippingSettings): Promise<void>
```

---

## 6. Success Metrics

### 6.1 Shipping Metrics

- Shipping cost accuracy
- Delivery time
- On-time delivery rate
- Shipping label generation time
- Tracking accuracy

---

## 7. Implementation Priority

### Current scope
- ✅ Basic shipping options
- ✅ Shipping rate calculation (basic)
- ✅ Shipping label generation
- ✅ Basic tracking

### Designed to support
- ✅ Shipping provider integration
- ✅ Real-time tracking
- ✅ Advanced rate calculation
- ✅ Delivery confirmation

### Designed to support (advanced)
- ✅ Advanced tracking features
- ✅ Shipping analytics
- ✅ Shipping optimization

---

## 8. Dependencies

### 8.1 External Dependencies
- Shipping provider APIs (Kerry, Flash Express, etc.)
- Address validation service
- Distance calculation service

### 8.2 Internal Dependencies
- Order Management Module
- Inventory Management Module
- Notification Module

---

## Appendix

### A. Shipping Provider Integration

**Supported Providers**:
- Kerry Express
- Flash Express
- J&T Express
- Thailand Post

**Integration Requirements**:
- API keys
- Webhook endpoints
- Label format
- Tracking sync

### B. References
- [Project Scope Document](../business_user/project-scope.md)
- Order Management Module
