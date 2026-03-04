# Design Tokens

Complete design system tokens for Allkons M. These tokens map directly to `app/globals.css` and `design-system/tokens.ts`.

---

## Color System

### Brand Colors

**Primary (Green)**
Used for main brand identity, primary actions, and success states.

```css
--brand-m-primary-00: #00af43; /* Base Brand Color */
--brand-m-primary-dark-20: #008c36;
--brand-m-primary-dark-40: #006928;
--brand-m-primary-light-20: #33bf69;
--brand-m-primary-light-40: #66cf8e;
--brand-m-primary-light-80: #ccefd9;
--brand-m-primary-light-90: #e5f7ec;
```

**Special Green Scale**
```css
--special-green-sg-90: #001207;
--special-green-sg-50: #005822;
--special-green-sg-00: #00af43; /* Base */
--special-green-sg90: #e5f7ec;
```

**Refreshing Orange (Warning/Accent)**
```css
--refreshing-orange-ro-00: #ffab08; /* Base */
--refreshing-orange-ro-20: #cc8906;
--refreshing-orange-ro90: #fff7e6;
```

### Semantic Colors

**System Status**
```css
--system-success-00: var(--green-gn-00);       /* #1eb950 */
--system-error-00: var(--red-rd-00);           /* #da2110 */
--system-warning-00: var(--refreshing-orange-ro-00); /* #ffab08 */
--system-info-00: var(--blue-be-00);           /* #65b2e8 */
```

**Text Colors**
```css
--text-primary: var(--global-neutral-dark-80);   /* #12151a */
--text-secondary: var(--global-neutral-dark-40); /* #37404f */
--text-tertiary: var(--global-neutral-dark-20);  /* #495569 */
--text-quaternary: var(--global-neutral-00);     /* #5b6a83 */
--text-quinary: var(--global-neutral-light-20);  /* #7c889c */
--text-placeholder: var(--global-neutral-light-40); /* #9da6b5 */
--text-disabled: var(--global-neutral-light-40);    /* #9da6b5 */
--text-white: #ffffff;
--text-brand-default: var(--brand-m-primary-00);
```

**Background Colors**
```css
--background-primary: #ffffff;
--background-secondary: #f7f8f9;
--background-tertiary: #eff0f3;
--background-brand-default: var(--brand-m-primary-00);
--background-brand-subtle: var(--brand-m-primary-light-90);
```

**Border Colors**
```css
--border-primary: var(--global-neutral-light-80);   /* #dee1e6 */
--border-secondary: var(--global-neutral-light-60); /* #bdc3cd */
--border-brand-default: var(--brand-m-primary-00);
```

---

## Typography

**Font Family**
```css
--font-family-noto-sans: "Noto Sans Thai Looped", sans-serif;
```

**Font Weights**
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

**Font Sizes & Line Heights**
| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `2xs` | 10px | 10px | Error text |
| `xs` | 12px | 16px | Caption, Small Label |
| `sm` | 14px | 20px | Body Small, Button Small |
| `md` | 16px | 24px | Body Regular, Button Medium |
| `lg` | 18px | 24px | Body Large, Button Large |
| `xl` | 18px | 24px | H5 Heading |
| `2xl` | 20px | 26px | H4 Heading |
| `3xl` | 24px | 28px | H3 Heading, Page Title |
| `4xl` | 28px | 32px | H2 Heading |
| `5xl` | 32px | 36px | Display D6 |
| `6xl` | 36px | 48px | H1 Heading |

---

## Spacing

Based on 4px/8px scale.

| Token | Rem | Px |
|-------|-----|----|
| `none` | 0rem | 0px |
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |

---

## Breakpoints

Mobile-first approach.

| Token | Min-Width | Device |
|-------|-----------|--------|
| `sm` | 640px | Large Phone |
| `md` | 768px | Tablet Portrait |
| `lg` | 1024px | Tablet Landscape / Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large Desktop |

---

## Radius

| Token | Value |
|-------|-------|
| `none` | 0rem |
| `xs` | 0.25rem (4px) |
| `sm` | 0.5rem (8px) |
| `md` | 0.75rem (12px) |
| `lg` | 1rem (16px) |
| `xl` | 1.5rem (24px) |
| `full` | 9999px |

---

## Shadows

```css
--shadow-3xl: 0px 32px 64px -12px rgba(36, 42, 52, 0.14);
```

---

## Z-Index

Standard stacking order.
- `z-0`: Base
- `z-10`: Dropdowns
- `z-20`: Sticky Headers
- `z-40`: Overlays
- `z-50`: Modals
- `z-100`: Tooltips/Popovers
