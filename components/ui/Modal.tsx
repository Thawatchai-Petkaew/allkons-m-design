"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ds } from "@/design-system";
import { Button } from "./Button";

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
   * Modal width
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
}

export const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose,
  title,
  children,
  footer,
  maskClosable = true,
  closable = true,
  width = 520,
  className = "",
  style,
}) => {
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
          width: typeof width === "number" ? `${width}px` : width,
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
        {/* Header */}
        {title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: `${ds.spacing('6')} ${ds.spacing('6')} ${ds.spacing('4')}`,
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
            <h2
              style={{
                fontSize: ds.typography.size('2xl'),
                lineHeight: ds.typography.lineHeight('2xl'),
                fontWeight: ds.typography.weight('bold'),
                color: ds.component.modal.title(),
                margin: 0,
              }}
            >
              {title}
            </h2>
            {closable && onClose && (
              <button
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ds.component.button.tertiaryNeutral.bg('hover');
                  e.currentTarget.style.color = ds.component.button.tertiaryNeutral.text('hover');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = ds.component.button.tertiaryNeutral.bg();
                  e.currentTarget.style.color = ds.component.button.tertiaryNeutral.text();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: ds.common.cursor.pointer,
                  color: ds.component.button.tertiaryNeutral.text(),
                  fontSize: ds.common.size.alertCloseIcon,
                  backgroundColor: ds.component.button.tertiaryNeutral.bg(),
                  border: "none",
                  borderStyle: "none",
                  borderWidth: 0,
                  borderColor: ds.common.transparent,
                  padding: 0,
                  margin: 0,
                  marginLeft: ds.spacing('4'),
                  flexShrink: 0,
                  transition: `all ${ds.common.animation.fast} ease`,
                }}
                aria-label="Close"
              >
                <i className="ri-close-line" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div
          style={{
            flex: 1,
            padding: title ? ds.spacing('6') : `${ds.spacing('6')} ${ds.spacing('6')} ${ds.spacing('4')}`,
            overflowY: "auto",
            color: ds.component.modal.text(),
            fontSize: ds.typography.size('md'),
            lineHeight: ds.typography.lineHeight('md'),
          }}
        >
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
