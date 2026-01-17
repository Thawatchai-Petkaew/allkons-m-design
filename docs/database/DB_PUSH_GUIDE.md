# Database Push Guide

## Quick Start

### Step 1: Add DATABASE_URL to .env.local

เพิ่ม `DATABASE_URL` ใน `.env.local`:

```env
DATABASE_URL="postgresql://postgres:Qq1330400466932@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres"
```

**Important**: ใช้ direct connection (port 5432) สำหรับ `db push` และ `migrate`

---

### Step 2: Push Schema to Database

รันคำสั่งนี้ใน terminal:

```bash
npm run db:push
```

หรือ:

```bash
npx prisma db push --accept-data-loss
```

---

## Connection URLs

### For Migrations/Push (Direct Connection)
```
postgresql://postgres:[PASSWORD]@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres
```
- **Port**: 5432 (direct connection)
- **Use for**: `prisma db push`, `prisma migrate`
- **Required**: ✅

### For Application (Connection Pooling) - Optional
```
postgresql://postgres:[PASSWORD]@db.hpmantglkqwoceteeuno.supabase.co:6543/postgres?pgbouncer=true
```
- **Port**: 6543 (connection pooling)
- **Use for**: Application runtime (if needed)
- **Required**: ❌ (optional)

---

## What `db push` Does

1. ✅ สร้าง tables ตาม Prisma schema
2. ✅ สร้าง indexes และ foreign keys
3. ✅ สร้าง enums
4. ✅ Sync schema กับ database
5. ⚠️ **ไม่สร้าง migration files** (เหมาะสำหรับ development)

---

## Troubleshooting

### Error: "Can't reach database server"

**Cause**: Network issue หรือ Supabase firewall

**Solution**:
1. ตรวจสอบว่า Supabase project ยัง active อยู่
2. ตรวจสอบ database password ถูกต้อง
3. ตรวจสอบ network connection
4. ลองใช้ Supabase Dashboard → SQL Editor เพื่อทดสอบ connection

---

### Error: "Cannot resolve environment variable: DATABASE_URL"

**Cause**: `.env.local` ไม่มี `DATABASE_URL`

**Solution**:
1. สร้าง/แก้ไข `.env.local`
2. เพิ่ม `DATABASE_URL="postgresql://..."`
3. รัน `db push` อีกครั้ง

---

### Error: "Migration required" or "Schema drift detected"

**Cause**: Database มี schema อยู่แล้ว แต่ไม่ตรงกับ Prisma schema

**Solution**:
- ใช้ `--accept-data-loss` flag:
  ```bash
  npx prisma db push --accept-data-loss
  ```
- ⚠️ **Warning**: อาจจะลบข้อมูลที่มีอยู่

---

## Next Steps

หลังจาก `db push` สำเร็จ:

1. ✅ **Seed Database** (optional):
   ```bash
   npm run db:seed
   ```

2. ✅ **Open Prisma Studio** (optional):
   ```bash
   npm run db:studio
   ```

3. ✅ **Verify Tables**:
   - ตรวจสอบใน Supabase Dashboard → Table Editor
   - หรือใช้ Prisma Studio

---

## Current Status

- ✅ Prisma Client: Generated
- ✅ Prisma Config: Ready
- ⚠️ Database Push: **Pending** (รันใน local terminal)

---

**Last Updated**: 2024
