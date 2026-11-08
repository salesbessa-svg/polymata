import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

/** Remetente: depois de verificar o domínio no Resend, defina EMAIL_FROM na Vercel
 *  (ex.: "Polymata <contato@polymata.com.br>"). Até lá, usa o endereço de teste. */
const FROM = process.env.EMAIL_FROM ?? "Polymata <onboarding@resend.dev>"

/** Corta o tamanho e neutraliza HTML, para ninguém injetar código no e-mail. */
function clean(value: unknown, max: number) {
  return String(value ?? "")
    .trim()
    .slice(0, max)
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: Request) {
  const data = await req.json().catch(() => null)
  if (!data) return Response.json({ ok: false, error: "Dados inválidos." }, { status: 400 })

  // campo invisível: pessoas não preenchem, robôs de spam sim
  if (data.site) return Response.json({ ok: true })

  const nome = clean(data.nome, 120)
  const emailBruto = String(data.email ?? "").trim().slice(0, 200)
  const mensagem = clean(data.mensagem, 5000)

  if (!nome || !EMAIL_RE.test(emailBruto) || mensagem.length < 5) {
    return Response.json(
      { ok: false, error: "Confira seu nome, seu e-mail e escreva uma mensagem." },
      { status: 400 },
    )
  }

  const to = process.env.EMAIL_TO
  if (!process.env.RESEND_API_KEY || !to) {
    console.error("Contato: RESEND_API_KEY ou EMAIL_TO não configurados na Vercel.")
    return Response.json({ ok: false, error: "Envio indisponível no momento." }, { status: 500 })
  }

  const email = clean(emailBruto, 200)
  const whatsapp = clean(process.env.WHATSAPP, 40)

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: emailBruto, // "Responder" vai direto para o cliente
    subject: `Novo contato pelo site: ${nome}`,
    html: `
      <h2>Novo contato pelo site</h2>
      <p><b>Nome:</b> ${nome}</p>
      <p><b>E-mail:</b> <a href="mailto:${email}">${email}</a></p>
      <p><b>Mensagem:</b></p>
      <p>${mensagem.replace(/\r?\n/g, "<br>")}</p>
      <hr>
      <p style="color:#666">Responda este e-mail para falar direto com ${nome}.${whatsapp ? ` WhatsApp da empresa: ${whatsapp}` : ""}</p>
    `,
  })

  if (error) {
    console.error("Contato: falha no Resend", error)
    return Response.json({ ok: false, error: "Não foi possível enviar agora." }, { status: 502 })
  }

  return Response.json({ ok: true })
}
