"use client";

import { ds } from "@/design-system";

export default function AdminDashboardPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: ds.color.background('secondary'),
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: ds.color.background('primary'),
          borderBottom: `1px solid ${ds.color.border('primary')}`,
          padding: `${ds.spacing('4')} ${ds.spacing('8')}`,
        }}
      >
        <div
          style={{
            maxWidth: ds.common.layout.containerMaxWidth,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1
            style={{
              fontSize: ds.typography.size('2xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary'),
              margin: 0,
            }}
          >
            Allkons Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: ds.common.layout.containerMaxWidth,
          margin: '0 auto',
          padding: ds.spacing('8'),
        }}
      >
        <div
          style={{
            backgroundColor: ds.color.background('primary'),
            borderRadius: ds.radius('md'),
            padding: ds.spacing('8'),
            textAlign: 'center',
            border: `1px solid ${ds.color.border('primary')}`,
          }}
        >
          <h2
            style={{
              fontSize: ds.typography.size('3xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary'),
              marginBottom: ds.spacing('4'),
            }}
          >
            Admin Dashboard
          </h2>
          <p
            style={{
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
            }}
          >
            หน้าจอ Admin Dashboard จะพัฒนาต่อในอนาคต
          </p>
        </div>
      </main>
    </div>
  );
}
