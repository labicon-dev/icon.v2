import { useCallback, useEffect, useState, type RefObject } from 'react';
import type Hls from 'hls.js';

/**
 * - `idle`: o player ainda não chegou perto da tela, nada foi baixado.
 * - `loading`: conectando ao stream.
 * - `live`: o vídeo está tocando.
 * - `blocked`: o navegador recusou o autoplay (ex.: iOS em modo de economia);
 *   precisa de um toque do visitante.
 * - `offline`: o stream não respondeu; uma nova tentativa já está agendada.
 */
export type StreamStatus = 'idle' | 'loading' | 'live' | 'blocked' | 'offline';

const RETRY_DELAY_MS = 20_000;
const HLS_MIME = 'application/vnd.apple.mpegurl';

/**
 * Toca uma playlist HLS no `<video>` do `videoRef`.
 *
 * Só começa quando o vídeo se aproxima da viewport: o stream consome banda
 * contínua (~630 kbps) e o `hls.js` pesa ~160 KB gzip, então quem não rola até
 * o "Ao Vivo" não paga por nenhum dos dois.
 */
function useHlsStream(videoRef: RefObject<HTMLVideoElement | null>, src: string) {
  const [status, setStatus] = useState<StreamStatus>('idle');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let disposed = false;
    let hls: Hls | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const play = () => {
      video.play().catch(() => {
        if (!disposed) setStatus('blocked');
      });
    };

    const fail = () => {
      if (disposed) return;
      hls?.destroy();
      hls = null;
      setStatus('offline');
      clearTimeout(retryTimer);
      retryTimer = setTimeout(() => void start(), RETRY_DELAY_MS);
    };

    const start = async () => {
      if (disposed) return;
      // Durante uma nova tentativa a tela continua dizendo "fora do ar", em vez
      // de piscar "conectando" a cada 20 s.
      setStatus((current) => (current === 'offline' ? current : 'loading'));

      const { default: HlsLib } = await import('hls.js');
      if (disposed) return;

      // O `hls.js` vem primeiro mesmo quando o navegador diz tocar HLS nativo:
      // o Chromium responde "maybe" ao `canPlayType`, mas não consegue ler esta
      // playlist (v9, áudio em grupo separado). O nativo fica para quem não tem
      // MSE, como iPhones antigos.
      if (!HlsLib.isSupported()) {
        if (video.canPlayType(HLS_MIME)) {
          video.src = src;
          play();
        } else {
          setStatus('offline');
        }
        return;
      }

      const instance = new HlsLib({ lowLatencyMode: true, backBufferLength: 30 });
      hls = instance;
      instance.on(HlsLib.Events.MANIFEST_PARSED, play);
      instance.on(HlsLib.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === HlsLib.ErrorTypes.MEDIA_ERROR) {
          instance.recoverMediaError();
          return;
        }
        fail();
      });
      instance.loadSource(src);
      instance.attachMedia(video);
    };

    const onPlaying = () => setStatus('live');
    video.addEventListener('playing', onPlaying);
    // Erros e fim do stream no player nativo (no hls.js chegam pelo evento ERROR).
    video.addEventListener('error', fail);
    video.addEventListener('ended', fail);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void start();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(video);

    return () => {
      disposed = true;
      observer.disconnect();
      clearTimeout(retryTimer);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', fail);
      video.removeEventListener('ended', fail);
      hls?.destroy();
      video.removeAttribute('src');
      video.load();
    };
  }, [videoRef, src]);

  /** Para o estado `blocked`: o toque do visitante libera o autoplay. */
  const resume = useCallback(() => {
    videoRef.current?.play().catch(() => undefined);
  }, [videoRef]);

  return { status, resume };
}

export default useHlsStream;
