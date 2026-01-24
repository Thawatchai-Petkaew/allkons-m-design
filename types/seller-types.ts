/**
 * Type definitions for Seller Header components
 */

export interface ShopInfo {
    id: string;
    orgId: string;
    name: string;
    logo?: string;
    isActive: boolean;
    type: "shop" | "branch";
    isMain?: boolean;
    shopName?: string;
}

export interface OrgInfo {
    id: string;
    name: string;
    logo?: string;
    role: string; // e.g., "เจ้าของ", "ผู้จัดการ"
    kybVerified: boolean;
    type: "legal" | "individual"; // นิติบุคคล or บุคคลธรรมดา
}

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
}

export interface NotificationInfo {
    count: number;
    hasUnread: boolean;
}
