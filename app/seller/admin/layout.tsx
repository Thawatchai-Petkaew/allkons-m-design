"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SellerAppShell } from "@/components/seller/layout/SellerAppShell";
import { SellerHeader } from "@/components/seller/SellerHeader";
import { ds } from "@/design-system";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useSellerSession } from "@/lib/hooks/useSellerSession";
import { signOut } from "@/lib/auth/mockAuth";
import { message, Spin } from "antd";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isMobile = useIsMobile('lg');
    const { user, org, organizations, memberships, shops, shop, branches, branch, loading, switchOrg, switchShop } = useSellerSession();

    const handleLogout = async () => {
        await signOut();
        message.success("ออกจากระบบเรียบร้อยแล้ว");
        router.push("/seller/login");
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push("/seller/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: ds.color.background('primary'),
                padding: isMobile ? ds.spacing('4') : ds.spacing('6'),
            }}>
                <Spin size="large">
                    <div style={{
                        marginTop: ds.spacing('6'),
                        color: ds.color.text('secondary'),
                        ...ds.typography.preset('paragraph-middle'),
                        fontWeight: ds.typography.weight('medium'),
                        textAlign: 'center',
                    }}>กำลังเตรียมข้อมูลร้านค้า...</div>
                </Spin>
            </div>
        );
    }

    if (!user) return null;

    // Prepare info for header according to real data
    const userInfo = user ? {
        id: user.id,
        name: user.displayName || `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatar: user.avatarUrl,
        isVerified: user.emailVerified && user.phoneVerified,
    } : undefined;

    const selectedBranch = branch;

    const shopInfo = selectedBranch ? {
        id: selectedBranch.id,
        name: selectedBranch.name,
        logo: undefined,
        type: "branch" as const,
        isActive: selectedBranch.isActive,
        isMain: selectedBranch.isMain,
        shopName: shop?.name,
        orgId: org?.id || "",
    } : undefined;

    const orgInfo = org ? {
        id: org.id,
        name: org.name,
        logo: org.logoUrl,
        type: org.type === 'personal' ? ('individual' as const) : ('legal' as const),
        role: memberships?.find((m: any) => m.orgId === org.id)?.role === 'owner' ? "เจ้าของ" : "สมาชิก",
        kybVerified: org.kybStatus === "verified",
    } : undefined;

    const orgsList = (organizations || []).map((o: any) => ({
        id: o.id,
        name: o.name,
        logo: o.logoUrl,
        type: o.type === 'personal' ? ('individual' as const) : ('legal' as const),
        role: memberships?.find((m: any) => m.orgId === o.id)?.role === 'owner' ? "เจ้าของ" : "สมาชิก",
        kybVerified: o.kybStatus === "verified",
    }));

    // Branch selector list (1 org = 1 shop; operate at branch level)
    const branchesList = branches.map((b: any) => ({
        id: b.id,
        name: b.name,
        logo: undefined,
        type: "branch" as const,
        isActive: b.isActive,
        isMain: b.isMain,
        shopName: shop?.name,
        orgId: org?.id || "",
    }));

    return (
        <div
            style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
            }}
        >
            <SellerAppShell
                headerSlot={
                    <SellerHeader
                        currentShop={shopInfo}
                        shops={branchesList as any}
                        currentOrg={orgInfo}
                        orgs={orgsList}
                        user={userInfo}
                        notificationCount={5}
                        onShopChange={switchShop}
                        onOrgChange={switchOrg}
                        onProfile={() => router.push("/profile")}
                        onSettings={() => router.push("/shop-management")}
                        onManageOrgs={() => router.push("/organization-settings")}
                        onNotificationClick={() => message.info("Mock Notifications")}
                        onLogout={handleLogout}
                        onMobileMenuClick={() => console.log("Mobile menu clicked")}
                    />
                }
            >
                {children}
            </SellerAppShell>
        </div>
    );
}
