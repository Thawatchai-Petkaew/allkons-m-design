# Module Documentation: Allkons M

## Executive Summary
เอกสารชุดนี้เป็น Module Documentation สำหรับ Allkons M โดยรวม Common Functions และ Features ที่ใช้ใน Marketplace

---

## Module Documentation List

### 🔴 Critical Modules (Phase 1 - MVP)

1. **[Authentication & Authorization Module](./authentication-authorization-module.md)** ✅
   - User Registration, Login, 2FA
   - Role-Based Access Control (RBAC)
   - Session Management
   - Organization Switching

2. **[KYC/KYB Management Module](./kyc-kyb-management-module.md)** ✅
   - KYC Process (Account level)
   - KYB Process (ORD level)
   - Document Management
   - Approval Workflow

3. **[Promotion & Campaign Module](./promotion-campaign-module.md)** ✅
   - Promotion Center
   - Customer Group Promotions
   - Discount, Special Price
   - Coupon/Voucher Management

4. **[Notification Module](./notification-module.md)** ✅
   - In-app, Email, SMS Notifications
   - Notification Preferences
   - Notification Templates
   - Multi-channel Notifications

5. **[Settings & Configuration Module](./settings-configuration-module.md)** ✅
   - User Settings
   - Organization Settings
   - Shop Settings
   - System Settings

6. **[Refund & Return Module](./refund-return-module.md)** ✅
   - Return Request
   - Refund Processing
   - Dispute Management
   - Return Policies

7. **[Tax Management Module](./tax-management-module.md)** ✅
   - Tax Calculation (VAT, WHT)
   - Tax Settings
   - Tax Reports
   - Tax Invoice Generation

8. **[PDPA Management Module](./pdpa-management-module.md)** ✅
   - Two-Layer PDPA (Account & ORG)
   - Consent Management
   - Data Subject Rights
   - Privacy Policy Management
   - Data Processing Records
   - Data Breach Management

---

### ⚠️ Completed Partially Defined Modules

9. **[Payment & Invoicing Module (Complete)](./payment-invoicing-module-complete.md)** ✅
   - Payment Processing (Complete workflow)
   - Payment Methods
   - Refund Management
   - Payment Reconciliation
   - Invoice Generation & Management

10. **[Shipping & Delivery Module (Complete)](./shipping-delivery-module-complete.md)** ✅
   - Shipping Rate Calculation
   - Shipping Label Generation
   - Shipping Provider Integration
   - Delivery Tracking (Complete)
   - Delivery Confirmation

11. **[Inventory Management Module (Complete)](./inventory-management-module-complete.md)** ⚠️ Future Feature
    - **Status**: Future Feature (Phase 2+)
    - **Current (MVP)**: Manual Stock Status Management
    - **Future**: Full Inventory System
    - Stock Tracking (Complete)
    - Stock Alerts (Low stock, Out of stock)
    - Stock History
    - Stock Adjustment
    - Multi-location Inventory

12. **[Pricing Management Module (Complete)](./pricing-management-module-complete.md)** ✅
    - Base Price Management (Complete)
    - Promotion Price (Complete)
    - Bulk Pricing Rules
    - Customer Group Pricing (Complete)
    - Branch-level Pricing (Complete)
    - Price History

13. **[Document Management Module (Complete)](./document-management-module-complete.md)** ✅
    - Invoice Generation & Management (Complete)
    - BOQ Generation & Management
    - PO Management (Complete)
    - Document Templates
    - Document Storage & Sharing
    - Document History

---

## Module Status Summary

| Status | Count | Modules |
|--------|-------|---------|
| ✅ Fully Documented | 13 | All Critical + Completed Modules |
| ⚠️ Partially Documented | 0 | - |
| ❌ Missing | 0 | - |

---

## Common Functions & Features Included

### Authentication & Security
- User Registration (Buyer, Seller)
- Login/Logout (Email, OAuth)
- Password Management (Reset, Change)
- Email Verification
- Two-Factor Authentication (2FA)
- Session Management
- Role-Based Access Control (RBAC)

### KYC/KYB
- KYC Process (Document upload, Verification, Approval)
- KYB Process (Organization verification)
- Document Management
- Approval Workflow
- Re-verification

### Promotions
- Customer Group Promotions
- Discount Promotions
- Special Price
- Bulk Pricing
- Coupon/Voucher Management
- Promotion Rules & Conditions

### Notifications
- In-app Notifications
- Email Notifications
- SMS Notifications
- Notification Preferences
- Notification Templates
- Notification History

### Settings
- Profile Settings
- Notification Settings
- Privacy Settings
- Security Settings
- Organization Settings
- Shop Settings
- System Settings

### Payments
- Payment Processing (Complete workflow)
- Multiple Payment Methods
- Payment Status Management
- Refund Processing
- Payment Reconciliation
- Payment History

### Shipping
- Shipping Rate Calculation
- Shipping Label Generation
- Shipping Provider Integration
- Delivery Tracking
- Delivery Confirmation
- Multi-delivery Support

### Inventory
- Stock Tracking (Complete)
- Stock Alerts
- Stock History
- Stock Adjustment
- Multi-location Inventory
- Stock Synchronization

### Pricing
- Base Price Management
- Promotion Price
- Bulk Pricing
- Customer Group Pricing
- Branch-level Pricing
- Price History

### Documents
- Invoice Generation
- BOQ Generation
- PO Management
- Document Templates
- Document Storage
- Document Sharing

### PDPA Compliance
- Two-Layer PDPA (Account & ORG)
- Consent Management
- Data Subject Rights
- Privacy Policy Management
- Data Processing Records
- Data Breach Management

---

## Module Dependencies

### Dependency Map

```
Authentication & Authorization (Base)
  ├── KYC/KYB Management
  ├── Organization Management
  ├── Team Management
  └── All Modules

KYC/KYB Management
  ├── Organization Management
  └── Shop Management

Product Module
  ├── Master SKU Management
  ├── Inventory Management
  ├── Pricing Management
  └── Catalog Management

Order Management
  ├── Product Module
  ├── Payment & Invoicing
  ├── Shipping & Delivery
  ├── Tax Management
  ├── Refund & Return
  └── Inventory Management (Future - Manual Stock Status for MVP)

Promotion/Campaign
  ├── Product Module
  ├── Pricing Management
  └── Customer Group Management

Notification
  └── All Modules (Cross-cutting)

PDPA Management
  ├── Authentication & Authorization
  ├── Organization Management
  ├── User Management
  └── Settings & Configuration

Payment & Invoicing
  ├── Order Management
  ├── Tax Management
  └── Refund & Return

Shipping & Delivery
  ├── Order Management
  └── Inventory Management (Future)
```

---

## Next Steps

1. **Review Module Documentation**: ตรวจสอบ Module Documentation ทั้งหมด
2. **Validate Requirements**: Validate requirements กับ stakeholders
3. **Technical Design**: ออกแบบระบบตาม Module Documentation
4. **Development**: พัฒนาตาม phases

---

## References

- Project Scope Document
- Product Module Detailed Document
- User Structure Document
- Team Management Document
- Web Search: Marketplace Common Functions
