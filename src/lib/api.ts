/**
 * Client HTTP genérico para a API do laboratório ICON.
 *
 * A URL base é lida SEMPRE de `import.meta.env.VITE_API_BASE_URL` — nunca
 * hardcoded. O valor real é secreto e mora em `.env.local` (local) ou nos
 * secrets de CI/deploy. Ver `.env.template` e o README.
 *
 * Este módulo cobre apenas o endpoint confirmado hoje (`/member/all`).
 * Publicações e projetos ainda não têm endpoint confirmado e serão adicionados
 * quando forem definidos (M3).
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

/**
 * Membro do laboratório retornado por `/member/all`.
 *
 * O contrato ainda não foi formalizado pelo time; os campos abaixo são
 * provisórios e devem ser ajustados quando o schema for confirmado (M3).
 */
export interface Member {
  id: string | number;
  name: string;
  role?: string;
  [key: string]: unknown;
}

function getBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      'VITE_API_BASE_URL não configurada. Copie `.env.template` para `.env.local` ' +
        'e preencha o valor (ver README). O boot valida isso via `src/config/env.ts`.',
    );
  }
  // Remove barra final para evitar `//` ao concatenar com o path.
  return baseUrl.replace(/\/+$/, '');
}

/**
 * Faz uma requisição à API do laboratório e devolve o JSON tipado.
 * Uso interno — os métodos públicos abaixo encapsulam cada endpoint.
 */
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
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

/** Busca todos os membros do laboratório (`GET /member/all`). */
export function getAllMembers(): Promise<Member[]> {
  return apiFetch<Member[]>('/member/all');
}
