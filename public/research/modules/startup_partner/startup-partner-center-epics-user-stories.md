# Epics & User Stories: Startup Partner Center

**Document Version**: 1.0  
**Date**: February 25, 2026  
**Product**: Startup Partner Center (Future ACM)  
**Author**: Product Manager  
**Status**: Ready for Sprint Planning  
**References**: PRD v1.0, BRD v1.0, SRS v1.0

---

## Document Overview

This document defines all Epics and User Stories for the Startup Partner Center MVP, derived from the PRD, BRD, and SRS. Each story includes acceptance criteria (GIVEN/WHEN/THEN), priority (MoSCoW), story points (Fibonacci), and traceability to source requirements.

**Story Point Scale**: Fibonacci (1, 2, 3, 5, 8, 13)  
**Priority**: MUST / SHOULD / COULD  
**Roles**: Partner Member, Partner Lead, Allkons Admin, Shop Owner, Buyer

---

## Epic Summary

| Epic ID | Epic Name | Stories | Priority | Sprint Target |
|---------|-----------|---------|----------|---------------|
| E-01 | Partner Registration & Onboarding | 8 | MUST | Sprint 1-2 |
| E-02 | Territory & Shop Relationship Management | 7 | MUST | Sprint 2-3 |
| E-03 | Product Sourcing & Discovery | 5 | MUST | Sprint 3-4 |
| E-04 | Quotation Management | 10 | MUST | Sprint 4-6 |
| E-05 | Buyer Touchpoint & Payment | 9 | MUST | Sprint 5-7 |
| E-06 | Order Tracking & Fulfillment | 5 | MUST | Sprint 7-8 |
| E-07 | Commission Management | 7 | MUST | Sprint 8-9 |
| E-08 | Team & Performance Management | 6 | MUST | Sprint 6-7 |
| E-09 | Consent & PDPA Compliance | 5 | MUST | Sprint 1-2 |
| E-10 | Admin & Platform Governance | 7 | MUST | Sprint 3-5 |
| E-11 | Analytics & Reporting | 5 | SHOULD | Sprint 9-10 |
| E-12 | Notifications & Communication | 4 | SHOULD | Sprint 5-6 |
| **Total** | | **78** | | |

---

## E-01: Partner Registration & Onboarding

**Epic Description**: Enable qualified Allkons users to apply as Startup Partners with territory specification and shop selection, going through a dual approval workflow (Admin + Shop Owner).

**Business Value**: Creates the foundation for the partner ecosystem, enabling market expansion through qualified affiliates.

**Source**: PRD FR-001, FR-002 | SRS-FR-001, SRS-FR-002 | BRD §3.1, §3.2

---

### US-001: Partner Application Form

**As a** registered Allkons user,  
**I want to** submit a partner application with my territory and shop preferences,  
**So that** I can become a Startup Partner and earn commissions.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 1 |
| **Source** | PRD FR-001, SRS-FR-001 |

**Acceptance Criteria**:

1. **GIVEN** I am logged in with a verified Allkons account AND my KYC is complete,  
   **WHEN** I navigate to the Partner Center registration page,  
   **THEN** I see the partner application form with territory and shop selection fields.

2. **GIVEN** I am on the application form,  
   **WHEN** I select a Province and District as my territory,  
   **THEN** the system displays only shops with `affiliate_eligible = true` within that territory.

3. **GIVEN** I have selected territory and at least one shop,  
   **WHEN** I submit the application with valid PDPA consent,  
   **THEN** the system creates a `partner_application` with status `PENDING_ADMIN` and I see a confirmation message.

4. **GIVEN** I submit the application,  
   **WHEN** the system processes it,  
   **THEN** event `partner.application.submitted` is dispatched and Allkons Admin is notified.

5. **GIVEN** my KYC is NOT verified,  
   **WHEN** I attempt to access the registration page,  
   **THEN** I see error "KYC verification required" (E-001) and a link to complete KYC.

6. **GIVEN** I already have an active or pending application,  
   **WHEN** I attempt to submit a new application,  
   **THEN** I see error "Active application already exists" (E-002, HTTP 409).

---

### US-002: Admin Reviews Partner Application

**As an** Allkons Admin,  
**I want to** review and approve or reject partner applications,  
**So that** only qualified partners are admitted to the program.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 1 |
| **Source** | PRD FR-002, SRS-FR-002 |

**Acceptance Criteria**:

1. **GIVEN** I am logged in as Allkons Admin with `partner.application.review` permission,  
   **WHEN** I navigate to the application review queue,  
   **THEN** I see all applications with status `PENDING_ADMIN`, sorted by submission date (oldest first).

2. **GIVEN** I am viewing an application,  
   **WHEN** I click the application,  
   **THEN** I see applicant profile, KYC details, selected territory, selected shops, and consent status.

3. **GIVEN** I approve an application,  
   **WHEN** I click "Approve",  
   **THEN** the application transitions to `PENDING_SHOP_APPROVAL`, `shop_relationship` records are created for each selected shop with status `PENDING`, and Shop Owners are notified.

4. **GIVEN** I reject an application,  
   **WHEN** I provide a reason and click "Reject",  
   **THEN** the application transitions to `REJECTED`, the reason is persisted, and the applicant is notified.

5. **GIVEN** I try to reject without providing a reason,  
   **WHEN** I click "Reject",  
   **THEN** a validation error appears requiring a reason.

---

### US-003: View Application Status

**As a** partner applicant,  
**I want to** view the current status of my application,  
**So that** I know where I am in the approval process.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 1 |
| **Source** | PRD FR-002, SRS-FR-001 |

**Acceptance Criteria**:

1. **GIVEN** I have submitted an application,  
   **WHEN** I navigate to "My Application" page,  
   **THEN** I see the current status (`PENDING_ADMIN`, `PENDING_SHOP_APPROVAL`, `APPROVED`, `REJECTED`, `EXPIRED`, or `WITHDRAWN`).

2. **GIVEN** my application is in `PENDING_SHOP_APPROVAL`,  
   **WHEN** I view the details,  
   **THEN** I see the status of each shop relationship and the SLA deadline.

3. **GIVEN** my application was rejected,  
   **WHEN** I view the application,  
   **THEN** I see the rejection reason and a link to submit a new application.

---

### US-004: Withdraw Application

**As a** partner applicant,  
**I want to** withdraw my pending application,  
**So that** I can cancel if I change my mind.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 2 |
| **Sprint** | 2 |
| **Source** | SRS §5.1 |

**Acceptance Criteria**:

1. **GIVEN** my application is in `PENDING_ADMIN` status,  
   **WHEN** I click "Withdraw Application" and confirm,  
   **THEN** the application transitions to `WITHDRAWN` and I am notified.

2. **GIVEN** my application is in `PENDING_SHOP_APPROVAL`,  
   **WHEN** I attempt to withdraw,  
   **THEN** the system does not allow withdrawal (button disabled) because shop reviews are in progress.

---

### US-005: Shop Owner Reviews Relationship Request

**As a** Shop Owner,  
**I want to** approve or reject partner relationship requests,  
**So that** I control which partners can sell my products.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 2 |
| **Source** | PRD FR-002, SRS-FR-003 |

**Acceptance Criteria**:

1. **GIVEN** I am logged in as Shop Owner with `shop.relationship.approve` permission,  
   **WHEN** I navigate to "Partner Requests",  
   **THEN** I see all pending relationship requests for my shop with partner details and territory info.

2. **GIVEN** I approve a relationship,  
   **WHEN** I click "Approve",  
   **THEN** `shop_relationship` transitions to `ACTIVE` and event `shop.relationship.approved` is dispatched.

3. **GIVEN** I reject a relationship,  
   **WHEN** I provide a reason and click "Reject",  
   **THEN** `shop_relationship` transitions to `REJECTED` and the reason is persisted.

4. **GIVEN** all shop relationships for an application are resolved AND at least one is `ACTIVE`,  
   **WHEN** the last shop responds,  
   **THEN** the application auto-transitions to `APPROVED` and a `partner_profile` is created with status `ACTIVE`.

5. **GIVEN** all shop relationships are `REJECTED`,  
   **WHEN** the last shop rejects,  
   **THEN** the application auto-transitions to `REJECTED` and the applicant is notified.

---

### US-006: SLA Auto-Expiry for Shop Relationship

**As the** system,  
**I want to** automatically expire shop relationships that exceed the 30-day SLA,  
**So that** applications are not stuck indefinitely.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Source** | SRS-FR-003 |

**Acceptance Criteria**:

1. **GIVEN** a `shop_relationship` has been `PENDING` for more than 30 calendar days,  
   **WHEN** the `sla-expiry-checker` scheduled job runs,  
   **THEN** the relationship transitions to `EXPIRED` and Admin is notified.

2. **GIVEN** a shop relationship expires and it was the last pending relationship,  
   **WHEN** remaining relationships are evaluated,  
   **THEN** if at least one is `ACTIVE` the application is `APPROVED`; otherwise it transitions to `EXPIRED`.

---

### US-007: Partner Profile Activation

**As the** system,  
**I want to** automatically create a partner profile upon application approval,  
**So that** the partner can start using the platform immediately.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Source** | SRS-FR-003 |

**Acceptance Criteria**:

1. **GIVEN** a partner application transitions to `APPROVED`,  
   **WHEN** the system processes the approval,  
   **THEN** a `partner_profile` is created with status `ACTIVE`, tier `ENTRY`, and territory from the application.

2. **GIVEN** the profile is created,  
   **WHEN** the partner next logs in,  
   **THEN** they see the Partner Center dashboard with sourcing and quotation tools.

3. **GIVEN** the profile is created,  
   **WHEN** the system assigns permissions,  
   **THEN** the partner receives `PARTNER_MEMBER` role (R-001) with all associated permissions.

---

### US-008: Partner Application List (Admin)

**As an** Allkons Admin,  
**I want to** see a filterable list of all partner applications,  
**So that** I can efficiently manage the application pipeline.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 1 |
| **Source** | SRS §4.2 |

**Acceptance Criteria**:

1. **GIVEN** I am an Allkons Admin,  
   **WHEN** I open the applications list,  
   **THEN** I see applications with columns: applicant name, territory, status, submitted date, SLA countdown.

2. **GIVEN** the list is displayed,  
   **WHEN** I filter by status,  
   **THEN** only applications matching that status are shown.

3. **GIVEN** there are more than 20 applications,  
   **WHEN** I scroll to the bottom,  
   **THEN** cursor-based pagination loads the next page.

---

## E-02: Territory & Shop Relationship Management

**Epic Description**: Manage partner territories and ongoing shop relationships including status changes, suspension, and termination.

**Business Value**: Ensures controlled market coverage and maintains quality partner-shop relationships.

**Source**: PRD FR-003 | SRS-FR-004 | BRD §3.1

---

### US-009: View Territory and Assigned Shops

**As a** Partner Member,  
**I want to** view my assigned territory and active shop relationships,  
**So that** I know which shops I can source products from.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Source** | PRD FR-003, SRS-FR-004 |

**Acceptance Criteria**:

1. **GIVEN** I am an active partner,  
   **WHEN** I navigate to "My Territory",  
   **THEN** I see my Province/District territory and a list of active shop relationships.

2. **GIVEN** I view shop relationships,  
   **WHEN** I see the list,  
   **THEN** each shop shows name, status, relationship type, and activation date.

---

### US-010: Request Territory Change

**As a** Partner Member,  
**I want to** request a territory change,  
**So that** I can expand or adjust my sales area.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 5 |
| **Sprint** | 3 |
| **Source** | PRD FR-003, SRS-FR-004 |

**Acceptance Criteria**:

1. **GIVEN** I am an active partner,  
   **WHEN** I submit a territory change request with new Province/District,  
   **THEN** the request is created and sent to Admin for re-approval.

2. **GIVEN** the territory change is approved by Admin,  
   **WHEN** the system processes it,  
   **THEN** my territory is updated and new shops become available.

3. **GIVEN** the territory change is rejected,  
   **WHEN** the Admin rejects with a reason,  
   **THEN** I am notified and my territory remains unchanged.

---

### US-011: Admin Suspends Shop Relationship

**As an** Allkons Admin,  
**I want to** suspend a shop relationship for compliance reasons,  
**So that** I can address issues while preserving the relationship.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Source** | SRS §5.2 |

**Acceptance Criteria**:

1. **GIVEN** a shop relationship is `ACTIVE`,  
   **WHEN** I select "Suspend" and provide a reason,  
   **THEN** the relationship transitions to `SUSPENDED` and the partner cannot source from this shop.

2. **GIVEN** a relationship is `SUSPENDED`,  
   **WHEN** I select "Reactivate",  
   **THEN** the relationship transitions back to `ACTIVE`.

---

### US-012: Shop Owner Terminates Relationship

**As a** Shop Owner,  
**I want to** terminate a partner relationship,  
**So that** I can remove partners who are not performing.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Source** | SRS §5.2 |

**Acceptance Criteria**:

1. **GIVEN** a shop relationship is `ACTIVE` or `SUSPENDED`,  
   **WHEN** I select "Terminate" and provide a reason,  
   **THEN** the relationship transitions to `TERMINATED` (terminal state) and the partner is notified.

2. **GIVEN** a relationship is `TERMINATED`,  
   **WHEN** I view it,  
   **THEN** no further actions are available; shown in historical view only.

---

### US-013: Shop Owner Views Partner Relationships

**As a** Shop Owner,  
**I want to** see all partner relationships for my shop,  
**So that** I can monitor my affiliate network.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Source** | SRS §4.3 |

**Acceptance Criteria**:

1. **GIVEN** I am a Shop Owner,  
   **WHEN** I navigate to "Partner Relationships",  
   **THEN** I see all relationships with: partner name, territory, status, relationship type, date.

2. **GIVEN** the list is displayed,  
   **WHEN** I filter by status,  
   **THEN** only matching relationships are shown.

---

### US-014: Admin Views All Relationships

**As an** Allkons Admin,  
**I want to** see all shop relationships across the platform,  
**So that** I can monitor the partner-shop ecosystem.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Source** | SRS §4.3 |

**Acceptance Criteria**:

1. **GIVEN** I am an Allkons Admin,  
   **WHEN** I view the platform relationships dashboard,  
   **THEN** I see aggregate counts by status and a searchable list of all relationships.

---

### US-015: Request Additional Shop Relationship

**As a** Partner Member,  
**I want to** request relationships with additional shops in my territory,  
**So that** I can expand my product sourcing options.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 5 |
| **Sprint** | 3 |
| **Source** | PRD FR-003, SRS-FR-004 |

**Acceptance Criteria**:

1. **GIVEN** I am an active partner,  
   **WHEN** I browse available shops in my territory,  
   **THEN** I see eligible shops I do not have an existing relationship with.

2. **GIVEN** I select a new shop and submit a request,  
   **WHEN** the request is processed,  
   **THEN** a new `shop_relationship` is created with status `PENDING` and the Shop Owner is notified.

3. **GIVEN** the Shop Owner approves,  
   **WHEN** the relationship is activated,  
   **THEN** I can source products from that shop.

---

## E-03: Product Sourcing & Discovery

**Epic Description**: Enable partners to search, compare, and select products from eligible shops within their territory.

**Business Value**: Core capability allowing partners to efficiently find products and create competitive quotations.

**Source**: PRD FR-004, FR-005, FR-006 | SRS-FR-005, SRS-FR-006

---

### US-016: Search Products from Eligible Shops

**As a** Partner Member,  
**I want to** search for construction materials from my eligible shops,  
**So that** I can find the right products for my buyers.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 3 |
| **Source** | PRD FR-004, SRS-FR-005 |

**Acceptance Criteria**:

1. **GIVEN** I am an active partner with at least one `ACTIVE` shop relationship,  
   **WHEN** I enter a search query (keyword, category, or Master SKU ID),  
   **THEN** the system returns products only from my approved shops within my territory.

2. **GIVEN** search results are displayed,  
   **WHEN** I view the results,  
   **THEN** each result shows: product name, Master SKU ID, shop name, unit price, promotion price, availability status.

3. **GIVEN** search results are displayed,  
   **WHEN** I sort by price, shop, or relevance,  
   **THEN** the results re-order accordingly.

4. **GIVEN** I perform a search,  
   **WHEN** the system processes it,  
   **THEN** results return within 2 seconds (p95).

5. **GIVEN** no products match the query,  
   **WHEN** the search completes,  
   **THEN** I see "No products found" with suggestions to broaden the search.

---

### US-017: Compare Products Across Shops

**As a** Partner Member,  
**I want to** compare the same product across multiple shops,  
**So that** I can offer the best price and availability to buyers.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 4 |
| **Source** | PRD FR-005, SRS-FR-006 |

**Acceptance Criteria**:

1. **GIVEN** I have search results,  
   **WHEN** I add up to 10 products to the comparison basket,  
   **THEN** a side-by-side comparison view is displayed grouped by Master SKU.

2. **GIVEN** the comparison view,  
   **WHEN** I review the data,  
   **THEN** I see per shop: unit price, promotion price, bulk price, availability, delivery estimate.

3. **GIVEN** the comparison view,  
   **WHEN** I select a preferred shop for a product,  
   **THEN** the selection is highlighted and ready for quotation creation.

---

### US-018: View Product Details

**As a** Partner Member,  
**I want to** view detailed product information,  
**So that** I can verify the product matches the buyer's requirements.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Source** | PRD FR-004 |

**Acceptance Criteria**:

1. **GIVEN** I click on a product in search results,  
   **WHEN** the detail page loads,  
   **THEN** I see: product name, Master SKU, description, specifications, images, category, and available shops with pricing.

2. **GIVEN** I am on the product detail page,  
   **WHEN** I click "Add to Quotation",  
   **THEN** the product is added to my quotation draft cart with default quantity 1.

---

### US-019: Filter Products by Category

**As a** Partner Member,  
**I want to** filter products by category,  
**So that** I can quickly find specific types of construction materials.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Source** | PRD FR-004, SRS-FR-005 |

**Acceptance Criteria**:

1. **GIVEN** I am on the product search page,  
   **WHEN** I select a category from the filter panel,  
   **THEN** results are filtered to show only products in that category.

2. **GIVEN** I apply multiple filters (category + keyword + shop),  
   **WHEN** the results update,  
   **THEN** all filters are applied simultaneously using AND logic.

---

### US-020: View Price and Promotion Visibility

**As a** Partner Member,  
**I want to** see shop-specific pricing including promotions and bulk pricing,  
**So that** I can optimize quotation value for buyers.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Source** | PRD FR-006 |

**Acceptance Criteria**:

1. **GIVEN** a product has a promotional price,  
   **WHEN** I view the product,  
   **THEN** both the regular price and promotional price are displayed with discount percentage.

2. **GIVEN** a product has bulk pricing tiers,  
   **WHEN** I view the product,  
   **THEN** bulk pricing thresholds and prices are displayed.

3. **GIVEN** prices are displayed,  
   **WHEN** I view any price,  
   **THEN** currency (THB) and tax inclusion status are clearly indicated.

---

## E-04: Quotation Management

**Epic Description**: Enable partners to create, manage, and submit quotations for shop approval, with multi-shop splitting and lifecycle management.

**Business Value**: Core revenue-generating workflow connecting partners, shops, and buyers.

**Source**: PRD FR-007 through FR-010 | SRS-FR-007 through SRS-FR-010

---

### US-021: Create Draft Quotation

**As a** Partner Member,  
**I want to** create a draft quotation with products from multiple shops,  
**So that** I can prepare a comprehensive offer for my buyer.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 4 |
| **Source** | PRD FR-007, SRS-FR-007 |

**Acceptance Criteria**:

1. **GIVEN** I am an active partner,  
   **WHEN** I click "Create Quotation",  
   **THEN** I see a form with buyer info fields (name, contact) and an empty line items section.

2. **GIVEN** I add line items from different shops,  
   **WHEN** the system processes them,  
   **THEN** items are auto-grouped by shop into sub-quotations with calculated subtotals.

3. **GIVEN** I adjust quantities or remove items,  
   **WHEN** changes are made,  
   **THEN** subtotals, tax amounts, and grand total recalculate automatically.

4. **GIVEN** a valid draft quotation,  
   **WHEN** I click "Save Draft",  
   **THEN** the quotation is saved with status `DRAFT` and number `QT-YYYYMMDD-XXXX`.

5. **GIVEN** I try to save with zero line items,  
   **WHEN** I click "Save",  
   **THEN** validation error "Minimum 1 line item required" is displayed.

6. **GIVEN** I add an OUT_OF_STOCK product,  
   **WHEN** I try to save,  
   **THEN** a warning is shown and the product is flagged as unavailable.

---

### US-022: Edit Draft Quotation

**As a** Partner Member,  
**I want to** edit my draft quotation,  
**So that** I can refine it before submitting for shop approval.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 4 |
| **Source** | SRS-FR-007 |

**Acceptance Criteria**:

1. **GIVEN** my quotation is in `DRAFT` status,  
   **WHEN** I open it,  
   **THEN** I can add/remove line items, adjust quantities, update buyer info, and add notes.

2. **GIVEN** my quotation is in `CHANGES_REQUESTED` status,  
   **WHEN** I open it,  
   **THEN** I see shop feedback and can edit accordingly.

3. **GIVEN** a quotation is in `PENDING_SHOP_APPROVAL` or later,  
   **WHEN** I try to edit,  
   **THEN** edit controls are disabled.

---

### US-023: Submit Quotation for Shop Approval

**As a** Partner Member,  
**I want to** submit my quotation for shop approval,  
**So that** shops can review pricing and availability.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 5 |
| **Source** | PRD FR-008, SRS-FR-008 |

**Acceptance Criteria**:

1. **GIVEN** I have a `DRAFT` quotation with at least 1 line item,  
   **WHEN** I click "Submit for Approval",  
   **THEN** the quotation transitions to `PENDING_SHOP_APPROVAL` and each sub-quotation is sent to the respective Shop Owner.

2. **GIVEN** the quotation is submitted,  
   **WHEN** Shop Owners receive notification,  
   **THEN** the SLA timer starts (30 calendar days per sub-quotation).

3. **GIVEN** I submit a quotation,  
   **WHEN** the system processes it,  
   **THEN** product availability is re-validated; if any item is unavailable, submission is blocked with error `VAL_002`.

---

### US-024: Shop Owner Reviews Sub-Quotation

**As a** Shop Owner,  
**I want to** review and respond to partner quotation requests,  
**So that** I can approve, adjust, or reject the pricing.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 5 |
| **Source** | PRD FR-008, SRS-FR-009 |

**Acceptance Criteria**:

1. **GIVEN** I am a Shop Owner with `quotation.approve` permission,  
   **WHEN** I open a pending sub-quotation,  
   **THEN** I see all line items with product details, quantities, and partner-proposed pricing.

2. **GIVEN** I click "Approve",  
   **WHEN** the system processes it,  
   **THEN** the sub-quotation transitions to `SHOP_APPROVED`.

3. **GIVEN** I modify a line item price within ±5% tolerance,  
   **WHEN** I save,  
   **THEN** the adjustment is accepted.

4. **GIVEN** I adjust a price beyond ±5% tolerance,  
   **WHEN** I try to save,  
   **THEN** I see error "Price adjustment exceeds tolerance (±5%)" (VAL_004).

5. **GIVEN** I select "Request Changes" with notes,  
   **WHEN** I submit,  
   **THEN** the sub-quotation transitions to `CHANGES_REQUESTED` and the partner is notified.

6. **GIVEN** I select "Reject" with a reason,  
   **WHEN** I submit,  
   **THEN** the sub-quotation transitions to `SHOP_REJECTED`.

7. **GIVEN** all sub-quotations are `SHOP_APPROVED`,  
   **WHEN** the last one is approved,  
   **THEN** the parent quotation auto-transitions to `APPROVED`.

8. **GIVEN** all sub-quotations are `SHOP_REJECTED`,  
   **WHEN** the last one is rejected,  
   **THEN** the parent quotation auto-transitions to `REJECTED`.

---

### US-025: Re-submit After Changes Requested

**As a** Partner Member,  
**I want to** revise and re-submit a quotation after shop requests changes,  
**So that** I can address shop feedback and get approval.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 5 |
| **Source** | SRS-FR-009, SRS §5.3 |

**Acceptance Criteria**:

1. **GIVEN** my quotation is in `CHANGES_REQUESTED` status,  
   **WHEN** I open it,  
   **THEN** I see the shop's notes and can edit the affected line items.

2. **GIVEN** I have made revisions,  
   **WHEN** I click "Re-submit",  
   **THEN** the quotation transitions back to `PENDING_SHOP_APPROVAL` with new SLA timer.

---

### US-026: Send Approved Quotation to Buyer

**As a** Partner Member,  
**I want to** send an approved quotation to my buyer via a secure link,  
**So that** the buyer can review and place an order.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 5 |
| **Source** | PRD FR-010, SRS-FR-010 |

**Acceptance Criteria**:

1. **GIVEN** my quotation is `APPROVED`,  
   **WHEN** I click "Send to Buyer",  
   **THEN** the system generates a unique buyer link token and the quotation transitions to `SENT_TO_BUYER`.

2. **GIVEN** the link is generated,  
   **WHEN** I see the result,  
   **THEN** I receive the buyer link URL and its expiry date (30 days default).

3. **GIVEN** the link is generated,  
   **WHEN** I copy it,  
   **THEN** I can share it via Line, email, SMS, or any channel.

---

### US-027: View Quotation List

**As a** Partner Member,  
**I want to** view a list of all my quotations,  
**So that** I can manage my sales pipeline.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Source** | SRS §4.5 |

**Acceptance Criteria**:

1. **GIVEN** I am a partner,  
   **WHEN** I navigate to "My Quotations",  
   **THEN** I see quotations with: QT number, buyer name, status, grand total, created date.

2. **GIVEN** I filter by status,  
   **WHEN** the filter is applied,  
   **THEN** only matching quotations are shown.

3. **GIVEN** I am a Team Lead,  
   **WHEN** I view quotations,  
   **THEN** I can see quotations from all my team members.

---

### US-028: Cancel Quotation

**As a** Partner Member,  
**I want to** cancel a quotation that is no longer needed,  
**So that** I can clean up my pipeline.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 2 |
| **Sprint** | 5 |
| **Source** | SRS §5.3 |

**Acceptance Criteria**:

1. **GIVEN** my quotation is in any non-terminal status,  
   **WHEN** I click "Cancel" and confirm,  
   **THEN** the quotation transitions to `CANCELLED`.

2. **GIVEN** a quotation is in `ORDER_PLACED`,  
   **WHEN** I attempt to cancel,  
   **THEN** the cancel button is disabled.

---

### US-029: Quotation SLA Auto-Expiry

**As the** system,  
**I want to** automatically expire sub-quotations that exceed the 30-day SLA,  
**So that** quotations are not stuck waiting.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 5 |
| **Source** | SRS-FR-009 |

**Acceptance Criteria**:

1. **GIVEN** a sub-quotation has been `PENDING` for more than 30 days,  
   **WHEN** the `sla-expiry-checker` job runs,  
   **THEN** the sub-quotation transitions to `EXPIRED` and the parent quotation transitions to `EXPIRED`.

---

### US-030: View Quotation Details

**As a** Partner Member,  
**I want to** view full details of a quotation,  
**So that** I can review all line items, sub-quotations, and history.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Source** | SRS §4.5 |

**Acceptance Criteria**:

1. **GIVEN** I click on a quotation,  
   **WHEN** the detail page loads,  
   **THEN** I see: buyer info, sub-quotations grouped by shop, line items with pricing, grand total, status, and timeline.

---

## E-05: Buyer Touchpoint & Payment

**Epic Description**: Enable buyers to view quotations, select payment modes, and complete purchases via the partner-shared link.

**Business Value**: Converts partner quotations into revenue-generating orders.

**Source**: PRD FR-011 through FR-014 | SRS-FR-011 through SRS-FR-013

---

### US-031: Buyer Views Quotation via Link

**As a** Buyer,  
**I want to** view a quotation sent to me via a secure link,  
**So that** I can review products, pricing, and decide to purchase.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 5 |
| **Source** | PRD FR-011, SRS-FR-011 |

**Acceptance Criteria**:

1. **GIVEN** I have a valid quotation link,  
   **WHEN** I open it in a browser (no login required),  
   **THEN** I see a buyer-facing quotation page with shop branding, product details, pricing, and totals.

2. **GIVEN** the quotation has multiple sub-quotations,  
   **WHEN** I view the page,  
   **THEN** products are grouped by shop with each shop's branding.

3. **GIVEN** I scroll to the bottom,  
   **WHEN** I see the payment section,  
   **THEN** I see two options: "Pay via Platform" and "Direct Bank Transfer".

4. **GIVEN** the link has expired,  
   **WHEN** I open it,  
   **THEN** I see a 410 error "This quotation link has expired".

5. **GIVEN** the link token is invalid,  
   **WHEN** I open it,  
   **THEN** I see a 404 error.

6. **GIVEN** I open the link on mobile,  
   **WHEN** the page loads,  
   **THEN** the layout is responsive and all content is readable.

---

### US-032: Buyer Selects Platform Payment

**As a** Buyer,  
**I want to** pay via the Allkons M platform,  
**So that** I can complete my purchase securely online.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 6 |
| **Source** | PRD FR-012, SRS-FR-012 |

**Acceptance Criteria**:

1. **GIVEN** I select "Pay via Platform" for a sub-quotation,  
   **WHEN** the system processes it,  
   **THEN** a `buyer_order` is created with `payment_mode = PLATFORM` and I am redirected to the payment gateway.

2. **GIVEN** payment succeeds,  
   **WHEN** the gateway sends success callback,  
   **THEN** the order transitions to `PAID`, quotation to `ORDER_PLACED`, and an Allkons M order is created.

3. **GIVEN** payment fails,  
   **WHEN** the gateway sends failure callback,  
   **THEN** the order transitions to `PAYMENT_FAILED` and I see a retry option.

---

### US-033: Buyer Selects Direct Payment

**As a** Buyer,  
**I want to** pay directly to the shop via bank transfer,  
**So that** I can use my preferred payment method.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 6 |
| **Source** | PRD FR-012, SRS-FR-013 |

**Acceptance Criteria**:

1. **GIVEN** I select "Direct Bank Transfer" for a sub-quotation,  
   **WHEN** the system processes it,  
   **THEN** I see bank account details for the shop and a slip upload form.

2. **GIVEN** I select direct payment,  
   **WHEN** the order is created,  
   **THEN** a `buyer_order` is created with `payment_mode = DIRECT` and status `PENDING`.

---

### US-034: Upload Payment Slip

**As a** Buyer,  
**I want to** upload my payment slip as proof of direct payment,  
**So that** the shop can verify my payment.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 6 |
| **Source** | PRD FR-013, SRS-FR-013 |

**Acceptance Criteria**:

1. **GIVEN** I have made a direct payment,  
   **WHEN** I upload a slip image (JPG, PNG, or PDF, max 10 MB),  
   **THEN** the order transitions to `PENDING_SLIP_VERIFICATION` and the Shop Owner is notified.

2. **GIVEN** I upload an unsupported format,  
   **WHEN** I try to submit,  
   **THEN** I see error "Slip file format not accepted" (VAL_005).

3. **GIVEN** I upload a file larger than 10 MB,  
   **WHEN** I try to submit,  
   **THEN** I see error "Slip file size exceeds 10 MB" (VAL_006).

---

### US-035: Shop Owner Verifies Payment Slip

**As a** Shop Owner,  
**I want to** verify buyer payment slips,  
**So that** I can confirm payment and proceed with the order.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 6 |
| **Source** | PRD FR-013, SRS-FR-013 |

**Acceptance Criteria**:

1. **GIVEN** I am a Shop Owner with `order.slip.verify` permission,  
   **WHEN** I open a pending slip verification,  
   **THEN** I see the slip image, order details, and amount.

2. **GIVEN** I verify the slip is valid,  
   **WHEN** I click "Verify",  
   **THEN** the order transitions to `PAID` and the quotation transitions to `ORDER_PLACED`.

3. **GIVEN** I reject the slip,  
   **WHEN** I provide a reason and click "Reject",  
   **THEN** the order transitions to `SLIP_REJECTED` and the buyer is notified.

---

### US-036: Re-upload Rejected Slip

**As a** Buyer,  
**I want to** re-upload a payment slip after rejection,  
**So that** I can provide corrected proof of payment.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 7 |
| **Source** | SRS-FR-013, SRS §5.4 |

**Acceptance Criteria**:

1. **GIVEN** my slip was rejected and `attempt_number < 3`,  
   **WHEN** I upload a new slip,  
   **THEN** the order transitions back to `PENDING_SLIP_VERIFICATION` with incremented attempt number.

2. **GIVEN** `attempt_number = 3` and slip is rejected,  
   **WHEN** I try to upload again,  
   **THEN** I see error "Maximum slip upload attempts reached" (VAL_007) and must contact support.

---

### US-037: Buyer Link Expiry

**As the** system,  
**I want to** automatically expire buyer quotation links after the configured period,  
**So that** stale quotations do not remain accessible.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 2 |
| **Sprint** | 6 |
| **Source** | SRS-FR-010 |

**Acceptance Criteria**:

1. **GIVEN** a buyer link has passed `buyer_link_expires_at`,  
   **WHEN** the `quotation-link-expiry` job runs,  
   **THEN** the quotation transitions to `EXPIRED`.

---

### US-038: Payment Mode Selection UX

**As a** Buyer,  
**I want to** clearly understand the two payment options,  
**So that** I can make an informed choice.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 6 |
| **Source** | PRD FR-012 |

**Acceptance Criteria**:

1. **GIVEN** I view the payment section,  
   **WHEN** I see the options,  
   **THEN** both "Platform Payment" and "Direct Transfer" are clearly described with processing info.

---

### US-039: Buyer Receives Order Confirmation

**As a** Buyer,  
**I want to** receive confirmation after placing my order,  
**So that** I know my purchase was successful.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 7 |
| **Source** | PRD FR-014 |

**Acceptance Criteria**:

1. **GIVEN** my payment is confirmed,  
   **WHEN** the order is created,  
   **THEN** I see a confirmation page with order number, items, total, and expected delivery.

2. **GIVEN** the order is confirmed,  
   **WHEN** the system processes it,  
   **THEN** I receive an email/SMS confirmation with tracking link.

---

## E-06: Order Tracking & Fulfillment

**Epic Description**: Enable buyers and partners to track orders from placement through delivery.

**Business Value**: Provides transparency and triggers commission calculation on delivery.

**Source**: PRD FR-014 | SRS-FR-014

---

### US-040: Buyer Tracks Order Status

**As a** Buyer,  
**I want to** track my order status in real-time,  
**So that** I know when to expect delivery.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 7 |
| **Source** | PRD FR-014, SRS-FR-014 |

**Acceptance Criteria**:

1. **GIVEN** I have a placed order,  
   **WHEN** I open the tracking page,  
   **THEN** I see: PROCESSING → SHIPPED → DELIVERED with timestamps.

2. **GIVEN** the order status changes,  
   **WHEN** I view the tracking page,  
   **THEN** the updated status is reflected within 15 minutes.

---

### US-041: Partner Tracks Order Status

**As a** Partner Member,  
**I want to** track orders from my quotations,  
**So that** I can monitor delivery progress and anticipate commissions.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 7 |
| **Source** | SRS-FR-014 |

**Acceptance Criteria**:

1. **GIVEN** I am a partner with orders,  
   **WHEN** I view my order list,  
   **THEN** I see all buyer orders with current status and expected delivery.

2. **GIVEN** an order is `DELIVERED`,  
   **WHEN** I view it,  
   **THEN** I see a note that commission calculation has been triggered.

---

### US-042: Order Status Sync from Allkons M

**As the** system,  
**I want to** sync order statuses from Allkons M Order Management,  
**So that** buyer orders reflect actual fulfillment status.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 7 |
| **Source** | SRS-FR-014 |

**Acceptance Criteria**:

1. **GIVEN** an Allkons M order transitions to `SHIPPED`,  
   **WHEN** the `order-status-sync` job runs (every 15 min),  
   **THEN** the `buyer_order` transitions to `SHIPPED`.

2. **GIVEN** an Allkons M order transitions to `DELIVERED`,  
   **WHEN** the sync job runs,  
   **THEN** the `buyer_order` transitions to `DELIVERED` and event `order.delivered` is dispatched.

---

### US-043: Order Cancellation

**As a** Buyer or Admin,  
**I want to** cancel an order before it is shipped,  
**So that** I can stop the process if needed.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 8 |
| **Source** | SRS §5.4 |

**Acceptance Criteria**:

1. **GIVEN** an order is in `PENDING`, `PAID`, or `PROCESSING`,  
   **WHEN** cancellation is requested,  
   **THEN** the order transitions to `CANCELLED` and refund is initiated if payment was made.

2. **GIVEN** an order is `SHIPPED` or `DELIVERED`,  
   **WHEN** cancellation is attempted,  
   **THEN** it is not allowed.

---

### US-044: Delivery Confirmation Triggers Commission

**As the** system,  
**I want to** automatically trigger commission calculation on delivery,  
**So that** partners are compensated promptly.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 8 |
| **Source** | SRS-FR-014, SRS-FR-016 |

**Acceptance Criteria**:

1. **GIVEN** an order transitions to `DELIVERED`,  
   **WHEN** event `order.delivered` is processed,  
   **THEN** a `commission_record` is created with status `CALCULATED` and correct breakdown.

---

## E-07: Commission Management

**Epic Description**: Automated commission calculation, transparent tracking, dispute resolution, and payout processing.

**Business Value**: Fair and transparent compensation drives partner motivation and retention.

**Source**: PRD FR-017 | SRS-FR-016 | BRD §4.1

---

### US-045: Commission Calculation on Delivery

**As the** system,  
**I want to** calculate partner commission when an order is delivered,  
**So that** commissions are accurately and promptly determined.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 8 |
| **Source** | SRS-FR-016, BRD §4.1 |

**Acceptance Criteria**:

1. **GIVEN** an order is delivered,  
   **WHEN** the commission system processes it,  
   **THEN** `commission = order_value × commission_rate` with splits: member (80%), lead (15%), platform (5%) by default.

2. **GIVEN** the shop has a category-specific rate override,  
   **WHEN** commission is calculated,  
   **THEN** the category rate overrides the default.

3. **GIVEN** the partner has a `commission_rate_override`,  
   **WHEN** commission is calculated,  
   **THEN** the partner override takes precedence.

4. **GIVEN** the order was direct payment,  
   **WHEN** commission is calculated,  
   **THEN** commission is based on the verified slip amount.

5. **GIVEN** the order was platform payment,  
   **WHEN** commission is calculated,  
   **THEN** commission is based on the settled payment amount.

---

### US-046: View Commission Dashboard

**As a** Partner Member,  
**I want to** view my commission earnings and payment status,  
**So that** I can track my income.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 8 |
| **Source** | PRD FR-017 |

**Acceptance Criteria**:

1. **GIVEN** I am a partner,  
   **WHEN** I navigate to "My Commissions",  
   **THEN** I see summary cards: total earned, pending approval, disputed, paid this month.

2. **GIVEN** I view the commission list,  
   **WHEN** I see the records,  
   **THEN** each shows: order number, order value, commission rate, my share, status, date.

3. **GIVEN** I filter by date range or status,  
   **WHEN** filters are applied,  
   **THEN** only matching records are shown.

---

### US-047: Raise Commission Dispute

**As a** Partner Member,  
**I want to** dispute a commission calculation I believe is incorrect,  
**So that** errors can be corrected.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 9 |
| **Source** | SRS-FR-016 |

**Acceptance Criteria**:

1. **GIVEN** a commission is `CALCULATED` and within 15 days of creation,  
   **WHEN** I click "Dispute" and provide a reason,  
   **THEN** the commission transitions to `DISPUTED` and Admin is notified.

2. **GIVEN** 15 days have passed since calculation,  
   **WHEN** I try to dispute,  
   **THEN** I see error "Dispute window expired (15 days)" (VAL_008).

---

### US-048: Admin Resolves Commission Dispute

**As an** Allkons Admin,  
**I want to** review and resolve commission disputes,  
**So that** partners receive fair compensation.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 9 |
| **Source** | SRS-FR-016 |

**Acceptance Criteria**:

1. **GIVEN** I am Admin with `commission.manage` permission,  
   **WHEN** I open a disputed commission,  
   **THEN** I see order details, calculation breakdown, and partner's dispute reason.

2. **GIVEN** I approve the original amount,  
   **WHEN** I select "Approve Original",  
   **THEN** the commission transitions to `APPROVED`.

3. **GIVEN** I adjust the amount,  
   **WHEN** I enter a new amount and notes,  
   **THEN** the commission transitions to `ADJUSTED` with updated amounts.

4. **GIVEN** I deny the commission,  
   **WHEN** I provide notes and select "Deny",  
   **THEN** the commission transitions to `CANCELLED`.

---

### US-049: Commission Auto-Approve After 15 Days

**As the** system,  
**I want to** auto-approve commissions after the 15-day dispute window,  
**So that** undisputed commissions proceed to payout.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 9 |
| **Source** | SRS §5.5 |

**Acceptance Criteria**:

1. **GIVEN** a commission has been `CALCULATED` for more than 15 days with no dispute,  
   **WHEN** the `commission-auto-approve` job runs (daily 1:00 AM ICT),  
   **THEN** the commission transitions to `APPROVED`.

---

### US-050: Commission Payout Processing

**As the** system,  
**I want to** process commission payouts in weekly batches,  
**So that** partners receive earnings on a predictable schedule.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 9 |
| **Source** | SRS §5.5 |

**Acceptance Criteria**:

1. **GIVEN** commissions are in `APPROVED` or `ADJUSTED` status,  
   **WHEN** the `commission-payout-batch` job runs (Monday 6:00 AM ICT),  
   **THEN** all eligible commissions are processed and transitioned to `PAID`.

2. **GIVEN** a payout is processed,  
   **WHEN** the partner views the commission,  
   **THEN** they see `paid_at` timestamp and the payout amount.

---

### US-051: Team Lead Views Team Commissions

**As a** Team Lead,  
**I want to** see commission data for my entire team,  
**So that** I can monitor team earnings and performance.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 9 |
| **Source** | SRS §4.7 |

**Acceptance Criteria**:

1. **GIVEN** I am a Team Lead with `commission.view_team` permission,  
   **WHEN** I navigate to team commissions,  
   **THEN** I see aggregated and per-member commission data.

2. **GIVEN** I select a member,  
   **WHEN** I drill down,  
   **THEN** I see their individual commission records with full detail.

---

## E-08: Team & Performance Management

**Epic Description**: Team structure visibility, performance tracking, and management tools for Team Leads and Admin.

**Business Value**: Enables coaching, accountability, and performance optimization across the partner network.

**Source**: PRD FR-015, FR-016 | SRS-FR-015

---

### US-052: View Team Members

**As a** Team Lead,  
**I want to** see all members in my team,  
**So that** I can manage and support them.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 6 |
| **Source** | PRD FR-015, SRS-FR-015 |

**Acceptance Criteria**:

1. **GIVEN** I am a Team Lead with `team.view_members` permission,  
   **WHEN** I navigate to "My Team",  
   **THEN** I see a list of all team members with name, status, territory, join date.

2. **GIVEN** I view the list,  
   **WHEN** I see it,  
   **THEN** only members assigned to my team are shown.

---

### US-053: Team Lead Performance Dashboard

**As a** Team Lead,  
**I want to** view aggregated team performance metrics,  
**So that** I can identify strengths and areas for improvement.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 6 |
| **Source** | PRD FR-016, SRS §4.8 |

**Acceptance Criteria**:

1. **GIVEN** I am a Team Lead,  
   **WHEN** I open the team performance dashboard,  
   **THEN** I see aggregates: total quotations, total orders, conversion rate, total commission, active members.

2. **GIVEN** the dashboard is loaded,  
   **WHEN** I view the member breakdown,  
   **THEN** I see per-member: quotations created, orders converted, commission earned.

3. **GIVEN** I set a date range filter,  
   **WHEN** metrics recalculate,  
   **THEN** data reflects only the selected period.

---

### US-054: Export Performance Report

**As a** Team Lead,  
**I want to** export team performance data,  
**So that** I can share it with stakeholders or analyze offline.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 7 |
| **Source** | SRS-FR-015, SRS §4.8 |

**Acceptance Criteria**:

1. **GIVEN** I am on the performance dashboard,  
   **WHEN** I click "Export" and select CSV or PDF,  
   **THEN** the report downloads with the current date range and filters applied.

---

### US-055: Partner Views Own Performance

**As a** Partner Member,  
**I want to** see my personal performance metrics,  
**So that** I can track my progress.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 6 |
| **Source** | PRD FR-016 |

**Acceptance Criteria**:

1. **GIVEN** I am a partner,  
   **WHEN** I open "My Performance",  
   **THEN** I see: quotations created, submitted, approved, orders placed, conversion rate, total commission.

2. **GIVEN** the metrics are displayed,  
   **WHEN** I filter by month,  
   **THEN** metrics update for the selected period.

---

### US-056: Partner Views Team Lead Info

**As a** Partner Member,  
**I want to** see who my Team Lead is,  
**So that** I can reach out for support.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 2 |
| **Sprint** | 6 |
| **Source** | PRD FR-015 |

**Acceptance Criteria**:

1. **GIVEN** I am a partner assigned to a team,  
   **WHEN** I view my profile or team page,  
   **THEN** I see my Team Lead's name and contact information.

---

### US-057: Admin Views Platform-Wide Team Metrics

**As an** Allkons Admin,  
**I want to** see performance metrics across all teams,  
**So that** I can assess overall program health.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 5 |
| **Sprint** | 7 |
| **Source** | SRS §4.9 |

**Acceptance Criteria**:

1. **GIVEN** I am Admin with `analytics.view_platform` permission,  
   **WHEN** I open the admin dashboard,  
   **THEN** I see platform-wide: total partners, quotations, orders, commission, conversion rate.

2. **GIVEN** the dashboard is loaded,  
   **WHEN** I drill down by team or territory,  
   **THEN** I see detailed metrics for the selected segment.

---

## E-09: Consent & PDPA Compliance

**Epic Description**: Integrate with third-party Consent Center for PDPA-compliant data handling across all touchpoints.

**Business Value**: Legal compliance and trust — required for operation in Thailand.

**Source**: PRD FR-018, FR-019 | SRS-FR-017 | BRD §6.1

---

### US-058: Collect Partner Registration Consent

**As the** system,  
**I want to** collect PDPA consent during partner registration,  
**So that** we process partner data legally.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 1 |
| **Source** | SRS-FR-017, Consent C-001 |

**Acceptance Criteria**:

1. **GIVEN** a user is submitting a partner application,  
   **WHEN** they reach the consent step,  
   **THEN** the system calls Consent Center API `POST /consents` with purpose C-001 and the user must accept.

2. **GIVEN** the user accepts consent,  
   **WHEN** the Consent Center returns a token,  
   **THEN** the token is stored in `consent_audit_log` and linked to the application.

3. **GIVEN** the user declines consent,  
   **WHEN** they try to submit,  
   **THEN** submission is blocked with error "PDPA consent required" (E-004).

---

### US-059: Collect Buyer Data Sharing Consent

**As the** system,  
**I want to** collect buyer consent before sharing data with partners,  
**So that** buyer privacy is protected.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Source** | SRS-FR-017, Consent C-002 |

**Acceptance Criteria**:

1. **GIVEN** a quotation is sent to a buyer,  
   **WHEN** the buyer opens the link,  
   **THEN** a consent notice is displayed before showing the quotation.

2. **GIVEN** the buyer accepts,  
   **WHEN** consent is recorded,  
   **THEN** the Consent Center stores the grant and an audit log entry is created.

---

### US-060: Validate Consent Before Data Access

**As the** system,  
**I want to** validate consent before any data access,  
**So that** we never access data without valid consent.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Source** | SRS-FR-017 |

**Acceptance Criteria**:

1. **GIVEN** a partner attempts to access buyer data,  
   **WHEN** the system processes the request,  
   **THEN** it calls `GET /consents/{userId}/{purposeId}` to validate active consent.

2. **GIVEN** consent is not active or withdrawn,  
   **WHEN** validation fails,  
   **THEN** access is denied with error AUTH_005.

---

### US-061: Handle Consent Withdrawal

**As the** system,  
**I want to** process consent withdrawal requests,  
**So that** user data is handled according to their preferences.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 2 |
| **Source** | SRS-FR-017, BRD §6.1 |

**Acceptance Criteria**:

1. **GIVEN** a user withdraws consent,  
   **WHEN** the Consent Center notifies the system,  
   **THEN** affected data is masked or deleted within 30 days and an audit log entry is created.

2. **GIVEN** a partner withdraws C-001 consent,  
   **WHEN** the withdrawal is processed,  
   **THEN** the partner profile is deactivated and all active quotations are cancelled.

---

### US-062: Consent Audit Log

**As an** Allkons Admin,  
**I want to** view consent audit logs,  
**So that** I can demonstrate PDPA compliance.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Source** | SRS §3.2.10 |

**Acceptance Criteria**:

1. **GIVEN** I am an Admin,  
   **WHEN** I open the consent audit log,  
   **THEN** I see all grants and withdrawals with: user, consent ID, action, version, timestamp, IP.

2. **GIVEN** the audit log,  
   **WHEN** I filter by user or consent ID,  
   **THEN** only matching records are shown.

---

## E-10: Admin & Platform Governance

**Epic Description**: Administrative tools for managing partners, configuring commission settings, and overseeing platform operations.

**Business Value**: Operational control and governance for program quality and compliance.

**Source**: BRD §3.3 | SRS §4.9

---

### US-063: Admin Dashboard

**As an** Allkons Admin,  
**I want to** see a platform-wide analytics dashboard,  
**So that** I can monitor overall program health.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 8 |
| **Sprint** | 3 |
| **Source** | SRS §4.9 |

**Acceptance Criteria**:

1. **GIVEN** I am an Admin,  
   **WHEN** I open the admin dashboard,  
   **THEN** I see KPI cards: active partners, pending applications, quotations this month, orders, conversion rate, commission revenue.

2. **GIVEN** the dashboard is loaded,  
   **WHEN** I view trend charts,  
   **THEN** I see monthly trends for partner growth, quotation volume, commission revenue.

---

### US-064: Configure Commission Settings

**As an** Allkons Admin,  
**I want to** configure commission rates and split percentages,  
**So that** the commission model can be adjusted as business evolves.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 5 |
| **Sprint** | 4 |
| **Source** | SRS §4.9 |

**Acceptance Criteria**:

1. **GIVEN** I am Admin with `admin.settings.manage` permission,  
   **WHEN** I open commission settings,  
   **THEN** I see: default rate, member/lead/platform splits, category overrides.

2. **GIVEN** I update the default rate,  
   **WHEN** I save,  
   **THEN** new calculations use the updated rate (existing commissions unaffected).

3. **GIVEN** I add a category override,  
   **WHEN** I specify category and rate,  
   **THEN** commissions for that category use the override.

---

### US-065: Suspend Partner Profile

**As an** Allkons Admin,  
**I want to** suspend a partner profile,  
**So that** I can address compliance issues.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Source** | SRS §2.1 |

**Acceptance Criteria**:

1. **GIVEN** a partner profile is `ACTIVE`,  
   **WHEN** I select "Suspend" and provide a reason,  
   **THEN** the profile transitions to `SUSPENDED` — the partner cannot create quotations or source products.

2. **GIVEN** a profile is `SUSPENDED`,  
   **WHEN** I select "Reactivate",  
   **THEN** the profile transitions back to `ACTIVE`.

---

### US-066: Deactivate Partner Profile

**As an** Allkons Admin,  
**I want to** permanently deactivate a partner,  
**So that** I can remove them from the program.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Source** | SRS §2.1 |

**Acceptance Criteria**:

1. **GIVEN** a partner profile is `ACTIVE` or `SUSPENDED`,  
   **WHEN** I select "Deactivate" and confirm,  
   **THEN** the profile transitions to `DEACTIVATED`, all shop relationships are terminated, pending quotations are cancelled.

---

### US-067: Admin Partner List & Search

**As an** Allkons Admin,  
**I want to** search and filter all partners,  
**So that** I can find and manage specific partners.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Source** | SRS §2.1 |

**Acceptance Criteria**:

1. **GIVEN** I am an Admin,  
   **WHEN** I open the partner management page,  
   **THEN** I see all partners searchable by name, territory, status, and tier.

---

### US-068: Admin Views Quotation Pipeline

**As an** Allkons Admin,  
**I want to** see all quotations across the platform,  
**So that** I can monitor sales activity.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 5 |
| **Source** | SRS §4.5 |

**Acceptance Criteria**:

1. **GIVEN** I am an Admin,  
   **WHEN** I open the quotation pipeline view,  
   **THEN** I see quotations grouped by status with counts and total values.

---

### US-069: Idempotency Key Support

**As the** system,  
**I want to** support idempotency keys on all POST endpoints,  
**So that** duplicate requests do not cause side effects.

| Attribute | Value |
|-----------|-------|
| **Priority** | MUST |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Source** | SRS §7.4 |

**Acceptance Criteria**:

1. **GIVEN** a POST request includes an `Idempotency-Key` header,  
   **WHEN** a duplicate request with the same key arrives within 24 hours,  
   **THEN** the system returns the original response without creating duplicates.

2. **GIVEN** idempotency keys are stored,  
   **WHEN** 24 hours pass,  
   **THEN** the key expires from Redis.

---

## E-11: Analytics & Reporting

**Epic Description**: Event tracking, conversion funnel analytics, and reporting dashboards.

**Business Value**: Data-driven insights for optimizing partner performance and business growth.

**Source**: SRS §6 | BRD §7

---

### US-070: Analytics Event Tracking

**As the** system,  
**I want to** track all key business events,  
**So that** we can measure KPIs and build reports.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 8 |
| **Sprint** | 9 |
| **Source** | SRS §6.2 |

**Acceptance Criteria**:

1. **GIVEN** any tracked business event occurs,  
   **WHEN** the event is processed,  
   **THEN** an `analytics_events` record is created with: event_name, actor_id, actor_role, entity_type, entity_id, metadata, timestamp.

2. **GIVEN** a `quotation.sent_to_buyer` event occurs,  
   **WHEN** the event is stored,  
   **THEN** metadata includes: partner_profile_id, team_lead_id, territory, shop_ids, quotation_value, line_item_count.

---

### US-071: Conversion Funnel Report

**As an** Allkons Admin,  
**I want to** see the conversion funnel from quotation to delivery,  
**So that** I can identify bottlenecks.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 5 |
| **Sprint** | 10 |
| **Source** | SRS §6.4 |

**Acceptance Criteria**:

1. **GIVEN** I am an Admin,  
   **WHEN** I open the conversion funnel report,  
   **THEN** I see: Quotations Sent → Buyer Viewed → Payment Selected → Order Created → Payment Completed → Delivered, with drop-off rates.

---

### US-072: Partner Performance Report

**As a** Team Lead,  
**I want to** generate detailed partner performance reports,  
**So that** I can coach my team effectively.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 10 |
| **Source** | BRD §7.2 |

**Acceptance Criteria**:

1. **GIVEN** I am a Team Lead,  
   **WHEN** I generate a report for a member,  
   **THEN** I see: quotations, orders, conversion rate, commission, and trend over time.

---

### US-073: Daily Analytics Aggregation

**As the** system,  
**I want to** aggregate daily analytics,  
**So that** dashboards load quickly.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 5 |
| **Sprint** | 9 |
| **Source** | SRS §10 |

**Acceptance Criteria**:

1. **GIVEN** the `analytics-aggregation` job runs daily at 3:00 AM ICT,  
   **WHEN** it processes the previous day's events,  
   **THEN** aggregated metrics are stored for dashboard consumption.

---

### US-074: Data Retention Cleanup

**As the** system,  
**I want to** enforce data retention policies automatically,  
**So that** we comply with regulatory requirements.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 5 |
| **Sprint** | 10 |
| **Source** | SRS §8.5 |

**Acceptance Criteria**:

1. **GIVEN** the `data-retention-cleanup` job runs weekly (Sunday 4:00 AM ICT),  
   **WHEN** it evaluates data against retention policies,  
   **THEN** expired data is archived or deleted per policy.

---

## E-12: Notifications & Communication

**Epic Description**: Multi-channel notifications for all key workflow events.

**Business Value**: Keeps all stakeholders informed and drives timely actions.

**Source**: SRS §9.1, §9.2

---

### US-075: Application Status Notifications

**As a** partner applicant,  
**I want to** receive notifications when my application status changes,  
**So that** I stay informed about the approval process.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 5 |
| **Sprint** | 5 |
| **Source** | SRS §9.2 |

**Acceptance Criteria**:

1. **GIVEN** my application status changes (approved, rejected, expired),  
   **WHEN** the transition occurs,  
   **THEN** I receive email and/or SMS notification with the new status and relevant details.

---

### US-076: Shop Owner Pending Action Notifications

**As a** Shop Owner,  
**I want to** receive notifications when I have pending relationship or quotation approvals,  
**So that** I can respond within the SLA.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 5 |
| **Source** | SRS §9.2 |

**Acceptance Criteria**:

1. **GIVEN** a new shop relationship or sub-quotation is pending my approval,  
   **WHEN** the request is created,  
   **THEN** I receive a notification via email/SMS with a link to review.

2. **GIVEN** the SLA is approaching (7 days remaining),  
   **WHEN** the reminder job runs,  
   **THEN** I receive a reminder notification.

---

### US-077: Buyer Order & Payment Notifications

**As a** Buyer,  
**I want to** receive notifications about my order and payment status,  
**So that** I stay informed throughout the purchase process.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 6 |
| **Source** | SRS §9.2 |

**Acceptance Criteria**:

1. **GIVEN** my order status changes (paid, processing, shipped, delivered),  
   **WHEN** the transition occurs,  
   **THEN** I receive an email/SMS notification with order details.

2. **GIVEN** my payment slip is rejected,  
   **WHEN** the shop rejects it,  
   **THEN** I receive a notification with the rejection reason and instructions to re-upload.

---

### US-078: Commission Payout Notifications

**As a** Partner Member,  
**I want to** receive notifications about commission calculations and payouts,  
**So that** I know when I earn and when I get paid.

| Attribute | Value |
|-----------|-------|
| **Priority** | SHOULD |
| **Story Points** | 3 |
| **Sprint** | 9 |
| **Source** | SRS §9.2 |

**Acceptance Criteria**:

1. **GIVEN** a new commission is calculated for me,  
   **WHEN** the calculation completes,  
   **THEN** I receive a notification with the commission amount and 15-day dispute window reminder.

2. **GIVEN** my commission is paid out,  
   **WHEN** the payout batch processes,  
   **THEN** I receive a notification with the payout amount and reference.

---

## Appendix: Story Point Summary by Sprint

| Sprint | Stories | Total Points | Key Focus |
|--------|---------|-------------|-----------|
| 1 | US-001, 002, 003, 008, 058 | 24 | Registration, Admin Review, Consent |
| 2 | US-004, 005, 006, 007, 009, 013, 059, 060, 061, 062 | 36 | Shop Approval, Territory, PDPA |
| 3 | US-010, 011, 012, 014, 015, 016, 018, 019, 063, 067, 069 | 51 | Sourcing, Admin Dashboard, Governance |
| 4 | US-017, 020, 021, 022, 027, 030, 064, 065, 066 | 42 | Quotation CRUD, Commission Config |
| 5 | US-023, 024, 025, 026, 028, 029, 031, 068, 075, 076 | 48 | Quotation Approval, Buyer View, Notifications |
| 6 | US-032, 033, 034, 035, 037, 038, 052, 053, 055, 056, 077 | 53 | Payment Flows, Team Management |
| 7 | US-036, 039, 040, 041, 042, 054, 057 | 27 | Order Tracking, Reports |
| 8 | US-043, 044, 045, 046 | 19 | Commission Calculation |
| 9 | US-047, 048, 049, 050, 051, 070, 073, 078 | 35 | Disputes, Payout, Analytics |
| 10 | US-071, 072, 074 | 13 | Funnel Report, Data Retention |

---

## Traceability Matrix

| Epic | PRD Refs | BRD Refs | SRS Refs |
|------|----------|----------|----------|
| E-01 | FR-001, FR-002 | §3.1, §3.2 | SRS-FR-001, SRS-FR-002, SRS-FR-003 |
| E-02 | FR-003 | §3.1 | SRS-FR-004 |
| E-03 | FR-004, FR-005, FR-006 | — | SRS-FR-005, SRS-FR-006 |
| E-04 | FR-007, FR-008, FR-009, FR-010 | — | SRS-FR-007 to SRS-FR-010 |
| E-05 | FR-011, FR-012, FR-013, FR-014 | — | SRS-FR-011 to SRS-FR-013 |
| E-06 | FR-014 | — | SRS-FR-014 |
| E-07 | FR-017 | §4.1 | SRS-FR-016 |
| E-08 | FR-015, FR-016 | — | SRS-FR-015 |
| E-09 | FR-018, FR-019 | §6.1 | SRS-FR-017 |
| E-10 | — | §3.3 | §2.1, §4.9, §7.4 |
| E-11 | — | §7 | §6, §8.5, §10 |
| E-12 | — | — | §9.1, §9.2 |
