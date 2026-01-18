"use client";

import React from "react";
import { ds } from "@/design-system";

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /**
   * Toggle variant
   * - circular: Circular track with sliding thumb (default)
   * - rectangular: Rectangular switch with ON/OFF text
   */
  variant?: "circular" | "rectangular";
  /**
   * Toggle size
   */
  size?: "small" | "middle" | "large";
  /**
   * Primary label text (displayed next to toggle)
   */
  label?: string;
  /**
   * Secondary description text (displayed below primary label)
   */
  description?: string;
  /**
   * Label position
   */
  labelPosition?: "left" | "right";
  /**
   * Whether the toggle is checked (on)
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when toggle state changes
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  variant = "circular",
  size = "middle",
  label,
  description,
  labelPosition = "right",
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = "",
  style,
  id,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  
  // Controlled vs uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  // Size styles based on design system
  const sizeStyles: Record<"small" | "middle" | "large", {
    track: React.CSSProperties;
    thumb: React.CSSProperties;
    rectangular: React.CSSProperties;
    marginTop: string;
    label: React.CSSProperties;
  }> = {
    small: {
      track: {
        width: ds.common.width.toggleSmall,
        height: ds.common.height.toggleSmall,
      },
      thumb: {
        width: ds.common.size.toggleThumbSmall,
        height: ds.common.size.toggleThumbSmall,
      },
      rectangular: {
        fontSize: ds.typography.size('sm'),
        lineHeight: ds.typography.lineHeight('sm'),
        paddingLeft: ds.spacing('1'),
        paddingRight: ds.spacing('1'),
        minWidth: ds.common.width.toggleRectangularSmall,
        height: ds.common.height.toggleSmall,
      },
      marginTop: "2px", // Alignment with first line of text (sm line-height: 20px, toggle height: 16px)
      label: {
        fontSize: ds.typography.size('sm'),
        lineHeight: ds.typography.lineHeight('sm'),
      },
    },
    middle: {
      track: {
        width: ds.common.width.toggleMiddle,
        height: ds.common.height.toggleMiddle,
      },
      thumb: {
        width: ds.common.size.toggleThumbMiddle,
        height: ds.common.size.toggleThumbMiddle,
      },
      rectangular: {
        fontSize: ds.typography.size('md'),
        lineHeight: ds.typography.lineHeight('md'),
        paddingLeft: ds.spacing('1'),
        paddingRight: ds.spacing('1'),
        minWidth: ds.common.width.toggleRectangularMiddle,
        height: ds.common.height.toggleMiddle,
      },
      marginTop: "2px", // Alignment with first line of text (md line-height: 24px, toggle height: 20px)
      label: {
        fontSize: ds.typography.size('md'),
        lineHeight: ds.typography.lineHeight('md'),
      },
    },
    large: {
      track: {
        width: ds.common.width.toggleLarge,
        height: ds.common.height.toggleLarge,
      },
      thumb: {
        width: ds.common.size.toggleThumbLarge,
        height: ds.common.size.toggleThumbLarge,
      },
      rectangular: {
        fontSize: ds.typography.size('lg'),
        lineHeight: ds.typography.lineHeight('lg'),
        paddingLeft: ds.spacing('1'),
        paddingRight: ds.spacing('1'),
        minWidth: ds.common.width.toggleRectangularLarge,
        height: ds.common.height.toggleLarge,
      },
      marginTop: "0px", // Alignment with first line of text (lg line-height: 24px, toggle height: 24px)
      label: {
        fontSize: ds.typography.size('lg'),
        lineHeight: ds.typography.lineHeight('lg'),
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const newChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked, e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleId = id || `toggle-${React.useId()}`;
  const labelId = label ? `${toggleId}-label` : undefined;
  const descriptionId = description ? `${toggleId}-description` : undefined;

  // Circular variant
  if (variant === "circular") {
    const trackStyles: React.CSSProperties = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
      transition: `all ${ds.common.animation.fast} ease`,
      borderRadius: ds.radius('full'),
      ...sizeStyles[size].track,
      backgroundColor: disabled
        ? (isChecked ? ds.component.toggle.circular.trackBg('checked', 'disabled') : ds.component.toggle.circular.trackBg('unchecked', 'disabled'))
        : isChecked
        ? ds.component.toggle.circular.trackBg('checked')
        : ds.component.toggle.circular.trackBg('unchecked'),
      ...(isHovered && !disabled && !isChecked ? { backgroundColor: ds.component.toggle.circular.trackBg('unchecked', 'hover') } : {}),
    };

    // Get thumb offset based on size
    const thumbOffset = size === 'small' 
      ? ds.common.size.toggleThumbOffsetSmall 
      : size === 'middle' 
      ? ds.common.size.toggleThumbOffsetMiddle 
      : ds.common.size.toggleThumbOffsetLarge;

    const thumbStyles: React.CSSProperties = {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: ds.radius('full'),
      backgroundColor: ds.component.toggle.circular.thumbBg(),
      transition: `all ${ds.common.animation.fast} ease`,
      pointerEvents: "none",
      ...sizeStyles[size].thumb,
      left: isChecked 
        ? `calc(100% - ${sizeStyles[size].thumb.width} - ${thumbOffset})` 
        : thumbOffset,
    };

    const toggleElement = (
      <div style={{ display: "inline-flex", flexDirection: "column", gap: ds.spacing('1') }}>
        <label
          htmlFor={toggleId}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: ds.spacing('3'),
            cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
            flexDirection: labelPosition === "left" ? "row-reverse" : "row",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={{ ...trackStyles, marginTop: sizeStyles[size].marginTop }}>
            <input
              id={toggleId}
              type="checkbox"
              checked={isChecked}
              disabled={disabled}
              onChange={handleChange}
              onClick={handleClick}
              aria-labelledby={labelId}
              aria-describedby={descriptionId}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                margin: 0,
                padding: 0,
                cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
                zIndex: 2,
                pointerEvents: disabled ? "none" : "auto",
              }}
              {...props}
            />
            <div style={{ ...thumbStyles, zIndex: 0 }} />
          </div>
          {label && (
            <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing('1') }}>
              <span
                id={labelId}
                style={{
                  ...sizeStyles[size].label,
                  fontWeight: ds.typography.weight('regular'),
                  color: disabled
                    ? ds.component.toggle.label('disabled')
                    : ds.component.toggle.label(),
                }}
              >
                {label}
              </span>
              {description && (
                <span
                  id={descriptionId}
                  style={{
                    fontSize: ds.typography.size('sm'),
                    lineHeight: ds.typography.lineHeight('sm'),
                    fontWeight: ds.typography.weight('regular'),
                    color: disabled
                      ? ds.component.toggle.description('disabled')
                      : ds.component.toggle.description(),
                  }}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
      </div>
    );

    return <div className={className} style={style}>{toggleElement}</div>;
  }

  // Rectangular variant
  // Extract minWidth and height from sizeStyles, but override padding
  const { paddingLeft: _, paddingRight: __, ...restRectangularStyles } = sizeStyles[size].rectangular;
  
  const rectangularStyles: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
    transition: `all ${ds.common.animation.fast} ease`,
    borderRadius: ds.radius('full'), // Full rounded
    fontWeight: ds.typography.weight('semibold'),
    ...restRectangularStyles, // Use size styles except padding
    backgroundColor: disabled
      ? (isChecked ? ds.component.toggle.rectangular.bg('checked', 'disabled') : ds.component.toggle.rectangular.bg('unchecked', 'disabled'))
      : isChecked
      ? ds.component.toggle.rectangular.bg('checked')
      : ds.component.toggle.rectangular.bg('unchecked'),
    ...(isHovered && !disabled && !isChecked ? { backgroundColor: ds.component.toggle.rectangular.bg('unchecked', 'hover') } : {}),
    overflow: "hidden", // Ensure text doesn't overflow when knob moves
    paddingLeft: ds.spacing('1'), // Balanced padding from left edge (4px)
    paddingRight: ds.spacing('1'), // Balanced padding from right edge (4px)
    gap: ds.spacing('none'), // No gap between text and knob
  };

  // Rectangular knob styles (similar to circular variant but moves horizontally)
  const knobWidth = sizeStyles[size].thumb.width;
  
  const rectangularKnobStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ds.radius('full'),
    backgroundColor: ds.component.toggle.circular.thumbBg(),
    transition: `all ${ds.common.animation.fast} ease`,
    pointerEvents: "none",
    flexShrink: 0, // Prevent knob from shrinking
    ...sizeStyles[size].thumb,
    boxShadow: ds.component.modal.shadow(), // Shadow for elevation (using modal shadow token)
  };

  // Text container styles - fills available space and centers text
  const textContainerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Fill available space to push knob out
    height: "100%",
    minWidth: 0, // Allow shrinking if needed
  };

  // Text styles for ON/OFF - fills container and centers text
  const textStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    fontWeight: ds.typography.weight('semibold'),
    fontSize: sizeStyles[size].rectangular.fontSize,
    lineHeight: sizeStyles[size].rectangular.lineHeight,
    color: disabled
      ? (isChecked ? ds.component.toggle.rectangular.text('checked', 'disabled') : ds.component.toggle.rectangular.text('unchecked', 'disabled'))
      : isChecked
      ? ds.component.toggle.rectangular.text('checked')
      : ds.component.toggle.rectangular.text('unchecked'),
    pointerEvents: "none",
    userSelect: "none",
    whiteSpace: "nowrap", // Prevent text wrapping
    textAlign: "center", // Center align text
  };

  const toggleElement = (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: ds.spacing('1') }}>
      <label
        htmlFor={toggleId}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: ds.spacing('3'),
          cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
          flexDirection: labelPosition === "left" ? "row-reverse" : "row",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ ...rectangularStyles, marginTop: sizeStyles[size].marginTop }}>
          <input
            id={toggleId}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            onClick={handleClick}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              margin: 0,
              padding: 0,
              cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
              zIndex: 3,
              pointerEvents: disabled ? "none" : "auto",
            }}
            {...props}
          />
          {/* Layout: ON state = [Text Container (flex:1)] [Knob], OFF state = [Knob] [Text Container (flex:1)] */}
          {isChecked ? (
            <>
              {/* ON: Text container fills left side, Knob on right */}
              <div style={textContainerStyles}>
                <span style={textStyles}>ON</span>
              </div>
              <div style={rectangularKnobStyles} />
            </>
          ) : (
            <>
              {/* OFF: Knob on left, Text container fills right side */}
              <div style={rectangularKnobStyles} />
              <div style={textContainerStyles}>
                <span style={textStyles}>OFF</span>
              </div>
            </>
          )}
        </div>
        {label && (
          <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing('1') }}>
            <span
              id={labelId}
              style={{
                ...sizeStyles[size].label,
                fontWeight: ds.typography.weight('regular'),
                color: disabled
                  ? ds.component.toggle.label('disabled')
                  : ds.component.toggle.label(),
              }}
            >
              {label}
            </span>
            {description && (
              <span
                id={descriptionId}
                style={{
                  fontSize: ds.typography.size('sm'),
                  lineHeight: ds.typography.lineHeight('sm'),
                  fontWeight: ds.typography.weight('regular'),
                  color: disabled
                    ? ds.component.toggle.description('disabled')
                    : ds.component.toggle.description(),
                }}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    </div>
  );

  return <div className={className} style={style}>{toggleElement}</div>;
};
