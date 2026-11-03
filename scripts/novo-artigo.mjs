#!/usr/bin/env node
/*
  Cria um novo artigo da newsletter a partir do modelo.
  Uso:  npm run artigo -- "Título do artigo"
*/
import fs from "node:fs"
import path from "node:path"

const titulo = process.argv.slice(2).join(" ").trim()
if (!titulo) {
  console.log('\nUso: npm run artigo -- "Título do artigo"\n')
  process.exit(1)
}

const slug = titulo
  .normalize("NFD")
  .replace(/[̀-ͯ]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 80)
  .replace(/-$/, "")

const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" })
const dir = path.join(process.cwd(), "content", "newsletter")
const file = path.join(dir, `${slug}.md`)

if (fs.existsSync(file)) {
  console.log(`\nJá existe um artigo com esse endereço: content/newsletter/${slug}.md\n`)
  process.exit(1)
}

const conteudo = `---
titulo: ${titulo}
subtitulo: Uma ou duas frases que aparecem abaixo do título e prendem a leitura.
descricao: Resumo de até 155 caracteres que aparece no Google. Use a palavra-chave principal.
categoria: Gestão & Operação
data: ${hoje}
palavras-chave: palavra-chave principal, variação, outra busca comum
chamada: Frase do convite no fim do artigo, ligada ao serviço da Polymata.
rascunho: sim
---

Primeiro parágrafo: comece por uma cena ou um problema que o leitor reconhece.

## Primeiro intertítulo

Texto do parágrafo.

> Uma frase forte para aparecer em destaque.

## Segundo intertítulo

- Item de lista
- Outro item

!> Um alerta ou observação importante aparece em uma caixa.
`

fs.mkdirSync(dir, { recursive: true })
fs.writeFileSync(file, conteudo, "utf-8")
console.log(`\nArtigo criado: content/newsletter/${slug}.md`)
console.log("Ele está como rascunho. Quando terminar, apague a linha 'rascunho: sim' para publicar.\n")
