"use client";

import React, { useState, useMemo } from "react";
import { Row, Col, Card, Typography, Button, Space, Input, Upload, message, Divider, Tag, List, Avatar, Tooltip } from "antd";
import { ds } from "@/design-system";
import { mockShops, mockOrganizations, mockUploadFile, getShopBranches } from "@/lib/data/mock";
import { useSellerSession } from "@/lib/hooks/useSellerSession";
import { canSellerAbility, getNoPermissionText } from "@/lib/access/sellerAbility";

const { Title, Text } = Typography;

export default function ShopManagementPage() {
    const { orgRoleCode } = useSellerSession();
    const canManageShop = canSellerAbility({ orgRoleCode }, "SHOP_MANAGE");
    const tooltipNoPermission = getNoPermissionText();

    // Simulated selection: In a real app, this comes from URL params or a global state
    // For now, let's find Thammasorn if it exists, otherwise use the first one
    const [selectedShopId, setSelectedShopId] = useState(
        mockShops.find(s => s.id === 'shop-thammasorn-001')?.id || mockShops[0].id
    );

    const shop = useMemo(() => mockShops.find(s => s.id === selectedShopId) || mockShops[0], [selectedShopId]);
    const org = useMemo(() => mockOrganizations.find(o => o.id === shop.orgId), [shop]);
    const branches = useMemo(() => getShopBranches(shop.id), [shop]);

    const [logoUrl, setLogoUrl] = useState(shop.logoUrl || "");
    const [uploading, setUploading] = useState(false);

    const handleLogoUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;

        if (!canManageShop) {
            message.warning(tooltipNoPermission);
            onError(new Error(tooltipNoPermission));
            return;
        }

        try {
            setUploading(true);
            const uploadedUrl = await mockUploadFile(file as File, 'logos');
            setLogoUrl(uploadedUrl);
            message.success("อัปโหลดโลโก้สำเร็จ!");
            onSuccess("ok");
        } catch (err) {
            console.error(err);
            message.error("อัปโหลดโลโก้ไม่สำเร็จ");
            onError(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: ds.spacing("6") }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: ds.spacing("8")
            }}>
                <div>
                    <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                        จัดการร้านค้า
                    </Title>
                    <Text style={{ color: ds.color.text('secondary') }}>ตั้งค่าข้อมูลองค์กรและโปรไฟล์ร้านค้าของคุณ</Text>
                </div>
                {mockShops.length > 1 && (
                    <Space>
                        <Text type="secondary">สลับร้านค้า:</Text>
                        {mockShops.map(s => (
                            <Tooltip key={s.id} title={!canManageShop ? tooltipNoPermission : undefined}>
                                <span>
                                    <Button
                                        type={selectedShopId === s.id ? "primary" : "default"}
                                        size="small"
                                        disabled={!canManageShop}
                                        onClick={() => {
                                            setSelectedShopId(s.id);
                                            setLogoUrl(s.logoUrl || "");
                                        }}
                                    >
                                        {s.name}
                                    </Button>
                                </span>
                            </Tooltip>
                        ))}
                    </Space>
                )}
            </div>

            <Row gutter={[24, 24]}>
                {/* Left Side: Shop Profile & Branches */}
                <Col xs={24} lg={16}>
                    <Card
                        title="ข้อมูลโปรไฟล์ร้านค้า"
                        bordered={false}
                        style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)', marginBottom: 24 }}
                    >
                        <Row gutter={24} align="middle">
                            <Col span={6} style={{ textAlign: "center" }}>
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    showUploadList={false}
                                    customRequest={handleLogoUpload}
                                    disabled={!canManageShop}
                                >
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {uploading ? <i className="ri-loader-4-line ri-spin" /> : <i className="ri-add-line" />}
                                            <div style={{ marginTop: 8 }}>Upload Logo</div>
                                        </div>
                                    )}
                                </Upload>
                                <Text type="secondary" style={{ fontSize: ds.typography.size("xs") }}>
                                    แนะนำ: 500x500px (PNG, JPG)
                                </Text>
                            </Col>
                            <Col span={18}>
                                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                    <div>
                                        <Text strong style={{ display: 'block', marginBottom: 4 }}>ชื่อร้านค้า (ภาษาไทย)</Text>
                                        <Input key={shop.id + 'th'} defaultValue={shop.name} />
                                    </div>
                                    <div>
                                        <Text strong style={{ display: 'block', marginBottom: 4 }}>ชื่อร้านค้า (ภาษาอังกฤษ)</Text>
                                        <Input key={shop.id + 'en'} defaultValue={shop.nameEn} />
                                    </div>
                                    <div>
                                        <Text strong style={{ display: 'block', marginBottom: 4 }}>Subdomain</Text>
                                        <Input
                                            key={shop.id + 'sub'}
                                            defaultValue={shop.subdomain}
                                            addonAfter=".allkons.com"
                                            disabled
                                        />
                                    </div>
                                </Space>
                            </Col>
                        </Row>

                        <Divider />

                        <div>
                            <Text strong style={{ display: 'block', marginBottom: 8 }}>คำอธิบายร้านค้า</Text>
                            <Input.TextArea
                                key={shop.id + 'desc'}
                                rows={4}
                                defaultValue={shop.description}
                                placeholder="เล่าเรื่องราวของร้านคุณให้ลูกค้ารู้จัก..."
                            />
                        </div>

                        <div style={{ marginTop: 24, textAlign: 'right' }}>
                            <Tooltip title={!canManageShop ? tooltipNoPermission : undefined}>
                                <span>
                                    <Button type="primary" size="large" disabled={!canManageShop}>
                                        บันทึกการเปลี่ยนแปลง
                                    </Button>
                                </span>
                            </Tooltip>
                        </div>
                    </Card>

                    {/* BRANCHES SECTION */}
                    <Card
                        title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>สาขาที่เปิดให้บริการ ({branches.length})</span>
                            <Tooltip title={!canManageShop ? tooltipNoPermission : undefined}>
                                <span>
                                    <Button type="link" icon={<i className="ri-add-circle-line" />} disabled={!canManageShop}>
                                        เพิ่มสาขา
                                    </Button>
                                </span>
                            </Tooltip>
                        </div>}
                        bordered={false}
                        style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={branches}
                            renderItem={(branch) => (
                                <List.Item
                                    actions={[
                                        <Tooltip key="edit_tip" title={!canManageShop ? tooltipNoPermission : undefined}>
                                            <span>
                                                <Button key="edit" type="link" disabled={!canManageShop}>
                                                    แก้ไข
                                                </Button>
                                            </span>
                                        </Tooltip>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{ backgroundColor: branch.isMain ? ds.color.text("brand-default") : '#f5f5f5' }}
                                                icon={<i className="ri-map-pin-2-line" style={{ color: branch.isMain ? '#fff' : '#666' }} />}
                                            />
                                        }
                                        title={
                                            <Space>
                                                <Text strong>{branch.name}</Text>
                                                {branch.isMain && <Tag color="blue" style={{ fontSize: '10px' }}>MAIN</Tag>}
                                            </Space>
                                        }
                                        description={
                                            <Space direction="vertical" size={0}>
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    {branch.addressLine1} {branch.city} {branch.province} {branch.postalCode}
                                                </Text>
                                                {branch.phone && (
                                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                                        <i className="ri-phone-line" style={{ marginRight: 4 }} />{branch.phone}
                                                    </Text>
                                                )}
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Right Side: Organization Info */}
                <Col xs={24} lg={8}>
                    <Card
                        title="ข้อมูลองค์กร"
                        bordered={false}
                        style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                    >
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <div style={{ display: 'flex', gap: 12 }}>
                                <Avatar shape="square" size={48} src={org?.logoUrl} />
                                <div>
                                    <Text type="secondary" style={{ fontSize: ds.typography.size("xs"), display: 'block' }}>
                                        ชื่อนิติบุคคล / ผู้จดทะเบียน
                                    </Text>
                                    <Text strong>{org?.juristicName || org?.name}</Text>
                                </div>
                            </div>

                            <div>
                                <Text type="secondary" style={{ fontSize: ds.typography.size("xs"), display: 'block' }}>
                                    เลขประจำตัวผู้เสียภาษี
                                </Text>
                                <Text>{org?.taxId || "-"}</Text>
                            </div>

                            <div>
                                <Text type="secondary" style={{ fontSize: ds.typography.size("xs"), display: 'block' }}>
                                    สถานะการยืนยัน (KYB)
                                </Text>
                                <Tag color={org?.kybStatus === 'verified' ? "success" : "warning"}>
                                    {org?.kybStatus === 'verified' ? "ยืนยันแล้ว" : "รอยืนยัน"}
                                </Tag>
                            </div>

                            <Divider style={{ margin: '12px 0' }} />

                            <Button block icon={<i className="ri-external-link-line" />}>
                                ไปยังการตั้งค่าองค์กร
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
