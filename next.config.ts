import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@netlify/blobs", "undici"],
};

export default nextConfig;
