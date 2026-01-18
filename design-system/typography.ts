/**
 * Design System - Typography Utilities
 * 
 * Provides type-safe access to typography tokens.
 * Prevents hardcoded font sizes, weights, and line heights.
 * 
 * @example
 * ```tsx
 * import { ds } from '@/design-system';
 * 
 * <div style={{ fontSize: ds.typography.size('md') }}>Text</div>
 * <div style={{ fontWeight: ds.typography.weight('bold') }}>Bold</div>
 * ```
 */

import type { SizeToken, FontWeightToken, TypographyToken } from './tokens';

/**
 * Get font size CSS variable
 */
export function fontSize(token: SizeToken): string {
  return `var(--size-${token})`;
}

/**
 * Get line height CSS variable
 */
export function lineHeight(token: SizeToken): string {
  return `var(--line-height-${token})`;
}

/**
 * Get font weight CSS variable
 */
export function fontWeight(token: FontWeightToken): string {
  return `var(--font-weight-${token})`;
}

/**
 * Get typography preset (size + line-height + weight)
 */
export function typography(token: TypographyToken) {
  return {
    fontSize: `var(--text-${token}-size)`,
    lineHeight: `var(--text-${token}-line-height)`,
    fontWeight: token.startsWith('display') || token.startsWith('heading') || token === 'page-title'
      ? 'var(--font-weight-bold)'
      : token.startsWith('button')
      ? 'var(--font-weight-semibold)'
      : token.startsWith('link')
      ? 'var(--font-weight-light)'
      : token === 'clickable-label' || token === 'value-list'
      ? 'var(--font-weight-bold)'
      : 'var(--font-weight-regular)',
  };
}

/**
 * Typography utility object
 */
export const typographyUtils = {
  size: fontSize,
  lineHeight: lineHeight,
  weight: fontWeight,
  preset: typography,
  
  /**
   * Font family
   */
  fontFamily: {
    notoSans: 'var(--font-family-noto-sans)',
    monospace: 'monospace',
  },
  
  /**
   * Letter spacing
   */
  letterSpacing: {
    normal: 'var(--letter-spacing-normal)',
    tight: 'var(--letter-spacing-tight)',
  },
} as const;
