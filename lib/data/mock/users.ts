/**
 * Mock User Data
 * Based on User Database Schema
 */

import type {
    User,
    UserVerification,
    UserSession,
    UserPreferences,
} from '@/types/user.types';

// ============================================================================
// MOCK USERS
// ============================================================================

export const mockUsers: User[] = [
    // Primary Test User
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'dechwit@gmail.com',
        emailVerified: true,
        phone: '+66938311673',
        phoneVerified: true,
        profileType: 'registered_individual_merchant',
        firstName: 'เดชวิทย์',
        lastName: 'มงคลจิต',
        displayName: 'เดชวิทย์ มงคลจิต',
        avatarUrl: '/uploads/avatars/dechwit-avatar-uploaded.png',
        dateOfBirth: new Date('1988-06-10'),
        gender: 'male',
        status: 'active',
        originAppId: 'allkons-seller-app',
        roles: ['SELLER', 'BUYER'],
        lastLoginAt: new Date('2026-01-24T13:00:00Z'),
        createdAt: new Date('2025-10-15T09:00:00Z'),
        updatedAt: new Date('2026-01-24T13:00:00Z'),
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'somchai@example.com',
        emailVerified: true,
        phone: '+66812345678',
        phoneVerified: true,
        profileType: 'registered_individual_merchant',
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        displayName: 'สมชาย ใจดี',
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=250&h=250&auto=format&fit=crop',
        dateOfBirth: new Date('1985-03-15'),
        gender: 'male',
        status: 'active',
        originAppId: 'allkons-buyer-web',
        roles: ['SELLER'],
        lastLoginAt: new Date('2026-01-24T12:00:00Z'),
        createdAt: new Date('2025-11-01T10:00:00Z'),
        updatedAt: new Date('2026-01-24T12:00:00Z'),
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440002',
        email: 'somsri@example.com',
        emailVerified: true,
        phone: '+66823456789',
        phoneVerified: true,
        profileType: 'individual_consumer',
        firstName: 'สมศรี',
        lastName: 'รักษาศิล',
        displayName: 'สมศรี รักษาศิล',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop',
        dateOfBirth: new Date('1990-07-22'),
        gender: 'female',
        status: 'active',
        originAppId: 'allkons-buyer-web',
        roles: ['BUYER'],
        lastLoginAt: new Date('2026-01-23T15:30:00Z'),
        createdAt: new Date('2025-12-15T08:00:00Z'),
        updatedAt: new Date('2026-01-23T15:30:00Z'),
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440003',
        email: 'preecha@example.com',
        emailVerified: true,
        phone: '+66834567890',
        phoneVerified: false,
        profileType: 'legal_entity',
        firstName: 'ปรีชา',
        lastName: 'วัฒนา',
        displayName: undefined,
        avatarUrl: undefined,
        dateOfBirth: undefined,
        gender: undefined,
        status: 'active',
        originAppId: 'allkons-admin',
        roles: ['ADMIN'],
        lastLoginAt: new Date('2026-01-20T09:15:00Z'),
        createdAt: new Date('2026-01-10T14:00:00Z'),
        updatedAt: new Date('2026-01-20T09:15:00Z'),
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440004',
        email: 'araya.s@example.com',
        emailVerified: true,
        phone: '+66845678901',
        phoneVerified: true,
        profileType: 'individual_consumer',
        firstName: 'อารยา',
        lastName: 'สุขสวัสดิ์',
        displayName: 'อารยา สุขสวัสดิ์',
        avatarUrl: undefined,
        dateOfBirth: new Date('1992-11-08'),
        gender: 'female',
        status: 'active',
        originAppId: 'allkons-buyer-web',
        roles: ['BUYER'],
        lastLoginAt: new Date('2026-01-24T10:45:00Z'),
        createdAt: new Date('2025-09-20T11:30:00Z'),
        updatedAt: new Date('2026-01-24T10:45:00Z'),
    },

    // Seller Team Members (for RBAC testing)
    {
        id: '550e8400-e29b-41d4-a716-446655440010',
        email: 'product.manager@example.com',
        emailVerified: true,
        phone: '+66911111111',
        phoneVerified: true,
        profileType: 'registered_individual_merchant',
        firstName: 'ภัทร',
        lastName: 'ผู้จัดการสินค้า',
        displayName: 'ภัทร (Product Manager)',
        avatarUrl: undefined,
        status: 'active',
        originAppId: 'allkons-seller-app',
        roles: ['SELLER'],
        lastLoginAt: new Date('2026-01-24T09:00:00Z'),
        createdAt: new Date('2026-01-01T09:00:00Z'),
        updatedAt: new Date('2026-01-24T09:00:00Z'),
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440011',
        email: 'order.manager@example.com',
        emailVerified: true,
        phone: '+66922222222',
        phoneVerified: true,
        profileType: 'registered_individual_merchant',
        firstName: 'อรทัย',
        lastName: 'ผู้จัดการออเดอร์',
        displayName: 'อรทัย (Order Manager)',
        avatarUrl: undefined,
        status: 'active',
        originAppId: 'allkons-seller-app',
        roles: ['SELLER'],
        lastLoginAt: new Date('2026-01-24T09:05:00Z'),
        createdAt: new Date('2026-01-01T09:05:00Z'),
        updatedAt: new Date('2026-01-24T09:05:00Z'),
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440012',
        email: 'seller.viewer@example.com',
        emailVerified: true,
        phone: '+66933333333',
        phoneVerified: true,
        profileType: 'registered_individual_merchant',
        firstName: 'วิวัฒน์',
        lastName: 'ผู้ดูข้อมูล',
        displayName: 'วิวัฒน์ (Seller Viewer)',
        avatarUrl: undefined,
        status: 'active',
        originAppId: 'allkons-seller-app',
        roles: ['SELLER'],
        lastLoginAt: new Date('2026-01-24T09:10:00Z'),
        createdAt: new Date('2026-01-01T09:10:00Z'),
        updatedAt: new Date('2026-01-24T09:10:00Z'),
    },
];

// ============================================================================
// MOCK USER VERIFICATIONS
// ============================================================================

export const mockUserVerifications: UserVerification[] = [
    // Dechwit's verifications
    {
        id: 'ver-000-email',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        verificationType: 'email',
        verificationValue: 'dechwit@gmail.com',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-10-15T09:05:00Z'),
        verifiedBy: 'email_link',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-10-15T09:00:00Z'),
    },
    {
        id: 'ver-000-phone',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        verificationType: 'phone',
        verificationValue: '+66938311673',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-10-15T09:10:00Z'),
        verifiedBy: 'sms_otp',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-10-15T09:05:00Z'),
    },
    {
        id: 'ver-001',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        verificationType: 'email',
        verificationValue: 'somchai@example.com',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-11-01T10:15:00Z'),
        verifiedBy: 'email_link',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-11-01T10:00:00Z'),
    },
    {
        id: 'ver-002',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        verificationType: 'phone',
        verificationValue: '+66812345678',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-11-01T10:20:00Z'),
        verifiedBy: 'sms_otp',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-11-01T10:15:00Z'),
    },
    {
        id: 'ver-003',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        verificationType: 'email',
        verificationValue: 'somsri@example.com',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-12-15T08:10:00Z'),
        verifiedBy: 'email_link',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-12-15T08:00:00Z'),
    },
    {
        id: 'ver-004',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        verificationType: 'phone',
        verificationValue: '+66823456789',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-12-15T08:15:00Z'),
        verifiedBy: 'sms_otp',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-12-15T08:10:00Z'),
    },
    // Araya's verifications
    {
        id: 'ver-005',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        verificationType: 'email',
        verificationValue: 'araya.s@example.com',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-09-20T11:35:00Z'),
        verifiedBy: 'email_link',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-09-20T11:30:00Z'),
    },
    {
        id: 'ver-006',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        verificationType: 'phone',
        verificationValue: '+66845678901',
        verificationToken: undefined,
        tokenExpiresAt: undefined,
        verifiedAt: new Date('2025-09-20T11:40:00Z'),
        verifiedBy: 'sms_otp',
        status: 'verified',
        metadata: undefined,
        createdAt: new Date('2025-09-20T11:35:00Z'),
    },
];

// ============================================================================
// MOCK USER SESSIONS
// ============================================================================

export const mockUserSessions: UserSession[] = [
    // Dechwit's active session
    {
        id: 'session-000',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        deviceName: 'Chrome on MacBook Pro M2',
        deviceType: 'desktop',
        ipAddress: '192.168.1.99',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        lastActiveAt: new Date('2026-01-24T13:00:00Z'),
        expiresAt: new Date('2026-02-23T13:00:00Z'),
        createdAt: new Date('2026-01-24T09:00:00Z'),
    },
    {
        id: 'session-001',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        deviceName: 'Chrome on MacBook Pro',
        deviceType: 'desktop',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        lastActiveAt: new Date('2026-01-24T12:00:00Z'),
        expiresAt: new Date('2026-02-23T12:00:00Z'),
        createdAt: new Date('2026-01-24T08:00:00Z'),
    },
    {
        id: 'session-002',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        deviceName: 'iPhone 14 Pro',
        deviceType: 'mobile',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
        lastActiveAt: new Date('2026-01-24T11:30:00Z'),
        expiresAt: new Date('2026-02-23T11:30:00Z'),
        createdAt: new Date('2026-01-23T20:00:00Z'),
    },
    {
        id: 'session-003',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        deviceName: 'Chrome on Windows',
        deviceType: 'desktop',
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        lastActiveAt: new Date('2026-01-23T15:30:00Z'),
        expiresAt: new Date('2026-02-22T15:30:00Z'),
        createdAt: new Date('2026-01-23T14:00:00Z'),
    },
    // Araya's session
    {
        id: 'session-004',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        deviceName: 'Safari on iPhone 15',
        deviceType: 'mobile',
        ipAddress: '192.168.1.103',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        lastActiveAt: new Date('2026-01-24T10:45:00Z'),
        expiresAt: new Date('2026-02-23T10:45:00Z'),
        createdAt: new Date('2026-01-24T08:30:00Z'),
    },
];

// ============================================================================
// MOCK USER PREFERENCES
// ============================================================================

export const mockUserPreferences: UserPreferences[] = [
    // Dechwit's preferences
    {
        id: 'pref-000',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        language: 'th',
        timezone: 'Asia/Bangkok',
        currency: 'THB',
        notificationsEmail: true,
        notificationsSms: true,
        notificationsPush: true,
        theme: 'light',
        metadata: {
            fontSize: 'medium',
            compactMode: false,
            sidebarCollapsed: false,
        },
        createdAt: new Date('2025-10-15T09:00:00Z'),
        updatedAt: new Date('2026-01-20T10:00:00Z'),
    },
    {
        id: 'pref-001',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        language: 'th',
        timezone: 'Asia/Bangkok',
        currency: 'THB',
        notificationsEmail: true,
        notificationsSms: true,
        notificationsPush: true,
        theme: 'light',
        metadata: {
            fontSize: 'medium',
            compactMode: false,
        },
        createdAt: new Date('2025-11-01T10:00:00Z'),
        updatedAt: new Date('2026-01-15T12:00:00Z'),
    },
    {
        id: 'pref-002',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        language: 'th',
        timezone: 'Asia/Bangkok',
        currency: 'THB',
        notificationsEmail: true,
        notificationsSms: false,
        notificationsPush: true,
        theme: 'auto',
        metadata: {
            fontSize: 'large',
            compactMode: true,
        },
        createdAt: new Date('2025-12-15T08:00:00Z'),
        updatedAt: new Date('2026-01-10T10:00:00Z'),
    },
    {
        id: 'pref-003',
        userId: '550e8400-e29b-41d4-a716-446655440003',
        language: 'th',
        timezone: 'Asia/Bangkok',
        currency: 'THB',
        notificationsEmail: true,
        notificationsSms: true,
        notificationsPush: false,
        theme: 'light',
        metadata: undefined,
        createdAt: new Date('2026-01-10T14:00:00Z'),
        updatedAt: new Date('2026-01-10T14:00:00Z'),
    },
    // Araya's preferences
    {
        id: 'pref-004',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        language: 'th',
        timezone: 'Asia/Bangkok',
        currency: 'THB',
        notificationsEmail: true,
        notificationsSms: true,
        notificationsPush: true,
        theme: 'auto',
        metadata: {
            fontSize: 'medium',
            compactMode: true,
        },
        createdAt: new Date('2025-09-20T11:30:00Z'),
        updatedAt: new Date('2026-01-18T14:00:00Z'),
    },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get user by ID
 */
export function getUserById(id: string): User | undefined {
    return mockUsers.find(user => user.id === id);
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string): User | undefined {
    return mockUsers.find(user => user.email === email);
}

/**
 * Get user by phone
 */
export function getUserByPhone(phone: string): User | undefined {
    return mockUsers.find(user => user.phone === phone);
}

/**
 * Get user verifications
 */
export function getUserVerifications(userId: string): UserVerification[] {
    return mockUserVerifications.filter(v => v.userId === userId);
}

/**
 * Get user sessions
 */
export function getUserSessions(userId: string): UserSession[] {
    return mockUserSessions.filter(s => s.userId === userId);
}

/**
 * Get user preferences
 */
export function getUserPreferences(userId: string): UserPreferences | undefined {
    return mockUserPreferences.find(p => p.userId === userId);
}

/**
 * Check if email is already registered
 */
export function isEmailRegistered(email: string): boolean {
    return mockUsers.some(user => user.email === email);
}
/**
 * Check if phone is already registered
 */
export function isPhoneRegistered(phone: string): boolean {
    return mockUsers.some(user => user.phone === phone);
}

/**
 * Mock file upload helper
 * In a real app, this would use the /api/upload endpoint
 */
export async function mockUploadFile(file: File, type: 'avatars' | 'products' | 'logos' = 'avatars'): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url;
}



