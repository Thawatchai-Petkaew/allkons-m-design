# B2B Purchasing Schema: Allkons M

## Executive Summary
B2B Purchasing Database Schema สำหรับรองรับการซื้อในรูปแบบ RFT/BOQ/QT สำหรับ Allkons M Marketplace

**Status**: ✅ **Ready for Design**

---

## Business Requirements

### 1. B2B Purchasing Models
- **RFT (Request for Tender)**: การเรียกประกวดราคาสำหรับโครงการใหญ่
- **BOQ (Bill of Quantities)**: การซื้อตามบิลวัสดุที่กำหนดจำนวน
- **QT (Quotation)**: การขอราคาสำหรับการซื้อทั่วไป

### 2. Workflow Support
- สร้างใบสอบถามราคา (RFT/BOQ/QT)
- ผู้ขายส่งข้อเสนอราคา
- ผู้ซื้อเลือกข้อเสนอและสร้าง PO
- การจัดการเงื่อนไขการชำระเงิน (Credit Terms)

---

## Core Tables

### 1. purchase_requests
**Purpose**: เก็บข้อมูลการสอบถามราคา (RFT/BOQ/QT)

```sql
CREATE TABLE purchase_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_number VARCHAR(50) UNIQUE NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    branch_id UUID REFERENCES branches(id),
    
    -- Request details
    request_type purchase_request_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_name VARCHAR(255),
    project_location TEXT,
    
    -- Timeline
    submission_deadline TIMESTAMP WITH TIME ZONE,
    expected_delivery_date DATE,
    
    -- Budget
    budget_range_min DECIMAL(12,2),
    budget_range_max DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'THB',
    
    -- Status
    status purchase_request_status DEFAULT 'draft',
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. purchase_request_items
**Purpose**: รายการสินค้าในการสอบถามราคา

```sql
CREATE TABLE purchase_request_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_request_id UUID NOT NULL REFERENCES purchase_requests(id),
    master_sku_id UUID REFERENCES master_skus(id),
    
    -- Item details
    quantity DECIMAL(12,4) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    description TEXT,
    specifications JSONB,
    
    -- Requirements
    delivery_location TEXT,
    delivery_date DATE,
    
    -- Budget reference
    unit_budget DECIMAL(12,2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. quotations
**Purpose**: ข้อเสนอราคาจากผู้ขาย

```sql
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_number VARCHAR(50) UNIQUE NOT NULL,
    purchase_request_id UUID NOT NULL REFERENCES purchase_requests(id),
    seller_organization_id UUID NOT NULL REFERENCES organizations(id),
    seller_branch_id UUID REFERENCES branches(id),
    
    -- Quotation details
    title VARCHAR(255),
    notes TEXT,
    valid_until TIMESTAMP WITH TIME ZONE,
    
    -- Pricing
    subtotal DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'THB',
    
    -- Terms
    payment_terms TEXT,
    delivery_terms TEXT,
    warranty_terms TEXT,
    
    -- Status
    status quotation_status DEFAULT 'draft',
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. quotation_items
**Purpose**: รายการสินค้าในข้อเสนอราคา

```sql
CREATE TABLE quotation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL REFERENCES quotations(id),
    purchase_request_item_id UUID REFERENCES purchase_request_items(id),
    seller_product_id UUID REFERENCES seller_products(id),
    
    -- Item details
    quantity DECIMAL(12,4) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    total_price DECIMAL(12,2) NOT NULL,
    
    -- Seller info
    product_name VARCHAR(255),
    brand VARCHAR(100),
    specifications JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. purchase_orders
**Purpose**: ใบสั่งซื้อที่สร้างจาก quotation ที่เลือก

```sql
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_number VARCHAR(50) UNIQUE NOT NULL,
    quotation_id UUID REFERENCES quotations(id),
    purchase_request_id UUID REFERENCES purchase_requests(id),
    
    -- Parties
    buyer_organization_id UUID NOT NULL REFERENCES organizations(id),
    buyer_branch_id UUID REFERENCES branches(id),
    seller_organization_id UUID NOT NULL REFERENCES organizations(id),
    seller_branch_id UUID REFERENCES branches(id),
    
    -- Order details
    title VARCHAR(255),
    notes TEXT,
    
    -- Pricing
    subtotal DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'THB',
    
    -- Terms
    payment_terms TEXT,
    delivery_terms TEXT,
    expected_delivery_date DATE,
    
    -- Status
    status purchase_order_status DEFAULT 'draft',
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Enums

```sql
CREATE TYPE purchase_request_type AS ENUM (
    'rft', -- Request for Tender
    'boq', -- Bill of Quantities  
    'qt'   -- Quotation
);

CREATE TYPE purchase_request_status AS ENUM (
    'draft', 'published', 'closed', 'cancelled'
);

CREATE TYPE quotation_status AS ENUM (
    'draft', 'submitted', 'accepted', 'rejected', 'expired'
);

CREATE TYPE purchase_order_status AS ENUM (
    'draft', 'confirmed', 'in_progress', 'completed', 'cancelled'
);
```

---

## Indexes

```sql
-- Purchase Requests
CREATE INDEX idx_purchase_requests_org ON purchase_requests(organization_id);
CREATE INDEX idx_purchase_requests_type ON purchase_requests(request_type);
CREATE INDEX idx_purchase_requests_status ON purchase_requests(status);
CREATE INDEX idx_purchase_requests_deadline ON purchase_requests(submission_deadline);

-- Quotations
CREATE INDEX idx_quotations_request ON quotations(purchase_request_id);
CREATE INDEX idx_quotations_seller ON quotations(seller_organization_id);
CREATE INDEX idx_quotations_status ON quotations(status);

-- Purchase Orders
CREATE INDEX idx_purchase_orders_buyer ON purchase_orders(buyer_organization_id);
CREATE INDEX idx_purchase_orders_seller ON purchase_orders(seller_organization_id);
CREATE INDEX idx_purchase_orders_status ON purchase_orders(status);
```

---

## Key Features
- ✅ RFT/BOQ/QT workflow support
- ✅ Multi-vendor quotation comparison
- ✅ PO generation from quotations
- ✅ Credit terms and payment conditions
- ✅ Project-based purchasing
