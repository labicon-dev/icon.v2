import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

import { validateEnv } from './src/config/env.ts';

/**
 * Plugin que valida as variáveis de ambiente obrigatórias no boot.
 *
 * Roda no `config` tanto do dev server quanto do `build`, então o processo
 * falha rápido (com erro claro) antes de servir/gerar qualquer coisa se
 * faltar env obrigatória. Fonte única das chaves: `src/config/env.ts`.
 */
function requiredEnvValidation(): Plugin {
  return {
    name: 'icon-required-env-validation',
    config(_config, { mode }) {
      // Carrega as envs `VITE_*` do `.env*` e de `process.env` para o modo atual.
      const env = loadEnv(mode, process.cwd());
      validateEnv(env);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [requiredEnvValidation(), react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
