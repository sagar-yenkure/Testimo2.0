import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        // for s3 bucket
        protocol: 'https',
        hostname: 'd3fdmhjq3dfmk6.cloudfront.net',
      },
      {
        // for dicebear api
        hostname: 'api.dicebear.com',
      }
    ]
  }
};

export default nextConfig;
