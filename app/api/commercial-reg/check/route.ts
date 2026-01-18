import { NextRequest, NextResponse } from "next/server";

/**
 * Check if commercial registration number already exists in our system
 */
async function checkExistingInSystem(commercialRegNumber: string): Promise<boolean> {
  // TODO: Replace with actual database check
  // For MVP, use mock data
  const mockExistingNumbers = ["1234567890123", "2345678901234"];
  return mockExistingNumbers.includes(commercialRegNumber);
}

/**
 * GET /api/commercial-reg/check
 * Check commercial registration number against our system
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const commercialRegNumber = searchParams.get("number");

    if (!commercialRegNumber) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุเลขทะเบียนพาณิชย์" },
        { status: 400 }
      );
    }

    // Check if already exists in our system
    const existsInSystem = await checkExistingInSystem(commercialRegNumber);
    if (existsInSystem) {
      return NextResponse.json({
        success: false,
        error: "เลขทะเบียนพาณิชย์นี้เคยลงทะเบียนไปแล้ว",
        existsInSystem: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "เลขทะเบียนพาณิชย์สามารถใช้งานได้",
    });
  } catch (error: any) {
    console.error("Error checking commercial registration number:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "เกิดข้อผิดพลาดในการตรวจสอบ",
      },
      { status: 500 }
    );
  }
}
