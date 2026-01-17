"use client";

import React from "react";
import { ds } from "@/design-system";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /**
   * Textarea label text
   */
  label?: string;
  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  /**
   * Error message (if provided, shows error state)
   */
  error?: string;
  /**
   * Textarea state
   * - default: Default state
   * - success: Success/active state with green border
   * - error: Error state with red border
   */
  state?: "default" | "success" | "error";
  /**
   * Textarea size
   */
  size?: "small" | "middle" | "large";
  /**
   * Number of visible text lines (rows)
   */
  rows?: number;
  /**
   * Whether the textarea can be resized
   * - none: Cannot be resized
   * - both: Can be resized both horizontally and vertically
   * - horizontal: Can be resized horizontally
   * - vertical: Can be resized vertically
   */
  resize?: "none" | "both" | "horizontal" | "vertical";
  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  required = false,
  helperText,
  error,
  state = "default",
  size = "middle",
  rows = 4,
  resize = "vertical",
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

  // Size styles - following Figma design specifications (similar to Input)
  const sizeStyles: Record<"small" | "middle" | "large", React.CSSProperties> = {
    small: {
      fontSize: ds.typography.size('sm'),      // 14px
      lineHeight: ds.typography.lineHeight('sm'), // 20px
      paddingTop: ds.common.padding.inputVerticalSmall,    // 5px
      paddingBottom: ds.common.padding.inputVerticalSmall, // 5px
      paddingLeft: ds.spacing('3'),              // 12px horizontal
      paddingRight: ds.spacing('3'),             // 12px horizontal
      minHeight: ds.common.height.inputSmall,     // 32px minimum
    },
    middle: {
      fontSize: ds.typography.size('md'),      // 16px
      lineHeight: ds.typography.lineHeight('md'), // 24px
      paddingTop: ds.common.padding.inputVerticalMiddle,   // 7px
      paddingBottom: ds.common.padding.inputVerticalMiddle, // 7px
      paddingLeft: ds.spacing('4'),              // 16px horizontal
      paddingRight: ds.spacing('4'),             // 16px horizontal
      minHeight: ds.common.height.inputMiddle,    // 40px minimum
    },
    large: {
      fontSize: ds.typography.size('lg'),      // 18px
      lineHeight: ds.typography.lineHeight('lg'), // 24px
      paddingTop: ds.common.padding.inputVerticalLarge,    // 11px
      paddingBottom: ds.common.padding.inputVerticalLarge, // 11px
      paddingLeft: ds.spacing('6'),              // 24px horizontal
      paddingRight: ds.spacing('6'),             // 24px horizontal
      minHeight: ds.common.height.inputLarge,     // 48px minimum
    },
  };

  /**
   * Get color styles based on state
   * Follows Figma design system color tokens (same as Input)
   */
  const getColorStyles = (): React.CSSProperties => {
    // Disabled state
    if (disabled) {
      return {
        backgroundColor: ds.component.textarea.bg('disabled'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.textarea.border('disabled'),
        color: ds.component.textarea.text('disabled'),
      };
    }

    // Error state
    if (actualState === "error") {
      if (isFocused) {
        return {
          backgroundColor: ds.component.textarea.bg('error'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.textarea.border('error-active'),
          color: ds.component.textarea.text(),
          boxShadow: `0 0 0 3px ${ds.component.textarea.focusRing('error')}`,
        };
      }
      if (isHovered) {
        return {
          backgroundColor: ds.component.textarea.bg('error'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.textarea.border('error-hover'),
          color: ds.component.textarea.text(),
        };
      }
      return {
        backgroundColor: ds.component.textarea.bg('error'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.textarea.border('error'),
        color: ds.component.textarea.text(),
      };
    }

    // Success/Brand state
    if (actualState === "success") {
      if (isFocused) {
        return {
          backgroundColor: ds.component.textarea.bg('brand'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.textarea.border('brand-active'),
          color: ds.component.textarea.text(),
          boxShadow: `0 0 0 3px ${ds.component.textarea.focusRing('brand')}`,
        };
      }
      if (isHovered) {
        return {
          backgroundColor: ds.component.textarea.bg('brand'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.textarea.border('brand-hover'),
          color: ds.component.textarea.text(),
        };
      }
      return {
        backgroundColor: ds.component.textarea.bg('brand'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.textarea.border('brand-active'),
        color: ds.component.textarea.text(),
      };
    }

    // Default state
    if (isFocused) {
      return {
        backgroundColor: ds.component.textarea.bg(),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.textarea.border('active'),
        color: ds.component.textarea.text(),
        boxShadow: `0 0 0 3px ${ds.component.textarea.focusRing('brand')}`,
      };
    }
    if (isHovered) {
      return {
        backgroundColor: ds.component.textarea.bg(),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.textarea.border('hover'),
        color: ds.component.textarea.text(),
      };
    }
    
    // Default state - ensure border is always present
    return {
      backgroundColor: ds.component.textarea.bg(),
      borderStyle: 'solid',
      borderWidth: ds.common.borderWidth.thin,
      borderColor: ds.component.textarea.border(),
      color: ds.component.textarea.text(),
    };
  };

  const colorStyles = getColorStyles();

  // Label styles
  const labelColor = disabled
    ? ds.component.textarea.label('disabled')
    : actualState === "error"
    ? ds.component.textarea.label('error')
    : ds.component.textarea.label();

  // Helper text styles
  const helperTextColor = disabled
    ? ds.component.textarea.helper('disabled')
    : actualState === "error"
    ? ds.component.textarea.helper('error')
    : ds.component.textarea.helper();

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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

  // Base textarea styles
  const textareaStyles: React.CSSProperties = {
    fontFamily: ds.typography.fontFamily.notoSans,
    fontWeight: ds.typography.weight('regular'),
    letterSpacing: "0",
    borderRadius: ds.common.borderRadius.input,
    width: "100%",
    outline: ds.common.none,
    transition: `all ${ds.common.animation.fast} ease`,
    boxSizing: 'border-box',
    resize: resize,
    ...sizeStyles[size],
    ...colorStyles,
    borderStyle: colorStyles.borderStyle || 'solid',
    borderWidth: colorStyles.borderWidth || ds.common.borderWidth.thin,
    borderColor: colorStyles.borderColor || ds.component.textarea.border(),
    ...style,
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
            <span style={{ color: ds.component.textarea.label('error'), marginLeft: ds.spacing('1') }}>*</span>
          )}
        </label>
      )}

      {/* Textarea Container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Textarea */}
        <textarea
          rows={rows}
          style={textareaStyles}
          disabled={disabled}
          placeholder={props.placeholder || "Placeholder text"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
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
