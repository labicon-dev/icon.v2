import type { AnchorHTMLAttributes, ReactNode } from 'react';

/**
 * Botão de ação da Home (ICO-12), extraído do Figma. Dois variantes com estados
 * de hover observados no design:
 *   - `primary`   → fundo amarelo (accent) que clareia no hover (neutral-100).
 *   - `secondary` → contorno escuro que ganha fundo amarelo no hover.
 *
 * Renderiza como `<a>` porque as CTAs da Home apontam para seções/rotas
 * (`EXPLORAR` rola para o conteúdo, `VER AO VIVO` leva à transmissão).
 */
type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 border px-6 py-4 font-mono text-[13px] tracking-wider uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variants: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-neutral-950 hover:border-neutral-100 hover:bg-neutral-100',
  secondary:
    'border-neutral-700 bg-transparent text-neutral-50 hover:border-accent hover:bg-accent hover:text-neutral-950',
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}

export default Button;
