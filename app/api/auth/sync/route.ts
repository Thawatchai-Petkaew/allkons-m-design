/**
 * API Route: Sync Supabase Auth with Prisma Account
 * 
 * POST /api/auth/sync
 * Body: { userId: string, phoneNumber?: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { syncAccountAfterAuth } from '@/lib/auth/sync';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, phoneNumber } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    // Create a mock user object for syncAccountAfterAuth
    // In real implementation, you might want to fetch from Supabase
    const mockUser = {
      id: userId,
      phone: phoneNumber,
      user_metadata: {
        phone: phoneNumber,
      },
    } as any;

    const result = await syncAccountAfterAuth(mockUser, phoneNumber);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      account: result.account,
    });
  } catch (error: any) {
    console.error('[API] Error syncing account:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
