"use client";

import React from "react";
import Link from "next/link";
import { ds } from "@/design-system";

/**
 * Design System - Custom Components Overview
 * 
 * This page lists and provides access to complex custom components
 * that are part of the Allkons M Design ecosystem.
 */
export default function ComponentsOverview() {
    const customComponents = [
        {
            name: "Seller Header",
            path: "/designsystem/components/header-demo",
            description: "Advanced navigation header with shop, organization, and account selectors.",
            features: ["Responsive (Mobile Avatar-only)", "Context-aware", "Dual-state Badges"],
            status: "Ready",
        },
        // More components can be added here as they are developed
    ];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: ds.color.background("secondary") }}>
            <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px" }}>
                <div style={{ marginBottom: "48px" }}>
                    <Link
                        href="/designsystem"
                        style={{
                            ...ds.typography.preset("link-small"),
                            color: ds.color.text("tertiary"),
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "16px",
                            textDecoration: "none"
                        }}
                    >
                        <i className="ri-arrow-left-line" /> Back to Design System
                    </Link>
                    <h1 style={{ ...ds.typography.preset("heading-h1"), color: ds.color.text("primary"), marginBottom: "12px" }}>
                        Custom Components
                    </h1>
                    <p style={{ ...ds.typography.preset("paragraph-middle"), color: ds.color.text("secondary"), maxWidth: "800px" }}>
                        High-level functional components built specifically for the Allkons ecosystem.
                        Unlike atomic UI elements, these components handle complex business logic and integrated state.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
                    {customComponents.map((comp) => (
                        <Link
                            key={comp.name}
                            href={comp.path}
                            style={{ textDecoration: "none" }}
                        >
                            <div style={{
                                backgroundColor: "white",
                                borderRadius: ds.radius("xl"),
                                border: `1px solid ${ds.color.border("secondary")}`,
                                padding: "32px",
                                height: "100%",
                                transition: "all 0.2s ease-in-out",
                                cursor: "pointer",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                            }}
                                className="comp-card"
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                                    <h3 style={{ ...ds.typography.preset("heading-h5"), color: ds.color.text("primary"), margin: 0 }}>
                                        {comp.name}
                                    </h3>
                                    <div style={{
                                        padding: "4px 12px",
                                        borderRadius: ds.radius("full"),
                                        backgroundColor: "var(--brand-m-primary-light-90)",
                                        ...ds.typography.preset("paragraph-xsmall"),
                                        fontWeight: ds.typography.weight("bold"),
                                        color: "var(--brand-m-primary-00)"
                                    }}>
                                        {comp.status}
                                    </div>
                                </div>

                                <p style={{ ...ds.typography.preset("paragraph-small"), color: ds.color.text("secondary"), marginBottom: "24px" }}>
                                    {comp.description}
                                </p>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {comp.features.map(f => (
                                        <span key={f} style={{
                                            ...ds.typography.preset("paragraph-xsmall"),
                                            color: ds.color.text("tertiary"),
                                            backgroundColor: ds.color.background("secondary"),
                                            padding: "2px 8px",
                                            borderRadius: ds.radius("sm")
                                        }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <style jsx>{`
                :global(.comp-card):hover {
                    border-color: var(--brand-m-primary-00) !important;
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.06) !important;
                }
            `}</style>
        </div>
    );
}
