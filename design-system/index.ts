/**
 * Design System - Main Export
 * 
 * Centralized access to all design system utilities.
 * Use this to access design tokens and prevent hardcoded values.
 * 
 * @example
 * ```tsx
 * import { ds } from '@/design-system';
 * 
 * // Spacing
 * <div style={{ padding: ds.spacing('8'), margin: ds.spacing('4') }}>Content</div>
 * 
 * // Colors
 * <div style={{ color: ds.color.text('primary'), backgroundColor: ds.color.background('secondary') }}>Text</div>
 * 
 * // Typography
 * <div style={{ fontSize: ds.typography.size('md'), fontWeight: ds.typography.weight('bold') }}>Text</div>
 * 
 * // Border Radius
 * <div style={{ borderRadius: ds.radius('md') }}>Rounded</div>
 * 
 * // Common values
 * <div style={{ borderWidth: ds.common.borderWidth.thin, cursor: ds.common.cursor.pointer }}>Box</div>
 * ```
 */

import { spacing, spacingUtils } from './spacing';
import { colorUtils } from './colors';
import { typographyUtils } from './typography';
import { radius, radiusUtils } from './radius';
import { common } from './common';
import { button, input, toggle, checkbox, radio, alert, icon, select, textarea, modal, illustration, componentToken } from './components';

/**
 * Design System utilities
 * 
 * Main object for accessing all design system tokens and utilities.
 */
export const ds = {
  /**
   * Spacing utilities
   */
  spacing,
  spacingUtils,
  
  /**
   * Color utilities
   */
  color: colorUtils,
  
  /**
   * Typography utilities
   */
  typography: typographyUtils,
  
  /**
   * Border radius utilities
   */
  radius,
  radiusUtils,
  
  /**
   * Common utilities
   */
  common,
  
  /**
   * Component utilities
   */
  component: {
    token: componentToken,
    button,
    input,
    toggle,
    checkbox,
    radio,
    alert,
    icon,
    select,
    textarea,
    modal,
    illustration,
  },
} as const;

// Export individual utilities for convenience
export { spacing, spacingUtils } from './spacing';
export { colorUtils as color } from './colors';
export { typographyUtils as typography } from './typography';
export { radius, radiusUtils } from './radius';
export { common } from './common';
export { button, input, toggle, checkbox, radio, alert, icon, select, textarea, modal, illustration, componentToken } from './components';
export * from './tokens';
