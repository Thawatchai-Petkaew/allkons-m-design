"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";
import { Illustration, type IllustrationProps } from "./Illustration";
import { ds } from "@/design-system";

export interface ConfirmationProps {
  /**
   * Whether the confirmation dialog is open
   */
  open?: boolean;
  /**
   * Callback when confirmation should close
   */
  onClose?: () => void;
  /**
   * Callback when user confirms the action
   */
  onConfirm?: () => void;
  /**
   * Confirmation title
   */
  title?: string;
  /**
   * Confirmation message/content
   */
  message?: string;
  /**
   * Custom content (overrides message if provided)
   */
  children?: React.ReactNode;
  /**
   * Confirm button text
   */
  confirmText?: string;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Confirm button variant
   */
  confirmVariant?: "primary" | "secondary" | "tertiary";
  /**
   * Confirm button color
   */
  confirmColor?: "brand" | "neutral" | "error";
  /**
   * Cancel button variant
   */
  cancelVariant?: "primary" | "secondary" | "tertiary";
  /**
   * Cancel button color
   */
  cancelColor?: "brand" | "neutral" | "error";
  /**
   * Whether confirmation can be closed by clicking overlay
   */
  maskClosable?: boolean;
  /**
   * Whether to show close button in header
   */
  closable?: boolean;
  /**
   * Modal size (desktop only)
   * - small: 600px (for confirm/notification/error)
   * - middle: 720px (default, for standard dialogs)
   * - large: 960px (for complex operations)
   */
  size?: "small" | "middle" | "large";
  /**
   * Modal width (overrides size if provided, desktop only)
   */
  width?: number | string;
  /**
   * Whether confirmation button is loading
   */
  confirmLoading?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Illustration props (for confirmation with illustration)
   */
  illustration?: {
    type: IllustrationProps["type"];
    icon?: IllustrationProps["icon"];
    color?: IllustrationProps["color"];
    variant?: IllustrationProps["variant"];
    size?: IllustrationProps["size"];
  };
}

/**
 * Responsive Confirmation Dialog Component
 * - Desktop: Uses Modal (centered dialog)
 * - Mobile: Uses BottomSheet (slides up from bottom)
 */
export const Confirmation: React.FC<ConfirmationProps> = ({
  open = false,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  confirmColor = "brand",
  cancelVariant = "secondary",
  cancelColor = "neutral",
  maskClosable = true,
  closable = true,
  size = "small",
  width,
  confirmLoading = false,
  className = "",
  style,
  illustration,
}) => {
  // Initialize as false (desktop) to match SSR, then update on mount
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detect mobile/desktop on mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Breakpoint at 768px
    };

    // Set mounted flag after component mounts (client-side only)
    setMounted(true);
    
    // Initial check after mount (client-side only)
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  // Footer with action buttons
  const footer = (
    <div
      style={{
        display: "flex",
        gap: ds.spacing("3"),
        width: "100%",
        flexDirection: isMobile ? "column-reverse" : "row",
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant={cancelVariant}
        color={cancelColor}
        size={isMobile ? "large" : "middle"}
        onClick={handleClose}
        style={{
          flex: isMobile ? 1 : "none",
        }}
      >
        {cancelText}
      </Button>
      <Button
        variant={confirmVariant}
        color={confirmColor}
        size={isMobile ? "large" : "middle"}
        onClick={handleConfirm}
        loading={confirmLoading}
        style={{
          flex: isMobile ? 1 : "none",
        }}
      >
        {confirmText}
      </Button>
    </div>
  );

  // Render content
  // When illustration is present, title and message are handled by Modal/BottomSheet
  // When no illustration, message goes to body
  const content = illustration ? (
    <>
      {/* Additional content if any */}
      {children}
    </>
  ) : (
    <>
      {children || (
        <div
          style={{
            color: ds.color.text("secondary"),
            fontSize: ds.typography.size("md"),
            lineHeight: ds.typography.lineHeight("md"),
            textAlign: "left",
            fontFamily: ds.typography.fontFamily.notoSans,
          }}
        >
          {message}
        </div>
      )}
    </>
  );

  // Don't render until mounted to avoid hydration mismatch and double rendering
  if (!mounted || !open) return null;

  // Desktop: Use Modal
  if (!isMobile) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        title={illustration ? title : title}
        supportingText={illustration ? message : undefined}
        footer={footer}
        maskClosable={maskClosable}
        closable={closable}
        size={size}
        width={width}
        className={className}
        style={style}
        illustration={illustration}
      >
        {content}
      </Modal>
    );
  }

  // Mobile: Use BottomSheet
  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      title={illustration ? title : title}
      supportingText={illustration ? message : undefined}
      footer={footer}
      maskClosable={maskClosable}
      closable={closable}
      className={className}
      style={style}
      illustration={illustration}
    >
      {content}
    </BottomSheet>
  );
};
