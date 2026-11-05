import { useRef } from 'react';

import Logo from '../components/logo';
import Reveal from '../components/reveal';
import SectionHeader from '../components/section-header';
import useHlsStream, { type StreamStatus } from '../hooks/use-hls-stream';
import { LIVE_STREAM_PATH, cdnUrl } from '../lib/cdn';
import { useLabClock } from '../lib/lab-clock';

/** Texto no centro da moldura enquanto o vídeo não está tocando. */
const PLACEHOLDER: Record<Exclude<StreamStatus, 'live' | 'blocked'>, [string, string]> = {
  idle: ['[ Sinal da câmera do laboratório ]', 'live feed'],
  loading: ['[ Conectando à câmera… ]', 'connecting to camera'],
  offline: ['[ Câmera fora do ar ]', 'tentando reconectar · retrying'],
};

function LiveSection() {
  const { label: time } = useLabClock();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { status, resume } = useHlsStream(videoRef, cdnUrl(LIVE_STREAM_PATH));
  const isLive = status === 'live';
  const isOffline = status === 'offline';

  return (
    <section
      id="live"
      aria-labelledby="live-titulo"
      className="border-b border-border px-5 py-20 md:px-7.5 md:py-30"
    >
      <div className="mx-auto max-w-330">
        <Reveal>
          <SectionHeader index="05" title="AO VIVO" label="/ Live" headingId="live-titulo" />
        </Reveal>

        <Reveal>
          <p className="mt-4 mb-10 max-w-155 font-sans text-body-lg text-neutral-500">
            Uma janela para dentro do laboratório, em tempo real.
          </p>
        </Reveal>

        <Reveal>
          <figure className="overflow-hidden rounded border border-border bg-surface">
            {/* No mobile os dois blocos não cabem na mesma linha e quebravam
                no meio ("AO VIVO · / LIVE"); empilhados, cada um fica inteiro. */}
            <figcaption className="flex flex-col items-start gap-1.5 border-b border-border px-5 py-3.5 font-mono text-label tracking-wide sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="flex items-center gap-2.5 whitespace-nowrap text-neutral-50 uppercase">
                <span
                  aria-hidden="true"
                  className={`inline-block size-2 rounded-full ${
                    isOffline
                      ? 'bg-neutral-750'
                      : 'animate-pulse bg-signal motion-reduce:animate-none'
                  }`}
                />{' '}
                {isOffline ? 'Offline' : 'Ao vivo · Live'}{' '}
              </span>
              <span className="whitespace-nowrap text-neutral-700 uppercase">
                ICON_LAB_CAM · UTC-3 · <time className="text-accent">{time}</time>
              </span>
            </figcaption>

            {/* A câmera é 4:3. No mobile a moldura segue a câmera para o vídeo
                ocupar a largura toda; no desktop a moldura larga do Figma fica,
                com o vídeo centralizado. */}
            <div className="relative flex aspect-4/3 items-center justify-center bg-background md:aspect-16/7">
              {/* Sem áudio: autoplay com som é bloqueado pelos navegadores, e
                  som inesperado ao rolar a página seria pior. */}
              <video
                ref={videoRef}
                muted
                playsInline
                autoPlay
                aria-label="Transmissão ao vivo da câmera do laboratório"
                className={`absolute inset-0 size-full object-contain transition-opacity duration-500 ${
                  isLive ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div
                aria-hidden="true"
                className="live-scanlines pointer-events-none absolute inset-0"
              />

              {status === 'blocked' ? (
                <button
                  type="button"
                  onClick={resume}
                  className="relative rounded border border-border-muted px-5 py-3 font-mono text-label tracking-[0.18em] text-neutral-50 uppercase transition-colors hover:border-border-accent hover:text-accent"
                >
                  ▶ Assistir ao vivo
                </button>
              ) : (
                !isLive && (
                  <output className="relative block px-6 text-center">
                    <span className="block font-mono text-label tracking-[0.18em] text-neutral-750 uppercase">
                      {PLACEHOLDER[status][0]}
                    </span>
                    <span className="mt-2 block font-mono text-label-sm text-neutral-800">
                      {PLACEHOLDER[status][1]}
                    </span>
                  </output>
                )
              )}

              {/* No mobile o vídeo encosta nas bordas e o REC cobriria o carimbo
                  de data que a própria câmera grava no canto. */}
              {isLive && (
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4.5 hidden font-mono text-label-sm tracking-wide text-signal md:block"
                >
                  ● REC
                </span>
              )}
              <Logo className="absolute top-3.5 right-4.5 opacity-50" />
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
