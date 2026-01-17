"use client";

import React from "react";
import { ds } from "@/design-system";

export interface AlertProps {
  /**
   * Alert type
   */
  type?: "error" | "info" | "warning" | "success";
  /**
   * Alert variant
   * - compact: Single line with title, undo, and close button
   * - expanded: Multi-line with icon, title, description, and details link
   */
  variant?: "compact" | "expanded";
  /**
   * Alert title text
   */
  title: string;
  /**
   * Alert description text (only shown in expanded variant)
   */
  description?: string;
  /**
   * Undo action text
   */
  undoText?: string;
  /**
   * Callback when undo is clicked
   */
  onUndo?: () => void;
  /**
   * View details link text (only shown in expanded variant)
   */
  detailsText?: string;
  /**
   * Missing/prefix text before details link (only shown in expanded variant)
   */
  detailsPrefix?: string;
  /**
   * Callback when view details is clicked (only shown in expanded variant)
   */
  onViewDetails?: () => void;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
  /**
   * Whether the alert is closable (shows X button)
   */
  closable?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  variant = "expanded",
  title,
  description,
  undoText = "Undo",
  onUndo,
  detailsText = "View details",
  detailsPrefix = "Missing",
  onViewDetails,
  onClose,
  closable = true,
  className = "",
  style,
}) => {
  // Icon mapping
  const iconMap = {
    error: "ri-error-warning-line",
    info: "ri-information-line",
    warning: "ri-alert-line",
    success: "ri-checkbox-circle-line",
  };

  // Get alert styles based on type and variant
  const getAlertStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "relative",
      display: "flex",
      alignItems: variant === "compact" ? "center" : "flex-start",
      padding: variant === "compact" ? ds.spacing(3) : ds.spacing(4),
      borderRadius: ds.common.borderRadius.alert,
      gap: ds.spacing(3),
    };

    // Special handling for error expanded - use error-bg-compact
    const bgColor = type === "error" && variant === "expanded" 
      ? "var(--alert-error-bg-compact)"
      : ds.component.alert.bg(type, variant);

    // For info expanded, background should be var(--alert-info-bg-compact)
    const infoBgColor = type === "info" && variant === "expanded" 
      ? "var(--alert-info-bg-compact)"
      : bgColor;

    // For success expanded, background should be var(--alert-success-bg-compact)
    const successBgColor = type === "success" && variant === "expanded" 
      ? "var(--alert-success-bg-compact)"
      : infoBgColor;

    // For warning expanded, background should be var(--alert-warning-bg-compact)
    const finalBgColor = type === "warning" && variant === "expanded" 
      ? "var(--alert-warning-bg-compact)"
      : successBgColor;

    // For success expanded, border color should be var(--alert-success-border)
    const finalBorderColor = type === "success" && variant === "expanded"
      ? "var(--alert-success-border)"
      : ds.component.alert.border(type);

    return {
      ...baseStyles,
      backgroundColor: finalBgColor,
      borderStyle: "solid",
      borderWidth: ds.common.borderWidth.thin,
      borderColor: finalBorderColor,
      borderImage: "none",
    };
  };

  const alertStyles = getAlertStyles();

  // Get text colors
  const titleColor = ds.component.alert.title(type);
  const descriptionColor = ds.component.alert.description(type);
  const actionColor = ds.component.alert.action(type);

  // Icon styles
  const iconStyles: React.CSSProperties = {
    fontSize: ds.common.size.alertIcon,
    color: ds.component.alert.icon(type),
    flexShrink: 0,
  };

  // Close button styles
  const closeButtonStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: ds.common.cursor.pointer,
    color: ds.component.alert.title(type),
    fontSize: ds.common.size.alertCloseIcon,
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    marginLeft: "auto",
    flexShrink: 0,
  };

  if (variant === "compact") {
    return (
      <div className={className} style={{ ...alertStyles, ...style }}>
        <i className={iconMap[type]} style={iconStyles} />
        <span
          style={{
            fontSize: ds.typography.size('md'),
            lineHeight: ds.typography.lineHeight('md'),
            fontWeight: ds.typography.weight('semibold'),
            color: titleColor,
            flex: 1,
          }}
        >
          {title}
        </span>
        {onUndo && (
          <span
            onClick={onUndo}
            style={{
              fontSize: ds.typography.size('md'),
              lineHeight: ds.typography.lineHeight('md'),
              fontWeight: ds.typography.weight('semibold'),
              color: actionColor,
              textDecoration: "underline",
              cursor: ds.common.cursor.pointer,
            }}
          >
            {undoText}
          </span>
        )}
        {closable && onClose && (
          <button
            onClick={onClose}
            style={closeButtonStyles}
            aria-label="Close"
          >
            <i className="ri-close-line" />
          </button>
        )}
      </div>
    );
  }

  // Expanded variant
  return (
    <div className={className} style={{ ...alertStyles, ...style }}>
      <i className={iconMap[type]} style={{ ...iconStyles, marginTop: ds.spacing(1) }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: ds.spacing(2) }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontSize: ds.typography.size('md'),
              lineHeight: ds.typography.lineHeight('md'),
              fontWeight: ds.typography.weight('bold'),
              color: titleColor,
            }}
          >
            {title}
          </span>
          {closable && onClose && (
            <button
              onClick={onClose}
              style={closeButtonStyles}
              aria-label="Close"
            >
              <i className="ri-close-line" />
            </button>
          )}
        </div>
        {description && (
          <span
            style={{
              fontSize: ds.typography.size('md'),
              lineHeight: ds.typography.lineHeight('md'),
              fontWeight: ds.typography.weight('regular'),
              color: type === "info" ? ds.component.alert.title(type) : titleColor,
            }}
          >
            {description}
          </span>
        )}
        {onViewDetails && (
          <div style={{ display: "flex", alignItems: "center", gap: ds.spacing(2) }}>
            <span
              style={{
                fontSize: ds.typography.size('md'),
                lineHeight: ds.typography.lineHeight('md'),
                fontWeight: ds.typography.weight('regular'),
                color: descriptionColor,
              }}
            >
              {detailsPrefix}
            </span>
            <span
              onClick={onViewDetails}
              style={{
                fontSize: ds.typography.size('md'),
                lineHeight: ds.typography.lineHeight('md'),
                fontWeight: ds.typography.weight('regular'),
                color: descriptionColor,
                textDecoration: "underline",
                cursor: ds.common.cursor.pointer,
                display: "inline-flex",
                alignItems: "center",
                gap: ds.spacing(1),
              }}
            >
              {detailsText}
              <i 
                className="ri-circle-line" 
                style={{ 
                  fontSize: ds.common.size.alertDetailsIcon,
                  color: descriptionColor,
                }} 
              />
            </span>
          </div>
        )}
        {onUndo && variant === "expanded" && (
          <span
            onClick={onUndo}
            style={{
              fontSize: ds.typography.size('md'),
              lineHeight: ds.typography.lineHeight('md'),
              fontWeight: ds.typography.weight('semibold'),
              color: actionColor,
              textDecoration: "underline",
              cursor: ds.common.cursor.pointer,
              alignSelf: "flex-start",
            }}
          >
            {undoText}
          </span>
        )}
      </div>
    </div>
  );
};
