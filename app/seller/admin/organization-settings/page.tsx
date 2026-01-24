"use client";

import React, { useMemo } from "react";
import {
    Row, Col, Card, Typography, Button, Space,
    Tag, Divider, Avatar, List, Badge, Descriptions
} from "antd";
import { ds } from "@/design-system";
import {
    mockOrganizations,
    mockOrgMembers,
    mockUsers,
    mockShops
} from "@/lib/data/mock";

const { Title, Text } = Typography;

export default function OrganizationSettingsPage() {
    // In a real app, this would be the current org in context
    const currentOrgId = 'org-thammasorn-001';
    const org = useMemo(() => mockOrganizations.find(o => o.id === currentOrgId), [currentOrgId]);
    const members = useMemo(() => mockOrgMembers.filter(m => m.orgId === currentOrgId), [currentOrgId]);
    const shops = useMemo(() => mockShops.filter(s => s.orgId === currentOrgId), [currentOrgId]);

    if (!org) return <div>Organization not found</div>;

    return (
        <div style={{ padding: ds.spacing("6"), maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ marginBottom: ds.spacing("8"), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                        การตั้งค่าองค์กร
                    </Title>
                    <Text style={{ color: ds.color.text('secondary') }}>จัดการข้อมูลนิติบุคคล สมาชิก และสิทธิ์การใช้งานขององค์กร</Text>
                </div>
                <Button type="primary" icon={<i className="ri-edit-line" />}>แก้ไขข้อมูล</Button>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        {/* Juristic Info */}
                        <Card title="ข้อมูลนิติบุคคล" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                            <Descriptions column={2} bordered size="small">
                                <Descriptions.Item label="ชื่อองค์กร (TH)" span={2}>{org.name}</Descriptions.Item>
                                <Descriptions.Item label="ชื่อองค์กร (EN)" span={2}>{org.nameEn}</Descriptions.Item>
                                <Descriptions.Item label="ประเภทธุรกิจ">{org.juristicTypeId === 'limited-company' ? 'บริษัทจำกัด' : 'บุคคลธรรมดา'}</Descriptions.Item>
                                <Descriptions.Item label="เลขผู้เสียภาษี">{org.taxId}</Descriptions.Item>
                                <Descriptions.Item label="อีเมลติดต่อ">{org.email}</Descriptions.Item>
                                <Descriptions.Item label="เบอร์โทรศัพท์">{org.phone}</Descriptions.Item>
                            </Descriptions>

                            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Text strong>สถานะ KYB:</Text>
                                <Badge
                                    status={org.kybStatus === 'verified' ? "success" : "processing"}
                                    text={org.kybStatus === 'verified' ? "ยืนยันตัวตนสำเร็จ (Verified)" : "กำลังตรวจสอบข้อมูล"}
                                />
                            </div>
                        </Card>

                        {/* Team Members */}
                        <Card
                            title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>สมาชิกในองค์กร ({members.length})</span>
                                <Button size="small" icon={<i className="ri-user-add-line" />}>เชิญสมาชิก</Button>
                            </div>}
                            bordered={false}
                            style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={members}
                                renderItem={(member) => {
                                    const userInfo = mockUsers.find(u => u.id === member.userId);
                                    return (
                                        <List.Item
                                            actions={[<Button key="edit" type="link">จัดการสิทธิ์</Button>]}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={userInfo?.avatarUrl} icon={<i className="ri-user-line" />} />}
                                                title={
                                                    <Space>
                                                        <Text strong>{userInfo?.displayName}</Text>
                                                        <Tag color={member.role === 'owner' ? "gold" : "blue"} bordered={false}>
                                                            {member.role.toUpperCase()}
                                                        </Tag>
                                                    </Space>
                                                }
                                                description={
                                                    <Space split={<Divider type="vertical" />}>
                                                        <Text type="secondary" style={{ fontSize: 12 }}>{userInfo?.email}</Text>
                                                        <Text type="secondary" style={{ fontSize: 12 }}>แอปที่ใช้งานได้: {member.authorizedApps.join(', ')}</Text>
                                                    </Space>
                                                }
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        </Card>
                    </Space>
                </Col>

                <Col xs={24} lg={8}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        {/* Organization Logo */}
                        <Card title="โลโก้องค์กร" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <Avatar
                                shape="square"
                                size={120}
                                src={org.logoUrl}
                                style={{ backgroundColor: '#f5f5f5', borderRadius: ds.radius("md"), marginBottom: 16 }}
                            />
                            <div style={{ marginTop: 8 }}>
                                <Button size="small">เปลี่ยนรูปโลโก้</Button>
                            </div>
                        </Card>

                        {/* Connected Shops */}
                        <Card title="ร้านค้าภายใต้องค์กร" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                            <List
                                size="small"
                                dataSource={shops}
                                renderItem={shop => (
                                    <List.Item>
                                        <Space>
                                            <Avatar size="small" src={shop.logoUrl} />
                                            <Text>{shop.name}</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        {/* Danger Zone */}
                        <Card title={<Text type="danger">Danger Zone</Text>} bordered={false} style={{ borderRadius: ds.radius("lg"), border: '1px solid #ff4d4f' }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Text type="secondary" style={{ fontSize: 12 }}>การลบองค์กรจะทำให้ข้อมูลร้านค้าและสินค้าทั้งหมดสูญหาย</Text>
                                <Button danger block>ระงับการใช้งานองค์กร</Button>
                            </Space>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}
