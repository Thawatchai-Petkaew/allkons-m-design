# Architecture: Supabase + Prisma Hybrid Approach

## ✅ Recommended Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌───────────────┐                  ┌───────────────┐
│   Supabase    │                  │    Prisma     │
│               │                  │               │
│ • Auth        │                  │ • Database    │
│ • Storage     │                  │ • Queries     │
│ • Real-time   │                  │ • Migrations  │
└───────────────┘                  └───────────────┘
        │                                   │
        └─────────────────┬─────────────────┘
                          ▼
              ┌───────────────────────┐
              │   PostgreSQL Database │
              │   (Supabase/Prisma)   │
              └───────────────────────┘
```

---

## ✅ แบ่งหน้าที่ (Recommended)

### Supabase → Auth & Storage
- ✅ **Authentication**: Phone OTP, OAuth, Session Management
- ✅ **File Storage**: Product images, documents, user uploads
- ✅ **Real-time** (optional): Live updates, notifications

### Prisma → Database Operations
- ✅ **Database Queries**: All CRUD operations
- ✅ **Schema Management**: Prisma schema as source of truth
- ✅ **Migrations**: Prisma migrations
- ✅ **Type Safety**: Full TypeScript support

---

## 🎯 ทำไมวิธีนี้ดี?

### 1. Best of Both Worlds

**Supabase Strengths**:
- ✅ Built-in Auth (Phone OTP, OAuth) - ใช้งานง่าย
- ✅ File Storage - Ready to use
- ✅ Real-time - Built-in subscriptions
- ✅ Dashboard - Monitoring & management

**Prisma Strengths**:
- ✅ Type Safety - Full TypeScript support
- ✅ Migration Management - Version controlled schema
- ✅ Developer Experience - Auto-completion, type checking
- ✅ Complex Queries - Easy relations & joins

### 2. Clear Separation of Concerns

```
Auth Flow:
  User → Supabase Auth → Session → Prisma (get user data)

Storage Flow:
  Upload → Supabase Storage → URL → Prisma (save URL)

Database Flow:
  App → Prisma → PostgreSQL → Response
```

### 3. Scalability

- ✅ **Auth**: Supabase handles auth scaling
- ✅ **Storage**: Supabase handles file storage scaling
- ✅ **Database**: Prisma gives you full control over queries & optimization

---

## 📝 Implementation Examples

### Example 1: User Registration Flow

```typescript
// 1. Authenticate with Supabase
import { createClient } from '@/lib/supabase/browserClient';

const supabase = createClient();
const { data: authData, error: authError } = await supabase.auth.signInWithOtp({
  phone: phoneNumber,
});

// 2. After OTP verification, create account with Prisma
import { prisma } from '@/lib/prisma/client';

const account = await prisma.account.create({
  data: {
    userId: authData.user.id, // From Supabase Auth
    appId: 'allkons-m',
    organizeType: 'HEAD_OFFICE',
    taxId: '1234567890123',
    // ... other fields
  },
});
```

### Example 2: Upload Product Image

```typescript
// 1. Upload to Supabase Storage
const { data: uploadData, error: uploadError } = await supabase.storage
  .from('product-images')
  .upload(`${productId}/${fileName}`, file);

// 2. Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl(uploadData.path);

// 3. Save URL to database with Prisma
await prisma.product.update({
  where: { id: productId },
  data: {
    imageUrl: publicUrl,
  },
});
```

### Example 3: Get User with Organizations

```typescript
// Use Prisma for complex queries with relations
import { prisma } from '@/lib/prisma/client';

const account = await prisma.account.findUnique({
  where: { userId: supabaseUserId },
  include: {
    organizations: {
      include: {
        shop: {
          include: {
            branches: true,
          },
        },
        userOrganizations: {
          include: {
            orgRole: {
              include: {
                orgRolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

// Full type safety! ✅
// account.organizations[0].shop.branches[0].name
```

---

## 🔄 Data Flow Examples

### Authentication Flow

```
1. User enters phone number
   ↓
2. Supabase Auth sends OTP
   ↓
3. User enters OTP
   ↓
4. Supabase Auth verifies OTP
   ↓
5. Get Supabase user session
   ↓
6. Use Prisma to get/create account
   ↓
7. Return account with organizations
```

### Product Upload Flow

```
1. User uploads product image
   ↓
2. Upload to Supabase Storage
   ↓
3. Get public URL from Supabase
   ↓
4. Save product with Prisma
   ↓
5. Include image URL in product data
```

### Query Flow

```
1. App needs user data
   ↓
2. Use Prisma to query database
   ↓
3. Prisma returns typed data
   ↓
4. Use in React components
```

---

## ✅ Benefits

### 1. Type Safety
```typescript
// Prisma gives you full type safety
const account = await prisma.account.findUnique({
  where: { userId },
  include: { organizations: true },
});

// TypeScript knows:
// account.organizations[0].name ✅
// account.organizations[0].invalidField ❌ (compile error)
```

### 2. Easy Auth
```typescript
// Supabase Auth is simple
const { data, error } = await supabase.auth.signInWithOtp({
  phone: phoneNumber,
});
```

### 3. File Storage
```typescript
// Supabase Storage is ready to use
await supabase.storage.from('bucket').upload('file.jpg', file);
```

### 4. Migration Management
```bash
# Prisma migrations are version controlled
npx prisma migrate dev --name add_product_table
```

---

## ⚠️ Things to Watch

### 1. User ID Sync

**Important**: Supabase Auth `user.id` ต้อง sync กับ Prisma `accounts.user_id`

```typescript
// After Supabase Auth
const supabaseUser = await supabase.auth.getUser();

// Create/Update account in Prisma
await prisma.account.upsert({
  where: { userId: supabaseUser.data.user.id },
  create: {
    userId: supabaseUser.data.user.id,
    // ... other fields
  },
  update: {
    // ... update fields
  },
});
```

### 2. Session Management

```typescript
// Get session from Supabase
const { data: { session } } = await supabase.auth.getSession();

// Use session.user.id for Prisma queries
const account = await prisma.account.findUnique({
  where: { userId: session.user.id },
});
```

### 3. Error Handling

```typescript
try {
  // Supabase Auth
  const { data, error } = await supabase.auth.signInWithOtp({ phone });
  if (error) throw error;

  // Prisma Query
  const account = await prisma.account.findUnique({
    where: { userId: data.user.id },
  });
} catch (error) {
  // Handle errors from both
}
```

---

## 📋 Current Implementation Status

### ✅ Already Implemented

1. **Supabase Auth**:
   - ✅ Phone OTP authentication
   - ✅ Session management
   - ✅ Mock OTP fallback

2. **Prisma Setup**:
   - ✅ Schema created
   - ✅ Database pushed
   - ✅ Client singleton ready

### 🔄 Next Steps

1. **Integrate Prisma in App**:
   - Replace mock data with Prisma queries
   - Use Prisma for account/organization queries

2. **Sync Auth with Database**:
   - Create account after Supabase Auth
   - Link Supabase user.id with Prisma account.userId

3. **Add Storage** (if needed):
   - Setup Supabase Storage buckets
   - Implement file upload flow

---

## 🎯 Best Practices

### 1. Use Supabase for Auth Only

```typescript
// ✅ Good: Use Supabase for auth
const { data } = await supabase.auth.signInWithOtp({ phone });

// ❌ Avoid: Don't use Supabase for database queries
// const { data } = await supabase.from('accounts').select('*');
```

### 2. Use Prisma for All Database Operations

```typescript
// ✅ Good: Use Prisma for queries
const account = await prisma.account.findUnique({
  where: { userId },
  include: { organizations: true },
});

// ❌ Avoid: Don't mix Supabase and Prisma for same data
```

### 3. Keep Auth Separate from Database

```typescript
// ✅ Good: Auth first, then database
const { data: authData } = await supabase.auth.signInWithOtp({ phone });
const account = await prisma.account.findUnique({
  where: { userId: authData.user.id },
});

// ❌ Avoid: Don't query database before auth
```

---

## 📚 File Structure

```
lib/
├── supabase/
│   ├── browserClient.ts    # Supabase client (Auth/Storage)
│   ├── serverClient.ts     # Supabase server client
│   ├── auth.ts             # Auth utilities
│   └── mock-otp.ts         # Mock OTP fallback
│
└── prisma/
    └── client.ts           # Prisma client (Database)
```

---

## ✅ Conclusion

**Recommended Architecture**: ✅ **Supabase (Auth/Storage) + Prisma (Database)**

**Why**:
- ✅ Best of both worlds
- ✅ Clear separation of concerns
- ✅ Type safety with Prisma
- ✅ Easy auth with Supabase
- ✅ Scalable and maintainable

**Status**: ✅ **Ready to implement**

---

**Last Updated**: 2024
