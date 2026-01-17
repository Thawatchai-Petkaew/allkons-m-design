# GitHub Setup Guide

## Quick Push to GitHub

### Option 1: Use Script (Recommended)

```bash
cd /Users/tawatchaipetkaew/design-system-app
./scripts/push-to-github.sh
```

### Option 2: Manual Commands

```bash
cd /Users/tawatchaipetkaew/design-system-app

# Set remote URL
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Thawatchai-Petkaew/allkons-m-design.git

# Check current status
git status

# Add all files (if not already added)
git add .

# Commit (if there are changes)
git commit -m "Initial commit: Allkons M Design MVP

- Next.js 15 + React 19 + TypeScript
- Supabase Auth (Phone OTP) + Prisma Database
- Seller/Buyer/Admin dashboards
- Design system integration
- Complete documentation"

# Push to GitHub
git push -u origin main
```

---

## Authentication

### If prompted for credentials:

**Option A: Personal Access Token (Recommended)**

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when prompted

**Option B: SSH (Alternative)**

```bash
# Change remote to SSH
git remote set-url origin git@github.com:Thawatchai-Petkaew/allkons-m-design.git

# Push
git push -u origin main
```

---

## Verify Push

After pushing, verify at:
https://github.com/Thawatchai-Petkaew/allkons-m-design

---

## Next Steps

After successful push:

1. ✅ **Verify Repository**: Check files are uploaded
2. ✅ **Setup Vercel**: Import from GitHub
3. ✅ **Add Environment Variables**: In Vercel dashboard
4. ✅ **Deploy**: First deployment

See [docs/setup/DEPLOYMENT.md](./docs/setup/DEPLOYMENT.md) for Vercel deployment guide.

---

**Last Updated**: 2024
