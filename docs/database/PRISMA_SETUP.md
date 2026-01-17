# Prisma Setup Guide for Allkons M

## Executive Summary
คู่มือการ Setup Prisma ORM สำหรับ Allkons M เพื่อจัดการ Database Schema แบบอัตโนมัติ

**Status**: ✅ **Schema Ready**

---

## 1. Installation

### Step 1: Install Prisma & Dependencies

```bash
npm install prisma @prisma/client
npm install -D dotenv tsx  # dotenv for prisma.config.ts, tsx for seed script
```

หรือถ้ามีปัญหา permission:

```bash
npm install prisma @prisma/client --no-cache
npm install -D dotenv tsx --no-cache
```

---

### Step 2: Prisma 7+ Configuration

**Important**: Prisma 7+ requires connection URL to be in `prisma.config.ts` instead of `schema.prisma`

✅ **Already configured**: `prisma.config.ts` is created at project root
✅ **Schema updated**: `prisma/schema.prisma` no longer contains `url` property

---

## 2. Environment Variables

เพิ่ม `DATABASE_URL` ใน `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hpmantglkqwoceteeuno.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ru26obkjrRv5c28D_4IP0A_3CGqDuLo

# Prisma Database URL (Supabase Direct Connection)
# IMPORTANT: Use direct connection (port 5432) for db push/migrate
# Format: postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
DATABASE_URL="postgresql://postgres:Qq-1330400466932@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres"

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Allkons M
```

**วิธีหา DATABASE_URL**:
1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard
2. เลือก project: `hpmantglkqwoceteeuno`
3. ไปที่ **Settings** → **Database**
4. คัดลอก **Connection String** → **URI** (direct connection, port 5432)
5. แทนที่ `[YOUR-PASSWORD]` ด้วย database password

**Note**: 
- ✅ ใช้ **direct connection (port 5432)** สำหรับ `db push` และ `migrate`
- ❌ **ไม่ใช้** connection pooling (port 6543) สำหรับ migrations

---

## 3. Generate Prisma Client

```bash
npm run db:generate
# หรือ
npx prisma generate
```

**Command นี้จะ**:
- อ่าน `prisma/schema.prisma` และ `prisma.config.ts`
- Generate Prisma Client (`@prisma/client`)
- พร้อมใช้งานใน TypeScript/JavaScript

✅ **Status**: Prisma Client generated successfully!

---

## 4. Push Schema to Database

### Option A: Push (สำหรับ development - ไม่สร้าง migration files)

```bash
npx prisma db push
```

**ใช้เมื่อ**:
- กำลังพัฒนา (development)
- ต้องการ sync schema เร็วๆ
- ไม่ต้องเก็บ migration history

---

### Option B: Migrate (สำหรับ production - สร้าง migration files)

```bash
# Create migration
npx prisma migrate dev --name init

# Apply migration
npx prisma migrate deploy
```

**ใช้เมื่อ**:
- ต้องการเก็บ migration history
- Production environment
- Team collaboration

---

## 5. Seed Database

```bash
npx prisma db seed
```

**หรือรัน seed script โดยตรง**:

```bash
npx tsx prisma/seed.ts
```

**Seed Script จะ**:
- Seed `juristic_types` master data
- Seed `permissions` master data (เพิ่มทีหลัง)

---

## 6. Prisma Studio (Database GUI)

เปิด Prisma Studio เพื่อดู/แก้ไขข้อมูล:

```bash
npx prisma studio
```

จะเปิด browser ที่: http://localhost:5555

---

## 7. Project Structure

```
prisma/
├── schema.prisma          # Prisma schema (database model)
├── seed.ts                # Seed script (master data)
└── migrations/            # Migration files (ถ้าใช้ migrate)
    └── [timestamp]_init/
        └── migration.sql
```

---

## 8. Usage in Code

### Import Prisma Client

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
```

### Example Queries

```typescript
// Find all accounts
const accounts = await prisma.account.findMany();

// Find account by userId
const account = await prisma.account.findUnique({
  where: { userId: 'user-id-here' },
  include: {
    organizations: true,
    juristicType: true,
  },
});

// Create organization
const organization = await prisma.organization.create({
  data: {
    accountId: 'account-id',
    name: 'บริษัทตัวอย่าง จำกัด',
    juristicName: 'บริษัทตัวอย่าง จำกัด',
    juristicTypeId: 'juristic-type-id',
    organizeType: 'HEAD_OFFICE',
    taxId: '1234567890123',
    // ... other fields
  },
});
```

---

## 9. Prisma Client Singleton (Recommended)

สร้าง `lib/prisma/client.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 10. Next Steps

### Immediate

1. ✅ Install Prisma: `npm install prisma @prisma/client`
2. ⚠️ Add `DATABASE_URL` to `.env.local`
3. ⚠️ Generate Prisma Client: `npx prisma generate`
4. ⚠️ Push schema: `npx prisma db push`
5. ⚠️ Seed database: `npx prisma db seed`

### Future

1. ⚠️ Add full permissions seed data
2. ⚠️ Add default roles seed data
3. ⚠️ Create Prisma client singleton
4. ⚠️ Replace raw SQL queries with Prisma

---

## 11. Troubleshooting

### Problem: "Can't reach database server"

**Cause**: `DATABASE_URL` ไม่ถูกต้อง หรือ database password ผิด

**Solution**:
1. ตรวจสอบ `DATABASE_URL` ใน `.env.local`
2. ตรวจสอบ database password ใน Supabase Dashboard
3. ใช้ Connection String จาก Supabase Dashboard

---

### Problem: "Migration failed"

**Cause**: Schema conflict หรือ database มี table อยู่แล้ว

**Solution**:
- ใช้ `npx prisma db push` แทน `migrate` (สำหรับ development)
- หรือ reset database (ระวัง: จะลบข้อมูลทั้งหมด):
  ```bash
  npx prisma migrate reset
  ```

---

### Problem: "Prisma Client not generated"

**Cause**: ยังไม่ได้รัน `npx prisma generate`

**Solution**:
```bash
npx prisma generate
```

---

## 12. Benefits of Prisma

✅ **Type Safety**: TypeScript types generated จาก schema  
✅ **Auto-completion**: IDE support  
✅ **Migration Management**: จัดการ schema changes  
✅ **Seed Scripts**: จัดการ master data  
✅ **Prisma Studio**: GUI สำหรับดู/แก้ไขข้อมูล  
✅ **Better DX**: Developer experience ดีกว่า raw SQL  

---

## 13. Migration from SQL to Prisma

**Files Created**:
- ✅ `prisma/schema.prisma` - Converted from SQL schema
- ✅ `prisma/seed.ts` - Seed script template
- ⚠️ Full permissions seed (ต้องเพิ่ม)

**SQL Files (Keep for Reference)**:
- `research/database/account-org-schema.sql`
- `research/database/role-permission-schema.sql`
- `research/database/role-permission-seed-data.sql`

---

**Last Updated**: 2024
**Status**: ✅ Schema Ready - Pending Installation & Setup
