# Illustrations

This directory contains global SVG illustrations used throughout the application.

## File Naming Convention

Files follow the pattern: `{variant}-{background}-{type}.svg`

### Variants
- `brand` - Brand color variant
- `error` - Error/red variant
- `gray` - Gray/neutral variant
- `info` - Info/blue variant
- `success` - Success/green variant
- `warning` - Warning/orange variant

### Background Types
- `no-bg` - Without background
- `with-bg` - With background

### Types
- `icon` - Icon variant
- `illustration` - Illustration variant
- `loading` - Loading animation variant

## Usage

In Next.js, you can reference these files using the `/assets/illustrations/` path:

```tsx
import Image from 'next/image';

<Image 
  src="/assets/illustrations/brand-with-bg-illustration.svg" 
  alt="Brand illustration"
  width={400}
  height={300}
/>
```

Or as a regular img tag:

```tsx
<img 
  src="/assets/illustrations/error-no-bg-icon.svg" 
  alt="Error icon"
/>
```

## Available Files

Total: 36 files
- 6 variants × 2 background types × 3 types = 36 files
