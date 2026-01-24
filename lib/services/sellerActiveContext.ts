export const SELLER_STORAGE_KEYS = {
  ORG: "allkons_active_org_id",
  SHOP: "allkons_active_shop_id",
  BRANCH: "allkons_active_branch_id",
} as const;

export type SellerActiveContext = {
  orgId: string | null;
  shopId: string | null;
  branchId: string | null;
};

export function getSellerActiveContext(): SellerActiveContext {
  if (typeof window === "undefined") {
    return { orgId: null, shopId: null, branchId: null };
  }

  return {
    orgId: localStorage.getItem(SELLER_STORAGE_KEYS.ORG),
    shopId: localStorage.getItem(SELLER_STORAGE_KEYS.SHOP),
    branchId: localStorage.getItem(SELLER_STORAGE_KEYS.BRANCH),
  };
}

export function setActiveOrg(orgId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SELLER_STORAGE_KEYS.ORG, orgId);
}

export function setActiveShop(shopId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SELLER_STORAGE_KEYS.SHOP, shopId);
}

export function setActiveBranch(branchId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SELLER_STORAGE_KEYS.BRANCH, branchId);
}

export function clearActiveShopAndBranch() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SELLER_STORAGE_KEYS.SHOP);
  localStorage.removeItem(SELLER_STORAGE_KEYS.BRANCH);
}

export function clearActiveBranch() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SELLER_STORAGE_KEYS.BRANCH);
}
