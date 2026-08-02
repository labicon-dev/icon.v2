/**
 * ICON — Design Tokens (base inicial)
 *
 * Extraídos por engenharia reversa dos frames do site já desenhados no Figma
 */

/** Cores extraídas dos frames (dark-first). */
export const colors = {
  accent: '#FCD100', // amarelo ICON — heading "ARTE.", botões, faixa marquee, seção Contato
  signal: '#FF0000', // ponto "AO VIVO / LIVE"

  // Base do tema escuro
  background: '#040205',
  surface: '#070608',

  // Neutros
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#D9D9D9',
    200: '#CFCFD6',
    300: '#B4B4B4',
    400: '#AAAAB2',
    500: '#9A9AA2',
    600: '#85858D',
    650: '#7C7C84',
    700: '#6F6F77',
    750: '#55555C',
    800: '#3A3A40',
    850: '#1F1F1F',
    900: '#070608',
    950: '#040205',
  },

  // Bordas
  border: {
    DEFAULT: '#1F1F1F',
    muted: '#3A3A40',
    accent: '#FCD100',
  },

  // Texto sobre fundo amarelo
  onAccent: {
    strong: '#040205',
    muted: 'rgba(4, 2, 5, 0.55)',
    subtle: 'rgba(4, 2, 5, 0.45)',
  },
} as const;

/** Famílias tipográficas (ambas disponíveis no Google Fonts). */
export const fontFamily = {
  sans: ['Space Grotesk', 'system-ui', 'sans-serif'], // display + corpo
  mono: ['JetBrains Mono', 'ui-monospace', 'monospace'], // rótulos, meta, UI técnica
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Escala tipográfica semântica (px), com line-height e letter-spacing
 * observados. Formato pronto para o `theme.fontSize` do Tailwind:
 * [fontSize, { lineHeight, letterSpacing }].
 */
export const fontSize = {
  hero: ['clamp(46px, 6.4vw, 98px)', { lineHeight: '1', letterSpacing: '-0.035em' }],
  display: ['clamp(32px, 4vw, 58px)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
  h1: ['clamp(30px, 3.4vw, 46px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  h2: ['46px', { lineHeight: '1', letterSpacing: '0.04em' }],
  h3: ['22px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
  h4: ['26px', { lineHeight: '1.45', letterSpacing: '-0.01em' }],
  h5: ['15px', { lineHeight: '1.4', letterSpacing: '0' }],
  lead: ['18px', { lineHeight: '1.6', letterSpacing: '0' }],
  'body-lg': ['16px', { lineHeight: '1.7', letterSpacing: '0' }],
  body: ['14px', { lineHeight: '1.6', letterSpacing: '0' }],
  'body-sm': ['13px', { lineHeight: '1.55', letterSpacing: '0' }],
  label: ['13px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
  'label-sm': ['11px', { lineHeight: '1.4', letterSpacing: '0.1em' }],
  caption: ['10.5px', { lineHeight: '1.35', letterSpacing: '0.12em' }],
  micro: ['10px', { lineHeight: '1.3', letterSpacing: '0.06em' }],
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.03em',
  normal: '0em',
  wide: '0.06em',
  wider: '0.16em',
  widest: '0.2em',
} as const;

/**
 * Escala de espaçamento. O design é compacto, com base ~2px; abaixo estão os
 * gaps recorrentes entre elementos/seções mais os passos comuns extrapolados.
 */
export const spacing = {
  px: '1px',
  0.5: '2px',
  1: '3px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7.5: '30px',
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  27.5: '110px',
  30: '120px',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '1px',
  DEFAULT: '2px',
} as const;

export const tailwindTheme = {
  extend: {
    colors,
    fontFamily,
    fontWeight,
    fontSize,
    letterSpacing,
    spacing,
    borderRadius,
  },
} as const;

export default tailwindTheme;
