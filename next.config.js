/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-al-asr.centers.pk',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'], // WebP first for better performance
    minimumCacheTTL: 60, // Reduced for dynamic content
    deviceSizes: [328, 640, 750, 828, 1080], // Added exact display size
    imageSizes: [16, 32, 48, 64, 96],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Compiler optimizations - Remove legacy JS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Remove experimental features that cause issues
  // experimental: {
  //   optimizeCss: true,
  //   scrollRestoration: true,
  // },
  
  // Security headers with better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig