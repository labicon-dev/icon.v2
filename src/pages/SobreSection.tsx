const TRIAD = [
  { letter: 'A', label: 'ARTE', translation: 'ART' },
  { letter: 'C', label: 'CIÊNCIA', translation: 'SCIENCE' },
  { letter: 'E', label: 'EDUCAÇÃO', translation: 'EDUCATION' },
] as const;

const WHAT_WE_DO = [
  'Pesquisa & Inovação tecnológica',
  'Desenvolvimento de Novas Interfaces',
  'Diálogo entre arte e tecnologia',
  'Formação e extensão na comunidade',
] as const;

/**
 * Seção "Sobre o ICON" (ICO-13) — seção `sobre` do frame do Figma:
 * apresentação do laboratório, tripé A/C/E e lista "O que fazemos".
 */
function SobreSection() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="mx-auto max-w-[970px] px-6 py-16 md:py-[96px]"
    >
      <header className="flex items-baseline justify-between gap-4">
        <h2 id="sobre-titulo" className="font-sans text-h1 font-bold text-neutral-50">
          <span className="mr-3 font-mono text-label font-medium text-accent">// 02</span>
          SOBRE O ICON
        </h2>
        <span aria-hidden="true" className="font-mono text-label text-neutral-650 uppercase">
          / About
        </span>
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
        <div>
          <p className="font-sans text-h4 text-neutral-50">
            Um laboratório de <span className="text-accent">creative coding</span> na fronteira
            entre arte, ciência e tecnologia.
          </p>

          <p className="mt-6 font-sans text-body text-neutral-500">
            O ICON é um Laboratório de Pesquisa, Desenvolvimento e Inovação em Interatividade,
            Computação e Novas Interfaces, sediado no Instituto de Humanidades, Artes e Ciências
            Prof. Milton Santos (IHAC) da Universidade Federal da Bahia (UFBA).
          </p>

          <p className="mt-4 font-sans text-body text-neutral-500">
            Investigamos a aplicação de técnicas computacionais à criação artística, à pesquisa
            científica e à educação — com foco em novas interfaces e sistemas interativos que
            envolvem inteligência artificial.{' '}
            <span lang="en" className="text-neutral-700">
              We build interactive systems where art, science and technology meet.
            </span>
          </p>
        </div>

        <div>
          <p className="font-mono text-label tracking-wide text-neutral-650 uppercase">
            O tripé / The triad
          </p>

          <ul className="mt-4 grid grid-cols-3 gap-2.5">
            {TRIAD.map(({ letter, label, translation }) => (
              <li
                key={letter}
                className="border border-border bg-surface px-4 py-5 transition-colors duration-300 hover:border-border-muted"
              >
                <span aria-hidden="true" className="font-sans text-h3 font-bold text-accent">
                  {letter}
                </span>
                <p className="mt-3 font-mono text-label font-medium text-neutral-50 uppercase">
                  {label}
                </p>
                <p className="mt-1 font-mono text-label-sm text-neutral-700 uppercase" lang="en">
                  {translation}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border border-border bg-surface px-5 py-5">
            <p className="font-mono text-label tracking-wide text-neutral-650 uppercase">
              // O que fazemos
            </p>
            <ol className="mt-4 flex flex-col gap-3">
              {WHAT_WE_DO.map((item, index) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="font-mono text-label font-medium text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-body text-neutral-200">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreSection;
