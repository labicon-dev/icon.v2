import { useEffect, useState } from 'react';

/**
 * Relógio do laboratório (Salvador — America/Bahia, UTC-3).
 *
 * Existia em três cópias independentes — hero, seção Ao Vivo e rodapé — duas
 * delas chamadas `useLabClock` com implementações diferentes.
 */

const LAB_TIME_FORMAT = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Bahia',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function formatLabTime(date: Date): string {
  return LAB_TIME_FORMAT.format(date);
}

/**
 * Hora corrente do laboratório, atualizada a cada segundo.
 *
 * `date` serve ao atributo `dateTime` do `<time>`; `label` é o texto exibido.
 * O primeiro valor é calculado de forma síncrona — a versão do rodapé começava
 * como string vazia e piscava no primeiro segundo.
 */
export function useLabClock(): { date: Date; label: string } {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return { date, label: formatLabTime(date) };
}
