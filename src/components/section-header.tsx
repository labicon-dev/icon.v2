interface SectionHeaderProps {
  index: string;
  title: string;
  label: string;
  headingId: string;
  onAccent?: boolean;
}

/**
 * No mobile, título e rótulo não cabem lado a lado ("ÁREAS DE INTERESSE"
 * sozinho ocupa quase a largura toda), então o rótulo sobe para a linha do
 * índice e o título ganha a largura inteira, podendo quebrar. A partir de `sm`
 * volta a ser uma linha só, como no Figma.
 */
function SectionHeader({
  index,
  title,
  label,
  headingId,
  onAccent = false,
}: Readonly<SectionHeaderProps>) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 sm:flex sm:gap-4">
      <span
        aria-hidden="true"
        className={`font-mono text-label ${onAccent ? 'text-onAccent-muted' : 'text-accent'}`}
      >
        {'//'} {index}
      </span>
      <h2
        id={headingId}
        className={`col-span-2 row-start-2 font-sans text-h1 font-bold sm:whitespace-nowrap ${
          onAccent ? 'text-onAccent-strong' : 'text-neutral-50'
        }`}
      >
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={`col-start-2 row-start-1 ml-auto font-mono text-label uppercase ${
          onAccent ? 'text-onAccent-muted' : 'text-neutral-700'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default SectionHeader;
