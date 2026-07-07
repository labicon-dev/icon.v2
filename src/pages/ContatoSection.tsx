import { useEffect, useRef, useState, type FormEvent } from 'react';
import ObfuscatedEmail from '../components/ObfuscatedEmail';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

const ADDRESS_LINES = [
  'Instituto de Humanidades, Artes e Ciências Prof. Milton Santos (IHAC) — UFBA',
  'Rua Barão de Jeremoabo, s/n · Ondina',
  'Salvador — BA, Brasil',
] as const;

// TODO(revisão): confirmar os perfis oficiais do laboratório.
const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/icon.ufba' },
  { label: 'GitHub', href: 'https://github.com/labicon-dev' },
  { label: 'YouTube', href: 'https://www.youtube.com/@iconufba' },
] as const;

const INPUT_CLASSES =
  'w-full rounded border-[1.5px] border-onAccent-subtle bg-transparent px-4 py-[15px] font-mono text-body text-onAccent-strong transition-colors placeholder:text-onAccent-subtle focus:border-onAccent-strong focus:outline-none';

/**
 * Seção "Entre em Contato" (ICO-17) — bloco amarelo invertido na escala do
 * protótipo do design: e-mail ofuscado, endereço, redes e formulário com
 * feedback "✓ MENSAGEM ENVIADA". O envio real (endpoint) entra na M3.
 */
function ContatoSection() {
  const [sent, setSent] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => clearTimeout(resetTimer.current ?? undefined), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    clearTimeout(resetTimer.current ?? undefined);
    resetTimer.current = setTimeout(() => setSent(false), 2600);
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="bg-accent px-5 py-20 md:px-7.5 md:py-27.5"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <SectionHeader
            index="06"
            title="ENTRE EM CONTATO"
            label=""
            headingId="contato-titulo"
            onAccent
          />
          <p className="mt-3.5 mb-14 font-mono text-label text-onAccent-muted uppercase">
            / Get in touch — vamos construir algo na fronteira entre arte e tecnologia.
          </p>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-[60px]">
          <Reveal>
            <ObfuscatedEmail
              user="icon"
              domain="ufba.br"
              className="inline-flex items-center gap-3 border-b-2 border-onAccent-strong pb-1 font-sans text-[clamp(24px,2.6vw,36px)] font-bold tracking-tight text-onAccent-strong transition-opacity hover:opacity-70"
            >
              <span aria-hidden="true"> ↗</span>
            </ObfuscatedEmail>

            <p className="mt-11 font-mono text-label-sm tracking-wider text-onAccent-muted uppercase">
              Endereço / Address
            </p>
            <address className="mt-2.5 max-w-[380px] font-sans text-h5 leading-[1.7] not-italic text-onAccent-strong">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <ul className="mt-9 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded border-[1.5px] border-onAccent-strong px-4 py-2.5 font-mono text-label text-onAccent-strong uppercase transition-colors hover:bg-background hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <form onSubmit={handleSubmit}>
              <p className="font-mono text-label tracking-wide text-onAccent-strong uppercase">
                {'//'} Envie sua mensagem
              </p>

              <div className="mt-3.5 flex flex-col gap-3.5">
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
                  rows={4}
                  placeholder="Mensagem / Message"
                  className={`${INPUT_CLASSES} resize-y`}
                />

                <button
                  type="submit"
                  className="rounded bg-background p-4 font-mono text-label font-bold tracking-wide text-accent uppercase transition-opacity hover:opacity-85"
                >
                  <span role="status" aria-live="polite">
                    {sent ? '✓ Mensagem enviada' : 'Enviar ›'}
                  </span>
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ContatoSection;
