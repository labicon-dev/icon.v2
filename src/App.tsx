import { useState } from 'react';

/**
 * Componente de exemplo para validar o setup do Tailwind + tokens do ICON
 * (ICO-50). Usa classes utilitárias geradas a partir de
 * `src/styles/design-tokens.ts`: cores (`accent`, `signal`, `neutral`,
 * `border`), tipografia (`font-sans`/`font-mono`, escala `hero`/`label`/…),
 * espaçamento e raio de borda. Será substituído pelo layout real do site.
 */
function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="mx-auto flex min-h-screen max-w-[1126px] flex-col justify-center gap-8 px-6 py-12">
      <p className="flex items-center gap-2 font-mono text-label tracking-wide text-neutral-650 uppercase">
        <span className="inline-block size-1.5 rounded-full bg-signal" aria-hidden="true" />
        Onde o código vira arte
      </p>

      <h1 className="font-sans text-hero font-bold text-neutral-50">
        ARTE<span className="text-accent">.</span>
      </h1>

      <p className="max-w-md font-sans text-body-lg text-neutral-500">
        Setup do Tailwind CSS validado com os tokens de design extraídos do Figma — cores,
        tipografia e espaçamento do design system do ICON.
      </p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="border border-border-accent bg-accent px-4 py-2 font-mono text-label tracking-wide text-background uppercase transition-opacity hover:opacity-80"
        >
          Contador: {count}
        </button>
        <span className="border border-border-muted px-4 py-2 font-mono text-label tracking-wide text-neutral-700 uppercase">
          Tailwind OK
        </span>
      </div>
    </main>
  );
}

export default App;
