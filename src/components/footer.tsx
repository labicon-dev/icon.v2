import { FOOTER_NAV } from '../config/sections';
import { useLabClock } from '../lib/lab-clock';
import Logo from './logo';
import ObfuscatedEmail from './obfuscated-email';

function Footer() {
  const { label: time } = useLabClock();

  return (
    <footer className="bg-background px-5 pt-16 pb-10 md:px-7.5">
      <div className="mx-auto max-w-330">
        <div className="grid gap-10 border-b border-border pb-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo idPrefix="footer-logo" />
            <p className="mt-5 max-w-[320px] font-sans text-body text-neutral-600">
              Laboratório de Pesquisa, Desenvolvimento e Inovação em Interatividade, Computação e
              Novas Interfaces.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="font-mono text-label-sm tracking-wider text-neutral-750 uppercase">
              Navegação
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {FOOTER_NAV.map(({ long, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-sans text-body text-neutral-200 transition-colors hover:text-accent"
                  >
                    {long}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-label-sm tracking-wider text-neutral-750 uppercase">
              Contato
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 font-sans text-body">
              <li>
                <ObfuscatedEmail
                  user="icon"
                  domain="ufba.br"
                  className="text-accent transition-opacity hover:opacity-80"
                />
              </li>
              <li className="text-neutral-600">Salvador — BA, Brasil</li>
              <li className="text-neutral-600">UFBA · IHAC</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 font-mono text-label-sm tracking-wide text-neutral-750 uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 ICON · Universidade Federal da Bahia</span>
          <span>Arte · Ciência · Educação</span>
          <span>
            SITE_v2.0 · <time className="text-neutral-650">{time}</time>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
