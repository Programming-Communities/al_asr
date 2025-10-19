/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['admin-al-asr.centers.pk'],
  },
  // Add this for alias support
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    }
    return config
  },
}

module.exports = nextConfig