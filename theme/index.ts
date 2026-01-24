import type { ThemeConfig } from "antd";
import { typography, colors, radius, spacing } from "./token";

const theme: ThemeConfig = {
  token: {
    // Map Core Tokens
    colorPrimary: "#00af43", // brand-m-primary-00 (special-green-sg-00)
    colorText: "var(--text-secondary)",
    colorTextHeading: "var(--text-primary)",
    colorTextSecondary: "var(--text-secondary)",
    colorTextTertiary: "var(--text-tertiary)",
    colorBgBase: "#ffffff", // Force white background
    colorBgLayout: "var(--background-secondary)",
    colorBgContainer: "#ffffff", // Force white for containers
    colorSuccess: "#1eb950", // system-success-00
    colorError: "#da2110", // system-error-00
    colorWarning: "#ffab08", // system-warning-00
    colorInfo: "#65b2e8", // system-info-00

    // Border Radius (Mapping Medium as default)
    borderRadius: 6, // AntD uses px number for calculation usually. 
    // Using explicit number for safety in JS calculations, but we want to respect tokens.
    // If we use var, some math might fail. But for basic borderRadius it works often.
    // Let's try matching 'medium' (0.75rem = 12px) or 'small' (0.5rem = 8px) usually.
    // If we want 6px, that's roughly small/xs.
    // Let's assume AntD default 6px is close to --radius-sm (0.5rem=8px)
    borderRadiusSM: 4, // xs
    borderRadiusLG: 8, // sm?

    // Spacing
    // Ant Design uses specific keys for spacing customization in some components, 
    // but globally it's less direct than Tailwind.

    fontFamily: typography.fontFamily,

    // Map Typography to Ant Design
    // Mapping Figma "Header/H1" -> Size/6xl -> fontSizeHeading1
    // Using CSS variables with cssVar mode enabled in ConfigProvider
    fontSizeHeading1: `var(--size-6xl)` as any,
    lineHeightHeading1: `var(--line-height-6xl)` as any,

    fontSizeHeading2: `var(--size-4xl)` as any, // Header/H2
    lineHeightHeading2: `var(--line-height-4xl)` as any,

    fontSizeHeading3: `var(--size-3xl)` as any, // Header/H3
    lineHeightHeading3: `var(--line-height-3xl)` as any,

    fontSizeHeading4: `var(--size-2xl)` as any, // Header/H4
    lineHeightHeading4: `var(--line-height-2xl)` as any,

    fontSizeHeading5: `var(--size-xl)` as any, // Header/H5
    lineHeightHeading5: `var(--line-height-xl)` as any,

    fontSize: 16, // Base size (Middle/Regular = Size/md = 16px)
    fontSizeLG: 18, // Large
    fontSizeSM: 14, // Small
    fontSizeXL: 20,
  },
  components: {
    Typography: {
      // We can map component specific overrides here
      fontSizeHeading1: `var(--size-6xl)` as any,
      lineHeightHeading1: `var(--line-height-6xl)` as any,
      fontSizeHeading2: `var(--size-4xl)` as any,
      lineHeightHeading2: `var(--line-height-4xl)` as any,
      fontSizeHeading3: `var(--size-3xl)` as any,
      lineHeightHeading3: `var(--line-height-3xl)` as any,
      fontSizeHeading4: `var(--size-2xl)` as any,
      lineHeightHeading4: `var(--line-height-2xl)` as any,
      fontSizeHeading5: `var(--size-xl)` as any,
      lineHeightHeading5: `var(--line-height-xl)` as any,
    },
    Button: {
      // Map Button styles
      // Button/Big -> Size/lg (18px)
      // Button/Middle -> Size/md (16px)
      // Button/Small -> Size/sm (14px)
      contentFontSize: 16,
      contentFontSizeSM: 14,
      contentFontSizeLG: 18,
    }
  }
};

export default theme;