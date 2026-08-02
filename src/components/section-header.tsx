interface SectionHeaderProps {
  index: string;
  title: string;
  label: string;
  headingId: string;
  onAccent?: boolean;
}

function SectionHeader({
  index,
  title,
  label,
  headingId,
  onAccent = false,
}: Readonly<SectionHeaderProps>) {
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
