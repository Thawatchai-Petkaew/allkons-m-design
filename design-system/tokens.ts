/**
 * Design System Token Types
 * 
 * Type definitions for all design tokens to ensure type safety
 * and prevent hardcoded values.
 */

export type SpacingToken =
  | 'none' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
  | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

export type SizeToken =
  | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | '10xl' | '11xl';

export type RadiusToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type TextColorToken =
  | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'
  | 'placeholder' | 'disabled' | 'white' | 'brand-default';

export type BackgroundToken = 'primary' | 'secondary' | 'tertiary' | 'brand-default';

export type BorderToken = 'primary' | 'secondary' | 'brand-default';

export type FontWeightToken =
  | 'thin' | 'extralight' | 'light' | 'regular' | 'medium'
  | 'semibold' | 'bold' | 'extrabold' | 'black';

export type TypographyToken =
  | 'display-d1' | 'display-d2' | 'display-d3' | 'display-d4' | 'display-d5' | 'display-d6'
  | 'heading-h1' | 'heading-h2' | 'heading-h3' | 'heading-h4' | 'heading-h5' | 'heading-h6'
  | 'page-title'
  | 'paragraph-big' | 'paragraph-middle' | 'paragraph-small' | 'paragraph-xsmall'
  | 'label-selection' | 'label-list' | 'label-input-small' | 'label-input-middle'
  | 'clickable-label' | 'value-list' | 'placeholder' | 'subtitle'
  | 'button-big' | 'button-middle' | 'button-small'
  | 'link-big' | 'link-middle' | 'link-small'
  | 'all-caps' | 'error';

export type BadgeColorToken =
  | 'brand' | 'error' | 'info' | 'success' | 'warning' | 'neutral' | 'lavender';

export type BadgeSizeToken = '2xs' | 'xs' | 'sm' | 'md';

export type BadgeVariantToken = 'filled' | 'outlined' | 'subtle';
