/**
 * Prisma Configuration (Prisma 7+)
 * Connection settings moved from schema.prisma to this config file
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from 'prisma/config';

// Load .env.local explicitly
config({ path: resolve(process.cwd(), '.env.local') });
// Also load .env as fallback
config({ path: resolve(process.cwd(), '.env') });

// For Prisma generate, DATABASE_URL is not required
// Only needed for migrations and db push
const databaseUrl = process.env.DATABASE_URL;
const databaseUrlDirect = process.env.DATABASE_URL_DIRECT;

// Debug: Log DATABASE_URL (without password) - only if exists
if (databaseUrl) {
  const maskedUrl = databaseUrl.replace(/:[^:@]+@/, ':****@');
  console.log(`[Prisma Config] DATABASE_URL loaded: ${maskedUrl}`);
} else if (process.env.VERCEL || process.env.CI) {
  // In Vercel/CI, DATABASE_URL might not be available during generate
  // This is OK - generate doesn't need a connection
  console.log('[Prisma Config] DATABASE_URL not set (OK for generate)');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Use placeholder URL for generate if DATABASE_URL is not set
    // This allows Prisma Client to generate without a real connection
    url: databaseUrl || 'postgresql://user:password@localhost:5432/db',
    // Optional: For Supabase direct connection (for migrations/push)
    ...(databaseUrlDirect && {
      directUrl: databaseUrlDirect,
    }),
  },
});
