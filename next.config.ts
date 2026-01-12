import { NextConfig } from "next";

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "assets.basehub.com" }, { hostname: "basehub.earth" }],
  },
  // Empty turbopack config to silence the warning about webpack config
  turbopack: {},
} satisfies NextConfig;

export default nextConfig;
