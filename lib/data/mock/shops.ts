/**
 * Mock Shop & Branch Data
 * Based on Shop Database Schema
 */

import { Shop, Branch } from '@/types/shop.types';

// ============================================================================
// MOCK SHOPS
// ============================================================================

export const mockShops: Shop[] = [
    {
        id: 'shop-dechwit-001',
        orgId: 'org-dechwit-001',
        name: 'เดชวิทย์รีเทล',
        nameEn: 'Dechwit Retail',
        subdomain: 'dechwit-retail',
        description: 'ศูนย์รวมวัสดุก่อสร้างครบวงจร โดยเดชวิทย์ คอนสตรัคชั่น',
        logoUrl: '/uploads/logos/dechwit-shop-logo.png',
        bannerUrl: undefined,
        themeColor: '#00af43',
        isActive: true,
        type: 'retail',
        createdAt: new Date('2025-10-15T09:00:00Z'),
        updatedAt: new Date('2025-10-15T09:00:00Z'),
    },
    {
        id: 'shop-dechwit-personal-001',
        orgId: 'org-dechwit-personal-001',
        name: 'เดชวิทย์การค้า',
        nameEn: 'Dechwit Trading',
        subdomain: 'dechwit-trading',
        description: 'ร้านเดชวิทย์ (บุคคลธรรมดา จดทะเบียนพาณิชย์)',
        logoUrl: '/uploads/logos/dechwit-personal-shop-logo.png',
        bannerUrl: undefined,
        themeColor: '#00af43',
        isActive: true,
        type: 'retail',
        createdAt: new Date('2026-01-01T09:10:00Z'),
        updatedAt: new Date('2026-01-01T09:10:00Z'),
    },
    {
        id: 'shop-somchai-001',
        orgId: 'org-somchai-001',
        name: 'สมชายการค้า (วัสดุก่อสร้าง)',
        nameEn: 'Somchai Trading',
        subdomain: 'somchai-trading',
        description: 'วัสดุก่อสร้างราคาโรงงาน',
        themeColor: '#00af43',
        isActive: true,
        type: 'retail',
        createdAt: new Date('2025-11-01T10:00:00Z'),
        updatedAt: new Date('2025-11-01T10:00:00Z'),
    },
    {
        id: 'shop-thammasorn-001',
        orgId: 'org-thammasorn-001',
        name: 'ธรรมสรณ์',
        nameEn: 'Thammasorn Mega Store',
        subdomain: 'thammasorn',
        description: 'ผู้นำด้านวัสดุก่อสร้างและของตกแต่งบ้านรายใหญ่ที่สุด',
        logoUrl: undefined,
        themeColor: '#00af43',
        isActive: true,
        type: 'retail',
        createdAt: new Date('2024-01-01T08:00:00Z'),
        updatedAt: new Date('2024-01-01T08:00:00Z'),
    }
];


// ============================================================================
// MOCK BRANCHES
// ============================================================================

export const mockBranches: Branch[] = [
    // Dechwit's Shop Branches
    {
        id: 'branch-dechwit-main',
        shopId: 'shop-dechwit-001',
        name: 'พัฒนาการ',
        isMain: true,
        addressLine1: '456 ถนนพัฒนาการ',
        addressLine2: 'แขวงสวนหลวง',
        city: 'เขตสวนหลวง',
        province: 'กรุงเทพมหานคร',
        postalCode: '10250',
        phone: '02-789-0123',
        isActive: true,
        createdAt: new Date('2025-10-15T09:00:00Z'),
    },
    {
        id: 'branch-dechwit-rama-9',
        shopId: 'shop-dechwit-001',
        name: 'พระราม 9',
        isMain: false,
        addressLine1: '789 ถนนพระราม 9',
        addressLine2: 'แขวงห้วยขวาง',
        city: 'เขตห้วยขวาง',
        province: 'กรุงเทพมหานคร',
        postalCode: '10310',
        isActive: true,
        createdAt: new Date('2026-01-05T08:00:00Z'),
    },

    // Dechwit Personal (Registered Individual Merchant) - Branches
    {
        id: 'branch-dechwit-personal-hq',
        shopId: 'shop-dechwit-personal-001',
        name: 'สำนักงานใหญ่ (ลาดพร้าว)',
        isMain: true,
        addressLine1: '11/1 ถนนลาดพร้าว',
        city: 'เขตลาดพร้าว',
        province: 'กรุงเทพมหานคร',
        postalCode: '10230',
        phone: '093-831-1673',
        isActive: true,
        createdAt: new Date('2026-01-01T09:15:00Z'),
    },
    {
        id: 'branch-dechwit-personal-bangkoknoi',
        shopId: 'shop-dechwit-personal-001',
        name: 'บางกอกน้อย',
        isMain: false,
        addressLine1: '22 ถนนอรุณอมรินทร์',
        city: 'เขตบางกอกน้อย',
        province: 'กรุงเทพมหานคร',
        postalCode: '10700',
        isActive: true,
        createdAt: new Date('2026-01-10T08:00:00Z'),
    },

    // Somchai's Shop Branches
    {
        id: 'branch-somchai-main',
        shopId: 'shop-somchai-001',
        name: 'สำนักงานใหญ่ (หนองแขม)',
        isMain: true,
        addressLine1: '123 ถนนเพชรเกษม',
        city: 'เขตหนองแขม',
        province: 'กรุงเทพมหานคร',
        postalCode: '10160',
        phone: '081-234-5678',
        isActive: true,
        createdAt: new Date('2025-11-01T10:00:00Z'),
    },
    // Thammasorn Mega Store - 5 Branches
    {
        id: 'branch-thammasorn-hq',
        shopId: 'shop-thammasorn-001',
        name: 'รัชดา',
        isMain: true,
        addressLine1: '99/1 ถนนรัชดาภิเษก',
        city: 'เขตดินแดง',
        province: 'กรุงเทพมหานคร',
        postalCode: '10400',
        phone: '02-123-9999',
        isActive: true,
        createdAt: new Date('2024-01-01T08:00:00Z'),
    },
    {
        id: 'branch-thammasorn-bangna',
        shopId: 'shop-thammasorn-001',
        name: 'บางนา',
        isMain: false,
        addressLine1: '1234/5 ถนนบางนา-ตราด',
        city: 'เขตบางนา',
        province: 'กรุงเทพมหานคร',
        postalCode: '10260',
        isActive: true,
        createdAt: new Date('2024-06-01T08:00:00Z'),
    },
    {
        id: 'branch-thammasorn-rangsit',
        shopId: 'shop-thammasorn-001',
        name: 'รังสิต',
        isMain: false,
        addressLine1: '88/8 ถนนพหลโยธิน',
        city: 'ธัญบุรี',
        province: 'ปทุมธานี',
        postalCode: '12110',
        isActive: true,
        createdAt: new Date('2024-12-01T08:00:00Z'),
    },
    {
        id: 'branch-thammasorn-chiangmai',
        shopId: 'shop-thammasorn-001',
        name: 'เชียงใหม่',
        isMain: false,
        addressLine1: '55 ถนนซุปเปอร์ไฮเวย์',
        city: 'เมือง',
        province: 'เชียงใหม่',
        postalCode: '50000',
        isActive: true,
        createdAt: new Date('2025-03-01T08:00:00Z'),
    },
    {
        id: 'branch-thammasorn-phuket',
        shopId: 'shop-thammasorn-001',
        name: 'ภูเก็ต',
        isMain: false,
        addressLine1: '77 ถนนเทพกระษัตรี',
        city: 'ถลาง',
        province: 'ภูเก็ต',
        postalCode: '83110',
        isActive: true,
        createdAt: new Date('2025-08-01T08:00:00Z'),
    }
];



// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getShopById(id: string): Shop | undefined {
    return mockShops.find(s => s.id === id);
}

export function getOrgShops(orgId: string): Shop[] {
    return mockShops.filter(s => s.orgId === orgId);
}

export function getShopBranches(shopId: string): Branch[] {
    return mockBranches.filter(b => b.shopId === shopId);
}

export function getMainBranch(shopId: string): Branch | undefined {
    return mockBranches.find(b => b.shopId === shopId && b.isMain);
}
