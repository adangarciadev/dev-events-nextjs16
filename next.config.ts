import type { NextConfig } from "next";

// cacheLife -> when to clear
// cacheTag -> what to clear
// To refresh instantly: revalidate() or revalidateTag()

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
