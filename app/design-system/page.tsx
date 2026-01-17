"use client";

import { Button, Card, Divider, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { ds } from "@/design-system";

const { Title, Text } = Typography;

export default function DesignSystemPage() {
  const router = useRouter();

  return (
    <div style={{
      padding: ds.spacing('8'),
      maxWidth: ds.common.layout.containerMaxWidth,
      margin: "0 auto"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: ds.spacing('6')
      }}>
        <Title level={2} style={{ marginBottom: 0 }}>Design System Showcase</Title>
        <div style={{ display: "flex", gap: ds.spacing('4') }}>
          <Button 
            type="link" 
            onClick={() => router.push("/design-system/foundation")}
          >
            View Foundation
          </Button>
          <Button 
            type="link" 
            onClick={() => router.push("/design-system/components")}
          >
            View Components
          </Button>
        </div>
      </div>
      
      <section style={{ marginBottom: ds.spacing('8') }}>
        <Title level={4}>Buttons</Title>
        <Space wrap>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
        </Space>
      </section>

      <Divider />

      <section style={{ marginBottom: ds.spacing('8') }}>
        <Title level={4}>Typography</Title>
        <Card>
          <Title>h1. Ant Design</Title>
          <Title level={2}>h2. Ant Design</Title>
          <Title level={3}>h3. Ant Design</Title>
          <Title level={4}>h4. Ant Design</Title>
          <Text>Default Text</Text>
          <br />
          <Text type="secondary">Secondary Text</Text>
          <br />
          <Text type="success">Success Text</Text>
        </Card>
      </section>

      <Divider />
      
      <section style={{ marginBottom: ds.spacing('8') }}>
         <Title level={4}>Icons (Remix Icon)</Title>
         <Space style={{ fontSize: ds.typography.size('2xl') }}>
           <i className="ri-home-line"></i>
           <i className="ri-user-line"></i>
           <i className="ri-settings-line"></i>
         </Space>
      </section>
    </div>
  );
}