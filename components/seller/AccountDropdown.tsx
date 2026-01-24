"use client";

import React, { useRef, useEffect } from "react";
import { ds } from "@/design-system";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
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
}

/**
 * AccountDropdown Component
 * 
 * Dropdown menu for user account actions.
 * Displays user avatar, name, email, and account menu options.
 * 
 * @example
 * ```tsx
 * <AccountDropdown
 *   user={currentUser}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onLogout={() => handleLogout()}
 * />
 * ```
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
}: AccountDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen || !user) return null;

    const menuItems = [
        {
            icon: "ri-user-line",
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

    return (
        <div
            ref={dropdownRef}
            style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                minWidth: "280px",
                backgroundColor: "white",
                borderRadius: ds.radius("lg"),
                boxShadow: "0px 12px 36px rgba(36, 42, 52, 0.12)",
                padding: ds.spacing("4"),
                zIndex: 1000,
                ...style,
            }}
        >
            {/* User Info Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ds.spacing("3"),
                    paddingBottom: ds.spacing("3"),
                    marginBottom: ds.spacing("3"),
                }}
            >
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="lg"
                    fallbackType="user-icon"
                    customBgColor="var(--brand-m-primary-light-90)"
                    customTextColor="var(--brand-m-primary-00)"
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            ...ds.typography.preset("paragraph-small"),
                            fontWeight: ds.typography.weight("medium"),
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
                            color: ds.color.text("secondary"),
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
            <div style={{ display: "flex", color: ds.color.text("secondary"), flexDirection: "column", gap: ds.spacing("1") }}>
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
                            backgroundColor: "transparent",
                            borderRadius: ds.radius("md"),
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background-color 0.2s",
                            width: "100%",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                        }}
                    >
                        {/* Icon */}
                        <i
                            className={item.icon}
                            style={{
                                fontSize: "20px",
                                color: item.isDanger ? ds.color.system("error") : ds.color.text("primary"),
                                flexShrink: 0,
                            }}
                        />

                        {/* Label */}
                        <span
                            style={{
                                ...ds.typography.preset("paragraph-small"),
                                color: item.isDanger ? ds.color.system("error") : ds.color.text("primary"),
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
        </div>
    );
}

export default AccountDropdown;
