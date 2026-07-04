# `pages/`

Componentes de **página/rota** — a camada mais externa da UI, que compõe
features e componentes numa tela completa. Cada página é o ponto de entrada de
uma rota (ou, no site single-page atual, de uma seção de nível superior).

Convenções:

- Uma página por arquivo `PascalCase.tsx` (ex.: `HomePage.tsx`).
- Páginas **compõem**, não implementam regra de negócio: puxam de
  [`src/features/`](../features) e [`src/components/`](../components).
- Mantêm o mínimo de estado próprio — preferir hooks das features.

> Placeholder de estrutura (ICO-51). As páginas reais entram no M2.
