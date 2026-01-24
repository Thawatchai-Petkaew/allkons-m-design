# Settings & Configuration Module: Allkons M

## Executive Summary
Module สำหรับการจัดการ Settings และ Configuration ทั้งในระดับ User, Organization, Shop และ System

---

## 1. Module Overview

### 1.1 Purpose
- **User Settings**: จัดการตั้งค่าส่วนตัว
- **Organization Settings**: จัดการตั้งค่าองค์กร
- **Shop Settings**: จัดการตั้งค่าร้าน (Seller)
- **System Settings**: จัดการตั้งค่าระบบ (Admin)

### 1.2 Scope
- Profile Settings
- Notification Settings
- Privacy Settings
- Security Settings
- Organization Settings
- Shop Settings
- System Configuration

---

## 2. Common Functions & Features

### 2.1 User Settings

#### 2.1.1 Profile Settings

**Profile Information**:
- First Name
- Last Name
- Email (can change, requires verification)
- Phone Number (can change, requires verification)
- Profile Picture
- Job Role (can update)
- Business Type (can update)
- Interests (can update)
- Address (can add multiple addresses)

**Profile Management**:
- Edit profile information
- Upload profile picture
- Delete profile picture
- Change email (requires verification)
- Change phone (requires verification)
- Set default address

---

#### 2.1.2 Notification Settings

**Notification Preferences**:
- **Order Notifications**:
  - Order placed
  - Order shipped
  - Order delivered
  - Order cancelled
- **Account Notifications**:
  - Account updates
  - Security alerts
  - Login notifications
- **Product Notifications**:
  - Price drops
  - Back in stock
  - New products
- **Promotion Notifications**:
  - New promotions
  - Promotion ending
- **Team Notifications**:
  - Team member updates
  - Role changes

**Channel Preferences**:
- Email: Enable/Disable
- SMS: Enable/Disable
- In-app: Enable/Disable
- Push: Enable/Disable (Mobile)

**Frequency Settings**:
- Real-time
- Daily digest
- Weekly digest
- Never

**Quiet Hours**:
- Set quiet hours (do not send during this time)
- Timezone setting

---

#### 2.1.3 Privacy Settings

**Privacy Options**:
- **Profile Visibility**:
  - Public
  - Private
  - Friends only
- **Data Sharing**:
  - Share data for personalization
  - Share data for analytics
  - Share data with partners
- **Search Visibility**:
  - Show in search results
  - Hide from search

**Data Management**:
- View data collected
- Download data (GDPR/PDPA)
- Delete data
- Data retention settings

---

#### 2.1.4 PDPA Settings (Account Level)

**Consent Management**:
- View all consents
- Marketing consent (Enable/Disable)
- Data sharing consent (Enable/Disable)
- Analytics consent (Enable/Disable)
- Third-party consent (Enable/Disable)
- Consent history

**Data Subject Rights**:
- Request data access
- Request data rectification
- Request data erasure
- Request data portability
- View request status

**Privacy Policy**:
- View privacy policy
- Accept privacy policy
- View policy version history
- Policy update notifications

**Data Processing**:
- View data processing records
- Data processing preferences
- Processing restriction requests

---

#### 2.1.4 Security Settings

**Security Options**:
- **Password**:
  - Change password
  - Password strength indicator
  - Password history (cannot reuse last 5)
- **Two-Factor Authentication (2FA)**:
  - Enable/Disable 2FA
  - 2FA method (SMS, Email, Authenticator)
  - Backup codes
- **Session Management**:
  - View active sessions
  - Logout from all devices
  - Session timeout settings
- **Security Alerts**:
  - Login from new device
  - Password change
  - Email change
  - Suspicious activity

---

### 2.2 Organization Settings

#### 2.2.1 Organization Profile

**Organization Information**:
- Organization Name
- Organization Type
- Business Registration Number
- Tax ID
- Address
- Phone Number
- Email
- Website
- Description

**Organization Management**:
- Edit organization information
- Update business documents
- Change organization name (requires approval)
- Delete organization (requires confirmation)

---

#### 2.2.2 Financial Settings

**Bank Account Management**:
- Add bank account
- Edit bank account
- Delete bank account
- Set primary bank account
- Verify bank account

**Payment Settings**:
- Payment methods accepted
- Payment terms
- Credit terms (for Buyer)
- Auto-payment settings

**Financial Preferences**:
- Currency preference
- Tax settings
- Invoice settings
- Payment reminder settings

---

#### 2.2.3 Team Settings

**Team Management**:
- View team members
- Team member roles
- Team permissions
- Team notifications

**Team Preferences**:
- Default role for new members
- Team notification settings
- Team access settings

---

#### 2.2.4 PDPA Settings (ORG Level)

**Consent Management**:
- View team member consents
- View customer consents (for Sellers)
- Manage consent records
- Consent withdrawal handling

**Data Subject Rights Management**:
- View data subject requests
- Process access requests
- Process rectification requests
- Process erasure requests
- Process portability requests
- Request status tracking

**Privacy Policy**:
- View ORG privacy policy
- Update privacy policy
- Policy version management
- Policy acceptance tracking

**Data Processing Records**:
- View processing records
- Create processing records
- Update processing records
- Export processing records

**Data Breach Management**:
- Report data breach
- View breach reports
- Breach response workflow
- Breach documentation

---

### 2.3 Shop Settings (Seller Only)

#### 2.3.1 Shop Profile

**Shop Information**:
- Shop Name
- Shop Description
- Shop Logo
- Shop Banner
- Shop Address
- Shop Phone
- Shop Email
- Shop Website
- Shop Social Media

**Shop Customization**:
- Theme colors
- Layout settings
- Custom pages
- Shop categories

---

#### 2.3.2 Shop Configuration

**Shop Features**:
- Enable/Disable features
- Shop visibility (Public, Private)
- Shop status (Active, Inactive)

**Shop Policies**:
- Return policy
- Shipping policy
- Payment policy
- Terms & Conditions

---

#### 2.3.3 Branch Settings

**Branch Management**:
- View branches
- Branch information
- Branch settings
- Branch status

**Branch Configuration**:
- Branch name
- Branch address
- Branch contact
- Branch operating hours
- Branch status

---

### 2.4 PDPA Settings (Two-Layer)

#### 2.4.1 Account-Level PDPA Settings

**User PDPA Settings**:
- Consent management interface
- Data subject rights interface
- Privacy policy acceptance
- Data processing preferences
- Data access requests

**Features**:
- View and manage consents
- Submit data subject requests
- View privacy policy
- Download personal data
- Request data deletion

---

#### 2.4.2 ORG-Level PDPA Settings

**ORG PDPA Settings**:
- Team member consent management
- Customer consent management (for Sellers)
- Data subject rights handling
- Privacy policy management
- Data processing records
- Data breach management

**Features**:
- Manage team member consents
- Handle data subject requests
- Maintain processing records
- Report and handle data breaches
- Privacy policy versioning

---

### 2.5 System Settings (Admin Only)

#### 2.5.1 Platform Configuration

**General Settings**:
- Platform name
- Platform logo
- Platform description
- Default language
- Supported languages
- Timezone settings

**Feature Flags**:
- Enable/Disable features
- Beta features
- Maintenance mode

---

#### 2.4.2 Payment Gateway Settings

**Payment Providers**:
- Configure payment gateways
- API keys management
- Payment gateway status
- Test mode settings

**Payment Settings**:
- Default payment methods
- Payment processing settings
- Refund settings
- Commission settings

---

#### 2.4.3 Shipping Settings

**Shipping Providers**:
- Configure shipping providers
- API keys management
- Shipping provider status

**Shipping Settings**:
- Default shipping methods
- Shipping zones
- Shipping rates
- Delivery time settings

---

#### 2.4.4 Tax Settings

**Tax Configuration**:
- Tax rates
- Tax rules
- Tax exemptions
- Tax calculation method

**Tax Settings**:
- VAT settings
- Withholding tax settings
- Tax reporting settings

---

## 3. User Stories

### 3.1 Settings User Stories

**US-SETTINGS-001: Update Profile**
- **As a** User
- **I want to** update my profile information
- **So that** my information is current
- **Acceptance Criteria**:
  - Can edit profile information
  - Can upload profile picture
  - Can change email (requires verification)
  - Changes saved successfully

**US-SETTINGS-002: Manage Notification Preferences**
- **As a** User
- **I want to** manage my notification preferences
- **So that** I only receive notifications I want
- **Acceptance Criteria**:
  - Can enable/disable notification types
  - Can choose channels
  - Can set quiet hours
  - Preferences saved

---

## 4. Technical Requirements

### 4.1 Settings Service

**Components**:
- Settings Service (API)
- Settings Storage
- Settings Validation
- Settings Cache

**Settings Hierarchy**:
```
System Settings (Admin)
  └── Organization Settings (ORG Owner/Admin)
        └── Shop Settings (Shop Owner/Admin)
              └── User Settings (Individual)
```

---

### 4.2 APIs

**User Settings APIs**:
- `GET /api/settings/profile` - Get profile settings
- `PUT /api/settings/profile` - Update profile
- `GET /api/settings/notifications` - Get notification preferences
- `PUT /api/settings/notifications` - Update notification preferences
- `GET /api/settings/privacy` - Get privacy settings
- `PUT /api/settings/privacy` - Update privacy settings
- `GET /api/settings/security` - Get security settings
- `PUT /api/settings/security` - Update security settings
- `GET /api/settings/pdpa` - Get PDPA settings (Account level)
- `PUT /api/settings/pdpa` - Update PDPA settings (Account level)

**Organization Settings APIs**:
- `GET /api/organizations/{id}/settings` - Get org settings
- `PUT /api/organizations/{id}/settings` - Update org settings
- `GET /api/organizations/{id}/settings/financial` - Get financial settings
- `PUT /api/organizations/{id}/settings/financial` - Update financial settings
- `GET /api/organizations/{id}/settings/pdpa` - Get PDPA settings (ORG level)
- `PUT /api/organizations/{id}/settings/pdpa` - Update PDPA settings (ORG level)

**Shop Settings APIs**:
- `GET /api/shops/{id}/settings` - Get shop settings
- `PUT /api/shops/{id}/settings` - Update shop settings

**System Settings APIs** (Admin):
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update system settings

---

## 5. Common Functions Reference

### 5.1 Settings Functions

```typescript
// User Settings
getUserSettings(userId: string): Promise<UserSettings>
updateUserSettings(userId: string, settings: UserSettings): Promise<void>
getProfileSettings(userId: string): Promise<ProfileSettings>
updateProfileSettings(userId: string, profile: ProfileSettings): Promise<void>
getNotificationPreferences(userId: string): Promise<NotificationPreferences>
updateNotificationPreferences(userId: string, preferences: NotificationPreferences): Promise<void>
getPrivacySettings(userId: string): Promise<PrivacySettings>
updatePrivacySettings(userId: string, privacy: PrivacySettings): Promise<void>
getSecuritySettings(userId: string): Promise<SecuritySettings>
updateSecuritySettings(userId: string, security: SecuritySettings): Promise<void>
getPDPASettings(userId: string, level: 'account' | 'org'): Promise<PDPASettings>
updatePDPASettings(userId: string, level: 'account' | 'org', settings: PDPASettings): Promise<void>

// Organization Settings
getOrganizationSettings(orgId: string): Promise<OrganizationSettings>
updateOrganizationSettings(orgId: string, settings: OrganizationSettings): Promise<void>
getFinancialSettings(orgId: string): Promise<FinancialSettings>
updateFinancialSettings(orgId: string, financial: FinancialSettings): Promise<void>

// Shop Settings
getShopSettings(shopId: string): Promise<ShopSettings>
updateShopSettings(shopId: string, settings: ShopSettings): Promise<void>

// System Settings (Admin)
getSystemSettings(): Promise<SystemSettings>
updateSystemSettings(settings: SystemSettings): Promise<void>
```

---

## 6. Success Metrics

### 6.1 Settings Metrics

- Settings update frequency
- Notification preference adoption
- 2FA adoption rate
- Profile completion rate

---

## 7. Implementation Priority

### Phase 1 (MVP)
- ✅ Basic profile settings
- ✅ Basic notification preferences
- ✅ Basic security settings
- ✅ Organization profile settings
- ✅ Shop profile settings

### Phase 2
- ✅ Advanced notification preferences
- ✅ Privacy settings
- ✅ Advanced security settings
- ✅ Financial settings
- ✅ System settings (Admin)

### Phase 3
- ✅ Advanced customization
- ✅ Settings import/export
- ✅ Settings templates

---

## 8. Dependencies

### 8.1 External Dependencies
- File storage (for profile pictures, documents)
- Email service (for email verification)
- SMS service (for phone verification)

### 8.2 Internal Dependencies
- Authentication & Authorization Module
- Organization Management Module
- Shop Management Module
- Notification Module

---

## Appendix

### A. Settings Categories

**User Settings**:
- Profile
- Notifications
- Privacy
- Security
- PDPA (Account Level)

**Organization Settings**:
- Profile
- Financial
- Team
- Permissions
- PDPA (ORG Level)

**Shop Settings**:
- Profile
- Customization
- Policies
- Branch

**System Settings**:
- Platform
- Payment
- Shipping
- Tax

### B. References
- [Project Scope Document](../business_user/project-scope.md)
- [User Structure Document](../business_user/user-structure.md)
- Notification Module Document
- Authentication & Authorization Module Document
- PDPA Management Module Document
