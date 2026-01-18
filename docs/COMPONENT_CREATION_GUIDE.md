# Component Creation Guide

## 📋 Overview

Guide สำหรับการสร้าง Component ใหม่ใน Allkons M Design System โดยอ้างอิงจาก Agent Transcript และ Pattern ที่มีอยู่

## 🔗 การอ้างอิง Agent Transcript

เมื่อต้องการสร้าง Component ใหม่ ให้อ้างอิงไฟล์ transcript นี้:

```
@/Users/tawatchaipetkaew/.cursor/projects/Users-tawatchaipetkaew-design-system-app-app/agent-transcripts/e4ee97c3-c48e-4ad7-a99e-aa159f5bad36.txt
```

### วิธีอ้างอิงใน Cursor

1. **อ้างอิงโดยตรงใน Prompt:**
   ```
   อ้างอิงจาก agent transcript: @/Users/tawatchaipetkaew/.cursor/projects/Users-tawatchaipetkaew-design-system-app-app/agent-transcripts/e4ee97c3-c48e-4ad7-a99e-aa159f5bad36.txt
   
   สร้าง Component ใหม่ชื่อ [ComponentName] โดยใช้ pattern เดียวกับ Button และ Input ที่สร้างไว้แล้ว
   ```

2. **ระบุ Context ที่ต้องการ:**
   ```
   จาก agent transcript ที่ผ่านมา มีการสร้าง Button และ Input components แล้ว
   ตอนนี้ต้องการสร้าง [ComponentName] โดย:
   - ใช้ design system tokens จาก ds
   - ใช้ pattern เดียวกับ components ที่มีอยู่
   - Export ผ่าน @/components
   ```

## 📐 Component Pattern

### 1. File Structure

```
components/
├── ui/
│   ├── Button.tsx          ✅ Example
│   ├── Input.tsx            ✅ Example
│   ├── [NewComponent].tsx  🆕 New component
│   └── index.ts             (exports)
├── Layout/
│   ├── Header.tsx           ✅ Example
│   └── Footer.tsx           ✅ Example
└── index.ts                 (main exports)
```

### 2. Component Template

```tsx
"use client";

import React from "react";
import { ds } from "@/design-system";

export interface [ComponentName]Props extends Omit<React.HTMLAttributes<HTMLElement>, "size"> {
  /**
   * Component variant
   */
  variant?: "primary" | "secondary" | "tertiary";
  
  /**
   * Component color scheme
   */
  color?: "brand" | "neutral" | "error";
  
  /**
   * Component size
   */
  size?: "small" | "middle" | "large";
  
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  
  /**
   * Component content
   */
  children?: React.ReactNode;
}

export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  variant = "primary",
  color = "brand",
  size = "middle",
  disabled = false,
  children,
  className = "",
  style,
  ...props
}) => {
  // State management (if needed)
  const [isHovered, setIsHovered] = React.useState(false);

  // Size styles using design system
  const sizeStyles: Record<"small" | "middle" | "large", React.CSSProperties> = {
    small: {
      fontSize: ds.typography.size('sm'),
      lineHeight: ds.typography.lineHeight('sm'),
      padding: ds.spacing('2'),
      height: ds.common.height.inputSmall, // or appropriate height
    },
    middle: {
      fontSize: ds.typography.size('md'),
      lineHeight: ds.typography.lineHeight('md'),
      padding: ds.spacing('4'),
      height: ds.common.height.inputMiddle,
    },
    large: {
      fontSize: ds.typography.size('lg'),
      lineHeight: ds.typography.lineHeight('lg'),
      padding: ds.spacing('6'),
      height: ds.common.height.inputLarge,
    },
  };

  // Base styles using design system tokens
  const baseStyles: React.CSSProperties = {
    ...sizeStyles[size],
    borderRadius: ds.radius('sm'),
    borderWidth: ds.common.borderWidth.thin,
    cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
    // Add more styles using ds tokens
  };

  // Variant and color styles
  const variantStyles = React.useMemo(() => {
    // Use ds.component.[componentName] tokens if available
    // Or use ds.color utilities
    return {
      // Example for primary variant
      primary: {
        backgroundColor: isHovered 
          ? ds.component.button.primaryBrand.bg('hover')
          : ds.component.button.primaryBrand.bg(),
        color: ds.component.button.primaryBrand.text(),
        borderColor: ds.component.button.primaryBrand.border(),
      },
      // Add other variants
    };
  }, [variant, color, isHovered, disabled]);

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...(disabled && {
      opacity: 0.6,
      pointerEvents: 'none' as const,
    }),
    ...style,
  };

  return (
    <div
      className={className}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};
```

## 🎨 Design System Usage

### ต้องใช้ Design System Tokens เสมอ

✅ **DO:**
```tsx
// Colors
color: ds.color.text('primary')
backgroundColor: ds.color.background('primary')
borderColor: ds.color.border('primary')

// Spacing
padding: ds.spacing('4')
margin: ds.spacing('2')
gap: ds.spacing('6')

// Typography
fontSize: ds.typography.size('md')
lineHeight: ds.typography.lineHeight('md')
fontWeight: ds.typography.weight('semibold')

// Border Radius
borderRadius: ds.radius('sm')
borderRadius: ds.radius('lg')

// Component Tokens (if available)
backgroundColor: ds.component.button.primaryBrand.bg()
color: ds.component.button.primaryBrand.text()
```

❌ **DON'T:**
```tsx
// Hardcoded values
color: '#12151a'
padding: '16px'
fontSize: '16px'
borderRadius: '8px'
```

## 📦 Export Pattern

### 1. Export from `components/ui/index.ts`

```tsx
// components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { [NewComponent] } from './[NewComponent]';
```

### 2. Export from `components/index.ts`

```tsx
// components/index.ts
export * from "./ui";
export { Header } from "./Layout/Header";
export { Footer } from "./Layout/Footer";
```

### 3. Usage in Pages

```tsx
// app/[page]/page.tsx
import { [NewComponent], Button, Input } from "@/components";
```

## 🔍 Checklist สำหรับ Component ใหม่

- [ ] สร้างไฟล์ `components/ui/[ComponentName].tsx`
- [ ] ใช้ `"use client"` directive (ถ้าใช้ React hooks)
- [ ] Import `ds` จาก `@/design-system`
- [ ] กำหนด TypeScript interface สำหรับ props
- [ ] ใช้ design system tokens ทั้งหมด (ไม่มี hardcoded values)
- [ ] รองรับ variants (primary, secondary, tertiary)
- [ ] รองรับ colors (brand, neutral, error)
- [ ] รองรับ sizes (small, middle, large)
- [ ] รองรับ disabled state
- [ ] รองรับ hover state (ถ้าจำเป็น)
- [ ] Export จาก `components/ui/index.ts`
- [ ] Export จาก `components/index.ts`
- [ ] ทดสอบใน `/design-system/components` page (ถ้าจำเป็น)

## 📝 ตัวอย่างจาก Agent Transcript

### Pattern ที่ใช้ใน Button Component

จาก transcript, Button component ใช้ pattern นี้:

1. **Size Styles:**
   ```tsx
   const sizeStyles = {
     small: {
       fontSize: ds.typography.size('sm'),
       lineHeight: ds.typography.lineHeight('lg'),
       paddingTop: ds.common.padding.buttonVerticalSmall,
       height: ds.common.height.buttonSmall,
     },
     // ...
   };
   ```

2. **Variant Styles:**
   ```tsx
   const variantStyles = {
     primary: {
       backgroundColor: isHovered 
         ? ds.component.button.primaryBrand.bg('hover')
         : ds.component.button.primaryBrand.bg(),
       color: ds.component.button.primaryBrand.text(),
     },
     // ...
   };
   ```

3. **State Management:**
   ```tsx
   const [isHovered, setIsHovered] = React.useState(false);
   ```

### Pattern ที่ใช้ใน Input Component

1. **State Management:**
   ```tsx
   const [isFocused, setIsFocused] = React.useState(false);
   const [isHovered, setIsHovered] = React.useState(false);
   ```

2. **Dynamic Styles:**
   ```tsx
   const actualState = error ? "error" : state;
   const borderColor = actualState === "error"
     ? ds.component.input.border('error')
     : isFocused
     ? ds.component.input.border('active')
     : ds.component.input.border();
   ```

## 🚀 Quick Start Template

เมื่อต้องการสร้าง Component ใหม่ ให้ copy template นี้:

```tsx
"use client";

import React from "react";
import { ds } from "@/design-system";

export interface [ComponentName]Props {
  // Define props here
}

export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  // Destructure props
  ...props
}) => {
  // Component logic here
  
  return (
    <div
      style={{
        // Use ds tokens only
      }}
      {...props}
    >
      {/* Component content */}
    </div>
  );
};
```

## 📚 Resources

- **Design System Documentation:** `/design-system/README.md`
- **Component Showcase:** `/design-system/components`
- **Foundation Tokens:** `/design-system/foundation`
- **Agent Transcript:** `@/Users/tawatchaipetkaew/.cursor/projects/Users-tawatchaipetkaew-design-system-app-app/agent-transcripts/e4ee97c3-c48e-4ad7-a99e-aa159f5bad36.txt`

## 💡 Tips

1. **อ้างอิง Component ที่มีอยู่:** ดู Button.tsx และ Input.tsx เป็นตัวอย่าง
2. **ใช้ Design System Tokens:** ตรวจสอบ `design-system/components.ts` สำหรับ component-specific tokens
3. **ทดสอบใน Showcase Page:** เพิ่ม component ใหม่ใน `/design-system/components/page.tsx` เพื่อทดสอบ
4. **Type Safety:** ใช้ TypeScript interfaces เพื่อ type safety
5. **Accessibility:** เพิ่ม ARIA attributes ถ้าจำเป็น

## ❓ FAQ

**Q: ถ้าไม่มี component token ใน design system ควรทำอย่างไร?**
A: ใช้ `ds.color`, `ds.spacing`, `ds.typography` utilities แทน หรือสร้าง component token ใหม่ใน `design-system/components.ts`

**Q: ควรใช้ Ant Design component หรือสร้างใหม่?**
A: ตาม transcript: "ถ้าไม่มี Component ให้ใช้ Ant Design" แต่ถ้าต้องการ custom styling ให้สร้างใหม่โดยใช้ design system tokens

**Q: ควรสร้าง component ใน `components/ui/` หรือ `components/Layout/`?**
A: 
- `components/ui/` - สำหรับ reusable UI components (Button, Input, etc.)
- `components/Layout/` - สำหรับ layout components (Header, Footer, etc.)
