"use client";

import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Checkbox } from "./ui/Checkbox";
import { ds } from "@/design-system";

export interface ConsentModalProps {
  /**
   * Whether the modal is open
   */
  open?: boolean;
  /**
   * Callback when modal should close
   */
  onClose?: () => void;
  /**
   * Callback when user agrees to terms
   * @param marketingConsent - Whether user agreed to marketing communications
   */
  onAgree?: (marketingConsent: boolean) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  open = false,
  onClose,
  onAgree,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);

  const canProceed = termsAccepted && privacyAccepted;

  const handleAgree = () => {
    if (canProceed && onAgree) {
      onAgree(marketingConsent);
      // Reset state after closing
      setTermsAccepted(false);
      setPrivacyAccepted(false);
      setMarketingConsent(true);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
      // Reset state
      setTermsAccepted(false);
      setPrivacyAccepted(false);
      setMarketingConsent(true);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="ยืนยันข้อกำหนดและเงื่อนไข"
      width={520}
      maskClosable={false}
      footer={
        <div style={{ display: "flex", gap: ds.spacing("3"), width: "100%" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ flex: 1 }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            onClick={handleAgree}
            disabled={!canProceed}
            style={{ flex: 1 }}
          >
            ยืนยัน
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("4") }}>
        {/* Terms of Service */}
        <div
          style={{
            padding: ds.spacing("4"),
            backgroundColor: ds.color.background("secondary"),
            borderRadius: ds.radius('md'),
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: ds.spacing("3") }}>
            <Checkbox
              checked={termsAccepted}
              onChange={(checked) => setTermsAccepted(checked)}
              id="terms-checkbox"
            />
            <label
              htmlFor="terms-checkbox"
              style={{
                fontSize: ds.typography.size("sm"),
                lineHeight: ds.typography.lineHeight("sm"),
                color: ds.color.text("primary"),
                cursor: "pointer",
              }}
            >
              ข้าพเจ้ายอมรับ{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ds.component.button.tertiaryBrand.text(),
                  textDecoration: "underline",
                }}
              >
                ข้อกำหนดและเงื่อนไขการใช้บริการ
              </a>{" "}
              ของ SCG
            </label>
          </div>
        </div>

        {/* Privacy Policy */}
        <div
          style={{
            padding: ds.spacing("4"),
            backgroundColor: ds.color.background("secondary"),
            borderRadius: ds.radius('md'),
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: ds.spacing("3") }}>
            <Checkbox
              checked={privacyAccepted}
              onChange={(checked) => setPrivacyAccepted(checked)}
              id="privacy-checkbox"
            />
            <label
              htmlFor="privacy-checkbox"
              style={{
                fontSize: ds.typography.size("sm"),
                lineHeight: ds.typography.lineHeight("sm"),
                color: ds.color.text("primary"),
                cursor: "pointer",
              }}
            >
              ข้าพเจ้ายอมรับ{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ds.component.button.tertiaryBrand.text(),
                  textDecoration: "underline",
                }}
              >
                นโยบายความเป็นส่วนตัว
              </a>{" "}
              และยินยอมให้เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล
            </label>
          </div>
        </div>

        {/* Marketing Consent (Optional) */}
        <div
          style={{
            padding: ds.spacing("4"),
            backgroundColor: ds.color.background("secondary"),
            borderRadius: ds.radius('md'),
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: ds.spacing("3") }}>
            <Checkbox
              checked={marketingConsent}
              onChange={(checked) => setMarketingConsent(checked)}
              id="marketing-checkbox"
            />
            <label
              htmlFor="marketing-checkbox"
              style={{
                fontSize: ds.typography.size("sm"),
                lineHeight: ds.typography.lineHeight("sm"),
                color: ds.color.text("primary"),
                cursor: "pointer",
              }}
            >
              <span style={{ color: ds.color.text("tertiary") }}>(ไม่บังคับ)</span>{" "}
              ข้าพเจ้ายินยอมรับข้อมูลข่าวสาร โปรโมชั่น และกิจกรรมพิเศษจาก SCG
            </label>
          </div>
        </div>

        {/* Info text */}
        <p
          style={{
            fontSize: ds.typography.size("xs"),
            lineHeight: ds.typography.lineHeight("xs"),
            color: ds.color.text("tertiary"),
            margin: 0,
          }}
        >
          * กรุณายอมรับข้อกำหนดและนโยบายความเป็นส่วนตัวก่อนดำเนินการต่อ
        </p>
      </div>
    </Modal>
  );
};
