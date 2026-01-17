# Allkons M - B2B Pre-Construction Materials Marketplace

A modern B2B-first marketplace platform for pre-construction materials, featuring multi-store capabilities, personalized recommendations, and comprehensive team management.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Ant Design 5
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: Supabase Auth (Phone OTP)
- **ORM**: Prisma 7
- **Deployment**: Vercel
- **Storage**: Supabase Storage (ready)

## 📋 Features

### MVP (Current)
- ✅ Phone OTP Authentication (Supabase + Mock OTP fallback)
- ✅ Seller Dashboard (Organization, Shop, Branches)
- ✅ Buyer Marketplace (Guest Mode)
- ✅ Admin Dashboard
- ✅ Multi-store concept (subdomain-based)
- ✅ Two-layer permission system (Organization + Application level)

### Planned
- Product Management
- Order Management
- Team Management
- KYC/KYB Management
- Payment & Invoicing
- Shipping & Delivery

## 🏗️ Architecture

**Hybrid Approach**: Supabase (Auth/Storage) + Prisma (Database)

- **Supabase**: Authentication, File Storage, Real-time
- **Prisma**: Database queries, Schema management, Migrations

See [docs/architecture/ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md) for details.

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Prisma Data Platform or Supabase)

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database (optional)
npm run db:seed
```

### Environment Variables

Create `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Prisma Database URL
DATABASE_URL=postgresql://user:password@host:5432/database

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Allkons M
```

## 📚 Documentation

- **[Setup Guide](./docs/setup/README.md)** - Initial setup and configuration
- **[Architecture](./docs/architecture/ARCHITECTURE.md)** - System architecture
- **[Database](./docs/database/README.md)** - Database schema and setup
- **[Research](./app/research/README.md)** - Project research and analysis

## 🧪 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:migrate   # Create migration
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── app/               # Application pages
│   │   ├── (admin)/      # Admin routes
│   │   ├── (buyer)/      # Buyer routes
│   │   └── (seller)/     # Seller routes
│   ├── lib/               # Utilities
│   │   ├── supabase/     # Supabase clients
│   └── research/          # Research documentation
├── components/            # React components
├── design-system/         # Design system tokens
├── docs/                  # Documentation
│   ├── setup/            # Setup guides
│   ├── architecture/    # Architecture docs
│   └── database/        # Database docs
├── lib/                   # Shared libraries
│   ├── auth/             # Auth utilities
│   └── prisma/           # Prisma client
├── prisma/                # Prisma schema
└── public/                # Static assets
```

## 🚢 Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

See [docs/setup/DEPLOYMENT.md](./docs/setup/DEPLOYMENT.md) for detailed deployment guide.

## 📝 License

Private - Allkons M

## 👥 Team

- Product Owner / Business Analyst
- Development Team

---

**Status**: 🚧 MVP Development
