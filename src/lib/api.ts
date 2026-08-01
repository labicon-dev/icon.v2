/**
 * Cliente HTTP genérico para a API do laboratório.
 *
 * Não conhece domínio: cada feature monta seus endpoints em cima de `apiFetch`
 * (ver o `api.ts` de cada feature). A URL base vem de `VITE_API_BASE_URL`.
 */

/** Erro lançado quando a API responde com status fora da faixa 2xx. */
export class ApiError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string, message?: string) {
    super(message ?? `Requisição para ${url} falhou com status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
  }
}

function getBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      'VITE_API_BASE_URL não configurada. Copie `.env.template` para `.env.local` ' +
        'e preencha o valor (ver README).',
    );
  }
  // Remove barra final para evitar `//` ao concatenar com o path.
  return baseUrl.replace(/\/+$/u, '');
}

/** Faz uma requisição à API do laboratório e devolve o JSON tipado. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, url);
  }

  return (await response.json()) as T;
}
