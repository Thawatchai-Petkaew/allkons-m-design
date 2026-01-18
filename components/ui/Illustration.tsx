"use client";

import React from "react";
import { ds } from "@/design-system";

export interface IllustrationProps {
  /**
   * Illustration type
   * - remix: Use Remix Icon (requires icon prop)
   * - vector: Use custom SVG file (requires icon prop with path)
   * - spinner: Animated loading spinner (color based on color prop)
   */
  type: "remix" | "vector" | "spinner";
  /**
   * Icon identifier
   * - For remix: Remix Icon class name (e.g., "ri-information-line")
   * - For vector: Path to SVG file (e.g., "/assets/illustrations/empty-cart.svg")
   * - For spinner: Ignored
   */
  icon?: string;
  /**
   * Color scheme
   */
  color?: "brand" | "error" | "info" | "warning" | "neutral";
  /**
   * Background variant
   * - withBackground: Ring with background fill
   * - withoutBackground: Ring only, no background fill
   */
  variant?: "withBackground" | "withoutBackground";
  /**
   * Illustration size
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
}

export const Illustration: React.FC<IllustrationProps> = ({
  type,
  icon,
  color = "neutral",
  variant = "withoutBackground",
  size = "lg",
  className = "",
  style,
}) => {
  // Generate unique IDs for SVG elements to avoid conflicts
  const clipId = React.useId();
  const clipIdWithBg = `clip0_ring_with_bg_${clipId}`;
  const clipIdNoBg = `clip0_ring_no_bg_${clipId}`;
  // Size styles based on design system
  const sizeStyles: Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", {
    container: React.CSSProperties;
    icon: React.CSSProperties;
  }> = {
    xs: {
      container: {
        width: "48px",
        height: "48px",
      },
      icon: {
        fontSize: "16px",
      },
    },
    sm: {
      container: {
        width: "64px",
        height: "64px",
      },
      icon: {
        fontSize: "20px",
      },
    },
    md: {
      container: {
        width: "80px",
        height: "80px",
      },
      icon: {
        fontSize: "24px",
      },
    },
    lg: {
      container: {
        width: "120px",
        height: "120px",
      },
      icon: {
        fontSize: "32px",
      },
    },
    xl: {
      container: {
        width: "160px",
        height: "160px",
      },
      icon: {
        fontSize: "40px",
      },
    },
    "2xl": {
      container: {
        width: "200px",
        height: "200px",
      },
      icon: {
        fontSize: "48px",
      },
    },
  };

  // Get ring pattern SVG content based on variant
  // Using inline SVG to support CSS variables
  const getRingPatternSVG = () => {
    const gradientId = `gradient-${clipId}`;
    const ringGradient1 = `ringGradient1-${clipId}`;
    const ringGradient2 = `ringGradient2-${clipId}`;
    const ringGradient3 = `ringGradient3-${clipId}`;
    const ringGradient4 = `ringGradient4-${clipId}`;
    const ringGradient5 = `ringGradient5-${clipId}`;
    
    if (variant === "withBackground") {
      return (
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id={gradientId} x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--illustration-bg-color)" stopOpacity="0.05"/>
              <stop offset="100%" stopColor="var(--illustration-bg-color)" stopOpacity="0.01"/>
            </linearGradient>
            {/* Ring gradients - fade from top (100%) to bottom (10%) */}
            <linearGradient id={ringGradient1} x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--illustration-ring-color)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="var(--illustration-ring-color)" stopOpacity="0.04"/>
            </linearGradient>
            <linearGradient id={ringGradient2} x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--illustration-ring-color)" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="var(--illustration-ring-color)" stopOpacity="0.035"/>
            </linearGradient>
            <linearGradient id={ringGradient3} x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--illustration-ring-color)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="var(--illustration-ring-color)" stopOpacity="0.03"/>
            </linearGradient>
            <linearGradient id={ringGradient4} x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--illustration-ring-color)" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="var(--illustration-ring-color)" stopOpacity="0.025"/>
            </linearGradient>
            <linearGradient id={ringGradient5} x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--illustration-ring-color)" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="var(--illustration-ring-color)" stopOpacity="0.02"/>
            </linearGradient>
            <clipPath id={clipIdWithBg}>
              <rect width="240" height="240" fill="white"/>
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipIdWithBg})`}>
            {/* Ring 1 (innermost) - opacity increased by 10%: 0.3 → 0.4, with gradient fade */}
            <circle cx="120" cy="120" r="45.9038" stroke={`url(#${ringGradient1})`} strokeWidth="0.5" fill="none"/>
            {/* Ring 2 - opacity increased by 10%: 0.25 → 0.35, with gradient fade */}
            <circle cx="120" cy="120" r="64.3654" stroke={`url(#${ringGradient2})`} strokeWidth="0.5" fill="none"/>
            {/* Ring 3 - opacity increased by 10%: 0.2 → 0.3, with gradient fade */}
            <circle cx="120" cy="120" r="82.8269" stroke={`url(#${ringGradient3})`} strokeWidth="0.5" fill="none"/>
            {/* Ring 4 - opacity increased by 10%: 0.15 → 0.25, with gradient fade */}
            <path d="M120 18.7115C175.94 18.7115 221.289 64.0597 221.289 120C221.289 175.94 175.94 221.289 120 221.289C64.0597 221.288 18.7115 175.94 18.7115 120C18.7117 64.0599 64.0599 18.7117 120 18.7115Z" stroke={`url(#${ringGradient4})`} strokeWidth="0.5" fill="none"/>
            {/* Ring 5 (outermost) - opacity increased by 10%: 0.1 → 0.2, with gradient fade */}
            <path d="M120 0.25C186.136 0.25 239.75 53.8639 239.75 120C239.75 186.136 186.136 239.75 120 239.75C53.8639 239.75 0.250004 186.136 0.25 120C0.25 53.8639 53.8639 0.25 120 0.25Z" stroke={`url(#${ringGradient5})`} strokeWidth="0.5" fill="none"/>
            <ellipse cx="120" cy="120" rx="120" ry="120" fill={`url(#${gradientId})`}/>
          </g>
        </svg>
      );
    } else {
      return (
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <g clipPath={`url(#${clipIdNoBg})`}>
            {/* Ring 1 (innermost) - opacity increased by 10%: 0.3 → 0.4 */}
            <circle opacity="0.4" cx="120" cy="120" r="45.9038" stroke="var(--illustration-ring-color)" strokeWidth="0.5"/>
            {/* Ring 2 - opacity increased by 10%: 0.25 → 0.35 */}
            <circle opacity="0.35" cx="120" cy="120" r="64.3654" stroke="var(--illustration-ring-color)" strokeWidth="0.5"/>
            {/* Ring 3 - opacity increased by 10%: 0.2 → 0.3 */}
            <circle opacity="0.3" cx="120" cy="120" r="82.8269" stroke="var(--illustration-ring-color)" strokeWidth="0.5"/>
            {/* Ring 4 - opacity increased by 10%: 0.15 → 0.25 */}
            <path opacity="0.25" d="M120 18.7115C175.94 18.7115 221.289 64.0597 221.289 120C221.289 175.94 175.94 221.289 120 221.289C64.0597 221.288 18.7115 175.94 18.7115 120C18.7117 64.0599 64.0599 18.7117 120 18.7115Z" stroke="var(--illustration-ring-color)" strokeWidth="0.5"/>
            {/* Ring 5 (outermost) - opacity increased by 10%: 0.1 → 0.2 */}
            <path opacity="0.2" d="M120 0.25C186.136 0.25 239.75 53.8639 239.75 120C239.75 186.136 186.136 239.75 120 239.75C53.8639 239.75 0.250004 186.136 0.25 120C0.25 53.8639 53.8639 0.25 120 0.25Z" stroke="var(--illustration-ring-color)" strokeWidth="0.5"/>
          </g>
          <defs>
            <clipPath id={clipIdNoBg}>
              <rect width="240" height="240" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      );
    }
  };

  // Container styles
  const containerStyles: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...sizeStyles[size].container,
    ...style,
  };

  // Background SVG styles (will use CSS variables for colors)
  const backgroundStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none", // Allow clicks to pass through
  };

  // Icon container styles (centered above background)
  const iconContainerStyles: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 1,
    color: ds.component.illustration.iconColor(),
    marginBottom: 0,
  };

  // Render icon based on type
  const renderIcon = () => {
    switch (type) {
      case "remix":
        if (!icon) {
          console.warn("Illustration: icon prop is required for remix type");
          return null;
        }
        return (
          <i
            className={icon}
            style={{
              ...sizeStyles[size].icon,
              color: `var(--illustration-icon-color-${color})`,
            }}
          />
        );

      case "vector":
        if (!icon) {
          console.warn("Illustration: icon prop is required for vector type");
          return null;
        }
        return (
          <img
            src={icon}
            alt="Illustration"
            style={{
              width: sizeStyles[size].icon.fontSize,
              height: sizeStyles[size].icon.fontSize,
              objectFit: "contain",
            }}
            onError={(e) => {
              console.error(`Illustration: Failed to load vector ${icon}`);
            }}
          />
        );

      case "spinner":
        // Animated spinner SVG - single arc line rotating
        const spinnerSize = sizeStyles[size].icon.fontSize;
        const radius = 10;
        const circumference = 2 * Math.PI * radius;
        // Single arc: 75% of circle
        const arcLength = circumference * 0.75;
        const gapLength = circumference - arcLength;
        
        return (
          <svg
            width={spinnerSize}
            height={spinnerSize}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r={radius}
              fill="none"
              stroke={`var(--illustration-icon-color-${color})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${arcLength} ${gapLength}`}
              strokeDashoffset="0"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 12 12;360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`illustration illustration-${color} illustration-${variant} ${className}`}
      style={containerStyles}
    >
      {/* Background Ring Pattern SVG - Inline SVG to support CSS variables */}
      <div style={backgroundStyles}>
        {getRingPatternSVG()}
      </div>
      
      {/* Icon Content - Remix Icon, Vector, or Spinner */}
      <div style={iconContainerStyles}>
        {renderIcon()}
      </div>
    </div>
  );
};
