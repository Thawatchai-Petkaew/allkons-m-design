/**
 * Sync Supabase Auth with Prisma Account (MOCK VERSION)
 * Pure mock implementation for Designer/Frontend-only mode.
 */

import type { User } from '@supabase/supabase-js';
import { mockSeller1, mockSeller2, MOCK_PHONE_NUMBERS } from '@/lib/supabase/mock-data';

export interface SyncAccountResult {
  success: boolean;
  account?: any;
  error?: string;
}

// Helper to transform mock data to Prisma structure
function transformMockToPrisma(mockData: typeof mockSeller1 | typeof mockSeller2) {
  return {
    ...mockData.account,
    juristic_type_id: mockData.account.juristic_type_id ?? null, // Fix: Ensure null if undefined
    organizations: [
      {
        ...mockData.organization,
        shop: {
          ...mockData.shop,
          branches: mockData.branches,
        },
        userOrganizations: [
          {
            orgRole: { orgRolePermissions: [] },
            appRole: { appRolePermissions: [] },
          }
        ]
      }
    ]
  };
}

/**
 * Sync or create account after Supabase authentication (MOCK)
 */
export async function syncAccountAfterAuth(
  supabaseUser: User,
  phoneNumber?: string
): Promise<SyncAccountResult> {
  console.log('[Mock Sync] Syncing account for:', phoneNumber);

  // Find matching mock user
  let mockAccount: typeof mockSeller1 | typeof mockSeller2 = mockSeller1;
  const phone = (phoneNumber || supabaseUser.phone || '').replace(/\D/g, '');

  if (phone === MOCK_PHONE_NUMBERS.SELLER_2.replace(/\D/g, '')) {
    mockAccount = mockSeller2;
  }

  return {
    success: true,
    account: transformMockToPrisma(mockAccount),
  };
}

/**
 * Get account by Supabase user ID (MOCK)
 */
export async function getAccountByUserId(userId: string) {
  console.log('[Mock Sync] Getting account for user:', userId);

  // For simplicity, return Seller 1 default
  // In a real mock scenario, we might want to check the userId against mock data IDs
  return transformMockToPrisma(mockSeller1);
}


