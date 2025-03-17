/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgflip.com', 'i.imgur.com'],
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/meme-memory-game' : '',
};

module.exports = nextConfig;