import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scroll-reveal do protótipo do design: o bloco entra com fade + leve
 * deslocamento vertical quando fica visível (IntersectionObserver).
 * `prefers-reduced-motion` desativa tudo via CSS (ver index.css).
 */
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

export default Reveal;
