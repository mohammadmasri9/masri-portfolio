import type { NextConfig } from "next";

// On GitHub Pages the site lives at /<repo-name>; the deploy workflow sets this.
// Leave it empty for local dev or a custom domain like masri.life.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root: __dirname },
};

export default nextConfig;
