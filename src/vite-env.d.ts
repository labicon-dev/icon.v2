/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * URL base da API do laboratório (ex.: `.../api/v2`).
   * Valor secreto: definido em `.env.local` localmente e como secret em
   * CI/deploy — nunca versionado. Ver `.env.template`.
   */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
