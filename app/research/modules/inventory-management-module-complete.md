# Inventory Management Module (Complete): Allkons M

## Executive Summary
Module สำหรับการจัดการสต็อกสินค้า (Inventory Management) ในระบบ Allkons M โดยรองรับ Multi-Branch และ Stock Alerts

**⚠️ Status: Future Feature (Phase 2+)**
- Module นี้ถูกออกแบบไว้สำหรับอนาคต
- ระบบ Inventory Management จะถูกพัฒนาหลังจาก MVP
- ตอนนี้ระบบจะใช้ Stock Status แบบ Manual (Stocked, Out of Stock) โดย Seller จัดการเอง

---

## 1. Module Overview

### 1.1 Purpose
- **Stock Tracking**: ติดตามสต็อกสินค้า
- **Stock Alerts**: แจ้งเตือนเมื่อสต็อกต่ำ/หมด
- **Stock Management**: จัดการสต็อก (เพิ่ม, ลบ, ปรับ)
- **Multi-location Inventory**: จัดการสต็อกหลายสาขา

### 1.2 Scope
- Stock Tracking
- Stock Alerts (Low stock, Out of stock)
- Stock History
- Stock Adjustment
- Multi-location Inventory (Branch-level)
- Inventory Reports
- Stock Synchronization

---

## 2. Common Functions & Features

### 2.1 Stock Status Management

#### 2.1.1 Stock Status Types

**Stock Status**:
- **Stocked**: มีสต็อก
- **Low Stock**: สต็อกต่ำ (ต่ำกว่า threshold)
- **Out of Stock (Can Sale)**: หมดสต็อก แต่ยังขายได้ (pre-order, backorder)
- **Out of Stock (Can Not Sale)**: หมดสต็อก และไม่สามารถขายได้

**Status Rules**:
- **Stocked**: Quantity > Low Stock Threshold
- **Low Stock**: Quantity <= Low Stock Threshold && Quantity > 0
- **Out of Stock (Can Sale)**: Quantity = 0 && Allow Pre-order = true
- **Out of Stock (Can Not Sale)**: Quantity = 0 && Allow Pre-order = false

---

#### 2.1.2 Stock Quantity Management

**Quantity Operations**:
- **Add Stock**: เพิ่มสต็อก (รับสินค้าเข้า)
- **Remove Stock**: ลบสต็อก (ขาย, เสียหาย)
- **Adjust Stock**: ปรับสต็อก (stock take, correction)
- **Reserve Stock**: จองสต็อก (เมื่อมีออเดอร์)
- **Release Stock**: ปล่อยสต็อก (เมื่อออเดอร์ยกเลิก)

**Stock Calculation**:
```
Available Stock = Total Stock - Reserved Stock - Pending Orders
```

---

### 2.2 Stock Alerts

#### 2.2.1 Alert Types

**Low Stock Alert**:
- Trigger: Stock <= Low Stock Threshold
- Alert to: Product Manager, Store Owner
- Channels: Email, In-app, SMS (optional)
- Frequency: Once per day (until resolved)

**Out of Stock Alert**:
- Trigger: Stock = 0
- Alert to: Product Manager, Store Owner
- Channels: Email, In-app, SMS (optional)
- Frequency: Once per day (until resolved)

**Stock Replenishment Alert**:
- Trigger: Stock replenished
- Alert to: Product Manager
- Channels: In-app, Email

---

#### 2.2.2 Alert Configuration

**Alert Settings**:
- **Low Stock Threshold**: ตั้งค่าสต็อกต่ำ (เช่น 10 ชิ้น)
- **Alert Recipients**: ใครจะได้รับแจ้งเตือน
- **Alert Channels**: ช่องทางแจ้งเตือน
- **Alert Frequency**: ความถี่ในการแจ้งเตือน

**Per Product Settings**:
- Different thresholds per product
- Different recipients per product
- Product-specific alert rules

---

### 2.3 Stock History

#### 2.3.1 History Tracking

**Tracked Events**:
- Stock added
- Stock removed
- Stock adjusted
- Stock reserved
- Stock released
- Order placed (reserves stock)
- Order cancelled (releases stock)
- Order fulfilled (removes stock)

**History Details**:
- Timestamp
- User who made change
- Change type
- Quantity change
- Previous quantity
- New quantity
- Reason (optional)
- Reference (Order ID, etc.)

---

#### 2.3.2 History Features

**View History**:
- All stock changes
- Filter by date
- Filter by product
- Filter by branch
- Filter by change type
- Search history

**History Reports**:
- Stock movement report
- Stock adjustment report
- Stock usage report
- Export history

---

### 2.4 Stock Adjustment

#### 2.4.1 Adjustment Types

**Adjustment Reasons**:
- **Stock Take**: นับสต็อกจริง
- **Damage/Loss**: สินค้าเสียหาย/สูญหาย
- **Return**: สินค้าคืนจากลูกค้า
- **Transfer**: โอนสต็อกระหว่างสาขา
- **Correction**: แก้ไขข้อผิดพลาด
- **Other**: อื่นๆ

**Adjustment Flow**:
1. User initiates stock adjustment
2. Select product and branch
3. Enter adjustment quantity
4. Select adjustment reason
5. Add notes (optional)
6. Confirm adjustment
7. Stock updated
8. History recorded

---

#### 2.4.2 Adjustment Management

**Adjustment Operations**:
- Create adjustment
- View adjustments
- Edit adjustment (before confirmed)
- Delete adjustment (before confirmed)
- Approve adjustment (if required)
- Adjustment reports

**Adjustment Approval**:
- Some adjustments require approval
- Approval workflow
- Approval history

---

### 2.5 Multi-location Inventory

#### 2.5.1 Branch-level Stock

**Stock per Branch**:
- Each branch has separate stock
- Stock tracked per branch
- Stock transfer between branches
- Branch stock reports

**Stock Display**:
- Show stock per branch
- Show total stock (all branches)
- Show available stock per branch
- Branch stock availability

---

#### 2.5.2 Stock Transfer

**Transfer Flow**:
1. Initiate transfer (from branch to branch)
2. Select products and quantities
3. Confirm transfer
4. Source branch stock decreased
5. Destination branch stock increased
6. Transfer history recorded

**Transfer Management**:
- Create transfer
- View transfers
- Track transfer status
- Transfer reports

---

### 2.6 Stock Synchronization

#### 2.6.1 Sync Features

**Sync Scenarios**:
- **Real-time Sync**: Sync immediately when stock changes
- **Batch Sync**: Sync periodically (e.g., every hour)
- **Manual Sync**: Sync on demand

**Sync Points**:
- Stock updated → Sync to all locations
- Order placed → Reserve stock → Sync
- Order cancelled → Release stock → Sync
- Order fulfilled → Remove stock → Sync

---

## 3. User Stories

### 3.1 Inventory User Stories

**US-INV-001: Receive Low Stock Alert**
- **As a** Product Manager
- **I want to** receive alert when stock is low
- **So that** I can replenish stock in time
- **Acceptance Criteria**:
  - Receive alert when stock <= threshold
  - Alert shows product and current stock
  - Can click to view product details
  - Can add stock directly from alert

**US-INV-002: Adjust Stock**
- **As a** Product Manager
- **I want to** adjust stock quantity
- **So that** I can correct stock discrepancies
- **Acceptance Criteria**:
  - Can select product and branch
  - Can enter adjustment quantity
  - Can select adjustment reason
  - Stock updated immediately
  - History recorded

---

## 4. Technical Requirements

### 4.1 Inventory Service

**Components**:
- Inventory Service (API)
- Stock Calculation Engine
- Alert Service
- History Service
- Sync Service

---

### 4.2 APIs

**Inventory APIs**:
- `GET /api/inventory/stock/{productId}` - Get stock
- `PUT /api/inventory/stock/{productId}` - Update stock
- `POST /api/inventory/stock/add` - Add stock
- `POST /api/inventory/stock/remove` - Remove stock
- `POST /api/inventory/stock/adjust` - Adjust stock
- `GET /api/inventory/history` - Get stock history
- `GET /api/inventory/alerts` - Get stock alerts

**Branch Inventory APIs**:
- `GET /api/inventory/branch/{branchId}/stock` - Get branch stock
- `POST /api/inventory/transfer` - Transfer stock between branches

---

## 5. Common Functions Reference

### 5.1 Inventory Functions

```typescript
// Stock Management
getStock(productId: string, branchId?: string): Promise<Stock>
updateStock(productId: string, quantity: number, branchId?: string): Promise<Stock>
addStock(productId: string, quantity: number, branchId?: string, reason?: string): Promise<Stock>
removeStock(productId: string, quantity: number, branchId?: string, reason?: string): Promise<Stock>
adjustStock(productId: string, adjustment: number, branchId?: string, reason: string): Promise<Stock>

// Stock Reservation
reserveStock(orderId: string, items: OrderItem[]): Promise<void>
releaseStock(orderId: string): Promise<void>
getReservedStock(productId: string, branchId?: string): Promise<number>

// Stock Alerts
getStockAlerts(sellerId: string, filters: AlertFilters): Promise<StockAlert[]>
configureStockAlert(productId: string, threshold: number): Promise<StockAlert>
getLowStockProducts(sellerId: string): Promise<Product[]>
getOutOfStockProducts(sellerId: string): Promise<Product[]>

// Stock History
getStockHistory(productId: string, branchId?: string, filters: HistoryFilters): Promise<StockHistory[]>
exportStockHistory(filters: HistoryFilters): Promise<File>

// Branch Stock
getBranchStock(branchId: string): Promise<BranchStock[]>
transferStock(fromBranch: string, toBranch: string, items: TransferItem[]): Promise<Transfer>
```

---

## 6. Success Metrics

### 6.1 Inventory Metrics

- Stock accuracy
- Stock turnover rate
- Out of stock rate
- Low stock alert effectiveness
- Stock adjustment frequency

---

## 7. Implementation Priority

### Phase 1 (MVP) - Current Status
- ⚠️ **Manual Stock Management Only**
  - Seller manually sets stock status (Stocked, Out of Stock)
  - No automatic stock tracking
  - No stock quantity management
  - No stock alerts
  - Simple stock status display

### Phase 2 (Future) - Inventory System Implementation
- 🔮 **Full Inventory Management System**
  - ✅ Basic stock management
  - ✅ Stock status (Stocked, Out of stock)
  - ✅ Basic stock alerts
  - ✅ Stock history
  - ✅ Low stock alerts
  - ✅ Stock adjustment
  - ✅ Multi-location inventory
  - ✅ Stock transfer

### Phase 3 (Future Enhancement)
- 🔮 **Advanced Features**
  - ✅ Advanced stock analytics
  - ✅ Stock optimization
  - ✅ Predictive stock management
  - ✅ Automated reordering
  - ✅ Stock forecasting

**Note**: ตอนนี้ระบบจะใช้ Stock Status แบบ Manual โดย Seller จัดการเอง เมื่อระบบ Inventory Management พร้อม จะอัปเกรดจาก Manual เป็น Automated System

---

## 8. Dependencies

### 8.1 External Dependencies
- None (internal module)

### 8.2 Internal Dependencies
- Product Module
- Order Module
- Branch Management Module
- Notification Module

---

## 9. Current Implementation (MVP - Manual Stock Management)

### 9.1 Manual Stock Status

**Current Approach**:
- Seller manually sets stock status for each product
- No automatic stock tracking
- No stock quantity management
- Simple status-based system

**Stock Status Options** (Manual):
- **Stocked**: มีสต็อก (Seller sets manually)
- **Out of Stock (Can Sale)**: หมดสต็อก แต่ยังขายได้ (pre-order)
- **Out of Stock (Can Not Sale)**: หมดสต็อก และไม่สามารถขายได้

**Manual Management**:
- Seller updates stock status in product management
- No automatic deduction when order placed
- No stock alerts
- No stock history tracking
- Simple and straightforward for MVP

### 9.2 Migration Path to Full Inventory System

**When Inventory System is Ready**:
1. Migrate existing stock status to inventory system
2. Enable stock quantity tracking
3. Enable automatic stock deduction
4. Enable stock alerts
5. Enable stock history
6. Enable multi-location inventory
7. Enable stock transfer

**Migration Considerations**:
- Data migration from manual status to quantity-based
- Seller training on new system
- Gradual rollout
- Backward compatibility during transition

---

## Appendix

### A. Stock Status Examples

**Stocked**:
- Quantity: 100
- Status: Stocked
- Can sell: Yes

**Low Stock**:
- Quantity: 5 (threshold: 10)
- Status: Low Stock
- Alert: Sent
- Can sell: Yes

**Out of Stock (Can Sale)**:
- Quantity: 0
- Status: Out of Stock (Can Sale)
- Allow Pre-order: Yes
- Can sell: Yes (pre-order)

**Out of Stock (Can Not Sale)**:
- Quantity: 0
- Status: Out of Stock (Can Not Sale)
- Allow Pre-order: No
- Can sell: No

### B. References
- Project Scope Document
- Product Module Document
