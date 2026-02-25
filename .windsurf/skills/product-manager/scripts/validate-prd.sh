#!/bin/bash
#
# Allkons M PRD Validation Script
#
# Validates that a Product Requirements Document for Allkons M construction marketplace
# contains all required sections and meets quality standards.
#
# Usage:
#   ./validate-prd.sh <prd-file>
#   ./validate-prd.sh --help
#
# Allkons M Specific Checks:
# - Master SKU integration requirements
# - B2B/B2C hybrid model specifications
# - Construction industry context
# - Mobile-first considerations
# - Construction site usage scenarios

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0
WARN=0

# Functions
show_help() {
    cat << EOF
Allkons M PRD Validation Script

Validates that a Product Requirements Document for Allkons M construction marketplace
contains all required sections and meets quality standards.

Usage:
    $0 <prd-file>
    $0 --help

Allkons M Required Sections:
    - Executive Summary
    - Project Overview (Construction Marketplace)
    - Functional Requirements (FR-XXX)
    - Non-Functional Requirements (NFR-XXX)
    - Master SKU Integration Requirements
    - B2B/B2C Hybrid Model Specifications
    - Epics and User Stories
    - Success Metrics (Construction-specific)
    - Assumptions and Dependencies
    - Out of Scope

Allkons M Quality Checks:
    - Requirements have unique IDs (FR-XXX, NFR-XXX)
    - Requirements have priorities (MUST/SHOULD/COULD/WONT)
    - Requirements have acceptance criteria
    - Master SKU integration is clearly defined
    - B2B/B2C segments are addressed
    - Mobile-first construction site usage considered
    - Construction industry context is present
    - Epics are defined with user stories
    - Success metrics are measurable

Exit Codes:
    0 - All validations passed
    1 - One or more validations failed
    2 - Invalid usage or file not found

Examples:
    $0 docs/prd-allkons-rfq-system.md
    $0 ../requirements/construction-marketplace-prd.md
EOF
}

print_header() {
    echo -e "\n${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}\n"
}

print_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASS++))
}

print_fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAIL++))
}

print_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARN++))
}

check_section() {
    local file=$1
    local section=$2
    local pattern=$3

    if grep -q "$pattern" "$file"; then
        print_pass "Section present: $section"
        return 0
    else
        print_fail "Section missing: $section"
        return 1
    fi
}

check_requirements_format() {
    local file=$1
    local req_type=$2
    local pattern=$3

    local count=$(grep -c "$pattern" "$file" || true)

    if [ "$count" -gt 0 ]; then
        print_pass "Found $count $req_type requirements with proper IDs"
        return 0
    else
        print_fail "No $req_type requirements found with format $pattern"
        return 1
    fi
}

check_priorities() {
    local file=$1

    # Check for priority keywords
    if grep -qiE "(MUST|SHOULD|COULD|WO?N'?T)" "$file"; then
        local must_count=$(grep -ciE "MUST" "$file" || true)
        local should_count=$(grep -ciE "SHOULD" "$file" || true)
        local could_count=$(grep -ciE "COULD" "$file" || true)

        print_pass "Priorities assigned (MUST: $must_count, SHOULD: $should_count, COULD: $could_count)"
        return 0
    else
        print_fail "No priority assignments found (MUST/SHOULD/COULD/WONT)"
        return 1
    fi
}

check_acceptance_criteria() {
    local file=$1

    local criteria_count=$(grep -ciE "(acceptance criteria|acceptance criterion)" "$file" || true)

    if [ "$criteria_count" -gt 0 ]; then
        print_pass "Found $criteria_count acceptance criteria sections"
        return 0
    else
        print_fail "No acceptance criteria found"
        return 1
    fi
}

check_allkons_master_sku() {
    local file=$1

    if grep -qiE "(master sku|master-sku|Master SKU)" "$file"; then
        print_pass "Master SKU integration requirements found"
        return 0
    else
        print_fail "Master SKU integration requirements missing"
        return 1
    fi
}

check_allkons_b2b_b2c() {
    local file=$1

    local b2b_count=$(grep -ciE "(B2B|b2b|business to business)" "$file" || true)
    local b2c_count=$(grep -ciE "(B2C|b2c|business to consumer)" "$file" || true)

    if [ "$b2b_count" -gt 0 ] && [ "$b2c_count" -gt 0 ]; then
        print_pass "B2B/B2C hybrid model addressed (B2B: $b2b_count, B2C: $b2c_count)"
        return 0
    elif [ "$b2b_count" -gt 0 ]; then
        print_warn "B2B requirements found but B2C missing"
        return 1
    elif [ "$b2c_count" -gt 0 ]; then
        print_warn "B2C requirements found but B2B missing"
        return 1
    else
        print_fail "B2B/B2C hybrid model not addressed"
        return 1
    fi
}

check_allkons_mobile() {
    local file=$1

    if grep -qiE "(mobile|construction site|on-site|field use)" "$file"; then
        print_pass "Mobile-first construction site usage considered"
        return 0
    else
        print_warn "Mobile-first construction site usage not explicitly addressed"
        return 1
    fi
}

check_allkons_construction_context() {
    local file=$1

    local construction_terms=("contractor" "supplier" "construction" "material" "RFQ" "procurement")
    local found_terms=0
    
    for term in "${construction_terms[@]}"; do
        if grep -qi "$term" "$file"; then
            ((found_terms++))
        fi
    done
    
    if [ "$found_terms" -ge 3 ]; then
        print_pass "Construction industry context present ($found_terms/6 terms)"
        return 0
    else
        print_warn "Limited construction industry context ($found_terms/6 terms)"
        return 1
    fi
}

check_epics() {
    local file=$1

    if grep -qiE "(epic|Epic|EPIC)" "$file"; then
        local epic_count=$(grep -ciE "^#{1,3} Epic" "$file" || true)
        print_pass "Found epics in document"
        return 0
    else
        print_fail "No epics found"
        return 1
    fi
}

check_metrics() {
    local file=$1

    if grep -qiE "(success metric|success criteria|measure|kpi|objective)" "$file"; then
        print_pass "Success metrics defined"
        return 0
    else
        print_warn "Success metrics not clearly defined"
        return 1
    fi
}

# Validate arguments
if [ $# -eq 0 ]; then
    echo -e "${RED}Error: No PRD file specified${NC}\n"
    show_help
    exit 2
fi

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_help
    exit 0
fi

PRD_FILE=$1

# Check file exists
if [ ! -f "$PRD_FILE" ]; then
    echo -e "${RED}Error: File not found: $PRD_FILE${NC}"
    exit 2
fi

# Start validation
print_header "Validating PRD: $PRD_FILE"

echo "File size: $(wc -c < "$PRD_FILE") bytes"
echo "Line count: $(wc -l < "$PRD_FILE") lines"
echo ""

# Required Sections
print_header "Required Sections"

check_section "$PRD_FILE" "Executive Summary" "^#{1,3} Executive Summary"
check_section "$PRD_FILE" "Project Overview" "^#{1,3} .*[Pp]roject.*[Oo]verview"
check_section "$PRD_FILE" "Functional Requirements" "^#{1,3} Functional Requirements"
check_section "$PRD_FILE" "Non-Functional Requirements" "^#{1,3} Non-Functional Requirements"
check_section "$PRD_FILE" "Master SKU Integration" "^#{1,3} .*[Mm]aster.*[Ss][Kk][Uu]"
check_section "$PRD_FILE" "B2B/B2C Model" "^#{1,3} .*[Bb]2[BC]/?[Bb]2[BC]"
check_section "$PRD_FILE" "Success Metrics" "^#{1,3} Success Metrics"
check_section "$PRD_FILE" "Assumptions" "^#{1,3} Assumptions"
check_section "$PRD_FILE" "Out of Scope" "^#{1,3} Out of Scope"

# Requirements Format
print_header "Requirements Format"

check_requirements_format "$PRD_FILE" "Functional" "FR-[0-9]"
check_requirements_format "$PRD_FILE" "Non-Functional" "NFR-[0-9]"

# Priority Assignments
print_header "Priority Assignments"

check_priorities "$PRD_FILE"

# Allkons M Specific Checks
print_header "Allkons M Specific Validation"

check_allkons_master_sku "$PRD_FILE"
check_allkons_b2b_b2c "$PRD_FILE"
check_allkons_mobile "$PRD_FILE"
check_allkons_construction_context "$PRD_FILE"

# Acceptance Criteria
print_header "Acceptance Criteria"

check_acceptance_criteria "$PRD_FILE"

# Epics and Stories
print_header "Epics and User Stories"

check_epics "$PRD_FILE"

if grep -qiE "(user story|as a .* I want|as an .* I want)" "$PRD_FILE"; then
    print_pass "User stories found in document"
else
    print_warn "No user stories found (recommended but not required)"
fi

# Success Metrics
print_header "Success Metrics and Traceability"

check_metrics "$PRD_FILE"

# Check for traceability matrix or requirements mapping
if grep -qiE "(traceability|requirements matrix|requirements mapping)" "$PRD_FILE"; then
    print_pass "Traceability section found"
else
    print_warn "Traceability matrix not found (recommended for complex PRDs)"
fi

# Quality Checks
print_header "Quality Checks"

# Check for vague terms
vague_terms=("user-friendly" "intuitive" "easy" "simple" "fast" "good" "better" "improved")
vague_found=0
for term in "${vague_terms[@]}"; do
    if grep -qiE "\b$term\b" "$PRD_FILE"; then
        ((vague_found++))
    fi
done

# Check for construction-specific vague terms
construction_vague_terms=("construction-friendly" "contractor-friendly" "supplier-friendly" "site-friendly")
construction_vague_found=0
for term in "${construction_vague_terms[@]}"; do
    if grep -qiE "\b$term\b" "$PRD_FILE"; then
        ((construction_vague_found++))
    fi
done

total_vague=$((vague_found + construction_vague_found))

if [ $total_vague -gt 5 ]; then
    print_warn "Document contains many vague terms ($total_vague instances). Consider using specific, measurable criteria."
else
    print_pass "Minimal use of vague terms (good specificity)"
fi

# Check for "shall" statements (formal requirements style)
shall_count=$(grep -ciE "\bshall\b" "$PRD_FILE" || true)
if [ $shall_count -gt 0 ]; then
    print_pass "Using formal requirements language ('shall' statements: $shall_count)"
else
    print_warn "Consider using 'shall' statements for formal requirements"
fi

# Check document length
line_count=$(wc -l < "$PRD_FILE")
if [ $line_count -lt 50 ]; then
    print_warn "Document is quite short ($line_count lines). Ensure all sections are complete."
elif [ $line_count -gt 1000 ]; then
    print_warn "Document is very long ($line_count lines). Consider splitting into multiple documents."
else
    print_pass "Document length is reasonable ($line_count lines)"
fi

# Summary
print_header "Validation Summary"

total=$((PASS + FAIL + WARN))
echo -e "${GREEN}Passed:${NC}  $PASS/$total"
echo -e "${RED}Failed:${NC}  $FAIL/$total"
echo -e "${YELLOW}Warnings:${NC} $WARN/$total"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ Allkons M PRD validation passed!${NC}"
    if [ $WARN -gt 0 ]; then
        echo -e "${YELLOW}  (with $WARN warnings - review recommended)${NC}"
    fi
    exit 0
else
    echo -e "${RED}✗ Allkons M PRD validation failed with $FAIL errors${NC}"
    echo "Please address the failed checks above."
    exit 1
fi
