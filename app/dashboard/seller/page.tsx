"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ds } from "@/design-system";
import { useSellerSession } from "@/lib/hooks/useSellerSession";
import { Tag, Card, Row, Col, Typography, Spin, Badge } from "antd";

const { Title, Text } = Typography;

export default function SellerDashboardPage() {
  const router = useRouter();
  const { user, org, shop, branches, loading } = useSellerSession();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/seller/login');
    }
  }, [user, loading, router]);

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
        <Spin size="large" tip="กำลังโหลดข้อมูล..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: ds.color.background('secondary'),
        padding: ds.spacing('8'),
      }}
    >
      <div style={{ maxWidth: ds.breakpoint.pixel('xl'), margin: '0 auto' }}>
        <Title level={2}>แดชบอร์ดผู้ขาย</Title>
        <Text type="secondary" style={{ marginBottom: 32, display: 'block' }}>
          ยินดีต้อนรับคุณ {user.displayName || user.firstName} เข้าสู่ระบบจัดการร้านค้า
        </Text>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Organization Info */}
              <Card title="ข้อมูลองค์กร" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: 12 }}>ชื่อองค์กร</Text>
                    <div style={{ fontWeight: 'bold' }}>{org?.name || '-'}</div>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: 12 }}>เลขประจำตัวผู้เสียภาษี</Text>
                    <div style={{ fontWeight: 'bold' }}>{org?.taxId || '-'}</div>
                  </Col>
                  <Col span={24}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Text strong>สถานะ KYB:</Text>
                      <Badge
                        status={org?.kybStatus === 'verified' ? "success" : "processing"}
                        text={org?.kybStatus === 'verified' ? "ยืนยันตัวตนสำเร็จ" : "กำลังตรวจสอบ"}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>

              {/* Shop Info */}
              {shop && (
                <Card title="ข้อมูลร้านค้า" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: 12 }}>ชื่อร้าน</Text>
                      <div style={{ fontWeight: 'bold' }}>{shop.name}</div>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: 12 }}>Subdomain</Text>
                      <div style={{ fontWeight: 'bold' }}>{shop.subdomain}.allkons.com</div>
                    </Col>
                    <Col span={24}>
                      <Tag color={shop.isActive ? "success" : "default"}>
                        {shop.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                      </Tag>
                    </Col>
                  </Row>
                </Card>
              )}
            </Space>
          </Col>

          <Col xs={24} lg={8}>
            <Card title={`สาขา (${branches?.length || 0})`} bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
              {(branches || []).map((branch: any) => (
                <div
                  key={branch.id}
                  style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{branch.name}</div>
                    {branch.isMain && <Tag color="blue" style={{ fontSize: 10 }}>HEAD OFFICE</Tag>}
                  </div>
                  <Tag color={branch.isActive ? "success" : "default"}>{branch.isActive ? "Active" : "Inactive"}</Tag>
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

import { Space } from "antd";
