/**
 * Order & Transaction Type Definitions
 * Based on Order Database Schema
 */

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partially_paid' | 'paid' | 'refunded';
export type PaymentMethod = 'bank_transfer' | 'credit_card' | 'qr_promptpay';

export interface DeliveryAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    postalCode: string;
}

/**
 * Core Order Data
 */
export interface Order {
    id: string;
    orderNumber: string;
    buyerUserId: string;
    shopId: string;
    branchId: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod?: PaymentMethod;
    totalAmount: number;
    taxAmount: number;
    shippingFee: number;
    deliveryAddress: DeliveryAddress;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Detailed Order Item
 */
export interface OrderItem {
    id: string;
    orderId: string;
    variantId: string;
    productName: string;
    variantName: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
}

/**
 * Payment Record
 */
export interface Payment {
    id: string;
    orderId: string;
    transactionRef?: string;
    amount: number;
    status: 'pending' | 'success' | 'failed';
    proofUrl?: string;
    paidAt?: Date;
    createdAt: Date;
}
