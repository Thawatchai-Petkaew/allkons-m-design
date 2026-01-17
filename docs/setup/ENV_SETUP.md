# Environment Variables Setup

## ✅ Supabase Credentials Configured

ไฟล์ `.env.local` ถูกสร้างเรียบร้อยแล้วด้วย credentials ต่อไปนี้:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hpmantglkqwoceteeuno.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ru26obkjrRv5c28D_4IP0A_3CGqDuLo
```

---

## 📝 Next Steps

### 1. Verify Environment Variables

ตรวจสอบว่าไฟล์ `.env.local` อยู่ใน root directory และมี credentials ถูกต้อง:

```bash
cat .env.local
```

### 2. Restart Development Server

**สำคัญ**: ต้อง restart development server เพื่อให้ environment variables ถูกโหลด:

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### 3. Enable Phone Auth in Supabase

1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard
2. เลือก project: `hpmantglkqwoceteeuno`
3. ไปที่ **Authentication** → **Providers**
4. Enable **Phone** provider
5. Configure SMS provider (Twilio, MessageBird, etc.) สำหรับ production

### 4. Test Authentication

1. เปิด browser ไปที่: http://localhost:3000/login
2. กรอกเบอร์โทรศัพท์ (เช่น `0812345678`)
3. กด "Send OTP"
4. ตรวจสอบ SMS และกรอกรหัส OTP
5. กด "Verify"

---

## 🔒 Security Notes

- ✅ `.env.local` ถูก ignore โดย `.gitignore` (ไม่ถูก commit)
- ⚠️ `NEXT_PUBLIC_*` variables จะถูก expose ใน browser (safe สำหรับ anon key)
- ⚠️ อย่า commit `.env.local` ไปยัง git repository

---

## 🧪 Testing

### Development Mode

ถ้ายังไม่ configure SMS provider ใน Supabase:
- ระบบจะใช้ Mock OTP (fallback)
- Mock phone numbers:
  - `0812345678` → OTP: `123456`
  - `0823456789` → OTP: `234567`
  - `0834567890` → OTP: `345678`

### Production Mode

เมื่อ configure SMS provider แล้ว:
- ระบบจะส่ง SMS จริงผ่าน Supabase
- OTP จะถูกส่งไปยังเบอร์โทรศัพท์ที่กรอก

---

## 📚 Related Documentation

- `SUPABASE_AUTH_SETUP.md` - คู่มือการ setup Supabase Auth
- `MVP_SETUP.md` - คู่มือการ setup MVP

---

**Status**: ✅ **Configured and Ready**
