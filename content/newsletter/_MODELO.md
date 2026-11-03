---
titulo: Título que aparece na página e no Google
subtitulo: Uma ou duas frases abaixo do título, para prender a leitura.
descricao: Resumo de até 155 caracteres mostrado no Google. Inclua a busca principal.
categoria: Gestão & Operação
data: 2026-11-03
palavras-chave: busca principal, variação da busca, outra pergunta comum do cliente
chamada: Frase do convite no fim do artigo, ligada ao serviço da Polymata.
destaque: não
rascunho: sim
---

COMO PUBLICAR UM NOVO ARTIGO
============================

Jeito rápido (no computador):
  npm run artigo -- "Título do artigo"
Isso cria content/newsletter/titulo-do-artigo.md já preenchido com este modelo.

Jeito sem programa nenhum (pelo GitHub):
  1. Abra o repositório no GitHub, entre na pasta content/newsletter
  2. Clique em "Add file" > "Create new file"
  3. Dê um nome terminado em .md (ex.: como-vender-mais.md). Esse nome vira o endereço
  4. Cole este modelo, escreva e clique em "Commit changes"
  A Vercel publica sozinha em poucos minutos.

CAMPOS DO TOPO (entre as linhas ---)
  titulo ........ título da edição
  subtitulo ..... linha fina abaixo do título
  descricao ..... texto do Google (até ~155 caracteres)
  categoria ..... uma destas: Restaurantes & Delivery, Marketing & Presença,
                  Marca & Reputação, Fotografia & Vídeo, Gestão & Operação,
                  Tributário & Finanças, Tecnologia & Automação,
                  Profissionais Liberais, Networking & Comunidade
                  (pode criar outra; ela ganha uma cor automática)
  data .......... AAAA-MM-DD, define a ordem e o número da edição
  palavras-chave  buscas que o cliente faz no Google, separadas por vírgula
  chamada ....... convite que aparece no fim do artigo
  destaque ...... "sim" coloca o artigo como capa da newsletter
  rascunho ...... "sim" esconde o artigo do site

FORMATAÇÃO DO TEXTO
  ## Intertítulo          (entra no índice "Neste artigo")
  ### Subtítulo menor
  > Frase em destaque     (citação grande)
  !> Alerta               (caixa de atenção)
  - item de lista
  1. item numerado
  **negrito**  *itálico*  [texto do link](/contato)
  ---                     (linha divisória)
  Linha em branco separa parágrafos.

DICAS DE GOOGLE
  - Use a busca principal no título, na descrição, em um intertítulo e no
    primeiro parágrafo, de forma natural, sem repetir à exaustão.
  - Escreva como o cliente pesquisa ("como aparecer no Google"), não como o
    especialista fala.
  - Cite a região quando fizer sentido (São Paulo, Campinas, interior de SP).

Arquivos que começam com "_" (como este) nunca aparecem no site.
