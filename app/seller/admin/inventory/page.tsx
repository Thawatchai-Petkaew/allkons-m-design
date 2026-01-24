"use client";

import React, { useState, useMemo } from "react";
import {
    Row, Col, Card, Typography, Button, Space,
    Input, Table, InputNumber, Tag, message,
    Select, Avatar, Divider, Segmented
} from "antd";
import { ds } from "@/design-system";
import {
    mockShops,
    getShopProducts,
    getProductVariants,
    getVariantInventory,
    getShopBranches
} from "@/lib/data/mock";

const { Title, Text } = Typography;
const { Search } = Input;

export default function StockManagementPage() {
    // Selection state
    const [selectedShopId, setSelectedShopId] = useState(
        mockShops.find(s => s.id === 'shop-thammasorn-001')?.id || mockShops[0].id
    );

    const shop = useMemo(() => mockShops.find(s => s.id === selectedShopId) || mockShops[0], [selectedShopId]);
    const branches = useMemo(() => getShopBranches(shop.id), [shop]);
    const products = useMemo(() => getShopProducts(shop.id), [shop]);

    // View mode: 'by-product' or 'by-branch'
    const [viewMode, setViewMode] = useState<'product' | 'branch'>('product');

    // Filter
    const [searchText, setSearchText] = useState("");

    // Simulate inventory state
    const [localStock, setLocalStock] = useState<Record<string, number>>({});

    const handleStockChange = (variantId: string, branchId: string, value: number | null) => {
        setLocalStock(prev => ({
            ...prev,
            [`${variantId}-${branchId}`]: value || 0
        }));
    };

    const columns = [
        {
            title: "สินค้าและตัวเลือก",
            key: "product",
            fixed: 'left' as const,
            width: 250,
            render: (_: any, record: any) => {
                const isVariant = !!record.productId;
                return (
                    <div style={{ paddingLeft: isVariant ? 20 : 0 }}>
                        <Text strong={!isVariant}>{record.name}</Text>
                        {isVariant && <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>SKU: {record.sku || 'N/A'}</Text>}
                    </div>
                );
            }
        },
        ...branches.map(branch => ({
            title: (
                <div style={{ textAlign: 'center' }}>
                    <Text strong style={{ display: 'block' }}>{branch.name}</Text>
                    {branch.isMain && <Tag color="blue" style={{ fontSize: 10 }}>MAIN</Tag>}
                </div>
            ),
            key: branch.id,
            width: 150,
            render: (_: any, record: any) => {
                const isVariant = !!record.productId;
                if (!isVariant) return null;

                const currentInventory = getVariantInventory(record.id).find(i => i.branchId === branch.id);
                const initialVal = currentInventory?.quantity || 0;
                const displayVal = localStock[`${record.id}-${branch.id}`] !== undefined
                    ? localStock[`${record.id}-${branch.id}`]
                    : initialVal;

                return (
                    <div style={{ textAlign: 'center' }}>
                        <InputNumber
                            min={0}
                            value={displayVal}
                            onChange={(val) => handleStockChange(record.id, branch.id, val)}
                            status={displayVal < 10 ? 'warning' : undefined}
                            style={{ width: 80 }}
                        />
                    </div>
                );
            }
        })),
        {
            title: "สต็อกรวม",
            key: "total",
            fixed: 'right' as const,
            width: 120,
            render: (_: any, record: any) => {
                const isVariant = !!record.productId;
                if (!isVariant) return null;

                const initialTotal = getVariantInventory(record.id).reduce((sum, i) => sum + i.quantity, 0);

                // Calculate from local stock if changes exist
                let currentTotal = 0;
                branches.forEach(b => {
                    const local = localStock[`${record.id}-${b.id}`];
                    if (local !== undefined) {
                        currentTotal += local;
                    } else {
                        currentTotal += getVariantInventory(record.id).find(i => i.branchId === b.id)?.quantity || 0;
                    }
                });

                return (
                    <div style={{ textAlign: 'center' }}>
                        <Text strong style={{ color: currentTotal < 20 ? ds.color.system("error") : "inherit" }}>
                            {currentTotal}
                        </Text>
                    </div>
                );
            }
        }
    ];

    // Prepare table data (Flattened Products + Variants)
    const tableData = useMemo(() => {
        const data: any[] = [];
        products.forEach(p => {
            if (p.name.toLowerCase().includes(searchText.toLowerCase())) {
                data.push({ ...p, key: p.id }); // Header row
                const vars = getProductVariants(p.id);
                vars.forEach(v => {
                    data.push({ ...v, key: v.id, name: v.name || 'Default Variant' });
                });
            }
        });
        return data;
    }, [products, searchText]);

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
                        จัดการสต็อกสินค้า
                    </Title>
                    <Text style={{ color: ds.color.text('secondary') }}>อัปเดตจำนวนสินค้าคงคลังแยกตามแต่ละสาขาของร้านค้า</Text>
                </div>
                <Space>
                    <Button
                        type="primary"
                        size="large"
                        icon={<i className="ri-save-line" />}
                        onClick={() => {
                            message.success("บันทึกการปรับปรุงสต็อกสำนักงานใหญ่และสาขาทั้งหมดเรียบร้อยแล้ว");
                            setLocalStock({});
                        }}
                    >
                        บันทึกทั้งหมด
                    </Button>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card bordered={false} style={{ borderRadius: ds.radius("lg"), boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 24
                        }}>
                            <Space size="large">
                                <div>
                                    <Text type="secondary" style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>ร้านค้าที่กำลังจัดการ:</Text>
                                    <Select
                                        value={selectedShopId}
                                        onChange={setSelectedShopId}
                                        style={{ minWidth: 200 }}
                                    >
                                        {mockShops.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>)}
                                    </Select>
                                </div>
                                <Divider type="vertical" style={{ height: 40 }} />
                                <Search
                                    placeholder="ค้นหาสินค้า..."
                                    style={{ width: 300, marginTop: 18 }}
                                    onChange={e => setSearchText(e.target.value)}
                                />
                            </Space>

                            <div style={{ textAlign: 'right' }}>
                                <Text type="secondary" style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>มุมมอง:</Text>
                                <Segmented
                                    options={[
                                        { label: 'รายสินค้า', value: 'product', icon: <i className="ri-box-3-line" /> },
                                        { label: 'รายสาขา', value: 'branch', icon: <i className="ri-map-pin-line" /> },
                                    ]}
                                    value={viewMode}
                                    onChange={val => setViewMode(val as any)}
                                />
                            </div>
                        </div>

                        <Table
                            columns={columns}
                            dataSource={tableData}
                            rowKey="key"
                            pagination={false}
                            scroll={{ x: 1000 }}
                            bordered
                            sticky
                            rowClassName={(record) => record.productId ? '' : 'header-row'}
                        />
                    </Card>
                </Col>
            </Row>

            <style jsx global>{`
                .header-row {
                    background-color: #fafafa;
                }
                .header-row:hover > td {
                    background-color: #fafafa !important;
                }
            `}</style>
        </div>
    );
}
