# Software Requirements Specification: Startup Partner Center

**Document Version**: 1.0  
**Date**: February 25, 2026  
**Product**: Startup Partner Center (Future ACM)  
**Author**: Senior System Architect  
**Status**: Draft for Review  
**References**: PRD v1.0, BRD v1.0  

---

## Executive Summary

This Software Requirements Specification (SRS) translates the product and business requirements defined in the PRD and BRD into implementation-ready technical specifications. It covers functional requirements mapped to API endpoints, role-based access control (RBAC), data models, state machines, analytics events, error handling, non-functional requirements, and acceptance-test scenarios. The document targets engineering, QA, and DevOps teams and serves as the single source of truth for Sprint planning.

---

## 1. Functional Requirements

### 1.1 Authentication & Partner Management

#### SRS-FR-001: Partner Application Submission

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-001, FR-002 |
| **Actor** | Authenticated Allkons user (applicant) |

**Pre-conditions**:
1. User has a verified Allkons account with completed KYC.
2. User does not have an existing active or pending partner application.

**Flow**:
1. System verifies KYC status via Identity Service.
2. User selects primary territory (Province → District).
3. User selects one or more eligible shops within territory.
4. System validates territory-shop coverage compatibility via Shop Coverage Service.
5. User signs PDPA consent via Consent Center API.
6. System creates `partner_application` record with status `PENDING_ADMIN`.
7. System dispatches event `partner.application.submitted`.
8. System sends notification to assigned Allkons Admin queue.

**Post-conditions**:
- Application record persisted with `status = PENDING_ADMIN`.
- Audit log entry created.
- Applicant receives confirmation notification.

**Exceptions**:
| Code | Condition | Response |
|------|-----------|----------|
| E-001 | KYC not verified | 403 – "KYC verification required" |
| E-002 | Duplicate application | 409 – "Active application already exists" |
| E-003 | Territory-shop mismatch | 422 – "Selected shops not in territory coverage" |
| E-004 | Consent not granted | 403 – "PDPA consent required" |

---

#### SRS-FR-002: Admin Approval of Partner Application

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-002 |
| **Actor** | Allkons Admin |

**Pre-conditions**:
1. Application is in status `PENDING_ADMIN`.
2. Actor has `partner.application.review` permission.

**Flow (Approve)**:
1. Admin reviews application details, KYC data, territory, and shop selections.
2. Admin selects `APPROVE`.
3. System transitions application to `PENDING_SHOP_APPROVAL`.
4. System creates `shop_relationship` records for each selected shop with status `PENDING`.
5. System dispatches event `partner.application.admin_approved`.
6. System notifies each selected Shop Owner of pending relationship request.

**Flow (Reject)**:
1. Admin selects `REJECT` and provides reason.
2. System transitions application to `REJECTED`.
3. System dispatches event `partner.application.rejected`.
4. System notifies applicant with rejection reason.

**Post-conditions (Approve)**:
- Application status = `PENDING_SHOP_APPROVAL`.
- One `shop_relationship` record per selected shop, status = `PENDING`.

**Post-conditions (Reject)**:
- Application status = `REJECTED`.
- Rejection reason persisted.

---

#### SRS-FR-003: Shop Owner Approval of Relationship

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-002 |
| **Actor** | Shop Owner |

**Pre-conditions**:
1. `shop_relationship` record exists with status `PENDING`.
2. Actor is owner/admin of the target shop.

**Flow (Approve)**:
1. Shop Owner reviews partner profile and territory.
2. Shop Owner selects `APPROVE`.
3. System transitions `shop_relationship` to `ACTIVE`.
4. System dispatches event `shop.relationship.approved`.
5. If **all** shop relationships for the application are resolved (approved or rejected) **and at least one is ACTIVE**, system transitions application to `APPROVED` and creates `partner_profile` with status `ACTIVE`.
6. System dispatches event `partner.application.fully_approved`.

**Flow (Reject)**:
1. Shop Owner selects `REJECT` with reason.
2. System transitions `shop_relationship` to `REJECTED`.
3. System dispatches event `shop.relationship.rejected`.
4. If all shop relationships are `REJECTED`, system transitions application to `REJECTED`.

**SLA**: Shop Owner must respond within **30 calendar days**. After SLA expiry, system auto-transitions to `EXPIRED` and notifies Admin.

---

#### SRS-FR-004: Territory Management

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-003 |
| **Actor** | Partner, Admin |

**Rules**:
1. Territory is defined as Province + District combination.
2. Partners can request territory changes; changes require Admin re-approval.
3. Shop relationships are validated against territory coverage on every quotation.
4. System enforces that product sourcing only returns shops within partner's active territory.

---

### 1.2 Product Sourcing & Discovery

#### SRS-FR-005: Product Search within Territory

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-004, FR-005 |
| **Actor** | Partner (Team Member, Team Lead) |

**Pre-conditions**:
1. Partner has `ACTIVE` status.
2. Partner has at least one `ACTIVE` shop relationship.

**Flow**:
1. Partner enters search query (keyword, Master SKU ID, or category).
2. System filters Master SKU catalog by:
   - Shops with `ACTIVE` relationship to partner.
   - Shops within partner's assigned territory.
   - Shops with `affiliate_eligible = true`.
3. System returns search results with: product name, Master SKU ID, shop name, unit price, promotion price (if any), availability status.
4. Results are sortable by price, shop, relevance.
5. Partner can add products to comparison basket.

**Performance**: 95th-percentile response ≤ 2 seconds.

---

#### SRS-FR-006: Multi-Shop Price Comparison

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-005 |
| **Actor** | Partner |

**Flow**:
1. Partner selects products in comparison basket.
2. System displays side-by-side comparison per Master SKU across shops.
3. Comparison includes: unit price, bulk price, promotion, availability, delivery estimate.
4. Partner can select preferred shop per line item for quotation.

---

### 1.3 Quotation Management

#### SRS-FR-007: Draft Quotation Creation

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-007 |
| **Actor** | Partner |

**Pre-conditions**:
1. Partner status is `ACTIVE`.
2. Selected products are from shops with `ACTIVE` relationships.

**Flow**:
1. Partner creates new quotation, entering buyer reference info (name, contact).
2. Partner adds line items from sourcing results.
3. If line items span multiple shops, system auto-splits into **sub-quotations** grouped by shop.
4. Partner can adjust quantities and add notes per line item.
5. System calculates subtotals, taxes, and grand total.
6. Partner saves as `DRAFT`.

**Validation Rules**:
- Minimum 1 line item per quotation.
- Quantity must be positive integer.
- Product availability re-validated on save.

---

#### SRS-FR-008: Quotation Submission for Shop Approval

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-008 |
| **Actor** | Partner |

**Pre-conditions**:
1. Quotation status is `DRAFT`.
2. All line items pass availability validation.

**Flow**:
1. Partner submits quotation.
2. System transitions status to `PENDING_SHOP_APPROVAL`.
3. For multi-shop quotations, each sub-quotation is sent to the respective Shop Owner.
4. System dispatches event `quotation.submitted`.
5. SLA timer starts (30 days per sub-quotation).

---

#### SRS-FR-009: Shop Approval of Quotation

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-008 |
| **Actor** | Shop Owner |

**Flow (Approve)**:
1. Shop Owner reviews sub-quotation line items, pricing, quantities.
2. Shop Owner may adjust pricing within allowed tolerance (±5% of listed price).
3. Shop Owner selects `APPROVE`.
4. System transitions sub-quotation to `SHOP_APPROVED`.
5. When all sub-quotations are `SHOP_APPROVED`, parent quotation transitions to `APPROVED`.
6. System dispatches event `quotation.approved`.

**Flow (Request Changes)**:
1. Shop Owner selects `REQUEST_CHANGES` with notes.
2. System transitions sub-quotation to `CHANGES_REQUESTED`.
3. Partner receives notification to revise.

**Flow (Reject)**:
1. Shop Owner selects `REJECT` with reason.
2. Sub-quotation transitions to `SHOP_REJECTED`.
3. If all sub-quotations are rejected, parent quotation transitions to `REJECTED`.

**SLA**: 30 calendar days. Auto-expire to `EXPIRED` if no action.

---

#### SRS-FR-010: Quotation Delivery to Buyer

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-008, FR-009 |
| **Actor** | Partner |

**Pre-conditions**:
1. Quotation status is `APPROVED`.

**Flow**:
1. Partner triggers "Send to Buyer".
2. System generates buyer-facing quotation view with:
   - Shop branding per sub-quotation.
   - Product details, pricing, totals.
   - Payment options (platform / direct).
   - Unique quotation link with tracking token.
3. System transitions quotation to `SENT_TO_BUYER`.
4. System dispatches event `quotation.sent_to_buyer`.
5. Link is shared via partner's preferred channel (Line, email, SMS).

**Link Validity**: 30 days from generation. Configurable by Admin.

---

### 1.4 Buyer Touchpoint

#### SRS-FR-011: Buyer Quotation View

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-009 |
| **Actor** | Buyer (anonymous or authenticated) |

**Flow**:
1. Buyer opens quotation link.
2. System validates link token and expiry.
3. System renders quotation with shop branding.
4. Buyer views line items, pricing, totals per shop.
5. Buyer selects payment mode:
   - **Platform Payment**: Redirect to Allkons M payment gateway.
   - **Direct Payment**: Show bank transfer details + slip upload.

---

#### SRS-FR-012: Platform Payment Flow

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-010 |
| **Actor** | Buyer |

**Flow**:
1. Buyer selects "Pay via Platform".
2. System creates `buyer_order` linked to quotation.
3. Buyer is redirected to Allkons M payment gateway.
4. On payment success callback:
   a. System transitions buyer order to `PAID`.
   b. System transitions quotation to `ORDER_PLACED`.
   c. System creates order in Allkons M Order Management.
   d. System dispatches event `order.placed.platform_payment`.
5. On payment failure:
   a. System transitions buyer order to `PAYMENT_FAILED`.
   b. Buyer may retry.

---

#### SRS-FR-013: Direct Payment with Slip Upload

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-010 |
| **Actor** | Buyer |

**Flow**:
1. Buyer selects "Direct Transfer".
2. System displays bank account details for each shop.
3. Buyer uploads payment slip image per shop.
4. System transitions buyer order to `PENDING_SLIP_VERIFICATION`.
5. Shop Owner receives notification to verify slip.
6. Shop Owner confirms or rejects payment:
   - **Confirm**: Order transitions to `PAID`, quotation to `ORDER_PLACED`.
   - **Reject**: Order transitions to `SLIP_REJECTED`, buyer may re-upload.
7. System dispatches event `order.placed.direct_payment` or `order.slip_rejected`.

**Slip Upload Rules**:
- Accepted formats: JPG, PNG, PDF.
- Max file size: 10 MB.
- Max uploads per order: 3 attempts.

---

#### SRS-FR-014: Order Tracking

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-011 |
| **Actor** | Buyer, Partner |

**Flow**:
1. After order placement, system syncs order status from Allkons M Order Management.
2. Buyer and Partner can view order status: `PROCESSING` → `SHIPPED` → `DELIVERED`.
3. On `DELIVERED` confirmation:
   a. System dispatches event `order.delivered`.
   b. System triggers commission calculation (SRS-FR-016).

---

### 1.5 Team & Performance Management

#### SRS-FR-015: Team Management

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-012 |
| **Actor** | Team Lead |

**Capabilities**:
1. View all Team Members assigned to the Team Lead's group.
2. View aggregated performance metrics: quotations created, conversion rate, commission earned.
3. View individual member activity logs.
4. Export performance reports (CSV, PDF).

**Access Rule**: Team Lead can only view members within their assigned team/territory.

---

### 1.6 Commission Management

#### SRS-FR-016: Commission Calculation

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-013, BRD §4.1 |
| **Actor** | System (automated) |

**Trigger**: `order.delivered` event.

**Calculation Logic**:
```
base_commission = order_value × commission_rate
team_member_share = base_commission × member_split_pct   (default 80%)
team_lead_share   = base_commission × lead_split_pct     (default 15%)
platform_share    = base_commission × platform_split_pct  (default 5%)
```

**Rules**:
1. Commission rate is configurable per shop, category, and partner tier. Default: 4%.
2. Split percentages are configurable by Admin. Defaults above.
3. Commission is only calculated after delivery confirmation.
4. Direct payment orders: commission calculated on verified slip amount.
5. Platform payment orders: commission calculated on settled payment amount.
6. System creates `commission_record` with breakdown and links to order.

**Dispute Handling**:
- Partner can raise dispute within 15 days of commission calculation.
- Admin reviews and resolves; outcome is `APPROVED`, `ADJUSTED`, or `DENIED`.

---

### 1.7 Consent & PDPA Compliance

#### SRS-FR-017: Consent Management

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Source** | PRD FR-015, BRD §6.1 |
| **Actor** | System, Partner, Buyer |

**Consent Points**:

| Consent ID | Trigger Point | Purpose | Required |
|------------|---------------|---------|----------|
| C-001 | Partner registration | Data processing for partner program | Yes |
| C-002 | Quotation sent to buyer | Buyer data sharing with partner | Yes |
| C-003 | Order placement | Transaction data processing | Yes |
| C-004 | Marketing opt-in | Promotional communications | No |

**Integration**: All consent operations route through third-party Consent Center API.

**Flow**:
1. System calls Consent Center `POST /consents` with purpose, user ID, and version.
2. Consent Center returns consent token.
3. System stores consent token reference in local audit log.
4. Before any data access requiring consent, system calls `GET /consents/{userId}/{purposeId}` to validate.
5. On consent withdrawal, system masks/deletes affected data within 30 days.

---

## 2. Role-Based Access Control (RBAC)

### 2.1 Role Definitions

| Role ID | Role Name | Scope | Description |
|---------|-----------|-------|-------------|
| R-001 | `PARTNER_MEMBER` | ORG + Branch | Startup Partner Team Member |
| R-002 | `PARTNER_LEAD` | ORG + Branch | Startup Partner Team Lead (Allkons staff) |
| R-003 | `ALLKONS_ADMIN` | Platform | Allkons platform administrator |
| R-004 | `SHOP_OWNER` | Shop | Shop owner / approver |
| R-005 | `BUYER` | Public | Buyer accessing quotation touchpoint |

### 2.2 Permission Matrix

| Permission | R-001 | R-002 | R-003 | R-004 | R-005 |
|------------|-------|-------|-------|-------|-------|
| `partner.application.submit` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `partner.application.review` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `partner.profile.view_own` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `partner.profile.view_team` | ❌ | ✅ | ✅ | ❌ | ❌ |
| `partner.profile.manage` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `shop.relationship.approve` | ❌ | ❌ | ❌ | ✅ | ❌ |
| `product.search` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `product.compare` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `quotation.create` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `quotation.edit_own` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `quotation.view_own` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `quotation.view_team` | ❌ | ✅ | ✅ | ❌ | ❌ |
| `quotation.approve` | ❌ | ❌ | ❌ | ✅ | ❌ |
| `quotation.send_to_buyer` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `buyer.quotation.view` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `buyer.order.create` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `buyer.payment.submit` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `buyer.slip.upload` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `order.track` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `order.slip.verify` | ❌ | ❌ | ❌ | ✅ | ❌ |
| `commission.view_own` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `commission.view_team` | ❌ | ✅ | ✅ | ❌ | ❌ |
| `commission.manage` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `commission.dispute` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `team.view_members` | ❌ | ✅ | ✅ | ❌ | ❌ |
| `team.manage` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `analytics.view_own` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `analytics.view_team` | ❌ | ✅ | ✅ | ❌ | ❌ |
| `analytics.view_platform` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `consent.manage_own` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `admin.settings.manage` | ❌ | ❌ | ✅ | ❌ | ❌ |

### 2.3 Two-Layer Permission Integration

The Partner Center integrates with the existing Allkons M two-layer permission system:

**Layer 1 – Organization (ORG) Level**:
- Partner ORG roles: `PARTNER_OWNER`, `PARTNER_MANAGER`, `PARTNER_MEMBER`
- ORG-level permissions control partner profile management and team visibility.

**Layer 2 – Application (APP) Level**:
- App roles map to the Role IDs above (R-001 through R-005).
- APP-level permissions control feature access within the Partner Center.

**Resolution Rule**: Effective permission = ORG permission ∩ APP permission. A user must have **both** layers to perform an action.

---

## 3. Data Models

### 3.1 Entity Relationship Overview

```
accounts ─────────┐
                   │ 1:N
                   ▼
          partner_applications ──────┐
                   │ 1:1             │ 1:N
                   ▼                 ▼
          partner_profiles    shop_relationships
                   │ 1:N             │
                   ▼                 │
             quotations ◄────────────┘
                   │ 1:N
                   ▼
          quotation_line_items
                   │
                   ▼
          sub_quotations ────► shop (existing)
                   │ 1:1
                   ▼
            buyer_orders
                   │ 1:N
                   ▼
          payment_slips
                   │
                   ▼
        commission_records
```

### 3.2 Table Definitions

#### 3.2.1 `partner_applications`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, DEFAULT gen_random_uuid() | Application ID |
| `account_id` | UUID | FK → accounts.id, NOT NULL | Applicant's Allkons account |
| `status` | ENUM | NOT NULL, DEFAULT 'PENDING_ADMIN' | Application status |
| `territory_province` | VARCHAR(100) | NOT NULL | Province code |
| `territory_district` | VARCHAR(100) | NOT NULL | District code |
| `admin_reviewer_id` | UUID | FK → accounts.id, NULLABLE | Admin who reviewed |
| `admin_reviewed_at` | TIMESTAMPTZ | NULLABLE | Admin review timestamp |
| `rejection_reason` | TEXT | NULLABLE | Reason if rejected |
| `consent_token` | VARCHAR(255) | NOT NULL | Consent Center reference |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | Last update timestamp |

**Status ENUM**: `PENDING_ADMIN`, `PENDING_SHOP_APPROVAL`, `APPROVED`, `REJECTED`, `EXPIRED`, `WITHDRAWN`

**Indexes**:
- `idx_partner_app_account` ON (account_id)
- `idx_partner_app_status` ON (status)
- `idx_partner_app_territory` ON (territory_province, territory_district)

---

#### 3.2.2 `partner_profiles`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Profile ID |
| `account_id` | UUID | FK → accounts.id, UNIQUE, NOT NULL | Linked account |
| `application_id` | UUID | FK → partner_applications.id, NOT NULL | Source application |
| `org_id` | UUID | FK → organizations.id, NOT NULL | Partner's ORG |
| `status` | ENUM | NOT NULL, DEFAULT 'ACTIVE' | Profile status |
| `tier` | ENUM | NOT NULL, DEFAULT 'ENTRY' | Partner tier |
| `territory_province` | VARCHAR(100) | NOT NULL | Assigned province |
| `territory_district` | VARCHAR(100) | NOT NULL | Assigned district |
| `team_lead_id` | UUID | FK → accounts.id, NULLABLE | Assigned Team Lead |
| `commission_rate_override` | DECIMAL(5,4) | NULLABLE | Custom commission rate |
| `activated_at` | TIMESTAMPTZ | NOT NULL | Activation timestamp |
| `deactivated_at` | TIMESTAMPTZ | NULLABLE | Deactivation timestamp |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Status ENUM**: `ACTIVE`, `SUSPENDED`, `DEACTIVATED`  
**Tier ENUM**: `ENTRY`, `ADVANCED`, `PREMIUM`

**Indexes**:
- `idx_partner_profile_org` ON (org_id)
- `idx_partner_profile_team_lead` ON (team_lead_id)
- `idx_partner_profile_territory` ON (territory_province, territory_district)

---

#### 3.2.3 `shop_relationships`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Relationship ID |
| `partner_profile_id` | UUID | FK → partner_profiles.id, NOT NULL | Partner |
| `application_id` | UUID | FK → partner_applications.id, NOT NULL | Source application |
| `shop_id` | UUID | FK → shops.id, NOT NULL | Target shop |
| `status` | ENUM | NOT NULL, DEFAULT 'PENDING' | Relationship status |
| `relationship_type` | ENUM | NOT NULL, DEFAULT 'STANDARD' | Access level |
| `reviewed_by` | UUID | FK → accounts.id, NULLABLE | Shop reviewer |
| `reviewed_at` | TIMESTAMPTZ | NULLABLE | Review timestamp |
| `rejection_reason` | TEXT | NULLABLE | Reason if rejected |
| `sla_expires_at` | TIMESTAMPTZ | NOT NULL | 30-day SLA deadline |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Status ENUM**: `PENDING`, `ACTIVE`, `REJECTED`, `EXPIRED`, `SUSPENDED`, `TERMINATED`  
**Relationship Type ENUM**: `STANDARD`, `PREFERRED`, `EXCLUSIVE`

**Unique Constraint**: `uq_partner_shop` ON (partner_profile_id, shop_id)

---

#### 3.2.4 `quotations`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Quotation ID |
| `quotation_number` | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable number (QT-YYYYMMDD-XXXX) |
| `partner_profile_id` | UUID | FK → partner_profiles.id, NOT NULL | Creating partner |
| `buyer_name` | VARCHAR(255) | NOT NULL | Buyer reference name |
| `buyer_contact` | VARCHAR(255) | NOT NULL | Buyer contact (phone/email) |
| `buyer_account_id` | UUID | FK → accounts.id, NULLABLE | Linked buyer account (if registered) |
| `status` | ENUM | NOT NULL, DEFAULT 'DRAFT' | Quotation status |
| `subtotal` | DECIMAL(14,2) | NOT NULL, DEFAULT 0 | Sum before tax |
| `tax_amount` | DECIMAL(14,2) | NOT NULL, DEFAULT 0 | Tax amount |
| `grand_total` | DECIMAL(14,2) | NOT NULL, DEFAULT 0 | Final total |
| `currency` | VARCHAR(3) | NOT NULL, DEFAULT 'THB' | Currency code |
| `buyer_link_token` | VARCHAR(64) | UNIQUE, NULLABLE | Secure buyer access token |
| `buyer_link_expires_at` | TIMESTAMPTZ | NULLABLE | Link expiry |
| `notes` | TEXT | NULLABLE | General notes |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Status ENUM**: `DRAFT`, `PENDING_SHOP_APPROVAL`, `CHANGES_REQUESTED`, `APPROVED`, `SENT_TO_BUYER`, `ORDER_PLACED`, `EXPIRED`, `REJECTED`, `CANCELLED`

**Indexes**:
- `idx_quotation_partner` ON (partner_profile_id)
- `idx_quotation_status` ON (status)
- `idx_quotation_buyer_token` ON (buyer_link_token)
- `idx_quotation_created` ON (created_at DESC)

---

#### 3.2.5 `sub_quotations`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Sub-quotation ID |
| `quotation_id` | UUID | FK → quotations.id, NOT NULL | Parent quotation |
| `shop_id` | UUID | FK → shops.id, NOT NULL | Target shop |
| `shop_relationship_id` | UUID | FK → shop_relationships.id, NOT NULL | Active relationship |
| `status` | ENUM | NOT NULL, DEFAULT 'PENDING' | Sub-quotation status |
| `subtotal` | DECIMAL(14,2) | NOT NULL, DEFAULT 0 | Shop subtotal |
| `tax_amount` | DECIMAL(14,2) | NOT NULL, DEFAULT 0 | Shop tax |
| `total` | DECIMAL(14,2) | NOT NULL, DEFAULT 0 | Shop total |
| `shop_notes` | TEXT | NULLABLE | Shop feedback/notes |
| `approved_by` | UUID | FK → accounts.id, NULLABLE | Shop approver |
| `approved_at` | TIMESTAMPTZ | NULLABLE | Approval timestamp |
| `sla_expires_at` | TIMESTAMPTZ | NOT NULL | 30-day SLA deadline |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Status ENUM**: `PENDING`, `SHOP_APPROVED`, `CHANGES_REQUESTED`, `SHOP_REJECTED`, `EXPIRED`

---

#### 3.2.6 `quotation_line_items`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Line item ID |
| `sub_quotation_id` | UUID | FK → sub_quotations.id, NOT NULL | Parent sub-quotation |
| `master_sku_id` | UUID | FK → master_skus.id, NOT NULL | Master SKU reference |
| `store_product_id` | UUID | FK → store_products.id, NOT NULL | Shop's product listing |
| `product_name` | VARCHAR(255) | NOT NULL | Product name snapshot |
| `quantity` | INTEGER | NOT NULL, CHECK > 0 | Ordered quantity |
| `unit_price` | DECIMAL(14,2) | NOT NULL | Price per unit (at time of quotation) |
| `promotion_price` | DECIMAL(14,2) | NULLABLE | Promotional price if applicable |
| `effective_price` | DECIMAL(14,2) | NOT NULL | Final applied price |
| `line_total` | DECIMAL(14,2) | NOT NULL | quantity × effective_price |
| `notes` | TEXT | NULLABLE | Line item notes |
| `sort_order` | INTEGER | NOT NULL, DEFAULT 0 | Display order |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

---

#### 3.2.7 `buyer_orders`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Order ID |
| `quotation_id` | UUID | FK → quotations.id, NOT NULL | Source quotation |
| `sub_quotation_id` | UUID | FK → sub_quotations.id, NOT NULL | Source sub-quotation |
| `buyer_account_id` | UUID | FK → accounts.id, NULLABLE | Buyer account (if registered) |
| `allkons_order_id` | UUID | NULLABLE | Linked Allkons M order ID |
| `payment_mode` | ENUM | NOT NULL | Payment method used |
| `status` | ENUM | NOT NULL, DEFAULT 'PENDING' | Order status |
| `amount` | DECIMAL(14,2) | NOT NULL | Order amount |
| `currency` | VARCHAR(3) | NOT NULL, DEFAULT 'THB' | |
| `paid_at` | TIMESTAMPTZ | NULLABLE | Payment confirmation time |
| `delivered_at` | TIMESTAMPTZ | NULLABLE | Delivery confirmation time |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Payment Mode ENUM**: `PLATFORM`, `DIRECT`  
**Status ENUM**: `PENDING`, `PAID`, `PAYMENT_FAILED`, `PENDING_SLIP_VERIFICATION`, `SLIP_REJECTED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `REFUNDED`

---

#### 3.2.8 `payment_slips`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Slip ID |
| `buyer_order_id` | UUID | FK → buyer_orders.id, NOT NULL | Related order |
| `file_url` | TEXT | NOT NULL | Uploaded file URL |
| `file_type` | VARCHAR(10) | NOT NULL | jpg, png, pdf |
| `file_size_bytes` | INTEGER | NOT NULL, CHECK ≤ 10485760 | Max 10 MB |
| `status` | ENUM | NOT NULL, DEFAULT 'PENDING' | Verification status |
| `verified_by` | UUID | FK → accounts.id, NULLABLE | Verifier |
| `verified_at` | TIMESTAMPTZ | NULLABLE | Verification time |
| `rejection_reason` | TEXT | NULLABLE | Reason if rejected |
| `attempt_number` | INTEGER | NOT NULL, DEFAULT 1, CHECK ≤ 3 | Upload attempt |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Status ENUM**: `PENDING`, `VERIFIED`, `REJECTED`

---

#### 3.2.9 `commission_records`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Commission ID |
| `buyer_order_id` | UUID | FK → buyer_orders.id, NOT NULL | Source order |
| `partner_profile_id` | UUID | FK → partner_profiles.id, NOT NULL | Earning partner |
| `order_value` | DECIMAL(14,2) | NOT NULL | Order value for commission |
| `commission_rate` | DECIMAL(5,4) | NOT NULL | Applied rate (e.g. 0.0400) |
| `base_commission` | DECIMAL(14,2) | NOT NULL | order_value × commission_rate |
| `member_share` | DECIMAL(14,2) | NOT NULL | Team Member portion |
| `lead_share` | DECIMAL(14,2) | NOT NULL | Team Lead portion |
| `platform_share` | DECIMAL(14,2) | NOT NULL | Platform portion |
| `member_split_pct` | DECIMAL(5,4) | NOT NULL | Split % for member |
| `lead_split_pct` | DECIMAL(5,4) | NOT NULL | Split % for lead |
| `platform_split_pct` | DECIMAL(5,4) | NOT NULL | Split % for platform |
| `status` | ENUM | NOT NULL, DEFAULT 'CALCULATED' | Commission status |
| `payment_mode` | ENUM | NOT NULL | Source payment mode |
| `disputed_at` | TIMESTAMPTZ | NULLABLE | Dispute raised time |
| `dispute_reason` | TEXT | NULLABLE | |
| `dispute_resolution` | TEXT | NULLABLE | Admin resolution notes |
| `resolved_at` | TIMESTAMPTZ | NULLABLE | |
| `paid_at` | TIMESTAMPTZ | NULLABLE | Payout time |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Status ENUM**: `CALCULATED`, `APPROVED`, `DISPUTED`, `ADJUSTED`, `PAID`, `CANCELLED`

---

#### 3.2.10 `consent_audit_log`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Log entry ID |
| `account_id` | UUID | FK → accounts.id, NOT NULL | User |
| `consent_id` | VARCHAR(50) | NOT NULL | Consent purpose ID (C-001, etc.) |
| `consent_token` | VARCHAR(255) | NOT NULL | Consent Center token |
| `action` | ENUM | NOT NULL | GRANTED, WITHDRAWN |
| `consent_version` | VARCHAR(20) | NOT NULL | Policy version |
| `ip_address` | INET | NULLABLE | User IP |
| `user_agent` | TEXT | NULLABLE | Browser/device info |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

---

#### 3.2.11 `analytics_events`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Event ID |
| `event_name` | VARCHAR(100) | NOT NULL | Event type name |
| `actor_id` | UUID | NULLABLE | User who triggered |
| `actor_role` | VARCHAR(50) | NULLABLE | Role at time of event |
| `entity_type` | VARCHAR(50) | NOT NULL | e.g. quotation, order |
| `entity_id` | UUID | NOT NULL | Entity reference |
| `metadata` | JSONB | NOT NULL, DEFAULT '{}' | Event-specific data |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |

**Index**: `idx_analytics_event_name_created` ON (event_name, created_at DESC)

---

## 4. API Endpoints

### 4.1 Base URL & Conventions

- **Base URL**: `https://api.allkons.com/v1/partner-center`
- **Authentication**: Bearer JWT token (Allkons Identity Service)
- **Content-Type**: `application/json`
- **Pagination**: Cursor-based via `?cursor=<id>&limit=<n>` (default limit=20, max=100)
- **Rate Limiting**: 100 requests/minute per authenticated user
- **Versioning**: URL path versioning (`/v1/`)

### 4.2 Partner Application APIs

#### POST `/applications`
Submit a new partner application.

| Attribute | Value |
|-----------|-------|
| **Permission** | `partner.application.submit` |
| **Rate Limit** | 5/hour |

**Request Body**:
```json
{
  "territory_province": "string (required)",
  "territory_district": "string (required)",
  "shop_ids": ["uuid (required, min 1)"],
  "consent_token": "string (required)"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "status": "PENDING_ADMIN",
  "territory_province": "string",
  "territory_district": "string",
  "shop_ids": ["uuid"],
  "created_at": "ISO 8601"
}
```

**Error Responses**: 403 (E-001, E-004), 409 (E-002), 422 (E-003)

---

#### GET `/applications`
List applications (Admin: all pending; Applicant: own).

| Attribute | Value |
|-----------|-------|
| **Permission** | `partner.application.submit` OR `partner.application.review` |

**Query Parameters**: `?status=PENDING_ADMIN&cursor=<id>&limit=20`

**Response 200**:
```json
{
  "data": [{ "id": "uuid", "account_id": "uuid", "status": "string", ... }],
  "cursor": "uuid|null",
  "total": "integer"
}
```

---

#### GET `/applications/{id}`
Get application details.

| Attribute | Value |
|-----------|-------|
| **Permission** | Owner or `partner.application.review` |

---

#### POST `/applications/{id}/review`
Admin approve or reject application.

| Attribute | Value |
|-----------|-------|
| **Permission** | `partner.application.review` |

**Request Body**:
```json
{
  "decision": "APPROVE | REJECT (required)",
  "reason": "string (required if REJECT)"
}
```

**Response 200**: Updated application object.

---

### 4.3 Shop Relationship APIs

#### GET `/shop-relationships`
List shop relationships for partner or shop owner.

| Attribute | Value |
|-----------|-------|
| **Permission** | `partner.profile.view_own` OR `shop.relationship.approve` |

**Query Parameters**: `?status=PENDING&shop_id=<uuid>&cursor=<id>&limit=20`

---

#### POST `/shop-relationships/{id}/review`
Shop owner approve or reject relationship.

| Attribute | Value |
|-----------|-------|
| **Permission** | `shop.relationship.approve` |

**Request Body**:
```json
{
  "decision": "APPROVE | REJECT (required)",
  "reason": "string (required if REJECT)"
}
```

---

### 4.4 Product Sourcing APIs

#### GET `/products/search`
Search products from eligible shops.

| Attribute | Value |
|-----------|-------|
| **Permission** | `product.search` |

**Query Parameters**:
```
?q=<keyword>
&category_id=<uuid>
&master_sku_id=<uuid>
&shop_id=<uuid>
&sort_by=price|relevance|shop
&sort_order=asc|desc
&cursor=<id>
&limit=20
```

**Response 200**:
```json
{
  "data": [
    {
      "master_sku_id": "uuid",
      "store_product_id": "uuid",
      "product_name": "string",
      "shop_id": "uuid",
      "shop_name": "string",
      "unit_price": "decimal",
      "promotion_price": "decimal|null",
      "availability": "IN_STOCK | LOW_STOCK | OUT_OF_STOCK",
      "category": "string"
    }
  ],
  "cursor": "uuid|null"
}
```

---

#### POST `/products/compare`
Compare products across shops.

| Attribute | Value |
|-----------|-------|
| **Permission** | `product.compare` |

**Request Body**:
```json
{
  "master_sku_ids": ["uuid (required, max 10)"]
}
```

**Response 200**:
```json
{
  "comparisons": [
    {
      "master_sku_id": "uuid",
      "product_name": "string",
      "shops": [
        {
          "shop_id": "uuid",
          "shop_name": "string",
          "unit_price": "decimal",
          "promotion_price": "decimal|null",
          "bulk_price": "decimal|null",
          "availability": "string",
          "delivery_estimate_days": "integer"
        }
      ]
    }
  ]
}
```

---

### 4.5 Quotation APIs

#### POST `/quotations`
Create draft quotation.

| Attribute | Value |
|-----------|-------|
| **Permission** | `quotation.create` |

**Request Body**:
```json
{
  "buyer_name": "string (required)",
  "buyer_contact": "string (required)",
  "notes": "string (optional)",
  "line_items": [
    {
      "store_product_id": "uuid (required)",
      "master_sku_id": "uuid (required)",
      "quantity": "integer (required, > 0)",
      "notes": "string (optional)"
    }
  ]
}
```

**Response 201**: Quotation object with auto-generated sub-quotations grouped by shop.

---

#### GET `/quotations`
List quotations.

| Attribute | Value |
|-----------|-------|
| **Permission** | `quotation.view_own` OR `quotation.view_team` |

**Query Parameters**: `?status=DRAFT&cursor=<id>&limit=20`

---

#### GET `/quotations/{id}`
Get quotation details with sub-quotations and line items.

---

#### PATCH `/quotations/{id}`
Update draft quotation (add/remove/update line items).

| Attribute | Value |
|-----------|-------|
| **Permission** | `quotation.edit_own` |
| **Constraint** | Only when status = `DRAFT` or `CHANGES_REQUESTED` |

---

#### POST `/quotations/{id}/submit`
Submit quotation for shop approval.

| Attribute | Value |
|-----------|-------|
| **Permission** | `quotation.edit_own` |
| **Constraint** | Only when status = `DRAFT` |

**Response 200**: Quotation with status `PENDING_SHOP_APPROVAL`.

---

#### POST `/quotations/{id}/sub-quotations/{subId}/review`
Shop owner reviews sub-quotation.

| Attribute | Value |
|-----------|-------|
| **Permission** | `quotation.approve` |

**Request Body**:
```json
{
  "decision": "APPROVE | REQUEST_CHANGES | REJECT (required)",
  "notes": "string (optional)",
  "price_adjustments": [
    {
      "line_item_id": "uuid",
      "adjusted_price": "decimal"
    }
  ]
}
```

---

#### POST `/quotations/{id}/send-to-buyer`
Generate buyer link and transition to SENT_TO_BUYER.

| Attribute | Value |
|-----------|-------|
| **Permission** | `quotation.send_to_buyer` |
| **Constraint** | Only when status = `APPROVED` |

**Response 200**:
```json
{
  "buyer_link": "https://allkons.com/q/<token>",
  "expires_at": "ISO 8601"
}
```

---

### 4.6 Buyer Touchpoint APIs (Public)

#### GET `/buyer/quotations/{token}`
View quotation via buyer link. **No authentication required**.

**Response 200**: Buyer-facing quotation with shop branding, line items, totals, and payment options.

**Error**: 404 (invalid token), 410 (expired link).

---

#### POST `/buyer/orders`
Create buyer order from quotation.

**Request Body**:
```json
{
  "quotation_token": "string (required)",
  "sub_quotation_id": "uuid (required)",
  "payment_mode": "PLATFORM | DIRECT (required)"
}
```

**Response 201**: Order object with payment instructions.

---

#### POST `/buyer/orders/{id}/slips`
Upload payment slip for direct payment.

| Attribute | Value |
|-----------|-------|
| **Content-Type** | `multipart/form-data` |
| **Max Size** | 10 MB |

**Form Fields**: `file` (required, JPG/PNG/PDF)

---

#### POST `/buyer/orders/{id}/slips/{slipId}/verify`
Shop owner verifies payment slip.

| Attribute | Value |
|-----------|-------|
| **Permission** | `order.slip.verify` |

**Request Body**:
```json
{
  "decision": "VERIFY | REJECT (required)",
  "reason": "string (required if REJECT)"
}
```

---

#### GET `/buyer/orders/{id}/tracking`
Get order tracking status.

---

### 4.7 Commission APIs

#### GET `/commissions`
List commissions for partner or team.

| Attribute | Value |
|-----------|-------|
| **Permission** | `commission.view_own` OR `commission.view_team` |

**Query Parameters**: `?status=CALCULATED&from=<date>&to=<date>&cursor=<id>&limit=20`

---

#### GET `/commissions/{id}`
Get commission details.

---

#### POST `/commissions/{id}/dispute`
Raise commission dispute.

| Attribute | Value |
|-----------|-------|
| **Permission** | `commission.dispute` |
| **Constraint** | Within 15 days of calculation |

**Request Body**:
```json
{
  "reason": "string (required)"
}
```

---

#### POST `/commissions/{id}/resolve`
Admin resolves commission dispute.

| Attribute | Value |
|-----------|-------|
| **Permission** | `commission.manage` |

**Request Body**:
```json
{
  "resolution": "APPROVED | ADJUSTED | DENIED (required)",
  "notes": "string (required)",
  "adjusted_amount": "decimal (required if ADJUSTED)"
}
```

---

### 4.8 Team Management APIs

#### GET `/teams/members`
List team members (Team Lead / Admin).

| Attribute | Value |
|-----------|-------|
| **Permission** | `team.view_members` |

---

#### GET `/teams/performance`
Aggregated team performance metrics.

| Attribute | Value |
|-----------|-------|
| **Permission** | `analytics.view_team` |

**Query Parameters**: `?from=<date>&to=<date>&member_id=<uuid>`

**Response 200**:
```json
{
  "period": { "from": "date", "to": "date" },
  "metrics": {
    "total_quotations": "integer",
    "total_orders": "integer",
    "conversion_rate": "decimal",
    "total_commission": "decimal",
    "active_members": "integer"
  },
  "members": [
    {
      "partner_profile_id": "uuid",
      "name": "string",
      "quotations_created": "integer",
      "orders_converted": "integer",
      "commission_earned": "decimal"
    }
  ]
}
```

---

#### GET `/teams/performance/export`
Export performance report.

| Attribute | Value |
|-----------|-------|
| **Permission** | `analytics.view_team` |

**Query Parameters**: `?format=csv|pdf&from=<date>&to=<date>`

---

### 4.9 Admin APIs

#### GET `/admin/dashboard`
Platform-wide analytics dashboard.

| Attribute | Value |
|-----------|-------|
| **Permission** | `analytics.view_platform` |

---

#### PATCH `/admin/settings/commission`
Update commission configuration.

| Attribute | Value |
|-----------|-------|
| **Permission** | `admin.settings.manage` |

**Request Body**:
```json
{
  "default_rate": "decimal",
  "member_split_pct": "decimal",
  "lead_split_pct": "decimal",
  "platform_split_pct": "decimal",
  "category_overrides": [
    { "category_id": "uuid", "rate": "decimal" }
  ]
}
```

---

### 4.10 API Summary Table

| # | Method | Endpoint | Permission | Description |
|---|--------|----------|------------|-------------|
| 1 | POST | `/applications` | `partner.application.submit` | Submit partner application |
| 2 | GET | `/applications` | submit OR review | List applications |
| 3 | GET | `/applications/{id}` | Owner or review | Get application details |
| 4 | POST | `/applications/{id}/review` | `partner.application.review` | Admin review application |
| 5 | GET | `/shop-relationships` | view_own OR approve | List shop relationships |
| 6 | POST | `/shop-relationships/{id}/review` | `shop.relationship.approve` | Shop review relationship |
| 7 | GET | `/products/search` | `product.search` | Search products |
| 8 | POST | `/products/compare` | `product.compare` | Compare across shops |
| 9 | POST | `/quotations` | `quotation.create` | Create quotation |
| 10 | GET | `/quotations` | view_own OR view_team | List quotations |
| 11 | GET | `/quotations/{id}` | view_own OR view_team | Get quotation details |
| 12 | PATCH | `/quotations/{id}` | `quotation.edit_own` | Update draft quotation |
| 13 | POST | `/quotations/{id}/submit` | `quotation.edit_own` | Submit for approval |
| 14 | POST | `/quotations/{id}/sub-quotations/{subId}/review` | `quotation.approve` | Shop review sub-quotation |
| 15 | POST | `/quotations/{id}/send-to-buyer` | `quotation.send_to_buyer` | Send to buyer |
| 16 | GET | `/buyer/quotations/{token}` | Public | Buyer view quotation |
| 17 | POST | `/buyer/orders` | Public | Create buyer order |
| 18 | POST | `/buyer/orders/{id}/slips` | Public | Upload payment slip |
| 19 | POST | `/buyer/orders/{id}/slips/{slipId}/verify` | `order.slip.verify` | Verify slip |
| 20 | GET | `/buyer/orders/{id}/tracking` | Public | Order tracking |
| 21 | GET | `/commissions` | view_own OR view_team | List commissions |
| 22 | GET | `/commissions/{id}` | view_own OR view_team | Get commission details |
| 23 | POST | `/commissions/{id}/dispute` | `commission.dispute` | Raise dispute |
| 24 | POST | `/commissions/{id}/resolve` | `commission.manage` | Resolve dispute |
| 25 | GET | `/teams/members` | `team.view_members` | List team members |
| 26 | GET | `/teams/performance` | `analytics.view_team` | Team performance |
| 27 | GET | `/teams/performance/export` | `analytics.view_team` | Export report |
| 28 | GET | `/admin/dashboard` | `analytics.view_platform` | Admin dashboard |
| 29 | PATCH | `/admin/settings/commission` | `admin.settings.manage` | Update commission settings |

---

## 5. State Machines

### 5.1 Partner Application State Machine

```
                    ┌──────────────┐
                    │  PENDING_ADMIN│
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │ APPROVE    │            │ REJECT
              ▼            │            ▼
   ┌──────────────────┐   │    ┌──────────┐
   │PENDING_SHOP_      │   │    │ REJECTED │
   │APPROVAL           │   │    └──────────┘
   └────────┬─────────┘   │
            │              │
  ┌─────────┼──────────┐  │
  │All shops │ All shops│  │
  │resolved  │ rejected │  │
  │(≥1 active)│         │  │
  ▼          ▼          │  │
┌────────┐ ┌──────────┐│  │
│APPROVED│ │ REJECTED ││  │
└────────┘ └──────────┘│  │
                        │  │
              ┌─────────┘  │
              │ SLA expired │
              ▼            │
         ┌─────────┐      │
         │ EXPIRED │      │
         └─────────┘      │
                           │
              ┌────────────┘
              │ User withdraws
              ▼
         ┌───────────┐
         │ WITHDRAWN │
         └───────────┘
```

**Transitions**:

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `PENDING_ADMIN` | `PENDING_SHOP_APPROVAL` | Admin approves | Admin has review permission |
| `PENDING_ADMIN` | `REJECTED` | Admin rejects | Reason provided |
| `PENDING_ADMIN` | `WITHDRAWN` | Applicant withdraws | Owner of application |
| `PENDING_SHOP_APPROVAL` | `APPROVED` | All shops resolved, ≥1 active | Automatic |
| `PENDING_SHOP_APPROVAL` | `REJECTED` | All shops rejected | Automatic |
| `PENDING_SHOP_APPROVAL` | `EXPIRED` | SLA exceeded (30 days) | Scheduled job |

---

### 5.2 Shop Relationship State Machine

```
  ┌─────────┐
  │ PENDING │
  └────┬────┘
       │
  ┌────┼────────┐──────────┐
  │APPROVE     │REJECT    │SLA EXPIRED
  ▼            ▼          ▼
┌────────┐ ┌──────────┐ ┌─────────┐
│ ACTIVE │ │ REJECTED │ │ EXPIRED │
└───┬────┘ └──────────┘ └─────────┘
    │
  ┌─┼──────────┐
  │SUSPEND     │TERMINATE
  ▼            ▼
┌───────────┐ ┌────────────┐
│ SUSPENDED │ │ TERMINATED │
└─────┬─────┘ └────────────┘
      │
      │REACTIVATE
      ▼
   ┌────────┐
   │ ACTIVE │
   └────────┘
```

**Transitions**:

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `PENDING` | `ACTIVE` | Shop Owner approves | Shop has approve permission |
| `PENDING` | `REJECTED` | Shop Owner rejects | Reason provided |
| `PENDING` | `EXPIRED` | 30-day SLA exceeded | Scheduled job |
| `ACTIVE` | `SUSPENDED` | Admin or Shop suspends | Compliance issue |
| `ACTIVE` | `TERMINATED` | Admin or Shop terminates | |
| `SUSPENDED` | `ACTIVE` | Admin reactivates | Issue resolved |

---

### 5.3 Quotation Lifecycle State Machine

```
  ┌───────┐
  │ DRAFT │
  └───┬───┘
      │ SUBMIT
      ▼
  ┌────────────────────┐
  │PENDING_SHOP_APPROVAL│
  └───────┬────────────┘
          │
   ┌──────┼──────────┬─────────────┐
   │ALL    │CHANGES   │ALL          │SLA
   │APPROVED│REQUESTED │REJECTED     │EXPIRED
   ▼       ▼          ▼             ▼
┌────────┐┌──────────┐┌──────────┐┌─────────┐
│APPROVED││CHANGES_  ││ REJECTED ││ EXPIRED │
│        ││REQUESTED │└──────────┘└─────────┘
└───┬────┘└────┬─────┘
    │          │ RE-SUBMIT
    │          └──► PENDING_SHOP_APPROVAL
    │ SEND TO BUYER
    ▼
┌──────────────┐
│SENT_TO_BUYER │
└──────┬───────┘
       │ ORDER PLACED
       ▼
┌──────────────┐
│ ORDER_PLACED │
└──────────────┘

  Any non-terminal state ──► CANCELLED (by partner or admin)
```

**Transitions**:

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `DRAFT` | `PENDING_SHOP_APPROVAL` | Partner submits | ≥1 line item, availability valid |
| `DRAFT` | `CANCELLED` | Partner cancels | Owner |
| `PENDING_SHOP_APPROVAL` | `APPROVED` | All sub-quotations approved | Automatic |
| `PENDING_SHOP_APPROVAL` | `CHANGES_REQUESTED` | Any sub-quotation requests changes | Automatic |
| `PENDING_SHOP_APPROVAL` | `REJECTED` | All sub-quotations rejected | Automatic |
| `PENDING_SHOP_APPROVAL` | `EXPIRED` | SLA exceeded | Scheduled job |
| `CHANGES_REQUESTED` | `PENDING_SHOP_APPROVAL` | Partner re-submits | Revisions made |
| `APPROVED` | `SENT_TO_BUYER` | Partner sends to buyer | Generates link |
| `APPROVED` | `EXPIRED` | Link validity exceeded | Scheduled job |
| `SENT_TO_BUYER` | `ORDER_PLACED` | Buyer completes payment | Payment confirmed |
| `SENT_TO_BUYER` | `EXPIRED` | Buyer link expires | Scheduled job |

---

### 5.4 Buyer Order State Machine

```
  ┌─────────┐
  │ PENDING │
  └────┬────┘
       │
  ┌────┴────────────────────┐
  │ PLATFORM                │ DIRECT
  ▼                         ▼
┌──────┐              ┌─────────────────────┐
│ PAID │              │PENDING_SLIP_         │
└──┬───┘              │VERIFICATION          │
   │                  └────────┬─────────────┘
   │                      ┌────┴────┐
   │                      │VERIFY   │REJECT
   │                      ▼         ▼
   │                  ┌──────┐  ┌──────────────┐
   │                  │ PAID │  │SLIP_REJECTED │
   │                  └──┬───┘  └──────┬───────┘
   │                     │             │RE-UPLOAD (≤3)
   │                     │             └──► PENDING_SLIP_VERIFICATION
   ├─────────────────────┘
   │
   ▼
┌────────────┐
│ PROCESSING │
└─────┬──────┘
      │
      ▼
┌──────────┐
│ SHIPPED  │
└─────┬────┘
      │
      ▼
┌───────────┐
│ DELIVERED │ ──► triggers commission calculation
└───────────┘

  Any non-terminal ──► CANCELLED
  DELIVERED ──► REFUNDED (exception)
```

**Transitions**:

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `PENDING` | `PAID` | Platform payment success | Payment gateway callback |
| `PENDING` | `PAYMENT_FAILED` | Platform payment fails | Gateway callback |
| `PENDING` | `PENDING_SLIP_VERIFICATION` | Buyer uploads slip | Direct payment mode |
| `PENDING_SLIP_VERIFICATION` | `PAID` | Shop verifies slip | Shop has verify permission |
| `PENDING_SLIP_VERIFICATION` | `SLIP_REJECTED` | Shop rejects slip | Reason provided |
| `SLIP_REJECTED` | `PENDING_SLIP_VERIFICATION` | Buyer re-uploads | attempt ≤ 3 |
| `PAID` | `PROCESSING` | Order created in Allkons M | Automatic |
| `PROCESSING` | `SHIPPED` | Shipping confirmed | Allkons M order sync |
| `SHIPPED` | `DELIVERED` | Delivery confirmed | Allkons M order sync |
| `DELIVERED` | `REFUNDED` | Refund processed | Admin action |

---

### 5.5 Commission Record State Machine

```
  ┌────────────┐
  │ CALCULATED │
  └─────┬──────┘
        │
   ┌────┴────┐
   │APPROVE  │DISPUTE
   ▼         ▼
┌──────────┐ ┌───────────┐
│ APPROVED │ │ DISPUTED  │
└────┬─────┘ └─────┬─────┘
     │              │
     │         ┌────┴────────┐──────────┐
     │         │APPROVE      │ADJUST    │DENY
     │         ▼             ▼          ▼
     │    ┌──────────┐ ┌──────────┐ ┌───────────┐
     │    │ APPROVED │ │ ADJUSTED │ │ CANCELLED │
     │    └────┬─────┘ └────┬─────┘ └───────────┘
     │         │            │
     ├─────────┴────────────┘
     │
     │ PAYOUT
     ▼
  ┌──────┐
  │ PAID │
  └──────┘
```

**Transitions**:

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `CALCULATED` | `APPROVED` | Auto-approve after 15-day window | No dispute raised |
| `CALCULATED` | `DISPUTED` | Partner raises dispute | Within 15 days |
| `DISPUTED` | `APPROVED` | Admin approves original | Admin resolves |
| `DISPUTED` | `ADJUSTED` | Admin adjusts amount | Admin resolves |
| `DISPUTED` | `CANCELLED` | Admin denies | Admin resolves |
| `APPROVED` | `PAID` | Commission payout processed | Payout batch |
| `ADJUSTED` | `PAID` | Commission payout processed | Payout batch |

---

## 6. Analytics Event Taxonomy

### 6.1 Event Schema

All events follow a standard schema:

```json
{
  "event_name": "string",
  "timestamp": "ISO 8601",
  "actor_id": "uuid",
  "actor_role": "string",
  "entity_type": "string",
  "entity_id": "uuid",
  "metadata": {}
}
```

### 6.2 Event Catalog

#### Partner Lifecycle Events

| Event Name | Entity Type | Trigger | KPI Impact |
|------------|-------------|---------|------------|
| `partner.application.submitted` | application | FR-001 | Partner Acquisition Rate |
| `partner.application.admin_approved` | application | FR-002 | Admin Approval Rate |
| `partner.application.rejected` | application | FR-002 | Rejection Rate |
| `partner.application.fully_approved` | application | FR-003 | Activation Rate |
| `partner.application.expired` | application | SLA job | SLA Compliance |
| `partner.profile.activated` | profile | FR-003 | Time to Activation |
| `partner.profile.suspended` | profile | Admin | Compliance Rate |
| `partner.profile.deactivated` | profile | Admin | Retention Rate |

#### Shop Relationship Events

| Event Name | Entity Type | Trigger | KPI Impact |
|------------|-------------|---------|------------|
| `shop.relationship.requested` | relationship | FR-001 | Shop Outreach Rate |
| `shop.relationship.approved` | relationship | FR-003 | Shop Approval Rate |
| `shop.relationship.rejected` | relationship | FR-003 | Shop Rejection Rate |
| `shop.relationship.expired` | relationship | SLA job | SLA Compliance |
| `shop.relationship.suspended` | relationship | Admin/Shop | Relationship Health |
| `shop.relationship.terminated` | relationship | Admin/Shop | Churn Rate |

#### Quotation Events

| Event Name | Entity Type | Trigger | KPI Impact |
|------------|-------------|---------|------------|
| `quotation.created` | quotation | FR-007 | Quotation Volume |
| `quotation.submitted` | quotation | FR-008 | Submission Rate |
| `quotation.shop_approved` | sub_quotation | FR-009 | Shop Approval Rate |
| `quotation.shop_rejected` | sub_quotation | FR-009 | Shop Rejection Rate |
| `quotation.changes_requested` | sub_quotation | FR-009 | Revision Rate |
| `quotation.approved` | quotation | FR-009 | Approval Rate |
| `quotation.sent_to_buyer` | quotation | FR-010 | Delivery Rate |
| `quotation.expired` | quotation | SLA job | Expiry Rate |
| `quotation.cancelled` | quotation | Partner | Cancellation Rate |

#### Buyer Touchpoint Events (Conversion Funnel)

| Event Name | Entity Type | Trigger | KPI Impact |
|------------|-------------|---------|------------|
| `buyer.quotation.viewed` | quotation | FR-011 | View Rate |
| `buyer.payment_mode.selected` | order | FR-011 | Payment Preference |
| `buyer.order.created` | order | FR-012/013 | Order Creation Rate |
| `buyer.payment.completed` | order | FR-012 | Platform Payment Rate |
| `buyer.slip.uploaded` | slip | FR-013 | Slip Upload Rate |
| `buyer.slip.verified` | slip | FR-013 | Verification Rate |
| `buyer.slip.rejected` | slip | FR-013 | Rejection Rate |
| `order.placed.platform_payment` | order | FR-012 | Platform GMV |
| `order.placed.direct_payment` | order | FR-013 | Direct GMV |
| `order.delivered` | order | FR-014 | Delivery Rate |

#### Commission Events

| Event Name | Entity Type | Trigger | KPI Impact |
|------------|-------------|---------|------------|
| `commission.calculated` | commission | FR-016 | Commission Volume |
| `commission.disputed` | commission | FR-016 | Dispute Rate |
| `commission.resolved` | commission | FR-016 | Resolution Rate |
| `commission.paid` | commission | Payout | Payout Rate |

### 6.3 Attribution Tracking

Each `quotation.sent_to_buyer` event includes attribution metadata:

```json
{
  "metadata": {
    "partner_profile_id": "uuid",
    "team_lead_id": "uuid",
    "territory": "province/district",
    "shop_ids": ["uuid"],
    "quotation_value": "decimal",
    "line_item_count": "integer",
    "source_channel": "line | email | sms | other"
  }
}
```

### 6.4 Conversion Funnel Definition

```
[quotation.sent_to_buyer]
        │
        ▼
[buyer.quotation.viewed]          ── View Rate
        │
        ▼
[buyer.payment_mode.selected]     ── Engagement Rate
        │
        ▼
[buyer.order.created]             ── Order Rate
        │
        ▼
[buyer.payment.completed          ── Payment Rate
 OR buyer.slip.verified]
        │
        ▼
[order.delivered]                 ── Delivery Rate
        │
        ▼
[commission.calculated]           ── Commission Rate
```

---

## 7. Error Handling

### 7.1 Error Response Format

All API errors follow a standard format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {},
    "request_id": "uuid",
    "timestamp": "ISO 8601"
  }
}
```

### 7.2 Error Code Catalog

#### Authentication & Authorization Errors (4xx)

| Code | HTTP | Message | Resolution |
|------|------|---------|------------|
| `AUTH_001` | 401 | Token expired or invalid | Re-authenticate |
| `AUTH_002` | 403 | Insufficient permissions | Check role assignment |
| `AUTH_003` | 403 | KYC verification required | Complete KYC process |
| `AUTH_004` | 403 | Partner profile not active | Contact admin |
| `AUTH_005` | 403 | PDPA consent required | Grant consent |

#### Validation Errors (422)

| Code | HTTP | Message | Resolution |
|------|------|---------|------------|
| `VAL_001` | 422 | Territory-shop coverage mismatch | Select shops within territory |
| `VAL_002` | 422 | Product not available | Choose different product/shop |
| `VAL_003` | 422 | Quantity exceeds available stock | Reduce quantity |
| `VAL_004` | 422 | Price adjustment exceeds tolerance (±5%) | Adjust within limits |
| `VAL_005` | 422 | Slip file format not accepted | Upload JPG, PNG, or PDF |
| `VAL_006` | 422 | Slip file size exceeds 10 MB | Reduce file size |
| `VAL_007` | 422 | Maximum slip upload attempts reached | Contact support |
| `VAL_008` | 422 | Dispute window expired (15 days) | Contact support |

#### Conflict Errors (409)

| Code | HTTP | Message | Resolution |
|------|------|---------|------------|
| `CON_001` | 409 | Active application already exists | Check existing application |
| `CON_002` | 409 | Shop relationship already exists | Check existing relationship |
| `CON_003` | 409 | Invalid status transition | Check current status |

#### Resource Errors (404/410)

| Code | HTTP | Message | Resolution |
|------|------|---------|------------|
| `RES_001` | 404 | Resource not found | Verify ID |
| `RES_002` | 410 | Quotation link expired | Request new quotation |
| `RES_003` | 410 | SLA deadline exceeded | Re-apply or re-submit |

#### Integration Errors (502/503)

| Code | HTTP | Message | Resolution |
|------|------|---------|------------|
| `INT_001` | 502 | Identity Service unavailable | Retry with backoff |
| `INT_002` | 502 | Consent Center API error | Retry with backoff |
| `INT_003` | 502 | Payment Gateway error | Retry or use alternative |
| `INT_004` | 502 | Order Management sync failed | Automatic retry queued |
| `INT_005` | 503 | Service temporarily unavailable | Retry after cooldown |

### 7.3 Retry & Circuit Breaker Policy

| Integration | Max Retries | Backoff | Circuit Breaker Threshold |
|-------------|-------------|---------|--------------------------|
| Identity Service | 3 | Exponential (1s, 2s, 4s) | 5 failures in 60s → open 30s |
| Consent Center | 3 | Exponential (1s, 2s, 4s) | 5 failures in 60s → open 30s |
| Payment Gateway | 2 | Linear (5s, 10s) | 3 failures in 60s → open 60s |
| Order Management | 5 | Exponential (2s, 4s, 8s, 16s, 32s) | 10 failures in 120s → open 60s |
| Notification Service | 3 | Exponential (1s, 2s, 4s) | 10 failures in 120s → open 30s |

### 7.4 Idempotency

- All POST endpoints accept `Idempotency-Key` header (UUID v4).
- Duplicate requests within 24 hours return the original response without side effects.
- Keys are stored in Redis with 24-hour TTL.

---

## 8. Non-Functional Requirements (Technical)

### 8.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| API response time (p50) | ≤ 200ms | Application Performance Monitoring |
| API response time (p95) | ≤ 500ms | Application Performance Monitoring |
| API response time (p99) | ≤ 2000ms | Application Performance Monitoring |
| Product search (p95) | ≤ 2000ms | Custom metric |
| Database query time (p95) | ≤ 100ms | Database monitoring |
| Page load time (buyer view) | ≤ 3000ms | Real User Monitoring |

### 8.2 Scalability

| Metric | Target | Strategy |
|--------|--------|----------|
| Concurrent partners | 10,000 | Horizontal scaling, connection pooling |
| Quotations per day | 50,000 | Async processing, read replicas |
| Orders per day | 10,000 | Queue-based processing |
| File uploads per hour | 5,000 | CDN + object storage |

### 8.3 Availability

| Metric | Target |
|--------|--------|
| System uptime (business hours 8am-8pm ICT) | 99.5% |
| System uptime (24/7) | 99.0% |
| Planned maintenance window | Sunday 2am-6am ICT |
| Recovery Time Objective (RTO) | ≤ 4 hours |
| Recovery Point Objective (RPO) | ≤ 1 hour |

### 8.4 Security

| Requirement | Implementation |
|-------------|---------------|
| Authentication | JWT with RS256, 15-min access token, 7-day refresh token |
| Authorization | RBAC with two-layer resolution per §2.3 |
| Data encryption at rest | AES-256 via Supabase/PostgreSQL TDE |
| Data encryption in transit | TLS 1.3 minimum |
| File upload scanning | ClamAV for malware detection on slip uploads |
| API rate limiting | 100 req/min per user, 1000 req/min per IP |
| Input validation | Server-side validation on all inputs; parameterized queries |
| Secrets management | Environment variables via cloud secret manager |
| Audit logging | All state transitions and data access logged |
| OWASP Top 10 | Addressed via WAF, CSP headers, XSS/CSRF protections |

### 8.5 Data Retention

| Data Type | Retention Period | Action After Expiry |
|-----------|-----------------|---------------------|
| Active partner profiles | Indefinite while active | Archive on deactivation |
| Deactivated profiles | 3 years | Anonymize |
| Quotations (completed) | 5 years | Archive to cold storage |
| Quotations (expired/cancelled) | 1 year | Delete |
| Payment slips | 7 years | Move to secure archive (tax compliance) |
| Commission records | 7 years | Move to secure archive |
| Consent audit logs | 10 years | Immutable storage |
| Analytics events | 3 years | Aggregate then delete raw |

### 8.6 Monitoring & Observability

| Component | Tool | Metrics |
|-----------|------|---------|
| Application | APM (Datadog/New Relic) | Response times, error rates, throughput |
| Database | pganalyze / built-in | Query performance, connections, locks |
| Infrastructure | CloudWatch / Prometheus | CPU, memory, disk, network |
| Business | Custom dashboard | KPIs from analytics events |
| Alerts | PagerDuty / OpsGenie | P1: 5min, P2: 15min, P3: 1hr response |

---

## 9. Integration Specifications

### 9.1 External System Integrations

| # | System | Protocol | Direction | Purpose |
|---|--------|----------|-----------|---------|
| 1 | Allkons Identity Service | REST API | Bidirectional | Authentication, KYC verification, account data |
| 2 | Allkons ORG Model | REST API | Read | Organization structure, permissions |
| 3 | Partner Program Rules | REST API | Read | Eligibility rules, tier configurations |
| 4 | Shop Coverage Service | REST API | Read | Territory-shop coverage validation |
| 5 | Master SKU Catalog | REST API | Read | Product data, search, pricing |
| 6 | Store Product Service | REST API | Read | Shop-specific listings, availability |
| 7 | Allkons Payment Gateway | REST API + Webhook | Bidirectional | Payment processing, callbacks |
| 8 | Allkons Order Management | REST API + Events | Bidirectional | Order creation, status sync |
| 9 | Third-party Consent Center | REST API | Bidirectional | Consent management, PDPA compliance |
| 10 | Notification Service | Event Queue | Outbound | Email, SMS, Line notifications |
| 11 | File Storage (S3/GCS) | SDK | Outbound | Payment slip storage |

### 9.2 Event Bus Integration

**Technology**: Message queue (e.g., AWS SQS/SNS, Google Pub/Sub, or RabbitMQ)

**Published Events** (by Partner Center):
- `partner.application.*`
- `shop.relationship.*`
- `quotation.*`
- `order.*`
- `commission.*`

**Consumed Events** (from Allkons M):
- `order.status.updated` — sync delivery status
- `payment.completed` — payment gateway callback
- `shop.status.changed` — shop eligibility changes
- `product.price.updated` — price change notifications

---

## 10. Scheduled Jobs

| Job Name | Schedule | Description |
|----------|----------|-------------|
| `sla-expiry-checker` | Every 1 hour | Check and expire overdue shop relationships and sub-quotations |
| `quotation-link-expiry` | Every 6 hours | Expire buyer links past validity period |
| `commission-auto-approve` | Daily at 1:00 AM ICT | Auto-approve commissions past 15-day dispute window |
| `commission-payout-batch` | Weekly (Monday 6:00 AM ICT) | Process commission payouts |
| `order-status-sync` | Every 15 minutes | Sync order statuses from Allkons M Order Management |
| `analytics-aggregation` | Daily at 3:00 AM ICT | Aggregate daily analytics for dashboards |
| `data-retention-cleanup` | Weekly (Sunday 4:00 AM ICT) | Archive/delete data per retention policies |
| `consent-validation` | Daily at 2:00 AM ICT | Re-validate active consents with Consent Center |

---

## 11. Test Scenarios & Acceptance Criteria

### 11.1 Partner Onboarding Test Suite

#### TC-001: Successful Partner Application

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | User with verified KYC, no existing application |
| **Steps** | 1. POST `/applications` with valid territory and shop IDs → 2. Verify status = `PENDING_ADMIN` → 3. Admin POST `/applications/{id}/review` APPROVE → 4. Verify status = `PENDING_SHOP_APPROVAL` → 5. Shop Owner POST `/shop-relationships/{id}/review` APPROVE → 6. Verify application status = `APPROVED` and `partner_profile` created |
| **Expected** | Partner profile `ACTIVE`, shop relationship `ACTIVE`, events dispatched |

#### TC-002: Application Rejected by Admin

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Application in `PENDING_ADMIN` |
| **Steps** | Admin rejects with reason |
| **Expected** | Status = `REJECTED`, reason persisted, applicant notified |

#### TC-003: All Shops Reject Relationship

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Application in `PENDING_SHOP_APPROVAL`, 2 shop relationships |
| **Steps** | Both shops reject |
| **Expected** | Application status = `REJECTED` |

#### TC-004: SLA Expiry on Shop Relationship

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Shop relationship `PENDING`, created 31 days ago |
| **Steps** | `sla-expiry-checker` job runs |
| **Expected** | Relationship status = `EXPIRED`, admin notified |

#### TC-005: Duplicate Application Prevention

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | User with existing `PENDING_ADMIN` application |
| **Steps** | POST `/applications` |
| **Expected** | 409 – `CON_001` error |

---

### 11.2 Quotation Workflow Test Suite

#### TC-006: Create Multi-Shop Quotation

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Active partner with 2 active shop relationships |
| **Steps** | POST `/quotations` with line items from 2 shops |
| **Expected** | 1 quotation with 2 sub-quotations, status = `DRAFT` |

#### TC-007: Submit and Shop Approves

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Draft quotation with 1 sub-quotation |
| **Steps** | Submit → Shop approves |
| **Expected** | Quotation status = `APPROVED`, events dispatched |

#### TC-008: Shop Requests Changes

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Submitted quotation |
| **Steps** | Shop selects REQUEST_CHANGES with notes |
| **Expected** | Sub-quotation = `CHANGES_REQUESTED`, partner notified |

#### TC-009: Price Adjustment Within Tolerance

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Sub-quotation with unit_price = 100.00 |
| **Steps** | Shop adjusts to 95.00 (–5%) and approves |
| **Expected** | Approved with adjusted price |

#### TC-010: Price Adjustment Exceeds Tolerance

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Sub-quotation with unit_price = 100.00 |
| **Steps** | Shop adjusts to 90.00 (–10%) |
| **Expected** | 422 – `VAL_004` error |

#### TC-011: Quotation SLA Expiry

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Sub-quotation `PENDING`, created 31 days ago |
| **Steps** | `sla-expiry-checker` job runs |
| **Expected** | Sub-quotation = `EXPIRED`, parent quotation = `EXPIRED` |

---

### 11.3 Buyer Touchpoint Test Suite

#### TC-012: Buyer Views Quotation via Link

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Quotation status = `SENT_TO_BUYER`, valid link |
| **Steps** | GET `/buyer/quotations/{token}` |
| **Expected** | 200 with shop branding, line items, payment options |

#### TC-013: Expired Buyer Link

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Buyer link expired |
| **Steps** | GET `/buyer/quotations/{token}` |
| **Expected** | 410 – `RES_002` |

#### TC-014: Platform Payment Success

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Buyer selects platform payment |
| **Steps** | Create order → Payment callback success |
| **Expected** | Order = `PAID`, quotation = `ORDER_PLACED`, Allkons M order created |

#### TC-015: Direct Payment with Slip Verification

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Buyer selects direct payment |
| **Steps** | Upload slip → Shop verifies |
| **Expected** | Order = `PAID`, quotation = `ORDER_PLACED` |

#### TC-016: Slip Rejection and Re-upload

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Slip uploaded, attempt 1 |
| **Steps** | Shop rejects → Buyer re-uploads |
| **Expected** | Order = `PENDING_SLIP_VERIFICATION`, attempt_number = 2 |

#### TC-017: Maximum Slip Upload Attempts Exceeded

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Slip rejected, attempt 3 |
| **Steps** | Buyer attempts 4th upload |
| **Expected** | 422 – `VAL_007` |

---

### 11.4 Commission Test Suite

#### TC-018: Commission Calculated on Delivery

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Order delivered, commission rate 4%, order value 10,000 THB |
| **Steps** | `order.delivered` event received |
| **Expected** | Commission = 400 THB (member: 320, lead: 60, platform: 20) |

#### TC-019: Commission Dispute and Resolution

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Commission `CALCULATED`, within 15-day window |
| **Steps** | Partner disputes → Admin adjusts to 500 THB |
| **Expected** | Status = `ADJUSTED`, amounts updated |

#### TC-020: Commission Auto-Approve After 15 Days

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Commission `CALCULATED`, created 16 days ago |
| **Steps** | `commission-auto-approve` job runs |
| **Expected** | Status = `APPROVED` |

#### TC-021: Dispute After Window Expired

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Commission `APPROVED`, 16 days after calculation |
| **Steps** | POST `/commissions/{id}/dispute` |
| **Expected** | 422 – `VAL_008` |

---

### 11.5 RBAC Test Suite

#### TC-022: Partner Member Cannot Access Team Data

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | User with role `PARTNER_MEMBER` |
| **Steps** | GET `/teams/members` |
| **Expected** | 403 – `AUTH_002` |

#### TC-023: Shop Owner Cannot Create Quotations

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | User with role `SHOP_OWNER` |
| **Steps** | POST `/quotations` |
| **Expected** | 403 – `AUTH_002` |

#### TC-024: Team Lead Views Only Own Team

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Team Lead with team of 5 members; another team exists |
| **Steps** | GET `/teams/members` |
| **Expected** | Returns only 5 members from own team |

#### TC-025: Two-Layer Permission Enforcement

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | User has APP-level `quotation.create` but missing ORG-level permission |
| **Steps** | POST `/quotations` |
| **Expected** | 403 – `AUTH_002` |

---

### 11.6 Integration Test Suite

#### TC-026: Consent Center Unavailable

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Consent Center API returns 503 |
| **Steps** | POST `/applications` |
| **Expected** | 502 – `INT_002`, retry queued |

#### TC-027: Payment Gateway Timeout

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Payment gateway timeout after 30s |
| **Steps** | Buyer submits platform payment |
| **Expected** | Order stays `PENDING`, buyer sees retry option |

#### TC-028: Order Status Sync

| Attribute | Value |
|-----------|-------|
| **Pre-condition** | Allkons M order transitions to `SHIPPED` |
| **Steps** | `order-status-sync` job runs |
| **Expected** | Buyer order status = `SHIPPED`, buyer and partner notified |

---

## 12. Summary Tables

### 12.1 Scope Summary

| Category | In Scope (MVP) | Out of Scope |
|----------|---------------|--------------|
| Partner Management | Registration, approval, territory, team | Tier auto-promotion, gamification |
| Product Sourcing | Search, compare, territory filter | Inventory sync, demand forecasting |
| Quotation | Create, approve, send, multi-shop split | Templates, bulk import, auto-pricing |
| Buyer Touchpoint | View, platform pay, direct pay, slip upload | Buyer registration, wish lists, reviews |
| Commission | Calculate, dispute, payout | Credit terms, advance payments |
| Compliance | PDPA consent, audit logs | Full PDPA DPO portal, cross-border |
| Analytics | Event tracking, basic dashboards | Predictive analytics, ML insights |
| Mobile | Responsive web | Native apps, offline mode |

### 12.2 Role Summary

| Role | Scope | Key Capabilities |
|------|-------|-----------------|
| `PARTNER_MEMBER` | ORG + Branch | Apply, search, create quotations, track commissions |
| `PARTNER_LEAD` | ORG + Branch | All member capabilities + view team, team analytics |
| `ALLKONS_ADMIN` | Platform | Review applications, manage partners, platform analytics, settings |
| `SHOP_OWNER` | Shop | Approve relationships, approve quotations, verify slips |
| `BUYER` | Public | View quotations, pay, upload slips, track orders |

### 12.3 Status Summary

| Entity | Statuses |
|--------|----------|
| Partner Application | `PENDING_ADMIN` → `PENDING_SHOP_APPROVAL` → `APPROVED` / `REJECTED` / `EXPIRED` / `WITHDRAWN` |
| Shop Relationship | `PENDING` → `ACTIVE` / `REJECTED` / `EXPIRED` → `SUSPENDED` → `TERMINATED` |
| Partner Profile | `ACTIVE` → `SUSPENDED` → `DEACTIVATED` |
| Quotation | `DRAFT` → `PENDING_SHOP_APPROVAL` → `CHANGES_REQUESTED` / `APPROVED` / `REJECTED` / `EXPIRED` → `SENT_TO_BUYER` → `ORDER_PLACED` / `CANCELLED` |
| Sub-Quotation | `PENDING` → `SHOP_APPROVED` / `CHANGES_REQUESTED` / `SHOP_REJECTED` / `EXPIRED` |
| Buyer Order | `PENDING` → `PAID` / `PAYMENT_FAILED` / `PENDING_SLIP_VERIFICATION` → `SLIP_REJECTED` → `PROCESSING` → `SHIPPED` → `DELIVERED` / `CANCELLED` / `REFUNDED` |
| Payment Slip | `PENDING` → `VERIFIED` / `REJECTED` |
| Commission | `CALCULATED` → `APPROVED` / `DISPUTED` → `ADJUSTED` / `CANCELLED` → `PAID` |

### 12.4 API Summary (by Domain)

| Domain | Endpoints | Auth Required |
|--------|-----------|--------------|
| Partner Applications | 4 (POST, GET list, GET detail, POST review) | Yes |
| Shop Relationships | 2 (GET list, POST review) | Yes |
| Product Sourcing | 2 (GET search, POST compare) | Yes |
| Quotations | 7 (POST create, GET list, GET detail, PATCH update, POST submit, POST review, POST send) | Yes |
| Buyer Touchpoint | 4 (GET quotation, POST order, POST slip, GET tracking) | No (token-based) |
| Slip Verification | 1 (POST verify) | Yes |
| Commissions | 4 (GET list, GET detail, POST dispute, POST resolve) | Yes |
| Team Management | 3 (GET members, GET performance, GET export) | Yes |
| Admin | 2 (GET dashboard, PATCH settings) | Yes |
| **Total** | **29** | |

### 12.5 Permission Summary (Count by Role)

| Role | Permissions Granted | Key Restrictions |
|------|-------------------|-----------------|
| `PARTNER_MEMBER` | 13 | Cannot view team data, cannot approve, cannot manage |
| `PARTNER_LEAD` | 17 | Cannot approve quotations, cannot manage settings |
| `ALLKONS_ADMIN` | 14 | Cannot create quotations, cannot upload slips |
| `SHOP_OWNER` | 5 | Limited to approval and verification actions |
| `BUYER` | 5 | Limited to buyer touchpoint actions |

---

## 13. Appendices

### 13.1 Glossary

| Term | Definition |
|------|-----------|
| **ACM** | Affiliate Community Marketing – future evolution of Partner Center |
| **Master SKU** | Centralized product identifier managed by Allkons M |
| **Store Product** | Shop-specific listing referencing a Master SKU |
| **Sub-quotation** | Portion of a quotation scoped to a single shop |
| **SLA** | Service Level Agreement – 30-day response deadline |
| **PDPA** | Personal Data Protection Act (Thailand) |
| **Two-Layer Permission** | ORG-level ∩ APP-level permission resolution model |
| **Buyer Link Token** | Cryptographically unique token for anonymous quotation access |

### 13.2 Document References

| Document | Version | Location |
|----------|---------|----------|
| PRD: Startup Partner Center | 1.0 | `docs/startup-partner-center-PRD.md` |
| BRD: Startup Partner Center | 1.0 | `docs/startup-partner-center-BRD.md` |
| Allkons M Glossary | — | `public/research/glossary.md` |
| Database Schema | — | `public/research/database/README.md` |
| Module Documentation | — | `public/research/modules/README.md` |

### 13.3 Change History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-02-25 | Initial SRS creation | Senior System Architect |

---

**Document Status**: Ready for Engineering Review  
**Next Phase**: Sprint Planning and Task Breakdown
