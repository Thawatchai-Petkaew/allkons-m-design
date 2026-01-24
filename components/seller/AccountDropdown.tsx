"use client";

import React, { useRef, useEffect } from "react";
import { ds } from "@/design-system";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import type { UserInfo } from "@/types/seller-types";

export interface AccountDropdownProps {
    user?: UserInfo;
    isOpen: boolean;
    onClose: () => void;
    onProfile?: () => void;
    onSettings?: () => void;
    onLanguage?: () => void;
    onLogout?: () => void;
    style?: React.CSSProperties;
    disableMobileBottomSheet?: boolean;
}

/**
 * AccountDropdown Component
 * 
 * Dropdown menu for user account actions.
 * Automatically switches between floating menu (Desktop) and BottomSheet (Mobile).
 */
export function AccountDropdown({
    user,
    isOpen,
    onClose,
    onProfile,
    onSettings,
    onLanguage,
    onLogout,
    style,
    disableMobileBottomSheet,
}: AccountDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Close dropdown when clicking outside (Desktop only)
    useEffect(() => {
        if (!isOpen || isMobile) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen, onClose, isMobile]);

    if (!isOpen || !user) return null;

    const menuItems = [
        {
            icon: "ri-user-settings-line",
            label: "ข้อมูลโปรไฟล์",
            badge: user.isVerified ? (
                <Badge color="brand" size="2xs" variant="outlined">
                    <i className="ri-verified-badge-fill" style={{ fontSize: "12px", marginRight: "4px" }} />
                    ยืนยันแล้ว
                </Badge>
            ) : null,
            onClick: onProfile,
        },
        {
            icon: "ri-settings-3-line",
            label: "การตั้งค่า",
            onClick: onSettings,
        },
        {
            icon: "ri-global-line",
            label: "ภาษาไทย (Thai)",
            hasChevron: true,
            onClick: onLanguage,
        },
        {
            icon: "ri-logout-box-r-line",
            label: "ออกจากระบบ",
            onClick: onLogout,
            isDanger: true,
        },
    ];

    const Content = () => (
        <>
            {/* User Info Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ds.spacing("3"),
                    paddingBottom: ds.spacing("3"),
                }}
            >
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="md"
                    fallbackType="user-icon"
                    customBgColor="var(--brand-m-primary-light-90)"
                    customTextColor="var(--brand-m-primary-00)"
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            ...ds.typography.preset("paragraph-small"),
                            fontWeight: ds.typography.weight("regular"),
                            color: ds.color.text("secondary"),
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: ds.spacing("1"),
                        }}
                    >
                        {user.name}
                    </div>
                    <div
                        style={{
                            ...ds.typography.preset("paragraph-xsmall"),
                            color: ds.color.text("quinary"),
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {user.email}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("1") }}>
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            item.onClick?.();
                            if (item.label !== "ภาษาไทย (Thai)") {
                                onClose();
                            }
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ds.spacing("2"),
                            padding: ds.spacing("3"),
                            border: "none",
                            backgroundColor: ds.color.common.transparent,
                            borderRadius: ds.radius("sm"),
                            cursor: ds.common.cursor.pointer,
                            textAlign: "left",
                            transition: `background-color ${ds.common.animation.fast}`,
                            width: "100%",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                        }}
                    >
                        {/* Icon */}
                        <i
                            className={item.icon}
                            style={{
                                fontSize: ds.common.size.iconLg,
                                color: item.isDanger ? ds.color.system("error") : ds.color.text("secondary"),
                                flexShrink: 0,
                            }}
                        />

                        {/* Label */}
                        <span
                            style={{
                                ...ds.typography.preset("paragraph-small"),
                                color: item.isDanger ? ds.color.system("error") : ds.color.text("secondary"),
                                flex: 1,
                            }}
                        >
                            {item.label}
                        </span>

                        {/* Badge or Chevron */}
                        {item.badge && <div style={{ flexShrink: 0 }}>{item.badge}</div>}
                        {item.hasChevron && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M6 4L10 8L6 12"
                                    stroke={ds.color.text("tertiary")}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </>
    );

    if (isMobile && !disableMobileBottomSheet) {
        return (
            <BottomSheet
                open={isOpen}
                onClose={onClose}
                title="บัญชีผู้ใช้"
            >
                <div style={{ paddingBottom: ds.spacing("6") }}>
                    <Content />
                </div>
            </BottomSheet>
        );
    }

    return (
        <div
            ref={dropdownRef}
            style={{
                position: "absolute",
                top: `calc(100% + ${ds.spacing("2")})`,
                right: 0,
                minWidth: "256px",
                backgroundColor: ds.color.background("primary"),
                borderRadius: ds.radius("md"),
                boxShadow: "var(--shadow-3xl)",
                padding: ds.spacing("3"),
                zIndex: 1000,
                ...style,
            }}
        >
            <Content />
        </div>
    );
}

export default AccountDropdown;
