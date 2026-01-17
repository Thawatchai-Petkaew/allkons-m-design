# Notification Module: Allkons M

## Executive Summary
Module สำหรับการส่งการแจ้งเตือน (Notifications) ผ่านหลายช่องทาง (In-app, Email, SMS) ในระบบ Allkons M

---

## 1. Module Overview

### 1.1 Purpose
- **Multi-channel Notifications**: ส่งการแจ้งเตือนผ่านหลายช่องทาง
- **User Preferences**: ผู้ใช้สามารถตั้งค่าการแจ้งเตือนได้
- **Notification Management**: จัดการการแจ้งเตือนทั้งหมด

### 1.2 Scope
- In-app Notifications
- Email Notifications
- SMS Notifications (optional)
- Push Notifications (Mobile - Phase 2)
- Notification Preferences
- Notification Templates
- Notification History

---

## 2. Common Functions & Features

### 2.1 Notification Channels

#### 2.1.1 In-App Notifications

**Features**:
- Real-time notifications
- Notification center/bell icon
- Unread count badge
- Notification list
- Mark as read/unread
- Delete notifications
- Notification categories

**Notification Display**:
- Notification card with:
  - Icon
  - Title
  - Message
  - Timestamp
  - Action button (optional)
- Grouped notifications (by type, by date)
- Infinite scroll or pagination

**Real-time Updates**:
- WebSocket connection
- Server-sent events (SSE)
- Polling fallback

---

#### 2.1.2 Email Notifications

**Features**:
- Rich HTML emails
- Email templates
- Attachments (invoices, documents)
- Unsubscribe option
- Email preferences

**Email Types**:
- Transactional emails (order confirmations, invoices)
- Marketing emails (promotions, newsletters)
- System emails (account updates, security alerts)

**Email Providers**:
- SendGrid
- AWS SES
- Mailgun
- Custom SMTP

---

#### 2.1.3 SMS Notifications

**Features**:
- SMS OTP (for 2FA, password reset)
- SMS alerts (urgent notifications)
- SMS reminders

**SMS Use Cases**:
- Order shipped
- Delivery updates
- Payment reminders
- Security alerts
- Urgent notifications

**SMS Providers**:
- Twilio
- AWS SNS
- Local SMS gateway (Thailand)

**Cost Considerations**:
- SMS is expensive
- Use only for urgent/important notifications
- Rate limiting

---

#### 2.1.4 Push Notifications (Phase 2)

**Features**:
- Mobile push notifications
- Desktop push notifications
- Rich notifications (images, actions)
- Notification grouping

**Push Providers**:
- Firebase Cloud Messaging (FCM)
- Apple Push Notification Service (APNs)
- Web Push API

---

### 2.2 Notification Types

#### 2.2.1 Order Notifications

**For Buyers**:
- Order placed confirmation
- Payment received
- Order processing
- Order shipped
- Out for delivery
- Delivery confirmed
- Order cancelled
- Refund processed

**For Sellers**:
- New order received
- Order cancelled by buyer
- Payment received
- Order ready to ship
- Return requested
- Refund requested

---

#### 2.2.2 Account Notifications

**Account Updates**:
- Email verified
- Password changed
- 2FA enabled/disabled
- Profile updated
- Account suspended/activated

**Security Alerts**:
- Login from new device
- Suspicious activity detected
- Account locked
- Password reset requested

---

#### 2.2.3 Team & Organization Notifications

**Team Notifications**:
- Team member invited
- Team member joined
- Team member removed
- Role changed
- Permission changed

**Organization Notifications**:
- KYC/KYB approved/rejected
- ORD created
- ORD status changed
- Shop created
- Branch created

---

#### 2.2.4 Product Notifications

**For Buyers**:
- Product back in stock
- Price drop
- New product available
- Product review requested

**For Sellers**:
- Low stock alert
- Out of stock alert
- Product approved/rejected
- New review received

---

#### 2.2.5 Promotion Notifications

**For Buyers**:
- New promotion available
- Promotion ending soon
- Coupon code received
- Special offer

**For Sellers**:
- Promotion created
- Promotion activated
- Promotion expired
- Promotion performance

---

### 2.3 Notification Preferences

#### 2.3.1 Preference Settings

**User Can Control**:
- Which notification types to receive
- Which channels to use (Email, SMS, In-app)
- Quiet hours (do not send during certain times)
- Frequency (real-time, daily digest, weekly digest)

**Preference Levels**:
- **Global Preferences**: ตั้งค่าทั้งหมด
- **Category Preferences**: ตั้งค่าตามประเภท (Orders, Account, etc.)
- **Notification Type Preferences**: ตั้งค่าตาม notification type

**Default Preferences**:
- Critical notifications: All channels
- Important notifications: Email + In-app
- Regular notifications: In-app only
- Marketing notifications: Opt-in

---

#### 2.3.2 Preference Management

**Features**:
- View notification preferences
- Update preferences
- Reset to defaults
- Import/Export preferences

**Preference UI**:
- Toggle switches for each notification type
- Channel selection (Email, SMS, In-app)
- Quiet hours setting
- Frequency setting

---

### 2.4 Notification Templates

#### 2.4.1 Template Management

**Template Types**:
- Email templates
- SMS templates
- In-app notification templates
- Push notification templates

**Template Features**:
- Dynamic variables ({{user_name}}, {{order_number}})
- Multi-language support
- Branding (logo, colors)
- Rich content (HTML, images)

**Template Variables**:
- User variables: {{user_name}}, {{user_email}}
- Order variables: {{order_number}}, {{order_total}}
- Product variables: {{product_name}}, {{product_price}}
- Organization variables: {{org_name}}
- Date/time variables: {{date}}, {{time}}

---

#### 2.4.2 Template Customization

**Customization Options**:
- Edit template content
- Change template design
- Add/remove variables
- Test template
- Preview template

**Template Versioning**:
- Save template versions
- Rollback to previous version
- A/B testing (Phase 2)

---

### 2.5 Notification History

#### 2.5.1 History Features

**View History**:
- All notifications
- Filter by type
- Filter by channel
- Filter by date
- Search notifications

**History Details**:
- Notification content
- Sent timestamp
- Delivery status
- Read status (In-app)
- Click status (Email)

**History Retention**:
- Store for 90 days (default)
- Archive old notifications
- Export history

---

## 3. Notification Workflow

### 3.1 Notification Sending Flow

**Event-Driven Architecture**:
```
Event Occurs (e.g., Order Placed)
  ↓
Event Bus / Message Queue
  ↓
Notification Service
  ↓
Check User Preferences
  ↓
Select Channels
  ↓
Get Template
  ↓
Render Notification
  ↓
Send via Channels (Email, SMS, In-app)
  ↓
Log Notification
  ↓
Update Notification History
```

---

### 3.2 Notification Priority

**Priority Levels**:
- **Critical**: ส่งทันที ทุกช่องทาง (Security alerts, Payment issues)
- **High**: ส่งเร็ว Email + In-app (Order updates, Account changes)
- **Medium**: ส่งปกติ In-app หรือ Email (Product updates, Promotions)
- **Low**: ส่งแบบ digest (Marketing, Newsletters)

**Channel Selection by Priority**:
- Critical: SMS + Email + In-app
- High: Email + In-app
- Medium: In-app (or Email)
- Low: In-app (or Email digest)

---

### 3.3 Notification Delivery

**Delivery Features**:
- Retry mechanism (if delivery fails)
- Fallback channels (if primary channel fails)
- Delivery confirmation
- Delivery status tracking
- Failed delivery handling

**Delivery Status**:
- **Pending**: รอส่ง
- **Sent**: ส่งแล้ว
- **Delivered**: รับแล้ว (Email, SMS)
- **Read**: อ่านแล้ว (In-app)
- **Failed**: ส่งไม่สำเร็จ
- **Bounced**: Email bounced

---

## 4. User Stories

### 4.1 Notification User Stories

**US-NOTIF-001: Receive Order Notification**
- **As a** Buyer
- **I want to** receive notification when order is placed
- **So that** I know my order is confirmed
- **Acceptance Criteria**:
  - Receive email confirmation
  - Receive in-app notification
  - Can view notification in notification center
  - Can click to view order details

**US-NOTIF-002: Manage Notification Preferences**
- **As a** User
- **I want to** manage my notification preferences
- **So that** I only receive notifications I want
- **Acceptance Criteria**:
  - Can enable/disable notification types
  - Can choose channels (Email, SMS, In-app)
  - Can set quiet hours
  - Can choose frequency

---

## 5. Technical Requirements

### 5.1 Notification Service Architecture

**Components**:
- Notification Service (API)
- Template Engine
- Channel Services (Email, SMS, In-app, Push)
- Preference Service
- Notification Queue
- Notification History Service

**Architecture Pattern**:
- Event-driven architecture
- Message queue (RabbitMQ, Kafka, AWS SQS)
- Microservices (Email service, SMS service, In-app service)
- Template engine (Handlebars, Mustache)

---

### 5.2 APIs

**Notification APIs**:
- `GET /api/notifications` - Get notifications
- `GET /api/notifications/{id}` - Get notification details
- `POST /api/notifications/mark-read` - Mark as read
- `POST /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/{id}` - Delete notification
- `GET /api/notifications/preferences` - Get preferences
- `PUT /api/notifications/preferences` - Update preferences

**Internal APIs** (for other modules):
- `POST /api/notifications/send` - Send notification
- `POST /api/notifications/batch-send` - Send batch notifications

---

### 5.3 Integration with Notification Providers

**Email Providers**:
- SendGrid API
- AWS SES API
- Mailgun API

**SMS Providers**:
- Twilio API
- AWS SNS API
- Local SMS gateway

**Push Providers** (Phase 2):
- Firebase Cloud Messaging (FCM)
- Apple Push Notification Service (APNs)

---

## 6. Common Functions Reference

### 6.1 Notification Functions

```typescript
// Notification Sending
sendNotification(userId: string, notification: Notification): Promise<void>
sendBatchNotifications(userIds: string[], notification: Notification): Promise<void>
sendEmailNotification(userId: string, template: string, data: object): Promise<void>
sendSMSNotification(userId: string, message: string): Promise<void>
sendInAppNotification(userId: string, notification: InAppNotification): Promise<void>

// Notification Management
getNotifications(userId: string, filters: NotificationFilters): Promise<Notification[]>
getNotification(id: string): Promise<Notification>
markAsRead(userId: string, notificationId: string): Promise<void>
markAllAsRead(userId: string): Promise<void>
deleteNotification(userId: string, notificationId: string): Promise<void>

// Preferences
getPreferences(userId: string): Promise<NotificationPreferences>
updatePreferences(userId: string, preferences: NotificationPreferences): Promise<void>
resetPreferences(userId: string): Promise<void>

// Templates
getTemplate(templateId: string): Promise<Template>
renderTemplate(templateId: string, data: object): Promise<string>
```

---

## 7. Notification Examples

### 7.1 Order Notifications

**Order Placed (Buyer)**:
- **Email**: "Order #12345 Confirmed - Thank you for your order!"
- **In-app**: "Your order #12345 has been confirmed"
- **SMS**: "Order #12345 confirmed. Total: 5,000 THB"

**New Order (Seller)**:
- **Email**: "New Order #12345 - 5,000 THB"
- **In-app**: "New order received: #12345"
- **SMS**: "New order #12345: 5,000 THB" (if urgent)

---

### 7.2 Account Notifications

**KYC Approved**:
- **Email**: "Your KYC has been approved"
- **In-app**: "KYC approved - You can now use all features"

**Login from New Device**:
- **Email**: "Login from new device detected"
- **SMS**: "Login from new device. If not you, secure your account."

---

## 8. Success Metrics

### 8.1 Notification Metrics

- Delivery rate (Email, SMS, In-app)
- Open rate (Email)
- Read rate (In-app)
- Click-through rate
- Unsubscribe rate
- Notification preference adoption

### 8.2 Engagement Metrics

- Notification engagement rate
- Time to read
- Action taken rate
- Notification effectiveness

---

## 9. Implementation Priority

### Phase 1 (MVP)
- ✅ In-app notifications
- ✅ Email notifications (basic)
- ✅ Notification preferences (basic)
- ✅ Notification templates (basic)
- ✅ Order notifications
- ✅ Account notifications

### Phase 2
- ✅ SMS notifications
- ✅ Advanced preferences
- ✅ Notification history
- ✅ Push notifications (Mobile)
- ✅ Notification analytics

### Phase 3
- ✅ Advanced templates
- ✅ A/B testing
- ✅ Advanced analytics
- ✅ AI-powered notification timing

---

## 10. Dependencies

### 10.1 External Dependencies
- Email service (SendGrid, AWS SES)
- SMS service (Twilio, AWS SNS)
- Push service (FCM, APNs - Phase 2)
- Message queue (RabbitMQ, Kafka, AWS SQS)

### 10.2 Internal Dependencies
- Authentication & Authorization Module
- User Management Module
- Order Module
- Organization Management Module
- All Modules (for triggering notifications)

---

## Appendix

### A. Notification Channel Comparison

| Channel | Speed | Cost | Engagement | Best For |
|---------|-------|------|------------|----------|
| In-app | Fast | Free | High | All notifications |
| Email | Medium | Low | Medium | Detailed info, Attachments |
| SMS | Very Fast | High | Very High | Urgent alerts |
| Push | Very Fast | Free | High | Mobile, Real-time |

### B. Notification Best Practices

1. **Timing**: Send at appropriate times (avoid quiet hours)
2. **Frequency**: Don't overwhelm users
3. **Relevance**: Send only relevant notifications
4. **Clarity**: Clear, concise messages
5. **Action**: Include actionable content
6. **Personalization**: Personalize when possible

### C. References
- Project Scope Document
- Web Search: E-commerce Notification System Architecture
- Web Search: Notification Best Practices
