"use client";

import { useState, useEffect, useCallback } from "react";
import { getUser } from "@/lib/supabase/auth";
import {
    getUserById,
    mockOrganizations,
    mockShops,
    getShopBranches,
    mockOrgMembers
} from "@/lib/data/mock";

const STORAGE_KEYS = {
    ORG: 'allkons_active_org_id',
    SHOP: 'allkons_active_shop_id'
};

export function useSellerSession() {
    const [loading, setLoading] = useState(true);
    const [sessionData, setSessionData] = useState<any>(null);

    const loadSession = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        const authUser = await getUser();

        if (!authUser) {
            setLoading(false);
            setSessionData(null);
            return;
        }

        // 1. Get full User object from Mock DB
        const user = getUserById(authUser.id);
        if (!user) {
            setLoading(false);
            return;
        }

        // 2. Find All Organization memberships
        const memberships = mockOrgMembers.filter(m => m.userId === user.id);
        const orgIds = memberships.map(m => m.orgId);
        const userOrganizations = mockOrganizations.filter(o => orgIds.includes(o.id));

        // 3. Resolve Active Org
        let activeOrgId = localStorage.getItem(STORAGE_KEYS.ORG);

        // Validation: If no stored org or stored org doesn't belong to user, pick default
        if (!activeOrgId || !orgIds.includes(activeOrgId)) {
            // Priority: Thammasorn > First membership
            const hasThammasorn = orgIds.includes('org-thammasorn-001');
            activeOrgId = hasThammasorn ? 'org-thammasorn-001' : orgIds[0];
            if (activeOrgId) localStorage.setItem(STORAGE_KEYS.ORG, activeOrgId);
        }

        const currentOrg = mockOrganizations.find(o => o.id === activeOrgId);

        // 4. Resolve Active Shop
        let activeShopId = localStorage.getItem(STORAGE_KEYS.SHOP);
        const orgShops = mockShops.filter(s => s.orgId === activeOrgId);

        // Validation: If no stored shop or shop doesn't belong to current org
        if (!activeShopId || !orgShops.find(s => s.id === activeShopId)) {
            // Default to first shop of this org or Thammasorn Mega Store
            const megaStore = orgShops.find(s => s.id === 'shop-thammasorn-001');
            activeShopId = megaStore ? megaStore.id : orgShops[0]?.id;
            if (activeShopId) localStorage.setItem(STORAGE_KEYS.SHOP, activeShopId);
        }

        const currentShop = mockShops.find(s => s.id === activeShopId);

        // 5. Get Branches of active shop
        const branches = currentShop ? getShopBranches(currentShop.id) : [];

        setSessionData({
            user,
            org: currentOrg,
            organizations: userOrganizations,
            memberships,
            shop: currentShop,
            branches,
            role: memberships.find(m => m.orgId === activeOrgId)?.role || 'member'
        });
        setLoading(false);
    }, []);

    useEffect(() => {
        loadSession();
    }, [loadSession]);

    // Action: Switch Org
    const switchOrg = useCallback((orgId: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.ORG, orgId);
            // When switching org, we MUST clear active shop to let it resolve to new org's shops
            localStorage.removeItem(STORAGE_KEYS.SHOP);
            loadSession(true); // Background update
        }
    }, [loadSession]);

    // Action: Switch Shop
    const switchShop = useCallback((shopId: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.SHOP, shopId);
            loadSession(true); // Background update
        }
    }, [loadSession]);

    return {
        ...sessionData,
        loading,
        isAuthenticated: !!sessionData?.user,
        switchOrg,
        switchShop
    };
}
