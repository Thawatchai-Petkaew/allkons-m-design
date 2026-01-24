export type PermissionLayer = "ORGANIZATION" | "APPLICATION";
export type ApplicationType = "BUYER" | "SELLER" | "BOTH";

export interface Permission {
  code: string;
  nameTh: string;
  layer: PermissionLayer;
  applicationType?: ApplicationType;
}

export type OrgRoleCode = "ORG_OWNER" | "ORG_ADMIN" | "ORG_MEMBER";

export type AppRoleCode =
  | "BUYER_PURCHASER"
  | "BUYER_ADMIN"
  | "BUYER_VIEWER"
  | "SELLER_PRODUCT_MANAGER"
  | "SELLER_ORDER_MANAGER"
  | "SELLER_VIEWER";

export interface RbacOrgRole {
  orgId: string;
  code: OrgRoleCode;
  nameTh: string;
}

export interface RbacAppRole {
  orgId: string;
  code: AppRoleCode;
  applicationType: "BUYER" | "SELLER";
  nameTh: string;
}

export interface RoleAssignment {
  id: string;
  userId: string;
  orgId: string;
  branchId: string;
  orgRoleCode: OrgRoleCode;
  appRoleCode: AppRoleCode;
}
