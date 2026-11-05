import { afterEach, describe, expect, it, vi } from 'vitest';

import { LOGO_PATHS, cdnUrl, logoUrl } from './cdn';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('cdnUrl', () => {
  it('joins base and path with a single slash', () => {
    vi.stubEnv('VITE_CDN_BASE_URL', 'https://cdn.example.org/');
    expect(cdnUrl('/logo/a.png')).toBe('https://cdn.example.org/logo/a.png');
  });

  it('works when the base has no trailing slash', () => {
    vi.stubEnv('VITE_CDN_BASE_URL', 'https://cdn.example.org');
    expect(cdnUrl('logo/a.png')).toBe('https://cdn.example.org/logo/a.png');
  });

  it('throws a clear error when the base is not configured', () => {
    vi.stubEnv('VITE_CDN_BASE_URL', '');
    expect(() => cdnUrl('logo/a.png')).toThrow(/VITE_CDN_BASE_URL/u);
  });
});

describe('logoUrl', () => {
  it('resolves a logo version to its CDN path', () => {
    vi.stubEnv('VITE_CDN_BASE_URL', 'https://cdn.example.org');
    expect(logoUrl('symbolSmallWhiteOnTransparent')).toBe(
      `https://cdn.example.org/${LOGO_PATHS.symbolSmallWhiteOnTransparent}`,
    );
  });
});
