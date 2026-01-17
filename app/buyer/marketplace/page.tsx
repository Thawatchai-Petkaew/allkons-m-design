"use client";

import { useState, useEffect } from "react";
import { ds } from "@/design-system";
import { mockProducts } from "@/lib/supabase/mock-data";
import type { Product } from "@/types";

export default function BuyerMarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock: Load products (in real app, fetch from API)
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ds.color.background('secondary'),
        }}
      >
        <p style={{ color: ds.color.text('secondary') }}>กำลังโหลด...</p>
      </div>
    );
  }

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
          padding: `${ds.spacing(4)} ${ds.spacing(8)}`,
          position: 'sticky',
          top: 0,
          zIndex: 100,
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
            Allkons M
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: ds.spacing(4),
            }}
          >
            <span
              style={{
                fontSize: ds.typography.size('sm'),
                color: ds.color.text('secondary'),
              }}
            >
              Guest Mode
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: ds.common.layout.containerMaxWidth,
          margin: '0 auto',
          padding: ds.spacing(8),
        }}
      >
        {/* Page Title */}
        <div style={{ marginBottom: ds.spacing(8) }}>
          <h2
            style={{
              fontSize: ds.typography.size('4xl'),
              fontWeight: ds.typography.weight('bold'),
              color: ds.color.text('primary'),
              marginBottom: ds.spacing(2),
            }}
          >
            Marketplace
          </h2>
          <p
            style={{
              fontSize: ds.typography.size('md'),
              color: ds.color.text('secondary'),
            }}
          >
            วัสดุก่อสร้างคุณภาพจากร้านค้าที่เชื่อถือได้
          </p>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: ds.spacing(6),
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: ds.color.background('primary'),
                borderRadius: ds.radius('md'),
                padding: ds.spacing(4),
                border: `1px solid ${ds.color.border('primary')}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Product Image Placeholder */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  backgroundColor: ds.color.background('secondary'),
                  borderRadius: ds.radius('sm'),
                  marginBottom: ds.spacing(3),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ds.color.text('tertiary'),
                  fontSize: ds.typography.size('sm'),
                }}
              >
                ไม่มีรูปภาพ
              </div>

              {/* Shop Name */}
              <p
                style={{
                  fontSize: ds.typography.size('xs'),
                  color: ds.color.text('tertiary'),
                  marginBottom: ds.spacing(1),
                }}
              >
                {product.shop_name}
              </p>

              {/* Product Name */}
              <h3
                style={{
                  fontSize: ds.typography.size('md'),
                  fontWeight: ds.typography.weight('medium'),
                  color: ds.color.text('primary'),
                  marginBottom: ds.spacing(2),
                  lineHeight: ds.typography.lineHeight('md'),
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {product.name}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: ds.spacing(2) }}>
                {product.special_price ? (
                  <div>
                    <span
                      style={{
                        fontSize: ds.typography.size('sm'),
                        color: ds.color.text('tertiary'),
                        textDecoration: 'line-through',
                        marginRight: ds.spacing(2),
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <span
                      style={{
                        fontSize: ds.typography.size('lg'),
                        fontWeight: ds.typography.weight('bold'),
                        color: ds.color.system('error'),
                      }}
                    >
                      {formatPrice(product.special_price)}
                    </span>
                  </div>
                ) : (
                  <span
                    style={{
                      fontSize: ds.typography.size('lg'),
                      fontWeight: ds.typography.weight('bold'),
                      color: ds.color.text('primary'),
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Category & Brand */}
              <div
                style={{
                  display: 'flex',
                  gap: ds.spacing(2),
                  flexWrap: 'wrap',
                  marginBottom: ds.spacing(2),
                }}
              >
                <span
                  style={{
                    padding: `${ds.spacing(1)} ${ds.spacing(2)}`,
                    borderRadius: ds.radius('xs'),
                    fontSize: ds.typography.size('xs'),
                    backgroundColor: ds.color.background('secondary'),
                    color: ds.color.text('secondary'),
                  }}
                >
                  {product.category}
                </span>
                {product.brand && (
                  <span
                    style={{
                      padding: `${ds.spacing(1)} ${ds.spacing(2)}`,
                      borderRadius: ds.radius('xs'),
                      fontSize: ds.typography.size('xs'),
                      backgroundColor: ds.color.background('secondary'),
                      color: ds.color.text('secondary'),
                    }}
                  >
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div>
                <span
                  style={{
                    padding: `${ds.spacing(1)} ${ds.spacing(2)}`,
                    borderRadius: ds.radius('xs'),
                    fontSize: ds.typography.size('xs'),
                    fontWeight: ds.typography.weight('medium'),
                    backgroundColor:
                      product.stock_status === 'STOCKED'
                        ? '#e5f7ec'
                        : product.stock_status === 'OUT_OF_STOCK_CAN_SALE'
                        ? '#fff5e6'
                        : '#fff5f5',
                    color:
                      product.stock_status === 'STOCKED'
                        ? ds.color.system('success')
                        : product.stock_status === 'OUT_OF_STOCK_CAN_SALE'
                        ? ds.color.system('warning')
                        : ds.color.system('error'),
                  }}
                >
                  {product.stock_status === 'STOCKED'
                    ? 'มีสต็อก'
                    : product.stock_status === 'OUT_OF_STOCK_CAN_SALE'
                    ? 'หมดสต็อก (ยังขายได้)'
                    : 'หมดสต็อก'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: ds.spacing(16),
              color: ds.color.text('secondary'),
            }}
          >
            <p style={{ fontSize: ds.typography.size('lg') }}>ไม่พบสินค้า</p>
          </div>
        )}
      </main>
    </div>
  );
}
