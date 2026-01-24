/**
 * Organization Type Definitions
 * Based on Organization Database Schema
 */

import { UserRole } from "./user.types";

export type OrgType = 'personal' | 'legal';
export type KYBStatus = 'pending' | 'verified' | 'rejected';
export type OrgRole = 'owner' | 'admin' | 'manager' | 'editor' | 'viewer';

/**
 * Core Organization Data
 */
export interface Organization {
    id: string;
    ownerUserId: string;
    name: string;
    nameEn?: string;
    type: OrgType;
    juristicName?: string;
    juristicTypeId?: string;
    taxId?: string;
    businessRegistrationNumber?: string;
    logoUrl?: string;
    websiteUrl?: string;
    email?: string;
    phone?: string;
    kybStatus: KYBStatus;
    activeStatus: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Organization Membership
 */
export interface OrgMember {
    id: string;
    orgId: string;
    userId: string;
    role: OrgRole;
    authorizedApps: UserRole[]; // Apps allowed for this user in this org context
    isActive: boolean;
    joinedAt: Date;
    lastAccessedAt?: Date;
}


/**
 * Organization Verification Documents
 */
export interface OrgVerification {
    id: string;
    orgId: string;
    documentType: 'juristic_certificate' | 'id_card' | 'tax_document' | 'bank_statement';
    documentUrl: string;
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    verifiedAt?: Date;
    verifiedBy?: string;
    createdAt: Date;
}
