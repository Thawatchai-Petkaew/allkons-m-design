/**
 * Mock Product, Category, and Inventory Data
 * Based on Product Database Schema
 */

import {
    Category,
    Product,
    ProductVariant,
    Inventory,
    ProductImage
} from '@/types/product.types';

// ============================================================================
// MOCK CATEGORIES
// ============================================================================

export const mockCategories: Category[] = [
    {
        id: 'cat-001',
        name: 'วัสดุก่อสร้าง',
        nameEn: 'Construction Materials',
        slug: 'construction-materials',
        sortOrder: 1,
        isActive: true,
    },
    {
        id: 'cat-011',
        parentId: 'cat-001',
        name: 'ปูนซีเมนต์',
        nameEn: 'Cement',
        slug: 'cement',
        sortOrder: 1,
        isActive: true,
    },
    {
        id: 'cat-012',
        parentId: 'cat-001',
        name: 'เหล็กและโลหะ',
        nameEn: 'Steel & Metal',
        slug: 'steel-metal',
        sortOrder: 2,
        isActive: true,
    },
    {
        id: 'cat-002',
        name: 'งานสีและเคมีภัณฑ์',
        nameEn: 'Paints & Chemicals',
        slug: 'paints-chemicals',
        sortOrder: 2,
        isActive: true,
    }
];

// ============================================================================
// MOCK PRODUCTS
// ============================================================================

export const mockProducts: Product[] = [
    {
        id: 'prod-dechwit-001',
        shopId: 'shop-dechwit-001',
        categoryId: 'cat-011',
        name: 'ปูนซีเมนต์ปอร์ตแลนด์ ตราเดชวิทย์ (ถุง)',
        nameEn: 'Dechwit Portland Cement (Bag)',
        description: 'ปูนคุณภาพสูงสำหรับงานก่อสร้างทั่วไป ทนทาน แห้งไว',
        brand: 'Dechwit',
        basePrice: 150.00,
        taxRate: 7.00,
        status: 'active',
        createdAt: new Date('2025-10-20T10:00:00Z'),
        updatedAt: new Date('2025-10-20T10:00:00Z'),
    },
    {
        id: 'prod-somchai-001',
        shopId: 'shop-somchai-001',
        categoryId: 'cat-012',
        name: 'เหล็กเส้นกลม SR24 6มม. x 10ม.',
        description: 'เหล็กเส้นมาตรฐาน มอก. สำหรับงานโครงสร้าง',
        brand: 'Standard',
        basePrice: 85.00,
        taxRate: 7.00,
        status: 'active',
        createdAt: new Date('2025-11-05T08:00:00Z'),
        updatedAt: new Date('2025-11-05T08:00:00Z'),
    }
];

// ============================================================================
// MOCK VARIANTS (SKUs)
// ============================================================================

export const mockProductVariants: ProductVariant[] = [
    // Dechwit Cement Variations
    {
        id: 'sku-dechwit-001-50kg',
        productId: 'prod-dechwit-001',
        sku: 'DW-CMT-50KG',
        name: 'ถุง 50 กก.',
        variantPrice: 150.00,
        weightKg: 50,
    },
    {
        id: 'sku-dechwit-001-25kg',
        productId: 'prod-dechwit-001',
        sku: 'DW-CMT-25KG',
        name: 'ถุง 25 กก.',
        variantPrice: 80.00,
        weightKg: 25,
    },
    // Somchai Steel Variation
    {
        id: 'sku-somchai-001-std',
        productId: 'prod-somchai-001',
        sku: 'SC-STL-6MM',
        name: 'มาตรฐาน SR24',
        variantPrice: 85.00,
        weightKg: 2.22,
    }
];

// ============================================================================
// MOCK INVENTORY (Branch Stock)
// ============================================================================

export const mockInventory: Inventory[] = [
    // Dechwit Phatthanakan Branch Stock
    {
        branchId: 'branch-dechwit-main',
        variantId: 'sku-dechwit-001-50kg',
        quantity: 100,
        reservedQty: 5,
        reorderLevel: 20,
    },
    {
        branchId: 'branch-dechwit-main',
        variantId: 'sku-dechwit-001-25kg',
        quantity: 50,
        reservedQty: 0,
        reorderLevel: 10,
    },
    // Dechwit Rama 9 Branch Stock
    {
        branchId: 'branch-dechwit-rama-9',
        variantId: 'sku-dechwit-001-50kg',
        quantity: 30,
        reservedQty: 2,
    }
];

// ============================================================================
// MOCK IMAGES
// ============================================================================

export const mockProductImages: ProductImage[] = [
    {
        id: 'img-001',
        productId: 'prod-dechwit-001',
        url: 'https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=400&h=400&auto=format&fit=crop',
        isMain: true,
        sortOrder: 1,
    }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getProductById(id: string): Product | undefined {
    return mockProducts.find(p => p.id === id);
}

export function getShopProducts(shopId: string): Product[] {
    return mockProducts.filter(p => p.shopId === shopId);
}

export function getProductVariants(productId: string): ProductVariant[] {
    return mockProductVariants.filter(v => v.productId === productId);
}

export function getVariantInventory(variantId: string): Inventory[] {
    return mockInventory.filter(i => i.variantId === variantId);
}

export function getBranchStock(branchId: string, variantId: string): Inventory | undefined {
    return mockInventory.find(i => i.branchId === branchId && i.variantId === variantId);
}
