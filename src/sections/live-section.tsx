import Logo from '../components/logo';
import Reveal from '../components/reveal';
import SectionHeader from '../components/section-header';
import { useLabClock } from '../lib/lab-clock';

/**
 * ⚠️ A moldura é um STUB: não há stream. O relógio ao vivo e a marca "● REC"
 * reforçam a impressão de que o feed está no ar. Ver `PRD.md`.
 */
function LiveSection() {
  const { label: time } = useLabClock();

  return (
    <section
      id="live"
      aria-labelledby="live-titulo"
      className="border-b border-border px-5 py-20 md:px-7.5 md:py-30"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <SectionHeader index="05" title="AO VIVO" label="/ Live" headingId="live-titulo" />
        </Reveal>

        <Reveal>
          <p className="mt-4 mb-10 max-w-[620px] font-sans text-body-lg text-neutral-500">
            Uma janela para dentro do laboratório, em tempo real.
          </p>
        </Reveal>

        <Reveal>
          <figure className="overflow-hidden rounded border border-border bg-surface">
            <figcaption className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 font-mono text-label tracking-wide">
              <span className="flex items-center gap-2.5 text-neutral-50 uppercase">
                <span
                  aria-hidden="true"
                  className="inline-block size-2 animate-pulse rounded-full bg-signal motion-reduce:animate-none"
                />
                Ao vivo · Live
              </span>
              <span className="text-neutral-700 uppercase">
                ICON_LAB_CAM · UTC-3 · <time className="text-accent">{time}</time>
              </span>
            </figcaption>

            <div className="live-scanlines relative flex aspect-video items-center justify-center bg-background md:aspect-[16/7]">
              <div className="px-6 text-center">
                <p className="font-mono text-label tracking-[0.18em] text-neutral-750 uppercase">
                  [ Sinal da câmera do laboratório ]
                </p>
                <p className="mt-2 font-mono text-label-sm text-neutral-800">
                  conecte o feed ao vivo aqui · <span lang="en">plug live feed here</span>
                </p>
              </div>

              <span
                aria-hidden="true"
                className="absolute top-4 left-[18px] font-mono text-label-sm tracking-wide text-signal"
              >
                ● REC
              </span>
              <Logo idPrefix="live-logo" className="absolute top-3.5 right-[18px] opacity-50" />
              <span
                aria-hidden="true"
                className="absolute bottom-3.5 left-4 size-4 border-b-[1.5px] border-l-[1.5px] border-border-muted"
              />
              <span
                aria-hidden="true"
                className="absolute right-4 bottom-3.5 size-4 border-r-[1.5px] border-b-[1.5px] border-border-muted"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

export default LiveSection;
