-- ============================================================================
-- Account & Organization Schema: Allkons M
-- Based on provided schema specification
-- Database: Supabase (PostgreSQL)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Customer Status Enum
CREATE TYPE customer_status AS ENUM (
    'VISITOR',
    'CUSTOMER'
);

-- Customer Profile Type Enum
CREATE TYPE customer_profile_type AS ENUM (
    'PERSONAL'
    -- Add more types as needed
);

-- ============================================================================
-- MASTER DATA: JURISTIC TYPES (Lookup Table)
-- ============================================================================

-- juristic_types: Master data for juristic types (นิติบุคคล types)
-- ใช้สำหรับแสดงชื่อองค์กรที่ถูกต้องตามกฎหมาย (prefix_th + name + suffix_th)
CREATE TABLE juristic_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'REGISTERED_INDIVIDUAL', 'LIMITED_COMPANY'
    prefix_th VARCHAR(255), -- e.g., 'บริษัท', 'ห้างหุ้นส่วนจำกัด'
    suffix_th VARCHAR(255), -- e.g., 'จำกัด (มหาชน)', 'จำกัด'
    description_th TEXT NOT NULL, -- e.g., 'ร้านค้าจดทะเบียนพาณิชย์', 'บริษัทจำกัด (บลจ.)'
    -- Optional: For future multi-language support
    prefix_en VARCHAR(255),
    suffix_en VARCHAR(255),
    description_en TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0, -- สำหรับเรียงลำดับแสดงผล
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_juristic_types_code ON juristic_types(code);
CREATE INDEX idx_juristic_types_is_active ON juristic_types(is_active);
CREATE INDEX idx_juristic_types_display_order ON juristic_types(display_order);

-- Insert Master Data for Juristic Types
-- หมายเหตุ: ตัด PERSONAL ออกเพราะ Account ไม่ใช่ juristic person
INSERT INTO juristic_types (code, prefix_th, suffix_th, description_th, prefix_en, suffix_en, description_en, display_order) VALUES
('REGISTERED_INDIVIDUAL', NULL, NULL, 'ร้านค้าจดทะเบียนพาณิชย์', 'Registered Individual Merchant', NULL, 'Registered Individual Merchant', 1),
('PUBLIC_LIMITED_COMPANY', 'บริษัท', 'จำกัด (มหาชน)', 'บริษัทมหาชนจำกัด (บลจ.)', 'Public Company', 'Limited', 'Public Company Limited (PLC)', 2),
('LIMITED_COMPANY', 'บริษัท', 'จำกัด', 'บริษัทจำกัด (บลจ.)', 'Company', 'Limited', 'Limited Company (Co., Ltd.)', 3),
('LIMITED_PARTNERSHIP', 'ห้างหุ้นส่วนจำกัด', NULL, 'ห้างหุ้นส่วนจำกัด (หจก.)', 'Limited Partnership', NULL, 'Limited Partnership (Ltd. P.)', 4),
('GENERAL_PARTNERSHIP', 'ห้างหุ้นส่วนสามัญ', NULL, 'ห้างหุ้นส่วนสามัญ (หสม.)', 'Ordinary Partnership', NULL, 'Ordinary Partnership (O.P.)', 5),
('OTHER', NULL, NULL, 'อื่นๆ', 'Other', NULL, 'Other', 99);

-- Organize Type Enum
CREATE TYPE organize_type AS ENUM (
    'HEAD_OFFICE', -- สำนักงานใหญ่
    'BRANCH' -- สาขา
);

-- KYC Status Enum
CREATE TYPE kyc_status AS ENUM (
    'NONE',
    'WAIT_FOR_APPROVE',
    'REQUEST_MORE',
    'APPROVE',
    'REJECT'
);

-- ============================================================================
-- REFERENCE TABLES (HighestAuthority, Contact)
-- ============================================================================

-- highest_authority: Highest Authority Data
CREATE TABLE highest_authority (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    id_card_number VARCHAR(20),
    passport_number VARCHAR(50),
    id_card_type VARCHAR(50), -- thai_id, passport, etc.
    date_of_birth DATE,
    nationality VARCHAR(100) DEFAULT 'Thai',
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'Thailand',
    phone_number VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_highest_authority_id_card ON highest_authority(id_card_number);
CREATE INDEX idx_highest_authority_passport ON highest_authority(passport_number);

-- contact: Contact/Authorized Person Data
CREATE TABLE contact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    id_card_number VARCHAR(20),
    passport_number VARCHAR(50),
    id_card_type VARCHAR(50),
    date_of_birth DATE,
    nationality VARCHAR(100) DEFAULT 'Thai',
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'Thailand',
    phone_number VARCHAR(20),
    email VARCHAR(255),
    position VARCHAR(100), -- ตำแหน่ง
    is_authorized_person BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_id_card ON contact(id_card_number);
CREATE INDEX idx_contact_phone_number ON contact(phone_number);
CREATE INDEX idx_contact_email ON contact(email);

-- ============================================================================
-- ACCOUNT TABLE
-- ============================================================================

-- accounts: Account table (based on provided schema)
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- App & Identification
    app_id VARCHAR(100) NOT NULL, -- App ID ของระบบ
    allkons_id VARCHAR(100) UNIQUE, -- รหัส Allkons ID
    customer_code VARCHAR(100) UNIQUE, -- รหัสลูกค้า
    
    -- Profile Type & Status
    customer_profile_type customer_profile_type NOT NULL DEFAULT 'PERSONAL', -- ประเภทโปรไฟล์ข้อมูล
    customer_status customer_status NOT NULL DEFAULT 'VISITOR', -- สถานะความเป็นลูกค้า
    
    -- Juristic Information
    -- หมายเหตุ: Account ไม่ใช่ juristic person (เป็นบุคคลธรรมดา)
    -- juristic_name และ juristic_type ไม่จำเป็นสำหรับ Account
    -- แต่เก็บไว้เพื่อรองรับกรณีพิเศษ (ถ้ามี)
    juristic_name VARCHAR(255), -- ชื่อข้อมูล (ถ้ามี)
    juristic_type_id UUID REFERENCES juristic_types(id) ON DELETE SET NULL, -- ประเภทนิติบุคคล (ถ้ามี)
    juristic_type_remark TEXT, -- หมายเหตุประเภทนิติบุคคล
    
    -- Organization Type
    organize_type organize_type NOT NULL, -- ประเภทองค์กร (HEAD_OFFICE, BRANCH)
    
    -- Tax & Branch
    tax_id VARCHAR(50) NOT NULL, -- เลขประจำตัวผู้เสียภาษี
    branch_number VARCHAR(50), -- เลขสาขา
    
    -- Contact & Authority Flags
    contact_shown_highest_authority BOOLEAN NOT NULL DEFAULT false, -- สถานะว่าข้อมูลผู้ติดต่อ/รับมอบอำนาจเหมือนกับข้อมูลผู้มีอำนาจสูงสุด
    
    -- Compliance Checks
    is_dopa BOOLEAN NOT NULL DEFAULT false, -- สถานะว่ามีการเช็คข้อมูลกับ DOPA แล้ว
    is_dbd BOOLEAN NOT NULL DEFAULT false, -- สถานะว่ามีการเช็คข้อมูลกับ DBD แล้ว
    
    -- KYC Status
    kyc_status kyc_status NOT NULL DEFAULT 'NONE', -- สถานะการ KYC
    
    -- Active Status
    active_status BOOLEAN, -- สถานะเปิด/ปิดการใช้งานบัญชี
    
    -- References
    highest_authority_id UUID REFERENCES highest_authority(id) ON DELETE SET NULL, -- ข้อมูลผู้มีอำนาจสูงสุด
    contact_id UUID REFERENCES contact(id) ON DELETE SET NULL, -- ข้อมูลผู้ติดต่อ/ผู้รับมอบอำนาจ
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_app_id ON accounts(app_id);
CREATE INDEX idx_accounts_allkons_id ON accounts(allkons_id) WHERE allkons_id IS NOT NULL;
CREATE INDEX idx_accounts_customer_code ON accounts(customer_code) WHERE customer_code IS NOT NULL;
CREATE INDEX idx_accounts_customer_status ON accounts(customer_status);
CREATE INDEX idx_accounts_kyc_status ON accounts(kyc_status);
CREATE INDEX idx_accounts_tax_id ON accounts(tax_id);
CREATE INDEX idx_accounts_active_status ON accounts(active_status) WHERE active_status IS NOT NULL;
CREATE INDEX idx_accounts_juristic_type_id ON accounts(juristic_type_id) WHERE juristic_type_id IS NOT NULL;

-- ============================================================================
-- ORGANIZATION TABLE (ORD)
-- ============================================================================

-- organizations: ORD (Organization) table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    
    -- Organization Identification
    allkons_org_id VARCHAR(100) UNIQUE, -- Allkons Organization ID
    organization_code VARCHAR(100) UNIQUE, -- Organization Code
    
    -- Organization Information
    name VARCHAR(255) NOT NULL, -- ชื่อองค์กร
    name_en VARCHAR(255), -- ชื่อองค์กร (ภาษาอังกฤษ)
    
    -- Juristic Information
    juristic_name VARCHAR(255) NOT NULL, -- ชื่อนิติบุคคล (ชื่อองค์กร)
    juristic_type_id UUID NOT NULL REFERENCES juristic_types(id) ON DELETE RESTRICT, -- ประเภทนิติบุคคล (Master Data)
    juristic_type_remark TEXT, -- หมายเหตุประเภทนิติบุคคล
    
    -- Organization Type
    organize_type organize_type NOT NULL, -- ประเภทองค์กร (HEAD_OFFICE, BRANCH)
    
    -- Tax & Registration
    tax_id VARCHAR(50) NOT NULL, -- เลขประจำตัวผู้เสียภาษี
    branch_number VARCHAR(50), -- เลขสาขา
    business_registration_number VARCHAR(100), -- เลขทะเบียนบริษัท
    
    -- Contact & Authority Flags
    contact_shown_highest_authority BOOLEAN NOT NULL DEFAULT false, -- สถานะว่าข้อมูลผู้ติดต่อ/รับมอบอำนาจเหมือนกับข้อมูลผู้มีอำนาจสูงสุด
    
    -- Compliance Checks
    is_dopa BOOLEAN NOT NULL DEFAULT false, -- สถานะว่ามีการเช็คข้อมูลกับ DOPA แล้ว
    is_dbd BOOLEAN NOT NULL DEFAULT false, -- สถานะว่ามีการเช็คข้อมูลกับ DBD แล้ว
    
    -- KYB Status
    kyb_status kyc_status NOT NULL DEFAULT 'NONE', -- สถานะการ KYB (ใช้ enum เดียวกับ KYC)
    
    -- Status
    is_verified BOOLEAN NOT NULL DEFAULT false, -- ORD Verified (เมื่อผ่าน KYB)
    active_status BOOLEAN, -- สถานะเปิด/ปิดการใช้งาน
    
    -- References
    highest_authority_id UUID REFERENCES highest_authority(id) ON DELETE SET NULL, -- ข้อมูลผู้มีอำนาจสูงสุด
    contact_id UUID REFERENCES contact(id) ON DELETE SET NULL, -- ข้อมูลผู้ติดต่อ/ผู้รับมอบอำนาจ
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_organizations_account_id ON organizations(account_id);
CREATE INDEX idx_organizations_allkons_org_id ON organizations(allkons_org_id) WHERE allkons_org_id IS NOT NULL;
CREATE INDEX idx_organizations_organization_code ON organizations(organization_code) WHERE organization_code IS NOT NULL;
CREATE INDEX idx_organizations_tax_id ON organizations(tax_id);
CREATE INDEX idx_organizations_kyb_status ON organizations(kyb_status);
CREATE INDEX idx_organizations_is_verified ON organizations(is_verified);
CREATE INDEX idx_organizations_active_status ON organizations(active_status) WHERE active_status IS NOT NULL;
CREATE INDEX idx_organizations_juristic_type_id ON organizations(juristic_type_id);

-- ============================================================================
-- ORGANIZATION PROFILE
-- ============================================================================

-- organization_profiles: Organization profile information
CREATE TABLE organization_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Address
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(100) NOT NULL DEFAULT 'Thailand',
    
    -- Contact
    phone_number VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    
    -- Additional Info
    description TEXT,
    logo_url TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_organization_profiles_organization_id ON organization_profiles(organization_id);

-- ============================================================================
-- USER REGISTRATION (from ERD)
-- ============================================================================

-- user_registration: User registration details
CREATE TABLE user_registration (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
    registration_type VARCHAR(50) NOT NULL CHECK (registration_type IN (
        'email_password',
        'oauth_google',
        'oauth_facebook',
        'oauth_apple',
        'oauth_line',
        'phone_otp'
    )),
    registration_source VARCHAR(50), -- web, mobile, etc.
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_registration_account_id ON user_registration(account_id);
CREATE INDEX idx_user_registration_registration_type ON user_registration(registration_type);

-- ============================================================================
-- USER ATTRIBUTES (from ERD)
-- ============================================================================

-- user_attributes: Custom user attributes (key-value pairs)
CREATE TABLE user_attributes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    attribute_key VARCHAR(100) NOT NULL,
    attribute_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_account_attribute UNIQUE (account_id, attribute_key)
);

CREATE INDEX idx_user_attributes_account_id ON user_attributes(account_id);
CREATE INDEX idx_user_attributes_key ON user_attributes(attribute_key);

-- ============================================================================
-- USER PREFERENCES (from ERD)
-- ============================================================================

-- user_preferences: User preferences (key-value pairs)
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    preference_key VARCHAR(100) NOT NULL,
    preference_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_account_preference UNIQUE (account_id, preference_key)
);

CREATE INDEX idx_user_preferences_account_id ON user_preferences(account_id);
CREATE INDEX idx_user_preferences_key ON user_preferences(preference_key);

-- ============================================================================
-- KYC TABLE (from ERD)
-- ============================================================================

-- kyc: KYC (Know Your Customer) data
CREATE TABLE kyc (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN (
        'id_card',
        'passport',
        'driver_license'
    )),
    document_number VARCHAR(100) NOT NULL,
    document_expiry DATE,
    verification_status kyc_status NOT NULL DEFAULT 'NONE',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID, -- Admin user ID
    document_url TEXT, -- Supabase Storage URL
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_kyc_account_id ON kyc(account_id);
CREATE INDEX idx_kyc_verification_status ON kyc(verification_status);
CREATE INDEX idx_kyc_document_number ON kyc(document_number);

-- ============================================================================
-- USER ORGANIZATION (from ERD - ORG relationship)
-- ============================================================================

-- user_organizations: User-Organization relationship (many-to-many)
-- Note: org_role_id และ app_role_id จะเพิ่มใน role-permission-schema.sql
CREATE TABLE user_organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    -- Legacy field (deprecated - ใช้ org_role_id แทน)
    role_in_org VARCHAR(50) DEFAULT 'member' CHECK (role_in_org IN (
        'owner',
        'admin',
        'member'
    )),
    -- Role references (จะเพิ่มใน role-permission-schema.sql)
    -- org_role_id UUID REFERENCES org_roles(id) ON DELETE SET NULL,
    -- app_role_id UUID REFERENCES app_roles(id) ON DELETE SET NULL,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_organization UNIQUE (account_id, organization_id)
);

CREATE INDEX idx_user_organizations_account_id ON user_organizations(account_id);
CREATE INDEX idx_user_organizations_organization_id ON user_organizations(organization_id);
CREATE INDEX idx_user_organizations_role ON user_organizations(role_in_org);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_highest_authority_updated_at BEFORE UPDATE ON highest_authority
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_registration_updated_at BEFORE UPDATE ON user_registration
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_attributes_updated_at BEFORE UPDATE ON user_attributes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kyc_updated_at BEFORE UPDATE ON kyc
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_organizations_updated_at BEFORE UPDATE ON user_organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_juristic_types_updated_at BEFORE UPDATE ON juristic_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE juristic_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE highest_authority ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_registration ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
-- Juristic Types: Public read access (Master Data)
CREATE POLICY "Juristic types are publicly readable" ON juristic_types
    FOR SELECT USING (is_active = true);

-- Users can only view their own accounts
CREATE POLICY "Users can view own account" ON accounts
    FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own organizations
CREATE POLICY "Users can view own organizations" ON organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM accounts
            WHERE accounts.id = organizations.account_id
            AND accounts.user_id = auth.uid()
        )
    );

-- Users can view their own KYC
CREATE POLICY "Users can view own KYC" ON kyc
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM accounts
            WHERE accounts.id = kyc.account_id
            AND accounts.user_id = auth.uid()
        )
    );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE juristic_types IS 'Master Data: Juristic Types (ประเภทนิติบุคคล) - ใช้สำหรับแสดงชื่อองค์กรที่ถูกต้องตามกฎหมาย';
COMMENT ON TABLE accounts IS 'Account table - Core user account data with KYC status (บุคคลธรรมดา - ไม่ใช่ juristic person)';
COMMENT ON TABLE organizations IS 'Organization (ORD) table - Organization data with KYB status (นิติบุคคล - ต้องมี juristic_type_id)';
COMMENT ON TABLE highest_authority IS 'Highest Authority data - ผู้มีอำนาจสูงสุด';
COMMENT ON TABLE contact IS 'Contact/Authorized Person data - ผู้ติดต่อ/ผู้รับมอบอำนาจ';
COMMENT ON TABLE user_registration IS 'User registration details';
COMMENT ON TABLE user_attributes IS 'Custom user attributes (key-value pairs)';
COMMENT ON TABLE user_preferences IS 'User preferences (key-value pairs)';
COMMENT ON TABLE kyc IS 'KYC (Know Your Customer) data';
COMMENT ON TABLE user_organizations IS 'User-Organization relationship (many-to-many)';

-- ============================================================================
-- END OF ACCOUNT & ORG SCHEMA
-- ============================================================================
