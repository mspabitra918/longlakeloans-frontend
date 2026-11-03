import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Backend status emails link to /loan-status; query params carry over
  async redirects() {
    return [
      { source: "/loan-status", destination: "/track-loan", permanent: true },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
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
