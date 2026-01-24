/**
 * Product Type Definitions
 * Based on Product Database Schema
 */

/**
 * Hierarchical Category Data
 */
export interface Category {
    id: string;
    parentId?: string;
    name: string;
    nameEn?: string;
    slug: string;
    imageUrl?: string;
    sortOrder: number;
    isActive: boolean;
}

/**
 * Master Product Data
 */
export type ProductStatus = 'draft' | 'active' | 'archived';

export interface Product {
    id: string;
    shopId: string;
    categoryId: string;
    name: string;
    nameEn?: string;
    description?: string;
    brand?: string;
    basePrice: number;
    taxRate: number;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Product Variation (SKU Level)
 */
export interface ProductVariant {
    id: string;
    productId: string;
    sku: string;
    name: string;
    variantPrice?: number;
    weightKg?: number;
    dimensions?: {
        width: number;
        height: number;
        length: number;
    };
}

/**
 * Branch-specific Inventory Tracking
 */
export interface Inventory {
    branchId: string;
    variantId: string;
    quantity: number;
    reservedQty: number;
    reorderLevel?: number;
}

/**
 * Product Media Management
 */
export interface ProductImage {
    id: string;
    productId: string;
    url: string;
    isMain: boolean;
    sortOrder: number;
}
