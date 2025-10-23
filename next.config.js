/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from your WordPress media domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-al-asr.centers.pk',
        port: '', // explicitly empty for HTTPS
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'al-asr.centers.pk', // include your own domain for OG / logo
        pathname: '/**',
      },
    ],

    // Optimize for WebP & AVIF (modern formats)
    formats: ['image/avif', 'image/webp'],

    // Cache images longer for CDN performance
    minimumCacheTTL: 31536000, // 1 year

    // Tailored to your actual UI sizes
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ⚡ Performance optimizations
  compress: true,
  poweredByHeader: false,

  // ⚙️ Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 🚫 Disable experimental flags that might break builds
  experimental: {
    optimizePackageImports: ['lucide-react'], // improves tree-shaking
  },

  // 🔒 Security + Caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
