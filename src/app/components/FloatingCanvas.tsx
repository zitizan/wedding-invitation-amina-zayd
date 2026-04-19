import { useEffect, useRef } from 'react';

interface Petal {
  x: number; y: number; size: number; color: string;
  speedY: number; speedX: number; rotation: number;
  rotationSpeed: number; opacity: number; angle: number;
}

interface Sparkle {
  x: number; y: number; size: number; alpha: number;
  life: number; maxLife: number; color: string;
}

interface Butterfly {
  x: number; y: number; size: number; phase: number;
  speed: number; dirX: number; dirY: number; color: string;
  wingPhase: number;
}

const PETAL_COLORS = [
  '#F4B8C8', '#C5A8D4', '#FCCBA8', '#A8CEE8',
  '#F8E4A0', '#A8DCC8', '#F2A0B8', '#D4B8E8',
];
const SPARKLE_COLORS = ['#D4AF6A', '#F0D080', '#FFF5CC', '#FFE0CC'];
const BUTTERFLY_COLORS = ['#F4B8C8', '#C5A8D4', '#A8DCC8', '#FCCBA8'];

export function FloatingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals: Petal[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 9 + 5,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      speedY: Math.random() * 0.7 + 0.25,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      opacity: Math.random() * 0.5 + 0.3,
      angle: Math.random() * Math.PI * 2,
    }));

    const sparkles: Sparkle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 1,
      alpha: 0,
      life: Math.random() * 120,
      maxLife: Math.random() * 80 + 60,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
    }));

    const butterflies: Butterfly[] = Array.from({ length: 5 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.6),
      size: Math.random() * 14 + 10,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.25 + 0.12,
      dirX: Math.random() > 0.5 ? 1 : -1,
      dirY: (Math.random() - 0.5) * 0.4,
      color: BUTTERFLY_COLORS[Math.floor(Math.random() * BUTTERFLY_COLORS.length)],
      wingPhase: Math.random() * Math.PI * 2,
    }));

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;
      ctx.fillStyle = petal.color;
      ctx.shadowColor = petal.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size * 0.55, petal.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (sp: Sparkle) => {
      ctx.save();
      ctx.translate(sp.x, sp.y);
      ctx.globalAlpha = sp.alpha;
      ctx.fillStyle = sp.color;
      ctx.shadowColor = sp.color;
      ctx.shadowBlur = 6;
      const s = sp.size;
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
          Math.cos(a + Math.PI / 4) * s * 0.7,
          Math.sin(a + Math.PI / 4) * s * 0.7,
          Math.cos(a) * s * 3.5,
          Math.sin(a) * s * 3.5
        );
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawButterfly = (bf: Butterfly, time: number) => {
      ctx.save();
      ctx.translate(bf.x, bf.y);
      const flap = Math.sin(time * 0.06 + bf.wingPhase);
      ctx.globalAlpha = 0.55;

      // Left wing
      ctx.save();
      ctx.scale(flap, 1);
      ctx.fillStyle = bf.color;
      ctx.shadowColor = bf.color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.ellipse(-bf.size * 0.55, -bf.size * 0.2, bf.size * 0.55, bf.size * 0.3, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-bf.size * 0.4, bf.size * 0.15, bf.size * 0.35, bf.size * 0.2, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right wing
      ctx.save();
      ctx.scale(-flap, 1);
      ctx.fillStyle = bf.color;
      ctx.beginPath();
      ctx.ellipse(-bf.size * 0.55, -bf.size * 0.2, bf.size * 0.55, bf.size * 0.3, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-bf.size * 0.4, bf.size * 0.15, bf.size * 0.35, bf.size * 0.2, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Body
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = '#8B4A6B';
      ctx.beginPath();
      ctx.ellipse(0, 0, bf.size * 0.08, bf.size * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let animFrame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.012 + p.angle) * 0.35;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + 30) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        drawPetal(p);
      });

      sparkles.forEach(sp => {
        sp.life += 1;
        if (sp.life > sp.maxLife) {
          sp.life = 0;
          sp.x = Math.random() * canvas.width;
          sp.y = Math.random() * canvas.height;
          sp.maxLife = Math.random() * 80 + 60;
        }
        sp.alpha = Math.sin((sp.life / sp.maxLife) * Math.PI) * 0.85;
        drawSparkle(sp);
      });

      butterflies.forEach(bf => {
        bf.phase += bf.speed * 0.018;
        bf.x += Math.cos(bf.phase) * bf.speed * 1.5 * bf.dirX;
        bf.y += Math.sin(bf.phase * 0.6) * bf.speed * 0.8 + bf.dirY;
        if (bf.x < -60) { bf.x = canvas.width + 60; }
        if (bf.x > canvas.width + 60) { bf.x = -60; }
        if (bf.y < -60) { bf.y = window.innerHeight * 0.7; }
        if (bf.y > window.innerHeight * 0.8) { bf.y = 30; }
        drawButterfly(bf, time);
      });

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        width: '100%',
        height: '100%',
      }}
    />
  );
}