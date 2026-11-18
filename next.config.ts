import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    /*
     * The quality every optimised picture is re-encoded at. Next defaults to 75 and
     * warns in the console that it is a default rather than a choice, so it is named
     * here and lowered to 60.
     *
     * 60 is safe for what this site shows: the photographs are 600x600 squares seen
     * in small frames, and the marks and partner logos are flat artwork, which WebP
     * keeps clean at low quality because there are no gradients to band. The one
     * place it would show is a large photograph filling the screen, and there is
     * none -- the biggest picture on the page is the hero logo, which is artwork.
     *
     * The pictures the hero tiles paint are NOT affected: tilted-tiles paints them
     * with a background-image, so they never pass through this optimiser. Their
     * weight is set by the files in public/images/hero/, which is where it was cut.
     */
    qualities: [60],
  },
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
