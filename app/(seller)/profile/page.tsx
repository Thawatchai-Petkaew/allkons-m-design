"use client";

import React, { useState, useEffect } from "react";
import {
    Row, Col, Card, Typography, Button, Space,
    Input, Upload, message, Avatar, Divider, Tag, Form
} from "antd";
import { ds } from "@/design-system";
import { useSellerSession } from "@/lib/hooks/useSellerSession";
import { mockUploadFile } from "@/lib/data/mock";

const { Title, Text } = Typography;

export default function ProfilePage() {
    const { user, loading } = useSellerSession();

    const [avatarUrl, setAvatarUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) setAvatarUrl(user.avatarUrl || "");
    }, [user]);

    if (loading || !user) return null;

    const handleAvatarUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;

        try {
            setUploading(true);
            const uploadedUrl = await mockUploadFile(file as File, 'avatars');
            setAvatarUrl(uploadedUrl);
            message.success("อัปโหลดรูปโปรไฟล์สำเร็จ!");
            onSuccess("ok");
        } catch (err) {
            console.error(err);
            message.error("อัปโหลดรูปโปรไฟล์ไม่สำเร็จ");
            onError(err);
        } finally {
            setUploading(false);
        }
    };

    const onFinish = (values: any) => {
        console.log("Updated Profile:", values);
        message.success("บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว");
    };

    return (
        <div style={{ padding: ds.spacing("6"), maxWidth: 900, margin: "0 auto" }}>
            <div style={{ marginBottom: ds.spacing("8") }}>
                <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                    ข้อมูลโปรไฟล์ส่วนตัว
                </Title>
                <Text style={{ color: ds.color.text('secondary') }}>จัดการข้อมูลส่วนตัวและความปลอดภัยของบัญชีคุณ</Text>
            </div>

            <Form layout="vertical" onFinish={onFinish} initialValues={{ name: user.name, email: user.email, phone: '081-234-5678' }}>
                <Row gutter={[24, 24]}>
                    {/* Profile Picture Section */}
                    <Col xs={24} md={8}>
                        <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                showUploadList={false}
                                customRequest={handleAvatarUpload}
                                style={{ marginBottom: 16 }}
                            >
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} />
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {uploading ? <i className="ri-loader-4-line ri-spin" /> : <i className="ri-user-add-line" />}
                                        <div style={{ marginTop: 8, fontSize: 12 }}>เปลี่ยนรูป</div>
                                    </div>
                                )}
                            </Upload>
                            <Title level={4} style={{ marginBottom: 4 }}>{user.name}</Title>
                            <Tag color="gold" bordered={false}>Super Admin</Tag>
                            <Divider style={{ margin: '16px 0' }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                สมาชิกตั้งแต่: {new Date('2024-01-01').toLocaleDateString('th-TH')}
                            </Text>
                        </Card>
                    </Col>

                    {/* Basic Info Section */}
                    <Col xs={24} md={16}>
                        <Card
                            title="ข้อมูลพื้นฐาน"
                            bordered={false}
                            style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                        >
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item label="ชื่อ-นามสกุล" name="name" rules={[{ required: true }]}>
                                        <Input size="large" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="อีเมล" name="email">
                                        <Input size="large" disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="เบอร์โทรศัพท์" name="phone">
                                        <Input size="large" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div style={{ textAlign: 'right', marginTop: 8 }}>
                                <Button type="primary" htmlType="submit" size="large">
                                    บันทึกการเปลี่ยนแปลง
                                </Button>
                            </div>
                        </Card>

                        <Card
                            title="ความปลอดภัย"
                            bordered={false}
                            style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)', marginTop: 24 }}
                        >
                            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <Text strong style={{ display: 'block' }}>รหัสผ่าน</Text>
                                        <Text type="secondary">อัปเดตรหัสผ่านเป็นประจำเพื่อความปลอดภัย</Text>
                                    </div>
                                    <Button>เปลี่ยนรหัสผ่าน</Button>
                                </div>
                                <Divider style={{ margin: 0 }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <Text strong style={{ display: 'block' }}>การยืนยันตัวตน 2 ขั้นตอน (2FA)</Text>
                                        <Text type="secondary">เพิ่มความปลอดภัยอีกระดับให้กับบัญชีของคุณ</Text>
                                    </div>
                                    <Tag color="success">เปิดใช้งานแล้ว</Tag>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
