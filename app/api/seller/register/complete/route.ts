import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getServerClient } from "@/lib/supabase/serverClient";
import type { User } from "@supabase/supabase-js";

/**
 * POST /api/seller/register/complete
 * Create User Account + Organization + Shop
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId, // Supabase user ID
      phoneNumber,
      firstName,
      lastName,
      email,
      password, // Hashed password
      profileType, // "individual" | "juristic"
      businessTypes, // Array of business type codes
      commercialRegNumber, // For individual
      businessName, // For individual
      juristicPersonId, // For juristic
      juristicPersonType, // For juristic
      organizationName, // For juristic
      branchName, // For juristic (optional)
      shopName,
      subdomain,
      marketingConsent,
    } = body;

    // Validate required fields
    if (!userId || !phoneNumber || !firstName || !lastName || !email || !shopName || !subdomain) {
      return NextResponse.json(
        { success: false, error: "ข้อมูลไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    // Check if subdomain is available
    const existingShop = await prisma.shop.findUnique({
      where: { subdomain: subdomain.toLowerCase() },
    });

    if (existingShop) {
      return NextResponse.json(
        { success: false, error: "URL นี้ถูกใช้งานแล้ว" },
        { status: 400 }
      );
    }

    // Get or create Supabase user
    const supabase = await getServerClient();
    let supabaseUser: User | undefined;
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId);
      if (userError || !user) {
        // Create user if not exists
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: email,
          phone: phoneNumber,
          password: password,
          email_confirm: true,
          phone_confirm: true,
        });
        
        if (createError || !newUser.user) {
          throw new Error(createError?.message || "ไม่สามารถสร้างผู้ใช้ได้");
        }
        supabaseUser = newUser.user;
      } else {
        supabaseUser = user;
      }
    } catch (err: any) {
      console.error("Error with Supabase user:", err);
      // For MVP, continue without Supabase user if needed
    }

    // Start transaction to create Account + Organization + Shop
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Account
      const account = await tx.account.create({
        data: {
          userId: supabaseUser?.id || userId,
          appId: "allkons-m",
          customerStatus: "CUSTOMER",
          customerProfileType: "PERSONAL",
          organizeType: profileType === "juristic" ? "HEAD_OFFICE" : "HEAD_OFFICE",
          taxId: profileType === "individual" ? commercialRegNumber : juristicPersonId,
          activeStatus: true,
          kycStatus: "WAIT_FOR_APPROVE", // Will be approved later
        },
      });

      // 2. Get Juristic Type (required for Organization)
      let juristicTypeId: string;
      if (profileType === "juristic" && juristicPersonType) {
        // Find juristic type for juristic person
        const juristicType = await tx.juristicType.findFirst({
          where: {
            code: juristicPersonType,
            isActive: true,
          },
        });

        if (!juristicType) {
          throw new Error(`ไม่พบประเภทนิติบุคคล: ${juristicPersonType}`);
        }
        juristicTypeId = juristicType.id;
      } else {
        // For individual profile, use default "PERSONAL" or first active juristic type
        const defaultJuristicType = await tx.juristicType.findFirst({
          where: {
            isActive: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        });

        if (!defaultJuristicType) {
          throw new Error("ไม่พบประเภทนิติบุคคลเริ่มต้น กรุณาติดต่อผู้ดูแลระบบ");
        }
        juristicTypeId = defaultJuristicType.id;
      }

      // 3. Create Organization
      const organization = await tx.organization.create({
        data: {
          accountId: account.id,
          name: profileType === "individual" ? businessName : organizationName,
          juristicName: profileType === "individual" ? businessName : organizationName,
          juristicTypeId: juristicTypeId,
          organizeType: "HEAD_OFFICE",
          taxId: profileType === "individual" ? commercialRegNumber : juristicPersonId,
          businessRegistrationNumber:
            profileType === "individual" ? commercialRegNumber : juristicPersonId,
          kybStatus: "WAIT_FOR_APPROVE", // Will be approved later
          isVerified: false,
          activeStatus: true,
        },
      });

      // 4. Create Shop
      const shop = await tx.shop.create({
        data: {
          organizationId: organization.id,
          subdomain: subdomain.toLowerCase(),
          name: shopName,
          isActive: true,
        },
      });

      // 5. Create Main Branch
      const branch = await tx.branch.create({
        data: {
          shopId: shop.id,
          name: branchName || "สำนักงานใหญ่",
          isMain: true,
          isActive: true,
        },
      });

      // 6. Create User Registration record
      await tx.userRegistration.create({
        data: {
          accountId: account.id,
          registrationType: "phone_otp",
          registrationSource: "web",
        },
      });

      // 7. Create User Preferences (marketing consent)
      await tx.userPreference.create({
        data: {
          accountId: account.id,
          preferenceKey: "marketing_consent",
          preferenceValue: marketingConsent ? "true" : "false",
        },
      });

      // 8. Create default roles (if needed)
      // TODO: Create default ORG and APP roles with permissions

      return {
        account,
        organization,
        shop,
        branch,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        accountId: result.account.id,
        organizationId: result.organization.id,
        shopId: result.shop.id,
        subdomain: result.shop.subdomain,
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
