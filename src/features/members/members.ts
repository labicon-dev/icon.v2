import type { Member } from './types';

/**
 * Mock com a mesma forma esperada da API do laboratório — equipe
 * ILUSTRATIVA do protótipo do design (substituir pelos integrantes reais
 * na M3/ICO-19, quando a lista passa a vir de `src/lib/api.ts` sem mudança
 * na UI).
 */
export const members: Member[] = [
  { id: 'member-1', name: 'Laura Marques', initials: 'LM', activities: ['Pesquisa', 'Coord.'] },
  { id: 'member-2', name: 'Pedro Dias', initials: 'PD', activities: ['Pesquisador'] },
  { id: 'member-3', name: 'Carolina Lima', initials: 'CL', activities: ['Design'] },
  { id: 'member-4', name: 'Rian Souza', initials: 'RS', activities: ['Desenvolvimento'] },
  { id: 'member-5', name: 'Carlos Mendes', initials: 'CM', activities: ['Desenvolvimento'] },
  { id: 'member-6', name: 'Luana de Jesus', initials: 'LJ', activities: ['IA & Dados'] },
  { id: 'member-7', name: 'Kemi Machado', initials: 'KM', activities: ['Arte'] },
  { id: 'member-8', name: 'Eduardo Vargas', initials: 'EV', activities: ['Interação', 'XR'] },
];
