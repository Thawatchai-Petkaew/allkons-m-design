---
name: figma-design-system
description: Special development skill for Allkons M design system integration with Figma, including component mapping, design token extraction, and implementation guidance
---

# Figma Design System - Allkons M

**Role:** Design System Integration Specialist (Support Role)

**Function:** Extract and map Figma designs to Allkons M design system components and tokens

## When to Use This Skill

Activate as a support role when UI Design needs design system validation or when Development needs component mapping

## Core Responsibilities

1. **Figma Integration** - Connect Figma designs with code implementation
2. **Design Token Extraction** - Extract and apply design tokens
3. **Component Mapping** - Map Figma components to React components
4. **Implementation Guidance** - Provide code implementation guidance
5. **Design Validation** - Ensure code matches Figma specifications
6. **Workflow Optimization** - Streamline design-to-code process

## Required Workflow

### Phase 1: Figma Analysis
- Analyze Figma design files and components
- Extract design tokens (colors, spacing, typography)
- Identify component patterns and variations
- Document design system structure
- Map to existing Allkons M design tokens

### Phase 2: Token Implementation
- Convert Figma design tokens to CSS variables
- Update Allkons M design token system in `/app/globals.css`
- Ensure token consistency with existing `/design-system/index.ts`
- Validate token implementation with `ds` utility

### Phase 3: Component Development
- Map Figma components to existing `/components/ui/` components
- Implement components using `ds` utility from `/design-system/`
- Ensure responsive design compliance
- Test component variations

### Phase 4: Integration & Validation
- Integrate components into Allkons M codebase
- Validate against Figma specifications
- Test component behavior and responsiveness
- Document implementation guidelines

## Key Focus Areas

### Design Token Management
- Extract colors, spacing, typography from Figma
- Convert to CSS custom properties
- Ensure semantic naming conventions
- Maintain token consistency

### Component Mapping Strategy
- Map Figma components to Allkons UI components
- Handle component variations and states
- Ensure proper responsive behavior
- Maintain accessibility standards

### Construction Industry Considerations
- Implement construction-specific UI patterns
- Ensure usability for construction workflows
- Optimize for mobile construction site usage
- Consider construction industry visual requirements

## Available Resources

### Figma Integration Tools
- Figma API access methods
- Design token extraction scripts
- Component mapping templates
- Validation checklists

### Implementation Templates
- React component templates
- Design token templates
- CSS utility templates
- Testing templates

## Example Usage

```
User: I need to implement a new product card design from Figma

Figma Design System Integration - Allkons M:
I'll help you implement the Figma design in Allkons M codebase.

Let me analyze the Figma design and create implementation guidance...

[Analyzes Figma design file]
[Extracts design tokens and specifications]
[Maps to React components using ds utility]
[Provides implementation code and guidance]
```

## Design Token Extraction Process

### 1. Color Tokens
Allkons M ใช้ระบบ tokens ใน `/app/globals.css` และ `/design-system/colors.ts`:

```css
/* ใน /app/globals.css */
:root {
  --color-primary: #12151a;
  --color-secondary: #37404f;
  --brand-m-primary-00: #00af43;
  --system-success-00: #1eb950;
  --system-error-00: #da2110;
}
```

```typescript
// ใน /design-system/colors.ts
export const colorUtils = {
  text: (token: TextColorToken) => `var(--text-${token})`,
  background: (token: BackgroundToken) => `var(--background-${token})`,
  border: (token: BorderToken) => `var(--border-${token})`,
  system: (type: 'success' | 'error' | 'warning' | 'info') => `var(--system-${type}-00)`,
};
```

### 2. Spacing Tokens
```css
/* ใน /app/globals.css */
:root {
  --spacing-none: 0rem;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
}
```

```typescript
// ใน /design-system/spacing.ts
export const spacingUtils = {
  xs: () => spacing('1'),    // 4px
  sm: () => spacing('2'),    // 8px
  md: () => spacing('4'),    // 16px
  lg: () => spacing('6'),    // 24px
  xl: () => spacing('8'),    // 32px
};
```

### 3. Typography Tokens
```css
/* ใน /app/globals.css */
:root {
  --size-xs: 12px;
  --size-sm: 14px;
  --size-md: 16px;
  --size-lg: 18px;
  --size-xl: 20px;
  --size-2xl: 24px;
}
```

```typescript
// ใน /design-system/typography.ts
export const typographyUtils = {
  size: (token: TypographySizeToken) => `var(--size-${token})`,
  weight: (token: TypographyWeightToken) => `var(--font-weight-${token})`,
  preset: (preset: TypographyPreset) => typographyPresets[preset],
};
```

## Component Implementation Examples

### Product Card Component
```typescript
import React from 'react';
import { ds } from '@/design-system';

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      style={{
        backgroundColor: ds.color.background('primary'),
        borderRadius: ds.radius('md'),
        padding: ds.spacing('4'),
        boxShadow: ds.common.shadow.md,
        border: `1px solid ${ds.color.border('primary')}`
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: ds.common.height.productCard,
          objectFit: 'cover',
          borderRadius: ds.radius('sm')
        }}
      />
      <h3 style={{
        fontSize: ds.typography.size('lg'),
        fontWeight: ds.typography.weight('semibold'),
        color: ds.color.text('primary'),
        marginTop: ds.spacing('2')
      }}>
        {product.name}
      </h3>
      <p style={{
        fontSize: ds.typography.size('sm'),
        color: ds.color.text('secondary'),
        marginBottom: ds.spacing('4')
      }}>
        {product.category}
      </p>
      <div style={{
        fontSize: ds.typography.size('2xl'),
        fontWeight: ds.typography.weight('bold'),
        color: ds.color.text('brand-default')
      }}>
        ฿{product.price.toLocaleString()}
      </div>
    </div>
  );
};
```

### Using Existing Components
```typescript
import { Button, Input, Badge } from '@/components/ui';
import { ds } from '@/design-system';

export const ProductForm = () => {
  return (
    <div style={{ padding: ds.spacing('6') }}>
      <Input
        placeholder="Product name"
        size="middle"
        style={{ marginBottom: ds.spacing('4') }}
      />
      
      <Button
        variant="primary"
        color="brand"
        size="middle"
        style={{ 
          padding: `${ds.spacing('2')} ${ds.spacing('6')}`,
          backgroundColor: ds.component.button.primaryBrandBg
        }}
      >
        Submit
      </Button>
      
      <Badge
        style={{
          backgroundColor: ds.color.system('success'),
          color: ds.color.text('white')
        }}
      >
        Available
      </Badge>
    </div>
  );
};
```

## Implementation Guidelines

### MUST DO
- **ALWAYS** use `ds` utility from `/design-system/index.ts`
- **MAP** Figma components to existing `/components/ui/` components
- **FOLLOW** Allkons M component hierarchy: Allkons UI → Ant Design → Custom
- **USE** existing tokens from `/app/globals.css`
- **VALIDATE** implementation against Figma
- **DOCUMENT** component usage guidelines

### NEVER DO
- **NEVER** hardcode colors, spacing, or typography values
- **AVOID** creating custom components when `/components/ui/` has alternatives
- **SKIP** using existing design tokens in `/app/globals.css`
- **IGNORE** the component priority hierarchy
- **FORGET** to import from `@/design-system`

## Allkons M Design System Structure

### Files and Structure
```
/app/globals.css                    # CSS Variables (Design Tokens)
/design-system/
├── index.ts                        # Main ds utility export
├── colors.ts                       # Color utilities
├── spacing.ts                      # Spacing utilities
├── typography.ts                   # Typography utilities
├── radius.ts                       # Border radius utilities
├── common.ts                       # Common values
├── components.ts                   # Component-specific tokens
└── tokens.ts                       # TypeScript token definitions
/components/ui/                     # React components
├── Button.tsx
├── Input.tsx
├── Modal.tsx
└── [other components...]
```

### Component Priority (Following README.md)
1. **Allkons Design System** - Use `/components/ui/` + `ds` utility
2. **Ant Design** - Use when Allkons doesn't have component
3. **Custom Component** - Create only when both above don't exist

### Import Patterns
```typescript
// Correct - Use design system and components
import { ds } from '@/design-system';
import { Button, Input, Modal } from '@/components/ui';

// Incorrect - Hardcoded values
<div style={{ padding: '16px', color: '#12151a' }}>

// Correct - Use ds utility
<div style={{ padding: ds.spacing('4'), color: ds.color.text('primary') }}>
```

## Team Documentation

### For Designers
- Provide Figma file access and structure
- Document component naming conventions
- Specify design token usage guidelines
- Create design handoff checklists

### For Developers
- Provide implementation code examples
- Document `ds` utility usage
- Create component testing guidelines
- Specify integration requirements

### For QA
- Provide validation checklists
- Document testing procedures
- Specify acceptance criteria
- Create visual regression testing guidelines

## Notes for LLMs

- Always use `ds` utility from `/design-system/index.ts`
- Map Figma components to existing `/components/ui/` components first
- Follow Allkons M component hierarchy: Allkons UI → Ant Design → Custom
- Use existing tokens from `/app/globals.css` and `/design-system/`
- Ensure construction industry context
- Validate implementation against Figma designs
- Document implementation guidelines
- Test responsive behavior thoroughly
- Consider accessibility requirements
- Never hardcode design values
- Always import from `@/design-system` and `@/components/ui`

**Remember:** Allkons M has a well-established design system. Use existing components and tokens before creating new ones.
