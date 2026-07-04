/**
 * Fonte única e centralizada das variáveis de ambiente obrigatórias e a
 * validação que roda no boot da aplicação.
 *
 * A ideia é "falhar rápido": se alguma env obrigatória estiver ausente ou
 * vazia, o processo não sobe (dev), o `build` quebra e o app não renderiza —
 * com uma mensagem clara listando exatamente o que falta. Evita o cenário de
 * "subiu em produção sem a env certa e só quebra em runtime".
 *
 * Este módulo é importado tanto pelo runtime (browser, em `main.tsx`) quanto
 * pelo build (`vite.config.ts`, contexto Node). Por isso ele NÃO pode
 * referenciar `import.meta.env` nem nenhuma API específica de browser/Node no
 * escopo do módulo: quem valida passa a fonte das variáveis como argumento.
 */

/**
 * Chaves de ambiente obrigatórias para a aplicação subir.
 *
 * Ao adicionar uma nova env obrigatória, inclua-a aqui (e em `.env.template` /
 * `ImportMetaEnv` em `src/vite-env.d.ts`). Esta é a lista canônica.
 */
export const REQUIRED_ENV_KEYS = ['VITE_API_BASE_URL'] as const;

export type RequiredEnvKey = (typeof REQUIRED_ENV_KEYS)[number];

/**
 * Retorna as chaves obrigatórias que estão ausentes ou vazias em `source`.
 * Considera "vazio" tanto `undefined`/valor não-string quanto string só com
 * espaços em branco.
 */
export function findMissingEnvKeys(source: Record<string, unknown>): RequiredEnvKey[] {
  return REQUIRED_ENV_KEYS.filter((key) => {
    const value = source[key];
    return typeof value !== 'string' || value.trim() === '';
  });
}

/** Monta a mensagem de erro listando exatamente as chaves que faltam. */
export function formatMissingEnvError(missing: readonly string[]): string {
  return [
    `Variáveis de ambiente obrigatórias ausentes ou vazias: ${missing.join(', ')}.`,
    '',
    'Chaves faltando:',
    ...missing.map((key) => `  - ${key}`),
    '',
    'Copie `.env.template` para `.env.local` e preencha os valores (ver README). ' +
      'Em CI/deploy, defina as mesmas chaves como secrets do ambiente.',
  ].join('\n');
}

/**
 * Valida `source` e lança um erro claro se faltar alguma env obrigatória.
 * `source` pode ser `import.meta.env` (browser) ou o resultado de `loadEnv`
 * do Vite (build).
 */
export function validateEnv(source: Record<string, unknown>): void {
  const missing = findMissingEnvKeys(source);
  if (missing.length > 0) {
    throw new Error(formatMissingEnvError(missing));
  }
}
