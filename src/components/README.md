# `components/`

Componentes de UI **reutilizáveis e agnósticos de domínio** — não conhecem
regras de negócio nem features específicas. São os blocos de construção da
interface: botões, cards, badges, layout (header/footer), tipografia, etc.

Convenções:

- Um componente por pasta ou arquivo `PascalCase.tsx` (ex.: `Button.tsx`).
- Estilização com classes utilitárias do Tailwind + tokens do design system
  (ver [`src/styles/`](../styles)), nunca valores mágicos.
- Se um componente passa a depender de uma feature concreta (dados de membros,
  publicações, etc.), ele pertence a [`src/features/`](../features), não aqui.

> Placeholder de estrutura (ICO-51). Os componentes reais entram a partir do M2.
