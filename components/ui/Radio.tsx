"use client";

import React from "react";
import { ds } from "@/design-system";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Radio size
   */
  size?: "small" | "middle" | "large";
  /**
   * Primary label text (displayed next to radio)
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
   * Whether the radio is checked
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when radio state changes
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the radio is disabled
   */
  disabled?: boolean;
  /**
   * Radio group name (required for radio groups)
   */
  name?: string;
  /**
   * Radio value
   */
  value?: string;
}

export const Radio: React.FC<RadioProps> = ({
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
  name,
  value,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  
  // Controlled vs uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  // Size styles based on design system
  const sizeStyles: Record<"small" | "middle" | "large", {
    radio: React.CSSProperties;
    dot: React.CSSProperties;
    marginTop: string;
    label: React.CSSProperties;
  }> = {
    small: {
      radio: {
        width: ds.common.size.radioSmall,
        height: ds.common.size.radioSmall,
        minWidth: ds.common.size.radioSmall,
        minHeight: ds.common.size.radioSmall,
      },
      dot: {
        width: ds.common.size.radioDotSmall,
        height: ds.common.size.radioDotSmall,
      },
      marginTop: "2px", // Align with text baseline
      label: {
        fontSize: ds.typography.size('sm'),
        lineHeight: ds.typography.lineHeight('sm'),
      },
    },
    middle: {
      radio: {
        width: ds.common.size.radioMiddle,
        height: ds.common.size.radioMiddle,
        minWidth: ds.common.size.radioMiddle,
        minHeight: ds.common.size.radioMiddle,
      },
      dot: {
        width: ds.common.size.radioDotMiddle,
        height: ds.common.size.radioDotMiddle,
      },
      marginTop: "2px", // Align with text baseline
      label: {
        fontSize: ds.typography.size('md'),
        lineHeight: ds.typography.lineHeight('md'),
      },
    },
    large: {
      radio: {
        width: ds.common.size.radioLarge,
        height: ds.common.size.radioLarge,
        minWidth: ds.common.size.radioLarge,
        minHeight: ds.common.size.radioLarge,
      },
      dot: {
        width: ds.common.size.radioDotLarge,
        height: ds.common.size.radioDotLarge,
      },
      marginTop: "0px", // Align with text baseline
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled) {
      setIsFocused(true);
      onFocus?.(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const radioId = id || `radio-${React.useId()}`;
  const labelId = label ? `${radioId}-label` : undefined;
  const descriptionId = description ? `${radioId}-description` : undefined;

  // Determine interaction state
  const interactionState = disabled ? "disabled" : isFocused ? "focus" : isHovered ? "hover" : "default";

  // Get radio styles based on state
  const getRadioStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
      transition: `all ${ds.common.animation.fast} ease`,
      borderRadius: ds.radius('full'), // Perfectly circular
      borderStyle: "solid",
      borderWidth: ds.common.borderWidth.thin,
      marginTop: sizeStyles[size].marginTop,
      ...sizeStyles[size].radio,
    };

    // Unchecked state
    if (!isChecked) {
      if (interactionState === "disabled") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.radio.bg('unchecked', 'disabled'),
          borderColor: ds.component.radio.border('unchecked', 'disabled'),
        };
      }
      if (interactionState === "focus") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.radio.bg('unchecked'),
          borderColor: ds.component.radio.border('unchecked', 'hover'),
          boxShadow: ds.component.radio.focusRing(),
        };
      }
      if (interactionState === "hover") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.radio.bg('unchecked'),
          borderColor: ds.component.radio.border('unchecked', 'hover'),
        };
      }
      return {
        ...baseStyles,
        backgroundColor: ds.component.radio.bg('unchecked'),
        borderColor: ds.component.radio.border('unchecked'),
      };
    }

    // Checked state
    if (interactionState === "disabled") {
      return {
        ...baseStyles,
        backgroundColor: ds.component.radio.bg('checked', 'disabled'),
        borderColor: ds.component.radio.border('checked', 'disabled'),
      };
    }
    if (interactionState === "focus") {
      return {
        ...baseStyles,
        backgroundColor: ds.component.radio.bg('checked'),
        borderColor: ds.component.radio.border('checked'),
        boxShadow: ds.component.radio.focusRing(),
      };
    }
    if (interactionState === "hover") {
      return {
        ...baseStyles,
        backgroundColor: ds.component.radio.bg('checked', 'hover'),
        borderColor: ds.component.radio.border('checked', 'hover'),
      };
    }
    return {
      ...baseStyles,
      backgroundColor: ds.component.radio.bg('checked'),
      borderColor: ds.component.radio.border('checked'),
    };
  };

  const radioStyles = getRadioStyles();

  // Dot styles (for checked state)
  const dotStyles: React.CSSProperties = {
    position: "absolute",
    borderRadius: ds.radius('full'),
    backgroundColor: ds.component.radio.dot(),
    pointerEvents: "none",
    ...sizeStyles[size].dot,
  };

  const radioElement = (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: ds.spacing('1') }}>
      <label
        htmlFor={radioId}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: labelPosition === "right" ? ds.spacing('3') : ds.spacing('3'),
          cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
          flexDirection: labelPosition === "left" ? "row-reverse" : "row",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={radioStyles}>
          <input
            id={radioId}
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
              zIndex: 1,
            }}
            {...props}
          />
          {isChecked && <div style={dotStyles} />}
        </div>
        {label && (
          <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing('1') }}>
            <span
              id={labelId}
              style={{
                ...sizeStyles[size].label,
                fontWeight: ds.typography.weight('regular'),
                color: disabled
                  ? ds.component.radio.label('disabled')
                  : ds.component.radio.label(),
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
                    ? ds.component.radio.description('disabled')
                    : ds.component.radio.description(),
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

  return <div className={className} style={style}>{radioElement}</div>;
};
