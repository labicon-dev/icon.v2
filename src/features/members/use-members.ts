import { useEffect, useState } from 'react';
import { getAllMembers } from './api';
import type { Member } from './types';

// Embaralha uma cópia da lista de membros (Fisher-Yates).
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
      } catch (e: unknown) {
        if (!active) return;
        setError(e instanceof Error ? e : new Error(String(e)));
        console.error(e);
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
