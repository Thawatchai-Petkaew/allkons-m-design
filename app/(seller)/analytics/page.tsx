"use client";

import React from "react";
import { Row, Col, Card, Statistic, Table, Tag, Typography, Spin, Space } from "antd";
import { ds } from "@/design-system";
import { useSellerSession } from "@/lib/hooks/useSellerSession";
import { getShopOrders, mockBranches } from "@/lib/data/mock";
import { OrderStatus } from "@/types/order.types";

const { Title, Text } = Typography;

export default function BusinessInsightPage() {
    const { shop, loading } = useSellerSession();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!shop) return null;

    const orders = getShopOrders(shop.id);

    // Calculate Statistics
    const totalSales = orders
        .filter(o => o.paymentStatus === "paid")
        .reduce((sum, o) => sum + o.totalAmount, 0);

    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const totalOrders = orders.length;
    const activeBranches = mockBranches.filter(b => b.shopId === shop.id && b.isActive).length;

    // Table Columns
    const columns = [
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
            render: (date: Date) => date.toLocaleDateString("th-TH"),
        },
        {
            title: "ลูกค้า",
            dataIndex: "deliveryAddress",
            key: "customer",
            render: (address: any) => address.fullName,
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
            title: "สถานะ",
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
    ];

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: ds.color.background('secondary'),
                padding: ds.spacing('8'),
            }}
        >
            <div style={{ maxWidth: ds.breakpoint.pixel('xl'), margin: '0 auto' }}>
                <div style={{ marginBottom: ds.spacing("8") }}>
                    <Title level={2} style={{ margin: 0 }}>Business Insights</Title>
                    <Text type="secondary">สรุปภาพรวมและสถิติของธุรกิจคุณ ({shop.name})</Text>
                </div>

                {/* Stats Overview */}
                <Row gutter={[24, 24]} style={{ marginBottom: ds.spacing("8") }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                            <Statistic
                                title="ยอดขายรวม (ชำระแล้ว)"
                                value={totalSales}
                                precision={2}
                                prefix="฿"
                                valueStyle={{ color: ds.color.text("brand-default"), fontWeight: ds.typography.weight("bold") }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                            <Statistic
                                title="คำสั่งซื้อที่รอดำเนินการ"
                                value={pendingOrders}
                                valueStyle={{ color: ds.color.system("warning"), fontWeight: ds.typography.weight("bold") }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                            <Statistic
                                title="ออเดอร์ทั้งหมด"
                                value={totalOrders}
                                valueStyle={{ fontWeight: ds.typography.weight("bold") }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                            <Statistic
                                title="สาขาที่เปิดให้บริการ"
                                value={activeBranches}
                                valueStyle={{ color: ds.color.text("brand-default"), fontWeight: ds.typography.weight("bold") }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Sales Trend Simulation */}
                <Card
                    title={<span style={{ fontWeight: 'bold' }}>แนวโน้มยอดขาย (7 วันล่าสุด)</span>}
                    bordered={false}
                    style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)', marginBottom: ds.spacing("8") }}
                >
                    <div style={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 12,
                        padding: ds.spacing("4") + ' 0',
                        borderLeft: '2px solid #f0f0f0',
                        borderBottom: '2px solid #f0f0f0'
                    }}>
                        {[
                            { day: 'จ.', val: 45 },
                            { day: 'อ.', val: 78 },
                            { day: 'พ.', val: 56 },
                            { day: 'พฤ.', val: 92 },
                            { day: 'ศ.', val: 120 },
                            { day: 'ส.', val: 145 },
                            { day: 'อา.', val: Math.min(160, (totalSales / 1000) || 40) }, // Real data simulation
                        ].map((item, idx) => (
                            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                <div
                                    style={{
                                        width: '100%',
                                        height: (item.val / 160) * 100 + '%',
                                        background: idx === 6 ? ds.color.text("brand-default") : ds.color.background("brand-default"),
                                        opacity: idx === 6 ? 1 : 0.6,
                                        borderRadius: ds.radius("xs") + ' ' + ds.radius("xs") + ' 0 0',
                                        transition: 'height 1s ease-out'
                                    }}
                                />
                                <Text type="secondary" style={{ fontSize: ds.typography.size("xs") }}>{item.day}</Text>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Orders Table */}
                <Card
                    title={<span style={{ fontWeight: 'bold' }}>คำสั่งซื้อล่าสุด</span>}
                    bordered={false}
                    style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}
                >
                    <Table
                        dataSource={orders}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
            </div>
        </div>
    );
}
