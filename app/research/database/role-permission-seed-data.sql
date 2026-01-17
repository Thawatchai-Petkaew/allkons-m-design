-- ============================================================================
-- Role & Permission Seed Data: Allkons M
-- Default Roles and Permissions for new organizations
-- ============================================================================

-- ============================================================================
-- FUNCTION: Create Default Roles for Organization
-- ============================================================================

-- Function to create default org roles for a new organization
CREATE OR REPLACE FUNCTION create_default_org_roles(org_id UUID, created_by_account_id UUID)
RETURNS void AS $$
DECLARE
    owner_role_id UUID;
    admin_role_id UUID;
    member_role_id UUID;
BEGIN
    -- Create ORG_OWNER role
    INSERT INTO org_roles (organization_id, code, name_th, name_en, description_th, description_en, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'ORG_OWNER',
        'เจ้าขององค์กร',
        'Organization Owner',
        'เจ้าขององค์กร - สิทธิ์เต็มรูปแบบ',
        'Organization Owner - Full permissions',
        true,
        false,
        1,
        created_by_account_id
    ) RETURNING id INTO owner_role_id;

    -- Create ORG_ADMIN role
    INSERT INTO org_roles (organization_id, code, name_th, name_en, description_th, description_en, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'ORG_ADMIN',
        'ผู้ดูแลองค์กร',
        'Organization Admin',
        'ผู้ดูแลองค์กร - จัดการองค์กรได้ (แต่ไม่สามารถลบองค์กร)',
        'Organization Admin - Can manage organization (but cannot delete)',
        true,
        false,
        2,
        created_by_account_id
    ) RETURNING id INTO admin_role_id;

    -- Create ORG_MEMBER role
    INSERT INTO org_roles (organization_id, code, name_th, name_en, description_th, description_en, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'ORG_MEMBER',
        'สมาชิกองค์กร',
        'Organization Member',
        'สมาชิกองค์กร - สิทธิ์พื้นฐาน',
        'Organization Member - Basic permissions',
        true,
        true,
        3,
        created_by_account_id
    ) RETURNING id INTO member_role_id;

    -- Assign permissions to ORG_OWNER (all permissions)
    INSERT INTO org_role_permissions (org_role_id, permission_id, granted)
    SELECT owner_role_id, id, true
    FROM permissions
    WHERE layer = 'ORGANIZATION' AND is_active = true;

    -- Assign permissions to ORG_ADMIN (all except delete organization)
    INSERT INTO org_role_permissions (org_role_id, permission_id, granted)
    SELECT admin_role_id, id, true
    FROM permissions
    WHERE layer = 'ORGANIZATION' 
        AND is_active = true
        AND code NOT IN ('ORG_DELETE'); -- ไม่มี permission นี้ใน seed data แต่ถ้ามีจะต้อง exclude

    -- Assign permissions to ORG_MEMBER (view only)
    INSERT INTO org_role_permissions (org_role_id, permission_id, granted)
    SELECT member_role_id, id, true
    FROM permissions
    WHERE layer = 'ORGANIZATION' 
        AND is_active = true
        AND action = 'VIEW';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- FUNCTION: Create Default App Roles for Organization
-- ============================================================================

-- Function to create default app roles for a new organization (Buyer)
CREATE OR REPLACE FUNCTION create_default_buyer_app_roles(org_id UUID, created_by_account_id UUID)
RETURNS void AS $$
DECLARE
    purchaser_role_id UUID;
    admin_role_id UUID;
    viewer_role_id UUID;
BEGIN
    -- Create BUYER_PURCHASER role
    INSERT INTO app_roles (organization_id, code, name_th, name_en, description_th, description_en, application_type, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'BUYER_PURCHASER',
        'ผู้ซื้อ',
        'Purchaser',
        'ผู้ซื้อ - สร้างออเดอร์ได้',
        'Purchaser - Can create orders',
        'BUYER',
        true,
        false,
        1,
        created_by_account_id
    ) RETURNING id INTO purchaser_role_id;

    -- Create BUYER_ADMIN role
    INSERT INTO app_roles (organization_id, code, name_th, name_en, description_th, description_en, application_type, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'BUYER_ADMIN',
        'ผู้ดูแลการซื้อ',
        'Buyer Admin',
        'ผู้ดูแลการซื้อ - จัดการ PO, Invoice, Reports',
        'Buyer Admin - Can manage PO, Invoice, Reports',
        'BUYER',
        true,
        false,
        2,
        created_by_account_id
    ) RETURNING id INTO admin_role_id;

    -- Create BUYER_VIEWER role
    INSERT INTO app_roles (organization_id, code, name_th, name_en, description_th, description_en, application_type, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'BUYER_VIEWER',
        'ผู้ดูข้อมูล',
        'Buyer Viewer',
        'ผู้ดูข้อมูล - ดูได้อย่างเดียว (Read-only)',
        'Buyer Viewer - View only (Read-only)',
        'BUYER',
        true,
        true,
        3,
        created_by_account_id
    ) RETURNING id INTO viewer_role_id;

    -- Note: Buyer permissions จะเพิ่มใน Phase 2+
    -- ตอนนี้ยังไม่มี permissions สำหรับ Buyer APPLICATION layer
END;
$$ LANGUAGE plpgsql;

-- Function to create default app roles for a new organization (Seller)
CREATE OR REPLACE FUNCTION create_default_seller_app_roles(org_id UUID, created_by_account_id UUID)
RETURNS void AS $$
DECLARE
    product_manager_role_id UUID;
    order_manager_role_id UUID;
    viewer_role_id UUID;
BEGIN
    -- Create SELLER_PRODUCT_MANAGER role
    INSERT INTO app_roles (organization_id, code, name_th, name_en, description_th, description_en, application_type, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'SELLER_PRODUCT_MANAGER',
        'ผู้จัดการสินค้า',
        'Product Manager',
        'ผู้จัดการสินค้า - จัดการสินค้าได้',
        'Product Manager - Can manage products',
        'SELLER',
        true,
        false,
        1,
        created_by_account_id
    ) RETURNING id INTO product_manager_role_id;

    -- Create SELLER_ORDER_MANAGER role
    INSERT INTO app_roles (organization_id, code, name_th, name_en, description_th, description_en, application_type, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'SELLER_ORDER_MANAGER',
        'ผู้จัดการออเดอร์',
        'Order Manager',
        'ผู้จัดการออเดอร์ - จัดการออเดอร์ได้',
        'Order Manager - Can manage orders',
        'SELLER',
        true,
        false,
        2,
        created_by_account_id
    ) RETURNING id INTO order_manager_role_id;

    -- Create SELLER_VIEWER role
    INSERT INTO app_roles (organization_id, code, name_th, name_en, description_th, description_en, application_type, is_system, is_default, display_order, created_by)
    VALUES (
        org_id,
        'SELLER_VIEWER',
        'ผู้ดูข้อมูล',
        'Seller Viewer',
        'ผู้ดูข้อมูล - ดูได้อย่างเดียว (Read-only)',
        'Seller Viewer - View only (Read-only)',
        'SELLER',
        true,
        true,
        3,
        created_by_account_id
    ) RETURNING id INTO viewer_role_id;

    -- Assign Product Management permissions to SELLER_PRODUCT_MANAGER
    INSERT INTO app_role_permissions (app_role_id, permission_id, granted)
    SELECT product_manager_role_id, id, true
    FROM permissions
    WHERE layer = 'APPLICATION' 
        AND application_type = 'SELLER'
        AND category IN ('PRODUCT', 'PRODUCT_IMPORT')
        AND is_active = true;

    -- Assign limited Product permissions to SELLER_ORDER_MANAGER (view only)
    INSERT INTO app_role_permissions (app_role_id, permission_id, granted)
    SELECT order_manager_role_id, id, true
    FROM permissions
    WHERE layer = 'APPLICATION' 
        AND application_type = 'SELLER'
        AND category = 'PRODUCT'
        AND action = 'VIEW'
        AND is_active = true;

    -- Assign limited Product permissions to SELLER_VIEWER (view only)
    INSERT INTO app_role_permissions (app_role_id, permission_id, granted)
    SELECT viewer_role_id, id, true
    FROM permissions
    WHERE layer = 'APPLICATION' 
        AND application_type = 'SELLER'
        AND category = 'PRODUCT'
        AND action = 'VIEW'
        AND is_active = true;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGER: Auto-create Default Roles when Organization is created
-- ============================================================================

-- Function to auto-create default roles
CREATE OR REPLACE FUNCTION auto_create_default_roles()
RETURNS TRIGGER AS $$
DECLARE
    account_owner_id UUID;
BEGIN
    -- Get the account owner ID
    SELECT id INTO account_owner_id
    FROM accounts
    WHERE id = NEW.account_id;

    -- Create default org roles
    PERFORM create_default_org_roles(NEW.id, account_owner_id);

    -- Note: App roles จะสร้างเมื่อ user กำหนดว่าเป็น Buyer หรือ Seller
    -- หรือสร้างทั้ง 2 แบบถ้าเป็น BOTH

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER trigger_auto_create_default_roles
    AFTER INSERT ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION auto_create_default_roles();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON FUNCTION create_default_org_roles IS 'Create default organization level roles for a new organization';
COMMENT ON FUNCTION create_default_buyer_app_roles IS 'Create default buyer application level roles for a new organization';
COMMENT ON FUNCTION create_default_seller_app_roles IS 'Create default seller application level roles for a new organization';
COMMENT ON FUNCTION auto_create_default_roles IS 'Auto-create default roles when organization is created';

-- ============================================================================
-- END OF ROLE & PERMISSION SEED DATA
-- ============================================================================
