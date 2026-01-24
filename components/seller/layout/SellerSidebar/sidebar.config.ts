import React from "react";
import { SidebarSection } from "./sidebar.types";

// Configuration for Seller Navigation as per Figma Design
export const getSellerSidebarConfig = (): SidebarSection[] => [
    {
        title: "DASHBOARD",
        items: [
            {
                id: "all-shops",
                label: "ร้านค้าทั้งหมด",
                href: "/all-shops",
                icon: React.createElement("i", { className: "ri-home-4-line" }),
            },
            {
                id: "analytics",
                label: "วิเคราะห์ธุรกิจ",
                href: "/analytics",
                icon: React.createElement("i", { className: "ri-bar-chart-box-line" }),
            },
            {
                id: "orders",
                label: "คำสั่งซื้อ",
                href: "/orders",
                icon: React.createElement("i", { className: "ri-list-check" }),
            }
        ]
    },
    {
        title: "MANAGEMENT",
        items: [
            {
                id: "products",
                label: "สินค้า",
                href: "/products",
                icon: React.createElement("i", { className: "ri-shopping-bag-3-line" }),
                // Submenu items
                children: [
                    {
                        id: "manage-products",
                        label: "จัดการสินค้า",
                        href: "/products/manage",
                        icon: undefined,
                    },
                    {
                        id: "import-products",
                        label: "นำเข้าสินค้า",
                        href: "/products/import",
                        icon: undefined,
                    }
                ]
            },
            {
                id: "service",
                label: "บริการ",
                href: "/service",
                icon: React.createElement("i", { className: "ri-customer-service-2-line" }),
            },
            {
                id: "customer-management",
                label: "บริหารลูกค้า",
                href: "/customers",
                icon: React.createElement("i", { className: "ri-user-settings-line" }),
            },
            {
                id: "marketing",
                label: "การตลาด",
                href: "/marketing",
                icon: React.createElement("i", { className: "ri-advertisement-line" }),
            },
            {
                id: "content",
                label: "คอนเทนต์",
                href: "/content",
                icon: React.createElement("i", { className: "ri-file-text-line" }),
            },
            {
                id: "finance",
                label: "การเงิน",
                href: "/finance",
                icon: React.createElement("i", { className: "ri-wallet-3-line" }),
            },
            {
                id: "catalog",
                label: "แคตตาล็อก",
                href: "/catalog",
                icon: React.createElement("i", { className: "ri-book-read-line" }),
            }
        ]
    },
    {
        title: "MERCHANT CENTER",
        items: [
            {
                id: "shop-management",
                label: "จัดการร้านค้า",
                href: "/shop-management",
                icon: React.createElement("i", { className: "ri-store-3-line" }),
            },
            {
                id: "product-categories",
                label: "หมวดหมู่สินค้า",
                href: "/categories",
                icon: React.createElement("i", { className: "ri-layout-grid-line" }),
            },
            {
                id: "online-market",
                label: "ตลาดออนไลน์",
                href: "/online-market",
                icon: React.createElement("i", { className: "ri-global-line" }),
            },
            {
                id: "decoration",
                label: "ตกแต่งร้านค้า",
                href: "/decoration",
                icon: React.createElement("i", { className: "ri-palette-line" }),
            },
            {
                id: "application",
                label: "แอพพลิเคชั่น",
                href: "/application",
                icon: React.createElement("i", { className: "ri-smartphone-line" }),
            }
        ]
    }
];
