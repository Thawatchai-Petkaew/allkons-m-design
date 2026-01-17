# Supabase SMS Provider Setup Guide

## Executive Summary
คู่มือการ Setup SMS Provider ใน Supabase สำหรับการส่ง OTP ผ่าน SMS

**Status**: ⚠️ **Required for Production**

---

## 1. Overview

Supabase ต้องการ SMS Provider (เช่น Twilio, MessageBird, Vonage) เพื่อส่ง OTP ผ่าน SMS จริง

**Options**:
- ✅ **Twilio** (Recommended - ง่าย, มี free trial)
- ⚠️ **MessageBird** (รองรับ)
- ⚠️ **Vonage (Nexmo)** (รองรับ)

---

## 2. Step-by-Step: Twilio Setup

### Step 1: Create Twilio Account

1. ไปที่: https://www.twilio.com/
2. Sign up (มี Free Trial $15.50 credit)
3. Verify phone number และ email
4. Verify Account

---

### Step 2: Get Twilio Credentials

1. ไปที่ Twilio Console: https://console.twilio.com/
2. **Dashboard** → คัดลอก:
   - **Account SID**: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Auth Token**: `your_auth_token_here`

---

### Step 3: Get Twilio Phone Number (สำหรับทดสอบ)

1. ใน Twilio Console → **Phone Numbers** → **Manage** → **Buy a number**
2. เลือกประเทศ: **Thailand**
3. เลือกเบอร์โทรศัพท์ (มี free trial number)
4. **Buy Number**

**Note**: Free trial number จะมีข้อความ "This number is for testing" แต่ทำงานได้ปกติ

---

### Step 4: Enable Phone Auth in Supabase

1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard
2. เลือก project: `hpmantglkqwoceteeuno`
3. ไปที่ **Authentication** → **Providers**
4. Scroll down → Enable **Phone** provider
5. Configure settings:
   - **Enable Phone provider**: ✅ ON
   - **Confirm phone**: ✅ ON (recommended)

---

### Step 5: Configure Twilio in Supabase

1. ใน Supabase Dashboard → **Authentication** → **Providers** → **Phone**
2. ไปที่ **SMS Provider Settings**
3. เลือก **Twilio**
4. กรอกข้อมูล:

```
Twilio Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Twilio Auth Token: your_auth_token_here
Twilio Phone Number: +66XXXXXXXXXX (หรือ +1234567890 สำหรับทดสอบ)
```

5. **Save**

---

### Step 6: Test SMS Sending

1. กลับไปที่ app: http://localhost:3000
2. กรอกเบอร์โทรศัพท์ (เบอร์ที่ verify ใน Twilio account)
3. กด "Send OTP"
4. ตรวจสอบ SMS ที่ได้รับ
5. กรอกรหัส OTP
6. กด "Verify"

---

## 3. Alternative: MessageBird Setup

### Step 1: Create MessageBird Account

1. ไปที่: https://www.messagebird.com/
2. Sign up
3. Verify phone number

### Step 2: Get API Key

1. ไปที่ MessageBird Dashboard
2. **Developers** → **API Access** → **API Keys**
3. Create new API Key
4. คัดลอก **API Key**

### Step 3: Configure in Supabase

1. Supabase Dashboard → **Authentication** → **Providers** → **Phone**
2. เลือก **MessageBird**
3. กรอกข้อมูล:
   ```
   MessageBird API Key: your_api_key_here
   MessageBird Originator: +66XXXXXXXXXX
   ```
4. **Save**

---

## 4. Alternative: Vonage (Nexmo) Setup

### Step 1: Create Vonage Account

1. ไปที่: https://www.vonage.com/
2. Sign up
3. Verify account

### Step 2: Get API Credentials

1. Vonage Dashboard → **Settings** → **API Credentials**
2. คัดลอก:
   - **API Key**
   - **API Secret**

### Step 3: Configure in Supabase

1. Supabase Dashboard → **Authentication** → **Providers** → **Phone**
2. เลือก **Vonage (Nexmo)**
3. กรอกข้อมูล:
   ```
   Vonage API Key: your_api_key_here
   Vonage API Secret: your_api_secret_here
   Vonage From: +66XXXXXXXXXX
   ```
4. **Save**

---

## 5. Testing & Verification

### Test Flow

1. **Send OTP**:
   - ไปที่ `/` (login page)
   - กรอกเบอร์โทรศัพท์
   - กด "Send OTP"
   - ตรวจสอบ SMS

2. **Verify OTP**:
   - กรอกรหัส OTP จาก SMS
   - กด "Verify"
   - ตรวจสอบว่า redirect ถูกต้อง

### Debug

**Check Supabase Logs**:
- Supabase Dashboard → **Logs** → **Auth Logs**
- ตรวจสอบ error messages

**Check Twilio Logs** (ถ้าใช้ Twilio):
- Twilio Console → **Monitor** → **Logs** → **Messaging**
- ตรวจสอบ SMS delivery status

---

## 6. Cost Considerations

### Twilio Pricing (Thailand)

- **SMS to Thailand**: ~฿1.50 - ฿2.50 per message
- **Free Trial**: $15.50 credit (~฿500)
- **Pay-as-you-go**: No monthly fee

### MessageBird Pricing

- **SMS to Thailand**: ~฿1.50 - ฿2.50 per message
- **Free Trial**: Limited credits

### Vonage Pricing

- **SMS to Thailand**: ~฿1.50 - ฿2.50 per message
- **Free Trial**: Limited credits

---

## 7. Production Considerations

### Recommended Setup

1. **Use Twilio** (stable, easy setup)
2. **Verify Phone Numbers** (เพื่อป้องกัน abuse)
3. **Rate Limiting** (Supabase มี built-in rate limiting)
4. **Monitor Costs** (ตั้ง alerts ใน Twilio)

### Security

- ✅ **Never expose** Twilio Auth Token ใน client-side code
- ✅ **Use Supabase** environment variables
- ✅ **Enable phone verification** ใน Supabase
- ✅ **Set up rate limiting**

---

## 8. Troubleshooting

### Problem: "Authentication Error - invalid username"

**Cause**: Twilio credentials ไม่ถูกต้อง หรือยังไม่ configure

**Solution**:
1. ตรวจสอบ Account SID และ Auth Token ใน Twilio Console
2. ตรวจสอบ configuration ใน Supabase Dashboard
3. **Temporary**: ระบบจะใช้ Mock OTP อัตโนมัติ (fallback)

---

### Problem: SMS ไม่ถึง

**Cause**: 
- Phone number format ผิด
- ไม่มี credits ใน Twilio account
- Phone number ไม่ได้ verify ใน Twilio

**Solution**:
1. ตรวจสอบ phone number format (E.164: `+66812345678`)
2. ตรวจสอบ Twilio Console → Balance
3. Verify phone number ใน Twilio account

---

### Problem: Rate Limit Error

**Cause**: ส่ง OTP บ่อยเกินไป

**Solution**:
- รอ 60 วินาที ก่อนส่ง OTP อีกครั้ง
- Supabase มี built-in rate limiting (1 OTP per phone per 60 seconds)

---

## 9. Quick Reference

### Supabase Dashboard URLs

- **Project Dashboard**: https://supabase.com/dashboard/project/hpmantglkqwoceteeuno
- **Auth Settings**: https://supabase.com/dashboard/project/hpmantglkqwoceteeuno/auth/providers
- **Auth Logs**: https://supabase.com/dashboard/project/hpmantglkqwoceteeuno/logs/auth

### Twilio Console URLs

- **Console**: https://console.twilio.com/
- **Phone Numbers**: https://console.twilio.com/us1/develop/phone-numbers/manage/search
- **Messaging Logs**: https://console.twilio.com/us1/monitor/logs/messaging

---

## 10. Summary Checklist

- [ ] Create Twilio/MessageBird/Vonage account
- [ ] Get API credentials (Account SID, Auth Token, etc.)
- [ ] Buy/Get phone number (สำหรับทดสอบ)
- [ ] Enable Phone Auth ใน Supabase Dashboard
- [ ] Configure SMS Provider ใน Supabase (Twilio/MessageBird/Vonage)
- [ ] Test sending OTP
- [ ] Test verifying OTP
- [ ] Monitor costs และ usage

---

## 11. Current Status

**Your Project**:
- ✅ Supabase URL: `https://hpmantglkqwoceteeuno.supabase.co`
- ✅ Supabase Anon Key: Configured
- ⚠️ **SMS Provider**: Not configured yet
- ✅ **Mock OTP**: Working (fallback enabled)

**Next Step**: Configure Twilio (หรือ SMS provider อื่น) ตาม Step 2-5

---

**Last Updated**: 2024
**Status**: ⚠️ SMS Provider configuration required for production
