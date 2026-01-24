"use client";

import React, { useState } from "react";
import { Row, Col, Card, Table, Tag, Typography, Tabs, Input, Space, Button } from "antd";
import { ds } from "@/design-system";
import { getShopOrders, mockShops } from "@/lib/data/mock";
import { OrderStatus, PaymentStatus } from "@/types/order.types";

const { Title, Text } = Typography;
const { Search } = Input;

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("all");

    // In a real app, from context
    const shopId = mockShops[0].id;
    const allOrders = getShopOrders(shopId);

    // Filtering logic
    const filteredOrders = allOrders.filter(order => {
        if (activeTab === "all") return true;
        return order.status === activeTab;
    });

    // Stats for Tabs
    const getCount = (status: string) =>
        status === "all" ? allOrders.length : allOrders.filter(o => o.status === status).length;

    const columnDefs = [
        {
            title: "ออเดอร์",
            dataIndex: "orderNumber",
            key: "orderNumber",
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: "วันที่",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: Date) => (
                <div>
                    <Text style={{ display: "block" }}>{date.toLocaleDateString("th-TH")}</Text>
                    <Text type="secondary" style={{ fontSize: ds.typography.size("xs") }}>
                        {date.toLocaleTimeString("th-TH")}
                    </Text>
                </div>
            )
        },
        {
            title: "ลูกค้า",
            dataIndex: "deliveryAddress",
            key: "customer",
            render: (address: any) => (
                <div>
                    <Text style={{ display: "block" }}>{address.fullName}</Text>
                    <Text type="secondary" style={{ fontSize: ds.typography.size("xs") }}>{address.phone}</Text>
                </div>
            )
        },
        {
            title: "ยอดรวม",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (amount: number) => (
                <Text style={{ fontWeight: ds.typography.weight("medium") }}>
                    ฿{amount.toLocaleString()}
                </Text>
            ),
        },
        {
            title: "การชำระเงิน",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status: PaymentStatus) => {
                let color = "default";
                if (status === "paid") color = "success";
                if (status === "unpaid") color = "warning";
                return <Tag bordered={false} color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "สถานะออเดอร์",
            dataIndex: "status",
            key: "status",
            render: (status: OrderStatus) => {
                let color = "default";
                if (status === "delivered") color = "success";
                if (status === "confirmed") color = "processing";
                if (status === "pending") color = "warning";
                if (status === "cancelled") color = "error";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "",
            key: "action",
            render: (_: any, record: any) => (
                <Button
                    type="primary"
                    ghost
                    size="small"
                    href={`/orders/${record.id}`}
                >
                    ดูรายละเอียด
                </Button>
            ),
        },
    ];

    const tabItems = [
        { label: `ทั้งหมด (${getCount("all")})`, key: "all" },
        { label: `รอดำเนินการ (${getCount("pending")})`, key: "pending" },
        { label: `ยืนยันแล้ว (${getCount("confirmed")})`, key: "confirmed" },
        { label: `จัดส่งแล้ว (${getCount("delivered")})`, key: "delivered" },
        { label: `ยกเลิก (${getCount("cancelled")})`, key: "cancelled" },
    ];

    return (
        <div style={{ padding: ds.spacing("6") }}>
            <div style={{ marginBottom: ds.spacing("8") }}>
                <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                    การจัดการคำสั่งซื้อ
                </Title>
                <Text style={{ color: ds.color.text('secondary') }}>ติดตามและจัดการรายการสั่งซื้อสินค้าของลูกค้า</Text>
            </div>

            <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    style={{ marginBottom: ds.spacing("4") }}
                />

                <div style={{ marginBottom: ds.spacing("6") }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Search placeholder="ค้นหาเลขออเดอร์ หรือ ชื่อลูกค้า..." allowClear />
                        </Col>
                        <Col span={16} style={{ textAlign: "right" }}>
                            <Button icon={<i className="ri-download-2-line" />}>Export Orders</Button>
                        </Col>
                    </Row>
                </div>

                <Table
                    dataSource={filteredOrders}
                    columns={columnDefs}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
}

