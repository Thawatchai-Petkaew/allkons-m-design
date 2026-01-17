"use client";

import React from "react";
import { ds } from "@/design-system";
import { Icon } from "./Icon";

export interface IllustrationProps {
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
   * Title text (optional)
   */
  title?: string;
  /**
   * Description text (optional)
   */
  description?: string;
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

export const Illustration: React.FC<IllustrationProps> = ({
  icon = "ri-information-line",
  iconSize = "2xl",
  iconColor = "neutral",
  title,
  description,
  width = "100%",
  height = "auto",
  className = "",
  style,
}) => {
  return (
    <div
      className={className}
      style={{
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
        ...style,
      }}
    >
      {/* Icon with Ring (using Icon component with filled variant + SVG ring) */}
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: title || description ? ds.spacing(6) : 0,
        }}
      >
        {/* Icon Component */}
        <div style={{ position: "relative", zIndex: 1 }}>
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
            zIndex: 0,
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

      {/* Title */}
      {title && (
        <h3
          style={{
            fontSize: ds.typography.size('xl'),
            lineHeight: ds.typography.lineHeight('xl'),
            fontWeight: ds.typography.weight('semibold'),
            color: ds.component.illustration.title(),
            margin: 0,
            marginBottom: description ? ds.spacing(2) : 0,
            textAlign: "center",
          }}
        >
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: ds.typography.size('md'),
            lineHeight: ds.typography.lineHeight('md'),
            fontWeight: ds.typography.weight('regular'),
            color: ds.component.illustration.text(),
            margin: 0,
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
