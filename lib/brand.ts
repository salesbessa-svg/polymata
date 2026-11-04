/* Identidade da Polymata usada em todo o site. */

/**
 * Arquivos da logo em /public:
 *  polymata-logo.png / polymata-logo-pequeno.png ................ traço preto, para fundos claros
 *  polymata-logo-branco.png / polymata-logo-branco-pequeno.png .. traço branco, para fundos escuros
 * As versões "-pequeno" são usadas no menu e no rodapé.
 * O original enviado está em /logo.png, na raiz do projeto.
 */
export function logoSrc(background: "dark" | "light", size: number) {
  const name = background === "dark" ? "polymata-logo-branco" : "polymata-logo"
  return `/${name}${size <= 110 ? "-pequeno" : ""}.png`
}

/** Proporção da logo (altura / largura). */
export const LOGO_RATIO = 894 / 700

/** Para onde a logo leva ao ser clicada. */
export const LOGO_HREF = "/newsletter#quem-e-polymata"
