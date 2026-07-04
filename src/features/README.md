# `features/`

Módulos organizados **por feature/domínio** (ex.: `members/`, `publications/`,
`projects/`). Cada feature agrupa tudo o que é próprio dela — componentes,
hooks, chamadas de API e tipos — de forma coesa e isolada das demais.

Estrutura sugerida de uma feature:

```
features/
└── members/
    ├── components/   # UI específica da feature
    ├── hooks/        # hooks de dados/estado da feature
    ├── api.ts        # chamadas à API desta feature (usa src/lib/api)
    └── types.ts      # tipos do domínio
```

Convenções:

- Uma feature **não** importa de outra feature. O que for compartilhado sobe
  para [`src/components/`](../components) ou [`src/lib/`](../lib).
- O client HTTP base fica em [`src/lib/api.ts`](../lib/api.ts); a `api.ts` de
  cada feature só monta os endpoints daquele domínio em cima dele.

> Placeholder de estrutura (ICO-51). As features reais (membros, publicações,
> projetos) entram a partir do M2/M3.
