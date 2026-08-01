import { describe, expect, it } from 'vitest';

import { REQUIRED_ENV_KEYS, findMissingEnvKeys, formatMissingEnvError, validateEnv } from './env';

/** Fonte de env válida — todas as chaves obrigatórias preenchidas. */
function completeEnv(): Record<string, unknown> {
  return Object.fromEntries(REQUIRED_ENV_KEYS.map((key) => [key, 'valor']));
}

describe('findMissingEnvKeys', () => {
  it('não acusa nada quando todas as obrigatórias estão preenchidas', () => {
    expect(findMissingEnvKeys(completeEnv())).toEqual([]);
  });

  it('acusa chave ausente', () => {
    const env = completeEnv();
    delete env[REQUIRED_ENV_KEYS[0]];
    expect(findMissingEnvKeys(env)).toEqual([REQUIRED_ENV_KEYS[0]]);
  });

  it('trata string vazia e só-espaços como ausente', () => {
    expect(findMissingEnvKeys({ ...completeEnv(), [REQUIRED_ENV_KEYS[0]]: '' })).toEqual([
      REQUIRED_ENV_KEYS[0],
    ]);
    expect(findMissingEnvKeys({ ...completeEnv(), [REQUIRED_ENV_KEYS[0]]: '   ' })).toEqual([
      REQUIRED_ENV_KEYS[0],
    ]);
  });

  it('trata valor não-string como ausente', () => {
    expect(findMissingEnvKeys({ ...completeEnv(), [REQUIRED_ENV_KEYS[0]]: 123 })).toEqual([
      REQUIRED_ENV_KEYS[0],
    ]);
  });

  it('acusa todas as obrigatórias quando a fonte está vazia', () => {
    expect(findMissingEnvKeys({})).toEqual([...REQUIRED_ENV_KEYS]);
  });

  it('ignora chaves extras não obrigatórias', () => {
    expect(findMissingEnvKeys({ ...completeEnv(), VITE_QUALQUER_OUTRA: '' })).toEqual([]);
  });
});

describe('formatMissingEnvError', () => {
  it('lista cada chave faltando na mensagem', () => {
    const message = formatMissingEnvError(['VITE_A', 'VITE_B']);
    expect(message).toContain('VITE_A');
    expect(message).toContain('VITE_B');
    expect(message).toContain('  - VITE_A');
    expect(message).toContain('.env.template');
  });
});

describe('validateEnv', () => {
  it('passa quando a fonte está completa', () => {
    expect(() => validateEnv(completeEnv())).not.toThrow();
  });

  it('lança listando a chave faltando', () => {
    const env = completeEnv();
    delete env[REQUIRED_ENV_KEYS[0]];
    expect(() => validateEnv(env)).toThrowError(new RegExp(REQUIRED_ENV_KEYS[0], 'u'));
  });
});
