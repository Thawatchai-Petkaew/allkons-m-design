# Stakeholder & Supply Chain Analysis: Marketplace วัสดุก่อสร้าง

## Executive Summary
เอกสารนี้นำเสนอการวิเคราะห์ Stakeholders และ Supply Chain Touchpoints สำหรับ Marketplace วัสดุก่อสร้าง โดยครอบคลุมผู้มีส่วนได้ส่วนเสียทั้งหมดและจุดสัมผัสในกระบวนการซื้อขาย

---

## 1. Stakeholder Analysis

### 1.1 Internal Stakeholders

#### 1.1.1 Product Owner / Business Analyst
**Role**: กำหนดทิศทางผลิตภัณฑ์ วิเคราะห์ความต้องการ กำหนดขอบเขต

**Involvement**:
- กำหนด Product Roadmap
- กำหนด Features และ Priorities
- วิเคราะห์ User Requirements
- ตัดสินใจทางธุรกิจ

**Pain Points**:
- ต้องเข้าใจความต้องการของผู้ใช้ (ทั้ง Buyer และ Seller)
- ต้องตัดสินใจว่า Features ไหนสำคัญ
- ต้องบาลานซ์ระหว่าง B2B และ B2C
- ต้องเข้าใจ Supply Chain

**Success Metrics**:
- Product adoption rate
- User satisfaction
- Business metrics (GMV, revenue)

**Touchpoints**:
- User interviews
- Stakeholder meetings
- Feature planning
- Product reviews

---

#### 1.1.2 Development Team
**Role**: พัฒนาและดูแลระบบ

**Involvement**:
- พัฒนา Web Application
- พัฒนา APIs
- Database design
- System maintenance

**Pain Points**:
- ต้องพัฒนาระบบที่รองรับทั้ง B2B และ B2C
- ต้องจัดการ Master SKU system
- ต้องรองรับ traffic ที่สูง
- ต้อง integrate กับ third-party services

**Success Metrics**:
- System uptime
- Performance metrics
- Bug-free releases

**Touchpoints**:
- Code development
- Testing
- Deployment
- Bug fixes

---

#### 1.1.3 Design Team
**Role**: ออกแบบ UI/UX

**Involvement**:
- ออกแบบ User Interface
- ออกแบบ User Experience
- สร้าง Design System
- Prototyping

**Pain Points**:
- ต้องออกแบบให้รองรับทั้ง B2B และ B2C views
- ต้องออกแบบให้ใช้งานง่าย แต่มีฟีเจอร์ครบ
- ต้องบาลานซ์ระหว่างความสวยงามและฟังก์ชันการใช้งาน

**Success Metrics**:
- User satisfaction (UX)
- Conversion rate
- User engagement

**Touchpoints**:
- User research
- Design reviews
- Usability testing
- Design handoff

---

#### 1.1.4 Marketing Team
**Role**: ทำการตลาดและดึงดูดผู้ใช้

**Involvement**:
- Digital marketing
- Content marketing
- Branding
- User acquisition

**Pain Points**:
- ต้องดึงดูดทั้ง Buyer และ Seller
- ต้องแข่งขันกับคู่แข่งที่มีชื่อเสียง
- ต้องสื่อสารจุดแข็ง (Master SKU)

**Success Metrics**:
- User registration rate
- User acquisition cost
- Brand awareness

**Touchpoints**:
- Marketing campaigns
- Social media
- Content creation
- User onboarding

---

#### 1.1.5 Operations Team
**Role**: จัดการ Master SKU และดูแลระบบ

**Involvement**:
- สร้างและจัดการ Master SKU
- ควบคุมคุณภาพข้อมูลสินค้า
- จัดการหมวดหมู่สินค้า
- Customer support

**Pain Points**:
- ต้องจัดการ Master SKU จำนวนมาก
- ต้องควบคุมคุณภาพข้อมูล
- ต้องอัปเดตข้อมูลสินค้าเป็นประจำ
- ต้องรับมือกับคำถามจากผู้ใช้

**Success Metrics**:
- Master SKU quality
- Data accuracy
- Customer satisfaction (support)

**Touchpoints**:
- Master SKU management
- Data updates
- Customer support tickets
- Quality control

---

#### 1.1.6 Management
**Role**: กำหนดกลยุทธ์และอนุมัติงบประมาณ

**Involvement**:
- กำหนดกลยุทธ์ธุรกิจ
- อนุมัติงบประมาณ
- ตัดสินใจระดับสูง
- Stakeholder reporting

**Pain Points**:
- ต้องตัดสินใจเรื่องงบประมาณ
- ต้องแข่งขันกับคู่แข่ง
- ต้องสร้าง ROI
- ต้องขยายธุรกิจ

**Success Metrics**:
- Revenue
- Profit margin
- Market share
- Business growth

**Touchpoints**:
- Executive meetings
- Business reviews
- Budget approvals
- Strategic planning

---

### 1.2 External Stakeholders

#### 1.2.1 Buyers

**Individual Consumers (B2C)**
- **Involvement**: ซื้อวัสดุก่อสร้าง
- **Pain Points**: หาราคาดี, ข้อมูลสินค้าครบ
- **Success Metrics**: การซื้อซ้ำ, ความพึงพอใจ
- **Touchpoints**: Web, Mobile, Order, Support

**Registered Individual Merchants (B2B)**
- **Involvement**: ซื้อวัสดุก่อสร้างจำนวนมาก
- **Pain Points**: ราคา B2B, PO, credit terms
- **Success Metrics**: Order value, frequency
- **Touchpoints**: Web, Mobile, PO, Invoice, Credit

**Legal Entities (B2B)**
- **Involvement**: จัดซื้อวัสดุก่อสร้างสำหรับบริษัท
- **Pain Points**: PO, Invoice, Credit terms, Reports
- **Success Metrics**: Order value, GMV
- **Touchpoints**: Web, PO, Invoice, Reports, Multi-user

---

#### 1.2.2 Sellers

**Registered Individual Merchants (Sellers)**
- **Involvement**: ขายวัสดุก่อสร้าง
- **Pain Points**: จัดการข้อมูลสินค้า, หาลูกค้า
- **Success Metrics**: ยอดขาย, จำนวนออเดอร์
- **Touchpoints**: Seller Dashboard, Product Management, Orders

**Legal Entities (Sellers)**
- **Involvement**: ขายวัสดุก่อสร้างจำนวนมาก
- **Pain Points**: จัดการสินค้าหลายพันรายการ, Bulk operations
- **Success Metrics**: ยอดขาย, GMV
- **Touchpoints**: Seller Dashboard, Bulk Operations, Reports

---

#### 1.2.3 Payment Providers

**Examples**: PromptPay, TrueMoney, Credit Card Companies

**Involvement**:
- จัดการการชำระเงิน
- จัดการ transaction fees
- Security compliance (PCI DSS)

**Pain Points**:
- ต้อง comply กับ regulations
- ต้องจัดการ chargeback
- ต้องรองรับหลาย payment methods

**Success Metrics**:
- Transaction success rate
- Transaction volume
- Fee revenue

**Touchpoints**:
- Payment gateway integration
- Transaction processing
- Refund processing

---

#### 1.2.4 Shipping Providers

**Examples**: Kerry Express, Flash Express, J&T Express

**Involvement**:
- จัดส่งสินค้า
- Track shipping status
- จัดการ returns

**Pain Points**:
- ต้องจัดการ shipping rates
- ต้อง track shipping status
- ต้องจัดการ delivery issues

**Success Metrics**:
- Delivery success rate
- Delivery time
- Shipping volume

**Touchpoints**:
- Shipping API integration
- Label generation
- Tracking updates

---

#### 1.2.5 Regulatory Bodies

**Examples**: กรมการค้าภายใน, กรมสรรพากร

**Involvement**:
- Tax regulations
- Business registration
- PDPA compliance

**Pain Points**:
- ต้อง comply กับ regulations
- ต้องจ่ายภาษี
- ต้องจัดการเอกสาร

**Success Metrics**:
- Compliance rate
- Tax accuracy

**Touchpoints**:
- Tax calculation
- Invoice generation
- Reporting

---

#### 1.2.6 Manufacturers / Suppliers (Future)

**Involvement**:
- จัดหา Master SKU data
- Supply products to sellers
- Product specifications

**Pain Points**:
- ต้องให้ข้อมูลสินค้าที่ถูกต้อง
- ต้อง manage inventory

**Success Metrics**:
- Data quality
- Supply chain efficiency

**Touchpoints**:
- Master SKU data collection
- Product specifications
- Inventory management

---

## 2. Supply Chain Analysis

### 2.1 Supply Chain Overview

```
Manufacturer → Wholesaler → Seller → Marketplace → Buyer
                ↓              ↓
         Master SKU Data    Product Listing
                ↓              ↓
         Data Collection   Price/Stock Update
```

---

### 2.2 Supply Chain Touchpoints

#### 2.2.1 Master SKU Data Collection

**Source**: 
- Manufacturers
- Wholesalers
- Industry standards
- Manual data entry

**Data Points**:
- Product name
- Product images
- Technical specifications
- Category
- Brand
- Standards/certifications

**Process**:
1. Collect product data
2. Validate data quality
3. Create Master SKU
4. Update Master SKU

**Touchpoints**:
- **Operations Team**: สร้างและจัดการ Master SKU
- **Manufacturers/Suppliers**: ให้ข้อมูลสินค้า
- **Data Sources**: Industry databases, websites

**Pain Points**:
- ข้อมูลไม่ครบถ้วน
- ข้อมูลไม่ถูกต้อง
- ต้องอัปเดตข้อมูลบ่อย
- ไม่มีข้อมูลจากบาง manufacturers

**Opportunities**:
- Automate data collection
- Partner with manufacturers
- Use AI for data extraction
- Crowdsource data (with validation)

---

#### 2.2.2 Master SKU Distribution

**Process**:
1. Seller requests Master SKU
2. System distributes Master SKU
3. Seller customizes (price, description)
4. Seller publishes listing

**Touchpoints**:
- **Platform**: Master SKU system
- **Sellers**: ดึง Master SKU ไปใช้
- **Operations Team**: ควบคุมคุณภาพข้อมูล

**Pain Points**:
- ผู้ขายไม่รู้ว่าจะห Master SKU ยังไง
- ระบบ sync ข้อมูลทำได้ยาก
- ผู้ขายไม่ sync เมื่อ Master SKU อัปเดต

**Opportunities**:
- Auto-sync Master SKU updates
- Notify sellers when Master SKU updates
- Easy Master SKU search and selection

---

#### 2.2.3 Product Listing (Seller)

**Process**:
1. Seller selects Master SKU
2. Seller sets price
3. Seller sets stock
4. Seller customizes description (optional)
5. Seller publishes listing

**Touchpoints**:
- **Sellers**: จัดการสินค้า
- **Platform**: Seller Dashboard
- **Master SKU System**: ดึงข้อมูลหลัก

**Pain Points**:
- ผู้ขายไม่รู้ว่าควรตั้งราคาเท่าไหร่
- การจัดการสต็อกทำได้ยาก
- ต้องอัปเดตราคาบ่อยครั้ง

**Opportunities**:
- Price suggestions (market-based)
- Stock management tools
- Bulk price updates
- Price tracking and alerts

---

#### 2.2.4 Product Discovery (Buyer)

**Process**:
1. Buyer searches/browses products
2. System shows products from multiple sellers
3. Buyer compares prices
4. Buyer views product details
5. Buyer adds to cart

**Touchpoints**:
- **Buyers**: ค้นหาและค้นพบสินค้า
- **Platform**: Search & Discovery system
- **Master SKU**: แสดงข้อมูลสินค้าหลัก

**Pain Points**:
- หาสินค้ายาก (search ไม่ดี)
- เปรียบเทียบราคายาก
- ข้อมูลสินค้าไม่ครบ

**Opportunities**:
- Advanced search and filtering
- Price comparison tools
- Rich product information (Master SKU)

---

#### 2.2.5 Order Placement

**Process**:
1. Buyer adds products to cart
2. Buyer selects shipping address
3. Buyer selects payment method
4. Buyer reviews order
5. Buyer confirms order
6. System creates order
7. System notifies seller

**Touchpoints**:
- **Buyers**: สร้างออเดอร์
- **Platform**: Checkout system
- **Sellers**: รับแจ้งเตือนออเดอร์
- **Payment Provider**: จัดการการชำระเงิน

**Pain Points**:
- Checkout process ซับซ้อน
- ไม่รู้ค่าจัดส่ง
- Payment methods ไม่ครบ

**Opportunities**:
- Simplified checkout
- Real-time shipping calculation
- Multiple payment methods
- Save payment methods (B2B)

---

#### 2.2.6 Order Fulfillment (Seller)

**Process**:
1. Seller receives order notification
2. Seller confirms order
3. Seller prepares products
4. Seller generates shipping label
5. Seller ships products
6. Seller updates order status

**Touchpoints**:
- **Sellers**: จัดการออเดอร์
- **Platform**: Order management system
- **Shipping Provider**: Generate labels, track shipping

**Pain Points**:
- จัดการออเดอร์หลายรายการทำได้ยาก
- สร้าง shipping label ต้องไปหลายระบบ
- ติดตามสถานะออเดอร์ทำได้ยาก

**Opportunities**:
- Centralized order management
- Integrated shipping label generation
- Order status tracking
- Bulk order processing

---

#### 2.2.7 Shipping & Delivery

**Process**:
1. Seller ships products
2. Shipping provider picks up
3. Shipping provider transports
4. Shipping provider delivers
5. Buyer receives products
6. System updates tracking status

**Touchpoints**:
- **Sellers**: ส่งสินค้า
- **Shipping Providers**: จัดส่งสินค้า
- **Buyers**: รับสินค้า
- **Platform**: Track shipping status

**Pain Points**:
- Shipping rates แตกต่างกัน
- Track shipping ทำได้ยาก
- Delivery issues (lost, damaged)

**Opportunities**:
- Integrated shipping API
- Real-time tracking
- Multiple shipping options
- Shipping insurance

---

#### 2.2.8 Payment Processing

**Process**:
1. Buyer pays for order
2. Payment provider processes payment
3. Payment provider notifies platform
4. Platform updates order status
5. (B2B) Payment via credit terms later

**Touchpoints**:
- **Buyers**: ชำระเงิน
- **Payment Providers**: ประมวลผลการชำระเงิน
- **Platform**: Update order status
- **Sellers**: รับเงิน

**Pain Points**:
- Payment methods ไม่ครบ
- Payment processing ช้า
- Chargeback issues
- B2B payment terms ไม่ยืดหยุ่น

**Opportunities**:
- Multiple payment methods
- Fast payment processing
- Credit terms for B2B
- Automated invoice generation

---

#### 2.2.9 Invoice & Documentation (B2B)

**Process**:
1. Order is fulfilled
2. System generates invoice
3. Seller sends invoice to buyer
4. Buyer processes invoice
5. Buyer pays (according to credit terms)

**Touchpoints**:
- **Sellers**: สร้างและส่ง invoice
- **Buyers**: รับและจัดการ invoice
- **Platform**: Generate invoices
- **Regulatory Bodies**: Tax compliance

**Pain Points**:
- สร้าง invoice ทำได้ยาก
- Invoice ไม่ถูกต้อง
- จัดการ invoice ไม่เป็นระบบ

**Opportunities**:
- Automated invoice generation
- Invoice management system
- Tax compliance
- Digital invoices

---

#### 2.2.10 Returns & Refunds

**Process**:
1. Buyer requests return/refund
2. Seller approves/rejects
3. Buyer ships products back
4. Seller receives products
5. Seller processes refund
6. Payment provider processes refund

**Touchpoints**:
- **Buyers**: ขอ return/refund
- **Sellers**: จัดการ return/refund
- **Platform**: Return management system
- **Payment Provider**: Process refund
- **Shipping Provider**: Return shipping

**Pain Points**:
- กระบวนการ return ซับซ้อน
- Refund ช้า
- Return shipping costs

**Opportunities**:
- Simplified return process
- Fast refund processing
- Return shipping labels
- Return policy clarity

---

#### 2.2.11 Reviews & Ratings

**Process**:
1. Buyer receives products
2. Buyer uses products
3. Buyer writes review/rating
4. System publishes review
5. Seller responds (optional)

**Touchpoints**:
- **Buyers**: เขียนรีวิว/ให้คะแนน
- **Sellers**: ดูรีวิว/ตอบรีวิว
- **Platform**: Review system

**Pain Points**:
- Reviews ไม่ถูกต้อง
- Fake reviews
- Negative reviews กระทบ seller

**Opportunities**:
- Verified purchase reviews
- Review moderation
- Seller response system
- Review analytics

---

## 3. Pain Points by Touchpoint

### 3.1 Master SKU Touchpoints

**Pain Points**:
- ข้อมูล Master SKU ไม่ครบถ้วน
- ข้อมูล Master SKU ไม่ถูกต้อง
- ต้องอัปเดตข้อมูลบ่อย
- ไม่มีข้อมูลจากบาง manufacturers

**Opportunities**:
- Automate data collection
- Partner with manufacturers
- Quality control process
- Regular data updates

---

### 3.2 Seller Touchpoints

**Pain Points**:
- จัดการข้อมูลสินค้าทำได้ยาก
- ไม่รู้ว่าควรตั้งราคาเท่าไหร่
- จัดการออเดอร์ทำได้ยาก
- ไม่มีรายงานการขาย

**Opportunities**:
- Master SKU (ลดภาระจัดการข้อมูล)
- Price suggestions
- Order management tools
- Analytics dashboard

---

### 3.3 Buyer Touchpoints

**Pain Points**:
- หาสินค้ายาก
- เปรียบเทียบราคายาก
- ข้อมูลสินค้าไม่ครบ
- Checkout process ซับซ้อน

**Opportunities**:
- Advanced search and filtering
- Price comparison tools
- Rich product information (Master SKU)
- Simplified checkout

---

### 3.4 Order Touchpoints

**Pain Points**:
- จัดการออเดอร์ทำได้ยาก
- ติดตามสถานะออเดอร์ทำได้ยาก
- Shipping rates แตกต่างกัน

**Opportunities**:
- Centralized order management
- Real-time tracking
- Integrated shipping API
- Multiple shipping options

---

### 3.5 Payment Touchpoints

**Pain Points**:
- Payment methods ไม่ครบ
- Payment processing ช้า
- B2B payment terms ไม่ยืดหยุ่น

**Opportunities**:
- Multiple payment methods
- Fast payment processing
- Credit terms for B2B
- Automated invoice generation

---

## 4. Opportunities & Solutions

### 4.1 Master SKU Opportunities

1. **Automate Data Collection**: ใช้ AI และ automation เพื่อรวบรวมข้อมูลสินค้า
2. **Partner with Manufacturers**: หาพาร์ทเนอร์เพื่อให้ข้อมูลสินค้า
3. **Quality Control**: มีกระบวนการควบคุมคุณภาพข้อมูล
4. **Regular Updates**: อัปเดตข้อมูลเป็นประจำ

---

### 4.2 Seller Opportunities

1. **Master SKU**: ลดภาระการจัดการข้อมูลสินค้า
2. **Price Suggestions**: แนะนำราคาตามตลาด
3. **Order Management**: ระบบจัดการออเดอร์ที่ใช้งานง่าย
4. **Analytics**: Dashboard และรายงานการขาย

---

### 4.3 Buyer Opportunities

1. **Search & Discovery**: ค้นหาและค้นพบสินค้าได้ง่าย
2. **Price Comparison**: เปรียบเทียบราคาจากหลายผู้ขาย
3. **Rich Information**: ข้อมูลสินค้าครบถ้วน (Master SKU)
4. **Simplified Checkout**: Checkout process ที่ง่าย

---

### 4.4 Order & Fulfillment Opportunities

1. **Order Management**: ระบบจัดการออเดอร์ที่ครบถ้วน
2. **Real-time Tracking**: ติดตามสถานะออเดอร์แบบ real-time
3. **Shipping Integration**: Integrate กับ shipping providers
4. **Multiple Options**: มี shipping options หลายแบบ

---

### 4.5 Payment Opportunities

1. **Multiple Methods**: รองรับหลาย payment methods
2. **Fast Processing**: ประมวลผลการชำระเงินเร็ว
3. **B2B Credit Terms**: รองรับ credit terms สำหรับ B2B
4. **Automated Invoices**: สร้าง invoice อัตโนมัติ

---

## 5. Key Insights

1. **Master SKU เป็นจุดแข็ง**: ลดภาระทั้งผู้ซื้อและผู้ขาย
2. **Supply Chain ซับซ้อน**: ต้องจัดการหลาย touchpoints
3. **Pain Points แตกต่างกัน**: ตามประเภทผู้ใช้ (Buyer/Seller, B2B/B2C)
4. **Opportunities หลายจุด**: มีที่ว่างในการปรับปรุง
5. **Integration สำคัญ**: ต้อง integrate กับ third-party services

---

## 6. Recommendations

### 6.1 Prioritize Master SKU
- Master SKU เป็นจุดแข็งหลัก
- ควรลงทุนในการสร้างและจัดการ Master SKU
- ควรทำให้ Master SKU มีคุณภาพสูง

### 6.2 Focus on B2B
- เน้น B2B เป็นหลัก (ตาม strategy)
- พัฒนา B2B features (PO, credit terms, invoice)
- สร้าง B2B dashboard

### 6.3 Simplify Seller Onboarding
- ทำให้ seller ใช้งาน Master SKU ได้ง่าย
- ลดภาระการจัดการข้อมูลสินค้า
- ให้ tools ที่จำเป็น

### 6.4 Improve Buyer Experience
- ค้นหาและค้นพบสินค้าได้ง่าย
- เปรียบเทียบราคาได้ง่าย
- Checkout process ง่าย

### 6.5 Integrate Third-party Services
- Payment gateway integration
- Shipping provider integration
- Tax calculation integration

---

## 7. Next Steps

1. **Validate Touchpoints**: สัมภาษณ์ผู้ใช้เพื่อยืนยัน touchpoints
2. **Prioritize Pain Points**: ระบุ pain points ที่สำคัญที่สุด
3. **Design Solutions**: ออกแบบโซลูชันสำหรับ pain points
4. **Implement**: พัฒนาและ implement solutions
5. **Measure**: วัดผลและปรับปรุง

---

## Appendix

### A. Touchpoint Mapping

| Touchpoint | Stakeholders | Pain Points | Opportunities |
|-----------|--------------|-------------|---------------|
| Master SKU Data Collection | Operations, Manufacturers | Data quality, Updates | Automation, Partnerships |
| Master SKU Distribution | Sellers, Platform | Sync issues | Auto-sync, Notifications |
| Product Listing | Sellers | Price setting, Stock management | Price suggestions, Tools |
| Product Discovery | Buyers | Search, Comparison | Advanced search, Comparison tools |
| Order Placement | Buyers, Payment | Checkout complexity | Simplified checkout |
| Order Fulfillment | Sellers | Order management | Centralized system |
| Shipping | Sellers, Shipping providers | Rates, Tracking | Integration, Real-time tracking |
| Payment | Buyers, Payment providers | Methods, Processing | Multiple methods, Fast processing |
| Invoice | Sellers, Buyers | Generation, Management | Automation, Management system |
| Returns | Buyers, Sellers | Process complexity | Simplified process |

### B. References
- Competitive Analysis Document
- Project Scope Document
- Personas Document
