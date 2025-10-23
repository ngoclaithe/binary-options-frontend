import type { NextConfig } from "next";

const backendOrigin = process.env.BACKEND_ORIGIN;
const wsOrigin = process.env.BACKEND_WS_ORIGIN || backendOrigin;

const nextConfig: NextConfig = {
  async rewrites() {
    const rules = [] as { source: string; destination: string }[];

    if (backendOrigin) {
      rules.push({
        source: "/api/v1/:path*",
        destination: `${backendOrigin}/api/v1/:path*`,
      });
    }

    if (wsOrigin) {
      // Proxy Socket.IO handshake and upgrades
      rules.push({
        source: "/socket.io/:path*",
        destination: `${wsOrigin}/socket.io/:path*`,
      });
    }

    return rules;
  },
};

export default nextConfig;
