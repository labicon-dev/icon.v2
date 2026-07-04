import { useState, type FormEvent } from 'react';

const CONTACT_EMAIL = 'icon@ufba.br';

const ADDRESS_LINES = [
  'Instituto de Humanidades, Artes e Ciências Prof.',
  'Milton Santos (IHAC) — UFBA',
  'Rua Barão de Jeremoabo, s/n · Ondina',
  'Salvador — BA, Brasil',
] as const;

// TODO(revisão): confirmar o handle oficial do Instagram do laboratório.
const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/icon.ufba' },
  { label: 'GitHub', href: 'https://github.com/labicon-dev' },
] as const;

const INPUT_CLASSES =
  'w-full border border-onAccent-muted bg-transparent px-4 py-3 font-mono text-label text-onAccent-strong placeholder:text-onAccent-subtle focus:border-onAccent-strong focus:outline-none';

/**
 * Seção "Entre em Contato" (ICO-17) — seção `contato` do frame do Figma:
 * bloco amarelo invertido com e-mail, endereço, redes e formulário de
 * mensagem. O envio real (endpoint/serviço) entra na M3 — por enquanto o
 * submit valida no cliente e confirma localmente.
 */
function ContatoSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="bg-accent">
      <div className="mx-auto max-w-[970px] px-6 py-16 md:py-[96px]">
        <header>
          <h2 id="contato-titulo" className="font-sans text-display font-bold text-onAccent-strong">
            <span className="mr-3 font-mono text-label font-medium text-onAccent-muted">// 06</span>
            ENTRE EM CONTATO
          </h2>
          <p className="mt-3 font-mono text-label text-onAccent-muted uppercase">
            / Get in touch — vamos construir algo juntos.
          </p>
        </header>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block border-b border-onAccent-strong pb-2 font-sans text-h1 font-bold text-onAccent-strong transition-opacity hover:opacity-70"
            >
              {CONTACT_EMAIL} <span aria-hidden="true">↗</span>
            </a>

            <p className="mt-8 font-mono text-label tracking-wide text-onAccent-muted uppercase">
              Endereço / Address
            </p>
            <address className="mt-3 font-sans text-body not-italic text-onAccent-strong">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <ul className="mt-8 flex gap-2.5">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-onAccent-strong px-4 py-2 font-mono text-label font-medium text-onAccent-strong uppercase transition-colors hover:bg-background hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} noValidate={false}>
            <p className="font-mono text-label tracking-wide text-onAccent-muted uppercase">
              // Envie sua mensagem
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <label className="sr-only" htmlFor="contato-nome">
                Seu nome
              </label>
              <input
                id="contato-nome"
                name="nome"
                type="text"
                required
                placeholder="Seu nome / Your name"
                className={INPUT_CLASSES}
              />

              <label className="sr-only" htmlFor="contato-email">
                Seu e-mail
              </label>
              <input
                id="contato-email"
                name="email"
                type="email"
                required
                placeholder="Seu e-mail / Your email"
                className={INPUT_CLASSES}
              />

              <label className="sr-only" htmlFor="contato-mensagem">
                Mensagem
              </label>
              <textarea
                id="contato-mensagem"
                name="mensagem"
                required
                rows={5}
                placeholder="Mensagem / Message"
                className={`${INPUT_CLASSES} resize-none`}
              />

              <button
                type="submit"
                className="mt-1 bg-background px-4 py-3 font-mono text-label font-medium text-accent uppercase transition-opacity hover:opacity-85"
              >
                Enviar <span aria-hidden="true">›</span>
              </button>

              <p
                role="status"
                aria-live="polite"
                className="font-mono text-label text-onAccent-muted"
              >
                {sent
                  ? '// mensagem registrada — envio real entra com a integração da API (M3)'
                  : ''}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContatoSection;
