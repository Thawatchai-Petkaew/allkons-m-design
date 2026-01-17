# Deployment Guide - Vercel

## Prerequisites

- GitHub repository
- Vercel account
- Supabase project
- Database (Prisma Data Platform or Supabase)

## Step 1: Prepare Repository

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/allkons-m.git
   git push -u origin main
   ```

2. **Verify .gitignore**:
   - Ensure `.env.local` is ignored
   - Ensure `node_modules/` is ignored
   - Ensure `.next/` is ignored

## Step 2: Vercel Setup

1. **Import Project**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import from GitHub
   - Select your repository

2. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or leave default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

## Step 3: Environment Variables

Add the following environment variables in Vercel:

### Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://user:password@host:5432/database
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=Allkons M Design
```

### How to Add

1. Go to Project Settings → Environment Variables
2. Add each variable for:
   - **Production**
   - **Preview** (optional)
   - **Development** (optional)

## Step 4: Database Setup

### Option A: Prisma Data Platform

1. Database is already configured
2. Ensure `DATABASE_URL` is set in Vercel

### Option B: Supabase

1. Get connection string from Supabase Dashboard
2. Use direct connection (port 5432) for migrations
3. Set `DATABASE_URL` in Vercel

## Step 5: Build Settings

Vercel will automatically:
- Install dependencies (`npm install`)
- Build the project (`npm run build`)
- Deploy to production

### Custom Build Settings (if needed)

If you need to run Prisma migrations during build:

1. Go to Project Settings → Build & Development Settings
2. Add Build Command:
   ```bash
   npm run db:generate && npm run build
   ```

## Step 6: Deploy

1. **Automatic Deployment**:
   - Push to `main` branch → Auto-deploy to production
   - Push to other branches → Auto-deploy to preview

2. **Manual Deployment**:
   - Go to Deployments tab
   - Click "Redeploy"

## Step 7: Post-Deployment

### 1. Verify Database

```bash
# Check if schema is pushed
npm run db:push

# Or use Prisma Studio
npm run db:studio
```

### 2. Seed Database (if needed)

```bash
npm run db:seed
```

### 3. Test Application

- Visit your Vercel URL
- Test authentication
- Test dashboard

## Troubleshooting

### Build Fails

**Error**: "Cannot find module '@prisma/client'"

**Solution**:
- Add `npm run db:generate` to build command
- Or ensure Prisma Client is generated before build

---

**Error**: "Environment variable not found"

**Solution**:
- Check all required env vars are set in Vercel
- Ensure variable names match exactly

---

### Database Connection Fails

**Error**: "Can't reach database server"

**Solution**:
- Verify `DATABASE_URL` is correct
- Check database firewall settings
- Ensure database is not paused (Supabase)

---

### Authentication Not Working

**Error**: "Supabase Auth error"

**Solution**:
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project is active
- Verify SMS provider is configured (or use Mock OTP)

## Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `DATABASE_URL`
- [ ] `NEXT_PUBLIC_APP_URL`
- [ ] `NEXT_PUBLIC_APP_NAME`

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Authentication works
- [ ] Database queries work
- [ ] Dashboard displays data
- [ ] API routes respond correctly

---

**Last Updated**: 2024
