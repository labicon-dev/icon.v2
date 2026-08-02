import { useEffect, useState } from 'react';
import { HEADER_NAV, LIVE_HREF, MOBILE_NAV } from '../config/sections';
import Logo from './logo';

function LiveNavLink() {
  return (
    <a
      href={LIVE_HREF}
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
 * A numeração dos itens acompanha a das seções, por isso Contato é 06 e não
 * 05: "Ao Vivo" (05) fica de fora da lista e ganha link próprio em destaque.
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
          {HEADER_NAV.map(({ number, short, href }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-label whitespace-nowrap text-neutral-200 uppercase transition-colors hover:text-accent"
            >
              <span aria-hidden="true" className="mr-1 text-neutral-750">
                {number}
              </span>
              {short}
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
        // Fechado, o menu continua no DOM (só deslocado para fora da tela).
        // `inert` tira os links da ordem de tabulação e da árvore de
        // acessibilidade; com `aria-hidden` sozinho, o Tab levava o usuário
        // para dentro de conteúdo anunciado como oculto.
        inert={!menuOpen}
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
          {MOBILE_NAV.map(({ number, short, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="flex items-baseline gap-3.5 border-b border-border py-4 font-sans text-[28px] font-bold tracking-tight text-neutral-50"
            >
              <span aria-hidden="true" className="font-mono text-body-sm text-accent">
                {number}
              </span>
              {short}
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
