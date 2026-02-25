# RFQ Management Module: Allkons M

## Executive Summary
Module สำหรับการจัดการคำขอใบเสนอราคา (Request for Quotation - RFQ) ในระบบ Allkons M โดยรองรับการทำงานแบบ B2B ที่ซับซ้อน

**Status**: ✅ **Ready for Design**

---

## 1. Module Overview

### 1.1 Purpose
- จัดการกระบวนการสอบถามราคาแบบ B2B
- รองรับการทำงานระหว่างผู้ซื้อและผู้ขายหลายราย
- สนับสนุนการเจรจาต่อรองและการเปรียบเทียบราคา
- เชื่อมต่อกับระบบภายนอก (เช่น Mango)

### 1.2 Scope
- RFQ Creation & Management
- Seller Invitation & Selection
- Quotation Management
- Price Comparison & Negotiation
- PO Generation
- Integration with External Systems

---

## 2. User Stories & Requirements

### 2.1 Buyer Requirements

#### RFQ Creation & Management
**US-RFQ-001: Create RFQ**
- **As a** Buyer
- **I want to** create new RFQ
- **So that** I can request quotations from multiple sellers

**US-RFQ-002: Save RFQ Draft**
- **As a** Buyer
- **I want to** save RFQ as draft
- **So that** I can complete it later

**US-RFQ-003: Add Products to RFQ**
- **As a** Buyer
- **I want to** add products to RFQ request
- **So that** sellers can quote for specific items

**US-RFQ-004: Upload BOQ/CSV**
- **As a** Buyer
- **I want to** upload BOQ/CSV files
- **So that** I can quickly create quotation requests

**US-RFQ-005: Specify Requirements**
- **As a** Buyer
- **I want to** specify quantity, unit, specifications, and quality requirements
- **So that** sellers can provide accurate quotations

**US-RFQ-006: Set Payment Terms**
- **As a** Buyer
- **I want to** set payment terms (transfer/credit terms)
- **So that** sellers understand payment conditions

**US-RFQ-007: Attach Documents**
- **As a** Buyer
- **I want to** attach images, specifications, construction drawings
- **So that** sellers understand detailed requirements

**US-RFQ-008: Set Delivery Locations**
- **As a** Buyer
- **I want to** set work sites/delivery locations (multiple sites)
- **So that** sellers can calculate shipping correctly

**US-RFQ-009: Set Delivery Schedule**
- **As a** Buyer
- **I want to** set delivery rounds and time windows
- **So that** it aligns with project schedule

**US-RFQ-010: Specify Packing Requirements**
- **As a** Buyer
- **I want to** specify packing/lifting/installation requirements
- **So that** sellers can include true costs

**US-RFQ-011: Set Bid Due Date**
- **As a** Buyer
- **I want to** set bid closing date/time
- **So that** there's a clear timeframe

**US-RFQ-012: Preview RFQ**
- **As a** Buyer
- **I want to** preview complete RFQ before sending
- **So that** I can prevent errors

**US-RFQ-013: Cancel/Modify RFQ**
- **As a** Buyer
- **I want to** cancel RFQ or modify specific items/lots
- **So that** I can adjust scope

#### Seller Selection & Management
**US-RFQ-014: Search & Select Sellers**
- **As a** Buyer
- **I want to** search and select sellers/shops/branches to invite
- **So that** I can target appropriate suppliers

**US-RFQ-015: Monitor Response Status**
- **As a** Buyer
- **I want to** see summary of responded/unresponded sellers
- **So that** I can assess progress

**US-RFQ-016: RFQ Dashboard**
- **As a** Buyer
- **I want to** dashboard showing RFQ status (responded/pending/questions)
- **So that** I can monitor progress

**US-RFQ-017: Duplicate RFQ**
- **As a** Buyer
- **I want to** duplicate existing RFQ
- **So that** I can quickly submit new rounds

#### Quotation Management
**US-RFQ-018: View Quotation Status**
- **As a** Buyer
- **I want to** see quotation status (new/updated/withdrawn/expired)
- **So that** I can prioritize work

**US-RFQ-019: View Quotation Details**
- **As a** Buyer
- **I want to** view quotation details (price, shipping, payment terms, credit terms)
- **So that** I can evaluate value

**US-RFQ-020: See Validity Period**
- **As a** Buyer
- **I want to** see quotation expiry date
- **So that** I can plan approval

**US-RFQ-021: Side-by-Side Comparison**
- **As a** Buyer
- **I want to** side-by-side seller comparison table by item/lot
- **So that** I can compare prices instantly

**US-RFQ-022: Export Comparison**
- **As a** Buyer
- **I want to** export comparison table as Excel/PDF
- **So that** I can share with stakeholders

**US-RFQ-023: Counter Offer**
- **As a** Buyer
- **I want to** request price adjustment/scope changes (negotiation)
- **So that** I can find optimal terms

**US-RFQ-024: Set Negotiation Deadline**
- **As a** Buyer
- **I want to** set response deadline for negotiations with auto-reminders
- **So that** negotiations don't drag on

**US-RFQ-025: Send to Approval**
- **As a** Buyer
- **I want to** send selection to approval workflow
- **So that** it follows company policy

**US-RFQ-026: Convert to PO**
- **As a** Buyer
- **I want to** convert winning quotation to Purchase Order
- **So that** I can close the deal quickly

**US-RFQ-027: Support Partial Offers**
- **As a** Buyer
- **I want to** support "partial offers/missing items"
- **So that** I can do mixed sourcing

**US-RFQ-028: Search/Filter Quotations**
- **As a** Buyer
- **I want to** fast search/filter/sort in large quotation lists
- **So that** I can work efficiently

### 2.2 Seller Requirements

#### RFQ Management
**US-RFQ-029: View RFQ List**
- **As a** Seller with RFQ management permission
- **I want to** view all quotation requests
- **So that** I can see business opportunities

**US-RFQ-030: Filter RFQ by Status**
- **As a** Seller with RFQ management permission
- **I want to** view RFQs by status
- **So that** I can prioritize work

**US-RFQ-031: Sort RFQ by Date**
- **As a** Seller with RFQ management permission
- **I want to** view RFQs by request date order
- **So that** I can see newest opportunities

**US-RFQ-032: Search RFQ**
- **As a** Seller with RFQ management permission
- **I want to** search RFQs by date, request number, customer name, customer type
- **So that** I can find specific requests

**US-RFQ-033: Search by Contact Info**
- **As a** Seller with RFQ management permission
- **I want to** search RFQs by phone, branch, customer request date
- **So that** I can locate requests efficiently

**US-RFQ-034: View Customer Contact**
- **As a** Seller with RFQ management permission
- **I want to** view contact information of requesting customer
- **So that** I can communicate effectively

**US-RFQ-035: View RFQ Details**
- **As a** Seller with RFQ management permission
- **I want to** view detailed RFQ information
- **So that** I can understand requirements

**US-RFQ-036: View Delivery Requirements**
- **As a** Seller with RFQ management permission
- **I want to** view items and delivery requirements per round
- **So that** I can plan logistics

**US-RFQ-037: View Delivery Addresses**
- **As a** Seller with RFQ management permission
- **I want to** view delivery addresses per round
- **So that** I can calculate shipping

**US-RFQ-038: Start Quotation**
- **As a** Seller with RFQ management permission
- **I want to** start creating quotation for RFQ
- **So that** I can respond to opportunities

**US-RFQ-039: View Related Quotations**
- **As a** Seller with RFQ management permission
- **I want to** view related quotations for RFQ
- **So that** I can track my responses

**US-RFQ-040: Cancel RFQ**
- **As a** Seller with RFQ management permission
- **I want to** cancel RFQ
- **So that** I can manage my workload

**US-RFQ-041: Delete Cancelled RFQ**
- **As a** Seller with RFQ management permission
- **I want to** delete cancelled RFQs
- **So that** I can keep list clean

#### Quotation Management
**US-RFQ-042: View All Quotations**
- **As a** Seller with quotation management permission
- **I want to** view all quotations
- **So that** I can track my business activities

**US-RFQ-043: Filter Quotations by Status**
- **As a** Seller with quotation management permission
- **I want to** view quotations by status
- **So that** I can prioritize follow-ups

**US-RFQ-044: Sort Quotations by Date**
- **As a** Seller with quotation management permission
- **I want to** view quotations by creation date order
- **So that** I can see recent activities

**US-RFQ-045: Search Quotations**
- **As a** Seller with quotation management permission
- **I want to** search quotations by date, quotation number, customer name
- **So that** I can find specific quotations

**US-RFQ-046: Search by Customer Info**
- **As a** Seller with quotation management permission
- **I want to** search quotations by customer type, phone, branch
- **So that** I can locate customer quotations

**US-RFQ-047: View Customer Contact**
- **As a** Seller with quotation management permission
- **I want to** view contact information of requesting customer
- **So that** I can provide service

**US-RFQ-048: View Delivery Addresses**
- **As a** Seller with quotation management permission
- **I want to** view delivery addresses per round in quotation
- **So that** I can plan delivery

**US-RFQ-049: Edit Quotation**
- **As a** Seller with quotation management permission
- **I want to** edit quotation details before approval
- **So that** I can make corrections

**US-RFQ-050: Cancel Quotation**
- **As a** Seller with quotation management permission
- **I want to** cancel quotation not yet ordered by customer
- **So that** I can manage my commitments

**US-RFQ-051: View Quotation Items**
- **As a** Seller with quotation management permission
- **I want to** view items to be delivered per round in quotation
- **So that** I can prepare stock

**US-RFQ-052: View Quotation Details**
- **As a** Seller with quotation management permission
- **I want to** view detailed quotation information
- **So that** I can review my offer

**US-RFQ-053: View Original RFQ**
- **As a** Seller with quotation management permission
- **I want to** view related original RFQ
- **So that** I can reference requirements

**US-RFQ-054: View Quotation History**
- **As a** Seller with quotation management permission
- **I want to** view quotation version history
- **So that** I can track changes

**US-RFQ-055: View Related Orders**
- **As a** Seller with quotation management permission
- **I want to** view related orders of ordered quotations
- **So that** I can see conversion results

**US-RFQ-056: View Approval History**
- **As a** Seller with quotation management permission
- **I want to** view quotation approval step history
- **So that** I can understand process

**US-RFQ-057: Delete Cancelled Quotations**
- **As a** Seller with quotation management permission
- **I want to** delete cancelled quotations
- **So that** I can maintain clean records

**US-RFQ-058: Copy Quotation**
- **As a** Seller with quotation management permission
- **I want to** copy existing quotation
- **So that** I can create similar quotes quickly

**US-RFQ-059: Restore Cancelled Quotation**
- **As a** Seller with quotation management permission
- **I want to** restore cancelled quotation to work on it again
- **So that** I can revive opportunities

**US-RFQ-060: Submit for Approval**
- **As a** Seller with quotation management permission
- **I want to** submit quotation for approval
- **So that** it follows internal process

**US-RFQ-061: Download Approved Quotation**
- **As a** Seller with quotation management permission
- **I want to** download approved quotation
- **So that** I can share with customer

#### Approval Management
**US-RFQ-062: View Pending Approvals**
- **As a** Seller with quotation approval permission
- **I want to** view quotations requiring my approval
- **So that** I can review and decide

**US-RFQ-063: View Approval Details**
- **As a** Seller with quotation approval permission
- **I want to** view detailed quotation requiring approval
- **So that** I can make informed decision

**US-RFQ-064: Approve Quotation**
- **As a** Seller with quotation approval permission
- **I want to** approve quotation
- **So that** it can be sent to customer

**US-RFQ-065: Reject Quotation**
- **As a** Seller with quotation approval permission
- **I want to** reject quotation with reason
- **So that** seller can improve

### 2.3 External Integration Requirements

#### Mango Integration
**US-RFQ-066: View Mango RFQs**
- **As a** Buyer
- **I want to** view RFQ requests from Mango in Allkons M system
- **So that** I can manage all requests in one place

**US-RFQ-067: View Mango RFQ Details**
- **As a** Buyer
- **I want to** view detailed RFQ from Mango
- **So that** I can understand requirements

**US-RFQ-068: Compare Prices for Mango RFQ**
- **As a** Buyer
- **I want to** compare prices from shops/branches based on Mango RFQ
- **So that** I can get competitive pricing

**US-RFQ-069: View Cancelled Mango RFQs**
- **As a** Buyer
- **I want to** view cancelled RFQ requests from Mango
- **So that** I can track all communications

**US-RFQ-070: Send Quotation to Mango**
- **As a** Buyer
- **I want to** select quotation to send to Mango
- **So that** they can compare with other platforms

**US-RFQ-071: View Mango Orders**
- **As a** Buyer
- **I want to** view orders when Mango confirms purchase
- **So that** I can track fulfillment

**US-RFQ-072: View Mango PO Documents**
- **As a** Buyer
- **I want to** view PO documents attached by Mango in orders
- **So that** I have complete documentation

---

## 3. Module Architecture

### 3.1 Core Components

#### RFQ Management
- **RFQ Creator**: สร้างและแก้ไข RFQ
- **Seller Selector**: เลือกผู้ขายที่จะเชิญ
- **RFQ Dashboard**: แสดงภาพรวมสถานะ
- **Document Manager**: จัดการเอกสารแนบ

#### Quotation Management
- **Quotation Creator**: สร้างใบเสนอราคา
- **Price Calculator**: คำนวณราคาและต้นทุน
- **Comparison Engine**: เปรียบเทียบราคา
- **Negotiation Manager**: จัดการการเจรจา

#### Approval Workflow
- **Approval Engine**: จัดการกระบวนการอนุมัติ
- **Notification System**: แจ้งเตือนและเตือนความจำ
- **Audit Trail**: บันทึกประวัติการทำงาน

#### Integration Layer
- **Mango Connector**: เชื่อมต่อกับระบบ Mango
- **PO Generator**: สร้าง Purchase Order
- **Export Manager**: ส่งออกข้อมูล

### 3.2 Data Flow

```
Buyer creates RFQ → Select Sellers → Send Invitations
↓
Sellers receive RFQ → Create Quotations → Submit for Approval
↓
Approvers review → Approve/Reject → Send to Buyer
↓
Buyer receives Quotations → Compare → Negotiate → Select Winner
↓
Convert to PO → Send to Seller → Order Confirmation
```

---

## 4. Key Features

### 4.1 RFQ Features
- ✅ Multi-format RFQ creation (manual, BOQ upload, CSV import)
- ✅ Flexible seller invitation system
- ✅ Comprehensive requirement specification
- ✅ Multi-site delivery management
- ✅ Document attachment system
- ✅ Draft and preview functionality
- ✅ Real-time status tracking

### 4.2 Quotation Features
- ✅ Intelligent price calculation
- ✅ Side-by-side comparison
- ✅ Negotiation workflow
- ✅ Approval management
- ✅ Version control
- ✅ Export capabilities

### 4.3 Integration Features
- ✅ Mango platform integration
- ✅ PO generation
- ✅ External system sync
- ✅ API connectivity

---

## 5. Technical Specifications

### 5.1 API Endpoints

#### RFQ Management
```
POST   /api/rfq/create
GET    /api/rfq/list
GET    /api/rfq/{id}
PUT    /api/rfq/{id}
DELETE /api/rfq/{id}
POST   /api/rfq/{id}/invite-sellers
POST   /api/rfq/{id}/send
POST   /api/rfq/upload-boq
GET    /api/rfq/{id}/status
```

#### Quotation Management
```
POST   /api/quotations/create
GET    /api/quotations/list
GET    /api/quotations/{id}
PUT    /api/quotations/{id}
DELETE /api/quotations/{id}
POST   /api/quotations/{id}/submit-approval
POST   /api/quotations/{id}/approve
POST   /api/quotations/{id}/reject
GET    /api/quotations/{id}/comparison
POST   /api/quotations/{id}/negotiate
```

#### Integration
```
POST   /api/integration/mango/sync-rfq
GET    /api/integration/mango/rfq-list
POST   /api/integration/mango/send-quotation
POST   /api/rfq/{id}/convert-to-po
```

### 5.2 Database Schema Integration

Module นี้จะใช้ tables จาก `b2b-purchasing-schema.md`:
- `purchase_requests` → RFQs
- `purchase_request_items` → RFQ Items
- `quotations` → Quotations
- `quotation_items` → Quotation Items
- `purchase_orders` → Generated POs

### 5.3 Permissions Required

#### Buyer Permissions
- `RFQ_MANAGEMENT` - Create and manage RFQs
- `RFQ_VIEW` - View RFQ lists and details
- `QUOTATION_MANAGEMENT` - Manage received quotations
- `QUOTATION_COMPARISON` - Compare quotations
- `RFQ_APPROVAL` - Approve RFQ selections

#### Seller Permissions
- `RFQ_VIEW_SELLER` - View received RFQs
- `QUOTATION_MANAGEMENT_SELLER` - Create and manage quotations
- `QUOTATION_APPROVAL_SELLER` - Approve quotations
- `QUOTATION_VIEW_SELLER` - View quotation lists

---

## 6. Implementation Priority

### Current Scope
- ✅ Basic RFQ creation and management
- ✅ Seller invitation system
- ✅ Quotation creation and management
- ✅ Basic price comparison
- ✅ PO generation

### Designed to Support
- ✅ Advanced negotiation workflow
- ✅ Multi-round bidding
- ✅ Complex approval workflows
- ✅ Mango integration
- ✅ Advanced analytics and reporting

---

## 7. Success Metrics

### User Adoption
- Number of RFQs created per month
- RFQ to quotation conversion rate
- Average response time
- User satisfaction scores

### Business Impact
- Cost savings through competition
- Process efficiency improvements
- Supplier performance metrics
- Integration success rates

---

## 8. Dependencies

### Internal Dependencies
- User Management Module (authentication, roles)
- Product Management Module (Master SKU)
- Organization Management (buyer/seller structure)
- Notification Module (alerts and reminders)

### External Dependencies
- Mango Platform API
- Payment Gateway (for credit terms)
- Email Service (notifications)
- Document Storage (attachments)

---

## 10. Market Research & Competitive Analysis

### 10.1 Platform Research Insights

#### Rakmao Platform Analysis
**Source**: https://rakmao.com/ and https://blog.rakmao.com/

**Key Features Identified:**
- **Dual Platform Approach**: 
  - "รักเหมา Buy Now" - สำหรับการซื้อด่วน ราคาคงที่
  - "รักเหมา E-Procurement" - สำหรับการขอใบเสนอราคา (RFQ)
- **Core Workflow**: ค้นหา → เปรียบเทียบ → เชื่อมต่อ
- **Target Users**: บริษัทรับเหมาก่อสร้าง ทีมจัดซื้อ โครงการที่ต้องการวัสดุหลายรายการ
- **Value Proposition**: ควบคุมต้นทุนการจัดซื้อ เพิ่มประสิทธิภาพ บันทึกประวัติการจัดซื้อ

**Strategic Procurement Features:**
- การสืบราคาวัสดุจากหลายแหล่ง
- การวางแผนการจัดซื้อล่วงหน้า
- การตรวจรับวัสดุก่อสร้าง
- การควบคุมสต็อกและการจัดเก็บ
- การติดตามและควบคุมการใช้วัสดุ

#### Alibaba RFQ Analysis
**Source**: https://seller.alibaba.com/rfq

**Key Features Identified:**
- **Lead Generation**: ผู้ขายสามารถค้นหา RFQ ที่ตรงกับสินค้า
- **Streamlined Process**: ทำให้การขายเป็นไปอย่างราบรื่น
- **Global Reach**: เชื่อมต่อผู้ซื้อและผู้ขายทั่วโลก
- **Quality Leads**: ผู้ซื้อที่มีความต้องการจริง

**Best Practices:**
- RFQ ควรมีรายละเอียดชัดเจน
- การตอบสนองควรรวดเร็ว
- การเสนอราคาควรแข่งขันได้

### 10.2 Industry Standards & Best Practices

#### RFQ Workflow Standards
**Based on research from leading platforms:**

1. **Request Phase**:
   - Clear project scope and specifications
   - Detailed quantity and quality requirements
   - Timeline and delivery schedule
   - Payment terms and conditions

2. **Quotation Phase**:
   - Multiple supplier participation
   - Detailed price breakdown
   - Validity period management
   - Document attachment support

3. **Evaluation Phase**:
   - Side-by-side comparison
   - Total cost of ownership analysis
   - Supplier capability assessment
   - Risk evaluation

4. **Award Phase**:
   - PO generation
   - Contract management
   - Performance tracking
   - Relationship management

#### Technology Integration Patterns
**Common patterns from successful platforms:**

- **Mobile-first design** for field operations
- **Real-time notifications** for timeline management
- **Document management** for compliance
- **Analytics dashboard** for decision making
- **API integration** for ERP connectivity

### 10.3 Key Differentiators for Allkons M

**Based on market research, our competitive advantages:**

1. **Master SKU Integration**
   - ไม่เหมือน Rakmao ที่เป็น marketplace ทั่วไป
   - เรามี Master SKU มาตรฐานเดียว
   - ข้อมูลสินค้าสม่ำเสมอและแม่นยำ

2. **Hybrid B2B/B2C Model**
   - รองรับทั้ง RFQ และ Buy Now
   - ยืดหยุ่นกว่า Rakmao ที่แยก platform
   - ตอบโจทย์ทุกประเภทการซื้อ

3. **Construction Material Focus**
   - เจาะลึกวัสดุก่อสร้าง
   - เข้าใจความต้องการของอุตสาหกรรม
   - มีคำศัพท์และมาตรฐานเฉพาะทาง

4. **Local Market Understanding**
   - เข้าใจตลาดไทยและการทำงานของผู้รับเหมา
   - รองรับการทำงานแบบไทยๆ
   - เชื่อมต่อกับระบบพันธบัตรและใบเสร็จ

---

## 11. Success Metrics & KPIs

### 11.1 User Adoption Metrics
- **RFQ Creation Rate**: จำนวน RFQ ที่สร้างต่อเดือน
- **Supplier Response Rate**: เปอร์เซ็นต์ผู้ขายที่ตอบ RFQ
- **Average Response Time**: เวลาเฉลี่ยในการตอบ RFQ
- **Conversion Rate**: อัตราการแปลง RFQ เป็น PO

### 11.2 Business Impact Metrics
- **Cost Savings**: ประหยัดจากการแข่งขันราคา
- **Process Efficiency**: ลดเวลาในการจัดซื้อ
- **Supplier Performance**: คุณภาพและความน่าเชื่อถือของผู้ขาย
- **User Satisfaction**: คะแนนความพึงพอใจของผู้ใช้

### 11.3 Platform Health Metrics
- **Active Users**: ผู้ใช้ที่ใช้งานต่อเนื่อง
- **Transaction Volume**: มูลค่าการซื้อขายต่อเดือน
- **System Performance**: ความเร็วและความเสถียรของระบบ
- **Support Tickets**: จำนวนปัญหาที่รายงาน

---

## 12. Risk Assessment & Mitigation

### 12.1 Technical Risks
- **Integration Complexity**: การเชื่อมต่อกับระบบภายนอก
  - *Mitigation*: Phased rollout, comprehensive testing
- **Performance Issues**: ปริมาณข้อมูลขนาดใหญ่
  - *Mitigation*: Scalable architecture, optimization
- **Data Synchronization**: การซิงค์ข้อมูลระหว่างระบบ
  - *Mitigation*: Real-time sync, error handling

### 12.2 Business Risks
- **User Adoption**: ผู้ใช้ไม่ยอมเปลี่ยนจากวิธีเดิม
  - *Mitigation*: User training, clear benefits
- **Supplier Participation**: ผู้ขายไม่เข้าร่วม
  - *Mitigation*: Incentive programs, easy onboarding
- **Market Competition**: คู่แข่งทำฟีเจอร์เดียวกัน
  - *Mitigation*: Continuous innovation, unique value props

### 12.3 Operational Risks
- **Process Changes**: การเปลี่ยนแปลง workflow ของลูกค้า
  - *Mitigation*: Change management, documentation
- **Quality Control**: คุณภาพข้อมูลและการให้บริการ
  - *Mitigation*: Validation rules, monitoring
- **Compliance**: การปฏิบัติตามกฎหมายและข้อบังคับ
  - *Mitigation*: Legal review, compliance checks

---

## 13. Implementation Roadmap

### 13.1 Phase 1: Core RFQ Functionality (Months 1-3)
- Basic RFQ creation and management
- Seller invitation system
- Simple quotation response
- Basic comparison tools

### 13.2 Phase 2: Advanced Features (Months 4-6)
- Negotiation workflow
- Document management
- Approval processes
- Mobile app support

### 13.3 Phase 3: Integration & Optimization (Months 7-9)
- ERP integration
- Advanced analytics
- AI-powered recommendations
- Multi-language support

---

## 14. Buyer RFQ Creation Flow Analysis

### 14.1 Flowchart Analysis

Based on the provided flowchart, here's the comprehensive analysis of the Buyer RFQ creation process:

#### Entry Points & Authentication
**Multiple Entry Points:**
- **Buyer Portal RFQ** - Direct access from buyer dashboard
- **Marketplace RFQ CTA** - Call-to-action from marketplace browsing
- **Product: Add to RFQ** - Add specific products to RFQ from product pages

**Authentication Flow:**
- **Authentication Check**: Verify user login status
- **Login Options**: OTP/SSO authentication methods
- **Organization Resolution**: Auto-resolve active ORG with header dropdown
- **First-time Users**: Auto-create Personal ORG (Individual) for new users

#### Persona-Based Creation Paths
**Quick RFQ (Field Users):**
- Minimal required fields first
- Streamlined for rapid entry
- Focus on speed and simplicity

**Structured RFQ (Procurement Teams):**
- Show project + commercial fields early
- Comprehensive data collection
- Detailed specifications and requirements

#### Step-by-Step Process Flow

**Step 1: Project + RFQ Header**
- Set Project (select/create)
- Set Due date (required before send)
- Optional: Title/Notes/Attachments

**Step 2: Add Items (Multi-Source)**
- **Manual Entry** (item_source=MANUAL)
- **Marketplace Add** (item_source=MARKETPLACE)
- **Import BOQ Excel** (item_source=BOQ_EXCEL)
- **Import BOQ Image to AI Extract** (item_source=BOQ_IMAGE_AI)
- **Verification Steps**: For imported data (Excel/AI)
- **Draft Management**: Edit/remove/bulk edit capabilities
- **Validation**: At least 1 line item required

**Step 3: Delivery + Contact + Commercial**
- **Delivery Type**: Seller delivery vs Pickup
- **Address Management**: Required for delivery, optional for pickup
- **Delivery Date**: Required field
- **Contact Information**: Name + phone required
- **Advanced Options** (Optional):
  - Payment intent (transfer/credit terms)
  - Tax requirement (invoice/VAT info)
  - Delivery split intent
  - Payment split intent

**Step 4: Recipient Selection**
- **Suggested Mode** (Default): System suggests eligible branches by distance
- **Manual Mode**: Choose from favorites + eligible suppliers
- **Search Functionality**: Find specific suppliers
- **Preselection**: Auto-select top N recipients (editable)
- **Validation**: Minimum 1 recipient required

#### RFQ Issuance & Tracking
**Dispatch Management:**
- Create dispatch per recipient
- Status tracking: SENDING → SENT/PARTIALLY_SENT
- Delivery status: DELIVERED/DELIVERY_FAILED
- Retry mechanism for failed deliveries

**Post-Send Tracking:**
- Recipient status monitoring
- Quotation waiting period
- Real-time status updates

### 14.2 Technical Implementation Details

#### State Management
```typescript
interface RFQState {
  status: 'DRAFT' | 'SENDING' | 'SENT' | 'PARTIALLY_SENT';
  autoSave: boolean;
  orgScope: string;
  currentStep: number;
  validationErrors: ValidationError[];
}

interface RFQItem {
  id: string;
  source: 'MANUAL' | 'MARKETPLACE' | 'BOQ_EXCEL' | 'BOQ_IMAGE_AI';
  data: ItemData;
  verified: boolean;
  confidence?: number; // For AI extraction
}
```

#### Validation Rules
**Required Fields:**
- Project selection
- Due date
- At least 1 line item
- Delivery address (if seller delivery)
- Delivery date
- Contact person (name + phone)
- At least 1 recipient

**Conditional Validations:**
- Address required for seller delivery
- Confidence threshold for AI extraction
- File format validation for BOQ import

#### Auto-Save Strategy
- **Trigger**: On every field change
- **Scope**: ORG-specific drafts
- **Recovery**: Restore last draft on session resume
- **Cleanup**: Remove old drafts after defined period

### 14.3 User Experience Considerations

#### Progressive Disclosure
- **Quick Path**: Minimal fields, expandable details
- **Structured Path**: All fields visible, organized by sections
- **Smart Defaults**: Pre-fill based on user history and context

#### Error Handling
- **Inline Validation**: Real-time error feedback
- **Contextual Messages**: Clear error descriptions
- **Recovery Options**: Save progress despite errors

#### Mobile Optimization
- **Touch-Friendly**: Large tap targets
- **Progressive Loading**: Load data as needed
- **Offline Support**: Draft saving without connection

### 14.4 Integration Points

#### Organization Management
- **Header Dropdown**: Always visible ORG switcher
- **Scope Isolation**: Data separated by ORG
- **Auto-Switch**: Change ORG context with draft save

#### Marketplace Integration
- **Product Sync**: Add marketplace items to RFQ
- **Inventory Check**: Real-time stock availability
- **Pricing Data**: Current price information

#### AI Services Integration
- **Image Recognition**: Extract items from BOQ images
- **Confidence Scoring**: Quality assessment of extraction
- **Manual Override**: User can edit AI results

### 14.5 Performance Optimization

#### Data Loading Strategy
- **Lazy Loading**: Load sections as needed
- **Caching**: Cache supplier data and product info
- **Pagination**: Large item lists with pagination

#### Network Optimization
- **Batch Operations**: Group API calls
- **Compression**: Compress large file uploads
- **Retry Logic**: Handle network failures gracefully

### 14.6 Security & Compliance

#### Data Protection
- **Encryption**: Sensitive data encryption
- **Access Control**: ORG-based access restrictions
- **Audit Trail**: Track all RFQ modifications

#### Compliance Requirements
- **Data Privacy**: GDPR/CCPA compliance
- **Electronic Signatures**: Legal validity
- **Record Retention**: Document storage policies

---

## 15. Implementation Guidelines

### 15.1 Development Phases

**Phase 1: Core Flow (Weeks 1-4)**
- Basic authentication and ORG resolution
- Simple RFQ creation (manual items only)
- Basic recipient selection
- Draft management

**Phase 2: Advanced Features (Weeks 5-8)**
- BOQ import (Excel)
- AI image extraction
- Advanced delivery options
- Multi-recipient management

**Phase 3: Optimization (Weeks 9-12)**
- Performance optimization
- Mobile responsiveness
- Advanced search and filtering
- Integration testing

### 15.2 Testing Strategy

**Unit Testing**
- RFQ state management
- Validation logic
- Data parsing functions

**Integration Testing**
- API endpoints
- Third-party integrations
- Cross-browser compatibility

**User Acceptance Testing**
- End-to-end flow testing
- Usability testing
- Performance testing

### 15.3 Monitoring & Analytics

**Key Metrics to Track**
- RFQ creation completion rate
- Time to create RFQ
- Drop-off points in the flow
- Error rates and types
- Feature usage patterns

**Alerting**
- Failed RFQ deliveries
- High error rates
- Performance degradation
- Integration failures
