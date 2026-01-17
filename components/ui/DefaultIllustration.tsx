"use client";

import React from "react";
import { ds } from "@/design-system";
import { Icon } from "./Icon";

export interface DefaultIllustrationProps {
  /**
   * Remix Icon class name (e.g., "ri-information-line")
   * Default: "ri-information-line"
   */
  icon?: string;
  /**
   * Icon size
   * Default: "2xl"
   */
  iconSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Icon color scheme
   * Default: "neutral"
   */
  iconColor?: "brand" | "error" | "info" | "warning" | "neutral";
  /**
   * Container width
   * Default: "100%"
   */
  width?: number | string;
  /**
   * Container height
   * Default: "auto"
   */
  height?: number | string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

export const DefaultIllustration: React.FC<DefaultIllustrationProps> = ({
  icon = "ri-information-line",
  iconSize = "2xl",
  iconColor = "neutral",
  width = "100%",
  height = "auto",
  className = "",
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        minHeight: height === "auto" ? "200px" : undefined,
        padding: ds.spacing(8),
        backgroundColor: ds.component.illustration.bg(),
        borderRadius: ds.common.borderRadius.illustration,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Background Pattern/Decorative Elements */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.08,
        }}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="illustration-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="12" fill={ds.component.illustration.iconColor()} opacity="0.3" />
            <circle cx="75" cy="75" r="10" fill={ds.component.illustration.iconColor()} opacity="0.2" />
          </pattern>
        </defs>
        
        {/* Background pattern */}
        <rect width="100%" height="100%" fill="url(#illustration-pattern)" />
        
        {/* Decorative circles - positioned around edges */}
        <circle cx="50" cy="50" r="35" fill={ds.component.illustration.iconColor()} opacity="0.15" />
        <circle cx="350" cy="70" r="28" fill={ds.component.illustration.iconColor()} opacity="0.12" />
        <circle cx="70" cy="330" r="32" fill={ds.component.illustration.iconColor()} opacity="0.15" />
        <circle cx="330" cy="350" r="30" fill={ds.component.illustration.iconColor()} opacity="0.12" />
        <circle cx="200" cy="40" r="25" fill={ds.component.illustration.iconColor()} opacity="0.1" />
        <circle cx="200" cy="360" r="27" fill={ds.component.illustration.iconColor()} opacity="0.1" />
        <circle cx="40" cy="200" r="29" fill={ds.component.illustration.iconColor()} opacity="0.12" />
        <circle cx="360" cy="200" r="31" fill={ds.component.illustration.iconColor()} opacity="0.12" />
        
        {/* Additional decorative elements - smaller circles */}
        <circle cx="140" cy="140" r="18" fill={ds.component.illustration.iconColor()} opacity="0.08" />
        <circle cx="260" cy="140" r="20" fill={ds.component.illustration.iconColor()} opacity="0.08" />
        <circle cx="140" cy="260" r="19" fill={ds.component.illustration.iconColor()} opacity="0.08" />
        <circle cx="260" cy="260" r="21" fill={ds.component.illustration.iconColor()} opacity="0.08" />
      </svg>

      {/* Icon with Ring (centered) */}
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* Icon Component */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Icon
            name={icon}
            shape="circle"
            variant="filled"
            color={iconColor}
            size={iconSize}
          />
        </div>
        
        {/* SVG Ring - positioned around the icon */}
        <svg
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "calc(100% + 16px)",
            height: "calc(100% + 16px)",
            zIndex: 1,
            pointerEvents: "none",
          }}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={ds.component.illustration.ringColor()}
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};
