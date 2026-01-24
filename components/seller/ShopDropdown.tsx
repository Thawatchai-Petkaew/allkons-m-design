"use client";

import React, { useRef, useEffect } from "react";
import { ds } from "@/design-system";
import { Avatar } from "@/components/ui/Avatar";
import { Dot } from "@/components/ui/Dot";
import type { ShopInfo } from "@/types/seller-types";

export interface ShopDropdownProps {
    currentShop?: ShopInfo;
    shops?: ShopInfo[];
    isOpen: boolean;
    onClose: () => void;
    onShopChange?: (shopId: string) => void;
    onAddBranch?: () => void;
    onManageShops?: () => void;
    style?: React.CSSProperties;
}

/**
 * ShopDropdown Component
 * 
 * Dropdown menu for selecting shops and branches.
 * Displays shop logo, name, and active status.
 * 
 * @example
 * ```tsx
 * <ShopDropdown
 *   currentShop={currentShop}
 *   shops={shopList}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onShopChange={(id) => handleShopChange(id)}
 * />
 * ```
 */
export function ShopDropdown({
    currentShop,
    shops = [],
    isOpen,
    onClose,
    onShopChange,
    onAddBranch,
    onManageShops,
    style,
}: ShopDropdownProps) {
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

    if (!isOpen) return null;

    const handleShopSelect = (shopId: string) => {
        onShopChange?.(shopId);
        onClose();
    };

    return (
        <div
            ref={dropdownRef}
            style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                minWidth: "264px",
                backgroundColor: ds.color.background("primary"),
                borderRadius: ds.radius("md"),
                boxShadow: "var(--shadow-3xl)",
                paddingTop: ds.spacing("3"),
                paddingBottom: ds.spacing("3"),
                paddingLeft: ds.spacing("3"),
                paddingRight: ds.spacing("3"),
                zIndex: 1000,
                ...style,
            }}
        >
            {/* Section Header */}
            <div
                style={{
                    ...ds.typography.preset("paragraph-small"),
                    fontWeight: ds.typography.weight("medium"),
                    color: ds.color.text("secondary"),
                    marginBottom: ds.spacing("3"),
                }}
            >
                เลือกร้านค้า/สาขา
            </div>

            {/* Shop List */}
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("1") }}>
                {shops.map((shop) => (
                    <button
                        key={shop.id}
                        onClick={() => handleShopSelect(shop.id)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ds.spacing("2"),
                            padding: ds.spacing("3"),
                            border: "none",
                            backgroundColor: ds.color.common.transparent,
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
                            e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                        }}
                    >
                        {/* Shop Logo */}
                        <Avatar src={shop.logo} alt={shop.name} size="sm" fallback={shop.name.charAt(0)} fallbackType="store-icon" />

                        {/* Shop Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: ds.spacing("2"),
                                }}
                            >
                                <span
                                    style={{
                                        ...ds.typography.preset("paragraph-xsmall"),
                                        fontWeight: ds.typography.weight("regular"),
                                        color: ds.color.text("secondary"),
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {shop.name}
                                </span>
                                {shop.type === "branch" && (
                                    <span
                                        style={{
                                            ...ds.typography.preset("paragraph-xsmall"),
                                            color: ds.color.text("tertiary"),
                                        }}
                                    >
                                        (สาขา)
                                    </span>
                                )}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                                <Dot size="sm" active={shop.isActive} />
                                <span
                                    style={{
                                        ...ds.typography.preset("paragraph-xsmall"),
                                        color: ds.color.text("quaternary"),
                                    }}
                                >
                                    {shop.isActive ? "เปิดขาย" : "ปิดขาย"}
                                </span>
                            </div>
                        </div>

                        {/* Selection Indicator */}
                        <div
                            style={{
                                width: ds.spacing("5"),
                                height: ds.spacing("5"),
                                borderRadius: ds.radius("full"),
                                border: currentShop?.id === shop.id
                                    ? "none"
                                    : `1.5px solid ${ds.color.border("secondary")}`,
                                backgroundColor: currentShop?.id === shop.id
                                    ? ds.color.background("brand-default")
                                    : ds.color.common.transparent,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            {currentShop?.id === shop.id && (
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                    <path
                                        d="M1 5L4.5 8.5L11 1.5"
                                        stroke={ds.color.background("primary")}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </div>

                    </button>
                ))}

            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("1") }}>
                <button
                    onClick={() => {
                        onAddBranch?.();
                        onClose();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                        padding: ds.spacing("3"),
                        border: "none",
                        backgroundColor: ds.color.common.transparent,
                        borderRadius: ds.radius("sm"),
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background-color 0.2s",
                        width: "100%",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                    }}
                >
                    <i
                        className="ri-add-circle-line"
                        style={{
                            fontSize: ds.common.size.iconLg,
                            color: ds.color.text("secondary"),
                        }}
                    />
                    <span
                        style={{
                            ...ds.typography.preset("paragraph-small"),
                            fontWeight: ds.typography.weight("regular"),
                            color: ds.color.text("secondary"),
                        }}
                    >
                        เพิ่มสาขาใหม่
                    </span>
                </button>

                <button
                    onClick={() => {
                        onManageShops?.();
                        onClose();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                        padding: ds.spacing("3"),
                        border: "none",
                        backgroundColor: ds.color.common.transparent,
                        borderRadius: ds.radius("sm"),
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background-color 0.2s",
                        width: "100%",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                    }}
                >
                    <i
                        className="ri-settings-3-line"
                        style={{
                            fontSize: ds.common.size.iconLg,
                            color: ds.color.text("secondary"),
                        }}
                    />
                    <span
                        style={{
                            ...ds.typography.preset("paragraph-small"),
                            fontWeight: ds.typography.weight("regular"),
                            color: ds.color.text("secondary"),
                        }}
                    >
                        จัดการร้านค้าทั้งหมด
                    </span>
                </button>
            </div>
        </div >
    );
}

export default ShopDropdown;
