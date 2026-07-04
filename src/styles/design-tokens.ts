/**
 * ICON — Design Tokens (M1 · base inicial)
 *
 * Extraídos por engenharia reversa dos frames do site já desenhados no Figma
 * (não existe ainda um arquivo de Guidelines oficial):
 *   https://www.figma.com/design/XpI4SFzMPladCH4PolAUm8/icon-site-v2
 *
 * O site é single-page, tema escuro, estética técnica/wireframe:
 * fundo quase-preto (#040205), acento amarelo (#FCD100), títulos em
 * Space Grotesk e rótulos/meta em JetBrains Mono, cantos praticamente retos
 * (raio 1–2px).
 *
 * Estes tokens são a BASE INICIAL do design system. A consolidação formal
 * (nomes semânticos definitivos, dark/light, variáveis no Figma) fica de
 * backlog para depois do M1. Ver docs/design-tokens.md para a documentação
 * completa e a tabela de papéis semânticos.
 *
 * Uso (após ICO-50 adicionar o Tailwind):
 *   // tailwind.config.ts
 *   import { tailwindTheme } from './src/styles/design-tokens'
 *   export default { theme: tailwindTheme }
 */

/** Cores extraídas dos frames (dark-first). */
export const colors = {
  // Marca / acento
  accent: '#FCD100', // amarelo ICON — heading "ARTE.", botões, faixa marquee, seção Contato
  signal: '#FF0000', // ponto "AO VIVO / LIVE"

  // Base do tema escuro
  background: '#040205', // fundo da página
  surface: '#070608', // blocos/cards elevados sobre o fundo

  // Escala neutra (cinzas frios com leve tom violáceo), do claro ao escuro
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA', // texto primário sobre fundo escuro
    100: '#D9D9D9',
    200: '#CFCFD6', // navegação / rótulos claros
    300: '#B4B4B4',
    400: '#AAAAB2',
    500: '#9A9AA2', // texto de corpo secundário
    600: '#85858D',
    650: '#7C7C84',
    700: '#6F6F77', // texto de apoio / tags
    750: '#55555C', // numeração discreta
    800: '#3A3A40', // bordas suaves
    850: '#1F1F1F', // bordas / divisores
    900: '#070608',
    950: '#040205',
  },

  // Bordas
  border: {
    DEFAULT: '#1F1F1F',
    muted: '#3A3A40',
    accent: '#FCD100',
  },

  // Texto sobre fundo amarelo (seção Contato invertida)
  onAccent: {
    strong: '#040205', // #040205 @ ~1.0
    muted: 'rgba(4, 2, 5, 0.55)', // rótulos secundários sobre amarelo
    subtle: 'rgba(4, 2, 5, 0.45)', // placeholders de formulário
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
  hero: ['70px', { lineHeight: '70px', letterSpacing: '-0.02em' }], // "ONDE O CÓDIGO VIRA ARTE."
  display: ['40px', { lineHeight: '40px', letterSpacing: '0.015em' }], // "ENTRE EM CONTATO"
  h1: ['36px', { lineHeight: '36px', letterSpacing: '-0.05em' }], // títulos de seção
  h2: ['32px', { lineHeight: '40px', letterSpacing: '0.07em' }], // iniciais "NM"
  h3: ['24px', { lineHeight: '30px', letterSpacing: '0.2em' }], // letra do tripé "A / C / E"
  h4: ['20px', { lineHeight: '28px', letterSpacing: '-0.03em' }], // subtítulo do sobre
  h5: ['16px', { lineHeight: '20px', letterSpacing: '0' }], // títulos de card
  'body-lg': ['14px', { lineHeight: '20px', letterSpacing: '-0.04em' }], // parágrafo do hero
  body: ['12px', { lineHeight: '21px', letterSpacing: '-0.01em' }], // parágrafos padrão
  'body-sm': ['11px', { lineHeight: '15px', letterSpacing: '-0.03em' }], // descrições de card
  label: ['10px', { lineHeight: '14px', letterSpacing: '0.06em' }], // nav, botões, meta (mono)
  'label-sm': ['9px', { lineHeight: '12px', letterSpacing: '0.06em' }], // meta menor
  caption: ['8px', { lineHeight: '10px', letterSpacing: '0.16em' }], // "ART · SCIENCE · EDUCATION"
  micro: ['7px', { lineHeight: '9px', letterSpacing: '0' }], // ornamentos ✦
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
  1: '3px', // gap recorrente mais comum
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
} as const;

/** Cantos praticamente retos — estética técnica. */
export const borderRadius = {
  none: '0px',
  sm: '1px',
  DEFAULT: '2px',
} as const;

/** Objeto pronto para colar em `theme` do tailwind.config. */
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
