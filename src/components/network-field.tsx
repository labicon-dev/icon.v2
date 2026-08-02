import { useEffect, useRef } from 'react';

interface NetworkFieldProps {
  /** Cor de fundo (também usada no rastro/trail). */
  bg?: string;
  /** Cor das linhas/nós neutros. */
  line?: string;
  /** Cor dos nós/ligações de destaque. */
  accent?: string;
  /** Largura ÷ density = quantidade de nós (40–220). */
  density?: number;
  /** Opacidade do "apagador" por frame — menor = rastro mais longo. */
  trail?: number;
  /** Fração de nós na cor de destaque. */
  accentRatio?: number;
  className?: string;
}

interface Unit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  accent: boolean;
}

function toRGB(c: string): [number, number, number] {
  if (c[0] === '#') {
    const h = c.slice(1);
    const n =
      h.length === 3
        ? h
            .split('')
            .map((x) => x + x)
            .join('')
        : h;
    return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
  }
  return [108, 108, 120];
}

/**
 * Campo de partículas do hero (ICO-61) — port em React do sketch original
 * do ICON (Francisco Barretto; port p5 de Eduardo Monteiro; versão canvas
 * vanilla do protótipo do Claude Design): nós derivam suavemente, caem,
 * conectam-se quando próximos e são repelidos pelo cursor, com rastro.
 *
 * Com `prefers-reduced-motion`, desenha um único frame estático.
 */
function NetworkField({
  bg = '#040205',
  line = '#74747f',
  accent = '#FCD100',
  density = 11,
  trail = 0.16,
  accentRatio = 0.1,
  className = '',
}: NetworkFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lineRGB = toRGB(line);
    const accRGB = toRGB(accent);
    const bgRGB = toRGB(bg);
    const LINK_MIN = 78;
    const LINK_MAX = 150;
    const MAX_OPACITY = 0.55;

    let width = 0;
    let height = 0;
    let units: Unit[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    function spawn(y: number | null): Unit {
      return {
        x: Math.random() * width,
        y: y == null ? -10 : y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.45 + 0.18,
        accent: Math.random() < accentRatio,
      };
    }

    function seed() {
      const max = Math.round(Math.min(220, Math.max(40, width / density)));
      units = Array.from({ length: max }, () => spawn(Math.random() * height));
    }

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || 800;
      height = canvas.clientHeight || 600;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reducedMotion) staticFrame();
    }

    function step() {
      const repelR = Math.max(120, width / 9);
      for (let i = units.length - 1; i >= 0; i--) {
        const p = units[i];
        p.vx += (Math.random() - 0.5) * 0.06;
        p.vy += (Math.random() - 0.5) * 0.05;
        p.vx = Math.max(-0.8, Math.min(0.8, p.vx));
        p.vy = Math.max(-0.2, Math.min(0.9, p.vy));
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < repelR && d > 0.001) {
            const f = (1 - d / repelR) * 2.4;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > height + 2 || p.y < -12 || p.x < -12 || p.x > width + 12) {
          units[i] = spawn(p.y > height ? -10 : null);
        }
      }
    }

    function paint(clearAlpha: number) {
      if (!ctx) return;
      ctx.fillStyle = `rgba(${bgRGB[0]},${bgRGB[1]},${bgRGB[2]},${clearAlpha})`;
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (let i = 0; i < units.length; i++) {
        const a = units[i];
        for (let j = i + 1; j < units.length; j++) {
          const b = units[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > LINK_MIN && d < LINK_MAX) {
            const t = 1 - (d - LINK_MIN) / (LINK_MAX - LINK_MIN);
            const acc = a.accent && b.accent;
            const c = acc ? accRGB : lineRGB;
            const alpha = (t * MAX_OPACITY * (acc ? 0.95 : 1)).toFixed(3);
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of units) {
        ctx.fillStyle = p.accent ? accent : `rgba(${lineRGB[0]},${lineRGB[1]},${lineRGB[2]},0.5)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.accent ? 1.7 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function staticFrame() {
      paint(1);
    }

    function frame() {
      step();
      paint(trail);
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (!reducedMotion) {
      window.addEventListener('pointermove', onMove, { passive: true });
      canvas.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [bg, line, accent, density, trail, accentRatio]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={`block size-full ${className}`.trim()} />
  );
}

export default NetworkField;
