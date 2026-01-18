"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ds } from "@/design-system";
// import { SellerHeader } from "@/components"; // TODO: Create SellerHeader component
import { getUser } from "@/lib/supabase/auth";
import { mockSeller1, mockSeller2, MOCK_PHONE_NUMBERS } from "@/lib/supabase/mock-data";
import type { UserSession } from "@/types";

export default function SellerDashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        // Get Supabase user
        const supabaseUser = await getUser();

        if (!supabaseUser) {
          // No user session, redirect to login
          router.push('/');
          return;
        }

        // Try to get account from Prisma via API
        try {
          const response = await fetch(`/api/account?userId=${supabaseUser.id}`);
          const data = await response.json();

          if (data.success && data.account) {
            // Transform Prisma account to UserSession format
            const org = data.account.organizations?.[0];
            const shop = org?.shop;
            const branches = shop?.branches || [];

            const userSession: UserSession = {
              account: {
                id: data.account.id,
                user_id: data.account.userId || supabaseUser.id,
                app_id: data.account.appId || 'allkons-m',
                allkons_id: data.account.allkonsId || undefined,
                customer_code: data.account.customerCode || undefined,
                customer_profile_type: (data.account.customerProfileType as any) || 'PERSONAL',
                customer_status: data.account.customerStatus as any,
                juristic_name: data.account.juristicName || undefined,
                juristic_type_id: data.account.juristicTypeId || undefined,
                organize_type: (data.account.organizeType as any) || 'HEAD_OFFICE',
                tax_id: data.account.taxId || '',
                branch_number: data.account.branchNumber || undefined,
                contact_shown_highest_authority: data.account.contactShownHighestAuthority || false,
                is_dopa: data.account.isDopa || false,
                is_dbd: data.account.isDbd || false,
                kyc_status: data.account.kycStatus as any,
                active_status: data.account.activeStatus ?? true,
                phone_number: supabaseUser.phone || '',
                email: data.account.email || undefined,
                created_at: data.account.createdAt?.toISOString() || new Date().toISOString(),
                updated_at: data.account.updatedAt?.toISOString() || new Date().toISOString(),
              },
              organization: org ? {
                id: org.id,
                account_id: org.accountId,
                allkons_org_id: org.allkonsOrgId || undefined,
                organization_code: org.organizationCode || undefined,
                name: org.name,
                name_en: org.nameEn || undefined,
                juristic_name: org.juristicName,
                juristic_type_id: org.juristicTypeId,
                organize_type: (org.organizeType as any),
                tax_id: org.taxId,
                branch_number: org.branchNumber || undefined,
                business_registration_number: org.businessRegistrationNumber || undefined,
                contact_shown_highest_authority: org.contactShownHighestAuthority || false,
                is_dopa: org.isDopa || false,
                is_dbd: org.isDbd || false,
                kyb_status: (org.kybStatus as any),
                is_verified: org.isVerified || false,
                active_status: org.activeStatus ?? true,
                created_at: org.createdAt?.toISOString() || new Date().toISOString(),
                updated_at: org.updatedAt?.toISOString() || new Date().toISOString(),
              } : undefined,
              shop: shop ? {
                id: shop.id,
                organization_id: shop.organizationId,
                subdomain: shop.subdomain,
                name: shop.name,
                name_en: shop.nameEn || undefined,
                description: shop.description || undefined,
                logo_url: shop.logoUrl || undefined,
                banner_url: shop.bannerUrl || undefined,
                theme_color: shop.themeColor || undefined,
                is_active: shop.isActive,
                created_at: shop.createdAt?.toISOString() || new Date().toISOString(),
                updated_at: shop.updatedAt?.toISOString() || new Date().toISOString(),
              } : undefined,
              branches: branches.map((b: any) => ({
                id: b.id,
                shop_id: b.shopId,
                name: b.name,
                name_en: b.nameEn || undefined,
                address_line1: b.addressLine1 || undefined,
                address_line2: b.addressLine2 || undefined,
                city: b.city || undefined,
                province: b.province || undefined,
                postal_code: b.postalCode || undefined,
                phone_number: b.phoneNumber || undefined,
                email: b.email || undefined,
                is_main: b.isMain || false,
                is_active: b.isActive ?? true,
                created_at: b.createdAt?.toISOString() || new Date().toISOString(),
                updated_at: b.updatedAt?.toISOString() || new Date().toISOString(),
              })),
              role: {
                org_role: 'ORG_OWNER', // TODO: Get from userOrganizations
                app_role: 'SELLER_PRODUCT_MANAGER', // TODO: Get from userOrganizations
              },
            };

            setUserData(userSession);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('[Dashboard] Error fetching account:', error);
        }

        // Fallback to mock data if Prisma query fails (for MVP)
        const mockData: UserSession = {
          account: mockSeller1.account,
          organization: mockSeller1.organization,
          shop: mockSeller1.shop,
          branches: mockSeller1.branches,
          role: {
            org_role: 'ORG_OWNER',
            app_role: 'SELLER_PRODUCT_MANAGER',
          },
        };

        setUserData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('[Dashboard] Error loading user data:', error);
        setLoading(false);
      }
    }

    loadUserData();
  }, [router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ds.color.background('secondary'),
        }}
      >
        <p style={{ color: ds.color.text('secondary') }}>กำลังโหลด...</p>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  // Extract account info for header
  const accountInfo = userData.account.phone_number
    ? {
        firstName: "เดชวิทย์", // TODO: Get from account data
        lastName: "มงคลจิต", // TODO: Get from account data
        email: userData.account.email || "dechwit@gmail.com", // TODO: Get from account data
        phoneNumber: userData.account.phone_number,
      }
    : undefined;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: ds.color.background('secondary'),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      {/* TODO: Create SellerHeader component */}
      {/* <SellerHeader
        shop={userData.shop ? {
          id: userData.shop.id,
          name: userData.shop.name,
          subdomain: userData.shop.subdomain,
          isActive: userData.shop.is_active,
        } : undefined}
        organization={userData.organization ? {
          id: userData.organization.id,
          name: userData.organization.name,
          isVerified: userData.organization.is_verified,
        } : undefined}
        account={accountInfo}
        notificationCount={99} // Mock notification count
      /> */}

      {/* Main Content */}
      <main
        style={{
          maxWidth: ds.common.layout.containerMaxWidth,
          margin: '0 auto',
          padding: ds.spacing('8'),
        }}
      >
        {/* Organization Info */}
        <section
          style={{
            backgroundColor: ds.color.background('primary'),
            borderRadius: ds.radius('md'),
            padding: ds.spacing('6'),
            marginBottom: ds.spacing('6'),
            border: `1px solid ${ds.color.border('primary')}`,
          }}
        >
          <h2
            style={{
              fontSize: ds.typography.size('xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary'),
              marginBottom: ds.spacing('4'),
            }}
          >
            ข้อมูลองค์กร
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: ds.spacing('4'),
            }}
          >
            <div>
              <p
                style={{
                  fontSize: ds.typography.size('sm'),
                  color: ds.color.text('tertiary'),
                  marginBottom: ds.spacing('1'),
                }}
              >
                ชื่อองค์กร
              </p>
              <p
                style={{
                  fontSize: ds.typography.size('md'),
                  fontWeight: ds.typography.weight('medium'),
                  color: ds.color.text('primary'),
                }}
              >
                {userData.organization?.name || 'N/A'}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: ds.typography.size('sm'),
                  color: ds.color.text('tertiary'),
                  marginBottom: ds.spacing('1'),
                }}
              >
                เลขประจำตัวผู้เสียภาษี
              </p>
              <p
                style={{
                  fontSize: ds.typography.size('md'),
                  fontWeight: ds.typography.weight('medium'),
                  color: ds.color.text('primary'),
                }}
              >
                {userData.organization?.tax_id || 'N/A'}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: ds.typography.size('sm'),
                  color: ds.color.text('tertiary'),
                  marginBottom: ds.spacing('1'),
                }}
              >
                สถานะ KYB
              </p>
              <span
                style={{
                  display: 'inline-block',
                  padding: `${ds.spacing('1')} ${ds.spacing('3')}`,
                  borderRadius: ds.radius('full'),
                  fontSize: ds.typography.size('xs'),
                  fontWeight: ds.typography.weight('medium'),
                  backgroundColor: userData.organization?.kyb_status === 'APPROVE' 
                    ? 'var(--special-green-sg90)' // #e5f7ec - success light background
                    : 'var(--red-rd90)', // #fbe8e7 - error light background
                  color: userData.organization?.kyb_status === 'APPROVE'
                    ? ds.color.system('success')
                    : ds.color.system('error'),
                }}
              >
                {userData.organization?.kyb_status === 'APPROVE' ? 'อนุมัติแล้ว' : userData.organization?.kyb_status || 'N/A'}
              </span>
            </div>
          </div>
        </section>

        {/* Shop Info */}
        {userData.shop && (
          <section
            style={{
              backgroundColor: ds.color.background('primary'),
              borderRadius: ds.radius('md'),
              padding: ds.spacing('6'),
              marginBottom: ds.spacing('6'),
              border: `1px solid ${ds.color.border('primary')}`,
            }}
          >
            <h2
              style={{
                fontSize: ds.typography.size('xl'),
                fontWeight: ds.typography.weight('bold'),
                color: ds.color.text('primary'),
                marginBottom: ds.spacing('4'),
              }}
            >
              ข้อมูลร้าน
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: ds.spacing('4'),
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: ds.typography.size('sm'),
                    color: ds.color.text('tertiary'),
                    marginBottom: ds.spacing('1'),
                  }}
                >
                  ชื่อร้าน
                </p>
                <p
                  style={{
                    fontSize: ds.typography.size('md'),
                    fontWeight: ds.typography.weight('medium'),
                    color: ds.color.text('primary'),
                  }}
                >
                  {userData.shop.name}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: ds.typography.size('sm'),
                    color: ds.color.text('tertiary'),
                    marginBottom: ds.spacing('1'),
                  }}
                >
                  Subdomain
                </p>
                <p
                  style={{
                    fontSize: ds.typography.size('md'),
                    fontWeight: ds.typography.weight('medium'),
                    color: ds.color.text('primary'),
                  }}
                >
                  {userData.shop.subdomain}.allkons.com
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: ds.typography.size('sm'),
                    color: ds.color.text('tertiary'),
                    marginBottom: ds.spacing('1'),
                  }}
                >
                  สถานะ
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    padding: `${ds.spacing('1')} ${ds.spacing('3')}`,
                    borderRadius: ds.radius('full'),
                    fontSize: ds.typography.size('xs'),
                    fontWeight: ds.typography.weight('medium'),
                    backgroundColor: userData.shop.is_active ? 'var(--special-green-sg90)' : 'var(--red-rd90)', // success/error light backgrounds
                    color: userData.shop.is_active
                      ? ds.color.system('success')
                      : ds.color.system('error'),
                  }}
                >
                  {userData.shop.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Branches */}
        {userData.branches && userData.branches.length > 0 && (
          <section
            style={{
              backgroundColor: ds.color.background('primary'),
              borderRadius: ds.radius('md'),
              padding: ds.spacing('6'),
              border: `1px solid ${ds.color.border('primary')}`,
            }}
          >
            <h2
              style={{
                fontSize: ds.typography.size('xl'),
                fontWeight: ds.typography.weight('bold'),
                color: ds.color.text('primary'),
                marginBottom: ds.spacing('4'),
              }}
            >
              สาขา ({userData.branches.length} สาขา)
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: ds.spacing('4'),
              }}
            >
              {userData.branches.map((branch) => (
                <div
                  key={branch.id}
                  style={{
                    padding: ds.spacing('4'),
                    border: `1px solid ${ds.color.border('primary')}`,
                    borderRadius: ds.radius('sm'),
                    backgroundColor: branch.is_main ? 'var(--blue-be90)' : ds.color.background('primary'), // #eff7fc - info light background
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: ds.spacing('2'),
                    }}
                  >
                    <h3
                      style={{
                        fontSize: ds.typography.size('lg'),
                        fontWeight: ds.typography.weight('bold'),
                        color: ds.color.text('primary'),
                        margin: 0,
                      }}
                    >
                      {branch.name}
                    </h3>
                    {branch.is_main && (
                      <span
                        style={{
                          padding: `${ds.spacing('1')} ${ds.spacing('2')}`,
                          borderRadius: ds.radius('xs'),
                          fontSize: ds.typography.size('xs'),
                          fontWeight: ds.typography.weight('medium'),
                          backgroundColor: ds.color.system('info'),
                          color: ds.color.text('white'),
                        }}
                      >
                        สำนักงานใหญ่
                      </span>
                    )}
                  </div>
                  {branch.address_line1 && (
                    <p
                      style={{
                        fontSize: ds.typography.size('sm'),
                        color: ds.color.text('secondary'),
                        marginBottom: ds.spacing('1'),
                      }}
                    >
                      {branch.address_line1}
                      {branch.address_line2 && ` ${branch.address_line2}`}
                    </p>
                  )}
                  {(branch.city || branch.province) && (
                    <p
                      style={{
                        fontSize: ds.typography.size('sm'),
                        color: ds.color.text('secondary'),
                        marginBottom: ds.spacing('1'),
                      }}
                    >
                      {branch.city} {branch.province} {branch.postal_code}
                    </p>
                  )}
                  {branch.phone_number && (
                    <p
                      style={{
                        fontSize: ds.typography.size('sm'),
                        color: ds.color.text('secondary'),
                      }}
                    >
                      📞 {branch.phone_number}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
