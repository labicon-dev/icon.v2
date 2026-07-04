/**
 * Stubs de publicações e projetos.
 *
 * Os endpoints reais para publicações e projetos ainda NÃO foram confirmados
 * pelo time. Enquanto isso, este módulo devolve dados mockados com as mesmas
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

const PUBLICATIONS_STUB: Publication[] = [
  {
    id: 'pub-1',
    title: 'Publicação de exemplo (stub)',
    authors: ['Autor Exemplo'],
    year: 2025,
    venue: 'Venue de exemplo',
  },
];

const PROJECTS_STUB: Project[] = [
  {
    id: 'proj-1',
    name: 'Projeto de exemplo (stub)',
    description: 'Placeholder até o endpoint real de projetos ser confirmado.',
  },
];

/** Stub de `getAllPublications` — substituir por chamada real no M3. */
export function getAllPublications(): Promise<Publication[]> {
  return Promise.resolve(PUBLICATIONS_STUB);
}

/** Stub de `getAllProjects` — substituir por chamada real no M3. */
export function getAllProjects(): Promise<Project[]> {
  return Promise.resolve(PROJECTS_STUB);
}
