<!--
  Título do PR: siga Conventional Commits — ex.: feat(header): implementa navegação
  O workflow "PR Title" valida o formato do título automaticamente.
-->

## Contexto

Resolves ICO-XXX

<!-- Link da issue no Linear e um resumo de 1–2 linhas do problema/objetivo. -->

## O que mudou

<!-- Descreva as mudanças em bullets objetivos. -->

-

## Decisões-chave

<!-- Trade-offs, alternativas descartadas, pontos que o revisor deve olhar com atenção.
     Se não houver, escreva "N/A". -->

-

## Como testar

<!-- Passo a passo para o revisor validar localmente. -->

```bash
pnpm install
pnpm run dev
```

-

## Checklist de merge

- [ ] O título do PR segue Conventional Commits (`tipo(escopo): descrição`)
- [ ] `pnpm run lint`, `pnpm run format:check` e `pnpm run build` passam localmente
- [ ] Segui as convenções do [`AGENTS.md`](../AGENTS.md) e da estrutura de pastas do [`README`](../README.md)
- [ ] Nenhum segredo/valor sensível foi commitado (apenas `.env.template` com chaves vazias)
- [ ] A issue correspondente no Linear está referenciada (`Resolves ICO-XXX`)

> ⚠️ **Revisão humana obrigatória (ICO-xxx).** Código gerado por agentes de IA
> **não** é mergeado sem revisão humana. O status check `human-approval` só passa
> após aprovação explícita de um mantenedor.
