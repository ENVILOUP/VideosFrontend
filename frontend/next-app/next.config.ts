import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.enviloup.localhost",
        port: "",
        pathname: "/thumbnails/**",
      }
    ]
  }
};

export default nextConfig;
