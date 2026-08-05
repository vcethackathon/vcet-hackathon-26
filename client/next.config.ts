import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],

  // Enable gzip/brotli compression for all responses
  compress: true,

  // Image optimization: serve WebP/AVIF automatically, cache aggressively
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days in seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Permanent 301 redirects for legacy routes, old registration pages, or indexed sitelinks
  async redirects() {
    return [
      {
        source: "/register",
        destination: "/",
        permanent: true,
      },
      {
        source: "/registration",
        destination: "/",
        permanent: true,
      },
      {
        source: "/registration-closed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/register-closed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/closed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/apply",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2024",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2025",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Aggressive HTTP caching headers for all static assets
  async headers() {
    return [
      {
        // Security headers for all routes
        source: "/:path((?!api).*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        // Video files — long cache, stream-friendly
        source: "/:path*.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
        ],
      },
      {
        // PNG images — long cache
        source: "/:path*.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // JPG/JPEG images — long cache
        source: "/:path*.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // WebP images — long cache
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
