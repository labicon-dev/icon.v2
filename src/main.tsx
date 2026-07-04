import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { validateEnv } from './config/env.ts';

// Falha rápido no boot: se faltar env obrigatória, o app não renderiza.
validateEnv(import.meta.env);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
