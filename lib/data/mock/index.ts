/**
 * Centralized Mock Data Exports
 * 
 * Import all mock data from this central location
 */

// User Module
export * from './users';

// Organization Module
export * from './organizations';

// Shop Module
export * from './shops';

// Product Module
export * from './products';

// Order Module
export {
    mockOrders,
    mockOrderItems,
    mockPayments,
    getOrderById,
    getUserOrders,
    getShopOrders,
    getOrderItems,
    getOrderPayment,
} from './orders';

// Export types for convenience
export * from '@/types/user.types';
export * from '@/types/organization.types';
export * from '@/types/shop.types';
export * from '@/types/product.types';
export * from '@/types/order.types';




