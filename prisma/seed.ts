/**
 * Prisma Seed Script
 * Seeds master data (juristic_types, permissions) and creates default roles
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ============================================================================
  // SEED JURISTIC TYPES
  // ============================================================================
  console.log('📋 Seeding juristic types...');

  const juristicTypes = [
    {
      code: 'REGISTERED_INDIVIDUAL',
      prefixTh: null,
      suffixTh: null,
      descriptionTh: 'ร้านค้าจดทะเบียนพาณิชย์',
      prefixEn: null,
      suffixEn: null,
      descriptionEn: 'Registered Individual Merchant',
      displayOrder: 1,
    },
    {
      code: 'PUBLIC_LIMITED_COMPANY',
      prefixTh: 'บริษัท',
      suffixTh: 'จำกัด (มหาชน)',
      descriptionTh: 'บริษัทมหาชนจำกัด (บลจ.)',
      prefixEn: 'Public Company',
      suffixEn: 'Limited',
      descriptionEn: 'Public Company Limited (PLC)',
      displayOrder: 2,
    },
    {
      code: 'LIMITED_COMPANY',
      prefixTh: 'บริษัท',
      suffixTh: 'จำกัด',
      descriptionTh: 'บริษัทจำกัด (บลจ.)',
      prefixEn: 'Company',
      suffixEn: 'Limited',
      descriptionEn: 'Limited Company (Co., Ltd.)',
      displayOrder: 3,
    },
    {
      code: 'LIMITED_PARTNERSHIP',
      prefixTh: 'ห้างหุ้นส่วนจำกัด',
      suffixTh: null,
      descriptionTh: 'ห้างหุ้นส่วนจำกัด (หจก.)',
      prefixEn: 'Limited Partnership',
      suffixEn: null,
      descriptionEn: 'Limited Partnership (Ltd. P.)',
      displayOrder: 4,
    },
    {
      code: 'GENERAL_PARTNERSHIP',
      prefixTh: 'ห้างหุ้นส่วนสามัญ',
      suffixTh: null,
      descriptionTh: 'ห้างหุ้นส่วนสามัญ (หสม.)',
      prefixEn: 'Ordinary Partnership',
      suffixEn: null,
      descriptionEn: 'Ordinary Partnership (O.P.)',
      displayOrder: 5,
    },
    {
      code: 'OTHER',
      prefixTh: null,
      suffixTh: null,
      descriptionTh: 'อื่นๆ',
      prefixEn: 'Other',
      suffixEn: null,
      descriptionEn: 'Other',
      displayOrder: 99,
    },
  ];

  for (const type of juristicTypes) {
    await prisma.juristicType.upsert({
      where: { code: type.code },
      update: type,
      create: type,
    });
  }

  console.log(`✅ Seeded ${juristicTypes.length} juristic types`);

  // ============================================================================
  // SEED PERMISSIONS (Basic - will be expanded in role-permission-seed.ts)
  // ============================================================================
  console.log('🔐 Seeding permissions...');

  // Note: Full permissions list will be seeded separately
  // This is just a placeholder - full permissions should be added from role-permission-schema.sql

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
