/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * URL base da API do laboratório.
   */
  readonly VITE_API_BASE_URL: string;
  /**
   * Chave da API do laboratório, enviada como header `X-API-KEY`.
   */
  readonly VITE_MEMBER_FETCH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
