/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['admin-al-asr.centers.pk'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
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
          }
        ],
      },
    ]
  },
  
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig