import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/capas/**',
      },
    ],
  },
};
module.exports = nextConfig;
export default nextConfig;
