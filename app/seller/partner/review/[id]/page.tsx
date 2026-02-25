"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input as AntInput, Tag } from "antd";
import { Button, Alert, Modal } from "@/components";
import { ds } from "@/design-system";
import {
  mockApplications,
  mockEligibleShops,
  applicationStatusLabels,
  formatThaiDateTime,
  getSlaRemainingDays,
} from "@/lib/mock/partnerData";
import type { PartnerApplicationStatus } from "@/lib/types/partner";

const { TextArea } = AntInput;

function getStatusTagColor(status: PartnerApplicationStatus): string {
  const map: Record<string, string> = {
    PENDING_ADMIN: "orange",
    PENDING_SHOP_APPROVAL: "blue",
    APPROVED: "green",
    REJECTED: "red",
    EXPIRED: "default",
    WITHDRAWN: "default",
  };
  return map[status] || "default";
}

export default function PartnerReviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.id as string;

  const application = mockApplications.find((a) => a.id === applicationId);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<PartnerApplicationStatus>(
    application?.status || "PENDING_ADMIN"
  );

  if (!application) {
    return (
      <div style={{ padding: ds.spacing("6") }}>
        <Alert type="error" title="ไม่พบใบสมัคร" description={`ไม่พบใบสมัครหมายเลข ${applicationId}`} variant="compact" />
        <div style={{ marginTop: ds.spacing("4") }}>
          <Button variant="secondary" onClick={() => router.push("/seller/partner/review")}>
            กลับไปรายการ
          </Button>
        </div>
      </div>
    );
  }

  const selectedShops = application.selectedShopIds
    .map((id) => mockEligibleShops.find((s) => s.id === id))
    .filter(Boolean);

  const canReview = currentStatus === "PENDING_ADMIN";

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStatus("PENDING_SHOP_APPROVAL");
    setShowApproveModal(false);
    setIsProcessing(false);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setRejectionError("กรุณาระบุเหตุผล");
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStatus("REJECTED");
    setShowRejectModal(false);
    setIsProcessing(false);
  };

  return (
    <div style={{ padding: ds.spacing("6") }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: ds.spacing("6"),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("3") }}>
          <button
            onClick={() => router.push("/seller/partner/review")}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: ds.radius("md"),
              border: `1px solid ${ds.color.border("primary")}`,
              backgroundColor: ds.color.background("primary"),
              cursor: ds.common.cursor.pointer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ds.color.text("primary"),
            }}
          >
            <i className="ri-arrow-left-line" style={{ fontSize: ds.typography.size("lg") }} />
          </button>
          <div>
            <h1
              style={{
                fontSize: ds.typography.size("2xl"),
                fontWeight: ds.typography.weight("bold"),
                color: ds.color.text("primary"),
                margin: 0,
              }}
            >
              รายละเอียดใบสมัคร
            </h1>
            <p
              style={{
                fontSize: ds.typography.size("sm"),
                color: ds.color.text("secondary"),
                margin: 0,
              }}
            >
              {application.id}
            </p>
          </div>
        </div>

        <Tag color={getStatusTagColor(currentStatus)} style={{ fontSize: ds.typography.size("sm") }}>
          {applicationStatusLabels[currentStatus]}
        </Tag>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: ds.spacing("4") }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("4") }}>
          {/* Applicant Info */}
          <div
            style={{
              backgroundColor: ds.color.background("primary"),
              borderRadius: ds.radius("lg"),
              padding: ds.spacing("6"),
              border: `1px solid ${ds.color.border("primary")}`,
            }}
          >
            <h3
              style={{
                fontSize: ds.typography.size("lg"),
                fontWeight: ds.typography.weight("semibold"),
                color: ds.color.text("primary"),
                margin: 0,
                marginBottom: ds.spacing("4"),
                display: "flex",
                alignItems: "center",
                gap: ds.spacing("2"),
              }}
            >
              <i className="ri-user-line" style={{ color: ds.color.text("brand-default") }} />
              ข้อมูลผู้สมัคร
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ds.spacing("4") }}>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  ชื่อ-นามสกุล
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {application.applicantName}
                </p>
              </div>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  อีเมล
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {application.applicantEmail}
                </p>
              </div>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  เบอร์โทร
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {application.applicantPhone}
                </p>
              </div>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  KYC
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("1") }}>
                  <i
                    className={application.kycVerified ? "ri-checkbox-circle-fill" : "ri-close-circle-fill"}
                    style={{
                      color: application.kycVerified ? ds.color.text("brand-default") : ds.color.system("error"),
                      fontSize: ds.typography.size("lg"),
                    }}
                  />
                  <span
                    style={{
                      fontSize: ds.typography.size("md"),
                      color: application.kycVerified ? ds.color.text("brand-default") : ds.color.system("error"),
                      fontWeight: ds.typography.weight("medium"),
                    }}
                  >
                    {application.kycVerified ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Territory */}
          <div
            style={{
              backgroundColor: ds.color.background("primary"),
              borderRadius: ds.radius("lg"),
              padding: ds.spacing("6"),
              border: `1px solid ${ds.color.border("primary")}`,
            }}
          >
            <h3
              style={{
                fontSize: ds.typography.size("lg"),
                fontWeight: ds.typography.weight("semibold"),
                color: ds.color.text("primary"),
                margin: 0,
                marginBottom: ds.spacing("4"),
                display: "flex",
                alignItems: "center",
                gap: ds.spacing("2"),
              }}
            >
              <i className="ri-map-pin-line" style={{ color: ds.color.text("brand-default") }} />
              พื้นที่ที่เลือก
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ds.spacing("4") }}>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  จังหวัด
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {application.territory.provinceName}
                </p>
              </div>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  อำเภอ/เขต
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {application.territory.districtName}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Shops */}
          <div
            style={{
              backgroundColor: ds.color.background("primary"),
              borderRadius: ds.radius("lg"),
              padding: ds.spacing("6"),
              border: `1px solid ${ds.color.border("primary")}`,
            }}
          >
            <h3
              style={{
                fontSize: ds.typography.size("lg"),
                fontWeight: ds.typography.weight("semibold"),
                color: ds.color.text("primary"),
                margin: 0,
                marginBottom: ds.spacing("4"),
                display: "flex",
                alignItems: "center",
                gap: ds.spacing("2"),
              }}
            >
              <i className="ri-store-2-line" style={{ color: ds.color.text("brand-default") }} />
              ร้านค้าที่เลือก ({selectedShops.length} ร้าน)
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
              {selectedShops.map((shop) =>
                shop ? (
                  <div
                    key={shop.id}
                    style={{
                      padding: ds.spacing("4"),
                      border: `1px solid ${ds.color.border("primary")}`,
                      borderRadius: ds.radius("md"),
                    }}
                  >
                    <p
                      style={{
                        fontSize: ds.typography.size("md"),
                        fontWeight: ds.typography.weight("medium"),
                        color: ds.color.text("primary"),
                        margin: 0,
                        marginBottom: ds.spacing("1"),
                      }}
                    >
                      {shop.name}
                    </p>
                    <p
                      style={{
                        fontSize: ds.typography.size("sm"),
                        color: ds.color.text("secondary"),
                        margin: 0,
                        marginBottom: ds.spacing("2"),
                      }}
                    >
                      {shop.address}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ds.spacing("1") }}>
                      {shop.categories.map((cat) => (
                        <Tag key={cat} color="green">{cat}</Tag>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div>
          <div
            style={{
              backgroundColor: ds.color.background("primary"),
              borderRadius: ds.radius("lg"),
              padding: ds.spacing("6"),
              border: `1px solid ${ds.color.border("primary")}`,
              position: "sticky",
              top: ds.spacing("6"),
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
              การดำเนินการ
            </h3>

            {/* Timeline info */}
            <div style={{ marginBottom: ds.spacing("6") }}>
              <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
                <div>
                  <p style={{ fontSize: ds.typography.size("xs"), color: ds.color.text("secondary"), margin: 0 }}>
                    วันที่สมัคร
                  </p>
                  <p style={{ fontSize: ds.typography.size("sm"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                    {formatThaiDateTime(application.submittedAt)}
                  </p>
                </div>
                {application.reviewedAt && (
                  <div>
                    <p style={{ fontSize: ds.typography.size("xs"), color: ds.color.text("secondary"), margin: 0 }}>
                      วันที่ตรวจสอบ
                    </p>
                    <p style={{ fontSize: ds.typography.size("sm"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                      {formatThaiDateTime(application.reviewedAt)}
                    </p>
                  </div>
                )}
                {application.slaDeadline && (
                  <div>
                    <p style={{ fontSize: ds.typography.size("xs"), color: ds.color.text("secondary"), margin: 0 }}>
                      SLA
                    </p>
                    <p
                      style={{
                        fontSize: ds.typography.size("sm"),
                        fontWeight: ds.typography.weight("medium"),
                        color: getSlaRemainingDays(application.slaDeadline) <= 7
                          ? ds.color.system("error")
                          : ds.color.text("primary"),
                        margin: 0,
                      }}
                    >
                      เหลือ {getSlaRemainingDays(application.slaDeadline)} วัน
                    </p>
                  </div>
                )}
                <div>
                  <p style={{ fontSize: ds.typography.size("xs"), color: ds.color.text("secondary"), margin: 0 }}>
                    Consent
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("1") }}>
                    <i className="ri-checkbox-circle-fill" style={{ color: ds.color.text("brand-default"), fontSize: ds.typography.size("lg") }} />
                    <span style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("brand-default") }}>PDPA ยินยอมแล้ว</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rejection reason display */}
            {currentStatus === "REJECTED" && application.rejectionReason && (
              <div style={{ marginBottom: ds.spacing("4") }}>
                <Alert type="error" title="เหตุผลที่ไม่อนุมัติ" description={application.rejectionReason} variant="compact" />
              </div>
            )}

            {/* Action Buttons */}
            {canReview && (
              <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
                <Button
                  onClick={() => setShowApproveModal(true)}
                  style={{ width: "100%" }}
                >
                  <i className="ri-check-line" style={{ marginRight: ds.spacing("1") }} />
                  อนุมัติ
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowRejectModal(true)}
                  style={{
                    width: "100%",
                    color: ds.color.system("error"),
                    borderColor: ds.color.system("error"),
                  }}
                >
                  <i className="ri-close-line" style={{ marginRight: ds.spacing("1") }} />
                  ไม่อนุมัติ
                </Button>
              </div>
            )}

            {currentStatus === "PENDING_SHOP_APPROVAL" && (
              <Alert type="info" title="รอร้านค้าตอบกลับ" description="ใบสมัครได้รับการอนุมัติจาก Admin แล้ว กำลังรอร้านค้าตอบกลับ" variant="compact" />
            )}

            {currentStatus === "APPROVED" && (
              <Alert type="success" title="อนุมัติแล้ว" description="ผู้สมัครได้รับการอนุมัติเป็นพาร์ทเนอร์แล้ว" variant="compact" />
            )}
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      <Modal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="อนุมัติใบสมัคร"
        width={420}
        footer={
          <div style={{ display: "flex", gap: ds.spacing("3"), width: "100%" }}>
            <Button variant="secondary" onClick={() => setShowApproveModal(false)} style={{ flex: 1 }}>
              ยกเลิก
            </Button>
            <Button onClick={handleApprove} loading={isProcessing} style={{ flex: 1 }}>
              ยืนยันอนุมัติ
            </Button>
          </div>
        }
      >
        <div style={{ padding: `${ds.spacing("4")} 0`, textAlign: "center" }}>
          <i
            className="ri-checkbox-circle-line"
            style={{
              fontSize: ds.typography.size("5xl"),
              color: ds.color.text("brand-default"),
              display: "block",
              marginBottom: ds.spacing("4"),
            }}
          />
          <p style={{ fontSize: ds.typography.size("md"), color: ds.color.text("primary"), margin: 0 }}>
            อนุมัติใบสมัครของ <strong>{application.applicantName}</strong>?
          </p>
          <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginTop: ds.spacing("2") }}>
            ระบบจะส่งคำขอไปยังร้านค้าที่เลือกเพื่อรออนุมัติ
          </p>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        open={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setRejectionReason("");
          setRejectionError("");
        }}
        title="ไม่อนุมัติใบสมัคร"
        width={480}
        footer={
          <div style={{ display: "flex", gap: ds.spacing("3"), width: "100%" }}>
            <Button
              variant="secondary"
              onClick={() => {
                setShowRejectModal(false);
                setRejectionReason("");
                setRejectionError("");
              }}
              style={{ flex: 1 }}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleReject}
              loading={isProcessing}
              style={{ flex: 1, backgroundColor: ds.color.system("error") }}
            >
              ยืนยันไม่อนุมัติ
            </Button>
          </div>
        }
      >
        <div style={{ padding: `${ds.spacing("2")} 0` }}>
          <p
            style={{
              fontSize: ds.typography.size("md"),
              color: ds.color.text("primary"),
              margin: 0,
              marginBottom: ds.spacing("4"),
            }}
          >
            กรุณาระบุเหตุผลที่ไม่อนุมัติ <span style={{ color: ds.color.system("error") }}>*</span>
          </p>
          <TextArea
            rows={4}
            placeholder="ระบุเหตุผล..."
            value={rejectionReason}
            onChange={(e) => {
              setRejectionReason(e.target.value);
              setRejectionError("");
            }}
            status={rejectionError ? "error" : undefined}
            style={{
              fontSize: ds.typography.size("md"),
              borderRadius: ds.common.borderRadius.input,
            }}
          />
          {rejectionError && (
            <p
              style={{
                fontSize: ds.typography.size("xs"),
                color: ds.color.system("error"),
                margin: `${ds.spacing("1")} 0 0 0`,
              }}
            >
              {rejectionError}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
