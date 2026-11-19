import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.15.18"],
  // o app nicodemus e buscas antigas apontam para estes endereços
  async redirects() {
    return [
      { source: "/esporte", destination: "/esportes", permanent: true },
      { source: "/baseball", destination: "/esportes", permanent: true },
      { source: "/beisebol", destination: "/esportes", permanent: true },
      { source: "/nicodemus", destination: "/esportes", permanent: true },
    ]
  },
};

export default nextConfig;