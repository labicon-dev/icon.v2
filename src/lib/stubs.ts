/**
 * Stubs de publicações e projetos.
 *
 * Os endpoints reais para publicações e projetos ainda NÃO foram confirmados
 * pelo time. Enquanto isso, este módulo devolve listas vazias com as mesmas
 * assinaturas assíncronas que o client real terá — assim, no M3, basta trocar
 * a implementação por chamadas via `./api.ts` sem mexer em quem consome.
 *
 * Mantido isolado do client real (`./api.ts`) de propósito: nada aqui faz
 * requisição de rede.
 */

/** Publicação do laboratório. Contrato provisório (endpoint não confirmado). */
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue?: string;
  url?: string;
}

/** Projeto do laboratório. Contrato provisório (endpoint não confirmado). */
export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
}

/** Stub de `getAllPublications` — substituir por chamada real no M3. */
export function getAllPublications(): Promise<Publication[]> {
  return Promise.resolve([]);
}

/** Stub de `getAllProjects` — substituir por chamada real no M3. */
export function getAllProjects(): Promise<Project[]> {
  return Promise.resolve([]);
}
