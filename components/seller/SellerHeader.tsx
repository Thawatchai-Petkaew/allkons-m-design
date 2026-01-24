"use client";

import React, { useState } from "react";
import { ds } from "@/design-system";
import { Avatar } from "@/components/ui/Avatar";
import { Dot } from "@/components/ui/Dot";
import { Badge } from "@/components/ui/Badge";
import { ShopDropdown } from "./ShopDropdown";
import { OrgDropdown } from "./OrgDropdown";
import { AccountDropdown } from "./AccountDropdown";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
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
    onMobileMenuClick?: () => void;
}

/**
 * SellerHeader Component
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
    onMobileMenuClick,
}: SellerHeaderProps) {
    const [openDropdown, setOpenDropdown] = useState<"shop" | "org" | "account" | null>(null);
    const isMobile = useIsMobile();

    const toggleDropdown = (e: React.MouseEvent, dropdown: "shop" | "org" | "account") => {
        e.preventDefault();
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
                borderBottom: `0.5px solid ${ds.color.border("primary")}`,
            }}
        >
            <div
                className="header-container"
                style={{
                    maxWidth: ds.breakpoint.value('xl'),
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? ds.spacing("2") : ds.spacing("4"),
                    boxSizing: "border-box"
                }}
            >
                {/* Mobile Hamburger Menu - Opens Sidebar */}
                <button
                    onClick={onMobileMenuClick}
                    style={{
                        padding: ds.spacing("2"),
                        border: "none",
                        backgroundColor: ds.color.common.transparent,
                        cursor: ds.common.cursor.pointer,
                        display: isMobile ? "block" : "none",
                    }}
                    aria-label="Toggle menu"
                >
                    <i className="ri-menu-2-line" style={{ fontSize: ds.typography.size("3xl"), color: ds.color.text("primary") }} />
                </button>

                {/* Shop/Branch Selector */}
                <div style={{ position: "relative" }}>
                    <button
                        onClick={(e) => toggleDropdown(e, "shop")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ds.spacing("2"),
                            padding: isMobile ? ds.spacing("1") : `${ds.spacing("1")} ${ds.spacing("3")} ${ds.spacing("1")} ${ds.spacing("1")}`,
                            border: "none",
                            backgroundColor: ds.color.background("secondary"),
                            borderRadius: ds.radius("full"),
                            cursor: ds.common.cursor.pointer,
                            transition: `background-color ${ds.common.animation.fast}`,
                            minWidth: isMobile ? ds.spacing("10") : "auto",
                            height: isMobile ? ds.spacing("10") : "auto",
                            justifyContent: "center",
                        }}
                        onMouseEnter={(e) => {
                            if (!isMobile) e.currentTarget.style.backgroundColor = ds.color.background("tertiary");
                        }}
                        onMouseLeave={(e) => {
                            if (!isMobile) e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        aria-expanded={openDropdown === "shop"}
                        aria-haspopup="true"
                    >
                        {currentShop && (
                            <>
                                <Avatar
                                    src={currentShop.logo}
                                    alt={currentShop.name}
                                    size={isMobile ? "sm" : "md"}
                                    fallback={currentShop.name.charAt(0)}
                                    fallbackType="store-icon"
                                />
                                {!isMobile && (
                                    <>
                                        <div style={{ textAlign: "left" }}>
                                            <span
                                                style={{
                                                    ...ds.typography.preset("paragraph-small"),
                                                    fontWeight: ds.typography.weight("regular"),
                                                    color: ds.color.text("secondary"),
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {currentShop.name}
                                            </span>
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
                                        <i
                                            className="ri-arrow-down-s-line"
                                            style={{
                                                fontSize: ds.common.size.iconLg,
                                                color: ds.color.text("tertiary"),
                                                transform: openDropdown === "shop" ? "rotate(180deg)" : "none",
                                                transition: "transform 0.2s",
                                            }}
                                        />
                                    </>
                                )}
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

                {/* Right Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: isMobile ? ds.spacing("1") : ds.spacing("2") }}>
                    {/* Notification Bell */}
                    <button
                        onClick={onNotificationClick}
                        style={{
                            position: "relative",
                            padding: ds.spacing("4"),
                            border: "none",
                            backgroundColor: ds.color.common.transparent,
                            borderRadius: ds.radius("full"),
                            cursor: ds.common.cursor.pointer,
                            transition: `background-color ${ds.common.animation.fast}`,
                        }}
                        onMouseEnter={(e) => {
                            if (!isMobile) e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        onMouseLeave={(e) => {
                            if (!isMobile) e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                        }}
                        aria-label="Notifications"
                    >
                        <i
                            className="ri-notification-2-line"
                            style={{
                                fontSize: ds.typography.size("xl"),
                                color: ds.color.text("primary"),
                            }}
                        />
                        {notificationCount > 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: ds.spacing("1"),
                                    right: ds.spacing("1"),
                                    minWidth: ds.spacing("4"),
                                    height: ds.spacing("4"),
                                    padding: `0 ${ds.spacing("1")}`,
                                    backgroundColor: "var(--brand-m-primary-00)",
                                    border: `${ds.common.borderWidth.thin} solid ${ds.color.text("white")}`,
                                    borderRadius: ds.radius("full"),
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    ...ds.typography.preset("paragraph-xsmall"),
                                    fontWeight: ds.typography.weight("medium"),
                                    color: ds.color.text("white"),
                                    fontSize: ds.typography.size("2xs"),
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
                                padding: isMobile ? "4px" : `${ds.spacing("1")} ${ds.spacing("3")} ${ds.spacing("1")} ${ds.spacing("1")}`,
                                border: "none",
                                backgroundColor: ds.color.background("secondary"),
                                borderRadius: ds.radius("full"),
                                cursor: ds.common.cursor.pointer,
                                transition: `background-color ${ds.common.animation.fast}`,
                                minWidth: isMobile ? "40px" : "auto",
                                height: isMobile ? "40px" : "auto",
                                justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) e.currentTarget.style.backgroundColor = ds.color.background("tertiary");
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                            }}
                            aria-expanded={openDropdown === "org"}
                            aria-haspopup="true"
                        >
                            {currentOrg && (
                                <>
                                    <div style={{ position: "relative" }}>
                                        <Avatar
                                            src={currentOrg.logo}
                                            alt={currentOrg.name}
                                            size={isMobile ? "sm" : "md"}
                                            fallback={getThaiOrgFallback(currentOrg.name)}
                                            customBgColor="var(--brand-m-primary-light-90)"
                                            customTextColor="var(--brand-m-primary-00)"
                                        />
                                        <div style={{
                                            position: "absolute",
                                            bottom: "-2px",
                                            right: "-2px",
                                            width: isMobile ? "12px" : ds.spacing("4"),
                                            height: isMobile ? "12px" : ds.spacing("4"),
                                            borderRadius: ds.radius("full"),
                                            backgroundColor: currentOrg.type === "legal" ? "var(--system-info-00)" : "var(--system-warning-00)",
                                            border: "1px solid white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <i
                                                className={currentOrg.type === "legal" ? "ri-briefcase-line" : "ri-team-line"}
                                                style={{ fontSize: isMobile ? "8px" : "10px", color: "white" }}
                                            />
                                        </div>
                                    </div>
                                    {!isMobile && (
                                        <>
                                            <div style={{ textAlign: "left" }}>
                                                <div style={{ ...ds.typography.preset("paragraph-small"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("secondary") }}>
                                                    {currentOrg.name}
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                                                    <span style={{ ...ds.typography.preset("paragraph-xsmall"), color: ds.color.text("quaternary") }}>
                                                        {currentOrg.role}
                                                    </span>
                                                    {currentOrg.kybVerified ? (
                                                        <Badge
                                                            color="brand"
                                                            variant="outlined"
                                                            size="2xs"
                                                            leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.typography.size('2xs') }} />}
                                                        >
                                                            ยืนยันแล้ว
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            color="error"
                                                            variant="outlined"
                                                            size="2xs"
                                                            leadingIcon={<i className="ri-information-fill" style={{ fontSize: ds.typography.size('2xs') }} />}
                                                        >
                                                            ยังไม่ยืนยันองค์กร
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <i
                                                className="ri-arrow-down-s-line"
                                                style={{
                                                    fontSize: ds.common.size.iconLg,
                                                    color: ds.color.text("tertiary"),
                                                    transform: openDropdown === "org" ? "rotate(180deg)" : "none",
                                                    transition: "transform 0.2s",
                                                }}
                                            />
                                        </>
                                    )}
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
                                padding: "2px",
                                border: "none",
                                backgroundColor: "transparent",
                                borderRadius: ds.radius("full"),
                                cursor: ds.common.cursor.pointer,
                                transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) e.currentTarget.style.opacity = "0.8";
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) e.currentTarget.style.opacity = "1";
                            }}
                            aria-expanded={openDropdown === "account"}
                            aria-haspopup="true"
                        >
                            {user && (
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    size={isMobile ? "sm" : "md"}
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
            </div>


            <style jsx>{`
                .header-container {
                    padding: ${ds.spacing("2")} ${ds.spacing("4")};
                    height: auto;
                    min-height: ${ds.spacing("10")}; /* 40px */
                    display: flex;
                    align-items: center;
                }

                @media (min-width: ${ds.breakpoint.value('md')}) {
                    .header-container {
                        padding: ${ds.spacing("2")} ${ds.spacing("6")};
                        height: auto;
                        max-height: 64px;
                    }
                }

                @media (max-width: ${ds.breakpoint.value('md')}) {
                    .header-container {
                        padding: ${ds.spacing("1")} ${ds.spacing("4")} !important;
                        gap: ${ds.spacing("2")} !important;
                        min-height: 48px;
                    }
                }
            `}</style>
        </header>
    );
}

export default SellerHeader;
