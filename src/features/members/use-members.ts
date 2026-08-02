import { useEffect, useState } from 'react';
import { getAllMembers } from './api';
import type { Member } from './types';

/**
 * Embaralha uma cópia da lista (Fisher-Yates).
 *
 * A ordem aleatória é decisão de produto — a equipe não é hierarquizada
 * visualmente. `sort(() => Math.random() - 0.5)`, usado antes, produz
 * distribuição enviesada porque o comparador é inconsistente.
 */
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j] as T, result[i] as T];
  }
  return result;
}

export interface UseMembersResult {
  members: Member[];
  loading: boolean;
  error: Error | null;
}

/** Membros ativos no site, em ordem aleatória a cada carregamento. */
export function useMembers(): UseMembersResult {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await getAllMembers();
        if (!active) return;
        setMembers(shuffle(response.filter((member) => member.activeOnWebsite)));
      } catch (cause: unknown) {
        if (!active) return;
        setError(cause instanceof Error ? cause : new Error(String(cause)));
        console.error(cause);
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    // Evita setState depois da desmontagem (StrictMode monta duas vezes em dev).
    return () => {
      active = false;
    };
  }, []);

  return { members, loading, error };
}
