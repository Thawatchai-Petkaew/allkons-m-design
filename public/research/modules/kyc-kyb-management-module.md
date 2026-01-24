# KYC/KYB Management Module: Allkons M

## Executive Summary
Module สำหรับการยืนยันตัวตน (KYC - Know Your Customer) และการยืนยันองค์กร (KYB - Know Your Business) ในระบบ Allkons M

---

## 1. Module Overview

### 1.1 Purpose
- **KYC**: ยืนยันตัวตนของบุคคล (Account level)
- **KYB**: ยืนยันองค์กร (ORG level)
- **Document Management**: จัดการเอกสารยืนยันตัวตน
- **Approval Workflow**: กระบวนการอนุมัติจาก Allkons Admin

### 1.2 Scope
- KYC Process (สำหรับ Account)
- KYB Process (สำหรับ ORG)
- Document Upload & Management
- Document Verification
- Approval Workflow
- Status Management
- Re-verification Process

---

## 2. KYC (Know Your Customer) Process

### 2.1 KYC Requirements

#### 2.1.1 Who Needs KYC

**Required KYC**:
- **Sellers**: ทุกคนที่ต้องการขายสินค้า
  - Registered Individual Merchant
  - Legal Entity (Company)
- **Buyers**: ทุกคนที่ต้องการซื้อสินค้า (ต้องทำการ KYC ถึงจะสามารถซื้อสินค้าได้)
  - Individual Consumer
  - Registered Individual Merchant
  - Legal Entity (Company)

**KYC Exemptions**:
- ไม่มี (ทุกคนต้องทำการ KYC เพื่อซื้อหรือขายสินค้า)

---

#### 2.1.2 KYC Documents Required

**For Individuals (Registered Individual Merchant)**:
- **Government-issued Photo ID**:
  - บัตรประชาชน (Thai ID Card)
  - Passport
  - Driver's License
- **Proof of Address** (optional, if required):
  - ใบแจ้งยอดบัญชีธนาคาร
  - ใบแจ้งยอดสาธารณูปโภค (น้ำ, ไฟฟ้า)
  - ใบเสร็จค่าเช่า
- **Business Registration** (if applicable):
  - หนังสือรับรองการจดทะเบียนพาณิชย์

**For Legal Entities (Companies)**:
- **Company Documents**:
  - หนังสือรับรองบริษัท (Certificate of Incorporation)
  - เอกสารจดทะเบียนบริษัท
- **Authorized Representative ID**:
  - บัตรประชาชนของผู้มีอำนาจลงนาม
- **Proof of Business Address**:
  - เอกสารที่อยู่บริษัท

---

#### 2.1.3 KYC Process Flow

**Step 1: Initiate KYC**
1. User registers as Seller or Buyer (Legal Entity)
2. System prompts for KYC
3. User clicks "Start KYC"

**Step 2: Document Upload**
1. User uploads required documents
2. System validates file format and size
3. Documents stored securely
4. System extracts data (OCR - optional)

**Step 3: Document Verification**
1. Allkons Admin reviews documents
2. Admin verifies:
   - Document authenticity
   - Information accuracy
   - Completeness
3. Admin can request additional documents

**Step 4: Approval/Rejection**
1. Admin approves or rejects
2. If approved → KYC Status: Approved
3. If rejected → KYC Status: Rejected (with reason)
4. User notified of result

**Step 5: Account Activation**
1. If KYC approved → Account activated
2. User can use full features
3. If KYC rejected → User can resubmit

---

#### 2.1.4 KYC Status

**Status Types**:
- **Not Started**: ยังไม่ได้เริ่ม KYC
- **Pending**: ส่งเอกสารแล้ว รอการอนุมัติ
- **Under Review**: กำลังตรวจสอบ
- **Approved**: อนุมัติแล้ว
- **Rejected**: ไม่อนุมัติ (พร้อมเหตุผล)
- **Expired**: KYC หมดอายุ (ต้อง re-verify)
- **Suspended**: ถูกระงับ (ต้อง re-verify)

**Status Transitions**:
```
Not Started → Pending → Under Review → Approved/Rejected
                                                      ↓
                                              Rejected → Pending (resubmit)
                                              Approved → Expired → Pending (re-verify)
                                              Approved → Suspended → Pending (re-verify)
```

---

### 2.2 KYC Document Management

#### 2.2.1 Document Upload

**Supported Formats**:
- Images: JPG, PNG, PDF
- Documents: PDF
- Max file size: 10MB per file
- Max files: 5 files per document type

**Upload Features**:
- Drag & drop upload
- File preview
- Image rotation/crop
- Document validation
- OCR extraction (optional)

**Security**:
- Files encrypted at rest
- Secure file storage (S3 with encryption)
- Access control (only user and admin can view)
- File retention policy (7 years for compliance)

---

#### 2.2.2 Document Verification

**Verification Process**:
1. **Automated Checks** (optional):
   - Document format validation
   - Image quality check
   - OCR data extraction
   - Duplicate detection

2. **Manual Review** (Allkons Admin):
   - Document authenticity
   - Information accuracy
   - Completeness check
   - Cross-reference with databases

**Verification Criteria**:
- Document is clear and readable
- Document is not expired
- Information matches registration data
- Document is authentic (not forged)
- All required documents provided

---

## 3. KYB (Know Your Business) Process

### 3.1 KYB Requirements

#### 3.1.1 Who Needs KYB

**Required KYB**:
- **All ORDs**: ทุกองค์กรที่สร้าง ORG
  - Seller ORG (ต้องมี Shop)
  - Buyer ORG (Legal Entity)

**KYB Purpose**:
- Verify business legitimacy
- Enable ORG features (Shop creation, B2B features)
- Compliance with regulations

---

#### 3.1.2 KYB Documents Required

**For Companies (Legal Entities)**:
- **Business Registration Documents**:
  - หนังสือรับรองบริษัท (Certificate of Incorporation)
  - เอกสารจดทะเบียนบริษัท
  - ใบสำคัญแสดงการจดทะเบียนบริษัท
- **Business License** (if applicable):
  - ใบอนุญาตประกอบธุรกิจ
- **Tax Documents**:
  - ใบสำคัญการเสียภาษี
  - เลขประจำตัวผู้เสียภาษี (Tax ID)
- **Authorized Representative**:
  - บัตรประชาชนของผู้มีอำนาจลงนาม
  - หนังสือมอบอำนาจ (ถ้ามี)
- **Ultimate Beneficial Owner (UBO)** (if required):
  - ข้อมูลผู้ถือหุ้น
  - เอกสารยืนยันตัวตน
- **Business Address Proof**:
  - เอกสารที่อยู่บริษัท
- **Bank Account Verification**:
  - เอกสารบัญชีธนาคาร
  - Bank statement (for verification)

**For Registered Individual Merchant**:
- หนังสือรับรองการจดทะเบียนพาณิชย์
- บัตรประชาชน
- เอกสารที่อยู่

---

#### 3.1.3 KYB Process Flow

**Step 1: Create ORG**
1. Account creates ORG (Success immediately)
2. System encourages user to start KYB
3. User can set up Shop and add products, but cannot publish/sell yet

**Step 2: Document Upload**
1. User uploads KYB documents
2. System validates files
3. Documents stored securely

**Step 3: Document Verification**
1. Allkons Admin reviews documents
2. Admin verifies:
   - Business registration validity
   - Business legitimacy
   - Authorized representative
   - Bank account verification
3. Admin can request additional documents

**Step 4: Approval/Rejection**
1. Admin approves or rejects
2. If approved → KYB Status: Approved (ORG Verified)
3. If rejected → KYB Status: Rejected (with reason)
4. User notified of result

**Step 5: ORG Full Activation**
1. If KYB approved → ORG Verified
2. Seller can start selling and processing transactions
3. Buyer can use all B2B features (PO, Credit Terms)
4. If KYB rejected → User notified and must resubmit correct documents

---

#### 3.1.4 KYB Status

**Status Types**:
- **Not Started**: ยังไม่ได้เริ่ม KYB
- **Pending**: ส่งเอกสารแล้ว รอการอนุมัติ
- **Under Review**: กำลังตรวจสอบ
- **Approved**: อนุมัติแล้ว (ORG Verified)
- **Rejected**: ไม่อนุมัติ (พร้อมเหตุผล)
- **Expired**: KYB หมดอายุ (ต้อง re-verify)
- **Suspended**: ถูกระงับ (ต้อง re-verify)

**Status Effects**:
- **Approved**: ORG Verified → Can use all features, including selling and B2B transactions
- **Rejected**: Cannot sell or use B2B features; restricted to basic ORG management
- **Expired**: Must re-verify to continue
- **Suspended**: ORG temporarily disabled

---

### 3.2 KYB Document Management

#### 3.2.1 Document Upload

**Document Categories**:
- Business Registration
- Business License
- Tax Documents
- Authorized Representative ID
- UBO Documents (if required)
- Business Address Proof
- Bank Account Documents

**Upload Features**:
- Category-based upload
- Multiple files per category
- File preview
- Document validation
- OCR extraction (optional)

---

#### 3.2.2 Document Verification

**Verification Process**:
1. **Automated Checks**:
   - Document format validation
   - OCR data extraction
   - Duplicate detection
   - Database cross-reference (optional)

2. **Manual Review** (Allkons Admin):
   - Business registration validity
   - Business legitimacy check
   - Authorized representative verification
   - Bank account verification
   - UBO verification (if required)

**Verification Criteria**:
- Business is legally registered
- Business is active (not dissolved)
- Authorized representative is valid
- Bank account is in company name
- All required documents provided
- Documents are authentic

---

## 4. Common Functions & Features

### 4.1 Document Upload Functions

**Upload Features**:
- Drag & drop upload
- File selection
- File preview
- Image rotation/crop
- Multiple file upload
- Progress indicator
- File validation
- Error handling

**Validation Rules**:
- File format: JPG, PNG, PDF
- File size: Max 10MB per file
- File count: Max 5 files per category
- Image quality: Min resolution, clarity check

---

### 4.2 Document Management Functions

**Document Operations**:
- View uploaded documents
- Delete documents (before approval)
- Replace documents (before approval)
- Download documents (user and admin)
- Document history

**Document Security**:
- Encryption at rest
- Secure file storage
- Access control
- Audit trail
- File retention (7 years)

---

### 4.3 Verification Workflow Functions

**Admin Functions**:
- View pending KYC/KYB requests
- Review documents
- Approve/Reject requests
- Request additional documents
- Add verification notes
- View verification history

**User Functions**:
- View KYC/KYB status
- View verification progress
- Upload additional documents
- Resubmit after rejection
- View rejection reason

---

### 4.4 Re-verification Functions

**Re-verification Triggers**:
- KYC/KYB expired (annual re-verification)
- Account suspended
- Suspicious activity detected
- Business structure changed
- Document expiration

**Re-verification Process**:
1. System notifies user
2. User uploads updated documents
3. Admin reviews
4. Approval/Rejection
5. Status updated

---

## 5. User Stories

### 5.1 KYC User Stories

**US-KYC-001: Complete KYC as Seller**
- **As a** new Seller
- **I want to** complete KYC
- **So that** I can start selling products
- **Acceptance Criteria**:
  - Can upload required documents
  - Can see verification status
  - Receive notification when approved/rejected
  - Can resubmit if rejected

**US-KYC-002: View KYC Status**
- **As a** user
- **I want to** view my KYC status
- **So that** I know if I can use features
- **Acceptance Criteria**:
  - Can see current KYC status
  - Can see verification progress
  - Can see rejection reason (if rejected)

---

### 5.2 KYB User Stories

**US-KYB-001: Complete KYB for ORG**
- **As a** user creating ORG
- **I want to** complete KYB
- **So that** my ORG can be verified
- **Acceptance Criteria**:
  - Can upload KYB documents
  - Can see verification status
  - Receive notification when approved/rejected
  - ORG activated when approved

**US-KYB-002: Re-verify KYB**
- **As a** user with expired KYB
- **I want to** re-verify KYB
- **So that** I can continue using ORG features
- **Acceptance Criteria**:
  - Receive notification when KYB expires
  - Can upload updated documents
  - Can see re-verification status

---

## 6. Technical Requirements

### 6.1 Document Storage

**Storage Requirements**:
- Secure file storage (S3 with encryption)
- File encryption at rest
- Access control
- File versioning
- File retention (7 years)

**File Organization**:
```
/users/{userId}/kyc/
  - id_card.pdf
  - address_proof.pdf
  - business_registration.pdf

/organizations/{orgId}/kyb/
  - certificate_of_incorporation.pdf
  - business_license.pdf
  - tax_documents.pdf
  - authorized_representative_id.pdf
  - bank_account.pdf
```

---

### 6.2 OCR Integration (Optional)

**OCR Features**:
- Extract text from documents
- Extract data fields:
  - Name, ID number, Address
  - Company name, Tax ID, Registration number
- Data validation
- Manual review fallback

**OCR Providers** (Optional):
- Google Cloud Vision API
- AWS Textract
- Custom OCR solution

---

### 6.3 APIs

**KYC APIs**:
- `POST /api/kyc/initiate` - Start KYC process
- `POST /api/kyc/documents/upload` - Upload documents
- `GET /api/kyc/status` - Get KYC status
- `GET /api/kyc/documents` - Get uploaded documents
- `POST /api/kyc/resubmit` - Resubmit after rejection

**KYB APIs**:
- `POST /api/kyb/initiate` - Start KYB process
- `POST /api/kyb/documents/upload` - Upload documents
- `GET /api/kyb/status` - Get KYB status
- `GET /api/kyb/documents` - Get uploaded documents
- `POST /api/kyb/resubmit` - Resubmit after rejection

**Admin APIs**:
- `GET /api/admin/kyc/pending` - Get pending KYC requests
- `GET /api/admin/kyb/pending` - Get pending KYB requests
- `POST /api/admin/kyc/approve` - Approve KYC
- `POST /api/admin/kyc/reject` - Reject KYC
- `POST /api/admin/kyb/approve` - Approve KYB
- `POST /api/admin/kyb/reject` - Reject KYB

---

## 7. Integration Points

### 7.1 With Other Modules

**Authentication & Authorization**:
- KYC status affects account access
- KYB status affects ORG access
- Account activation after KYC/KYB approval

**Organization Management**:
- KYB required for ORG creation
- ORG Verified status after KYB approval
- Shop creation requires KYB approval

**Notification Module**:
- KYC/KYB status change notifications
- Approval/rejection notifications
- Re-verification reminders

**Admin Panel**:
- KYC/KYB approval interface
- Document review interface
- Verification dashboard

---

## 8. Common Functions Reference

### 8.1 KYC Functions

```typescript
// KYC Process
initiateKYC(userId: string, userType: string): Promise<KYCRequest>
uploadKYCDocument(userId: string, documentType: string, file: File): Promise<Document>
getKYCStatus(userId: string): Promise<KYCStatus>
resubmitKYC(userId: string, documents: Document[]): Promise<KYCRequest>

// Admin
getPendingKYCRequests(): Promise<KYCRequest[]>
approveKYC(requestId: string, adminId: string, notes?: string): Promise<void>
rejectKYC(requestId: string, adminId: string, reason: string): Promise<void>
requestAdditionalDocuments(requestId: string, requiredDocuments: string[]): Promise<void>
```

### 8.2 KYB Functions

```typescript
// KYB Process
initiateKYB(orgId: string): Promise<KYBRequest>
uploadKYBDocument(orgId: string, documentType: string, file: File): Promise<Document>
getKYBStatus(orgId: string): Promise<KYBStatus>
resubmitKYB(orgId: string, documents: Document[]): Promise<KYBRequest>

// Admin
getPendingKYBRequests(): Promise<KYBRequest[]>
approveKYB(requestId: string, adminId: string, notes?: string): Promise<void>
rejectKYB(requestId: string, adminId: string, reason: string): Promise<void>
requestAdditionalDocuments(requestId: string, requiredDocuments: string[]): Promise<void>
```

### 8.3 Document Functions

```typescript
// Document Management
uploadDocument(userId: string, category: string, file: File): Promise<Document>
getDocuments(userId: string, category?: string): Promise<Document[]>
deleteDocument(documentId: string): Promise<void>
replaceDocument(documentId: string, file: File): Promise<Document>
downloadDocument(documentId: string): Promise<File>
```

---

## 9. Compliance & Regulations

### 9.1 Data Retention

**Retention Policy**:
- KYC/KYB documents: 7 years (compliance)
- Verification records: 7 years
- Rejected documents: 1 year
- Audit trail: Permanent

### 9.2 Privacy & Security

**Privacy Requirements**:
- PDPA compliance (Thailand)
- Data encryption
- Access control
- Data anonymization (when possible)

**Security Requirements**:
- Secure file storage
- Encryption at rest and in transit
- Access logging
- Audit trail

---

## 10. Success Metrics

### 10.1 KYC/KYB Metrics

- KYC/KYB completion rate
- Average verification time
- Approval rate
- Rejection rate
- Re-verification rate
- Document quality score

### 10.2 Process Metrics

- Average time to approval
- Admin review efficiency
- Document upload success rate
- Resubmission rate

---

## 11. Implementation Priority

### Phase 1 (MVP)
- ✅ Basic KYC/KYB process
- ✅ Document upload
- ✅ Manual approval workflow
- ✅ Status management
- ✅ Basic notifications

### Phase 2
- ✅ OCR integration
- ✅ Automated checks
- ✅ Re-verification process
- ✅ Advanced document management

### Phase 3
- ✅ Database cross-reference
- ✅ Advanced fraud detection
- ✅ Automated approval (low-risk cases)

---

## 12. Dependencies

### 12.1 External Dependencies
- File storage service (S3)
- OCR service (optional)
- Email service (notifications)
- SMS service (optional notifications)

### 12.2 Internal Dependencies
- Authentication & Authorization Module
- Organization Management Module
- Notification Module
- Admin Panel Module

---

## Appendix

### A. Document Types Reference

**KYC Documents**:
- Government-issued Photo ID
- Proof of Address
- Business Registration (if applicable)

**KYB Documents**:
- Certificate of Incorporation
- Business License
- Tax Documents
- Authorized Representative ID
- UBO Documents
- Business Address Proof
- Bank Account Documents

### B. Verification Checklist

**KYC Checklist**:
- [ ] Document is clear and readable
- [ ] Document is not expired
- [ ] Information matches registration
- [ ] Document is authentic
- [ ] All required documents provided

**KYB Checklist**:
- [ ] Business is legally registered
- [ ] Business is active
- [ ] Authorized representative is valid
- [ ] Bank account is in company name
- [ ] All required documents provided
- [ ] Documents are authentic

### C. References
- [Project Scope Document](../business_user/project-scope.md)
- [User Structure Document](../business_user/user-structure.md)
- Authentication & Authorization Module
- Web Search: KYC/KYB Best Practices for Marketplaces
