import { logoUrl } from '../lib/cdn';

interface LogoProps {
  /**
   * `compact`: símbolo oficial + "ICON" em texto, para espaços pequenos
   * (header, menu, moldura do "Ao Vivo"). Na logo completa a descrição do
   * laboratório fica ilegível abaixo de ~200px de largura.
   *
   * `full`: a logo completa da CDN (símbolo + ICON + descrição).
   */
  variant?: 'compact' | 'full';
  className?: string;
}

function Logo({ variant = 'compact', className = '' }: Readonly<LogoProps>) {
  if (variant === 'full') {
    return (
      <img
        src={logoUrl('fullWhiteOnTransparent')}
        alt="ICON — Laboratório de Pesquisa, Desenvolvimento e Inovação em Interatividade, Computação e Novas Interfaces"
        width={6920}
        height={2900}
        loading="lazy"
        decoding="async"
        className={`h-auto ${className}`.trim()}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <img
        src={logoUrl('symbolSmallWhiteOnTransparent')}
        alt=""
        width={516}
        height={516}
        decoding="async"
        className="size-6"
      />
      <span className="font-sans text-h5 font-bold tracking-wide text-neutral-50">ICON</span>
    </span>
  );
}

export default Logo;
