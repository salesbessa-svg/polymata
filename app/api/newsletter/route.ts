import { Resend } from "resend"

/** Criado só na hora do envio: assim a falta da chave vira uma mensagem clara, e não um erro que derruba a rota. */
function getResend() {
  const key = process.env.RESEND_API_KEY
  return key ? new Resend(key) : null
}

function clean(value: unknown, max = 200) {
  return String(value ?? "")
    .slice(0, max)
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)
}

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}))
  const nome = clean(data.nome)
  const email = clean(data.email)
  const empresa = clean(data.empresa)
  const origem = clean(data.origem, 300)

  if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false }, { status: 400 })
  }

  const resend = getResend()
  if (!resend || !process.env.EMAIL_TO) {
    console.error("Newsletter: RESEND_API_KEY ou EMAIL_TO não configurados na Vercel.")
    return Response.json({ ok: false }, { status: 500 })
  }

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Polymata <onboarding@resend.dev>",
    to: process.env.EMAIL_TO!,
    replyTo: data.email ? String(data.email).slice(0, 200) : undefined,
    subject: "Nova inscrição na newsletter - Polymata",
    html: `
      <h2>Nova inscrição na newsletter</h2>
      <p><b>Nome:</b> ${nome}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Empresa:</b> ${empresa || "-"}</p>
      <p><b>Inscreveu-se em:</b> ${origem}</p>
    `,
  })

  if (error) {
    console.error("Newsletter: falha no Resend", error)
    return Response.json({ ok: false }, { status: 502 })
  }
  return Response.json({ ok: true })
}
