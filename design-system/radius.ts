/**
 * Design System - Border Radius Utilities
 * 
 * Provides type-safe access to border radius tokens.
 * Prevents hardcoded border radius values.
 * 
 * @example
 * ```tsx
 * import { ds } from '@/design-system';
 * 
 * <div style={{ borderRadius: ds.radius('md') }}>Rounded</div>
 * ```
 */

import type { RadiusToken } from './tokens';

/**
 * Get border radius CSS variable
 */
export function radius(token: RadiusToken): string {
  return `var(--radius-${token})`;
}

/**
 * Border radius utility object
 */
export const radiusUtils = {
  get: radius,
  
  /**
   * Common radius shortcuts
   */
  none: () => radius('none'),
  xs: () => radius('xs'),
  sm: () => radius('sm'),
  md: () => radius('md'),
  lg: () => radius('lg'),
  xl: () => radius('xl'),
  full: () => radius('full'),
} as const;
