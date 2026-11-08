import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Polymata",
    short_name: "Polymata",
    description: "Ecossistema empresarial brasileiro: sites, sistemas, imagens melhores para a empresa, gestão e rede de empresários em São Paulo.",
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  }
}
