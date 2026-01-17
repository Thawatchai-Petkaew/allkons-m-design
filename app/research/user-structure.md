# User Structure & Organization Management: Allkons M

## Executive Summary
เอกสารนี้อธิบายโครงสร้างผู้ใช้งาน (User Structure) และการจัดการองค์กร (Organization Management) สำหรับ Allkons M

---

## 1. Seller Structure

### 1.1 Hierarchy

```
Account (KYC)
  └── ORD (KYB / Organization Verified)
        └── Shop (1 ร้านต่อ 1 ORD)
              └── Branch (หลายสาขา)
                    └── Branch (ร้านหลัก = สาขาแรก)
```

### 1.2 Components

#### 1.2.1 Account (KYC)
**Definition**: ผู้ใช้ Seller ที่ผ่านการยืนยันตัวตน (KYC - Know Your Customer)

**Characteristics**:
- ต้องผ่าน KYC
- สามารถสร้างองค์กรได้มากกว่า 1 องค์กร
- 1 Account สามารถเป็น Owner ของหลาย ORD

**Example**:
- สมชาย (Account) → สามารถสร้าง ORD1, ORD2, ORD3

---

#### 1.2.2 ORD (KYB / Organization Verified)
**Definition**: องค์กรที่ผ่านการยืนยัน (KYB - Know Your Business)

**Characteristics**:
- ต้องผ่าน KYB
- ถือว่าร้านทั้งหมดสามารถขายของได้ (เมื่อ ORD ผ่าน KYB)
- สามารถมีร้านได้แค่ 1 ร้าน (1 ORD = 1 Shop)
- 1 Account สามารถสร้างหลาย ORD

**Example**:
- ORD1: บริษัทวัสดุก่อสร้าง จำกัด
- ORD2: บริษัทรับเหมาก่อสร้าง จำกัด

---

#### 1.2.3 Shop
**Definition**: ร้านของผู้ขาย

**Characteristics**:
- 1 ORD = 1 Shop
- Shop มี Subdomain (เช่น `company.allkons.com`)
- Shop สามารถสร้างสาขาได้มากกว่า 1 สาขา
- ร้านหลัก (Main Shop) = สาขาแรก (Branch)

**Example**:
- ORD1 → Shop1 (`company1.allkons.com`)
- ORD2 → Shop2 (`company2.allkons.com`)

---

#### 1.2.4 Branch
**Definition**: สาขาของร้าน

**Characteristics**:
- 1 Shop สามารถมีหลาย Branch
- ร้านหลักนับเป็น 1 สาขา (level เดียวกัน)
- Branch สามารถตั้งราคา, สต็อก, shelf แยกกันได้

**Example**:
- Shop1:
  - Branch1: สำนักงานใหญ่ (Main Shop)
  - Branch2: สาขา 1
  - Branch3: สาขา 2

---

### 1.3 Structure Example

**Scenario**: สมชาย (Account) มี 2 องค์กร

```
สมชาย (Account - KYC)
  │
  ├── ORD1: บริษัทวัสดุก่อสร้าง จำกัด (KYB)
  │     └── Shop1: ร้านวัสดุก่อสร้าง (`material.allkons.com`)
  │           ├── Branch1: สำนักงานใหญ่
  │           ├── Branch2: สาขา 1
  │           └── Branch3: สาขา 2
  │
  └── ORD2: บริษัทรับเหมาก่อสร้าง จำกัด (KYB)
        └── Shop2: ร้านรับเหมาก่อสร้าง (`contractor.allkons.com`)
              ├── Branch1: สำนักงานใหญ่
              └── Branch2: สาขา 1
```

---

## 2. Buyer Structure

### 2.1 Hierarchy

```
Account (KYC)
  └── ORD (KYB / Organization Verified)
        └── (ไม่มี Shop)
              └── Team Members
```

### 2.2 Components

#### 2.2.1 Account (KYC)
**Definition**: ผู้ใช้ Buyer ที่ผ่านการยืนยันตัวตน (KYC)

**Characteristics**:
- ต้องผ่าน KYC
- สามารถสร้างองค์กรได้มากกว่า 1 องค์กร
- 1 Account สามารถเป็น Owner ของหลาย ORD

**Example**:
- วิมล (Account) → สามารถสร้าง ORD1, ORD2

---

#### 2.2.2 ORD (KYB / Organization Verified)
**Definition**: องค์กรที่ผ่านการยืนยัน (KYB)

**Characteristics**:
- ต้องผ่าน KYB
- ไม่มี Shop (ต่างจาก Seller)
- สามารถเพิ่มสมาชิกทีมเพื่อช่วยจัดการคำสั่งซื้อได้

**Example**:
- ORD1: บริษัทก่อสร้าง จำกัด
- ORD2: บริษัทพัฒนาอสังหาริมทรัพย์ จำกัด

---

#### 2.2.3 Team Members
**Definition**: สมาชิกทีมที่ช่วยจัดการคำสั่งซื้อ

**Characteristics**:
- เพิ่มสมาชิกทีมเข้า ORD
- แต่ละคนมี role และ permissions
- ช่วยกันจัดการคำสั่งซื้อ, PO, Invoice

---

### 2.3 Structure Example

**Scenario**: วิมล (Account) มี 2 องค์กร

```
วิมล (Account - KYC)
  │
  ├── ORD1: บริษัทก่อสร้าง จำกัด (KYB)
  │     ├── Team Member 1: Admin
  │     ├── Team Member 2: Purchaser
  │     └── Team Member 3: Viewer
  │
  └── ORD2: บริษัทพัฒนาอสังหาริมทรัพย์ จำกัด (KYB)
        ├── Team Member 1: Admin
        └── Team Member 2: Purchaser
```

---

## 3. Organization Management

### 3.1 KYB (Know Your Business)

#### 3.1.1 KYB Process
1. Account สร้าง ORD
2. กรอกข้อมูลองค์กร
3. อัปโหลดเอกสาร (หนังสือรับรองบริษัท, เอกสารอื่นๆ)
4. รอการอนุมัติจาก Allkons Admin
5. เมื่อผ่าน KYB → ORD Verified → สามารถใช้งานได้

#### 3.1.2 KYB Documents
- หนังสือรับรองบริษัท
- เอกสารอื่นๆ ตามที่ Allkons Admin กำหนด

#### 3.1.3 KYB Status
- **Pending**: รอการอนุมัติ
- **Approved**: อนุมัติแล้ว (ORD Verified)
- **Rejected**: ไม่อนุมัติ
- **Suspended**: ถูกระงับ

---

### 3.2 Organization Information Management

#### 3.2.1 Organization Profile
- ชื่อองค์กร
- ที่อยู่
- เบอร์โทรศัพท์
- อีเมล
- ข้อมูลอื่นๆ

#### 3.2.2 Edit Organization Information
- แก้ไขข้อมูลองค์กร
- อัปเดตเอกสาร (ถ้าจำเป็น)
- ต้องผ่านการอนุมัติจาก Allkons Admin (ถ้าเปลี่ยนข้อมูลสำคัญ)

---

### 3.3 Team Member Management

#### 3.3.1 Add Team Members to Organization
- เชิญสมาชิกทีมเข้า ORD
- กำหนด role และ permissions
- สมาชิกทีมสามารถทำงานใน ORD ได้

#### 3.3.2 Assign Team Members to Shop (Seller Only)
- สำหรับ Seller: สามารถเอา team member เข้าไปที่ Shop ได้
- Team member สามารถทำงานใน Shop นั้นได้
- 1 team member สามารถอยู่ในหลาย Shop ได้ (ถ้าเป็น ORD เดียวกัน)

**Example**:
```
ORD1 (Seller)
  └── Shop1
        ├── Team Member A (Product Manager)
        ├── Team Member B (Order Manager)
        └── Team Member C (Viewer)
```

---

### 3.4 Financial Management

#### 3.4.1 Bank Account Management
- เพิ่มบัญชีรับเงิน
- แก้ไขบัญชีรับเงิน
- ลบบัญชีรับเงิน
- ตั้งบัญชีหลัก (Primary account)

#### 3.4.2 Payment Settings
- วิธีการรับเงิน
- Payment terms
- Credit terms (สำหรับ Buyer)

#### 3.4.3 Financial Reports
- รายงานการเงิน
- Transaction history
- Invoice management

---

### 3.5 Role & Permission Management

#### 3.5.1 Two-Layer Permission System

**Layer 1: Organization Level (ORG)**
- Role และ permissions สำหรับจัดการใน ORD
- ตัวอย่าง roles:
  - **ORG Owner**: สิทธิ์เต็มรูปแบบใน ORD
  - **ORG Admin**: จัดการ ORD (แต่ไม่สามารถลบ ORD)
  - **ORG Member**: สมาชิกทั่วไป

**Layer 2: Application Level (App)**
- Role และ permissions สำหรับใช้งานใน app (Buyer/Seller)
- ตัวอย่าง roles:
  - **For Buyer**: Purchaser, Admin, Viewer
  - **For Seller**: Product Manager, Order Manager, Viewer

#### 3.5.2 Custom Roles
- **Create Custom Role**: สร้าง role เองได้
- **Edit Permissions**: แก้ไข permissions ของ role ได้
- **Assign Role**: กำหนด role ให้สมาชิกทีม

#### 3.5.3 Permission Granularity
- **Organization Permissions**:
  - จัดการข้อมูลองค์กร
  - จัดการสมาชิกทีม
  - จัดการการเงิน
  - จัดการ role และ permissions
- **Application Permissions**:
  - Buyer: สร้างออเดอร์, จัดการ PO, ดูรายงาน
  - Seller: จัดการสินค้า, จัดการออเดอร์, จัดการร้าน

---

## 4. Permission Matrix

### 4.1 Organization Level Permissions

| Permission | ORG Owner | ORG Admin | ORG Member |
|-----------|-----------|-----------|------------|
| View Organization Info | ✅ | ✅ | ✅ |
| Edit Organization Info | ✅ | ✅ | ❌ |
| Manage KYB Documents | ✅ | ❌ | ❌ |
| Add Team Members | ✅ | ✅ | ❌ |
| Remove Team Members | ✅ | ✅ | ❌ |
| Manage Roles | ✅ | ✅ | ❌ |
| Manage Financial | ✅ | ✅ | ❌ |
| Delete Organization | ✅ | ❌ | ❌ |

---

### 4.2 Application Level Permissions (Buyer)

| Permission | Purchaser | Admin | Viewer |
|-----------|-----------|-------|--------|
| Create Order | ✅ | ✅ | ❌ |
| View Orders | Own | All | All (Read-only) |
| Manage PO | ❌ | ✅ | ❌ |
| Manage Invoice | ❌ | ✅ | ❌ |
| View Reports | Limited | All | All (Read-only) |

---

### 4.3 Application Level Permissions (Seller)

| Permission | Product Manager | Order Manager | Viewer |
|-----------|----------------|---------------|--------|
| Manage Products | ✅ | ❌ | ❌ |
| View Products | All | All | All (Read-only) |
| Manage Orders | ❌ | ✅ | ❌ |
| View Orders | All | All | All (Read-only) |
| View Reports | Product | Sales | All (Read-only) |
| Manage Shop Settings | ❌ | ❌ | ❌ |

---

## 5. Use Cases

### 5.1 Seller Use Cases

#### Use Case 1: สร้างหลายองค์กร
- **Actor**: สมชาย (Account)
- **Scenario**:
  1. สมชายสร้าง ORD1 (บริษัทวัสดุก่อสร้าง)
  2. ผ่าน KYB
  3. สร้าง Shop1
  4. สร้าง Branch1, Branch2
  5. สมชายสร้าง ORD2 (บริษัทรับเหมา)
  6. ผ่าน KYB
  7. สร้าง Shop2
  8. สร้าง Branch1

#### Use Case 2: เพิ่มทีมเข้า Shop
- **Actor**: ORG Owner
- **Scenario**:
  1. ORG Owner เชิญ Team Member A เข้า ORD
  2. กำหนด role: Product Manager (App level)
  3. Assign Team Member A เข้า Shop1
  4. Team Member A สามารถจัดการสินค้าใน Shop1 ได้

#### Use Case 3: จัดการ Role และ Permissions
- **Actor**: ORG Owner
- **Scenario**:
  1. ORG Owner สร้าง Custom Role: "Senior Product Manager"
  2. กำหนด permissions:
     - Manage Products ✅
     - Manage Orders ✅
     - View Reports ✅
  3. Assign role ให้ Team Member B
  4. Team Member B ได้รับ permissions ตามที่กำหนด

---

### 5.2 Buyer Use Cases

#### Use Case 1: สร้างหลายองค์กร
- **Actor**: วิมล (Account)
- **Scenario**:
  1. วิมลสร้าง ORD1 (บริษัทก่อสร้าง)
  2. ผ่าน KYB
  3. เพิ่ม Team Members
  4. วิมลสร้าง ORD2 (บริษัทพัฒนาอสังหาริมทรัพย์)
  5. ผ่าน KYB
  6. เพิ่ม Team Members

#### Use Case 2: เพิ่มทีมเพื่อช่วยจัดการคำสั่งซื้อ
- **Actor**: ORG Owner
- **Scenario**:
  1. ORG Owner เชิญ Team Member C เข้า ORD
  2. กำหนด role: Purchaser (App level)
  3. Team Member C สามารถสร้างออเดอร์ได้

---

## 6. Technical Architecture

### 6.1 Database Schema (Conceptual)

```
Account (KYC)
  - id
  - user_id
  - kyc_status
  - kyc_documents

ORD (KYB)
  - id
  - account_id
  - name
  - kyb_status
  - kyb_documents
  - shop_id (Seller only, 1:1)

Shop (Seller only)
  - id
  - ord_id
  - subdomain
  - name

Branch
  - id
  - shop_id (Seller)
  - ord_id (Buyer - if needed)
  - name
  - is_main (boolean)

Team Member
  - id
  - ord_id
  - user_id
  - org_role_id (Layer 1)
  - app_role_id (Layer 2)
  - shop_id (Seller only, nullable)

Role (Organization Level)
  - id
  - ord_id
  - name
  - permissions

Role (Application Level)
  - id
  - type (buyer/seller)
  - name
  - permissions
```

---

### 6.2 Permission System Architecture

**Two-Layer Permission Check**:
1. **Check Organization Permission**: ตรวจสอบสิทธิ์ใน ORD
2. **Check Application Permission**: ตรวจสอบสิทธิ์ใน App (Buyer/Seller)
3. **Check Shop Permission** (Seller only): ตรวจสอบสิทธิ์ใน Shop

**Permission Resolution**:
- User ต้องมีสิทธิ์ทั้ง 2 layers
- สำหรับ Seller: ต้องมีสิทธิ์ใน Shop ที่ต้องการทำงานด้วย

---

## 7. Benefits

### 7.1 For Sellers

**1. Multiple Organizations**
- สามารถมีหลายองค์กร (หลาย Shop)
- แต่ละ Shop มี Subdomain ของตัวเอง
- จัดการแยกกันได้

**2. Multi-Branch Support**
- 1 Shop สามารถมีหลายสาขา
- จัดการราคา, สต็อก, shelf แยกตามสาขา

**3. Flexible Team Management**
- เพิ่มทีมเข้า ORD
- Assign ทีมเข้า Shop
- กำหนด role และ permissions ได้เอง

---

### 7.2 For Buyers

**1. Multiple Organizations**
- สามารถมีหลายองค์กร
- แต่ละองค์กรจัดการแยกกัน

**2. Team Collaboration**
- เพิ่มทีมเพื่อช่วยจัดการคำสั่งซื้อ
- แบ่งหน้าที่ได้ชัดเจน

---

### 7.3 For Platform

**1. Better Organization**
- โครงสร้างชัดเจน
- จัดการได้ง่าย

**2. Scalability**
- รองรับการขยายตัว
- รองรับหลายองค์กร, หลายสาขา

**3. Security**
- Two-layer permission system
- Granular permissions
- Audit trail

---

## 8. Implementation Considerations

### 8.1 KYB/KYC Process

**Challenges**:
- ต้องมีระบบจัดการเอกสาร
- ต้องมี Allkons Admin System เพื่ออนุมัติ
- ต้องมี notification system

**Solutions**:
- File storage สำหรับเอกสาร
- Admin dashboard สำหรับอนุมัติ
- Email/SMS notifications

---

### 8.2 Multi-Organization Management

**Challenges**:
- User ต้องสลับระหว่างองค์กร
- Data isolation ระหว่างองค์กร
- Permission management ซับซ้อน

**Solutions**:
- Organization switcher ใน UI
- Database isolation (tenant-based)
- Clear permission model

---

### 8.3 Two-Layer Permission System

**Challenges**:
- Permission resolution ซับซ้อน
- UI ต้องแสดง permissions ทั้ง 2 layers
- Performance (check permissions)

**Solutions**:
- Clear permission model
- Cache permissions
- Optimize permission checks

---

## 9. Success Metrics

### 9.1 Organization Metrics

- **Number of ORDs per Account**: จำนวนองค์กรต่อ Account เฉลี่ย
- **KYB Approval Rate**: อัตราการอนุมัติ KYB
- **KYB Processing Time**: เวลาที่ใช้ในการอนุมัติ KYB

### 9.2 Team Metrics

- **Average Team Size**: ขนาดทีมเฉลี่ยต่อ ORD
- **Team Member Activity**: กิจกรรมของทีม
- **Role Usage**: การใช้งาน roles ต่างๆ

### 9.3 Shop/Branch Metrics

- **Average Branches per Shop**: จำนวนสาขาต่อร้านเฉลี่ย
- **Multi-Shop Accounts**: จำนวน Account ที่มีหลาย Shop

---

## 10. Future Enhancements

### 10.1 Phase 2 Enhancements

1. **Advanced Permission System**: Custom permissions ที่ละเอียดขึ้น
2. **Organization Templates**: Template สำหรับสร้างองค์กร
3. **Bulk Team Management**: จัดการทีมหลายคนพร้อมกัน

### 10.2 Phase 3 Enhancements

1. **Organization Analytics**: Analytics สำหรับแต่ละองค์กร
2. **Cross-Organization Features**: Features ที่ทำงานข้ามองค์กร
3. **Organization Marketplace**: Marketplace สำหรับองค์กร

---

## 11. Open Questions

1. **Branch for Buyer**: Buyer มี Branch หรือไม่? (จากโครงสร้างดูเหมือนไม่มี)
2. **Shop Assignment**: Team member สามารถอยู่ในหลาย Shop ได้หรือไม่? (ถ้าเป็น ORD เดียวกัน)
3. **Role Inheritance**: Role ใน ORG level ส่งผลต่อ App level หรือไม่?
4. **KYB Re-verification**: ต้อง re-verify KYB เมื่อไหร่?

---

## 12. Conclusion

User Structure และ Organization Management เป็นส่วนสำคัญของ Allkons M ที่:
- **รองรับหลายองค์กร**: Account สามารถมีหลาย ORD
- **Multi-Branch Support**: Shop สามารถมีหลายสาขา
- **Flexible Team Management**: Two-layer permission system
- **KYB/KYC Integration**: ระบบยืนยันตัวตนและองค์กร

**Recommendation**: 
- ควร implement ใน Phase 1 (MVP) เพื่อสร้างโครงสร้างพื้นฐาน
- เริ่มจาก basic roles แล้วค่อยเพิ่ม custom roles ใน Phase 2

---

## Appendix

### A. Structure Comparison

| Level | Seller | Buyer |
|-------|--------|-------|
| Account (KYC) | ✅ | ✅ |
| ORD (KYB) | ✅ | ✅ |
| Shop | ✅ | ❌ |
| Branch | ✅ | ❌ (?) |
| Team Members | ✅ | ✅ |

### B. Permission Layers Summary

**Layer 1: Organization Level**
- จัดการใน ORD
- Roles: ORG Owner, ORG Admin, ORG Member

**Layer 2: Application Level**
- ใช้งานใน app
- Buyer Roles: Purchaser, Admin, Viewer
- Seller Roles: Product Manager, Order Manager, Viewer

### C. References
- Project Scope Document
- Team Management Document
- Multi-Store Concept Document
