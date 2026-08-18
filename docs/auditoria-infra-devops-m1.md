# Auditoria de infra/DevOps — fim da M1 (ICO-55)

> Revisão de ponta a ponta da `main` antes de liberar a **M2 (Desenvolvimento das
> Páginas via agentes de IA)**. O objetivo é garantir que a fundação (M1) está
> sólida — **esta issue mapeia e encaminha os gaps, não corrige tudo**. Cada gap
> não-trivial vira uma issue de follow-up no Linear.

- **Data:** 2026-07-04
- **Escopo auditado:** branch `main` do repositório `labicon-dev/icon.v2` — CI/CD
  (GitHub Actions), regras de merge/branch protection, gestão de secrets e envs,
  versionamento de Node, e configs de lint/format/Husky/commitlint.
- **Método:** leitura da árvore de configuração + consulta à API do GitHub
  (`rulesets`, `actions/secrets`, `dependabot/secrets`, `runs`).

## Resumo executivo

A fundação está **majoritariamente sólida**: Husky + commitlint + lint-staged,
Prettier + oxlint alinhados, Dependabot, CODEOWNERS, template de PR, validação de
env no boot e workflows de CI/PR-title/human-approval estão todos presentes e bem
escritos. Porém, **três gaps comprometem as garantias que a M1 pretende dar** e
devem ser resolvidos antes (ou logo no início) da M2:

| #   | Severidade | Gap                                                                                                                                                                                                                                    | Follow-up        |
| --- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | **Alta**   | O ruleset da `main` **não exige nenhum status check** e **não exige code owner review** → `human-approval` (ICO-21), `CI`, `PR Title` e o CODEOWNERS são apenas informativos; um PR pode ser mergeado vermelho / sem revisão de owner. | ICO-56           |
| 2   | **Alta**   | CI **falha em todo PR do Dependabot** — o build exige o secret `VITE_API_BASE_URL`, que resolve vazio no contexto do Dependabot. O sinal "CI verde" está quebrado para toda atualização de dependência.                                | ICO-57           |
| 3   | **Média**  | Node inconsistente: `.nvmrc`=22 (usado por CI e local) mas `Dockerfile.dev`=`node:24-alpine` e `@types/node`=^24. O README afirma "dev e CI sempre em sincronia", o que o caminho Docker contradiz.                                    | ICO-58           |
| 4   | **Média**  | Pipeline de CI aquém do alvo da M4: job único `lint-and-build`, sem jobs separados de typecheck/test, sem runner de testes, e `on: push` sem filtro (runs duplicados).                                                                 | ICO-59           |
| 5   | **Baixa**  | Variáveis `VITE_*` são **públicas** (embutidas no bundle do cliente); tratá-las como "secretas" no wording é enganoso.                                                                                                                 | Documentado aqui |

**Recomendação:** resolver os itens 1 e 2 antes de abrir a M2 (são os que dão
falsa sensação de segurança). Os itens 3–4 podem correr em paralelo com a M2.

---

## 1. CI/CD (GitHub Actions)

**O que existe hoje** (`.github/workflows/`):

- `ci.yml` — job único `lint-and-build`: `pnpm install --frozen-lockfile` →
  `lint` (oxlint) → `format:check` (Prettier) → `build` (`tsc -b && vite build`).
  Node lido de `.nvmrc`, cache de pnpm habilitado. ✅
- `merge-check.yml` — expõe o check `human-approval` (ICO-21). ✅ bem escrito
- `pr-title.yml` — valida título do PR em Conventional Commits. ✅
- `labeler.yml` — auto-label por área. ✅

**Gaps encontrados:**

- **[Alta] Build de CI quebra em PRs do Dependabot** (→ ICO-57). O passo `build`
  injeta `VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}` e o validador de
  boot (`src/config/env.ts` via `vite.config.ts`) **falha o build de propósito**
  se a env estiver vazia. Em runs disparados pelo Dependabot o secret resolve
  **vazio** (contexto de token/secret separado), então **todo bump de dependência
  fica vermelho** — confirmado nos runs `28694006752` (PR) e `28694006060` (push).
  O secret existe tanto em _Actions_ quanto em _Dependabot secrets_, mas mesmo
  assim não chega ao job. Um build/lint de CI (que **não** faz deploy) não precisa
  da URL real da API: o correto é injetar um **placeholder** (ex.:
  `VITE_API_BASE_URL: https://example.invalid`) no job de CI e reservar o secret
  real apenas para o deploy (Vercel/servidor). Isso torna o CI autocontido e
  determinístico.
- **[Média] Pipeline aquém do alvo da M4** (→ ICO-59). A M4 prevê jobs separados
  de lint/typecheck/test/build com cache. Hoje:
  - typecheck só acontece dentro do `build` (`tsc -b`) — sem job/script dedicado
    (`tsc --noEmit`);
  - **não há runner de testes** (nenhum vitest/jest no `package.json`) nem script
    `test` — aceitável enquanto não há código de página, mas precisa existir antes
    de a M2 gerar features via agentes;
  - `on: push` **sem filtro de branch** → CI roda em _todo_ push de _qualquer_
    branch **e** de novo no PR = runs duplicados e minutos desperdiçados. Escopar
    para `push: { branches: [main] }` (+ tags) ou remover o gatilho de push.

---

## 2. Branch protection / regras de merge

Proteção configurada via **ruleset** (novo modelo), não branch protection clássica
— ruleset `18497955` (`enforcement: active`) sobre `refs/heads/main`.

**O que está bom:**

- PR obrigatório com **1 aprovação**, `dismiss_stale_reviews_on_push: true`,
  `required_review_thread_resolution: true`, bloqueio de `deletion`/`creation` e
  `non_fast_forward`. ✅

**Gaps encontrados:**

- **[Alta] Nenhum status check obrigatório** (→ ICO-56). O ruleset **não tem** regra
  `required_status_checks`. Consequência direta: os checks `human-approval`, `CI`
  (Lint & Build) e `PR Title` **não bloqueiam o merge** — são apenas informativos.
  Isso **anula na prática o gate de revisão humana da ICO-21** e permite mergear um
  PR com CI vermelho. Adicionar `CI / Lint & Build`, `human-approval` e
  `Validar título (Conventional Commits)` como checks obrigatórios.
- **[Alta] Code owner review não exigido** (→ ICO-56). `require_code_owner_review:
false` → o arquivo `CODEOWNERS` (que existe e está correto) é **decorativo**.
  Ligar `require_code_owner_review: true` para que a revisão dos mantenedores seja
  de fato obrigatória.
- **[Média] Bypass de admin irrestrito** (→ ICO-56). `bypass_actors` inclui a role
  Admin com `bypass_mode: always` (`current_user_can_bypass: always`) → admins
  contornam o PR e podem empurrar direto na `main`. Para uma política de "código de
  IA só entra com revisão humana", avaliar remover o bypass ou restringi-lo a
  `pull_request`.
- **[Baixa] Higiene de merge**. `allow_merge_commit`/`squash`/`rebase` todos
  habilitados e `delete_branch_on_merge: false` → histórico ruidoso e branches
  órfãos acumulando. Sugestão: squash-only + apagar branch no merge.

---

## 3. Secrets e variáveis de ambiente

**O que está bom:**

- `.env.template` presente com a chave vazia; `.gitignore` ignora `.env*` exceto o
  template (`!.env.template`). ✅
- `VITE_API_BASE_URL` cadastrado em **Actions secrets** e **Dependabot secrets**. ✅
- Validação centralizada e "fail-fast" em `src/config/env.ts`, usada tanto no
  runtime quanto no build (`vite.config.ts`). ✅ desenho sólido
- Nenhum segredo commitado no histórico auditado. ✅

**Gaps encontrados:**

- **[Baixa] "Secret" que na verdade é público.** Toda variável `VITE_*` é embutida
  no bundle JS entregue ao browser — `VITE_API_BASE_URL` **não é secreto** no
  sentido de confidencialidade em runtime; qualquer visitante consegue lê-lo. Os
  comentários que a chamam de "URL base é secreta (ver ICO-9)" (em `ci.yml` e no
  contexto da ICO-9) induzem ao erro. Recomenda-se: (a) documentar que envs `VITE_`
  são **build-time públicas**, e (b) não usar o mecanismo de secret como se fosse
  proteção de confidencialidade — o uso de secret aqui serve só para parametrizar o
  build por ambiente, não para esconder valor. Segredos de verdade (tokens de API,
  chaves) **nunca** devem receber o prefixo `VITE_`.
- Ver também item 1: a dependência do secret no build de CI é frágil e deve virar
  placeholder.

---

## 4. Versionamento de Node

- `.nvmrc` = **22**; CI usa `node-version-file: .nvmrc` → **dev local e CI em
  sincronia**. ✅
- **[Média] Docker de dev fora de sincronia** (→ ICO-58). `Dockerfile.dev` usa
  `FROM node:24-alpine`, enquanto `.nvmrc`/CI usam Node 22. Como o README recomenda
  o caminho Docker como alternativa ao nvm, a afirmação do próprio README de que
  "dev e CI ficam sempre em sincronia" **não se sustenta** para quem usa o
  container. Alinhar o Dockerfile a `node:22-alpine` (ou, se a decisão for subir
  para 24, atualizar `.nvmrc`, README e CI juntos — escolher **uma** versão).
- **[Baixa] `@types/node`=^24** com runtime em Node 22 (tipos à frente do runtime).
  O Dependabot inclusive já tentou subir para 26. Sugestão: fixar `@types/node` no
  major que casa com `.nvmrc`.

---

## 5. Lint / Format / Husky / Commitlint

**O que está bom:**

- Husky `pre-commit` → `lint-staged` (oxlint + `prettier --write`);
  `commit-msg` → `commitlint --edit`. ✅
- `commitlint.config.js` estende `config-conventional`; o workflow `pr-title.yml`
  espelha os mesmos tipos — commit e título de PR consistentes. ✅
- Prettier configurado (`.prettierrc`/`.prettierignore`) e checado no CI
  (`format:check`). ✅

**Gaps encontrados (todos baixos — não geram issue própria):**

- `lint-staged` roda `oxlint` **sem `--fix`** nos arquivos staged (só o Prettier
  autofixa). Adicionar `oxlint --fix` reduz idas e vindas no commit.
- `.oxlintrc.json` habilita apenas 2 regras explícitas. oxlint já liga a categoria
  `correctness` por padrão, mas vale avaliar ativar mais categorias
  (`suspicious`, `pedantic` seletivo) quando a M2 começar a gerar código.
- Sem `.editorconfig` — nicety de consistência entre editores.
- Sem typecheck em `pre-commit` (erros de TS só aparecem no `build`); aceitável.

---

## Encaminhamentos (issues de follow-up)

Criadas no Linear a partir desta auditoria:

- **ICO-56 — [Alta]** Exigir status checks e code owner review no ruleset da `main`.
- **ICO-57 — [Alta]** CI verde para PRs do Dependabot: usar placeholder de
  `VITE_API_BASE_URL` no build (reservar secret real p/ deploy).
- **ICO-58 — [Média]** Alinhar versão do Node (Dockerfile.dev × .nvmrc ×
  `@types/node`).
- **ICO-59 — [Média]** Evoluir CI para o alvo da M4 (jobs typecheck/test, runner de
  testes, escopar `on: push`).

Os itens de severidade baixa (seções 3 e 5, e `@types/node`) ficam registrados
aqui como melhorias incrementais, sem issue dedicada.

## Critério de aceite pendente

> **Aprovação humana explícita antes de liberar o início da M2.** Este relatório
> **não** libera a M2 por si só — a decisão de liberar é de um mantenedor humano,
> após revisar estes achados e o encaminhamento dos itens de severidade alta.
