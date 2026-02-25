# Figma Design System Integration Guide

## Overview

This guide provides comprehensive instructions for integrating Figma designs with Allkons M codebase using the existing design system structure and `ds` utility.

## Allkons M Design System Structure

### Current Architecture
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
├── Alert.tsx
├── Checkbox.tsx
└── [other components...]
```

### Component Priority (Following design-system/README.md)
1. **Allkons Design System** - Use `/components/ui/` + `ds` utility
2. **Ant Design** - Use when Allkons doesn't have component
3. **Custom Component** - Create only when both above don't exist

## Design Token Integration

### 1. Color Tokens

#### Current Allkons M Color System
The color tokens are defined in `/app/globals.css` and accessible via `/design-system/colors.ts`:

```css
/* In /app/globals.css */
:root {
  /* Brand Colors */
  --brand-m-primary-00: #00af43;
  --brand-m-primary-dark-20: #008c36;
  --brand-m-primary-light-90: #e5f7ec;
  
  /* System Colors */
  --system-success-00: #1eb950;
  --system-error-00: #da2110;
  --system-warning-00: #ffab08;
  --system-info-00: #65b2e8;
  
  /* Text Colors */
  --text-primary: #12151a;
  --text-secondary: #37404f;
  --text-tertiary: #404a5c;
  
  /* Background Colors */
  --background-primary: #ffffff;
  --background-secondary: #f7f8f9;
  --background-tertiary: #eff0f3;
  
  /* Border Colors */
  --border-primary: #dee1e6;
  --border-secondary: #bdc3cd;
}
```

#### Using Color Tokens
```typescript
import { ds } from '@/design-system';

// Text colors
ds.color.text('primary')        // var(--text-primary)
ds.color.text('secondary')      // var(--text-secondary)

// Background colors
ds.color.background('primary')  // var(--background-primary)
ds.color.background('secondary') // var(--background-secondary)

// System colors
ds.color.system('success')      // var(--system-success-00)
ds.color.system('error')        // var(--system-error-00)

// Border colors
ds.color.border('primary')      // var(--border-primary)
ds.color.border('secondary')    // var(--border-secondary)
```

#### Mapping Figma Colors to Allkons M Tokens
When extracting colors from Figma, map them to existing Allkons M tokens:

| Figma Color | Allkons M Token | Usage |
|-------------|----------------|-------|
| Primary Green | `--brand-m-primary-00` | Brand primary |
| Success Green | `--system-success-00` | Success states |
| Error Red | `--system-error-00` | Error states |
| Warning Orange | `--system-warning-00` | Warning states |
| Dark Text | `--text-primary` | Primary text |
| Light Text | `--text-secondary` | Secondary text |
| White BG | `--background-primary` | Primary background |
| Light BG | `--background-secondary` | Secondary background |

### 2. Spacing Tokens

#### Current Spacing System
```css
/* In /app/globals.css */
:root {
  --spacing-none: 0rem;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-7: 1.75rem;  /* 28px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
}
```

#### Using Spacing Tokens
```typescript
import { ds } from '@/design-system';

// Direct token access
ds.spacing('4')        // var(--spacing-4) = 16px
ds.spacing('8')        // var(--spacing-8) = 32px

// Using shortcuts
ds.spacingUtils.md()   // var(--spacing-4) = 16px
ds.spacingUtils.lg()   // var(--spacing-6) = 24px
ds.spacingUtils.xl()   // var(--spacing-8) = 32px
```

#### Common Spacing Patterns
```typescript
// Component padding
const componentPadding = {
  small: ds.spacing('2'),     // 8px
  medium: ds.spacing('4'),    // 16px
  large: ds.spacing('6'),     // 24px
};

// Layout gaps
const layoutGaps = {
  section: ds.spacing('12'),   // 48px
  component: ds.spacing('6'),  // 24px
  element: ds.spacing('4'),   // 16px
};
```

### 3. Typography Tokens

#### Current Typography System
```css
/* In /app/globals.css */
:root {
  /* Font Sizes */
  --size-xs: 12px;
  --size-sm: 14px;
  --size-md: 16px;
  --size-lg: 18px;
  --size-xl: 20px;
  --size-2xl: 24px;
  --size-3xl: 28px;
  --size-4xl: 32px;
  --size-5xl: 36px;
  --size-6xl: 48px;
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-sm: 20px;
  --line-height-md: 24px;
  --line-height-lg: 24px;
  --line-height-xl: 24px;
  
  /* Typography Presets */
  --text-heading-h1-size: var(--size-6xl);
  --text-heading-h1-line-height: var(--line-height-6xl);
  --text-paragraph-big-size: var(--size-lg);
  --text-paragraph-big-line-height: var(--line-height-lg);
}
```

#### Using Typography Tokens
```typescript
import { ds } from '@/design-system';

// Font sizes
ds.typography.size('md')      // var(--size-md) = 16px
ds.typography.size('lg')      // var(--size-lg) = 18px
ds.typography.size('2xl')     // var(--size-2xl) = 24px

// Font weights
ds.typography.weight('bold')    // var(--font-weight-bold)
ds.typography.weight('medium')  // var(--font-weight-medium)

// Typography presets
ds.typography.preset('heading-h1')  // Complete heading styles
ds.typography.preset('paragraph-big') // Complete paragraph styles
```

## Component Mapping Strategy

### 1. Check Existing Components First
Before creating new components, check if `/components/ui/` already has what you need:

```typescript
// Available components in /components/ui/
import { 
  Button, 
  Input, 
  Modal, 
  Alert, 
  Checkbox, 
  Radio, 
  Select, 
  Textarea, 
  Toggle, 
  Badge, 
  Avatar,
  BottomSheet,
  Icon,
  Illustration
} from '@/components/ui';
```

### 2. Map Figma Components to Allkons Components

#### Common Mappings
| Figma Component | Allkons Component | Notes |
|-----------------|-------------------|-------|
| Button | `Button` | Use variant, color, size props |
| Text Input | `Input` | Use size, status props |
| Modal/Dialog | `Modal` | Use size, closable props |
| Alert/Notification | `Alert` | Use variant, closable props |
| Checkbox | `Checkbox` | Use size, disabled props |
| Radio Button | `Radio` | Use size, disabled props |
| Dropdown | `Select` | Use size, status props |
| Badge/Tag | `Badge` | Use variant props |

### 3. Implementation Examples

#### Button Component Mapping
```typescript
import { Button } from '@/components/ui';
import { ds } from '@/design-system';

// Figma: Primary Button, Large, Green
export const PrimaryButton = ({ children, ...props }) => (
  <Button
    variant="primary"
    color="brand"
    size="large"
    style={{
      // Override with ds utility if needed
      padding: `${ds.spacing('3')} ${ds.spacing('8')}`,
    }}
    {...props}
  >
    {children}
  </Button>
);

// Figma: Secondary Button, Medium, Gray
export const SecondaryButton = ({ children, ...props }) => (
  <Button
    variant="secondary"
    color="neutral"
    size="middle"
    {...props}
  >
    {children}
  </Button>
);
```

#### Card Component (Custom Implementation)
```typescript
import { ds } from '@/design-system';

interface CardProps {
  children: React.ReactNode;
  padding?: 'small' | 'medium' | 'large';
  bordered?: boolean;
}

export const Card = ({ children, padding = 'medium', bordered = true }: CardProps) => {
  const paddingStyles = {
    small: ds.spacing('3'),
    medium: ds.spacing('4'),
    large: ds.spacing('6'),
  };

  return (
    <div
      style={{
        backgroundColor: ds.color.background('primary'),
        borderRadius: ds.radius('md'),
        padding: paddingStyles[padding],
        border: bordered ? `1px solid ${ds.color.border('primary')}` : 'none',
        boxShadow: ds.common.shadow.sm,
      }}
    >
      {children}
    </div>
  );
};
```

## Implementation Workflow

### 1. Figma Analysis Phase
1. **Review Figma Design Files**
   - Identify component patterns
   - Note color usage
   - Document spacing patterns
   - Check typography specifications

2. **Map to Existing System**
   - Check `/components/ui/` for existing components
   - Review `/design-system/` for available tokens
   - Identify gaps in the current system

3. **Document Requirements**
   - List missing components
   - Note required token updates
   - Plan implementation approach

### 2. Token Integration Phase
1. **Update CSS Variables** (if needed)
   - Add new tokens to `/app/globals.css`
   - Follow existing naming conventions
   - Maintain token hierarchy

2. **Update TypeScript Types** (if needed)
   - Add new token types to `/design-system/tokens.ts`
   - Update utility functions in relevant files
   - Ensure type safety

3. **Test Token Integration**
   - Verify tokens are accessible via `ds` utility
   - Test in development environment
   - Validate against Figma specifications

### 3. Component Implementation Phase
1. **Use Existing Components**
   - Import from `/components/ui/`
   - Apply `ds` utility for custom styling
   - Follow component prop patterns

2. **Create Custom Components** (only when needed)
   - Use `ds` utility for all styling
   - Follow Allkons M naming conventions
   - Include TypeScript interfaces

3. **Responsive Implementation**
   - Use existing breakpoint system
   - Apply mobile-first approach
   - Test on various screen sizes

### 4. Validation Phase
1. **Visual Validation**
   - Compare with Figma designs
   - Test in different browsers
   - Check responsive behavior

2. **Code Quality Validation**
   - Ensure no hardcoded values
   - Verify `ds` utility usage
   - Check TypeScript compliance

3. **Accessibility Validation**
   - Test keyboard navigation
   - Verify screen reader compatibility
   - Check color contrast ratios

## Best Practices

### 1. Token Usage
- **Always** use `ds` utility instead of hardcoded values
- **Prefer** existing tokens over creating new ones
- **Follow** established naming conventions
- **Document** any new tokens thoroughly

### 2. Component Usage
- **Check** `/components/ui/` first before creating custom components
- **Follow** Allkons M component hierarchy
- **Use** TypeScript interfaces for props
- **Include** accessibility attributes

### 3. Code Organization
- **Import** from `@/design-system` and `@/components/ui`
- **Group** related styles together
- **Use** consistent formatting
- **Document** complex implementations

### 4. Performance Considerations
- **Avoid** unnecessary re-renders
- **Use** React.memo for expensive components
- **Optimize** bundle size
- **Lazy load** large components when appropriate

## Troubleshooting

### Common Issues

#### 1. Tokens Not Working
**Problem:** `ds.color.text('primary')` not applying correct color
**Solution:**
- Check if token exists in `/app/globals.css`
- Verify token name spelling
- Ensure CSS file is imported in layout

#### 2. Component Styling Conflicts
**Problem:** Custom styles overriding component defaults
**Solution:**
- Use `!important` sparingly
- Check CSS specificity
- Use inline styles with `ds` utility

#### 3. Responsive Issues
**Problem:** Component not responsive on mobile
**Solution:**
- Use mobile-first approach
- Test with actual devices
- Check viewport meta tag

#### 4. TypeScript Errors
**Problem:** Type errors with `ds` utility
**Solution:**
- Check token type definitions
- Update `/design-system/tokens.ts`
- Verify import paths

### Debugging Tools
- **Browser DevTools** - Inspect applied styles
- **React DevTools** - Check component props
- **Figma Dev Mode** - Compare designs
- **Accessibility Tools** - Test a11y compliance

## Team Collaboration

### Designer Responsibilities
- **Organize** Figma files with clear naming
- **Use** consistent color and spacing patterns
- **Document** component variations and states
- **Provide** design specifications and assets

### Developer Responsibilities
- **Use** existing components and tokens
- **Implement** with `ds` utility
- **Test** responsive behavior
- **Ensure** accessibility compliance

### Handoff Process
1. **Design Review** - Validate design feasibility
2. **Implementation** - Code with `ds` utility
3. **Testing** - Validate against Figma
4. **Documentation** - Update component library

## Continuous Improvement

### Regular Reviews
- **Monthly** design system reviews
- **Quarterly** component audits
- **Continuous** token optimization
- **Regular** accessibility testing

### Updates and Maintenance
- **Version** design tokens carefully
- **Communicate** changes to team
- **Update** documentation
- **Train** team on new patterns

---

This integration guide ensures that Figma designs are implemented consistently with the existing Allkons M design system, maintaining code quality and design consistency across the platform.
