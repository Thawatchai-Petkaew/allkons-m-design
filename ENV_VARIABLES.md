# Environment Variables - Allkons M Design

## Required for Production

### Supabase Configuration
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Database Configuration
```env
DATABASE_URL=postgresql://user:password@host:5432/database
# Optional: Direct connection for migrations
DATABASE_URL_DIRECT=postgresql://user:password@host:5432/database
```

### App Configuration
```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=Allkons M Design
```

## Optional

### DBD API (for Juristic Type Checking)
```env
DBD_API_KEY=your_dbd_api_key
```

### Development Only
```env
NODE_ENV=production
```

---

## How to Add in Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select environments:
   - ✅ Production
   - ✅ Preview (optional)
   - ✅ Development (optional)
4. Save

---

## Verification

After deployment, verify:
- [ ] Authentication works
- [ ] Database queries work
- [ ] API routes respond
- [ ] No console errors

---

**Note**: Never commit `.env.local` or `.env` files to Git!
