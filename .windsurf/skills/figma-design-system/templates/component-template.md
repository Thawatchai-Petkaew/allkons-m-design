# Component Implementation Template

## Component Information
- **Name:** [Component Name]
- **Figma File:** [Figma File Link]
- **Designer:** [Designer Name]
- **Developer:** [Developer Name]
- **Date:** [Implementation Date]

## Design Token Requirements

### Colors
```css
/* Required color tokens */
--color-[component]-primary: #hex-value;
--color-[component]-secondary: #hex-value;
--color-[component]-background: #hex-value;
--color-[component]-text: #hex-value;
```

### Spacing
```css
/* Required spacing tokens */
--spacing-[component]-padding: rem-value;
--spacing-[component]-gap: rem-value;
--spacing-[component]-margin: rem-value;
```

### Typography
```css
/* Required typography tokens */
--font-size-[component]-title: rem-value;
--font-size-[component]-body: rem-value;
--font-weight-[component]-title: font-weight;
--font-weight-[component]-body: font-weight;
```

## Component Interface

```typescript
interface [ComponentName]Props {
  // Required props
  [requiredProp]: [type];
  
  // Optional props with defaults
  [optionalProp]?: [type];
  
  // Styling props
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary';
  
  // Event handlers
  onClick?: () => void;
  [otherEventHandlers]?: () => void;
  
  // Children
  children?: React.ReactNode;
}
```

## Implementation Structure

```typescript
import React from 'react';
import { ds } from '@/lib/design-system';

export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  [requiredProp],
  [optionalProp] = [defaultValue],
  size = 'medium',
  variant = 'default',
  onClick,
  children,
  ...props
}) => {
  // Size variations
  const sizeStyles = {
    small: {
      padding: ds.spacing.sm,
      fontSize: ds.fontSizes.sm,
    },
    medium: {
      padding: ds.spacing.md,
      fontSize: ds.fontSizes.base,
    },
    large: {
      padding: ds.spacing.lg,
      fontSize: ds.fontSizes.lg,
    },
  };

  // Variant styles
  const variantStyles = {
    default: {
      backgroundColor: ds.colors.background.white,
      border: `1px solid ${ds.colors.border.light}`,
    },
    primary: {
      backgroundColor: ds.colors.primary.main,
      border: `1px solid ${ds.colors.primary.main}`,
    },
    secondary: {
      backgroundColor: ds.colors.secondary.main,
      border: `1px solid ${ds.colors.secondary.main}`,
    },
  };

  return (
    <div
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        // Add base styles
        borderRadius: ds.borderRadius.md,
        boxShadow: ds.shadows.sm,
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      {...props}
    >
      {/* Component content */}
      {children}
    </div>
  );
};
```

## Responsive Design

```typescript
// Add responsive styles
const responsiveStyles = {
  base: {
    // Mobile styles (default)
  },
  md: {
    // Tablet styles
    '@media (min-width: 768px)': {
      // Tablet-specific styles
    },
  },
  lg: {
    // Desktop styles
    '@media (min-width: 1024px)': {
      // Desktop-specific styles
    },
  },
};
```

## Accessibility Requirements

- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Focus indicators

## Testing Requirements

### Unit Tests
```typescript
describe('[ComponentName]', () => {
  it('renders correctly with default props', () => {
    // Test implementation
  });

  it('handles size variations', () => {
    // Test size props
  });

  it('handles variant variations', () => {
    // Test variant props
  });

  it('handles click events', () => {
    // Test event handlers
  });
});
```

### Visual Tests
- [ ] Matches Figma design
- [ ] Responsive behavior
- [ ] Hover states
- [ ] Focus states
- [ ] Disabled states

## Usage Examples

### Basic Usage
```typescript
<[ComponentName] [requiredProp]="[value]">
  {children}
</[ComponentName]>
```

### With Variations
```typescript
<[ComponentName] 
  [requiredProp]="[value]"
  size="large"
  variant="primary"
  onClick={handleClick}
>
  {children}
</[ComponentName]>
```

## Figma Specifications

### Component States
- **Default:** [Description]
- **Hover:** [Description]
- **Active:** [Description]
- **Disabled:** [Description]
- **Focus:** [Description]

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** ≥ 1024px

### Design Tokens Used
- Colors: [List of color tokens]
- Spacing: [List of spacing tokens]
- Typography: [List of typography tokens]
- Effects: [List of shadow/effect tokens]

## Implementation Notes

[Additional notes about implementation, edge cases, or special considerations]

## Review Checklist

- [ ] Design tokens implemented correctly
- [ ] Component matches Figma design
- [ ] Responsive design implemented
- [ ] Accessibility requirements met
- [ ] TypeScript types defined
- [ ] Unit tests written
- [ ] Documentation updated
- [ ] Performance optimized

## Approval

**Designer:** [Signature/Approval] - [Date]
**Developer:** [Signature/Approval] - [Date]
**QA:** [Signature/Approval] - [Date]
