"use client";

import React from "react";
import { Row, Col, Card, Table, Tag, Typography, Button, Space, Input } from "antd";
import { ds } from "@/design-system";
import {
    getShopProducts,
    getProductVariants,
    getVariantInventory,
    mockShops,
    mockCategories
} from "@/lib/data/mock";
import { ProductStatus } from "@/types/product.types";

const { Title, Text } = Typography;
const { Search } = Input;

export default function CatalogPage() {
    // In a real app, from context
    const shopId = mockShops[0].id;
    const products = getShopProducts(shopId);

    // Helper: Get Total Stock for a product
    const getProductTotalStock = (productId: string) => {
        const variants = getProductVariants(productId);
        let total = 0;
        variants.forEach(v => {
            const inventories = getVariantInventory(v.id);
            total += inventories.reduce((sum, i) => sum + i.quantity, 0);
        });
        return total;
    };

    // Table Columns
    const columns = [
        {
            title: "สินค้า",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any) => (
                <Space>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: ds.radius("sm"),
                        backgroundColor: ds.color.background("secondary"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                    }}>
                        <i className="ri-image-line" style={{ fontSize: 20, color: ds.color.text("quaternary") }} />
                    </div>
                    <div>
                        <Text strong style={{ display: "block" }}>{text}</Text>
                        <Text type="secondary" style={{ fontSize: ds.typography.size("xs") }}>SKU: {record.id.split('-').pop()?.toUpperCase()}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: "หมวดหมู่",
            dataIndex: "categoryId",
            key: "category",
            render: (catId: string) => {
                const cat = mockCategories.find(c => c.id === catId);
                return <Tag color="blue">{cat?.name || "Uncategorized"}</Tag>;
            },
        },
        {
            title: "ราคาเริ่มต้น",
            dataIndex: "basePrice",
            key: "price",
            render: (price: number) => (
                <Text style={{ fontWeight: ds.typography.weight("medium") }}>
                    ฿{price.toLocaleString()}
                </Text>
            ),
        },
        {
            title: "สต็อกรวม",
            key: "stock",
            render: (_: any, record: any) => {
                const stock = getProductTotalStock(record.id);
                return (
                    <Text style={{ color: stock <= 10 ? ds.color.system("error") : "inherit" }}>
                        {stock.toLocaleString()} ชิ้น
                    </Text>
                );
            },
        },
        {
            title: "สถานะ",
            dataIndex: "status",
            key: "status",
            render: (status: ProductStatus) => {
                const color = status === "active" ? "success" : "default";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "",
            key: "action",
            render: () => (
                <Button type="text" icon={<i className="ri-more-2-fill" />} />
            ),
        },
    ];

    return (
        <div style={{ padding: ds.spacing("6") }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: ds.spacing("8")
            }}>
                <div>
                    <Title level={2} style={{ ...ds.typography.preset("heading-h2"), margin: 0 }}>
                        แคตตาล็อกสินค้า
                    </Title>
                    <Text style={{ color: ds.color.text('secondary') }}>จัดการรายการสินค้าและสต็อกของคุณ</Text>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<i className="ri-add-line" />}
                    style={{ borderRadius: ds.radius("md") }}
                    href="/products/new"
                >
                    เพิ่มสินค้าใหม่
                </Button>
            </div>

            <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ marginBottom: ds.spacing("6") }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Search placeholder="ค้นหาชื่อสินค้า หรือ SKU..." allowClear />
                        </Col>
                        <Col span={16} style={{ textAlign: "right" }}>
                            <Space>
                                <Button
                                    icon={<i className="ri-list-settings-line" />}
                                    href="/inventory"
                                >
                                    จัดการสต็อกรายสาขา
                                </Button>
                                <Button icon={<i className="ri-filter-3-line" />}>กรอง</Button>
                                <Button icon={<i className="ri-download-2-line" />}>Export</Button>
                            </Space>
                        </Col>
                    </Row>
                </div>

                <Table
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
}

