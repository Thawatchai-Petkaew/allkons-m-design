"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Select, Tag } from "antd";
import { Button } from "@/components";
import { ds } from "@/design-system";
import {
  mockShopRelationships,
  shopRelationshipStatusLabels,
  formatThaiDateTime,
  getSlaRemainingDays,
} from "@/lib/mock/partnerData";
import type { ShopRelationshipStatus } from "@/lib/types/partner";

const statusFilterOptions = [
  { value: "ALL", label: "ทั้งหมด" },
  { value: "PENDING", label: "รออนุมัติ" },
  { value: "ACTIVE", label: "ใช้งาน" },
  { value: "REJECTED", label: "ไม่อนุมัติ" },
  { value: "EXPIRED", label: "หมดอายุ" },
];

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

export default function PartnerRequestsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Mock: show all relationships for the current shop owner
  const filteredRelationships = useMemo(() => {
    if (statusFilter === "ALL") return mockShopRelationships;
    return mockShopRelationships.filter((r) => r.status === statusFilter);
  }, [statusFilter]);

  const pendingCount = mockShopRelationships.filter((r) => r.status === "PENDING").length;

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
            คำขอเป็นพาร์ทเนอร์
          </h1>
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("secondary"),
              margin: 0,
            }}
          >
            อนุมัติหรือปฏิเสธคำขอจากพาร์ทเนอร์ที่ต้องการขายสินค้าจากร้านของคุณ
          </p>
        </div>
        {pendingCount > 0 && (
          <div
            style={{
              padding: `${ds.spacing("2")} ${ds.spacing("4")}`,
              backgroundColor: "var(--alert-warning-bg-compact)",
              borderRadius: ds.radius("full"),
              display: "flex",
              alignItems: "center",
              gap: ds.spacing("2"),
            }}
          >
            <i className="ri-notification-3-line" style={{ color: ds.color.system("warning"), fontSize: ds.typography.size("lg") }} />
            <span style={{ fontSize: ds.typography.size("sm"), fontWeight: ds.typography.weight("medium"), color: ds.color.system("warning") }}>
              {pendingCount} คำขอรอดำเนินการ
            </span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ds.spacing("3"),
          marginBottom: ds.spacing("4"),
          padding: ds.spacing("4"),
          backgroundColor: ds.color.background("primary"),
          borderRadius: ds.radius("md"),
          border: `1px solid ${ds.color.border("primary")}`,
        }}
      >
        <label
          style={{
            fontSize: ds.typography.size("sm"),
            fontWeight: ds.typography.weight("medium"),
            color: ds.color.text("primary"),
            whiteSpace: "nowrap",
          }}
        >
          กรองสถานะ:
        </label>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: "200px" }}
          options={statusFilterOptions}
        />
        <span
          style={{
            fontSize: ds.typography.size("sm"),
            color: ds.color.text("secondary"),
            marginLeft: "auto",
          }}
        >
          ทั้งหมด {filteredRelationships.length} รายการ
        </span>
      </div>

      {/* Relationship Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("3") }}>
        {filteredRelationships.length === 0 ? (
          <div
            style={{
              padding: ds.spacing("12"),
              textAlign: "center",
              backgroundColor: ds.color.background("primary"),
              borderRadius: ds.radius("lg"),
              border: `1px solid ${ds.color.border("primary")}`,
            }}
          >
            <i
              className="ri-inbox-line"
              style={{
                fontSize: ds.typography.size("5xl"),
                color: ds.color.text("disabled"),
                display: "block",
                marginBottom: ds.spacing("3"),
              }}
            />
            <p style={{ fontSize: ds.typography.size("md"), color: ds.color.text("secondary"), margin: 0 }}>
              ไม่มีคำขอในขณะนี้
            </p>
          </div>
        ) : (
          filteredRelationships.map((rel) => {
            const slaRemaining = getSlaRemainingDays(rel.slaDeadline);
            const isPending = rel.status === "PENDING";

            return (
              <div
                key={rel.id}
                style={{
                  backgroundColor: ds.color.background("primary"),
                  borderRadius: ds.radius("lg"),
                  padding: ds.spacing("5"),
                  border: `1px solid ${isPending ? ds.color.border("brand-default") : ds.color.border("primary")}`,
                  cursor: ds.common.cursor.pointer,
                  transition: `all ${ds.common.animation.fast} ease`,
                }}
                onClick={() => router.push(`/seller/partner/requests/${rel.id}`)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("3"), flex: 1 }}>
                    {/* Avatar placeholder */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: ds.radius("full"),
                        backgroundColor: ds.color.background("brand-default"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i className="ri-user-line" style={{ fontSize: ds.typography.size("xl"), color: ds.color.text("white") }} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2"), marginBottom: ds.spacing("1") }}>
                        <p
                          style={{
                            fontSize: ds.typography.size("md"),
                            fontWeight: ds.typography.weight("semibold"),
                            color: ds.color.text("primary"),
                            margin: 0,
                          }}
                        >
                          {rel.partnerName}
                        </p>
                        <Tag color={getStatusTagColor(rel.status)} style={{ margin: 0 }}>
                          {shopRelationshipStatusLabels[rel.status]}
                        </Tag>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("4") }}>
                        <span style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("secondary") }}>
                          <i className="ri-calendar-line" style={{ marginRight: ds.spacing("1") }} />
                          {formatThaiDateTime(rel.createdAt)}
                        </span>
                        {isPending && (
                          <span
                            style={{
                              fontSize: ds.typography.size("sm"),
                              color: slaRemaining <= 7 ? ds.color.system("error") : ds.color.text("secondary"),
                              fontWeight: slaRemaining <= 7 ? ds.typography.weight("medium") : ds.typography.weight("regular"),
                            }}
                          >
                            <i className="ri-time-line" style={{ marginRight: ds.spacing("1") }} />
                            เหลือ {slaRemaining} วัน
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <i
                    className="ri-arrow-right-s-line"
                    style={{ fontSize: ds.typography.size("xl"), color: ds.color.text("secondary") }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
