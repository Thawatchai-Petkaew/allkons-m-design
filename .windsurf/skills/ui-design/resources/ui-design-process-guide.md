# UI Design Process Guide

## Overview

This guide provides comprehensive instructions for UI design process at Allkons M, ensuring design system compliance and successful handoff to development.

## UI Design Workflow

### Phase 1: Requirements Analysis

#### Understanding Construction Marketplace Needs
- **User Research:** Interview contractors, suppliers, and project managers
- **Workflow Analysis:** Map construction material procurement processes
- **Technical Constraints:** Review platform capabilities and limitations
- **Business Objectives:** Align design with Allkons M strategic goals

#### Key Questions to Answer
- Who are the primary users? (contractors, suppliers, project owners)
- What are their main pain points with current solutions?
- How will they use the feature on construction sites?
- What devices will they use? (mobile, tablet, desktop)
- What are the accessibility requirements?

### Phase 2: Design Creation

#### Wireframing Process
1. **Low-Fidelity Sketches**
   - Basic layout and structure
   - User flow mapping
   - Information architecture

2. **High-Fidelity Wireframes**
   - Detailed component placement
   - Responsive layout planning
   - Interaction patterns

#### Visual Design in Figma
1. **Apply Allkons M Design System**
   - Use existing tokens from `/app/globals.css`
   - Leverage `/components/ui/` components
   - Follow component hierarchy: Allkons UI → Ant Design → Custom

2. **Construction Industry Considerations**
   - Large touch targets for gloved hands
   - High contrast for outdoor visibility
   - Simple navigation for quick access
   - Offline capability indicators

#### Responsive Design Strategy
```css
/* Mobile-first breakpoints */
/* Mobile: < 768px - Primary usage on construction sites */
/* Tablet: 768px - 1024px - Office and planning */
/* Desktop: > 1024px - Detailed management tasks */
```

### Phase 3: Design System Validation

#### Use @figma-design-system Skill
Before finalizing designs, always run:
```
@figma-design-system
```

This skill will:
- Extract design tokens from Figma
- Map to existing `/app/globals.css` tokens
- Identify available `/components/ui/` components
- Validate design system compliance
- Generate implementation guidance

#### Design Token Validation
```typescript
// Validate against existing tokens
const tokenValidation = {
  colors: {
    primary: 'var(--brand-m-primary-00)',
    background: 'var(--background-primary)',
    text: 'var(--text-primary)',
    border: 'var(--border-primary)',
  },
  spacing: {
    xs: 'var(--spacing-1)',    // 4px
    sm: 'var(--spacing-2)',    // 8px
    md: 'var(--spacing-4)',    // 16px
    lg: 'var(--spacing-6)',    // 24px
    xl: 'var(--spacing-8)',    // 32px
  },
  typography: {
    sm: 'var(--size-sm)',      // 14px
    md: 'var(--size-md)',      // 16px
    lg: 'var(--size-lg)',      // 18px
    xl: 'var(--size-xl)',      // 20px
  }
};
```

#### Component Mapping Strategy
```typescript
// Map Figma components to Allkons M components
const componentMap = {
  // Common UI elements
  'Button': '/components/ui/Button',
  'Input': '/components/ui/Input',
  'Modal': '/components/ui/Modal',
  'Alert': '/components/ui/Alert',
  'Badge': '/components/ui/Badge',
  
  // Construction specific
  'ProductCard': '/components/ui/Card',
  'MaterialList': '/components/ui/List',
  'SupplierInfo': '/components/ui/Card',
  'PriceDisplay': '/components/ui/Badge',
};
```

### Phase 4: Design Review & Iteration

#### Stakeholder Review Process
1. **Internal Design Review**
   - Design system compliance check
   - User experience validation
   - Technical feasibility assessment

2. **Stakeholder Presentation**
   - Construction industry experts
   - Product management team
   - Development team representatives

3. **User Testing**
   - Usability testing with target users
   - Accessibility testing
   - Mobile device testing

#### Feedback Integration
- Document all feedback systematically
- Prioritize changes based on impact
- Update designs iteratively
- Maintain version control in Figma

### Phase 5: Development Handoff

#### Design Specification Template
```markdown
# [Feature Name] Design Specifications

## Overview
- **Purpose:** [Brief description of feature purpose]
- **Target Users:** [Primary user groups]
- **Device Priority:** [Mobile-first/Tablet-first/Desktop-first]

## Design System Compliance
- **Tokens Used:** [List of design tokens]
- **Components Used:** [List of Allkons M components]
- **Custom Components:** [Any new components required]

## Component Mapping
| Figma Component | Allkons M Component | Notes |
|----------------|-------------------|-------|
| [Component Name] | [/components/ui/Component] | [Mapping notes] |

## Responsive Design
- **Mobile Layout:** [< 768px specifications]
- **Tablet Layout:** [768px - 1024px specifications]
- **Desktop Layout:** [> 1024px specifications]

## Accessibility Requirements
- **WCAG Compliance:** [Level achieved]
- **Keyboard Navigation:** [Requirements]
- **Screen Reader Support:** [Requirements]
- **Color Contrast:** [Ratios met]

## Figma Assets
- **Design File:** [Figma URL]
- **Prototype:** [Prototype URL]
- **Component Library:** [Library URL]
- **Export Assets:** [Asset specifications]

## Development Notes
- [Specific implementation notes]
- [Potential challenges]
- [Dependencies on other features]
```

#### Handoff Checklist
Before sending to @development:
- [ ] Design validated with `@figma-design-system`
- [ ] All components mapped to `/components/ui/`
- [ ] Design tokens documented
- [ ] Responsive designs completed
- [ ] Accessibility requirements met
- [ ] Figma components organized and named
- [ ] Design specifications prepared
- [ ] Development handoff document created

## Construction Industry Design Patterns

### Mobile-First Considerations
```css
/* Large touch targets for construction site use */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: var(--spacing-3);
}

/* High contrast for outdoor visibility */
.high-contrast {
  color: var(--text-primary);
  background: var(--background-primary);
  border: 2px solid var(--border-primary);
}
```

### Workflow Optimization
- **Progressive Disclosure:** Complex information revealed progressively
- **Quick Actions:** Frequently used features easily accessible
- **Status Indicators:** Clear visual feedback for system status
- **Error Prevention:** Design prevents common user errors

### Data Display Patterns
- **Material Cards:** Consistent product information display
- **Status Badges:** Clear availability and pricing status
- **Filter Controls:** Intuitive filtering and sorting
- **Search Results:** Optimized for construction material search

## Quality Assurance

### Design Quality Checklist
- [ ] Follows Allkons M design system
- [ ] Mobile-first responsive design
- [ ] Accessibility compliant (WCAG 2.1 AA)
- [ ] Construction industry optimized
- [ ] Component mapping complete
- [ ] Design tokens documented
- [ ] User tested and validated

### Common Design Issues to Avoid
- **Hardcoded Values:** Always use design tokens
- **Custom Components:** Use existing `/components/ui/` first
- **Poor Contrast:** Ensure outdoor visibility
- **Small Touch Targets:** Consider gloved hands
- **Complex Navigation:** Simplify for construction site use

## Tools and Resources

### Required Tools
- **Figma:** Primary design tool
- **Figma Dev Mode:** Design-to-code workflow
- **Design System:** Allkons M design tokens and components
- **Accessibility Tools:** Contrast checkers, screen readers

### Helpful Resources
- **Allkons M Design System Documentation**
- **Construction Industry UX Guidelines**
- **Mobile Design Best Practices**
- **Accessibility Compliance Standards**

---

This guide ensures consistent, high-quality UI design that integrates seamlessly with the Allkons M development process and meets the unique needs of the construction marketplace.
