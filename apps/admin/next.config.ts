import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // basePath: "/base",
  turbopack: {
    root: path.join("/"),
  },
};

export default nextConfig;
