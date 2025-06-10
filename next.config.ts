import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // disable linting and type checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
