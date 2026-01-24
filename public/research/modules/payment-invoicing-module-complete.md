# Payment & Invoicing Module (Complete): Allkons M

## Executive Summary
Module สำหรับการจัดการการชำระเงิน (Payment) และการออกใบแจ้งหนี้/ใบกำกับภาษี (Invoicing) ในระบบ Allkons M

---

## 1. Module Overview

### 1.1 Purpose
- **Payment Processing**: ประมวลผลการชำระเงิน
- **Payment Methods**: รองรับหลายวิธีการชำระเงิน
- **Invoice Management**: จัดการใบแจ้งหนี้/ใบกำกับภาษี
- **Refund Management**: จัดการการคืนเงิน

### 1.2 Scope
- Payment Methods
- Payment Processing
- Payment Status Management
- Invoice Generation
- Invoice Management
- Refund Processing
- Payment Reconciliation
- Payment History

---

## 2. Common Functions & Features

### 2.1 Payment Methods

#### 2.1.1 Payment Method Types

**Credit/Debit Card**:
- Visa
- Mastercard
- JCB
- UnionPay
- Card validation
- Card tokenization (save card for future use)

**Bank Transfer**:
- Direct bank transfer
- Internet banking
- Mobile banking
- QR code payment (PromptPay, TrueMoney)

**Payment Gateway**:
- PromptPay
- TrueMoney Wallet
- Rabbit LINE Pay
- Alipay
- WeChat Pay

**Credit Terms (B2B)**:
- Net 30 (ชำระภายใน 30 วัน)
- Net 60 (ชำระภายใน 60 วัน)
- Custom terms
- Credit limit

**Installment** (optional):
- 0% Installment
- Installment plans (3, 6, 10, 12 months)

---

#### 2.1.2 Payment Method Management

**For Buyers**:
- Add payment method
- Edit payment method
- Delete payment method
- Set default payment method
- View payment history

**For Sellers**:
- Add bank account (for receiving payments)
- Edit bank account
- Delete bank account
- Set primary bank account
- View payment received

**Security**:
- Payment method encryption
- PCI DSS compliance
- Tokenization (for cards)
- Secure storage

---

### 2.2 Payment Processing

#### 2.2.1 Payment Processing Flow

**Standard Payment Flow**:
1. Buyer proceeds to checkout
2. Buyer selects payment method
3. Buyer enters payment details
4. System validates payment
5. Payment gateway processes payment
6. Payment status updated
7. Order confirmed
8. Invoice generated

**Credit Terms Flow (B2B)**:
1. Buyer places order
2. Order approved (if required)
3. Invoice generated
4. Payment due date set
5. Payment reminder sent
6. Buyer pays before due date
7. Payment received
8. Order status updated

---

#### 2.2.2 Payment Status

**Payment Status Types**:
- **Pending**: รอการชำระเงิน
- **Processing**: กำลังประมวลผล
- **Completed**: ชำระเงินสำเร็จ
- **Failed**: ชำระเงินไม่สำเร็จ
- **Cancelled**: ยกเลิกการชำระเงิน
- **Refunded**: คืนเงินแล้ว
- **Partially Refunded**: คืนเงินบางส่วน

**Status Transitions**:
```
Pending → Processing → Completed
                    ↓
                 Failed → Retry → Completed
                 
Completed → Refunded
Completed → Partially Refunded
```

---

#### 2.2.3 Payment Validation

**Validation Checks**:
- Payment method validity
- Payment amount validation
- Payment gateway availability
- Credit limit check (B2B)
- Fraud detection

**Fraud Prevention**:
- Card verification (CVV, 3D Secure)
- Risk scoring
- Suspicious activity detection
- Rate limiting
- IP address validation

---

### 2.3 Payment Reconciliation

#### 2.3.1 Reconciliation Process

**Reconciliation Flow**:
1. Payment processed
2. Payment recorded in system
3. Payment gateway confirms
4. Reconciliation check
5. Match payment records
6. Resolve discrepancies (if any)

**Reconciliation Features**:
- Automatic reconciliation
- Manual reconciliation
- Discrepancy detection
- Reconciliation reports

---

#### 2.3.2 Payment History

**History Features**:
- View all payments
- Filter by date, status, method
- Search payments
- Payment details
- Download payment history

**Payment Details**:
- Payment ID
- Order ID
- Payment method
- Amount
- Status
- Transaction ID
- Timestamp
- Payment gateway response

---

### 2.4 Invoice Generation

#### 2.4.1 Invoice Types

**Invoice Types**:
- **Tax Invoice**: ใบกำกับภาษี (สำหรับ VAT)
- **Receipt**: ใบเสร็จ
- **Proforma Invoice**: ใบเสนอราคา
- **Credit Note**: ใบลดหนี้
- **Debit Note**: ใบเพิ่มหนี้

**Invoice Requirements**:
- Invoice number (unique, sequential)
- Invoice date
- Due date (for credit terms)
- Seller information
- Buyer information
- Product details
- Tax breakdown
- Payment information
- Terms & conditions

---

#### 2.4.2 Invoice Generation Flow

**Generation Flow**:
1. Order is confirmed
2. System generates invoice
3. Invoice number assigned
4. Invoice content populated
5. Tax calculated
6. Invoice formatted
7. Invoice saved
8. Invoice sent to buyer (email)
9. Invoice available for download

**Invoice Customization**:
- Invoice template
- Logo
- Colors
- Layout
- Additional fields

---

#### 2.4.3 Invoice Management

**Invoice Operations**:
- View invoices
- Download invoice (PDF)
- Send invoice (email)
- Print invoice
- Edit invoice (before payment)
- Cancel invoice
- Duplicate invoice

**Invoice Status**:
- **Draft**: ยังไม่ได้ส่ง
- **Sent**: ส่งแล้ว
- **Paid**: ชำระเงินแล้ว
- **Overdue**: เกินกำหนดชำระ
- **Cancelled**: ยกเลิก

---

### 2.5 Refund Management

#### 2.5.1 Refund Processing

**Refund Flow**:
1. Return request approved
2. Refund amount calculated
3. Refund initiated
4. Payment gateway processes refund
5. Refund status updated
6. Buyer notified
7. Refund completed

**Refund Types**:
- **Full Refund**: คืนเงินทั้งหมด
- **Partial Refund**: คืนเงินบางส่วน
- **Automatic Refund**: คืนเงินอัตโนมัติ
- **Manual Refund**: คืนเงินด้วยตนเอง

---

#### 2.5.2 Refund Methods

**Refund to Original Payment**:
- Credit/Debit Card: Refund to card (3-5 business days)
- Bank Transfer: Refund to bank account (1-3 business days)
- Payment Gateway: Refund via gateway

**Refund Status**:
- **Pending**: รอการคืนเงิน
- **Processing**: กำลังคืนเงิน
- **Completed**: คืนเงินสำเร็จ
- **Failed**: คืนเงินไม่สำเร็จ

---

## 3. User Stories

### 3.1 Payment User Stories

**US-PAY-001: Process Payment**
- **As a** Buyer
- **I want to** pay for my order
- **So that** I can complete my purchase
- **Acceptance Criteria**:
  - Can select payment method
  - Can enter payment details
  - Payment processed securely
  - Payment confirmation received

**US-PAY-002: View Payment History**
- **As a** Buyer
- **I want to** view my payment history
- **So that** I can track my payments
- **Acceptance Criteria**:
  - Can view all payments
  - Can filter payments
  - Can download payment history
  - Can view payment details

---

## 4. Technical Requirements

### 4.1 Payment Service

**Components**:
- Payment Service (API)
- Payment Gateway Integration
- Payment Processing Engine
- Refund Service
- Invoice Service

**Payment Gateway Integration**:
- Payment gateway SDK
- Webhook handling
- Payment status sync
- Refund processing

---

### 4.2 APIs

**Payment APIs**:
- `POST /api/payments/process` - Process payment
- `GET /api/payments/{id}` - Get payment details
- `GET /api/payments` - Get payment history
- `POST /api/payments/{id}/refund` - Process refund
- `GET /api/payments/methods` - Get available payment methods

**Invoice APIs**:
- `POST /api/invoices/generate` - Generate invoice
- `GET /api/invoices/{id}` - Get invoice
- `GET /api/invoices` - Get invoices
- `POST /api/invoices/{id}/send` - Send invoice
- `GET /api/invoices/{id}/download` - Download invoice PDF

---

## 5. Common Functions Reference

### 5.1 Payment Functions

```typescript
// Payment Processing
processPayment(orderId: string, paymentMethod: string, details: PaymentDetails): Promise<Payment>
getPayment(id: string): Promise<Payment>
getPayments(userId: string, filters: PaymentFilters): Promise<Payment[]>
cancelPayment(id: string): Promise<void>

// Payment Methods
addPaymentMethod(userId: string, method: PaymentMethod): Promise<PaymentMethod>
getPaymentMethods(userId: string): Promise<PaymentMethod[]>
deletePaymentMethod(userId: string, methodId: string): Promise<void>
setDefaultPaymentMethod(userId: string, methodId: string): Promise<void>

// Refund
processRefund(paymentId: string, amount: number, reason: string): Promise<Refund>
getRefund(id: string): Promise<Refund>
getRefunds(userId: string, filters: RefundFilters): Promise<Refund[]>

// Invoice
generateInvoice(orderId: string): Promise<Invoice>
getInvoice(id: string): Promise<Invoice>
getInvoices(userId: string, filters: InvoiceFilters): Promise<Invoice[]>
sendInvoice(invoiceId: string): Promise<void>
downloadInvoice(invoiceId: string): Promise<File>
```

---

## 6. Success Metrics

### 6.1 Payment Metrics

- Payment success rate
- Payment processing time
- Payment failure rate
- Refund processing time
- Invoice generation rate

---

## 7. Implementation Priority

### Phase 1 (MVP)
- ✅ Basic payment methods (Card, Bank Transfer)
- ✅ Payment gateway integration (PromptPay, TrueMoney)
- ✅ Basic invoice generation
- ✅ Payment history

### Phase 2
- ✅ Credit terms (B2B)
- ✅ Refund management
- ✅ Payment reconciliation
- ✅ Advanced invoice features

### Phase 3
- ✅ Installment
- ✅ Advanced fraud detection
- ✅ Payment analytics

---

## 8. Dependencies

### 8.1 External Dependencies
- Payment gateway providers (PromptPay, TrueMoney, Credit Card processors)
- Bank APIs (for bank transfer)
- Email service (for invoice sending)

### 8.2 Internal Dependencies
- Order Management Module
- Tax Management Module
- Refund & Return Module
- Notification Module

---

## Appendix

### A. Payment Gateway Integration

**Supported Gateways**:
- PromptPay (Thailand)
- TrueMoney Wallet
- Credit Card processors
- Bank transfer gateways

**Integration Requirements**:
- API keys management
- Webhook endpoints
- Payment status sync
- Refund processing

### B. References
- [Project Scope Document](../business_user/project-scope.md)
- Tax Management Module
- Refund & Return Module
