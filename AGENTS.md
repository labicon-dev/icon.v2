# AGENTS.md

Regras para **agentes de IA** (e humanos) que implementam tarefas neste
repositório. Boa parte deste código é gerada com apoio de agentes — este
documento existe para que isso não custe qualidade.

Três documentos, três donos. Não duplique conteúdo entre eles:

| Documento                              | Responde                                       |
| -------------------------------------- | ---------------------------------------------- |
| [`README.md`](./README.md)             | Como rodar, ferramentas, fluxo de contribuição |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Como o código é organizado, e por quê          |
| [`PRD.md`](./PRD.md)                   | O que o produto é, e o que é stub              |
| **AGENTS.md** (este)                   | O que você deve e não deve fazer ao mexer      |

**Leia o [`PRD.md`](./PRD.md) antes de mexer em qualquer seção do site.** Partes
que parecem prontas não estão — o formulário de contato exibe "mensagem enviada"
sem enviar nada.

## O gate

Estes quatro comandos são a régua. Não existe "passou no meu ambiente": todos
rodam no CI, e o build de preview da Vercel roda o lint antes do build.

```bash
pnpm run lint          # oxlint — sai != 0 em qualquer violação
pnpm run format:check  # Prettier
pnpm run test          # Vitest, inclui o teste de arquitetura
pnpm run build         # tsc -b (strict) + vite build
```

Se você precisou afrouxar uma regra para o seu código passar, **essa é a
discussão**, não um detalhe de configuração. Traga isso no PR em vez de
desligar a regra silenciosamente.

## Regras

**Arquitetura.** A direção de dependência é `pages → features → components/lib/config/styles`,
descrita em [`ARCHITECTURE.md`](./ARCHITECTURE.md#camadas) e **imposta por**
[`src/architecture.test.ts`](./src/architecture.test.ts). Uma feature não importa
de outra; o que for compartilhado sobe para `components/` ou `lib/`.

**TypeScript.** `strict` está ligado. Sem `any` gratuito, tipos explícitos nas
fronteiras (props, retornos de funções de dados).

**Estilo.** Use as utilitárias derivadas dos tokens (`bg-accent`, `text-hero`,
`font-mono`), não valores mágicos. Fonte de verdade:
[`src/styles/design-tokens.ts`](./src/styles/design-tokens.ts).

**Envs.** Leia sempre de `import.meta.env.VITE_*`. Ao adicionar uma env
obrigatória, registre-a nos **três** lugares listados em
[`ARCHITECTURE.md`](./ARCHITECTURE.md#segredos) — esquecer o `ImportMetaEnv` não
dá erro, só transforma o tipo em `any` silenciosamente.

**Nomes.** Arquivos em kebab-case minúsculo. Nomes de teste (`describe`/`it`) em
inglês; comentários e documentação em português.

**Comentários.** Explique o _porquê_, não o _quê_. Referência de issue pertence
ao commit e ao Linear, não ao arquivo — não escreva `// Seção X (ICO-42)`.

## O que NÃO fazer

- ❌ Não use `npm`/`yarn` — só `pnpm` (versão fixada em `packageManager`).
- ❌ Não migre o lint para ESLint (decisão ICO-49: manter oxlint).
- ❌ Não commite segredos ou `.env`/`.env.local` com valores reais.
- ❌ Não hardcode a URL da API nem outros endpoints.
- ❌ Não crie imports cruzados entre features.
- ❌ Não desligue regra de lint ou flag de tsconfig para fazer seu código passar.
- ❌ Não faça merge sem revisão humana — o check `human-approval` bloqueia.
- ❌ Não expanda o escopo além do que a issue/handoff pediu.
- ❌ Não presuma que algo funciona porque parece pronto na UI — confira o
  [`PRD.md`](./PRD.md#o-que-é-stub).

## Antes de abrir o PR

1. [ ] Os quatro comandos do [gate](#o-gate) passam.
2. [ ] Commits em [Conventional Commits](https://www.conventionalcommits.org/)
       (`tipo(escopo): descrição`, imperativo) — o `commit-msg` do Husky valida.
3. [ ] O **título do PR** também segue Conventional Commits (workflow `PR Title`).
4. [ ] O PR referencia a issue: `Resolves ICO-X`.
5. [ ] Nenhum segredo commitado.
6. [ ] O [template de PR](./.github/pull_request_template.md) foi preenchido —
       incluindo o que você **não** resolveu e por quê.

> A revisão humana acontece **depois** do PR aberto. Um agente prepara
> o trabalho; um mantenedor aprova antes do merge. Preparar bem inclui apontar
> os pontos fracos do próprio diff.

## Fluxo com o ICON DevKit

Skills do **ICON DevKit** padronizam o ciclo no Claude Code / Linear:

- **`icon-issue-creator`** — cria/planeja issues, quebra tarefas grandes em fases.
- **`icon-handoff-executor`** — executa uma issue: branch, implementação, gates,
  commits convencionais, PR (`Resolves ICO-X`). Um PR por fase, sem stacking.
- **`icon-pr-review`** — self-review do diff antes de abrir o PR.
- **`icon-cycle-review`** — panorama do andamento no Linear.

Elas preparam o trabalho; **não substituem** a revisão humana.
