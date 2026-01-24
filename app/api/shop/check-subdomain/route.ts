import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/shop/check-subdomain (MOCK)
 * Check if subdomain is available
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subdomain = searchParams.get("subdomain");

    if (!subdomain) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุ subdomain" },
        { status: 400 }
      );
    }

    console.log('[Mock Check Subdomain] Checking:', subdomain);

    return NextResponse.json({
      success: true,
      message: "URL นี้สามารถใช้งานได้",
      available: true,
    });
  } catch (error: any) {
    console.error("Error checking subdomain:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "เกิดข้อผิดพลาดในการตรวจสอบ",
      },
      { status: 500 }
    );
  }
}
