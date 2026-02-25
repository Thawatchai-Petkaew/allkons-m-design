"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Select, Table, Tag } from "antd";
import { Button } from "@/components";
import { ds } from "@/design-system";
import {
  mockApplications,
  applicationStatusLabels,
  formatThaiDateTime,
  getSlaRemainingDays,
} from "@/lib/mock/partnerData";
import type { PartnerApplication, PartnerApplicationStatus } from "@/lib/types/partner";

const statusFilterOptions = [
  { value: "ALL", label: "ทั้งหมด" },
  { value: "PENDING_ADMIN", label: "รอตรวจสอบ" },
  { value: "PENDING_SHOP_APPROVAL", label: "รออนุมัติร้านค้า" },
  { value: "APPROVED", label: "อนุมัติแล้ว" },
  { value: "REJECTED", label: "ไม่อนุมัติ" },
  { value: "EXPIRED", label: "หมดอายุ" },
  { value: "WITHDRAWN", label: "ถอนใบสมัคร" },
];

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

export default function PartnerReviewQueuePage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredApplications = useMemo(() => {
    if (statusFilter === "ALL") return mockApplications;
    return mockApplications.filter((a) => a.status === statusFilter);
  }, [statusFilter]);

  const columns = [
    {
      title: "ผู้สมัคร",
      dataIndex: "applicantName",
      key: "applicantName",
      render: (name: string, record: PartnerApplication) => (
        <div>
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              fontWeight: ds.typography.weight("medium"),
              color: ds.color.text("primary"),
              margin: 0,
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontSize: ds.typography.size("xs"),
              color: ds.color.text("secondary"),
              margin: 0,
            }}
          >
            {record.applicantPhone}
          </p>
        </div>
      ),
    },
    {
      title: "พื้นที่",
      key: "territory",
      render: (_: unknown, record: PartnerApplication) => (
        <span style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("primary") }}>
          {record.territory.provinceName}, {record.territory.districtName}
        </span>
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status: PartnerApplicationStatus) => (
        <Tag color={getStatusTagColor(status)}>
          {applicationStatusLabels[status]}
        </Tag>
      ),
    },
    {
      title: "วันที่สมัคร",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (date: string) => (
        <span style={{ fontSize: ds.typography.size("sm"), color: ds.color.text("primary") }}>
          {formatThaiDateTime(date)}
        </span>
      ),
      sorter: (a: PartnerApplication, b: PartnerApplication) =>
        new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime(),
      defaultSortOrder: "ascend" as const,
    },
    {
      title: "SLA",
      key: "sla",
      render: (_: unknown, record: PartnerApplication) => {
        if (!record.slaDeadline) return <span>—</span>;
        const remaining = getSlaRemainingDays(record.slaDeadline);
        return (
          <span
            style={{
              fontSize: ds.typography.size("sm"),
              fontWeight: ds.typography.weight("medium"),
              color: remaining <= 7 ? ds.color.system("error") : ds.color.text("primary"),
            }}
          >
            {remaining} วัน
          </span>
        );
      },
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (_: unknown, record: PartnerApplication) => (
        <Button
          variant="secondary"
          onClick={() => router.push(`/seller/partner/review/${record.id}`)}
          style={{ fontSize: ds.typography.size("sm") }}
        >
          ดูรายละเอียด
        </Button>
      ),
    },
  ];

  // Summary counts
  const pendingCount = mockApplications.filter((a) => a.status === "PENDING_ADMIN").length;
  const pendingShopCount = mockApplications.filter((a) => a.status === "PENDING_SHOP_APPROVAL").length;
  const approvedCount = mockApplications.filter((a) => a.status === "APPROVED").length;

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
            ตรวจสอบใบสมัครพาร์ทเนอร์
          </h1>
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("secondary"),
              margin: 0,
            }}
          >
            จัดการใบสมัครพาร์ทเนอร์ทั้งหมด
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: ds.spacing("4"),
          marginBottom: ds.spacing("6"),
        }}
      >
        <div
          style={{
            padding: ds.spacing("4"),
            backgroundColor: ds.color.background("primary"),
            borderRadius: ds.radius("md"),
            border: `1px solid ${ds.color.border("primary")}`,
          }}
        >
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("secondary"),
              margin: 0,
              marginBottom: ds.spacing("1"),
            }}
          >
            รอตรวจสอบ
          </p>
          <p
            style={{
              fontSize: ds.typography.size("3xl"),
              fontWeight: ds.typography.weight("bold"),
              color: ds.color.system("warning"),
              margin: 0,
            }}
          >
            {pendingCount}
          </p>
        </div>
        <div
          style={{
            padding: ds.spacing("4"),
            backgroundColor: ds.color.background("primary"),
            borderRadius: ds.radius("md"),
            border: `1px solid ${ds.color.border("primary")}`,
          }}
        >
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("secondary"),
              margin: 0,
              marginBottom: ds.spacing("1"),
            }}
          >
            รออนุมัติร้านค้า
          </p>
          <p
            style={{
              fontSize: ds.typography.size("3xl"),
              fontWeight: ds.typography.weight("bold"),
              color: ds.color.system("info"),
              margin: 0,
            }}
          >
            {pendingShopCount}
          </p>
        </div>
        <div
          style={{
            padding: ds.spacing("4"),
            backgroundColor: ds.color.background("primary"),
            borderRadius: ds.radius("md"),
            border: `1px solid ${ds.color.border("primary")}`,
          }}
        >
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              color: ds.color.text("secondary"),
              margin: 0,
              marginBottom: ds.spacing("1"),
            }}
          >
            อนุมัติแล้ว
          </p>
          <p
            style={{
              fontSize: ds.typography.size("3xl"),
              fontWeight: ds.typography.weight("bold"),
              color: ds.color.text("brand-default"),
              margin: 0,
            }}
          >
            {approvedCount}
          </p>
        </div>
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
          ทั้งหมด {filteredApplications.length} รายการ
        </span>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: ds.color.background("primary"),
          borderRadius: ds.radius("md"),
          border: `1px solid ${ds.color.border("primary")}`,
          overflow: "hidden",
        }}
      >
        <Table
          dataSource={filteredApplications}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 20,
            showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`,
          }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
