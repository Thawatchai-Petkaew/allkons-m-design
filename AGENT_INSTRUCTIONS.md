# คำสั่งสำหรับ Agent: ตรวจสอบและแก้ไข Hard Code

## วัตถุประสงค์
ตรวจสอบและแก้ไข hard code ทั้งหมดใน Design System Allkons เพื่อให้ใช้ design tokens จาก `@/design-system` แทน

## ไฟล์ที่ต้องตรวจสอบ

### 1. ไฟล์หลัก Design System
- `/app/designsystem/page.tsx` - หน้า Design System showcase (ไฟล์หลักที่ต้องตรวจสอบ)

### 2. Components
- `/components/ui/Button.tsx`
- `/components/ui/Input.tsx`
- `/components/ui/Textarea.tsx`
- `/components/ui/Select.tsx`
- `/components/ui/Toggle.tsx`
- `/components/ui/Checkbox.tsx`
- `/components/ui/Radio.tsx`
- `/components/ui/Alert.tsx`
- `/components/ui/Icon.tsx`
- `/components/ui/Modal.tsx`
- `/components/ui/BottomSheet.tsx`
- `/components/ui/Confirmation.tsx`
- `/components/ui/Badge.tsx`
- `/components/ui/Illustration.tsx`

### 3. Layout Components
- `/components/Layout/DesignSystemSidebar.tsx`

## สิ่งที่ต้องตรวจสอบและแก้ไข

### ❌ Hard Code ที่ต้องหาและแก้ไข:

1. **Colors (Hex/RGB/RGBA)**
   - `#12151a`, `#37404f`, `rgba(0, 0, 0, 0.5)`, `rgb(255, 255, 255)`
   - แก้เป็น: `ds.color.text('primary')`, `ds.color.background('primary')`, etc.

2. **Spacing (px, rem, em)**
   - `"16px"`, `"1rem"`, `"24px"`, `"0.5rem"`
   - แก้เป็น: `ds.spacing('4')`, `ds.spacing('6')`, etc.

3. **Font Sizes (px, rem, em)**
   - `"14px"`, `"16px"`, `"1rem"`
   - แก้เป็น: `ds.typography.size('sm')`, `ds.typography.size('md')`, etc.

4. **Line Heights (px, rem, em)**
   - `"20px"`, `"24px"`
   - แก้เป็น: `ds.typography.lineHeight('sm')`, `ds.typography.lineHeight('md')`, etc.

5. **Font Weights (numbers)**
   - `400`, `500`, `600`, `700`
   - แก้เป็น: `ds.typography.weight('regular')`, `ds.typography.weight('medium')`, etc.

6. **Border Radius (px, rem, em)**
   - `"8px"`, `"0.5rem"`, `"9999px"`
   - แก้เป็น: `ds.radius('sm')`, `ds.radius('md')`, `ds.radius('full')`, etc.

7. **Border Widths (px)**
   - `"1px"`, `"2px"`
   - แก้เป็น: `ds.common.borderWidth.thin`, `ds.common.borderWidth.medium`

8. **Icon Sizes (px)**
   - `"16px"`, `"24px"`, `"32px"`
   - แก้เป็น: `ds.common.icon.small`, `ds.common.icon.medium`, `ds.common.icon.large`, etc.

9. **Layout Values (px)**
   - `"1200px"`, `"220px"` (sidebar width)
   - แก้เป็น: `ds.common.layout.containerMaxWidth` หรือสร้าง token ใหม่

10. **Letter Spacing (px)**
    - `"0.5px"`, `"1px"`
    - แก้เป็น: `ds.typography.letterSpacing.tight`, `ds.typography.letterSpacing.normal`

11. **Box Shadow (string)**
    - `"0 8px 24px rgba(0, 0, 0, 0.12)"`
    - แก้เป็น: `ds.component.modal.shadow()` หรือ component-specific shadow

12. **Animation Durations (s, ms)**
    - `"0.2s"`, `"300ms"`
    - แก้เป็น: `ds.common.animation.fast`, `ds.common.animation.normal`

13. **Z-Index (numbers)**
    - `1000`, `999`, `100`
    - ควรสร้าง tokens สำหรับ z-index หรือใช้ constants

## วิธีการตรวจสอบ

### ใช้ grep เพื่อหา hard code:

```bash
# หา hex colors
grep -r "#[0-9a-fA-F]\{3,6\}" app/designsystem components/

# หา px values
grep -r '"[0-9]\+px"' app/designsystem components/

# หา rgba/rgb
grep -r "rgba\?(" app/designsystem components/

# หา rem/em values
grep -r '"[0-9.]\+rem"' app/designsystem components/
grep -r '"[0-9.]\+em"' app/designsystem components/
```

## หลักการแก้ไข

### ✅ ถูกต้อง (ใช้ Design System):
```tsx
import { ds } from '@/design-system';

<div style={{
  padding: ds.spacing('6'),
  color: ds.color.text('primary'),
  fontSize: ds.typography.size('md'),
  borderRadius: ds.radius('sm'),
  borderWidth: ds.common.borderWidth.thin,
  borderColor: ds.color.border('primary'),
}}>
  Content
</div>
```

### ❌ ผิด (Hard Code):
```tsx
<div style={{
  padding: '24px',
  color: '#12151a',
  fontSize: '16px',
  borderRadius: '8px',
  borderWidth: '1px',
  borderColor: '#dee1e6',
}}>
  Content
</div>
```

## ข้อยกเว้น

### ค่าที่อนุญาตให้ hard code ได้:
1. **CSS Variables โดยตรง** - `var(--spacing-4)` (แต่ควรใช้ `ds.spacing('4')` แทน)
2. **Dynamic Calculations** - `calc(${ds.spacing('4')} + ${ds.spacing('2')})`
3. **Percentage Values** - `"100%"`, `"50%"` (สำหรับ layout)
4. **Viewport Units** - `"100vh"`, `"100vw"` (สำหรับ full screen)
5. **Zero Values** - `"0"` หรือ `ds.spacing('none')` (ควรใช้ `ds.spacing('none')`)

## Checklist หลังแก้ไข

- [ ] ไม่มี hex colors (#hex) ในไฟล์ที่ตรวจสอบ
- [ ] ไม่มี px/rem/em hard code (ยกเว้นข้อยกเว้น)
- [ ] ใช้ `ds.spacing()` แทน spacing hard code
- [ ] ใช้ `ds.typography.*` แทน typography hard code
- [ ] ใช้ `ds.color.*` แทน color hard code
- [ ] ใช้ `ds.radius()` แทน border-radius hard code
- [ ] ใช้ `ds.common.*` แทน common values hard code
- [ ] ใช้ `ds.component.*` แทน component-specific hard code
- [ ] ทดสอบว่า UI ยังแสดงผลถูกต้องหลังแก้ไข

## ตัวอย่างการแก้ไข

### ตัวอย่างที่ 1: Colors
```tsx
// ❌ ก่อน
<div style={{ color: '#37404f' }}>Text</div>

// ✅ หลัง
<div style={{ color: ds.color.text('secondary') }}>Text</div>
```

### ตัวอย่างที่ 2: Spacing
```tsx
// ❌ ก่อน
<div style={{ padding: '16px', margin: '8px' }}>Content</div>

// ✅ หลัง
<div style={{ padding: ds.spacing('4'), margin: ds.spacing('2') }}>Content</div>
```

### ตัวอย่างที่ 3: Typography
```tsx
// ❌ ก่อน
<div style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>Text</div>

// ✅ หลัง
<div style={{ 
  fontSize: ds.typography.size('md'), 
  lineHeight: ds.typography.lineHeight('md'),
  fontWeight: ds.typography.weight('semibold')
}}>Text</div>
```

### ตัวอย่างที่ 4: Border Radius
```tsx
// ❌ ก่อน
<div style={{ borderRadius: '8px' }}>Box</div>

// ✅ หลัง
<div style={{ borderRadius: ds.radius('sm') }}>Box</div>
```

## การรายงานผล

หลังจากตรวจสอบและแก้ไขแล้ว ให้รายงาน:
1. จำนวนไฟล์ที่ตรวจสอบ
2. จำนวน hard code ที่พบ
3. จำนวน hard code ที่แก้ไขแล้ว
4. Hard code ที่เหลือ (ถ้ามี) และเหตุผลที่ไม่แก้ไข
5. ไฟล์ที่แก้ไข
