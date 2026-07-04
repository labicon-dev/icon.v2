import type { Config } from 'tailwindcss';
import { tailwindTheme } from './src/styles/design-tokens';

/**
 * Tailwind CSS (v4) — configuração do site do ICON.
 *
 * A fonte de verdade dos tokens é `src/styles/design-tokens.ts` (extraídos em
 * ICO-8). Reaproveitamos o objeto `tailwindTheme` (formato `theme.extend`) aqui
 * para não duplicar valores. Este arquivo é carregado pelo CSS via a diretiva
 * `@config` em `src/index.css`.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: tailwindTheme,
} satisfies Config;
