# Document Management Module (Complete): Allkons M

## Executive Summary
Module สำหรับการจัดการเอกสาร (Document Management) ในระบบ Allkons M โดยรองรับ Invoice, BOQ, PO และเอกสารอื่นๆ

---

## 1. Module Overview

### 1.1 Purpose
- **Document Generation**: สร้างเอกสารอัตโนมัติ
- **Document Storage**: เก็บเอกสารอย่างปลอดภัย
- **Document Sharing**: แชร์เอกสาร
- **Document History**: ประวัติเอกสาร

### 1.2 Scope
- Invoice Generation & Management
- BOQ (Bill of Quantity) Generation & Management
- PO (Purchase Order) Management
- Document Templates
- Document Storage
- Document Sharing
- Document History
- Document Versioning
- Document Access Control

---

## 2. Common Functions & Features

### 2.1 Invoice Management

#### 2.1.1 Invoice Types

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
- Tax breakdown (VAT, WHT)
- Payment information
- Terms & conditions

---

#### 2.1.2 Invoice Generation

**Generation Flow**:
1. Order confirmed
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
- Terms & conditions

---

#### 2.1.3 Invoice Management

**Invoice Operations**:
- View invoices
- Download invoice (PDF)
- Send invoice (email)
- Print invoice
- Edit invoice (before payment)
- Cancel invoice
- Duplicate invoice
- Void invoice

**Invoice Status**:
- **Draft**: ยังไม่ได้ส่ง
- **Sent**: ส่งแล้ว
- **Paid**: ชำระเงินแล้ว
- **Overdue**: เกินกำหนดชำระ
- **Cancelled**: ยกเลิก
- **Voided**: ถูกยกเลิก

---

### 2.2 BOQ (Bill of Quantity) Management

#### 2.2.1 BOQ Generation

**BOQ Purpose**:
- รายการปริมาณงาน
- ใช้สำหรับโครงการก่อสร้าง
- คำนวณวัสดุที่ต้องการ
- ใช้สำหรับการเสนอราคา

**BOQ Content**:
- Project information
- Item list with quantities
- Unit prices
- Total amounts
- Specifications
- Notes

**BOG Generation Flow**:
1. Buyer creates BOQ request
2. System generates BOQ template
3. Buyer fills in quantities
4. System calculates totals
5. BOQ generated
6. BOQ sent to sellers (for quotation)
7. BOQ saved

---

#### 2.2.2 BOQ Management

**BOQ Operations**:
- Create BOQ
- Edit BOQ
- View BOQ
- Download BOQ (Excel, PDF)
- Send BOQ
- Duplicate BOQ
- Delete BOQ

**BOQ Templates**:
- Standard BOQ template
- Custom BOQ template
- Category-specific templates
- Project-specific templates

---

### 2.3 PO (Purchase Order) Management

#### 2.3.1 PO Generation

**PO Purpose**:
- ใบสั่งซื้อจาก Buyer
- ใช้สำหรับ B2B transactions
- Official purchase document

**PO Content**:
- PO number
- PO date
- Buyer information
- Seller information
- Product list
- Quantities
- Prices
- Terms & conditions
- Delivery date
- Payment terms

**PO Generation Flow**:
1. Buyer creates PO
2. System generates PO
3. PO number assigned
4. PO content populated
5. PO sent to seller
6. Seller confirms PO
7. Order created from PO

---

#### 2.3.2 PO Management

**PO Operations**:
- Create PO
- Edit PO (before approval)
- View PO
- Download PO (PDF)
- Send PO
- Approve PO
- Reject PO
- Track PO status
- Convert PO to Order

**PO Status**:
- **Draft**: ยังไม่ได้ส่ง
- **Sent**: ส่งให้ Seller แล้ว
- **Approved**: Seller อนุมัติแล้ว
- **Rejected**: Seller ปฏิเสธ
- **Converted**: แปลงเป็น Order แล้ว
- **Cancelled**: ยกเลิก

---

### 2.4 Document Templates

#### 2.4.1 Template Management

**Template Types**:
- Invoice templates
- BOQ templates
- PO templates
- Receipt templates
- Credit Note templates

**Template Features**:
- Template design
- Dynamic variables
- Logo and branding
- Layout customization
- Multi-language support

**Template Variables**:
- User variables: {{user_name}}, {{user_email}}
- Order variables: {{order_number}}, {{order_total}}
- Product variables: {{product_name}}, {{product_price}}
- Organization variables: {{org_name}}
- Date/time variables: {{date}}, {{time}}
- Tax variables: {{vat_amount}}, {{total_with_vat}}

---

#### 2.4.2 Template Customization

**Customization Options**:
- Edit template content
- Change template design
- Add/remove variables
- Change layout
- Add logo
- Change colors
- Test template
- Preview template

**Template Versioning**:
- Save template versions
- Rollback to previous version
- Template history

---

### 2.5 Document Storage

#### 2.5.1 Storage Features

**Storage Requirements**:
- Secure file storage (S3 with encryption)
- File encryption at rest
- Access control
- File versioning
- File retention (7 years for compliance)

**File Organization**:
```
/documents/invoices/{orderId}/
  - invoice.pdf
  - invoice_history.pdf

/documents/boq/{boqId}/
  - boq.pdf
  - boq.xlsx

/documents/po/{poId}/
  - po.pdf
```

---

#### 2.5.2 Document Access Control

**Access Control**:
- **Buyer**: Can access own documents
- **Seller**: Can access own documents
- **Team Members**: Can access based on permissions
- **Admin**: Can access all documents

**Access Logging**:
- Log document access
- Track who accessed what
- Access history

---

### 2.6 Document Sharing

#### 2.6.1 Sharing Features

**Sharing Methods**:
- **Email**: ส่งเอกสารผ่าน email
- **Download Link**: สร้าง link สำหรับดาวน์โหลด
- **Share Link**: สร้าง shareable link (with expiration)
- **Print**: Print document

**Sharing Settings**:
- Link expiration
- Access password (optional)
- Download limit
- View-only vs Download

---

### 2.7 Document History

#### 2.7.1 History Tracking

**Tracked Events**:
- Document created
- Document edited
- Document sent
- Document downloaded
- Document shared
- Document viewed

**History Details**:
- Timestamp
- User who performed action
- Action type
- Document version
- Changes made (if edited)

---

#### 2.7.2 History Features

**View History**:
- All document events
- Filter by date
- Filter by document type
- Filter by action type
- Search history

**History Reports**:
- Document activity report
- Document usage report
- Export history

---

## 3. User Stories

### 3.1 Document User Stories

**US-DOC-001: Generate Invoice**
- **As a** Seller
- **I want to** generate invoice automatically
- **So that** I comply with tax regulations
- **Acceptance Criteria**:
  - Invoice generated after order
  - Invoice includes all required information
  - Invoice can be downloaded
  - Invoice sent to buyer

**US-DOC-002: Export BOQ**
- **As a** Buyer
- **I want to** export BOQ
- **So that** I can use it for project planning
- **Acceptance Criteria**:
  - Can export BOQ as Excel
  - Can export BOQ as PDF
  - BOQ includes all required information
  - BOQ format is correct

---

## 4. Technical Requirements

### 4.1 Document Service

**Components**:
- Document Service (API)
- Template Engine
- Document Generator (PDF, Excel)
- Document Storage Service

---

### 4.2 APIs

**Document APIs**:
- `POST /api/documents/invoice/generate` - Generate invoice
- `GET /api/documents/invoice/{id}` - Get invoice
- `GET /api/documents/invoice/{id}/download` - Download invoice PDF
- `POST /api/documents/boq/generate` - Generate BOQ
- `GET /api/documents/boq/{id}/export` - Export BOQ
- `POST /api/documents/po/generate` - Generate PO
- `GET /api/documents/po/{id}` - Get PO

**Template APIs**:
- `GET /api/templates` - Get templates
- `GET /api/templates/{id}` - Get template
- `PUT /api/templates/{id}` - Update template
- `POST /api/templates/preview` - Preview template

---

## 5. Common Functions Reference

### 5.1 Document Functions

```typescript
// Invoice
generateInvoice(orderId: string, templateId?: string): Promise<Invoice>
getInvoice(id: string): Promise<Invoice>
downloadInvoice(id: string): Promise<File>
sendInvoice(id: string): Promise<void>
voidInvoice(id: string, reason: string): Promise<void>

// BOQ
generateBOQ(data: BOQData): Promise<BOQ>
getBOQ(id: string): Promise<BOQ>
exportBOQ(id: string, format: 'pdf' | 'excel'): Promise<File>
sendBOQ(id: string): Promise<void>

// PO
generatePO(data: POData): Promise<PO>
getPO(id: string): Promise<PO>
downloadPO(id: string): Promise<File>
sendPO(id: string): Promise<void>
approvePO(id: string, sellerId: string): Promise<void>
rejectPO(id: string, sellerId: string, reason: string): Promise<void>

// Templates
getTemplate(id: string): Promise<Template>
renderTemplate(templateId: string, data: object): Promise<string>
previewTemplate(templateId: string, data: object): Promise<string>
```

---

## 6. Success Metrics

### 6.1 Document Metrics

- Document generation rate
- Document download rate
- Document accuracy
- Template usage
- Document storage efficiency

---

## 7. Implementation Priority

### Phase 1 (MVP)
- ✅ Basic invoice generation
- ✅ Basic BOQ export
- ✅ Basic PO generation
- ✅ Document download

### Phase 2
- ✅ Document templates
- ✅ Document sharing
- ✅ Document history
- ✅ Advanced document features

### Phase 3
- ✅ Document versioning
- ✅ Advanced templates
- ✅ Document analytics

---

## 8. Dependencies

### 8.1 External Dependencies
- PDF generation library
- Excel generation library
- File storage (S3)
- Email service (for sending documents)

### 8.2 Internal Dependencies
- Order Management Module
- Payment & Invoicing Module
- Tax Management Module
- User Management Module

---

## Appendix

### A. Document Types Reference

**Invoice**:
- Tax Invoice
- Receipt
- Proforma Invoice
- Credit Note
- Debit Note

**BOQ**:
- Standard BOQ
- Custom BOQ
- Project BOQ

**PO**:
- Purchase Order
- PO Amendment

### B. References
- Project Scope Document
- Payment & Invoicing Module
- Tax Management Module
- Order Management Module
