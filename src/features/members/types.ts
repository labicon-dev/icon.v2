/** Membro do laboratório, na forma esperada da API do ICON (integração na M3). */
export interface Member {
  id: number;
  /** Nome completo exibido no card. */
  name: string;
  /** Atividade/função no laboratório, exibida como "ATIVIDADE". */
  activity: string;
  /** URL da foto (opcional — o card cai para as iniciais quando ausente). */
  avatarUrl?: string;
}
