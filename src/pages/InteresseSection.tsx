import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

interface Field {
  code: string;
  title: string;
  translation: string;
  description: string;
}

const FIELDS: Field[] = [
  {
    code: 'A_01',
    title: 'Arte Computacional',
    translation: 'Computational Art',
    description: 'Obras e experiências artísticas mediadas por código, dados e algoritmos.',
  },
  {
    code: 'A_02',
    title: 'Inteligência Artificial',
    translation: 'Artificial Intelligence',
    description: 'Modelos de IA aplicados à criação, à percepção e à interação humano-máquina.',
  },
  {
    code: 'A_03',
    title: 'Criatividade Computacional',
    translation: 'Computational Creativity',
    description: 'Sistemas que geram, exploram e avaliam ideias e formas inéditas.',
  },
  {
    code: 'A_04',
    title: 'Interação Humano-Computador',
    translation: 'Human-Computer Interaction',
    description: 'Novas interfaces e formas de interação entre pessoas e máquinas.',
  },
  {
    code: 'A_05',
    title: 'Jogos',
    translation: 'Games',
    description: 'Jogos como linguagem, experimento e plataforma de pesquisa.',
  },
  {
    code: 'A_06',
    title: 'Ambientes Imersivos',
    translation: 'Immersive Environments',
    description: 'Realidade aumentada, virtual e instalações interativas.',
  },
];

/**
 * Seção "Áreas de Interesse" (ICO-15) — cards A_01–A_06 na escala do
 * protótipo do design, com hover (borda/código accent, seta ↗ deslizando,
 * fundo levemente elevado e translateY).
 */
function InteresseSection() {
  return (
    <section
      id="interesse"
      aria-labelledby="interesse-titulo"
      className="border-b border-border px-5 py-20 md:px-7.5 md:py-30"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <SectionHeader
            index="03"
            title="ÁREAS DE INTERESSE"
            label="/ Fields"
            headingId="interesse-titulo"
          />
        </Reveal>

        <Reveal>
          <p className="mt-4 mb-12 max-w-[620px] font-sans text-body-lg text-neutral-500">
            Trabalho inter e transdisciplinar a partir da Ciência da Computação, Artes Visuais,
            Música, Psicologia, Biologia e Eletrônica.
          </p>
        </Reveal>

        <Reveal>
          <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map(({ code, title, translation, description }) => (
              <li
                key={code}
                className="group flex min-h-[230px] flex-col rounded border border-border bg-surface px-6 py-7.5 transition-all duration-300 hover:-translate-y-[3px] hover:border-border-accent hover:bg-[#0c0a0f] motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="font-mono text-label text-neutral-750 uppercase transition-colors duration-300 group-hover:text-accent"
                  >
                    {code}
                  </span>
                  <span
                    aria-hidden="true"
                    className="-translate-x-1.5 translate-y-1.5 font-sans text-lead text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="font-sans text-h3 font-bold text-neutral-50">{title}</h3>
                  <p
                    lang="en"
                    className="mt-1.5 mb-3.5 font-mono text-label-sm tracking-wide text-neutral-700 uppercase"
                  >
                    {translation}
                  </p>
                  <p className="font-sans text-body text-neutral-500">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default InteresseSection;
