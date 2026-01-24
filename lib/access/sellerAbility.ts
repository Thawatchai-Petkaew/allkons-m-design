import type { OrgRoleCode, AppRoleCode } from "@/types/rbac.types";

export type SellerAbility =
  | "SHOP_MANAGE"
  | "BRANCH_MANAGE"
  | "PRODUCT_MANAGE"
  | "PRODUCT_IMPORT";

export type SellerRoleContext = {
  orgRoleCode?: OrgRoleCode;
  appRoleCode?: AppRoleCode;
};

export type PermissionCode = string;

function getOrgPermissionCodes(orgRoleCode?: OrgRoleCode): Set<PermissionCode> {
  // Org-level permissions are documented in research as codes like STORE_UPDATE, ROLE_CREATE, etc.
  // For now we only model what we already use in UI.
  if (orgRoleCode === "ORG_OWNER") {
    return new Set<PermissionCode>(["*"]);
  }

  if (orgRoleCode === "ORG_ADMIN") {
    return new Set<PermissionCode>([
      "STORE_UPDATE",
      "STORE_VIEW_LIST",
      "STORE_VIEW_DETAIL",
      "STORE_MEMBER_ASSIGN",
    ]);
  }

  if (orgRoleCode === "ORG_MEMBER") {
    return new Set<PermissionCode>([
      "STORE_VIEW_LIST",
      "STORE_VIEW_DETAIL",
    ]);
  }

  return new Set();
}

function getSellerAppPermissionCodes(appRoleCode?: AppRoleCode): Set<PermissionCode> {
  // Align with research: public/research/database/product-permissions-summary.md
  const productView = ["SELLER_PRODUCT.VIEW_LIST", "SELLER_PRODUCT.VIEW_DETAIL"];
  const productManage = [
    "SELLER_PRODUCT.ADD_FROM_MASTER",
    "SELLER_PRODUCT.EDIT_STORE_FIELDS",
    "SELLER_PRODUCT.EDIT_PRICE",
    "SELLER_PRODUCT.TOGGLE_ACTIVE",
    "SELLER_PRODUCT.DELETE",
    "SELLER_PRODUCT.BULK_ACTION",
    "SELLER_PRODUCT.EXPORT",
  ];

  const importManage = [
    "SELLER_IMPORT.VIEW_SESSIONS",
    "SELLER_IMPORT.CREATE_SESSION",
    "SELLER_IMPORT.CANCEL_MATCHING",
    "SELLER_IMPORT.DOWNLOAD_ORIGINAL",
    "SELLER_IMPORT.DELETE_SESSION",
    "SELLER_IMPORT.VIEW_REPORT",
    "SELLER_IMPORT.MANAGE_RESULT",
    "SELLER_IMPORT.EDIT_TEMPLATE_FIELDS",
    "SELLER_IMPORT.CONFIRM_NEAR_MATCH",
    "SELLER_IMPORT.SET_NOT_MATCH_REASON",
    "SELLER_IMPORT.SUBMIT_FOR_ADMIN_REVIEW",
    "SELLER_IMPORT.MARK_DONE_MATCHING",
    "SELLER_IMPORT.IMPORT_EXECUTE",
    "SELLER_IMPORT.IMPORT_FINISH",
    "SELLER_IMPORT.VIEW_IMPORTED_IN_STORE",
  ];

  if (appRoleCode === "SELLER_PRODUCT_MANAGER") {
    return new Set<PermissionCode>([...productView, ...productManage, ...importManage]);
  }

  if (appRoleCode === "SELLER_ORDER_MANAGER" || appRoleCode === "SELLER_VIEWER") {
    return new Set<PermissionCode>(productView);
  }

  return new Set();
}

function hasAllPermissions(userPerms: Set<PermissionCode>, required: PermissionCode[]): boolean {
  if (userPerms.has("*")) return true;
  return required.every((p) => userPerms.has(p));
}

export function canSellerAbility(ctx: SellerRoleContext, ability: SellerAbility): boolean {
  const orgPerms = getOrgPermissionCodes(ctx.orgRoleCode);
  const appPerms = getSellerAppPermissionCodes(ctx.appRoleCode);

  // Effective permissions: union. Org owner uses '*'.
  const effective = new Set<PermissionCode>([...Array.from(orgPerms), ...Array.from(appPerms)]);

  switch (ability) {
    case "SHOP_MANAGE":
    case "BRANCH_MANAGE":
      return hasAllPermissions(effective, ["STORE_UPDATE"]);

    case "PRODUCT_MANAGE":
      return hasAllPermissions(effective, [
        "SELLER_PRODUCT.VIEW_LIST",
        "SELLER_PRODUCT.VIEW_DETAIL",
        "SELLER_PRODUCT.EDIT_STORE_FIELDS",
      ]);

    case "PRODUCT_IMPORT":
      return hasAllPermissions(effective, [
        "SELLER_IMPORT.VIEW_SESSIONS",
        "SELLER_IMPORT.CREATE_SESSION",
      ]);

    default:
      return false;
  }
}

export function getNoPermissionText(): string {
  return "คุณไม่มีสิทธิ์ในการจัดการส่วนนี้";
}
