#!/bin/bash

# Script to push Allkons M project to GitHub
# Repository: https://github.com/Thawatchai-Petkaew/allkons-m-design.git

set -e

echo "🚀 Pushing Allkons M to GitHub..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Set remote URL
echo "🔗 Setting remote URL..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Thawatchai-Petkaew/allkons-m-design.git

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

# Switch to main branch
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🌿 Switching to main branch..."
    git checkout -b main 2>/dev/null || git checkout main
fi

# Add all files
echo "📝 Staging files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit (everything is already committed)"
else
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Allkons M MVP

- Next.js 15 + React 19 + TypeScript
- Supabase Auth (Phone OTP) + Prisma Database
- Seller/Buyer/Admin dashboards
- Design system integration
- Complete documentation"
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
echo ""
echo "⚠️  Note: You may need to authenticate with GitHub"
echo "   If prompted, use your GitHub username and Personal Access Token"
echo ""

git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo "🔗 Repository: https://github.com/Thawatchai-Petkaew/allkons-m-design.git"
