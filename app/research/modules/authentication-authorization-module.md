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
- Email Verification
- Two-Factor Authentication (2FA)
- OAuth Integration
- Role-Based Access Control (RBAC)
- Permission System
- Organization Switching (Multi-ORD)

---

## 2. Common Functions & Features

### 2.1 User Registration

#### 2.1.1 Registration Flow

**Buyer Registration**:
1. กรอกข้อมูลพื้นฐาน (ชื่อ, อีเมล, เบอร์โทร, รหัสผ่าน)
2. ระบุประเภทผู้ใช้ (Individual Consumer, Registered Individual Merchant, Legal Entity)
3. ระบุข้อมูลเพิ่มเติม (อาชีพ, กลุ่มธุรกิจ - optional)
4. ยอมรับ Terms & Conditions
5. Email verification
6. Registration complete

**Seller Registration**:
1. กรอกข้อมูลพื้นฐาน (ชื่อ, อีเมล, เบอร์โทร, รหัสผ่าน)
2. ระบุประเภทผู้ใช้ (Registered Individual Merchant, Legal Entity)
3. ระบุข้อมูลเพิ่มเติม (อาชีพ, กลุ่มธุรกิจ)
4. ยอมรับ Terms & Conditions
5. Email verification
6. KYC process (ถ้าเป็น Legal Entity)
7. Registration complete

#### 2.1.2 Registration Fields

**Common Fields**:
- First Name
- Last Name
- Email (required, unique)
- Phone Number (required, unique)
- Password (min 8 characters, must include uppercase, lowercase, number)
- Confirm Password
- User Type (Buyer/Seller)
- Terms & Conditions (checkbox, required)

**Buyer Additional Fields**:
- Job Role (optional)
- Business Type (optional)
- Interests (optional)

**Seller Additional Fields**:
- Job Role (required)
- Business Type (required)
- Business Registration Number (if applicable)

#### 2.1.3 Validation Rules

**Email**:
- Format validation
- Unique check
- Domain validation (optional)

**Phone Number**:
- Format validation (Thai format: 0XX-XXX-XXXX)
- Unique check
- OTP verification (optional)

**Password**:
- Minimum 8 characters
- Must include: uppercase, lowercase, number
- Special character (optional but recommended)
- Password strength indicator

---

### 2.2 Login & Authentication

#### 2.2.1 Login Methods

**1. Email/Phone + Password**
- Login with email or phone number
- Password authentication
- Remember me option

**2. OAuth Integration**
- Google Login
- Facebook Login
- Apple Login (iOS)
- Line Login (Thailand)

**3. Two-Factor Authentication (2FA)**
- SMS OTP
- Email OTP
- Authenticator App (TOTP)
- Biometric (Mobile - Phase 2)

#### 2.2.2 Login Flow

1. User enters email/phone + password
2. System validates credentials
3. If 2FA enabled → Send OTP
4. User enters OTP
5. System creates session
6. Redirect to appropriate dashboard

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

### 2.4 Email Verification

#### 2.4.1 Verification Flow

1. User registers
2. System sends verification email
3. User clicks verification link
4. Email verified
5. Account activated

**Resend Verification**:
- Can resend verification email
- Rate limiting (max 3 per hour)
- Link expires in 24 hours

#### 2.4.2 Email Verification Status

- **Pending**: Email not verified
- **Verified**: Email verified
- **Expired**: Verification link expired

**Restrictions for Unverified Accounts**:
- Cannot place orders (Buyer)
- Cannot list products (Seller)
- Limited access to features

---

### 2.5 Two-Factor Authentication (2FA)

#### 2.5.1 2FA Setup

**Methods**:
1. **SMS OTP**: Send OTP to phone number
2. **Email OTP**: Send OTP to email
3. **Authenticator App**: TOTP (Google Authenticator, Authy)

**Setup Flow**:
1. User goes to Settings → Security → Enable 2FA
2. Choose 2FA method
3. Verify setup (enter OTP or scan QR code)
4. 2FA enabled
5. Backup codes generated (for recovery)

#### 2.5.2 2FA Usage

**When 2FA is Required**:
- Login (if enabled)
- Password change
- Email change
- Payment method change
- Bank account change
- High-value actions (optional)

**2FA Flow**:
1. User enters password
2. System prompts for 2FA code
3. User enters OTP from SMS/Email/Authenticator
4. System validates OTP
5. Access granted

#### 2.5.3 2FA Recovery

**Recovery Methods**:
- Backup codes (generated during setup)
- Email recovery
- Admin support (manual verification)

---

### 2.6 OAuth Integration

#### 2.6.1 Supported Providers

- **Google**: Google Sign-In
- **Facebook**: Facebook Login
- **Apple**: Sign in with Apple (iOS)
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
- ORG Owner
- ORG Admin
- ORG Member

**Layer 2: Application Level (App)**
- Buyer: Purchaser, Admin, Viewer
- Seller: Product Manager, Order Manager, Viewer

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
- Each ORD has separate:
  - Permissions
  - Team members
  - Settings
  - Data

**Switch Flow**:
1. User clicks organization switcher
2. System shows list of ORDs
3. User selects ORD
4. System switches context
5. UI updates to show ORD-specific data

#### 2.8.2 Context Management

**Current Context**:
- Current ORD
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
  - Can register with email/phone + password
  - Can register with OAuth (Google, Facebook)
  - Must verify email
  - Can specify job role and business type (optional)

**US-AUTH-002: Register as Seller**
- **As a** new user
- **I want to** register as a seller
- **So that** I can sell products
- **Acceptance Criteria**:
  - Can register with email/phone + password
  - Must specify job role and business type
  - Must go through KYC (if Legal Entity)
  - Must verify email

---

### 3.2 Login User Stories

**US-AUTH-003: Login with Email/Password**
- **As a** registered user
- **I want to** login with email and password
- **So that** I can access my account
- **Acceptance Criteria**:
  - Can login with email or phone
  - Must enter correct password
  - If 2FA enabled → Must enter OTP
  - Session created on successful login

**US-AUTH-004: Login with OAuth**
- **As a** user
- **I want to** login with Google/Facebook
- **So that** I can login quickly without password
- **Acceptance Criteria**:
  - Can login with OAuth providers
  - Account created automatically if new
  - Account linked if existing

---

### 3.3 Security User Stories

**US-AUTH-005: Enable 2FA**
- **As a** user
- **I want to** enable 2FA
- **So that** my account is more secure
- **Acceptance Criteria**:
  - Can enable 2FA via SMS/Email/Authenticator
  - Must verify setup
  - Backup codes generated
  - 2FA required on login

**US-AUTH-006: Reset Password**
- **As a** user
- **I want to** reset my password
- **So that** I can regain access if I forget password
- **Acceptance Criteria**:
  - Can request password reset
  - Receive reset link/OTP
  - Can set new password
  - All sessions invalidated

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
- `POST /api/auth/2fa/enable` - Enable 2FA
- `POST /api/auth/2fa/verify` - Verify 2FA
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

**2FA Security**:
- OTP expiration (10 minutes)
- Rate limiting (max 3 attempts)
- Backup codes encryption

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
- KYB required for ORD creation
- Account status affects access

**Organization Management**:
- Organization switching
- Multi-ORD support
- Permission inheritance

**Notification Module**:
- Login notifications
- Password reset notifications
- 2FA notifications
- Security alerts

**Settings Module**:
- Security settings
- 2FA settings
- OAuth account linking

---

## 6. Common Functions Reference

### 6.1 Authentication Functions

```typescript
// Registration
registerUser(data: RegisterData): Promise<User>
verifyEmail(token: string): Promise<boolean>
resendVerificationEmail(email: string): Promise<void>

// Login
login(credentials: LoginCredentials): Promise<Session>
loginWithOAuth(provider: string, code: string): Promise<Session>
logout(sessionId: string): Promise<void>
logoutAll(userId: string): Promise<void>

// Password
requestPasswordReset(email: string): Promise<void>
resetPassword(token: string, newPassword: string): Promise<void>
changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>

// 2FA
enable2FA(userId: string, method: 'sms' | 'email' | 'totp'): Promise<SetupData>
verify2FA(userId: string, code: string): Promise<boolean>
disable2FA(userId: string, password: string): Promise<void>

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
- `EMAIL_NOT_VERIFIED`: Email not verified
- `ACCOUNT_SUSPENDED`: Account suspended
- `ACCOUNT_LOCKED`: Account locked (too many failed attempts)
- `2FA_REQUIRED`: 2FA code required
- `2FA_INVALID`: 2FA code invalid
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
- Email verification rate
- Login success rate
- 2FA adoption rate
- OAuth usage rate
- Password reset rate

### 8.2 Security Metrics

- Failed login attempts
- Account lockouts
- Suspicious activity detections
- 2FA verification success rate
- Session hijacking attempts

---

## 9. Implementation Priority

### Phase 1 (MVP)
- ✅ Email/Password registration
- ✅ Email/Password login
- ✅ Email verification
- ✅ Password reset
- ✅ Basic RBAC
- ✅ Organization switching

### Phase 2
- ✅ 2FA (SMS, Email)
- ✅ OAuth (Google, Facebook)
- ✅ Advanced session management
- ✅ Permission caching

### Phase 3
- ✅ 2FA (Authenticator App)
- ✅ Biometric authentication
- ✅ Advanced security features

---

## 10. Dependencies

### 10.1 External Dependencies
- Email service (for verification, password reset)
- SMS service (for 2FA, OTP)
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

3. **2FA Security**:
   - OTP expiration
   - Rate limiting
   - Backup codes
   - Recovery process

### C. References
- Project Scope Document
- User Structure Document
- Team Management Document
- Web Search: Marketplace Authentication Best Practices
