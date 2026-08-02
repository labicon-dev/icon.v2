interface SectionHeaderProps {
  /** Número da seção no design (ex.: "02"). */
  index: string;
  title: string;
  /** Rótulo à direita (ex.: "/ About"). */
  label: string;
  /** id do heading, referenciado pelo aria-labelledby da seção. */
  headingId: string;
  /** Cores invertidas para a seção amarela (Contato). */
  onAccent?: boolean;
}

/**
 * Cabeçalho padrão de seção do design: "// 0X" em mono + título grande +
 * rótulo bilíngue alinhado à direita.
 */
function SectionHeader({ index, title, label, headingId, onAccent = false }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-4">
      <span
        aria-hidden="true"
        className={`font-mono text-label ${onAccent ? 'text-onAccent-muted' : 'text-accent'}`}
      >
        {'//'} {index}
      </span>
      <h2
        id={headingId}
        className={`font-sans text-h1 font-bold whitespace-nowrap ${
          onAccent ? 'text-onAccent-strong' : 'text-neutral-50'
        }`}
      >
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={`ml-auto font-mono text-label uppercase ${
          onAccent ? 'text-onAccent-muted' : 'text-neutral-700'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default SectionHeader;
