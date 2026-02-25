#!/bin/bash

# Figma Design Token Extraction Script
# Extracts design tokens from Figma and converts to CSS variables

echo "🎨 Figma Design Token Extraction Script"
echo "======================================"

# Configuration
FIGMA_FILE_ID="${FIGMA_FILE_ID:-}"
FIGMA_ACCESS_TOKEN="${FIGMA_ACCESS_TOKEN:-}"
OUTPUT_DIR="./design-system/tokens"
TEMP_DIR="./temp/figma-extract"

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

# Function to check prerequisites
check_prerequisites() {
    print_status "INFO" "Checking prerequisites..."
    
    if [[ -z "$FIGMA_FILE_ID" ]]; then
        print_status "FAIL" "FIGMA_FILE_ID environment variable not set"
        echo "Usage: FIGMA_FILE_ID=your_file_id ./extract-tokens.sh"
        exit 1
    fi
    
    if [[ -z "$FIGMA_ACCESS_TOKEN" ]]; then
        print_status "FAIL" "FIGMA_ACCESS_TOKEN environment variable not set"
        echo "Usage: FIGMA_ACCESS_TOKEN=your_token ./extract-tokens.sh"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_status "FAIL" "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_status "FAIL" "npm is not installed"
        exit 1
    fi
    
    print_status "PASS" "Prerequisites check completed"
}

# Function to create output directory
create_output_directory() {
    print_status "INFO" "Creating output directory..."
    
    mkdir -p "$OUTPUT_DIR"
    mkdir -p "$TEMP_DIR"
    
    print_status "PASS" "Output directory created: $OUTPUT_DIR"
}

# Function to extract color tokens
extract_color_tokens() {
    print_status "INFO" "Extracting color tokens..."
    
    # Create Node.js script for color extraction
    cat > "$TEMP_DIR/extract-colors.js" << 'EOF'
const https = require('https');

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

function extractColors() {
    return new Promise((resolve, reject) => {
        const url = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`;
        
        const options = {
            headers: {
                'X-Figma-Token': FIGMA_ACCESS_TOKEN
            }
        };
        
        https.get(url, options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const figmaData = JSON.parse(data);
                    const colors = extractColorsFromDocument(figmaData.document);
                    resolve(colors);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

function extractColorsFromDocument(node) {
    const colors = {};
    
    function traverseNode(node) {
        if (node.type === 'RECTANGLE' || node.type === 'TEXT') {
            if (node.fills && node.fills.length > 0) {
                const fill = node.fills[0];
                if (fill.type === 'SOLID' && fill.color) {
                    const color = fill.color;
                    const hex = rgbToHex(color.r, color.g, color.b);
                    const name = node.name || `color-${Object.keys(colors).length + 1}`;
                    colors[name] = hex;
                }
            }
        }
        
        if (node.children) {
            node.children.forEach(child => traverseNode(child));
        }
    }
    
    traverseNode(node);
    return colors;
}

function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

extractColors()
    .then(colors => {
        console.log(JSON.stringify(colors, null, 2));
    })
    .catch(error => {
        console.error('Error extracting colors:', error);
        process.exit(1);
    });
EOF

    # Run color extraction
    cd "$TEMP_DIR"
    FIGMA_FILE_ID="$FIGMA_FILE_ID" FIGMA_ACCESS_TOKEN="$FIGMA_ACCESS_TOKEN" node extract-colors.js > colors.json
    
    if [[ $? -eq 0 ]]; then
        print_status "PASS" "Color tokens extracted successfully"
        
        # Generate CSS variables
        cat > "$OUTPUT_DIR/colors.css" << EOF
/* Allkons M Design System - Color Tokens */
/* Generated from Figma on $(date) */

:root {
EOF

        # Process colors and generate CSS variables
        if [[ -f "colors.json" ]]; then
            while IFS= read -r line; do
                if [[ $line =~ \"([^\"]+)\":\s*\"([^\"]+)\" ]]; then
                    local name="${BASH_REMATCH[1]}"
                    local color="${BASH_REMATCH[2]}"
                    local css_name=$(echo "$name" | sed 's/[^a-zA-Z0-9]/-/g' | tr '[:upper:]' '[:lower:]')
                    echo "  --color-${css_name}: ${color};" >> "$OUTPUT_DIR/colors.css"
                fi
            done < colors.json
        fi

        echo "}" >> "$OUTPUT_DIR/colors.css"
        
        print_status "PASS" "Color CSS variables generated"
    else
        print_status "FAIL" "Failed to extract color tokens"
        exit 1
    fi
    
    cd - > /dev/null
}

# Function to extract spacing tokens
extract_spacing_tokens() {
    print_status "INFO" "Extracting spacing tokens..."
    
    # Generate spacing scale based on common patterns
    cat > "$OUTPUT_DIR/spacing.css" << EOF
/* Allkons M Design System - Spacing Tokens */
/* Generated on $(date) */

:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
  
  /* Semantic spacing */
  --spacing-component-padding: var(--spacing-md);
  --spacing-section-gap: var(--spacing-xl);
  --spacing-container-margin: var(--spacing-2xl);
}
EOF

    print_status "PASS" "Spacing tokens generated"
}

# Function to extract typography tokens
extract_typography_tokens() {
    print_status "INFO" "Extracting typography tokens..."
    
    cat > "$OUTPUT_DIR/typography.css" << EOF
/* Allkons M Design System - Typography Tokens */
/* Generated on $(date) */

:root {
  /* Font families */
  --font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font sizes */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem;  /* 36px */
  
  /* Font weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
EOF

    print_status "PASS" "Typography tokens generated"
}

# Function to generate design system index
generate_design_system_index() {
    print_status "INFO" "Generating design system index..."
    
    cat > "$OUTPUT_DIR/index.css" << EOF
/* Allkons M Design System - Complete Token Set */
/* Generated from Figma on $(date) */

@import './colors.css';
@import './spacing.css';
@import './typography.css';

/* Construction Industry Specific Tokens */
:root {
  /* Construction colors */
  --color-construction-orange: #f97316;
  --color-safety-yellow: #eab308;
  --color-equipment-blue: #0ea5e9;
  --color-construction-gray: #6b7280;
  
  /* Construction spacing */
  --spacing-construction-gap: var(--spacing-lg);
  --spacing-equipment-margin: var(--spacing-xl);
}
EOF

    print_status "PASS" "Design system index generated"
}

# Function to cleanup
cleanup() {
    print_status "INFO" "Cleaning up temporary files..."
    rm -rf "$TEMP_DIR"
    print_status "PASS" "Cleanup completed"
}

# Function to show usage instructions
show_usage_instructions() {
    print_status "INFO" "Usage Instructions"
    print_status "INFO" "=================="
    echo ""
    echo "1. Import the design system in your CSS:"
    echo "   @import './design-system/tokens/index.css';"
    echo ""
    echo "2. Use tokens in your components:"
    echo "   color: var(--color-primary-500);"
    echo "   padding: var(--spacing-md);"
    echo "   font-size: var(--font-size-base);"
    echo ""
    echo "3. Update tokens when Figma designs change:"
    echo "   FIGMA_FILE_ID=your_file_id FIGMA_ACCESS_TOKEN=your_token ./extract-tokens.sh"
    echo ""
}

# Main execution
main() {
    print_status "INFO" "Starting Figma design token extraction..."
    
    check_prerequisites
    create_output_directory
    extract_color_tokens
    extract_spacing_tokens
    extract_typography_tokens
    generate_design_system_index
    cleanup
    show_usage_instructions
    
    print_status "PASS" "Design token extraction completed successfully!"
    echo ""
    print_status "INFO" "Generated files:"
    echo "  - $OUTPUT_DIR/colors.css"
    echo "  - $OUTPUT_DIR/spacing.css"
    echo "  - $OUTPUT_DIR/typography.css"
    echo "  - $OUTPUT_DIR/index.css"
}

# Handle script interruption
trap cleanup EXIT

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
