import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

const TRIAD = [
  { letter: 'A', label: 'ARTE', translation: 'ART' },
  { letter: 'C', label: 'CIÊNCIA', translation: 'SCIENCE' },
  { letter: 'E', label: 'EDUCAÇÃO', translation: 'EDUCATION' },
] as const;

const WHAT_WE_DO = [
  'Pesquisa & inovação tecnológica',
  'Desenvolvimento de novas interfaces',
  'Diálogo entre arte e tecnologia',
  'Formação e extensão na comunidade',
] as const;

/**
 * Seção "Sobre o ICON" (ICO-13) — apresentação do laboratório, tripé A/C/E
 * e lista "O que fazemos", na escala do protótipo do design.
 */
function SobreSection() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="border-b border-border px-5 py-20 md:px-7.5 md:py-30"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-14">
          <SectionHeader index="02" title="SOBRE O ICON" label="/ About" headingId="sobre-titulo" />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal>
            <p className="font-sans text-h4 font-medium text-neutral-50">
              Um laboratório de <span className="text-accent">creative coding</span> na fronteira
              entre arte, ciência e tecnologia.
            </p>

            <p className="mt-7 font-sans text-body-lg text-neutral-400">
              O ICON é um Laboratório de Pesquisa, Desenvolvimento e Inovação em Interatividade,
              Computação e Novas Interfaces, sediado no Instituto de Humanidades, Artes e Ciências
              Prof. Milton Santos (IHAC) da Universidade Federal da Bahia (UFBA).
            </p>

            <p className="mt-5 font-sans text-body-lg text-neutral-400">
              Investigamos a aplicação de técnicas computacionais à criação artística, à pesquisa
              científica e à educação — com foco em novas interfaces e sistemas interativos que
              envolvem inteligência artificial.{' '}
              <span lang="en" className="text-neutral-650">
                We build interactive systems where art, science and technology meet.
              </span>
            </p>
          </Reveal>

          <Reveal>
            <p className="font-mono text-label-sm tracking-wider text-neutral-700 uppercase">
              O tripé / The triad
            </p>

            <ul className="mt-3.5 grid grid-cols-3 gap-3">
              {TRIAD.map(({ letter, label, translation }) => (
                <li key={letter} className="rounded border border-border bg-surface px-4 py-[22px]">
                  <span
                    aria-hidden="true"
                    className="font-sans text-[30px] leading-none font-bold text-accent"
                  >
                    {letter}
                  </span>
                  <p className="mt-2 font-sans text-body text-neutral-50">{label}</p>
                  <p className="mt-1 font-mono text-micro text-neutral-700 uppercase" lang="en">
                    {translation}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-3.5 rounded border border-border bg-surface p-[22px]">
              <p className="font-mono text-label-sm tracking-wider text-neutral-700 uppercase">
                {'//'} O que fazemos
              </p>
              <ol className="mt-4 flex flex-col gap-3">
                {WHAT_WE_DO.map((item, index) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="font-mono text-body-sm text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-body text-neutral-200">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default SobreSection;
