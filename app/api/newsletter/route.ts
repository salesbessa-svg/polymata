import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.EMAIL_TO!,
    subject: "Nova inscrição na newsletter - Polymata",
    html: `
      <h2>Nova inscrição na newsletter</h2>
      <p><b>Nome:</b> ${nome}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Empresa:</b> ${empresa || "-"}</p>
      <p><b>Inscreveu-se em:</b> ${origem}</p>
    `,
  })

  if (error) return Response.json({ ok: false }, { status: 500 })
  return Response.json({ ok: true })
}
