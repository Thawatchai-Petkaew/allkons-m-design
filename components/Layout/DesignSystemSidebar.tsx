"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ds } from "@/design-system";

interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

interface SidebarSection {
  title: string;
  items: NavItem[];
}

interface DesignSystemSidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onClose?: () => void;
}

const navigation: SidebarSection[] = [
  {
    title: "Foundation",
    items: [
      { id: "logo", label: "Logo", href: "/designsystem#logo" },
      { id: "typography", label: "Typography", href: "/designsystem#typography" },
      { id: "color-system", label: "Color system", href: "/designsystem#color-system" },
      { id: "border-radius", label: "Border radius", href: "/designsystem#border-radius" },
      { id: "grid-system", label: "Grid system", href: "/designsystem#grid-system" },
      { id: "spacing", label: "Spacing", href: "/designsystem#spacing" },
      { id: "shadow", label: "Shadow", href: "/designsystem#shadow" },
      { id: "icons", label: "Icons", href: "/designsystem#icons" },
      { id: "layout", label: "Layout", href: "/designsystem#layout" },
      { id: "design-annotation", label: "Design annotation", href: "/designsystem#design-annotation" },
    ],
  },
  {
    title: "Base Components",
    items: [
      { id: "button", label: "Button", href: "/designsystem#button" },
      { id: "input", label: "Input", href: "/designsystem#input" },
      { id: "textarea", label: "Textarea", href: "/designsystem#textarea" },
      { id: "select", label: "Select", href: "/designsystem#select" },
      { id: "toggle", label: "Toggle", href: "/designsystem#toggle" },
      { id: "checkbox", label: "Checkbox", href: "/designsystem#checkbox" },
      { id: "radio", label: "Radio", href: "/designsystem#radio" },
      { id: "icon", label: "Icon", href: "/designsystem#icon" },
      { id: "badge", label: "Badge", href: "/designsystem#badge" },
    ],
  },
  {
    title: "Application Components",
    items: [
      { id: "alert", label: "Alert", href: "/designsystem#alert" },
      { id: "modal", label: "Modal", href: "/designsystem#modal" },
      { id: "confirmation", label: "Confirmation", href: "/designsystem#confirmation" },
      { id: "bottom-sheet", label: "Bottom Sheet", href: "/designsystem#bottom-sheet" },
    ],
  },
  {
    title: "Assets & Illustrations",
    items: [
      { id: "illustration", label: "Illustration", href: "/designsystem#illustration" },
      { id: "assets", label: "Assets", href: "/designsystem#assets" },
    ],
  },
];

export const DesignSystemSidebar: React.FC<DesignSystemSidebarProps> = ({
  className,
  isMobileOpen = false,
  onClose,
}) => {
  const pathname = usePathname();
  // Use useState to avoid hydration mismatch - start with empty string for SSR
  const [hash, setHash] = useState("");
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

  // Update hash after mount (client-side only)
  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash.slice(1));
    };

    // Set initial hash
    updateHash();

    // Listen for hash changes
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  const isActive = (itemId: string) => {
    return hash === itemId || (hash === "" && itemId === "logo");
  };

  // Close sidebar when clicking on a link on mobile
  const handleLinkClick = () => {
    if (onClose && isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            cursor: ds.common.cursor.pointer,
          }}
          onClick={onClose}
        />
      )}
      <aside
        style={{
          width: "220px", // Fixed sidebar width
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          backgroundColor: ds.color.background("primary"),
          borderRight: `${ds.common.borderWidth.thin} solid ${ds.color.border("primary")}`,
          overflowY: "auto",
          padding: `${ds.spacing("6")} ${ds.spacing("4")}`,
          zIndex: 999,
          transform: isMobile && !isMobileOpen ? "translateX(-100%)" : "translateX(0)",
          transition: `transform ${ds.common.animation.fast} ease-in-out`,
        }}
        className="design-system-sidebar"
      >
      {/* Logo/Title */}
      <div style={{ marginBottom: ds.spacing("6"), display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Link
          href="/designsystem"
          style={{
            textDecoration: "none",
            color: ds.color.text("primary"),
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
          onClick={handleLinkClick}
        >
          <img
            src="/assets/logos/Logo full/Theme=Default, Size=sm, Unit=Default.svg"
            alt="Allkons M Logo"
            style={{
              height: ds.common.height.buttonSmall, // 32px = button small height
              width: "auto",
              objectFit: "contain",
              maxWidth: "100%",
            }}
            onError={(e) => {
              // Fallback to text if logo not found
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div style="font-size: ${ds.typography.size("lg")}; font-weight: ${ds.typography.weight("bold")};">
                    Allkons M
                  </div>
                `;
              }
            }}
          />
        </Link>
        {/* Mobile close button */}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: ds.spacing("1"),
              color: ds.color.text("secondary"),
              fontSize: ds.typography.size("xl"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: ds.radius("md"),
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ds.color.background("secondary");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            aria-label="Close menu"
          >
            <i className="ri-close-line" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav>
        {navigation.map((section, sectionIndex) => (
          <div key={section.title}>
            {/* Divider before section (except first one) */}
            {sectionIndex > 0 && (
              <div
                style={{
                  height: ds.common.borderWidth.thin,
                  backgroundColor: ds.color.border("primary"),
                  margin: `${ds.spacing("6")} 0`,
                }}
              />
            )}
            
            {/* Section Header */}
            <div
              style={{
                fontSize: ds.typography.size("xs"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("tertiary"),
                textTransform: "uppercase",
                letterSpacing: ds.typography.letterSpacing.tight, // 0.5px
                marginBottom: ds.spacing("4"),
                paddingLeft: ds.spacing("2"),
                paddingTop: sectionIndex === 0 ? 0 : ds.spacing("2"),
                fontFamily: ds.typography.fontFamily.notoSans,
              }}
            >
              {section.title}
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {section.items.map((item) => {
                const active = isActive(item.id);
                return (
                  <li key={item.id} style={{ marginBottom: ds.spacing("1") }}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      style={{
                        display: "block",
                        padding: `${ds.spacing("2")} ${ds.spacing("3")}`,
                        borderRadius: ds.radius("md"),
                        textDecoration: "none",
                        fontSize: ds.typography.size("md"),
                        lineHeight: ds.typography.lineHeight("md"),
                        fontFamily: ds.typography.fontFamily.notoSans,
                        color: active
                          ? ds.color.text("primary")
                          : ds.color.text("secondary"),
                        backgroundColor: active
                          ? ds.color.background("secondary")
                          : "transparent",
                        fontWeight: active
                          ? ds.typography.weight("semibold")
                          : ds.typography.weight("regular"),
                        transition: `all ${ds.common.animation.fast} ease`,
                        cursor: ds.common.cursor.pointer,
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor =
                            ds.color.background("secondary");
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
    </>
  );
};
