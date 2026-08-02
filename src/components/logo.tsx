/**
 * Logo do ICON (marca hachurada + wordmark), desenhada inline conforme o
 * design — os SVGs em `public/` são sobras de template e não representam a
 * marca do laboratório.
 */
interface LogoProps {
  className?: string;
  /** Prefixo único para os ids internos do SVG (evita ids duplicados no DOM). */
  idPrefix?: string;
}

function Logo({ className = '', idPrefix = 'logo' }: LogoProps) {
  const patternId = `${idPrefix}-hatch`;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 text-neutral-50" fill="none">
        <defs>
          <pattern id={patternId} width="3" height="3" patternUnits="userSpaceOnUse">
            <path d="M0 3L3 0" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect x="0.5" y="0.5" width="19" height="19" stroke="currentColor" />
        <rect x="2.5" y="2.5" width="15" height="15" fill={`url(#${patternId})`} />
      </svg>
      <span className="font-sans text-h5 font-bold tracking-wide text-neutral-50">ICON</span>
    </span>
  );
}

export default Logo;
