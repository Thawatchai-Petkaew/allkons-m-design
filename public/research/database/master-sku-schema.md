# Master SKU Schema: Allkons M

## Executive Summary
Master SKU Database Schema สำหรับ Allkons M Marketplace - เป็นจุดเริ่มต้นของสินค้าทั้งหมดในระบบ

**Status**: ✅ **Ready for Design**

---

## Core Tables

### 1. master_skus
**Purpose**: เก็บข้อมูลสินค้าหลัก (Master SKU) ที่เป็นจุดเริ่มต้น

```sql
CREATE TABLE master_skus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku_code VARCHAR(50) UNIQUE NOT NULL,
    name_th VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    description_th TEXT,
    description_en TEXT,
    
    -- Categorization
    category_id UUID REFERENCES master_sku_categories(id),
    subcategory_id UUID REFERENCES master_sku_categories(id),
    brand VARCHAR(100),
    
    -- Technical specifications
    specifications JSONB,
    unit VARCHAR(20),
    
    -- Media
    primary_image_url VARCHAR(500),
    additional_images JSONB,
    
    -- Standards & Compliance
    standards JSONB,
    
    -- Metadata
    status master_sku_status DEFAULT 'active',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. seller_products
**Purpose**: สินค้าในร้านของผู้ขาย (อ้างอิง Master SKU)

```sql
CREATE TABLE seller_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    master_sku_id UUID NOT NULL REFERENCES master_skus(id),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    shop_id UUID REFERENCES shops(id),
    branch_id UUID REFERENCES branches(id),
    
    -- Seller customization
    product_name VARCHAR(255),
    description TEXT,
    custom_images JSONB,
    
    -- Pricing
    base_price DECIMAL(12,2) NOT NULL,
    promotion_price DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'THB',
    
    -- Stock
    stock_status seller_stock_status DEFAULT 'stocked',
    
    -- Status
    status seller_product_status DEFAULT 'active',
    is_visible_in_marketplace BOOLEAN DEFAULT true,
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(master_sku_id, organization_id, branch_id)
);
```

---

## Enums

```sql
CREATE TYPE master_sku_status AS ENUM (
    'active', 'inactive', 'discontinued'
);

CREATE TYPE seller_stock_status AS ENUM (
    'stocked', 'out_of_stock_can_sale', 'out_of_stock_cannot_sale'
);

CREATE TYPE seller_product_status AS ENUM (
    'active', 'inactive', 'pending_review'
);
```

---

## Key Features
- ✅ Master SKU as single source of truth
- ✅ Multi-vendor support
- ✅ Branch-aware pricing and stock
- ✅ Seller customization within rules
- ✅ Marketplace visibility control
