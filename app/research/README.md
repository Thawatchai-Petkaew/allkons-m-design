# Product Research: Marketplace วัสดุก่อสร้าง

## ภาพรวม
เอกสารชุดนี้เป็นผลลัพธ์จากการวิจัยและวิเคราะห์สำหรับโครงการ Marketplace วัสดุก่อสร้าง โดยเน้นการเป็น Marketplace แบบ B2B-first ที่มี Master SKU เป็นจุดแข็ง

---

## เอกสารทั้งหมด

### 1. [Competitive Analysis](./competitive-analysis.md)
**วัตถุประสงค์**: วิเคราะห์คู่แข่งทั้ง B2B และ B2C marketplace

**เนื้อหาหลัก**:
- วิเคราะห์ B2B marketplaces (Alibaba, SCG Home, SCG Smart Living)
- วิเคราะห์ B2C/mixed marketplaces (Thaiwatsadu, HomePro, nocnoc, Global House, DoHome)
- Gap Analysis และ Opportunities
- Competitive Matrix
- Key Learnings และ Recommendations

**Key Findings**:
- ไม่มีใครทำ Master SKU + Marketplace ได้ดี (โอกาสของเรา)
- B2B marketplace ยังมีที่ว่าง
- UI/UX ต้องดี (nocnoc พิสูจน์แล้ว)

---

### 2. [Project Scope](./project-scope.md)
**วัตถุประสงค์**: กำหนดขอบเขตและคุณสมบัติของโครงการ

**เนื้อหาหลัก**:
- Business Model (Marketplace + Master SKU + Multi-Store)
- User Types & Permissions (Buyers และ Sellers)
- Core Features (Master SKU, Product Management, Search, Order, B2B Features, Seller Storefront, ฯลฯ)
- Technical Requirements (Multi-tenant, Subdomain management)
- Project Phases (MVP, Enhanced, Advanced)
- Success Metrics

**Key Features**:
- Master SKU Management
- **Multi-Store (Seller Storefront)**: ร้านของตัวเองด้วย Subdomain (`seller.allkons.com`)
- B2B Features (PO, Credit Terms, Invoice, Bulk Pricing)
- Marketplace Features (Multi-vendor, Price Comparison)
- Order Management
- Payment & Shipping Integration

---

### 3. [Personas](./personas.md)
**วัตถุประสงค์**: สร้าง Personas สำหรับ Buyers และ Sellers

**เนื้อหาหลัก**:
- **Buyer Personas**:
  - สันติ (B2C - Individual Consumer)
  - ประยงค์ (B2B - Registered Individual Merchant)
  - วิมล (B2B - Legal Entity)
- **Seller Personas**:
  - สมชาย (Small Seller - Registered Individual Merchant)
  - สมเกียรติ (Large Seller - Legal Entity)
- User Journey Mapping
- Pain Points และ Opportunities

**Key Insights**:
- Master SKU เป็นประโยชน์ทั้งผู้ซื้อและผู้ขาย
- B2B Features สำคัญ (PO, credit terms)
- Price Transparency จำเป็นสำหรับ B2B

---

### 4. [Stakeholder & Supply Chain Analysis](./stakeholder-supply-chain.md)
**วัตถุประสงค์**: วิเคราะห์ Stakeholders และ Supply Chain Touchpoints

**เนื้อหาหลัก**:
- **Internal Stakeholders**: Product Owner, Dev Team, Design Team, Marketing, Operations, Management
- **External Stakeholders**: Buyers, Sellers, Payment Providers, Shipping Providers, Regulatory Bodies
- **Supply Chain Touchpoints**:
  - Master SKU Data Collection & Distribution
  - Product Listing (Seller)
  - Product Discovery (Buyer)
  - Order Placement & Fulfillment
  - Shipping & Delivery
  - Payment Processing
  - Invoice & Documentation (B2B)
  - Returns & Refunds
  - Reviews & Ratings
- Pain Points by Touchpoint
- Opportunities & Solutions

**Key Insights**:
- Master SKU เป็นจุดแข็งหลัก
- Supply Chain ซับซ้อน ต้องจัดการหลาย touchpoints
- Pain Points แตกต่างกันตามประเภทผู้ใช้

---

### 5. [Multi-Store Concept](./multi-store-concept.md) ⭐ NEW
**วัตถุประสงค์**: อธิบาย Concept ของ Multi-Store (Seller Storefront) สำหรับ Allkons M

**เนื้อหาหลัก**:
- Concept Overview (Dual Presence: Storefront + Marketplace)
- Use Cases (Sellers และ Buyers)
- Benefits (For Sellers, Buyers, Platform)
- Technical Architecture (Subdomain routing, Multi-tenant)
- Implementation Considerations
- UI/UX Considerations
- Competitive Advantages
- Success Metrics
- Future Enhancements

**Key Concept**:
- ผู้ขายสามารถสร้างร้านของตัวเองด้วย Subdomain (`seller.allkons.com`)
- สินค้าจะแสดงทั้งในร้านและ Marketplace อัตโนมัติ
- จัดการสินค้าจาก Dashboard เดียว

---

### 6. [Personalization Strategy](./personalization-strategy.md) ⭐ NEW
**วัตถุประสงค์**: อธิบาย Personalization Strategy สำหรับ Allkons M

**เนื้อหาหลัก**:
- Concept Overview (Personalization ตามอาชีพ/กลุ่มธุรกิจ)
- User Segmentation (By Job Role, By Business Type)
- Personalization Features (Recommendations, Content, Homepage, Search, Promotions)
- Implementation (Data Collection, Recommendation Engine, Content Management)
- Benefits (For Buyers, Sellers, Platform)
- Success Metrics
- Future Enhancements

**Key Concept**:
- แสดงข้อมูลสินค้าที่เกี่ยวข้องกับผู้ซื้อตามอาชีพ/กลุ่มธุรกิจ
- เพิ่มโอกาสการขายโดยแสดงสินค้าที่เกี่ยวข้องที่สุด
- Personalization ตาม Job Role (ช่างประปา, ช่างไฟฟ้า, ฯลฯ) และ Business Type (ก่อสร้าง, อสังหาริมทรัพย์, ฯลฯ)

---

### 7. [Team Management (Multi-User Accounts)](./team-management.md) ⭐ NEW
**วัตถุประสงค์**: อธิบายฟีเจอร์ Team Management สำหรับ Allkons M

**เนื้อหาหลัก**:
- Concept Overview (Team Management สำหรับ Seller และ Buyer)
- Use Cases (Seller และ Buyer)
- Team Roles & Permissions (Owner, Admin, Purchaser/Manager, Viewer)
- Team Management Features (Invitation, Management, Activity Log, Notifications)
- Benefits (For Buyers, Sellers, Platform)
- Implementation Considerations
- Success Metrics
- Future Enhancements

**Key Concept**:
- ทั้ง Seller และ Buyer สามารถเพิ่มสมาชิกทีมเพื่อช่วยบริหารจัดการร้านและคำสั่งซื้อ
- Role-Based Access Control: กำหนด role และ permissions สำหรับสมาชิกทีม
- Activity Log: ติดตามการทำงานของสมาชิกทีม

---

### 8. [Product Module: Detailed Requirements](./product-module-detailed.md) ⭐ NEW
**วัตถุประสงค์**: อธิบาย Product Module โดยละเอียดตาม Miro Board

**เนื้อหาหลัก**:
- **Buyer Perspective**: Search, Merchant, Cart, Buy Product, Delivery, Export
- **Seller Perspective**: Manage Product, Add Product (On web, Import Excel)
- **Key Features**: Personalization (shopdit), Multi-Branch Support, Master SKU Integration, Price Management, Stock Management
- **Technical Requirements**: Elasticsearch, Shopdit Integration, Multi-Branch Architecture
- **User Stories**: Buyer และ Seller user stories
- **Implementation Priority**: Phase 1, 2, 3

**Key Features from Module**:
- **Search (Elastic1/2)**: Product name, Merchant name, Brand, Barcode
- **Personalization**: Custom catalog, จัดสินค้าตามความสนใจ (shopdit), Customer group promotions
- **Multi-Branch**: Head Office และ Sub-branch support
- **Import Excel**: Bulk import with Master SKU matching
- **Stock Management**: Stocked, Out of stock (can sale), Out of stock (can not sale)
- **Export**: Invoice, BOQ (Bill of Quantity)

---

### 9. [Module Summary](./module-summary.md) ⭐ NEW
**วัตถุประสงค์**: สรุป Module ทั้งหมดของ Allkons M

**เนื้อหาหลัก**:
- Product Module Summary (Buyer และ Seller Perspective)
- Module Mapping to Project Scope
- Key Technical Requirements
- Implementation Priority
- Dependencies
- Open Questions

**Key Modules**:
- Product Module (Buyer & Seller)
- Search Module (Elastic1/2)
- Personalization Module (Shopdit)
- Multi-Branch Module
- Master SKU Integration Module

---

### 10. [User Structure & Organization Management](./user-structure.md) ⭐ NEW
**วัตถุประสงค์**: อธิบายโครงสร้างผู้ใช้งานและ Organization Management

**เนื้อหาหลัก**:
- **Seller Structure**: Account (KYC) → ORD (KYB) → Shop → Branch
- **Buyer Structure**: Account (KYC) → ORD (KYB) → Team Members
- **Organization Management**: KYB, Information Management, Team Management, Financial Management
- **Two-Layer Permission System**: Organization Level และ Application Level
- **Custom Roles & Permissions**: สร้าง role และแก้ไข permissions ได้
- **Technical Architecture**: Database schema, Permission system

**Key Concepts**:
- 1 Account สามารถสร้างหลาย ORD
- 1 ORD (Seller) = 1 Shop
- 1 Shop สามารถมีหลาย Branch
- ร้านหลัก = Branch แรก (level เดียวกัน)
- Permission มี 2 layers: ORG level และ App level

---

### 11. [Module Documentation](./modules/README.md) ⭐ NEW
**วัตถุประสงค์**: Module Documentation สำหรับ Module ที่ยังขาดและ Partially Defined Modules

**Module Documentation**:
- ✅ Authentication & Authorization Module
- ✅ KYC/KYB Management Module
- ✅ Promotion & Campaign Module
- ✅ Notification Module
- ✅ Settings & Configuration Module
- ✅ Refund & Return Module
- ✅ Tax Management Module
- ✅ PDPA Management Module (Two-Layer: Account & ORG)
- ✅ Payment & Invoicing Module (Complete)
- ✅ Shipping & Delivery Module (Complete)
- ✅ Inventory Management Module (Complete)
- ✅ Pricing Management Module (Complete)
- ✅ Document Management Module (Complete)

**Key Features**:
- Common Functions & Features included
- User Stories
- Technical Requirements
- APIs
- Integration Points
- Success Metrics

---

### 13. [Demo Solution Stack](./demo-solution-stack.md) ⭐ NEW
**วัตถุประสงค์**: แนะนำ Solution Stack สำหรับการทำ Demo ที่ Public และ Free

**Key Solutions**:
- **Hosting**: Vercel (Free) - Next.js hosting
- **Database**: Supabase (Free Tier) - PostgreSQL + Auth + Storage
- **Image Storage**: Cloudinary (Free Tier) - Image CDN
- **OTP/SMS**: SMS2PRO (Free Trial) - OTP SMS for Thailand
- **CI/CD**: GitHub Actions (Free) - Automated deployment

**Features**:
- Complete setup guide
- Cost analysis
- Architecture diagram
- Troubleshooting
- Migration path to production

---

### 12. [Database Schema](./database/README.md) ⭐ NEW
**วัตถุประสงค์**: Database Schema สำหรับ Supabase (PostgreSQL)

**Status**: ✅ **Core Schema Complete**

**Files**:
- ✅ [account-org-schema.sql](./database/account-org-schema.sql) - Account & ORG schema
- ✅ [role-permission-schema.sql](./database/role-permission-schema.sql) - Role & Permission schema
- ✅ [role-permission-seed-data.sql](./database/role-permission-seed-data.sql) - Seed data & functions
- ✅ [SETUP.md](./database/SETUP.md) - Setup guide
- ✅ [README.md](./database/README.md) - Database documentation

**Key Features**:
- Account & Organization tables (10 tables)
- Role & Permission tables (5 tables)
- Master Data (juristic_types, permissions - 59+ permissions)
- Two-Layer Permission System
- Auto-creation of default roles

**Next Steps**:
- Add Product/Order tables (Phase 2)
- Add Payment/Shipping tables (Phase 2)

---

### 13. [MVP Readiness Checklist](./mvp-readiness-checklist.md) ⭐ NEW
**วัตถุประสงค์**: ตรวจสอบความพร้อมสำหรับการพัฒนา MVP

**Status**: ✅ **Ready for MVP Development (90%)**

**Key Findings**:
- ✅ Documentation: ครบถ้วน (100%)
- ✅ Database Schema (Core): ครบถ้วน (Account, ORG, Roles, Permissions)
- ✅ Technical Stack: ตัดสินใจแล้ว (Vercel, Supabase, Mock OTP, GitHub Actions)
- ⚠️ API Documentation: Partial (can create during development)
- ⚠️ Project Structure: Not defined (should define before starting code)

**Recommendation**: ✅ **Can Start MVP Development**

---

### 14. [User Types Confirmation](./user-types-confirmation.md) ⭐ NEW
**วัตถุประสงค์**: ยืนยันประเภทผู้ใช้ในแต่ละ context

**Content**:
- Buyer: 3 แบบ (บุคคลธรรมดา, บุคคลธรรมดาจดทะเบียนพาณิชย์, นิติบุคคล)
- Seller: 2 แบบ (บุคคลธรรมดาจดทะเบียนพาณิชย์, นิติบุคคล)
- Structure Comparison
- Registration Flow

---

## สรุปผลการวิจัย

### Key Insights

1. **Master SKU เป็นจุดแข็งหลัก**
   - ไม่มีใครทำ Master SKU + Marketplace ได้ดี
   - Master SKU ช่วยทั้งผู้ซื้อและผู้ขาย
   - ควรลงทุนในการสร้างและจัดการ Master SKU

2. **Multi-Store Concept (Allkons M Unique Feature)** ⭐
   - ผู้ขายสามารถสร้างร้านของตัวเองด้วย Subdomain (`seller.allkons.com`)
   - สินค้าจะแสดงทั้งในร้านและ Marketplace อัตโนมัติ
   - Dual Presence: ร้านของตัวเอง + Marketplace visibility
   - **ไม่มีใครทำได้เหมือน** - เป็น competitive advantage

3. **Personalization Strategy** ⭐
   - แสดงข้อมูลสินค้าที่เกี่ยวข้องกับผู้ซื้อตามอาชีพ/กลุ่มธุรกิจ
   - เพิ่มโอกาสการขายโดยแสดงสินค้าที่เกี่ยวข้องที่สุด
   - Personalization ตาม Job Role (ช่างประปา → สินค้าประปา) และ Business Type (ก่อสร้าง → วัสดุก่อสร้าง)

4. **Team Management (Multi-User Accounts)** ⭐
   - ทั้ง Seller และ Buyer สามารถเพิ่มสมาชิกทีมเพื่อช่วยบริหารจัดการ
   - Role-Based Access Control: กำหนด role และ permissions
   - Activity Log: ติดตามการทำงานของทีม
   - ฟีเจอร์ที่ B2B ต้องการ

5. **User Structure & Organization Management** ⭐
   - Account → ORD → Shop → Branch (Seller)
   - Account → ORD → Team Members (Buyer)
   - Two-Layer Permission System (ORG level + App level)
   - Custom Roles & Permissions
   - KYB/KYC Integration

6. **B2B-First Strategy**
   - B2B marketplace ยังมีที่ว่าง
   - B2B Features สำคัญ (PO, credit terms, invoice)
   - Price Transparency จำเป็นสำหรับ B2B

3. **UI/UX ต้องดี**
   - nocnoc พิสูจน์แล้วว่า UI/UX ที่ดีสำคัญมาก
   - B2B view อ้างอิง Alibaba (เน้นข้อมูล)
   - B2C view อ้างอิง nocnoc (เน้นความสวยงาม)

4. **Pain Points แตกต่างกัน**
   - B2C: ข้อมูลไม่ครบ, ราคาแตกต่าง
   - B2B: ราคา B2B ไม่โปร่งใส, ไม่มี PO/Invoice, ไม่มี Credit Terms
   - Sellers: จัดการข้อมูลสินค้ายาก

5. **Opportunities หลายจุด**
   - Master SKU Quality
   - B2B Features
   - Price Transparency
   - Seller Onboarding
   - Order Management

---

### Strategic Recommendations

1. **Focus on Master SKU**
   - Master SKU เป็นจุดแข็งหลัก
   - ควรลงทุนในการสร้างและจัดการ Master SKU
   - ควรทำให้ Master SKU มีคุณภาพสูง

2. **Focus on Multi-Store (Allkons M Differentiator)** ⭐
   - Multi-Store เป็นฟีเจอร์ที่แตกต่างและไม่มีใครทำได้
   - ควร implement ใน Phase 1 (MVP) เพื่อสร้าง competitive advantage
   - ควรสื่อสารจุดแข็งนี้ในการทำ marketing

3. **Focus on Personalization** ⭐
   - Personalization ตามอาชีพ/กลุ่มธุรกิจเพิ่มโอกาสการขาย
   - ควร implement ใน Phase 1 (MVP) เพื่อสร้าง competitive advantage
   - เริ่มจาก rule-based recommendations แล้วค่อยเพิ่ม ML ใน Phase 2

4. **Focus on Team Management** ⭐
   - Team Management เป็นฟีเจอร์ที่ B2B ต้องการ
   - ควร implement ใน Phase 1 (MVP) เพื่อสร้าง competitive advantage
   - เริ่มจาก basic roles แล้วค่อยเพิ่ม custom roles ใน Phase 2

5. **Focus on B2B**
   - เน้น B2B เป็นหลัก (ตาม strategy)
   - พัฒนา B2B features (PO, credit terms, invoice)
   - สร้าง B2B dashboard

6. **Simplify Seller Onboarding**
   - ทำให้ seller ใช้งาน Master SKU ได้ง่าย
   - ลดภาระการจัดการข้อมูลสินค้า
   - ให้ tools ที่จำเป็น

7. **Improve Buyer Experience**
   - ค้นหาและค้นพบสินค้าได้ง่าย
   - เปรียบเทียบราคาได้ง่าย
   - Checkout process ง่าย
   - Personalization เพื่อแสดงสินค้าที่เกี่ยวข้อง

8. **Integrate Third-party Services**
   - Payment gateway integration
   - Shipping provider integration
   - Tax calculation integration

---

### Next Steps

1. **Validate Research**: สัมภาษณ์ผู้ใช้จริงเพื่อยืนยัน findings
2. **User Stories**: สร้าง user stories จาก personas
3. **Wireframes**: สร้าง wireframes จาก user journeys
4. **Technical Design**: ออกแบบระบบจาก requirements
5. **Development**: พัฒนาตาม phases (MVP → Enhanced → Advanced)

---

## วิธีใช้งานเอกสารชุดนี้

### สำหรับ Product Owner / Business Analyst
- ใช้ **Competitive Analysis** เพื่อเข้าใจตลาดและคู่แข่ง
- ใช้ **Project Scope** เพื่อกำหนด features และ priorities
- ใช้ **Pain Points & Opportunities** เพื่อตัดสินใจ features

### สำหรับ Design Team
- ใช้ **Personas** เพื่อออกแบบ UI/UX
- ใช้ **User Journey** เพื่อออกแบบ user flow
- ใช้ **Competitive Analysis** เพื่อดู UI/UX ของคู่แข่ง

### สำหรับ Development Team
- ใช้ **Project Scope** เพื่อเข้าใจ features
- ใช้ **Stakeholder Analysis** เพื่อเข้าใจ integrations
- ใช้ **Technical Requirements** เพื่อออกแบบระบบ

### สำหรับ Marketing Team
- ใช้ **Personas** เพื่อเข้าใจ target users
- ใช้ **Competitive Analysis** เพื่อหา positioning
- ใช้ **Pain Points** เพื่อสื่อสาร value proposition

---

## หมายเหตุ

- เอกสารชุดนี้สร้างจาก **Competitive Analysis** และ **Market Research**
- **แนะนำ**: ควร validate ด้วย **User Interviews** และ **Surveys**
- เอกสารนี้จะอัปเดตตาม feedback และ findings ใหม่

---

## References

### Competitive Websites
- B2B: [Alibaba](https://www.alibaba.com/), [SCG Home](https://www.scghome.com/), [SCG Smart Living](https://www.scgsmartliving.com/th)
- B2C/Mixed: [Thaiwatsadu](https://www.thaiwatsadu.com/), [HomePro](https://www.homepro.co.th/), [nocnoc](https://nocnoc.com/), [Global House](https://globalhouse.co.th/), [DoHome](https://www.dohome.co.th/)

### Design References
- **B2B View**: Alibaba - เน้นข้อมูล ฟีเจอร์
- **B2C View**: nocnoc - เน้นความสวยงาม ใช้งานง่าย
- **Overall UI**: nocnoc - modern, clean, user-friendly

---

## Document History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | [Current Date] | Initial research documents | PO/BA Team |

---

## Contact

**Questions or Feedback?**
- Product Owner: [Contact]
- Business Analyst: [Contact]
- Project Team: [Contact]
