/**
 * Validação "falha rápido" das envs obrigatórias: sem elas o dev server não
 * sobe e o build quebra, com a lista do que falta — em vez de publicar um site
 * que só quebra em runtime.
 *
 * Este módulo roda tanto no browser (`main.tsx`) quanto no Node (`vite.config.ts`),
 * por isso não pode tocar `import.meta.env` no escopo do módulo: quem chama
 * passa a fonte das variáveis como argumento.
 */

/** Lista canônica. Ao incluir uma chave aqui, registre-a também em `.env.template` e em `ImportMetaEnv`. */
export const REQUIRED_ENV_KEYS = ['VITE_API_BASE_URL', 'VITE_MEMBER_FETCH_TOKEN'] as const;

export type RequiredEnvKey = (typeof REQUIRED_ENV_KEYS)[number];

/** "Vazio" cobre ausente, não-string e string só com espaços. */
export function findMissingEnvKeys(source: Record<string, unknown>): RequiredEnvKey[] {
  return REQUIRED_ENV_KEYS.filter((key) => {
    const value = source[key];
    return typeof value !== 'string' || value.trim() === '';
  });
}

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

/** `source` é `import.meta.env` no browser, ou o `loadEnv` do Vite no build. */
export function validateEnv(source: Record<string, unknown>): void {
  const missing = findMissingEnvKeys(source);
  if (missing.length > 0) {
    throw new Error(formatMissingEnvError(missing));
  }
}
