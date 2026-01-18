# Component Creation Example - Card Component

## 📝 Scenario

ต้องการสร้าง **Card Component** ใหม่ โดยอ้างอิงจาก Agent Transcript และใช้ pattern เดียวกับ Button/Input ที่มีอยู่

## 🔗 การอ้างอิง Agent Transcript

```
อ้างอิงจาก agent transcript: 
@/Users/tawatchaipetkaew/.cursor/projects/Users-tawatchaipetkaew-design-system-app-app/agent-transcripts/e4ee97c3-c48e-4ad7-a99e-aa159f5bad36.txt

จาก transcript ที่ผ่านมา มีการสร้าง Button และ Input components แล้ว
ตอนนี้ต้องการสร้าง Card component โดย:
- ใช้ design system tokens จาก ds
- ใช้ pattern เดียวกับ components ที่มีอยู่
- Export ผ่าน @/components
```

## 📐 Step-by-Step Implementation

### Step 1: สร้าง Component File

**File:** `components/ui/Card.tsx`

```tsx
"use client";

import React from "react";
import { ds } from "@/design-system";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Card title
   */
  title?: React.ReactNode;
  
  /**
   * Card content
   */
  children?: React.ReactNode;
  
  /**
   * Whether the card has shadow
   */
  shadow?: boolean;
  
  /**
   * Card variant
   */
  variant?: "default" | "outlined" | "filled";
  
  /**
   * Card padding size
   */
  padding?: "none" | "small" | "middle" | "large";
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  shadow = false,
  variant = "default",
  padding = "middle",
  className = "",
  style,
  ...props
}) => {
  // Padding styles using design system
  const paddingStyles: Record<"none" | "small" | "middle" | "large", React.CSSProperties> = {
    none: {
      padding: ds.spacing('none'),
    },
    small: {
      padding: ds.spacing('4'),
    },
    middle: {
      padding: ds.spacing('6'),
    },
    large: {
      padding: ds.spacing('8'),
    },
  };

  // Variant styles
  const variantStyles: Record<"default" | "outlined" | "filled", React.CSSProperties> = {
    default: {
      backgroundColor: ds.color.background('primary'),
      border: `${ds.common.borderWidth.thin} solid ${ds.color.border('primary')}`,
    },
    outlined: {
      backgroundColor: ds.color.background('primary'),
      border: `${ds.common.borderWidth.medium} solid ${ds.color.border('primary')}`,
    },
    filled: {
      backgroundColor: ds.color.background('secondary'),
      border: 'none',
    },
  };

  // Base styles
  const baseStyles: React.CSSProperties = {
    borderRadius: ds.radius('lg'),
    ...paddingStyles[padding],
    ...variantStyles[variant],
    ...(shadow && {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }),
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...style,
  };

  return (
    <div
      className={className}
      style={combinedStyles}
      {...props}
    >
      {title && (
        <div
          style={{
            marginBottom: ds.spacing('4'),
            fontSize: ds.typography.size('lg'),
            fontWeight: ds.typography.weight('semibold'),
            color: ds.color.text('primary'),
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          fontSize: ds.typography.size('md'),
          color: ds.color.text('secondary'),
          lineHeight: ds.typography.lineHeight('md'),
        }}
      >
        {children}
      </div>
    </div>
  );
};
```

### Step 2: Export จาก `components/ui/index.ts`

**File:** `components/ui/index.ts`

```tsx
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card'; // ✅ เพิ่มบรรทัดนี้
// ... other exports
```

### Step 3: Export จาก `components/index.ts`

**File:** `components/index.ts`

```tsx
export * from "./ui"; // Card จะถูก export อัตโนมัติ
// ... other exports
```

### Step 4: ใช้งานใน Page

**File:** `app/example/page.tsx`

```tsx
"use client";

import { Card, Button } from "@/components";
import { ds } from "@/design-system";

export default function ExamplePage() {
  return (
    <div
      style={{
        padding: ds.spacing('8'),
        maxWidth: ds.common.layout.containerMaxWidth,
        margin: "0 auto",
      }}
    >
      <Card
        title="Card Title"
        variant="outlined"
        padding="large"
        shadow
      >
        <p>This is card content using design system tokens.</p>
        <Button variant="primary" color="brand">
          Action Button
        </Button>
      </Card>
    </div>
  );
}
```

## ✅ Checklist

- [x] สร้างไฟล์ `components/ui/Card.tsx`
- [x] ใช้ `"use client"` directive
- [x] Import `ds` จาก `@/design-system`
- [x] กำหนด TypeScript interface สำหรับ props
- [x] ใช้ design system tokens ทั้งหมด (ไม่มี hardcoded values)
- [x] รองรับ variants (default, outlined, filled)
- [x] รองรับ padding sizes (none, small, middle, large)
- [x] Export จาก `components/ui/index.ts`
- [x] Export จาก `components/index.ts`
- [ ] ทดสอบใน `/design-system/components` page (optional)

## 🎨 Design System Tokens ที่ใช้

### Colors
- `ds.color.background('primary')` - Card background
- `ds.color.background('secondary')` - Filled variant background
- `ds.color.border('primary')` - Card border
- `ds.color.text('primary')` - Title text
- `ds.color.text('secondary')` - Content text

### Spacing
- `ds.spacing('none')` - No padding
- `ds.spacing('4')` - Small padding
- `ds.spacing('6')` - Middle padding
- `ds.spacing('8')` - Large padding

### Typography
- `ds.typography.size('lg')` - Title font size
- `ds.typography.size('md')` - Content font size
- `ds.typography.weight('semibold')` - Title font weight
- `ds.typography.lineHeight('md')` - Content line height

### Border & Radius
- `ds.radius('lg')` - Card border radius
- `ds.common.borderWidth.thin` - Default border width
- `ds.common.borderWidth.medium` - Outlined variant border width

## 🔍 Comparison กับ Existing Components

### Similarities กับ Button Component

1. **Size/Variant Pattern:**
   ```tsx
   // Button
   const sizeStyles: Record<"small" | "middle" | "large", ...> = { ... };
   const variantStyles = { primary: ..., secondary: ... };
   
   // Card
   const paddingStyles: Record<"none" | "small" | "middle" | "large", ...> = { ... };
   const variantStyles = { default: ..., outlined: ..., filled: ... };
   ```

2. **Design System Usage:**
   ```tsx
   // Both use ds tokens exclusively
   backgroundColor: ds.color.background('primary')
   borderRadius: ds.radius('lg')
   ```

### Similarities กับ Input Component

1. **State Management Pattern:**
   ```tsx
   // Input uses isFocused, isHovered
   const [isFocused, setIsFocused] = React.useState(false);
   
   // Card can use similar pattern if needed
   const [isHovered, setIsHovered] = React.useState(false);
   ```

2. **Dynamic Styles:**
   ```tsx
   // Both combine base styles with variant styles
   const combinedStyles = {
     ...baseStyles,
     ...variantStyles[variant],
     ...style,
   };
   ```

## 📚 Next Steps

1. **เพิ่ม Component Tokens (Optional):**
   - ถ้าต้องการ component-specific tokens ให้เพิ่มใน `design-system/components.ts`
   - เช่น `ds.component.card.bg()`, `ds.component.card.border()`

2. **เพิ่มใน Showcase Page:**
   - แก้ไข `app/design-system/components/page.tsx`
   - เพิ่ม Card examples

3. **Documentation:**
   - เพิ่ม JSDoc comments
   - สร้าง Storybook stories (ถ้ามี)

## 💡 Tips

1. **อ้างอิง Agent Transcript:** ใช้ pattern เดียวกับ Button/Input
2. **ใช้ Design System Tokens:** ไม่มี hardcoded values
3. **Type Safety:** ใช้ TypeScript interfaces
4. **Consistency:** ใช้ naming convention เดียวกับ components อื่น
