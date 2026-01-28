# Refund & Return Module: Allkons M

## Executive Summary
Module สำหรับการจัดการการคืนสินค้า (Returns) และการคืนเงิน (Refunds) ในระบบ Allkons M

---

## 1. Module Overview

### 1.1 Purpose
- **Return Management**: จัดการการคืนสินค้า
- **Refund Processing**: ประมวลผลการคืนเงิน
- **Dispute Resolution**: จัดการข้อพิพาท
- **Return Policies**: จัดการนโยบายการคืนสินค้า

### 1.2 Scope
- Return Request
- Return Authorization
- Return Shipping
- Refund Processing
- Refund Rules & Policies
- Return History
- Dispute Management

---

## 2. Common Functions & Features

### 2.1 Return Request

#### 2.1.1 Return Reasons

**Common Return Reasons**:
- **Product Issues**:
  - Defective/Damaged product
  - Wrong product received
  - Product doesn't match description
  - Missing parts/accessories
- **Customer Reasons**:
  - Changed mind
  - Ordered by mistake
  - Not needed anymore
  - Found better price elsewhere
- **Shipping Issues**:
  - Late delivery
  - Wrong address delivery
  - Package damaged in transit

**Return Reason Categories**:
- Seller fault (defective, wrong product) → Seller pays return shipping
- Customer fault (changed mind, mistake) → Customer pays return shipping
- Shipping fault (damaged, late) → Seller/Shipping provider pays

---

#### 2.1.2 Return Request Flow

**Buyer Flow**:
1. Buyer goes to Order History
2. Selects order/item to return
3. Selects return reason
4. Uploads photos (if needed)
5. Selects return type (Refund, Exchange)
6. Submits return request
7. Receives return authorization
8. Ships product back
9. Receives refund/exchange

**Seller Flow**:
1. Seller receives return request notification
2. Seller reviews return request
3. Seller approves/rejects return
4. If approved → Provides return shipping label
5. Seller receives returned product
6. Seller inspects product
7. Seller processes refund/exchange

---

#### 2.1.3 Return Request Information

**Required Information**:
- Order number
- Product(s) to return
- Return reason
- Return type (Refund, Exchange)
- Quantity
- Photos (if applicable)
- Additional notes

**Return Types**:
- **Full Refund**: คืนเงินทั้งหมด
- **Partial Refund**: คืนเงินบางส่วน
- **Exchange**: เปลี่ยนสินค้า
- **Store Credit**: รับเครดิตแทนเงิน

---

### 2.2 Return Authorization

#### 2.2.1 Authorization Process

**Authorization Flow**:
1. Buyer submits return request
2. Seller reviews request
3. Seller approves/rejects
4. If approved:
   - Return authorization number generated
   - Return shipping label provided (if seller pays)
   - Return instructions provided
5. Buyer ships product back
6. Seller receives and inspects
7. Refund processed

**Authorization Rules**:
- **Auto-approve**: Auto-approve for certain reasons (defective, wrong product)
- **Manual approval**: Seller reviews before approval
- **Time limit**: Return must be requested within X days (e.g., 7 days, 30 days)

---

#### 2.2.2 Return Shipping

**Shipping Options**:
- **Seller-provided label**: Seller pays return shipping
- **Customer-provided label**: Customer pays return shipping
- **Pickup service**: Seller arranges pickup

**Shipping Label**:
- Generate return shipping label
- Print label
- Track return shipment
- Delivery confirmation

---

### 2.3 Refund Processing

#### 2.3.1 Refund Types

**Refund Types**:
- **Full Refund**: คืนเงินทั้งหมด (รวม shipping)
- **Partial Refund**: คืนเงินบางส่วน
- **Product-only Refund**: คืนเงินเฉพาะสินค้า (ไม่รวม shipping)
- **Store Credit**: รับเครดิตแทนเงิน

**Refund Amount Calculation**:
- Product price
- Shipping cost (if applicable)
- Tax (if applicable)
- Discounts (if applicable)
- Restocking fee (if applicable)

---

#### 2.3.2 Refund Process

**Refund Flow**:
1. Seller receives returned product
2. Seller inspects product
3. Seller confirms condition
4. If condition OK:
   - Refund amount calculated
   - Refund processed
   - Buyer notified
5. If condition not OK:
   - Seller can reject or partial refund
   - Buyer notified

**Refund Processing Time**:
- **Immediate**: Refund processed immediately (if auto-approve)
- **After Inspection**: Refund processed after product inspection
- **Timeframe**: 3-5 business days (typical)

---

#### 2.3.3 Refund Methods

**Refund to Original Payment**:
- Credit/Debit Card: Refund to card
- Bank Transfer: Refund to bank account
- Payment Gateway: Refund via gateway

**Alternative Refund Methods**:
- Store Credit: Credit to account
- Exchange: Exchange for other product
- Voucher: Issue voucher code

---

### 2.4 Return Policies

#### 2.4.1 Policy Management

**Policy Settings**:
- **Return Window**: ระยะเวลาที่สามารถคืนได้ (เช่น 7 วัน, 30 วัน)
- **Return Conditions**: เงื่อนไขการคืน (เช่น ต้องอยู่ในสภาพเดิม)
- **Restocking Fee**: ค่าธรรมเนียมการคืน (ถ้ามี)
- **Return Shipping**: ใครจ่ายค่าจัดส่งคืน
- **Refund Method**: วิธีการคืนเงิน
- **Exchange Policy**: นโยบายการเปลี่ยนสินค้า

**Policy Types**:
- **Seller Policy**: นโยบายของแต่ละ Seller
- **Category Policy**: นโยบายตามหมวดหมู่สินค้า
- **Product Policy**: นโยบายเฉพาะสินค้า
- **Platform Policy**: นโยบายของแพลตฟอร์ม

---

#### 2.4.2 Policy Display

**Policy Information**:
- Display return policy on:
  - Product page
  - Checkout page
  - Order confirmation
  - Return request page

**Policy Content**:
- Return window
- Return conditions
- Return process
- Refund method
- Return shipping policy

---

### 2.5 Dispute Management

#### 2.5.1 Dispute Types

**Dispute Scenarios**:
- **Return Dispute**: ขัดแย้งเรื่องการคืนสินค้า
  - Seller rejects return
  - Buyer disagrees with refund amount
  - Product condition dispute
- **Refund Dispute**: ขัดแย้งเรื่องการคืนเงิน
  - Refund not received
  - Wrong refund amount
  - Refund method dispute

---

#### 2.5.2 Dispute Resolution Process

**Dispute Flow**:
1. Buyer/Seller opens dispute
2. System notifies other party
3. Both parties provide evidence
4. Allkons Admin reviews dispute
5. Admin makes decision
6. Decision enforced
7. Dispute closed

**Dispute Resolution**:
- **Mediation**: Allkons Admin mediates
- **Evidence Review**: Review photos, documents, communication
- **Decision**: Admin makes final decision
- **Appeal**: Can appeal decision (optional)

---

### 2.6 Return History

#### 2.6.1 History Features

**View Return History**:
- All return requests
- Filter by status
- Filter by date
- Filter by product
- Search returns

**Return Details**:
- Return request information
- Return reason
- Return status
- Refund amount
- Refund status
- Status history
- Communication history

---

## 3. User Stories

### 3.1 Return User Stories

**US-RETURN-001: Request Return**
- **As a** Buyer
- **I want to** request return for product
- **So that** I can get refund or exchange
- **Acceptance Criteria**:
  - Can select order/item to return
  - Can select return reason
  - Can upload photos
  - Can select return type
  - Return request submitted

**US-RETURN-002: Process Return (Seller)**
- **As a** Seller
- **I want to** process return request
- **So that** I can handle returns efficiently
- **Acceptance Criteria**:
  - Can view return requests
  - Can approve/reject returns
  - Can provide return shipping label
  - Can process refund after receiving product

---

## 4. Technical Requirements

### 4.1 Return Service

**Components**:
- Return Service (API)
- Refund Service
- Dispute Service
- Return Policy Service

---

### 4.2 APIs

**Return APIs**:
- `POST /api/returns/request` - Create return request
- `GET /api/returns` - Get return requests
- `GET /api/returns/{id}` - Get return details
- `PUT /api/returns/{id}` - Update return request
- `POST /api/returns/{id}/cancel` - Cancel return request

**Seller Return APIs**:
- `GET /api/seller/returns` - Get seller return requests
- `POST /api/seller/returns/{id}/approve` - Approve return
- `POST /api/seller/returns/{id}/reject` - Reject return
- `POST /api/seller/returns/{id}/process-refund` - Process refund

**Refund APIs**:
- `POST /api/refunds/process` - Process refund
- `GET /api/refunds/{id}` - Get refund details
- `GET /api/refunds` - Get refund history

**Dispute APIs**:
- `POST /api/disputes/create` - Create dispute
- `GET /api/disputes/{id}` - Get dispute details
- `POST /api/disputes/{id}/resolve` - Resolve dispute (Admin)

---

## 5. Common Functions Reference

### 5.1 Return Functions

```typescript
// Return Request
createReturnRequest(orderId: string, items: ReturnItem[], reason: string): Promise<ReturnRequest>
getReturnRequest(id: string): Promise<ReturnRequest>
getReturnRequests(userId: string, filters: ReturnFilters): Promise<ReturnRequest[]>
updateReturnRequest(id: string, data: ReturnUpdate): Promise<ReturnRequest>
cancelReturnRequest(id: string): Promise<void>

// Return Authorization
approveReturn(requestId: string, sellerId: string): Promise<ReturnAuthorization>
rejectReturn(requestId: string, sellerId: string, reason: string): Promise<void>
generateReturnLabel(requestId: string): Promise<ShippingLabel>

// Refund Processing
processRefund(returnId: string, amount: number, method: string): Promise<Refund>
getRefund(id: string): Promise<Refund>
getRefunds(userId: string, filters: RefundFilters): Promise<Refund[]>

// Dispute
createDispute(returnId: string, type: string, description: string): Promise<Dispute>
getDispute(id: string): Promise<Dispute>
resolveDispute(id: string, adminId: string, decision: string): Promise<void>
```

---

## 6. Success Metrics

### 6.1 Return Metrics

- Return rate
- Return approval rate
- Average return processing time
- Refund processing time
- Dispute rate
- Customer satisfaction (returns)

---

## 7. Implementation Priority

### Current scope
- ✅ Basic return request
- ✅ Return authorization
- ✅ Basic refund processing
- ✅ Return history

### Designed to support
- ✅ Return policies
- ✅ Dispute management
- ✅ Advanced refund options
- ✅ Return analytics

### Designed to support (advanced)
- ✅ Automated return processing
- ✅ Return prediction
- ✅ Advanced dispute resolution

---

## 8. Dependencies

### 8.1 External Dependencies
- Payment gateway (for refunds)
- Shipping provider (for return labels)

### 8.2 Internal Dependencies
- Order Management Module
- Payment & Invoicing Module
- Shipping & Delivery Module
- Notification Module

---

## Appendix

### A. Return Policy Examples

**Standard Return Policy**:
- Return window: 7 days
- Condition: Unused, original packaging
- Return shipping: Customer pays
- Refund: Full refund (product only)

**Seller Custom Policy**:
- Return window: 30 days
- Condition: Any condition
- Return shipping: Seller pays
- Refund: Full refund (including shipping)

### B. References
- [Project Scope Document](../business_user/project-scope.md)
- Order Management Module
- Payment & Invoicing Module
