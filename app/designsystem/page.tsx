"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DesignSystemSidebar } from "@/components";
import { Button, Input, Toggle, Checkbox, Radio, Alert, Icon, Select, Textarea, Modal, Confirmation, BottomSheet, Illustration, Badge } from "@/components";
import { Space, Typography } from "antd";
import { ds } from "@/design-system";

const { Title, Text } = Typography;

// Helper functions to format size values with rem and px
const formatSizeValue = (cssVar: string, pxValue: number): string => {
  return `${pxValue}px (${cssVar})`;
};

const formatRemValue = (cssVar: string, remValue: string): string => {
  // Handle "full" radius case (9999px)
  if (remValue.includes('px')) {
    return `${remValue} (${cssVar})`;
  }
  const remNum = parseFloat(remValue.replace('rem', ''));
  const pxValue = remNum * 16; // 1rem = 16px
  return `${remValue} / ${pxValue}px (${cssVar})`;
};

// Size mappings for typography (in px)
const TYPOGRAPHY_SIZES: Record<string, number> = {
  "2xs": 10,
  "xs": 12,
  "sm": 14,
  "md": 16,
  "lg": 18,
  "xl": 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  "6xl": 36,
  "7xl": 40,
  "8xl": 44,
  "9xl": 48,
  "10xl": 56,
  "11xl": 60,
};

// Line height mappings (in px)
const LINE_HEIGHTS: Record<string, number> = {
  "2xs": 10,
  "xs": 16,
  "sm": 20,
  "md": 24,
  "lg": 24,
  "xl": 24,
  "2xl": 26,
  "3xl": 28,
  "4xl": 32,
  "5xl": 36,
  "6xl": 48,
  "7xl": 48,
  "8xl": 52,
  "9xl": 56,
  "10xl": 64,
  "11xl": 72,
};

// Spacing mappings (in rem)
const SPACING_VALUES: Record<string, string> = {
  "none": "0rem",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "13": "3.25rem",
  "14": "3.5rem",
  "15": "3.75rem",
  "16": "4rem",
};

// Border radius mappings (in rem)
const RADIUS_VALUES: Record<string, string> = {
  "none": "0rem",
  "xs": "0.25rem",
  "sm": "0.5rem",
  "md": "0.75rem",
  "lg": "1rem",
  "xl": "1.5rem",
  "full": "9999px",
};

// Helper function to get logo path
const getLogoPath = (
  type: "mark" | "full",
  theme: "Default" | "Dark" | "Light" = "Default",
  size: "xs" | "sm" | "md" | "lg" | "xl" = "md",
  variant?: string
) => {
  const folder = type === "mark" ? "Logo mark" : "Logo full";
  if (type === "mark") {
    const logoType = variant || "Icon";
    return `/assets/logos/${folder}/Theme=${theme}, Size=${size}, Type=${logoType}.svg`;
  } else {
    const unit = variant || "Default";
    return `/assets/logos/${folder}/Theme=${theme}, Size=${size}, Unit=${unit}.svg`;
  }
};

// Component Showcase Section Component
interface ComponentSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

const ComponentSection: React.FC<ComponentSectionProps> = ({
  id,
  title,
  description,
  children,
  isMobile = false,
}) => {
  return (
    <section
      id={id}
      style={{
        marginBottom: ds.spacing(isMobile ? "8" : "16"),
        scrollMarginTop: ds.spacing(isMobile ? "4" : "8"),
      }}
    >
      <div style={{ marginBottom: ds.spacing(isMobile ? "4" : "8") }}>
        <Title
          level={2}
          style={{
            marginBottom: ds.spacing("2"),
            fontSize: isMobile ? ds.typography.size("2xl") : ds.typography.size("4xl"),
            fontWeight: ds.typography.weight("bold"),
            color: ds.color.text("primary"),
            fontFamily: ds.typography.fontFamily.notoSans,
            lineHeight: isMobile ? ds.typography.lineHeight("2xl") : ds.typography.lineHeight("4xl"),
          }}
        >
          {title}
        </Title>
        {description && (
          <Text
            style={{
              fontSize: ds.typography.size("md"),
              color: ds.color.text("secondary"),
              lineHeight: ds.typography.lineHeight("md"),
              fontFamily: ds.typography.fontFamily.notoSans,
            }}
          >
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  );
};

// Showcase Card Component
interface ShowcaseCardProps {
  title: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ title, children, isMobile = false }) => {
  return (
    <div
      style={{
        marginBottom: ds.spacing(isMobile ? "4" : "8"),
        padding: ds.spacing(isMobile ? "4" : "8"),
        backgroundColor: ds.color.background("primary"),
        border: `1px solid ${ds.color.border("primary")}`,
        borderRadius: ds.radius("lg"),
        overflow: "hidden", // Prevent content overflow
      }}
    >
      <div
        style={{
          fontSize: ds.typography.size("sm"),
          fontWeight: ds.typography.weight("semibold"),
          color: ds.color.text("secondary"),
          textTransform: "uppercase",
          letterSpacing: "0.5px", // Using direct value since letterSpacing may not be in type
          marginBottom: ds.spacing("6"),
          fontFamily: ds.typography.fontFamily.notoSans,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
};

export default function DesignSystemPage() {
  const [loading, setLoading] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    circularSmall1: false,
    circularSmall2: true,
    circularMiddle1: false,
    circularMiddle2: true,
    circularLarge1: false,
    circularLarge2: true,
    rectangular1: false,
    rectangular2: true,
  });
  const [checkboxStates, setCheckboxStates] = useState({
    small1: false,
    small2: true,
    middle1: false,
    middle2: true,
    large1: false,
    large2: true,
    unchecked: false,
    checked: true,
    indeterminate: false,
  });
  const [radioValue, setRadioValue] = useState<string>("option1");
  const [radioValueSmall, setRadioValueSmall] = useState<string>("option1");
  const [radioValueMiddle, setRadioValueMiddle] = useState<string>("option1");
  const [radioValueLarge, setRadioValueLarge] = useState<string>("option1");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"small" | "middle" | "large">("middle");
  const [modalWithSupportingText, setModalWithSupportingText] = useState(false);
  const [modalWithIllustrationOpen, setModalWithIllustrationOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalErrorOpen, setModalErrorOpen] = useState(false);
  const [modalWarningOpen, setModalWarningOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<"default" | "error" | "warning">("default");
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Scroll to hash on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: ds.color.background("primary"),
        position: "relative",
        width: "100%",
      }}
    >
      <DesignSystemSidebar
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main
        style={{
          padding: isMobile
            ? `${ds.spacing("4")} ${ds.spacing("4")}`
            : `${ds.spacing("12")} ${ds.spacing("16")}`,
          marginLeft: isMobile ? 0 : "220px", // Fixed sidebar width
          fontFamily: ds.typography.fontFamily.notoSans,
          maxWidth: isMobile ? "100%" : ds.common.layout.containerMaxWidth,
          width: isMobile ? "100%" : "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Mobile Menu Button */}
        {isMobile && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              backgroundColor: ds.color.background("primary"),
              padding: `${ds.spacing("4")} 0`,
              marginBottom: ds.spacing("4"),
              borderBottom: `1px solid ${ds.color.border("primary")}`,
              display: "flex",
              alignItems: "center",
              gap: ds.spacing("4"),
            }}
          >
            <Button
              variant="secondary"
              color="neutral"
              size="small"
              icon={<i className="ri-menu-line" />}
              onClick={() => setIsMobileMenuOpen(true)}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ds.spacing("2"),
              }}
            >
              <img
                src="/assets/logos/Logo full/Theme=Default, Size=xs, Unit=Default.svg"
                alt="Allkons M Logo"
                style={{
                  height: ds.common.icon.medium,
                  width: "auto",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  // Fallback to text if logo not found
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const textEl = document.createElement("span");
                    textEl.textContent = "Allkons M";
                    textEl.style.fontSize = ds.typography.size("lg");
                    textEl.style.fontWeight = ds.typography.weight("bold");
                    parent.appendChild(textEl);
                  }
                }}
              />
              <Text
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("secondary"),
                }}
              >
                Design System
              </Text>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div style={{ marginBottom: isMobile ? ds.spacing("8") : ds.spacing("16") }}>
          <Title
            level={1}
            style={{
              marginBottom: ds.spacing("4"),
              fontSize: isMobile ? ds.typography.size("4xl") : ds.typography.size("6xl"),
              fontWeight: ds.typography.weight("bold"),
              color: ds.color.text("primary"),
              fontFamily: ds.typography.fontFamily.notoSans,
            }}
          >
            Design System
          </Title>
          <Text
            style={{
              fontSize: ds.typography.size("lg"),
              color: ds.color.text("secondary"),
              lineHeight: ds.typography.lineHeight("lg"),
              fontFamily: ds.typography.fontFamily.notoSans,
            }}
          >
            A comprehensive collection of design tokens and reusable components
            for Allkons M platform
          </Text>
          <div style={{ marginTop: ds.spacing("8") }}>
            <Link
              href="/designsystem/components"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 24px",
                backgroundColor: "var(--brand-m-primary-00)",
                borderRadius: ds.radius("lg"),
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
              className="components-link"
            >
              <i className="ri-layout-grid-fill" style={{ fontSize: "24px", color: "white" }} />
              <div>
                <div style={{ ...ds.typography.preset("paragraph-middle"), fontWeight: ds.typography.weight("bold"), color: "white" }}>
                  Explore Custom Components
                </div>
                <div style={{ ...ds.typography.preset("paragraph-xsmall"), color: "rgba(255,255,255,0.8)" }}>
                  High-level complex components like Seller Header
                </div>
              </div>
              <i className="ri-arrow-right-line" style={{ fontSize: "20px", color: "white", marginLeft: "8px" }} />
            </Link>
          </div>
        </div>

        <style jsx>{`
          :global(.components-link):hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.15);
            background-color: var(--brand-m-primary-dark-10) !important;
          }
        `}</style>

        {/* Foundation Section */}
        <div style={{ marginBottom: ds.spacing("16") }}>
          <div
            style={{
              fontSize: ds.typography.size("xs"),
              fontWeight: ds.typography.weight("semibold"),
              color: ds.color.text("tertiary"),
              textTransform: "uppercase",
              letterSpacing: "0.5px", // Using direct value since letterSpacing may not be in type
              marginBottom: ds.spacing("8"),
            }}
          >
            Foundation
          </div>

          {/* Logo */}
          <ComponentSection
            id="logo"
            title="Logo"
            description="Brand logo variations and usage guidelines"
            isMobile={isMobile}
          >
            <ShowcaseCard title="Logo Mark (Icon Only)" isMobile={isMobile}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                {/* Logo Mark - Default Theme */}
                <div>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                    }}
                  >
                    Default Theme (On Light Background)
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: ds.spacing(isMobile ? "4" : "6"),
                      padding: ds.spacing(isMobile ? "4" : "6"),
                      backgroundColor: ds.color.background("primary"),
                      borderRadius: ds.radius("md"),
                      border: `1px solid ${ds.color.border("primary")}`,
                    }}
                  >
                    {/* Icon Type */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: '120px', // 7.5rem = 120px
                          height: '120px', // 7.5rem = 120px
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("mark", "Default", "md", "Icon")}
                          alt="Logo Mark Icon"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("tertiary")};">Icon</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                          }}
                        >
                          Icon
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>

                    {/* Text Type */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: '120px', // 7.5rem = 120px
                          height: '120px', // 7.5rem = 120px
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("mark", "Default", "md", "Text")}
                          alt="Logo Mark Text"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("tertiary")};">Text</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                          }}
                        >
                          Text
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logo Mark - Dark Theme */}
                <div>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                    }}
                  >
                    Dark Theme (On Dark Background)
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: ds.spacing(isMobile ? "4" : "6"),
                      padding: ds.spacing(isMobile ? "4" : "6"),
                      backgroundColor: ds.color.text("primary"), // Very dark background for white logos
                      borderRadius: ds.radius("md"),
                    }}
                  >
                    {/* Icon Type */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: '120px', // 7.5rem = 120px
                          height: '120px', // 7.5rem = 120px
                          backgroundColor: "transparent", // Transparent to show white logo clearly on dark background
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("mark", "Dark", "md", "Icon")}
                          alt="Logo Mark Icon Dark"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("white")}; opacity: 0.5;">Icon</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                            color: ds.color.text("white"),
                          }}
                        >
                          Icon
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("white"),
                            opacity: 0.7,
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>

                    {/* Text Type */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: '120px', // 7.5rem = 120px
                          height: '120px', // 7.5rem = 120px
                          backgroundColor: "transparent", // Transparent to show white logo clearly on dark background
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("mark", "Dark", "md", "Text")}
                          alt="Logo Mark Text Dark"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("white")}; opacity: 0.5;">Text</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                            color: ds.color.text("white"),
                          }}
                        >
                          Text
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("white"),
                            opacity: 0.7,
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                    }}
                  >
                    Size Variants (Default Theme, Icon Type)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: ds.spacing("6"),
                      alignItems: "flex-end",
                      padding: ds.spacing("6"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("md"),
                      flexWrap: "wrap",
                    }}
                  >
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                      <div
                        key={size}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ds.spacing("3"),
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: ds.spacing("3"),
                            backgroundColor: ds.color.background("primary"),
                            borderRadius: ds.radius("md"),
                            border: `1px solid ${ds.color.border("primary")}`,
                          }}
                        >
                          <img
                            src={getLogoPath("mark", "Default", size, "Icon")}
                            alt={`Logo Mark ${size}`}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("secondary"),
                            textTransform: "uppercase",
                          }}
                        >
                          {size}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Figma Link */}
                <div
                  style={{
                    padding: ds.spacing("4"),
                    backgroundColor: ds.color.background("secondary"),
                    borderRadius: ds.radius("md"),
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                    }}
                  >
                    Figma:{" "}
                    <a
                      href="https://www.figma.com/design/UR4vV67uL8FWYGlSjGYdFg/Allkons-DS1-MCP-Server?node-id=40001524-18441"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: ds.color.background("brand-default"),
                        textDecoration: "underline",
                      }}
                    >
                      View Logo Mark in Figma
                    </a>
                  </Text>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Logo (Full with Text)">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                {/* Full Logo - Default Theme */}
                <div>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                    }}
                  >
                    Default Theme (On Light Background)
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: ds.spacing(isMobile ? "4" : "6"),
                      padding: ds.spacing(isMobile ? "4" : "6"),
                      backgroundColor: ds.color.background("primary"),
                      borderRadius: ds.radius("md"),
                      border: `1px solid ${ds.color.border("primary")}`,
                    }}
                  >
                    {/* Default Unit */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: '80px', // 80px = 5rem = spacing-20
                          width: "100%",
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("full", "Default", "md", "Default")}
                          alt="Logo Full Default"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("tertiary")};">Default</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                          }}
                        >
                          Default
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>

                    {/* M Seller Unit */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: '80px', // 80px = 5rem = spacing-20
                          width: "100%",
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("full", "Default", "md", "M Seller")}
                          alt="Logo Full M Seller"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("tertiary")};">M Seller</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                          }}
                        >
                          M Seller
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Logo - Dark Theme */}
                <div>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                    }}
                  >
                    Dark Theme (On Dark Background)
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: ds.spacing(isMobile ? "4" : "6"),
                      padding: ds.spacing(isMobile ? "4" : "6"),
                      backgroundColor: ds.color.text("primary"), // Very dark background for white logos
                      borderRadius: ds.radius("md"),
                    }}
                  >
                    {/* Default Unit */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: '80px', // 80px = 5rem = spacing-20
                          width: "100%",
                          backgroundColor: "transparent", // Transparent to show white logo clearly on dark background
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("full", "Dark", "md", "Default")}
                          alt="Logo Full Default Dark"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("white")}; opacity: 0.5;">Default</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                            color: ds.color.text("white"),
                          }}
                        >
                          Default
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("white"),
                            opacity: 0.7,
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>

                    {/* M Seller Unit */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: '80px', // 80px = 5rem = spacing-20
                          width: "100%",
                          backgroundColor: "transparent", // Transparent to show white logo clearly on dark background
                          borderRadius: ds.radius("md"),
                          padding: ds.spacing("4"),
                        }}
                      >
                        <img
                          src={getLogoPath("full", "Dark", "md", "M Seller")}
                          alt="Logo Full M Seller Dark"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="font-size: 12px; color: ${ds.color.text("white")}; opacity: 0.5;">M Seller</div>`;
                            }
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Text
                          style={{
                            fontSize: ds.typography.size("sm"),
                            fontWeight: ds.typography.weight("semibold"),
                            color: ds.color.text("white"),
                          }}
                        >
                          M Seller
                        </Text>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("white"),
                            opacity: 0.7,
                            fontFamily: "monospace",
                            display: "block",
                            marginTop: ds.spacing("1"),
                          }}
                        >
                          md size
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                    }}
                  >
                    Size Variants (Default Theme, Default Unit)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: ds.spacing("6"),
                      alignItems: "flex-end",
                      padding: ds.spacing("6"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("md"),
                      flexWrap: "wrap",
                    }}
                  >
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                      <div
                        key={size}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ds.spacing("3"),
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: size === "xs" ? ds.common.height.buttonSmall : size === "sm" ? ds.common.height.buttonMiddle : size === "md" ? ds.common.height.buttonLarge : size === "lg" ? ds.typography.size('10xl') : ds.typography.size('11xl'),
                            padding: ds.spacing("2"),
                            backgroundColor: ds.color.background("primary"),
                            borderRadius: ds.radius("md"),
                            border: `1px solid ${ds.color.border("primary")}`,
                          }}
                        >
                          <img
                            src={getLogoPath("full", "Default", size, "Default")}
                            alt={`Logo Full ${size}`}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("secondary"),
                            textTransform: "uppercase",
                          }}
                        >
                          {size}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Figma Link */}
                <div
                  style={{
                    padding: ds.spacing("4"),
                    backgroundColor: ds.color.background("secondary"),
                    borderRadius: ds.radius("md"),
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                    }}
                  >
                    Figma:{" "}
                    <a
                      href="https://www.figma.com/design/UR4vV67uL8FWYGlSjGYdFg/Allkons-DS1-MCP-Server?node-id=40001524-18877"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: ds.color.background("brand-default"),
                        textDecoration: "underline",
                      }}
                    >
                      View Logo Full in Figma
                    </a>
                  </Text>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Usage Guidelines">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    File Structure
                  </Text>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                      padding: ds.spacing("4"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("sm"),
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {`public/assets/logos/
├── Logo mark/
│   ├── Theme=Default, Size=xs, Type=Icon.svg
│   ├── Theme=Default, Size=sm, Type=Icon.svg
│   ├── Theme=Default, Size=md, Type=Icon.svg
│   ├── Theme=Dark, Size=md, Type=Icon.svg
│   └── ... (all variants)
└── Logo full/
    ├── Theme=Default, Size=xs, Unit=Default.svg
    ├── Theme=Default, Size=md, Unit=Default.svg
    ├── Theme=Default, Size=md, Unit=M Seller.svg
    └── ... (all variants)`}
                  </div>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    File Naming Pattern
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <div>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("semibold"),
                          marginBottom: ds.spacing("2"),
                        }}
                      >
                        Logo Mark
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color: ds.color.text("secondary"),
                          fontFamily: "monospace",
                          display: "block",
                          padding: ds.spacing("3"),
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("sm"),
                          marginBottom: ds.spacing("2"),
                        }}
                      >
                        Theme=Default, Size=md, Type=Icon.svg
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                        }}
                      >
                        - Theme: Default, Dark, Light
                        <br />
                        - Size: xs, sm, md, lg, xl
                        <br />
                        - Type: Icon, Text
                      </Text>
                    </div>
                    <div>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("semibold"),
                          marginBottom: ds.spacing("2"),
                        }}
                      >
                        Logo Full
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color: ds.color.text("secondary"),
                          fontFamily: "monospace",
                          display: "block",
                          padding: ds.spacing("3"),
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("sm"),
                          marginBottom: ds.spacing("2"),
                        }}
                      >
                        Theme=Default, Size=md, Unit=Default.svg
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                        }}
                      >
                        - Theme: Default, Dark, Light
                        <br />
                        - Size: xs, sm, md, lg, xl
                        <br />
                        - Unit: Default, M Seller
                      </Text>
                    </div>
                  </div>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Usage in Code
                  </Text>
                  <div
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                      padding: ds.spacing("4"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("sm"),
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {`// Using helper function getLogoPath()
<img src={getLogoPath("mark", "Default", "md", "Icon")} />

// Direct path
<img src="/assets/logos/Logo mark/Theme=Default, Size=md, Type=Icon.svg" />

// Logo Full
<img src={getLogoPath("full", "Default", "md", "Default")} />
<img src={getLogoPath("full", "Default", "md", "M Seller")} />`}
                  </div>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Typography */}
          <ComponentSection
            id="typography"
            title="Typography"
            description="Font families, sizes, weights, and line heights"
          >
            <ShowcaseCard title="Font Family">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Noto Sans Thai Looped
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                      display: "block",
                      marginBottom: ds.spacing("4"),
                    }}
                  >
                    {ds.typography.fontFamily.notoSans}
                  </Text>
                  <div
                    style={{
                      fontSize: ds.typography.size("lg"),
                      fontFamily: ds.typography.fontFamily.notoSans,
                      color: ds.color.text("primary"),
                      padding: ds.spacing("4"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("md"),
                    }}
                  >
                    ตัวอย่างข้อความภาษาไทย The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Display Styles">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                {[
                  { name: "Display D1", size: "6xl" },
                  { name: "Display D2", size: "5xl" },
                  { name: "Display D3", size: "4xl" },
                  { name: "Display D4", size: "3xl" },
                  { name: "Display D5", size: "2xl" },
                  { name: "Display D6", size: "xl" },
                ].map((item) => (
                  <div key={item.name}>
                    <div
                      style={{
                        fontSize: ds.typography.size(item.size as any),
                        lineHeight: ds.typography.lineHeight(item.size as any),
                        fontWeight: ds.typography.weight("bold"),
                        color: ds.color.text("primary"),
                        marginBottom: ds.spacing("2"),
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {formatSizeValue(
                        ds.typography.size(item.size as any),
                        TYPOGRAPHY_SIZES[item.size] || 0
                      )}{" "}
                      / {formatSizeValue(
                        ds.typography.lineHeight(item.size as any),
                        LINE_HEIGHTS[item.size] || 0
                      )}{" "}
                      / {ds.typography.weight("bold")}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Heading Styles">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                {[
                  { name: "Heading H1", size: "4xl" },
                  { name: "Heading H2", size: "3xl" },
                  { name: "Heading H3", size: "2xl" },
                  { name: "Heading H4", size: "xl" },
                  { name: "Heading H5", size: "lg" },
                  { name: "Heading H6", size: "md" },
                ].map((item) => (
                  <div key={item.name}>
                    <div
                      style={{
                        fontSize: ds.typography.size(item.size as any),
                        lineHeight: ds.typography.lineHeight(item.size as any),
                        fontWeight: ds.typography.weight("bold"),
                        color: ds.color.text("primary"),
                        marginBottom: ds.spacing("2"),
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {formatSizeValue(
                        ds.typography.size(item.size as any),
                        TYPOGRAPHY_SIZES[item.size] || 0
                      )}{" "}
                      / {formatSizeValue(
                        ds.typography.lineHeight(item.size as any),
                        LINE_HEIGHTS[item.size] || 0
                      )}{" "}
                      / {ds.typography.weight("bold")}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Paragraph Styles">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                {[
                  { name: "Paragraph Big", size: "lg" },
                  { name: "Paragraph Middle", size: "md" },
                  { name: "Paragraph Small", size: "sm" },
                  { name: "Paragraph XSmall", size: "xs" },
                ].map((item) => (
                  <div key={item.name}>
                    <div
                      style={{
                        fontSize: ds.typography.size(item.size as any),
                        lineHeight: ds.typography.lineHeight(item.size as any),
                        fontWeight: ds.typography.weight("regular"),
                        color: ds.color.text("primary"),
                        marginBottom: ds.spacing("2"),
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {formatSizeValue(
                        ds.typography.size(item.size as any),
                        TYPOGRAPHY_SIZES[item.size] || 0
                      )}{" "}
                      / {formatSizeValue(
                        ds.typography.lineHeight(item.size as any),
                        LINE_HEIGHTS[item.size] || 0
                      )}{" "}
                      / {ds.typography.weight("regular")}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Font Weights">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: ds.spacing("6"),
                }}
              >
                {[
                  { name: "Thin", weight: "thin" },
                  { name: "Light", weight: "light" },
                  { name: "Regular", weight: "regular" },
                  { name: "Medium", weight: "medium" },
                  { name: "Semibold", weight: "semibold" },
                  { name: "Bold", weight: "bold" },
                ].map((item) => (
                  <div key={item.name} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: ds.typography.size("2xl"),
                        fontWeight: ds.typography.weight(item.weight as any),
                        color: ds.color.text("primary"),
                        marginBottom: ds.spacing("2"),
                      }}
                    >
                      Aa
                    </div>
                    <Text
                      style={{
                        fontSize: ds.typography.size("sm"),
                        fontWeight: ds.typography.weight("semibold"),
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                        display: "block",
                        marginTop: ds.spacing("1"),
                      }}
                    >
                      {ds.typography.weight(item.weight as any)}
                    </Text>
                  </div>
                ))}
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Color System */}
          <ComponentSection
            id="color-system"
            title="Color system"
            description="Color palette and semantic color tokens"
            isMobile={isMobile}
          >
            <ShowcaseCard title="Brand Colors" isMobile={isMobile}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : `repeat(auto-fill, minmax(120px, 1fr))`,
                  gap: ds.spacing("4"),
                }}
              >
                {/* Brand Primary Colors */}
                <div style={{ minWidth: 0 }}>
                  <div
                    className="color-swatch"
                    style={{
                      width: "100%",
                      minWidth: "120px",
                      height: "80px",
                      minHeight: "80px",
                      backgroundColor: ds.color.background("brand-default"),
                      borderRadius: ds.radius("md"),
                      marginBottom: ds.spacing("2"),
                      border: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
                      display: "block",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("primary"),
                    }}
                  >
                    Brand Primary
                  </div>
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.color.background("brand-default")}
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="System Colors">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : `repeat(auto-fill, minmax(120px, 1fr))`,
                  gap: ds.spacing("4"),
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    className="color-swatch"
                    style={{
                      width: "100%",
                      minWidth: "120px",
                      height: "80px",
                      minHeight: "80px",
                      backgroundColor: ds.color.system("success"),
                      borderRadius: ds.radius("md"),
                      marginBottom: ds.spacing("2"),
                      border: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
                      display: "block",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("primary"),
                    }}
                  >
                    Success
                  </div>
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.color.system("success")}
                  </div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    className="color-swatch"
                    style={{
                      width: "100%",
                      minWidth: "120px",
                      height: "80px",
                      minHeight: "80px",
                      backgroundColor: ds.color.system("error"),
                      borderRadius: ds.radius("md"),
                      marginBottom: ds.spacing("2"),
                      border: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
                      display: "block",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("primary"),
                    }}
                  >
                    Error
                  </div>
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.color.system("error")}
                  </div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    className="color-swatch"
                    style={{
                      width: "100%",
                      minWidth: "120px",
                      height: "80px",
                      minHeight: "80px",
                      backgroundColor: ds.color.system("warning"),
                      borderRadius: ds.radius("md"),
                      marginBottom: ds.spacing("2"),
                      border: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
                      display: "block",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("primary"),
                    }}
                  >
                    Warning
                  </div>
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.color.system("warning")}
                  </div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    className="color-swatch"
                    style={{
                      width: "100%",
                      minWidth: "120px",
                      height: "80px",
                      minHeight: "80px",
                      backgroundColor: ds.color.system("info"),
                      borderRadius: ds.radius("md"),
                      marginBottom: ds.spacing("2"),
                      border: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
                      display: "block",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("primary"),
                    }}
                  >
                    Info
                  </div>
                  <div
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.color.system("info")}
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Semantic Colors - Text">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: ds.spacing("4"),
                }}
              >
                {[
                  { name: "Primary", token: "primary" },
                  { name: "Secondary", token: "secondary" },
                  { name: "Tertiary", token: "tertiary" },
                  { name: "Placeholder", token: "placeholder" },
                  { name: "Disabled", token: "disabled" },
                  { name: "Brand", token: "brand-default" },
                ].map((item) => (
                  <div key={item.token}>
                    <div
                      style={{
                        height: ds.spacing('15'), // 60px = 3.75rem = spacing-15
                        backgroundColor: ds.color.text(item.token as any),
                        borderRadius: ds.radius("md"),
                        marginBottom: ds.spacing("2"),
                        border: `1px solid ${ds.color.border("primary")}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: item.token === "primary" ? ds.color.text("white") : ds.color.text("white"),
                          fontWeight: ds.typography.weight("semibold"),
                        }}
                      >
                        Sample
                      </Text>
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {ds.color.text(item.token as any)}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Semantic Colors - Background">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: ds.spacing("4"),
                }}
              >
                {[
                  { name: "Primary", token: "primary" },
                  { name: "Secondary", token: "secondary" },
                  { name: "Brand", token: "brand-default" },
                ].map((item) => (
                  <div key={item.token}>
                    <div
                      style={{
                        height: ds.spacing('15'), // 60px = 3.75rem = spacing-15
                        backgroundColor: ds.color.background(item.token as any),
                        borderRadius: ds.radius("md"),
                        marginBottom: ds.spacing("2"),
                        border: `1px solid ${ds.color.border("primary")}`,
                      }}
                    />
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {ds.color.background(item.token as any)}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Semantic Colors - Border">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: ds.spacing("4"),
                }}
              >
                {[
                  { name: "Primary", token: "primary" },
                  { name: "Secondary", token: "secondary" },
                  { name: "Brand", token: "brand-default" },
                ].map((item) => (
                  <div key={item.token}>
                    <div
                      style={{
                        height: ds.spacing('15'), // 60px = 3.75rem = spacing-15
                        backgroundColor: ds.color.background("primary"),
                        borderRadius: ds.radius("md"),
                        marginBottom: ds.spacing("2"),
                        border: `2px solid ${ds.color.border(item.token as any)}`,
                      }}
                    />
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {ds.color.border(item.token as any)}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Spacing */}
          <ComponentSection
            id="spacing"
            title="Spacing"
            description="Consistent spacing scale for layout and components"
          >
            <ShowcaseCard title="Spacing Scale">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                {["1", "2", "4", "6", "8", "12", "16"].map((size) => (
                  <div
                    key={size}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <div
                      style={{
                        width: ds.spacing('15'), // 60px = 3.75rem = spacing-15
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("secondary"),
                      }}
                    >
                      {size}
                    </div>
                    <div
                      style={{
                        height: ds.common.icon.medium,
                        width: ds.spacing(size as any),
                        backgroundColor: ds.color.background("brand-default"),
                        borderRadius: ds.radius("sm"),
                      }}
                    />
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("tertiary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {SPACING_VALUES[size]
                        ? formatRemValue(ds.spacing(size as any), SPACING_VALUES[size])
                        : ds.spacing(size as any)}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Border Radius */}
          <ComponentSection
            id="border-radius"
            title="Border radius"
            description="Border radius tokens for consistent rounded corners"
          >
            <ShowcaseCard title="Radius Scale" isMobile={isMobile}>
              <div
                style={{
                  display: "flex",
                  gap: ds.spacing("6"),
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {["xs", "sm", "md", "lg", "xl", "full"].map((size) => (
                  <div key={size} style={{ textAlign: "center", minWidth: 0 }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        minWidth: "80px",
                        minHeight: "80px",
                        backgroundColor: ds.color.background("brand-default"),
                        borderRadius: ds.radius(size as any),
                        marginBottom: ds.spacing("2"),
                        border: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                        marginBottom: ds.spacing("1"),
                      }}
                    >
                      {size}
                    </div>
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                      }}
                    >
                      {RADIUS_VALUES[size]
                        ? formatRemValue(ds.radius(size as any), RADIUS_VALUES[size])
                        : ds.radius(size as any)}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Grid System */}
          <ComponentSection
            id="grid-system"
            title="Grid system"
            description="Layout grid system for consistent page structure"
          >
            <ShowcaseCard title="Breakpoints & Devices">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                {[
                  {
                    token: "sm" as const,
                    pixel: 640,
                    rem: "40rem",
                    device: "Small devices",
                    examples: "Landscape phones, large phones",
                  },
                  {
                    token: "md" as const,
                    pixel: 768,
                    rem: "48rem",
                    device: "Medium devices",
                    examples: "Tablets, small laptops",
                  },
                  {
                    token: "lg" as const,
                    pixel: 1024,
                    rem: "64rem",
                    device: "Large devices",
                    examples: "Desktops, laptops",
                  },
                  {
                    token: "xl" as const,
                    pixel: 1280,
                    rem: "80rem",
                    device: "Extra large devices",
                    examples: "Large desktops, wide screens",
                  },
                  {
                    token: "2xl" as const,
                    pixel: 1536,
                    rem: "96rem",
                    device: "2X Extra large devices",
                    examples: "Ultra-wide screens, large displays",
                  },
                ].map((bp, index) => (
                  <div
                    key={bp.token}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ds.spacing("6"),
                      padding: ds.spacing("6"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("md"),
                      border: `2px solid ${ds.color.border("primary")}`,
                    }}
                  >
                    {/* Visual Width Bar */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: `${Math.min((bp.pixel / 1536) * 300, 300)}px`,
                        height: ds.spacing('15'), // 60px = 3.75rem = spacing-15
                        backgroundColor: ds.color.background("brand-default"),
                        borderRadius: ds.radius("sm"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        minWidth: '80px', // 80px = 5rem = spacing-20
                      }}
                    >
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          fontWeight: ds.typography.weight("bold"),
                          color: ds.color.text("white"),
                          textAlign: "center",
                          padding: `0 ${ds.spacing("2")}`,
                        }}
                      >
                        {bp.pixel}px
                      </Text>
                      {/* Device Icon Indicator */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: ds.typography.size('3xl'), // 24px = size-3xl
                          height: ds.common.icon.medium,
                          backgroundColor: ds.color.background("primary"),
                          border: `2px solid ${ds.color.border("brand-default")}`,
                          borderRadius: ds.radius("full"),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: ds.typography.size("xs"),
                        }}
                      >
                        {bp.token === "sm" && "📱"}
                        {bp.token === "md" && "📱"}
                        {bp.token === "lg" && "💻"}
                        {bp.token === "xl" && "🖥️"}
                        {bp.token === "2xl" && "🖥️"}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ds.spacing("3"),
                          marginBottom: ds.spacing("2"),
                        }}
                      >
                        <Text
                          style={{
                            fontSize: ds.typography.size("lg"),
                            fontWeight: ds.typography.weight("bold"),
                            color: ds.color.text("primary"),
                          }}
                        >
                          {bp.token.toUpperCase()}
                        </Text>
                        <div
                          style={{
                            padding: `${ds.spacing("1")} ${ds.spacing("2")}`,
                            backgroundColor: ds.color.background("primary"),
                            border: `1px solid ${ds.color.border("primary")}`,
                            borderRadius: ds.radius("sm"),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: ds.typography.size("xs"),
                              fontWeight: ds.typography.weight("semibold"),
                              color: ds.color.text("secondary"),
                              fontFamily: "monospace",
                            }}
                          >
                            {ds.breakpoint.get(bp.token as any)}
                          </Text>
                        </div>
                      </div>
                      <Text
                        style={{
                          fontSize: ds.typography.size("md"),
                          fontWeight: ds.typography.weight("semibold"),
                          color: ds.color.text("primary"),
                          marginBottom: ds.spacing("1"),
                        }}
                      >
                        {bp.device}
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color: ds.color.text("secondary"),
                          marginBottom: ds.spacing("2"),
                        }}
                      >
                        {bp.examples}
                      </Text>
                      <div
                        style={{
                          display: "flex",
                          gap: ds.spacing("4"),
                          flexWrap: "wrap",
                        }}
                      >
                        <div>
                          <Text
                            style={{
                              fontSize: ds.typography.size("xs"),
                              color: ds.color.text("tertiary"),
                              display: "block",
                            }}
                          >
                            Pixel:
                          </Text>
                          <Text
                            style={{
                              fontSize: ds.typography.size("sm"),
                              fontWeight: ds.typography.weight("semibold"),
                              color: ds.color.text("primary"),
                              fontFamily: "monospace",
                            }}
                          >
                            {ds.breakpoint.value(bp.token as any)}
                          </Text>
                        </div>
                        <div>
                          <Text
                            style={{
                              fontSize: ds.typography.size("xs"),
                              color: ds.color.text("tertiary"),
                              display: "block",
                            }}
                          >
                            Rem:
                          </Text>
                          <Text
                            style={{
                              fontSize: ds.typography.size("sm"),
                              fontWeight: ds.typography.weight("semibold"),
                              color: ds.color.text("primary"),
                              fontFamily: "monospace",
                            }}
                          >
                            {ds.breakpoint.rem(bp.token as any)}
                          </Text>
                        </div>
                        <div>
                          <Text
                            style={{
                              fontSize: ds.typography.size("xs"),
                              color: ds.color.text("tertiary"),
                              display: "block",
                            }}
                          >
                            Number:
                          </Text>
                          <Text
                            style={{
                              fontSize: ds.typography.size("sm"),
                              fontWeight: ds.typography.weight("semibold"),
                              color: ds.color.text("primary"),
                              fontFamily: "monospace",
                            }}
                          >
                            {ds.breakpoint.pixel(bp.token as any)}px
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Breakpoint Scale Visualization">
              <div
                style={{
                  padding: ds.spacing("6"),
                  backgroundColor: ds.color.background("secondary"),
                  borderRadius: ds.radius("md"),
                  overflowX: "auto",
                }}
              >
                {/* Scale Bar Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "100%",
                    minHeight: '200px', // 200px = 12.5rem = spacing-50
                    paddingBottom: ds.spacing("12"),
                  }}
                >
                  {/* Scale Bar Background */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: '80px', // 80px = 5rem = spacing-20
                      backgroundColor: ds.color.background("primary"),
                      borderRadius: ds.radius("sm"),
                      border: `2px solid ${ds.color.border("primary")}`,
                      marginTop: ds.spacing("10"),
                    }}
                  >
                    {/* Breakpoint Markers & Labels */}
                    {[
                      { token: "sm" as const, pixel: 640, device: "📱 Mobile", color: ds.color.background("brand-default") },
                      { token: "md" as const, pixel: 768, device: "📱 Tablet", color: ds.color.background("brand-default") },
                      { token: "lg" as const, pixel: 1024, device: "💻 Desktop", color: ds.color.background("brand-default") },
                      { token: "xl" as const, pixel: 1280, device: "🖥️ Large", color: ds.color.background("brand-default") },
                      { token: "2xl" as const, pixel: 1536, device: "🖥️ Ultra-wide", color: ds.color.background("brand-default") },
                    ].map((bp) => {
                      // Calculate position relative to 1536px (2xl)
                      const maxWidth = 1536;
                      const positionPercent = Math.min((bp.pixel / maxWidth) * 100, 100);
                      const displayWidth = Math.min((bp.pixel / maxWidth) * 800, 800); // Visual width max 800px

                      return (
                        <div
                          key={bp.token}
                          style={{
                            position: "absolute",
                            left: `${positionPercent}%`,
                            transform: "translateX(-50%)",
                            zIndex: 10,
                          }}
                        >
                          {/* Marker Line */}
                          <div
                            style={{
                              width: ds.spacing('3'), // 3px ≈ 0.75rem = spacing-3
                              height: '80px', // 80px = 5rem = spacing-20
                              backgroundColor: bp.color,
                              borderRadius: ds.radius("xs"),
                            }}
                          >
                            {/* Token Label Above */}
                            <div
                              style={{
                                position: "absolute",
                                top: "-32px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              <div
                                style={{
                                  padding: `${ds.spacing("1")} ${ds.spacing("2")}`,
                                  backgroundColor: bp.color,
                                  borderRadius: ds.radius("sm"),
                                  marginBottom: ds.spacing("1"),
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: ds.typography.size("xs"),
                                    fontWeight: ds.typography.weight("bold"),
                                    color: ds.color.text("white"),
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {bp.token}
                                </Text>
                              </div>
                              <Text
                                style={{
                                  fontSize: ds.typography.size("2xs"),
                                  color: ds.color.text("secondary"),
                                  fontFamily: "monospace",
                                }}
                              >
                                {bp.pixel}px
                              </Text>
                            </div>

                            {/* Device Label Below */}
                            <div
                              style={{
                                position: "absolute",
                                bottom: "-24px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: ds.typography.size("xs"),
                                  color: ds.color.text("secondary"),
                                }}
                              >
                                {bp.device}
                              </Text>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Scale Indicator (0 - 1536) */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: ds.spacing("8"),
                      padding: `0 ${ds.spacing("2")}`,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("tertiary"),
                        fontFamily: "monospace",
                      }}
                    >
                      0px
                    </Text>
                    <Text
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("tertiary"),
                        fontFamily: "monospace",
                      }}
                    >
                      1536px (2xl)
                    </Text>
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Breakpoint Reference Table">
              <div
                style={{
                  overflowX: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: ds.color.background("secondary"),
                        borderBottom: `2px solid ${ds.color.border("primary")}`,
                      }}
                    >
                      <th
                        style={{
                          padding: ds.spacing("4"),
                          textAlign: "left",
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("bold"),
                          color: ds.color.text("primary"),
                        }}
                      >
                        Breakpoint
                      </th>
                      <th
                        style={{
                          padding: ds.spacing("4"),
                          textAlign: "left",
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("bold"),
                          color: ds.color.text("primary"),
                        }}
                      >
                        Device
                      </th>
                      <th
                        style={{
                          padding: ds.spacing("4"),
                          textAlign: "left",
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("bold"),
                          color: ds.color.text("primary"),
                        }}
                      >
                        Pixel
                      </th>
                      <th
                        style={{
                          padding: ds.spacing("4"),
                          textAlign: "left",
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("bold"),
                          color: ds.color.text("primary"),
                        }}
                      >
                        Rem
                      </th>
                      <th
                        style={{
                          padding: ds.spacing("4"),
                          textAlign: "left",
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("bold"),
                          color: ds.color.text("primary"),
                        }}
                      >
                        CSS Variable
                      </th>
                      <th
                        style={{
                          padding: ds.spacing("4"),
                          textAlign: "left",
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("bold"),
                          color: ds.color.text("primary"),
                        }}
                      >
                        Examples
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        token: "sm" as const,
                        device: "Small devices",
                        pixel: 640,
                        rem: "40rem",
                        examples: "Landscape phones",
                      },
                      {
                        token: "md" as const,
                        device: "Medium devices",
                        pixel: 768,
                        rem: "48rem",
                        examples: "Tablets, small laptops",
                      },
                      {
                        token: "lg" as const,
                        device: "Large devices",
                        pixel: 1024,
                        rem: "64rem",
                        examples: "Desktops, laptops",
                      },
                      {
                        token: "xl" as const,
                        device: "Extra large devices",
                        pixel: 1280,
                        rem: "80rem",
                        examples: "Large desktops",
                      },
                      {
                        token: "2xl" as const,
                        device: "2X Extra large devices",
                        pixel: 1536,
                        rem: "96rem",
                        examples: "Ultra-wide screens",
                      },
                    ].map((bp, index) => (
                      <tr
                        key={bp.token}
                        style={{
                          borderBottom: `1px solid ${ds.color.border("primary")}`,
                          backgroundColor:
                            index % 2 === 0
                              ? ds.color.background("primary")
                              : ds.color.background("secondary"),
                        }}
                      >
                        <td
                          style={{
                            padding: ds.spacing("4"),
                          }}
                        >
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: ds.spacing("2"),
                              padding: `${ds.spacing("1")} ${ds.spacing("2")}`,
                              backgroundColor: ds.color.background("brand-default"),
                              borderRadius: ds.radius("sm"),
                            }}
                          >
                            <Text
                              style={{
                                fontSize: ds.typography.size("sm"),
                                fontWeight: ds.typography.weight("bold"),
                                color: ds.color.text("white"),
                                fontFamily: "monospace",
                              }}
                            >
                              {bp.token}
                            </Text>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: ds.spacing("4"),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: ds.typography.size("md"),
                              fontWeight: ds.typography.weight("semibold"),
                              color: ds.color.text("primary"),
                            }}
                          >
                            {bp.device}
                          </Text>
                        </td>
                        <td
                          style={{
                            padding: ds.spacing("4"),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: ds.typography.size("sm"),
                              fontFamily: "monospace",
                              color: ds.color.text("primary"),
                            }}
                          >
                            {ds.breakpoint.value(bp.token as any)}
                          </Text>
                        </td>
                        <td
                          style={{
                            padding: ds.spacing("4"),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: ds.typography.size("sm"),
                              fontFamily: "monospace",
                              color: ds.color.text("primary"),
                            }}
                          >
                            {ds.breakpoint.rem(bp.token as any)}
                          </Text>
                        </td>
                        <td
                          style={{
                            padding: ds.spacing("4"),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: ds.typography.size("xs"),
                              fontFamily: "monospace",
                              color: ds.color.text("secondary"),
                            }}
                          >
                            {ds.breakpoint.get(bp.token as any)}
                          </Text>
                        </td>
                        <td
                          style={{
                            padding: ds.spacing("4"),
                          }}
                        >
                          <Text
                            style={{
                              fontSize: ds.typography.size("sm"),
                              color: ds.color.text("secondary"),
                            }}
                          >
                            {bp.examples}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Current Container Max Width">
              <div
                style={{
                  padding: ds.spacing("6"),
                  backgroundColor: ds.color.background("secondary"),
                  borderRadius: ds.radius("md"),
                }}
              >
                <div
                  style={{
                    marginBottom: ds.spacing("4"),
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Container Max Width
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.common.layout.containerMaxWidth}
                  </Text>
                </div>
                <div
                  style={{
                    height: ds.common.height.buttonMiddle, // 40px = button middle height
                    width: "100%",
                    maxWidth: ds.common.layout.containerMaxWidth, // Use existing token
                    backgroundColor: ds.color.background("brand-default"),
                    borderRadius: ds.radius("sm"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("white"),
                    }}
                  >
                    1280px (Container Max Width)
                  </Text>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Shadow */}
          <ComponentSection
            id="shadow"
            title="Shadow"
            description="Shadow tokens for elevation and depth"
          >
            <ShowcaseCard title="Shadow Scale">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div
                  style={{
                    padding: ds.spacing("6"),
                    backgroundColor: ds.color.background("primary"),
                    borderRadius: ds.radius("md"),
                    boxShadow: ds.component.modal.shadow(), // Use component shadow token
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                    }}
                  >
                    Small Shadow
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    boxShadow: ds.component.modal.shadow() // Use component shadow token
                  </Text>
                </div>
                <div
                  style={{
                    padding: ds.spacing("6"),
                    backgroundColor: ds.color.background("primary"),
                    borderRadius: ds.radius("md"),
                    boxShadow: ds.component.modal.shadow(), // Use component shadow token
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                    }}
                  >
                    Medium Shadow
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    boxShadow: ds.component.modal.shadow() // Use component shadow token
                  </Text>
                </div>
                <div
                  style={{
                    padding: ds.spacing("6"),
                    backgroundColor: ds.color.background("primary"),
                    borderRadius: ds.radius("md"),
                    boxShadow: ds.component.modal.shadow(),
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                    }}
                  >
                    Large Shadow (Modal)
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    boxShadow: ds.component.modal.shadow()
                  </Text>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Icons */}
          <ComponentSection
            id="icons"
            title="Icons"
            description="Remix Icon library integration"
          >
            <ShowcaseCard title="Icon Examples">
              <div
                style={{
                  display: "flex",
                  gap: ds.spacing("6"),
                  flexWrap: "wrap",
                }}
              >
                {[
                  "ri-home-line",
                  "ri-user-line",
                  "ri-settings-line",
                  "ri-search-line",
                  "ri-add-line",
                  "ri-check-line",
                ].map((iconClass) => (
                  <div
                    key={iconClass}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("2"),
                    }}
                  >
                    <i
                      className={iconClass}
                      style={{
                        fontSize: ds.typography.size("2xl"),
                        color: ds.color.text("primary"),
                      }}
                    />
                    <div
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        fontFamily: "monospace",
                        textAlign: "center",
                      }}
                    >
                      {iconClass}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Layout */}
          <ComponentSection
            id="layout"
            title="Layout"
            description="Layout patterns and container specifications"
          >
            <ShowcaseCard title="Layout Patterns">
              <div
                style={{
                  padding: ds.spacing("8"),
                  backgroundColor: ds.color.background("secondary"),
                  borderRadius: ds.radius("md"),
                }}
              >
                <div style={{ marginBottom: ds.spacing("6") }}>
                  <Text
                    style={{
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Container Max Width
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.common.layout.containerMaxWidth}
                  </Text>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("md"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Input Container Width
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    {ds.common.layout.inputContainerWidth}
                  </Text>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Design Annotation */}
          <ComponentSection
            id="design-annotation"
            title="Design annotation"
            description="Guidelines for annotating designs and specifications"
          >
            <ShowcaseCard title="Design Annotation Guidelines">
              <div
                style={{
                  padding: ds.spacing("8"),
                  backgroundColor: ds.color.background("secondary"),
                  borderRadius: ds.radius("md"),
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: ds.typography.size("md"),
                    color: ds.color.text("secondary"),
                    fontStyle: "italic",
                  }}
                >
                  Design annotation guidelines will be added here
                </Text>
                <div
                  style={{
                    marginTop: ds.spacing("4"),
                    fontSize: ds.typography.size("sm"),
                    color: ds.color.text("tertiary"),
                  }}
                >
                  (Pending: Design annotation documentation)
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>
        </div>

        {/* Base Components Section */}
        <div style={{ marginBottom: ds.spacing("16") }}>
          <div
            style={{
              fontSize: ds.typography.size("xs"),
              fontWeight: ds.typography.weight("semibold"),
              color: ds.color.text("tertiary"),
              textTransform: "uppercase",
              letterSpacing: "0.5px", // Using direct value since letterSpacing may not be in type
              marginBottom: ds.spacing("8"),
            }}
          >
            Base Components
          </div>

          {/* Button */}
          <ComponentSection
            id="button"
            title="Button"
            description="Buttons are used to trigger actions and navigate through the interface"
          >
            <ShowcaseCard title="Primary Buttons - Brand">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="primary" color="brand" size="small">
                  Button
                </Button>
                <Button variant="primary" color="brand" size="middle">
                  Button
                </Button>
                <Button variant="primary" color="brand" size="large">
                  Button
                </Button>
                <Button variant="primary" color="brand" size="middle" disabled>
                  Disabled
                </Button>
                <Button
                  variant="primary"
                  color="brand"
                  size="middle"
                  loading={loading}
                  onClick={() => setLoading(!loading)}
                >
                  {loading ? "Loading" : "Loading State"}
                </Button>
                <Button variant="primary" color="brand" size="middle" icon={<i className="ri-search-line" />}>
                  With Icon
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Primary Buttons - Error">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="primary" color="error" size="small">
                  Button
                </Button>
                <Button variant="primary" color="error" size="middle">
                  Button
                </Button>
                <Button variant="primary" color="error" size="large">
                  Button
                </Button>
                <Button variant="primary" color="error" size="middle" disabled>
                  Disabled
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Secondary Buttons - Brand">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="secondary" color="brand" size="small">
                  Button
                </Button>
                <Button variant="secondary" color="brand" size="middle">
                  Button
                </Button>
                <Button variant="secondary" color="brand" size="large">
                  Button
                </Button>
                <Button variant="secondary" color="brand" size="middle" disabled>
                  Disabled
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Secondary Buttons - Neutral">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="secondary" color="neutral" size="small">
                  Button
                </Button>
                <Button variant="secondary" color="neutral" size="middle">
                  Button
                </Button>
                <Button variant="secondary" color="neutral" size="large">
                  Button
                </Button>
                <Button variant="secondary" color="neutral" size="middle" disabled>
                  Disabled
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Secondary Buttons - Error">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="secondary" color="error" size="small">
                  Button
                </Button>
                <Button variant="secondary" color="error" size="middle">
                  Button
                </Button>
                <Button variant="secondary" color="error" size="large">
                  Button
                </Button>
                <Button variant="secondary" color="error" size="middle" disabled>
                  Disabled
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Tertiary Buttons - Brand">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="tertiary" color="brand" size="small">
                  Button
                </Button>
                <Button variant="tertiary" color="brand" size="middle">
                  Button
                </Button>
                <Button variant="tertiary" color="brand" size="large">
                  Button
                </Button>
                <Button variant="tertiary" color="brand" size="middle" disabled>
                  Disabled
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Tertiary Buttons - Neutral">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="tertiary" color="neutral" size="small">
                  Button
                </Button>
                <Button variant="tertiary" color="neutral" size="middle">
                  Button
                </Button>
                <Button variant="tertiary" color="neutral" size="large">
                  Button
                </Button>
                <Button variant="tertiary" color="neutral" size="middle" disabled>
                  Disabled
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Tertiary Buttons - Error">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="tertiary" color="error" size="small">
                  Button
                </Button>
                <Button variant="tertiary" color="error" size="middle">
                  Button
                </Button>
                <Button variant="tertiary" color="error" size="large">
                  Button
                </Button>
                <Button variant="tertiary" color="error" size="middle" disabled>
                  Disabled
                </Button>
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Icon Only Buttons - Primary">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="primary" color="brand" size="small" icon={<i className="ri-search-line" />} />
                <Button variant="primary" color="brand" size="middle" icon={<i className="ri-search-line" />} />
                <Button variant="primary" color="brand" size="large" icon={<i className="ri-search-line" />} />
                <Button variant="primary" color="brand" size="middle" icon={<i className="ri-search-line" />} disabled />
                <Button variant="primary" color="error" size="middle" icon={<i className="ri-delete-bin-line" />} />
                <Button variant="primary" color="warning" size="middle" icon={<i className="ri-alert-line" />} />
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Icon Only Buttons - Secondary">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="secondary" color="brand" size="small" icon={<i className="ri-search-line" />} />
                <Button variant="secondary" color="brand" size="middle" icon={<i className="ri-search-line" />} />
                <Button variant="secondary" color="brand" size="large" icon={<i className="ri-search-line" />} />
                <Button variant="secondary" color="brand" size="middle" icon={<i className="ri-search-line" />} disabled />
                <Button variant="secondary" color="neutral" size="middle" icon={<i className="ri-settings-line" />} />
                <Button variant="secondary" color="error" size="middle" icon={<i className="ri-delete-bin-line" />} />
                <Button variant="secondary" color="warning" size="middle" icon={<i className="ri-alert-line" />} />
              </Space>
            </ShowcaseCard>

            <ShowcaseCard title="Icon Only Buttons - Tertiary">
              <Space wrap size={[ds.spacing("6") as any, ds.spacing("6") as any]}>
                <Button variant="tertiary" color="brand" size="small" icon={<i className="ri-search-line" />} />
                <Button variant="tertiary" color="brand" size="middle" icon={<i className="ri-search-line" />} />
                <Button variant="tertiary" color="brand" size="large" icon={<i className="ri-search-line" />} />
                <Button variant="tertiary" color="brand" size="middle" icon={<i className="ri-search-line" />} disabled />
                <Button variant="tertiary" color="neutral" size="middle" icon={<i className="ri-settings-line" />} />
                <Button variant="tertiary" color="error" size="middle" icon={<i className="ri-delete-bin-line" />} />
                <Button variant="tertiary" color="warning" size="middle" icon={<i className="ri-alert-line" />} />
              </Space>
            </ShowcaseCard>
          </ComponentSection>

          {/* Input */}
          <ComponentSection
            id="input"
            title="Input"
            description="Input fields allow users to enter and edit text"
          >
            <ShowcaseCard title="Default State">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                  maxWidth: '400px', // 400px = 25rem ≈ spacing-100 (or use appropriate token)
                }}
              >
                <Input label="Label" placeholder="Placeholder text" />
                <Input
                  label="Label"
                  placeholder="Placeholder text"
                  required
                />
                <Input
                  label="Label"
                  placeholder="Placeholder text"
                  helperText="Helper text goes here"
                />
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Error State">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                  maxWidth: '400px', // 400px = 25rem ≈ spacing-100 (or use appropriate token)
                }}
              >
                <Input
                  label="Label"
                  placeholder="Placeholder text"
                  error="Error message goes here"
                  defaultValue="Invalid input"
                />
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Textarea */}
          <ComponentSection
            id="textarea"
            title="Textarea"
            description="Textarea fields allow users to enter and edit multiple lines of text"
          >
            <ShowcaseCard title="Default State">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                  maxWidth: '400px', // 400px = 25rem ≈ spacing-100 (or use appropriate token)
                }}
              >
                <Textarea
                  label="Label"
                  placeholder="Placeholder text"
                  rows={4}
                />
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Select */}
          <ComponentSection
            id="select"
            title="Select"
            description="Select dropdowns allow users to choose from a list of options"
          >
            <ShowcaseCard title="Default State">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                  maxWidth: '400px', // 400px = 25rem ≈ spacing-100 (or use appropriate token)
                }}
              >
                <Select
                  label="Label"
                  placeholder="Select an option"
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                    { label: "Option 3", value: "3" },
                  ]}
                />
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Toggle */}
          <ComponentSection
            id="toggle"
            title="Toggle"
            description="Toggle switches allow users to turn options on or off"
          >
            {/* Sizes */}
            <ShowcaseCard title="Sizes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                {(["small", "middle", "large"] as const).map((size) => {
                  const stateKey1 = `circular${size.charAt(0).toUpperCase() + size.slice(1)}1` as keyof typeof toggleStates;
                  const stateKey2 = `circular${size.charAt(0).toUpperCase() + size.slice(1)}2` as keyof typeof toggleStates;

                  return (
                    <div key={size}>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("semibold"),
                          color: ds.color.text("secondary"),
                          marginBottom: ds.spacing("4"),
                          display: "block",
                          textTransform: "capitalize",
                        }}
                      >
                        {size}
                      </Text>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ds.spacing("4"),
                        }}
                      >
                        <Toggle
                          variant="circular"
                          size={size}
                          checked={toggleStates[stateKey1] as boolean}
                          onChange={(checked) =>
                            setToggleStates({
                              ...toggleStates,
                              [stateKey1]: checked,
                            })
                          }
                          label="Toggle option"
                        />
                        <Toggle
                          variant="circular"
                          size={size}
                          checked={toggleStates[stateKey2] as boolean}
                          onChange={(checked) =>
                            setToggleStates({
                              ...toggleStates,
                              [stateKey2]: checked,
                            })
                          }
                          label="Toggle option"
                          description="This is a supporting text that provides additional context"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ShowcaseCard>

            {/* Variants */}
            <ShowcaseCard title="Variants">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Circular
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Toggle
                      variant="circular"
                      checked={toggleStates.circularSmall1}
                      onChange={(checked) =>
                        setToggleStates({ ...toggleStates, circularSmall1: checked })
                      }
                      label="Toggle option"
                    />
                    <Toggle
                      variant="circular"
                      checked={toggleStates.circularSmall2}
                      onChange={(checked) =>
                        setToggleStates({ ...toggleStates, circularSmall2: checked })
                      }
                      label="Toggle option"
                      description="This is a supporting text that provides additional context"
                    />
                  </div>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Rectangular
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Toggle
                      variant="rectangular"
                      checked={toggleStates.rectangular1}
                      onChange={(checked) =>
                        setToggleStates({ ...toggleStates, rectangular1: checked })
                      }
                      label="Toggle option"
                    />
                    <Toggle
                      variant="rectangular"
                      checked={toggleStates.rectangular2}
                      onChange={(checked) =>
                        setToggleStates({ ...toggleStates, rectangular2: checked })
                      }
                      label="Toggle option"
                      description="This is a supporting text that provides additional context"
                    />
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            {/* All States */}
            <ShowcaseCard title="All States">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Unchecked
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Toggle variant="circular" checked={false} label="Unchecked" />
                    <Toggle variant="circular" checked={false} disabled label="Unchecked Disabled" />
                    <Toggle
                      variant="circular"
                      checked={false}
                      label="Unchecked with description"
                      description="This is a supporting text"
                    />
                  </div>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Checked
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Toggle variant="circular" checked={true} label="Checked" />
                    <Toggle variant="circular" checked={true} disabled label="Checked Disabled" />
                    <Toggle
                      variant="circular"
                      checked={true}
                      label="Checked with description"
                      description="This is a supporting text"
                    />
                  </div>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Checkbox */}
          <ComponentSection
            id="checkbox"
            title="Checkbox"
            description="Checkboxes allow users to select one or more options from a set"
          >
            {/* Sizes */}
            <ShowcaseCard title="Sizes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                {(["small", "middle", "large"] as const).map((size) => {
                  const stateKey1 = `${size}1` as keyof typeof checkboxStates;
                  const stateKey2 = `${size}2` as keyof typeof checkboxStates;

                  return (
                    <div key={size}>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("semibold"),
                          color: ds.color.text("secondary"),
                          marginBottom: ds.spacing("4"),
                          display: "block",
                          textTransform: "capitalize",
                        }}
                      >
                        {size}
                      </Text>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ds.spacing("4"),
                        }}
                      >
                        <Checkbox
                          size={size}
                          checked={checkboxStates[stateKey1] as boolean}
                          onChange={(checked) =>
                            setCheckboxStates({
                              ...checkboxStates,
                              [stateKey1]: checked,
                            })
                          }
                          label="Checkbox option"
                        />
                        <Checkbox
                          size={size}
                          checked={checkboxStates[stateKey2] as boolean}
                          onChange={(checked) =>
                            setCheckboxStates({
                              ...checkboxStates,
                              [stateKey2]: checked,
                            })
                          }
                          label="Checkbox option"
                          description="This is a supporting text that provides additional context"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ShowcaseCard>

            {/* All States */}
            <ShowcaseCard title="All States">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Unchecked
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Checkbox
                      checked={checkboxStates.unchecked}
                      onChange={(checked) =>
                        setCheckboxStates({ ...checkboxStates, unchecked: checked })
                      }
                      label="Unchecked"
                    />
                    <Checkbox checked={false} disabled label="Unchecked Disabled" />
                    <Checkbox
                      checked={checkboxStates.unchecked}
                      onChange={(checked) =>
                        setCheckboxStates({ ...checkboxStates, unchecked: checked })
                      }
                      label="Unchecked with description"
                      description="This is a supporting text that provides additional context"
                    />
                  </div>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Checked
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Checkbox
                      checked={checkboxStates.checked}
                      onChange={(checked) =>
                        setCheckboxStates({ ...checkboxStates, checked: checked })
                      }
                      label="Checked"
                    />
                    <Checkbox checked={true} disabled label="Checked Disabled" />
                    <Checkbox
                      checked={checkboxStates.checked}
                      onChange={(checked) =>
                        setCheckboxStates({ ...checkboxStates, checked: checked })
                      }
                      label="Checked with description"
                      description="This is a supporting text that provides additional context"
                    />
                  </div>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Indeterminate
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Checkbox indeterminate={true} label="Indeterminate" />
                    <Checkbox indeterminate={true} disabled label="Indeterminate Disabled" />
                    <Checkbox
                      indeterminate={true}
                      label="Indeterminate with description"
                      description="This is a supporting text that provides additional context"
                    />
                  </div>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Radio */}
          <ComponentSection
            id="radio"
            title="Radio"
            description="Radio buttons allow users to select a single option from a set"
          >
            {/* Sizes */}
            <ShowcaseCard title="Sizes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                {(["small", "middle", "large"] as const).map((size) => {
                  const stateKey = size === "small" ? "radioValueSmall" : size === "middle" ? "radioValueMiddle" : "radioValueLarge";
                  const currentValue = size === "small" ? radioValueSmall : size === "middle" ? radioValueMiddle : radioValueLarge;
                  const setStateFn = size === "small" ? setRadioValueSmall : size === "middle" ? setRadioValueMiddle : setRadioValueLarge;

                  return (
                    <div key={size}>
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("semibold"),
                          color: ds.color.text("secondary"),
                          marginBottom: ds.spacing("4"),
                          display: "block",
                          textTransform: "capitalize",
                        }}
                      >
                        {size}
                      </Text>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ds.spacing("4"),
                        }}
                      >
                        <Radio
                          size={size}
                          checked={currentValue === `option1-${size}`}
                          onChange={(checked) => checked && setStateFn(`option1-${size}`)}
                          value={`option1-${size}`}
                          name={`radio-group-${size}`}
                          label="Radio option"
                        />
                        <Radio
                          size={size}
                          checked={currentValue === `option2-${size}`}
                          onChange={(checked) => checked && setStateFn(`option2-${size}`)}
                          value={`option2-${size}`}
                          name={`radio-group-${size}`}
                          label="Radio option"
                          description="This is a supporting text that provides additional context"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ShowcaseCard>

            {/* All States */}
            <ShowcaseCard title="All States">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Unchecked
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Radio
                      checked={false}
                      value="unchecked"
                      name="radio-unchecked"
                      label="Unchecked"
                    />
                    <Radio
                      checked={false}
                      disabled
                      value="unchecked-disabled"
                      name="radio-unchecked-disabled"
                      label="Unchecked Disabled"
                    />
                    <Radio
                      checked={false}
                      value="unchecked-desc"
                      name="radio-unchecked-desc"
                      label="Unchecked with description"
                      description="This is a supporting text that provides additional context"
                    />
                  </div>
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Checked
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Radio
                      checked={radioValue === "checked"}
                      onChange={(checked) => checked && setRadioValue("checked")}
                      value="checked"
                      name="radio-checked"
                      label="Checked"
                    />
                    <Radio
                      checked={true}
                      disabled
                      value="checked-disabled"
                      name="radio-checked-disabled"
                      label="Checked Disabled"
                    />
                    <Radio
                      checked={radioValue === "checked-desc"}
                      onChange={(checked) => checked && setRadioValue("checked-desc")}
                      value="checked-desc"
                      name="radio-checked-desc"
                      label="Checked with description"
                      description="This is a supporting text that provides additional context"
                    />
                  </div>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Icon Component */}
          <ComponentSection
            id="icon"
            title="Icon"
            description="Icon components display visual indicators with various shapes, colors, and styles. Can be used as illustrations in placeholders or empty states."
          >
            {/* Shapes */}
            <ShowcaseCard title="Shapes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Circle - Perfectly circular shape
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      gap: ds.spacing("4"),
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="brand"
                      size="md"
                      name="ri-information-line"
                    />
                    <Icon
                      shape="circle"
                      variant="outlined"
                      color="brand"
                      size="md"
                      name="ri-information-line"
                    />
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Square - Sharp corners with minimal border radius
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      gap: ds.spacing("4"),
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      shape="square"
                      variant="filled"
                      color="brand"
                      size="md"
                      name="ri-information-line"
                    />
                    <Icon
                      shape="square"
                      variant="outlined"
                      color="brand"
                      size="md"
                      name="ri-information-line"
                    />
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Rounded - Rounded square with 4px border radius
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      gap: ds.spacing("4"),
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      shape="rounded"
                      variant="filled"
                      color="brand"
                      size="md"
                      name="ri-information-line"
                    />
                    <Icon
                      shape="rounded"
                      variant="outlined"
                      color="brand"
                      size="md"
                      name="ri-information-line"
                    />
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            {/* Variants */}
            <ShowcaseCard title="Variants">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Filled - Solid background with white icon
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      gap: ds.spacing("4"),
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="brand"
                      size="md"
                      name="ri-check-line"
                    />
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="error"
                      size="md"
                      name="ri-close-line"
                    />
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="info"
                      size="md"
                      name="ri-information-line"
                    />
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="warning"
                      size="md"
                      name="ri-alert-line"
                    />
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="neutral"
                      size="md"
                      name="ri-question-line"
                    />
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                    }}
                  >
                    Outlined - Transparent background with colored border and icon
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      gap: ds.spacing("4"),
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      shape="circle"
                      variant="outlined"
                      color="brand"
                      size="md"
                      name="ri-check-line"
                    />
                    <Icon
                      shape="circle"
                      variant="outlined"
                      color="error"
                      size="md"
                      name="ri-close-line"
                    />
                    <Icon
                      shape="circle"
                      variant="outlined"
                      color="info"
                      size="md"
                      name="ri-information-line"
                    />
                    <Icon
                      shape="circle"
                      variant="outlined"
                      color="warning"
                      size="md"
                      name="ri-alert-line"
                    />
                    <Icon
                      shape="circle"
                      variant="outlined"
                      color="neutral"
                      size="md"
                      name="ri-question-line"
                    />
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            {/* Colors */}
            <ShowcaseCard title="Color Schemes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                {[
                  {
                    color: "brand" as const,
                    name: "Brand",
                    description: "Green color scheme for primary actions",
                    icon: "ri-check-line",
                  },
                  {
                    color: "error" as const,
                    name: "Error",
                    description: "Red color scheme for error states",
                    icon: "ri-close-line",
                  },
                  {
                    color: "info" as const,
                    name: "Info",
                    description: "Blue color scheme for informational content",
                    icon: "ri-information-line",
                  },
                  {
                    color: "warning" as const,
                    name: "Warning",
                    description: "Orange color scheme for warning states",
                    icon: "ri-alert-line",
                  },
                  {
                    color: "neutral" as const,
                    name: "Neutral",
                    description: "Gray color scheme for neutral states",
                    icon: "ri-question-line",
                  },
                ].map((colorScheme) => (
                  <div key={colorScheme.color}>
                    <Text
                      style={{
                        fontSize: ds.typography.size("sm"),
                        fontWeight: ds.typography.weight("semibold"),
                        marginBottom: ds.spacing("2"),
                        display: "block",
                      }}
                    >
                      {colorScheme.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: ds.typography.size("xs"),
                        color: ds.color.text("secondary"),
                        marginBottom: ds.spacing("4"),
                        display: "block",
                      }}
                    >
                      {colorScheme.description}
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        gap: ds.spacing("4"),
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        shape="circle"
                        variant="filled"
                        color={colorScheme.color}
                        size="md"
                        name={colorScheme.icon}
                      />
                      <Icon
                        shape="circle"
                        variant="outlined"
                        color={colorScheme.color}
                        size="md"
                        name={colorScheme.icon}
                      />
                      <Icon
                        shape="square"
                        variant="filled"
                        color={colorScheme.color}
                        size="md"
                        name={colorScheme.icon}
                      />
                      <Icon
                        shape="rounded"
                        variant="filled"
                        color={colorScheme.color}
                        size="md"
                        name={colorScheme.icon}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            {/* Sizes */}
            <ShowcaseCard title="Sizes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                {[
                  { size: "xs" as const, label: "Extra Small", description: "16px container, 10px icon" },
                  { size: "sm" as const, label: "Small", description: "20px container, 12px icon" },
                  { size: "md" as const, label: "Medium", description: "24px container, 16px icon" },
                  { size: "lg" as const, label: "Large", description: "32px container, 20px icon" },
                  { size: "xl" as const, label: "Extra Large", description: "40px container, 24px icon" },
                  { size: "2xl" as const, label: "2X Extra Large", description: "48px container, 28px icon" },
                ].map((sizeInfo) => (
                  <div key={sizeInfo.size}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ds.spacing("4"),
                        marginBottom: ds.spacing("4"),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          fontWeight: ds.typography.weight("semibold"),
                          minWidth: '120px', // 120px = 7.5rem = spacing-30
                        }}
                      >
                        {sizeInfo.label}
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("secondary"),
                          fontFamily: "monospace",
                        }}
                      >
                        {sizeInfo.description}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: ds.spacing("6"),
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ds.spacing("2"),
                        }}
                      >
                        <Icon
                          shape="circle"
                          variant="filled"
                          color="brand"
                          size={sizeInfo.size}
                          name="ri-information-line"
                        />
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                          }}
                        >
                          Circle
                        </Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ds.spacing("2"),
                        }}
                      >
                        <Icon
                          shape="square"
                          variant="filled"
                          color="brand"
                          size={sizeInfo.size}
                          name="ri-information-line"
                        />
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                          }}
                        >
                          Square
                        </Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ds.spacing("2"),
                        }}
                      >
                        <Icon
                          shape="rounded"
                          variant="filled"
                          color="brand"
                          size={sizeInfo.size}
                          name="ri-information-line"
                        />
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                          }}
                        >
                          Rounded
                        </Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ds.spacing("2"),
                        }}
                      >
                        <Icon
                          shape="circle"
                          variant="outlined"
                          color="brand"
                          size={sizeInfo.size}
                          name="ri-information-line"
                        />
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                          }}
                        >
                          Outlined
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            {/* Complete Style Matrix */}
            <ShowcaseCard title="Complete Style Matrix - All Combinations">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("8"),
                }}
              >
                <Text
                  style={{
                    fontSize: ds.typography.size("sm"),
                    color: ds.color.text("secondary"),
                    marginBottom: ds.spacing("2"),
                  }}
                >
                  All combinations of shapes, variants, and colors at medium size. These icons can be used as illustrations in placeholders, empty states, or informational contexts.
                </Text>

                {[
                  { shape: "circle" as const, label: "Circle Shape" },
                  { shape: "square" as const, label: "Square Shape" },
                  { shape: "rounded" as const, label: "Rounded Shape" },
                ].map((shapeInfo) => (
                  <div key={shapeInfo.shape}>
                    <Text
                      style={{
                        fontSize: ds.typography.size("md"),
                        fontWeight: ds.typography.weight("semibold"),
                        marginBottom: ds.spacing("4"),
                        textTransform: "capitalize",
                      }}
                    >
                      {shapeInfo.label}
                    </Text>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: ds.spacing("6"),
                      }}
                    >
                      {[
                        { variant: "filled" as const, label: "Filled" },
                        { variant: "outlined" as const, label: "Outlined" },
                      ].map((variantInfo) =>
                        [
                          {
                            color: "brand" as const,
                            icon: "ri-check-line",
                            label: "Brand",
                          },
                          {
                            color: "error" as const,
                            icon: "ri-close-line",
                            label: "Error",
                          },
                          {
                            color: "info" as const,
                            icon: "ri-information-line",
                            label: "Info",
                          },
                          {
                            color: "warning" as const,
                            icon: "ri-alert-line",
                            label: "Warning",
                          },
                          {
                            color: "neutral" as const,
                            icon: "ri-question-line",
                            label: "Neutral",
                          },
                        ].map((colorInfo) => (
                          <div
                            key={`${shapeInfo.shape}-${variantInfo.variant}-${colorInfo.color}`}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: ds.spacing("3"),
                              padding: ds.spacing("4"),
                              backgroundColor: ds.color.background("secondary"),
                              borderRadius: ds.radius("md"),
                            }}
                          >
                            <Icon
                              shape={shapeInfo.shape}
                              variant={variantInfo.variant}
                              color={colorInfo.color}
                              size="lg"
                              name={colorInfo.icon}
                            />
                            <div
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: ds.typography.size("xs"),
                                  fontWeight: ds.typography.weight("semibold"),
                                  color: ds.color.text("primary"),
                                  display: "block",
                                }}
                              >
                                {variantInfo.label} {colorInfo.label}
                              </Text>
                              <Text
                                style={{
                                  fontSize: ds.typography.size("2xs"),
                                  color: ds.color.text("tertiary"),
                                  fontFamily: "monospace",
                                  marginTop: ds.spacing("1"),
                                }}
                              >
                                {shapeInfo.shape} / {variantInfo.variant} / {colorInfo.color}
                              </Text>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>

            {/* Usage Examples */}
            <ShowcaseCard title="Usage Examples - As Illustrations">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <Text
                  style={{
                    fontSize: ds.typography.size("sm"),
                    color: ds.color.text("secondary"),
                  }}
                >
                  Icons can be used as illustrations in empty states, placeholders, or informational contexts. Here are some common use cases:
                </Text>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: ds.spacing("6"),
                  }}
                >
                  {/* Empty State Example */}
                  <div
                    style={{
                      padding: ds.spacing("8"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("lg"),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                      textAlign: "center",
                    }}
                  >
                    <Icon
                      shape="circle"
                      variant="outlined"
                      color="neutral"
                      size="2xl"
                      name="ri-folder-open-line"
                    />
                    <Text
                      style={{
                        fontSize: ds.typography.size("md"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                      }}
                    >
                      No items found
                    </Text>
                    <Text
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("secondary"),
                      }}
                    >
                      Try adjusting your search criteria
                    </Text>
                  </div>

                  {/* Success State Example */}
                  <div
                    style={{
                      padding: ds.spacing("8"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("lg"),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                      textAlign: "center",
                    }}
                  >
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="brand"
                      size="2xl"
                      name="ri-checkbox-circle-line"
                    />
                    <Text
                      style={{
                        fontSize: ds.typography.size("md"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                      }}
                    >
                      Operation successful
                    </Text>
                    <Text
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("secondary"),
                      }}
                    >
                      Your changes have been saved
                    </Text>
                  </div>

                  {/* Error State Example */}
                  <div
                    style={{
                      padding: ds.spacing("8"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("lg"),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                      textAlign: "center",
                    }}
                  >
                    <Icon
                      shape="circle"
                      variant="filled"
                      color="error"
                      size="2xl"
                      name="ri-error-warning-line"
                    />
                    <Text
                      style={{
                        fontSize: ds.typography.size("md"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                      }}
                    >
                      Something went wrong
                    </Text>
                    <Text
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("secondary"),
                      }}
                    >
                      Please try again later
                    </Text>
                  </div>

                  {/* Info State Example */}
                  <div
                    style={{
                      padding: ds.spacing("8"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("lg"),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                      textAlign: "center",
                    }}
                  >
                    <Icon
                      shape="rounded"
                      variant="outlined"
                      color="info"
                      size="2xl"
                      name="ri-information-line"
                    />
                    <Text
                      style={{
                        fontSize: ds.typography.size("md"),
                        fontWeight: ds.typography.weight("semibold"),
                        color: ds.color.text("primary"),
                      }}
                    >
                      Information
                    </Text>
                    <Text
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("secondary"),
                      }}
                    >
                      Additional details available
                    </Text>
                  </div>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Badge Component */}
          <ComponentSection
            id="badge"
            title="Badge"
            description="Badges are used to highlight status, categories, or labels with visual distinction"
          >
            {/* Variants */}
            <ShowcaseCard title="Variants">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ds.spacing("4"),
                  alignItems: "center",
                }}
              >
                <Badge color="brand" variant="filled">Filled</Badge>
                <Badge color="brand" variant="outlined">Outlined</Badge>
                <Badge color="brand" variant="subtle">Subtle</Badge>
              </div>
            </ShowcaseCard>

            {/* Colors */}
            <ShowcaseCard title="Colors">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                {/* Filled */}
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: ds.typography.letterSpacing.tight,
                    }}
                  >
                    Filled
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Badge color="brand" variant="filled">Brand</Badge>
                    <Badge color="error" variant="filled">Error</Badge>
                    <Badge color="info" variant="filled">Info</Badge>
                    <Badge color="success" variant="filled">Success</Badge>
                    <Badge color="warning" variant="filled">Warning</Badge>
                    <Badge color="neutral" variant="filled">Neutral</Badge>
                    <Badge color="lavender" variant="filled">Lavender</Badge>
                  </div>
                </div>

                {/* Outlined */}
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: ds.typography.letterSpacing.tight,
                    }}
                  >
                    Outlined
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Badge color="brand" variant="outlined">Brand</Badge>
                    <Badge color="error" variant="outlined">Error</Badge>
                    <Badge color="info" variant="outlined">Info</Badge>
                    <Badge color="success" variant="outlined">Success</Badge>
                    <Badge color="warning" variant="outlined">Warning</Badge>
                    <Badge color="neutral" variant="outlined">Neutral</Badge>
                    <Badge color="lavender" variant="outlined">Lavender</Badge>
                  </div>
                </div>

                {/* Subtle */}
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: ds.typography.letterSpacing.tight,
                    }}
                  >
                    Subtle
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Badge color="brand" variant="subtle">Brand</Badge>
                    <Badge color="error" variant="subtle">Error</Badge>
                    <Badge color="info" variant="subtle">Info</Badge>
                    <Badge color="success" variant="subtle">Success</Badge>
                    <Badge color="warning" variant="subtle">Warning</Badge>
                    <Badge color="neutral" variant="subtle">Neutral</Badge>
                    <Badge color="lavender" variant="subtle">Lavender</Badge>
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            {/* Sizes */}
            <ShowcaseCard title="Sizes">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ds.spacing("4"),
                  alignItems: "center",
                }}
              >
                <Badge color="brand" size="2xs">2X Small</Badge>
                <Badge color="brand" size="xs">Extra Small</Badge>
                <Badge color="brand" size="sm">Small</Badge>
                <Badge color="brand" size="md">Medium</Badge>
              </div>
            </ShowcaseCard>

            {/* With Icons */}
            <ShowcaseCard title="With Icons">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                {/* Leading Icon */}
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: ds.typography.letterSpacing.tight,
                    }}
                  >
                    Leading Icon
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Badge
                      color="brand"
                      leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.typography.size('sm') }} />}
                    >
                      With Icon
                    </Badge>
                    <Badge
                      color="success"
                      variant="outlined"
                      leadingIcon={<i className="ri-check-line" style={{ fontSize: ds.typography.size('sm') }} />}
                    >
                      Success
                    </Badge>
                    <Badge
                      color="error"
                      variant="subtle"
                      leadingIcon={<i className="ri-error-warning-fill" style={{ fontSize: ds.typography.size('sm') }} />}
                    >
                      Error
                    </Badge>
                  </div>
                </div>

                {/* Trailing Icon */}
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: ds.typography.letterSpacing.tight,
                    }}
                  >
                    Trailing Icon
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Badge
                      color="neutral"
                      trailingIcon={<i className="ri-arrow-right-line" style={{ fontSize: ds.typography.size('sm') }} />}
                    >
                      Navigate
                    </Badge>
                    <Badge
                      color="info"
                      variant="outlined"
                      trailingIcon={<i className="ri-external-link-line" style={{ fontSize: ds.typography.size('sm') }} />}
                    >
                      External
                    </Badge>
                  </div>
                </div>

                {/* Both Icons */}
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("4"),
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: ds.typography.letterSpacing.tight,
                    }}
                  >
                    Both Icons
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Badge
                      color="brand"
                      leadingIcon={<i className="ri-information-line" style={{ fontSize: ds.typography.size('sm') }} />}
                      trailingIcon={<i className="ri-close-line" style={{ fontSize: ds.typography.size('sm') }} />}
                    >
                      Dismissible
                    </Badge>
                    <Badge
                      color="warning"
                      variant="outlined"
                      leadingIcon={<i className="ri-alert-line" style={{ fontSize: ds.typography.size('sm') }} />}
                      trailingIcon={<i className="ri-arrow-right-s-line" style={{ fontSize: ds.typography.size('sm') }} />}
                    >
                      Action
                    </Badge>
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            {/* With Icons - All Sizes */}
            <ShowcaseCard title="With Icons - All Sizes">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <Text
                  style={{
                    fontSize: ds.typography.size("sm"),
                    color: ds.color.text("secondary"),
                  }}
                >
                  Badge icons should use appropriate icon sizes. Recommended: 2xs→iconXs(8px), xs→iconSm(12px), sm→iconMd(16px), md→iconLg(20px)
                </Text>

                <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
                  <div>
                    <Text style={{ fontSize: ds.typography.size("xs"), fontWeight: ds.typography.weight("semibold"), color: ds.color.text("primary"), marginBottom: ds.spacing("2"), display: "block" }}>2XS → iconXs (8px)</Text>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ds.spacing("3"), alignItems: "center" }}>
                      <Badge color="brand" size="2xs" leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.common.size.iconXs }} />}>Verified</Badge>
                      <Badge color="success" size="2xs" variant="outlined" leadingIcon={<i className="ri-check-line" style={{ fontSize: ds.common.size.iconXs }} />}>Success</Badge>
                    </div>
                  </div>
                  <div>
                    <Text style={{ fontSize: ds.typography.size("xs"), fontWeight: ds.typography.weight("semibold"), color: ds.color.text("primary"), marginBottom: ds.spacing("2"), display: "block" }}>XS → iconSm (12px)</Text>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ds.spacing("3"), alignItems: "center" }}>
                      <Badge color="brand" size="xs" leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.common.size.iconSm }} />}>Verified</Badge>
                      <Badge color="info" size="xs" variant="outlined" leadingIcon={<i className="ri-information-fill" style={{ fontSize: ds.common.size.iconSm }} />}>Info</Badge>
                    </div>
                  </div>
                  <div>
                    <Text style={{ fontSize: ds.typography.size("xs"), fontWeight: ds.typography.weight("semibold"), color: ds.color.text("primary"), marginBottom: ds.spacing("2"), display: "block" }}>SM → iconMd (16px)</Text>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ds.spacing("3"), alignItems: "center" }}>
                      <Badge color="brand" size="sm" leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.common.size.iconMd }} />}>Verified</Badge>
                      <Badge color="success" size="sm" variant="outlined" leadingIcon={<i className="ri-check-line" style={{ fontSize: ds.common.size.iconMd }} />}>Success</Badge>
                    </div>
                  </div>
                  <div>
                    <Text style={{ fontSize: ds.typography.size("xs"), fontWeight: ds.typography.weight("semibold"), color: ds.color.text("primary"), marginBottom: ds.spacing("2"), display: "block" }}>MD → iconLg (20px)</Text>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ds.spacing("3"), alignItems: "center" }}>
                      <Badge color="brand" size="md" leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.common.size.iconLg }} />}>Verified</Badge>
                      <Badge color="error" size="md" variant="outlined" leadingIcon={<i className="ri-error-warning-fill" style={{ fontSize: ds.common.size.iconLg }} />}>Error</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            {/* Interactive */}
            <ShowcaseCard title="Interactive">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ds.spacing("4"),
                  alignItems: "center",
                }}
              >
                <Badge
                  color="neutral"
                  trailingIcon={<i className="ri-close-line" style={{ fontSize: ds.typography.size('sm') }} />}
                  onClick={() => alert("Badge clicked!")}
                >
                  Clickable
                </Badge>
                <Badge
                  color="error"
                  variant="outlined"
                  trailingIcon={<i className="ri-close-line" style={{ fontSize: ds.typography.size('sm') }} />}
                  onClick={() => alert("Remove badge")}
                >
                  Remove
                </Badge>
              </div>
            </ShowcaseCard>
          </ComponentSection>
        </div>

        {/* Application Components Section */}
        <div style={{ marginBottom: ds.spacing("16") }}>
          <div
            style={{
              fontSize: ds.typography.size("xs"),
              fontWeight: ds.typography.weight("semibold"),
              color: ds.color.text("tertiary"),
              textTransform: "uppercase",
              letterSpacing: "0.5px", // Using direct value since letterSpacing may not be in type
              marginBottom: ds.spacing("8"),
            }}
          >
            Application Components
          </div>

          {/* Alert */}
          <ComponentSection
            id="alert"
            title="Alert"
            description="Alert components display important messages to users"
          >
            <ShowcaseCard title="Compact Variant">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <Alert
                  type="error"
                  variant="compact"
                  title="Error Text"
                  onClose={() => { }}
                />
                <Alert
                  type="info"
                  variant="compact"
                  title="Informational Notes"
                  onClose={() => { }}
                />
                <Alert
                  type="warning"
                  variant="compact"
                  title="Warning"
                  onClose={() => { }}
                />
                <Alert
                  type="success"
                  variant="compact"
                  title="Success Tips"
                  onClose={() => { }}
                />
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Expanded Variant">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <Alert
                  type="error"
                  variant="expanded"
                  title="Error Text"
                  description="This is an error message about copywriting."
                  onClose={() => { }}
                />
                <Alert
                  type="success"
                  variant="expanded"
                  title="Success Tips"
                  description="Detailed description and advice about successful copywriting."
                  onClose={() => { }}
                />
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Modal */}
          <ComponentSection
            id="modal"
            title="Modal / Dialog"
            description="Modal dialogs interrupt the user workflow to communicate important information or request user input"
          >
            <ShowcaseCard title="Size Variants">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                      display: "block",
                    }}
                  >
                    Small (600px) - For confirm/notification/error
                  </Text>
                  <Modal
                    open={modalOpen && modalSize === "small"}
                    title="Small Modal"
                    size="small"
                    onClose={() => {
                      setModalOpen(false);
                      setModalSize("middle");
                    }}
                    footer={
                      <div style={{ display: "flex", gap: ds.spacing("3"), justifyContent: "flex-end" }}>
                        <Button
                          variant="secondary"
                          color="neutral"
                          onClick={() => {
                            setModalOpen(false);
                            setModalSize("middle");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          color="brand"
                          onClick={() => {
                            setModalOpen(false);
                            setModalSize("middle");
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    }
                  >
                    <Text
                      style={{
                        color: ds.color.text("secondary"),
                        fontSize: ds.typography.size("md"),
                      }}
                    >
                      This is a small modal (600px) perfect for confirmations,
                      notifications, or error messages.
                    </Text>
                  </Modal>
                  <Space wrap>
                    <Button
                      variant="primary"
                      color="brand"
                      onClick={() => {
                        setModalSize("small");
                        setModalOpen(true);
                      }}
                    >
                      Open Small Modal
                    </Button>
                  </Space>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                      display: "block",
                    }}
                  >
                    Middle (720px) - Default, for standard dialogs
                  </Text>
                  <Modal
                    open={modalOpen && modalSize === "middle"}
                    title="Middle Modal"
                    size="middle"
                    onClose={() => {
                      setModalOpen(false);
                      setModalSize("middle");
                    }}
                    footer={
                      <div style={{ display: "flex", gap: ds.spacing("3"), justifyContent: "flex-end" }}>
                        <Button
                          variant="secondary"
                          color="neutral"
                          onClick={() => {
                            setModalOpen(false);
                            setModalSize("middle");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          color="brand"
                          onClick={() => {
                            setModalOpen(false);
                            setModalSize("middle");
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    }
                  >
                    <Text
                      style={{
                        color: ds.color.text("secondary"),
                        fontSize: ds.typography.size("md"),
                      }}
                    >
                      This is a middle modal (720px) - the default size for
                      standard dialogs and forms.
                    </Text>
                  </Modal>
                  <Space wrap>
                    <Button
                      variant="primary"
                      color="brand"
                      onClick={() => {
                        setModalSize("middle");
                        setModalOpen(true);
                      }}
                    >
                      Open Middle Modal
                    </Button>
                  </Space>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      marginBottom: ds.spacing("2"),
                      display: "block",
                    }}
                  >
                    Large (960px) - For complex operations
                  </Text>
                  <Modal
                    open={modalOpen && modalSize === "large"}
                    title="Large Modal"
                    size="large"
                    onClose={() => {
                      setModalOpen(false);
                      setModalSize("middle");
                    }}
                    footer={
                      <div style={{ display: "flex", gap: ds.spacing("3"), justifyContent: "flex-end" }}>
                        <Button
                          variant="secondary"
                          color="neutral"
                          onClick={() => {
                            setModalOpen(false);
                            setModalSize("middle");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          color="brand"
                          onClick={() => {
                            setModalOpen(false);
                            setModalSize("middle");
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ds.spacing("4"),
                      }}
                    >
                      <Text
                        style={{
                          color: ds.color.text("secondary"),
                          fontSize: ds.typography.size("md"),
                        }}
                      >
                        This is a large modal (960px) designed for complex
                        operations that require more space.
                      </Text>
                      <div
                        style={{
                          padding: ds.spacing("6"),
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          minHeight: '300px', // 300px = 18.75rem ≈ spacing-75
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: ds.color.text("tertiary"),
                        }}
                      >
                        Complex content area
                      </div>
                    </div>
                  </Modal>
                  <Space wrap>
                    <Button
                      variant="primary"
                      color="brand"
                      onClick={() => {
                        setModalSize("large");
                        setModalOpen(true);
                      }}
                    >
                      Open Large Modal
                    </Button>
                  </Space>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Modal with Supporting Text">
              <div>
                <Modal
                  open={modalWithSupportingText}
                  title="Heading text"
                  supportingText="Supporting text"
                  size="middle"
                  onClose={() => setModalWithSupportingText(false)}
                  footer={
                    <div style={{ display: "flex", gap: ds.spacing("3"), justifyContent: "flex-end" }}>
                      <Button
                        variant="secondary"
                        color="neutral"
                        onClick={() => setModalWithSupportingText(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        color="brand"
                        onClick={() => setModalWithSupportingText(false)}
                      >
                        Confirm
                      </Button>
                    </div>
                  }
                >
                  <div
                    style={{
                      padding: ds.spacing("6"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("md"),
                      minHeight: '200px', // 200px = 12.5rem = spacing-50
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ds.color.text("tertiary"),
                    }}
                  >
                    Modal content area
                  </div>
                </Modal>
                <Button
                  variant="primary"
                  color="brand"
                  onClick={() => setModalWithSupportingText(true)}
                >
                  Open Modal with Supporting Text
                </Button>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Size Comparison">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: ds.spacing("4"),
                }}
              >
                <div
                  style={{
                    padding: ds.spacing("4"),
                    backgroundColor: ds.color.background("secondary"),
                    borderRadius: ds.radius("md"),
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      display: "block",
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Small
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    600px
                  </Text>
                </div>
                <div
                  style={{
                    padding: ds.spacing("4"),
                    backgroundColor: ds.color.background("secondary"),
                    borderRadius: ds.radius("md"),
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      display: "block",
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Medium
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    720px
                  </Text>
                </div>
                <div
                  style={{
                    padding: ds.spacing("4"),
                    backgroundColor: ds.color.background("secondary"),
                    borderRadius: ds.radius("md"),
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      display: "block",
                      marginBottom: ds.spacing("2"),
                    }}
                  >
                    Large
                  </Text>
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("secondary"),
                      fontFamily: "monospace",
                    }}
                  >
                    960px
                  </Text>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Modal with Illustration">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Information Modal with Illustration
                  </Text>
                  <Modal
                    open={modalWithIllustrationOpen}
                    onClose={() => setModalWithIllustrationOpen(false)}
                    title="Are you sure?"
                    supportingText="Sorry, the page you are looking for doesn't exist or has been moved."
                    size="small"
                    illustration={{
                      type: "remix",
                      icon: "ri-information-fill",
                      color: "info",
                      variant: "withBackground",
                      size: "xl",
                    }}
                    footer={
                      <div
                        style={{
                          display: "flex",
                          gap: ds.spacing("3"),
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="secondary"
                          color="neutral"
                          onClick={() => setModalWithIllustrationOpen(false)}
                        >
                          No
                        </Button>
                        <Button
                          variant="primary"
                          color="brand"
                          onClick={() => {
                            // Modal confirmed
                            setModalWithIllustrationOpen(false);
                          }}
                        >
                          Yes, Continue
                        </Button>
                      </div>
                    }
                  />
                  <Button
                    variant="primary"
                    color="brand"
                    onClick={() => setModalWithIllustrationOpen(true)}
                  >
                    Open Modal with Illustration
                  </Button>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Success Modal with Illustration
                  </Text>
                  <Modal
                    open={modalSuccessOpen}
                    onClose={() => setModalSuccessOpen(false)}
                    title="Success!"
                    supportingText="Your action has been completed successfully."
                    size="small"
                    illustration={{
                      type: "remix",
                      icon: "ri-checkbox-circle-fill",
                      color: "brand",
                      variant: "withBackground",
                      size: "xl",
                    }}
                    footer={
                      <div
                        style={{
                          display: "flex",
                          gap: ds.spacing("3"),
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="primary"
                          color="brand"
                          onClick={() => setModalSuccessOpen(false)}
                        >
                          OK
                        </Button>
                      </div>
                    }
                  />
                  <Button
                    variant="primary"
                    color="brand"
                    onClick={() => setModalSuccessOpen(true)}
                  >
                    Open Success Modal
                  </Button>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Error Modal with Illustration
                  </Text>
                  <Modal
                    open={modalErrorOpen}
                    onClose={() => setModalErrorOpen(false)}
                    title="Something went wrong"
                    supportingText="Please try again later."
                    size="small"
                    illustration={{
                      type: "remix",
                      icon: "ri-error-warning-fill",
                      color: "error",
                      variant: "withBackground",
                      size: "xl",
                    }}
                    footer={
                      <div
                        style={{
                          display: "flex",
                          gap: ds.spacing("3"),
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="secondary"
                          color="neutral"
                          onClick={() => setModalErrorOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          color="error"
                          onClick={() => {
                            // Try again clicked
                            setModalErrorOpen(false);
                          }}
                        >
                          Try Again
                        </Button>
                      </div>
                    }
                  />
                  <Button
                    variant="primary"
                    color="error"
                    onClick={() => setModalErrorOpen(true)}
                  >
                    Open Error Modal
                  </Button>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Warning Modal with Illustration
                  </Text>
                  <Modal
                    open={modalWarningOpen}
                    onClose={() => setModalWarningOpen(false)}
                    title="Warning"
                    supportingText="This action cannot be undone. Are you sure you want to continue?"
                    size="small"
                    illustration={{
                      type: "remix",
                      icon: "ri-alert-fill",
                      color: "warning",
                      variant: "withBackground",
                      size: "xl",
                    }}
                    footer={
                      <div
                        style={{
                          display: "flex",
                          gap: ds.spacing("3"),
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="secondary"
                          color="neutral"
                          onClick={() => setModalWarningOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          color="warning"
                          onClick={() => {
                            // Proceed clicked
                            setModalWarningOpen(false);
                          }}
                        >
                          Proceed
                        </Button>
                      </div>
                    }
                  />
                  <Button
                    variant="primary"
                    color="warning"
                    onClick={() => setModalWarningOpen(true)}
                  >
                    Open Warning Modal
                  </Button>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Confirmation */}
          <ComponentSection
            id="confirmation"
            title="Confirmation"
            description="Responsive confirmation dialogs that use Modal on desktop and BottomSheet on mobile"
          >
            <ShowcaseCard title="Basic Confirmation">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <Confirmation
                  open={confirmationOpen && confirmationType === "default"}
                  onClose={() => {
                    setConfirmationOpen(false);
                    setConfirmationType("default");
                  }}
                  onConfirm={() => {
                    // Confirmed
                    setConfirmationOpen(false);
                    setConfirmationType("default");
                  }}
                  title="Confirm Action"
                  message="Are you sure you want to proceed with this action?"
                  confirmText="Confirm"
                  cancelText="Cancel"
                  confirmVariant="primary"
                  confirmColor="brand"
                />
                <Button
                  variant="primary"
                  color="brand"
                  onClick={() => {
                    setConfirmationType("default");
                    setConfirmationOpen(true);
                  }}
                >
                  Open Confirmation
                </Button>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Error Confirmation">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <Confirmation
                  open={confirmationOpen && confirmationType === "error"}
                  onClose={() => {
                    setConfirmationOpen(false);
                    setConfirmationType("default");
                  }}
                  onConfirm={() => {
                    // Delete confirmed
                    setConfirmationOpen(false);
                    setConfirmationType("default");
                  }}
                  title="Delete Item"
                  message="This action cannot be undone. Are you sure you want to delete this item?"
                  confirmText="Delete"
                  cancelText="Cancel"
                  confirmVariant="primary"
                  confirmColor="error"
                  cancelVariant="secondary"
                  cancelColor="neutral"
                />
                <Button
                  variant="primary"
                  color="error"
                  onClick={() => {
                    setConfirmationType("error");
                    setConfirmationOpen(true);
                  }}
                >
                  Open Delete Confirmation
                </Button>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Custom Content Confirmation">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <Confirmation
                  open={confirmationOpen && confirmationType === "warning"}
                  onClose={() => {
                    setConfirmationOpen(false);
                    setConfirmationType("default");
                  }}
                  onConfirm={() => {
                    // Warning action confirmed
                    setConfirmationOpen(false);
                    setConfirmationType("default");
                  }}
                  title="Warning"
                  confirmText="Proceed"
                  cancelText="Cancel"
                  confirmVariant="primary"
                  confirmColor="brand"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Text
                      style={{
                        color: ds.color.text("secondary"),
                        fontSize: ds.typography.size("md"),
                      }}
                    >
                      This action may have unintended consequences. Please review
                      the details below:
                    </Text>
                    <div
                      style={{
                        padding: ds.spacing("4"),
                        backgroundColor: ds.color.background("secondary"),
                        borderRadius: ds.radius("md"),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color: ds.color.text("tertiary"),
                        }}
                      >
                        • Item will be permanently removed
                        <br />
                        • All associated data will be deleted
                        <br />
                        • This cannot be undone
                      </Text>
                    </div>
                  </div>
                </Confirmation>
                <Button
                  variant="primary"
                  color="brand"
                  onClick={() => {
                    setConfirmationType("warning");
                    setConfirmationOpen(true);
                  }}
                >
                  Open Custom Confirmation
                </Button>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Confirmation with Illustration">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Information Confirmation
                  </Text>
                  <Confirmation
                    open={confirmationOpen && confirmationType === "default" && modalWithIllustrationOpen}
                    onClose={() => {
                      setConfirmationOpen(false);
                      setModalWithIllustrationOpen(false);
                      setConfirmationType("default");
                    }}
                    onConfirm={() => {
                      // Confirmed
                      setConfirmationOpen(false);
                      setModalWithIllustrationOpen(false);
                      setConfirmationType("default");
                    }}
                    title="Are you sure?"
                    message="Sure? On this page you are looking for player modes on the team dashboard."
                    confirmText="Yes, Confirm!"
                    cancelText="No"
                    confirmVariant="primary"
                    confirmColor="brand"
                    illustration={{
                      type: "remix",
                      icon: "ri-information-fill",
                      color: "info",
                      variant: "withBackground",
                      size: "xl",
                    }}
                  />
                  <Button
                    variant="primary"
                    color="brand"
                    onClick={() => {
                      setConfirmationType("default");
                      setModalWithIllustrationOpen(true);
                      setConfirmationOpen(true);
                    }}
                  >
                    Open Info Confirmation
                  </Button>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Error Confirmation
                  </Text>
                  <Confirmation
                    open={confirmationOpen && confirmationType === "error" && modalErrorOpen}
                    onClose={() => {
                      setConfirmationOpen(false);
                      setModalErrorOpen(false);
                      setConfirmationType("default");
                    }}
                    onConfirm={() => {
                      // Delete confirmed
                      setConfirmationOpen(false);
                      setModalErrorOpen(false);
                      setConfirmationType("default");
                    }}
                    title="Are you sure?"
                    message="Sure? On this page you are looking for player modes on the team dashboard."
                    confirmText="Yes, Confirm!"
                    cancelText="No"
                    confirmVariant="primary"
                    confirmColor="error"
                    illustration={{
                      type: "remix",
                      icon: "ri-error-warning-fill",
                      color: "error",
                      variant: "withBackground",
                      size: "xl",
                    }}
                  />
                  <Button
                    variant="primary"
                    color="error"
                    onClick={() => {
                      setConfirmationType("error");
                      setModalErrorOpen(true);
                      setConfirmationOpen(true);
                    }}
                  >
                    Open Error Confirmation
                  </Button>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Success Confirmation
                  </Text>
                  <Confirmation
                    open={confirmationOpen && confirmationType === "default" && modalSuccessOpen}
                    onClose={() => {
                      setConfirmationOpen(false);
                      setModalSuccessOpen(false);
                      setConfirmationType("default");
                    }}
                    onConfirm={() => {
                      // Success confirmed
                      setConfirmationOpen(false);
                      setModalSuccessOpen(false);
                      setConfirmationType("default");
                    }}
                    title="Are you sure?"
                    message="Sure? On this page you are looking for player modes on the team dashboard."
                    confirmText="Yes, Confirm!"
                    cancelText="No"
                    confirmVariant="primary"
                    confirmColor="brand"
                    illustration={{
                      type: "remix",
                      icon: "ri-checkbox-circle-fill",
                      color: "brand",
                      variant: "withBackground",
                      size: "xl",
                    }}
                  />
                  <Button
                    variant="primary"
                    color="brand"
                    onClick={() => {
                      setConfirmationType("default");
                      setModalSuccessOpen(true);
                      setConfirmationOpen(true);
                    }}
                  >
                    Open Success Confirmation
                  </Button>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Bottom Sheet */}
          <ComponentSection
            id="bottom-sheet"
            title="Bottom Sheet"
            description="Bottom sheets slide up from the bottom of the screen, ideal for mobile interfaces"
          >
            <ShowcaseCard title="Basic Bottom Sheet">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <BottomSheet
                  open={bottomSheetOpen}
                  onClose={() => setBottomSheetOpen(false)}
                  title="Bottom Sheet Title"
                  footer={
                    <div
                      style={{
                        display: "flex",
                        gap: ds.spacing("3"),
                        width: "100%",
                      }}
                    >
                      <Button
                        variant="secondary"
                        color="neutral"
                        size="large"
                        onClick={() => setBottomSheetOpen(false)}
                        style={{ flex: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        color="brand"
                        size="large"
                        onClick={() => {
                          // Action confirmed
                          setBottomSheetOpen(false);
                        }}
                        style={{ flex: 1 }}
                      >
                        Confirm
                      </Button>
                    </div>
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Text
                      style={{
                        color: ds.color.text("secondary"),
                        fontSize: ds.typography.size("md"),
                      }}
                    >
                      This is a bottom sheet component. It slides up from the
                      bottom of the screen and is perfect for mobile interfaces.
                    </Text>
                    <div
                      style={{
                        padding: ds.spacing("4"),
                        backgroundColor: ds.color.background("secondary"),
                        borderRadius: ds.radius("md"),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: ds.typography.size("sm"),
                          color: ds.color.text("tertiary"),
                        }}
                      >
                        Bottom sheets are commonly used for:
                        <br />
                        • Action menus
                        <br />
                        • Confirmation dialogs
                        <br />
                        • Form inputs
                        <br />
                        • Additional options
                      </Text>
                    </div>
                  </div>
                </BottomSheet>
                <Button
                  variant="primary"
                  color="brand"
                  onClick={() => setBottomSheetOpen(true)}
                >
                  Open Bottom Sheet
                </Button>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Bottom Sheet with Custom Content">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("4"),
                }}
              >
                <Text
                  style={{
                    fontSize: ds.typography.size("sm"),
                    color: ds.color.text("secondary"),
                  }}
                >
                  Resize your browser window to see how Confirmation component
                  automatically switches between Modal (desktop) and BottomSheet
                  (mobile) based on screen size.
                </Text>
                <Text
                  style={{
                    fontSize: ds.typography.size("xs"),
                    color: ds.color.text("tertiary"),
                    fontStyle: "italic",
                  }}
                >
                  Breakpoint: 768px
                </Text>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Illustration */}
          <ComponentSection
            id="illustration"
            title="Illustration"
            description="Reusable illustration component with ring background patterns, supporting Remix Icons, custom SVG vectors, and animated spinners"
          >
            <ShowcaseCard title="Type Variants">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Remix Icon
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Illustration
                      type="remix"
                      icon="ri-information-fill"
                      color="info"
                      variant="withBackground"
                      size="md"
                    />
                    <Illustration
                      type="remix"
                      icon="ri-error-warning-fill"
                      color="error"
                      variant="withBackground"
                      size="md"
                    />
                    <Illustration
                      type="remix"
                      icon="ri-checkbox-circle-fill"
                      color="brand"
                      variant="withBackground"
                      size="md"
                    />
                    <Illustration
                      type="remix"
                      icon="ri-alert-fill"
                      color="warning"
                      variant="withBackground"
                      size="md"
                    />
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Spinner (Animated)
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <Illustration
                      type="spinner"
                      color="brand"
                      variant="withBackground"
                      size="md"
                    />
                    <Illustration
                      type="spinner"
                      color="error"
                      variant="withBackground"
                      size="md"
                    />
                    <Illustration
                      type="spinner"
                      color="info"
                      variant="withBackground"
                      size="md"
                    />
                    <Illustration
                      type="spinner"
                      color="warning"
                      variant="withBackground"
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Color Variants">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    With Background
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="brand"
                        variant="withBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Brand
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="error"
                        variant="withBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Error
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="info"
                        variant="withBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Info
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="warning"
                        variant="withBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Warning
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="neutral"
                        variant="withBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Neutral
                      </Text>
                    </div>
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Without Background
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="brand"
                        variant="withoutBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Brand
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="error"
                        variant="withoutBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Error
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="info"
                        variant="withoutBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Info
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="warning"
                        variant="withoutBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Warning
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                      }}
                    >
                      <Illustration
                        type="remix"
                        icon="ri-information-fill"
                        color="neutral"
                        variant="withoutBackground"
                        size="lg"
                      />
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Neutral
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Size Variants">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ds.spacing("6"),
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ds.spacing("2"),
                  }}
                >
                  <Illustration
                    type="remix"
                    icon="ri-information-fill"
                    color="info"
                    variant="withBackground"
                    size="xs"
                  />
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("tertiary"),
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    XS
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ds.spacing("2"),
                  }}
                >
                  <Illustration
                    type="remix"
                    icon="ri-information-fill"
                    color="info"
                    variant="withBackground"
                    size="sm"
                  />
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("tertiary"),
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    SM
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ds.spacing("2"),
                  }}
                >
                  <Illustration
                    type="remix"
                    icon="ri-information-fill"
                    color="info"
                    variant="withBackground"
                    size="md"
                  />
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("tertiary"),
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    MD
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ds.spacing("2"),
                  }}
                >
                  <Illustration
                    type="remix"
                    icon="ri-information-fill"
                    color="info"
                    variant="withBackground"
                    size="lg"
                  />
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("tertiary"),
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    LG
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ds.spacing("2"),
                  }}
                >
                  <Illustration
                    type="remix"
                    icon="ri-information-fill"
                    color="info"
                    variant="withBackground"
                    size="xl"
                  />
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("tertiary"),
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    XL
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ds.spacing("2"),
                  }}
                >
                  <Illustration
                    type="remix"
                    icon="ri-information-fill"
                    color="info"
                    variant="withBackground"
                    size="2xl"
                  />
                  <Text
                    style={{
                      fontSize: ds.typography.size("xs"),
                      color: ds.color.text("tertiary"),
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    2XL
                  </Text>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Usage Examples">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    In Confirmation Modal
                  </Text>
                  <div
                    style={{
                      padding: ds.spacing("6"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("lg"),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Illustration
                      type="remix"
                      icon="ri-checkbox-circle-fill"
                      color="brand"
                      variant="withBackground"
                      size="xl"
                    />
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: ds.typography.size("lg"),
                          fontWeight: ds.typography.weight("semibold"),
                          color: ds.color.text("primary"),
                          display: "block",
                          marginBottom: ds.spacing("2"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Success!
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("md"),
                          color: ds.color.text("secondary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Your action has been completed successfully.
                      </Text>
                    </div>
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Error State
                  </Text>
                  <div
                    style={{
                      padding: ds.spacing("6"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("lg"),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Illustration
                      type="remix"
                      icon="ri-error-warning-fill"
                      color="error"
                      variant="withBackground"
                      size="xl"
                    />
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: ds.typography.size("lg"),
                          fontWeight: ds.typography.weight("semibold"),
                          color: ds.color.text("primary"),
                          display: "block",
                          marginBottom: ds.spacing("2"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Something went wrong
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("md"),
                          color: ds.color.text("secondary"),
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Please try again later.
                      </Text>
                    </div>
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Loading State (Spinner)
                  </Text>
                  <div
                    style={{
                      padding: ds.spacing("6"),
                      backgroundColor: ds.color.background("secondary"),
                      borderRadius: ds.radius("lg"),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <Illustration
                      type="spinner"
                      color="brand"
                      variant="withBackground"
                      size="xl"
                    />
                    <Text
                      style={{
                        fontSize: ds.typography.size("md"),
                        color: ds.color.text("secondary"),
                        fontFamily: ds.typography.fontFamily.notoSans,
                      }}
                    >
                      Loading...
                    </Text>
                  </div>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>

          {/* Assets */}
          <ComponentSection
            id="assets"
            title="Assets"
            description="Design system assets including logos, illustrations, and other visual resources"
          >
            <ShowcaseCard title="Illustration Assets">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Ring Background Patterns
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                    }}
                  >
                    <div
                      style={{
                        padding: ds.spacing("4"),
                        backgroundColor: ds.color.background("secondary"),
                        borderRadius: ds.radius("md"),
                        border: `1px solid ${ds.color.border("primary")}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                        maxWidth: '200px', // 200px = 12.5rem = spacing-50
                      }}
                    >
                      <div
                        style={{
                          width: '120px', // 7.5rem = 120px
                          height: '120px', // 7.5rem = 120px
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Illustration
                          type="remix"
                          icon="ri-information-fill"
                          color="neutral"
                          variant="withBackground"
                          size="lg"
                        />
                      </div>
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          textAlign: "center",
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        ring-with-bg.svg
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          textAlign: "center",
                          fontStyle: "italic",
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        With Background
                      </Text>
                    </div>
                    <div
                      style={{
                        padding: ds.spacing("4"),
                        backgroundColor: ds.color.background("secondary"),
                        borderRadius: ds.radius("md"),
                        border: `1px solid ${ds.color.border("primary")}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                        maxWidth: '200px', // 200px = 12.5rem = spacing-50
                      }}
                    >
                      <div
                        style={{
                          width: '120px', // 7.5rem = 120px
                          height: '120px', // 7.5rem = 120px
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Illustration
                          type="remix"
                          icon="ri-information-fill"
                          color="neutral"
                          variant="withoutBackground"
                          size="lg"
                        />
                      </div>
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          textAlign: "center",
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        ring-no-bg.svg
                      </Text>
                      <Text
                        style={{
                          fontSize: ds.typography.size("xs"),
                          color: ds.color.text("tertiary"),
                          textAlign: "center",
                          fontStyle: "italic",
                          fontFamily: ds.typography.fontFamily.notoSans,
                        }}
                      >
                        Without Background
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Logo Assets">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ds.spacing("6"),
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Logo Full
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                      <div
                        key={size}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ds.spacing("2"),
                          padding: ds.spacing("3"),
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          border: `1px solid ${ds.color.border("primary")}`,
                        }}
                      >
                        <img
                          src={getLogoPath("full", "Default", size)}
                          alt={`Logo Full ${size}`}
                          style={{
                            height: size === "xs" ? ds.common.icon.small : size === "sm" ? ds.common.icon.medium : size === "md" ? ds.common.icon.large : size === "lg" ? ds.common.size.iconXl : ds.common.size.icon2xl,
                            width: "auto",
                            objectFit: "contain",
                          }}
                        />
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                            fontFamily: ds.typography.fontFamily.notoSans,
                          }}
                        >
                          {size.toUpperCase()}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Logo Mark
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                      <div
                        key={size}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ds.spacing("2"),
                          padding: ds.spacing("3"),
                          backgroundColor: ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          border: `1px solid ${ds.color.border("primary")}`,
                        }}
                      >
                        <img
                          src={getLogoPath("mark", "Default", size, "Icon")}
                          alt={`Logo Mark ${size}`}
                          style={{
                            height: size === "xs" ? ds.common.icon.small : size === "sm" ? ds.common.icon.medium : size === "md" ? ds.common.icon.large : size === "lg" ? ds.common.size.iconXl : ds.common.size.icon2xl,
                            width: "auto",
                            objectFit: "contain",
                          }}
                        />
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                            fontFamily: ds.typography.fontFamily.notoSans,
                          }}
                        >
                          {size.toUpperCase()}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Text
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: ds.color.text("secondary"),
                      marginBottom: ds.spacing("3"),
                      display: "block",
                      fontFamily: ds.typography.fontFamily.notoSans,
                    }}
                  >
                    Theme Variants
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: ds.spacing("4"),
                      alignItems: "center",
                    }}
                  >
                    {(["Default", "Dark", "Light"] as const).map((theme) => (
                      <div
                        key={theme}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ds.spacing("2"),
                          padding: ds.spacing("3"),
                          backgroundColor: theme === "Dark" ? ds.color.background("primary") : ds.color.background("secondary"),
                          borderRadius: ds.radius("md"),
                          border: `1px solid ${ds.color.border("primary")}`,
                        }}
                      >
                        <img
                          src={getLogoPath("full", theme, "md")}
                          alt={`Logo ${theme}`}
                          style={{
                            height: ds.common.height.buttonSmall, // 32px = button small height
                            width: "auto",
                            objectFit: "contain",
                          }}
                        />
                        <Text
                          style={{
                            fontSize: ds.typography.size("xs"),
                            color: ds.color.text("tertiary"),
                            fontFamily: ds.typography.fontFamily.notoSans,
                          }}
                        >
                          {theme}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ShowcaseCard>
          </ComponentSection>
        </div>
      </main>
    </div>
  );
}
