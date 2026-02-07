import type { NextConfig } from "next";
import { PrismaClient } from "@prisma/client";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  // Auto-migration on every build
  async rewrites() {
    return [
      {
        source: '/api/migrate',
        destination: '/api/migrate-auto',
        has: [
          {
            type: 'cron',
            cron: '0 * * * *', // Every hour (adjust as needed)
          },
        ],
      },
    ];
  },
};

export default nextConfig;
