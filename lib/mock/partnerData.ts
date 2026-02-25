import type {
  Province,
  District,
  EligibleShop,
  PartnerApplication,
  ShopRelationship,
} from "@/lib/types/partner";

// Mock Provinces
export const mockProvinces: Province[] = [
  { id: "prov-01", name: "กรุงเทพมหานคร", nameEn: "Bangkok" },
  { id: "prov-02", name: "นนทบุรี", nameEn: "Nonthaburi" },
  { id: "prov-03", name: "ปทุมธานี", nameEn: "Pathum Thani" },
  { id: "prov-04", name: "สมุทรปราการ", nameEn: "Samut Prakan" },
  { id: "prov-05", name: "ชลบุรี", nameEn: "Chon Buri" },
  { id: "prov-06", name: "เชียงใหม่", nameEn: "Chiang Mai" },
  { id: "prov-07", name: "นครราชสีมา", nameEn: "Nakhon Ratchasima" },
  { id: "prov-08", name: "ขอนแก่น", nameEn: "Khon Kaen" },
];

// Mock Districts
export const mockDistricts: District[] = [
  // Bangkok
  { id: "dist-01", provinceId: "prov-01", name: "บางรัก", nameEn: "Bang Rak" },
  { id: "dist-02", provinceId: "prov-01", name: "สาทร", nameEn: "Sathon" },
  { id: "dist-03", provinceId: "prov-01", name: "ปทุมวัน", nameEn: "Pathum Wan" },
  { id: "dist-04", provinceId: "prov-01", name: "บางนา", nameEn: "Bang Na" },
  { id: "dist-05", provinceId: "prov-01", name: "ลาดพร้าว", nameEn: "Lat Phrao" },
  // Nonthaburi
  { id: "dist-06", provinceId: "prov-02", name: "ปากเกร็ด", nameEn: "Pak Kret" },
  { id: "dist-07", provinceId: "prov-02", name: "บางบัวทอง", nameEn: "Bang Bua Thong" },
  { id: "dist-08", provinceId: "prov-02", name: "เมืองนนทบุรี", nameEn: "Mueang Nonthaburi" },
  // Pathum Thani
  { id: "dist-09", provinceId: "prov-03", name: "คลองหลวง", nameEn: "Khlong Luang" },
  { id: "dist-10", provinceId: "prov-03", name: "ธัญบุรี", nameEn: "Thanyaburi" },
  // Samut Prakan
  { id: "dist-11", provinceId: "prov-04", name: "บางพลี", nameEn: "Bang Phli" },
  { id: "dist-12", provinceId: "prov-04", name: "เมืองสมุทรปราการ", nameEn: "Mueang Samut Prakan" },
  // Chon Buri
  { id: "dist-13", provinceId: "prov-05", name: "ศรีราชา", nameEn: "Si Racha" },
  { id: "dist-14", provinceId: "prov-05", name: "บางละมุง", nameEn: "Bang Lamung" },
  // Chiang Mai
  { id: "dist-15", provinceId: "prov-06", name: "เมืองเชียงใหม่", nameEn: "Mueang Chiang Mai" },
  { id: "dist-16", provinceId: "prov-06", name: "หางดง", nameEn: "Hang Dong" },
  // Nakhon Ratchasima
  { id: "dist-17", provinceId: "prov-07", name: "เมืองนครราชสีมา", nameEn: "Mueang Nakhon Ratchasima" },
  // Khon Kaen
  { id: "dist-18", provinceId: "prov-08", name: "เมืองขอนแก่น", nameEn: "Mueang Khon Kaen" },
];

// Mock Eligible Shops
export const mockEligibleShops: EligibleShop[] = [
  {
    id: "shop-01",
    name: "ร้านวัสดุก่อสร้าง เจริญกิจ",
    provinceId: "prov-01",
    districtId: "dist-01",
    address: "123 ถ.เจริญกรุง แขวงบางรัก เขตบางรัก กรุงเทพฯ 10500",
    affiliateEligible: true,
    categories: ["ปูนซีเมนต์", "เหล็ก", "อิฐ"],
  },
  {
    id: "shop-02",
    name: "SCG Home Solutions สาทร",
    provinceId: "prov-01",
    districtId: "dist-02",
    address: "456 ถ.สาทร แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120",
    affiliateEligible: true,
    categories: ["หลังคา", "ฝ้าเพดาน", "ผนัง"],
  },
  {
    id: "shop-03",
    name: "บ้านช่าง วัสดุภัณฑ์",
    provinceId: "prov-01",
    districtId: "dist-03",
    address: "789 ถ.พระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330",
    affiliateEligible: true,
    categories: ["สี", "กาว", "อุปกรณ์ช่าง"],
  },
  {
    id: "shop-04",
    name: "โฮมโปร บางนา",
    provinceId: "prov-01",
    districtId: "dist-04",
    address: "111 ถ.บางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
    affiliateEligible: true,
    categories: ["กระเบื้อง", "สุขภัณฑ์", "ประตู-หน้าต่าง"],
  },
  {
    id: "shop-05",
    name: "ร้านช่างทอง วัสดุก่อสร้าง",
    provinceId: "prov-02",
    districtId: "dist-06",
    address: "222 ถ.ติวานนท์ ต.ปากเกร็ด อ.ปากเกร็ด นนทบุรี 11120",
    affiliateEligible: true,
    categories: ["ปูนซีเมนต์", "ทราย", "หิน"],
  },
  {
    id: "shop-06",
    name: "วัสดุภัณฑ์ บางบัวทอง",
    provinceId: "prov-02",
    districtId: "dist-07",
    address: "333 ถ.บางกรวย-ไทรน้อย ต.บางบัวทอง อ.บางบัวทอง นนทบุรี 11110",
    affiliateEligible: true,
    categories: ["ไม้", "แผ่นพื้น", "ฉนวน"],
  },
  {
    id: "shop-07",
    name: "คลองหลวง โฮมมาร์ท",
    provinceId: "prov-03",
    districtId: "dist-09",
    address: "444 ถ.พหลโยธิน ต.คลองหนึ่ง อ.คลองหลวง ปทุมธานี 12120",
    affiliateEligible: true,
    categories: ["ปูนซีเมนต์", "เหล็ก", "หลังคา"],
  },
  {
    id: "shop-08",
    name: "ศรีราชา วัสดุก่อสร้าง",
    provinceId: "prov-05",
    districtId: "dist-13",
    address: "555 ถ.สุขุมวิท ต.ศรีราชา อ.ศรีราชา ชลบุรี 20110",
    affiliateEligible: true,
    categories: ["คอนกรีต", "เหล็ก", "ท่อ"],
  },
  {
    id: "shop-09",
    name: "เชียงใหม่ โฮมเซ็นเตอร์",
    provinceId: "prov-06",
    districtId: "dist-15",
    address: "666 ถ.เชียงใหม่-ลำพูน ต.วัดเกต อ.เมือง เชียงใหม่ 50000",
    affiliateEligible: true,
    categories: ["ไม้", "หลังคา", "สี"],
  },
  {
    id: "shop-10",
    name: "โคราช บิลด์มาร์ท",
    provinceId: "prov-07",
    districtId: "dist-17",
    address: "777 ถ.มิตรภาพ ต.ในเมือง อ.เมือง นครราชสีมา 30000",
    affiliateEligible: true,
    categories: ["ปูนซีเมนต์", "อิฐ", "กระเบื้อง"],
  },
];

// Mock Applications (for admin review)
export const mockApplications: PartnerApplication[] = [
  {
    id: "app-001",
    applicantId: "user-101",
    applicantName: "สมชาย ใจดี",
    applicantEmail: "somchai@example.com",
    applicantPhone: "0891234567",
    kycVerified: true,
    territory: {
      provinceId: "prov-01",
      provinceName: "กรุงเทพมหานคร",
      districtId: "dist-01",
      districtName: "บางรัก",
    },
    selectedShopIds: ["shop-01", "shop-02"],
    status: "PENDING_ADMIN",
    submittedAt: "2026-02-20T10:00:00Z",
    slaDeadline: "2026-03-22T10:00:00Z",
    createdAt: "2026-02-20T10:00:00Z",
    updatedAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "app-002",
    applicantId: "user-102",
    applicantName: "วิภา สุขใจ",
    applicantEmail: "wipa@example.com",
    applicantPhone: "0897654321",
    kycVerified: true,
    territory: {
      provinceId: "prov-02",
      provinceName: "นนทบุรี",
      districtId: "dist-06",
      districtName: "ปากเกร็ด",
    },
    selectedShopIds: ["shop-05"],
    status: "PENDING_ADMIN",
    submittedAt: "2026-02-21T14:30:00Z",
    slaDeadline: "2026-03-23T14:30:00Z",
    createdAt: "2026-02-21T14:30:00Z",
    updatedAt: "2026-02-21T14:30:00Z",
  },
  {
    id: "app-003",
    applicantId: "user-103",
    applicantName: "ประยุทธ์ วงศ์สว่าง",
    applicantEmail: "prayuth@example.com",
    applicantPhone: "0812345678",
    kycVerified: true,
    territory: {
      provinceId: "prov-01",
      provinceName: "กรุงเทพมหานคร",
      districtId: "dist-04",
      districtName: "บางนา",
    },
    selectedShopIds: ["shop-04"],
    status: "PENDING_SHOP_APPROVAL",
    submittedAt: "2026-02-15T09:00:00Z",
    reviewedAt: "2026-02-16T11:00:00Z",
    reviewedBy: "admin-001",
    slaDeadline: "2026-03-18T11:00:00Z",
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-02-16T11:00:00Z",
  },
  {
    id: "app-004",
    applicantId: "user-104",
    applicantName: "นภา ดีงาม",
    applicantEmail: "napa@example.com",
    applicantPhone: "0823456789",
    kycVerified: true,
    territory: {
      provinceId: "prov-05",
      provinceName: "ชลบุรี",
      districtId: "dist-13",
      districtName: "ศรีราชา",
    },
    selectedShopIds: ["shop-08"],
    status: "APPROVED",
    submittedAt: "2026-02-10T08:00:00Z",
    reviewedAt: "2026-02-11T10:00:00Z",
    reviewedBy: "admin-001",
    createdAt: "2026-02-10T08:00:00Z",
    updatedAt: "2026-02-13T15:00:00Z",
  },
  {
    id: "app-005",
    applicantId: "user-105",
    applicantName: "กิตติ แสงทอง",
    applicantEmail: "kitti@example.com",
    applicantPhone: "0834567890",
    kycVerified: true,
    territory: {
      provinceId: "prov-06",
      provinceName: "เชียงใหม่",
      districtId: "dist-15",
      districtName: "เมืองเชียงใหม่",
    },
    selectedShopIds: ["shop-09"],
    status: "REJECTED",
    rejectionReason: "ข้อมูลไม่ครบถ้วน กรุณาติดต่อทีมสนับสนุน",
    submittedAt: "2026-02-05T12:00:00Z",
    reviewedAt: "2026-02-06T09:00:00Z",
    reviewedBy: "admin-001",
    createdAt: "2026-02-05T12:00:00Z",
    updatedAt: "2026-02-06T09:00:00Z",
  },
];

// Mock Shop Relationships
export const mockShopRelationships: ShopRelationship[] = [
  {
    id: "rel-001",
    applicationId: "app-003",
    shopId: "shop-04",
    shopName: "โฮมโปร บางนา",
    partnerId: "user-103",
    partnerName: "ประยุทธ์ วงศ์สว่าง",
    status: "PENDING",
    slaDeadline: "2026-03-18T11:00:00Z",
    createdAt: "2026-02-16T11:00:00Z",
    updatedAt: "2026-02-16T11:00:00Z",
  },
  {
    id: "rel-002",
    applicationId: "app-004",
    shopId: "shop-08",
    shopName: "ศรีราชา วัสดุก่อสร้าง",
    partnerId: "user-104",
    partnerName: "นภา ดีงาม",
    status: "ACTIVE",
    slaDeadline: "2026-03-13T10:00:00Z",
    activatedAt: "2026-02-13T15:00:00Z",
    createdAt: "2026-02-11T10:00:00Z",
    updatedAt: "2026-02-13T15:00:00Z",
  },
  {
    id: "rel-003",
    applicationId: "app-001",
    shopId: "shop-01",
    shopName: "ร้านวัสดุก่อสร้าง เจริญกิจ",
    partnerId: "user-101",
    partnerName: "สมชาย ใจดี",
    status: "PENDING",
    slaDeadline: "2026-03-22T10:00:00Z",
    createdAt: "2026-02-20T10:00:00Z",
    updatedAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "rel-004",
    applicationId: "app-001",
    shopId: "shop-02",
    shopName: "SCG Home Solutions สาทร",
    partnerId: "user-101",
    partnerName: "สมชาย ใจดี",
    status: "PENDING",
    slaDeadline: "2026-03-22T10:00:00Z",
    createdAt: "2026-02-20T10:00:00Z",
    updatedAt: "2026-02-20T10:00:00Z",
  },
];

// Helper: get districts by province
export function getDistrictsByProvince(provinceId: string): District[] {
  return mockDistricts.filter((d) => d.provinceId === provinceId);
}

// Helper: get eligible shops by territory
export function getEligibleShopsByTerritory(
  provinceId: string,
  districtId?: string
): EligibleShop[] {
  return mockEligibleShops.filter(
    (s) =>
      s.affiliateEligible &&
      s.provinceId === provinceId &&
      (!districtId || s.districtId === districtId)
  );
}

// Helper: get shop by id
export function getShopById(shopId: string): EligibleShop | undefined {
  return mockEligibleShops.find((s) => s.id === shopId);
}

// Helper: get application by id
export function getApplicationById(
  applicationId: string
): PartnerApplication | undefined {
  return mockApplications.find((a) => a.id === applicationId);
}

// Helper: get relationships by application
export function getRelationshipsByApplication(
  applicationId: string
): ShopRelationship[] {
  return mockShopRelationships.filter(
    (r) => r.applicationId === applicationId
  );
}

// Helper: get relationships by shop (for shop owner)
export function getRelationshipsByShop(shopId: string): ShopRelationship[] {
  return mockShopRelationships.filter((r) => r.shopId === shopId);
}

// Helper: format date to Thai
export function formatThaiDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Helper: format datetime to Thai
export function formatThaiDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Helper: calculate SLA remaining days
export function getSlaRemainingDays(slaDeadline: string): number {
  const now = new Date();
  const deadline = new Date(slaDeadline);
  const diffMs = deadline.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

// Status label mapping
export const applicationStatusLabels: Record<string, string> = {
  PENDING_ADMIN: "รอตรวจสอบ",
  PENDING_SHOP_APPROVAL: "รออนุมัติจากร้านค้า",
  APPROVED: "อนุมัติแล้ว",
  REJECTED: "ไม่อนุมัติ",
  EXPIRED: "หมดอายุ",
  WITHDRAWN: "ถอนใบสมัคร",
};

// Status color mapping
export const applicationStatusColors: Record<string, string> = {
  PENDING_ADMIN: "warning",
  PENDING_SHOP_APPROVAL: "info",
  APPROVED: "success",
  REJECTED: "error",
  EXPIRED: "default",
  WITHDRAWN: "default",
};

export const shopRelationshipStatusLabels: Record<string, string> = {
  PENDING: "รออนุมัติ",
  ACTIVE: "ใช้งาน",
  REJECTED: "ไม่อนุมัติ",
  EXPIRED: "หมดอายุ",
  SUSPENDED: "ระงับ",
  TERMINATED: "ยุติ",
};
