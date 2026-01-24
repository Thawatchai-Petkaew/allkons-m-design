import { ReactNode } from "react";

export interface SidebarItem {
    id: string;
    label: string;
    icon: ReactNode;
    href: string;
    badgeCount?: number;
    children?: SidebarItem[];
    external?: boolean;
}

export interface SidebarSection {
    title?: string;
    items: SidebarItem[];
}

export interface SellerSidebarProps {
    className?: string;
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
    currentPath: string;
    userRole?: string; // For future role-based filtering
}
