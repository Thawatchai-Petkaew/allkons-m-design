import type { OrgRoleCode, AppRoleCode } from "@/types/rbac.types";

export type SellerRoleContext = {
  orgRoleCode?: OrgRoleCode;
  appRoleCode?: AppRoleCode;
};

type AccessRule = {
  allowOrgRoles?: OrgRoleCode[];
  allowAppRoles?: AppRoleCode[];
};

const accessRules: Record<string, AccessRule> = {
  // Dashboard
  "all-shops": { allowAppRoles: ["SELLER_PRODUCT_MANAGER", "SELLER_ORDER_MANAGER", "SELLER_VIEWER"] },
  analytics: { allowAppRoles: ["SELLER_PRODUCT_MANAGER", "SELLER_ORDER_MANAGER", "SELLER_VIEWER"] },
  orders: { allowAppRoles: ["SELLER_PRODUCT_MANAGER", "SELLER_ORDER_MANAGER", "SELLER_VIEWER"] },

  // Product Management
  products: { allowAppRoles: ["SELLER_PRODUCT_MANAGER", "SELLER_ORDER_MANAGER", "SELLER_VIEWER"] },
  "manage-products": { allowAppRoles: ["SELLER_PRODUCT_MANAGER"] },
  "import-products": { allowAppRoles: ["SELLER_PRODUCT_MANAGER"] },

  // Merchant Center / Org-level settings
  "shop-management": { allowOrgRoles: ["ORG_OWNER", "ORG_ADMIN"] },
  categories: { allowAppRoles: ["SELLER_PRODUCT_MANAGER"] },
  decoration: { allowOrgRoles: ["ORG_OWNER", "ORG_ADMIN"] },
  application: { allowOrgRoles: ["ORG_OWNER", "ORG_ADMIN"] },

  // Default: allow (handled by fallback)
};

export function canAccessSidebarItem(itemId: string, ctx: SellerRoleContext): boolean {
  const rule = accessRules[itemId];

  // ORG owner is always allowed as a practical default for the seller admin.
  if (ctx.orgRoleCode === "ORG_OWNER") return true;

  if (!rule) return true;

  if (rule.allowOrgRoles && ctx.orgRoleCode) {
    if (!rule.allowOrgRoles.includes(ctx.orgRoleCode)) return false;
  }

  if (rule.allowAppRoles && ctx.appRoleCode) {
    if (!rule.allowAppRoles.includes(ctx.appRoleCode)) return false;
  }

  // If a rule exists but the relevant role code is missing, default to deny.
  if (rule.allowOrgRoles && !ctx.orgRoleCode) return false;
  if (rule.allowAppRoles && !ctx.appRoleCode) return false;

  return true;
}
