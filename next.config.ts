import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure Prisma Client is available during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Server-side: Prisma Client needs to be bundled
      config.externals = config.externals || [];
      config.externals.push('@prisma/client');
    }
    return config;
  },
  // Optimize for production
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;