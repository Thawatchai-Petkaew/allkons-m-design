# Design System Allkons - Quick Guide

## 🎯 หลักการพื้นฐาน

**ห้าม hardcode ค่าใดๆ ต้องใช้ Design System tokens เสมอ**

```tsx
// ❌ ไม่ดี
<div style={{ padding: "16px", color: "#12151a" }}>

// ✅ ดี
import { ds } from "@/design-system";
<div style={{ padding: ds.spacing('4'), color: ds.color.text('primary') }}>
```

---

## 📦 Import Design System

```tsx
import { ds } from "@/design-system";
import { Button, Input, Modal, Badge } from "@/components";
```

---

## 🎨 การใช้งาน Tokens

### Spacing
```tsx
ds.spacing('1')   // 0.25rem (4px)
ds.spacing('4')   // 1rem (16px)
ds.spacing('8')   // 2rem (32px)
ds.spacing('16')  // 4rem (64px)
```

### Colors
```tsx
// Text
ds.color.text('primary')
ds.color.text('secondary')
ds.color.text('tertiary')

// Background
ds.color.background('primary')
ds.color.background('secondary')

// System Colors
ds.color.system('success')
ds.color.system('error')
ds.color.system('warning')
ds.color.system('info')
```

### Typography
```tsx
// Size
ds.typography.size('sm')    // 14px
ds.typography.size('md')    // 16px
ds.typography.size('lg')    // 18px

// Weight
ds.typography.weight('regular')
ds.typography.weight('semibold')
ds.typography.weight('bold')

// Font Family
ds.typography.fontFamily.notoSans

// Line Height
ds.typography.lineHeight('md')
```

### Border Radius
```tsx
ds.radius('xs')   // 0.25rem
ds.radius('sm')   // 0.5rem
ds.radius('md')   // 0.75rem
ds.radius('lg')   // 1rem
ds.radius('full') // 9999px
```

### Common Values
```tsx
ds.common.borderWidth.thin     // border width
ds.common.cursor.pointer       // cursor style
ds.common.icon.small           // icon size
ds.common.height.buttonMiddle  // button height
```

---

## 🧩 Components

### Button
```tsx
// Size: "small" | "middle" | "large" (ไม่ใช่ "medium")
<Button variant="primary" color="brand" size="middle">
  Button Text
</Button>

// With Icon
<Button icon={<i className="ri-search-line" />}>
  Search
</Button>

// Icon Only (Square, border radius ตาม DS)
<Button icon={<i className="ri-close-line" />} />
```

### Input
```tsx
<Input
  label="Label"
  placeholder="Placeholder"
  helperText="Helper text"
  size="middle"
  error="Error message"
/>
```

### Modal
```tsx
// Size: "small" | "middle" | "large" (ไม่ใช่ "medium")
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Title"
  supportingText="Supporting text"
  size="middle"
/>
```

### Badge
```tsx
<Badge color="brand" variant="filled" size="md">
  Badge
</Badge>
```

---

## ⚠️ สิ่งที่ต้องจำ

1. **Size ใช้ "middle" ไม่ใช่ "medium"**
   ```tsx
   // ✅ ถูกต้อง
   size="middle"
   
   // ❌ ผิด
   size="medium"
   ```

2. **ใช้ spacing tokens แทน px/rem โดยตรง**
   ```tsx
   // ✅ ถูกต้อง
   padding: ds.spacing('4')
   
   // ❌ ผิด
   padding: "16px"
   ```

3. **ใช้ color tokens แทน hex/rgb**
   ```tsx
   // ✅ ถูกต้อง
   color: ds.color.text('primary')
   
   // ❌ ผิด
   color: "#12151a"
   ```

4. **ใช้ component tokens สำหรับ component styles**
   ```tsx
   // ✅ ถูกต้อง
   backgroundColor: ds.component.button.primaryBrand.bg()
   
   // ❌ ผิด
   backgroundColor: "#00af43"
   ```

5. **Font Family ใช้ ds.typography.fontFamily.notoSans**
   ```tsx
   fontFamily: ds.typography.fontFamily.notoSans
   ```

---

## 📐 Layout Patterns

### Container
```tsx
<div style={{
  maxWidth: ds.common.layout.containerMaxWidth,
  padding: ds.spacing('4'),
  fontFamily: ds.typography.fontFamily.notoSans,
}}>
  {children}
</div>
```

### Card
```tsx
<div style={{
  padding: ds.spacing('8'),
  backgroundColor: ds.color.background('primary'),
  border: `1px solid ${ds.color.border('primary')}`,
  borderRadius: ds.radius('lg'),
}}>
  {children}
</div>
```

---

## 🔍 ตัวอย่าง Feature

```tsx
"use client";

import { ds } from "@/design-system";
import { Button, Input, Modal } from "@/components";

export default function MyFeature() {
  return (
    <div style={{
      padding: ds.spacing('8'),
      fontFamily: ds.typography.fontFamily.notoSans,
    }}>
      <h1 style={{
        fontSize: ds.typography.size('2xl'),
        fontWeight: ds.typography.weight('bold'),
        color: ds.color.text('primary'),
        marginBottom: ds.spacing('4'),
      }}>
        Feature Title
      </h1>
      
      <Input
        label="Email"
        placeholder="Enter email"
        size="middle"
      />
      
      <Button
        variant="primary"
        color="brand"
        size="middle"
      >
        Submit
      </Button>
    </div>
  );
}
```

---

## 📚 ดู Design System

- Foundation: `/designsystem/foundation` - Colors, Typography, Spacing, etc.
- Components: `/designsystem` - Button, Input, Modal, etc.
