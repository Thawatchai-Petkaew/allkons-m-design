# 🚀 Deployment Checklist - Allkons M Design

## ✅ Pre-Deployment Checklist

### 1. Code Quality
- [x] All TypeScript errors resolved
- [x] All ESLint warnings resolved
- [x] Design System fully implemented
- [x] No hardcoded values (using design system tokens)
- [x] All components use design system

### 2. Build Configuration
- [x] `package.json` scripts configured
- [x] `next.config.ts` configured
- [x] `vercel.json` configured
- [x] Prisma postinstall script added
- [x] Build command includes Prisma generate

### 3. Environment Variables
Required environment variables for Vercel:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (Required)
DATABASE_URL=postgresql://user:password@host:5432/database

# App Configuration (Required)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=Allkons M Design
```

### 4. Git Repository
- [x] All changes committed
- [x] `.gitignore` configured correctly
- [x] No sensitive files in repository
- [ ] Code pushed to GitHub

### 5. Database Setup
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Database migrations ready (if using migrations)
- [ ] Seed data prepared (if needed)

### 6. Testing
- [ ] Local build successful (`npm run build`)
- [ ] Local production server works (`npm start`)
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] API routes work

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Vercel Setup
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import from GitHub: `Thawatchai-Petkaew/allkons-m-design`
4. Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (includes Prisma generate)
   - Output Directory: `.next`

### Step 3: Environment Variables
Add all required environment variables in Vercel:
- Production
- Preview (optional)
- Development (optional)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Check build logs for errors

### Step 5: Post-Deployment
1. **Database Setup**:
   ```bash
   # Connect to production database and run:
   npm run db:push
   ```

2. **Seed Database** (if needed):
   ```bash
   npm run db:seed
   ```

3. **Verify**:
   - Visit Vercel URL
   - Test authentication
   - Test dashboard
   - Test API routes

---

## 🔍 Build Verification

### Local Build Test
```bash
# Clean install
rm -rf node_modules .next
npm install

# Build
npm run build

# Test production server
npm start
```

### Expected Build Output
- ✅ Prisma Client generated
- ✅ Next.js build successful
- ✅ No TypeScript errors
- ✅ No build warnings

---

## 📋 Environment Variables Checklist

Add these in Vercel Dashboard → Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` (Production)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Production)
- [ ] `DATABASE_URL` (Production)
- [ ] `NEXT_PUBLIC_APP_URL` (Production)
- [ ] `NEXT_PUBLIC_APP_NAME` (Production)

---

## 🐛 Troubleshooting

### Build Fails: Prisma Client Not Found
**Solution**: Build command already includes `prisma generate`

### Build Fails: Environment Variable Missing
**Solution**: Add all required env vars in Vercel dashboard

### Database Connection Fails
**Solution**: 
- Verify `DATABASE_URL` is correct
- Check database firewall settings
- Ensure database is accessible from Vercel IPs

### Authentication Not Working
**Solution**:
- Verify Supabase env vars are correct
- Check Supabase project is active
- Verify SMS provider configured (or Mock OTP will be used)

---

## ✅ Final Checklist

Before deploying:
- [ ] All code committed and pushed
- [ ] Build succeeds locally
- [ ] Environment variables documented
- [ ] Database ready
- [ ] Vercel project configured
- [ ] Environment variables added in Vercel

---

**Last Updated**: 2024
