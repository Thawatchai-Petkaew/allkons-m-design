"use client";

import { useState, useEffect } from "react";
import { ds } from "@/design-system";

/**
 * Hook to detect if the current window width is less than a specific breakpoint.
 * Uses matchMedia for 1:1 parity with CSS media queries.
 * 
 * @param breakpoint - The breakpoint to check against (default: 'md')
 * @returns boolean - true if matches mobile condition
 */
export function useIsMobile(breakpointToken: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md') {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const breakpointValue = ds.breakpoint.pixel(breakpointToken);
        const query = `(max-width: ${breakpointValue - 0.02}px)`;
        const mediaQueryList = window.matchMedia(query);

        const checkMobile = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        // Initial check
        setIsMobile(mediaQueryList.matches);

        // Event listener for resize/media changes
        mediaQueryList.addEventListener("change", checkMobile);

        return () => mediaQueryList.removeEventListener("change", checkMobile);
    }, [breakpointToken]);

    return isMobile;
}
