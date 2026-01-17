# Prisma Quick Start

## ✅ สิ่งที่พร้อมแล้ว

1. ✅ **Prisma Client** - Generated แล้ว
2. ✅ **Prisma Schema** - `prisma/schema.prisma` พร้อม push
3. ✅ **Prisma Config** - `prisma.config.ts` configured แล้ว
4. ✅ **DATABASE_URL** - เพิ่มใน `.env.local` แล้ว

---

## 🚀 ขั้นตอนถัดไป (รันใน Local Terminal)

### Step 1: Push Schema to Database

รันคำสั่งนี้ใน **local terminal** ของคุณ:

```bash
cd /Users/tawatchaipetkaew/design-system-app
npm run db:push
```

หรือ:

```bash
npx prisma db push --accept-data-loss
```

**Expected Output**:
```
✔ Prisma schema loaded from prisma/schema.prisma
✔ The database is now in sync with your schema.

✔ Generated Prisma Client (v7.2.0) to ./node_modules/@prisma/client in XXXms
```

---

### Step 2: Seed Database (Optional)

หลังจาก push สำเร็จ:

```bash
# Install tsx (if not installed)
npm install -D tsx

# Run seed
npm run db:seed
```

---

### Step 3: Verify (Optional)

เปิด Prisma Studio เพื่อดู tables:

```bash
npm run db:studio
```

หรือตรวจสอบใน Supabase Dashboard → Table Editor

---

## 📋 สรุป Configuration

### .env.local
```env
DATABASE_URL="postgresql://postgres:Qq1330400466932@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres"
```

### Files Ready
- ✅ `prisma/schema.prisma` - Database schema
- ✅ `prisma.config.ts` - Prisma 7 configuration
- ✅ `lib/prisma/client.ts` - Prisma Client singleton
- ✅ `prisma/seed.ts` - Seed script template

---

## ⚠️ Troubleshooting

### Error: "Can't reach database server"

**Cause**: Network connection issue หรือ Supabase database offline

**Solution**:
1. ตรวจสอบว่า Supabase project ยัง active อยู่
2. ตรวจสอบ database password ถูกต้อง
3. ตรวจสอบ network connection
4. ลองใช้ Supabase Dashboard → SQL Editor เพื่อทดสอบ connection

---

### Error: "Cannot resolve environment variable: DATABASE_URL"

**Cause**: `.env.local` ไม่มี `DATABASE_URL` หรือไฟล์ไม่ถูก load

**Solution**:
1. ตรวจสอบ `.env.local` มี `DATABASE_URL`
2. รัน `npm run db:push` จาก project root

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

## 📚 Documentation

- `prisma/PRISMA_SETUP.md` - Detailed setup guide
- `prisma/DB_PUSH_GUIDE.md` - Database push guide

---

## 🎯 Next Steps

หลังจาก `db push` สำเร็จ:

1. ✅ **Verify Tables** - ตรวจสอบใน Supabase Dashboard
2. ✅ **Seed Database** - รัน `npm run db:seed`
3. ✅ **Use Prisma Client** - Import `{ prisma }` from `@/lib/prisma/client`

---

**Status**: ✅ **Ready to Push** - รัน `npm run db:push` ใน local terminal
