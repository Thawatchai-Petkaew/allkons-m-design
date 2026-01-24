-- ============================================================================
-- Role & Permission Schema: Allkons M
-- Two-Layer Permission System (Organization Level + Application Level)
-- Database: Supabase (PostgreSQL)
-- ============================================================================

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Permission Action Enum
CREATE TYPE permission_action AS ENUM (
    'VIEW',
    'CREATE',
    'UPDATE',
    'DELETE'
);

-- Permission Category Enum
CREATE TYPE permission_category AS ENUM (
    'ORGANIZATION_INFO',      -- ข้อมูลองค์กร
    'MEMBER_MANAGEMENT',      -- จัดการสมาชิก
    'ROLE_PERMISSION',        -- บทบาทและสิทธิ์
    'ORGANIZATION_NUMBER',    -- จัดการข้อมูลเบอร์องค์กร
    'PAYMENT',                -- การชำระเงิน
    'BANK_ACCOUNT',           -- ข้อมูลบัญชีธนาคาร
    'PROMPTPAY_ACCOUNT',      -- ข้อมูลบัญชีพร้อมเพย์
    'STORE_BRANCH',           -- ร้านค้า/สาขา
    'PRODUCT',                -- สินค้า (Application Level - Seller)
    'PRODUCT_IMPORT',         -- นำเข้าสินค้า (Application Level - Seller)
    'ORDER',                  -- ออเดอร์ (Application Level)
    'PO',                     -- Purchase Order (Application Level - Buyer)
    'INVOICE',                -- Invoice (Application Level)
    'REPORT'                  -- รายงาน (Application Level)
);

-- Role Layer Enum
CREATE TYPE role_layer AS ENUM (
    'ORGANIZATION',  -- Layer 1: Organization Level
    'APPLICATION'   -- Layer 2: Application Level
);

-- Application Type Enum
CREATE TYPE application_type AS ENUM (
    'BUYER',
    'SELLER',
    'BOTH'  -- สำหรับ roles ที่ใช้ได้ทั้ง Buyer และ Seller
);

-- ============================================================================
-- MASTER DATA: PERMISSIONS
-- ============================================================================

-- permissions: Master data for all permissions in the system
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'ORG_VIEW_INFO', 'MEMBER_CREATE'
    name_th VARCHAR(255) NOT NULL, -- ชื่อสิทธิ์ภาษาไทย
    name_en VARCHAR(255), -- ชื่อสิทธิ์ภาษาอังกฤษ
    description_th TEXT, -- คำอธิบายภาษาไทย
    description_en TEXT, -- คำอธิบายภาษาอังกฤษ
    category permission_category NOT NULL, -- หมวดหมู่สิทธิ์
    action permission_action NOT NULL, -- Action (VIEW, CREATE, UPDATE, DELETE)
    layer role_layer NOT NULL, -- Layer (ORGANIZATION or APPLICATION)
    application_type application_type, -- สำหรับ APPLICATION layer (BUYER, SELLER, BOTH)
    is_system BOOLEAN NOT NULL DEFAULT true, -- System permission (ไม่สามารถลบได้)
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_permissions_code ON permissions(code);
CREATE INDEX idx_permissions_category ON permissions(category);
CREATE INDEX idx_permissions_layer ON permissions(layer);
CREATE INDEX idx_permissions_application_type ON permissions(application_type) WHERE application_type IS NOT NULL;
CREATE INDEX idx_permissions_is_active ON permissions(is_active);

-- ============================================================================
-- ORGANIZATION LEVEL ROLES
-- ============================================================================

-- org_roles: Organization Level Roles (Layer 1)
-- ผู้ใช้สามารถสร้าง custom roles ได้
CREATE TABLE org_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL, -- e.g., 'ORG_OWNER', 'ORG_ADMIN', 'ORG_MEMBER'
    name_th VARCHAR(255) NOT NULL, -- ชื่อบทบาทภาษาไทย
    name_en VARCHAR(255), -- ชื่อบทบาทภาษาอังกฤษ
    description_th TEXT, -- คำอธิบายภาษาไทย
    description_en TEXT, -- คำอธิบายภาษาอังกฤษ
    is_system BOOLEAN NOT NULL DEFAULT false, -- System role (ORG_OWNER, ORG_ADMIN, ORG_MEMBER)
    is_default BOOLEAN NOT NULL DEFAULT false, -- Default role สำหรับสมาชิกใหม่
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_by UUID, -- Account ID ที่สร้าง role นี้
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_org_role_code UNIQUE (organization_id, code)
);

CREATE INDEX idx_org_roles_organization_id ON org_roles(organization_id);
CREATE INDEX idx_org_roles_code ON org_roles(code);
CREATE INDEX idx_org_roles_is_system ON org_roles(is_system);
CREATE INDEX idx_org_roles_is_active ON org_roles(is_active);

-- ============================================================================
-- APPLICATION LEVEL ROLES
-- ============================================================================

-- app_roles: Application Level Roles (Layer 2)
-- ผู้ใช้สามารถสร้าง custom roles ได้
CREATE TABLE app_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL, -- e.g., 'BUYER_PURCHASER', 'SELLER_PRODUCT_MANAGER'
    name_th VARCHAR(255) NOT NULL, -- ชื่อบทบาทภาษาไทย
    name_en VARCHAR(255), -- ชื่อบทบาทภาษาอังกฤษ
    description_th TEXT, -- คำอธิบายภาษาไทย
    description_en TEXT, -- คำอธิบายภาษาอังกฤษ
    application_type application_type NOT NULL, -- BUYER, SELLER, BOTH
    is_system BOOLEAN NOT NULL DEFAULT false, -- System role
    is_default BOOLEAN NOT NULL DEFAULT false, -- Default role สำหรับสมาชิกใหม่
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_by UUID, -- Account ID ที่สร้าง role นี้
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_app_role_code UNIQUE (organization_id, code)
);

CREATE INDEX idx_app_roles_organization_id ON app_roles(organization_id);
CREATE INDEX idx_app_roles_code ON app_roles(code);
CREATE INDEX idx_app_roles_application_type ON app_roles(application_type);
CREATE INDEX idx_app_roles_is_system ON app_roles(is_system);
CREATE INDEX idx_app_roles_is_active ON app_roles(is_active);

-- ============================================================================
-- ROLE PERMISSIONS (Many-to-Many)
-- ============================================================================

-- org_role_permissions: Organization Level Role Permissions
CREATE TABLE org_role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_role_id UUID NOT NULL REFERENCES org_roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    granted BOOLEAN NOT NULL DEFAULT true, -- true = granted, false = denied
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_org_role_permission UNIQUE (org_role_id, permission_id)
);

CREATE INDEX idx_org_role_permissions_role_id ON org_role_permissions(org_role_id);
CREATE INDEX idx_org_role_permissions_permission_id ON org_role_permissions(permission_id);
CREATE INDEX idx_org_role_permissions_granted ON org_role_permissions(granted);

-- app_role_permissions: Application Level Role Permissions
CREATE TABLE app_role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_role_id UUID NOT NULL REFERENCES app_roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    granted BOOLEAN NOT NULL DEFAULT true, -- true = granted, false = denied
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_app_role_permission UNIQUE (app_role_id, permission_id)
);

CREATE INDEX idx_app_role_permissions_role_id ON app_role_permissions(app_role_id);
CREATE INDEX idx_app_role_permissions_permission_id ON app_role_permissions(permission_id);
CREATE INDEX idx_app_role_permissions_granted ON app_role_permissions(granted);

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
CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_org_roles_updated_at BEFORE UPDATE ON org_roles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_roles_updated_at BEFORE UPDATE ON app_roles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_role_permissions ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
-- Permissions: Public read access (Master Data)
CREATE POLICY "Permissions are publicly readable" ON permissions
    FOR SELECT USING (is_active = true);

-- Org Roles: Users can view roles in their organizations
CREATE POLICY "Users can view org roles in their organizations" ON org_roles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_organizations uo
            JOIN accounts a ON a.id = uo.account_id
            WHERE uo.organization_id = org_roles.organization_id
            AND a.user_id = auth.uid()
        )
    );

-- App Roles: Users can view app roles in their organizations
CREATE POLICY "Users can view app roles in their organizations" ON app_roles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_organizations uo
            JOIN accounts a ON a.id = uo.account_id
            WHERE uo.organization_id = app_roles.organization_id
            AND a.user_id = auth.uid()
        )
    );

-- ============================================================================
-- SEED DATA: PERMISSIONS
-- ============================================================================

-- Organization Level Permissions
INSERT INTO permissions (code, name_th, name_en, category, action, layer, is_system, display_order) VALUES
-- ข้อมูลองค์กร (Organization Information)
('ORG_VIEW_LIST', 'มีสิทธิ์ดูรายชื่อองค์กร', 'View Organization List', 'ORGANIZATION_INFO', 'VIEW', 'ORGANIZATION', true, 1),
('ORG_VIEW_DETAIL', 'มีสิทธิ์ดูรายละเอียดองค์กร', 'View Organization Details', 'ORGANIZATION_INFO', 'VIEW', 'ORGANIZATION', true, 2),
('ORG_UPDATE_DETAIL', 'มีสิทธิ์แก้ไขรายละเอียดองค์กร', 'Update Organization Details', 'ORGANIZATION_INFO', 'UPDATE', 'ORGANIZATION', true, 3),
('ORG_REQUEST_KYC', 'มีสิทธิ์ขอยืนยันตัวตน (KYC)', 'Request KYC Verification', 'ORGANIZATION_INFO', 'UPDATE', 'ORGANIZATION', true, 4),

-- จัดการสมาชิก (Member Management)
('MEMBER_VIEW_LIST', 'มีสิทธิ์ดูรายชื่อสมาชิก', 'View Member List', 'MEMBER_MANAGEMENT', 'VIEW', 'ORGANIZATION', true, 10),
('MEMBER_VIEW_DETAIL', 'มีสิทธิ์ดูรายละเอียดสมาชิกขององค์กร', 'View Member Details', 'MEMBER_MANAGEMENT', 'VIEW', 'ORGANIZATION', true, 11),
('MEMBER_UPDATE', 'มีสิทธิ์แก้ไขข้อมูลสมาชิกภายในองค์กร', 'Update Member Data', 'MEMBER_MANAGEMENT', 'UPDATE', 'ORGANIZATION', true, 12),
('MEMBER_INVITE', 'มีสิทธิ์เชิญสมาชิกเข้าองค์กร', 'Invite Members to Organization', 'MEMBER_MANAGEMENT', 'CREATE', 'ORGANIZATION', true, 13),
('MEMBER_APPROVE_JOIN', 'มีสิทธิ์อนุมัติให้เข้าร่วมในองค์กรอื่น', 'Approve Joining Other Organizations', 'MEMBER_MANAGEMENT', 'CREATE', 'ORGANIZATION', true, 14),
('MEMBER_REMOVE', 'มีสิทธิ์ลบสมาชิกออกจากองค์กร', 'Remove Members from Organization', 'MEMBER_MANAGEMENT', 'DELETE', 'ORGANIZATION', true, 15),
('MEMBER_APPROVE_LEAVE', 'มีสิทธิ์ในการอนุมัติคนออกจากองค์กร', 'Approve Leaving Organization', 'MEMBER_MANAGEMENT', 'UPDATE', 'ORGANIZATION', true, 16),
('MEMBER_BE_REMOVED', 'มีสิทธิ์ถูกลบออกจากองค์กร', 'Be Removed from Organization', 'MEMBER_MANAGEMENT', 'UPDATE', 'ORGANIZATION', true, 17),
('MEMBER_LEAVE', 'มีสิทธิ์ออกจากองค์กรด้วยตัวเอง', 'Leave Organization by Self', 'MEMBER_MANAGEMENT', 'DELETE', 'ORGANIZATION', true, 18),

-- บทบาทและสิทธิ์ (Roles and Permissions)
('ROLE_VIEW_LIST', 'มีสิทธิ์ดูรายการบทบาท', 'View Role List', 'ROLE_PERMISSION', 'VIEW', 'ORGANIZATION', true, 20),
('ROLE_VIEW_DETAIL', 'มีสิทธิ์ดูรายละเอียดรายการบทบาท', 'View Role Details', 'ROLE_PERMISSION', 'VIEW', 'ORGANIZATION', true, 21),
('ROLE_CREATE', 'มีสิทธิ์เพิ่มบทบาท', 'Create Role', 'ROLE_PERMISSION', 'CREATE', 'ORGANIZATION', true, 22),
('ROLE_UPDATE', 'มีสิทธิ์แก้ไขบทบาท', 'Update Role', 'ROLE_PERMISSION', 'UPDATE', 'ORGANIZATION', true, 23),
('ROLE_DELETE', 'มีสิทธิ์ลบบทบาท', 'Delete Role', 'ROLE_PERMISSION', 'DELETE', 'ORGANIZATION', true, 24),

-- จัดการข้อมูลเบอร์องค์กร (Manage Organization Numbers)
('ORG_NUMBER_VIEW_LIST', 'มีสิทธิ์ดูรายการเบอร์องค์กร', 'View Organization Number List', 'ORGANIZATION_NUMBER', 'VIEW', 'ORGANIZATION', true, 30),
('ORG_NUMBER_VIEW_DETAIL', 'มีสิทธิ์ดูรายละเอียดของเบอร์องค์กร', 'View Organization Number Details', 'ORGANIZATION_NUMBER', 'VIEW', 'ORGANIZATION', true, 31),
('ORG_NUMBER_CREATE', 'มีสิทธิ์เพิ่มเบอร์องค์กร', 'Add Organization Number', 'ORGANIZATION_NUMBER', 'CREATE', 'ORGANIZATION', true, 32),
('ORG_NUMBER_DELETE', 'มีสิทธิ์ลบเบอร์องค์กร', 'Delete Organization Number', 'ORGANIZATION_NUMBER', 'DELETE', 'ORGANIZATION', true, 33),

-- การชำระเงิน (Payments)
('PAYMENT_UPDATE_CHANNEL', 'อัพเดทช่องทางการจ่ายเงิน', 'Update Payment Channels', 'PAYMENT', 'UPDATE', 'ORGANIZATION', true, 40),

-- ข้อมูลบัญชีธนาคาร (Bank Account Information)
('BANK_ACCOUNT_VIEW_LIST', 'มีสิทธิ์ดูรายชื่อบัญชีธนาคาร', 'View Bank Account List', 'BANK_ACCOUNT', 'VIEW', 'ORGANIZATION', true, 50),
('BANK_ACCOUNT_VIEW_DETAIL', 'สิทธิ์ดูรายละเอียดบัญชีธนาคาร', 'View Bank Account Details', 'BANK_ACCOUNT', 'VIEW', 'ORGANIZATION', true, 51),
('BANK_ACCOUNT_CREATE', 'มีสิทธิ์เพิ่มบัญชีธนาคาร', 'Add Bank Account', 'BANK_ACCOUNT', 'CREATE', 'ORGANIZATION', true, 52),
('BANK_ACCOUNT_UPDATE', 'มีสิทธิ์แก้ไขบัญชีธนาคาร', 'Update Bank Account', 'BANK_ACCOUNT', 'UPDATE', 'ORGANIZATION', true, 53),
('BANK_ACCOUNT_DELETE', 'มีสิทธิ์ลบบัญชีธนาคาร', 'Delete Bank Account', 'BANK_ACCOUNT', 'DELETE', 'ORGANIZATION', true, 54),

-- ข้อมูลบัญชีพร้อมเพย์ (PromptPay Account Information)
('PROMPTPAY_VIEW_LIST', 'มีสิทธิ์ดูรายชื่อบัญชีพร้อมเพย์', 'View PromptPay Account List', 'PROMPTPAY_ACCOUNT', 'VIEW', 'ORGANIZATION', true, 60),
('PROMPTPAY_VIEW_DETAIL', 'สิทธิ์ดูรายละเอียดบัญชีพร้อมเพย์', 'View PromptPay Account Details', 'PROMPTPAY_ACCOUNT', 'VIEW', 'ORGANIZATION', true, 61),
('PROMPTPAY_CREATE', 'มีสิทธิ์เพิ่มบัญชีพร้อมเพย์', 'Add PromptPay Account', 'PROMPTPAY_ACCOUNT', 'CREATE', 'ORGANIZATION', true, 62),
('PROMPTPAY_UPDATE', 'มีสิทธิ์แก้ไขบัญชีพร้อมเพย์', 'Update PromptPay Account', 'PROMPTPAY_ACCOUNT', 'UPDATE', 'ORGANIZATION', true, 63),
('PROMPTPAY_DELETE', 'มีสิทธิ์ลบบัญชีพร้อมเพย์', 'Delete PromptPay Account', 'PROMPTPAY_ACCOUNT', 'DELETE', 'ORGANIZATION', true, 64),

-- ร้านค้า/สาขา (Stores / Branches)
('STORE_MEMBER_ASSIGN', 'มีสิทธิ์จัดการสมาชิกภายในร้าน (assign)', 'Manage Members Within Store (Assign)', 'STORE_BRANCH', 'UPDATE', 'ORGANIZATION', true, 70),
('STORE_UPDATE', 'มีสิทธิ์แก้ไขข้อมูลร้านค้า/สาขา', 'Update Store/Branch Information', 'STORE_BRANCH', 'UPDATE', 'ORGANIZATION', true, 71),
('STORE_MEMBER_DELETE', 'มีสิทธิ์ลบสมาชิกภายในร้าน', 'Delete Members Within Store', 'STORE_BRANCH', 'DELETE', 'ORGANIZATION', true, 72),
('STORE_VIEW_LIST', 'มีสิทธิ์ดูรายชื่อร้านค้า/สาขา', 'View Store/Branch List', 'STORE_BRANCH', 'VIEW', 'ORGANIZATION', true, 73),
('STORE_VIEW_DETAIL', 'มีสิทธิ์ดูรายละเอียดร้านค้า/สาขา', 'View Store/Branch Details', 'STORE_BRANCH', 'VIEW', 'ORGANIZATION', true, 74);

-- ============================================================================
-- SEED DATA: APPLICATION LEVEL PERMISSIONS (PRODUCT MODULE)
-- ============================================================================

-- Seller — Product Management Permissions
INSERT INTO permissions (code, name_th, name_en, category, action, layer, application_type, is_system, display_order) VALUES
-- Product List & Detail
('SELLER_PRODUCT.VIEW_LIST', 'มีสิทธิ์ดูรายชื่อสินค้า', 'View Product List', 'PRODUCT', 'VIEW', 'APPLICATION', 'SELLER', true, 100),
('SELLER_PRODUCT.VIEW_DETAIL', 'มีสิทธิ์ดูรายละเอียดสินค้า', 'View Product Detail', 'PRODUCT', 'VIEW', 'APPLICATION', 'SELLER', true, 101),

-- Product Actions
('SELLER_PRODUCT.ADD_FROM_MASTER', 'มีสิทธิ์เพิ่มสินค้าจาก Master SKU', 'Add Product from Master SKU', 'PRODUCT', 'CREATE', 'APPLICATION', 'SELLER', true, 102),
('SELLER_PRODUCT.EDIT_STORE_FIELDS', 'มีสิทธิ์แก้ไขข้อมูลสินค้าฝั่งร้าน', 'Edit Store Product Fields', 'PRODUCT', 'UPDATE', 'APPLICATION', 'SELLER', true, 103),
('SELLER_PRODUCT.EDIT_PRICE', 'มีสิทธิ์แก้ไขราคา', 'Edit Product Price', 'PRODUCT', 'UPDATE', 'APPLICATION', 'SELLER', true, 104),
('SELLER_PRODUCT.TOGGLE_ACTIVE', 'มีสิทธิ์เปิด/ปิดการขาย', 'Toggle Product Active Status', 'PRODUCT', 'UPDATE', 'APPLICATION', 'SELLER', true, 105),
('SELLER_PRODUCT.DELETE', 'มีสิทธิ์ลบสินค้า', 'Delete Product', 'PRODUCT', 'DELETE', 'APPLICATION', 'SELLER', true, 106),
('SELLER_PRODUCT.BULK_ACTION', 'มีสิทธิ์จัดการสินค้าแบบ Bulk', 'Bulk Action on Products', 'PRODUCT', 'UPDATE', 'APPLICATION', 'SELLER', true, 107),
('SELLER_PRODUCT.EXPORT', 'มีสิทธิ์ Export สินค้า', 'Export Products', 'PRODUCT', 'VIEW', 'APPLICATION', 'SELLER', true, 108);

-- Seller — Import Session Permissions
INSERT INTO permissions (code, name_th, name_en, category, action, layer, application_type, is_system, display_order) VALUES
-- Import Session Management
('SELLER_IMPORT.VIEW_SESSIONS', 'มีสิทธิ์ดูรายการ Import Session', 'View Import Sessions', 'PRODUCT_IMPORT', 'VIEW', 'APPLICATION', 'SELLER', true, 200),
('SELLER_IMPORT.CREATE_SESSION', 'มีสิทธิ์สร้าง Import Session', 'Create Import Session', 'PRODUCT_IMPORT', 'CREATE', 'APPLICATION', 'SELLER', true, 201),
('SELLER_IMPORT.CANCEL_MATCHING', 'มีสิทธิ์ยกเลิกการจับคู่', 'Cancel Matching Process', 'PRODUCT_IMPORT', 'UPDATE', 'APPLICATION', 'SELLER', true, 202),
('SELLER_IMPORT.DOWNLOAD_ORIGINAL', 'มีสิทธิ์ดาวน์โหลดไฟล์ต้นฉบับ', 'Download Original File', 'PRODUCT_IMPORT', 'VIEW', 'APPLICATION', 'SELLER', true, 203),
('SELLER_IMPORT.DELETE_SESSION', 'มีสิทธิ์ลบ Import Session', 'Delete Import Session', 'PRODUCT_IMPORT', 'DELETE', 'APPLICATION', 'SELLER', true, 204),
('SELLER_IMPORT.VIEW_REPORT', 'มีสิทธิ์ดูรายงาน Import', 'View Import Report', 'PRODUCT_IMPORT', 'VIEW', 'APPLICATION', 'SELLER', true, 205),

-- Manage Matching Result
('SELLER_IMPORT.MANAGE_RESULT', 'มีสิทธิ์จัดการผลลัพธ์การจับคู่', 'Manage Matching Results', 'PRODUCT_IMPORT', 'UPDATE', 'APPLICATION', 'SELLER', true, 210),
('SELLER_IMPORT.EDIT_TEMPLATE_FIELDS', 'มีสิทธิ์แก้ไข Template Fields', 'Edit Template Fields', 'PRODUCT_IMPORT', 'UPDATE', 'APPLICATION', 'SELLER', true, 211),
('SELLER_IMPORT.CONFIRM_NEAR_MATCH', 'มีสิทธิ์ยืนยัน Near Match', 'Confirm Near Match', 'PRODUCT_IMPORT', 'UPDATE', 'APPLICATION', 'SELLER', true, 212),
('SELLER_IMPORT.SET_NOT_MATCH_REASON', 'มีสิทธิ์ระบุเหตุผลที่ไม่ใช่', 'Set Not Match Reason', 'PRODUCT_IMPORT', 'CREATE', 'APPLICATION', 'SELLER', true, 213),
('SELLER_IMPORT.SUBMIT_FOR_ADMIN_REVIEW', 'มีสิทธิ์ส่งให้ Admin ตรวจสอบ', 'Submit for Admin Review', 'PRODUCT_IMPORT', 'UPDATE', 'APPLICATION', 'SELLER', true, 214),
('SELLER_IMPORT.MARK_DONE_MATCHING', 'มีสิทธิ์ทำเครื่องหมายเสร็จสิ้นการจับคู่', 'Mark Done Matching', 'PRODUCT_IMPORT', 'UPDATE', 'APPLICATION', 'SELLER', true, 215),

-- Import Execution
('SELLER_IMPORT.IMPORT_EXECUTE', 'มีสิทธิ์นำเข้าสินค้า', 'Execute Import', 'PRODUCT_IMPORT', 'CREATE', 'APPLICATION', 'SELLER', true, 220),
('SELLER_IMPORT.IMPORT_FINISH', 'มีสิทธิ์เสร็จสิ้น Import Session', 'Finish Import Session', 'PRODUCT_IMPORT', 'UPDATE', 'APPLICATION', 'SELLER', true, 221),
('SELLER_IMPORT.VIEW_IMPORTED_IN_STORE', 'มีสิทธิ์ดูสินค้าที่นำเข้าแล้วในร้าน', 'View Imported Products in Store', 'PRODUCT_IMPORT', 'VIEW', 'APPLICATION', 'SELLER', true, 222);

-- ============================================================================
-- UPDATE USER_ORGANIZATIONS TABLE
-- ============================================================================

-- Add role references to user_organizations table
ALTER TABLE user_organizations
    ADD COLUMN IF NOT EXISTS org_role_id UUID REFERENCES org_roles(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS app_role_id UUID REFERENCES app_roles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_user_organizations_org_role_id ON user_organizations(org_role_id);
CREATE INDEX IF NOT EXISTS idx_user_organizations_app_role_id ON user_organizations(app_role_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE permissions IS 'Master Data: All permissions in the system';
COMMENT ON TABLE org_roles IS 'Organization Level Roles (Layer 1) - Customizable by users';
COMMENT ON TABLE app_roles IS 'Application Level Roles (Layer 2) - Customizable by users';
COMMENT ON TABLE org_role_permissions IS 'Many-to-many: Organization Level Roles and Permissions';
COMMENT ON TABLE app_role_permissions IS 'Many-to-many: Application Level Roles and Permissions';
COMMENT ON COLUMN user_organizations.org_role_id IS 'Organization Level Role (Layer 1)';
COMMENT ON COLUMN user_organizations.app_role_id IS 'Application Level Role (Layer 2)';

-- ============================================================================
-- END OF ROLE & PERMISSION SCHEMA
-- ============================================================================
