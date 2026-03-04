# PROTOTYPE-startup-partner-center

## Purpose
This prototype demonstrates the end-to-end workflow for the **Startup Partner Center**, validating the multi-shop sourcing model and quotation approval process.

## Run Steps
1.  **Clone Repo**: `git clone <repo-url>`
2.  **Install Dependencies**: `npm install`
3.  **Run Development Server**: `npm run dev`
4.  **Open in Browser**: `http://localhost:3000`

## Scenario Switching
The prototype uses a query parameter `?scenario=<id>` to switch between different user states.

| Scenario ID | Description | Key Checkpoints |
| :--- | :--- | :--- |
| `sc_success` (Default) | **Happy Path**: Active partner sourcing & quoting. | 1. Dashboard shows stats.<br>2. Sourcing returns products.<br>3. Quotation flow works. |
| `sc_pending` | **Pending Approval**: New applicant waiting. | 1. Dashboard shows "Application Pending" alert.<br>2. Sourcing is disabled/hidden.<br>3. Registration flow shows "Submitted". |
| `sc_rejected` | **Application Rejected**: Failed applicant. | 1. Dashboard shows "Rejected" banner with reason.<br>2. Re-apply button visible. |
| `sc_empty` | **New Active Partner**: No history. | 1. Dashboard empty state.<br>2. Quotation list empty. |

## Demo Script

### 1. Registration Flow (New User)
*   **Context**: A user wants to become a partner.
*   **Action**: Navigate to `/seller/partner/register`.
*   **Steps**:
    1.  Select "Bangkok" territory.
    2.  Select "Shop A" and "Shop B".
    3.  Sign Consent.
    4.  Submit.
*   **Outcome**: User is redirected to Dashboard with `Pending` status.

### 2. Sourcing & Quotation (Active Partner)
*   **Context**: Partner finding products for a buyer.
*   **Scenario**: `?scenario=sc_success`
*   **Steps**:
    1.  Go to `Product Sourcing`.
    2.  Search for "Cement".
    3.  Add "Portland Cement" (Shop A) and "Steel Bar" (Shop B) to cart.
    4.  Click "Create Quotation".
    5.  See draft split into 2 sub-quotations.
    6.  Click "Submit for Approval".
*   **Outcome**: Quotation status changes to `Pending Shop Approval`.

### 3. Buyer View (Public)
*   **Context**: Buyer receives the link.
*   **Action**: Open `/q/mock-token-123`.
*   **Steps**:
    1.  Review items and total price.
    2.  Click "Direct Transfer".
    3.  See bank details and upload slip UI.

## Limitations
*   **No Real Backend**: All data is reset on refresh.
*   **Mock Search**: Only matches keywords defined in `uxspec.json`.
*   **Payment**: Does not process actual payments; only shows UI states.
*   **Notifications**: Toasts/Alerts are simulated.

## Questions for Feedback
1.  Is the split between sub-quotations clear to the partner?
2.  Does the "Pending Approval" state clearly explain the next steps?
3.  Is the Buyer View trustworthy enough for high-value transactions?
