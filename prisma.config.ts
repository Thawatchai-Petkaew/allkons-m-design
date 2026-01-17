/**
 * Prisma Configuration (Prisma 7+)
 * Connection settings moved from schema.prisma to this config file
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig, env } from 'prisma/config';

// Load .env.local explicitly
config({ path: resolve(process.cwd(), '.env.local') });
// Also load .env as fallback
config({ path: resolve(process.cwd(), '.env') });

// Debug: Log DATABASE_URL (without password)
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL;
  const maskedUrl = url.replace(/:[^:@]+@/, ':****@');
  console.log(`[Prisma Config] DATABASE_URL loaded: ${maskedUrl}`);
} else {
  console.warn('[Prisma Config] ⚠️ DATABASE_URL not found in environment variables');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
    // Optional: For Supabase direct connection (for migrations/push)
    // Connection pooling (port 6543) doesn't support migrations
    // Use direct connection (port 5432) for db push/migrate
    ...(process.env.DATABASE_URL_DIRECT && {
      directUrl: env('DATABASE_URL_DIRECT'),
    }),
  },
});
