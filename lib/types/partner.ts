// Partner Registration & Onboarding Types (E-01)

export type PartnerApplicationStatus =
  | "PENDING_ADMIN"
  | "PENDING_SHOP_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "WITHDRAWN";

export type ShopRelationshipStatus =
  | "PENDING"
  | "ACTIVE"
  | "REJECTED"
  | "EXPIRED"
  | "SUSPENDED"
  | "TERMINATED";

export type PartnerTier = "ENTRY" | "SILVER" | "GOLD" | "PLATINUM";

export type PartnerProfileStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED";

export interface Province {
  id: string;
  name: string;
  nameEn: string;
}

export interface District {
  id: string;
  provinceId: string;
  name: string;
  nameEn: string;
}

export interface EligibleShop {
  id: string;
  name: string;
  provinceId: string;
  districtId: string;
  address: string;
  affiliateEligible: boolean;
  logoUrl?: string;
  categories: string[];
}

export interface PartnerApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  kycVerified: boolean;
  territory: {
    provinceId: string;
    provinceName: string;
    districtId: string;
    districtName: string;
  };
  selectedShopIds: string[];
  status: PartnerApplicationStatus;
  consentToken?: string;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  slaDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopRelationship {
  id: string;
  applicationId: string;
  shopId: string;
  shopName: string;
  partnerId: string;
  partnerName: string;
  status: ShopRelationshipStatus;
  rejectionReason?: string;
  slaDeadline: string;
  activatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerProfile {
  id: string;
  accountId: string;
  applicationId: string;
  status: PartnerProfileStatus;
  tier: PartnerTier;
  territory: {
    provinceId: string;
    provinceName: string;
    districtId: string;
    districtName: string;
  };
  teamLeadId?: string;
  commissionRateOverride?: number;
  createdAt: string;
  updatedAt: string;
}
