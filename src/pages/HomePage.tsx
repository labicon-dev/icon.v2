import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import Marquee from '../components/Marquee';
import NetworkField from '../components/NetworkField';

/**
 * Página Home (ICO-12 + ICO-61) — seção de entrada do site, alinhada ao
 * protótipo do Claude Design (ICON.dc.html):
 *   - Fundo interativo de partículas (NetworkField) sob um gradiente radial.
 *   - Rótulo do laboratório, título display, linha typewriter com cursor,
 *     parágrafo de apresentação e CTAs.
 *   - Barra técnica fixada na base do hero (lat/long, relógio, ano, versão).
 *   - Faixa marquee amarela com as áreas de pesquisa.
 */

/** Áreas de pesquisa exibidas na faixa marquee. */
const RESEARCH_AREAS = [
  'Arte Computacional',
  'Inteligência Artificial',
  'Interação Humano-Computador',
  'Jogos',
  'Ambientes Imersivos',
  'Criatividade Computacional',
];

/** Coordenadas do laboratório (UFBA, Salvador–BA). */
const LAT_LONG = '13°0\'13.66"S 38°30\'34.03"W';

/** Frases do typewriter do hero (protótipo dc). */
const TYPED_PHRASES = [
  'rendering_interfaces',
  'training_models',
  'sketching_worlds',
  'weaving_pixels',
  'arte ∩ ciência',
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Bahia',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/** Relógio ao vivo (campo "TEMPO" da barra técnica), atualizado a cada segundo. */
function LiveClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time dateTime={now.toISOString()} className="text-accent">
      {formatTime(now)}
    </time>
  );
}

/** Efeito typewriter cíclico do hero; estático sob prefers-reduced-motion. */
function useTypewriter(phrases: readonly string[]) {
  const [typed, setTyped] = useState('');
  const stateRef = useRef({ phrase: 0, chars: 0, dir: 1 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(phrases[0]);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = stateRef.current;
      const word = phrases[s.phrase];
      s.chars += s.dir;
      setTyped(word.slice(0, s.chars));
      let delay = s.dir > 0 ? 70 : 36;
      if (s.chars === word.length) {
        s.dir = -1;
        delay = 1500;
      } else if (s.chars === 0) {
        s.dir = 1;
        s.phrase = (s.phrase + 1) % phrases.length;
        delay = 280;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases]);

  return typed;
}

interface HeroStatProps {
  label: string;
  first?: boolean;
  children: React.ReactNode;
}

/** Célula de metadado da barra técnica do hero. */
function HeroStat({ label, first = false, children }: HeroStatProps) {
  return (
    <div className={`border-r border-border py-4 ${first ? 'pr-4' : 'px-5'}`}>
      <p className="font-mono text-caption text-neutral-700 uppercase">{label}</p>
      <p className="mt-1 font-mono text-body-sm text-neutral-50">{children}</p>
    </div>
  );
}

export function HomePage() {
  const typed = useTypewriter(TYPED_PHRASES);

  return (
    <div id="inicio" className="flex flex-col bg-background text-neutral-50">
      <section
        aria-label="Apresentação"
        className="relative flex min-h-[calc(100vh-64px)] flex-col justify-center overflow-hidden pt-10 pb-[230px] sm:pb-[130px]"
      >
        {/* Fundo interativo (ICO-61) + gradiente de legibilidade */}
        <div className="absolute inset-0 z-0">
          <NetworkField />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-[radial-gradient(120%_90%_at_18%_50%,rgba(4,2,5,0.86)_0%,rgba(4,2,5,0.5)_45%,rgba(4,2,5,0.15)_80%)]"
        />

        <div className="relative z-[2] mx-auto w-full max-w-[1320px] px-7.5">
          <p className="font-mono text-label tracking-[0.14em] text-accent uppercase">
            {'//'} Laboratório de P&D · UFBA · Salvador—BA
          </p>

          <h1 className="mt-6 max-w-[14ch] font-sans text-hero font-bold uppercase">
            Onde o código vira <span className="text-accent">Arte.</span>
          </h1>

          <div className="mt-7.5 flex flex-wrap items-center gap-x-5 gap-y-3.5 font-mono text-body-sm">
            <span className="tracking-wide text-neutral-500 lowercase">where code becomes art</span>
            <span className="text-neutral-800" aria-hidden="true">
              /
            </span>
            <span className="text-neutral-50">
              &gt; {typed}
              <span
                aria-hidden="true"
                className="cursor-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent"
              />
            </span>
          </div>

          <p className="mt-7.5 max-w-[560px] font-sans text-lead text-neutral-300">
            Pesquisa, desenvolvimento e inovação em{' '}
            <span className="text-neutral-50">arte, ciência e tecnologia</span> — construindo novas
            interfaces e sistemas interativos.
          </p>

          <div className="mt-10 flex flex-wrap gap-3.5">
            <Button variant="primary" href="#sobre">
              Explorar <span aria-hidden="true">↓</span>
            </Button>
            <Button variant="secondary" href="#live">
              Ver ao vivo{' '}
              <span aria-hidden="true" className="inline-block size-2 rounded-full bg-current" />
            </Button>
          </div>
        </div>

        {/* Barra técnica na base do hero */}
        <div className="absolute right-0 bottom-0 left-0 z-[2] border-t border-border bg-background/55 backdrop-blur-sm">
          <div className="mx-auto grid w-full max-w-[1320px] grid-cols-2 items-center px-7.5 sm:grid-cols-[repeat(4,1fr)_auto]">
            <HeroStat label="Lat / Long" first>
              {LAT_LONG}
            </HeroStat>
            <HeroStat label="Tempo">
              <LiveClock />
            </HeroStat>
            <HeroStat label="Est.">2019 · UFBA</HeroStat>
            <HeroStat label="Versão">SITE_v2.0</HeroStat>
            <div className="hidden items-center gap-2 py-4 pl-5 font-mono text-label-sm text-neutral-700 uppercase sm:flex">
              <span aria-hidden="true" className="text-accent">
                ↓
              </span>
              Scroll
            </div>
          </div>
        </div>
      </section>

      {/* Faixa de áreas de pesquisa */}
      <Marquee
        items={RESEARCH_AREAS.map((a) => a.toUpperCase())}
        durationSeconds={26}
        className="border-y border-background bg-accent py-2.5 font-mono text-label font-medium tracking-[0.14em] text-background uppercase"
      />
    </div>
  );
}

export default HomePage;
