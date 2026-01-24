import React from "react";
import { ds } from "@/design-system";
import { Illustration } from "@/components/ui/Illustration";

export interface SellerPlaceholderProps {
    /**
     * Remix icon class name (e.g., "ri-bar-chart-box-line")
     */
    icon: string;
    label: string;
    /**
     * Illustration color scheme
     */
    color?: "brand" | "error" | "info" | "warning" | "neutral";
    /**
     * Illustration size
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * SellerPlaceholder Component
 * 
 * A reusable empty state placeholder for seller pages.
 * Displays a centered Illustration with icon and label following the design system.
 */
export const SellerPlaceholder: React.FC<SellerPlaceholderProps> = ({
    icon,
    label,
    color = "neutral",
    size = "lg",
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                backgroundColor: ds.color.background("secondary"),
                borderRadius: ds.radius("md"),
                padding: ds.spacing("8"),
            }}
        >
            <Illustration
                type="remix"
                icon={icon}
                color={color}
                variant="withBackground"
                size={size}
            />
            <h2
                style={{
                    ...ds.typography.preset("heading-h4"),
                    fontWeight: ds.typography.weight("medium"),
                    color: ds.color.text("secondary"),
                    textAlign: "center",
                    fontFamily: ds.typography.fontFamily.notoSans,
                    marginTop: ds.spacing("4"),
                }}
            >
                {label}
            </h2>
        </div>
    );
};
