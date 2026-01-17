"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ds } from "@/design-system";
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
                phone_number: supabaseUser.phone || '',
                customer_status: data.account.customerStatus,
                kyc_status: data.account.kycStatus,
              },
              organization: org ? {
                id: org.id,
                name: org.name,
                tax_id: org.taxId,
                kyb_status: org.kybStatus,
              } : null,
              shop: shop ? {
                id: shop.id,
                name: shop.name,
                subdomain: shop.subdomain,
                is_active: shop.isActive,
              } : null,
              branches: branches.map((b: any) => ({
                id: b.id,
                name: b.name,
                address_line1: b.addressLine1,
                address_line2: b.addressLine2,
                city: b.city,
                province: b.province,
                postal_code: b.postalCode,
                phone_number: b.phoneNumber,
                is_main: b.isMain,
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

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: ds.color.background('secondary'),
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: ds.color.background('primary'),
          borderBottom: `1px solid ${ds.color.border('primary')}`,
          padding: `${ds.spacing(4)} ${ds.spacing(8)}`,
        }}
      >
        <div
          style={{
            maxWidth: ds.common.layout.containerMaxWidth,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1
            style={{
              fontSize: ds.typography.size('2xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary'),
              margin: 0,
            }}
          >
            Seller Dashboard
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: ds.spacing(4),
            }}
          >
            <span
              style={{
                fontSize: ds.typography.size('sm'),
                color: ds.color.text('secondary'),
              }}
            >
              {userData.account.phone_number}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: ds.common.layout.containerMaxWidth,
          margin: '0 auto',
          padding: ds.spacing(8),
        }}
      >
        {/* Organization Info */}
        <section
          style={{
            backgroundColor: ds.color.background('primary'),
            borderRadius: ds.radius('md'),
            padding: ds.spacing(6),
            marginBottom: ds.spacing(6),
            border: `1px solid ${ds.color.border('primary')}`,
          }}
        >
          <h2
            style={{
              fontSize: ds.typography.size('xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary'),
              marginBottom: ds.spacing(4),
            }}
          >
            ข้อมูลองค์กร
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: ds.spacing(4),
            }}
          >
            <div>
              <p
                style={{
                  fontSize: ds.typography.size('sm'),
                  color: ds.color.text('tertiary'),
                  marginBottom: ds.spacing(1),
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
                  marginBottom: ds.spacing(1),
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
                  marginBottom: ds.spacing(1),
                }}
              >
                สถานะ KYB
              </p>
              <span
                style={{
                  display: 'inline-block',
                  padding: `${ds.spacing(1)} ${ds.spacing(3)}`,
                  borderRadius: ds.radius('full'),
                  fontSize: ds.typography.size('xs'),
                  fontWeight: ds.typography.weight('medium'),
                  backgroundColor: userData.organization?.kyb_status === 'APPROVE' 
                    ? '#e5f7ec' 
                    : '#fff5f5',
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
              padding: ds.spacing(6),
              marginBottom: ds.spacing(6),
              border: `1px solid ${ds.color.border('primary')}`,
            }}
          >
            <h2
              style={{
                fontSize: ds.typography.size('xl'),
                fontWeight: ds.typography.weight('bold'),
                color: ds.color.text('primary'),
                marginBottom: ds.spacing(4),
              }}
            >
              ข้อมูลร้าน
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: ds.spacing(4),
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: ds.typography.size('sm'),
                    color: ds.color.text('tertiary'),
                    marginBottom: ds.spacing(1),
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
                    marginBottom: ds.spacing(1),
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
                    marginBottom: ds.spacing(1),
                  }}
                >
                  สถานะ
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    padding: `${ds.spacing(1)} ${ds.spacing(3)}`,
                    borderRadius: ds.radius('full'),
                    fontSize: ds.typography.size('xs'),
                    fontWeight: ds.typography.weight('medium'),
                    backgroundColor: userData.shop.is_active ? '#e5f7ec' : '#fff5f5',
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
              padding: ds.spacing(6),
              border: `1px solid ${ds.color.border('primary')}`,
            }}
          >
            <h2
              style={{
                fontSize: ds.typography.size('xl'),
                fontWeight: ds.typography.weight('bold'),
                color: ds.color.text('primary'),
                marginBottom: ds.spacing(4),
              }}
            >
              สาขา ({userData.branches.length} สาขา)
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: ds.spacing(4),
              }}
            >
              {userData.branches.map((branch) => (
                <div
                  key={branch.id}
                  style={{
                    padding: ds.spacing(4),
                    border: `1px solid ${ds.color.border('primary')}`,
                    borderRadius: ds.radius('sm'),
                    backgroundColor: branch.is_main ? '#f0f9ff' : ds.color.background('primary'),
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: ds.spacing(2),
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
                          padding: `${ds.spacing(1)} ${ds.spacing(2)}`,
                          borderRadius: ds.radius('xs'),
                          fontSize: ds.typography.size('xs'),
                          fontWeight: ds.typography.weight('medium'),
                          backgroundColor: ds.color.system('info'),
                          color: '#fff',
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
                        marginBottom: ds.spacing(1),
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
                        marginBottom: ds.spacing(1),
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
