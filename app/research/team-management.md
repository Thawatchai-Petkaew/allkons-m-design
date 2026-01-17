# Team Management (Multi-User Accounts): Allkons M

## Executive Summary
เอกสารนี้อธิบายฟีเจอร์ Team Management (Multi-User Accounts) สำหรับ Allkons M ซึ่งให้ทั้ง Seller และ Buyer สามารถเพิ่มสมาชิกทีมเพื่อช่วยบริหารจัดการร้านและคำสั่งซื้อ

---

## 1. Concept Overview

### 1.1 Team Management Concept

**Core Concept**: 
ทั้ง Seller และ Buyer สามารถเพิ่มสมาชิกทีมเข้าร่วมบัญชีเพื่อช่วยบริหารจัดการ:
- **For Sellers**: จัดการร้าน, สินค้า, ออเดอร์, รายงาน
- **For Buyers**: จัดการคำสั่งซื้อ, PO, Invoice, รายงาน

**Key Features**:
- **Role-Based Access Control**: กำหนด role และ permissions สำหรับสมาชิกทีม
- **Team Invitation**: เชิญสมาชิกทีมผ่าน email
- **Activity Log**: ติดตามการทำงานของสมาชิกทีม
- **Team Notifications**: แจ้งเตือนสมาชิกทีม

---

## 2. Use Cases

### 2.1 Seller Use Cases

#### Use Case 1: เพิ่มทีมเพื่อช่วยจัดการร้าน
- **Actor**: Store Owner (สมเกียรติ - บริษัทวัสดุก่อสร้าง)
- **Scenario**:
  1. Store Owner เข้าไปที่ Seller Dashboard
  2. Store Owner เลือก "Team Management"
  3. Store Owner เชิญสมาชิกทีม (email, role: Product Manager)
  4. สมาชิกทีมได้รับ email และยอมรับคำเชิญ
  5. สมาชิกทีมสามารถจัดการสินค้าได้ตาม role

#### Use Case 2: แบ่งหน้าที่ให้ทีม
- **Actor**: Store Owner
- **Scenario**:
  1. Store Owner เชิญสมาชิกทีมหลายคน
  2. กำหนด role ให้แต่ละคน:
     - Product Manager → จัดการสินค้า
     - Order Manager → จัดการออเดอร์
     - Viewer → ดูรายงานเท่านั้น
  3. แต่ละคนทำงานตามหน้าที่ของตัวเอง

#### Use Case 3: ติดตามการทำงานของทีม
- **Actor**: Store Owner
- **Scenario**:
  1. Store Owner เข้าไปที่ Activity Log
  2. Store Owner ดูประวัติการทำงานของสมาชิกทีม
  3. Store Owner รู้ว่าใครทำอะไร เมื่อไหร่

---

### 2.2 Buyer Use Cases

#### Use Case 1: เพิ่มทีมเพื่อช่วยจัดการคำสั่งซื้อ
- **Actor**: Account Owner (วิมล - ผู้จัดการจัดซื้อ)
- **Scenario**:
  1. Account Owner เข้าไปที่ Buyer Dashboard
  2. Account Owner เลือก "Team Management"
  3. Account Owner เชิญสมาชิกทีม (email, role: Purchaser)
  4. สมาชิกทีมได้รับ email และยอมรับคำเชิญ
  5. สมาชิกทีมสามารถสร้างออเดอร์ได้

#### Use Case 2: แบ่งหน้าที่ให้ทีมจัดซื้อ
- **Actor**: Account Owner
- **Scenario**:
  1. Account Owner เชิญสมาชิกทีมหลายคน
  2. กำหนด role ให้แต่ละคน:
     - Admin → จัดการออเดอร์และ PO
     - Purchaser → สร้างออเดอร์
     - Viewer → ดูรายงานเท่านั้น
  3. แต่ละคนทำงานตามหน้าที่ของตัวเอง

#### Use Case 3: อนุมัติออเดอร์
- **Actor**: Account Owner, Purchaser
- **Scenario**:
  1. Purchaser สร้างออเดอร์
  2. Account Owner รับการแจ้งเตือน
  3. Account Owner อนุมัติออเดอร์
  4. ออเดอร์ถูกส่งไปยังผู้ขาย

---

## 3. Team Roles & Permissions

### 3.1 For Buyers (B2B Accounts)

#### 3.1.1 Account Owner (Owner)
**Permissions**:
- ✅ สิทธิ์เต็มรูปแบบ
- ✅ จัดการทีม (เชิญ, ลบ, เปลี่ยน role)
- ✅ จัดการบัญชี (credit terms, payment methods)
- ✅ ดูรายงานทั้งหมด
- ✅ จัดการออเดอร์ทั้งหมด (สร้าง, แก้ไข, ยกเลิก, อนุมัติ)
- ✅ จัดการ PO และ Invoice
- ✅ จัดการ settings

**Use Case**: เจ้าของบัญชี, ผู้จัดการระดับสูง

---

#### 3.1.2 Admin (Administrator)
**Permissions**:
- ✅ จัดการออเดอร์ (สร้าง, ดู, แก้ไข, ยกเลิก)
- ✅ จัดการ PO และ Invoice
- ✅ ดูรายงาน
- ❌ ไม่สามารถจัดการทีม
- ❌ ไม่สามารถจัดการบัญชี (credit terms, payment methods)
- ❌ ไม่สามารถเปลี่ยน settings หลัก

**Use Case**: ผู้จัดการจัดซื้อ, ผู้ช่วยผู้จัดการ

---

#### 3.1.3 Purchaser (Buyer)
**Permissions**:
- ✅ สร้างออเดอร์
- ✅ ดูออเดอร์ที่สร้างเอง
- ✅ แก้ไขออเดอร์ที่สร้างเอง (ก่อนอนุมัติ)
- ❌ ไม่สามารถจัดการทีม
- ❌ ไม่สามารถจัดการบัญชี
- ❌ ไม่สามารถดูรายงานทั้งหมด
- ❌ ไม่สามารถจัดการ PO และ Invoice

**Use Case**: พนักงานจัดซื้อ, ช่างที่ต้องซื้อวัสดุ

---

#### 3.1.4 Viewer (Read-Only)
**Permissions**:
- ✅ ดูออเดอร์ทั้งหมด (read-only)
- ✅ ดูรายงาน (read-only)
- ❌ ไม่สามารถสร้างหรือแก้ไขออเดอร์
- ❌ ไม่สามารถจัดการทีมหรือบัญชี

**Use Case**: ผู้ตรวจสอบ, ผู้จัดการที่ต้องการดูข้อมูลเท่านั้น

---

### 3.2 For Sellers (Seller Accounts)

#### 3.2.1 Store Owner (Owner)
**Permissions**:
- ✅ สิทธิ์เต็มรูปแบบ
- ✅ จัดการทีม (เชิญ, ลบ, เปลี่ยน role)
- ✅ จัดการร้าน (settings, customization)
- ✅ จัดการสินค้าทั้งหมด (เพิ่ม, แก้ไข, ลบ)
- ✅ จัดการออเดอร์ทั้งหมด (ยืนยัน, จัดการสถานะ)
- ✅ ดูรายงานทั้งหมด

**Use Case**: เจ้าของร้าน, ผู้จัดการร้าน

---

#### 3.2.2 Store Admin (Administrator)
**Permissions**:
- ✅ จัดการสินค้า (เพิ่ม, แก้ไข, ลบ, อัปเดตราคา, สต็อก)
- ✅ จัดการออเดอร์ (ยืนยัน, จัดการสถานะ, ส่งสินค้า)
- ✅ ดูรายงาน
- ❌ ไม่สามารถจัดการทีม
- ❌ ไม่สามารถจัดการร้าน settings (customization, subdomain)

**Use Case**: ผู้จัดการร้าน, ผู้ช่วยผู้จัดการ

---

#### 3.2.3 Order Manager
**Permissions**:
- ✅ จัดการออเดอร์ (ยืนยัน, จัดการสถานะ, ส่งสินค้า)
- ✅ ดูรายงานการขาย
- ❌ ไม่สามารถจัดการสินค้า
- ❌ ไม่สามารถจัดการร้าน settings

**Use Case**: พนักงานจัดการออเดอร์, พนักงานส่งสินค้า

---

#### 3.2.4 Product Manager
**Permissions**:
- ✅ จัดการสินค้า (เพิ่ม, แก้ไข, อัปเดตราคา, สต็อก)
- ✅ ดูรายงานสินค้า
- ❌ ไม่สามารถจัดการออเดอร์
- ❌ ไม่สามารถจัดการร้าน settings

**Use Case**: พนักงานจัดการสินค้า, พนักงานอัปเดตราคา

---

#### 3.2.5 Viewer (Read-Only)
**Permissions**:
- ✅ ดูสินค้าทั้งหมด (read-only)
- ✅ ดูออเดอร์ทั้งหมด (read-only)
- ✅ ดูรายงาน (read-only)
- ❌ ไม่สามารถแก้ไขหรือจัดการอะไร

**Use Case**: ผู้ตรวจสอบ, ผู้จัดการที่ต้องการดูข้อมูลเท่านั้น

---

## 4. Team Management Features

### 4.1 Team Member Invitation

#### 4.1.1 Invitation Process
1. **Send Invitation**:
   - Account Owner/Admin เข้าไปที่ Team Management
   - กรอก email ของผู้รับคำเชิญ
   - เลือก role ที่ต้องการให้
   - ส่งคำเชิญ

2. **Receive Invitation**:
   - ผู้รับคำเชิญได้รับ email พร้อม link
   - Email ระบุ:
     - ชื่อบัญชี/ร้านที่เชิญ
     - Role ที่ได้รับ
     - Link เพื่อยอมรับคำเชิญ

3. **Accept Invitation**:
   - ผู้รับคำเชิญคลิก link ใน email
   - ถ้ายังไม่มีบัญชี → ลงทะเบียน
   - ถ้ามีบัญชีแล้ว → เข้าสู่ระบบ
   - ยอมรับคำเชิญ
   - ระบบเพิ่มสมาชิกทีมเข้าระบบ

4. **Start Working**:
   - สมาชิกทีมสามารถทำงานตาม role ที่ได้รับ
   - ระบบแสดงบัญชี/ร้านที่เข้าร่วมใน Dashboard

#### 4.1.2 Invitation Information
- **Email**: Email ของผู้รับคำเชิญ (required)
- **Role**: Role ที่ต้องการให้ (required)
- **Custom Message**: ข้อความเพิ่มเติม (optional)

#### 4.1.3 Invitation Status
- **Pending**: ส่งคำเชิญแล้ว แต่ยังไม่ได้ยอมรับ
- **Accepted**: ยอมรับคำเชิญแล้ว
- **Expired**: คำเชิญหมดอายุ (30 วัน)
- **Cancelled**: ยกเลิกคำเชิญ

---

### 4.2 Team Member Management

#### 4.2.1 View Team Members
- ดูรายชื่อสมาชิกทีมทั้งหมด
- แสดงข้อมูล:
  - ชื่อ, Email
  - Role
  - สถานะ (Active, Inactive)
  - วันที่เข้าร่วม
  - กิจกรรมล่าสุด

#### 4.2.2 Edit Role
- เปลี่ยน role ของสมาชิกทีม
- ต้องเป็น Owner/Admin เท่านั้น
- สมาชิกทีมจะได้รับ notification เมื่อ role เปลี่ยน

#### 4.2.3 Edit Permissions
- ปรับ permissions ของสมาชิกทีม (ถ้ารองรับ custom permissions)
- ต้องเป็น Owner เท่านั้น

#### 4.2.4 Remove Member
- ลบสมาชิกทีมออกจากบัญชี
- ต้องเป็น Owner เท่านั้น
- สมาชิกทีมจะได้รับ notification เมื่อถูกลบ

#### 4.2.5 Resend Invitation
- ส่งคำเชิญใหม่ (ถ้ายังไม่ได้ยอมรับ)
- ใช้ได้กับคำเชิญที่ Pending หรือ Expired

---

### 4.3 Activity Log & Audit Trail

#### 4.3.1 Tracked Activities

**For Buyers**:
- การสร้าง/แก้ไข/ลบออเดอร์
- การสร้าง/แก้ไข/ลบ PO
- การจัดการ Invoice
- การอนุมัติออเดอร์
- การเปลี่ยนแปลง settings

**For Sellers**:
- การเพิ่ม/แก้ไข/ลบสินค้า
- การอัปเดตราคา/สต็อก
- การยืนยัน/จัดการสถานะออเดอร์
- การส่งสินค้า
- การเปลี่ยนแปลงร้าน settings

**For Both**:
- การจัดการทีม (เชิญ, ลบ, เปลี่ยน role)
- การเข้าสู่ระบบ/ออกจากระบบ

#### 4.3.2 Activity Log Features
- **View Activity Log**: ดูประวัติการทำงานของสมาชิกทีม
- **Filter**: Filter ตาม:
  - สมาชิกทีม
  - วันที่
  - ประเภทกิจกรรม
  - Action (create, update, delete)
- **Search**: ค้นหากิจกรรม
- **Export**: Export activity log เป็น CSV/Excel

#### 4.3.3 Activity Log Display
- **Timestamp**: วันและเวลาที่ทำกิจกรรม
- **User**: สมาชิกทีมที่ทำกิจกรรม
- **Action**: ประเภทกิจกรรม (create, update, delete)
- **Entity**: สิ่งที่ถูกจัดการ (order, product, team member)
- **Details**: รายละเอียดเพิ่มเติม

---

### 4.4 Team Notifications

#### 4.4.1 Notification Types

**For Buyers**:
- แจ้งเตือนเมื่อมีออเดอร์ใหม่ (ถ้าเป็น Admin/Owner)
- แจ้งเตือนเมื่อออเดอร์เปลี่ยนสถานะ
- แจ้งเตือนเมื่อมี PO ใหม่
- แจ้งเตือนเมื่อมี Invoice ใหม่
- แจ้งเตือนเมื่อมีสมาชิกทีมใหม่
- แจ้งเตือนเมื่อ role หรือ permissions เปลี่ยน

**For Sellers**:
- แจ้งเตือนเมื่อมีออเดอร์ใหม่
- แจ้งเตือนเมื่อออเดอร์เปลี่ยนสถานะ
- แจ้งเตือนเมื่อสินค้าใกล้หมดสต็อก (ถ้าเป็น Product Manager)
- แจ้งเตือนเมื่อมีสมาชิกทีมใหม่
- แจ้งเตือนเมื่อ role หรือ permissions เปลี่ยน

#### 4.4.2 Notification Settings
- **Per User**: แต่ละสมาชิกสามารถตั้งค่า notifications ได้เอง
- **Team Level**: Account Owner/Admin สามารถตั้งค่า notifications สำหรับทีมได้
- **Notification Channels**:
  - In-app notifications
  - Email notifications
  - SMS notifications (optional)

---

## 5. Benefits

### 5.1 For Buyers

**1. Team Collaboration**
- ทีมสามารถช่วยกันจัดการคำสั่งซื้อ
- แบ่งหน้าที่ได้ชัดเจน
- เพิ่มประสิทธิภาพการทำงาน

**2. Accountability**
- ติดตามการทำงานของทีมได้
- รู้ว่าใครทำอะไร เมื่อไหร่
- Audit trail สำหรับการตรวจสอบ

**3. Scalability**
- เพิ่มสมาชิกทีมได้ตามต้องการ
- ไม่ต้องแชร์ password
- จัดการ permissions ได้ง่าย

---

### 5.2 For Sellers

**1. Team Collaboration**
- ทีมสามารถช่วยกันจัดการร้าน
- แบ่งหน้าที่ได้ชัดเจน (Product Manager, Order Manager)
- เพิ่มประสิทธิภาพการทำงาน

**2. Accountability**
- ติดตามการทำงานของทีมได้
- รู้ว่าใครทำอะไร เมื่อไหร่
- Audit trail สำหรับการตรวจสอบ

**3. Scalability**
- เพิ่มสมาชิกทีมได้ตามต้องการ
- ไม่ต้องแชร์ password
- จัดการ permissions ได้ง่าย

---

### 5.3 For Platform

**1. User Retention**
- ผู้ใช้มีทีมทำงานร่วมกัน
- ลดโอกาสที่จะย้ายไปใช้แพลตฟอร์มอื่น
- สร้างความผูกพันกับแพลตฟอร์ม

**2. Increased Usage**
- มีสมาชิกทีมมากขึ้น = ใช้งานมากขึ้น
- เพิ่ม engagement

**3. Competitive Advantage**
- ฟีเจอร์ที่ B2B ต้องการ
- แตกต่างจากคู่แข่ง

---

## 6. Implementation Considerations

### 6.1 Security

**1. Authentication**
- แต่ละสมาชิกทีมต้องมีบัญชีของตัวเอง
- ไม่แชร์ password
- Support 2FA (Two-Factor Authentication)

**2. Authorization**
- Role-based access control (RBAC)
- Permissions ต้องชัดเจน
- ตรวจสอบ permissions ก่อนทำ action

**3. Audit Trail**
- บันทึกทุก action
- ไม่สามารถแก้ไขหรือลบ activity log
- เก็บข้อมูลอย่างน้อย 1 ปี

---

### 6.2 User Experience

**1. Invitation Flow**
- ง่ายและชัดเจน
- Email template ที่ดี
- Clear instructions

**2. Role Management**
- UI ที่เข้าใจง่าย
- แสดง permissions ของแต่ละ role ชัดเจน
- Preview permissions ก่อนเปลี่ยน role

**3. Activity Log**
- ดูง่าย
- Filter และ search ได้ดี
- Export ได้

---

### 6.3 Technical Considerations

**1. Database Design**
- User-Organization relationship (many-to-many)
- Role and permissions tables
- Activity log table

**2. API Design**
- RESTful APIs สำหรับ team management
- Webhooks สำหรับ notifications

**3. Performance**
- Cache team members และ permissions
- Optimize activity log queries

---

## 7. Success Metrics

### 7.1 Adoption Metrics

- **Team Creation Rate**: อัตราการสร้างทีม
- **Team Member Invitation Rate**: อัตราการเชิญสมาชิกทีม
- **Average Team Size**: ขนาดทีมเฉลี่ย
- **Active Teams**: จำนวนทีมที่ใช้งาน

### 7.2 Engagement Metrics

- **Team Activity**: กิจกรรมของทีม
- **Multi-User Sessions**: Session ที่มีหลายผู้ใช้
- **Collaboration Rate**: อัตราการทำงานร่วมกัน

### 7.3 Business Metrics

- **Revenue from Team Accounts**: รายได้จากบัญชีที่มีทีม
- **Retention Rate**: อัตราการคงอยู่ของบัญชีที่มีทีม
- **Average Order Value (AOV)**: มูลค่าออเดอร์เฉลี่ยของบัญชีที่มีทีม

---

## 8. Future Enhancements

### 8.1 Phase 2 Enhancements

1. **Custom Roles**: สร้าง role เองได้
2. **Custom Permissions**: กำหนด permissions เองได้
3. **Team Chat**: แชทภายในทีม
4. **Task Assignment**: มอบหมายงานให้สมาชิกทีม

### 8.2 Phase 3 Enhancements

1. **Approval Workflows**: Workflow สำหรับอนุมัติออเดอร์
2. **Team Analytics**: Analytics สำหรับทีม
3. **Team Templates**: Template สำหรับทีม
4. **Integration**: Integrate กับ tools อื่นๆ (Slack, Teams)

---

## 9. Risks & Mitigation

### 9.1 Risks

1. **Security Risks**: การแชร์บัญชี, unauthorized access
   - **Mitigation**: Role-based access control, audit trail, 2FA

2. **Complexity**: ระบบซับซ้อน, ผู้ใช้สับสน
   - **Mitigation**: UI ที่เข้าใจง่าย, documentation, training

3. **Abuse**: การเชิญสมาชิกทีมมากเกินไป
   - **Mitigation**: จำกัดจำนวนสมาชิกทีม, approval process

### 9.2 Dependencies

- User authentication system
- Email service
- Notification system
- Activity log system

---

## 10. Conclusion

Team Management เป็นฟีเจอร์สำคัญของ Allkons M ที่:
- **เพิ่มประสิทธิภาพ**: ทีมสามารถทำงานร่วมกันได้
- **สร้างความปลอดภัย**: Role-based access control
- **สร้างความแตกต่าง**: ฟีเจอร์ที่ B2B ต้องการ

**Recommendation**: 
- ควร implement ใน Phase 1 (MVP) เพื่อสร้าง competitive advantage
- เริ่มจาก basic roles แล้วค่อยเพิ่ม custom roles ใน Phase 2

---

## Appendix

### A. Role Comparison Table

| Feature | Owner | Admin | Purchaser/Order Manager | Viewer |
|---------|-------|-------|------------------------|--------|
| Manage Team | ✅ | ❌ | ❌ | ❌ |
| Manage Account/Store | ✅ | ❌ | ❌ | ❌ |
| Create Orders/Products | ✅ | ✅ | ✅ | ❌ |
| View Reports | ✅ | ✅ | Limited | ✅ |
| Approve Orders | ✅ | ✅ | ❌ | ❌ |

### B. References
- Project Scope Document
- Personas Document
- Competitive Analysis
