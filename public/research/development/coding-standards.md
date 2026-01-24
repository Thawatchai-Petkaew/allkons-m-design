# Allkons Coding Standards

> **อ่านเอกสารนี้ก่อนเขียน code ทุกครั้ง**

## หลักการสำคัญ

### 1. ใช้ Design System เป็นหลัก
- **ห้าม hardcode** ค่าใดๆ (colors, spacing, radius, typography)
- ใช้ `ds` utility จาก `@/design-system` เสมอ

### 2. ลำดับความสำคัญของ Component

```
1. Allkons Design System Components (ใน `/components/ui/`)
   ↓
2. Ant Design Components (ถ้า Allkons ไม่มี)
   ↓
3. ถามก่อน ถ้าต้องสร้าง Custom Component ใหม่
```

### 3. CSS Variables เท่านั้น
- ทุก style property ต้องใช้ CSS variable ผ่าน `ds` utility
- ห้ามใช้ hardcoded values: `#ffffff`, `20px`, `500`, `0.75rem`

### 4. การขอสร้าง Token/Component ใหม่
- **ต้องถามก่อน** ถ้าต้องการ:
  - สร้าง CSS variable ใหม่ใน `globals.css`
  - สร้าง design system token ใหม่
  - สร้าง custom component ใหม่

---

## Design System API

### Colors
```tsx
// ✅ ถูกต้อง
backgroundColor: ds.color.background("primary")
color: ds.color.text("secondary")
border: `1px solid ${ds.color.border("secondary")}`

// ❌ ผิด
backgroundColor: "white"
color: "#37404f"
```

### Spacing
```tsx
// ✅ ถูกต้อง
padding: ds.spacing("3")
gap: ds.spacing("2")
marginBottom: ds.spacing("4")

// ❌ ผิด
padding: "12px"
gap: "8px"
```

### Border Radius
```tsx
// ✅ ถูกต้อง
borderRadius: ds.radius("md")
borderRadius: ds.radius("full")

// ❌ ผิด
borderRadius: "8px"
borderRadius: "50%"
```

### Typography
```tsx
// ✅ ถูกต้อง - ใช้ preset
...ds.typography.preset("paragraph-small")

// ✅ ถูกต้อง - ปรับ weight เพิ่ม
...ds.typography.preset("paragraph-small"),
fontWeight: ds.typography.weight("medium")

// ❌ ผิด
fontSize: "14px"
fontWeight: 500
```

### Icons
```tsx
// ✅ ถูกต้อง
fontSize: ds.common.size.iconLg  // 20px
fontSize: ds.common.size.iconMd  // 16px

// ❌ ผิด
fontSize: "20px"
```

### Shadows
```tsx
// ✅ ถูกต้อง
boxShadow: "var(--shadow-3xl)"

// ❌ ผิด
boxShadow: "0px 12px 36px rgba(36, 42, 52, 0.12)"
```

### Common Values
```tsx
// ✅ ถูกต้อง
backgroundColor: ds.color.common.transparent

// ❌ ผิด
backgroundColor: "transparent"
```

---

## ตัวอย่างจาก ShopDropdown & SellerHeader

### ตัวอย่างที่ 1: Container Styling
```tsx
// ✅ ถูกต้อง
<div
  style={{
    minWidth: "264px",                              // ถ้าเป็น fixed dimension ที่ไม่มีใน token
    backgroundColor: ds.color.background("primary"),
    borderRadius: ds.radius("md"),
    boxShadow: "var(--shadow-3xl)",
    paddingTop: ds.spacing("3"),
    paddingBottom: ds.spacing("3"),
    paddingLeft: ds.spacing("3"),
    paddingRight: ds.spacing("3"),
  }}
>
```

### ตัวอย่างที่ 2: Typography Combination
```tsx
// ✅ ถูกต้อง - ใช้ preset + override weight
<span
  style={{
    ...ds.typography.preset("paragraph-small"),
    fontWeight: ds.typography.weight("medium"),
    color: ds.color.text("secondary"),
  }}
>
  Shop Name
</span>
```

### ตัวอย่างที่ 3: Icon + Text Button
```tsx
// ✅ ถูกต้อง
<button
  style={{
    display: "flex",
    alignItems: "center",
    gap: ds.spacing("2"),
    padding: ds.spacing("3"),
    backgroundColor: ds.color.common.transparent,
    borderRadius: ds.radius("sm"),
    border: "none",
  }}
>
  <i 
    className="ri-add-circle-line"
    style={{
      fontSize: ds.common.size.iconLg,
      color: ds.color.text("secondary"),
    }}
  />
  <span
    style={{
      ...ds.typography.preset("paragraph-small"),
      fontWeight: ds.typography.weight("regular"),
      color: ds.color.text("secondary"),
    }}
  >
    Button Text
  </span>
</button>
```

---

## Checklist ก่อน Submit Code

- [ ] ไม่มี hardcoded colors (ไม่มี `#`, `rgb()`, `white`, `black`)
- [ ] ไม่มี hardcoded spacing/sizing (ไม่มี `px`, `rem` ที่ไม่ใช่ใน `calc()`)
- [ ] ไม่มี hardcoded font weights (ไม่มี `400`, `500`, `600`, `700`)
- [ ] ไม่มี hardcoded border radius (ไม่มี `50%`, `8px`, etc.)
- [ ] ใช้ `ds` utility ทุก property ที่เกี่ยวกับ styling
- [ ] ใช้ Allkons components ก่อน ถ้าไม่มีถึงใช้ Ant Design
- [ ] ถ้าต้องการ token/component ใหม่ = ถามก่อน

---

## Token เพิ่มเติมที่มี

### Text Colors
- `primary` - สีหลักสำหรับ headings
- `secondary` - สีรองสำหรับ body text
- `tertiary` - สี lighter
- `quaternary` - สี lightest
- `brand-default` - สีแบรนด์

### Background Colors
- `primary` - white/main background
- `secondary` - gray background
- `brand-default` - brand color background

### Border Colors
- `primary`
- `secondary`
- `brand-default`

### Spacing Scale
- `1` (0.25rem) → `16` (4rem)
- ใช้ตามความเหมาะสม:
  - `1-2`: tight spacing
  - `3-4`: normal spacing
  - `5-8`: loose spacing
  - `9-16`: large spacing

### Radius Scale
- `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full`

### Font Weights
- `regular` (400)
- `medium` (500)
- `semibold` (600)
- `bold` (700)

---

**สรุป: ก่อนเขียน code ทุกครั้ง → ต้องใช้ `ds` utility และ CSS variables เท่านั้น ห้าม hardcode ค่าใดๆ**
