# Design System Prompt for AI Coding

## Context
You are working on the Allkons M project, a B2B/B2C marketplace platform. The project has a comprehensive design system that MUST be used for all styling.

## Critical Rules

### 1. Design System First
- **ALWAYS** use `ds` utility from `@/design-system`
- **NEVER** hardcode values for colors, spacing, typography, or border radius
- Import: `import { ds } from '@/design-system';`

### 2. Component Hierarchy
1. **First**, check if Allkons has the component in `components/ui/` or import from `@/components`
2. If not available, use Ant Design components
3. **MUST ASK** before creating custom components or new tokens

**Available Allkons Components:**
- Badge, Button, Input, Toggle, Checkbox, Radio, Alert, Icon, Select, Textarea, Modal, Illustration, Avatar, Dot, etc.
- Import: `import { Badge } from '@/components'` or `import { Badge } from '@/components/ui/Badge'`

### 3. No Hardcoding
These are **FORBIDDEN**:
- `color: "#ffffff"` or `"white"` or `"rgb()"`
- `padding: "12px"` or `"0.75rem"`
- `fontWeight: 500`
- `borderRadius: "8px"` or `"50%"`
- `fontSize: "20px"`

### 4. Required Pattern

```tsx
// CORRECT
<div
  style={{
    backgroundColor: ds.color.background("primary"),
    color: ds.color.text("secondary"),
    padding: ds.spacing("3"),
    borderRadius: ds.radius("md"),
    ...ds.typography.preset("paragraph-small"),
    fontWeight: ds.typography.weight("medium"),
  }}
>
```

```tsx
// WRONG - DO NOT DO THIS
<div
  style={{
    backgroundColor: "white",
    color: "#37404f",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
  }}
>
```

## Quick Reference

| Type | API | Example |
|------|-----|---------|
| **Color** | `ds.color.text()` | `ds.color.text("secondary")` |
| | `ds.color.background()` | `ds.color.background("primary")` |
| | `ds.color.border()` | `ds.color.border("secondary")` |
| **Spacing** | `ds.spacing()` | `ds.spacing("3")` // 12px |
| **Radius** | `ds.radius()` | `ds.radius("md")` // 12px |
| **Typography** | `ds.typography.preset()` | `...ds.typography.preset("paragraph-small")` |
| | `ds.typography.weight()` | `ds.typography.weight("medium")` |
| **Icons** | `ds.common.size.icon*` | `ds.common.size.iconLg` // 20px |
| **Shadow** | CSS variable | `boxShadow: "var(--shadow-3xl)"` |
| **Transparent** | `ds.color.common.transparent` | `backgroundColor: ds.color.common.transparent` |

## Design System Files

**DO NOT read `/design-system/*.ts` files directly** unless you need to:
- Understand available token types
- Debug a specific utility function
- Extend the design system (must ask first)

The Quick Reference table above is sufficient for 90% of use cases.

If you need more details, check `design-system/README.md` first.

## Before You Code

1. Read `/public/research/development/coding-standards.md`
2. Check if Allkons components exist: `components/ui/` or `@/components` exports
3. Use `ds` utility for ALL styling
4. Ask before creating new tokens or components

## Verification Checklist
- No hex colors (#ffffff, #000000)
- No pixel/rem values (12px, 0.75rem) except in calc()
- No numeric font weights (400, 500, 600)
- All styling uses `ds` utility
- Used Allkons components (`@/components`) first, Ant Design second
- Asked before creating new tokens/components

**Remember: When in doubt, use the design system. If the token doesn't exist, ASK before creating it.**
