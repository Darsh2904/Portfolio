import { useEffect, useRef } from 'react';

const CODE_CHARS = '01{}[]()<>=!;const let function return import export async await class extends=>'.split('');

const CodeRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const cols = Math.floor(window.innerWidth / 18);
    const drops = Array(cols).fill(0).map(() => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = 'rgba(3,7,18,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00f5ff';
      ctx.font = '11px JetBrains Mono, monospace';
      drops.forEach((y, i) => {
        const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        ctx.fillText(char, i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.97) drops[i] = 0;
        else drops[i]++;
      });
    };

    const interval = setInterval(draw, 70);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.12 }}
    />
  );
};

export default CodeRain;
