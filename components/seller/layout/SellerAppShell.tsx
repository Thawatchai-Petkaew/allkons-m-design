"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { SellerSidebar } from "./SellerSidebar/SellerSidebar";
import { ds } from "@/design-system";

interface SellerAppShellProps {
    children: React.ReactNode;
    // We can accept slots for Header if composition is preferred
    headerSlot?: React.ReactNode;
}

export const SellerAppShell: React.FC<SellerAppShellProps> = ({ children, headerSlot }) => {
    const isMobile = useIsMobile();
    const pathname = usePathname();

    // State
    const [collapsed, setCollapsed] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Persistence
    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem("seller_sidebar_collapsed");
        if (stored) {
            setCollapsed(JSON.parse(stored));
        }
    }, []);

    const handleCollapse = (val: boolean) => {
        setCollapsed(val);
        localStorage.setItem("seller_sidebar_collapsed", JSON.stringify(val));
    };

    // Close drawer on route change
    useEffect(() => {
        setMobileDrawerOpen(false);
    }, [pathname]);

    // Don't render until mounted to prevent hydration mismatch on persisted state
    if (!isMounted) return null;

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: ds.color.background("secondary") }}>
            {/* Sidebar */}
            <SellerSidebar
                collapsed={collapsed}
                onCollapse={handleCollapse}
                isMobileOpen={mobileDrawerOpen}
                onMobileClose={() => setMobileDrawerOpen(false)}
                currentPath={pathname}
            />

            {/* Main Content Area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%", overflow: "hidden" }}>
                {/* Header Slot - Pass toggle handler if needed */}
                {headerSlot && (
                    <div style={{ position: "sticky", top: 0, zIndex: 950 }}>
                        {/* We could inject a hamburger trigger here if the Header doesn't have one native */}
                        {/* Ideally the Header component receives 'onOpenDrawer' prop */}
                        {React.isValidElement(headerSlot) && React.cloneElement(headerSlot as React.ReactElement<any>, {
                            onMobileMenuClick: () => setMobileDrawerOpen(true)
                        })}
                    </div>
                )}

                <main style={{
                    flex: 1,
                    overflowY: "auto",
                    backgroundColor: ds.color.background("secondary")
                }}>
                    <div style={{
                        maxWidth: ds.breakpoint.value('2xl'), // 1536px
                        margin: "0 auto",
                        padding: isMobile ? ds.spacing("4") : ds.spacing("6"),
                        boxSizing: "border-box"
                    }}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
