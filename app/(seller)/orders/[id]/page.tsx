"use client";

import React, { use } from "react";
import {
    Row, Col, Card, Typography, Button, Space,
    Tag, Divider, Table, Steps, Descriptions, message
} from "antd";
import { useRouter } from "next/navigation";
import { ds } from "@/design-system";
import {
    getOrderById,
    getOrderItems,
    getOrderPayment,
    mockProducts
} from "@/lib/data/mock";
import { OrderStatus, PaymentStatus } from "@/types/order.types";

const { Title, Text } = Typography;

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const order = getOrderById(id);
    const items = getOrderItems(id);
    const payment = getOrderPayment(id);

    if (!order) {
        return (
            <div style={{ padding: ds.spacing("12"), textAlign: "center" }}>
                <Title level={4}>ไม่พบข้อมูลคำสั่งซื้อ</Title>
                <Button onClick={() => router.push("/orders")}>กลับไปหน้ารายการ</Button>
            </div>
        );
    }

    const currentStep = () => {
        switch (order.status) {
            case "pending": return 0;
            case "confirmed": return 1;
            case "shipped": return 2;
            case "delivered": return 3;
            default: return 0;
        }
    };

    const columns = [
        {
            title: "สินค้า",
            key: "product",
            render: (_: any, item: any) => {
                const product = mockProducts.find(p => p.id === item.productId);
                return (
                    <Space>
                        <div style={{
                            width: 40, height: 40, borderRadius: 4,
                            backgroundColor: ds.color.background("secondary"),
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <i className="ri-image-line" style={{ color: ds.color.text("quaternary") }} />
                        </div>
                        <div>
                            <Text strong>{product?.name || "Unknown Product"}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: ds.typography.size("xs") }}>
                                SKU: {item.productId.split('-').pop()}
                            </Text>
                        </div>
                    </Space>
                );
            }
        },
        {
            title: "ราคาต่อชิ้น",
            dataIndex: "unitPrice",
            key: "unitPrice",
            render: (price: number) => `฿${price.toLocaleString()}`
        },
        {
            title: "จำนวน",
            dataIndex: "quantity",
            key: "quantity",
            render: (q: number) => `${q} ชิ้น`
        },
        {
            title: "ยอดรวม",
            key: "subtotal",
            render: (_: any, item: any) => (
                <Text strong>฿{(item.unitPrice * item.quantity).toLocaleString()}</Text>
            )
        }
    ];

    return (
        <div style={{ padding: ds.spacing("6"), maxWidth: ds.breakpoint.pixel('xl'), margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: ds.spacing("8"), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Space size="middle">
                    <Button
                        icon={<i className="ri-arrow-left-line" />}
                        onClick={() => router.back()}
                    />
                    <div>
                        <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                            {order.orderNumber}
                        </Title>
                        <Text type="secondary">สั่งซื้อเมื่อ {order.createdAt.toLocaleDateString("th-TH")} {order.createdAt.toLocaleTimeString("th-TH")}</Text>
                    </div>
                </Space>
                <Space>
                    <Button icon={<i className="ri-printer-line" />}>พิมพ์ใบเสร็จ</Button>
                    <Button type="primary" onClick={() => message.success("ยืนยันออเดอร์แล้ว")}>
                        ยืนยันการจัดเตรียมสินค้า
                    </Button>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        {/* Status Tracker */}
                        <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                            <Steps
                                current={currentStep()}
                                items={[
                                    { title: 'รอดำเนินการ' },
                                    { title: 'ยืนยันแล้ว' },
                                    { title: 'กำลังจัดส่ง' },
                                    { title: 'สำเร็จ' },
                                ]}
                            />
                        </Card>

                        {/* Order Items */}
                        <Card
                            title="รายการสินค้า"
                            bordered={false}
                            style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                        >
                            <Table
                                dataSource={items}
                                columns={columns}
                                pagination={false}
                                rowKey="id"
                            />
                            <div style={{ marginTop: 24, textAlign: "right" }}>
                                <Space direction="vertical" align="end" size="small">
                                    <Text>ยอดรวมสินค้า: ฿{(order.totalAmount - order.shippingFee).toLocaleString()}</Text>
                                    <Text>ค่าจัดส่ง: ฿{order.shippingFee.toLocaleString()}</Text>
                                    <Title level={4} style={{ margin: 0 }}>รวมทั้งสิ้น: ฿{order.totalAmount.toLocaleString()}</Title>
                                </Space>
                            </div>
                        </Card>
                    </Space>
                </Col>

                <Col xs={24} lg={8}>
                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        {/* Customer & Shipping Info */}
                        <Card
                            title="ข้อมูลลูกค้าและการจัดส่ง"
                            bordered={false}
                            style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                        >
                            <Descriptions column={1}>
                                <Descriptions.Item label="ชื่อลูกค้า">{order.deliveryAddress.fullName}</Descriptions.Item>
                                <Descriptions.Item label="เบอร์โทรศัพท์">{order.deliveryAddress.phone}</Descriptions.Item>
                                <Descriptions.Item label="ที่อยู่จัดส่ง">
                                    {order.deliveryAddress.addressLine1} {order.deliveryAddress.city} {order.deliveryAddress.province} {order.deliveryAddress.postalCode}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* Payment Info */}
                        <Card
                            title="การชำระเงิน"
                            bordered={false}
                            style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                        >
                            <Descriptions column={1}>
                                <Descriptions.Item label="สถานะ">
                                    <Tag color={order.paymentStatus === "paid" ? "success" : "warning"}>
                                        {order.paymentStatus.toUpperCase()}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="ช่องทาง">{order.paymentMethod?.toUpperCase() || "N/A"}</Descriptions.Item>
                                <Descriptions.Item label="เวลา">{payment?.paidAt?.toLocaleTimeString("th-TH") || "-"}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}
