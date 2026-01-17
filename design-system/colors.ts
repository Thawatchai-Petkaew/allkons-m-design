/**
 * Design System - Color Utilities
 * 
 * Provides type-safe access to color tokens.
 * Prevents hardcoded color values.
 * 
 * @example
 * ```tsx
 * import { ds } from '@/design-system';
 * 
 * <div style={{ color: ds.color.text('primary') }}>Text</div>
 * <div style={{ backgroundColor: ds.color.background('primary') }}>Box</div>
 * ```
 */

import type { TextColorToken, BackgroundToken, BorderToken } from './tokens';

/**
 * Get text color CSS variable
 */
export function textColor(token: TextColorToken): string {
  return `var(--text-${token})`;
}

/**
 * Get background color CSS variable
 */
export function backgroundColor(token: BackgroundToken): string {
  return `var(--background-${token})`;
}

/**
 * Get border color CSS variable
 */
export function borderColor(token: BorderToken): string {
  return `var(--border-${token})`;
}

/**
 * Get system color CSS variable
 */
export function systemColor(type: 'success' | 'error' | 'warning' | 'info'): string {
  return `var(--system-${type}-00)`;
}

/**
 * Color utility object
 */
export const colorUtils = {
  text: textColor,
  background: backgroundColor,
  border: borderColor,
  system: systemColor,
  
  /**
   * Common color shortcuts
   */
  common: {
    transparent: 'var(--transparent)',
    none: 'var(--none)',
    currentColor: 'var(--current-color)',
  },
} as const;
