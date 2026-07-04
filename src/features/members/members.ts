import type { Member } from './types';

/**
 * Mock com a mesma forma esperada da API do laboratório — os placeholders
 * espelham o frame `quem` do Figma (grid 4×2, iniciais "NM", "Nome do
 * Membro", "ATIVIDADE · ATIVIDADE"). Na M3 (ICO-19) esta lista passa a vir
 * de `src/lib/api.ts` sem mudança na UI.
 */
export const members: Member[] = Array.from({ length: 8 }, (_, index) => ({
  id: `member-${index + 1}`,
  name: 'Nome do Membro',
  initials: 'NM',
  activities: ['Atividade', 'Atividade'],
}));
