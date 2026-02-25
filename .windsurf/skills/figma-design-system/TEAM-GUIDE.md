# Allkons M Design System Implementation Guide

## 🎯 ภาพรวม

เอกสารนี้จะแนะนำการใช้งาน Figma Design System Integration Skill สำหรับทีมพัฒนา Allkons M ในการนำ Design จาก Figma มา Implement ใน Codebase

## 🚀 การเริ่มต้น

### 1. เรียกใช้ Figma Design System Skill
```
@figma-design-system
```

### 2. ข้อกำหนดเบื้องต้น
- มีสิทธิ์เข้าถึง Figma Design Files
- ติดตั้ง Node.js และ npm
- มี Figma API Token

## 📋 การทำงานแบบ Step-by-Step

### Phase 1: เตรียมการจาก Figma

#### สำหรับ Designers
1. **จัดระเบียบ Figma File**
   - ตั้งชื่อ Components ตามมาตรฐาน
   - ใช้ Color Styles และ Typography Styles
   - สร้าง Component Variations

2. **ตั้งค่า Design Tokens**
   - สร้าง Color Styles ใน Figma
   - ตั้งค่า Typography Scale
   - กำหนด Spacing Grid

#### สำหรับ Developers
1. **ตั้งค่า Environment**
   ```bash
   export FIGMA_FILE_ID="your_figma_file_id"
   export FIGMA_ACCESS_TOKEN="your_figma_access_token"
   ```

2. **รัน Token Extraction Script**
   ```bash
   ./windsurf/skills/figma-design-system/scripts/extract-tokens.sh
   ```

### Phase 2: Implement Components

#### 1. ใช้ Component Template
```bash
# คัดลอก template
cp windsurf/skills/figma-design-system/templates/component-template.md your-component.md

# กรอกข้อมูลตาม Figma specifications
```

#### 2. Implement ด้วย DS Utility
```typescript
import { ds } from '@/lib/design-system';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      style={{
        backgroundColor: ds.colors.background.white,
        borderRadius: ds.borderRadius.md,
        padding: ds.spacing.md,
        boxShadow: ds.shadows.sm,
      }}
    >
      {/* Component content */}
    </div>
  );
};
```

### Phase 3: การทดสอบและ Validation

#### 1. Visual Testing
- เปรียบเทียบกับ Figma Design
- ทดสอบ Responsive Behavior
- ตรวจสอบ Accessibility

#### 2. Code Quality
- ใช้ TypeScript
- เขียน Unit Tests
- ตรวจสอบ Performance

## 🎨 การใช้งาน Design Tokens

### Colors
```css
/* ใช้ CSS Variables */
color: var(--color-primary-500);
background-color: var(--color-construction-orange);
```

```typescript
// ใช้ DS Utility
const styles = {
  color: ds.colors.primary.main,
  backgroundColor: ds.colors.construction.orange,
};
```

### Spacing
```css
padding: var(--spacing-md);
margin: var(--spacing-lg);
gap: var(--spacing-sm);
```

```typescript
const styles = {
  padding: ds.spacing.md,
  margin: ds.spacing.lg,
  gap: ds.spacing.sm,
};
```

### Typography
```css
font-size: var(--font-size-base);
font-weight: var(--font-weight-semibold);
line-height: var(--line-height-normal);
```

```typescript
const styles = {
  fontSize: ds.fontSizes.base,
  fontWeight: ds.fontWeights.semibold,
  lineHeight: ds.lineHeights.normal,
};
```

## 🏗️ Construction Industry Specifics

### สีสำหรับ Construction Industry
```css
--color-construction-orange: #f97316;  /* สำหรับอุปกรณ์ก่อสร้าง */
--color-safety-yellow: #eab308;       /* สำหรับความปลอดภัย */
--color-equipment-blue: #0ea5e9;      /* สำหรับเครื่องจักร */
```

### Spacing สำหรับ Construction Workflows
```css
--spacing-construction-gap: var(--spacing-lg);
--spacing-equipment-margin: var(--spacing-xl);
```

## 📱 Responsive Design

### Mobile-First Approach
```typescript
const responsiveStyles = {
  base: {
    // Mobile styles (default)
    padding: ds.spacing.sm,
  },
  md: {
    '@media (min-width: 768px)': {
      padding: ds.spacing.md,
    },
  },
  lg: {
    '@media (min-width: 1024px)': {
      padding: ds.spacing.lg,
    },
  },
};
```

## ♿ Accessibility Guidelines

### ต้องทำ
- [ ] ใช้ Semantic HTML
- [ ] เพิ่ม ARIA Labels
- [ ] รองรับ Keyboard Navigation
- [ ] ตรวจสอบ Color Contrast
- [ ] ทดสอบกับ Screen Readers

### ตัวอย่าง Implementation
```typescript
export const AccessibleButton: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  ariaLabel,
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        padding: ds.spacing.sm ds.spacing.md,
        backgroundColor: ds.colors.primary.main,
        color: ds.colors.white,
        border: 'none',
        borderRadius: ds.borderRadius.md,
        cursor: 'pointer',
        ':focus': {
          outline: `2px solid ${ds.colors.primary.focus}`,
          outlineOffset: '2px',
        },
      }}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 🧪 Testing Guidelines

### 1. Unit Tests
```typescript
describe('ProductCard', () => {
  it('renders with correct styling', () => {
    render(<ProductCard product={mockProduct} />);
    
    const card = screen.getByTestId('product-card');
    expect(card).toHaveStyle({
      backgroundColor: ds.colors.background.white,
      borderRadius: ds.borderRadius.md,
    });
  });
});
```

### 2. Visual Regression Tests
```typescript
// ใช้ tools อย่าง Percy หรือ Chromatic
describe('ProductCard Visual', () => {
  it('matches Figma design', async () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    await expect(container).toMatchScreenshot();
  });
});
```

## 🔄 การทำงานร่วมกับทีม

### Designer → Developer Handoff
1. **Designer:**
   - จัดเตรียม Figma File
   - สร้าง Component Specifications
   - ทำเครื่องหมาย Design Tokens

2. **Developer:**
   - รัน Token Extraction
   - Implement Components
   - ทดสอบกับ Design Specifications

### Review Process
1. **Design Review:** ตรวจสอบความถูกต้องกับ Figma
2. **Code Review:** ตรวจสอบ Code Quality
3. **QA Review:** ทดสอบ Functionality และ Accessibility

## 🛠️ Tools และ Resources

### Required Tools
- **Figma:** Design Tool
- **Node.js:** Token Extraction
- **TypeScript:** Type Safety
- **Jest:** Unit Testing
- **Storybook:** Component Documentation

### Helpful Extensions
- **Figma Dev Mode:** Design-to-code workflow
- **Design Token Manager:** Token management
- **Accessibility Checker:** Accessibility validation

## 📚 Best Practices

### 1. Design Token Management
- ใช้ Semantic Naming
- รักษา Consistency
- Document Usage Guidelines

### 2. Component Development
- Follow React Best Practices
- Use TypeScript Properly
- Implement Proper Error Boundaries

### 3. Performance Optimization
- Optimize Images
- Use Lazy Loading
- Monitor Bundle Size

## 🚨 Common Issues และ Solutions

### Issue: Colors ไม่ตรงกับ Figma
**Solution:**
- ตรวจสอบ Token Extraction Process
- Validate Color Format Conversion
- Check CSS Variable Implementation

### Issue: Component ไม่ Responsive
**Solution:**
- ใช้ Mobile-First Approach
- Test on Multiple Screen Sizes
- Consider Construction Site Usage

### Issue: Accessibility ไม่ผ่าน
**Solution:**
- Run Accessibility Audit
- Implement ARIA Labels
- Test with Screen Readers

## 📞 การขอความช่วยเหลือ

### ถ้าพบปัญหา:
1. ตรวจสอบ Figma Design System Skill: `@figma-design-system`
2. อ่าน Documentation ใน `resources/figma-integration-guide.md`
3. ใช้ Template ใน `templates/component-template.md`
4. รัน Token Extraction Script ถ้าจำเป็น

### ติดต่อทีม:
- **Design Team:** สำหรับ Figma Issues
- **Development Team:** สำหรับ Implementation Issues
- **QA Team:** สำหรับ Testing Issues

---

## 🎯 สรุป

การใช้ Figma Design System Integration Skill จะช่วยให้ทีม:
- ✅ นำ Design จาก Figma มา Implement ได้อย่างถูกต้อง
- ✅ รักษา Consistency ของ Design System
- ✅ เพิ่มความเร็วในการพัฒนา
- ✅ ลข้อผิดพลาดจากการ Implement
- ✅ ทำงานร่วมกันได้อย่างมีประสิทธิภาพ

**เริ่มต้นใช้งาน:** `@figma-design-system` 🚀
