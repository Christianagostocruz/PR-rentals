/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
