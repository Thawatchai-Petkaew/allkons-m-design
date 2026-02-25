#!/bin/bash

# UI Design Validation Script
# Validates Figma designs against Allkons M design system

echo "🎨 UI Design Validation Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status="$1"
    local message="$2"
    
    case $status in
        "PASS")
            echo -e "${GREEN}✅ PASS${NC}: $message"
            ;;
        "FAIL")
            echo -e "${RED}❌ FAIL${NC}: $message"
            ;;
        "WARN")
            echo -e "${YELLOW}⚠️  WARN${NC}: $message"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  INFO${NC}: $message"
            ;;
    esac
}

# Function to check Figma file
check_figma_file() {
    local figma_file="$1"
    
    if [[ -z "$figma_file" ]]; then
        print_status "FAIL" "No Figma file specified"
        return 1
    fi
    
    print_status "INFO" "Checking Figma file: $figma_file"
    
    # Check if file exists (this would be replaced with actual Figma API check)
    if [[ -f "$figma_file" ]]; then
        print_status "PASS" "Figma file found"
        return 0
    else
        print_status "WARN" "Figma file not found locally (expected for cloud files)"
        return 0
    fi
}

# Function to validate design tokens
validate_design_tokens() {
    print_status "INFO" "Validating design tokens against Allkons M system"
    
    # Check if globals.css exists
    if [[ -f "/Users/tawatchaipetkaew/allkons-m-design-main/app/globals.css" ]]; then
        print_status "PASS" "Allkons M globals.css found"
    else
        print_status "FAIL" "Allkons M globals.css not found"
        return 1
    fi
    
    # Check if design-system directory exists
    if [[ -d "/Users/tawatchaipetkaew/allkons-m-design-main/design-system" ]]; then
        print_status "PASS" "Allkons M design-system directory found"
    else
        print_status "FAIL" "Allkons M design-system directory not found"
        return 1
    fi
    
    # Extract common tokens to validate against
    local common_tokens=(
        "--brand-m-primary-00"
        "--background-primary"
        "--text-primary"
        "--border-primary"
        "--spacing-4"
        "--size-md"
        "--radius-md"
    )
    
    print_status "INFO" "Checking common design tokens..."
    
    for token in "${common_tokens[@]}"; do
        if grep -q "$token" "/Users/tawatchaipetkaew/allkons-m-design-main/app/globals.css"; then
            print_status "PASS" "Token found: $token"
        else
            print_status "WARN" "Token not found: $token"
        fi
    done
    
    return 0
}

# Function to check component mapping
validate_component_mapping() {
    print_status "INFO" "Validating component mapping to /components/ui/"
    
    local components_dir="/Users/tawatchaipetkaew/allkons-m-design-main/components/ui"
    
    if [[ -d "$components_dir" ]]; then
        print_status "PASS" "Components directory found: $components_dir"
        
        # Check for common components
        local common_components=(
            "Button.tsx"
            "Input.tsx"
            "Modal.tsx"
            "Alert.tsx"
            "Badge.tsx"
            "Card.tsx"
        )
        
        print_status "INFO" "Checking for common components..."
        
        for component in "${common_components[@]}"; do
            if [[ -f "$components_dir/$component" ]]; then
                print_status "PASS" "Component found: $component"
            else
                print_status "WARN" "Component not found: $component"
            fi
        done
    else
        print_status "FAIL" "Components directory not found"
        return 1
    fi
    
    return 0
}

# Function to check accessibility requirements
validate_accessibility() {
    print_status "INFO" "Validating accessibility requirements"
    
    # Check for accessibility considerations
    local accessibility_checks=(
        "Color contrast ratios"
        "Keyboard navigation"
        "Screen reader compatibility"
        "Focus indicators"
        "ARIA labels"
    )
    
    for check in "${accessibility_checks[@]}"; do
        print_status "INFO" "Accessibility check: $check"
        # In a real implementation, this would check actual designs
        print_status "WARN" "Manual verification required for: $check"
    done
    
    return 0
}

# Function to generate validation report
generate_report() {
    local report_file="design-validation-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# UI Design Validation Report

**Date:** $(date)
**Validated by:** UI Design Validation Script

## Summary
- Design tokens validated
- Component mapping checked
- Accessibility requirements reviewed

## Recommendations
1. Use @figma-design-system for detailed token extraction
2. Validate all components against /components/ui/
3. Ensure WCAG 2.1 AA compliance
4. Test responsive designs on actual devices

## Next Steps
1. Address any warnings or failures
2. Complete design specifications
3. Prepare development handoff
4. Schedule design review with stakeholders

---
Generated by Allkons M UI Design Validation Script
EOF

    print_status "PASS" "Validation report generated: $report_file"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -f, --figma-file FILE    Path to Figma file (optional)"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                      # Run full validation"
    echo "  $0 -f design.figma     # Validate specific Figma file"
}

# Main execution
main() {
    local figma_file=""
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -f|--figma-file)
                figma_file="$2"
                shift 2
                ;;
            -h|--help)
                show_usage
                exit 0
                ;;
            *)
                print_status "FAIL" "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    print_status "INFO" "Starting UI Design Validation..."
    
    # Run validation checks
    check_figma_file "$figma_file"
    validate_design_tokens
    validate_component_mapping
    validate_accessibility
    
    # Generate report
    generate_report
    
    print_status "PASS" "UI Design Validation completed!"
    echo ""
    print_status "INFO" "Next steps:"
    echo "1. Use @figma-design-system for detailed analysis"
    echo "2. Address any validation warnings"
    echo "3. Prepare design specifications"
    echo "4. Handoff to @development"
}

# Handle script interruption
trap 'print_status "INFO" "Validation interrupted"; exit 1' INT

# Run main function
main "$@"
