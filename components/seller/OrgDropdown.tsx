import React, { useRef, useEffect } from "react";
import { ds } from "@/design-system";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import type { OrgInfo } from "@/types/seller-types";
import { getThaiOrgFallback } from "@/lib/thai-utils";
import "remixicon/fonts/remixicon.css";

export interface OrgDropdownProps {
    currentOrg?: OrgInfo;
    orgs?: OrgInfo[];
    isOpen: boolean;
    onClose: () => void;
    onOrgChange?: (orgId: string) => void;
    onEditOrg?: () => void;
    onAddOrg?: () => void;
    onManageOrgs?: () => void;
    style?: React.CSSProperties;
    disableMobileBottomSheet?: boolean;
}

/**
 * OrgDropdown Component
 * 
 * Dropdown menu for selecting organizations.
 * Automatically switches between floating menu (Desktop) and BottomSheet (Mobile).
 */
export function OrgDropdown({
    currentOrg,
    orgs = [],
    isOpen,
    onClose,
    onOrgChange,
    onEditOrg,
    onAddOrg,
    onManageOrgs,
    style,
    disableMobileBottomSheet,
}: OrgDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Close dropdown when clicking outside (Desktop only)
    useEffect(() => {
        if (!isOpen || isMobile) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen, onClose, isMobile]);

    if (!isOpen) return null;

    const handleOrgSelect = (orgId: string) => {
        onOrgChange?.(orgId);
        onClose();
    };

    const legalOrgs = orgs.filter((org) => org.type === "legal");
    const individualOrgs = orgs.filter((org) => org.type === "individual");

    // Organization type indicator component
    const OrgTypeIndicator = ({ type }: { type: "legal" | "individual" }) => {
        const config = {
            legal: {
                icon: "ri-briefcase-line",
                bgColor: ds.color.system("info"),
                label: "นิติบุคคล"
            },
            individual: {
                icon: "ri-team-line",
                bgColor: ds.color.system("warning"),
                label: "บุคคลธรรมดา จดทะเบียนพาณิชย์"
            }
        };

        const { icon, bgColor } = config[type];

        return (
            <div
                style={{
                    width: ds.spacing("3"),
                    height: ds.spacing("3"),
                    borderRadius: ds.radius("full"),
                    backgroundColor: bgColor,
                    border: `${ds.common.borderWidth.thin} solid ${ds.color.text("white")}`,
                    boxShadow: "var(--shadow-xs)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <i
                    className={icon}
                    style={{
                        fontSize: ds.common.size.iconXs,
                        color: ds.color.text("white"),
                    }}
                />
            </div>
        );
    };

    // Selection indicator component (Circle on the right)
    const SelectionIndicator = ({ selected }: { selected: boolean }) => {
        if (selected) {
            return (
                <div
                    style={{
                        width: ds.spacing("5"),
                        height: ds.spacing("5"),
                        borderRadius: ds.radius("full"),
                        backgroundColor: ds.color.background("brand-default"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path
                            d="M1 5L4.5 8.5L11 1.5"
                            stroke={ds.color.text("white")}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            );
        }
        return (
            <div
                style={{
                    width: ds.spacing("5"),
                    height: ds.spacing("5"),
                    borderRadius: ds.radius("full"),
                    border: `${selected ? "none" : "1.5px solid " + ds.color.border("secondary")}`,
                    backgroundColor: ds.color.common.transparent,
                    flexShrink: 0,
                }}
            />
        );
    };

    const Content = () => (
        <>
            {/* Legal Entity Section */}
            {legalOrgs.length > 0 && (
                <div
                    style={{
                        backgroundColor: ds.color.background("secondary"),
                        borderRadius: ds.radius("md"),
                        padding: ds.spacing("1"),
                        marginBottom: ds.spacing("4"),
                    }}
                >
                    <div
                        style={{
                            ...ds.typography.preset("paragraph-xsmall"),
                            color: ds.color.text("quaternary"),
                            marginTop: ds.spacing("3"),
                            paddingLeft: ds.spacing("4"),
                            paddingRight: ds.spacing("4"),
                        }}
                    >
                        นิติบุคคล
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("1") }}>
                        {legalOrgs.map((org) => (
                            <React.Fragment key={org.id}>
                                <button
                                    onClick={() => handleOrgSelect(org.id)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: ds.spacing("3"),
                                        padding: ds.spacing("2"),
                                        border: "none",
                                        backgroundColor: ds.color.common.transparent,
                                        borderRadius: ds.radius("sm"),
                                        cursor: ds.common.cursor.pointer,
                                        textAlign: "left",
                                        transition: `background-color ${ds.common.animation.fast}`,
                                        width: "100%",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = ds.color.background("tertiary");
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                                    }}
                                >
                                    {/* Org Logo with Type Indicator */}
                                    <div style={{ position: "relative" }}>
                                        <Avatar
                                            src={org.logo}
                                            alt={org.name}
                                            size="sm"
                                            fallback={getThaiOrgFallback(org.name)}
                                            customBgColor="var(--brand-m-primary-light-90)"
                                            customTextColor="var(--brand-m-primary-00)"
                                        />
                                        {/* Type Indicator - Always show at bottom-right */}
                                        <div style={{ position: "absolute", bottom: "-2px", right: "-2px" }}>
                                            <OrgTypeIndicator type="legal" />
                                        </div>
                                    </div>

                                    {/* Org Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                ...ds.typography.preset("paragraph-xsmall"),
                                                fontWeight: ds.typography.weight("regular"),
                                                color: ds.color.text("secondary"),
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {org.name}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                                            <div
                                                style={{
                                                    ...ds.typography.preset("paragraph-xsmall"),
                                                    color: ds.color.text("quinary"),
                                                }}
                                            >
                                                {org.role}
                                            </div>
                                            {currentOrg?.id === org.id && (
                                                org.kybVerified ? (
                                                    <Badge
                                                        color="brand"
                                                        variant="outlined"
                                                        size="2xs"
                                                        leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.typography.size('2xs') }} />}
                                                    >
                                                        ยืนยันแล้ว
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        color="error"
                                                        variant="outlined"
                                                        size="2xs"
                                                        leadingIcon={<i className="ri-information-fill" style={{ fontSize: ds.typography.size('2xs') }} />}
                                                    >
                                                        ยังไม่ยืนยันองค์กร
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <SelectionIndicator selected={currentOrg?.id === org.id} />
                                </button>

                                {/* Edit Organization Button - Only for current org */}
                                {currentOrg?.id === org.id && (
                                    <button
                                        onClick={() => {
                                            onEditOrg?.();
                                            onClose();
                                        }}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: ds.spacing("2"),
                                            padding: ds.spacing("2"),
                                            margin: `0 ${ds.spacing("2")} ${ds.spacing("1")} ${ds.spacing("2")}`,
                                            border: `${ds.common.borderWidth.thin} solid ${ds.color.border("secondary")}`,
                                            backgroundColor: ds.color.common.transparent,
                                            borderRadius: ds.radius("sm"),
                                            cursor: ds.common.cursor.pointer,
                                            textAlign: "center",
                                            transition: `background-color ${ds.common.animation.fast}`,
                                            width: `calc(100% - ${ds.spacing("4")})`,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = ds.color.background("tertiary");
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                                        }}
                                    >
                                        <i
                                            className="ri-edit-line"
                                            style={{
                                                fontSize: ds.common.size.iconSm,
                                                color: ds.color.text("secondary"),
                                            }}
                                        />
                                        <span
                                            style={{
                                                ...ds.typography.preset("paragraph-small"),
                                                fontWeight: ds.typography.weight("medium"),
                                                color: ds.color.text("secondary"),
                                            }}
                                        >
                                            แก้ไขข้อมูลองค์กร
                                        </span>
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            {/* Individual Section */}
            {individualOrgs.length > 0 && (
                <div
                    style={{
                        backgroundColor: ds.color.background("secondary"),
                        borderRadius: ds.radius("md"),
                        padding: ds.spacing("1"),
                        marginBottom: ds.spacing("2"),
                    }}
                >
                    <div
                        style={{
                            ...ds.typography.preset("paragraph-xsmall"),
                            color: ds.color.text("quaternary"),
                            marginTop: ds.spacing("3"),
                            paddingLeft: ds.spacing("4"),
                            paddingRight: ds.spacing("4"),
                        }}
                    >
                        บุคคลธรรมดา จดทะเบียนพาณิชย์
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("1") }}>
                        {individualOrgs.map((org) => (
                            <React.Fragment key={org.id}>
                                <button
                                    onClick={() => handleOrgSelect(org.id)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: ds.spacing("3"),
                                        padding: ds.spacing("2"),
                                        border: "none",
                                        backgroundColor: ds.color.common.transparent,
                                        borderRadius: ds.radius("sm"),
                                        cursor: ds.common.cursor.pointer,
                                        textAlign: "left",
                                        transition: `background-color ${ds.common.animation.fast}`,
                                        width: "100%",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = ds.color.background("tertiary");
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                                    }}
                                >
                                    {/* Org Logo with Type Indicator */}
                                    <div style={{ position: "relative" }}>
                                        <Avatar
                                            src={org.logo}
                                            alt={org.name}
                                            size="sm"
                                            fallback={getThaiOrgFallback(org.name)}
                                            customBgColor="var(--brand-m-primary-light-90)"
                                            customTextColor="var(--brand-m-primary-00)"
                                        />
                                        {/* Type Indicator - Always show at bottom-right */}
                                        <div style={{ position: "absolute", bottom: "-2px", right: "-2px" }}>
                                            <OrgTypeIndicator type="individual" />
                                        </div>
                                    </div>

                                    {/* Org Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                ...ds.typography.preset("paragraph-xsmall"),
                                                fontWeight: ds.typography.weight("regular"),
                                                color: ds.color.text("secondary"),
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                marginBottom: ds.spacing("1"),
                                            }}
                                        >
                                            {org.name}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: ds.spacing("2") }}>
                                            <div
                                                style={{
                                                    ...ds.typography.preset("paragraph-xsmall"),
                                                    color: ds.color.text("quinary"),
                                                }}
                                            >
                                                {org.role}
                                            </div>
                                            {currentOrg?.id === org.id && (
                                                org.kybVerified ? (
                                                    <Badge
                                                        color="brand"
                                                        variant="outlined"
                                                        size="2xs"
                                                        leadingIcon={<i className="ri-checkbox-circle-fill" style={{ fontSize: ds.typography.size('2xs') }} />}
                                                    >
                                                        ยืนยันแล้ว
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        color="error"
                                                        variant="outlined"
                                                        size="2xs"
                                                        leadingIcon={<i className="ri-information-fill" style={{ fontSize: ds.typography.size('2xs') }} />}
                                                    >
                                                        ยังไม่ยืนยันตัวตน
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <SelectionIndicator selected={currentOrg?.id === org.id} />
                                </button>

                                {/* Edit Organization Button - Only for current org */}
                                {currentOrg?.id === org.id && (
                                    <button
                                        onClick={() => {
                                            onEditOrg?.();
                                            onClose();
                                        }}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: ds.spacing("2"),
                                            padding: ds.spacing("2"),
                                            margin: `0 ${ds.spacing("2")} ${ds.spacing("4")} ${ds.spacing("2")}`,
                                            border: `${ds.common.borderWidth.thin} solid ${ds.color.border("secondary")}`,
                                            backgroundColor: ds.color.common.transparent,
                                            borderRadius: ds.radius("sm"),
                                            cursor: ds.common.cursor.pointer,
                                            textAlign: "center",
                                            transition: `background-color ${ds.common.animation.fast}`,
                                            width: `calc(100% - ${ds.spacing("4")})`,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = ds.color.background("tertiary");
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                                        }}
                                    >
                                        <i
                                            className="ri-edit-line"
                                            style={{
                                                fontSize: ds.common.size.iconSm,
                                                color: ds.color.text("secondary"),
                                            }}
                                        />
                                        <span
                                            style={{
                                                ...ds.typography.preset("paragraph-small"),
                                                fontWeight: ds.typography.weight("medium"),
                                                color: ds.color.text("secondary"),
                                            }}
                                        >
                                            แก้ไขข้อมูลองค์กร
                                        </span>
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing("1") }}>
                <button
                    onClick={() => {
                        onAddOrg?.();
                        onClose();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                        padding: ds.spacing("3"),
                        border: "none",
                        backgroundColor: ds.color.common.transparent,
                        borderRadius: ds.radius("sm"),
                        cursor: ds.common.cursor.pointer,
                        textAlign: "left",
                        transition: `background-color ${ds.common.animation.fast}`,
                        width: "100%",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                    }}
                >
                    <i
                        className="ri-add-circle-line"
                        style={{
                            fontSize: ds.common.size.iconLg,
                            color: ds.color.text("secondary"),
                        }}
                    />
                    <span
                        style={{
                            ...ds.typography.preset("paragraph-small"),
                            color: ds.color.text("secondary"),
                        }}
                    >
                        เพิ่มองค์กรใหม่
                    </span>
                </button>

                <button
                    onClick={() => {
                        onManageOrgs?.();
                        onClose();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ds.spacing("2"),
                        padding: ds.spacing("3"),
                        border: "none",
                        backgroundColor: ds.color.common.transparent,
                        borderRadius: ds.radius("sm"),
                        cursor: ds.common.cursor.pointer,
                        textAlign: "left",
                        transition: `background-color ${ds.common.animation.fast}`,
                        width: "100%",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.background("secondary");
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ds.color.common.transparent;
                    }}
                >
                    <i
                        className="ri-settings-3-line"
                        style={{
                            fontSize: ds.common.size.iconLg,
                            color: ds.color.text("secondary"),
                        }}
                    />
                    <span
                        style={{
                            ...ds.typography.preset("paragraph-small"),
                            color: ds.color.text("secondary"),
                        }}
                    >
                        จัดการองค์กรทั้งหมด
                    </span>
                </button>
            </div>
        </>
    );

    if (isMobile && !disableMobileBottomSheet) {
        return (
            <BottomSheet
                open={isOpen}
                onClose={onClose}
                title="เลือกองค์กร"
            >
                <div style={{ paddingBottom: ds.spacing("6") }}>
                    <Content />
                </div>
            </BottomSheet>
        );
    }

    return (
        <div
            ref={dropdownRef}
            style={{
                position: "absolute",
                top: `calc(100% + ${ds.spacing("2")})`,
                right: 0,
                minWidth: "280px",
                backgroundColor: ds.color.background("primary"),
                borderRadius: ds.radius("md"),
                boxShadow: "var(--shadow-3xl)",
                padding: ds.spacing("3"),
                zIndex: 1000,
                ...style,
            }}
        >
            {/* Section Header */}
            <div
                style={{
                    ...ds.typography.preset("paragraph-small"),
                    fontWeight: ds.typography.weight("medium"),
                    color: ds.color.text("secondary"),
                    marginBottom: ds.spacing("3"),
                }}
            >
                เลือกองค์กร
            </div>

            <Content />
        </div>
    );
}

export default OrgDropdown;
