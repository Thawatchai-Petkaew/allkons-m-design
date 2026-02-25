"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Alert, Badge, Modal } from "@/components";
import { ds } from "@/design-system";
import {
  mockApplications,
  mockShopRelationships,
  applicationStatusLabels,
  shopRelationshipStatusLabels,
  formatThaiDateTime,
  getSlaRemainingDays,
  getShopById,
} from "@/lib/mock/partnerData";
import type { PartnerApplicationStatus, ShopRelationshipStatus } from "@/lib/types/partner";

// Mock: current user's application (first PENDING_ADMIN for demo)
const currentApplication = mockApplications[0];

function getStatusColor(status: PartnerApplicationStatus): string {
  const map: Record<string, string> = {
    PENDING_ADMIN: ds.color.system("warning"),
    PENDING_SHOP_APPROVAL: ds.color.system("info"),
    APPROVED: ds.color.text("brand-default"),
    REJECTED: ds.color.system("error"),
    EXPIRED: ds.color.text("secondary"),
    WITHDRAWN: ds.color.text("secondary"),
  };
  return map[status] || ds.color.text("secondary");
}

function getRelationshipStatusColor(status: ShopRelationshipStatus): string {
  const map: Record<string, string> = {
    PENDING: ds.color.system("warning"),
    ACTIVE: ds.color.text("brand-default"),
    REJECTED: ds.color.system("error"),
    EXPIRED: ds.color.text("secondary"),
    SUSPENDED: ds.color.system("warning"),
    TERMINATED: ds.color.system("error"),
  };
  return map[status] || ds.color.text("secondary");
}

const statusSteps = [
  { key: "PENDING_ADMIN", label: "รอตรวจสอบ", icon: "ri-file-search-line" },
  { key: "PENDING_SHOP_APPROVAL", label: "รออนุมัติร้านค้า", icon: "ri-store-2-line" },
  { key: "APPROVED", label: "อนุมัติแล้ว", icon: "ri-check-double-line" },
];

function getStepIndex(status: PartnerApplicationStatus): number {
  if (status === "PENDING_ADMIN") return 0;
  if (status === "PENDING_SHOP_APPROVAL") return 1;
  if (status === "APPROVED") return 2;
  return -1;
}

export default function PartnerApplicationStatusPage() {
  const router = useRouter();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [application, setApplication] = useState(currentApplication);

  const relationships = mockShopRelationships.filter(
    (r) => r.applicationId === application.id
  );

  const currentStepIndex = getStepIndex(application.status);
  const isTerminal = ["REJECTED", "EXPIRED", "WITHDRAWN"].includes(application.status);
  const canWithdraw = application.status === "PENDING_ADMIN";

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setApplication({ ...application, status: "WITHDRAWN", updatedAt: new Date().toISOString() });
    setShowWithdrawModal(false);
    setIsWithdrawing(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: ds.color.background("secondary"),
        padding: ds.spacing("6"),
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: ds.spacing("6"),
          }}
        >
          <div>
            <h1
              style={{
                fontSize: ds.typography.size("3xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("primary"),
                margin: 0,
                marginBottom: ds.spacing("1"),
              }}
            >
              สถานะใบสมัครพาร์ทเนอร์
            </h1>
            <p
              style={{
                fontSize: ds.typography.size("sm"),
                color: ds.color.text("secondary"),
                margin: 0,
              }}
            >
              หมายเลขใบสมัคร: {application.id}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => router.push("/seller/login")}
          >
            <i className="ri-arrow-left-line" style={{ marginRight: ds.spacing("1") }} />
            กลับ
          </Button>
        </div>

        {/* Terminal Status Alert */}
        {isTerminal && (
          <div style={{ marginBottom: ds.spacing("4") }}>
            {application.status === "REJECTED" && (
              <Alert
                type="error"
                title="ใบสมัครไม่ได้รับการอนุมัติ"
                description={application.rejectionReason || "กรุณาติดต่อทีมสนับสนุน"}
                variant="compact"
              />
            )}
            {application.status === "EXPIRED" && (
              <Alert
                type="warning"
                title="ใบสมัครหมดอายุ"
                description="ร้านค้าไม่ตอบกลับภายในระยะเวลาที่กำหนด"
                variant="compact"
              />
            )}
            {application.status === "WITHDRAWN" && (
              <Alert
                type="info"
                title="ถอนใบสมัครเรียบร้อย"
                description="คุณสามารถส่งใบสมัครใหม่ได้"
                variant="compact"
              />
            )}
          </div>
        )}

        {/* Progress Stepper */}
        {!isTerminal && (
          <div
            style={{
              backgroundColor: ds.color.background("primary"),
              borderRadius: ds.radius("lg"),
              padding: ds.spacing("8"),
              marginBottom: ds.spacing("4"),
              boxShadow: ds.component.modal.shadow(),
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {statusSteps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isUpcoming = index > currentStepIndex;

                return (
                  <React.Fragment key={step.key}>
                    {/* Connector line */}
                    {index > 0 && (
                      <div
                        style={{
                          flex: 1,
                          height: "2px",
                          backgroundColor: isCompleted
                            ? ds.color.text("brand-default")
                            : ds.color.border("primary"),
                          margin: `0 ${ds.spacing("2")}`,
                        }}
                      />
                    )}

                    {/* Step */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: ds.radius("full"),
                          backgroundColor: isCompleted || isCurrent
                            ? ds.color.background("brand-default")
                            : ds.color.background("secondary"),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: isCurrent
                            ? `3px solid var(--brand-m-primary-light-60)`
                            : "none",
                        }}
                      >
                        <i
                          className={isCompleted ? "ri-check-line" : step.icon}
                          style={{
                            fontSize: ds.typography.size("xl"),
                            color: isCompleted || isCurrent
                              ? ds.color.text("white")
                              : ds.color.text("secondary"),
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: ds.typography.size("sm"),
                          fontWeight: isCurrent
                            ? ds.typography.weight("semibold")
                            : ds.typography.weight("regular"),
                          color: isUpcoming
                            ? ds.color.text("disabled")
                            : ds.color.text("primary"),
                          textAlign: "center",
                          maxWidth: "100px",
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Application Details Card */}
        <div
          style={{
            backgroundColor: ds.color.background("primary"),
            borderRadius: ds.radius("lg"),
            padding: ds.spacing("6"),
            marginBottom: ds.spacing("4"),
            boxShadow: ds.component.modal.shadow(),
          }}
        >
          <h3
            style={{
              fontSize: ds.typography.size("lg"),
              fontWeight: ds.typography.weight("semibold"),
              color: ds.color.text("primary"),
              margin: 0,
              marginBottom: ds.spacing("4"),
            }}
          >
            ข้อมูลใบสมัคร
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: ds.spacing("4"),
            }}
          >
            <div>
              <p
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("secondary"),
                  margin: 0,
                  marginBottom: ds.spacing("1"),
                }}
              >
                สถานะ
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ds.spacing("1"),
                  padding: `${ds.spacing("1")} ${ds.spacing("3")}`,
                  borderRadius: ds.radius("full"),
                  backgroundColor: `${getStatusColor(application.status)}20`,
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: ds.radius("full"),
                    backgroundColor: getStatusColor(application.status),
                  }}
                />
                <span
                  style={{
                    fontSize: ds.typography.size("sm"),
                    fontWeight: ds.typography.weight("medium"),
                    color: getStatusColor(application.status),
                  }}
                >
                  {applicationStatusLabels[application.status]}
                </span>
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("secondary"),
                  margin: 0,
                  marginBottom: ds.spacing("1"),
                }}
              >
                วันที่สมัคร
              </p>
              <p
                style={{
                  fontSize: ds.typography.size("md"),
                  fontWeight: ds.typography.weight("medium"),
                  color: ds.color.text("primary"),
                  margin: 0,
                }}
              >
                {formatThaiDateTime(application.submittedAt)}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("secondary"),
                  margin: 0,
                  marginBottom: ds.spacing("1"),
                }}
              >
                พื้นที่
              </p>
              <p
                style={{
                  fontSize: ds.typography.size("md"),
                  fontWeight: ds.typography.weight("medium"),
                  color: ds.color.text("primary"),
                  margin: 0,
                }}
              >
                {application.territory.provinceName}, {application.territory.districtName}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("secondary"),
                  margin: 0,
                  marginBottom: ds.spacing("1"),
                }}
              >
                ร้านค้าที่เลือก
              </p>
              <p
                style={{
                  fontSize: ds.typography.size("md"),
                  fontWeight: ds.typography.weight("medium"),
                  color: ds.color.text("primary"),
                  margin: 0,
                }}
              >
                {application.selectedShopIds.length} ร้านค้า
              </p>
            </div>
          </div>
        </div>

        {/* Shop Relationships (visible when PENDING_SHOP_APPROVAL or later) */}
        {(application.status === "PENDING_SHOP_APPROVAL" || application.status === "APPROVED") &&
          relationships.length > 0 && (
            <div
              style={{
                backgroundColor: ds.color.background("primary"),
                borderRadius: ds.radius("lg"),
                padding: ds.spacing("6"),
                marginBottom: ds.spacing("4"),
                boxShadow: ds.component.modal.shadow(),
              }}
            >
              <h3
                style={{
                  fontSize: ds.typography.size("lg"),
                  fontWeight: ds.typography.weight("semibold"),
                  color: ds.color.text("primary"),
                  margin: 0,
                  marginBottom: ds.spacing("4"),
                }}
              >
                สถานะร้านค้า
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
                {relationships.map((rel) => {
                  const slaRemaining = getSlaRemainingDays(rel.slaDeadline);
                  return (
                    <div
                      key={rel.id}
                      style={{
                        padding: ds.spacing("4"),
                        border: `1px solid ${ds.color.border("primary")}`,
                        borderRadius: ds.radius("md"),
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                          <i
                            className="ri-store-2-line"
                            style={{
                              fontSize: ds.typography.size("xl"),
                              color: ds.color.text("brand-default"),
                            }}
                          />
                          <div>
                            <p
                              style={{
                                fontSize: ds.typography.size("md"),
                                fontWeight: ds.typography.weight("medium"),
                                color: ds.color.text("primary"),
                                margin: 0,
                              }}
                            >
                              {rel.shopName}
                            </p>
                            {rel.status === "PENDING" && (
                              <p
                                style={{
                                  fontSize: ds.typography.size("xs"),
                                  color:
                                    slaRemaining <= 7
                                      ? ds.color.system("error")
                                      : ds.color.text("secondary"),
                                  margin: 0,
                                }}
                              >
                                เหลือเวลา {slaRemaining} วัน
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: ds.spacing("1"),
                            padding: `${ds.spacing("1")} ${ds.spacing("3")}`,
                            borderRadius: ds.radius("full"),
                            backgroundColor: `${getRelationshipStatusColor(rel.status)}20`,
                          }}
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: ds.radius("full"),
                              backgroundColor: getRelationshipStatusColor(rel.status),
                            }}
                          />
                          <span
                            style={{
                              fontSize: ds.typography.size("xs"),
                              fontWeight: ds.typography.weight("medium"),
                              color: getRelationshipStatusColor(rel.status),
                            }}
                          >
                            {shopRelationshipStatusLabels[rel.status]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Actions */}
        <div style={{ display: "flex", gap: ds.spacing("3") }}>
          {canWithdraw && (
            <Button
              variant="secondary"
              onClick={() => setShowWithdrawModal(true)}
              style={{ flex: 1 }}
            >
              <i className="ri-close-line" style={{ marginRight: ds.spacing("1") }} />
              ถอนใบสมัคร
            </Button>
          )}

          {(application.status === "REJECTED" || application.status === "WITHDRAWN") && (
            <Button
              onClick={() => router.push("/seller/partner/register")}
              style={{ flex: 1 }}
            >
              <i className="ri-add-line" style={{ marginRight: ds.spacing("1") }} />
              ส่งใบสมัครใหม่
            </Button>
          )}
        </div>
      </div>

      {/* Withdraw Confirmation Modal */}
      <Modal
        open={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        title="ถอนใบสมัครพาร์ทเนอร์"
        width={420}
        footer={
          <div style={{ display: "flex", gap: ds.spacing("3"), width: "100%" }}>
            <Button
              variant="secondary"
              onClick={() => setShowWithdrawModal(false)}
              style={{ flex: 1 }}
            >
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              onClick={handleWithdraw}
              loading={isWithdrawing}
              style={{ flex: 1, backgroundColor: ds.color.system("error") }}
            >
              ยืนยันถอนใบสมัคร
            </Button>
          </div>
        }
      >
        <div style={{ textAlign: "center", padding: `${ds.spacing("4")} 0` }}>
          <i
            className="ri-error-warning-line"
            style={{
              fontSize: ds.typography.size("5xl"),
              color: ds.color.system("warning"),
              display: "block",
              marginBottom: ds.spacing("4"),
            }}
          />
          <p
            style={{
              fontSize: ds.typography.size("md"),
              color: ds.color.text("primary"),
              margin: 0,
            }}
          >
            คุณต้องการถอนใบสมัครนี้หรือไม่?
          </p>
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("secondary"),
              margin: 0,
              marginTop: ds.spacing("2"),
            }}
          >
            การถอนใบสมัครจะไม่สามารถย้อนกลับได้ คุณสามารถส่งใบสมัครใหม่ได้ภายหลัง
          </p>
        </div>
      </Modal>
    </div>
  );
}
