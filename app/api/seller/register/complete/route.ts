import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/seller/register/complete (MOCK)
 * Create User Account + Organization + Shop
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[Mock Register] Received registration:', body);

    return NextResponse.json({
      success: true,
      data: {
        accountId: "mock-account-id",
        organizationId: "mock-org-id",
        shopId: "mock-shop-id",
        subdomain: body.subdomain || "mock-subdomain",
      },
    });
  } catch (error: any) {
    console.error("Error completing seller registration:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "เกิดข้อผิดพลาดในการสร้างบัญชี",
      },
      { status: 500 }
    );
  }
}

