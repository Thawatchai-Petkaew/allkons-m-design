# PDPA Management Module: Allkons M

## Executive Summary
Module สำหรับการจัดการ PDPA (Personal Data Protection Act) ในระบบ Allkons M โดยแบ่งเป็น 2 Layer: Account (User) level และ ORG level

---

## 1. Module Overview

### 1.1 Purpose
- **PDPA Compliance**: ตรวจสอบความถูกต้องตามกฎหมาย PDPA
- **Consent Management**: จัดการความยินยอม (Consent)
- **Data Subject Rights**: สิทธิของเจ้าของข้อมูล
- **Data Protection**: ป้องกันข้อมูลส่วนบุคคล

### 1.2 Scope
- Two-Layer PDPA Management (Account & ORG)
- Consent Management
- Privacy Policy Management
- Data Subject Rights (Access, Rectification, Erasure, Portability)
- Data Processing Records
- Data Breach Management
- Privacy Impact Assessment (PIA)

---

## 2. Two-Layer PDPA Structure

### 2.1 Layer 1: Account (User) Level

#### 2.1.1 Account-Level PDPA

**Scope**:
- ข้อมูลส่วนบุคคลของ User (Account)
- ข้อมูลที่ User ให้มาเอง
- ข้อมูลที่ระบบเก็บรวบรวมจาก User

**Data Categories**:
- **Personal Information**:
  - Name, Email, Phone Number
  - Address
  - Date of Birth
  - ID Card Number
  - Profile Picture
- **Account Information**:
  - Login credentials
  - Account settings
  - Preferences
- **Activity Data**:
  - Browsing history
  - Search history
  - Purchase history
  - Interaction data

**Data Controller**:
- Allkons M (Platform) เป็น Data Controller สำหรับ Account-level data

---

#### 2.1.2 Account-Level Consent Management

**Consent Types**:
- **Registration Consent**: ความยินยอมในการลงทะเบียน
- **Marketing Consent**: ความยินยอมในการรับข้อมูลการตลาด
- **Data Sharing Consent**: ความยินยอมในการแชร์ข้อมูล
- **Analytics Consent**: ความยินยอมในการใช้ข้อมูลเพื่อวิเคราะห์
- **Third-party Consent**: ความยินยอมในการแชร์ข้อมูลกับ Third-party

**Consent Management**:
- User can view all consents
- User can give/withdraw consent
- Consent history tracking
- Consent expiration (if applicable)

**Consent UI**:
- Consent checkboxes during registration
- Consent management page
- Consent withdrawal option
- Consent status display

---

#### 2.1.3 Account-Level Data Subject Rights

**Right to Access**:
- User can request access to their personal data
- System generates data export
- Data provided in readable format (JSON, PDF)

**Right to Rectification**:
- User can update their personal data
- Data correction workflow
- Data validation

**Right to Erasure (Right to be Forgotten)**:
- User can request deletion of their data
- Deletion workflow
- Data retention exceptions
- Anonymization option

**Right to Data Portability**:
- User can export their data
- Data export in machine-readable format
- Data transfer to another service

**Right to Object**:
- User can object to data processing
- Objection handling
- Processing restriction

**Right to Restrict Processing**:
- User can restrict data processing
- Processing restriction workflow
- Exception handling

---

### 2.2 Layer 2: ORG Level

#### 2.2.1 ORG-Level PDPA

**Scope**:
- ข้อมูลส่วนบุคคลของ Organization
- ข้อมูลของ Team Members ใน Organization
- ข้อมูลที่ Organization เก็บรวบรวม (Customer data, Employee data)

**Data Categories**:
- **Organization Information**:
  - Organization name, Tax ID
  - Business registration
  - Organization address
- **Team Member Data**:
  - Team member personal information
  - Role and permissions
  - Activity logs
- **Customer Data** (for Sellers):
  - Customer personal information
  - Purchase history
  - Communication records
- **Employee Data** (if applicable):
  - Employee personal information
  - Employment records

**Data Controller**:
- Organization (ORD) เป็น Data Controller สำหรับ ORG-level data
- Allkons M เป็น Data Processor (ในบางกรณี)

---

#### 2.2.2 ORG-Level Consent Management

**Consent Types**:
- **Team Member Consent**: ความยินยอมของ Team Members
- **Customer Consent** (for Sellers): ความยินยอมของลูกค้า
- **Data Processing Consent**: ความยินยอมในการประมวลผลข้อมูล
- **Data Sharing Consent**: ความยินยอมในการแชร์ข้อมูล
- **Marketing Consent**: ความยินยอมในการรับข้อมูลการตลาด

**Consent Management**:
- ORG Admin can manage consents
- Team Member consent tracking
- Customer consent tracking (for Sellers)
- Consent withdrawal handling

**Consent Responsibilities**:
- ORG must obtain consent from Team Members
- ORG must obtain consent from Customers (if applicable)
- ORG must maintain consent records
- ORG must handle consent withdrawals

---

#### 2.2.3 ORG-Level Data Subject Rights

**Team Member Rights**:
- Access to their personal data
- Rectification of their data
- Erasure of their data
- Data portability
- Object to processing

**Customer Rights** (for Sellers):
- Access to their personal data
- Rectification of their data
- Erasure of their data
- Data portability
- Object to processing

**ORG Responsibilities**:
- Handle data subject requests
- Respond within 30 days
- Maintain request records
- Report to Allkons Admin (if required)

---

## 3. Common Functions & Features

### 3.1 Consent Management

#### 3.1.1 Consent Collection

**Collection Points**:
- **Registration**: During user registration
- **ORG Creation**: During ORG creation
- **Team Member Invitation**: When inviting team members
- **Feature Usage**: When using new features
- **Policy Updates**: When privacy policy updates

**Consent UI**:
- Clear consent checkboxes
- Link to privacy policy
- Consent description
- Required vs Optional consent
- Granular consent options

**Consent Storage**:
- Consent timestamp
- Consent version (policy version)
- Consent method (how consent was given)
- Consent IP address
- Consent record

---

#### 3.1.2 Consent Withdrawal

**Withdrawal Process**:
1. User/ORG requests consent withdrawal
2. System processes withdrawal
3. Data processing stops (if applicable)
4. User/ORG notified
5. Withdrawal recorded

**Withdrawal Effects**:
- Marketing communications stop
- Data sharing stops
- Some features may be disabled
- Data retention continues (for legal compliance)

**Withdrawal UI**:
- Consent management page
- Withdraw consent button
- Confirmation dialog
- Withdrawal confirmation

---

#### 3.1.3 Consent History

**History Tracking**:
- All consent given/withdrawn
- Consent timestamps
- Consent versions
- Consent methods
- Consent status

**History Features**:
- View consent history
- Filter by consent type
- Filter by date
- Export consent history

---

### 3.2 Privacy Policy Management

#### 3.2.1 Privacy Policy

**Policy Types**:
- **Account Privacy Policy**: Privacy policy for Account-level data
- **ORG Privacy Policy**: Privacy policy for ORG-level data
- **Platform Privacy Policy**: Allkons M platform privacy policy

**Policy Content**:
- Data collection purposes
- Data processing methods
- Data sharing practices
- Data retention periods
- Data subject rights
- Contact information
- Policy version
- Last updated date

**Policy Management**:
- Create/Update privacy policy
- Version control
- Policy approval workflow
- Policy publishing
- Policy notification to users

---

#### 3.2.2 Policy Versioning

**Version Management**:
- Policy versions
- Version history
- Version comparison
- Rollback capability

**Policy Updates**:
- Notify users of policy updates
- Require re-consent (if major changes)
- Track consent for new version
- Maintain old version for reference

---

### 3.3 Data Subject Rights Management

#### 3.3.1 Request Management

**Request Types**:
- Access Request
- Rectification Request
- Erasure Request
- Portability Request
- Objection Request
- Restriction Request

**Request Flow**:
1. Data subject submits request
2. System validates request
3. Request assigned to handler
4. Request processed
5. Response sent to data subject
6. Request closed

**Request Tracking**:
- Request ID
- Request type
- Request status
- Request date
- Response date
- Request handler

---

#### 3.3.2 Request Processing

**Processing Time**:
- Standard: 30 days
- Complex: 60 days (with notification)
- Extension: Up to 90 days (with justification)

**Processing Steps**:
1. Verify data subject identity
2. Locate relevant data
3. Process request
4. Prepare response
5. Send response
6. Record request

**Response Format**:
- Data export (JSON, PDF, CSV)
- Data correction confirmation
- Deletion confirmation
- Portability file

---

### 3.4 Data Processing Records

#### 3.4.1 Processing Records

**Recorded Information**:
- Data processing activities
- Processing purposes
- Data categories
- Data subjects
- Recipients
- Data retention periods
- Security measures

**Record Types**:
- **Account-Level Records**: Records for Account-level processing
- **ORG-Level Records**: Records for ORG-level processing
- **Platform Records**: Records for platform processing

**Record Management**:
- Create processing records
- Update records
- View records
- Export records
- Audit records

---

#### 3.4.2 Record Keeping

**Retention Period**:
- Processing records: 7 years (compliance)
- Consent records: 7 years
- Request records: 7 years

**Record Storage**:
- Secure storage
- Access control
- Audit trail
- Backup and recovery

---

### 3.5 Data Breach Management

#### 3.5.1 Breach Detection

**Detection Methods**:
- Automated monitoring
- Security alerts
- User reports
- Third-party notifications

**Breach Types**:
- Unauthorized access
- Data loss
- Data theft
- Data corruption
- System breach

---

#### 3.5.2 Breach Response

**Response Flow**:
1. Breach detected
2. Breach assessed
3. Containment measures
4. Notification (if required)
5. Investigation
6. Remediation
7. Documentation

**Notification Requirements**:
- **Account-Level**: Notify affected users within 72 hours
- **ORG-Level**: ORG must notify affected data subjects
- **Regulatory**: Notify PDPA Office (if required)

**Breach Documentation**:
- Breach details
- Affected data subjects
- Breach impact
- Remediation measures
- Prevention measures

---

### 3.6 Privacy Impact Assessment (PIA)

#### 3.6.1 PIA Process

**PIA Triggers**:
- New data processing activities
- High-risk processing
- New features
- Policy changes

**PIA Steps**:
1. Identify processing activities
2. Assess risks
3. Identify mitigation measures
4. Document assessment
5. Review and approve
6. Implement measures

**PIA Documentation**:
- Processing description
- Risk assessment
- Mitigation measures
- Approval records

---

## 4. User Stories

### 4.1 Account-Level PDPA User Stories

**US-PDPA-001: Manage Consent**
- **As a** User
- **I want to** manage my consent preferences
- **So that** I control how my data is used
- **Acceptance Criteria**:
  - Can view all consents
  - Can give/withdraw consent
  - Can see consent history
  - Consent changes take effect immediately

**US-PDPA-002: Request Data Access**
- **As a** User
- **I want to** request access to my personal data
- **So that** I know what data is collected about me
- **Acceptance Criteria**:
  - Can submit access request
  - Receive data export within 30 days
  - Data in readable format
  - Can download data

---

### 4.2 ORG-Level PDPA User Stories

**US-PDPA-003: Manage Team Member Consent**
- **As an** ORG Admin
- **I want to** manage team member consents
- **So that** I comply with PDPA requirements
- **Acceptance Criteria**:
  - Can view team member consents
  - Can track consent status
  - Can handle consent withdrawals
  - Consent records maintained

**US-PDPA-004: Handle Data Subject Request**
- **As an** ORG Admin
- **I want to** handle data subject requests
- **So that** I comply with PDPA requirements
- **Acceptance Criteria**:
  - Can receive data subject requests
  - Can process requests within 30 days
  - Can track request status
  - Can generate responses

---

## 5. Technical Requirements

### 5.1 PDPA Service

**Components**:
- PDPA Service (API)
- Consent Management Service
- Data Subject Rights Service
- Data Processing Records Service
- Data Breach Management Service

---

### 5.2 APIs

**Consent APIs**:
- `GET /api/pdpa/consents` - Get consents (Account/ORG)
- `POST /api/pdpa/consents` - Give consent
- `DELETE /api/pdpa/consents/{id}` - Withdraw consent
- `GET /api/pdpa/consents/history` - Get consent history

**Data Subject Rights APIs**:
- `POST /api/pdpa/requests/access` - Request data access
- `POST /api/pdpa/requests/rectification` - Request data rectification
- `POST /api/pdpa/requests/erasure` - Request data erasure
- `POST /api/pdpa/requests/portability` - Request data portability
- `GET /api/pdpa/requests` - Get request status
- `GET /api/pdpa/requests/{id}` - Get request details

**Data Processing Records APIs**:
- `GET /api/pdpa/records` - Get processing records
- `POST /api/pdpa/records` - Create processing record
- `PUT /api/pdpa/records/{id}` - Update processing record

**Privacy Policy APIs**:
- `GET /api/pdpa/policy` - Get privacy policy
- `GET /api/pdpa/policy/version/{version}` - Get policy version
- `POST /api/pdpa/policy/accept` - Accept policy version

---

## 6. Common Functions Reference

### 6.1 PDPA Functions

```typescript
// Consent Management
getConsents(userId: string, level: 'account' | 'org'): Promise<Consent[]>
giveConsent(userId: string, consentType: string, level: 'account' | 'org'): Promise<Consent>
withdrawConsent(userId: string, consentId: string, level: 'account' | 'org'): Promise<void>
getConsentHistory(userId: string, level: 'account' | 'org'): Promise<ConsentHistory[]>

// Data Subject Rights
requestDataAccess(userId: string, level: 'account' | 'org'): Promise<DataRequest>
requestDataRectification(userId: string, data: object, level: 'account' | 'org'): Promise<DataRequest>
requestDataErasure(userId: string, level: 'account' | 'org'): Promise<DataRequest>
requestDataPortability(userId: string, level: 'account' | 'org'): Promise<DataRequest>
getDataRequest(requestId: string): Promise<DataRequest>
processDataRequest(requestId: string, handlerId: string): Promise<void>

// Privacy Policy
getPrivacyPolicy(level: 'account' | 'org'): Promise<PrivacyPolicy>
getPrivacyPolicyVersion(version: string, level: 'account' | 'org'): Promise<PrivacyPolicy>
acceptPrivacyPolicy(userId: string, version: string, level: 'account' | 'org'): Promise<void>

// Data Processing Records
getProcessingRecords(level: 'account' | 'org'): Promise<ProcessingRecord[]>
createProcessingRecord(record: ProcessingRecord, level: 'account' | 'org'): Promise<ProcessingRecord>
updateProcessingRecord(id: string, record: ProcessingRecord): Promise<ProcessingRecord>

// Data Breach
reportDataBreach(breach: DataBreach, level: 'account' | 'org'): Promise<DataBreach>
getDataBreaches(level: 'account' | 'org'): Promise<DataBreach[]>
handleDataBreach(breachId: string, actions: BreachActions): Promise<void>
```

---

## 7. Success Metrics

### 7.1 PDPA Metrics

- Consent rate
- Consent withdrawal rate
- Data subject request response time
- Data breach detection time
- Compliance rate

---

## 8. Implementation Priority

### Phase 1 (MVP)
- ✅ Basic consent management (Account & ORG)
- ✅ Privacy policy management
- ✅ Data access request
- ✅ Data rectification request

### Phase 2
- ✅ Data erasure request
- ✅ Data portability request
- ✅ Data processing records
- ✅ Consent history

### Phase 3
- ✅ Data breach management
- ✅ Privacy Impact Assessment (PIA)
- ✅ Advanced consent management
- ✅ Automated compliance checks

---

## 9. Dependencies

### 9.1 External Dependencies
- None (internal module)

### 9.2 Internal Dependencies
- Authentication & Authorization Module
- Organization Management Module
- User Management Module
- Settings & Configuration Module
- Notification Module

---

## Appendix

### A. Two-Layer PDPA Structure

**Layer 1: Account (User) Level**
- Data Controller: Allkons M (Platform)
- Data Subjects: Individual Users
- Scope: Personal data of users
- Consent: User gives consent
- Rights: User exercises rights

**Layer 2: ORG Level**
- Data Controller: Organization (ORD)
- Data Subjects: Team Members, Customers
- Scope: Organization data, Team member data, Customer data
- Consent: ORG manages consents
- Rights: ORG handles data subject requests

### B. PDPA Compliance Checklist

**Account Level**:
- [ ] Privacy policy for Account-level data
- [ ] Consent collection during registration
- [ ] Consent management interface
- [ ] Data subject rights implementation
- [ ] Data processing records
- [ ] Data breach response plan

**ORG Level**:
- [ ] Privacy policy for ORG-level data
- [ ] Team member consent management
- [ ] Customer consent management (for Sellers)
- [ ] Data subject rights handling
- [ ] Data processing records
- [ ] Data breach response plan

### C. References
- Project Scope Document
- User Structure Document
- Organization Management Module
- Settings & Configuration Module
- PDPA Thailand (Personal Data Protection Act B.E. 2562)
