"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ds } from "@/design-system";
import { Button } from "./Button";
import { Illustration, type IllustrationProps } from "./Illustration";

export interface BottomSheetProps {
  /**
   * Whether the bottom sheet is open
   */
  open?: boolean;
  /**
   * Callback when bottom sheet should close
   */
  onClose?: () => void;
  /**
   * Bottom sheet title
   */
  title?: string;
  /**
   * Supporting text below title
   */
  supportingText?: string;
  /**
   * Bottom sheet content
   */
  children?: React.ReactNode;
  /**
   * Footer content (e.g., action buttons)
   */
  footer?: React.ReactNode;
  /**
   * Whether the bottom sheet can be closed by clicking overlay
   */
  maskClosable?: boolean;
  /**
   * Whether to show close button in header
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
  /**
   * Illustration props (for bottom sheet with illustration)
   */
  illustration?: {
    type: IllustrationProps["type"];
    icon?: IllustrationProps["icon"];
    color?: IllustrationProps["color"];
    variant?: IllustrationProps["variant"];
    size?: IllustrationProps["size"];
  };
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open = false,
  onClose,
  title,
  supportingText,
  children,
  footer,
  maskClosable = true,
  closable = true,
  className = "",
  style,
  illustration,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (!mounted) return;

    if (open) {
      document.body.style.overflow = "hidden";
      // Trigger animation after mount
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      document.body.style.overflow = "";
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = "";
      setIsAnimating(false);
    };
  }, [open, mounted]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && onClose) {
        handleClose();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !open) return null;

  const handleClose = () => {
    setIsAnimating(false);
    // Wait for animation to complete before closing
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskClosable && e.target === e.currentTarget) {
      handleClose();
    }
  };

  const bottomSheetContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
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
          opacity: isAnimating ? 1 : 0,
          transition: `opacity ${ds.common.animation.normal} ease`,
        }}
      />

      {/* Bottom Sheet Dialog */}
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "100vw",
          maxHeight: "90vh",
          backgroundColor: ds.component.modal.bg(),
          borderTopLeftRadius: ds.radius("xl"),
          borderTopRightRadius: ds.radius("xl"),
          boxShadow: ds.component.modal.shadow(),
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: isAnimating ? "translateY(0)" : "translateY(100%)",
          transition: `transform ${ds.common.animation.normal} ease`,
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
            onClick={handleClose}
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

        {/* Drag Handle */}
        <div
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: ds.color.border("secondary"),
            borderRadius: ds.radius("full"),
            margin: `${ds.spacing("3")} auto`,
            flexShrink: 0,
          }}
        />

        {/* Header - Only show if no illustration and has title/supportingText */}
        {!illustration && (title || supportingText) && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              paddingTop: ds.spacing("5"),
              paddingRight: closable ? `calc(${ds.spacing('5')} + ${ds.common.height.buttonMiddle} + ${ds.spacing('4')})` : ds.spacing("5"),
              paddingBottom: ds.spacing("4"),
              paddingLeft: ds.spacing("6"),
              flexShrink: 0,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <h2
                  style={{
                    fontSize: ds.typography.size("xl"),
                    lineHeight: ds.typography.lineHeight("xl"),
                    fontWeight: ds.typography.weight("bold"),
                    color: ds.component.modal.title(),
                    margin: 0,
                    marginBottom: supportingText ? ds.spacing("1") : 0,
                  }}
                >
                  {title}
                </h2>
              )}
              {supportingText && (
                <p
                  style={{
                    fontSize: ds.typography.size("md"),
                    lineHeight: ds.typography.lineHeight("md"),
                    color: ds.color.text("secondary"),
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
            fontSize: ds.typography.size("md"),
            lineHeight: ds.typography.lineHeight("md"),
            WebkitOverflowScrolling: "touch",
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
                    fontSize: ds.typography.size("2xl"),
                    lineHeight: ds.typography.lineHeight("2xl"),
                    fontWeight: ds.typography.weight("bold"),
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
                    fontSize: ds.typography.size("md"),
                    lineHeight: ds.typography.lineHeight("md"),
                    color: ds.color.text("quaternary"),
                    margin: 0,
                    marginBottom: children ? ds.spacing("4") : 0,
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
              gap: ds.spacing("3"),
              padding: `${ds.spacing("4")} ${ds.spacing("6")} ${ds.spacing("6")}`,
              borderTop: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
              flexShrink: 0,
            }}
          >
            {footer}
          </div>
        )}

        {/* Safe area for devices with notches */}
        <div
          style={{
            height: "env(safe-area-inset-bottom)",
            backgroundColor: ds.component.modal.bg(),
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );

  // Render bottom sheet using portal to body
  if (typeof window !== "undefined") {
    return createPortal(bottomSheetContent, document.body);
  }

  return null;
};
