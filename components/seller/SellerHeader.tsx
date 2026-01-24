"use client";

import React, { useState } from "react";
import { ds } from "@/design-system";
import { Avatar } from "@/components/ui/Avatar";
import { Dot } from "@/components/ui/Dot";
import { Badge } from "@/components/ui/Badge";
import { ShopDropdown } from "./ShopDropdown";
import { OrgDropdown } from "./OrgDropdown";
import { AccountDropdown } from "./AccountDropdown";
import { getThaiOrgFallback } from "@/lib/thai-utils";
import type { ShopInfo, OrgInfo, UserInfo } from "@/types/seller-types";

export interface SellerHeaderProps {
    currentShop?: ShopInfo;
    shops?: ShopInfo[];
    currentOrg?: OrgInfo;
    orgs?: OrgInfo[];
    user?: UserInfo;
    notificationCount?: number;
    onShopChange?: (shopId: string) => void;
    onOrgChange?: (orgId: string) => void;
    onNotificationClick?: () => void;
    onLogout?: () => void;
    onAddBranch?: () => void;
    onManageShops?: () => void;
    onEditOrg?: () => void;
    onAddOrg?: () => void;
    onManageOrgs?: () => void;
    onProfile?: () => void;
    onSettings?: () => void;
    onLanguage?: () => void;
}

/**
 * SellerHeader Component
 * 
 * Main navigation header for the seller interface.
 * Includes shop/branch selector, organization selector, notifications, and account menu.
 * Fully responsive with mobile hamburger menu support.
 * 
 * @example
 * ```tsx
 * <SellerHeader
 *   currentShop={shop}
 *   shops={shopList}
 *   currentOrg={org}
 *   orgs={orgList}
 *   user={currentUser}
 *   notificationCount={5}
 *   onShopChange={handleShopChange}
 *   onOrgChange={handleOrgChange}
 *   onLogout={handleLogout}
 * />
 * ```
 */
export function SellerHeader({
    currentShop,
    shops = [],
    currentOrg,
    orgs = [],
    user,
    notificationCount = 0,
    onShopChange,
    onOrgChange,
    onNotificationClick,
    onLogout,
    onAddBranch,
    onManageShops,
    onEditOrg,
    onAddOrg,
    onManageOrgs,
    onProfile,
    onSettings,
    onLanguage,
}: SellerHeaderProps) {
    const [openDropdown, setOpenDropdown] = useState<"shop" | "org" | "account" | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = (e: React.MouseEvent, dropdown: "shop" | "org" | "account") => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const closeAllDropdowns = () => {
        setOpenDropdown(null);
    };

    return (
        <header
            style={{
                backgroundColor: "white",
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "var(--shadow-3xl)",
            }}
        >
            <div
                className="header-container"
                style={{
                    maxWidth: "1440px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    gap: ds.spacing("4"),
                }}
            >
                {/* Mobile Hamburger Menu */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: "none",
                        padding: ds.spacing("2"),
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    className="mobile-menu-button"
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M3 12H21M3 6H21M3 18H21"
                            stroke={ds.color.text("primary")}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {/* Shop/Branch Selector */}
                <div style={{ position: "relative" }}>
                    <button
                        onClick={(e) => toggleDropdown(e, "shop")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ds.spacing("2"),
                            paddingTop: ds.spacing("1"),
                            paddingBottom: ds.spacing("1"),
                            paddingLeft: ds.spacing("1"),
                            paddingRight: ds.spacing("3"),
                            border: "none",
                            backgroundColor: ds.color.background("secondary"),
                            borderRadius: ds.radius("full"),
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        className="responsive-toggle-button"
                        aria-expanded={openDropdown === "shop"}
                        aria-haspopup="true"
                    >
                        {currentShop && (
                            <>
                                <Avatar
                                    src={currentShop.logo}
                                    alt={currentShop.name}
                                    size="md"
                                    fallback={currentShop.name.charAt(0)}
                                    fallbackType="store-icon"
                                />
                                <div style={{ textAlign: "left" }} className="responsive-hide">
                                    <div
                                        style={{
                                            ...ds.typography.preset("paragraph-small"),
                                            fontWeight: ds.typography.weight("medium"),
                                            color: ds.color.text("secondary"),
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {(currentShop.type === "shop" ? "ร้าน" : "สาขา") + currentShop.name}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("1") }}>
                                        <Dot size="sm" active={currentShop.isActive} />
                                        <span
                                            style={{
                                                ...ds.typography.preset("paragraph-xsmall"),
                                                color: ds.color.text("quaternary"),
                                            }}
                                        >
                                            {currentShop.isActive ? "เปิดขาย" : "ปิดขาย"}
                                        </span>
                                    </div>
                                </div>
                                <svg
                                    className="responsive-hide"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    style={{
                                        transform: openDropdown === "shop" ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.2s",
                                    }}
                                >
                                    <path
                                        d="M4 6L8 10L12 6"
                                        stroke={ds.color.text("tertiary")}
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </>
                        )}
                    </button>

                    <ShopDropdown
                        currentShop={currentShop}
                        shops={shops}
                        isOpen={openDropdown === "shop"}
                        onClose={closeAllDropdowns}
                        onShopChange={onShopChange}
                        onAddBranch={onAddBranch}
                        onManageShops={onManageShops}
                    />
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Notification Bell */}
                <button
                    onClick={onNotificationClick}
                    style={{
                        position: "relative",
                        padding: ds.spacing("3"),
                        border: "none",
                        backgroundColor: "transparent",
                        borderRadius: ds.radius("full"),
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ""}`}
                >
                    <i
                        className="ri-notification-2-line"
                        style={{
                            fontSize: "24px",
                            color: ds.color.text("primary"),
                        }}
                    />
                    {notificationCount > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "-4px",
                                right: "-4px",
                                minWidth: "18px",
                                height: "18px",
                                padding: "0 4px",
                                backgroundColor: "var(--brand-m-primary-00)",
                                border: "1px solid white",
                                borderRadius: ds.radius("full"),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                ...ds.typography.preset("paragraph-xsmall"),
                                fontWeight: ds.typography.weight("medium"),
                                color: "white",
                                fontSize: "10px",
                                boxShadow: "0px 1px 3px 0px rgba(36, 42, 52, 0.1)",
                            }}
                        >
                            {notificationCount > 99 ? "99+" : notificationCount}
                        </div>
                    )}
                </button>

                {/* Organization Selector */}
                <div style={{ position: "relative" }}>
                    <button
                        onClick={(e) => toggleDropdown(e, "org")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ds.spacing("2"),
                            paddingTop: ds.spacing("1"),
                            paddingBottom: ds.spacing("1"),
                            paddingLeft: ds.spacing("1"),
                            paddingRight: ds.spacing("3"),
                            border: "none",
                            backgroundColor: ds.color.background("secondary"),
                            borderRadius: ds.radius("full"),
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        className="responsive-toggle-button"
                        aria-expanded={openDropdown === "org"}
                        aria-haspopup="true"
                    >
                        {currentOrg && (
                            <>
                                {/* Org Logo with Type Indicator */}
                                <div style={{ position: "relative" }}>
                                    <Avatar
                                        src={currentOrg.logo}
                                        alt={currentOrg.name}
                                        size="md"
                                        fallback={getThaiOrgFallback(currentOrg.name)}
                                        customBgColor="var(--brand-m-primary-light-90)"
                                        customTextColor="var(--brand-m-primary-00)"
                                    />
                                    {/* Type Indicator - Always show at bottom-right */}
                                    <div style={{ position: "absolute", bottom: "-2px", right: "-2px" }}>
                                        <div
                                            style={{
                                                width: ds.spacing("4"),
                                                height: ds.spacing("4"),
                                                borderRadius: ds.radius("full"),
                                                backgroundColor: currentOrg.type === "legal"
                                                    ? "var(--system-info-00)"
                                                    : "var(--system-warning-00)",
                                                border: `0.5px solid ${ds.color.background("primary")}`,
                                                boxShadow: "0px 1px 3px 0px rgba(36, 42, 52, 0.1)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <i
                                                className={currentOrg.type === "legal" ? "ri-briefcase-line" : "ri-team-line"}
                                                style={{
                                                    fontSize: ds.common.size.iconSm,
                                                    color: ds.color.background("secondary"),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "left" }} className="responsive-hide">
                                    <div
                                        style={{
                                            ...ds.typography.preset("paragraph-small"),
                                            fontWeight: ds.typography.weight("medium"),
                                            color: ds.color.text("secondary"),
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {currentOrg.name}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                                        <span
                                            style={{
                                                ...ds.typography.preset("paragraph-xsmall"),
                                                color: ds.color.text("quaternary"),
                                            }}
                                        >
                                            {currentOrg.role}
                                        </span>
                                        {currentOrg.kybVerified ? (
                                            <Badge
                                                color="brand"
                                                size="2xs"
                                                variant="outlined"
                                                leadingIcon={<i className="ri-verified-badge-fill" style={{ fontSize: ds.common.size.iconXs }} />}
                                            >
                                                ยืนยันแล้ว
                                            </Badge>
                                        ) : (
                                            <Badge
                                                color="error"
                                                size="2xs"
                                                variant="outlined"
                                                leadingIcon={<i className="ri-information-fill" style={{ fontSize: ds.common.size.iconXs }} />}
                                            >
                                                ยังไม่ยืนยันองค์กร
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <svg
                                    className="responsive-hide"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    style={{
                                        transform: openDropdown === "org" ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.2s",
                                    }}
                                >
                                    <path
                                        d="M4 6L8 10L12 6"
                                        stroke={ds.color.text("tertiary")}
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </>
                        )}
                    </button>

                    <OrgDropdown
                        currentOrg={currentOrg}
                        orgs={orgs}
                        isOpen={openDropdown === "org"}
                        onClose={closeAllDropdowns}
                        onOrgChange={onOrgChange}
                        onEditOrg={onEditOrg}
                        onAddOrg={onAddOrg}
                        onManageOrgs={onManageOrgs}
                    />
                </div>

                {/* Account Menu */}
                <div style={{ position: "relative" }}>
                    <button
                        onClick={(e) => toggleDropdown(e, "account")}
                        style={{
                            padding: ds.spacing("1"),
                            border: "none",
                            backgroundColor: ds.color.common.transparent,
                            borderRadius: ds.radius("full"),
                            cursor: "pointer",
                            transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = "0.8";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                        }}
                        aria-expanded={openDropdown === "account"}
                        aria-haspopup="true"
                        aria-label="Account menu"
                    >
                        {user && (
                            <Avatar
                                src={user.avatar}
                                alt={user.name}
                                size="md"
                                fallbackType="user-icon"
                                customBgColor="var(--brand-m-primary-light-90)"
                                customTextColor="var(--brand-m-primary-00)"
                            />
                        )}
                    </button>

                    <AccountDropdown
                        user={user}
                        isOpen={openDropdown === "account"}
                        onClose={closeAllDropdowns}
                        onProfile={onProfile}
                        onSettings={onSettings}
                        onLanguage={onLanguage}
                        onLogout={onLogout}
                    />
                </div>
            </div>

            {/* Mobile-specific styles */}
            <style jsx>{`
        .header-container {
          padding: 8px var(--spacing-4);
        }

        @media (min-width: 768px) {
          .header-container {
            padding: 8px var(--spacing-6);
          }
        }

        @media (min-width: 1024px) {
          .header-container {
            padding: 8px var(--spacing-8);
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block !important;
          }

          .responsive-hide {
            display: none !important;
          }

          :global(.responsive-toggle-button) {
            padding: 4px !important;
            gap: 0 !important;
          }
        }
      `}</style>
        </header>
    );
}

export default SellerHeader;
