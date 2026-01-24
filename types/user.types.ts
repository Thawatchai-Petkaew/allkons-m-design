/**
 * User Type Definitions
 * Based on User Database Schema
 */

export type UserStatus = 'active' | 'suspended' | 'deleted';
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type VerificationType = 'email' | 'phone' | 'national_id' | 'bank_account';
export type VerificationStatus = 'pending' | 'verified' | 'failed' | 'expired';
export type DeviceType = 'web' | 'mobile' | 'tablet' | 'desktop';
export type Theme = 'light' | 'dark' | 'auto';
export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';
export type UserProfileType = 'individual_consumer' | 'registered_individual_merchant' | 'legal_entity';

/**
 * Core User Data
 */
export interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    phone?: string;
    phoneVerified: boolean;
    profileType: UserProfileType;
    firstName: string;
    lastName: string;
    displayName?: string;
    avatarUrl?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    status: UserStatus;
    originAppId?: string;
    roles: UserRole[];
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}


/**
 * User Verification Records (KYC/Identity)
 */
export interface UserVerification {
    id: string;
    userId: string;
    verificationType: VerificationType;
    verificationValue: string;
    verificationToken?: string;
    tokenExpiresAt?: Date;
    verifiedAt?: Date;
    verifiedBy?: string;
    status: VerificationStatus;
    metadata?: Record<string, any>;
    createdAt: Date;
}

/**
 * User Authentication Sessions
 */
export interface UserSession {
    id: string;
    userId: string;
    deviceName?: string;
    deviceType?: DeviceType;
    ipAddress?: string;
    userAgent?: string;
    lastActiveAt: Date;
    expiresAt: Date;
    createdAt: Date;
}

/**
 * User Preferences/Settings
 */
export interface UserPreferences {
    id: string;
    userId: string;
    language: string;
    timezone: string;
    currency: string;
    notificationsEmail: boolean;
    notificationsSms: boolean;
    notificationsPush: boolean;
    theme: Theme;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Password Reset Token
 */
export interface PasswordResetToken {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    usedAt?: Date;
    createdAt: Date;
}

/**
 * Registration Data (form input)
 */
export interface RegisterData {
    email: string;
    password: string;
    phone?: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    gender?: Gender;
}

/**
 * Login Credentials
 */
export interface LoginCredentials {
    emailOrPhone: string;
    password: string;
}

/**
 * Auth Response
 */
export interface AuthResponse {
    user: User;
    token: string;
    expiresAt: Date;
}
