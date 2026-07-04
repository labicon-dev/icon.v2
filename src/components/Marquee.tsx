import type { ReactNode } from 'react';

/**
 * Faixa marquee (ICO-12) — texto em rolagem horizontal contínua, como a faixa
 * amarela das áreas de pesquisa na Home do Figma.
 *
 * A sequência de itens é renderizada duas vezes lado a lado; a animação
 * `marquee` (definida em `src/index.css`) desloca o trilho em -50%, criando um
 * loop sem emenda. A duração é configurável via a custom property
 * `--marquee-duration`. Respeita `prefers-reduced-motion` (ver o CSS).
 */
interface MarqueeProps {
  items: string[];
  separator?: ReactNode;
  /** Duração de um ciclo completo, em segundos. */
  durationSeconds?: number;
  className?: string;
}

export function Marquee({
  items,
  separator = '✦',
  durationSeconds = 30,
  className = '',
}: MarqueeProps) {
  const sequence = items.map((item, i) => (
    <span key={i} className="flex items-center">
      <span className="px-4">{item}</span>
      <span aria-hidden="true" className="opacity-60">
        {separator}
      </span>
    </span>
  ));

  return (
    <div className={`flex overflow-hidden ${className}`.trim()} aria-label={items.join(', ')}>
      <div
        className="marquee-track flex w-max shrink-0"
        style={{ '--marquee-duration': `${durationSeconds}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0" aria-hidden="true">
          {sequence}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {sequence}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
