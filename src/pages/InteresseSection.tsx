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
    description: 'Modelos de IA aplicados à criação, percepção e interação humano-máquina.',
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
 * Seção "Áreas de Interesses" (ICO-15) — seção `interesse` do frame do
 * Figma: as linhas de pesquisa do laboratório em cards A_01–A_06. Estados
 * de hover conforme a camada SPECS do design (borda e código em accent,
 * seta ↗ no canto).
 */
function InteresseSection() {
  return (
    <section
      id="interesse"
      aria-labelledby="interesse-titulo"
      className="mx-auto max-w-[970px] px-6 py-16 md:py-[96px]"
    >
      <header className="flex items-baseline justify-between gap-4">
        <h2 id="interesse-titulo" className="font-sans text-h1 font-bold text-neutral-50">
          <span className="mr-3 font-mono text-label font-medium text-accent">// 03</span>
          ÁREAS DE INTERESSES
        </h2>
        <span aria-hidden="true" className="font-mono text-label text-neutral-650 uppercase">
          / Fields
        </span>
      </header>

      <p className="mt-8 max-w-[640px] font-sans text-body-lg text-neutral-500">
        Trabalho interdisciplinar e transdisciplinar da Ciência da Computação, Artes Visuais,
        Música, Psicologia, Biologia e Eletrônica.
      </p>

      <ul className="mt-12 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {FIELDS.map(({ code, title, translation, description }) => (
          <li
            key={code}
            className="group relative border border-border bg-surface px-5 py-6 transition-colors duration-300 hover:border-border-accent"
          >
            <span
              aria-hidden="true"
              className="font-mono text-label text-neutral-750 uppercase transition-colors duration-300 group-hover:text-accent"
            >
              {code}
            </span>
            <span
              aria-hidden="true"
              className="absolute top-5 right-5 font-sans text-body-lg text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              ↗
            </span>

            <h3 className="mt-6 font-sans text-h5 font-bold text-neutral-50">{title}</h3>
            <p
              lang="en"
              className="mt-1 font-mono text-label-sm tracking-wide text-neutral-700 uppercase"
            >
              {translation}
            </p>
            <p className="mt-4 font-sans text-body-sm text-neutral-500">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InteresseSection;
