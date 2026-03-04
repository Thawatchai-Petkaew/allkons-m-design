# UXSPEC-startup-partner-center

## Document Control
- Owner: UX/UI
- Reviewers: PO/PM, Dev Lead
- Status: Draft
- Version: v0.2
- Last updated: 2026-03-04
- Feature key: startup-partner-center

## Objective
- **UX Goal**: Enable qualified partners to easily register, source products across multiple shops, and manage quotations with a high approval rate.
- **Prototype validation goals**:
  1. Validate the multi-shop sourcing and quotation splitting workflow.
  2. Test the clarity of the dual-approval status for applications.
  3. Verify the "Buyer View" of the quotation builds trust and facilitates payment.
- **Non-goals**:
  - Backend integration (mock data only).
  - Native mobile app behavior (responsive web only).
  - Complex inventory management or advanced financial services.

## Context
- **User roles**:
  - **Partner**: Registers, searches products, creates quotations.
  - **Shop Owner**: Approves partner relationships and quotations.
  - **Admin**: Approves partner applications.
  - **Buyer**: Views quotations, pays.
- **Preconditions**:
  - User has an Allkons account with verified KYC.
- **Constraints**:
  - Desktop-first for heavy data tasks (sourcing/quoting), Mobile-responsive for on-site usage.
  - Must use Allkons Design System (AntD based).

## References
- BRD: `public/research/modules/startup_partner/startup-partner-center-BRD.md`
- PRD: `public/research/modules/startup_partner/startup-partner-center-PRD.md`
- SRS: `public/research/modules/startup_partner/startup-partner-center-SRS.md`
- Glossary: `public/research/glossary.md`
- Prototype runbook: `docs/04-ux/PROTOTYPE-startup-partner-center.md`

---

## Screen Inventory (SCR)

### SCR-001 Partner Dashboard
- **Route**: `/seller/partner/dashboard`
- **Purpose**: Overview of partner status, quick actions, and performance metrics.
- **Primary actions**: "Create New Quotation", "Search Products".
- **Secondary actions**: View recent notifications, Check Commission.
- **Entry points**: Sidebar nav, Login.
- **Exit points**: Quotation List, Sourcing, Registration (if new).

### SCR-002 Partner Registration (Wizard)
- **Route**: `/seller/partner/register`
- **Purpose**: Onboarding flow for new partners (Territory + Shop Selection).
- **Primary actions**: "Submit Application".
- **Entry points**: Promo banner, Dashboard (if not registered).
- **Exit points**: Registration Success/Pending screen.

### SCR-003 Product Sourcing
- **Route**: `/seller/partner/sourcing`
- **Purpose**: Search products from eligible shops within territory.
- **Primary actions**: "Add to Quotation", "Compare".
- **Secondary actions**: Filter by Category/Shop/Price.
- **Entry points**: Dashboard, Navigation.
- **Exit points**: Product Detail, Quotation Draft.

### SCR-004 Product Detail
- **Route**: `/seller/partner/product/:id`
- **Purpose**: View detailed product info, pricing, and availability.
- **Primary actions**: "Add to Quotation".
- **Entry points**: Sourcing List.
- **Exit points**: Sourcing List.

### SCR-005 Quotation Management (List)
- **Route**: `/seller/partner/quotations`
- **Purpose**: List of all quotations with status tabs (Draft, Pending Approval, Approved, Sent).
- **Primary actions**: "View Details", "Delete Draft".
- **Entry points**: Dashboard, Sidebar.
- **Exit points**: Quotation Detail.

### SCR-006 Quotation Detail (Editor/View)
- **Route**: `/seller/partner/quotations/:id`
- **Purpose**: Edit draft, view status of sub-quotations, send to buyer.
- **Primary actions**: "Submit for Approval", "Send to Buyer" (if approved).
- **Entry points**: Quotation List.
- **Exit points**: Buyer View (Preview).

### SCR-007 Buyer Quotation View (Public)
- **Route**: `/q/:token`
- **Purpose**: Buyer-facing view of the approved quotation with payment options.
- **Primary actions**: "Accept & Pay".
- **Entry points**: Direct Link.
- **Exit points**: Payment Gateway / Slip Upload.

---

## Navigation / Click Map

- **From SCR-001 (Dashboard)**
  - Action: Click "Register" (if new) -> Navigate SCR-002
  - Action: Click "Create Quotation" -> Navigate SCR-003
  - Action: Click "My Quotations" -> Navigate SCR-005

- **From SCR-002 (Registration)**
  - Action: Select Territory -> Load eligible shops
  - Action: Select Shops -> Update summary
  - Action: Submit Form -> Show Success Toast -> Navigate SCR-001 (State: Pending)

- **From SCR-003 (Sourcing)**
  - Action: Search/Filter -> Update List
  - Action: Click Product -> Navigate SCR-004
  - Action: Click "Add to Quote" -> Add to cart state -> Toast "Added"
  - Action: Click "Create Quote" -> Navigate SCR-006 (State: Draft)

- **From SCR-006 (Quotation Detail)**
  - Action: Click "Submit for Approval" -> Update Status `PENDING_SHOP_APPROVAL` -> Toast "Submitted"
  - Action: Click "Send to Buyer" (when `APPROVED`) -> Open Share Modal -> Copy Link

- **From SCR-007 (Buyer View)**
  - Action: Click "Pay via Platform" -> Navigate Payment Gateway
  - Action: Click "Direct Transfer" -> Show Bank Details & Slip Upload

---

## Interaction Specs (UX-IDs)

### UX-001 Product Sourcing Search
- **Screen**: SCR-003
- **Trigger**: Typing in search bar + Enter or Debounce.
- **Preconditions**: Partner is Active.
- **Behavior**: Filter list by keyword against mock entities (Name, SKU).
- **Validation**: None.
- **Success feedback**: List updates with matching items.
- **Error feedback**: "No products found" empty state.

### UX-002 Submit Quotation
- **Screen**: SCR-006
- **Trigger**: Click "Submit for Approval".
- **Preconditions**: Status is DRAFT, items > 0.
- **Behavior**:
  1. Validate availability (mock).
  2. Transition status to `PENDING_SHOP_APPROVAL`.
  3. Split into sub-quotations by shop.
  4. Show success toast.
- **Validation**: Minimum 1 item.
- **Error feedback**: Toast "Some items are out of stock" or "Minimum 1 item required".

### UX-003 Buyer Payment Selection
- **Screen**: SCR-007
- **Trigger**: Click "Proceed to Payment".
- **Preconditions**: Quotation is `SENT_TO_BUYER`.
- **Behavior**: Show modal to select "Platform Payment" or "Direct Transfer".
- **Success feedback**: Proceed to selected flow.

---

## UI States Matrix

### SCR-001 Dashboard
- **loading**: Skeleton loaders for stats cards.
- **empty**: "Welcome! Start by registering." (if new)
- **success**: Show charts, recent activity.
- **restricted**: "Your application is Pending/Rejected."

### SCR-003 Sourcing
- **loading**: Spinner on list.
- **empty**: "No products found matching filters."
- **success**: Grid/List of products.
- **error**: "Failed to load catalog."

### SCR-006 Quotation Detail
- **loading**: Skeleton form.
- **draft**: Editable inputs, "Submit" button active.
- **pending**: Read-only, status badges "Pending Shop".
- **changes_requested**: Editable for specific items, shop notes visible.
- **approved**: Read-only, "Send to Buyer" enabled.
- **rejected**: Read-only, show rejection reason.

---

## Scenario Switch (Prototype)
- **Method**: `?scenario=<id>` query param.
- **Default**: `sc_success`

### Scenarios:
- **sc_success**:
  - Partner is ACTIVE.
  - Sourcing returns results.
  - Quotation flow works (Draft -> Approved).
- **sc_pending**:
  - Partner application is `PENDING_ADMIN`.
  - Dashboard shows "Application under review".
  - Sourcing is disabled.
- **sc_rejected**:
  - Partner application `REJECTED`.
  - Dashboard shows "Application rejected: Reason...".
- **sc_empty**:
  - Partner ACTIVE but no history.
  - Sourcing returns empty list.

---

## Mock Data (UI Model)

### Entities
- **PartnerProfile**: `{ status, territory, shops[] }`
- **Product**: `{ id, name, sku, price, shopName, stock, category }`
- **Quotation**: `{ id, status, buyerName, total, items[], subQuotations[] }`
- **Shop**: `{ id, name, paymentMethods[] }`

### Datasets (See JSON for full data)
- **sc_success**: 1 Active Partner, 10 Products, 2 Quotations.
- **sc_pending**: 1 Pending Partner.

---

## Content / Microcopy
- **Dashboard**:
  - Pending: "ใบสมัครของคุณกำลังรอการตรวจสอบ (Application Pending)"
  - Rejected: "ใบสมัครไม่ผ่านการอนุมัติ (Application Rejected)"
- **Sourcing**:
  - Search Placeholder: "ค้นหาสินค้า SKU, ชื่อ หรือ หมวดหมู่"
  - Add to Quote: "เพิ่มลงใบเสนอราคา"
- **Quotation**:
  - Status: "ร่าง (Draft)", "รอร้านค้าอนุมัติ (Pending Shop)", "อนุมัติแล้ว (Approved)", "ส่งให้ผู้ซื้อแล้ว (Sent)"

---

## Component Mapping (Design System)
- **Layout**: `SidebarLayout` (Admin), `Container` (Buyer).
- **Inputs**: `SearchInput` (Sourcing), `NumberInput` (Qty).
- **Buttons**: `PrimaryButton` (Submit), `SecondaryButton` (Save Draft).
- **Feedback**: `Toast` (Actions), `Alert` (Status banners).
- **Modals**: `ConfirmDialog` (Submit), `ShareModal` (Buyer Link).
- **Badges**: `StatusBadge` (Green=Approved, Orange=Pending, Red=Rejected).

---

## Accessibility
- **Focus**: Logical tab order (Top nav -> Sidebar -> Main content).
- **Keyboard**: Enter to submit search, Esc to close modals.
- **Labels**: `aria-label` on icon-only buttons (like delete/edit).

---

## UX Handoff DoD
- [x] Screens + routes defined
- [x] Click map defined
- [x] States matrix complete
- [x] Scenarios defined
- [x] Mock data structure ready
- [x] Dev feasibility check passed (Frontend-only prototype)
