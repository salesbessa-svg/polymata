import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.15.18"],
  // o app nicodemus e buscas antigas apontam para estes endereços
  async redirects() {
    return [
      { source: "/esporte", destination: "/esportes", permanent: true },
      { source: "/baseball", destination: "/esportes/baseball", permanent: true },
      { source: "/beisebol", destination: "/esportes/baseball", permanent: true },
      // quem procura o app vai direto para ele
      { source: "/nicodemus", destination: "https://www.nicodemus.com.br/", permanent: true },
      { source: "/esportes/beisebol", destination: "/esportes/baseball", permanent: true },
    ]
  },
};

export default nextConfig;