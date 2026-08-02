import type { ReactNode } from 'react';

interface MarqueeProps {
  items: string[];
  separator?: ReactNode;
  durationSeconds?: number;
  className?: string;
}

function Marquee({
  items,
  separator = '✦',
  durationSeconds = 30,
  className = '',
}: Readonly<MarqueeProps>) {
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
