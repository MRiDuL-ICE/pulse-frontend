/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: [],
  },
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  // Disable static optimization for all pages
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
