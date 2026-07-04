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
/**
 * Escala recalibrada na M2 com base no protótipo do Claude Design
 * (ICON.dc.html) — a fonte real das medidas. Os valores extraídos do Figma
 * eram ~30% menores porque o frame foi traçado sobre screenshots reduzidos
 * do protótipo.
 */
export const fontSize = {
  hero: ['clamp(46px, 6.4vw, 98px)', { lineHeight: '1', letterSpacing: '-0.035em' }], // "ONDE O CÓDIGO VIRA ARTE."
  display: ['clamp(32px, 4vw, 58px)', { lineHeight: '1.05', letterSpacing: '-0.025em' }], // "ENTRE EM CONTATO"
  h1: ['clamp(30px, 3.4vw, 46px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // títulos de seção
  h2: ['46px', { lineHeight: '1', letterSpacing: '0.04em' }], // iniciais "NM" dos cards de membro
  h3: ['22px', { lineHeight: '1.25', letterSpacing: '-0.01em' }], // títulos de card
  h4: ['26px', { lineHeight: '1.45', letterSpacing: '-0.01em' }], // lead do "sobre"
  h5: ['15px', { lineHeight: '1.4', letterSpacing: '0' }], // nomes de card/membro
  lead: ['18px', { lineHeight: '1.6', letterSpacing: '0' }], // parágrafo do hero
  'body-lg': ['16px', { lineHeight: '1.7', letterSpacing: '0' }], // intros de seção
  body: ['14px', { lineHeight: '1.6', letterSpacing: '0' }], // parágrafos/cards
  'body-sm': ['13px', { lineHeight: '1.55', letterSpacing: '0' }], // apoio
  label: ['13px', { lineHeight: '1.4', letterSpacing: '0.08em' }], // nav, botões, meta (mono)
  'label-sm': ['11px', { lineHeight: '1.4', letterSpacing: '0.1em' }], // meta menor
  caption: ['10.5px', { lineHeight: '1.35', letterSpacing: '0.12em' }], // rótulos da barra técnica
  micro: ['10px', { lineHeight: '1.3', letterSpacing: '0.06em' }], // traduções pequenas (ART/SCIENCE…)
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
  3.5: '14px', // gap entre cards (dc)
  4: '16px',
  5: '20px',
  6: '24px',
  7.5: '30px', // padding lateral do container (dc)
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  27.5: '110px', // padding vertical da seção Contato (dc)
  30: '120px', // padding vertical das seções (dc)
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
