"use client";

import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ds } from "@/design-system";

export interface ShopSetupModalProps {
  /**
   * Whether the modal is open
   */
  open?: boolean;
  /**
   * Callback when modal should close
   */
  onClose?: () => void;
  /**
   * User's full name
   */
  userName?: string;
  /**
   * User's phone number
   */
  phoneNumber?: string;
  /**
   * Callback when shop setup is complete
   * @param shopName - Name of the shop
   * @param subdomain - Subdomain for the shop
   */
  onComplete?: (shopName: string, subdomain: string) => void;
}

export const ShopSetupModal: React.FC<ShopSetupModalProps> = ({
  open = false,
  onClose,
  userName = "",
  phoneNumber = "",
  onComplete,
}) => {
  const [shopName, setShopName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [subdomainError, setSubdomainError] = useState("");
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);

  // Validate subdomain format
  const validateSubdomain = (value: string): boolean => {
    // Subdomain should be lowercase alphanumeric with hyphens, 3-63 characters
    const subdomainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
    return subdomainRegex.test(value);
  };

  // Check if subdomain is available
  const checkSubdomain = async (value: string) => {
    if (!value) {
      setSubdomainError("");
      return;
    }

    if (!validateSubdomain(value)) {
      setSubdomainError("Subdomain ต้องเป็นตัวอักษรภาษาอังกฤษตัวพิมพ์เล็ก ตัวเลข และขีด (-) เท่านั้น");
      return;
    }

    if (value.length < 3) {
      setSubdomainError("Subdomain ต้องมีอย่างน้อย 3 ตัวอักษร");
      return;
    }

    setIsCheckingSubdomain(true);
    setSubdomainError("");

    try {
      const response = await fetch(`/api/shop/check-subdomain?subdomain=${encodeURIComponent(value)}`);
      const data = await response.json();

      if (!data.available) {
        setSubdomainError("Subdomain นี้ถูกใช้งานแล้ว กรุณาเลือกชื่ออื่น");
      } else {
        setSubdomainError("");
      }
    } catch (error) {
      setSubdomainError("เกิดข้อผิดพลาดในการตรวจสอบ Subdomain");
    } finally {
      setIsCheckingSubdomain(false);
    }
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSubdomain(value);
    
    // Debounce subdomain check
    if (value) {
      const timeoutId = setTimeout(() => {
        checkSubdomain(value);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSubdomainError("");
    }
  };

  const canSubmit = 
    shopName.trim().length >= 3 && 
    subdomain.trim().length >= 3 && 
    !subdomainError && 
    !isCheckingSubdomain;

  const handleSubmit = () => {
    if (canSubmit && onComplete) {
      onComplete(shopName.trim(), subdomain.trim());
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ตั้งชื่อร้านค้า"
      width={520}
      maskClosable={false}
      footer={
        <div style={{ display: "flex", gap: ds.spacing("3"), width: "100%" }}>
          <Button
            variant="secondary"
            onClick={onClose}
            style={{ flex: 1 }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{ flex: 1 }}
          >
            สร้างร้านค้า
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("6") }}>
        {/* Welcome Message */}
        <div>
          <p
            style={{
              fontSize: ds.typography.size("md"),
              lineHeight: ds.typography.lineHeight("md"),
              color: ds.color.text("primary"),
              margin: 0,
              marginBottom: ds.spacing("2"),
            }}
          >
            ยินดีต้อนรับ{userName ? ` ${userName}` : ""}!
          </p>
          <p
            style={{
              fontSize: ds.typography.size("sm"),
              lineHeight: ds.typography.lineHeight("sm"),
              color: ds.color.text("secondary"),
              margin: 0,
            }}
          >
            ตั้งชื่อร้านค้าและ URL สำหรับร้านค้าของคุณ
          </p>
        </div>

        {/* Shop Name Input */}
        <Input
          label="ชื่อร้านค้า"
          placeholder="กรอกชื่อร้านค้า"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
          helperText="ชื่อร้านค้าจะแสดงในระบบและให้ลูกค้าเห็น"
        />

        {/* Subdomain Input */}
        <div>
          <Input
            label="URL ร้านค้า"
            placeholder="my-shop"
            value={subdomain}
            onChange={handleSubdomainChange}
            required
            error={subdomainError}
            helperText={
              subdomainError
                ? subdomainError
                : subdomain
                ? isCheckingSubdomain
                  ? "กำลังตรวจสอบ..."
                  : "Subdomain พร้อมใช้งาน"
                : "URL สำหรับร้านค้าของคุณ (เช่น: my-shop.allkons.com)"
            }
            suffix={
              <span
                style={{
                  fontSize: ds.typography.size("sm"),
                  color: ds.color.text("tertiary"),
                  whiteSpace: "nowrap",
                }}
              >
                .allkons.com
              </span>
            }
          />
        </div>

        {/* Info */}
        <div
          style={{
            padding: ds.spacing("4"),
            backgroundColor: ds.color.background("secondary"),
            borderRadius: ds.radius("md"),
          }}
        >
          <p
            style={{
              fontSize: ds.typography.size("xs"),
              lineHeight: ds.typography.lineHeight("xs"),
              color: ds.color.text("tertiary"),
              margin: 0,
            }}
          >
            <strong style={{ color: ds.color.text("secondary") }}>หมายเหตุ:</strong> คุณสามารถเปลี่ยนชื่อร้านค้าและ URL ได้ภายหลังในหน้าตั้งค่า
          </p>
        </div>
      </div>
    </Modal>
  );
};
