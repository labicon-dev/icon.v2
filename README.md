# Site do ICON v2

Front-end do novo site do Laboratório ICON — single-page, tema escuro, estética
técnica/wireframe. Construído com **React 19 + TypeScript + Vite**, estilizado
com **Tailwind CSS v4** sobre os tokens de design extraídos do Figma.

## Como rodar

Pré-requisitos: **Node 22+** e **pnpm** (ou apenas Docker — ver a seção
[Ambiente de desenvolvimento com Docker](#ambiente-de-desenvolvimento-com-docker)).

```bash
pnpm install      # instala as dependências (e configura os hooks do Husky)
pnpm run dev      # sobe o dev server do Vite em http://localhost:5173
```

| Script                  | O que faz                                                |
| ----------------------- | -------------------------------------------------------- |
| `pnpm run dev`          | Dev server do Vite com hot-reload                        |
| `pnpm run build`        | Type-check (`tsc -b`) + build de produção (`vite build`) |
| `pnpm run preview`      | Serve localmente o build de produção                     |
| `pnpm run lint`         | Analisa o código com oxlint                              |
| `pnpm run format`       | Formata todos os arquivos com Prettier (in-place)        |
| `pnpm run format:check` | Verifica a formatação sem alterar (útil para CI)         |

## Estrutura de pastas

O `src/` é organizado **por feature/domínio**, substituindo a estrutura genérica
do template padrão do Vite. A ideia é manter cada domínio coeso e isolado, com os
blocos reutilizáveis num nível compartilhado.

```
src/
├── main.tsx          # ponto de entrada — monta o React no #root
├── App.tsx           # composição raiz da aplicação
├── index.css         # estilos globais (importa o Tailwind e o @config dos tokens)
├── components/       # componentes de UI reutilizáveis e agnósticos de domínio
├── features/         # módulos por feature (membros, publicações, projetos…)
├── pages/            # componentes de página/rota (M2)
├── lib/              # utilitários e clients compartilhados (ex.: api.ts)
└── styles/           # design tokens e estilos base (design-tokens.ts)
```

Cada pasta nova tem um `README.md` com sua finalidade e convenções:
[`components/`](./src/components/README.md), [`features/`](./src/features/README.md)
e [`pages/`](./src/pages/README.md). Regra geral: uma feature **não** importa de
outra — o que for compartilhado sobe para `components/` ou `lib/`. As pastas de
`features/` e `pages/` começam como placeholders e recebem o conteúdo real a
partir do M2.

## Ambiente de desenvolvimento com Docker

O ambiente de dev roda em container com hot-reload do Vite. Basta ter Docker + Docker Compose instalados.

```bash
docker compose -f docker-compose.dev.yml up
```

O dev server fica disponível em **http://localhost:5173**. O código-fonte é montado via bind mount, então edições em `src/` refletem no navegador sem rebuild da imagem.

| Item          | Valor                                                |
| ------------- | ---------------------------------------------------- |
| Porta do Vite | `5173` (host → container)                            |
| Dockerfile    | [`Dockerfile.dev`](./Dockerfile.dev)                 |
| Compose       | [`docker-compose.dev.yml`](./docker-compose.dev.yml) |

> O hot-reload usa polling do file watcher (`server.watch.usePolling`) para funcionar de forma confiável em bind mounts do Docker Desktop no macOS/Windows.

Para reconstruir a imagem após mudar dependências (`package.json` / `pnpm-lock.yaml`):

```bash
docker compose -f docker-compose.dev.yml up --build
```

## Estilização (Tailwind CSS + tokens)

O projeto usa **Tailwind CSS v4** via o plugin oficial do Vite ([`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite)), habilitado em [`vite.config.ts`](./vite.config.ts). O Tailwind é importado em [`src/index.css`](./src/index.css) (`@import 'tailwindcss'`).

Os tokens de design (cores, tipografia e espaçamento) vêm de [`src/styles/design-tokens.ts`](./src/styles/design-tokens.ts) — a fonte de verdade extraída do Figma (ver [`docs/design-tokens.md`](./docs/design-tokens.md)). Esse objeto é reaproveitado em [`tailwind.config.ts`](./tailwind.config.ts), carregado pelo CSS através da diretiva `@config`. Assim, as classes utilitárias (`bg-accent`, `text-hero`, `font-mono`, etc.) refletem o design system, e não os valores genéricos do template.

As fontes **Space Grotesk** e **JetBrains Mono** são carregadas via Google Fonts em [`index.html`](./index.html).

## Variáveis de ambiente e integração com a API

Os segredos (incluindo a **URL base da API**, que é tratada como secreto)
nunca são versionados. O repositório versiona apenas o
[`.env.template`](./.env.template), que contém somente as **chaves** com
valores vazios.

Para rodar localmente contra a API real:

```bash
cp .env.template .env.local
# edite .env.local e preencha VITE_API_BASE_URL com o valor fornecido pelo time
```

O `.env.local` é ignorado pelo git (ver [`.gitignore`](./.gitignore)) — **nunca
commite valores reais**. Em CI/deploy, defina as mesmas variáveis como secrets
do ambiente (GitHub Actions Secrets, env vars do Vercel/servidor do lab).

| Variável            | Descrição                                                   |
| ------------------- | ----------------------------------------------------------- |
| `VITE_API_BASE_URL` | URL base da API do laboratório (secreta; obtida com o time) |

O client HTTP fica em [`src/lib/api.ts`](./src/lib/api.ts) e lê a URL base
**sempre** de `VITE_API_BASE_URL` — nada de endpoint hardcoded. Hoje ele cobre
`GET /member/all`. Publicações e projetos ainda não têm endpoint confirmado e
serão adicionados quando forem definidos (M3).

> A validação de que as variáveis obrigatórias estão populadas no boot é
> tratada em issue própria (ICO-52).

## Lint e formatação

> **Decisão (ICO-49):** manter o **oxlint** (já presente no scaffold do Vite) em
> vez de migrar para o ESLint. O oxlint é escrito em Rust, roda ordens de
> grandeza mais rápido e já cobre as regras que precisamos para o projeto —
> migrar para ESLint traria complexidade de configuração sem ganho prático aqui.

O projeto separa as responsabilidades: **oxlint** cuida das regras de lint e **Prettier** cuida apenas da formatação de código. Como o oxlint não formata, não há conflito entre as duas ferramentas.

| Script                  | Ferramenta | O que faz                                        |
| ----------------------- | ---------- | ------------------------------------------------ |
| `pnpm run lint`         | oxlint     | Analisa o código em busca de problemas (regras)  |
| `pnpm run format`       | Prettier   | Formata todos os arquivos in-place               |
| `pnpm run format:check` | Prettier   | Verifica a formatação sem alterar (útil para CI) |

A configuração do Prettier fica em [`.prettierrc`](./.prettierrc) e os caminhos ignorados em [`.prettierignore`](./.prettierignore).

## Git hooks (Husky)

Os hooks de git são gerenciados pelo [Husky](https://typicode.github.io/husky/) e ficam versionados em [`.husky/`](./.husky). São instalados automaticamente pelo script `prepare` ao rodar `pnpm install`.

| Hook         | O que roda    | O que faz                                                                                                                                   |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged` | Roda oxlint + Prettier **apenas nos arquivos staged**, corrigindo a formatação in-place                                                     |
| `commit-msg` | `commitlint`  | Valida a mensagem de commit contra o padrão [Conventional Commits](https://www.conventionalcommits.org/), bloqueando commits fora do padrão |

A configuração do lint-staged fica no [`package.json`](./package.json) (campo `lint-staged`) e a do commitlint em [`commitlint.config.js`](./commitlint.config.js) (estende `@commitlint/config-conventional`).
