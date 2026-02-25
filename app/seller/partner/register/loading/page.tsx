"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ds } from "@/design-system";

function PartnerRegisterLoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provinceName = searchParams.get("provinceName") || "";
  const districtName = searchParams.get("districtName") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/seller/partner/register/status");
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
      {/* Spinner */}
      <div style={{ position: "relative", width: "80px", height: "80px" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            border: `8px solid ${ds.color.background("secondary")}`,
            borderTopColor: ds.color.text("brand-default"),
            borderRightColor: ds.color.system("warning"),
            borderBottomColor: ds.color.system("info"),
            borderLeftColor: ds.color.system("error"),
            borderRadius: "50%",
            animation: "partner-spin 1s linear infinite",
          }}
        />
        <style jsx>{`
          @keyframes partner-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* Text */}
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
          กำลังส่งใบสมัครพาร์ทเนอร์...
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
        {provinceName && districtName && (
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("brand-default"),
              margin: 0,
              marginTop: ds.spacing("2"),
            }}
          >
            พื้นที่: {provinceName}, {districtName}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PartnerRegisterLoadingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PartnerRegisterLoadingContent />
    </Suspense>
  );
}
