# Logo Assets

## 📁 Directory Structure

```
public/assets/logos/
├── logo-mark.svg          (Logo Mark - icon only)
├── logo-mark-white.svg    (Logo Mark - white variant)
├── logo-full.svg          (Logo - full with text)
├── logo-full-white.svg    (Logo - full white variant)
├── logo-mark.png          (PNG versions if needed)
├── logo-full.png          (PNG versions if needed)
└── README.md              (This file)
```

## 📥 How to Add Logo Files

1. **Download from Figma:**
   - Logo Mark: https://www.figma.com/design/UR4vV67uL8FWYGlSjGYdFg/Allkons-DS1-MCP-Server?node-id=40001524-18441
   - Logo (Full): https://www.figma.com/design/UR4vV67uL8FWYGlSjGYdFg/Allkons-DS1-MCP-Server?node-id=40001524-18877

2. **Export formats:**
   - **SVG** (recommended for web) - Export as SVG
   - **PNG** (if needed for fallback) - Export as PNG @1x, @2x, @4x

3. **File naming:**
   - `logo-mark.svg` - Logo Mark (icon only)
   - `logo-full.svg` - Full Logo (with text)
   - `-white` suffix for white variants on dark backgrounds

## 📝 Usage in Code

After uploading files, you can use them like this:

```tsx
import Image from 'next/image';

// Logo Mark
<Image 
  src="/assets/logos/logo-mark.svg" 
  alt="Allkons M Logo Mark" 
  width={40} 
  height={40} 
/>

// Full Logo
<Image 
  src="/assets/logos/logo-full.svg" 
  alt="Allkons M Logo" 
  width={120} 
  height={40} 
/>
```

Or using standard img tag:

```tsx
<img 
  src="/assets/logos/logo-mark.svg" 
  alt="Allkons M Logo Mark" 
  style={{ width: '40px', height: '40px' }}
/>
```

## 🎨 Variants

- **Logo Mark**: Icon/symbol only (square format, typically used in favicon, app icon)
- **Logo Full**: Full logo with text (horizontal layout, typically used in headers)
- **White variants**: For use on dark backgrounds
