# ARCHITECTURE

Como o código deste repositório é organizado, e por quê. Para o **escopo do
produto** (o que o site é, o que é real e o que é stub), veja [`PRD.md`](./PRD.md).
Para **como rodar e contribuir**, veja [`README.md`](./README.md).

Este documento descreve o estado **atual**, não uma intenção. Onde o código
ainda diverge do alvo, isso está registrado em
[Divergências conhecidas](#divergências-conhecidas) — não escondido.

## Forma da aplicação

Single-page estático: sem router, sem servidor, sem SSR. O `App.tsx` compõe as
seções na ordem do design e a navegação é por âncora (`#inicio`, `#sobre`, …).
O build é um bundle estático servido por CDN/nginx; os dados vêm de uma API
externa do laboratório, consumida direto do browser.

Consequência prática: **não existe backend nosso**. Tudo que a aplicação sabe
está no bundle, incluindo as variáveis `VITE_*` — elas são públicas por
construção (ver [Segredos](#segredos)).

## Camadas

```
pages/  ──►  features/  ──►  components/ · lib/ · config/ · styles/
```

A seta é a **única** direção permitida. Uma camada importa das que estão à sua
direita, nunca à esquerda.

| Camada        | Contém                                                  | Não pode                                       |
| ------------- | ------------------------------------------------------- | ---------------------------------------------- |
| `pages/`      | Composição de tela. Puxa de `features/` e `components/` | —                                              |
| `features/`   | Um domínio coeso: componentes, tipos, chamadas de API   | Importar de outra feature, nem de `pages/`     |
| `components/` | UI reutilizável, agnóstica de domínio                   | Conhecer membros, publicações ou qualquer dado |
| `lib/`        | Infra compartilhada — hoje o client HTTP genérico       | Conhecer domínio                               |
| `config/`     | Configuração e validação (envs)                         | Conhecer domínio                               |
| `styles/`     | Design tokens, fonte de verdade do Tailwind             | Conhecer domínio                               |

### Isto é verificado, não confiado

As regras acima são impostas por [`src/architecture.test.ts`](./src/architecture.test.ts),
que varre os imports de `src/` e falha o build se a direção for violada. Ele
existe porque essas mesmas regras já estiveram escritas em prosa e **foram
violadas mesmo assim**: `lib/api.ts` importava de `features/members/types`,
e nenhum gate reclamou.

O teste virou o mecanismo porque o oxlint 1.x não implementa
`no-restricted-imports`. Se um dia implementar, a regra pode migrar para lá.

Para ver o teste falhando de propósito:

```ts
// em src/lib/api.ts
import type { Member } from '../features/members/types';
```

```
pnpm run test   # → lib/api.ts → features/members/types
```

## Anatomia de uma feature

Uma feature agrupa tudo que é próprio de um domínio:

```
features/members/
├── api.ts        # endpoints deste domínio, sobre o apiFetch de lib/
├── types.ts      # tipos do domínio, na forma que a UI consome
└── components/   # UI específica da feature
```

`lib/api.ts` expõe `apiFetch` e `ApiError` e **não conhece nenhum domínio**. Cada
feature monta seus endpoints em cima dele. Foi assim que a inversão citada acima
foi desfeita.

Quando algo em uma feature passa a servir a outra, ele **sobe** para
`components/` ou `lib/` — nunca vira import cruzado.

## Fluxo de dados

Não há gerenciador de estado nem camada de cache. Cada seção que precisa de
dados busca no `useEffect` e guarda em `useState` local. Para um site de
apresentação com um endpoint, isso é proporcional.

```
QuemSection ──► features/members/api.ts ──► lib/api.ts ──► fetch ──► API do lab
```

`apiFetch` faz `as T` no JSON: **não há validação de schema em runtime**. Se a
API mudar o contrato, o erro aparece como comportamento estranho na UI, não como
erro claro. É uma dívida consciente, aceitável enquanto o contrato não está
formalizado pelo time.

## Estilo

A fonte de verdade é [`src/styles/design-tokens.ts`](./src/styles/design-tokens.ts),
extraída do Figma. O `tailwind.config.ts` consome esse objeto, e o
[`src/index.css`](./src/index.css) o carrega via `@config`. Por isso as classes
utilitárias (`bg-accent`, `text-hero`, `font-mono`) refletem o design system.

Regra: **use as utilitárias derivadas dos tokens**, não valores mágicos. Onde o
design exige um valor fora da escala, ele aparece como arbitrary value do
Tailwind (`px-[26px]`) — sinal de que o token ainda não existe, não de licença
para hardcode.

## Segredos

Toda variável `VITE_*` é **embutida no bundle** servido ao browser. Nenhuma
delas é secreta na prática, por mais que esteja em `.env.local` e nos secrets
de CI.

Isso vale hoje para `VITE_MEMBER_FETCH_TOKEN`, enviado como header `X-API-KEY`:
**qualquer visitante consegue lê-lo** abrindo o bundle. É aceitável enquanto o
token dá acesso apenas à leitura pública de membros. Se algum dia der acesso a
mais que isso, a chamada precisa passar a sair de um proxy/BFF, não do browser.

As envs obrigatórias são validadas no boot por
[`src/config/env.ts`](./src/config/env.ts), com `REQUIRED_ENV_KEYS` como lista
canônica. Ao adicionar uma env obrigatória, registre-a em **três** lugares:

1. `REQUIRED_ENV_KEYS` em `src/config/env.ts`
2. `.env.template` (chave vazia)
3. `ImportMetaEnv` em `src/vite-env.d.ts`

Esquecer o item 3 não dá erro: o tipo cai no index signature do Vite e vira
`any` silenciosamente. Já aconteceu.

## Estrutura atual

```
src/
├── main.tsx              # entrada — valida envs e monta o React
├── App.tsx               # composição raiz das seções
├── index.css             # Tailwind + @config dos tokens
├── architecture.test.ts  # impõe as regras deste documento
├── components/           # UI agnóstica de domínio
├── features/             # módulos por domínio (hoje: members)
├── pages/                # seções da página única
├── lib/                  # client HTTP genérico
├── config/               # validação de env (+ testes)
└── styles/               # design tokens
```

## Convenções

- **Nome de arquivo:** kebab-case minúsculo (`section-header.tsx`).
- **Um componente por arquivo**, export default.
- **TypeScript:** `strict` ligado. Sem `any` gratuito; tipos explícitos nas
  fronteiras (props, retornos de funções de dados).
- **Testes:** nomes de `describe`/`it` em **inglês**. Comentários e documentação
  em **português**.
- **Comentários explicam _por que_**, não _o quê_. Referência de issue pertence
  ao commit e ao Linear, não ao arquivo.

## Divergências conhecidas

O que ainda não bate com o alvo descrito acima. Cada item é trabalho planejado,
não descuido esquecido:

| Divergência                                                                                    | Fase |
| ---------------------------------------------------------------------------------------------- | ---- |
| `pages/` guarda seções de uma página só, não páginas de rota — deveriam estar em `sections/`   | 3    |
| `QuemSection` busca dados inline; deveria consumir um hook da feature (`useMembers`)           | 3    |
| Nomes de arquivo ainda em PascalCase                                                           | 3    |
| Três implementações independentes do relógio de Salvador (`HomePage`, `LiveSection`, `Footer`) | 3    |
| Três listas de navegação (`NAV_ITEMS`, `MOBILE_ITEMS` no Header; `NAV_LINKS` no Footer)        | 3    |
| Export inconsistente: alguns componentes exportam default + nomeado                            | 4    |
| Menu mobile fecha com `translate-x-full` + `aria-hidden`, mas os links seguem focáveis por Tab | 4    |
| `noUncheckedIndexedAccess` desligado — custa 32 erros, quase todos no loop do `NetworkField`   | —    |
| Sem validação de schema em runtime nas respostas da API                                        | —    |
