# Design Patterns Library

Complete UI pattern reference for consistent, accessible user interfaces in Allkons M.

---

## Table of Contents

1. [Navigation Patterns](#navigation-patterns)
2. [Form Patterns](#form-patterns)
3. [Card Patterns](#card-patterns)
4. [Modal Patterns](#modal-patterns)
5. [Button Patterns](#button-patterns)
6. [Loading Patterns](#loading-patterns)
7. [Notification Patterns](#notification-patterns)
8. [Data Display Patterns](#data-display-patterns)

---

## Navigation Patterns

### Top Navigation Bar

**Use when:** Primary navigation needs to be always visible and accessible.

**Desktop Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  [Logo]    Home  Products  About  Contact    [Search] [User]│
└────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Height:** 64px (mobile), 80px (desktop)
- **Background:** `var(--background-primary)` or `var(--global-neutral-dark-80)` (Dark theme)
- **Logo:** Left-aligned, 40px height
- **Links:** Horizontal, `var(--spacing-4)` to `var(--spacing-6)` spacing
- **Active state:** `var(--brand-m-primary-00)` text color or underline
- **Z-index:** `z-20` (Sticky)

### Sidebar Navigation (Admin/Dashboard)

**Use when:** Complex dashboard navigation (Partner Center, Admin Panel).

**Layout:**
```
┌──────────────┬────────────────────────┐
│              │                        │
│  Dashboard   │  Main Content          │
│  • Overview  │                        │
│              │                        │
│  Orders      │                        │
│  • Active    │                        │
│              │                        │
└──────────────┴────────────────────────┘
```

**Specifications:**
- **Width:** 240px - 280px
- **Background:** `var(--background-primary)`
- **Active Item:** `var(--brand-m-primary-light-90)` background + `var(--brand-m-primary-00)` text
- **Text:** `var(--text-secondary)` (Default), `var(--text-primary)` (Hover)

---

## Form Patterns

### Single Column Form

**Use when:** Mobile-first input flow (Registration, RFQ Details).

**Layout:**
```
┌────────────────────────────┐
│  Form Title                │
│                            │
│  First Name *              │
│  [____________________]    │
│                            │
│  [    Submit    ]          │
└────────────────────────────┘
```

**Specifications:**
- **Input Height:** `var(--input-height-large)` (48px)
- **Label:** `var(--text-secondary)`, `var(--size-sm)`
- **Border:** `var(--border-primary)` (Default), `var(--border-brand-default)` (Focus)
- **Focus Ring:** `var(--input-focus-ring-brand)` (Green glow)

### Search Input

**Layout:**
```
┌────────────────────────────┐
│  [🔍]  Search...           │
└────────────────────────────┘
```

**Specifications:**
- **Border Radius:** `var(--radius-full)` or `var(--radius-lg)`
- **Icon:** `var(--global-neutral-light-40)`
- **Placeholder:** `var(--text-placeholder)`

---

## Card Patterns

### Product Card

**Layout:**
```
┌────────────────────┐
│  [Image 1:1]       │
├────────────────────┤
│  Product Name      │
│  Brand / Shop      │
│  ฿ 1,200.00        │
│  [Add to Cart]     │
└────────────────────┘
```

**Specifications:**
- **Border Radius:** `var(--radius-lg)` (8px)
- **Shadow:** `var(--shadow-md)` on hover
- **Price:** `var(--text-brand-default)` (Green) or `var(--text-primary)`
- **Action:** Primary Button (Green)

### Dashboard Stat Card

**Layout:**
```
┌────────────────────┐
│  Total Sales       │
│  ฿ 50,000          │
│  [↗] +5%           │
└────────────────────┘
```

**Specifications:**
- **Padding:** `var(--spacing-6)`
- **Background:** `var(--background-primary)`
- **Border:** `var(--border-primary)`

---

## Button Patterns

### Button Hierarchy

**Primary Button:**
- **Use for:** Main Call-to-Action (Submit, Checkout, Register).
- **Style:** Filled `var(--brand-m-primary-00)` (Green).
- **Text:** `var(--text-white)`.
- **Hover:** `var(--brand-m-primary-dark-20)`.

**Secondary Button:**
- **Use for:** Alternative actions (Cancel, Back, Save Draft).
- **Style:** Outlined `var(--brand-m-primary-00)`.
- **Text:** `var(--brand-m-primary-00)`.
- **Background:** Transparent or `var(--background-primary)`.

**Tertiary Button:**
- **Use for:** Minor actions (View Details, Help).
- **Style:** No border, Text only.
- **Text:** `var(--text-secondary)` or `var(--text-brand-default)`.

**Danger Button:**
- **Use for:** Destructive actions (Delete, Reject).
- **Style:** Filled `var(--system-error-00)` (Red).

**Specifications:**
- **Height:** 48px (Large), 40px (Middle), 32px (Small).
- **Radius:** `var(--radius-lg)` (8px).
- **Font:** `var(--font-weight-semibold)`.

---

## Modal Patterns

### Standard Modal

**Layout:**
```
┌─────────────────────────────────────┐
│  [Backdrop]                         │
│    ┌─────────────────────────┐     │
│    │ Title               [×] │     │
│    ├─────────────────────────┤     │
│    │  Content...             │     │
│    ├─────────────────────────┤     │
│    │      [Cancel] [Confirm] │     │
│    └─────────────────────────┘     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Backdrop:** `rgba(0,0,0,0.5)`
- **Container:** `var(--background-primary)`, `var(--radius-lg)`
- **Shadow:** `var(--shadow-3xl)`
- **Close Icon:** Top-right `var(--spacing-4)`

---

## Notification Patterns

### Toast Notification

**Layout:**
```
┌────────────────────────────┐
│  ✓ Success message         │
└────────────────────────────┘
```

**Types:**
- **Success:** Green Icon (`var(--system-success-00)`), Light Green bg (`var(--special-green-sg90)`).
- **Error:** Red Icon (`var(--system-error-00)`), Light Red bg (`var(--red-rd90)`).
- **Info:** Blue Icon (`var(--system-info-00)`), Light Blue bg (`var(--blue-be90)`).
- **Warning:** Orange Icon (`var(--system-warning-00)`), Light Orange bg (`var(--refreshing-orange-ro90)`).

### Inline Alert

**Use when:** Contextual feedback in forms or sections.

**Specifications:**
- **Border Radius:** `var(--radius-md)`
- **Padding:** `var(--spacing-3)` `var(--spacing-4)`
- **Icon Size:** `var(--icon-size-medium)`

---

## Data Display Patterns

### Table

**Specifications:**
- **Header:** `var(--background-secondary)`, `var(--text-secondary)`, `var(--font-weight-semibold)`
- **Rows:** `var(--background-primary)`
- **Border:** `var(--border-primary)` bottom border
- **Hover:** `var(--background-secondary)` on row hover

### Status Badge

**Layout:**
```
(● Active)
```

**Specifications:**
- **Shape:** Pill `var(--radius-full)`
- **Padding:** `2px 8px`
- **Text:** `var(--size-xs)`, `var(--font-weight-medium)`
- **Colors:**
  - **Active/Success:** Green bg/text
  - **Pending/Warning:** Orange bg/text
  - **Inactive/Error:** Red bg/text
  - **Draft/Neutral:** Gray bg/text

---

## Summary of Key Tokens

| Property | Token | Value |
|----------|-------|-------|
| **Brand Color** | `--brand-m-primary-00` | `#00af43` (Green) |
| **Text Primary** | `--text-primary` | `#12151a` |
| **Radius** | `--radius-lg` | `8px` |
| **Spacing Base** | `--spacing-4` | `1rem` (16px) |
| **Font Family** | `--font-family-noto-sans` | `Noto Sans Thai Looped` |
