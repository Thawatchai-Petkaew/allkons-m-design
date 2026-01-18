import { NextRequest, NextResponse } from "next/server";

/**
 * DBD API Response Mapping
 * Map DBD Open API response to our internal format
 */
function mapDBDData(dbdData: any): {
  juristicPersonId: string;
  juristicPersonName: string;
  juristicPersonType: string;
  branchName?: string;
  prefix?: string;
  suffix?: string;
} {
  // Extract prefix and suffix from juristic person name
  const name = dbdData.juristicPersonName || dbdData.name || dbdData.juristicName || "";
  
  // Common patterns for Thai company names
  let prefix = "";
  let suffix = "";
  let coreName = name;

  // Pattern 1: บริษัท XXX จำกัด
  if (name.includes("บริษัท")) {
    prefix = "บริษัท";
    coreName = name.replace(/^บริษัท\s*/, "").replace(/\s*จำกัด$/, "");
    if (name.includes("จำกัด")) {
      suffix = "จำกัด";
    }
  }
  // Pattern 2: ห้างหุ้นส่วนจำกัด XXX
  else if (name.includes("ห้างหุ้นส่วน")) {
    const match = name.match(/^(ห้างหุ้นส่วน[^\s]*)/);
    prefix = match ? match[1] : "ห้างหุ้นส่วนจำกัด";
    coreName = name.replace(new RegExp(`^${prefix}\\s*`), "").replace(/\s*จำกัด$/, "");
    if (name.includes("จำกัด")) {
      suffix = "จำกัด";
    }
  }
  // Pattern 3: สมาคม XXX
  else if (name.includes("สมาคม")) {
    prefix = "สมาคม";
    coreName = name.replace(/^สมาคม\s*/, "");
  }
  // Pattern 4: มูลนิธิ XXX
  else if (name.includes("มูลนิธิ")) {
    prefix = "มูลนิธิ";
    coreName = name.replace(/^มูลนิธิ\s*/, "");
  }
  // Default: บริษัท XXX จำกัด
  else {
    prefix = "บริษัท";
    suffix = "จำกัด";
    coreName = name;
  }

  return {
    juristicPersonId: dbdData.juristicPersonId || dbdData.id || dbdData.juristicId || "",
    juristicPersonName: coreName.trim(),
    juristicPersonType: dbdData.juristicPersonType || dbdData.type || dbdData.juristicType || "บริษัทจำกัด",
    branchName: dbdData.branchName || dbdData.branch || "",
    prefix: prefix || "บริษัท",
    suffix: suffix || "จำกัด",
  };
}

/**
 * Check if juristic person ID already exists in our system
 */
async function checkExistingInSystem(juristicPersonId: string): Promise<boolean> {
  // TODO: Replace with actual database check
  // For MVP, use mock data
  const mockExistingIds = ["0105537012345"];
  return mockExistingIds.includes(juristicPersonId);
}

/**
 * GET /api/dbd/check-juristic
 * Check juristic person ID against DBD API and our system
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const juristicPersonId = searchParams.get("id");

    if (!juristicPersonId) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุเลขประจำตัวนิติบุคคล" },
        { status: 400 }
      );
    }

    // Step 1: Check if already exists in our system
    const existsInSystem = await checkExistingInSystem(juristicPersonId);
    if (existsInSystem) {
      return NextResponse.json({
        success: false,
        error: "เลขประจำตัวนิติบุคคลนี้เคยลงทะเบียนไปแล้ว",
        existsInSystem: true,
      });
    }

    // Step 2: Fetch from DBD API
    const dbdApiUrl = `https://openapi.dbd.go.th/api/v1/juristic_person/${juristicPersonId}`;
    
    // In production, add DBD API key to headers
    const apiKey = process.env.DBD_API_KEY;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
      // Or use API key header if DBD requires different format
      // headers["X-API-Key"] = apiKey;
    }

    const response = await fetch(dbdApiUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({
          success: false,
          error: "ไม่พบข้อมูลในฐานข้อมูล DBD",
          notFound: true,
        });
      }
      throw new Error(`DBD API error: ${response.status}`);
    }

    const dbdData = await response.json();
    
    // Map DBD data to our format
    const mappedData = mapDBDData(dbdData);

    return NextResponse.json({
      success: true,
      data: mappedData,
    });
  } catch (error: any) {
    console.error("Error checking juristic person ID:", error);
    
    // In development, return mock data if API fails
    if (process.env.NODE_ENV === "development") {
      const searchParams = request.nextUrl.searchParams;
      const juristicPersonId = searchParams.get("id") || "";
      
      return NextResponse.json({
        success: true,
        data: {
          juristicPersonId: juristicPersonId,
          juristicPersonName: "ตัวอย่างบริษัท",
          juristicPersonType: "บริษัทจำกัด",
          branchName: "สำนักงานใหญ่",
          prefix: "บริษัท",
          suffix: "จำกัด",
        },
        mock: true,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "เกิดข้อผิดพลาดในการตรวจสอบ",
      },
      { status: 500 }
    );
  }
}
