/**
 * Mock Order and Transaction Data
 * Based on Order Database Schema
 */

import {
    Order,
    OrderItem,
    Payment
} from '@/types/order.types';

// ============================================================================
// MOCK ORDERS
// ============================================================================

export const mockOrders: Order[] = [
    {
        id: 'ord-001',
        orderNumber: 'ORD-2026-0001',
        buyerUserId: '550e8400-e29b-41d4-a716-446655440000', // Dechwit
        shopId: 'shop-somchai-001',
        branchId: 'branch-somchai-main',
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'qr_promptpay',
        totalAmount: 1600.00,
        taxAmount: 105.00,
        shippingFee: 100.00,
        deliveryAddress: {
            fullName: 'เดชวิทย์ มงคลจิต',
            phone: '0938311673',
            addressLine1: '456/1 หมู่บ้านสุขใจ',
            city: 'เขตสวนหลวง',
            province: 'กรุงเทพมหานคร',
            postalCode: '10250'
        },
        createdAt: new Date('2026-01-24T10:00:00Z'),
        updatedAt: new Date('2026-01-24T10:30:00Z'),
    },
    {
        id: 'ord-002',
        orderNumber: 'ORD-2026-0002',
        buyerUserId: 'araya.s-user-id', // Araya (Placeholder ID)
        shopId: 'shop-dechwit-001',
        branchId: 'branch-dechwit-main',
        status: 'pending',
        paymentStatus: 'unpaid',
        totalAmount: 300.00,
        taxAmount: 19.63,
        shippingFee: 50.00,
        deliveryAddress: {
            fullName: 'อารยา สุขสวัสดิ์',
            phone: '0845678901',
            addressLine1: '123 ซอยเย็นสบาย',
            city: 'เขตพญาไท',
            province: 'กรุงเทพมหานคร',
            postalCode: '10400'
        },
        createdAt: new Date('2026-01-24T15:00:00Z'),
        updatedAt: new Date('2026-01-24T15:00:00Z'),
    }
];

// ============================================================================
// MOCK ORDER ITEMS
// ============================================================================

export const mockOrderItems: OrderItem[] = [
    // Order 001 Items (Dechwit buying from Somchai)
    {
        id: 'item-001',
        orderId: 'ord-001',
        variantId: 'sku-somchai-001-std',
        productName: 'เหล็กเส้นกลม SR24 6มม.',
        variantName: 'มาตรฐาน SR24',
        unitPrice: 85.00,
        quantity: 10,
        subtotal: 850.00,
    },
    // Order 002 Items (Araya buying from Dechwit)
    {
        id: 'item-002',
        orderId: 'ord-002',
        variantId: 'sku-dechwit-001-50kg',
        productName: 'ปูนซีเมนต์ปอร์ตแลนด์ ตราเดชวิทย์',
        variantName: 'ถุง 50 กก.',
        unitPrice: 150.00,
        quantity: 1,
        subtotal: 150.00,
    }
];

// ============================================================================
// MOCK PAYMENTS
// ============================================================================

export const mockPayments: Payment[] = [
    {
        id: 'pay-001',
        orderId: 'ord-001',
        transactionRef: 'TXN-778899',
        amount: 1600.00,
        status: 'success',
        proofUrl: '/uploads/documents/slip-001.png',
        paidAt: new Date('2026-01-24T10:15:00Z'),
        createdAt: new Date('2026-01-24T10:05:00Z'),
    }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getOrderById(id: string): Order | undefined {
    return mockOrders.find(o => o.id === id);
}

export function getUserOrders(userId: string): Order[] {
    return mockOrders.filter(o => o.buyerUserId === userId);
}

export function getShopOrders(shopId: string): Order[] {
    return mockOrders.filter(o => o.shopId === shopId);
}

export function getOrderItems(orderId: string): OrderItem[] {
    return mockOrderItems.filter(i => i.orderId === orderId);
}

export function getOrderPayment(orderId: string): Payment | undefined {
    return mockPayments.find(p => p.orderId === orderId);
}
