/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * URL base da API do laboratório (ex.: `.../api/v2`).
   * Valor secreto: definido em `.env.local` localmente e como secret em
   * CI/deploy — nunca versionado. Ver `.env.template`.
   */
  readonly VITE_API_BASE_URL: string;
  /**
   * Chave da API do laboratório, enviada como header `X-API-KEY`.
   * ATENÇÃO: toda env `VITE_*` é embutida no bundle servido ao browser — este
   * valor é legível por qualquer visitante. Ver ARCHITECTURE/PRD.
   */
  readonly VITE_MEMBER_FETCH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
