# Prisma Connection Troubleshooting

## Error: P1001: Can't reach database server

### Possible Causes & Solutions

---

## 1. Connection String Format

### ✅ Correct Format (Direct Connection)

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres"
```

### ❌ Common Mistakes

- Missing `postgresql://` prefix
- Wrong port (should be `5432` for direct connection)
- Special characters in password not URL-encoded
- Extra query parameters that break connection

---

## 2. Supabase Database Status

### Check Database Status

1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard
2. เลือก project: `hpmantglkqwoceteeuno`
3. ตรวจสอบว่า project ยัง **active** อยู่
4. ตรวจสอบว่า database **paused** หรือไม่ (ถ้า paused ต้อง resume)

### Resume Paused Database

ถ้า database paused:
1. ไปที่ Supabase Dashboard
2. Click **Resume** หรือ **Restore**

---

## 3. Connection String from Supabase

### Get Correct Connection String

1. ไปที่ Supabase Dashboard → **Settings** → **Database**
2. ไปที่ **Connection string** section
3. เลือก **URI** tab (ไม่ใช่ Connection pooling)
4. Copy connection string
5. แทนที่ `[YOUR-PASSWORD]` ด้วย database password

**Format**:
```
postgresql://postgres:[YOUR-PASSWORD]@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres
```

---

## 4. Password Special Characters

### URL Encode Password

ถ้า password มี special characters (เช่น `@`, `#`, `%`, `&`), ต้อง URL-encode:

**Example**:
- Password: `Qq-1330400466932` ✅ (no special chars, OK)
- Password: `P@ss#123` → `P%40ss%23123` (URL-encoded)

**Online Tool**: https://www.urlencoder.org/

---

## 5. Network/Firewall Issues

### Check Network Connection

```bash
# Test connection with psql (if installed)
psql "postgresql://postgres:YOUR_PASSWORD@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres"

# Or test with telnet
telnet db.hpmantglkqwoceteeuno.supabase.co 5432
```

### Firewall/VPN

- ตรวจสอบว่า firewall ไม่ได้ block port 5432
- ถ้าใช้ VPN, ลองปิด VPN แล้วลองใหม่
- บาง corporate network อาจ block database connections

---

## 6. Try Alternative Connection Methods

### Option A: Use Supabase Connection Pooling (for app, not migrations)

```env
# For application runtime (NOT for migrations)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.hpmantglkqwoceteeuno.supabase.co:6543/postgres?pgbouncer=true"
```

**Note**: Connection pooling (port 6543) **ไม่สามารถใช้** สำหรับ `prisma db push` หรือ `prisma migrate`

---

### Option B: Use Supabase SQL Editor

1. ไปที่ Supabase Dashboard → **SQL Editor**
2. รัน SQL commands โดยตรง
3. ใช้ Prisma schema SQL (จาก `research/database/account-org-schema.sql`)

---

## 7. Verify Connection String

### Test Connection String

สร้างไฟล์ `test-connection.js`:

```javascript
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ Connection successful!');
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

test();
```

รัน:
```bash
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres" node test-connection.js
```

---

## 8. Prisma Config Issues

### Check prisma.config.ts

ตรวจสอบว่า `prisma.config.ts` load `.env.local` ถูกต้อง:

```typescript
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local explicitly
config({ path: resolve(process.cwd(), '.env.local') });
```

### Verify Environment Variable

```bash
# Check if DATABASE_URL is loaded
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.DATABASE_URL)"
```

---

## 9. Supabase Project Settings

### Check Project Settings

1. ไปที่ Supabase Dashboard → **Settings** → **General**
2. ตรวจสอบว่า project **region** ถูกต้อง
3. ตรวจสอบว่า **database** ยัง active อยู่

### Check Database Settings

1. ไปที่ **Settings** → **Database**
2. ตรวจสอบ **Connection string** format
3. ตรวจสอบ **Connection pooling** settings

---

## 10. Alternative: Use Supabase CLI

### Install Supabase CLI

```bash
npm install -g supabase
```

### Link Project

```bash
supabase link --project-ref hpmantglkqwoceteeuno
```

### Push Schema via Supabase

```bash
# Use Supabase migration instead
supabase db push
```

---

## Quick Checklist

- [ ] Connection string format ถูกต้อง (postgresql://...)
- [ ] Port ถูกต้อง (5432 สำหรับ direct connection)
- [ ] Password ถูกต้อง (ไม่มี typo)
- [ ] Supabase project ยัง active อยู่
- [ ] Database ไม่ได้ paused
- [ ] Network connection ทำงาน
- [ ] Firewall/VPN ไม่ได้ block
- [ ] `.env.local` มี `DATABASE_URL`
- [ ] `prisma.config.ts` load `.env.local` ถูกต้อง

---

## Still Not Working?

1. **Verify in Supabase Dashboard**:
   - ไปที่ SQL Editor
   - ลองรัน query: `SELECT 1;`
   - ถ้าได้ = database ทำงาน, ปัญหาอยู่ที่ connection string
   - ถ้าไม่ได้ = database มีปัญหา

2. **Contact Supabase Support**:
   - ตรวจสอบ Supabase status: https://status.supabase.com/
   - ตรวจสอบ project logs ใน Dashboard

3. **Use Alternative Method**:
   - ใช้ Supabase SQL Editor เพื่อรัน SQL schema โดยตรง
   - หรือใช้ Supabase CLI

---

**Last Updated**: 2024
