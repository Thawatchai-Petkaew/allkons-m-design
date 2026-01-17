"use client";

import { Card, Divider, Typography } from "antd";
import { useState } from "react";
import { ds } from "@/design-system";

const { Title, Text } = Typography;

// Color data extracted from CSS variables
const colorGroups = {
  "Primitive Colors": {
    Green: [
      { name: "gn-90", value: "#031308", var: "--green-gn-90" },
      { name: "gn-80", value: "#06230f", var: "--green-gn-80" },
      { name: "gn-70", value: "#083416", var: "--green-gn-70" },
      { name: "gn-60", value: "#0b441e", var: "--green-gn-60" },
      { name: "gn-50", value: "#0e5525", var: "--green-gn-50" },
      { name: "gn-40", value: "#11662c", var: "--green-gn-40" },
      { name: "gn-30", value: "#137633", var: "--green-gn-30" },
      { name: "gn-20", value: "#16873a", var: "--green-gn-20" },
      { name: "gn-10", value: "#199842", var: "--green-gn-10" },
      { name: "gn-00", value: "#1eb950", var: "--green-gn-00" },
      { name: "gn10", value: "#47c670", var: "--green-gn10" },
      { name: "gn20", value: "#5bcc7f", var: "--green-gn20" },
      { name: "gn30", value: "#6fd28f", var: "--green-gn30" },
      { name: "gn40", value: "#83d99f", var: "--green-gn40" },
      { name: "gn50", value: "#97dfae", var: "--green-gn50" },
      { name: "gn60", value: "#ace5be", var: "--green-gn60" },
      { name: "gn70", value: "#c0ebce", var: "--green-gn70" },
      { name: "gn80", value: "#d4f2de", var: "--green-gn80" },
      { name: "gn90", value: "#e8f8ed", var: "--green-gn90" },
    ],
    Red: [
      { name: "rd-90", value: "#150301", var: "--red-rd-90" },
      { name: "rd-80", value: "#2b0603", var: "--red-rd-80" },
      { name: "rd-70", value: "#410904", var: "--red-rd-70" },
      { name: "rd-60", value: "#570d06", var: "--red-rd-60" },
      { name: "rd-50", value: "#6d1008", var: "--red-rd-50" },
      { name: "rd-40", value: "#821309", var: "--red-rd-40" },
      { name: "rd-30", value: "#98170b", var: "--red-rd-30" },
      { name: "rd-20", value: "#ae1a0c", var: "--red-rd-20" },
      { name: "rd-10", value: "#c41d0e", var: "--red-rd-10" },
      { name: "rd-00", value: "#da2110", var: "--red-rd-00" },
      { name: "rd10", value: "#dd3727", var: "--red-rd10" },
      { name: "rd20", value: "#e14d3f", var: "--red-rd20" },
      { name: "rd30", value: "#e56357", var: "--red-rd30" },
      { name: "rd40", value: "#e8796f", var: "--red-rd40" },
      { name: "rd50", value: "#ec9087", var: "--red-rd50" },
      { name: "rd60", value: "#f0a69f", var: "--red-rd60" },
      { name: "rd70", value: "#f3bcb7", var: "--red-rd70" },
      { name: "rd80", value: "#f7d2cf", var: "--red-rd80" },
      { name: "rd90", value: "#fbe8e7", var: "--red-rd90" },
    ],
    Blue: [
      { name: "be-90", value: "#0a1117", var: "--blue-be-90" },
      { name: "be-80", value: "#14232e", var: "--blue-be-80" },
      { name: "be-70", value: "#1e3545", var: "--blue-be-70" },
      { name: "be-60", value: "#28475c", var: "--blue-be-60" },
      { name: "be-50", value: "#325974", var: "--blue-be-50" },
      { name: "be-40", value: "#3c6a8b", var: "--blue-be-40" },
      { name: "be-30", value: "#467ca2", var: "--blue-be-30" },
      { name: "be-20", value: "#508eb9", var: "--blue-be-20" },
      { name: "be-10", value: "#5aa0d0", var: "--blue-be-10" },
      { name: "be-00", value: "#65b2e8", var: "--blue-be-00" },
      { name: "be10", value: "#74b9ea", var: "--blue-be10" },
      { name: "be20", value: "#83c1ec", var: "--blue-be20" },
      { name: "be30", value: "#93c9ee", var: "--blue-be30" },
      { name: "be40", value: "#a2d0f1", var: "--blue-be40" },
      { name: "be50", value: "#b2d8f3", var: "--blue-be50" },
      { name: "be60", value: "#c1e0f5", var: "--blue-be60" },
      { name: "be70", value: "#d0e7f8", var: "--blue-be70" },
      { name: "be80", value: "#e0effa", var: "--blue-be80" },
      { name: "be90", value: "#eff7fc", var: "--blue-be90" },
    ],
    Gray: [
      { name: "gy-90", value: "#090b0d", var: "--gray-gy-90" },
      { name: "gy-80", value: "#12151a", var: "--gray-gy-80" },
      { name: "gy-70", value: "#1b2027", var: "--gray-gy-70" },
      { name: "gy-60", value: "#242a34", var: "--gray-gy-60" },
      { name: "gy-50", value: "#2e3542", var: "--gray-gy-50" },
      { name: "gy-40", value: "#37404f", var: "--gray-gy-40" },
      { name: "gy-30", value: "#404a5c", var: "--gray-gy-30" },
      { name: "gy-20", value: "#495569", var: "--gray-gy-20" },
      { name: "gy-10", value: "#525f76", var: "--gray-gy-10" },
      { name: "gy-00", value: "#5b6a83", var: "--gray-gy-00" },
      { name: "gy10", value: "#6b798f", var: "--gray-gy10" },
      { name: "gy20", value: "#7c889c", var: "--gray-gy20" },
      { name: "gy30", value: "#8c97a8", var: "--gray-gy30" },
      { name: "gy40", value: "#9da6b5", var: "--gray-gy40" },
      { name: "gy50", value: "#adb4c1", var: "--gray-gy50" },
      { name: "gy60", value: "#bdc3cd", var: "--gray-gy60" },
      { name: "gy70", value: "#ced2da", var: "--gray-gy70" },
      { name: "gy80", value: "#dee1e6", var: "--gray-gy80" },
      { name: "gy90", value: "#eff0f3", var: "--gray-gy90" },
      { name: "gy95", value: "#f7f8f9", var: "--gray-gy95" },
    ],
    "Special Green": [
      { name: "sg-90", value: "#001207", var: "--special-green-sg-90" },
      { name: "sg-80", value: "#00230d", var: "--special-green-sg-80" },
      { name: "sg-70", value: "#003514", var: "--special-green-sg-70" },
      { name: "sg-60", value: "#00461b", var: "--special-green-sg-60" },
      { name: "sg-50", value: "#005822", var: "--special-green-sg-50" },
      { name: "sg-40", value: "#006928", var: "--special-green-sg-40" },
      { name: "sg-30", value: "#006125", var: "--special-green-sg-30" },
      { name: "sg-20", value: "#008c36", var: "--special-green-sg-20" },
      { name: "sg-10", value: "#009d3c", var: "--special-green-sg-10" },
      { name: "sg-00", value: "#00af43", var: "--special-green-sg-00" },
      { name: "sg10", value: "#1ab756", var: "--special-green-sg10" },
      { name: "sg20", value: "#33bf69", var: "--special-green-sg20" },
      { name: "sg30", value: "#4dc77b", var: "--special-green-sg30" },
      { name: "sg40", value: "#66cf8e", var: "--special-green-sg40" },
      { name: "sg50", value: "#80d7a1", var: "--special-green-sg50" },
      { name: "sg60", value: "#99dfb4", var: "--special-green-sg60" },
      { name: "sg70", value: "#b2e7c7", var: "--special-green-sg70" },
      { name: "sg80", value: "#ccefd9", var: "--special-green-sg80" },
      { name: "sg90", value: "#e5f7ec", var: "--special-green-sg90" },
    ],
    "Refreshing Orange": [
      { name: "ro-90", value: "#1a1101", var: "--refreshing-orange-ro-90" },
      { name: "ro-80", value: "#332202", var: "--refreshing-orange-ro-80" },
      { name: "ro-70", value: "#4d3302", var: "--refreshing-orange-ro-70" },
      { name: "ro-60", value: "#664403", var: "--refreshing-orange-ro-60" },
      { name: "ro-50", value: "#805604", var: "--refreshing-orange-ro-50" },
      { name: "ro-40", value: "#996705", var: "--refreshing-orange-ro-40" },
      { name: "ro-30", value: "#b27806", var: "--refreshing-orange-ro-30" },
      { name: "ro-20", value: "#cc8906", var: "--refreshing-orange-ro-20" },
      { name: "ro-10", value: "#e59a07", var: "--refreshing-orange-ro-10" },
      { name: "ro-00", value: "#ffab08", var: "--refreshing-orange-ro-00" },
      { name: "ro10", value: "#ffb321", var: "--refreshing-orange-ro10" },
      { name: "ro20", value: "#ffbc39", var: "--refreshing-orange-ro20" },
      { name: "ro30", value: "#ffc452", var: "--refreshing-orange-ro30" },
      { name: "ro40", value: "#ffcd6b", var: "--refreshing-orange-ro40" },
      { name: "ro50", value: "#ffd583", var: "--refreshing-orange-ro50" },
      { name: "ro60", value: "#ffdd9c", var: "--refreshing-orange-ro60" },
      { name: "ro70", value: "#ffe6b5", var: "--refreshing-orange-ro70" },
      { name: "ro80", value: "#ffeece", var: "--refreshing-orange-ro80" },
      { name: "ro90", value: "#fff7e6", var: "--refreshing-orange-ro90" },
    ],
  },
  "Semantic Colors": {
    System: [
      { name: "Success", value: "#1eb950", var: "--system-success-00" },
      { name: "Error", value: "#da2110", var: "--system-error-00" },
      { name: "Warning", value: "#ffab08", var: "--system-warning-00" },
      { name: "Info", value: "#65b2e8", var: "--system-info-00" },
    ],
    Text: [
      { name: "Primary", value: "#12151a", var: "--text-primary" },
      { name: "Secondary", value: "#37404f", var: "--text-secondary" },
      { name: "Tertiary", value: "#495569", var: "--text-tertiary" },
      { name: "Quaternary", value: "#5b6a83", var: "--text-quaternary" },
      { name: "Placeholder", value: "#9da6b5", var: "--text-placeholder" },
      { name: "Disabled", value: "#bdc3cd", var: "--text-disabled" },
      { name: "White", value: "#ffffff", var: "--text-white" },
      { name: "Brand", value: "#00af43", var: "--text-brand-default" },
    ],
    Background: [
      { name: "Primary", value: "#ffffff", var: "--background-primary" },
      { name: "Secondary", value: "#f7f8f9", var: "--background-secondary" },
      { name: "Brand", value: "#00af43", var: "--background-brand-default" },
    ],
    Border: [
      { name: "Primary", value: "#dee1e6", var: "--border-primary" },
      { name: "Secondary", value: "#bdc3cd", var: "--border-secondary" },
      { name: "Brand", value: "#00af43", var: "--border-brand-default" },
    ],
  },
  Brand: {
    Primary: [
      { name: "Primary -20", value: "#008c36", var: "--brand-m-primary--20" },
      { name: "Primary -40", value: "#006928", var: "--brand-m-primary--40" },
      { name: "Primary 00", value: "#00af43", var: "--brand-m-primary-00" },
      { name: "Primary +20", value: "#33bf69", var: "--brand-m-primary-+20" },
      { name: "Primary +40", value: "#66cf8e", var: "--brand-m-primary-+40" },
      { name: "Primary +80", value: "#ccefd9", var: "--brand-m-primary-+80" },
      { name: "Primary +90", value: "#e5f7ec", var: "--brand-m-primary-+90" },
    ],
  },
};

const typographyStyles = {
  Display: [
    { name: "Display D1", class: "text-display-d1", size: "var(--size-11xl)", lineHeight: "var(--line-height-11xl)" },
    { name: "Display D2", class: "text-display-d2", size: "var(--size-10xl)", lineHeight: "var(--line-height-10xl)" },
    { name: "Display D3", class: "text-display-d3", size: "var(--size-9xl)", lineHeight: "var(--line-height-9xl)" },
    { name: "Display D4", class: "text-display-d4", size: "var(--size-8xl)", lineHeight: "var(--line-height-8xl)" },
    { name: "Display D5", class: "text-display-d5", size: "var(--size-7xl)", lineHeight: "var(--line-height-7xl)" },
    { name: "Display D6", class: "text-display-d6", size: "var(--size-5xl)", lineHeight: "var(--line-height-5xl)" },
  ],
  Heading: [
    { name: "Heading H1", class: "text-heading-h1", size: "var(--size-6xl)", lineHeight: "var(--line-height-6xl)" },
    { name: "Heading H2", class: "text-heading-h2", size: "var(--size-4xl)", lineHeight: "var(--line-height-4xl)" },
    { name: "Heading H3", class: "text-heading-h3", size: "var(--size-3xl)", lineHeight: "var(--line-height-3xl)" },
    { name: "Heading H4", class: "text-heading-h4", size: "var(--size-2xl)", lineHeight: "var(--line-height-2xl)" },
    { name: "Heading H5", class: "text-heading-h5", size: "var(--size-xl)", lineHeight: "var(--line-height-xl)" },
    { name: "Heading H6", class: "text-heading-h6", size: "var(--size-md)", lineHeight: "var(--line-height-md)" },
  ],
  Paragraph: [
    { name: "Paragraph Big", class: "text-paragraph-big", size: "var(--size-lg)", lineHeight: "var(--line-height-lg)" },
    { name: "Paragraph Middle", class: "text-paragraph-middle", size: "var(--size-md)", lineHeight: "var(--line-height-md)" },
    { name: "Paragraph Small", class: "text-paragraph-small", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
    { name: "Paragraph XSmall", class: "text-paragraph-xsmall", size: "var(--size-xs)", lineHeight: "var(--line-height-xs)" },
  ],
  Label: [
    { name: "Label Selection", class: "text-label-selection", size: "var(--size-md)", lineHeight: "var(--line-height-md)" },
    { name: "Label List", class: "text-label-list", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
    { name: "Label Input Small", class: "text-label-input-small", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
    { name: "Label Input Middle", class: "text-label-input-middle", size: "var(--size-md)", lineHeight: "var(--line-height-md)" },
    { name: "Clickable Label", class: "text-clickable-label", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
    { name: "Value List", class: "text-value-list", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
    { name: "Placeholder", class: "text-placeholder", size: "var(--size-md)", lineHeight: "var(--line-height-md)" },
    { name: "Subtitle", class: "text-subtitle", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
  ],
  Button: [
    { name: "Button Big", class: "text-button-big", size: "var(--size-lg)", lineHeight: "var(--line-height-lg)" },
    { name: "Button Middle", class: "text-button-middle", size: "var(--size-md)", lineHeight: "var(--line-height-md)" },
    { name: "Button Small", class: "text-button-small", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
  ],
  Link: [
    { name: "Link Big", class: "text-link-big", size: "var(--size-lg)", lineHeight: "var(--line-height-lg)" },
    { name: "Link Middle", class: "text-link-middle", size: "var(--size-md)", lineHeight: "var(--line-height-md)" },
    { name: "Link Small", class: "text-link-small", size: "var(--size-sm)", lineHeight: "var(--line-height-sm)" },
  ],
  Utility: [
    { name: "All Caps", class: "text-all-caps", size: "var(--size-xs)", lineHeight: "var(--line-height-xs)" },
    { name: "Error", class: "text-error", size: "var(--size-2xs)", lineHeight: "var(--line-height-2xs)" },
  ],
};

const fontWeights = [
  { name: "Thin", value: 100, var: "--font-weight-thin" },
  { name: "Extra Light", value: 200, var: "--font-weight-extralight" },
  { name: "Light", value: 300, var: "--font-weight-light" },
  { name: "Regular", value: 400, var: "--font-weight-regular" },
  { name: "Medium", value: 500, var: "--font-weight-medium" },
  { name: "Semi Bold", value: 600, var: "--font-weight-semibold" },
  { name: "Bold", value: 700, var: "--font-weight-bold" },
  { name: "Extra Bold", value: 800, var: "--font-weight-extrabold" },
  { name: "Black", value: 900, var: "--font-weight-black" },
];

const spacingTokens = [
  { name: "none", value: "0rem", var: "--spacing-none" },
  { name: "1", value: "0.25rem", var: "--spacing-1" },
  { name: "2", value: "0.5rem", var: "--spacing-2" },
  { name: "3", value: "0.75rem", var: "--spacing-3" },
  { name: "4", value: "1rem", var: "--spacing-4" },
  { name: "5", value: "1.25rem", var: "--spacing-5" },
  { name: "6", value: "1.5rem", var: "--spacing-6" },
  { name: "7", value: "1.75rem", var: "--spacing-7" },
  { name: "8", value: "2rem", var: "--spacing-8" },
  { name: "9", value: "2.25rem", var: "--spacing-9" },
  { name: "10", value: "2.5rem", var: "--spacing-10" },
  { name: "11", value: "2.75rem", var: "--spacing-11" },
  { name: "12", value: "3rem", var: "--spacing-12" },
  { name: "13", value: "3.25rem", var: "--spacing-13" },
  { name: "14", value: "3.5rem", var: "--spacing-14" },
  { name: "15", value: "3.75rem", var: "--spacing-15" },
  { name: "16", value: "4rem", var: "--spacing-16" },
];

const radiusTokens = [
  { name: "none", value: "0rem", var: "--radius-none" },
  { name: "xs", value: "0.25rem", var: "--radius-xs" },
  { name: "sm", value: "0.5rem", var: "--radius-sm" },
  { name: "md", value: "0.75rem", var: "--radius-md" },
  { name: "lg", value: "1rem", var: "--radius-lg" },
  { name: "xl", value: "1.5rem", var: "--radius-xl" },
  { name: "full", value: "9999px", var: "--radius-full" },
];

const sizeTokens = [
  { name: "2xs", value: "10px", var: "--size-2xs" },
  { name: "xs", value: "12px", var: "--size-xs" },
  { name: "sm", value: "14px", var: "--size-sm" },
  { name: "md", value: "16px", var: "--size-md" },
  { name: "lg", value: "18px", var: "--size-lg" },
  { name: "xl", value: "18px", var: "--size-xl" },
  { name: "2xl", value: "20px", var: "--size-2xl" },
  { name: "3xl", value: "24px", var: "--size-3xl" },
  { name: "4xl", value: "28px", var: "--size-4xl" },
  { name: "5xl", value: "32px", var: "--size-5xl" },
  { name: "6xl", value: "36px", var: "--size-6xl" },
  { name: "7xl", value: "40px", var: "--size-7xl" },
  { name: "8xl", value: "44px", var: "--size-8xl" },
  { name: "9xl", value: "48px", var: "--size-9xl" },
  { name: "10xl", value: "56px", var: "--size-10xl" },
  { name: "11xl", value: "60px", var: "--size-11xl" },
];

export default function FoundationPage() {
  const [copiedVar, setCopiedVar] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVar(text);
    setTimeout(() => setCopiedVar(null), 2000);
  };

  // Calculate relative luminance for WCAG contrast
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = getLuminance(r, g, b);
    // Use white text on dark backgrounds, black text on light backgrounds
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  // Check if color is light (for border styling)
  const isLightColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = getLuminance(r, g, b);
    return luminance > 0.5;
  };

  return (
    <div 
      className="max-w-7xl mx-auto"
      style={{ 
        padding: "var(--spacing-8)",
        backgroundColor: "var(--background-primary)"
      }}
    >
      <Title 
        level={1} 
        style={{ marginBottom: "var(--spacing-8)" }}
      >
        Visual Design System Foundation
      </Title>
      
      {/* Colors Section */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <Title level={2} style={{ marginBottom: "var(--spacing-6)" }}>Colors</Title>
        
        {Object.entries(colorGroups).map(([groupName, categories]) => (
          <div key={groupName} style={{ marginBottom: "var(--spacing-8)" }}>
            <Title level={3} style={{ marginBottom: "var(--spacing-4)" }}>{groupName}</Title>
            
            {Object.entries(categories).map(([categoryName, colors]) => (
              <Card 
                key={categoryName} 
                style={{ marginBottom: "var(--spacing-6)" }}
                title={categoryName}
                styles={{ body: { backgroundColor: "var(--background-secondary)" } }}
              >
                <div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                  style={{ 
                    backgroundColor: "var(--background-secondary)",
                    gap: "var(--spacing-4)",
                    margin: "calc(-1 * var(--spacing-6))",
                    padding: "var(--spacing-6)"
                  }}
                >
                    {colors.map((color) => {
                    const textColor = getContrastColor(color.value);
                    const isLight = isLightColor(color.value);
                    return (
                      <div
                        key={color.name}
                        className="cursor-pointer"
                        onClick={() => copyToClipboard(color.var)}
                        title={`Click to copy: ${color.var}`}
                      >
                        <div 
                          className="w-full rounded-lg"
                          style={{ 
                            height: "96px",
                            marginBottom: "var(--spacing-2)",
                            padding: "var(--spacing-1)",
                            backgroundColor: "var(--background-secondary)",
                            border: `1px solid var(--border-secondary)`,
                            borderRadius: "var(--radius-lg)"
                          }}
                        >
                          <div
                            className="w-full h-full rounded flex flex-col justify-center items-center"
                            style={{ 
                              backgroundColor: color.value,
                              borderRadius: "var(--radius-md)"
                            }}
                          >
                            <div 
                              className="text-xs font-semibold text-center"
                              style={{ 
                                color: textColor,
                                padding: "0 var(--spacing-2)",
                                fontSize: "var(--size-xs)",
                                fontWeight: "var(--font-weight-semibold)"
                              }}
                            >
                              {color.name}
                            </div>
                            <div 
                              className="font-mono text-center"
                              style={{ 
                                color: textColor, 
                                opacity: 0.9,
                                marginTop: "var(--spacing-1)",
                                padding: "0 var(--spacing-2)",
                                fontSize: "10px"
                              }}
                            >
                              {color.value}
                            </div>
                          </div>
                        </div>
                        <div 
                          className="text-xs rounded"
                          style={{ 
                            backgroundColor: "var(--background-primary)",
                            padding: "var(--spacing-2)",
                            border: `1px solid var(--border-secondary)`,
                            borderRadius: "var(--radius-md)"
                          }}
                        >
                          <div 
                            style={{ 
                              fontWeight: "var(--font-weight-semibold)",
                              color: "var(--text-primary)"
                            }}
                          >
                            {color.name}
                          </div>
                          <div 
                            className="font-mono"
                            style={{ 
                              color: "var(--text-secondary)",
                              fontSize: "10px"
                            }}
                          >
                            {color.value}
                          </div>
                          <div 
                            className="font-mono truncate"
                            style={{ 
                              color: "var(--text-tertiary)",
                              fontSize: "10px",
                              marginTop: "var(--spacing-1)"
                            }}
                          >
                            {copiedVar === color.var ? "✓ Copied!" : color.var}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        ))}
      </section>

      <Divider />

      {/* Typography Section */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <Title level={2} style={{ marginBottom: "var(--spacing-6)" }}>Typography</Title>
        
        {/* Font Family */}
        <Card 
          style={{ marginBottom: "var(--spacing-6)" }} 
          title="Font Family"
          styles={{ body: { backgroundColor: "var(--background-secondary)" } }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
            <div>
              <Text strong>Noto Sans Thai Looped</Text>
            </div>
            <div 
              className="font-mono"
              style={{ 
                fontSize: "var(--size-sm)",
                color: "var(--text-secondary)"
              }}
            >
              var(--font-family-noto-sans)
            </div>
            <div 
              style={{ 
                fontSize: "var(--size-lg)",
                fontFamily: "var(--font-family-noto-sans)"
              }}
            >
              ตัวอย่างข้อความภาษาไทย The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </Card>

        {/* Font Sizes */}
        <Card 
          style={{ marginBottom: "var(--spacing-6)" }} 
          title="Font Sizes"
          styles={{ body: { backgroundColor: "var(--background-secondary)" } }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
            {sizeTokens.map((token) => (
              <div 
                key={token.name} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "var(--spacing-4)" 
                }}
              >
                <div 
                  style={{ 
                    width: "64px",
                    fontSize: "var(--size-sm)",
                    color: "var(--text-secondary)"
                  }}
                >
                  {token.name}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ 
                      fontSize: token.value,
                      borderBottom: `2px solid var(--border-secondary)`
                    }}
                  >
                    Aa
                  </div>
                </div>
                <div 
                  style={{ 
                    width: "80px",
                    fontSize: "var(--size-xs)",
                    color: "var(--text-secondary)",
                    textAlign: "right"
                  }}
                >
                  {token.value}
                </div>
                <div
                  className="font-mono cursor-pointer"
                  style={{ 
                    fontSize: "var(--size-xs)",
                    color: "var(--text-tertiary)"
                  }}
                  onClick={() => copyToClipboard(token.var)}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}
                >
                  {copiedVar === token.var ? "✓" : token.var}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Font Weights */}
        <Card 
          style={{ marginBottom: "var(--spacing-6)" }} 
          title="Font Weights"
          styles={{ body: { backgroundColor: "var(--background-secondary)" } }}
        >
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            style={{ gap: "var(--spacing-4)" }}
          >
            {fontWeights.map((weight) => (
              <div
                key={weight.name}
                className="cursor-pointer"
                onClick={() => copyToClipboard(weight.var)}
              >
                <div
                  style={{ 
                    fontSize: "var(--size-2xl)",
                    marginBottom: "var(--spacing-2)",
                    fontWeight: weight.value
                  }}
                >
                  Aa
                </div>
                <div style={{ fontSize: "var(--size-xs)" }}>
                  <div style={{ fontWeight: "var(--font-weight-semibold)" }}>{weight.name}</div>
                  <div style={{ color: "var(--text-secondary)" }}>{weight.value}</div>
                  <div 
                    className="font-mono"
                    style={{ 
                      color: "var(--text-tertiary)",
                      fontSize: "10px"
                    }}
                  >
                    {copiedVar === weight.var ? "✓ Copied!" : weight.var}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Typography Styles */}
        {Object.entries(typographyStyles).map(([categoryName, styles]) => (
          <Card 
            key={categoryName} 
            style={{ marginBottom: "var(--spacing-6)" }}
            title={categoryName}
            styles={{ body: { backgroundColor: "var(--background-secondary)" } }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6)" }}>
              {styles.map((style, index) => (
                <div 
                  key={style.name} 
                  style={{ 
                    borderBottom: index < styles.length - 1 ? `1px solid var(--border-secondary)` : "none",
                    paddingBottom: index < styles.length - 1 ? "var(--spacing-4)" : 0
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "var(--spacing-2)" }}>
                    <div style={{ flex: 1 }}>
                      <div className={style.class}>{style.name}</div>
                    </div>
                    <div 
                      className="font-mono"
                      style={{ 
                        fontSize: "var(--size-xs)",
                        color: "var(--text-secondary)",
                        textAlign: "right",
                        marginLeft: "var(--spacing-4)"
                      }}
                    >
                      <div>{style.size}</div>
                      <div>{style.lineHeight}</div>
                    </div>
                  </div>
                  <div 
                    className="font-mono"
                    style={{ 
                      fontSize: "var(--size-xs)",
                      color: "var(--text-tertiary)"
                    }}
                  >
                    {style.class}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>

      <Divider />

      {/* Spacing Section */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <Title level={2} style={{ marginBottom: "var(--spacing-6)" }}>Spacing</Title>
        <Card styles={{ body: { backgroundColor: "var(--background-secondary)" } }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
            {spacingTokens.map((token) => (
              <div 
                key={token.name} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "var(--spacing-4)" 
                }}
              >
                <div 
                  style={{ 
                    width: "80px",
                    fontSize: "var(--size-sm)",
                    color: "var(--text-secondary)"
                  }}
                >
                  {token.name}
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <div
                    style={{ 
                      backgroundColor: "var(--system-info-00)",
                      height: "32px",
                      width: token.value
                    }}
                  />
                </div>
                <div 
                  style={{ 
                    width: "96px",
                    fontSize: "var(--size-xs)",
                    color: "var(--text-secondary)",
                    textAlign: "right"
                  }}
                >
                  {token.value}
                </div>
                <div
                  className="font-mono cursor-pointer"
                  style={{ 
                    fontSize: "var(--size-xs)",
                    color: "var(--text-tertiary)"
                  }}
                  onClick={() => copyToClipboard(token.var)}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}
                >
                  {copiedVar === token.var ? "✓" : token.var}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Divider />

      {/* Border Radius Section */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <Title level={2} style={{ marginBottom: "var(--spacing-6)" }}>Border Radius</Title>
        <Card styles={{ body: { backgroundColor: "var(--background-secondary)" } }}>
          <div 
            style={{ 
              padding: "var(--spacing-6)",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--background-secondary)"
            }}
          >
            <div 
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7"
              style={{ gap: "var(--spacing-6)" }}
            >
              {radiusTokens.map((token) => (
                <div
                  key={token.name}
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(token.var)}
                >
                  <div
                    style={{ 
                      width: "96px",
                      height: "96px",
                      backgroundColor: "var(--system-info-00)",
                      marginBottom: "var(--spacing-2)",
                      borderRadius: token.value
                    }}
                  />
                  <div style={{ fontSize: "var(--size-xs)" }}>
                    <div style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--text-primary)" }}>
                      {token.name}
                    </div>
                    <div style={{ color: "var(--text-secondary)" }}>{token.value}</div>
                    <div 
                      className="font-mono truncate"
                      style={{ 
                        color: "var(--text-tertiary)",
                        fontSize: "10px"
                      }}
                    >
                      {copiedVar === token.var ? "✓ Copied!" : token.var}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <Divider />

      {/* Icons Section */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <Title level={2} style={{ marginBottom: "var(--spacing-6)" }}>Icons (Remix Icon)</Title>
        <Card styles={{ body: { backgroundColor: "var(--background-secondary)" } }}>
          <div 
            style={{ 
              padding: "var(--spacing-6)",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--background-secondary)"
            }}
          >
            <div 
              className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12"
              style={{ gap: "var(--spacing-6)" }}
            >
              {[
                "ri-home-line",
                "ri-user-line",
                "ri-settings-line",
                "ri-search-line",
                "ri-menu-line",
                "ri-close-line",
                "ri-arrow-left-line",
                "ri-arrow-right-line",
                "ri-arrow-up-line",
                "ri-arrow-down-line",
                "ri-add-line",
                "ri-subtract-line",
                "ri-check-line",
                "ri-close-circle-line",
                "ri-information-line",
                "ri-alert-line",
                "ri-star-line",
                "ri-heart-line",
                "ri-share-line",
                "ri-download-line",
                "ri-upload-line",
                "ri-edit-line",
                "ri-delete-line",
                "ri-save-line",
              ].map((iconClass) => (
                <div 
                  key={iconClass} 
                  style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center" 
                  }}
                >
                  <i 
                    className={iconClass}
                    style={{ 
                      fontSize: "var(--size-3xl)",
                      marginBottom: "var(--spacing-2)",
                      color: "var(--text-primary)"
                    }} 
                  />
                  <div 
                    className="font-mono text-center break-all"
                    style={{ 
                      fontSize: "var(--size-xs)",
                      color: "var(--text-secondary)"
                    }}
                  >
                    {iconClass}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
