import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

/**
 * GET /api/shop/check-subdomain
 * Check if subdomain is available (not already used)
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

    // Validate subdomain format (English letters and numbers only)
    if (!/^[a-zA-Z0-9]+$/.test(subdomain)) {
      return NextResponse.json(
        { success: false, error: "ใช้ตัวอักษรภาษาอังกฤษ และตัวเลขเท่านั้น" },
        { status: 400 }
      );
    }

    // Check if subdomain already exists
    const existingShop = await prisma.shop.findUnique({
      where: { subdomain: subdomain.toLowerCase() },
    });

    if (existingShop) {
      return NextResponse.json({
        success: false,
        error: "URL นี้ถูกใช้งานแล้ว",
        available: false,
      });
    }

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
