import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://*.youtube.com https://*.vimeo.com https://*.loom.com https://*.wistia.com https://*.dailymotion.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
