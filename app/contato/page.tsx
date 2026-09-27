"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import WhatsappButton from "@/components/WhatsappButton"

export default function Contato() {

const [loading,setLoading] = useState(false)
const [sent,setSent] = useState(false)

async function handleSubmit(e:any){
e.preventDefault()
setLoading(true)

const formData = new FormData(e.target)

await fetch("/api/contato",{
method:"POST",
body:JSON.stringify({
nome:formData.get("nome"),
email:formData.get("email"),
mensagem:formData.get("mensagem")
})
})

setLoading(false)
setSent(true)
}

return(

<>
<Navbar/>

<main className="min-h-screen bg-neutral-950 text-white px-6 py-24">

<div className="max-w-5xl mx-auto">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-5xl font-semibold mb-6"
>
vamos construir algo poderoso
</motion.h1>

<p className="text-neutral-400 mb-16 max-w-xl">
descreva sua ideia, produto ou projeto. respondemos rapidamente com uma estratégia clara.
</p>

<div className="grid md:grid-cols-2 gap-16">

<form onSubmit={handleSubmit} className="space-y-6">

<input
name="nome"
placeholder="seu nome"
required
className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-lg"
/>

<input
name="email"
type="email"
placeholder="seu email"
required
className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-lg"
/>

<textarea
name="mensagem"
rows={6}
placeholder="conte sobre seu projeto..."
required
className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-lg"
/>

<button
className="w-full bg-white text-black py-4 rounded-lg font-medium hover:opacity-80 transition"
>

{loading ? "enviando..." : "enviar mensagem"}

</button>

{sent && (
<p className="text-green-400">
mensagem enviada com sucesso.
</p>
)}

</form>

<div className="space-y-10">

<div>
<h3 className="text-xl mb-2">email</h3>
<p className="text-neutral-400">
polymata.br@gmail.com
</p>
</div>

<div>
<h3 className="text-xl mb-2">whatsapp</h3>
<p className="text-neutral-400">
+55 11 94037-8289
</p>
</div>

<div>
<h3 className="text-xl mb-2">tempo de resposta</h3>
<p className="text-neutral-400">
menos de 24h
</p>
</div>

</div>

</div>

</div>

</main>

<WhatsappButton/>

</>

)
}