"use client";

import { Card, Divider, Typography, Space } from "antd";
import { Button, Input, Toggle, Checkbox, Radio, Alert, Icon, Select, Textarea, Modal } from "@/components";
import { useState } from "react";
import { ds } from "@/design-system";

const { Title, Text } = Typography;

export default function ComponentsPage() {
  const [loading, setLoading] = useState(false);
  
  // Toggle states
  const [toggleCircular1, setToggleCircular1] = useState(false);
  const [toggleCircular2, setToggleCircular2] = useState(true);
  const [toggleCircular3, setToggleCircular3] = useState(false);
  const [toggleCircular4, setToggleCircular4] = useState(true);
  const [toggleCircular5, setToggleCircular5] = useState(false);
  const [toggleCircular6, setToggleCircular6] = useState(true);
  const [toggleCircular7, setToggleCircular7] = useState(false);
  const [toggleCircular8, setToggleCircular8] = useState(true);
  const [toggleCircular9, setToggleCircular9] = useState(false);
  const [toggleCircular10, setToggleCircular10] = useState(true);
  const [toggleCircular11, setToggleCircular11] = useState(false);
  const [toggleCircular12, setToggleCircular12] = useState(true);
  const [toggleCircular13, setToggleCircular13] = useState(false);
  const [toggleCircular14, setToggleCircular14] = useState(true);
  
  const [toggleRectangular1, setToggleRectangular1] = useState(false);
  const [toggleRectangular2, setToggleRectangular2] = useState(true);
  const [toggleRectangular3, setToggleRectangular3] = useState(false);
  const [toggleRectangular4, setToggleRectangular4] = useState(true);
  const [toggleRectangular5, setToggleRectangular5] = useState(false);
  const [toggleRectangular6, setToggleRectangular6] = useState(true);
  const [toggleRectangular7, setToggleRectangular7] = useState(false);
  const [toggleRectangular8, setToggleRectangular8] = useState(true);
  const [toggleRectangular9, setToggleRectangular9] = useState(false);
  const [toggleRectangular10, setToggleRectangular10] = useState(true);
  const [toggleRectangular11, setToggleRectangular11] = useState(false);
  const [toggleRectangular12, setToggleRectangular12] = useState(true);
  const [toggleRectangular13, setToggleRectangular13] = useState(false);
  const [toggleRectangular14, setToggleRectangular14] = useState(true);
  
  // Checkbox states
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(true);
  const [checkbox5, setCheckbox5] = useState(true);
  const [checkbox6, setCheckbox6] = useState(true);
  
  // Radio states
  const [radioValue, setRadioValue] = useState<string | undefined>(undefined);
  const [radioValue2, setRadioValue2] = useState<string>("option1");

  // Modal states
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [footerModalOpen, setFooterModalOpen] = useState(false);

  return (
    <div 
      style={{ 
        maxWidth: ds.common.layout.containerMaxWidth,
        margin: "0 auto",
        padding: `${ds.spacing(12)} ${ds.spacing(8)}`,
        backgroundColor: ds.color.background('primary')
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: ds.spacing(16) }}>
        <Title 
          level={1} 
          style={{ 
            marginBottom: ds.spacing(4),
            fontSize: ds.typography.size('6xl'),
            fontWeight: ds.typography.weight('bold'),
            color: ds.color.text('primary')
          }}
        >
          Components
        </Title>
        <Text 
          style={{ 
            fontSize: ds.typography.size('lg'),
            color: ds.color.text('secondary'),
            lineHeight: ds.typography.lineHeight('lg')
          }}
        >
          A collection of reusable UI components built with our design system
        </Text>
      </div>

      {/* Button Section */}
      <section style={{ marginBottom: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Button
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Buttons are used to trigger actions and navigate through the interface
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Primary Variant */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Primary
            </Title>
            
            {/* Brand */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Brand
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="primary" color="brand" size="small">Button</Button>
                <Button variant="primary" color="brand" size="middle">Button</Button>
                <Button variant="primary" color="brand" size="large">Button</Button>
                <Button variant="primary" color="brand" size="middle" disabled>Disabled</Button>
                <Button variant="primary" color="brand" size="middle" loading={loading} onClick={() => setLoading(!loading)}>
                  {loading ? "Loading" : "Loading State"}
                </Button>
                <Button variant="primary" color="brand" size="middle" icon={<i className="ri-search-line" />}>
                  With Icon
                </Button>
                <Button variant="primary" color="brand" size="middle" icon={<i className="ri-add-line" />} iconPosition="right">
                  Icon Right
                </Button>
              </Space>
            </div>

            {/* Error */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Error
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="primary" color="error" size="small">Button</Button>
                <Button variant="primary" color="error" size="middle">Button</Button>
                <Button variant="primary" color="error" size="large">Button</Button>
                <Button variant="primary" color="error" size="middle" disabled>Disabled</Button>
              </Space>
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Secondary Variant */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Secondary
            </Title>
            
            {/* Brand */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Brand
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="secondary" color="brand" size="small">Button</Button>
                <Button variant="secondary" color="brand" size="middle">Button</Button>
                <Button variant="secondary" color="brand" size="large">Button</Button>
                <Button variant="secondary" color="brand" size="middle" disabled>Disabled</Button>
              </Space>
            </div>

            {/* Neutral */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Neutral
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="secondary" color="neutral" size="small">Button</Button>
                <Button variant="secondary" color="neutral" size="middle">Button</Button>
                <Button variant="secondary" color="neutral" size="large">Button</Button>
                <Button variant="secondary" color="neutral" size="middle" disabled>Disabled</Button>
              </Space>
            </div>

            {/* Error */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Error
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="secondary" color="error" size="small">Button</Button>
                <Button variant="secondary" color="error" size="middle">Button</Button>
                <Button variant="secondary" color="error" size="large">Button</Button>
                <Button variant="secondary" color="error" size="middle" disabled>Disabled</Button>
              </Space>
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Tertiary Variant */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Tertiary
            </Title>
            
            {/* Brand */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Brand
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="tertiary" color="brand" size="small">Button</Button>
                <Button variant="tertiary" color="brand" size="middle">Button</Button>
                <Button variant="tertiary" color="brand" size="large">Button</Button>
                <Button variant="tertiary" color="brand" size="middle" disabled>Disabled</Button>
              </Space>
            </div>

            {/* Neutral */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Neutral
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="tertiary" color="neutral" size="small">Button</Button>
                <Button variant="tertiary" color="neutral" size="middle">Button</Button>
                <Button variant="tertiary" color="neutral" size="large">Button</Button>
                <Button variant="tertiary" color="neutral" size="middle" disabled>Disabled</Button>
              </Space>
            </div>

            {/* Error */}
            <div>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Error
              </Text>
              <Space wrap size={[ds.spacing(6), ds.spacing(6)]}>
                <Button variant="tertiary" color="error" size="small">Button</Button>
                <Button variant="tertiary" color="error" size="middle">Button</Button>
                <Button variant="tertiary" color="error" size="large">Button</Button>
                <Button variant="tertiary" color="error" size="middle" disabled>Disabled</Button>
              </Space>
            </div>
          </div>
        </Card>
      </section>

      {/* Input Section */}
      <section>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Input
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Input fields allow users to enter and edit text
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Default State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Default State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Input label="Label" placeholder="Placeholder text" />
              <Input label="Label" placeholder="Placeholder text" required />
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                helperText="Helper text goes here"
              />
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                prefix={<i className="ri-search-line" />}
              />
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                suffix={<i className="ri-information-line" />}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Success/Active State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Success / Active State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                state="success"
                defaultValue="Input value"
              />
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                state="success"
                helperText="Success message"
                defaultValue="Input value"
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Error State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Error State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                error="Error message goes here"
                defaultValue="Invalid input"
              />
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                error="Error message goes here"
                prefix={<i className="ri-mail-line" />}
                defaultValue="Invalid input"
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Disabled State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Disabled State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                disabled
                defaultValue="Disabled input"
              />
              <Input 
                label="Label" 
                placeholder="Placeholder text" 
                disabled
                helperText="Helper text"
                defaultValue="Disabled input"
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Sizes */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Sizes
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Input 
                label="Small" 
                placeholder="Placeholder text" 
                size="small"
              />
              <Input 
                label="Middle (Default)" 
                placeholder="Placeholder text" 
                size="middle"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Select Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Select
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Select dropdowns allow users to choose from a list of options
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Default State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Default State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Select 
                label="Label" 
                placeholder="Select an option"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Label" 
                placeholder="Select an option"
                required
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Label" 
                placeholder="Select an option"
                helperText="Helper text goes here"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Label" 
                placeholder="Select an option"
                prefix={<i className="ri-search-line" />}
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Success/Active State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Success / Active State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Select 
                label="Label" 
                placeholder="Select an option"
                state="success"
                defaultValue="1"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Label" 
                placeholder="Select an option"
                state="success"
                helperText="Success message"
                defaultValue="1"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Error State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Error State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Select 
                label="Label" 
                placeholder="Select an option"
                error="Error message goes here"
                defaultValue="1"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Label" 
                placeholder="Select an option"
                error="Error message goes here"
                prefix={<i className="ri-mail-line" />}
                defaultValue="1"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Disabled State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Disabled State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Select 
                label="Label" 
                placeholder="Select an option"
                disabled
                defaultValue="1"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Label" 
                placeholder="Select an option"
                disabled
                helperText="Helper text"
                defaultValue="1"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Sizes */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Sizes
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Select 
                label="Small" 
                placeholder="Select an option"
                size="small"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Middle (Default)" 
                placeholder="Select an option"
                size="middle"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
              <Select 
                label="Large" 
                placeholder="Select an option"
                size="large"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Textarea Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Textarea
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Textarea fields allow users to enter and edit multiple lines of text
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Default State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Default State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                rows={4}
              />
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                required
                rows={4}
              />
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                helperText="Helper text goes here"
                rows={4}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Success/Active State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Success / Active State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                state="success"
                defaultValue="Textarea value"
                rows={4}
              />
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                state="success"
                helperText="Success message"
                defaultValue="Textarea value"
                rows={4}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Error State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Error State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                error="Error message goes here"
                defaultValue="Invalid input"
                rows={4}
              />
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                error="Error message goes here"
                defaultValue="Invalid input"
                rows={4}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Disabled State */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Disabled State
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                disabled
                defaultValue="Disabled textarea"
                rows={4}
              />
              <Textarea 
                label="Label" 
                placeholder="Placeholder text"
                disabled
                helperText="Helper text"
                defaultValue="Disabled textarea"
                rows={4}
              />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Sizes */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Sizes
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6), 
                maxWidth: ds.common.layout.inputContainerWidth 
              }}
            >
              <Textarea 
                label="Small" 
                placeholder="Placeholder text"
                size="small"
                rows={4}
              />
              <Textarea 
                label="Middle (Default)" 
                placeholder="Placeholder text"
                size="middle"
                rows={4}
              />
              <Textarea 
                label="Large" 
                placeholder="Placeholder text"
                size="large"
                rows={4}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Toggle Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Toggle
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Toggle switches allow users to turn options on or off
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Circular Variant */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Circular
            </Title>
            
            {/* Default States */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Default States
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle variant="circular" checked={toggleCircular1} onChange={(checked) => setToggleCircular1(checked)} />
                <Toggle variant="circular" checked={toggleCircular2} onChange={(checked) => setToggleCircular2(checked)} />
                <Toggle variant="circular" checked={false} disabled />
                <Toggle variant="circular" checked={true} disabled />
              </div>
            </div>

            {/* With Labels */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                With Labels
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle 
                  variant="circular" 
                  checked={toggleCircular3}
                  onChange={(checked) => setToggleCircular3(checked)}
                  label="Remember me"
                />
                <Toggle 
                  variant="circular" 
                  checked={toggleCircular4}
                  onChange={(checked) => setToggleCircular4(checked)}
                  label="Remember me"
                />
                <Toggle 
                  variant="circular" 
                  checked={toggleCircular5}
                  onChange={(checked) => setToggleCircular5(checked)}
                  label="Remember me"
                  description="Save my login details for next time."
                />
                <Toggle 
                  variant="circular" 
                  checked={toggleCircular6}
                  onChange={(checked) => setToggleCircular6(checked)}
                  label="Remember me"
                  description="Save my login details for next time."
                />
                <Toggle 
                  variant="circular" 
                  checked={false}
                  label="Remember me"
                  description="Save my login details for next time."
                  disabled
                />
                <Toggle 
                  variant="circular" 
                  checked={true}
                  label="Remember me"
                  description="Save my login details for next time."
                  disabled
                />
              </div>
            </div>

            {/* Label Position */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Label Position
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle 
                  variant="circular" 
                  checked={toggleCircular7}
                  onChange={(checked) => setToggleCircular7(checked)}
                  label="Label on right"
                  labelPosition="right"
                />
                <Toggle 
                  variant="circular" 
                  checked={toggleCircular8}
                  onChange={(checked) => setToggleCircular8(checked)}
                  label="Label on left"
                  labelPosition="left"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Sizes
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle variant="circular" size="small" checked={toggleCircular9} onChange={(checked) => setToggleCircular9(checked)} label="Small" />
                <Toggle variant="circular" size="middle" checked={toggleCircular10} onChange={(checked) => setToggleCircular10(checked)} label="Middle (Default)" />
                <Toggle variant="circular" size="large" checked={toggleCircular11} onChange={(checked) => setToggleCircular11(checked)} label="Large" />
              </div>
            </div>
          </div>

          {/* Rectangular Variant - Hidden */}
          {false && <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Rectangular
            </Title>
            
            {/* Default States */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Default States
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle variant="rectangular" checked={toggleRectangular1} onChange={(checked) => setToggleRectangular1(checked)} />
                <Toggle variant="rectangular" checked={toggleRectangular2} onChange={(checked) => setToggleRectangular2(checked)} />
                <Toggle variant="rectangular" checked={false} disabled />
                <Toggle variant="rectangular" checked={true} disabled />
              </div>
            </div>

            {/* With Labels */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                With Labels
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle 
                  variant="rectangular" 
                  checked={toggleRectangular3}
                  onChange={(checked) => setToggleRectangular3(checked)}
                  label="Enable notifications"
                />
                <Toggle 
                  variant="rectangular" 
                  checked={toggleRectangular4}
                  onChange={(checked) => setToggleRectangular4(checked)}
                  label="Enable notifications"
                />
                <Toggle 
                  variant="rectangular" 
                  checked={toggleRectangular5}
                  onChange={(checked) => setToggleRectangular5(checked)}
                  label="Enable notifications"
                  description="Receive push notifications for updates."
                />
                <Toggle 
                  variant="rectangular" 
                  checked={toggleRectangular6}
                  onChange={(checked) => setToggleRectangular6(checked)}
                  label="Enable notifications"
                  description="Receive push notifications for updates."
                />
                <Toggle 
                  variant="rectangular" 
                  checked={false}
                  label="Enable notifications"
                  description="Receive push notifications for updates."
                  disabled
                />
                <Toggle 
                  variant="rectangular" 
                  checked={true}
                  label="Enable notifications"
                  description="Receive push notifications for updates."
                  disabled
                />
              </div>
            </div>

            {/* Label Position */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Label Position
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle 
                  variant="rectangular" 
                  checked={toggleRectangular7}
                  onChange={(checked) => setToggleRectangular7(checked)}
                  label="Label on right"
                  labelPosition="right"
                />
                <Toggle 
                  variant="rectangular" 
                  checked={toggleRectangular8}
                  onChange={(checked) => setToggleRectangular8(checked)}
                  label="Label on left"
                  labelPosition="left"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Sizes
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Toggle variant="rectangular" size="small" checked={toggleRectangular11} onChange={(checked) => setToggleRectangular11(checked)} label="Small" />
                <Toggle variant="rectangular" size="middle" checked={toggleRectangular12} onChange={(checked) => setToggleRectangular12(checked)} label="Middle (Default)" />
                <Toggle variant="rectangular" size="large" checked={toggleRectangular13} onChange={(checked) => setToggleRectangular13(checked)} label="Large" />
              </div>
            </div>
          </div>}
        </Card>
      </section>

      {/* Checkbox Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Checkbox
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Checkboxes allow users to select one or more options from a set.
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Visual States */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Visual States
            </Title>
            
            {/* Unchecked */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Unchecked
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Checkbox checked={checkbox1} onChange={(checked) => setCheckbox1(checked)} />
                <Checkbox 
                  checked={checkbox2}
                  onChange={(checked) => setCheckbox2(checked)}
                  label="Remember me"
                />
                <Checkbox 
                  checked={checkbox3}
                  onChange={(checked) => setCheckbox3(checked)}
                  label="Remember me"
                  description="Save my login details for next time."
                />
                <Checkbox 
                  checked={false}
                  label="Remember me"
                  description="Save my login details for next time."
                  disabled
                />
              </div>
            </div>

            {/* Checked */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Checked
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Checkbox checked={checkbox4} onChange={(checked) => setCheckbox4(checked)} />
                <Checkbox 
                  checked={checkbox5}
                  onChange={(checked) => setCheckbox5(checked)}
                  label="Remember me"
                />
                <Checkbox 
                  checked={checkbox6}
                  onChange={(checked) => setCheckbox6(checked)}
                  label="Remember me"
                  description="Save my login details for next time."
                />
                <Checkbox 
                  checked={true}
                  label="Remember me"
                  description="Save my login details for next time."
                  disabled
                />
              </div>
            </div>

            {/* Indeterminate */}
            <div>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Indeterminate
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Checkbox indeterminate={true} />
                <Checkbox 
                  indeterminate={true}
                  label="Remember me"
                />
                <Checkbox 
                  indeterminate={true}
                  label="Remember me"
                  description="Save my login details for next time."
                />
                <Checkbox 
                  indeterminate={true}
                  label="Remember me"
                  description="Save my login details for next time."
                  disabled
                />
              </div>
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Sizes */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Sizes
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6) 
              }}
            >
              <Checkbox size="small" checked={true} label="Small" />
              <Checkbox size="middle" checked={true} label="Middle (Default)" />
              <Checkbox size="large" checked={true} label="Large" />
            </div>
          </div>
        </Card>
      </section>

      {/* Radio Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Radio
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Radio buttons allow users to select a single option from a set
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Visual States */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Visual States
            </Title>
            
            {/* Unchecked */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Unchecked
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Radio checked={radioValue === "unchecked1"} onChange={(checked) => checked && setRadioValue("unchecked1")} value="unchecked1" name="radio-group-1" />
                <Radio 
                  checked={radioValue === "unchecked2"}
                  onChange={(checked) => checked && setRadioValue("unchecked2")}
                  value="unchecked2"
                  name="radio-group-1"
                  label="Remember me"
                />
                <Radio 
                  checked={radioValue === "unchecked3"}
                  onChange={(checked) => checked && setRadioValue("unchecked3")}
                  value="unchecked3"
                  name="radio-group-1"
                  label="Remember me"
                  description="Save my login details for next time."
                />
                <Radio 
                  checked={false}
                  label="Remember me"
                  description="Save my login details for next time."
                  disabled
                />
              </div>
            </div>

            {/* Checked */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Checked
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(6) 
                }}
              >
                <Radio checked={radioValue2 === "checked1"} onChange={(checked) => checked && setRadioValue2("checked1")} value="checked1" name="radio-group-2" />
                <Radio 
                  checked={radioValue2 === "checked2"}
                  onChange={(checked) => checked && setRadioValue2("checked2")}
                  value="checked2"
                  name="radio-group-2"
                  label="Remember me"
                />
                <Radio 
                  checked={radioValue2 === "checked3"}
                  onChange={(checked) => checked && setRadioValue2("checked3")}
                  value="checked3"
                  name="radio-group-2"
                  label="Remember me"
                  description="Save my login details for next time."
                />
                <Radio 
                  checked={true}
                  label="Remember me"
                  description="Save my login details for next time."
                  disabled
                />
              </div>
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Sizes */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Sizes
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: ds.spacing(6) 
              }}
            >
              <Radio size="small" checked={radioValue2 === "size-small"} onChange={(checked) => checked && setRadioValue2("size-small")} value="size-small" name="radio-group-sizes" label="Small" />
              <Radio size="middle" checked={radioValue2 === "size-middle"} onChange={(checked) => checked && setRadioValue2("size-middle")} value="size-middle" name="radio-group-sizes" label="Middle (Default)" />
              <Radio size="large" checked={radioValue2 === "size-large"} onChange={(checked) => checked && setRadioValue2("size-large")} value="size-large" name="radio-group-sizes" label="Large" />
            </div>
          </div>
        </Card>
      </section>

      {/* Alert Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Alert
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Alert components display important messages to users
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Variants */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Variants
            </Title>
            
            {/* Compact */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Compact
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(4) 
                }}
              >
                <Alert 
                  type="error"
                  variant="compact"
                  title="Error Text"
                  onUndo={() => {}}
                  onClose={() => {}}
                />
                <Alert 
                  type="info"
                  variant="compact"
                  title="Informational Notes"
                  onUndo={() => {}}
                  onClose={() => {}}
                />
                <Alert 
                  type="warning"
                  variant="compact"
                  title="Warning"
                  onUndo={() => {}}
                  onClose={() => {}}
                />
                <Alert 
                  type="success"
                  variant="compact"
                  title="Success Tips"
                  onUndo={() => {}}
                  onClose={() => {}}
                />
              </div>
            </div>

            {/* Expanded */}
            <div>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Expanded
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: ds.spacing(4) 
                }}
              >
                <Alert 
                  type="error"
                  variant="expanded"
                  title="Error Text"
                  description="This is an error message about copywriting."
                  onViewDetails={() => {}}
                  onUndo={() => {}}
                  onClose={() => {}}
                />
                <Alert 
                  type="info"
                  variant="expanded"
                  title="Informational Notes"
                  description="Additional description and information about copywriting."
                  onViewDetails={() => {}}
                  onUndo={() => {}}
                  onClose={() => {}}
                />
                <Alert 
                  type="warning"
                  variant="expanded"
                  title="Warning"
                  description="This is a warning notice about copywriting."
                  onViewDetails={() => {}}
                  onUndo={() => {}}
                  onClose={() => {}}
                />
                <Alert 
                  type="success"
                  variant="expanded"
                  title="Success Tips"
                  description="Detailed description and advice about successful copywriting."
                  onViewDetails={() => {}}
                  onUndo={() => {}}
                  onClose={() => {}}
                />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Modal Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Modal / Dialog
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Modal dialogs interrupt the user workflow to communicate important information or request user input
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Basic Modal */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Basic Modal
            </Title>
            <div>
              <Modal
                open={basicModalOpen}
                title="Modal Title"
                onClose={() => setBasicModalOpen(false)}
              >
                <p>This is the modal content. You can add any content here.</p>
              </Modal>
              <Button 
                variant="primary" 
                color="brand" 
                onClick={() => setBasicModalOpen(true)}
              >
                Open Basic Modal
              </Button>
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Modal with Footer */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Modal with Footer Actions
            </Title>
            <div>
              <Modal
                open={footerModalOpen}
                title="Confirm Action"
                onClose={() => setFooterModalOpen(false)}
                footer={
                  <Space>
                    <Button variant="secondary" color="neutral" onClick={() => setFooterModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" color="brand" onClick={() => setFooterModalOpen(false)}>
                      Confirm
                    </Button>
                  </Space>
                }
              >
                <p>Are you sure you want to proceed with this action?</p>
              </Modal>
              <Button 
                variant="primary" 
                color="brand" 
                onClick={() => setFooterModalOpen(true)}
              >
                Open Modal with Footer
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Icon Section */}
      <section style={{ marginTop: ds.spacing(16) }}>
        <div style={{ marginBottom: ds.spacing(8) }}>
          <Title 
            level={2} 
            style={{ 
              marginBottom: ds.spacing(2),
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary')
            }}
          >
            Icon
          </Title>
          <Text 
            style={{ 
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
              lineHeight: ds.typography.lineHeight('md')
            }}
          >
            Icon components display visual indicators with various shapes, colors, and styles
          </Text>
        </div>

        <Card 
          styles={{ 
            body: { 
              backgroundColor: ds.color.background('primary'),
              padding: ds.spacing(8),
              borderRadius: ds.radius('lg')
            } 
          }}
        >
          {/* Shapes */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Shapes
            </Title>
            
            {/* Circle */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Circle
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  gap: ds.spacing(6),
                  alignItems: "center"
                }}
              >
                <Icon shape="circle" variant="filled" color="brand" size="xs" />
                <Icon shape="circle" variant="filled" color="brand" size="sm" />
                <Icon shape="circle" variant="filled" color="brand" size="md" />
                <Icon shape="circle" variant="filled" color="brand" size="lg" />
                <Icon shape="circle" variant="filled" color="brand" size="xl" />
                <Icon shape="circle" variant="filled" color="brand" size="2xl" />
              </div>
            </div>

            {/* Square */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Square
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  gap: ds.spacing(6),
                  alignItems: "center"
                }}
              >
                <Icon shape="square" variant="filled" color="brand" size="xs" />
                <Icon shape="square" variant="filled" color="brand" size="sm" />
                <Icon shape="square" variant="filled" color="brand" size="md" />
                <Icon shape="square" variant="filled" color="brand" size="lg" />
                <Icon shape="square" variant="filled" color="brand" size="xl" />
                <Icon shape="square" variant="filled" color="brand" size="2xl" />
              </div>
            </div>

            {/* Rounded */}
            <div>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Rounded Square
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  gap: ds.spacing(6),
                  alignItems: "center"
                }}
              >
                <Icon shape="rounded" variant="filled" color="brand" size="xs" />
                <Icon shape="rounded" variant="filled" color="brand" size="sm" />
                <Icon shape="rounded" variant="filled" color="brand" size="md" />
                <Icon shape="rounded" variant="filled" color="brand" size="lg" />
                <Icon shape="rounded" variant="filled" color="brand" size="xl" />
                <Icon shape="rounded" variant="filled" color="brand" size="2xl" />
              </div>
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Variants */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Variants
            </Title>
            
            {/* Filled */}
            <div style={{ marginBottom: ds.spacing(8) }}>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Filled
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  gap: ds.spacing(6),
                  alignItems: "center"
                }}
              >
                <Icon shape="circle" variant="filled" color="brand" size="md" />
                <Icon shape="circle" variant="filled" color="error" size="md" />
                <Icon shape="circle" variant="filled" color="info" size="md" />
                <Icon shape="circle" variant="filled" color="warning" size="md" />
                <Icon shape="circle" variant="filled" color="neutral" size="md" />
              </div>
            </div>

            {/* Outlined */}
            <div>
              <Text 
                style={{ 
                  display: "block",
                  marginBottom: ds.spacing(4),
                  fontSize: ds.typography.size('sm'),
                  fontWeight: ds.typography.weight('semibold'),
                  color: ds.color.text('secondary'),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Outlined
              </Text>
              <div 
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  gap: ds.spacing(6),
                  alignItems: "center"
                }}
              >
                <Icon shape="circle" variant="outlined" color="brand" size="md" />
                <Icon shape="circle" variant="outlined" color="error" size="md" />
                <Icon shape="circle" variant="outlined" color="info" size="md" />
                <Icon shape="circle" variant="outlined" color="warning" size="md" />
                <Icon shape="circle" variant="outlined" color="neutral" size="md" />
              </div>
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Colors */}
          <div style={{ marginBottom: ds.spacing(12) }}>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Colors
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexWrap: "wrap",
                gap: ds.spacing(6),
                alignItems: "center"
              }}
            >
              <Icon shape="circle" variant="filled" color="brand" size="lg" />
              <Icon shape="circle" variant="filled" color="error" size="lg" />
              <Icon shape="circle" variant="filled" color="info" size="lg" />
              <Icon shape="circle" variant="filled" color="warning" size="lg" />
              <Icon shape="circle" variant="filled" color="neutral" size="lg" />
            </div>
          </div>

          <Divider style={{ margin: `${ds.spacing(8)} 0` }} />

          {/* Sizes */}
          <div>
            <Title 
              level={4} 
              style={{ 
                marginBottom: ds.spacing(6),
                fontSize: ds.typography.size('2xl'),
                fontWeight: ds.typography.weight('semibold'),
                color: ds.color.text('secondary')
              }}
            >
              Sizes
            </Title>
            <div 
              style={{ 
                display: "flex", 
                flexWrap: "wrap",
                gap: ds.spacing(6),
                alignItems: "center"
              }}
            >
              <Icon shape="circle" variant="filled" color="brand" size="xs" />
              <Icon shape="circle" variant="filled" color="brand" size="sm" />
              <Icon shape="circle" variant="filled" color="brand" size="md" />
              <Icon shape="circle" variant="filled" color="brand" size="lg" />
              <Icon shape="circle" variant="filled" color="brand" size="xl" />
              <Icon shape="circle" variant="filled" color="brand" size="2xl" />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
