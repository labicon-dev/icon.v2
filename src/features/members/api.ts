import { apiFetch } from '../../lib/api';
import type { Member } from './types';

/**
 * Membro como retornado por `GET /member/all`, com os campos que a API expõe
 * além do que a UI consome. O contrato ainda não foi formalizado pelo time.
 */
export interface MemberResponse extends Member {
  email?: string;
  githubProfile?: string;
  user?: Record<string, unknown>;
  activeOnWebsite: boolean;
}

/** Busca todos os membros do laboratório (`GET /member/all`). */
export function getAllMembers(): Promise<MemberResponse[]> {
  return apiFetch<MemberResponse[]>('/member/all', {
    headers: {
      'X-API-KEY': import.meta.env.VITE_MEMBER_FETCH_TOKEN,
    },
  });
}
