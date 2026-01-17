"use client";

import React, { useRef, useEffect, useState } from "react";
import { ds } from "@/design-system";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * Select label text
   */
  label?: string;
  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;
  /**
   * Helper text displayed below the select
   */
  helperText?: string;
  /**
   * Error message (if provided, shows error state)
   */
  error?: string;
  /**
   * Select state
   * - default: Default state
   * - success: Success/active state with green border
   * - error: Error state with red border
   */
  state?: "default" | "success" | "error";
  /**
   * Select size
   */
  size?: "small" | "middle" | "large";
  /**
   * Leading icon (e.g., search icon)
   */
  prefix?: React.ReactNode;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Options array
   */
  options: SelectOption[];
  /**
   * Selected value
   */
  value?: string;
  /**
   * Default value
   */
  defaultValue?: string;
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

export const Select: React.FC<SelectProps> = ({
  label,
  required = false,
  helperText,
  error,
  state = "default",
  size = "middle",
  prefix,
  disabled = false,
  placeholder = "Select an option",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className = "",
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  // Find selected option
  const selectedOption = options.find(opt => opt.value === currentValue);

  // Determine actual state (error takes precedence)
  const actualState = error ? "error" : state;
  const displayHelperText = error || helperText;

  // Size styles - following Figma design specifications (same as Input)
  const sizeStyles: Record<"small" | "middle" | "large", React.CSSProperties> = {
    small: {
      fontSize: ds.typography.size('sm'),
      lineHeight: ds.typography.lineHeight('sm'),
      paddingTop: ds.common.padding.inputVerticalSmall,
      paddingBottom: ds.common.padding.inputVerticalSmall,
      paddingLeft: ds.spacing('3'),
      paddingRight: `calc(${ds.spacing('3')} + ${ds.common.icon.large} + ${ds.spacing('2')})`, // Space for arrow icon
      height: ds.common.height.inputSmall,
    },
    middle: {
      fontSize: ds.typography.size('md'),
      lineHeight: ds.typography.lineHeight('md'),
      paddingTop: ds.common.padding.inputVerticalMiddle,
      paddingBottom: ds.common.padding.inputVerticalMiddle,
      paddingLeft: ds.spacing('4'),
      paddingRight: `calc(${ds.spacing('4')} + ${ds.common.icon.large} + ${ds.spacing('2')})`, // Space for arrow icon
      height: ds.common.height.inputMiddle,
    },
    large: {
      fontSize: ds.typography.size('lg'),
      lineHeight: ds.typography.lineHeight('lg'),
      paddingTop: ds.common.padding.inputVerticalLarge,
      paddingBottom: ds.common.padding.inputVerticalLarge,
      paddingLeft: ds.spacing('6'),
      paddingRight: `calc(${ds.spacing('6')} + ${ds.common.icon.large} + ${ds.spacing('2')})`, // Space for arrow icon
      height: ds.common.height.inputLarge,
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
        backgroundColor: ds.component.select.bg('disabled'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.select.border('disabled'),
        color: ds.component.select.text('disabled'),
      };
    }

    // Error state
    if (actualState === "error") {
      if (isFocused || isOpen) {
        return {
          backgroundColor: ds.component.select.bg('error'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.select.border('error-active'),
          color: ds.component.select.text(),
          boxShadow: `0 0 0 3px ${ds.component.select.focusRing('error')}`,
        };
      }
      if (isHovered) {
        return {
          backgroundColor: ds.component.select.bg('error'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.select.border('error-hover'),
          color: ds.component.select.text(),
        };
      }
      return {
        backgroundColor: ds.component.select.bg('error'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.select.border('error'),
        color: ds.component.select.text(),
      };
    }

    // Success/Brand state
    if (actualState === "success") {
      if (isFocused || isOpen) {
        return {
          backgroundColor: ds.component.select.bg('brand'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.select.border('brand-active'),
          color: ds.component.select.text(),
          boxShadow: `0 0 0 3px ${ds.component.select.focusRing('brand')}`,
        };
      }
      if (isHovered) {
        return {
          backgroundColor: ds.component.select.bg('brand'),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.select.border('brand-hover'),
          color: ds.component.select.text(),
        };
      }
      return {
        backgroundColor: ds.component.select.bg('brand'),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.select.border('brand-active'),
        color: ds.component.select.text(),
      };
    }

    // Default state
    if (isFocused || isOpen) {
      return {
        backgroundColor: ds.component.select.bg(),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.select.border('active'),
        color: ds.component.select.text(),
        boxShadow: `0 0 0 3px ${ds.component.select.focusRing('brand')}`,
      };
    }
    if (isHovered) {
      return {
        backgroundColor: ds.component.select.bg(),
        borderStyle: 'solid',
        borderWidth: ds.common.borderWidth.thin,
        borderColor: ds.component.select.border('hover'),
        color: ds.component.select.text(),
      };
    }
    
    return {
      backgroundColor: ds.component.select.bg(),
      borderStyle: 'solid',
      borderWidth: ds.common.borderWidth.thin,
      borderColor: ds.component.select.border(),
      color: ds.component.select.text(),
    };
  };

  const colorStyles = getColorStyles();

  // Icon colors
  const iconColor = disabled
    ? ds.component.select.icon('disabled')
    : actualState === "error"
    ? ds.component.select.icon('error')
    : actualState === "success"
    ? ds.component.select.icon('brand')
    : ds.component.select.icon();

  const arrowColor = disabled
    ? ds.component.select.arrow('disabled')
    : iconColor;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle option selection
  const handleSelectOption = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    } else {
      setInternalValue(optionValue);
    }
    setIsOpen(false);
    setIsFocused(false);
  };

  // Handle toggle dropdown
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(!isOpen);
    }
  };

  // Label styles
  const labelColor = disabled
    ? ds.component.select.label('disabled')
    : actualState === "error"
    ? ds.component.select.label('error')
    : ds.component.select.label();

  // Helper text styles
  const helperTextColor = disabled
    ? ds.component.select.helper('disabled')
    : actualState === "error"
    ? ds.component.select.helper('error')
    : ds.component.select.helper();

  // Base select styles
  const selectStyles: React.CSSProperties = {
    fontFamily: ds.typography.fontFamily.notoSans,
    fontWeight: ds.typography.weight('regular'),
    letterSpacing: "0",
    borderRadius: ds.common.borderRadius.input,
    width: "100%",
    outline: ds.common.none,
    transition: `all ${ds.common.animation.fast} ease`,
    display: "flex",
    alignItems: "center",
    boxSizing: 'border-box',
    cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
    ...sizeStyles[size],
    ...colorStyles,
    borderStyle: colorStyles.borderStyle || 'solid',
    borderWidth: colorStyles.borderWidth || ds.common.borderWidth.thin,
    borderColor: colorStyles.borderColor || ds.component.select.border(),
    ...style,
  };

  // Adjust padding if prefix exists
  if (prefix) {
    selectStyles.paddingLeft = size === "small"
      ? `calc(${ds.spacing('3')} + ${ds.common.icon.large} + ${ds.spacing('2')})`
      : size === "middle"
      ? `calc(${ds.spacing('4')} + ${ds.common.icon.large} + ${ds.spacing('2')})`
      : `calc(${ds.spacing('6')} + ${ds.common.icon.large} + ${ds.spacing('2')})`;
  }

  // Display text
  const displayText = selectedOption
    ? selectedOption.label
    : placeholder;
  const displayTextColor = selectedOption
    ? colorStyles.color
    : ds.component.select.text('placeholder');

  return (
    <div className={className} style={{ width: "100%", position: "relative" }}>
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
            <span style={{ color: ds.component.select.label('error'), marginLeft: ds.spacing('1') }}>*</span>
          )}
        </label>
      )}

      {/* Select Container */}
      <div
        ref={selectRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Prefix Icon */}
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: size === "small"
                ? ds.spacing('3')
                : size === "middle"
                ? ds.spacing('4')
                : ds.spacing('6'),
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

        {/* Select Button */}
        <button
          type="button"
          style={selectStyles}
          disabled={disabled}
          onClick={handleToggle}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => {
            // Delay to allow option click
            setTimeout(() => {
              if (!isOpen) {
                setIsFocused(false);
              }
            }, 200);
          }}
        >
          <span
            style={{
              flex: 1,
              textAlign: "left",
              color: displayTextColor,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {displayText}
          </span>
        </button>

        {/* Arrow Icon */}
        <span
          style={{
            position: "absolute",
            right: size === "small"
              ? ds.spacing('3')
              : size === "middle"
              ? ds.spacing('4')
              : ds.spacing('6'),
            display: "flex",
            alignItems: "center",
            color: arrowColor,
            pointerEvents: "none",
            zIndex: 1,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform ${ds.common.animation.fast} ease`,
          }}
        >
          <i className="ri-arrow-down-s-line" style={{ fontSize: ds.common.icon.large }} />
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: ds.spacing('1'),
            backgroundColor: ds.component.select.dropdown.bg(),
            border: `${ds.common.borderWidth.thin} solid ${ds.component.select.dropdown.border()}`,
            borderRadius: ds.common.borderRadius.input,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            maxHeight: "240px",
            overflowY: "auto",
            overflowX: "hidden",
            padding: ds.spacing('1'),
          }}
        >
          {options.length === 0 ? (
            <div
              style={{
                padding: ds.spacing('4'),
                textAlign: "center",
                color: ds.component.select.text('placeholder'),
                fontSize: ds.typography.size('sm'),
              }}
            >
              No options available
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === currentValue;
              const isDisabled = option.disabled;

              // Base styles for all options
              const baseOptionStyle: React.CSSProperties = {
                padding: `${ds.spacing('3')} ${ds.spacing('4')}`,
                cursor: isDisabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
                fontSize: ds.typography.size('md'),
                lineHeight: ds.typography.lineHeight('md'),
                transition: `all ${ds.common.animation.fast} ease`,
                opacity: isDisabled ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: ds.spacing('2'),
                marginBottom: ds.spacing('1'),
                borderRadius: ds.common.borderRadius.input,
              };

              // Style based on state
              const optionStyle: React.CSSProperties = {
                ...baseOptionStyle,
                backgroundColor: isSelected
                  ? ds.component.select.option.bg('selected')
                  : ds.component.select.option.bg(),
                color: isDisabled
                  ? ds.component.select.option.text('disabled')
                  : isSelected
                  ? ds.component.select.option.text('selected')
                  : ds.component.select.option.text(),
              };

              return (
                <div
                  key={option.value}
                  onClick={() => !isDisabled && handleSelectOption(option.value)}
                  style={optionStyle}
                  onMouseEnter={(e) => {
                    if (!isDisabled) {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = ds.component.select.option.bg('hover');
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled) {
                      e.currentTarget.style.backgroundColor = isSelected
                        ? ds.component.select.option.bg('selected')
                        : ds.component.select.option.bg();
                    }
                  }}
                >
                  <span style={{ flex: 1 }}>{option.label}</span>
                  {isSelected && (
                    <i 
                      className="ri-check-line" 
                      style={{ 
                        fontSize: ds.common.icon.medium,
                        color: ds.component.select.option.text('selected'),
                        flexShrink: 0,
                      }} 
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

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
