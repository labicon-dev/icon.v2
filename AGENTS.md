# AGENTS.md

Guia para **agentes de IA** (e humanos) que vão implementar tarefas neste
repositório. Boa parte do código do site do ICON v2 é gerada com apoio de
agentes — este documento padroniza como isso deve acontecer para que a
**revisão humana** continue sendo a etapa final e obrigatória antes do merge
(ver [ICO-21](https://linear.app/labicon/issue/ICO-21)).

Leia também o [`README.md`](./README.md), que cobre em detalhe como rodar o
projeto, a estrutura de pastas e as decisões de tooling.

## Contexto do projeto

Front-end do novo site do Laboratório ICON — single-page, tema escuro, estética
técnica/wireframe. O conteúdo (membros, publicações, projetos) vem de uma API do
laboratório; a URL base é tratada como **secreto**.

O trabalho é rastreado no **Linear** (time ICON, prefixo `ICO-`), organizado por
milestones. Todo PR deve referenciar a issue correspondente com `Resolves ICO-X`.

## Stack

| Camada       | Tecnologia                                                    |
| ------------ | ------------------------------------------------------------- |
| Build/dev    | Vite 8                                                        |
| UI           | React 19 + TypeScript                                         |
| Estilo       | Tailwind CSS v4 (`@tailwindcss/vite`) + tokens do Figma       |
| Lint         | oxlint (**não** ESLint — ver ICO-49)                          |
| Formatação   | Prettier                                                      |
| Hooks de git | Husky (`pre-commit` → lint-staged, `commit-msg` → commitlint) |
| Package mgr  | **pnpm** (não use `npm`/`yarn`)                               |
| Node         | **22** (fixado em [`.nvmrc`](./.nvmrc); use `nvm use`)        |

## Convenções de código

- **Formatação:** deixe o Prettier decidir — não brigue manualmente com o
  estilo. No dia a dia, confie no hook `pre-commit` (lint-staged), que formata
  **apenas os arquivos staged**. Evite rodar `pnpm run format` global: ele
  reescreve todos os arquivos e, em Windows, pode gerar diffs "fantasma" só de
  EOL. Config em [`.prettierrc`](./.prettierrc); EOL normalizado por
  [`.gitattributes`](./.gitattributes).
- **Lint:** `pnpm run lint` (oxlint). Regras em [`.oxlintrc.json`](./.oxlintrc.json).
  Respeite as regras de hooks do React.
- **TypeScript:** sem `any` gratuito; prefira tipos explícitos nas fronteiras
  (props, retornos de funções de dados).
- **Estilo visual:** use as classes utilitárias derivadas dos tokens
  (`bg-accent`, `text-hero`, `font-mono`, …) em vez de valores hardcoded. A
  fonte de verdade dos tokens é [`src/styles/design-tokens.ts`](./src/styles/design-tokens.ts).
- **Env/segredos:** leia sempre de `import.meta.env.VITE_*`. Nunca hardcode a URL
  da API nem qualquer segredo. Ao adicionar uma env obrigatória, registre-a em
  [`src/config/env.ts`](./src/config/env.ts) (`REQUIRED_ENV_KEYS`),
  [`.env.template`](./.env.template) e `ImportMetaEnv` (`src/vite-env.d.ts`).

## Estrutura de pastas

`src/` é organizado **por feature/domínio** (detalhes no README):

```
src/
├── main.tsx          # ponto de entrada
├── App.tsx           # composição raiz
├── index.css         # estilos globais (Tailwind + @config dos tokens)
├── components/       # UI reutilizável, agnóstica de domínio
├── features/         # módulos por feature (membros, publicações, projetos…)
├── pages/            # componentes de página/rota (M2)
├── lib/              # utilitários e clients compartilhados (ex.: api.ts)
├── config/           # configuração (ex.: validação de env)
└── styles/           # design tokens e estilos base
```

Regra: **uma feature não importa de outra**. O que for compartilhado sobe para
`components/` ou `lib/`.

## O que NÃO fazer

- ❌ Não use `npm`/`yarn` — só `pnpm`.
- ❌ Não migre o lint para ESLint (decisão ICO-49: manter oxlint).
- ❌ Não commite segredos ou `.env`/`.env.local` com valores reais — só o
  `.env.template` com chaves vazias.
- ❌ Não hardcode a URL da API nem outros endpoints.
- ❌ Não crie imports cruzados entre features.
- ❌ Não faça merge sem revisão humana — o status check `human-approval` bloqueia.
- ❌ Não misture escopos muito diferentes num único commit/PR.
- ❌ Não expanda o escopo além do que a issue/handoff pediu.

## Checklist antes de abrir o PR

1. [ ] `pnpm run lint` passa.
2. [ ] `pnpm run format:check` passa (rode `pnpm run format` se precisar).
3. [ ] `pnpm run build` passa (type-check + build).
4. [ ] Commits seguem [Conventional Commits](https://www.conventionalcommits.org/)
       (`tipo(escopo): descrição` no imperativo) — o `commit-msg` do Husky valida.
5. [ ] O **título do PR** também segue Conventional Commits (o workflow
       `PR Title` valida).
6. [ ] O PR referencia a issue: `Resolves ICO-X`.
7. [ ] Nenhum segredo foi commitado.
8. [ ] O template de PR foi preenchido (o que mudou, decisões, como testar).

> A revisão humana (ICO-21) é obrigatória e acontece **depois** do PR aberto.
> Um agente prepara o PR; um mantenedor aprova antes do merge.

## Fluxo com o ICON DevKit

Os projetos do laboratório usam skills do **ICON DevKit** para padronizar o ciclo
no Claude Code / Linear:

- **`icon-issue-creator`** — cria/planeja issues no Linear a partir de uma
  descrição informal; quebra tarefas grandes em sub-issues por fase.
- **`icon-handoff-executor`** — executa uma issue/handoff: cria a branch com o
  padrão do Linear, implementa, roda os gates locais, faz commits convencionais
  e abre o PR (`Resolves ICO-X`). Um PR por issue/fase (sem stacking).
- **`icon-pr-review`** — self-review do diff contra os padrões do laboratório
  antes de abrir/atualizar o PR.
- **`icon-cycle-review`** — panorama do andamento do projeto no Linear.

Esses fluxos **não substituem** a revisão humana — apenas preparam o trabalho
para ela.
