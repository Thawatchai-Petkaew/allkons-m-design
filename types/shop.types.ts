/**
 * Shop & Branch Type Definitions
 * Based on Shop Database Schema
 */

export type ShopType = 'retail' | 'wholesale' | 'distributor';

/**
 * Core Shop Data (The Brand/Storefront)
 */
export interface Shop {
    id: string;
    orgId: string;
    name: string;
    nameEn?: string;
    subdomain: string;
    description?: string;
    logoUrl?: string;
    bannerUrl?: string;
    themeColor: string;
    isActive: boolean;
    type: ShopType;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Branch Data (Physical Location)
 */
export interface Branch {
    id: string;
    shopId: string;
    name: string;
    isMain: boolean;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    isActive: boolean;
    createdAt: Date;
}

/**
 * Shop Settings
 */
export interface ShopSettings {
    shopId: string;
    enableInventory: boolean;
    allowGuestOrder: boolean;
    currency: string;
    taxInclusive: boolean;
    minimumOrderValue: number;
}
