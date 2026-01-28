# Tax Management Module: Allkons M

## Executive Summary
Module สำหรับการจัดการภาษี (Tax Management) ในระบบ Allkons M โดยรองรับ VAT, Withholding Tax และ Tax Compliance

---

## 1. Module Overview

### 1.1 Purpose
- **Tax Calculation**: คำนวณภาษีอัตโนมัติ
- **Tax Settings**: จัดการตั้งค่าภาษี
- **Tax Reports**: รายงานภาษี
- **Tax Compliance**: ตรวจสอบความถูกต้องตามกฎหมาย

### 1.2 Scope
- Tax Calculation
- Tax Settings (VAT, Withholding Tax)
- Tax Rules
- Tax Reports
- Tax Invoice Generation
- Tax Compliance

---

## 2. Common Functions & Features

### 2.1 Tax Calculation

#### 2.1.1 Tax Types

**VAT (Value Added Tax)**:
- **Standard VAT**: 7% (Thailand)
- **Zero VAT**: 0% (บางสินค้า)
- **Exempt**: ไม่ต้องเสีย VAT

**Withholding Tax (WHT)**:
- **WHT 3%**: สำหรับบุคคลธรรมดา
- **WHT 1%**: สำหรับนิติบุคคล
- **WHT 0%**: ไม่ต้องหัก ณ ที่จ่าย

**Other Taxes**:
- **Import Tax**: ภาษีนำเข้า (ถ้ามี)
- **Local Tax**: ภาษีท้องถิ่น (ถ้ามี)

---

#### 2.1.2 Tax Calculation Rules

**Calculation Methods**:
- **Inclusive VAT**: ราคารวม VAT (ราคาแสดง = ราคารวม VAT)
- **Exclusive VAT**: ราคาไม่รวม VAT (ราคาแสดง = ราคาไม่รวม VAT, VAT แสดงแยก)

**Calculation Flow**:
1. Get product price
2. Check tax rules
3. Calculate tax amount
4. Add tax to total
5. Display breakdown

**Tax Rules**:
- **Product-level**: ภาษีเฉพาะสินค้า
- **Category-level**: ภาษีตามหมวดหมู่
- **Customer-level**: ภาษีตามประเภทลูกค้า
- **Location-level**: ภาษีตามที่อยู่

---

#### 2.1.3 Tax Display

**Price Display Options**:
- **Show with VAT**: แสดงราคารวม VAT
- **Show without VAT**: แสดงราคาไม่รวม VAT
- **Show both**: แสดงทั้งสองแบบ

**Tax Breakdown**:
- Product price
- VAT amount
- Withholding Tax amount (if applicable)
- Total amount

---

### 2.2 Tax Settings

#### 2.2.1 VAT Settings

**VAT Configuration**:
- **VAT Rate**: อัตราภาษี (7% default)
- **VAT Registration Number**: เลขประจำตัวผู้เสียภาษี
- **VAT Calculation Method**: Inclusive/Exclusive
- **VAT Display**: Show/Hide VAT

**VAT Rules**:
- Products with VAT
- Products without VAT (Zero-rated, Exempt)
- VAT exemptions

---

#### 2.2.2 Withholding Tax Settings

**WHT Configuration**:
- **WHT Rate**: อัตราหัก ณ ที่จ่าย
- **WHT Rules**: กฎการหัก ณ ที่จ่าย
- **WHT Threshold**: เกณฑ์การหัก ณ ที่จ่าย

**WHT Rules**:
- **For Individuals**: WHT 3% (if amount > threshold)
- **For Companies**: WHT 1% (if amount > threshold)
- **WHT Exemptions**: ไม่ต้องหัก ณ ที่จ่าย

**WHT Threshold**:
- Minimum amount for WHT (e.g., 1,000 THB)
- Below threshold: No WHT
- Above threshold: Apply WHT

---

#### 2.2.3 Tax Rules Management

**Rule Types**:
- **Product Tax Rules**: ภาษีเฉพาะสินค้า
- **Category Tax Rules**: ภาษีตามหมวดหมู่
- **Customer Tax Rules**: ภาษีตามประเภทลูกค้า
- **Location Tax Rules**: ภาษีตามที่อยู่

**Rule Configuration**:
- Tax rate
- Tax type (VAT, WHT)
- Applicable conditions
- Priority (if multiple rules apply)

---

### 2.3 Tax Reports

#### 2.3.1 Report Types

**Sales Tax Report**:
- Total sales
- VAT collected
- Tax by product
- Tax by category
- Tax by customer

**Purchase Tax Report**:
- Total purchases
- VAT paid
- WHT deducted
- Tax by supplier

**Tax Summary Report**:
- Total VAT collected
- Total VAT paid
- Net VAT payable
- Total WHT deducted
- Tax liability

---

#### 2.3.2 Report Features

**Report Options**:
- Date range filter
- Product filter
- Category filter
- Customer filter
- Export to Excel/PDF
- Scheduled reports

**Report Details**:
- Transaction details
- Tax breakdown
- Tax calculations
- Compliance information

---

### 2.4 Tax Invoice Generation

#### 2.4.1 Tax Invoice Types

**Invoice Types**:
- **Tax Invoice**: ใบกำกับภาษี (สำหรับ VAT)
- **Receipt**: ใบเสร็จ (สำหรับไม่ต้อง VAT)
- **Credit Note**: ใบลดหนี้
- **Debit Note**: ใบเพิ่มหนี้

**Tax Invoice Requirements**:
- Seller information (Name, Tax ID, Address)
- Buyer information (Name, Tax ID, Address)
- Product details
- Tax breakdown (VAT, WHT)
- Invoice number
- Invoice date
- Payment information

---

#### 2.4.2 Tax Invoice Generation

**Generation Flow**:
1. Order is completed
2. System generates tax invoice
3. System includes tax information
4. Invoice sent to buyer
5. Invoice stored for records

**Invoice Content**:
- Invoice header (Seller, Buyer info)
- Product list with prices
- Tax breakdown
- Total amounts
- Payment information
- Tax compliance information

---

### 2.5 Tax Compliance

#### 2.5.1 Compliance Requirements

**Thailand Tax Compliance**:
- **VAT Registration**: ต้องจดทะเบียน VAT (ถ้ามีรายได้เกินเกณฑ์)
- **Tax Invoice**: ต้องออกใบกำกับภาษี
- **Tax Reporting**: ต้องรายงานภาษี
- **Tax Payment**: ต้องจ่ายภาษี

**Compliance Features**:
- Tax ID validation
- Tax invoice format compliance
- Tax reporting compliance
- Tax payment tracking

---

#### 2.5.2 Compliance Checks

**Automated Checks**:
- Tax ID format validation
- Tax calculation validation
- Invoice format validation
- Tax reporting validation

**Manual Reviews**:
- Tax document review
- Compliance audit
- Tax filing assistance

---

## 3. User Stories

### 3.1 Tax User Stories

**US-TAX-001: Calculate Tax at Checkout**
- **As a** Buyer
- **I want to** see tax calculation at checkout
- **So that** I know the total amount including tax
- **Acceptance Criteria**:
  - Tax calculated automatically
  - Tax breakdown displayed
  - Total amount includes tax
  - Tax invoice generated

**US-TAX-002: Generate Tax Invoice**
- **As a** Seller
- **I want to** generate tax invoice automatically
- **So that** I comply with tax regulations
- **Acceptance Criteria**:
  - Tax invoice generated after order
  - Tax invoice includes all required information
  - Tax invoice can be downloaded
  - Tax invoice sent to buyer

---

## 4. Technical Requirements

### 4.1 Tax Service

**Components**:
- Tax Calculation Service
- Tax Rules Engine
- Tax Report Service
- Tax Invoice Service

---

### 4.2 APIs

**Tax Calculation APIs**:
- `POST /api/tax/calculate` - Calculate tax for order
- `GET /api/tax/rules` - Get tax rules
- `POST /api/tax/rules` - Create tax rule (Admin)

**Tax Report APIs**:
- `GET /api/tax/reports/sales` - Get sales tax report
- `GET /api/tax/reports/purchases` - Get purchase tax report
- `GET /api/tax/reports/summary` - Get tax summary

**Tax Invoice APIs**:
- `GET /api/tax/invoices/{id}` - Get tax invoice
- `POST /api/tax/invoices/generate` - Generate tax invoice
- `GET /api/tax/invoices` - Get tax invoices

---

## 5. Common Functions Reference

### 5.1 Tax Functions

```typescript
// Tax Calculation
calculateTax(order: Order, customer: Customer): Promise<TaxCalculation>
calculateVAT(amount: number, rate: number, inclusive: boolean): Promise<number>
calculateWHT(amount: number, customerType: string): Promise<number>
getTaxRules(productId?: string, categoryId?: string, customerId?: string): Promise<TaxRule[]>

// Tax Reports
getSalesTaxReport(filters: TaxReportFilters): Promise<SalesTaxReport>
getPurchaseTaxReport(filters: TaxReportFilters): Promise<PurchaseTaxReport>
getTaxSummary(filters: TaxReportFilters): Promise<TaxSummary>

// Tax Invoice
generateTaxInvoice(orderId: string): Promise<TaxInvoice>
getTaxInvoice(invoiceId: string): Promise<TaxInvoice>
getTaxInvoices(filters: InvoiceFilters): Promise<TaxInvoice[]>
```

---

## 6. Success Metrics

### 6.1 Tax Metrics

- Tax calculation accuracy
- Tax invoice generation rate
- Tax compliance rate
- Tax reporting accuracy

---

## 7. Implementation Priority

### Current scope
- ✅ Basic VAT calculation
- ✅ Tax invoice generation
- ✅ Basic tax reports

### Designed to support
- ✅ Withholding Tax
- ✅ Advanced tax rules
- ✅ Tax compliance checks

### Designed to support (advanced)
- ✅ Advanced tax reports
- ✅ Tax filing assistance
- ✅ Tax optimization

---

## 8. Dependencies

### 8.1 External Dependencies
- Tax regulations database (optional)
- Tax calculation service (optional)

### 8.2 Internal Dependencies
- Order Management Module
- Invoice Management Module
- Payment & Invoicing Module

---

## Appendix

### A. Tax Calculation Examples

**VAT Calculation (Inclusive)**:
- Product price: 1,000 THB (includes VAT)
- VAT amount: 1,000 × 7/107 = 65.42 THB
- Net amount: 934.58 THB

**VAT Calculation (Exclusive)**:
- Product price: 1,000 THB (excludes VAT)
- VAT amount: 1,000 × 7% = 70 THB
- Total amount: 1,070 THB

**WHT Calculation**:
- Order amount: 10,000 THB
- WHT (3% for individual): 300 THB
- Net payment: 9,700 THB

### B. References
- [Project Scope Document](../business_user/project-scope.md)
- Payment & Invoicing Module
- Order Management Module
