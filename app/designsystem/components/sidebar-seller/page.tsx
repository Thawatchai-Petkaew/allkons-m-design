"use client";

import React, { useState } from "react";
import { SellerSidebar } from "@/components/seller/layout/SellerSidebar/SellerSidebar";
import { ds } from "@/design-system";
import { Badge } from "@/components/ui/Badge";

export default function SellerSidebarShowcase() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mockPath, setMockPath] = useState("/seller/dashboard");

    return (
        <div style={{ minHeight: "100vh", backgroundColor: ds.color.background("secondary") }}>
            <main className="demo-container">

                {/* Header Section */}
                <div style={{ marginBottom: "48px" }}>
                    <h1 style={{ ...ds.typography.preset("heading-h1"), color: ds.color.text("primary"), marginBottom: "12px" }}>
                        Seller Sidebar Navigation
                    </h1>
                    <p style={{ ...ds.typography.preset("paragraph-middle"), color: ds.color.text("secondary"), maxWidth: "800px" }}>
                        Responsive sidebar component with collapsible state, mobile drawer integration, and persistent "Dark" active styling.
                    </p>
                </div>

                {/* Interactive Demo */}
                <section className="demo-section white-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column", height: "800px" }}>
                    <div style={{
                        borderBottom: `1px solid ${ds.color.border("secondary")}`,
                        padding: "20px",
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        backgroundColor: "#f9fafb"
                    }}>
                        <div style={{ ...ds.typography.preset("paragraph-small"), color: ds.color.text("secondary"), fontWeight: "bold" }}>CONTROLS:</div>

                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "1px solid #d0d5dd",
                                cursor: "pointer",
                                backgroundColor: "white"
                            }}
                        >
                            {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        </button>

                        <button
                            onClick={() => setMobileOpen(true)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "1px solid #d0d5dd",
                                cursor: "pointer",
                                backgroundColor: "white"
                            }}
                        >
                            Open Mobile Drawer
                        </button>

                        <select
                            value={mockPath}
                            onChange={(e) => setMockPath(e.target.value)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "1px solid #d0d5dd",
                                cursor: "pointer"
                            }}
                        >
                            <option value="/seller/dashboard">Dashboard (Active)</option>
                            <option value="/seller/products">Products</option>
                            <option value="/seller/orders">Orders</option>
                            <option value="/seller/finance">Finance</option>
                        </select>
                    </div>

                    <div style={{ flex: 1, display: "flex", position: "relative", backgroundColor: "#f0f2f5" }}>
                        <SellerSidebar
                            collapsed={collapsed}
                            onCollapse={setCollapsed}
                            isMobileOpen={mobileOpen}
                            onMobileClose={() => setMobileOpen(false)}
                            currentPath={mockPath}
                        // Force desktop mode for the sidebar itself inside the demo container usually, 
                        // but our component wraps Sider. 
                        // To visualise Mobile Drawer in this desktop view, we rely on the 'isMobileOpen' prop 
                        // but the component checks `useIsMobile`. 
                        // For this demo, we might see the Desktop logic unless we mock the viewport.
                        // The `onMobileClose` will work if we trigger responsive view.
                        />

                        <div style={{ flex: 1, padding: "32px" }}>
                            <div style={{
                                border: "2px dashed #ccc",
                                borderRadius: "12px",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#999"
                            }}>
                                Main Content Area
                            </div>
                        </div>
                    </div>
                </section>

                {/* Documentation */}
                <div className="demo-section logic-grid">
                    <DocCard title="Sidebar Specifications">
                        <ul className="doc-list">
                            <li><strong>State:</strong> Expanded (264px) / Collapsed (88px)</li>
                            <li><strong>Active Style:</strong> Dark Green (#Brand) pill background with White text/icon.</li>
                            <li><strong>Inactive Style:</strong> Transparent background with Grey secondary text.</li>
                            <li><strong>Persistence:</strong> Collapsed state saved in user `localStorage`.</li>
                        </ul>
                    </DocCard>

                    <DocCard title="Integration Guide">
                        <ul className="doc-list">
                            <li><strong>Shell:</strong> Use `SellerAppShell` to wrap pages. It handles layout and state passing.</li>
                            <li><strong>Header:</strong> Connect Header's hamburger button to `SellerAppShell`'s drawer trigger.</li>
                            <li><strong>Routing:</strong> Sidebar automatically highlights current route based on `pathname` prefix matching.</li>
                        </ul>
                    </DocCard>
                </div>

            </main>

            <style jsx global>{`
                .demo-container {
                    margin: 0 auto;
                    max-width: ${ds.breakpoint.value('xl')};
                    padding: 40px 32px;
                }
                .demo-section {
                    margin-bottom: 48px;
                }
                .white-card {
                    background-color: white;
                    border-radius: ${ds.radius("xl")};
                    box-shadow: 0 4px 24px rgba(0,0,0,0.04);
                    overflow: hidden;
                }
                .logic-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }
                .doc-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .doc-list li {
                    position: relative;
                    padding-left: 20px;
                    margin-bottom: 12px;
                    ${ds.typography.preset("paragraph-small")};
                    color: ${ds.color.text("secondary")};
                }
                .doc-list li::before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    font-weight: bold;
                    color: ${ds.color.text("brand-default")};
                }
            `}</style>
        </div>
    );
}

function DocCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div style={{
            padding: "32px",
            borderRadius: ds.radius("xl"),
            backgroundColor: "white",
            height: "100%"
        }}>
            <h3 style={{ ...ds.typography.preset("heading-h5"), marginBottom: "24px", color: ds.color.text("primary") }}>
                {title}
            </h3>
            {children}
        </div>
    );
}
