/**
 * Design System - Breakpoint Utilities
 * 
 * Breakpoint values based on Tailwind CSS defaults.
 * Provides type-safe access to breakpoint tokens.
 * 
 * @example
 * ```tsx
 * import { ds } from '@/design-system';
 * 
 * // Get breakpoint value
 * const mdBreakpoint = ds.breakpoint.value('md'); // '768px'
 * 
 * // Check if current width matches breakpoint
 * const isDesktop = window.innerWidth >= ds.breakpoint.pixel('lg'); // 1024
 * ```
 */

export type BreakpointToken = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Tailwind CSS default breakpoints (min-width)
 * Based on Tailwind CSS v3.x
 */
export const breakpointValues: Record<BreakpointToken, number> = {
  sm: 640,   // 40rem
  md: 768,   // 48rem
  lg: 1024,  // 64rem
  xl: 1280,  // 80rem
  '2xl': 1536, // 96rem
};

/**
 * Get breakpoint CSS variable
 * 
 * @param token - Breakpoint token name (sm, md, lg, xl, 2xl)
 * @returns CSS variable string (e.g., "var(--breakpoint-md)")
 */
export function breakpoint(token: BreakpointToken): string {
  return `var(--breakpoint-${token})`;
}

/**
 * Get breakpoint pixel value
 * 
 * @param token - Breakpoint token name
 * @returns Pixel value as number
 */
export function breakpointPixel(token: BreakpointToken): number {
  return breakpointValues[token];
}

/**
 * Get breakpoint value as CSS string
 * 
 * @param token - Breakpoint token name
 * @returns Pixel value as string (e.g., "768px")
 */
export function breakpointValue(token: BreakpointToken): string {
  return `${breakpointValues[token]}px`;
}

/**
 * Get breakpoint value in rem
 * 
 * @param token - Breakpoint token name
 * @returns Rem value as string (e.g., "48rem")
 */
export function breakpointRem(token: BreakpointToken): string {
  return `${breakpointValues[token] / 16}rem`;
}

/**
 * Breakpoint utility object
 */
export const breakpointUtils = {
  /**
   * Get breakpoint CSS variable
   */
  get: breakpoint,
  
  /**
   * Get breakpoint pixel value
   */
  pixel: breakpointPixel,
  
  /**
   * Get breakpoint value as CSS string
   */
  value: breakpointValue,
  
  /**
   * Get breakpoint value in rem
   */
  rem: breakpointRem,
  
  /**
   * All breakpoint values
   */
  values: breakpointValues,
} as const;
