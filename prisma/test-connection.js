/**
 * Test Prisma Database Connection
 * 
 * Usage:
 *   DATABASE_URL="postgresql://postgres:PASSWORD@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres" node prisma/test-connection.js
 */

const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');
const { resolve } = require('path');

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

// Prisma 7+: Connection URL is loaded from prisma.config.ts
// PrismaClient will read DATABASE_URL from environment automatically
// If using engine type "client", must provide adapter or accelerateUrl
// But in test, we can use the default which reads from config
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

async function testConnection() {
  console.log('🔍 Testing Prisma database connection...\n');

  // Mask password in URL for logging
  const url = process.env.DATABASE_URL || 'NOT SET';
  const maskedUrl = url.replace(/:[^:@]+@/, ':****@');
  console.log(`📡 Connection String: ${maskedUrl}\n`);

  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL is not set!');
    console.log('\n💡 Please set DATABASE_URL in .env.local:');
    console.log('   DATABASE_URL="postgresql://postgres:PASSWORD@db.hpmantglkqwoceteeuno.supabase.co:5432/postgres"');
    process.exit(1);
  }

  try {
    console.log('⏳ Attempting to connect...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Connection successful!\n');

    // Test query
    console.log('⏳ Testing query...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query successful!');
    console.log('   Result:', result);

    console.log('\n🎉 Database connection is working correctly!');
    
  } catch (error) {
    console.error('\n❌ Connection failed!\n');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'P1001') {
      console.log('\n💡 Troubleshooting P1001:');
      console.log('   1. Check if Supabase project is active');
      console.log('   2. Verify database password is correct');
      console.log('   3. Check network connection');
      console.log('   4. Verify connection string format');
      console.log('   5. See prisma/TROUBLESHOOTING.md for more details');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\n👋 Disconnected from database');
  }
}

testConnection();
