import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Expõe o dev server em 0.0.0.0 para ser acessível de fora do container.
    host: true,
    port: 5173,
    watch: {
      // Polling garante que o file watching funcione em bind mounts do Docker
      // (Docker Desktop no macOS/Windows não propaga eventos inotify de forma confiável).
      usePolling: true,
    },
  },
});
