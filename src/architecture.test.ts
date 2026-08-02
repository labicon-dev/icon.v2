import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Impõe a direção de dependência entre as camadas de `src/`.
 *
 * Existe como teste porque o oxlint (1.x) ainda não implementa
 * `no-restricted-imports` — sem isto, as regras de camada ficariam só na
 * documentação, que foi exatamente como elas se perderam antes.
 *
 * Direção permitida (uma camada só importa das de baixo):
 *
 *     pages  →  features  →  components / lib / config / styles
 */

const SRC = resolve(import.meta.dirname);

/** Camadas de baixo: infra compartilhada, não pode conhecer domínio nem tela. */
const SHARED_LAYERS = ['components', 'lib', 'config', 'styles'];

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listSourceFiles(full);
    if (!/\.tsx?$/u.test(entry.name)) return [];
    if (/\.test\.tsx?$/u.test(entry.name)) return [];
    return [full];
  });
}

/** Extrai os specifiers importados por um arquivo (estáticos e dinâmicos). */
function importsOf(file: string): string[] {
  const source = readFileSync(file, 'utf8');
  const specifiers: string[] = [];
  const patterns = [
    /(?:^|\n)\s*import\s+(?:[\s\S]*?)\bfrom\s*['"]([^'"]+)['"]/gu,
    /(?:^|\n)\s*import\s*['"]([^'"]+)['"]/gu,
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/gu,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      if (match[1]) specifiers.push(match[1]);
    }
  }
  return specifiers;
}

/**
 * Resolve o import para um caminho relativo a `src/`, ou `null` se for pacote
 * externo (react, node:fs, …).
 */
function resolveToSrc(file: string, specifier: string): string | null {
  if (!specifier.startsWith('.')) return null;
  const absolute = resolve(dirname(file), specifier);
  const rel = relative(SRC, absolute);
  if (rel.startsWith('..')) return null;
  return rel.replaceAll('\\', '/');
}

/** Primeiro segmento do caminho relativo — o nome da camada. */
function layerOf(relativePath: string): string {
  return relativePath.split('/')[0] ?? '';
}

const files = listSourceFiles(SRC);

/** Pares (arquivo, import interno resolvido) de todo o `src/`. */
const edges = files.flatMap((file) => {
  const from = relative(SRC, file).replaceAll('\\', '/');
  return importsOf(file)
    .map((specifier) => resolveToSrc(file, specifier))
    .filter((to): to is string => to !== null)
    .map((to) => ({ from, to }));
});

describe('src/ layers', () => {
  it('finds the project files and imports (sanity check for the test itself)', () => {
    expect(files.length).toBeGreaterThan(10);
    expect(edges.length).toBeGreaterThan(10);
  });

  it.each(SHARED_LAYERS)('%s/ does not import from features/ or pages/', (layer) => {
    const violations = edges
      .filter(({ from }) => layerOf(from) === layer)
      .filter(({ to }) => layerOf(to) === 'features' || layerOf(to) === 'pages')
      .map(({ from, to }) => `${from} → ${to}`);

    expect(violations).toEqual([]);
  });

  it('no feature imports from another feature', () => {
    const violations = edges
      .filter(({ from, to }) => layerOf(from) === 'features' && layerOf(to) === 'features')
      .filter(({ from, to }) => from.split('/')[1] !== to.split('/')[1])
      .map(({ from, to }) => `${from} → ${to}`);

    expect(violations).toEqual([]);
  });

  it('features/ does not import from pages/', () => {
    const violations = edges
      .filter(({ from, to }) => layerOf(from) === 'features' && layerOf(to) === 'pages')
      .map(({ from, to }) => `${from} → ${to}`);

    expect(violations).toEqual([]);
  });
});
