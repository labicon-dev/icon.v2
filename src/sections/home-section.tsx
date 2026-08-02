import Button from '../components/button';
import Marquee from '../components/marquee';
import NetworkField from '../components/network-field';
import LiveClock from '../components/live-clock';
import useTypewriter from '../hooks/use-typewriter';
import type { HeroStatProps } from '../types/home';

const RESEARCH_AREAS = [
  'Arte Computacional',
  'Inteligência Artificial',
  'Interação Humano-Computador',
  'Jogos',
  'Ambientes Imersivos',
  'Criatividade Computacional',
];

const LAT_LONG = '13°0\'13.66"S 38°30\'34.03"W';

const TYPED_PHRASES = [
  'rendering_interfaces',
  'training_models',
  'sketching_worlds',
  'weaving_pixels',
  'arte ∩ ciência',
];

function HeroStat({ label, first = false, children }: Readonly<HeroStatProps>) {
  return (
    <div className={`border-r border-border py-4 ${first ? 'pr-4' : 'px-5'}`}>
      <p className="font-mono text-caption text-neutral-700 uppercase">{label}</p>
      <p className="mt-1 font-mono text-body-sm text-neutral-50">{children}</p>
    </div>
  );
}

function HomeSection() {
  const typed = useTypewriter(TYPED_PHRASES);

  return (
    <div id="inicio" className="flex flex-col bg-background text-neutral-50">
      <section
        aria-label="Apresentação"
        className="relative flex min-h-[calc(100vh-64px)] flex-col justify-center overflow-hidden pt-10 pb-57.5 sm:pb-32.5"
      >
        <div className="absolute inset-0 z-0">
          <NetworkField />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-1 bg-[radial-gradient(120%_90%_at_18%_50%,rgba(4,2,5,0.86)_0%,rgba(4,2,5,0.5)_45%,rgba(4,2,5,0.15)_80%)]"
        />

        <div className="relative z-2 mx-auto w-full max-w-330 px-7.5">
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

          <p className="mt-7.5 max-w-140 font-sans text-lead text-neutral-300">
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

        <div className="absolute right-0 bottom-0 left-0 z-2 border-t border-border bg-background/55 backdrop-blur-sm">
          <div className="mx-auto grid w-full max-w-330 grid-cols-2 items-center px-7.5 sm:grid-cols-[repeat(4,1fr)_auto]">
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
                {' '}
                ↓{' '}
              </span>
              <span>Scroll</span>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={RESEARCH_AREAS.map((a) => a.toUpperCase())}
        durationSeconds={26}
        className="border-y border-background bg-accent py-2.5 font-mono text-label font-medium tracking-[0.14em] text-background uppercase"
      />
    </div>
  );
}

export default HomeSection;
