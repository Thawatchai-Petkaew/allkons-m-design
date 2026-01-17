// Define TS variables that map to CSS variables
export const typography = {
  fontFamily: "var(--font-family-noto-sans)",
  
  // Font Sizes
  fontSize2xs: "var(--size-2xs)",
  fontSizeXs: "var(--size-xs)",
  fontSizeSm: "var(--size-sm)",
  fontSizeMd: "var(--size-md)",
  fontSizeLg: "var(--size-lg)",
  fontSizeXl: "var(--size-xl)",
  fontSize2xl: "var(--size-2xl)",
  fontSize3xl: "var(--size-3xl)",
  fontSize4xl: "var(--size-4xl)",
  fontSize5xl: "var(--size-5xl)",
  fontSize6xl: "var(--size-6xl)",
  fontSize7xl: "var(--size-7xl)",
  fontSize8xl: "var(--size-8xl)",
  fontSize9xl: "var(--size-9xl)",
  fontSize10xl: "var(--size-10xl)",
  fontSize11xl: "var(--size-11xl)",

  // Line Heights
  lineHeight2xs: "var(--line-height-2xs)",
  lineHeightXs: "var(--line-height-xs)",
  lineHeightSm: "var(--line-height-sm)",
  lineHeightMd: "var(--line-height-md)",
  lineHeightLg: "var(--line-height-lg)",
  lineHeightXl: "var(--line-height-xl)",
  lineHeight2xl: "var(--line-height-2xl)",
  lineHeight3xl: "var(--line-height-3xl)",
  lineHeight4xl: "var(--line-height-4xl)",
  lineHeight5xl: "var(--line-height-5xl)",
  lineHeight6xl: "var(--line-height-6xl)",
  lineHeight7xl: "var(--line-height-7xl)",
  lineHeight8xl: "var(--line-height-8xl)",
  lineHeight9xl: "var(--line-height-9xl)",
  lineHeight10xl: "var(--line-height-10xl)",
  lineHeight11xl: "var(--line-height-11xl)",

  // Font Weights
  fontWeightThin: 50, // Ant Design expects numbers for some tokens, but usually string "100" works in CSS. Let's use numbers if possible, but var() returns string.
  fontWeightExtraLight: 200,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
  fontWeightBlack: 900,
};

export const colors = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  quaternary: "var(--color-quaternary)",
  backgroundPrimary: "var(--color-background-primary)",
  backgroundSecondary: "var(--background-secondary)",
  textPrimary: "var(--text-primary)",
  textSecondary: "var(--text-secondary)",
  textTertiary: "var(--text-tertiary)",
  brandPrimary: "var(--brand-m-primary-00)",
  success: "var(--system-success-00)",
  error: "var(--system-error-00)",
  warning: "var(--system-warning-00)",
  info: "var(--system-info-00)",
};

export const radius = {
  none: "var(--radius-none)",
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  full: "var(--radius-full)",
};

export const spacing = {
  none: "var(--spacing-none)",
  1: "var(--spacing-1)",
  2: "var(--spacing-2)",
  3: "var(--spacing-3)",
  4: "var(--spacing-4)",
  5: "var(--spacing-5)",
  6: "var(--spacing-6)",
  7: "var(--spacing-7)",
  8: "var(--spacing-8)",
  9: "var(--spacing-9)",
  10: "var(--spacing-10)",
  11: "var(--spacing-11)",
  12: "var(--spacing-12)",
  13: "var(--spacing-13)",
  14: "var(--spacing-14)",
  15: "var(--spacing-15)",
  16: "var(--spacing-16)",
};
