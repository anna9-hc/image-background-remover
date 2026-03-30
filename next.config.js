/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REMOVEBG_API_KEY: process.env.REMOVEBG_API_KEY,
  },
  experimental: {
    allowedDevOrigins: ['http://43.159.142.113:3000'],
  },
}

module.exports = nextConfig
