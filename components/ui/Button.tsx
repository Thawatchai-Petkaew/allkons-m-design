"use client";

import React from "react";
import { ds } from "@/design-system";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  /**
   * Button variant
   * - primary: Solid background with white text
   * - secondary: Outline with colored border
   * - tertiary: Text only, no border
   */
  variant?: "primary" | "secondary" | "tertiary";
  /**
   * Button color scheme
   * - brand: Green color scheme
   * - neutral: Gray color scheme
   * - error: Red color scheme
   */
  color?: "brand" | "neutral" | "error";
  /**
   * Button size
   */
  size?: "small" | "middle" | "large";
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in loading state
   */
  loading?: boolean;
  /**
   * Icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Icon to display after the text
   */
  iconPosition?: "left" | "right";
  /**
   * Button content
   */
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  color = "brand",
  size = "middle",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  children,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Size styles based on Figma design
  // With box-sizing: border-box, height includes padding and border
  // Padding vertical is calculated: (height - lineHeight - border*2) / 2
  const sizeStyles: Record<"small" | "middle" | "large", React.CSSProperties> = {
    small: {
      fontSize: ds.typography.size('sm'),
      lineHeight: ds.typography.lineHeight('lg'), // 24px
      paddingTop: ds.common.padding.buttonVerticalSmall,    // 3px
      paddingBottom: ds.common.padding.buttonVerticalSmall, // 3px
      paddingLeft: ds.spacing(4),               // 16px horizontal
      paddingRight: ds.spacing(4),              // 16px horizontal
      height: ds.common.height.buttonSmall,     // 32px (total: 24px lineHeight + 6px padding + 2px border)
      gap: ds.spacing(2),
    },
    middle: {
      fontSize: ds.typography.size('md'),
      lineHeight: ds.typography.lineHeight('lg'), // 24px
      paddingTop: ds.common.padding.buttonVerticalMiddle,   // 7px
      paddingBottom: ds.common.padding.buttonVerticalMiddle, // 7px
      paddingLeft: ds.spacing(6),               // 24px horizontal
      paddingRight: ds.spacing(6),              // 24px horizontal
      height: ds.common.height.buttonMiddle,    // 40px (total: 24px lineHeight + 14px padding + 2px border)
      gap: ds.spacing(2),
    },
    large: {
      fontSize: ds.typography.size('lg'),
      lineHeight: ds.typography.lineHeight('lg'), // 24px
      paddingTop: ds.common.padding.buttonVerticalLarge,    // 11px
      paddingBottom: ds.common.padding.buttonVerticalLarge, // 11px
      paddingLeft: ds.spacing(8),               // 32px horizontal
      paddingRight: ds.spacing(8),              // 32px horizontal
      height: ds.common.height.buttonLarge,     // 48px (total: 24px lineHeight + 22px padding + 2px border)
      gap: ds.spacing(2),
    },
  };

  // Base styles (without custom style prop to avoid override issues)
  const baseStyles: React.CSSProperties = {
    fontFamily: ds.typography.fontFamily.notoSans,
    fontWeight: ds.typography.weight('semibold'),
    letterSpacing: "0",
    borderRadius: ds.common.borderRadius.button,
    cursor: disabled || loading ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
    transition: `all ${ds.common.animation.fast} ease`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    outline: ds.common.none,
    boxSizing: 'border-box', // Ensure height includes padding and border
    ...sizeStyles[size],
  };

  /**
   * Get color styles based on variant, color, and state
   * Follows Figma design system color tokens
   */
  const getColorStyles = (): React.CSSProperties => {
    const state = disabled || loading ? "disabled" : isHovered ? "hover" : "default";
    
    // Primary variant - Solid buttons with border
    if (variant === "primary") {
      if (color === "brand") {
        if (state === "disabled") {
          // Disabled state: Light grey background (#eff0f3), grey text (#9da6b5), light grey border (#f7f8f9)
          // Explicitly set all border properties to ensure they are applied correctly
          const disabledBorderColor = ds.component.button.primaryBrand.border('disabled');
          return {
            backgroundColor: ds.component.button.primaryBrand.bg('disabled'),
            color: ds.component.button.primaryBrand.text('disabled'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: disabledBorderColor,
            // Ensure border is visible and matches Figma design
            borderTopColor: disabledBorderColor,
            borderRightColor: disabledBorderColor,
            borderBottomColor: disabledBorderColor,
            borderLeftColor: disabledBorderColor,
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.primaryBrand.bg('hover'),
            color: ds.component.button.primaryBrand.text('hover'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.primaryBrand.border('hover'),
          };
        }
        return {
          backgroundColor: ds.component.button.primaryBrand.bg(),
          color: ds.component.button.primaryBrand.text(),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.button.primaryBrand.border(),
        };
      }
      if (color === "error") {
        if (state === "disabled") {
          return {
            backgroundColor: ds.component.button.primaryError.bg('disabled'),
            color: ds.component.button.primaryError.text('disabled'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.primaryError.border('disabled'),
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.primaryError.bg('hover'),
            color: ds.component.button.primaryError.text('hover'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.primaryError.border('hover'),
          };
        }
        return {
          backgroundColor: ds.component.button.primaryError.bg(),
          color: ds.component.button.primaryError.text(),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.button.primaryError.border(),
        };
      }
    }

    // Secondary variant - Outline buttons with border
    if (variant === "secondary") {
      if (color === "brand") {
        if (state === "disabled") {
          return {
            backgroundColor: ds.component.button.secondaryBrand.bg('disabled'),
            color: ds.component.button.secondaryBrand.text('disabled'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.secondaryBrand.border('disabled'),
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.secondaryBrand.bg('hover'),
            color: ds.component.button.secondaryBrand.text('hover'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.secondaryBrand.border('hover'),
          };
        }
        return {
          backgroundColor: ds.component.button.secondaryBrand.bg(),
          color: ds.component.button.secondaryBrand.text(),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.button.secondaryBrand.border(),
        };
      }
      if (color === "neutral") {
        if (state === "disabled") {
          return {
            backgroundColor: ds.component.button.secondaryNeutral.bg('disabled'),
            color: ds.component.button.secondaryNeutral.text('disabled'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.secondaryNeutral.border('disabled'),
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.secondaryNeutral.bg('hover'),
            color: ds.component.button.secondaryNeutral.text('hover'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.secondaryNeutral.border('hover'),
          };
        }
        return {
          backgroundColor: ds.component.button.secondaryNeutral.bg(),
          color: ds.component.button.secondaryNeutral.text(),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.button.secondaryNeutral.border(),
        };
      }
      if (color === "error") {
        if (state === "disabled") {
          return {
            backgroundColor: ds.component.button.secondaryError.bg('disabled'),
            color: ds.component.button.secondaryError.text('disabled'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.secondaryError.border('disabled'),
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.secondaryError.bg('hover'),
            color: ds.component.button.secondaryError.text('hover'),
            borderStyle: 'solid',
            borderWidth: ds.common.borderWidth.thin,
            borderColor: ds.component.button.secondaryError.border('hover'),
          };
        }
        return {
          backgroundColor: ds.component.button.secondaryError.bg(),
          color: ds.component.button.secondaryError.text(),
          borderStyle: 'solid',
          borderWidth: ds.common.borderWidth.thin,
          borderColor: ds.component.button.secondaryError.border(),
        };
      }
    }

    // Tertiary variant - Text-only buttons, no border
    if (variant === "tertiary") {
      if (color === "brand") {
        if (state === "disabled") {
          return {
            backgroundColor: ds.component.button.tertiaryBrand.bg('disabled'),
            color: ds.component.button.tertiaryBrand.text('disabled'),
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: ds.common.transparent,
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.tertiaryBrand.bg('hover'),
            color: ds.component.button.tertiaryBrand.text('hover'),
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: ds.common.transparent,
          };
        }
        return {
          backgroundColor: ds.component.button.tertiaryBrand.bg(),
          color: ds.component.button.tertiaryBrand.text(),
          borderStyle: 'none',
          borderWidth: 0,
          borderColor: ds.common.transparent,
        };
      }
      if (color === "neutral") {
        if (state === "disabled") {
          return {
            backgroundColor: ds.component.button.tertiaryNeutral.bg('disabled'),
            color: ds.component.button.tertiaryNeutral.text('disabled'),
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: ds.common.transparent,
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.tertiaryNeutral.bg('hover'),
            color: ds.component.button.tertiaryNeutral.text('hover'),
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: ds.common.transparent,
          };
        }
        return {
          backgroundColor: ds.component.button.tertiaryNeutral.bg(),
          color: ds.component.button.tertiaryNeutral.text(),
          borderStyle: 'none',
          borderWidth: 0,
          borderColor: ds.common.transparent,
        };
      }
      if (color === "error") {
        if (state === "disabled") {
          return {
            backgroundColor: ds.component.button.tertiaryError.bg('disabled'),
            color: ds.component.button.tertiaryError.text('disabled'),
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: ds.common.transparent,
          };
        }
        if (state === "hover") {
          return {
            backgroundColor: ds.component.button.tertiaryError.bg('hover'),
            color: ds.component.button.tertiaryError.text('hover'),
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: ds.common.transparent,
          };
        }
        return {
          backgroundColor: ds.component.button.tertiaryError.bg(),
          color: ds.component.button.tertiaryError.text(),
          borderStyle: 'none',
          borderWidth: 0,
          borderColor: ds.common.transparent,
        };
      }
    }

    return {};
  };

  const colorStyles = getColorStyles();
  // Combine styles: baseStyles first, then colorStyles (which includes border), then custom style prop
  // This ensures colorStyles border properties are not overridden by style prop
  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...colorStyles,
    // Apply custom style last, but preserve critical properties from colorStyles (especially for disabled state)
    ...(style && Object.keys(style).length > 0 ? {
      ...Object.fromEntries(
        Object.entries(style).filter(([key]) => 
          !['border', 'borderStyle', 'borderWidth', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'backgroundColor', 'color'].includes(key)
        )
      ),
      // Explicitly preserve border properties from colorStyles (disabled state must have light grey border)
      ...(colorStyles.borderStyle ? { borderStyle: colorStyles.borderStyle } : {}),
      ...(colorStyles.borderWidth ? { borderWidth: colorStyles.borderWidth } : {}),
      ...(colorStyles.borderColor ? { 
        borderColor: colorStyles.borderColor,
        borderTopColor: colorStyles.borderTopColor || colorStyles.borderColor,
        borderRightColor: colorStyles.borderRightColor || colorStyles.borderColor,
        borderBottomColor: colorStyles.borderBottomColor || colorStyles.borderColor,
        borderLeftColor: colorStyles.borderLeftColor || colorStyles.borderColor,
      } : {}),
      ...(colorStyles.backgroundColor ? { backgroundColor: colorStyles.backgroundColor } : {}),
      ...(colorStyles.color ? { color: colorStyles.color } : {}),
    } : {}),
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      setIsHovered(true);
      onMouseEnter?.(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const iconElement = icon && (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {icon}
    </span>
  );

  return (
    <button
      className={className}
      style={combinedStyles}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && (
        <span
          style={{
            display: "inline-block",
            width: ds.common.icon.small,
            height: ds.common.icon.small,
            border: `${ds.common.borderWidth.medium} solid ${ds.common.currentColor}`,
            borderTopColor: ds.common.transparent,
            borderRadius: ds.radius('full'),
            animation: `spin ${ds.common.animation.normal} linear infinite`,
            marginRight: children ? ds.spacing(2) : 0,
          }}
        />
      )}
      {iconPosition === "left" && iconElement}
      {children && <span>{children}</span>}
      {iconPosition === "right" && iconElement}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
};
