"use client";

import React from "react";
import { ds } from "@/design-system";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "prefix" | "suffix"> {
  /**
   * Input label text
   */
  label?: string;
  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Error message (if provided, shows error state)
   */
  error?: string;
  /**
   * Input state
   * - default: Default state
   * - success: Success/active state with green border
   * - error: Error state with red border
   */
  state?: "default" | "success" | "error";
  /**
   * Input size
   */
  size?: "small" | "middle" | "large";
  /**
   * Leading icon (e.g., @ symbol)
   */
  prefix?: React.ReactNode;
  /**
   * Trailing icon (e.g., info icon)
   */
  suffix?: React.ReactNode;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Callback fired when input value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  required = false,
  helperText,
  error,
  state = "default",
  size = "middle",
  prefix,
  suffix,
  disabled = false,
  className = "",
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Determine actual state (error takes precedence)
  const actualState = error ? "error" : state;
  const displayHelperText = error || helperText;

  // Size styles - following Figma design specifications
  // With box-sizing: border-box, height includes padding and border
  // Padding vertical is calculated: (height - lineHeight - border*2) / 2
  const sizeStyles: Record<"small" | "middle" | "large", React.CSSProperties> = {
    small: {
      fontSize: ds.typography.size('sm'),      // 14px
      lineHeight: ds.typography.lineHeight('sm'), // 20px
      paddingTop: ds.common.padding.inputVerticalSmall,    // 5px
      paddingBottom: ds.common.padding.inputVerticalSmall, // 5px
      paddingLeft: ds.spacing('3'),              // 12px horizontal (default, will be overridden if prefix exists)
      paddingRight: ds.spacing('3'),             // 12px horizontal (default, will be overridden if suffix exists)
      height: ds.common.height.inputSmall,     // 32px (total: 20px lineHeight + 10px padding + 2px border)
    },
    middle: {
      fontSize: ds.typography.size('md'),      // 16px
      lineHeight: ds.typography.lineHeight('md'), // 24px
      paddingTop: ds.common.padding.inputVerticalMiddle,   // 7px
      paddingBottom: ds.common.padding.inputVerticalMiddle, // 7px
      paddingLeft: ds.spacing('4'),              // 16px horizontal (default, will be overridden if prefix exists)
      paddingRight: ds.spacing('4'),             // 16px horizontal (default, will be overridden if suffix exists)
      height: ds.common.height.inputMiddle,    // 40px (total: 24px lineHeight + 14px padding + 2px border)
    },
    large: {
      fontSize: ds.typography.size('lg'),      // 18px
      lineHeight: ds.typography.lineHeight('lg'), // 24px
      paddingTop: ds.common.padding.inputVerticalLarge,    // 11px
      paddingBottom: ds.common.padding.inputVerticalLarge, // 11px
      paddingLeft: ds.spacing('6'),              // 24px horizontal (default, will be overridden if prefix exists)
      paddingRight: ds.spacing('6'),             // 24px horizontal (default, will be overridden if suffix exists)
      height: ds.common.height.inputLarge,     // 48px (total: 24px lineHeight + 22px padding + 2px border)
    },
  };

  /**
   * Get color styles based on state
   * Follows Figma design system color tokens
   */
  const getColorStyles = (): React.CSSProperties => {
    // Disabled state
    if (disabled) {
      return {
        backgroundColor: ds.component.input.bg('disabled'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.input.border('disabled'),
        color: ds.component.input.text('disabled'),
      };
    }

    // Error state
    if (actualState === "error") {
      if (isFocused) {
        return {
          backgroundColor: ds.component.input.bg('error'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.input.border('error-active'),
          color: ds.component.input.text(),
          boxShadow: `0 0 0 3px ${ds.component.input.focusRing('error')}`,
        };
      }
      if (isHovered) {
        return {
          backgroundColor: ds.component.input.bg('error'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.input.border('error-hover'),
          color: ds.component.input.text(),
        };
      }
      return {
        backgroundColor: ds.component.input.bg('error'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.input.border('error'),
        color: ds.component.input.text(),
      };
    }

    // Success/Brand state
    if (actualState === "success") {
      if (isFocused) {
        return {
          backgroundColor: ds.component.input.bg('brand'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.input.border('brand-active'),
          color: ds.component.input.text(),
          boxShadow: `0 0 0 3px ${ds.component.input.focusRing('brand')}`,
        };
      }
      if (isHovered) {
        return {
          backgroundColor: ds.component.input.bg('brand'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.input.border('brand-hover'),
          color: ds.component.input.text(),
        };
      }
      return {
        backgroundColor: ds.component.input.bg('brand'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.input.border('brand-active'),
        color: ds.component.input.text(),
      };
    }

    // Default state
    if (isFocused) {
      return {
        backgroundColor: ds.component.input.bg(),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.input.border('active'),
        color: ds.component.input.text(),
        boxShadow: `0 0 0 3px ${ds.component.input.focusRing('brand')}`,
      };
    }
    if (isHovered) {
      return {
        backgroundColor: ds.component.input.bg(),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.input.border('hover'),
        color: ds.component.input.text(),
      };
    }
    
    // Default state - ensure border is always present
    return {
      backgroundColor: ds.component.input.bg(),
      borderStyle: 'solid',
      borderWidth: ds.common.borderWidth.thin,
      borderColor: ds.component.input.border(),
      color: ds.component.input.text(),
    };
  };

  const colorStyles = getColorStyles();

  // Base input styles
  const inputStyles: React.CSSProperties = {
    fontFamily: ds.typography.fontFamily.notoSans,
    fontWeight: ds.typography.weight('regular'),
    letterSpacing: "0",
    borderRadius: ds.common.borderRadius.input,
    width: "100%",
    outline: ds.common.none,
    transition: `all ${ds.common.animation.fast} ease`,
    display: "flex",
    alignItems: "center",
    boxSizing: 'border-box', // Ensure height includes padding and border
    ...sizeStyles[size],
    // Apply colorStyles (includes background, border, text color)
    ...colorStyles,
    // Ensure border properties are always present (use non-shorthand properties only)
    borderStyle: colorStyles.borderStyle || 'solid',
    borderWidth: colorStyles.borderWidth || ds.common.borderWidth.thin,
    borderColor: colorStyles.borderColor || ds.component.input.border(),
    // Apply custom style last (allows override if needed)
    ...style,
  };

  // Label styles
  const labelColor = disabled
    ? ds.component.input.label('disabled')
    : actualState === "error"
    ? ds.component.input.label('error')
    : ds.component.input.label();

  // Helper text styles
  const helperTextColor = disabled
    ? ds.component.input.helper('disabled')
    : actualState === "error"
    ? ds.component.input.helper('error')
    : ds.component.input.helper();

  // Icon colors
  const iconColor = disabled
    ? ds.component.input.icon('disabled')
    : actualState === "error"
    ? ds.component.input.icon('error')
    : actualState === "success"
    ? ds.component.input.icon('brand')
    : ds.component.input.icon();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={className} style={{ width: "100%" }}>
      {/* Label */}
      {label && (
        <label
          style={{
            display: "block",
            fontSize: ds.typography.size('sm'),
            lineHeight: ds.typography.lineHeight('sm'),
            fontWeight: ds.typography.weight('regular'),
            color: labelColor,
            marginBottom: ds.spacing('2'),
          }}
        >
          {label}
          {required && (
            <span style={{ color: ds.component.input.label('error'), marginLeft: ds.spacing('1') }}>*</span>
          )}
        </label>
      )}

      {/* Input Container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Prefix Icon */}
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: size === "small" 
                ? ds.spacing('3')   // 12px
                : size === "middle"
                ? ds.spacing('4')   // 16px
                : ds.spacing('6'),  // 24px (large)
              display: "flex",
              alignItems: "center",
              color: iconColor,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {prefix}
          </span>
        )}

        {/* Input */}
        <input
          type="text"
          style={{
            ...inputStyles,
            // Ensure border properties are preserved (use non-shorthand properties only)
            borderStyle: inputStyles.borderStyle || 'solid',
            borderWidth: inputStyles.borderWidth || ds.common.borderWidth.thin,
            borderColor: inputStyles.borderColor || ds.component.input.border(),
            // Override horizontal padding if prefix/suffix icons exist
            // Keep paddingTop and paddingBottom from sizeStyles, only override horizontal
            // Formula: paddingLeft = iconLeftPosition + iconSize + gap
            // Gap: 8px (spacing-2) to prevent text from overlapping with icon
            ...(prefix ? {
              paddingLeft: size === "small"
                ? `calc(${ds.spacing('3')} + ${ds.common.icon.large} + ${ds.spacing('2')})`   // 12px + 20px + 8px = 40px
                : size === "middle"
                ? `calc(${ds.spacing('4')} + ${ds.common.icon.large} + ${ds.spacing('2')})`   // 16px + 20px + 8px = 44px
                : `calc(${ds.spacing('6')} + ${ds.common.icon.large} + ${ds.spacing('2')})`,  // 24px + 20px + 8px = 52px (large)
            } : {}),
            ...(suffix ? {
              paddingRight: size === "small"
                ? `calc(${ds.spacing('3')} + ${ds.common.icon.large} + ${ds.spacing('2')})`   // 12px + 20px + 8px = 40px
                : size === "middle"
                ? `calc(${ds.spacing('4')} + ${ds.common.icon.large} + ${ds.spacing('2')})`   // 16px + 20px + 8px = 44px
                : `calc(${ds.spacing('6')} + ${ds.common.icon.large} + ${ds.spacing('2')})`,  // 24px + 20px + 8px = 52px (large)
            } : {}),
          }}
          disabled={disabled}
          placeholder={props.placeholder || "Placeholder"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Suffix Icon */}
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: size === "small"
                ? ds.spacing('3')   // 12px
                : size === "middle"
                ? ds.spacing('4')   // 16px
                : ds.spacing('6'),  // 24px (large)
              display: "flex",
              alignItems: "center",
              color: iconColor,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {displayHelperText && (
        <div
          style={{
            marginTop: ds.spacing('2'),
            fontSize: ds.typography.size('sm'),
            lineHeight: ds.typography.lineHeight('sm'),
            fontWeight: ds.typography.weight('regular'),
            color: helperTextColor,
          }}
        >
          {displayHelperText}
        </div>
      )}
    </div>
  );
};
