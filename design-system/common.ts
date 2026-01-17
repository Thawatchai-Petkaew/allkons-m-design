/**
 * Design System - Common Utilities
 * 
 * Common design system values and utilities.
 * Prevents hardcoded common values.
 */

/**
 * Common utility values
 */
export const common = {
  /**
   * Transparent value
   */
  transparent: 'var(--transparent)',
  
  /**
   * None value
   */
  none: 'var(--none)',
  
  /**
   * Current color
   */
  currentColor: 'var(--current-color)',
  
  /**
   * Icon sizes
   */
  icon: {
    small: 'var(--icon-size-small)',
    medium: 'var(--icon-size-medium)',
    large: 'var(--icon-size-large)',
  },
  
  /**
   * Border widths
   */
  borderWidth: {
    thin: 'var(--border-width-thin)',
    medium: 'var(--border-width-medium)',
  },
  
  /**
   * Animation durations
   */
  animation: {
    fast: 'var(--animation-duration-fast)',
    normal: 'var(--animation-duration-normal)',
  },
  
  /**
   * Cursor values
   */
  cursor: {
    pointer: 'var(--cursor-pointer)',
    notAllowed: 'var(--cursor-not-allowed)',
  },
  
  /**
   * Layout values
   */
  layout: {
    containerMaxWidth: 'var(--container-max-width)',
    inputContainerWidth: 'var(--input-container-width)',
  },
  
  /**
   * Component heights (total height including padding and border)
   */
  height: {
    inputSmall: 'var(--input-height-small)',
    inputMiddle: 'var(--input-height-middle)',
    inputLarge: 'var(--input-height-large)',
    buttonSmall: 'var(--button-height-small)',
    buttonMiddle: 'var(--button-height-middle)',
    buttonLarge: 'var(--button-height-large)',
    toggleSmall: 'var(--toggle-height-small)',
    toggleMiddle: 'var(--toggle-height-middle)',
    toggleLarge: 'var(--toggle-height-large)',
  },
  
  /**
   * Component widths
   */
  width: {
    toggleSmall: 'var(--toggle-width-small)',
    toggleMiddle: 'var(--toggle-width-middle)',
    toggleLarge: 'var(--toggle-width-large)',
    toggleRectangularSmall: 'var(--toggle-width-rectangular-small)',
    toggleRectangularMiddle: 'var(--toggle-width-rectangular-middle)',
    toggleRectangularLarge: 'var(--toggle-width-rectangular-large)',
  },
  
  /**
   * Component sizes (for internal elements like thumbs)
   */
  size: {
    toggleThumbSmall: 'var(--toggle-thumb-small)',
    toggleThumbMiddle: 'var(--toggle-thumb-middle)',
    toggleThumbLarge: 'var(--toggle-thumb-large)',
    toggleThumbOffsetSmall: 'var(--toggle-thumb-offset-small)',
    toggleThumbOffsetMiddle: 'var(--toggle-thumb-offset-middle)',
    toggleThumbOffsetLarge: 'var(--toggle-thumb-offset-large)',
    checkboxSmall: 'var(--checkbox-small)',
    checkboxMiddle: 'var(--checkbox-middle)',
    checkboxLarge: 'var(--checkbox-large)',
    checkboxIcon: (size: 'small' | 'middle' | 'large') => {
      const sizeMap = {
        small: 'var(--checkbox-icon-small)',
        middle: 'var(--checkbox-icon-middle)',
        large: 'var(--checkbox-icon-large)',
      };
      return sizeMap[size];
    },
    radioSmall: 'var(--radio-small)',
    radioMiddle: 'var(--radio-middle)',
    radioLarge: 'var(--radio-large)',
    radioDotSmall: 'var(--radio-dot-small)',
    radioDotMiddle: 'var(--radio-dot-middle)',
    radioDotLarge: 'var(--radio-dot-large)',
    alertIcon: 'var(--alert-icon-size)',
    alertCloseIcon: 'var(--alert-close-icon-size)',
    alertDetailsIcon: 'var(--alert-details-icon-size)',
    iconXs: 'var(--icon-xs)',
    iconSm: 'var(--icon-sm)',
    iconMd: 'var(--icon-md)',
    iconLg: 'var(--icon-lg)',
    iconXl: 'var(--icon-xl)',
    icon2xl: 'var(--icon-2xl)',
    iconInnerXs: 'var(--icon-inner-xs)',
    iconInnerSm: 'var(--icon-inner-sm)',
    iconInnerMd: 'var(--icon-inner-md)',
    iconInnerLg: 'var(--icon-inner-lg)',
    iconInnerXl: 'var(--icon-inner-xl)',
    iconInner2xl: 'var(--icon-inner-2xl)',
  },
  
  /**
   * Component padding (vertical) - calculated to match Figma heights
   */
  padding: {
    inputVerticalSmall: 'var(--input-padding-vertical-small)',
    inputVerticalMiddle: 'var(--input-padding-vertical-middle)',
    inputVerticalLarge: 'var(--input-padding-vertical-large)',
    buttonVerticalSmall: 'var(--button-padding-vertical-small)',
    buttonVerticalMiddle: 'var(--button-padding-vertical-middle)',
    buttonVerticalLarge: 'var(--button-padding-vertical-large)',
  },
  
  /**
   * Component border radius - following Figma specifications
   */
  borderRadius: {
    input: 'var(--input-border-radius)',
    button: 'var(--button-border-radius)',
    alert: 'var(--alert-border-radius)',
    modal: 'var(--modal-border-radius)',
    illustration: 'var(--illustration-border-radius)',
  },
} as const;
