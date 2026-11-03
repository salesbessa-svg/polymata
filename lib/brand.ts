/* Identidade da Polymata usada em todo o site. */

/**
 * Arquivos da logo em /public:
 *  logo.png / logo-p.png ............ traço preto, para fundos claros
 *  logo-claro.png / logo-claro-p.png  traço branco, para fundos escuros
 * Os arquivos "-p" são versões pequenas (menu e rodapé).
 * O original enviado está em /logo.png, na raiz do projeto.
 */
export function logoSrc(background: "dark" | "light", size: number) {
  const name = background === "dark" ? "logo-claro" : "logo"
  return `/${name}${size <= 110 ? "-p" : ""}.png`
}

/** Proporção da logo (altura / largura). */
export const LOGO_RATIO = 894 / 700

/** Para onde a logo leva ao ser clicada. */
export const LOGO_HREF = "/newsletter#quem-e-polymata"
