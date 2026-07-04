# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

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
usam stubs isolados em [`src/lib/stubs.ts`](./src/lib/stubs.ts), com as mesmas
assinaturas assíncronas para facilitar a troca pelo client real no M3.

> A validação de que as variáveis obrigatórias estão populadas no boot é
> tratada em issue própria (ICO-52).

## Lint e formatação

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

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
