"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShopSetupModal } from "@/components";
import { ds } from "@/design-system";

function SellerRegisterCreateShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const phoneNumber = searchParams.get("phone") || "";
  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const email = searchParams.get("email") || "";
  const profileType = searchParams.get("profileType") || "";
  const businessTypes = searchParams.get("businessTypes") || "";
  const marketingConsent = searchParams.get("marketingConsent") === "true";
  
  // Business profile data
  const commercialRegNumber = searchParams.get("commercialRegNumber") || "";
  const businessName = searchParams.get("businessName") || "";
  const juristicPersonId = searchParams.get("juristicPersonId") || "";
  const juristicPersonType = searchParams.get("juristicPersonType") || "";
  const organizationName = searchParams.get("organizationName") || "";
  const branchName = searchParams.get("branchName") || "";

  const [showShopModal, setShowShopModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Show shop setup modal on mount
  useEffect(() => {
    setShowShopModal(true);
  }, []);

  const handleShopSetupComplete = async (shopName: string, subdomain: string) => {
    setIsCreating(true);
    setShowShopModal(false);

    try {
      // Get current user from Supabase (if authenticated)
      // For MVP, we'll use the phone number as userId temporarily
      const userId = phoneNumber; // In production, get from Supabase session

      // Call API to create Account + ORG + Shop
      const response = await fetch("/api/seller/register/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          phoneNumber,
          firstName,
          lastName,
          email,
          password: "", // Password was set in step 2, but we need to get it from session
          profileType,
          businessTypes: businessTypes.split(","),
          commercialRegNumber: profileType === "individual" ? commercialRegNumber : undefined,
          businessName: profileType === "individual" ? businessName : undefined,
          juristicPersonId: profileType === "juristic" ? juristicPersonId : undefined,
          juristicPersonType: profileType === "juristic" ? juristicPersonType : undefined,
          organizationName: profileType === "juristic" ? organizationName : undefined,
          branchName: profileType === "juristic" ? branchName : undefined,
          shopName,
          subdomain,
          marketingConsent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการสร้างบัญชี");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "เกิดข้อผิดพลาดในการสร้างบัญชี");
      }

      // Navigate to loading page, then dashboard
      router.push(
        `/seller/register/loading?accountId=${encodeURIComponent(data.data.accountId)}&shopId=${encodeURIComponent(data.data.shopId)}`
      );
    } catch (err: any) {
      console.error("Error creating shop:", err);
      setIsCreating(false);
      setShowShopModal(true);
      // Show error (you can add error state here)
      alert(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ds.color.background("secondary"),
      }}
    >
      <ShopSetupModal
        open={showShopModal}
        onClose={() => {
          // Don't allow closing during creation
          if (!isCreating) {
            router.back();
          }
        }}
        userName={fullName}
        phoneNumber={phoneNumber}
        onComplete={handleShopSetupComplete}
      />
    </div>
  );
}

export default function SellerRegisterCreateShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellerRegisterCreateShopPageContent />
    </Suspense>
  );
}
