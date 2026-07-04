import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Áreas de Interesse', href: '#interesse' },
  { label: 'Quem somos', href: '#quem' },
  { label: 'Contato', href: '#contato' },
] as const;

const CONTACT_EMAIL = 'icon@ufba.br';

/**
 * Footer global (ICO-11) — conforme o PDF do design: logo + tagline,
 * colunas NAVEGAÇÃO e CONTATO, e barra inferior com copyright, o lema
 * "ARTE · CIÊNCIA · EDUCAÇÃO" e a versão do site.
 */
function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[970px] gap-12 px-6 py-16 md:grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)]">
        <div>
          <Logo idPrefix="footer-logo" />
          <p className="mt-4 max-w-[300px] font-sans text-body text-neutral-500">
            Laboratório de Pesquisa, Desenvolvimento e Inovação em Interatividade, Computação e
            Novas Interfaces.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <p className="font-mono text-label tracking-wide text-neutral-650 uppercase">Navegação</p>
          <ul className="mt-4 flex flex-col gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-sans text-body text-neutral-200 transition-colors hover:text-neutral-50"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-label tracking-wide text-neutral-650 uppercase">Contato</p>
          <ul className="mt-4 flex flex-col gap-2 font-sans text-body">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent transition-opacity hover:opacity-80"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="text-neutral-500">Salvador — BA, Brasil</li>
            <li className="text-neutral-500">UFBA · IHAC</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[970px] flex-col gap-2 px-6 py-5 font-mono text-label-sm tracking-wide text-neutral-700 uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 ICON · Universidade Federal da Bahia</span>
          <span>Arte · Ciência · Educação</span>
          <span>SITE_v2.0</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
