import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Ensure the admin content override store is bundled with serverless
   * functions on Vercel. Without this, `fs.readFile(data/content-overrides.json)`
   * inside `/api/admin/content` returns ENOENT in production.
   */
  outputFileTracingIncludes: {
    "/api/admin/content": ["./data/**/*"],
  },
};

export default nextConfig;
