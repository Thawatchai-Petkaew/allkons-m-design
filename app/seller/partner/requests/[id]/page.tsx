"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input as AntInput, Tag } from "antd";
import { Button, Alert, Modal } from "@/components";
import { ds } from "@/design-system";
import {
  mockShopRelationships,
  mockApplications,
  shopRelationshipStatusLabels,
  formatThaiDateTime,
  getSlaRemainingDays,
} from "@/lib/mock/partnerData";
import type { ShopRelationshipStatus } from "@/lib/types/partner";

const { TextArea } = AntInput;

function getStatusTagColor(status: ShopRelationshipStatus): string {
  const map: Record<string, string> = {
    PENDING: "orange",
    ACTIVE: "green",
    REJECTED: "red",
    EXPIRED: "default",
    SUSPENDED: "orange",
    TERMINATED: "red",
  };
  return map[status] || "default";
}

export default function PartnerRequestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const relationshipId = params.id as string;

  const relationship = mockShopRelationships.find((r) => r.id === relationshipId);
  const application = relationship
    ? mockApplications.find((a) => a.id === relationship.applicationId)
    : null;

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ShopRelationshipStatus>(
    relationship?.status || "PENDING"
  );

  if (!relationship || !application) {
    return (
      <div style={{ padding: ds.spacing("6") }}>
        <Alert
          type="error"
          title="ไม่พบคำขอ"
          description={`ไม่พบคำขอหมายเลข ${relationshipId}`}
          variant="compact"
        />
        <div style={{ marginTop: ds.spacing("4") }}>
          <Button variant="secondary" onClick={() => router.push("/seller/partner/requests")}>
            กลับไปรายการ
          </Button>
        </div>
      </div>
    );
  }

  const canReview = currentStatus === "PENDING";
  const slaRemaining = getSlaRemainingDays(relationship.slaDeadline);

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStatus("ACTIVE");
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
            onClick={() => router.push("/seller/partner/requests")}
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
              รายละเอียดคำขอ
            </h1>
            <p
              style={{
                fontSize: ds.typography.size("sm"),
                color: ds.color.text("secondary"),
                margin: 0,
              }}
            >
              {relationship.id}
            </p>
          </div>
        </div>

        <Tag color={getStatusTagColor(currentStatus)} style={{ fontSize: ds.typography.size("sm") }}>
          {shopRelationshipStatusLabels[currentStatus]}
        </Tag>
      </div>

      {/* Status Alert */}
      {currentStatus === "ACTIVE" && (
        <div style={{ marginBottom: ds.spacing("4") }}>
          <Alert type="success" title="อนุมัติแล้ว" description="พาร์ทเนอร์สามารถจำหน่ายสินค้าจากร้านของคุณได้แล้ว" variant="compact" />
        </div>
      )}
      {currentStatus === "REJECTED" && (
        <div style={{ marginBottom: ds.spacing("4") }}>
          <Alert type="error" title="ไม่อนุมัติ" description="คุณได้ปฏิเสธคำขอนี้แล้ว" variant="compact" />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: ds.spacing("4") }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("4") }}>
          {/* Partner Info */}
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
              ข้อมูลพาร์ทเนอร์
            </h3>

            <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("4"), marginBottom: ds.spacing("4") }}>
              {/* Avatar */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: ds.radius("full"),
                  backgroundColor: ds.color.background("brand-default"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i className="ri-user-line" style={{ fontSize: ds.typography.size("3xl"), color: ds.color.text("white") }} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: ds.typography.size("xl"),
                    fontWeight: ds.typography.weight("semibold"),
                    color: ds.color.text("primary"),
                    margin: 0,
                    marginBottom: ds.spacing("1"),
                  }}
                >
                  {relationship.partnerName}
                </p>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0 }}>
                  {application.applicantEmail}
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ds.spacing("4") }}>
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
                    className="ri-checkbox-circle-fill"
                    style={{ color: ds.color.text("brand-default"), fontSize: ds.typography.size("lg") }}
                  />
                  <span style={{ fontSize: ds.typography.size("md"), color: ds.color.text("brand-default"), fontWeight: ds.typography.weight("medium") }}>
                    ยืนยันแล้ว
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Territory Info */}
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
              พื้นที่ของพาร์ทเนอร์
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

          {/* Application Context */}
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
              <i className="ri-file-list-3-line" style={{ color: ds.color.text("brand-default") }} />
              ข้อมูลใบสมัคร
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ds.spacing("4") }}>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  หมายเลขใบสมัคร
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {application.id}
                </p>
              </div>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  วันที่สมัคร
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {formatThaiDateTime(application.submittedAt)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  ร้านค้าที่สมัครทั้งหมด
                </p>
                <p style={{ fontSize: ds.typography.size("md"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                  {application.selectedShopIds.length} ร้านค้า
                </p>
              </div>
              <div>
                <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginBottom: ds.spacing("1") }}>
                  Admin อนุมัติ
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("1") }}>
                  <i className="ri-checkbox-circle-fill" style={{ color: ds.color.text("brand-default"), fontSize: ds.typography.size("lg") }} />
                  <span style={{ fontSize: ds.typography.size("md"), color: ds.color.text("brand-default") }}>ผ่านแล้ว</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & SLA */}
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

            {/* SLA Info */}
            {canReview && (
              <div
                style={{
                  padding: ds.spacing("4"),
                  backgroundColor: slaRemaining <= 7 ? "var(--alert-error-bg-compact)" : ds.color.background("secondary"),
                  borderRadius: ds.radius("md"),
                  marginBottom: ds.spacing("4"),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2"), marginBottom: ds.spacing("2") }}>
                  <i
                    className="ri-time-line"
                    style={{
                      fontSize: ds.typography.size("xl"),
                      color: slaRemaining <= 7 ? ds.color.system("error") : ds.color.text("secondary"),
                    }}
                  />
                  <span
                    style={{
                      fontSize: ds.typography.size("sm"),
                      fontWeight: ds.typography.weight("semibold"),
                      color: slaRemaining <= 7 ? ds.color.system("error") : ds.color.text("primary"),
                    }}
                  >
                    SLA: เหลือ {slaRemaining} วัน
                  </span>
                </div>
                <p
                  style={{
                    fontSize: ds.typography.size("xs"),
                    color: ds.color.text("secondary"),
                    margin: 0,
                  }}
                >
                  กำหนด: {formatThaiDateTime(relationship.slaDeadline)}
                </p>
              </div>
            )}

            {/* Timeline */}
            <div style={{ marginBottom: ds.spacing("6") }}>
              <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
                <div>
                  <p style={{ fontSize: ds.typography.size("xs"), color: ds.color.text("secondary"), margin: 0 }}>
                    วันที่ส่งคำขอ
                  </p>
                  <p style={{ fontSize: ds.typography.size("sm"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("primary"), margin: 0 }}>
                    {formatThaiDateTime(relationship.createdAt)}
                  </p>
                </div>
                {relationship.activatedAt && (
                  <div>
                    <p style={{ fontSize: ds.typography.size("xs"), color: ds.color.text("secondary"), margin: 0 }}>
                      วันที่อนุมัติ
                    </p>
                    <p style={{ fontSize: ds.typography.size("sm"), fontWeight: ds.typography.weight("medium"), color: ds.color.text("brand-default"), margin: 0 }}>
                      {formatThaiDateTime(relationship.activatedAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>

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
                  ปฏิเสธ
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      <Modal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="อนุมัติคำขอ"
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
            อนุมัติให้ <strong>{relationship.partnerName}</strong> เป็นพาร์ทเนอร์ของร้านคุณ?
          </p>
          <p style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary"), margin: 0, marginTop: ds.spacing("2") }}>
            พาร์ทเนอร์จะสามารถเลือกสินค้าจากร้านของคุณเพื่อเสนอให้ลูกค้าได้
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
        title="ปฏิเสธคำขอ"
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
              ยืนยันปฏิเสธ
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
            กรุณาระบุเหตุผลที่ปฏิเสธ <span style={{ color: ds.color.system("error") }}>*</span>
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
