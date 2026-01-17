# Design System Utilities

Design System utilities เพื่อป้องกัน hard code และให้ใช้งาน design tokens ได้ง่ายขึ้น

## การใช้งาน

### Import

```tsx
import { ds } from '@/design-system';
```

### Spacing

```tsx
// ใช้ spacing token
<div style={{ padding: ds.spacing(8), margin: ds.spacing(4) }}>
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

// Common values
<div style={{ backgroundColor: ds.color.common.transparent }}>Transparent</div>
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

### Component Tokens

```tsx
// Button component tokens
<button style={{
  backgroundColor: ds.component.button.primaryBrand.bg(),
  color: ds.component.button.primaryBrand.text(),
  border: `${ds.common.borderWidth.thin} solid ${ds.component.button.primaryBrand.border()}`
}}>
  Primary Brand Button
</button>

// Button with hover state
<button style={{
  backgroundColor: ds.component.button.primaryBrand.bg('hover'),
  color: ds.component.button.primaryBrand.text('hover'),
}}>
  Hover State
</button>

// Input component tokens
<input style={{
  backgroundColor: ds.component.input.bg(),
  border: `${ds.common.borderWidth.thin} solid ${ds.component.input.border()}`,
  color: ds.component.input.text(),
}} />

// Input with error state
<input style={{
  backgroundColor: ds.component.input.bg('error'),
  border: `${ds.common.borderWidth.thin} solid ${ds.component.input.border('error')}`,
  color: ds.component.input.text(),
}} />
```

## ตัวอย่างการใช้งาน

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
  padding: ds.spacing(4), 
  margin: ds.spacing(2), 
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
      padding: ds.spacing(6),
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

## Component-Specific Tokens

### Button Tokens

```tsx
// Primary Brand Button
ds.component.button.primaryBrand.bg()        // Default background
ds.component.button.primaryBrand.bg('hover') // Hover background
ds.component.button.primaryBrand.bg('disabled') // Disabled background
ds.component.button.primaryBrand.text()      // Default text color
ds.component.button.primaryBrand.border()    // Default border color

// Primary Error Button
ds.component.button.primaryError.bg()
ds.component.button.primaryError.text()
ds.component.button.primaryError.border()

// Secondary Brand Button
ds.component.button.secondaryBrand.bg()
ds.component.button.secondaryBrand.text()
ds.component.button.secondaryBrand.border()

// Secondary Neutral Button
ds.component.button.secondaryNeutral.bg()
ds.component.button.secondaryNeutral.text()
ds.component.button.secondaryNeutral.border()

// Secondary Error Button
ds.component.button.secondaryError.bg()
ds.component.button.secondaryError.text()
ds.component.button.secondaryError.border()

// Tertiary Brand Button
ds.component.button.tertiaryBrand.bg()
ds.component.button.tertiaryBrand.text()

// Tertiary Neutral Button
ds.component.button.tertiaryNeutral.bg()
ds.component.button.tertiaryNeutral.text()

// Tertiary Error Button
ds.component.button.tertiaryError.bg()
ds.component.button.tertiaryError.text()
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
ds.component.input.border('disabled') // Disabled
ds.component.input.border('error')   // Error
ds.component.input.border('error-hover')   // Error hover
ds.component.input.border('error-active')  // Error focused
ds.component.input.border('brand')         // Success
ds.component.input.border('brand-hover')   // Success hover
ds.component.input.border('brand-active')  // Success focused

// Text
ds.component.input.text()           // Default
ds.component.input.text('disabled') // Disabled

// Label
ds.component.input.label()           // Default
ds.component.input.label('error')    // Error state
ds.component.input.label('disabled')  // Disabled

// Helper text
ds.component.input.helper()          // Default
ds.component.input.helper('error')    // Error state
ds.component.input.helper('disabled') // Disabled

// Icon
ds.component.input.icon()           // Default
ds.component.input.icon('error')    // Error state
ds.component.input.icon('brand')    // Success state
ds.component.input.icon('disabled') // Disabled

// Focus ring
ds.component.input.focusRing('brand') // Success focus ring
ds.component.input.focusRing('error') // Error focus ring
```

## ประโยชน์

1. **ป้องกัน Hard Code** - ใช้ tokens แทนค่าคงที่ ไม่มี `var(--...)` ตรงๆ ในโค้ด
2. **Type Safety** - TypeScript จะตรวจสอบ token names และ state
3. **Consistency** - ใช้ค่าเดียวกันทั้งโปรเจกต์
4. **Maintainability** - แก้ไขที่เดียว เปลี่ยนทั้งระบบ
5. **Discoverability** - IDE autocomplete ช่วยหา tokens ที่มี
6. **Component-Specific** - มี utilities สำหรับ Button และ Input components พร้อมใช้งาน
