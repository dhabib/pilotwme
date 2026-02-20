/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for Docker / Vercel optimized builds
  // output: 'standalone', // uncomment for Docker deployment

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // 301 redirects for route renames
  async redirects() {
    return [
      { source: '/latest',         destination: '/ideas',                  permanent: true },
      { source: '/wisdom-engine',  destination: '/about',                  permanent: true },
      { source: '/manifold',       destination: '/how-it-works#manifold',  permanent: true },
      { source: '/voice',          destination: '/how-it-works#voice',     permanent: true },
      { source: '/research-desk',  destination: '/ask',                    permanent: true },
    ]
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
