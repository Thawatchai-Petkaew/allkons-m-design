#!/usr/bin/env python3
"""
RICE Score Calculator for Allkons M Construction Marketplace Feature Prioritization

RICE = (Reach × Impact × Confidence) / Effort

Usage:
    python prioritize.py                    # Interactive mode
    python prioritize.py --batch features.csv  # Batch mode from CSV
    python prioritize.py --help             # Show help

Interactive mode will prompt for:
- Reach: Number of construction users affected per time period
- Impact: Value per construction stakeholder (0.25, 0.5, 1, 2, 3)
- Confidence: Certainty percentage (0-100%)
- Effort: Person-months of work

Batch mode expects CSV with columns: name,reach,impact,confidence,effort

Allkons M Specific Context:
- Reach: Contractors, suppliers, project managers affected
- Impact: Value for construction workflows and Master SKU integration
- Confidence: Certainty about construction market impact
- Effort: Development effort considering construction complexity
"""

import sys
import csv
import argparse
from typing import List, Dict, Tuple


class Feature:
    """Represents a feature with RICE scoring components for Allkons M."""

    def __init__(self, name: str, reach: float, impact: float, confidence: float, effort: float):
        self.name = name
        self.reach = reach
        self.impact = impact
        self.confidence = confidence
        self.effort = effort
        self.rice_score = self.calculate_rice()

    def calculate_rice(self) -> float:
        """Calculate RICE score: (Reach × Impact × Confidence) / Effort"""
        if self.effort == 0:
            return 0
        return (self.reach * self.impact * (self.confidence / 100)) / self.effort

    def get_priority_level(self) -> str:
        """Get priority level based on RICE score for Allkons M."""
        if self.rice_score >= 100:
            return "Critical (Must Have)"
        elif self.rice_score >= 50:
            return "High (Should Have)"
        elif self.rice_score >= 25:
            return "Medium (Could Have)"
        else:
            return "Low (Won't Have)"

    def get_allkons_context(self) -> str:
        """Get Allkons M specific context for this feature."""
        contexts = {
            "Master SKU": "Integrates with Master SKU system",
            "B2B": "Serves contractor/supplier needs",
            "B2C": "Serves consumer/DIY market",
            "Mobile": "Optimized for construction site usage",
            "Real-time": "Provides real-time data for construction"
        }
        
        feature_context = []
        name_lower = self.name.lower()
        
        for context, description in contexts.items():
            if any(keyword in name_lower for keyword in context.lower().split()):
                feature_context.append(f"{context}: {description}")
        
        return " | ".join(feature_context) if feature_context else "General construction marketplace feature"

    def __repr__(self) -> str:
        return f"Feature(name='{self.name}', rice={self.rice_score:.2f}, priority={self.get_priority_level()})"


def validate_impact(value: float) -> bool:
    """Validate impact is one of the allowed values."""
    allowed = [0.25, 0.5, 1, 2, 3]
    return value in allowed


def validate_confidence(value: float) -> bool:
    """Validate confidence is between 0 and 100."""
    return 0 <= value <= 100


def validate_positive(value: float) -> bool:
    """Validate value is positive."""
    return value > 0


def get_float_input(prompt: str, validator=None, error_msg: str = "Invalid input") -> float:
    """Get validated float input from user."""
    while True:
        try:
            value = float(input(prompt))
            if validator is None or validator(value):
                return value
            print(f"Error: {error_msg}")
        except ValueError:
            print("Error: Please enter a valid number")
        except KeyboardInterrupt:
            print("\n\nOperation cancelled by user")
            sys.exit(0)


def get_string_input(prompt: str) -> str:
    """Get string input from user."""
    try:
        value = input(prompt).strip()
        if not value:
            print("Error: Input cannot be empty")
            return get_string_input(prompt)
        return value
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user")
        sys.exit(0)


def interactive_mode() -> List[Feature]:
    """Run interactive mode to collect feature data for Allkons M."""
    print("=" * 80)
    print("RICE Score Calculator - Allkons M Construction Marketplace")
    print("=" * 80)
    print("\nRICE = (Reach × Impact × Confidence) / Effort")
    print("\nAllkons M Context:")
    print("  Reach: Number of contractors/suppliers affected per month")
    print("  Impact: Value for construction workflows and Master SKU integration")
    print("  Confidence: Certainty about construction market impact")
    print("  Effort: Person-months considering construction complexity\n")
    
    print("Impact Scale for Construction:")
    print("  0.25 = Minimal impact (small UI improvement)")
    print("  0.5  = Low impact (minor workflow improvement)")
    print("  1    = Medium impact (significant feature)")
    print("  2    = High impact (major workflow transformation)")
    print("  3    = Massive impact (industry-changing feature)\n")
    
    print("Example Features:")
    print("  - Master SKU Search Integration")
    print("  - Mobile RFQ Creation")
    print("  - Real-time Inventory Updates")
    print("  - B2B Bulk Ordering")
    print("  - Construction Site Offline Mode\n")
    
    print("Enter features one at a time. Type 'done' when finished.\n")

    features = []
    feature_num = 1

    while True:
        print(f"\n--- Feature {feature_num} ---")

        name = input("Feature name (or 'done' to finish): ").strip()
        if name.lower() == 'done':
            if features:
                break
            print("Please enter at least one feature")
            continue

        reach = get_float_input(
            "Reach (construction users affected per month): ",
            validate_positive,
            "Reach must be greater than 0"
        )

        impact = get_float_input(
            "Impact (0.25, 0.5, 1, 2, or 3): ",
            validate_impact,
            "Impact must be 0.25, 0.5, 1, 2, or 3"
        )

        confidence = get_float_input(
            "Confidence (0-100%): ",
            validate_confidence,
            "Confidence must be between 0 and 100"
        )

        effort = get_float_input(
            "Effort (person-months): ",
            validate_positive,
            "Effort must be greater than 0"
        )

        feature = Feature(name, reach, impact, confidence, effort)
        features.append(feature)

        print(f"\n✓ Added: {name}")
        print(f"  RICE Score: {feature.rice_score:.2f}")
        print(f"  Priority: {feature.get_priority_level()}")
        print(f"  Context: {feature.get_allkons_context()}")
        
        feature_num += 1

    return features


def batch_mode(csv_file: str) -> List[Feature]:
    """Load features from CSV file for Allkons M."""
    features = []

    try:
        with open(csv_file, 'r') as f:
            reader = csv.DictReader(f)
            required_columns = {'name', 'reach', 'impact', 'confidence', 'effort'}

            if not required_columns.issubset(set(reader.fieldnames)):
                print(f"Error: CSV must contain columns: {', '.join(required_columns)}")
                print("\nExample CSV format:")
                print("name,reach,impact,confidence,effort")
                print("Master SKU Search,5000,2,80,3")
                print("Mobile RFQ Creation,3000,1.5,70,2")
                print("Real-time Inventory,8000,1,90,4")
                sys.exit(1)

            print(f"\nLoading features from {csv_file}...")
            
            for row_num, row in enumerate(reader, start=2):
                try:
                    name = row['name'].strip()
                    reach = float(row['reach'])
                    impact = float(row['impact'])
                    confidence = float(row['confidence'])
                    effort = float(row['effort'])

                    # Validate
                    if not validate_positive(reach):
                        print(f"Warning: Row {row_num} - Reach must be positive, skipping")
                        continue
                    if not validate_impact(impact):
                        print(f"Warning: Row {row_num} - Impact must be 0.25, 0.5, 1, 2, or 3, skipping")
                        continue
                    if not validate_confidence(confidence):
                        print(f"Warning: Row {row_num} - Confidence must be 0-100, skipping")
                        continue
                    if not validate_positive(effort):
                        print(f"Warning: Row {row_num} - Effort must be positive, skipping")
                        continue

                    feature = Feature(name, reach, impact, confidence, effort)
                    features.append(feature)
                    print(f"✓ Loaded: {name} (RICE: {feature.rice_score:.2f})")

                except (ValueError, KeyError) as e:
                    print(f"Warning: Row {row_num} - Invalid data, skipping ({e})")
                    continue

        if not features:
            print("Error: No valid features found in CSV")
            sys.exit(1)
            
        print(f"\nSuccessfully loaded {len(features)} features from CSV")

    except FileNotFoundError:
        print(f"Error: File '{csv_file}' not found")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        sys.exit(1)

    return features


def display_results(features: List[Feature]):
    """Display prioritized features in a formatted table for Allkons M."""
    # Sort by RICE score descending
    sorted_features = sorted(features, key=lambda f: f.rice_score, reverse=True)

    print("\n" + "=" * 120)
    print("ALLKONS M CONSTRUCTION MARKETPLACE - PRIORITIZATION RESULTS")
    print("=" * 120)
    print(f"\n{'Rank':<6} {'Feature':<35} {'Reach':<12} {'Impact':<10} {'Confidence':<12} {'Effort':<10} {'RICE':<10} {'Priority':<20}")
    print("-" * 120)

    for rank, feature in enumerate(sorted_features, start=1):
        print(f"{rank:<6} {feature.name:<35} {feature.reach:<12.0f} {feature.impact:<10.2f} "
              f"{feature.confidence:<12.0f}% {feature.effort:<10.2f} {feature.rice_score:<10.2f} {feature.get_priority_level():<20}")

    print("\n" + "=" * 120)
    print("ALLKONS M PRIORITY INTERPRETATION:")
    print("  Critical (Must Have): Essential for construction marketplace launch")
    print("  High (Should Have): Important for competitive advantage")
    print("  Medium (Could Have): Nice to have if resources permit")
    print("  Low (Won't Have): Defer to future releases")
    print("\nCONSTRUCTION MARKET CONSIDERATIONS:")
    print("  - Prioritize Master SKU integration features")
    print("  - Consider mobile-first construction site usage")
    print("  - Balance B2B contractor needs with B2C consumer features")
    print("  - Account for construction industry seasonality")
    print("=" * 120 + "\n")

    # Display context breakdown
    print("\nFEATURE CONTEXT BREAKDOWN:")
    print("-" * 50)
    
    master_sku_features = [f for f in sorted_features if "master sku" in f.get_allkons_context().lower()]
    mobile_features = [f for f in sorted_features if "mobile" in f.get_allkons_context().lower()]
    b2b_features = [f for f in sorted_features if "b2b" in f.get_allkons_context().lower()]
    b2c_features = [f for f in sorted_features if "b2c" in f.get_allkons_context().lower()]
    
    if master_sku_features:
        print(f"Master SKU Features: {len(master_sku_features)}")
        for f in master_sku_features[:3]:  # Show top 3
            print(f"  - {f.name} (RICE: {f.rice_score:.2f})")
    
    if mobile_features:
        print(f"Mobile Features: {len(mobile_features)}")
        for f in mobile_features[:3]:  # Show top 3
            print(f"  - {f.name} (RICE: {f.rice_score:.2f})")
    
    if b2b_features:
        print(f"B2B Features: {len(b2b_features)}")
        for f in b2b_features[:3]:  # Show top 3
            print(f"  - {f.name} (RICE: {f.rice_score:.2f})")
    
    if b2c_features:
        print(f"B2C Features: {len(b2c_features)}")
        for f in b2c_features[:3]:  # Show top 3
            print(f"  - {f.name} (RICE: {f.rice_score:.2f})")
    
    print()


def export_results(features: List[Feature], output_file: str):
    """Export Allkons M results to CSV file."""
    sorted_features = sorted(features, key=lambda f: f.rice_score, reverse=True)

    try:
        with open(output_file, 'w', newline='') as f:
            fieldnames = ['rank', 'name', 'reach', 'impact', 'confidence', 'effort', 'rice_score', 'priority_level', 'context']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()

            for rank, feature in enumerate(sorted_features, start=1):
                writer.writerow({
                    'rank': rank,
                    'name': feature.name,
                    'reach': feature.reach,
                    'impact': feature.impact,
                    'confidence': feature.confidence,
                    'effort': feature.effort,
                    'rice_score': round(feature.rice_score, 2),
                    'priority_level': feature.get_priority_level(),
                    'context': feature.get_allkons_context()
                })

        print(f"\n✓ Allkons M prioritization results exported to: {output_file}")
        print(f"  Total features: {len(sorted_features)}")
        print(f"  Critical features: {len([f for f in sorted_features if f.get_priority_level().startswith('Critical')])}")
        print(f"  High priority features: {len([f for f in sorted_features if f.get_priority_level().startswith('High')])}")
    except Exception as e:
        print(f"Error exporting results: {e}")


def main():
    parser = argparse.ArgumentParser(
        description='RICE Score Calculator for Allkons M Construction Marketplace',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Allkons M Examples:
  python prioritize.py                              # Interactive mode
  python prioritize.py --batch features.csv         # Batch mode
  python prioritize.py -b features.csv -o results.csv  # Batch with export

Allkons M CSV Format:
  name,reach,impact,confidence,effort
  Master SKU Search Integration,5000,2,80,3
  Mobile RFQ Creation,3000,1.5,70,2
  Real-time Inventory Updates,8000,1,90,4
  B2B Bulk Ordering,2000,2.5,85,3.5

Construction Impact Values:
  0.25 = Minimal (small UI improvement)
  0.5  = Low (minor workflow improvement)
  1    = Medium (significant feature)
  2    = High (major workflow transformation)
  3    = Massive (industry-changing feature)

Allkons M Context:
  - Reach: Number of contractors/suppliers affected per month
  - Impact: Value for construction workflows and Master SKU integration
  - Confidence: Certainty about construction market impact
  - Effort: Person-months considering construction complexity
        """
    )

    parser.add_argument(
        '-b', '--batch',
        metavar='FILE',
        help='Load Allkons M features from CSV file (batch mode)'
    )

    parser.add_argument(
        '-o', '--output',
        metavar='FILE',
        help='Export Allkons M results to CSV file'
    )

    args = parser.parse_args()

    # Determine mode and collect features
    if args.batch:
        features = batch_mode(args.batch)
    else:
        features = interactive_mode()

    # Display results
    display_results(features)

    # Export if requested
    if args.output:
        export_results(features, args.output)
    elif args.batch:
        # Auto-export in batch mode for Allkons M
        output_file = args.batch.rsplit('.', 1)[0] + '_allkons_results.csv'
        export_results(features, output_file)


if __name__ == '__main__':
    main()
