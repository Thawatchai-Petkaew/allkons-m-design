import type { RoleAssignment } from "@/types/rbac.types";

export const mockRoleAssignments: RoleAssignment[] = [
  // Dechwit - Thammasorn (Seller)
  {
    id: "ra-001",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-hq",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-001b",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-bangna",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-001c",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-rangsit",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-001d",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-chiangmai",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-001e",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-phuket",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  // Dechwit - Somchai org (Seller - admin)
  {
    id: "ra-002",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-somchai-001",
    branchId: "branch-somchai-main",
    orgRoleCode: "ORG_ADMIN",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },
  // Dechwit - Personal merchant org (Seller)
  {
    id: "ra-003",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-dechwit-personal-001",
    branchId: "branch-dechwit-personal-hq",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-003b",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-dechwit-personal-001",
    branchId: "branch-dechwit-personal-bangkoknoi",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  // Dechwit - Legal entity org (Seller)
  {
    id: "ra-004",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-dechwit-001",
    branchId: "branch-dechwit-main",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },
  {
    id: "ra-004b",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    orgId: "org-dechwit-001",
    branchId: "branch-dechwit-rama-9",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },
  // Somchai - Seller
  {
    id: "ra-005",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    orgId: "org-somchai-001",
    branchId: "branch-somchai-main",
    orgRoleCode: "ORG_OWNER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },

  // Team members - Thammasorn (branch-scoped)
  {
    id: "ra-tpm-001",
    userId: "550e8400-e29b-41d4-a716-446655440010",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-hq",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-tpm-002",
    userId: "550e8400-e29b-41d4-a716-446655440010",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-bangna",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-tpm-003",
    userId: "550e8400-e29b-41d4-a716-446655440010",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-rangsit",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-tpm-004",
    userId: "550e8400-e29b-41d4-a716-446655440010",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-chiangmai",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },
  {
    id: "ra-tpm-005",
    userId: "550e8400-e29b-41d4-a716-446655440010",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-phuket",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_PRODUCT_MANAGER",
  },

  {
    id: "ra-tom-001",
    userId: "550e8400-e29b-41d4-a716-446655440011",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-hq",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },
  {
    id: "ra-tom-002",
    userId: "550e8400-e29b-41d4-a716-446655440011",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-bangna",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },
  {
    id: "ra-tom-003",
    userId: "550e8400-e29b-41d4-a716-446655440011",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-rangsit",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },
  {
    id: "ra-tom-004",
    userId: "550e8400-e29b-41d4-a716-446655440011",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-chiangmai",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },
  {
    id: "ra-tom-005",
    userId: "550e8400-e29b-41d4-a716-446655440011",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-phuket",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_ORDER_MANAGER",
  },

  {
    id: "ra-tvw-001",
    userId: "550e8400-e29b-41d4-a716-446655440012",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-hq",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_VIEWER",
  },
  {
    id: "ra-tvw-002",
    userId: "550e8400-e29b-41d4-a716-446655440012",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-bangna",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_VIEWER",
  },
  {
    id: "ra-tvw-003",
    userId: "550e8400-e29b-41d4-a716-446655440012",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-rangsit",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_VIEWER",
  },
  {
    id: "ra-tvw-004",
    userId: "550e8400-e29b-41d4-a716-446655440012",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-chiangmai",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_VIEWER",
  },
  {
    id: "ra-tvw-005",
    userId: "550e8400-e29b-41d4-a716-446655440012",
    orgId: "org-thammasorn-001",
    branchId: "branch-thammasorn-phuket",
    orgRoleCode: "ORG_MEMBER",
    appRoleCode: "SELLER_VIEWER",
  },
];

export function getRoleAssignment(userId: string, orgId: string, branchId: string) {
  const exact = mockRoleAssignments.find(
    (a) => a.userId === userId && a.orgId === orgId && a.branchId === branchId
  );
  if (exact) return exact;

  return mockRoleAssignments.find(
    (a) => a.userId === userId && a.orgId === orgId
  );
}
