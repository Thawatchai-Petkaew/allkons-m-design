/**
 * Design System - Spacing Utilities
 * 
 * Provides type-safe access to spacing tokens.
 * Prevents hardcoded spacing values.
 * 
 * @example
 * ```tsx
 * import { ds } from '@/design-system';
 * 
 * <div style={{ padding: ds.spacing('8') }}>Content</div>
 * // Returns: "var(--spacing-8)"
 * ```
 */

import type { SpacingToken } from './tokens';

/**
 * Get spacing CSS variable
 * 
 * @param token - Spacing token name (none, 1-16)
 * @returns CSS variable string (e.g., "var(--spacing-8)")
 */
export function spacing(token: SpacingToken): string {
  return `var(--spacing-${token})`;
}

/**
 * Spacing utility object for convenient access
 */
export const spacingUtils = {
  /**
   * Get spacing value
   */
  get: spacing,
  
  /**
   * Common spacing shortcuts
   */
  none: () => spacing('none'),
  xs: () => spacing('1'),
  sm: () => spacing('2'),
  md: () => spacing('4'),
  lg: () => spacing('6'),
  xl: () => spacing('8'),
  '2xl': () => spacing('12'),
  '3xl': () => spacing('16'),
} as const;
