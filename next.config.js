/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "roudaaja.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "roudaaja.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "roudaaja.s3",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
