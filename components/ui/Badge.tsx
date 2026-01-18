"use client";

import React from "react";
import { ds } from "@/design-system";
import type { BadgeColorToken, BadgeSizeToken, BadgeVariantToken } from "@/design-system/tokens";

export interface BadgeProps {
  /**
   * Badge content
   */
  children: React.ReactNode;
  /**
   * Badge color scheme
   */
  color?: BadgeColorToken;
  /**
   * Badge variant
   * - filled: Solid background with colored text
   * - outlined: Transparent background with colored border and text
   * - subtle: Light background with colored text (no border)
   */
  variant?: BadgeVariantToken;
  /**
   * Badge size
   */
  size?: BadgeSizeToken;
  /**
   * Icon to display before the text
   */
  leadingIcon?: React.ReactNode;
  /**
   * Icon to display after the text
   */
  trailingIcon?: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Click handler (makes badge interactive)
   */
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = "neutral",
  variant = "filled",
  size = "sm",
  leadingIcon,
  trailingIcon,
  className = "",
  style,
  onClick,
}) => {
  // Size styles
  const sizeStyles: Record<BadgeSizeToken, React.CSSProperties> = {
    xs: {
      fontSize: ds.component.badge.size.fontSize('xs'),
      lineHeight: ds.component.badge.size.lineHeight('xs'),
      paddingTop: ds.component.badge.size.paddingVertical('xs'),
      paddingBottom: ds.component.badge.size.paddingVertical('xs'),
      paddingLeft: ds.component.badge.size.paddingHorizontal('xs'),
      paddingRight: ds.component.badge.size.paddingHorizontal('xs'),
      gap: ds.component.badge.iconGap(),
    },
    sm: {
      fontSize: ds.component.badge.size.fontSize('sm'),
      lineHeight: ds.component.badge.size.lineHeight('sm'),
      paddingTop: ds.component.badge.size.paddingVertical('sm'),
      paddingBottom: ds.component.badge.size.paddingVertical('sm'),
      paddingLeft: ds.component.badge.size.paddingHorizontal('sm'),
      paddingRight: ds.component.badge.size.paddingHorizontal('sm'),
      gap: ds.component.badge.iconGap(),
    },
    md: {
      fontSize: ds.component.badge.size.fontSize('md'),
      lineHeight: ds.component.badge.size.lineHeight('md'),
      paddingTop: ds.component.badge.size.paddingVertical('md'),
      paddingBottom: ds.component.badge.size.paddingVertical('md'),
      paddingLeft: ds.component.badge.size.paddingHorizontal('md'),
      paddingRight: ds.component.badge.size.paddingHorizontal('md'),
      gap: ds.component.badge.iconGap(),
    },
  };

  // Get color styles based on variant
  const getColorStyles = (): React.CSSProperties => {
    const colorMap = ds.component.badge[color];
    
    if (variant === "filled") {
      return {
        backgroundColor: colorMap.filled.bg(),
        color: colorMap.filled.text(),
        border: "none",
      };
    } else if (variant === "outlined") {
      return {
        backgroundColor: "transparent",
        color: colorMap.outlined.text(),
        border: `${ds.common.borderWidth.thin} solid ${colorMap.outlined.border()}`,
      };
    } else {
      // subtle
      return {
        backgroundColor: colorMap.subtle.bg(),
        color: colorMap.subtle.text(),
        border: "none",
      };
    }
  };

  // Get icon color based on variant
  const getIconColor = (): string => {
    const colorMap = ds.component.badge[color];
    
    if (variant === "filled") {
      return colorMap.filled.icon();
    } else if (variant === "outlined") {
      return colorMap.outlined.icon();
    } else {
      return colorMap.subtle.icon();
    }
  };

  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ds.component.badge.borderRadius(),
    fontWeight: ds.typography.weight("regular"),
    fontFamily: ds.typography.fontFamily.notoSans,
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...getColorStyles(),
    ...style,
  };

  // Icon wrapper styles
  const iconStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: getIconColor(),
    flexShrink: 0,
  };

  const content = (
    <>
      {leadingIcon && (
        <span style={iconStyles}>
          {leadingIcon}
        </span>
      )}
      {children && <span>{children}</span>}
      {trailingIcon && (
        <span style={iconStyles}>
          {trailingIcon}
        </span>
      )}
    </>
  );

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        style={{
          ...baseStyles,
          cursor: ds.common.cursor.pointer,
          border: baseStyles.border || "none",
        }}
      >
        {content}
      </button>
    );
  }

  // Otherwise render as span
  return (
    <span
      className={className}
      style={baseStyles}
    >
      {content}
    </span>
  );
};
