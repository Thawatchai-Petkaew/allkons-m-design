# Demo Solution Stack: Allkons M

## Executive Summary
เอกสารแนะนำ Solution Stack สำหรับการทำ Demo ที่ Public และ Free สำหรับ Allkons M Marketplace

**⭐ Decision Made - Minimal Stack (4 Services)**:
1. **Vercel** - Frontend & Hosting ✅
2. **Supabase** - Backend & Database (includes Auth + Storage) ✅
3. **Mock OTP** - Self-implemented (no external service) ✅
4. **GitHub Actions** - CI/CD (Automated deployment & testing) ✅

**Note**: GitHub (Code repository)

**Total Cost**: 100% FREE ✅

**Optional Services** (ใช้ตามที่แนะนำในเอกสาร):
- Cloudinary (for advanced image features)
- SMS2PRO (for real SMS OTP)

---

## 1. Recommended Stack Overview

### 1.1 Decision Made - Minimal Stack ⭐

**Essential Services** (4 services - Decision Made):

1. **Frontend & Hosting**: **Vercel** (Free) ✅
   - Hosting Next.js app
   - Auto-deployment from GitHub
   - Free SSL, CDN included

2. **Backend & Database**: **Supabase** (Free Tier) ✅
   - PostgreSQL database (for Master SKU, products, orders)
   - Built-in Auth (for user management)
   - Storage (for images - 1 GB free)
   - All-in-one solution

3. **OTP/SMS Service**: **Mock OTP** (Free - Self-implemented) ✅
   - Use mock OTP for demo/testing
   - No SMS service required
   - Can upgrade to real SMS later

4. **CI/CD**: **GitHub Actions** (Free) ✅
   - Automated testing
   - Automated deployment
   - Build validation
   - Multiple workflows

**Note**: GitHub (Code repository)

**That's it!** Only 4 services needed for demo.

---

### 1.2 Optional Services (Use as Recommended in Document)

**Additional Services** (Optional - ใช้ตามที่แนะนำในเอกสาร):

- **Cloudinary** (Free Tier) - Advanced image optimization (optional, Supabase Storage works too)
- **SMS2PRO** (Free Trial) - Real OTP SMS (optional, use Mock OTP for demo)

---

## 2. Detailed Solutions

### 2.1 Frontend & Hosting

#### 2.1.1 Vercel (Recommended)

**Why Vercel**:
- ✅ Free tier (Hobby plan)
- ✅ Perfect for Next.js (made by Next.js team)
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Preview deployments for PRs
- ✅ Custom domains

**Free Tier Limits**:
- 100 deployments/day
- 45 minutes build time per deployment
- 1 concurrent build
- Unlimited bandwidth (reasonable use)

**Setup Steps**:
1. Create Vercel account
2. Connect GitHub repository
3. Configure build settings
4. Set environment variables
5. Deploy automatically on push

**Alternative**: Netlify (Free tier)
- Similar features
- Good for static sites + serverless functions
- Unlimited deploy previews

---

#### 2.1.2 GitHub (Code Repository)

**Why GitHub**:
- ✅ Free for public repositories
- ✅ GitHub Actions (CI/CD) included
- ✅ Issue tracking
- ✅ Pull requests
- ✅ GitHub Pages (optional)

**Integration**:
1. Connect GitHub repository to Vercel
2. Setup GitHub Actions for CI/CD (automated testing, deployment)
3. Vercel can auto-deploy from GitHub Actions or directly from GitHub

---

### 2.2 CI/CD Solution

#### 2.2.1 GitHub Actions (Decision Made - Primary CI/CD) ✅

**Why GitHub Actions**:
- ✅ Free for public repositories
- ✅ Integrated with GitHub
- ✅ Automated testing
- ✅ Automated deployment
- ✅ Multiple workflows
- ✅ Build validation before deployment
- ✅ Custom workflows

**Setup**:
Create `.github/workflows/deploy.yml`:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Benefits**:
- Run tests before deployment
- Validate build before deploying
- Deploy only if tests pass
- Multiple environments (staging, production)
- PR previews

**Free Tier Limits**:
- 2,000 minutes/month for public repositories
- Unlimited for private repositories (with GitHub Pro)

---

### 2.3 Database Solution

#### 2.3.1 Supabase (Decision Made - Best for Demo) ✅

**Why Supabase**:
- ✅ Free tier with generous limits
- ✅ PostgreSQL database (full SQL)
- ✅ Built-in Auth (can use for OTP)
- ✅ Storage (for images/files)
- ✅ Real-time subscriptions
- ✅ REST API auto-generated
- ✅ Dashboard for data management

**Free Tier Limits**:
- **Database**: 500 MB storage
- **Auth**: 50,000 MAU (Monthly Active Users)
- **Storage**: 1 GB file storage
- **Bandwidth**: 5 GB egress
- **Projects**: 2 active projects
- ⚠️ Projects paused after 1 week inactivity

**Perfect for Demo**:
- Master SKU data storage
- User data
- Order data
- Product images (via Storage)
- Auth system (can integrate with OTP)

**Setup Steps**:
1. Create Supabase account
2. Create new project
3. Get API keys (URL, anon key, service key)
4. Install Supabase client: `npm install @supabase/supabase-js`
5. Configure in Next.js app
6. Set environment variables in Vercel

**Database Schema Example**:
```sql
-- Master SKU Table
CREATE TABLE master_skus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku_code VARCHAR(50) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products Table (Seller's products from Master SKU)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  master_sku_id UUID REFERENCES master_skus(id),
  seller_id UUID REFERENCES users(id),
  price DECIMAL(10,2),
  stock_status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

#### 2.2.2 Aiven (Alternative - PostgreSQL Only)

**Why Aiven**:
- ✅ Free tier (no time limit)
- ✅ 1 GB storage
- ✅ Daily backups
- ✅ Dedicated instance
- ✅ Good for PostgreSQL-only needs

**Limitations**:
- No built-in Auth
- No Storage
- No real-time
- Need to build Auth yourself

**Use Case**: If you only need database and want to build Auth yourself

---

### 2.4 Authentication Solution

#### 2.4.1 Option 1: Supabase Auth (Decision Made - Recommended for Demo) ✅

**Why Supabase Auth**:
- ✅ Built into Supabase (free)
- ✅ Email/Password auth
- ✅ OAuth (Google, Facebook) - free
- ✅ Magic links
- ✅ Can integrate with OTP SMS
- ✅ Session management
- ✅ User management dashboard

**OTP Integration**:
- Use Supabase Auth for user management
- Integrate with SMS service (SMS2PRO) for OTP
- Custom OTP flow:
  1. User requests OTP
  2. Generate OTP code
  3. Send via SMS2PRO
  4. Verify OTP
  5. Create/Login user via Supabase Auth

**Setup**:
```typescript
// Install Supabase
npm install @supabase/supabase-js

// Initialize
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})
```

---

#### 2.4.2 Option 2: Custom Auth (NextAuth.js)

**Why NextAuth.js**:
- ✅ Free and open-source
- ✅ Flexible
- ✅ Multiple providers
- ✅ Session management
- ✅ Can integrate with any database

**Setup**:
```bash
npm install next-auth
```

**Use Case**: If you want full control over Auth flow

---

### 2.5 Image Storage Solution

#### 2.5.1 Supabase Storage (Decision Made - Recommended for Minimal Stack) ✅

**Why Supabase Storage**:
- ✅ Already included in Supabase (no extra service needed)
- ✅ 1 GB free storage
- ✅ Perfect for demo
- ✅ Simple API
- ✅ Integrated with Supabase Auth

**Use Case**: Product images, user avatars, shop banners

**Setup**:
```typescript
// Upload to Supabase Storage
const { data, error } = await supabase.storage
  .from('product-images')
  .upload(`${productId}/${filename}`, file)

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl(`${productId}/${filename}`)
```

**Limitations**:
- No automatic image transformation
- No CDN optimization (but still fast)
- 1 GB limit (enough for demo)

---

#### 2.5.2 Cloudinary (Optional - For Advanced Features)

**Why Cloudinary**:
- ✅ Free tier (forever, no credit card required)
- ✅ 25 monthly credits (generous for demo)
- ✅ Image upload + transformation
- ✅ CDN delivery
- ✅ Automatic optimization
- ✅ Video support (optional)

**Free Tier Limits**:
- 25 monthly credits
- Max image size: 10 MB
- Storage: Limited but enough for demo
- Bandwidth: Limited but enough for demo

**Perfect for Demo**:
- Product images
- User avatars
- Shop banners
- Automatic image optimization
- Responsive images

**Setup Steps**:
1. Create Cloudinary account (free)
2. Get API credentials (cloud_name, api_key, api_secret)
3. Install SDK: `npm install cloudinary`
4. Upload images via API
5. Store Cloudinary URL in database

**Example**:
```typescript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload image
const result = await cloudinary.uploader.upload(imageFile, {
  folder: 'allkons/products'
})
// result.secure_url is the CDN URL
```

**Alternative**: Supabase Storage
- Included in Supabase free tier
- 1 GB storage
- Good for simple file storage
- No image transformation

---

### 2.6 OTP/SMS Service

#### 2.6.1 SMS2PRO (Optional - For Real SMS)

**Why SMS2PRO**:
- ✅ Free trial available
- ✅ Local Thai provider
- ✅ Low cost: ~0.19 THB/message
- ✅ Good for OTP
- ✅ API support
- ✅ Real-time delivery

**Free Trial**:
- Contact for trial credits
- Good for demo/testing

**Setup**:
1. Register SMS2PRO account
2. Get API credentials
3. Integrate OTP flow:
   ```typescript
   // Generate OTP
   const otp = generateOTP() // 6-digit code
   
   // Store OTP in database (with expiration)
   await storeOTP(phoneNumber, otp, expiresIn: 10 minutes)
   
   // Send via SMS2PRO
   await sms2pro.send({
     to: phoneNumber,
     message: `Your OTP code is: ${otp}`
   })
   
   // Verify OTP
   const isValid = await verifyOTP(phoneNumber, userOTP)
   ```

---

#### 2.6.2 Thaibulksms (Alternative)

**Why Thaibulksms**:
- ✅ Free trial ("ทดลองส่งฟรี")
- ✅ Local provider
- ✅ ~0.15 THB/message
- ✅ Well-known in Thailand
- ✅ Good support

**Use Case**: Alternative if SMS2PRO doesn't work

---

#### 2.6.3 Mock OTP (Decision Made - Recommended for Demo) ✅

**Why Mock OTP**:
- ✅ No external service needed
- ✅ No cost
- ✅ Perfect for demo
- ✅ Easy to implement
- ✅ Can upgrade to real SMS later

**Implementation Options**:

**Option 1: Hardcoded OTP (Simplest)**
```typescript
// For demo - always return same OTP
const DEMO_OTP = "123456"

export async function sendOTP(phoneNumber: string) {
  // Store OTP in database with expiration
  await supabase.from('otp_codes').insert({
    phone: phoneNumber,
    code: DEMO_OTP,
    expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  })
  
  // In production, send via SMS
  // For demo, just return success
  return { success: true, message: `Demo OTP: ${DEMO_OTP}` }
}
```

**Option 2: Generate Random OTP (More Realistic)**
```typescript
export async function sendOTP(phoneNumber: string) {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  
  // Store in database
  await supabase.from('otp_codes').insert({
    phone: phoneNumber,
    code: otp,
    expires_at: new Date(Date.now() + 10 * 60 * 1000)
  })
  
  // For demo: log to console or return in response
  console.log(`OTP for ${phoneNumber}: ${otp}`)
  
  // In production, send via SMS service
  return { success: true, otp: otp } // Remove otp in production!
}
```

**Option 3: Email OTP (Using Supabase)**
```typescript
// Use Supabase Auth magic link or email OTP
const { data, error } = await supabase.auth.signInWithOtp({
  email: userEmail,
  options: {
    shouldCreateUser: true
  }
})
```

**Demo UI Suggestion**:
- Show OTP in UI for demo purposes
- Add banner: "Demo Mode - OTP: 123456"
- Or show OTP in console/network response (dev only)

**Migration to Real SMS**:
- When ready, replace mock function with SMS2PRO API
- No changes needed to OTP verification logic

---



---

## 3. Complete Setup Guide

### 3.1 Step-by-Step Setup

#### Step 1: Setup Supabase (Required) ✅
1. Go to https://supabase.com
2. Create account (free)
3. Create new project
4. Wait for project to be ready (~2 minutes)
5. Get credentials:
   - Project URL
   - Anon key
   - Service key (keep secret!)
6. Create database tables (via SQL Editor or Dashboard)

#### Step 2: Setup Vercel (Required) ✅
1. Go to https://vercel.com
2. Sign up with GitHub (connect existing GitHub account)
3. Import existing GitHub repository
4. Get Vercel credentials for GitHub Actions:
   - Vercel Token
   - Vercel Org ID
   - Vercel Project ID
5. Configure environment variables in Vercel (Required only):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `NEXT_PUBLIC_APP_URL`

**Optional Environment Variables** (if using optional services):
   - `CLOUDINARY_CLOUD_NAME` (if using Cloudinary)
   - `CLOUDINARY_API_KEY` (if using Cloudinary)
   - `CLOUDINARY_API_SECRET` (if using Cloudinary)
   - `SMS2PRO_API_KEY` (if using real SMS)
   - `SMS2PRO_API_SECRET` (if using real SMS)

#### Step 3: Setup GitHub Actions (Required) ✅
1. Create `.github/workflows/deploy.yml` in repository
2. Add GitHub Secrets:
   - `VERCEL_TOKEN` (from Vercel)
   - `VERCEL_ORG_ID` (from Vercel)
   - `VERCEL_PROJECT_ID` (from Vercel)
3. Push to GitHub - Actions will run automatically
4. Verify CI/CD pipeline works

#### Step 4: Implement Mock OTP (Required) ✅
1. Create OTP generation function
2. Create OTP storage table in Supabase
3. Create OTP verification function
4. Integrate with registration/login flow

---

### 3.2 Environment Variables

**Create `.env.local`** (for local development):
```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# App (Required)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Cloudinary (if using instead of Supabase Storage)
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Optional: SMS2PRO (if using real SMS instead of Mock OTP)
# SMS2PRO_API_KEY=your_api_key
# SMS2PRO_API_SECRET=your_api_secret
```

**Set in Vercel**:
- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Add only required variables (Supabase + App URL)
- Optional variables only if using those services
- Redeploy

---

## 4. Cost Summary

### 4.1 Decision Made - Minimal Stack Costs (4 Services)

| Service | Cost | Limits | Status |
|---------|------|--------|--------|
| **Vercel** | Free | 100 deployments/day, reasonable bandwidth | ✅ Decision Made |
| **Supabase** | Free | 500 MB DB, 1 GB storage, 50k MAU | ✅ Decision Made |
| **Mock OTP** | Free | No limits (self-implemented) | ✅ Decision Made |
| **GitHub Actions** | Free | 2,000 minutes/month (public repos) | ✅ Decision Made |
| **GitHub** | Free | Code repository | ✅ Using |

**Total Cost for Minimal Demo**: **100% FREE** ✅

---

### 4.2 Optional Services Costs

| Service | Cost | When to Use |
|---------|------|-------------|
| **GitHub** | Free | Code repository + CI/CD (recommended) |
| **Cloudinary** | Free | Advanced image optimization (optional) |
| **SMS2PRO** | Free Trial → ~0.19 THB/SMS | Real OTP SMS (optional) |
| **GitHub Actions** | Free | Automated CI/CD (optional) |

**Total Cost with Optional Services**: **Still FREE** (or minimal for real SMS)

---

### 4.3 Estimated Costs (If Exceed Free Tier or Use Real SMS)

**Scenario**: 1,000 users, 10,000 OTP messages/month
- Vercel: Still free ✅
- Supabase: Still free (under limits) ✅
- Mock OTP: Still free ✅
- **If using real SMS**: SMS2PRO ~1,900 THB/month (10,000 × 0.19 THB)

**Total with Mock OTP**: **FREE** ✅  
**Total with Real SMS**: ~1,900 THB/month

---

## 5. Architecture Diagram

```
### 5.1 Decision Made - Minimal Stack Architecture (4 Services)

```
┌─────────────────┐
│   GitHub Repo   │ ← Using
│  (Code + Git)   │
└────────┬────────┘
         │
         │ Push
         ▼
┌─────────────────┐
│ GitHub Actions  │ ← ✅ Decision Made (Primary CI/CD)
│  ┌───────────┐  │
│  │   Test    │  │ ← Run tests, lint, build
│  └───────────┘  │
│  ┌───────────┐  │
│  │  Deploy   │  │ ← Deploy to Vercel
│  └───────────┘  │
└────────┬────────┘
         │
         │ Deploy (if tests pass)
         ▼
┌─────────────────┐
│     Vercel      │ ← ✅ Decision Made
│  (Next.js App)  │
│  Frontend + API │
└────────┬────────┘
         │
         │ API Calls
         ▼
┌─────────────────┐
│   Supabase      │ ← ✅ Decision Made
│  ┌───────────┐  │
│  │ PostgreSQL│  │ ← Master SKU, Products, Orders
│  │ Database  │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │   Auth    │  │ ← User Authentication
│  └───────────┘  │
│  ┌───────────┐  │
│  │  Storage  │  │ ← Product Images (1 GB free)
│  └───────────┘  │
└─────────────────┘
         │
         │ OTP Request
         ▼
┌─────────────────┐
│   Mock OTP      │ ← ✅ Decision Made
│  (Self-built)   │
│  - Generate OTP│
│  - Store in DB  │
│  - Verify OTP   │
└─────────────────┘
```

### 5.2 With Optional Services (Use as Recommended)

```
┌─────────────────┐
│   GitHub Repo   │ ← Already using
│  (Code + Git)   │
└────────┬────────┘
         │
         │ Auto-deploy
         ▼
┌─────────────────┐
│     Vercel      │ ← ✅ Decision Made
│  (Next.js App)  │
└────────┬────────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌─────────────┐  ┌─────────────┐
│  Supabase   │  │  Cloudinary │ (Optional)
│ (DB + Auth) │  │  (Images)   │
│ + Storage   │  └─────────────┘
└─────────────┘
         │
         │ OTP Request
         ├──────────────┐
         │              │
         ▼              ▼
┌─────────────┐  ┌─────────────┐
│   Mock OTP  │  │  SMS2PRO    │ (Optional - Real SMS)
│ (Self-built)│  │  (OTP SMS)  │
└─────────────┘  └─────────────┘
```
```

---

## 6. Quick Start Checklist

### 6.1 Pre-requisites
- [x] GitHub account (already using) ✅
- [ ] Vercel account (free)
- [ ] Supabase account (free)
- [ ] Node.js 18+ installed
- [ ] Basic knowledge of Next.js

### 6.2 Required Setup Steps (4 Services)
- [ ] **Step 1**: Create Supabase project
- [ ] **Step 2**: Setup database schema (Master SKU, Products, Users, Orders)
- [ ] **Step 3**: Initialize Next.js project (or use existing)
- [ ] **Step 4**: Install Supabase client: `npm install @supabase/supabase-js`
- [ ] **Step 5**: Implement Mock OTP (generate, store, verify)
- [ ] **Step 6**: Setup Vercel project (connect existing GitHub repo)
- [ ] **Step 7**: Get Vercel credentials (Token, Org ID, Project ID)
- [ ] **Step 8**: Setup GitHub Actions (create `.github/workflows/deploy.yml`)
- [ ] **Step 9**: Add GitHub Secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] **Step 10**: Configure environment variables in Vercel (Supabase only)
- [ ] **Step 11**: Push to GitHub - CI/CD will run automatically
- [ ] **Step 12**: Test CI/CD pipeline (tests, build, deploy)
- [ ] **Step 13**: Test OTP flow (mock)
- [ ] **Step 14**: Test image upload (Supabase Storage)
- [ ] **Step 15**: Test database operations

### 6.3 Optional Setup Steps (Use as Recommended)
- [ ] Create Cloudinary account (for advanced image features)
- [ ] Register SMS2PRO (for real SMS OTP)

---

## 7. Troubleshooting

### 7.1 Common Issues

**Issue**: Supabase project paused
- **Solution**: Reactivate in Supabase dashboard (free projects pause after 1 week inactivity)

**Issue**: Vercel build fails
- **Solution**: Check build logs, ensure all environment variables are set

**Issue**: OTP not received
- **Solution**: 
  - Check SMS2PRO account balance
  - Verify phone number format
  - Use mock OTP for testing

**Issue**: Image upload fails
- **Solution**: 
  - Check Supabase Storage bucket exists
  - Verify file size (reasonable limit)
  - Check Supabase Storage permissions
  - If using Cloudinary: Check credentials and file size limits

---

## 8. Migration to Production

### 8.1 When Ready for Production

**Upgrade Considerations**:
- **Vercel**: Upgrade to Pro plan ($20/month) for more builds
- **Supabase**: Upgrade to Pro ($25/month) for more storage, always-on
- **Cloudinary**: Upgrade if exceed free credits
- **SMS**: Continue with SMS2PRO or switch to bulk pricing

**Additional Services**:
- **Monitoring**: Sentry (free tier available)
- **Analytics**: Vercel Analytics (included)
- **Error Tracking**: LogRocket or similar

---

## 9. References

### 9.1 Documentation Links
- **Vercel**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs
- **Cloudinary**: https://cloudinary.com/documentation
- **SMS2PRO**: https://sms2pro.com
- **Next.js**: https://nextjs.org/docs
- **GitHub Actions**: https://docs.github.com/en/actions

### 9.2 Example Projects
- Next.js + Supabase: https://github.com/vercel/next.js/tree/canary/examples/with-supabase
- Next.js + Cloudinary: https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary

---

## 10. Alternative Stacks

### 10.1 Alternative Stack 1: Netlify + Aiven

**Stack**:
- Frontend: Netlify (Free)
- Database: Aiven PostgreSQL (Free)
- Auth: NextAuth.js (Free)
- Images: Cloudinary (Free)
- SMS: SMS2PRO (Free Trial)

**Use Case**: If you prefer Netlify over Vercel

---

### 10.2 Alternative Stack 2: Vercel + PlanetScale

**Stack**:
- Frontend: Vercel (Free)
- Database: PlanetScale (Paid - $29/month)
- Auth: NextAuth.js (Free)
- Images: Cloudinary (Free)
- SMS: SMS2PRO (Free Trial)

**Use Case**: If you need MySQL compatibility

---

## Appendix

### A. Minimal Package.json Dependencies (Required Only)

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "@supabase/auth-helpers-nextjs": "^0.8.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

**Optional Dependencies** (if using):
- `cloudinary`: "^1.41.0" (for Cloudinary image service)
- `next-auth`: "^4.24.0" (if not using Supabase Auth)

### B. Minimal .env.local Template (Required Only)

```env
# Copy this to .env.local and fill in your values

# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# App (Required)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Cloudinary (only if using instead of Supabase Storage)
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=

# Optional: SMS2PRO (only if using real SMS instead of Mock OTP)
# SMS2PRO_API_KEY=
# SMS2PRO_API_SECRET=
```

---

**Last Updated**: 2024
**Status**: Decision Made - Ready for Demo Implementation

**Decision Summary**:
- ✅ **Vercel** - Frontend & Hosting (Decision Made)
- ✅ **Supabase** - Backend & Database (Decision Made)
- ✅ **Mock OTP** - OTP Service (Decision Made)
- ✅ **GitHub Actions** - CI/CD (Decision Made - Primary)
- ✅ **GitHub** - Code repository (Using)

**Optional Services** (Use as recommended in document):
- Cloudinary (for advanced image features)
- SMS2PRO (for real SMS OTP)
