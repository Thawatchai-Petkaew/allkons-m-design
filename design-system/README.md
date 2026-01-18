# Allkons Design System

Design System utilities เพื่อป้องกัน hard code และให้ใช้งาน design tokens ได้ง่ายขึ้น

## 🎯 หลักการใช้งาน Design System

**ลำดับความสำคัญในการเลือกใช้ Component:**

1. **Allkons Design System** (ลำดับแรก) - ใช้ components จาก `@/components` และ tokens จาก `@/design-system`
2. **Ant Design** (ลำดับสอง) - ใช้เมื่อ Allkons Design System ไม่มี component ที่ต้องการ
3. **Custom Component** (ลำดับสุดท้าย) - สร้างเองเมื่อทั้งสองอย่างข้างต้นไม่มี

### ❌ อย่า Hard Code

```tsx
// ❌ ไม่ดี - Hard code
<div style={{ padding: '16px', color: '#12151a' }}>Content</div>

// ✅ ดี - ใช้ Design System
import { ds } from '@/design-system';
<div style={{ padding: ds.spacing('4'), color: ds.color.text('primary') }}>Content</div>
```

## 📦 การใช้งาน

### Import

```tsx
import { ds } from '@/design-system';
import { Button, Input, Badge, Modal } from '@/components';
```

### Spacing

```tsx
// ใช้ spacing token
<div style={{ padding: ds.spacing('8'), margin: ds.spacing('4') }}>
  Content
</div>

// หรือใช้ shortcuts
<div style={{ padding: ds.spacingUtils.xl() }}>
  Content
</div>
```

### Colors

```tsx
// Text colors
<div style={{ color: ds.color.text('primary') }}>Text</div>
<div style={{ color: ds.color.text('secondary') }}>Secondary Text</div>

// Background colors
<div style={{ backgroundColor: ds.color.background('primary') }}>Box</div>
<div style={{ backgroundColor: ds.color.background('secondary') }}>Box</div>

// Border colors
<div style={{ borderColor: ds.color.border('primary') }}>Box</div>
```

### Typography

```tsx
// Font size
<div style={{ fontSize: ds.typography.size('md') }}>Text</div>

// Line height
<div style={{ lineHeight: ds.typography.lineHeight('md') }}>Text</div>

// Font weight
<div style={{ fontWeight: ds.typography.weight('bold') }}>Bold</div>

// Typography preset (size + line-height + weight)
<div style={ds.typography.preset('heading-h1')}>Heading</div>

// Font family
<div style={{ fontFamily: ds.typography.fontFamily.notoSans }}>Text</div>
```

### Border Radius

```tsx
// Border radius
<div style={{ borderRadius: ds.radius('md') }}>Rounded</div>

// หรือใช้ shortcuts
<div style={{ borderRadius: ds.radiusUtils.md() }}>Rounded</div>
```

### Common Values

```tsx
// Icon sizes
<i style={{ fontSize: ds.common.icon.small }} />

// Border widths
<div style={{ borderWidth: ds.common.borderWidth.thin }}>Box</div>

// Animation durations
<div style={{ transitionDuration: ds.common.animation.fast }}>Animated</div>

// Cursor
<div style={{ cursor: ds.common.cursor.pointer }}>Clickable</div>

// Layout
<div style={{ maxWidth: ds.common.layout.containerMaxWidth }}>Container</div>

// Component heights
<button style={{ height: ds.common.height.buttonMiddle }}>Button</button>
```

## 🧩 Components

### Available Components

Allkons Design System มี components ต่อไปนี้:

- **Button** - ปุ่มสำหรับ action ต่างๆ
- **Input** - Input field สำหรับรับข้อมูล
- **Textarea** - Textarea สำหรับข้อความยาว
- **Select** - Dropdown selector
- **Toggle** - Switch toggle (circular และ rectangular)
- **Checkbox** - Checkbox input
- **Radio** - Radio button
- **Alert** - Alert messages (compact และ expanded)
- **Modal** - Modal dialog
- **BottomSheet** - Bottom sheet สำหรับ mobile
- **Confirmation** - Confirmation dialog (responsive: Modal on desktop, BottomSheet on mobile)
- **Badge** - Badge สำหรับแสดง status, categories, labels
- **Icon** - Icon component
- **Illustration** - Illustration component สำหรับ empty states

### ตัวอย่างการใช้งาน Components

```tsx
import { Button, Input, Badge, Modal, Alert } from '@/components';

// Button
<Button variant="primary" color="brand" size="middle">
  Click Me
</Button>

// Input
<Input 
  placeholder="Enter text"
  label="Label"
  helper="Helper text"
/>

// Badge
<Badge color="brand" variant="filled" size="sm">
  New
</Badge>

// Modal
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  supportingText="Supporting text"
>
  Content
</Modal>

// Alert
<Alert
  type="success"
  variant="compact"
  title="Success!"
  onClose={() => {}}
/>
```

## 🎨 Component Tokens

### Button Tokens

```tsx
// Primary Brand Button
ds.component.button.primaryBrand.bg()        // Default background
ds.component.button.primaryBrand.bg('hover') // Hover background
ds.component.button.primaryBrand.bg('disabled') // Disabled background
ds.component.button.primaryBrand.text()      // Default text color
ds.component.button.primaryBrand.border()    // Default border color
```

### Input Tokens

```tsx
// Background
ds.component.input.bg()           // Default
ds.component.input.bg('disabled') // Disabled
ds.component.input.bg('brand')    // Success/Active state
ds.component.input.bg('error')    // Error state

// Border
ds.component.input.border()           // Default
ds.component.input.border('hover')    // Hover
ds.component.input.border('active')   // Focused
ds.component.input.border('error')   // Error
```

### Badge Tokens

```tsx
// Badge sizes
ds.component.badge.size.fontSize('sm')
ds.component.badge.size.paddingHorizontal('sm')

// Badge colors
ds.component.badge.brand.filled.bg()
ds.component.badge.brand.filled.text()
ds.component.badge.error.outlined.border()
```

## 📋 ตัวอย่างการใช้งาน

### แทนที่ hardcoded values

**ก่อน (Hard code):**
```tsx
<div style={{ padding: '16px', margin: '8px', color: '#12151a' }}>
  Content
</div>
```

**หลัง (ใช้ Design System):**
```tsx
import { ds } from '@/design-system';

<div style={{ 
  padding: ds.spacing('4'), 
  margin: ds.spacing('2'), 
  color: ds.color.text('primary') 
}}>
  Content
</div>
```

### ใช้ใน Components

```tsx
import { ds } from '@/design-system';

export const Card = ({ children }) => {
  return (
    <div style={{
      padding: ds.spacing('6'),
      borderRadius: ds.radius('md'),
      backgroundColor: ds.color.background('primary'),
      borderWidth: ds.common.borderWidth.thin,
      borderColor: ds.color.border('primary'),
    }}>
      {children}
    </div>
  );
};
```

## 🔄 Migration Guide

### จาก Ant Design ไป Allkons Design System

```tsx
// ❌ Ant Design
import { Button } from 'antd';
<Button type="primary">Click</Button>

// ✅ Allkons Design System
import { Button } from '@/components';
<Button variant="primary" color="brand">Click</Button>
```

### จาก Hard Code ไป Design System

```tsx
// ❌ Hard Code
<div style={{ 
  padding: '24px', 
  color: '#37404f',
  fontSize: '16px',
  borderRadius: '8px'
}}>
  Content
</div>

// ✅ Design System
<div style={{ 
  padding: ds.spacing('6'), 
  color: ds.color.text('secondary'),
  fontSize: ds.typography.size('md'),
  borderRadius: ds.radius('sm')
}}>
  Content
</div>
```

## ✅ Checklist ก่อน Commit

- [ ] ไม่มี hard code colors (#hex, rgba, rgb)
- [ ] ไม่มี hard code spacing (px, rem, em) - ใช้ `ds.spacing()` แทน
- [ ] ไม่มี hard code font sizes - ใช้ `ds.typography.size()` แทน
- [ ] ใช้ Allkons Design System components ก่อน Ant Design
- [ ] ใช้ design tokens จาก `ds` object แทน CSS variables โดยตรง
- [ ] ตรวจสอบว่า component ที่ใช้มีใน Allkons Design System หรือไม่

## 📚 Resources

- Design System Documentation: `/designsystem`
- Component Showcase: `/designsystem#button`, `/designsystem#badge`, etc.
- Foundation Tokens: `/designsystem#typography`, `/designsystem#color-system`, etc.

## 🎯 ประโยชน์

1. **ป้องกัน Hard Code** - ใช้ tokens แทนค่าคงที่ ไม่มี `var(--...)` ตรงๆ ในโค้ด
2. **Type Safety** - TypeScript จะตรวจสอบ token names และ state
3. **Consistency** - ใช้ค่าเดียวกันทั้งโปรเจกต์
4. **Maintainability** - แก้ไขที่เดียว เปลี่ยนทั้งระบบ
5. **Discoverability** - IDE autocomplete ช่วยหา tokens ที่มี
6. **Component-Specific** - มี utilities สำหรับ components พร้อมใช้งาน
