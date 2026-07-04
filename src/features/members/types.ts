/** Membro do laboratório, na forma esperada da API do ICON (integração na M3). */
export interface Member {
  id: string;
  /** Nome completo exibido no card. */
  name: string;
  /** Iniciais exibidas no placeholder enquanto não há foto. */
  initials: string;
  /** Atividades/funções no laboratório, exibidas como "ATIVIDADE · ATIVIDADE". */
  activities: string[];
  /** URL da foto (opcional — o card cai para as iniciais quando ausente). */
  photoUrl?: string;
}
