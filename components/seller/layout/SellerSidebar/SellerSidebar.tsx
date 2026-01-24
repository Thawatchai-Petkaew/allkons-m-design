"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ds } from "@/design-system";
import { Drawer, Dropdown, MenuProps } from "antd";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useSellerSession } from "@/lib/hooks/useSellerSession";
import { SellerSidebarProps, SidebarItem } from "./sidebar.types";
import { getSellerSidebarConfig } from "./sidebar.config";
import { canAccessSidebarItem } from "./sidebar.access";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const SellerSidebar: React.FC<SellerSidebarProps> = ({
    collapsed,
    onCollapse,
    isMobileOpen,
    onMobileClose,
    currentPath,
}) => {
    const isMobile = useIsMobile();
    const { orgRoleCode, appRoleCode } = useSellerSession();
    const navConfig = useMemo(() => getSellerSidebarConfig(), []);
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const adminPrefix = "/seller/admin";
    const inSellerAdmin = currentPath.startsWith(adminPrefix);
    const normalizeHref = (href: string) => {
        if (!inSellerAdmin) return href;
        if (href.startsWith("http://") || href.startsWith("https://")) return href;
        if (href.startsWith(adminPrefix)) return href;
        if (href.startsWith("/seller/")) return href;
        if (!href.startsWith("/")) return href;
        return `${adminPrefix}${href}`;
    };

    // Internal active state for testing/demo without routing
    const [activePath, setActivePath] = useState(currentPath);

    useEffect(() => {
        setActivePath(currentPath);
    }, [currentPath]);

    const accessibleNavConfig = useMemo(() => {
        const ctx = { orgRoleCode, appRoleCode };

        return navConfig
            .map(section => {
                const accessibleItems = section.items
                    .map(item => {
                        if (item.children && item.children.length > 0) {
                            const accessibleChildren = item.children.filter(child => canAccessSidebarItem(child.id, ctx));
                            const parentAccessible = canAccessSidebarItem(item.id, ctx);
                            if (!parentAccessible && accessibleChildren.length === 0) return null;
                            return {
                                ...item,
                                children: accessibleChildren,
                            };
                        }

                        return canAccessSidebarItem(item.id, ctx) ? item : null;
                    })
                    .filter(Boolean) as SidebarItem[];

                return {
                    ...section,
                    items: accessibleItems,
                };
            })
            .filter(section => section.items.length > 0);
    }, [navConfig, orgRoleCode, appRoleCode]);

    // Auto-expand menus based on current path on mount
    useEffect(() => {
        accessibleNavConfig.forEach(section => {
            section.items.forEach(item => {
                if (item.children) {
                    const hasActiveChild = item.children.some(child => activePath.startsWith(child.href));
                    if (hasActiveChild) {
                        setOpenMenus(prev => Array.from(new Set([...prev, item.id])));
                    }
                }
            });
        });
    }, [activePath, accessibleNavConfig]);

    const sidebarWidth = 240;
    const collapsedWidth = 88;
    const currentWidth = collapsed ? collapsedWidth : sidebarWidth;

    const toggleMenu = (id: string) => {
        if (collapsed) return;
        setOpenMenus(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const isItemActive = (href: string) => {
        const normalizedHref = normalizeHref(href);
        if (normalizedHref === "/seller/dashboard" && activePath === "/seller/dashboard") return true;
        if (normalizedHref !== "/seller/dashboard" && activePath.startsWith(normalizedHref)) return true;
        return false;
    };

    const MenuItem = ({
        item,
        level = 0,
        isActive,
        isOpen,
        hasChildren,
        onClick
    }: {
        item: SidebarItem,
        level?: number,
        isActive: boolean,
        isOpen?: boolean,
        hasChildren?: boolean,
        onClick?: () => void
    }) => {
        const [isHovered, setIsHovered] = useState(false);
        const indent = level * 16;

        let backgroundColor = ds.color.common.transparent as any;
        let color = ds.color.text("secondary") as any;
        let iconColor = ds.color.text("secondary") as any;

        if (isActive) {
            backgroundColor = ds.component.button.primaryBrand.bg() as any;
            color = ds.color.text("white") as any;
            iconColor = ds.color.text("white") as any;
            if (isHovered) {
                backgroundColor = ds.component.button.primaryBrand.bg('hover') as any;
            }
        } else if (isHovered) {
            backgroundColor = ds.component.button.secondaryBrand.bg('hover') as any;
            color = ds.color.text("brand-default") as any;
            iconColor = ds.color.text("brand-default") as any;
        }

        const commonStyles: React.CSSProperties = {
            width: "100%",
            height: "40px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: ds.spacing("3"),
            padding: collapsed
                ? "0"
                : `0 ${ds.spacing("3")}`,
            paddingLeft: collapsed ? 0 : (level === 0 ? ds.spacing("3") : "40px"),
            justifyContent: collapsed ? "center" : "flex-start",
            border: "none",
            borderRadius: ds.radius("sm"),
            cursor: "pointer",
            transition: `all ${ds.common.animation.fast} ease`,
            position: "relative",
            textDecoration: "none",
            backgroundColor,
            color,
            fontFamily: ds.typography.fontFamily.notoSans,
        };

        // Parent Button Logic (Folder)
        if (hasChildren) {
            const dropdownItems: MenuProps['items'] = item.children?.map(child => ({
                key: child.id,
                label: (
                    <Link
                        href={normalizeHref(child.href)}
                        style={{ textDecoration: "none", color: isItemActive(child.href) ? ds.color.text("brand-default") : ds.color.text("secondary"), fontFamily: ds.typography.fontFamily.notoSans }}
                        onClick={() => {
                            setActivePath(normalizeHref(child.href));
                            if (isMobile && onMobileClose) onMobileClose();
                        }}
                    >
                        {child.label}
                    </Link>
                ),
                className: isItemActive(child.href) ? "ant-dropdown-menu-item-selected" : ""
            }));

            const dropdownContent = (
                <button
                    onClick={onClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        ...commonStyles,
                        paddingLeft: collapsed ? 0 : (level === 0 ? ds.spacing("3") : "40px"),
                        justifyContent: collapsed ? "center" : "space-between",
                    }}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: collapsed ? 0 : ds.spacing("3"),
                        flex: collapsed ? "none" : 1,
                        justifyContent: collapsed ? "center" : "flex-start",
                        minWidth: 0,
                        overflow: "hidden"
                    }}>
                        <span
                            style={{
                                fontSize: ds.common.size.iconMd,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: iconColor
                            }}
                        >
                            {item.icon}
                        </span>
                        {!collapsed && (
                            <span style={{
                                ...ds.typography.preset("paragraph-middle"),
                                fontWeight: isActive ? ds.typography.weight("regular") : ds.typography.weight("regular"),
                                flex: 1,
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "left",
                            }}>
                                {item.label}
                            </span>
                        )}
                    </div>
                    {!collapsed && (
                        <i
                            className={isOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}
                            style={{ fontSize: "20px", color: isActive ? "white" : (isHovered ? ds.color.text("brand-default") : ds.color.text("tertiary")) }}
                        />
                    )}
                </button>
            );

            if (collapsed) {
                return (
                    <Dropdown
                        menu={{ items: dropdownItems }}
                        placement={"right" as any}
                        trigger={['hover']}
                        overlayStyle={{ paddingLeft: '8px' }}
                    >
                        {dropdownContent}
                    </Dropdown>
                );
            }

            return dropdownContent;
        }

        return (
            <Link
                href={normalizeHref(item.href)}
                onClick={() => {
                    setActivePath(normalizeHref(item.href));
                    if (isMobile && onMobileClose) onMobileClose();
                    if (onClick) onClick();
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={commonStyles}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: collapsed ? 0 : ds.spacing("3"),
                        flex: collapsed ? "none" : 1,
                        justifyContent: collapsed ? "center" : "flex-start",
                        minWidth: 0,
                        overflow: "hidden",
                    }}
                >
                    <span
                        style={{
                            fontSize: ds.common.size.iconMd,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: iconColor,
                        }}
                    >
                        {item.icon}
                    </span>

                    {!collapsed && (
                        <span
                            style={{
                                ...ds.typography.preset("paragraph-middle"),
                                fontWeight: isActive ? ds.typography.weight("regular") : ds.typography.weight("regular"),
                                flex: 1,
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "left",
                            }}
                        >
                            {item.label}
                        </span>
                    )}
                </div>
            </Link>
        );
    };

    const renderMenuItem = (item: SidebarItem, level = 0) => {
        const hasChildren = !!(item.children && item.children.length > 0);
        const isOpen = openMenus.includes(item.id);
        const isActive = isItemActive(item.href);
        // User asked to remove "Link logic" when child is active (Interpretation: don't highlight parent)
        const isChildActive = hasChildren && item.children?.some(child => isItemActive(child.href));

        return (
            <div key={item.id} style={{ marginBottom: ds.spacing("none") }}>
                <MenuItem
                    item={item}
                    level={level}
                    isActive={hasChildren ? false : isActive}
                    isOpen={isOpen}
                    hasChildren={hasChildren}
                    onClick={() => hasChildren ? toggleMenu(item.id) : undefined}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: (!collapsed && isOpen && hasChildren) ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.3s ease-out"
                    }}
                >
                    <div style={{ overflow: "hidden" }}>
                        <div style={{ marginTop: ds.spacing("1") }}>
                            {item.children?.map(child => renderMenuItem(child, level + 1))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const SidebarContent = () => (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: ds.color.background("primary"),
        }}>
            {/* Header Area */}
            <div style={{
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "space-between",
                padding: collapsed ? 0 : `0 ${ds.spacing("4")}`,
                marginBottom: ds.spacing("1")
            }}>
                {/* Collapsed: Show Hamburger Trigger */}
                {collapsed ? (
                    <button
                        onClick={() => onCollapse(!collapsed)}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            padding: ds.spacing("2"),
                            borderRadius: ds.radius("sm"),
                            color: ds.color.text("secondary"),
                            fontSize: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: `background-color ${ds.common.animation.fast}`,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ds.color.background("secondary")}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                        <i className="ri-menu-line" />
                    </button>
                ) : (
                    /* Expanded: Show Full M Seller Logo */
                    <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                        <img
                            src="/assets/logos/Logo full/Theme=Default, Size=md, Unit=M Seller.svg"
                            alt="Allkons M Seller"
                            style={{ height: "32px", width: "auto" }}
                        />
                    </div>
                )}

                {/* Expanded Desktop Hamburger (Right side) OR Mobile Close Button */}
                {!collapsed && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {isMobile ? (
                            <Button
                                variant="secondary"
                                color="neutral"
                                size="middle"
                                onClick={onMobileClose}
                                icon={<i className="ri-close-line" />}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    padding: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            />
                        ) : (
                            <button
                                onClick={() => onCollapse(!collapsed)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    padding: ds.spacing("2"),
                                    borderRadius: ds.radius("sm"),
                                    color: ds.color.text("secondary"),
                                    fontSize: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: `background-color ${ds.common.animation.fast}`,
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ds.color.background("secondary")}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <i className="ri-menu-line" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Scrollable Navigation */}
            <div className="sidebar-scroll" style={{
                flex: 1,
                overflowY: "auto",
                padding: `0 ${ds.spacing("none")}`,
                minHeight: 0,
                paddingBottom: ds.spacing("4"),
                scrollbarWidth: "thin", // Standard Firefox
            }}>
                <style jsx>{`
                    .sidebar-scroll::-webkit-scrollbar {
                        width: 4px;
                    }
                    .sidebar-scroll::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .sidebar-scroll::-webkit-scrollbar-thumb {
                        background-color: ${ds.color.border("primary")};
                        border-radius: ${ds.radius("full")};
                    }
                    .sidebar-scroll::-webkit-scrollbar-thumb:hover {
                        background-color: ${ds.color.border("secondary")};
                    }
                `}</style>
                {accessibleNavConfig.map((section, index) => (
                    <div key={section.title}>
                        {/* Divider strictly BETWEEN sections (not before first) */}
                        {index > 0 && (
                            <div
                                style={{
                                    height: "1px",
                                    backgroundColor: ds.color.border("primary"),
                                    margin: `${ds.spacing("3")} 0 ${ds.spacing("2")} 0`,
                                }}
                            />
                        )}

                        <div style={{ padding: ds.spacing("3") }}>
                            {!collapsed && (
                                <div
                                    style={{
                                        ...ds.typography.preset("paragraph-xsmall"),
                                        color: ds.color.text("quinary"),
                                        padding: `${ds.spacing("1")} 0`,
                                        textTransform: "uppercase",
                                        fontWeight: ds.typography.weight("regular"),
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {section.title}
                                </div>
                            )}

                            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("1") }}>
                                {section.items.map((item) => renderMenuItem(item))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Mobile Drawer
    if (isMobile) {
        return (
            <Drawer
                placement="left"
                onClose={onMobileClose}
                open={isMobileOpen}
                width={280}
                styles={{ body: { padding: 0 } }}
                title={null}
                closable={false}
            >
                <div style={{ position: "relative", height: "100%" }}>
                    <SidebarContent />
                </div>
            </Drawer>
        );
    }

    return (
        <aside
            style={{
                width: currentWidth,
                minWidth: currentWidth,
                height: "100vh",
                position: "sticky",
                top: 0,
                zIndex: 900,
                transition: `all ${ds.common.animation.normal} ease`,
                backgroundColor: ds.color.background("primary"),
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontFamily: ds.typography.fontFamily.notoSans,
                borderRight: `0.5px solid ${ds.color.border("primary")}`,
            }}
        >
            <SidebarContent />
        </aside>
    );
};
