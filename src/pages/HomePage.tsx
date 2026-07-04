import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Marquee from '../components/Marquee';

/**
 * Página Home (ICO-12) — seção de entrada do site do ICON, implementada a
 * partir do frame "início" do Figma (icon-site-v2).
 *
 * Composição:
 *   - Hero claro: rótulo do laboratório, título display ("ONDE O CÓDIGO VIRA
 *     ARTE."), subtítulo, parágrafo de apresentação e duas CTAs (Explorar /
 *     Ver ao vivo).
 *   - Barra técnica escura com metadados (coordenadas, relógio ao vivo, ano,
 *     projeto) e indicação de scroll.
 *   - Faixa marquee amarela com as áreas de pesquisa.
 *
 * O header/navegação global é responsabilidade de outra issue (Header, nav e
 * Footer), por isso não é implementado aqui.
 *
 * Nota de escala: o título usa um tamanho display responsivo (clamp), acima da
 * escala compacta dos tokens (`hero` = 70px, medida no frame de 1230px) — é a
 * decisão de "subir a escala em largura plena" já sinalizada em
 * docs/design-tokens.md.
 */

/** Áreas de pesquisa exibidas na faixa marquee. */
const RESEARCH_AREAS = [
  'Arte Computacional',
  'Inteligência Artificial',
  'Criatividade Computacional',
  'Interação Humano-Computador',
  'Ambientes Imersivos',
  'Jogos',
];

/** Coordenadas do laboratório (UFBA, Salvador–BA). */
const LAT_LONG = '13°0\'13.66"S 38°30\'34.03"W';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
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

interface HeroStatProps {
  label: string;
  children: React.ReactNode;
}

/** Célula de metadado da barra técnica escura. */
function HeroStat({ label, children }: HeroStatProps) {
  return (
    <div className="flex-1 border-l border-neutral-800 px-6 py-5 first:border-l-0 first:pl-0">
      <p className="font-mono text-[11px] tracking-wider text-neutral-600 uppercase">{label}</p>
      <p className="mt-1 font-mono text-[13px] text-neutral-100">{children}</p>
    </div>
  );
}

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-950">
      <section className="flex flex-1 flex-col justify-start lg:justify-center">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          {/* Rótulo do laboratório */}
          <p className="font-mono text-[13px] tracking-[0.18em] text-accent uppercase">
            // Laboratório de P&amp;D · UFBA · Salvador–BA
          </p>

          {/* Título display */}
          <h1 className="mt-8 font-sans text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.9] font-bold tracking-tight uppercase">
            <span className="block text-neutral-100">Onde o código vira</span>
            <span className="block text-accent">Arte.</span>
          </h1>

          {/* Subtítulo técnico */}
          <div className="mt-8 flex items-center gap-4 font-mono text-[13px] tracking-wide text-neutral-500 lowercase">
            <span>where code becomes art</span>
            <span className="text-neutral-400" aria-hidden="true">
              /
            </span>
            <span className="inline-block size-2.5 bg-accent" aria-hidden="true" />
          </div>

          {/* Apresentação */}
          <p className="mt-8 max-w-[520px] font-sans text-h4 text-neutral-500">
            Pesquisa, desenvolvimento e inovação em{' '}
            <strong className="font-semibold text-neutral-900">arte, ciência e tecnologia.</strong>{' '}
            Construindo novas interfaces e sistemas interativos.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Button variant="primary" href="#sobre">
              Explorar{' '}
              <span aria-hidden="true" className="text-base leading-none">
                ↓
              </span>
            </Button>
            <Button variant="secondary" href="#ao-vivo">
              Ver ao vivo{' '}
              <span aria-hidden="true" className="inline-block size-2 rounded-full bg-current" />
            </Button>
          </div>
        </div>
      </section>

      {/* Barra técnica */}
      <div className="border-t border-neutral-800 bg-neutral-950 text-neutral-100">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-stretch px-6 sm:px-10 lg:px-16">
          <HeroStat label="Lat / Long">{LAT_LONG}</HeroStat>
          <HeroStat label="Tempo">
            <LiveClock />
          </HeroStat>
          <HeroStat label="Est.">2019 · UFBA</HeroStat>
          <HeroStat label="Project">SITE_v2.0</HeroStat>
          <div className="flex items-center border-l border-neutral-800 px-6 py-5">
            <span className="font-mono text-[11px] tracking-wider text-neutral-500 uppercase">
              ↓ Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Faixa de áreas de pesquisa */}
      <Marquee
        items={RESEARCH_AREAS}
        className="bg-accent py-3 font-mono text-[13px] tracking-wider text-neutral-950 uppercase"
      />
    </div>
  );
}

export default HomePage;
