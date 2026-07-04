import { useEffect, useState } from 'react';
import Logo from './Logo';

const NAV_ITEMS = [
  { number: '01', label: 'Início', href: '#inicio' },
  { number: '02', label: 'Sobre', href: '#sobre' },
  { number: '03', label: 'Áreas', href: '#interesse' },
  { number: '04', label: 'Equipe', href: '#quem' },
  { number: '06', label: 'Contato', href: '#contato' },
] as const;

/** Itens do menu mobile seguem a numeração das seções (05 = Ao Vivo). */
const MOBILE_ITEMS = [
  { number: '01', label: 'Início', href: '#inicio' },
  { number: '02', label: 'Sobre', href: '#sobre' },
  { number: '03', label: 'Áreas', href: '#interesse' },
  { number: '04', label: 'Equipe', href: '#quem' },
  { number: '05', label: 'Ao Vivo', href: '#live' },
  { number: '06', label: 'Contato', href: '#contato' },
] as const;

/** Item destacado do nav que aponta para a transmissão (seção `live`). */
function LiveNavLink() {
  return (
    <a
      href="#live"
      className="flex items-center gap-2 font-mono text-label font-medium text-accent uppercase transition-opacity hover:opacity-80"
    >
      <span
        aria-hidden="true"
        className="inline-block size-[7px] animate-pulse rounded-full bg-accent motion-reduce:animate-none"
      />
      Ao vivo
    </a>
  );
}

/**
 * Header global (ICO-11) — barra sticky de 64px com logo e navegação por
 * âncoras, conforme o protótipo do design: itens numerados (Contato é 06,
 * como a seção) + "● AO VIVO" em destaque. No mobile vira um menu
 * fullscreen que desliza da direita, com links grandes e CTA de e-mail.
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:px-7.5">
        <a href="#inicio" aria-label="ICON — voltar ao início" onClick={closeMenu}>
          <Logo idPrefix="header-logo" />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(({ number, label, href }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-label whitespace-nowrap text-neutral-200 uppercase transition-colors hover:text-accent"
            >
              <span aria-hidden="true" className="mr-1 text-neutral-750">
                {number}
              </span>
              {label}
            </a>
          ))}
          <LiveNavLink />
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="flex size-[42px] items-center justify-center rounded border border-border-muted text-lead text-neutral-50 transition-colors hover:border-border-accent md:hidden"
        >
          {menuOpen ? '✕' : '≡'}
        </button>
      </div>

      {/* Menu mobile fullscreen (desliza da direita) */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-[60] flex flex-col bg-background p-6 transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <Logo idPrefix="menu-logo" />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="flex size-[42px] items-center justify-center rounded border border-border-muted text-lead text-neutral-50"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Navegação principal" className="mt-9 flex flex-col">
          {MOBILE_ITEMS.map(({ number, label, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="flex items-baseline gap-3.5 border-b border-border py-4 font-sans text-[28px] font-bold tracking-tight text-neutral-50"
            >
              <span aria-hidden="true" className="font-mono text-body-sm text-accent">
                {number}
              </span>
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          onClick={closeMenu}
          className="mt-auto inline-flex items-center justify-center gap-2.5 rounded bg-accent p-4 font-mono text-body font-bold text-background"
        >
          icon@ufba.br <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
