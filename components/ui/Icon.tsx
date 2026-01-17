"use client";

import React from "react";
import { ds } from "@/design-system";

export interface IconProps {
  /**
   * Icon name (Remix Icon class name, e.g., "ri-information-line")
   * Default: "ri-information-line" (information icon)
   */
  name?: string;
  /**
   * Icon shape
   * - circle: Perfectly circular
   * - square: Sharp corners
   * - rounded: Rounded square (4px border-radius)
   */
  shape?: "circle" | "square" | "rounded";
  /**
   * Icon variant
   * - filled: Solid background with icon in white
   * - outlined: Transparent background with colored border and icon
   */
  variant?: "filled" | "outlined";
  /**
   * Icon color scheme
   * - brand: Green (brand color)
   * - error: Red
   * - info: Blue
   * - warning: Orange
   * - neutral: Gray
   */
  color?: "brand" | "error" | "info" | "warning" | "neutral";
  /**
   * Icon size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Click handler
   */
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name = "ri-information-line",
  shape = "circle",
  variant = "filled",
  color = "brand",
  size = "md",
  className = "",
  style,
  onClick,
}) => {
  // Size styles
  const sizeStyles: Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", {
    container: React.CSSProperties;
    icon: React.CSSProperties;
  }> = {
    xs: {
      container: {
        width: ds.common.size.iconXs,
        height: ds.common.size.iconXs,
        minWidth: ds.common.size.iconXs,
        minHeight: ds.common.size.iconXs,
      },
      icon: {
        fontSize: ds.common.size.iconInnerXs,
      },
    },
    sm: {
      container: {
        width: ds.common.size.iconSm,
        height: ds.common.size.iconSm,
        minWidth: ds.common.size.iconSm,
        minHeight: ds.common.size.iconSm,
      },
      icon: {
        fontSize: ds.common.size.iconInnerSm,
      },
    },
    md: {
      container: {
        width: ds.common.size.iconMd,
        height: ds.common.size.iconMd,
        minWidth: ds.common.size.iconMd,
        minHeight: ds.common.size.iconMd,
      },
      icon: {
        fontSize: ds.common.size.iconInnerMd,
      },
    },
    lg: {
      container: {
        width: ds.common.size.iconLg,
        height: ds.common.size.iconLg,
        minWidth: ds.common.size.iconLg,
        minHeight: ds.common.size.iconLg,
      },
      icon: {
        fontSize: ds.common.size.iconInnerLg,
      },
    },
    xl: {
      container: {
        width: ds.common.size.iconXl,
        height: ds.common.size.iconXl,
        minWidth: ds.common.size.iconXl,
        minHeight: ds.common.size.iconXl,
      },
      icon: {
        fontSize: ds.common.size.iconInnerXl,
      },
    },
    "2xl": {
      container: {
        width: ds.common.size.icon2xl,
        height: ds.common.size.icon2xl,
        minWidth: ds.common.size.icon2xl,
        minHeight: ds.common.size.icon2xl,
      },
      icon: {
        fontSize: ds.common.size.iconInner2xl,
      },
    },
  };

  // Get border radius based on shape and size
  const getBorderRadius = (): string => {
    if (shape === "circle") return ds.radius('full');
    if (shape === "rounded") {
      // Rounded shape: 4px for 2xl and below, 8px for sizes above 2xl
      if (size === "xs" || size === "sm" || size === "md" || size === "lg" || size === "xl" || size === "2xl") return "4px";
      return "8px";
    }
    // Square should also have border-radius for consistency
    // 2xl and below use 4px
    if (size === "xs" || size === "sm" || size === "md" || size === "lg" || size === "xl" || size === "2xl") return "4px";
    return "8px";
  };

  // Get container styles
  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: getBorderRadius(),
      transition: `all ${ds.common.animation.fast} ease`,
      ...sizeStyles[size].container,
    };

    if (variant === "filled") {
      return {
        ...baseStyles,
        backgroundColor: ds.component.icon.bg(color, 'filled'),
        borderStyle: "none",
        borderWidth: 0,
      };
    }

    // Outlined variant
    return {
      ...baseStyles,
      backgroundColor: ds.component.icon.bg(color, 'outlined'),
      borderStyle: "solid",
      borderWidth: ds.common.borderWidth.thin,
      borderColor: ds.component.icon.border(color),
    };
  };

  const containerStyles = getContainerStyles();

  // Icon color
  const iconColor = variant === "filled"
    ? ds.component.icon.icon(color, 'filled')
    : ds.component.icon.icon(color, 'outlined');

  const iconStyles: React.CSSProperties = {
    ...sizeStyles[size].icon,
    color: iconColor,
    lineHeight: 1,
  };

  const wrapperStyles: React.CSSProperties = {
    display: "inline-flex",
    cursor: onClick ? ds.common.cursor.pointer : "default",
    ...style,
  };

  return (
    <div
      className={className}
      style={wrapperStyles}
      onClick={onClick}
    >
      <div style={containerStyles}>
        <i className={name} style={iconStyles} />
      </div>
    </div>
  );
};
