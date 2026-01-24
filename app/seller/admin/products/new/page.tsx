"use client";

import React, { useState, useMemo } from "react";
import {
    Row, Col, Card, Typography, Button, Space, Input,
    Select, Divider, message, Upload, Table, InputNumber,
    Switch, Form, Tag
} from "antd";
import { useRouter } from "next/navigation";
import { ds } from "@/design-system";
import {
    mockShops,
    mockCategories,
    getShopBranches,
    mockUploadFile
} from "@/lib/data/mock";

const { Title, Text, Paragraph } = Typography;

export default function NewProductPage() {
    const router = useRouter();
    const [form] = Form.useForm();

    // In a real app, from context
    const shopId = mockShops.find(s => s.id === 'shop-thammasorn-001')?.id || mockShops[0].id;
    const branches = useMemo(() => getShopBranches(shopId), [shopId]);

    const [fileList, setFileList] = useState<any[]>([]);
    const [variants, setVariants] = useState<any[]>([
        { key: '1', name: 'Default', sku: '', price: 0 }
    ]);

    // Branch Inventory State: Record<variantKey, Record<branchId, quantity>>
    const [inventory, setInventory] = useState<Record<string, Record<string, number>>>({
        '1': branches.reduce((acc, b) => ({ ...acc, [b.id]: 0 }), {})
    });

    const handleUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;
        try {
            const url = await mockUploadFile(file as File, 'products');
            setFileList(prev => [...prev, { uid: file.uid, url, status: 'done', name: file.name }]);
            onSuccess("ok");
        } catch (err) {
            onError(err);
            message.error("อัปโหลดไม่สำเร็จ");
        }
    };

    const onFinish = (values: any) => {
        console.log("Success:", values, "Inventory:", inventory);
        message.success("บันทึกสินค้าเรียบร้อยแล้ว!");
        router.push("/catalog");
    };

    const inventoryColumns = [
        {
            title: 'ชื่อสาขา',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <Space>
                    <Text>{text}</Text>
                    {record.isMain && <Tag color="blue" bordered={false}>Main</Tag>}
                </Space>
            )
        },
        ...variants.map(v => ({
            title: `สต็อก (${v.name || 'ตัวเลือก'})`,
            key: `stock-${v.key}`,
            render: (_: any, branch: any) => (
                <InputNumber
                    min={0}
                    defaultValue={0}
                    value={inventory[v.key]?.[branch.id]}
                    onChange={(val) => {
                        setInventory(prev => ({
                            ...prev,
                            [v.key]: {
                                ...prev[v.key],
                                [branch.id]: val || 0
                            }
                        }));
                    }}
                    style={{ width: '100%' }}
                />
            )
        }))
    ];

    return (
        <div style={{ padding: ds.spacing("6"), maxWidth: ds.breakpoint.pixel('xl'), margin: "0 auto" }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: ds.spacing("8")
                }}>
                    <Space size="middle">
                        <Button
                            icon={<i className="ri-arrow-left-line" />}
                            onClick={() => router.back()}
                            style={{ borderRadius: ds.radius("md") }}
                        />
                        <div>
                            <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                                เพิ่มสินค้าใหม่
                            </Title>
                            <Text type="secondary">กรอกข้อมูลสินค้าและกำหนดสต็อกแยกตามสาขา</Text>
                        </div>
                    </Space>
                    <Space>
                        <Button size="large">บันทึกร่าง</Button>
                        <Button type="primary" size="large" onClick={() => form.submit()}>
                            ลงขายสินค้า
                        </Button>
                    </Space>
                </div>

                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            {/* Basic Info */}
                            <Card title="ข้อมูลทั่วไป" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                                <Form.Item name="name" label="ชื่อสินค้า" rules={[{ required: true }]}>
                                    <Input placeholder="เช่น ปูนซีเมนต์ไฮดรอลิก 50 กก." size="large" />
                                </Form.Item>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="category" label="หมวดหมู่" rules={[{ required: true }]}>
                                            <Select placeholder="เลือกหมวดหมู่">
                                                {mockCategories.map(c => (
                                                    <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="brand" label="แบรนด์">
                                            <Input placeholder="เช่น ตราธรรมสรณ์" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item name="description" label="รายละเอียดสินค้า">
                                    <Input.TextArea rows={6} placeholder="ระบุคุณสมบัติสินค้า การใช้งาน และการรับประกัน..." />
                                </Form.Item>
                            </Card>

                            {/* Media Gallery */}
                            <Card title="รูปภาพสินค้า" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                                <Paragraph type="secondary">อัปโหลดรูปภาพสินค้าสูงสุด 10 รูป (รูปแรกจะเป็นรูปหลัก)</Paragraph>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    customRequest={handleUpload}
                                    onRemove={(file) => setFileList(prev => prev.filter(f => f.uid !== file.uid))}
                                >
                                    {fileList.length >= 10 ? null : (
                                        <div>
                                            <i className="ri-image-add-line" style={{ fontSize: 24 }} />
                                            <div style={{ marginTop: 8 }}>อัปโหลด</div>
                                        </div>
                                    )}
                                </Upload>
                            </Card>

                            {/* Variants & Multi-branch Stock */}
                            <Card title="ตัวเลือกสินค้าและสต็อกรายสาขา" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ marginBottom: 24 }}>
                                    <Paragraph strong>1. กำหนดตัวเลือก (Variants)</Paragraph>
                                    <Table
                                        dataSource={variants}
                                        pagination={false}
                                        columns={[
                                            {
                                                title: 'ชื่อตัวเลือก', dataIndex: 'name', key: 'name', render: (text, record) => <Input defaultValue={text} onChange={(e) => {
                                                    const newVal = e.target.value;
                                                    setVariants(prev => prev.map(v => v.key === record.key ? { ...v, name: newVal } : v));
                                                }} />
                                            },
                                            { title: 'SKU', dataIndex: 'sku', key: 'sku', render: (text, record) => <Input defaultValue={text} /> },
                                            { title: 'ราคา (บาท)', dataIndex: 'price', key: 'price', render: (text, record) => <InputNumber defaultValue={text} style={{ width: '100%' }} /> },
                                            { title: '', key: 'action', render: (_, record) => variants.length > 1 && <Button type="text" danger onClick={() => setVariants(prev => prev.filter(v => v.key !== record.key))} icon={<i className="ri-delete-bin-line" />} /> }
                                        ]}
                                    />
                                    <Button
                                        type="dashed"
                                        block
                                        onClick={() => {
                                            const newKey = Date.now().toString();
                                            setVariants(prev => [...prev, { key: newKey, name: '', sku: '', price: 0 }]);
                                            setInventory(prev => ({ ...prev, [newKey]: branches.reduce((acc, b) => ({ ...acc, [b.id]: 0 }), {}) }));
                                        }}
                                        icon={<i className="ri-add-line" />}
                                        style={{ marginTop: 12 }}
                                    >
                                        เพิ่มตัวเลือกสินค้า
                                    </Button>
                                </div>

                                <Divider />

                                <div>
                                    <Paragraph strong>2. จัดการสต็อกแยกตามสาขา ( Thammasorn Branches )</Paragraph>
                                    <Table
                                        dataSource={branches}
                                        columns={inventoryColumns}
                                        rowKey="id"
                                        pagination={false}
                                        bordered
                                    />
                                </div>
                            </Card>
                        </Space>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Card title="สถานะและการตั้งค่า" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                                <Form.Item name="isActive" label="เปิดการขายทันที" valuePropName="checked" initialValue={true}>
                                    <Switch />
                                </Form.Item>
                                <Form.Item name="tax" label="รูปแบบภาษี" initialValue="7">
                                    <Select>
                                        <Select.Option value="7">VAT 7% (รวมในราคาสินค้า)</Select.Option>
                                        <Select.Option value="0">ยกเว้นภาษี</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Card>

                            <Card title="เคล็ดลับการลงสินค้า" bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                                <ul style={{ paddingLeft: 20, color: ds.color.text("secondary"), fontSize: ds.typography.size("sm") }}>
                                    <li>ใส่ชื่อสินค้าที่กระชับและมีคีย์เวิร์ดสำคัญ</li>
                                    <li>รูปภาพที่ชัดเจนช่วยเพิ่มโอกาสในการขายได้ถึง 80%</li>
                                    <li>ระบุหมวดหมู่ให้ถูกต้องเพื่อให้ลูกค้าหาเจอได้ง่าย</li>
                                    <li>ตรวจสอบสต็อกรายสาขาให้เป็นปัจจุบันเพื่อป้องกันการสั่งซื้อสินค้าค้างสต็อก</li>
                                </ul>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </Form >
        </div>
    );
}
