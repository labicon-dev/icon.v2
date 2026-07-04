import { useEffect, useState } from 'react';

/** Horário do laboratório (Salvador — UTC-3), atualizado a cada segundo. */
function useLabClock() {
  const [time, setTime] = useState(() => formatLabTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(formatLabTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function formatLabTime() {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Bahia',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
}

/** Cantoneiras da moldura de vídeo (marcas de canto do frame do Figma). */
function CornerMarks() {
  return (
    <span aria-hidden="true">
      <span className="absolute top-3 left-3 size-4 border-t border-l border-neutral-700" />
      <span className="absolute top-3 right-3 size-4 border-t border-r border-neutral-700" />
      <span className="absolute bottom-3 left-3 size-4 border-b border-l border-neutral-700" />
      <span className="absolute right-3 bottom-3 size-4 border-r border-b border-neutral-700" />
    </span>
  );
}

/**
 * Seção "Ao Vivo" (ICO-62) — seção `live` do frame do Figma: moldura de
 * vídeo com barra de status e placeholder do sinal da câmera. O feed real
 * entra na M3; por enquanto a moldura expõe apenas o slot visual.
 */
function LiveSection() {
  const time = useLabClock();

  return (
    <section
      id="live"
      aria-labelledby="live-titulo"
      className="mx-auto max-w-[970px] px-6 py-16 md:py-[96px]"
    >
      <header className="flex items-baseline justify-between gap-4">
        <h2 id="live-titulo" className="font-sans text-h1 font-bold text-neutral-50">
          <span className="mr-3 font-mono text-label font-medium text-accent">// 05</span>
          AO VIVO
        </h2>
        <span aria-hidden="true" className="font-mono text-label text-neutral-650 uppercase">
          / Live
        </span>
      </header>

      <p className="mt-8 max-w-[640px] font-sans text-body-lg text-neutral-500">
        Uma janela para dentro do laboratório, em tempo real.
      </p>

      <figure className="mt-12 border border-border bg-surface">
        <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
          <span className="flex items-center gap-2 font-mono text-label font-medium text-neutral-50 uppercase">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none"
            />
            Ao vivo · Live
          </span>
          <span className="font-mono text-label text-neutral-700 uppercase">
            ICON_LAB_CAM · UTC-3 · <time>{time}</time>
          </span>
        </figcaption>

        <div className="relative flex aspect-video items-center justify-center bg-background">
          <CornerMarks />
          <div className="px-6 text-center">
            <p className="font-mono text-label tracking-wide text-neutral-700 uppercase">
              [ Sinal da câmera do laboratório ]
            </p>
            <p className="mt-2 font-mono text-label-sm text-neutral-750">
              conecte o feed ao vivo aqui · <span lang="en">plug live feed here</span>
            </p>
          </div>
        </div>
      </figure>
    </section>
  );
}

export default LiveSection;
