"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ds } from "@/design-system";
import { Button } from "./Button";
import { Illustration, type IllustrationProps } from "./Illustration";

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open?: boolean;
  /**
   * Callback when modal should close
   */
  onClose?: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Supporting text below title
   */
  supportingText?: string;
  /**
   * Modal content
   */
  children?: React.ReactNode;
  /**
   * Footer content (e.g., action buttons)
   */
  footer?: React.ReactNode;
  /**
   * Whether the modal can be closed by clicking overlay
   */
  maskClosable?: boolean;
  /**
   * Whether to show close button in header
   */
  closable?: boolean;
  /**
   * Modal size preset
   * - small: 600px (for confirm/notification/error)
   * - middle: 720px (default, for standard dialogs)
   * - large: 960px (for complex operations)
   */
  size?: "small" | "middle" | "large";
  /**
   * Modal width (overrides size if provided)
   */
  width?: number | string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Illustration props (for modal with illustration)
   */
  illustration?: {
    type: IllustrationProps["type"];
    icon?: IllustrationProps["icon"];
    color?: IllustrationProps["color"];
    variant?: IllustrationProps["variant"];
    size?: IllustrationProps["size"];
  };
}

export const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose,
  title,
  supportingText,
  children,
  footer,
  maskClosable = true,
  closable = true,
  size = "middle",
  width,
  className = "",
  style,
  illustration,
}) => {
  // Size presets in pixels (matching Figma design)
  const sizePresets: Record<"small" | "middle" | "large", number> = {
    small: 600,   // For confirm/notification/error
    middle: 720,  // Default, for standard dialogs
    large: 960,   // For complex operations
  };

  // Calculate modal width
  const modalWidth = width 
    ? (typeof width === "number" ? `${width}px` : width)
    : `${sizePresets[size]}px`;
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && onClose) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: ds.spacing('4'),
      }}
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ds.component.modal.overlayBg(),
        }}
      />

      {/* Modal Dialog */}
      <div
        className={className}
        style={{
          position: "relative",
          width: modalWidth,
          maxWidth: "90vw",
          maxHeight: "90vh",
          backgroundColor: ds.component.modal.bg(),
          border: `${ds.common.borderWidth.thin} solid ${ds.component.modal.border()}`,
          borderRadius: ds.common.borderRadius.modal,
          boxShadow: ds.component.modal.shadow(),
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - Absolute positioned (always available if closable) */}
        {closable && onClose && (
          <Button
            variant="secondary"
            color="neutral"
            size="middle"
            icon={<i className="ri-close-line" />}
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: ds.spacing('5'),
              right: ds.spacing('5'),
              zIndex: 10,
              minWidth: ds.common.height.buttonMiddle,
              width: ds.common.height.buttonMiddle,
              height: ds.common.height.buttonMiddle,
              padding: 0,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        )}

        {/* Header - Optional, only show if no illustration and has title/supportingText */}
        {!illustration && (title || supportingText) && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              paddingTop: ds.spacing('5'),
              paddingRight: closable ? `calc(${ds.spacing('5')} + ${ds.common.height.buttonSmall} + ${ds.spacing('4')})` : ds.spacing('5'),
              paddingBottom: ds.spacing('4'),
              paddingLeft: ds.spacing('6'),
              borderTop: "none",
              borderBottom: "none",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderTopColor: "rgba(0, 0, 0, 0)",
              borderBottomColor: "rgba(0, 0, 0, 0)",
              borderTopStyle: "none",
              borderBottomStyle: "none",
              borderImage: "none",
              borderWidth: 0,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <h2
                  style={{
                    fontSize: ds.typography.size('2xl'),
                    lineHeight: ds.typography.lineHeight('2xl'),
                    fontWeight: ds.typography.weight('bold'),
                    color: ds.component.modal.title(),
                    margin: 0,
                    marginBottom: supportingText ? ds.spacing('1') : 0,
                  }}
                >
                  {title}
                </h2>
              )}
              {supportingText && (
                <p
                  style={{
                    fontSize: ds.typography.size('md'),
                    lineHeight: ds.typography.lineHeight('md'),
                    color: ds.color.text('secondary'),
                    margin: 0,
                  }}
                >
                  {supportingText}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Body */}
        <div
          style={{
            flex: 1,
            ...(!illustration && title 
              ? { padding: ds.spacing('6') }
              : illustration 
                ? { 
                    paddingTop: ds.spacing('6'),
                    paddingRight: 0,
                    paddingBottom: ds.spacing('1'),
                    paddingLeft: 0,
                  }
                : { 
                    paddingTop: ds.spacing('6'),
                    paddingRight: ds.spacing('6'),
                    paddingBottom: ds.spacing('4'),
                    paddingLeft: ds.spacing('6'),
                  }
            ),
            overflowY: "auto",
            color: ds.component.modal.text(),
            fontSize: ds.typography.size('md'),
            lineHeight: ds.typography.lineHeight('md'),
          }}
        >
          {/* Illustration with title/supportingText below (if provided) */}
          {illustration && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: ds.spacing('none'),
                paddingBottom: ds.spacing('none'),
                paddingLeft: ds.spacing('6'),
                paddingRight: ds.spacing('6'),
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: (title || supportingText || children) ? 0 : 0,
                }}
              >
                <Illustration
                  type={illustration.type}
                  icon={illustration.icon}
                  color={illustration.color || "neutral"}
                  variant={illustration.variant || "withoutBackground"}
                  size={illustration.size || "xl"}
                />
              </div>
              {/* Title below illustration - no gap */}
              {title && (
                <h2
                  style={{
                    fontSize: ds.typography.size('2xl'),
                    lineHeight: ds.typography.lineHeight('2xl'),
                    fontWeight: ds.typography.weight('bold'),
                    color: ds.component.modal.title(),
                    margin: 0,
                    marginTop: "12px",
                    marginBottom: 0,
                    textAlign: "center",
                  }}
                >
                  {title}
                </h2>
              )}
              {/* Supporting text below title */}
              {supportingText && (
                <p
                  style={{
                    fontSize: ds.typography.size('md'),
                    lineHeight: ds.typography.lineHeight('md'),
                    color: ds.color.text('quaternary'),
                    margin: 0,
                    marginBottom: children ? ds.spacing('4') : 0,
                    textAlign: "center",
                  }}
                >
                  {supportingText}
                </p>
              )}
            </div>
          )}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: ds.spacing('3'),
              padding: `${ds.spacing('4')} ${ds.spacing('6')} ${ds.spacing('6')}`,
              borderTop: "none",
              borderTopWidth: 0,
              borderTopColor: "rgba(0, 0, 0, 0)",
              borderTopStyle: "none",
              borderImage: "none",
              borderWidth: 0,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Render modal using portal to body
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
};
