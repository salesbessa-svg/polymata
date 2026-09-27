import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {

  const data = await req.json()
  const { nome, email, mensagem } = data

  const emailEmpresa = process.env.EMAIL_TO
  const whatsappEmpresa = process.env.WHATSAPP

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: emailEmpresa!,
    subject: "Pedido de serviço - Polymata",
    html: `
      <h2>Novo contato</h2>

      <p><b>Nome:</b> ${nome}</p>
      <p><b>Email:</b> ${email}</p>

      <p><b>Mensagem:</b></p>
      <p>${mensagem}</p>

      <hr>

      <p>WhatsApp da empresa: ${whatsappEmpresa}</p>
    `
  })

  return Response.json({ ok: true })
}