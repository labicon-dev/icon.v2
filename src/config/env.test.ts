import { describe, expect, it } from 'vitest';

import { REQUIRED_ENV_KEYS, findMissingEnvKeys, formatMissingEnvError, validateEnv } from './env';

/** Fonte de env válida — todas as chaves obrigatórias preenchidas. */
function completeEnv(): Record<string, unknown> {
  return Object.fromEntries(REQUIRED_ENV_KEYS.map((key) => [key, 'valor']));
}

describe('findMissingEnvKeys', () => {
  it('returns nothing when every required key is filled', () => {
    expect(findMissingEnvKeys(completeEnv())).toEqual([]);
  });

  it('flags a missing key', () => {
    const env = completeEnv();
    delete env[REQUIRED_ENV_KEYS[0]];
    expect(findMissingEnvKeys(env)).toEqual([REQUIRED_ENV_KEYS[0]]);
  });

  it('treats empty and whitespace-only strings as missing', () => {
    expect(findMissingEnvKeys({ ...completeEnv(), [REQUIRED_ENV_KEYS[0]]: '' })).toEqual([
      REQUIRED_ENV_KEYS[0],
    ]);
    expect(findMissingEnvKeys({ ...completeEnv(), [REQUIRED_ENV_KEYS[0]]: '   ' })).toEqual([
      REQUIRED_ENV_KEYS[0],
    ]);
  });

  it('treats a non-string value as missing', () => {
    expect(findMissingEnvKeys({ ...completeEnv(), [REQUIRED_ENV_KEYS[0]]: 123 })).toEqual([
      REQUIRED_ENV_KEYS[0],
    ]);
  });

  it('flags every required key when the source is empty', () => {
    expect(findMissingEnvKeys({})).toEqual([...REQUIRED_ENV_KEYS]);
  });

  it('ignores extra non-required keys', () => {
    expect(findMissingEnvKeys({ ...completeEnv(), VITE_QUALQUER_OUTRA: '' })).toEqual([]);
  });
});

describe('formatMissingEnvError', () => {
  it('lists every missing key in the message', () => {
    const message = formatMissingEnvError(['VITE_A', 'VITE_B']);
    expect(message).toContain('VITE_A');
    expect(message).toContain('VITE_B');
    expect(message).toContain('  - VITE_A');
    expect(message).toContain('.env.template');
  });
});

describe('validateEnv', () => {
  it('passes when the source is complete', () => {
    expect(() => validateEnv(completeEnv())).not.toThrow();
  });

  it('throws listing the missing key', () => {
    const env = completeEnv();
    delete env[REQUIRED_ENV_KEYS[0]];
    expect(() => validateEnv(env)).toThrowError(new RegExp(REQUIRED_ENV_KEYS[0], 'u'));
  });
});
