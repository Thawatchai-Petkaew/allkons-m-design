"use client";

import React from "react";
import { Row, Col, Card, Typography, Button, Space, Tag, Avatar, Badge } from "antd";
import { ds } from "@/design-system";
import {
    mockUsers,
    getUserOrganizations,
    getOrgShops,
    mockOrgMembers
} from "@/lib/data/mock";

const { Title, Text } = Typography;

export default function AllShopsPage() {
    // In a real app, from auth session
    const currentUser = mockUsers[0]; // Dechwit
    const orgs = getUserOrganizations(currentUser.id);

    return (
        <div style={{ padding: ds.spacing("6") }}>
            <div style={{ marginBottom: ds.spacing("8") }}>
                <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                    ร้านค้าและองค์กรของคุณ
                </Title>
                <Text style={{ color: ds.color.text('secondary') }}>เลือกจัดการร้านค้าที่คุณมีสิทธิ์เข้าถึงทั้งหมด</Text>
            </div>

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {orgs.map(org => {
                    const shops = getOrgShops(org.id);
                    const membership = mockOrgMembers.find(m => m.orgId === org.id && m.userId === currentUser.id);

                    return (
                        <div key={org.id}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: ds.spacing("3"),
                                marginBottom: ds.spacing("4")
                            }}>
                                <Avatar
                                    shape="square"
                                    size="small"
                                    icon={<i className="ri-community-line" />}
                                    style={{ backgroundColor: ds.color.background("secondary"), color: ds.color.text("primary") }}
                                />
                                <Title level={4} style={{ margin: 0, ...ds.typography.preset("heading-h4") }}>
                                    {org.name}
                                </Title>
                                <Tag color={membership?.role === 'owner' ? "gold" : "blue"} bordered={false}>
                                    {membership?.role?.toUpperCase()}
                                </Tag>
                                {org.kybStatus === 'verified' && (
                                    <Tag color="success" icon={<i className="ri-checkbox-circle-fill" />} bordered={false}>
                                        Verified
                                    </Tag>
                                )}
                            </div>

                            <Row gutter={[24, 24]}>
                                {shops.map(shop => (
                                    <Col key={shop.id} xs={24} sm={12} lg={8}>
                                        <Card
                                            hoverable
                                            bordered={false}
                                            bodyStyle={{ padding: ds.spacing("5") }}
                                            style={{
                                                borderRadius: ds.radius("lg"),
                                                boxShadow: 'var(--shadow-sm)',
                                                border: '1px solid ' + ds.color.border('primary')
                                            }}
                                        >
                                            <div style={{ display: "flex", gap: ds.spacing("4") }}>
                                                <Avatar
                                                    size={64}
                                                    src={shop.logoUrl}
                                                    shape="square"
                                                    icon={<i className="ri-store-2-line" />}
                                                    style={{ backgroundColor: '#f5f5f5', borderRadius: ds.radius("md") }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <Title level={5} style={{ margin: 0, marginBottom: 4 }}>{shop.name}</Title>
                                                    <Text type="secondary" style={{ fontSize: ds.typography.size("xs"), display: 'block' }}>
                                                        {shop.subdomain}.allkons.com
                                                    </Text>
                                                    <div style={{ marginTop: 8 }}>
                                                        {membership?.authorizedApps.map(app => (
                                                            <Tag key={app} style={{ fontSize: '10px' }}>{app}</Tag>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider style={{ margin: '16px 0' }} />
                                            <Button type="primary" block style={{ borderRadius: ds.radius("md") }}>
                                                เข้าจัดการร้านค้า
                                            </Button>
                                        </Card>
                                    </Col>
                                ))}

                                {shops.length === 0 && (
                                    <Col span={24}>
                                        <Card bordered={false} style={{ textAlign: 'center', backgroundColor: '#fafafa' }}>
                                            <Text type="secondary">ยังไม่มีร้านค้าภายใต้องค์กรนี้</Text>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    );
                })}
            </Space>

            <div style={{ marginTop: ds.spacing("12"), textAlign: 'center' }}>
                <Button type="dashed" size="large" icon={<i className="ri-add-line" />}>
                    สร้างองค์กรใหม่
                </Button>
            </div>
        </div>
    );
}

// Add missing Divider from antd
import { Divider } from "antd";

