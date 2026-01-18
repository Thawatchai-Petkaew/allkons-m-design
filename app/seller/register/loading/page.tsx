"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ds } from "@/design-system";

function SellerRegisterLoadingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId") || "";
  const shopId = searchParams.get("shopId") || "";

  useEffect(() => {
    // Simulate loading time (2-3 seconds)
    const timer = setTimeout(() => {
      // Navigate to seller dashboard
      router.push("/dashboard/seller");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ds.color.background("primary"),
        gap: ds.spacing("8"),
      }}
    >
      {/* Loading Spinner - Band Color */}
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
        }}
      >
        {/* Animated spinner with band colors */}
        <div
          style={{
            width: "100%",
            height: "100%",
            border: `8px solid ${ds.color.background("secondary")}`,
            borderTopColor: ds.color.system("error"),
            borderRightColor: ds.color.system("warning"),
            borderBottomColor: ds.color.text("brand-default"),
            borderLeftColor: ds.color.system("info"),
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>

      {/* Loading Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: ds.spacing("2"),
        }}
      >
        <p
          style={{
            fontSize: ds.typography.size("lg"),
            fontWeight: ds.typography.weight("semibold"),
            color: ds.color.text("primary"),
            margin: 0,
          }}
        >
          กำลังสร้างร้านค้าของคุณ...
        </p>
        <p
          style={{
            fontSize: ds.typography.size("sm"),
            color: ds.color.text("secondary"),
            margin: 0,
          }}
        >
            กรุณารอสักครู่
        </p>
      </div>
    </div>
  );
}

export default function SellerRegisterLoadingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellerRegisterLoadingPageContent />
    </Suspense>
  );
}
