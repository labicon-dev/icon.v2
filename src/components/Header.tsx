import { useState } from 'react';
import Logo from './Logo';

const NAV_ITEMS = [
  { number: '01', label: 'Início', href: '#inicio' },
  { number: '02', label: 'Sobre', href: '#sobre' },
  { number: '03', label: 'Áreas', href: '#interesse' },
  { number: '04', label: 'Equipe', href: '#quem' },
  { number: '05', label: 'Contato', href: '#contato' },
] as const;

/** Item destacado do nav que aponta para a transmissão (seção `live`). */
function LiveNavLink({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#live"
      onClick={onClick}
      className="flex items-center gap-2 font-mono text-label font-medium text-neutral-50 uppercase transition-colors hover:text-accent"
    >
      <span
        aria-hidden="true"
        className="inline-block size-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none"
      />
      Ao vivo
    </a>
  );
}

/**
 * Header global (ICO-11) — barra sticky com logo e navegação por âncoras
 * para as seções da single-page, conforme o PDF do design: itens numerados
 * 01–05 + item destacado "● AO VIVO". Em telas menores vira um menu
 * disclosure acessível.
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1190px] items-center justify-between px-6 py-4">
        <a href="#inicio" aria-label="ICON — voltar ao início" onClick={closeMenu}>
          <Logo idPrefix="header-logo" />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(({ number, label, href }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-label text-neutral-200 uppercase transition-colors hover:text-neutral-50"
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
          className="border border-border-muted px-3 py-2 font-mono text-label text-neutral-200 uppercase transition-colors hover:border-border-accent hover:text-neutral-50 md:hidden"
        >
          {menuOpen ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal"
          className="border-t border-border md:hidden"
        >
          <ul className="mx-auto flex max-w-[1190px] flex-col px-6 py-4">
            {NAV_ITEMS.map(({ number, label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block py-3 font-mono text-label text-neutral-200 uppercase transition-colors hover:text-neutral-50"
                >
                  <span aria-hidden="true" className="mr-2 text-neutral-750">
                    {number}
                  </span>
                  {label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <LiveNavLink onClick={closeMenu} />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
