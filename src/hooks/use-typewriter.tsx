import { useEffect, useRef, useState } from 'react';

function useTypewriter(phrases: readonly string[]) {
  const [typed, setTyped] = useState('');
  const stateRef = useRef({ phrase: 0, chars: 0, dir: 1 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(phrases[0]);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = stateRef.current;
      const word = phrases[s.phrase];
      s.chars += s.dir;
      setTyped(word.slice(0, s.chars));
      let delay = s.dir > 0 ? 70 : 36;
      if (s.chars === word.length) {
        s.dir = -1;
        delay = 1500;
      } else if (s.chars === 0) {
        s.dir = 1;
        s.phrase = (s.phrase + 1) % phrases.length;
        delay = 280;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases]);

  return typed;
}

export default useTypewriter;
