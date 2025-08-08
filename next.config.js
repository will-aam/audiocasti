/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['placeholder.svg'],
  },
  trailingSlash: true,
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
