"use client";

import React from "react";

export interface DotProps {
    size?: "xs" | "sm" | "md" | "lg";
    active?: boolean;
    className?: string;
}

/**
 * Dot Component
 * 
 * A status indicator dot that can be used to show active/inactive states.
 * Commonly used in shop/branch listings to indicate active status.
 * 
 * @example
 * ```tsx
 * <Dot size="sm" active={true} />
 * <Dot size="md" active={false} />
 * ```
 */
export function Dot({ size = "md", active = true, className = "" }: DotProps) {
    // Size mappings (in pixels)
    const sizeMap = {
        xs: "6px",
        sm: "8px",
        md: "10px",
        lg: "12px",
    };

    // Color based on active state
    const color = active ? "#1EB950" : "#E5E7EB";

    return (
        <span
            className={className}
            style={{
                display: "inline-block",
                width: sizeMap[size],
                height: sizeMap[size],
                borderRadius: "50%",
                backgroundColor: color,
                flexShrink: 0,
            }}
            aria-label={active ? "Active" : "Inactive"}
            role="status"
        />
    );
}

export default Dot;
