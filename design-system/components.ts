/**
 * Design System - Component Utilities
 * 
 * Provides access to component-specific design tokens.
 * Prevents hardcoded component values.
 */

/**
 * Get component token CSS variable
 * 
 * @param component - Component name (e.g., "button", "input")
 * @param variant - Variant name (e.g., "primary", "secondary")
 * @param color - Color name (e.g., "brand", "neutral", "error")
 * @param property - Property name (e.g., "bg", "text", "border")
 * @param state - State name (e.g., "hover", "disabled", "active")
 * @returns CSS variable string
 */
export function componentToken(
  component: string,
  variant?: string,
  color?: string,
  property?: string,
  state?: string
): string {
  const parts = [component];
  if (variant) parts.push(variant);
  if (color) parts.push(color);
  if (property) parts.push(property);
  if (state) parts.push(state);
  
  return `var(--${parts.join('-')})`;
}

/**
 * Button component tokens
 */
export const button = {
  /**
   * Get button token
   * @example button.token('primary', 'brand', 'bg', 'hover')
   */
  token: (variant: string, color: string, property: string, state?: string) =>
    componentToken('button', variant, color, property, state),
  
  /**
   * Primary Brand Button
   */
  primaryBrand: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'primary', 'brand', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'primary', 'brand', 'text', state),
    border: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'primary', 'brand', 'border', state),
  },
  
  /**
   * Primary Error Button
   */
  primaryError: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'primary', 'error', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'primary', 'error', 'text', state),
    border: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'primary', 'error', 'border', state),
  },
  
  /**
   * Secondary Brand Button
   */
  secondaryBrand: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'brand', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'brand', 'text', state),
    border: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'brand', 'border', state),
  },
  
  /**
   * Secondary Neutral Button
   */
  secondaryNeutral: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'neutral', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'neutral', 'text', state),
    border: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'neutral', 'border', state),
  },
  
  /**
   * Secondary Error Button
   */
  secondaryError: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'error', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'error', 'text', state),
    border: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'secondary', 'error', 'border', state),
  },
  
  /**
   * Tertiary Brand Button
   */
  tertiaryBrand: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'tertiary', 'brand', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'tertiary', 'brand', 'text', state),
  },
  
  /**
   * Tertiary Neutral Button
   */
  tertiaryNeutral: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'tertiary', 'neutral', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'tertiary', 'neutral', 'text', state),
  },
  
  /**
   * Tertiary Error Button
   */
  tertiaryError: {
    bg: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'tertiary', 'error', 'bg', state),
    text: (state?: 'hover' | 'disabled') => 
      componentToken('button', 'tertiary', 'error', 'text', state),
  },
} as const;

/**
 * Input component tokens
 */
export const input = {
  /**
   * Get input token
   */
  token: (property: string, state?: string) =>
    componentToken('input', undefined, undefined, property, state),
  
  /**
   * Background
   */
  bg: (state?: 'disabled' | 'brand' | 'error') =>
    componentToken('input', undefined, undefined, 'bg', state),
  
  /**
   * Border
   */
  border: (state?: 'hover' | 'active' | 'disabled' | 'error' | 'error-hover' | 'error-active' | 'brand' | 'brand-hover' | 'brand-active') => {
    if (state === 'error-hover') return componentToken('input', undefined, undefined, 'border', 'error-hover');
    if (state === 'error-active') return componentToken('input', undefined, undefined, 'border', 'error-active');
    if (state === 'brand-hover') return componentToken('input', undefined, undefined, 'border', 'brand-hover');
    if (state === 'brand-active') return componentToken('input', undefined, undefined, 'border', 'brand-active');
    return componentToken('input', undefined, undefined, 'border', state);
  },
  
  /**
   * Text
   */
  text: (state?: 'disabled') =>
    componentToken('input', undefined, undefined, 'text', state),
  
  /**
   * Label
   */
  label: (state?: 'error' | 'disabled') =>
    componentToken('input', undefined, undefined, 'label', state),
  
  /**
   * Helper text
   */
  helper: (state?: 'error' | 'disabled') =>
    componentToken('input', undefined, undefined, 'helper', state),
  
  /**
   * Icon
   */
  icon: (state?: 'error' | 'brand' | 'disabled') =>
    componentToken('input', undefined, undefined, 'icon', state),
  
  /**
   * Focus ring
   */
  focusRing: (type: 'brand' | 'error') =>
    componentToken('input', undefined, undefined, 'focus-ring', type),
} as const;

/**
 * Toggle component tokens
 */
export const toggle = {
  /**
   * Get toggle token
   */
  token: (variant: string, property: string, state?: string, subState?: string) =>
    componentToken('toggle', variant, undefined, property, state ? `${state}${subState ? `-${subState}` : ''}` : undefined),
  
  /**
   * Circular Toggle
   */
  circular: {
    trackBg: (state: 'checked' | 'unchecked', subState?: 'hover' | 'disabled') =>
      componentToken('toggle', 'circular', undefined, 'track-bg', subState ? `${state}-${subState}` : state),
    thumbBg: () =>
      componentToken('toggle', 'circular', undefined, 'thumb-bg', undefined),
  },
  
  /**
   * Rectangular Toggle
   */
  rectangular: {
    bg: (state: 'checked' | 'unchecked', subState?: 'hover' | 'disabled') =>
      componentToken('toggle', 'rectangular', undefined, 'bg', subState ? `${state}-${subState}` : state),
    text: (state: 'checked' | 'unchecked', subState?: 'disabled') =>
      componentToken('toggle', 'rectangular', undefined, 'text', subState ? `${state}-${subState}` : state),
  },
  
  /**
   * Toggle Labels
   */
  label: (state?: 'disabled') =>
    componentToken('toggle', undefined, undefined, 'label', state),
  
  /**
   * Toggle Description
   */
  description: (state?: 'disabled') =>
    componentToken('toggle', undefined, undefined, 'description', state),
} as const;

/**
 * Checkbox component tokens
 */
export const checkbox = {
  /**
   * Get checkbox token
   */
  token: (property: string, state?: string, subState?: string) =>
    componentToken('checkbox', undefined, undefined, property, state ? `${state}${subState ? `-${subState}` : ''}` : undefined),
  
  /**
   * Background
   */
  bg: (state: 'unchecked' | 'checked' | 'indeterminate', subState?: 'hover' | 'disabled') =>
    componentToken('checkbox', undefined, undefined, 'bg', subState ? `${state}-${subState}` : state),
  
  /**
   * Border
   */
  border: (state: 'unchecked' | 'checked' | 'indeterminate', subState?: 'hover' | 'disabled') =>
    componentToken('checkbox', undefined, undefined, 'border', subState ? `${state}-${subState}` : state),
  
  /**
   * Icon color
   */
  icon: (state: 'unchecked' | 'checked' | 'indeterminate', subState?: 'disabled') =>
    componentToken('checkbox', undefined, undefined, 'icon', subState ? `${state}-${subState}` : state),
  
  /**
   * Focus ring
   */
  focusRing: () =>
    componentToken('checkbox', undefined, undefined, 'focus-ring', undefined),
  
  /**
   * Label
   */
  label: (state?: 'disabled') =>
    componentToken('checkbox', undefined, undefined, 'label', state),
  
  /**
   * Description
   */
  description: (state?: 'disabled') =>
    componentToken('checkbox', undefined, undefined, 'description', state),
} as const;

/**
 * Radio component tokens
 */
export const radio = {
  /**
   * Get radio token
   */
  token: (property: string, state?: string, subState?: string) =>
    componentToken('radio', undefined, undefined, property, state ? `${state}${subState ? `-${subState}` : ''}` : undefined),
  
  /**
   * Background
   */
  bg: (state: 'unchecked' | 'checked', subState?: 'hover' | 'disabled') =>
    componentToken('radio', undefined, undefined, 'bg', subState ? `${state}-${subState}` : state),
  
  /**
   * Border
   */
  border: (state: 'unchecked' | 'checked', subState?: 'hover' | 'disabled') =>
    componentToken('radio', undefined, undefined, 'border', subState ? `${state}-${subState}` : state),
  
  /**
   * Dot color (inner circle for checked state)
   */
  dot: () =>
    componentToken('radio', undefined, undefined, 'dot', undefined),
  
  /**
   * Focus ring
   */
  focusRing: () =>
    componentToken('radio', undefined, undefined, 'focus-ring', undefined),
  
  /**
   * Label
   */
  label: (state?: 'disabled') =>
    componentToken('radio', undefined, undefined, 'label', state),
  
  /**
   * Description
   */
  description: (state?: 'disabled') =>
    componentToken('radio', undefined, undefined, 'description', state),
} as const;

/**
 * Alert component tokens
 */
export const alert = {
  /**
   * Get alert token
   */
  token: (type: string, property: string, variant?: string) =>
    componentToken('alert', type, undefined, property, variant),
  
  /**
   * Background
   */
  bg: (type: 'error' | 'info' | 'warning' | 'success', variant: 'compact' | 'expanded') =>
    componentToken('alert', type, undefined, 'bg', variant),
  
  /**
   * Border
   */
  border: (type: 'error' | 'info' | 'warning' | 'success') =>
    componentToken('alert', type, undefined, 'border', undefined),
  
  /**
   * Icon color
   */
  icon: (type: 'error' | 'info' | 'warning' | 'success') =>
    componentToken('alert', type, undefined, 'icon', undefined),
  
  /**
   * Title color
   */
  title: (type: 'error' | 'info' | 'warning' | 'success') =>
    componentToken('alert', type, undefined, 'title', undefined),
  
  /**
   * Description color
   */
  description: (type: 'error' | 'info' | 'warning' | 'success') =>
    componentToken('alert', type, undefined, 'description', undefined),
  
  /**
   * Action color (Undo, View details)
   */
  action: (type: 'error' | 'info' | 'warning' | 'success') =>
    componentToken('alert', type, undefined, 'action', undefined),
} as const;

/**
 * Icon component tokens
 */
export const icon = {
  /**
   * Get icon token
   */
  token: (color: string, property: string, variant?: string) =>
    componentToken('icon', color, undefined, property, variant),
  
  /**
   * Background
   */
  bg: (color: 'brand' | 'error' | 'info' | 'warning' | 'neutral', variant: 'filled' | 'outlined') =>
    componentToken('icon', color, undefined, 'bg', variant),
  
  /**
   * Border
   */
  border: (color: 'brand' | 'error' | 'info' | 'warning' | 'neutral') =>
    componentToken('icon', color, undefined, 'border', undefined),
  
  /**
   * Icon color
   */
  icon: (color: 'brand' | 'error' | 'info' | 'warning' | 'neutral', variant: 'filled' | 'outlined') =>
    componentToken('icon', color, undefined, 'icon', variant),
} as const;

/**
 * Textarea component tokens
 */
export const textarea = {
  /**
   * Get textarea token
   */
  token: (property: string, state?: string) =>
    componentToken('textarea', undefined, undefined, property, state),
  
  /**
   * Background
   */
  bg: (state?: 'disabled' | 'brand' | 'error') =>
    componentToken('textarea', undefined, undefined, 'bg', state),
  
  /**
   * Border
   */
  border: (state?: 'hover' | 'active' | 'disabled' | 'error' | 'error-hover' | 'error-active' | 'brand' | 'brand-hover' | 'brand-active') => {
    if (state === 'error-hover') return componentToken('textarea', undefined, undefined, 'border', 'error-hover');
    if (state === 'error-active') return componentToken('textarea', undefined, undefined, 'border', 'error-active');
    if (state === 'brand-hover') return componentToken('textarea', undefined, undefined, 'border', 'brand-hover');
    if (state === 'brand-active') return componentToken('textarea', undefined, undefined, 'border', 'brand-active');
    return componentToken('textarea', undefined, undefined, 'border', state);
  },
  
  /**
   * Text
   */
  text: (state?: 'disabled') =>
    componentToken('textarea', undefined, undefined, 'text', state),
  
  /**
   * Label
   */
  label: (state?: 'error' | 'disabled') =>
    componentToken('textarea', undefined, undefined, 'label', state),
  
  /**
   * Helper text
   */
  helper: (state?: 'error' | 'disabled') =>
    componentToken('textarea', undefined, undefined, 'helper', state),
  
  /**
   * Focus ring
   */
  focusRing: (type: 'brand' | 'error') =>
    componentToken('textarea', undefined, undefined, 'focus-ring', type),
} as const;

/**
 * Select/Dropdown component tokens
 */
export const select = {
  /**
   * Get select token
   */
  token: (property: string, state?: string) =>
    componentToken('select', undefined, undefined, property, state),
  
  /**
   * Background
   */
  bg: (state?: 'disabled' | 'brand' | 'error') =>
    componentToken('select', undefined, undefined, 'bg', state),
  
  /**
   * Border
   */
  border: (state?: 'hover' | 'active' | 'disabled' | 'error' | 'error-hover' | 'error-active' | 'brand' | 'brand-hover' | 'brand-active') => {
    if (state === 'error-hover') return componentToken('select', undefined, undefined, 'border', 'error-hover');
    if (state === 'error-active') return componentToken('select', undefined, undefined, 'border', 'error-active');
    if (state === 'brand-hover') return componentToken('select', undefined, undefined, 'border', 'brand-hover');
    if (state === 'brand-active') return componentToken('select', undefined, undefined, 'border', 'brand-active');
    return componentToken('select', undefined, undefined, 'border', state);
  },
  
  /**
   * Text
   */
  text: (state?: 'disabled' | 'placeholder') =>
    componentToken('select', undefined, undefined, 'text', state),
  
  /**
   * Label
   */
  label: (state?: 'error' | 'disabled') =>
    componentToken('select', undefined, undefined, 'label', state),
  
  /**
   * Helper text
   */
  helper: (state?: 'error' | 'disabled') =>
    componentToken('select', undefined, undefined, 'helper', state),
  
  /**
   * Icon
   */
  icon: (state?: 'error' | 'brand' | 'disabled') =>
    componentToken('select', undefined, undefined, 'icon', state),
  
  /**
   * Arrow icon
   */
  arrow: (state?: 'disabled') =>
    componentToken('select', undefined, undefined, 'arrow', state),
  
  /**
   * Focus ring
   */
  focusRing: (type: 'brand' | 'error') =>
    componentToken('select', undefined, undefined, 'focus-ring', type),
  
  /**
   * Dropdown menu
   */
  dropdown: {
    bg: () => componentToken('select', undefined, undefined, 'dropdown-bg', undefined),
    border: () => componentToken('select', undefined, undefined, 'dropdown-border', undefined),
  },
  
  /**
   * Option
   */
  option: {
    bg: (state?: 'hover' | 'selected') =>
      componentToken('select', undefined, undefined, 'option-bg', state),
    text: (state?: 'selected' | 'disabled') =>
      componentToken('select', undefined, undefined, 'option-text', state),
  },
} as const;

/**
 * Modal/Dialog component tokens
 */
export const modal = {
  /**
   * Get modal token
   */
  token: (property: string) =>
    componentToken('modal', undefined, undefined, property, undefined),
  
  /**
   * Overlay background
   */
  overlayBg: () => componentToken('modal', undefined, undefined, 'overlay-bg', undefined),
  
  /**
   * Modal background
   */
  bg: () => componentToken('modal', undefined, undefined, 'bg', undefined),
  
  /**
   * Modal border
   */
  border: () => componentToken('modal', undefined, undefined, 'border', undefined),
  
  /**
   * Modal border radius
   */
  borderRadius: () => componentToken('modal', undefined, undefined, 'border-radius', undefined),
  
  /**
   * Title color
   */
  title: () => componentToken('modal', undefined, undefined, 'title', undefined),
  
  /**
   * Text color
   */
  text: () => componentToken('modal', undefined, undefined, 'text', undefined),
  
  /**
   * Shadow
   */
  shadow: () => componentToken('modal', undefined, undefined, 'shadow', undefined),
} as const;

/**
 * Illustration/Empty State component tokens
 */
export const illustration = {
  /**
   * Get illustration token
   */
  token: (property: string) =>
    componentToken('illustration', undefined, undefined, property, undefined),
  
  /**
   * Background
   */
  bg: () => componentToken('illustration', undefined, undefined, 'bg', undefined),
  
  /**
   * Border radius
   */
  borderRadius: () => componentToken('illustration', undefined, undefined, 'border-radius', undefined),
  
  /**
   * Icon color
   */
  iconColor: () => componentToken('illustration', undefined, undefined, 'icon-color', undefined),
  
  /**
   * Title color
   */
  title: () => componentToken('illustration', undefined, undefined, 'title', undefined),
  
  /**
   * Text color
   */
  text: () => componentToken('illustration', undefined, undefined, 'text', undefined),
  
  /**
   * Ring color
   */
  ringColor: () => componentToken('illustration', undefined, undefined, 'ring-color', undefined),
} as const;
