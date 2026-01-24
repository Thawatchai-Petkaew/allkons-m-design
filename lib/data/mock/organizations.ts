/**
 * Mock Organization Data
 * Based on Organization Database Schema
 */

import {
    Organization,
    OrgMember,
    OrgVerification
} from '@/types/organization.types';

// ============================================================================
// MOCK ORGANIZATIONS
// ============================================================================

export const mockOrganizations: Organization[] = [
    {
        id: 'org-dechwit-001',
        ownerUserId: '550e8400-e29b-41d4-a716-446655440000', // Dechwit
        name: 'เดชวิทย์ คอนสตรัคชั่น',
        nameEn: 'Dechwit Construction',
        type: 'legal',
        juristicName: 'บริษัท เดชวิทย์ คอนสตรัคชั่น จำกัด',
        juristicTypeId: 'limited-company',
        taxId: '1234567890123',
        businessRegistrationNumber: '0123456789012',
        logoUrl: '/assets/logos/dechwit-org-logo.png',
        email: 'contact@dechwit-con.com',
        phone: '02-123-4567',
        kybStatus: 'verified',
        activeStatus: true,
        createdAt: new Date('2025-10-15T09:00:00Z'),
        updatedAt: new Date('2026-01-20T10:00:00Z'),
    },
    {
        id: 'org-dechwit-personal-001',
        ownerUserId: '550e8400-e29b-41d4-a716-446655440000', // Dechwit
        name: 'มงคลจิต ก่อสร้าง',
        nameEn: 'Mongkoljit Construction',
        type: 'personal',
        logoUrl: '/uploads/logos/dechwit-personal-logo.png',
        email: 'mongkoljit@gmail.com',
        phone: '093-831-1673',
        kybStatus: 'pending',
        activeStatus: true,
        createdAt: new Date('2026-01-01T09:00:00Z'),
        updatedAt: new Date('2026-01-24T10:00:00Z'),
    },
    {
        id: 'org-somchai-001',
        ownerUserId: '550e8400-e29b-41d4-a716-446655440001', // Somchai
        name: 'วัสดุก่อสร้างสมชาย',
        type: 'personal',
        kybStatus: 'verified',
        activeStatus: true,
        createdAt: new Date('2025-11-01T10:00:00Z'),
        updatedAt: new Date('2025-11-01T10:00:00Z'),
    },
    {
        id: 'org-thammasorn-001',
        ownerUserId: '550e8400-e29b-41d4-a716-446655440000', // Dechwit (Super Admin role in membership)
        name: 'ธรรมสรณ์',
        nameEn: 'Thammasorn Group Co., Ltd.',
        type: 'legal',
        juristicName: 'บริษัท ธรรมสรณ์ จำกัด',
        juristicTypeId: 'limited-company',
        taxId: '0994000123456',
        businessRegistrationNumber: '0994000123456',
        logoUrl: '/uploads/logos/thammasorn-logo-uploaded.png',
        email: 'info@thammasorn.com',
        phone: '02-123-9999',
        kybStatus: 'verified',
        activeStatus: true,
        createdAt: new Date('2024-01-01T08:00:00Z'),
        updatedAt: new Date('2026-01-24T10:00:00Z'),
    }
];


// ============================================================================
// MOCK ORG MEMBERSHIPS
// ============================================================================

export const mockOrgMembers: OrgMember[] = [
    // Dechwit is Owner of his own org - Has full access (Seller & Buyer)
    {
        id: 'mem-001',
        orgId: 'org-dechwit-001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        role: 'owner',
        authorizedApps: ['SELLER', 'BUYER'],
        isActive: true,
        joinedAt: new Date('2025-10-15T09:00:00Z'),
    },
    // Dechwit is also Owner of his personal (registered individual merchant) org
    {
        id: 'mem-001p',
        orgId: 'org-dechwit-personal-001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        role: 'owner',
        authorizedApps: ['SELLER', 'BUYER'],
        isActive: true,
        joinedAt: new Date('2026-01-01T09:00:00Z'),
    },
    // Dechwit is also an Admin in Somchai's org - ONLY for Seller Management (Testing multi-org)
    {
        id: 'mem-002',
        orgId: 'org-somchai-001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        role: 'admin',
        authorizedApps: ['SELLER'], // No BUYER right here
        isActive: true,
        joinedAt: new Date('2026-01-10T08:00:00Z'),
    },
    // Somchai is Owner of his own org
    {
        id: 'mem-003',
        orgId: 'org-somchai-001',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        role: 'owner',
        authorizedApps: ['SELLER', 'BUYER'],
        isActive: true,
        joinedAt: new Date('2025-11-01T10:00:00Z'),
    },
    // Dechwit is Owner (Super Admin) of Thammasorn
    {
        id: 'mem-004',
        orgId: 'org-thammasorn-001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        role: 'owner',
        authorizedApps: ['SELLER', 'BUYER', 'ADMIN'],
        isActive: true,
        joinedAt: new Date('2024-01-01T08:00:00Z'),
    }
    ,
    // Team members in Thammasorn (Seller)
    {
        id: 'mem-005',
        orgId: 'org-thammasorn-001',
        userId: '550e8400-e29b-41d4-a716-446655440010',
        role: 'manager',
        authorizedApps: ['SELLER'],
        isActive: true,
        joinedAt: new Date('2026-01-05T08:00:00Z'),
    },
    {
        id: 'mem-006',
        orgId: 'org-thammasorn-001',
        userId: '550e8400-e29b-41d4-a716-446655440011',
        role: 'editor',
        authorizedApps: ['SELLER'],
        isActive: true,
        joinedAt: new Date('2026-01-05T08:05:00Z'),
    },
    {
        id: 'mem-007',
        orgId: 'org-thammasorn-001',
        userId: '550e8400-e29b-41d4-a716-446655440012',
        role: 'viewer',
        authorizedApps: ['SELLER'],
        isActive: true,
        joinedAt: new Date('2026-01-05T08:10:00Z'),
    }
];



// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getOrgById(id: string): Organization | undefined {
    return mockOrganizations.find(org => org.id === id);
}

export function getUserOrganizations(userId: string): Organization[] {
    const orgIds = mockOrgMembers
        .filter(m => m.userId === userId && m.isActive)
        .map(m => m.orgId);
    return mockOrganizations.filter(org => orgIds.includes(org.id));
}

export function getOrgMembers(orgId: string): OrgMember[] {
    return mockOrgMembers.filter(m => m.orgId === orgId);
}
