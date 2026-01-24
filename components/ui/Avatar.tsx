"use client";

import React, { useEffect, useState } from "react";
import { ds } from "@/design-system";
import "remixicon/fonts/remixicon.css";

export interface AvatarProps {
    src?: string;
    alt?: string;
    size?: "sm" | "md" | "lg";
    fallback?: string; // Initials or text
    fallbackType?: "text" | "store-icon" | "user-icon"; // Type of fallback
    className?: string;
    customBgColor?: string; // Custom background color for text fallback
    customTextColor?: string; // Custom text color for text fallback
}

/**
 * Avatar Component
 * 
 * Displays user, shop, or organization avatars with automatic fallback
 * to initials or store icon when image is not available or fails to load.
 * 
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" size="md" fallback="JD" />
 * <Avatar size="lg" fallback="AB" />
 * <Avatar size="md" fallbackType="store-icon" />
 * ```
 */
export function Avatar({
    src,
    alt = "",
    size = "md",
    fallback,
    fallbackType = "text",
    className = "",
    customBgColor,
    customTextColor,
}: AvatarProps) {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [src]);

    // Size mappings (in pixels)
    const sizeMap = {
        sm: "32px",
        md: "40px",
        lg: "48px",
    };

    // Font size for fallback text
    const fontSizeMap = {
        sm: ds.typography.size("xs"),
        md: ds.typography.size("sm"),
        lg: ds.typography.size("md"),
    };

    // Icon size for Remix icons
    const iconSizeMap = {
        sm: "16px",
        md: "20px",
        lg: "24px",
    };

    const showFallback = !src || imageError;

    const baseStyles: React.CSSProperties = {
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
    };

    if (showFallback) {
        // Store icon fallback (Remix icon: ri-store-2-line)
        if (fallbackType === "store-icon") {
            return (
                <div
                    className={className}
                    style={{
                        ...baseStyles,
                        backgroundColor: ds.color.background("brand-default"),
                    }}
                    aria-label={alt || "Store"}
                >
                    <i
                        className="ri-store-2-line"
                        style={{
                            fontSize: iconSizeMap[size],
                            color: "white",
                            lineHeight: 1,
                        }}
                    />
                </div>
            );
        }

        // User icon fallback (Remix icon: ri-user-line)
        if (fallbackType === "user-icon") {
            return (
                <div
                    className={className}
                    style={{
                        ...baseStyles,
                        backgroundColor: customBgColor || "var(--brand-m-primary-light-90)",
                    }}
                    aria-label={alt || "User"}
                >
                    <i
                        className="ri-user-line"
                        style={{
                            fontSize: iconSizeMap[size],
                            color: customTextColor || "var(--brand-m-primary-00)",
                            lineHeight: 1,
                        }}
                    />
                </div>
            );
        }

        // Text fallback
        return (
            <div
                className={className}
                style={{
                    ...baseStyles,
                    backgroundColor: customBgColor || ds.color.background("secondary"),
                    color: customTextColor || ds.color.text("secondary"),
                    fontSize: fontSizeMap[size],
                    fontWeight: ds.typography.weight("medium"),
                    textTransform: "uppercase",
                }}
                aria-label={alt || "Avatar"}
            >
                {fallback || alt?.charAt(0) || "?"}
            </div>
        );
    }

    return (
        <div className={className} style={baseStyles}>
            <img
                src={src}
                alt={alt}
                onError={() => setImageError(true)}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}

export default Avatar;
