"use client";

import { useState, useEffect, useCallback } from "react";
import { getUser } from "@/lib/auth/mockAuth";
import {
    getUserById,
    mockOrganizations,
    mockShops,
    getShopBranches,
    mockBranches,
    mockOrgMembers,
    getRoleAssignment
} from "@/lib/data/mock";

import {
    SELLER_STORAGE_KEYS,
    setActiveOrg,
    setActiveShop,
    setActiveBranch,
    clearActiveShopAndBranch,
    clearActiveBranch,
} from "@/lib/services/sellerActiveContext";

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

        // Seller context: Individual Consumer is not allowed
        if (user.profileType === 'individual_consumer') {
            setLoading(false);
            setSessionData(null);
            return;
        }

        // 2. Find All Organization memberships
        const memberships = mockOrgMembers.filter(m => m.userId === user.id);
        const orgIds = memberships.map(m => m.orgId);
        const userOrganizations = mockOrganizations.filter(o => orgIds.includes(o.id));

        // 3. Resolve Active Org
        let activeOrgId = localStorage.getItem(SELLER_STORAGE_KEYS.ORG);

        // Validation: If no stored org or stored org doesn't belong to user, pick default
        if (!activeOrgId || !orgIds.includes(activeOrgId)) {
            // Priority: Thammasorn > First membership
            const hasThammasorn = orgIds.includes('org-thammasorn-001');
            activeOrgId = hasThammasorn ? 'org-thammasorn-001' : orgIds[0];
            if (activeOrgId) setActiveOrg(activeOrgId);
        }

        const currentOrg = mockOrganizations.find(o => o.id === activeOrgId);

        // 4. Resolve Active Shop/Branch
        let activeShopId = localStorage.getItem(SELLER_STORAGE_KEYS.SHOP);
        let activeBranchId = localStorage.getItem(SELLER_STORAGE_KEYS.BRANCH);
        const orgShops = mockShops.filter(s => s.orgId === activeOrgId);

        // If a branch was selected previously, derive shopId from branchId
        if (activeBranchId) {
            const selectedBranch = mockBranches.find(b => b.id === activeBranchId);
            if (selectedBranch) {
                activeShopId = selectedBranch.shopId;
                setActiveShop(activeShopId);
            } else {
                // Invalid stored branch
                clearActiveBranch();
                activeBranchId = null;
            }
        }

        // Validation: If no stored shop or shop doesn't belong to current org
        if (!activeShopId || !orgShops.find(s => s.id === activeShopId)) {
            // Default to first shop of this org or Thammasorn Mega Store
            const megaStore = orgShops.find(s => s.id === 'shop-thammasorn-001');
            activeShopId = megaStore ? megaStore.id : orgShops[0]?.id;
            if (activeShopId) setActiveShop(activeShopId);
            // When shop changes by validation, branch must be re-resolved
            clearActiveBranch();
            activeBranchId = null;
        }

        const currentShop = mockShops.find(s => s.id === activeShopId);

        // 5. Get Branches of active shop
        const branches = currentShop ? getShopBranches(currentShop.id) : [];

        // 6. Resolve Active Branch (within the active shop)
        let currentBranch = null as any;
        if (activeBranchId && branches.some(b => b.id === activeBranchId)) {
            currentBranch = branches.find(b => b.id === activeBranchId) || null;
        } else {
            // Branch-centric: always select the main branch (or first) when none is selected.
            currentBranch = branches.find(b => b.isMain) || branches[0] || null;
            if (currentBranch) setActiveBranch(currentBranch.id);
            activeBranchId = currentBranch?.id || null;
        }

        const roleAssignment = (activeOrgId && activeBranchId)
            ? getRoleAssignment(user.id, activeOrgId, activeBranchId)
            : undefined;

        setSessionData({
            user,
            org: currentOrg,
            organizations: userOrganizations,
            memberships,
            shops: orgShops,
            shop: currentShop,
            branches,
            branch: currentBranch,
            orgRoleCode: roleAssignment?.orgRoleCode,
            appRoleCode: roleAssignment?.appRoleCode,
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
            setActiveOrg(orgId);
            // When switching org, we MUST clear active shop/branch to let it resolve to new org's shops
            clearActiveShopAndBranch();
            loadSession(true); // Background update
        }
    }, [loadSession]);

    // Action: Switch Branch (ShopDropdown is used as Branch selector)
    const switchShop = useCallback((branchId: string) => {
        if (typeof window !== 'undefined') {
            const b = mockBranches.find(x => x.id === branchId);
            if (b) {
                setActiveShop(b.shopId);
                setActiveBranch(b.id);
            }
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
