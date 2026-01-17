"use client";

import React from "react";
import { ds } from "@/design-system";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /**
   * Checkbox size
   */
  size?: "small" | "middle" | "large";
  /**
   * Primary label text (displayed next to checkbox)
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
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Indeterminate state (partially checked)
   */
  indeterminate?: boolean;
  /**
   * Callback fired when checkbox state changes
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  size = "middle",
  label,
  description,
  labelPosition = "right",
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  disabled = false,
  className = "",
  style,
  id,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Controlled vs uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  // Set indeterminate state
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, isChecked]);

  // Size styles based on design system
  const sizeStyles: Record<"small" | "middle" | "large", {
    checkbox: React.CSSProperties;
    marginTop: string;
    label: React.CSSProperties;
  }> = {
    small: {
      checkbox: {
        width: ds.common.size.checkboxSmall,
        height: ds.common.size.checkboxSmall,
        minWidth: ds.common.size.checkboxSmall,
        minHeight: ds.common.size.checkboxSmall,
      },
      marginTop: "2px", // (20px - 16px) / 2
      label: {
        fontSize: ds.typography.size('sm'),
        lineHeight: ds.typography.lineHeight('sm'),
      },
    },
    middle: {
      checkbox: {
        width: ds.common.size.checkboxMiddle,
        height: ds.common.size.checkboxMiddle,
        minWidth: ds.common.size.checkboxMiddle,
        minHeight: ds.common.size.checkboxMiddle,
      },
      marginTop: "2px", // (24px - 20px) / 2
      label: {
        fontSize: ds.typography.size('md'),
        lineHeight: ds.typography.lineHeight('md'),
      },
    },
    large: {
      checkbox: {
        width: ds.common.size.checkboxLarge,
        height: ds.common.size.checkboxLarge,
        minWidth: ds.common.size.checkboxLarge,
        minHeight: ds.common.size.checkboxLarge,
      },
      marginTop: "0px", // (24px - 24px) / 2
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

  const toggleId = id || `checkbox-${React.useId()}`;
  const labelId = label ? `${toggleId}-label` : undefined;
  const descriptionId = description ? `${toggleId}-description` : undefined;

  // Determine visual state
  const visualState = indeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked";
  const interactionState = disabled ? "disabled" : isFocused ? "focus" : isHovered ? "hover" : "default";

  // Get checkbox styles based on state
  const getCheckboxStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? ds.common.cursor.notAllowed : ds.common.cursor.pointer,
      transition: `all ${ds.common.animation.fast} ease`,
      borderRadius: "4px",
      borderStyle: "solid",
      borderWidth: ds.common.borderWidth.thin,
      marginTop: sizeStyles[size].marginTop,
      ...sizeStyles[size].checkbox,
    };

    // Unchecked state
    if (visualState === "unchecked") {
      if (interactionState === "disabled") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('unchecked', 'disabled'),
          borderColor: ds.component.checkbox.border('unchecked', 'disabled'),
        };
      }
      if (interactionState === "focus") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('unchecked'),
          borderColor: ds.component.checkbox.border('unchecked'),
          boxShadow: ds.component.checkbox.focusRing(),
        };
      }
      if (interactionState === "hover") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('unchecked'),
          borderColor: ds.component.checkbox.border('unchecked', 'hover'),
        };
      }
      return {
        ...baseStyles,
        backgroundColor: ds.component.checkbox.bg('unchecked'),
        borderColor: ds.component.checkbox.border('unchecked'),
      };
    }

    // Checked state
    if (visualState === "checked") {
      if (interactionState === "disabled") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('checked', 'disabled'),
          borderColor: ds.component.checkbox.border('checked', 'disabled'),
        };
      }
      if (interactionState === "focus") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('checked'),
          borderColor: ds.component.checkbox.border('checked'),
          boxShadow: ds.component.checkbox.focusRing(),
        };
      }
      if (interactionState === "hover") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('checked', 'hover'),
          borderColor: ds.component.checkbox.border('checked', 'hover'),
        };
      }
      return {
        ...baseStyles,
        backgroundColor: ds.component.checkbox.bg('checked'),
        borderColor: ds.component.checkbox.border('checked'),
      };
    }

    // Indeterminate state
    if (visualState === "indeterminate") {
      if (interactionState === "disabled") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('indeterminate', 'disabled'),
          borderColor: ds.component.checkbox.border('indeterminate', 'disabled'),
        };
      }
      if (interactionState === "focus") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('indeterminate'),
          borderColor: ds.component.checkbox.border('indeterminate'),
          boxShadow: ds.component.checkbox.focusRing(),
        };
      }
      if (interactionState === "hover") {
        return {
          ...baseStyles,
          backgroundColor: ds.component.checkbox.bg('indeterminate', 'hover'),
          borderColor: ds.component.checkbox.border('indeterminate', 'hover'),
        };
      }
      return {
        ...baseStyles,
        backgroundColor: ds.component.checkbox.bg('indeterminate'),
        borderColor: ds.component.checkbox.border('indeterminate'),
      };
    }

    return baseStyles;
  };

  const checkboxStyles = getCheckboxStyles();

  // Icon styles
  const iconStyles: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    color: ds.component.checkbox.icon(visualState, disabled ? 'disabled' : undefined),
  };

  const checkboxElement = (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: ds.spacing('1') }}>
      <label
        htmlFor={toggleId}
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
        <div style={checkboxStyles}>
          <input
            ref={inputRef}
            id={toggleId}
            type="checkbox"
            checked={isChecked && !indeterminate}
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
          <div style={iconStyles}>
            {visualState === "checked" && (
              <i className="ri-check-line" style={{ fontSize: ds.common.size.checkboxIcon(size), lineHeight: 1 }} />
            )}
            {visualState === "indeterminate" && (
              <i className="ri-subtract-line" style={{ fontSize: ds.common.size.checkboxIcon(size), lineHeight: 1 }} />
            )}
          </div>
        </div>
        {label && (
          <div style={{ display: "flex", flexDirection: "column", gap: ds.spacing('1') }}>
            <span
              id={labelId}
              style={{
                ...sizeStyles[size].label,
                fontWeight: ds.typography.weight('regular'),
                color: disabled
                  ? ds.component.checkbox.label('disabled')
                  : ds.component.checkbox.label(),
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
                    ? ds.component.checkbox.description('disabled')
                    : ds.component.checkbox.description(),
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

  return <div className={className} style={style}>{checkboxElement}</div>;
};
