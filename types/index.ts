/**
 * TypeScript Types for Allkons M
 */

// Account Types
export type CustomerStatus = 'VISITOR' | 'CUSTOMER';
export type CustomerProfileType = 'PERSONAL';
export type OrganizeType = 'HEAD_OFFICE' | 'BRANCH';
export type KYCStatus = 'NONE' | 'WAIT_FOR_APPROVE' | 'REQUEST_MORE' | 'APPROVE' | 'REJECT';

// User Types
export type UserType = 
  | 'individual_consumer'           // บุคคลธรรมดา (Buyer)
  | 'registered_individual_merchant' // บุคคลธรรมดาจดทะเบียนพาณิชย์ (Buyer/Seller)
  | 'legal_entity';                  // นิติบุคคล (Buyer/Seller)

export type AccountType = 'buyer' | 'seller';

// Organization Types
export type JuristicType = 
  | 'REGISTERED_INDIVIDUAL'
  | 'PUBLIC_LIMITED_COMPANY'
  | 'LIMITED_COMPANY'
  | 'LIMITED_PARTNERSHIP'
  | 'GENERAL_PARTNERSHIP'
  | 'OTHER';

// Account
export interface Account {
  id: string;
  user_id: string;
  app_id: string;
  allkons_id?: string;
  customer_code?: string;
  customer_profile_type: CustomerProfileType;
  customer_status: CustomerStatus;
  juristic_name?: string;
  juristic_type_id?: string;
  organize_type: OrganizeType;
  tax_id: string;
  branch_number?: string;
  contact_shown_highest_authority: boolean;
  is_dopa: boolean;
  is_dbd: boolean;
  kyc_status: KYCStatus;
  active_status?: boolean;
  phone_number?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

// Organization
export interface Organization {
  id: string;
  account_id: string;
  allkons_org_id?: string;
  organization_code?: string;
  name: string;
  name_en?: string;
  juristic_name: string;
  juristic_type_id: string;
  organize_type: OrganizeType;
  tax_id: string;
  branch_number?: string;
  business_registration_number?: string;
  contact_shown_highest_authority: boolean;
  is_dopa: boolean;
  is_dbd: boolean;
  kyb_status: KYCStatus;
  is_verified: boolean;
  active_status?: boolean;
  created_at: string;
  updated_at: string;
}

// Shop (Seller only)
export interface Shop {
  id: string;
  organization_id: string;
  subdomain: string;
  name: string;
  name_en?: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  theme_color?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Branch
export interface Branch {
  id: string;
  shop_id: string;
  name: string;
  name_en?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  phone_number?: string;
  email?: string;
  is_main: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Product (Mock for MVP)
export interface Product {
  id: string;
  shop_id: string;
  shop_name: string;
  master_sku_id: string;
  name: string;
  name_en?: string;
  description?: string;
  price: number;
  special_price?: number | null;
  image_url?: string | null;
  category: string;
  brand?: string;
  stock_status: 'STOCKED' | 'OUT_OF_STOCK_CAN_SALE' | 'OUT_OF_STOCK_CANNOT_SALE';
  is_active: boolean;
}

// User Session
export interface UserSession {
  account: Account;
  organization?: Organization;
  shop?: Shop;
  branches?: Branch[];
  role?: {
    org_role?: string;
    app_role?: string;
  };
}
