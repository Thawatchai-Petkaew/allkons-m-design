/**
 * Sync Supabase Auth with Prisma Account
 * 
 * After Supabase authentication, sync/create account in Prisma database
 */

import { prisma } from '@/lib/prisma/client';
import type { User } from '@supabase/supabase-js';

export interface SyncAccountResult {
  success: boolean;
  account?: any;
  error?: string;
}

/**
 * Sync or create account after Supabase authentication
 */
export async function syncAccountAfterAuth(
  supabaseUser: User,
  phoneNumber?: string
): Promise<SyncAccountResult> {
  try {
    // Check if account already exists
    const existingAccount = await prisma.account.findUnique({
      where: { userId: supabaseUser.id },
      include: {
        organizations: {
          include: {
            shop: {
              include: {
                branches: true,
              },
            },
          },
        },
      },
    });

    if (existingAccount) {
      // Account exists, return it
      return {
        success: true,
        account: existingAccount,
      };
    }

    // Create new account
    // Extract phone from user metadata or use provided phoneNumber
    const phone = phoneNumber || supabaseUser.phone || supabaseUser.user_metadata?.phone;

    const newAccount = await prisma.account.create({
      data: {
        userId: supabaseUser.id,
        appId: 'allkons-m',
        customerProfileType: 'PERSONAL',
        customerStatus: 'VISITOR',
        organizeType: 'HEAD_OFFICE',
        taxId: '', // Will be updated later during KYC
        kycStatus: 'NONE',
        activeStatus: true,
      },
      include: {
        organizations: {
          include: {
            shop: {
              include: {
                branches: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      account: newAccount,
    };
  } catch (error: any) {
    console.error('[Auth Sync] Error syncing account:', error);
    return {
      success: false,
      error: error.message || 'Failed to sync account',
    };
  }
}

/**
 * Get account by Supabase user ID
 */
export async function getAccountByUserId(userId: string) {
  try {
    const account = await prisma.account.findUnique({
      where: { userId },
      include: {
        organizations: {
          include: {
            shop: {
              include: {
                branches: true,
              },
            },
            userOrganizations: {
              include: {
                orgRole: {
                  include: {
                    orgRolePermissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
                appRole: {
                  include: {
                    appRolePermissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return account;
  } catch (error: any) {
    console.error('[Auth Sync] Error getting account:', error);
    return null;
  }
}
