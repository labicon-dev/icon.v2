# PRD — Site do ICON v2

O que este site é, para quem, e o que ele realmente faz hoje. Para **como o
código é organizado**, veja [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Objetivo

Ser a presença pública do **Laboratório ICON** (Interatividade, Computação e
Novas Interfaces — IHAC/UFBA): apresentar o laboratório, suas áreas de pesquisa
e sua equipe, e servir de porta de entrada para quem quer colaborar.

Não é um produto com usuários logados, nem um CMS. É uma página única de
apresentação, alimentada por uma API do laboratório para o conteúdo que muda.

## Público

| Público                        | O que precisa encontrar                                |
| ------------------------------ | ------------------------------------------------------ |
| Estudantes interessados no lab | O que o ICON faz, quem está lá, como entrar em contato |
| Pesquisadores e parceiros      | Áreas de atuação, credibilidade institucional          |
| Comunidade e visitantes        | O que é o laboratório, em linguagem acessível          |

## Identidade

Tema escuro, estética técnica/wireframe, tipografia mono para metadados e sans
para conteúdo. Bilíngue de forma assimétrica: português como língua principal,
com termos e traduções curtas em inglês como elemento de estilo (`/ About`,
`where code becomes art`) — **não** é um site traduzido, e não há troca de idioma.

Acessibilidade e `prefers-reduced-motion` são requisitos, não enfeite: o site
tem partículas animadas, marquee, typewriter e scanlines, e todos precisam
parar para quem pede movimento reduzido.

## Seções

Ordem fixa, navegação por âncora. A numeração aparece na interface.

| #   | Seção              | Âncora       | Conteúdo                                                      | Fonte dos dados  |
| --- | ------------------ | ------------ | ------------------------------------------------------------- | ---------------- |
| 01  | Início             | `#inicio`    | Hero, typewriter, campo de partículas, barra técnica, marquee | Hardcoded        |
| 02  | Sobre o ICON       | `#sobre`     | Apresentação, tripé Arte/Ciência/Educação, "o que fazemos"    | Hardcoded        |
| 03  | Áreas de Interesse | `#interesse` | 6 cards (`A_01`–`A_06`) com área, tradução e descrição        | Hardcoded        |
| 04  | Quem Somos         | `#quem`      | Grid de cards da equipe                                       | **API**          |
| 05  | Ao Vivo            | `#live`      | Janela de vídeo do laboratório                                | **Stub**         |
| 06  | Entre em Contato   | `#contato`   | E-mail, endereço, redes, formulário                           | **Stub parcial** |

## Dados

### Membros — real

`GET /member/all` na API do laboratório, com header `X-API-KEY`.

- Só entram membros com `activeOnWebsite: true`.
- A ordem é embaralhada a cada carregamento — decisão de produto, para não
  hierarquizar a equipe visualmente.
- Sem foto (`avatarUrl` ausente), o card cai para as iniciais derivadas do nome
  sobre um fundo hachurado.

O contrato ainda **não foi formalizado** pelo time. Os campos consumidos hoje
são `id`, `name`, `activity`, `avatarUrl` e `activeOnWebsite`.

## O que é stub

Esta seção existe para que ninguém — humano ou agente — assuma que estas partes
funcionam. Tudo aqui está **em produção com aparência de pronto**.

### Formulário de contato — engana o usuário

`ContatoSection` valida os campos, limpa o formulário e exibe
**"✓ Mensagem enviada"**. Não existe destino: nenhum endpoint, nenhum e-mail,
nenhum armazenamento. A mensagem é descartada.

Do ponto de vista de quem visita o site, isso é pior que não ter formulário:
a pessoa acredita que fez contato. **Precisa de decisão de produto** — ligar a
um serviço de formulário, trocar por um `mailto:`, ou remover.

### Feed ao vivo (a ser implementado)

A seção "Ao Vivo" tem barra de status, relógio real, marca "● REC", scanlines e
cantoneiras, mas o centro diz _"[ Sinal da câmera do laboratório ]"_. Não há
stream. O relógio funcionando reforça a impressão de que o feed está no ar.

### Links de redes sociais — não confirmados

Instagram, GitHub e YouTube em `ContatoSection` estão marcados com
`TODO(revisão): confirmar os perfis oficiais do laboratório`. Podem apontar para
perfis errados ou inexistentes.

## Requisitos não-funcionais

- **Sem backend próprio.** Bundle estático + API externa consumida do browser.
- **Toda `VITE_*` é pública.** Não existe segredo do lado do cliente — ver
  [`ARCHITECTURE.md`](./ARCHITECTURE.md#segredos).
- **Falha rápido em configuração faltando:** sem as envs obrigatórias, o build
  quebra com mensagem clara em vez de publicar um site quebrado.
- **Revisão humana obrigatória.** Boa parte do código é gerada por agentes de
  IA; o status check `human-approval` bloqueia merge sem aprovação de um
  mantenedor.

## Deploy

| Ambiente | Onde                                        | Estado                       |
| -------- | ------------------------------------------- | ---------------------------- |
| Preview  | Vercel, a cada PR                           | Funcionando                  |
| Produção | Servidor próprio do laboratório, via Docker | **Ainda não existe** (M4/M5) |

A Vercel é **CI visual**, não produção: `vercel.json` desabilita deploy da
`main` (`git.deploymentEnabled.main: false`).

## Decisões de produto em aberto

1. **Destino do formulário de contato** — ligar, substituir por `mailto:` ou remover.
2. **Feed ao vivo** — implementar de verdade, ou assumir como elemento decorativo
   e remover a linguagem que sugere transmissão.
3. **Perfis de redes sociais** — confirmar as URLs oficiais.
