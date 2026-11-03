# Polymata — Contexto do Projeto

Documento de referência para o desenvolvimento do site institucional da Polymata. Serve como fonte única de verdade sobre o que a empresa faz, para quem, com qual tom e quais regras o site deve seguir.

## Sobre a empresa

A Polymata é uma empresa de marketing e soluções estratégicas empresariais. Atende lojas, restaurantes, bares e outros estabelecimentos, combinando presença digital, tecnologia e estratégia para que cada negócio seja encontrado, lembrado e escale com segurança.

**Proposta de valor:** o cliente deixa de ser genérico. Sua marca fica distinta, confiável nas buscas e no mapa, e conectada a uma rede regional de fornecedores, consumidores e parceiros.

## Serviços

### 1. Sistemas para estabelecimentos
- Sistemas para lojas, restaurantes, bares e demais estabelecimentos.
- Logística e automação de processos.
- Exemplo em produção no site: cardápio digital em que o cliente pede pelo celular, acompanha o preparo e o pedido aparece na cozinha, com aviso ao garçom.

### 2. Catálogo de produtos e serviços
- Catálogos feitos com qualidade e inteligência, sempre atualizados.
- Fotografia profissional dos produtos e serviços.
- Edição das imagens por designers.
- Descrições escritas para atrair o consumidor.

### 3. Design de marca
- Logomarca autoral e exclusiva.
- Paleta de cores memorável.
- Diferenciação frente a produtos genéricos gerados por IA.

### 4. Presença digital e propaganda
- Criação de websites.
- Propaganda em redes sociais.
- Contratação de influenciadores relevantes para as campanhas.

### 5. Credibilidade e visibilidade
- Inclusão da empresa em plataformas e no Google (perfil completo, avaliações, fotos, catálogo).
- Aumento de visibilidade nas buscas e no mapa.
- Avaliações reais que geram confiança.

### 6. Estratégia regionalizada
- Mapeamento do mercado regional.
- Identificação do perfil de clientes.
- Análise de escalabilidade da empresa.
- Identificação de oportunidades locais.
- Rede de contatos estratégicos.

## Projetos (ecossistema)

Além dos serviços, a Polymata constrói uma rede de empresas que crescem juntas:

- **Networking empresarial:** conexões reais entre empresários da mesma região.
- **Comunidade:** troca contínua de experiência, indicação e apoio mútuo.
- **Elisão fiscal:** orientação sobre estruturas associativas e cooperativas para maior eficiência tributária, sempre dentro da lei.
- **Capitalização de recursos:** acesso facilitado a crédito, editais e parcerias de investimento.
- **Rede fornecedor-consumidor:** conexão entre quem produz e quem consome dentro da própria rede.
- **Workshops e encontros:** rodadas de networking, rodas de comunidade, planejamento tributário e acesso a capital.

> Atenção: o conteúdo sobre elisão fiscal deve sempre deixar claro que se trata de planejamento lícito, com orientação de profissionais habilitados. Não prometer economia tributária específica.

## Público-alvo

Donos e gestores de pequenos e médios negócios locais: lojas, restaurantes, bares, serviços e comércios que querem se destacar, ganhar confiança do consumidor e crescer na sua região.

## Estrutura do site

| Rota | Função |
| --- | --- |
| `/` | Apresentação da empresa: hero animado, vitrine de serviços, faixas com vídeo e CTA final |
| `/services` | Detalhe dos serviços com demonstrações reais (mapa com avaliações e cardápio com pedidos) |
| `/projetos` | Ecossistema: networking, comunidade, fiscal, capitalização, rede fornecedor-consumidor, workshops |
| `/contato` | Canal de contato |

Contato direto: botão de WhatsApp fixo, número `+55 11 94037-8289`.

## Identidade e tom

- Visual escuro, sofisticado, com tipografia leve e muito espaço em branco.
- Cores de acento por serviço: laranja `#F97316` (design), verde `#34D399` (credibilidade), azul `#60A5FA` (estratégia), roxo `#C084FC`, amarelo `#FBBF24`.
- Fonte: Geist (já carregada no `layout.tsx`).
- Tom: direto, confiante, em português do Brasil, sem jargão desnecessário. Descrever o que a Polymata faz em vez de apenas vender.
- Frases de marca já usadas: "Você é muito maior conosco", "Seus clientes saberão seu nome", "Você se distingue dos demais!", "sofisticação estratégica", "presença memorável".

## Padrões de animação

- Hero com `AnimatedHeroText`: palavras entram com blur, subida e fade; saem em ordem definida.
- Demais seções reutilizam `RevealText` (mesmo efeito, disparado por scroll) e `RevealBlock` (fade + subida).
- Faixas com vídeo de fundo usam `VideoTextSection`, com vídeos em `/public/video` (`.webm` e `.mp4`).
- Respeitar `prefers-reduced-motion`.
- Usar animação de entrada com moderação: poucos momentos fortes valem mais que efeito em tudo.

## Regras de desenvolvimento

1. **Nenhum botão sem função explícita e imprescindível.** Todo botão ou link deve levar a um destino real ou executar uma ação clara. Texto do botão diz o que acontece ("Falar com a Polymata", "Ver nossos serviços"), nunca "Saiba mais" genérico.
2. Stack: Next.js (App Router), Tailwind CSS, Framer Motion, lucide-react.
3. Layout responsivo, com foco visível no teclado e contraste adequado.
4. Componentes reutilizáveis ficam em `components/`; páginas em `app/`.
5. Textos e dados de exemplo (nomes de estabelecimentos, avaliações, preços) são ilustrativos e devem ser trocados por casos reais quando houver.
6. Não incluir fotos de pessoas reais ou depoimentos inventados apresentados como verdadeiros.

## Pendências

- [ ] Definir os vídeos finais em `/public/video` e atualizar `videoBase` nas faixas da home.
- [ ] Criar a página `/contato`.
- [ ] Trocar título e descrição padrão em `layout.tsx` (hoje "Create Next App") e `lang="en"` para `pt-BR`.
- [ ] Substituir imagens do Unsplash do cardápio por fotos próprias.
- [ ] Revisar com contador/advogado os textos de elisão fiscal.
- [ ] Incluir o `WhatsappButton` no layout para aparecer em todas as páginas.
