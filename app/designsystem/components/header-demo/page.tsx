"use client";

import React, { useState } from "react";
import { SellerHeader, ShopDropdown } from "@/components/seller";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Dot } from "@/components/ui/Dot";
import { ds } from "@/design-system";
import type { ShopInfo, OrgInfo, UserInfo } from "@/types/seller-types";

/**
 * Technical Documentation and Demo for SellerHeader
 */
export default function SellerHeaderDemo() {
    // Mock data - Preserved from original
    const mockShops: ShopInfo[] = [
        { id: "1", orgId: "1", name: "ธรรมสรณ์", logo: undefined, isActive: true, type: "shop" },
        { id: "2", orgId: "1", name: "นครหลวง 01", logo: undefined, isActive: true, type: "branch" },
        { id: "3", orgId: "1", name: "นครหลวง 02", logo: undefined, isActive: false, type: "branch" },
        { id: "4", orgId: "2", name: "บางเขน", logo: undefined, isActive: true, type: "branch" },
        { id: "5", orgId: "3", name: "ชวนชร ระยอง", logo: undefined, isActive: false, type: "branch" },
    ];

    const mockOrgs: OrgInfo[] = [
        { id: "1", name: "บริษัท ธรรมสรณ์ จำกัด", logo: "/assets/org logo/TMC logo.png", role: "เจ้าของ", kybVerified: true, type: "legal" },
        { id: "2", name: "บริษัท เมโทรโพลิสัน จำกัด", logo: undefined, role: "เจ้าของ", kybVerified: false, type: "legal" },
        { id: "3", name: "Skyline Development", logo: undefined, role: "เจ้าของ", kybVerified: true, type: "individual" },
        { id: "4", name: "แกรนด์ เมลเลอน", logo: undefined, role: "สมาชิก", kybVerified: true, type: "individual" },
    ];

    const mockUser: UserInfo = {
        id: "1",
        name: "เดชวิทย์ มงคลฉิต",
        email: "dechwit@gmail.com",
        avatar: "/assets/avatar/dec-mon profile.png",
        isVerified: true,
    };

    const [currentOrg, setCurrentOrg] = useState<OrgInfo>(mockOrgs[0]);
    const filteredShops = mockShops.filter(shop => shop.orgId === currentOrg.id);
    const [currentShop, setCurrentShop] = useState<ShopInfo>(filteredShops[0] || mockShops[0]);
    const [notificationCount] = useState(99);

    const handleOrgChange = (orgId: string) => {
        const org = mockOrgs.find((o) => o.id === orgId);
        if (org) {
            setCurrentOrg(org);
            // Sync Shop: Switch to the first shop of the new organization
            const newFilteredShops = mockShops.filter(shop => shop.orgId === org.id);
            if (newFilteredShops.length > 0) {
                setCurrentShop(newFilteredShops[0]);
            }
        }
    };

    const handleShopChange = (shopId: string) => {
        const shop = mockShops.find(s => s.id === shopId);
        if (shop) {
            setCurrentShop(shop);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: ds.color.background("primary") }}>
            <SellerHeader
                currentShop={currentShop}
                shops={filteredShops}
                currentOrg={currentOrg}
                orgs={mockOrgs}
                user={mockUser}
                notificationCount={notificationCount}
                onShopChange={handleShopChange}
                onOrgChange={handleOrgChange}
            />

            <main className="demo-container">
                {/* Header Section */}
                <div style={{ marginBottom: "64px" }}>
                    <h1 style={{ ...ds.typography.preset("heading-h1"), color: ds.color.text("primary"), marginBottom: "12px" }}>
                        Seller Header Documentation
                    </h1>
                    <p style={{ ...ds.typography.preset("paragraph-middle"), color: ds.color.text("secondary"), maxWidth: "800px" }}>
                        Detailed breakdown of business logic, UI patterns, and state synchronization for the Seller Navigation system.
                    </p>
                </div>

                {/* State Monitoring Section - Grouped with subtle brand background */}
                <section className="demo-section monitoring-section">
                    <h2 style={{ ...ds.typography.preset("heading-h3"), marginBottom: "32px", color: "var(--brand-m-primary-00)" }}>
                        Live Synchronization State
                    </h2>
                    <div className="state-grid">
                        <StateCard label="Active Organization" value={currentOrg.name} status={currentOrg.role} />
                        <StateCard label="Organization KYB" value={currentOrg.kybVerified ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"} color={currentOrg.kybVerified ? "brand" : "error"} />
                        <StateCard label="Active Shop/Branch" value={currentShop.name} status={currentShop.type === "shop" ? "ร้านค้าหลัก" : "สาขา"} />
                        <StateCard label="Shop Status" value={currentShop.isActive ? "เปิดขาย" : "ปิดขาย"} color={currentShop.isActive ? "brand" : "error"} />
                    </div>
                </section>

                {/* Logic Documentation Grid - Grouped with neutral background */}
                <div className="demo-section logic-grid">
                    <DocCard title="Business Relationship Logic" transparent>
                        <ul className="doc-list">
                            <li><strong>Hierarchy:</strong> Users can belong to multiple Organizations. Each Organization can own multiple Shops or Branches.</li>
                            <li><strong>Scoped Selection:</strong> Switching Organizations automatically updates the available Shops list to match the organizational scope.</li>
                            <li><strong>Shop vs Branch:</strong> Entities are labeled with prefixes ("ร้าน" or "สาขา") to distinguish primary retail units from secondary locations.</li>
                        </ul>
                    </DocCard>

                    <DocCard title="UI & Asset Logic" transparent>
                        <ul className="doc-list">
                            <li><strong>Verification Badges:</strong> Dual-state implementation for KYB and User verification using 2xs badges with semantic icons.</li>
                            <li><strong>Dynamic Typography:</strong> Responsive font scaling and weight adjustment based on entity importance and active state.</li>
                            <li><strong>Prefix Logic:</strong> Conditional string templating used in the toggle button to provide immediate context of entity type.</li>
                        </ul>
                    </DocCard>

                    <DocCard title="Edge Case & Fallback Logic" transparent>
                        <ul className="doc-list">
                            <li><strong>Asset Missing:</strong> If `logo` or `avatar` is undefined, the system generates a semantic fallback (e.g., entity initials or default themed icons).</li>
                            <li><strong>Unverified State:</strong> Unverified organizations are highlighted with `error` status badges and specific warning icons to prompt action.</li>
                            <li><strong>Empty Email:</strong> In scenarios with missing user metadata, the UI prioritizes the Name or ID as a primary identifier.</li>
                        </ul>
                    </DocCard>
                </div>

                {/* Shop Dropdown Specialized Documentation */}
                <section className="demo-section white-card">
                    <h2 style={{ ...ds.typography.preset("heading-h3"), marginBottom: "40px", color: ds.color.text("primary") }}>
                        Shop Dropdown Technical Breakdown
                    </h2>

                    <div className="split-layout">
                        {/* UI Matrix */}
                        <div>
                            <h3 style={{ ...ds.typography.preset("heading-h5"), marginBottom: "24px", color: ds.color.text("secondary") }}>UI Matrix: Shop Variations</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <ShopMatrixItem
                                    label="Primary Shop (With Logo)"
                                    name="Allkons Main Store"
                                    logo="/assets/logos/Logo mark/Theme=Default, Size=md, Type=Icon.svg"
                                    isActive={true}
                                    type="shop"
                                />
                                <ShopMatrixItem
                                    label="Branch (Without Logo - Fallback)"
                                    name="Bangkok Branch"
                                    isActive={true}
                                    type="branch"
                                />
                                <ShopMatrixItem
                                    label="Inactive State"
                                    name="Old Storage"
                                    isActive={false}
                                    type="branch"
                                />
                            </div>
                        </div>

                        {/* Toggle Logic Breakdown */}
                        <div className="logic-breakdown">
                            <h3 style={{ ...ds.typography.preset("heading-h5"), marginBottom: "24px", color: "var(--brand-m-primary-00)" }}>Current Shop Toggle UI Logic</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                <div>
                                    <div style={{ ...ds.typography.preset("paragraph-xsmall"), color: ds.color.text("tertiary"), marginBottom: "8px", fontWeight: "bold" }}>PREFIX LOGIC</div>
                                    <div style={{ display: "flex", gap: "12px" }}>
                                        <Badge variant="subtle" color="brand">ร้าน + [Name]</Badge>
                                        <Badge variant="subtle" color="neutral">สาขา + [Name]</Badge>
                                    </div>
                                </div>
                                <div style={{ ...ds.typography.preset("paragraph-small"), color: ds.color.text("secondary"), lineHeight: "1.6" }}>
                                    The header toggle dynamically prepends "ร้าน" for entities of type `shop` and "สาขา" for `branch`.
                                    This provides immediate organizational context without opening the dropdown.
                                </div>
                                <div style={{ paddingTop: "24px", borderTop: `1px solid rgba(0,0,0,0.05)` }}>
                                    <div style={{ ...ds.typography.preset("paragraph-xsmall"), color: ds.color.text("tertiary"), marginBottom: "8px", fontWeight: "bold" }}>ACTIVITY INDICATOR</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <Dot active={true} size="sm" />
                                            <span style={{ ...ds.typography.preset("paragraph-small") }}>เปิดขาย</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <Dot active={false} size="sm" />
                                            <span style={{ ...ds.typography.preset("paragraph-small") }}>ปิดขาย</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Component Anatomy & Showcase */}
                    <div className="anatomy-section">
                        <div className="anatomy-card">
                            <h3 style={{ ...ds.typography.preset("heading-h5"), marginBottom: "24px" }}>Component Anatomy</h3>
                            <ul className="doc-list">
                                <li><strong>Header:</strong> Thai label "เลือกร้านค้า/สาขา" uses `paragraph-small` secondary text.</li>
                                <li><strong>Scroll Area:</strong> Supports long lists of branches with unified item styling.</li>
                                <li><strong>Selection Indicator:</strong> Active selection marked with a `brand-default` circle and checkmark icon.</li>
                                <li><strong>Action Group:</strong> Secondary buttons for "Add Branch" and "Manage All" separated by consistent spacing.</li>
                            </ul>
                        </div>

                        {/* Inline Component Showcase */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <h3 style={{ ...ds.typography.preset("heading-h5") }}>Component UI Inspection</h3>
                            <div className="inspection-container">
                                <div className="inspection-inner">
                                    <ShopDropdown
                                        isOpen={true}
                                        onClose={() => { }}
                                        currentShop={mockShops[0]}
                                        shops={mockShops.slice(0, 3)}
                                        disableMobileBottomSheet={true}
                                        style={{
                                            position: "relative",
                                            top: 0,
                                            width: "100%",
                                            boxShadow: "none",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <style jsx global>{`
                .demo-container {
                    margin: 0 auto;
                    max-width: ${ds.breakpoint.value('xl')};
                    padding: 40px 32px;
                }
                .demo-section {
                    padding: 40px;
                    margin-bottom: 48px;
                    border-radius: ${ds.radius("xl")};
                }
                .state-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 20px;
                }
                .logic-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
                    gap: 24px;
                    margin-bottom: 64px;
                }
                .white-card {
                    background-color: white;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.04);
                    margin-top: 64px;
                }
                .split-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                }
                .logic-breakdown {
                    background-color: ${ds.color.background("secondary")};
                    padding: 32px;
                    border-radius: ${ds.radius("xl")};
                }
                .anatomy-section {
                    margin-top: 48px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                    padding-top: 48px;
                    border-top: 1px solid ${ds.color.border("secondary")};
                }
                .anatomy-card {
                    background-color: ${ds.color.background("secondary")};
                    padding: 32px;
                    border-radius: ${ds.radius("xl")};
                }
                .inspection-container {
                    position: relative;
                    height: auto;
                    background-color: ${ds.color.background("secondary")};
                    border-radius: ${ds.radius("xl")};
                    padding: 32px;
                    overflow: visible;
                    display: flex;
                    justify-content: center;
                }
                .inspection-inner {
                    width: 320px;
                }

                @media (max-width: ${ds.breakpoint.value('lg')}) {
                    .split-layout, .anatomy-section {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: ${ds.breakpoint.value('md')}) {
                    .demo-container {
                        padding: 40px 16px;
                    }
                    .demo-section {
                        padding: 24px 16px;
                    }
                    .logic-grid {
                        grid-template-columns: 1fr;
                    }
                    .inspection-container {
                        padding: 24px 12px;
                    }
                    .inspection-inner {
                        width: 100%;
                        max-width: 320px;
                    }
                }

                .doc-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .doc-list li {
                    position: relative;
                    padding-left: 20px;
                    margin-bottom: 16px;
                    ${ds.typography.preset("paragraph-small")};
                    color: ${ds.color.text("secondary")};
                    line-height: 1.6;
                }
                .doc-list li::before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    color: ${ds.color.text("brand-default")};
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}

// Helper component for UI Matrix
function ShopMatrixItem({ label, name, logo, isActive, type }: { label: string, name: string, logo?: string, isActive: boolean, type: "shop" | "branch" }) {
    return (
        <div style={{
            padding: "16px",
            borderRadius: ds.radius("lg"),
            backgroundColor: ds.color.background("secondary"),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("3"), flex: 1 }}>
                <Avatar
                    src={logo}
                    alt={name}
                    size="md"
                    fallback={name.charAt(0)}
                    fallbackType="store-icon"
                />
                <div>
                    <div style={{ ...ds.typography.preset("paragraph-small"), fontWeight: ds.typography.weight("medium") }}>
                        {(type === "shop" ? "ร้าน" : "สาขา") + name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Dot active={isActive} size="sm" />
                        <span style={{ ...ds.typography.preset("paragraph-xsmall"), color: ds.color.text("secondary") }}>
                            {isActive ? "เปิดขาย" : "ปิดขาย"}
                        </span>
                    </div>
                </div>
            </div>
            <div style={{
                ...ds.typography.preset("paragraph-xsmall"),
                color: ds.color.text("tertiary"),
                backgroundColor: "white",
                padding: "2px 8px",
                borderRadius: ds.radius("sm"),
                fontWeight: "bold",
                whiteSpace: "nowrap"
            }}>
                {label.split('(')[0].trim()}
            </div>
        </div>
    );
}

// Helper components for the demo page
function StateCard({ label, value, status, color }: { label: string, value: string, status?: string, color?: "brand" | "error" }) {
    return (
        <div style={{
            padding: "20px",
            borderRadius: ds.radius("lg"),
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}>
            <span style={{ ...ds.typography.preset("paragraph-xsmall"), color: ds.color.text("tertiary"), display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                {label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ ...ds.typography.preset("paragraph-small"), fontWeight: ds.typography.weight("semibold"), color: ds.color.text("primary") }}>
                    {value}
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                    {status && <Badge variant="subtle" size="xs" color="neutral">{status}</Badge>}
                    {color && <Badge variant="filled" size="xs" color={color}>{value === "ปิดขาย" || value === "ยังไม่ยืนยัน" ? "Alert" : "Verified"}</Badge>}
                </div>
            </div>
        </div>
    );
}

function DocCard({ title, children, transparent }: { title: string, children: React.ReactNode, transparent?: boolean }) {
    return (
        <div style={{
            padding: "32px",
            borderRadius: ds.radius("xl"),
            backgroundColor: transparent ? "transparent" : "white",
            height: "100%"
        }}>
            <h3 style={{ ...ds.typography.preset("heading-h5"), marginBottom: "24px", color: ds.color.text("primary") }}>
                {title}
            </h3>
            {children}
        </div>
    );
}
