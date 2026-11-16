import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Dev-only: allow this machine's LAN hosts to load Next.js dev resources.
  // Without this, Next 16 blocks /_next/hmr and dev chunks from any non-localhost
  // origin, which silently kills client hydration and every client-side animation.
  allowedDevOrigins: ["192.168.2.2", "100.86.126.93", "172.21.66.156", "127.0.0.1"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
