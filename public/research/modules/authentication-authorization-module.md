# Authentication & Authorization Module: Allkons M

## Executive Summary
Module สำหรับการยืนยันตัวตน (Authentication) และการกำหนดสิทธิ์ (Authorization) ของผู้ใช้ในระบบ Allkons M

---

## 1. Module Overview

### 1.1 Purpose
- **Authentication**: ยืนยันตัวตนผู้ใช้ (Login, Registration)
- **Authorization**: กำหนดสิทธิ์การเข้าถึงตาม Role และ Permissions
- **Session Management**: จัดการ session และ security

### 1.2 Scope
- User Registration (Buyer, Seller)
- Login/Logout
- Password Management
- OTP via Phone Number
- OAuth Integration
- Role-Based Access Control (RBAC)
- Permission System
- Organization Switching (Multi-ORG)

---

## 2. Common Functions & Features

### 2.1 User Registration

#### 2.1.1 Registration Flow

- **Buyer Registration Flow**:
1. **ยืนยันหมายเลขโทรศัพท์** – รับหมายเลขโทรศัพท์และส่ง OTP ผู้ใช้กรอกรหัสเพื่อเข้าสู่ขั้นตอนถัดไป
2. **ตั้งรหัสผ่าน** – ผู้ใช้สร้างรหัสผ่านที่ปลอดภัย
3. **กรอกข้อมูลส่วนตัว** – ขอข้อมูลส่วนตัวที่จำเป็น (ชื่อ, ชื่อกลาง, นามสกุล, อีเมล) และยอมรับ Terms & Conditions (Account Layer)
4. **เลือกประเภทโปรไฟล์ธุรกิจ** – ผู้ใช้เลือกประเภท (บุคคลธรรมดา / บุคคลธรรมดาจดทะเบียนพาณิชย์ / นิติบุคคล) และกรอกข้อมูลธุรกิจที่เกี่ยวข้อง:
   - เลขบัตรประชาชน / เลขทะเบียนพาณิชย์ / ชื่อบริษัท
   - หากเป็นประเภทนิติบุคคล ให้เลือกประเภทนิติบุคคลเพิ่มเติม
5. **ยอมรับข้อกำหนดเพิ่มเติม** – บุคคลธรรมดาจดทะเบียนพาณิชย์ / นิติบุคคล ยอมรับ Terms & Conditions ประจำ Layer นั้นๆ
6. **Consent (PDPA) / Consent Center**
   - เก็บ consent ระดับ **Account** (เช่น registration consent, marketing/data sharing/analytics ตามที่เลือก)
   - ถ้ามีการสร้าง/ใช้งาน ORG ให้เก็บ consent ระดับ **ORG** เพิ่มเติม (ครอบคลุม Shop/Branch ภายใต้ ORG)
   - ระบบบันทึก consent ลง **Consent Center** พร้อม policy/consent version และหลักฐาน (timestamp, method, channel)
7. **Registration Complete**

- **Seller Registration Flow**:
1. **ยืนยันหมายเลขโทรศัพท์** – รับหมายเลขโทรศัพท์และส่ง OTP ผู้ใช้กรอกรหัสเพื่อเข้าสู่ขั้นตอนถัดไป
2. **ตั้งรหัสผ่าน** – ผู้ใช้สร้างรหัสผ่านที่ปลอดภัย
3. **กรอกข้อมูลส่วนตัว** – ขอข้อมูลส่วนตัวที่จำเป็น (ชื่อ, ชื่อกลาง, นามสกุล, อีเมล) และยอมรับ Terms & Conditions (Account Layer)
4. **เลือกประเภทโปรไฟล์ธุรกิจ** – ผู้ใช้เลือกประเภท (บุคคลธรรมดา / บุคคลธรรมดาจดทะเบียนพาณิชย์ / นิติบุคคล) และกรอกข้อมูลธุรกิจที่เกี่ยวข้อง:
   - เลขบัตรประชาชน / เลขทะเบียนพาณิชย์ / ชื่อบริษัท
   - หากเป็นประเภทนิติบุคคล ให้เลือกประเภทนิติบุคคลเพิ่มเติม
5. **ยอมรับข้อกำหนดเพิ่มเติม** – บุคคลธรรมดาจดทะเบียนพาณิชย์ / นิติบุคคล ยอมรับ Terms & Conditions ประจำ Layer นั้นๆ
6. **ระบุข้อมูลบริบทการทำงาน** – เลือก/สร้าง ORG และระบุข้อมูล Shop และ Branch (อย่างน้อย 1 Branch: Main)
7. **Consent (PDPA) / Consent Center**
   - เก็บ consent ระดับ **Account**
   - เก็บ consent ระดับ **ORG** (ครอบคลุม Shop/Branch)
   - ระบบบันทึก consent ลง **Consent Center** พร้อม policy/consent version และหลักฐาน (timestamp, method, channel)
8. **Registration Complete**

#### 2.1.2 Registration Fields

**Common Fields**:
- Username (auto-created based on Phone Number)
- First Name
- Middle Name
- Last Name
- Email (optional, unique)
- Phone Number (required, unique)
- Password (min 8 characters, must include uppercase, lowercase, number)
- Confirm Password
- User Type / Profile Type (Individual, Registered Individual Merchant, Legal Entity)
- Tax ID / ID Number / Registration Number
- Company Name (if applicable)
- Terms & Conditions (Account Layer) (checkbox, required)
- Terms & Conditions (Business Layer) (checkbox, required for merchants/entities)

**Buyer Additional Fields**:
- Job Role (optional)
- Business Type (optional)
- Interests (optional)

**Seller Additional Fields**:
- Shop Name (required, unique)
- Branch Name (required, default: Main Branch)
- Job Role (required)
- Business Type (required)
- Business Registration Number (if applicable)

#### 2.1.3 Validation Rules

**Email**:
- Format validation (optional)
- Unique check
- Domain validation (optional)

**Phone Number**:
- Format validation (Thai format: 0XX-XXX-XXXX)
- Unique check
- OTP verification (required)

**Password**:
- Minimum 8 characters
- Must include: uppercase, lowercase, number
- Special character (optional but recommended)
- Password strength indicator

---

### 2.2 Login & Authentication

**1. Username + Password**
- Login using auto-created username (based on phone number)
- Password authentication
- Remember me option

**2. Phone Number + OTP**
- Login using phone number
- Verify with 6-digit OTP
- Secure one-time access

**3. OAuth Integration (Designed to support)**
- Google Login (Gmail)
- Line Login (Thailand)
- Facebook Login


**Path A: Username/Password**
1. User enters username + password
2. System validates credentials
3. System creates session
4. Redirect to dashboard

**Path B: Phone/OTP**
1. User enters phone number
2. System sends OTP
3. User enters OTP
4. System validates OTP
5. System creates session
6. Redirect to dashboard

#### 2.2.3 Session Management

**Session Features**:
- Session creation on login
- Session timeout (30 minutes inactivity)
- Remember me (extended session - 30 days)
- Multiple device sessions support
- Session invalidation on logout
- Force logout (all devices)

**Security Features**:
- IP address tracking
- Device fingerprinting
- Suspicious activity detection
- Login from new device notification
- Concurrent session limit (optional)

---

### 2.3 Password Management

#### 2.3.1 Password Reset

**Flow**:
1. User clicks "Forgot Password"
2. Enter email/phone
3. System sends reset link/OTP
4. User clicks link or enters OTP
5. User enters new password
6. Password updated
7. Force logout from all devices

**Security**:
- Reset link expires in 1 hour
- OTP expires in 10 minutes
- One-time use only
- Rate limiting (max 3 attempts per hour)

#### 2.3.2 Password Change

**Flow**:
1. User goes to Settings → Security
2. Enter current password
3. Enter new password
4. Confirm new password
5. Password updated
6. Optional: Force logout from all devices

**Security**:
- Must know current password
- Cannot reuse last 5 passwords
- Rate limiting

#### 2.3.3 Password Requirements

- Minimum 8 characters
- Must include: uppercase, lowercase, number
- Special character recommended
- Cannot be common passwords
- Cannot contain username/email

---

### 2.4 Phone Number Verification (OTP)

#### 2.4.1 Verification Flow

1. User registers or attempts login with phone
2. System sends OTP to phone number
3. User enters 6-digit OTP
4. Phone number verified
5. Account activated or access granted

**Resend OTP**:
- Can resend OTP after timeout (30 seconds)
- Rate limiting (max 3 per 5 minutes)
- OTP expires in 5 minutes

#### 2.4.2 Verification Status

- **Pending**: OTP not yet verified
- **Verified**: Phone number verified
- **Expired**: OTP expired

**Restrictions for Unverified Accounts**:
- Cannot place orders (Buyer)
- Cannot list products (Seller)
- Cannot complete profile

---

---

### 2.6 OAuth Integration

#### 2.6.1 Supported Providers

- **Google**: Google Sign-In
- **Facebook**: Facebook Login
- **Line**: Line Login (Thailand)

#### 2.6.2 OAuth Flow

1. User clicks "Login with [Provider]"
2. Redirect to provider login
3. User authorizes
4. Provider returns user info
5. System creates/links account
6. User logged in

**Account Linking**:
- If email exists → Link accounts
- If email doesn't exist → Create new account
- User can link multiple OAuth providers

---

### 2.7 Role-Based Access Control (RBAC)

#### 2.7.1 Permission System

**Two-Layer Permission System**:

**Layer 1: Organization Level (ORG)**
- Owner (Default)
- Super Admin (Default)
- Admin (Default)
- Member (Default)
- *Custom Roles: Users can create and define their own roles.*

**Layer 2: Application Level (App)**
- Buyer: Defaulted by ORG role
- Seller: Defaulted by ORG role

**Permission Resolution**:
- User must have permission in both layers
- For Seller: Must have permission in Shop as well

#### 2.7.2 Permission Checking

**Permission Check Flow**:
1. User attempts action
2. System checks ORG level permission
3. System checks App level permission
4. System checks Shop permission (Seller only)
5. If all pass → Allow action
6. If any fail → Deny action

**Permission Cache**:
- Cache user permissions for performance
- Invalidate cache when permissions change
- Refresh cache on login

---

### 2.8 Organization Switching

#### 2.8.1 Multi-Organization Support

**For Users with Multiple ORDs**:
- Organization switcher in UI
- Switch between ORDs
- Each ORG has separate:
  - Permissions
  - Team members
  - Settings
  - Data

**Switch Flow**:
1. User clicks organization switcher
2. System shows list of ORDs
3. User selects ORG
4. System switches context
5. UI updates to show ORG-specific data

#### 2.8.2 Context Management

**Current Context**:
- Current ORG
- Current Shop (Seller)
- Current Branch (Seller)
- Current Role (ORG level + App level)

**Context Storage**:
- Store in session
- Persist in database
- Update on organization switch

---

## 3. User Stories

### 3.1 Registration User Stories

**US-AUTH-001: Register as Buyer**
- **As a** new user
- **I want to** register as a buyer
- **So that** I can purchase products
- **Acceptance Criteria**:
  - **Scenario: Successful Buyer Registration**
    - **Given** I am on the registration page
    - **When** I enter a valid phone number and click "Request OTP"
    - **Then** the system sends a 6-digit OTP to my phone
    - **When** I enter the correct OTP within 5 minutes
    - **Then** the phone number is verified and I proceed to set my password
    - **When** I enter a password (8+ characters, upper, lower, number)
    - **Then** I proceed to the Personal Info step
    - **When** I fill in my First Name, Last Name, and (optional) Email
    - **And** I check "Accept Account Layer Terms & Conditions"
    - **Then** I proceed to choose my Profile Type
    - **When** I select "Individual" and provide my Tax ID/ID Number
    - **Then** the system completes my registration and redirects me to the Buyer Dashboard

**US-AUTH-002: Register as Seller**
- **As a** new user
- **I want to** register as a seller
- **So that** I can sell products
- **Acceptance Criteria**:
  - **Scenario: Successful Seller Registration**
    - **Given** I am starting the seller registration flow
    - **When** I complete phone verification via OTP and set my password
    - **Then** I proceed to fill in my Personal Information (First, Middle, Last names, Email)
    - **When** I select "Legal Entity" as my business profile type
    - **And** I provide the Tax ID and Company Name
    - **Then** the system requires me to accept "Business Layer Terms & Conditions"
    - **When** I enter a unique Shop Name and a Branch Name (default: Main)
    - **Then** the system validates that the Shop Name is not already taken (ภายใต้ ORG)
    - **When** I click "Complete Registration"
    - **Then** the system creates my shop context and redirects me to the Seller Dashboard

---

### 3.2 Login User Stories

**US-AUTH-003: Login with Username/Password**
- **As a** registered user
- **I want to** login with my username and password
- **So that** I can access my account securely
- **Acceptance Criteria**:
  - **Scenario: Successful Password Login**
    - **Given** I am on the login page
    - **When** I enter my auto-created username (based on phone number)
    - **And** I enter the correct password
    - **Then** the system validates my credentials and starts my secure session
    - **And** I am redirected to my default dashboard

**US-AUTH-004: Login with Phone/OTP**
- **As a** registered user
- **I want to** login with my phone number and OTP
- **So that** I can login without remembering a password
- **Acceptance Criteria**:
  - **Scenario: Successful OTP Login**
    - **Given** I am on the login page selecting "OTP Login"
    - **When** I enter my registered phone number
    - **Then** the system sends a 6-digit OTP to my phone
    - **When** I enter the correct OTP within 5 minutes
    - **Then** the system validates the OTP and starts my secure session
    - **And** I am redirected to my dashboard

**US-AUTH-005: Login with OAuth (Designed to support)**
- **As a** user
- **I want to** login with Google/Line
- **So that** I can login quickly
- **Acceptance Criteria**:
  - **Scenario: Successful OAuth Login**
    - **Given** I click "Login with Google" or "Login with Line"
    - **When** I authorize my account on the provider's page
    - **Then** the system receives my profile information
    - **And** the system creates a new account if I am a new user
    - **Or** logs me in if I am an existing user

---

**US-AUTH-006: Reset Password**
- **As a** user
- **I want to** reset my password
- **So that** I can regain access if I forget password
- **Acceptance Criteria**:
  - **Scenario: Successful Password Reset**
    - **Given** I have clicked "Forgot Password"
    - **When** I enter my registered phone number
    - **Then** the system sends a reset OTP to my phone
    - **When** I enter the correct OTP and a new password (8+ characters)
    - **Then** the system updates my password
    - **And** invalidates all my existing sessions for security

---

## 4. Technical Requirements

### 4.1 Authentication Service

**Components**:
- Authentication Service (API)
- Session Management Service
- Password Hashing Service (bcrypt, argon2)
- OTP Service
- OAuth Service

**APIs**:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh session
- `POST /api/auth/password/reset` - Request password reset
- `POST /api/auth/password/change` - Change password
- `POST /api/auth/biometric/setup` - Setup biometric logout
- `GET /api/auth/oauth/[provider]` - OAuth login

---

### 4.2 Authorization Service

**Components**:
- Permission Service
- Role Service
- Permission Cache Service

**APIs**:
- `GET /api/auth/permissions` - Get user permissions
- `GET /api/auth/roles` - Get user roles
- `POST /api/auth/check-permission` - Check permission
- `GET /api/auth/organizations` - Get user organizations
- `POST /api/auth/organizations/switch` - Switch organization

---

### 4.3 Security Requirements

**Password Security**:
- Hash passwords with bcrypt or argon2
- Salt passwords
- Never store plain text passwords
- Password strength validation

**Session Security**:
- Use secure cookies (HTTPS only)
- HttpOnly cookies
- SameSite cookies
- Session token rotation
- CSRF protection

**Biometric Security**:
- Secure storage of biometric data
- Multi-factor authentication alternative (optional)

**OAuth Security**:
- State parameter for CSRF protection
- PKCE for mobile apps
- Token validation
- Secure token storage

---

## 5. Integration Points

### 5.1 With Other Modules

**KYC/KYB Module**:
- KYC required for certain user types
- KYB required for selling and full ORG features (PO, B2B pricing)
- Account status affects access

**Organization Management**:
- Organization switching
- Multi-ORG support
- Permission inheritance

**Notification Module**:
- Login notifications
- Password reset notifications
- Security alerts

**Settings Module**:
- Security settings
- OAuth account linking

---

## 6. Common Functions Reference

### 6.1 Authentication Functions

```typescript
// Registration
registerUser(data: RegisterData): Promise<User>
verifyPhoneOTP(phone: string, code: string): Promise<boolean>
resendPhoneOTP(phone: string): Promise<void>

// Login
login(credentials: LoginCredentials): Promise<Session>
loginWithOAuth(provider: string, code: string): Promise<Session>
logout(sessionId: string): Promise<void>
logoutAll(userId: string): Promise<void>

// Password
requestPasswordReset(email: string): Promise<void>
resetPassword(token: string, newPassword: string): Promise<void>
changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>


// Session
createSession(userId: string, deviceInfo: DeviceInfo): Promise<Session>
refreshSession(sessionId: string): Promise<Session>
invalidateSession(sessionId: string): Promise<void>
getActiveSessions(userId: string): Promise<Session[]>
```

### 6.2 Authorization Functions

```typescript
// Permissions
getUserPermissions(userId: string, orgId?: string, shopId?: string): Promise<Permissions>
checkPermission(userId: string, permission: string, context?: PermissionContext): Promise<boolean>
hasRole(userId: string, role: string, level: 'org' | 'app'): Promise<boolean>

// Organization
getUserOrganizations(userId: string): Promise<Organization[]>
switchOrganization(userId: string, orgId: string): Promise<Context>
getCurrentContext(userId: string): Promise<Context>
```

---

## 7. Error Handling

### 7.1 Common Errors

**Authentication Errors**:
- `INVALID_CREDENTIALS`: Email/password incorrect
- `PHONE_NOT_VERIFIED`: Phone number not verified
- `ACCOUNT_SUSPENDED`: Account suspended
- `ACCOUNT_LOCKED`: Account locked (too many failed attempts)
- `SESSION_EXPIRED`: Session expired

**Authorization Errors**:
- `PERMISSION_DENIED`: User doesn't have permission
- `ROLE_REQUIRED`: Required role not found
- `ORGANIZATION_NOT_FOUND`: Organization not found
- `SHOP_NOT_FOUND`: Shop not found

---

## 8. Success Metrics

### 8.1 Authentication Metrics

- Registration conversion rate
- Phone number verification rate
- Login success rate
- OAuth usage rate
- Password reset rate

### 8.2 Security Metrics

- Failed login attempts
- Account lockouts
- Suspicious activity detections
- Session hijacking attempts

---

## 9. Implementation Priority

### Current scope
- ✅ Phone number registration
- ✅ Login with Username/Password
- ✅ Login with Phone/OTP
- ✅ Password reset via OTP
- ✅ Basic RBAC
- ✅ Organization switching

### Designed to support
- ✅ OAuth (Google, Facebook)
- ✅ Advanced session management
- ✅ Permission caching

### Designed to support (advanced)
- ✅ Biometric authentication
- ✅ Advanced security features

---

## 10. Dependencies

### 10.1 External Dependencies
- Email service (for verification, password reset)
- SMS service (for OTP)
- OAuth providers (Google, Facebook, etc.)
- Session storage (Redis)

### 10.2 Internal Dependencies
- User Management Module
- Organization Management Module
- Notification Module
- Settings Module

---

## Appendix

### A. Common Authentication Patterns

**JWT Token Pattern**:
- Access token (short-lived, 15 minutes)
- Refresh token (long-lived, 7 days)
- Token rotation on refresh

**Session Cookie Pattern**:
- Session ID in cookie
- Session data in server/Redis
- Session expiration

### B. Security Best Practices

1. **Password Security**:
   - Hash with bcrypt/argon2
   - Salt passwords
   - Enforce strong passwords
   - Rate limit login attempts

2. **Session Security**:
   - Use HTTPS only
   - HttpOnly cookies
   - SameSite cookies
   - Session timeout
   - Token rotation

---

### C. References
- [Project Scope Document](../business_user/project-scope.md)
- [User Structure Document](../business_user/user-structure.md)
- [Team Management Document](../business_user/team-management.md)
- Web Search: Marketplace Authentication Best Practices
