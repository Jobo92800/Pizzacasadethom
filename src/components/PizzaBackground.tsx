import { useEffect, useRef, useState } from 'react';

interface Source {
  url: string;
  label: string;
  size: [number, number];
  shape: string;
  img?: HTMLImageElement | null;
}

interface Particle {
  src: Source;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rot: number;
  rotV: number;
  opacity: number;
  wobble: number;
  wobbleA: number;
  wobbleS: number;
}

export default function PizzaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const SOURCES: Source[] = [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Salad_garden_tomato.jpg/400px-Salad_garden_tomato.jpg', label: 'Tomate', size: [48, 72], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Green_olives.jpg/400px-Green_olives.jpg', label: 'Olive verte', size: [30, 46], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Black_olives.jpg/400px-Black_olives.jpg', label: 'Olive noire', size: [28, 44], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Mushroom_2009_G1.jpg/400px-Mushroom_2009_G1.jpg', label: 'Champignon', size: [46, 68], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Red_bell_pepper.jpg/400px-Red_bell_pepper.jpg', label: 'Poivron', size: [44, 66], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenBasil.jpg/400px-GoldenBasil.jpg', label: 'Basilic', size: [50, 70], shape: 'leaf' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Garlic-1.jpg/400px-Garlic-1.jpg', label: 'Ail', size: [38, 58], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mozzarella_cheese.jpg/400px-Mozzarella_cheese.jpg', label: 'Mozzarella', size: [50, 72], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Salami_aka.jpg/400px-Salami_aka.jpg', label: 'Pepperoni', size: [44, 66], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/400px-Eq_it-na_pizza-margherita_sep2005_sml.jpg', label: 'Pizza', size: [72, 90], shape: 'pizza' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Tomate_-_Solanum_lycopersicum.jpg/400px-Tomate_-_Solanum_lycopersicum.jpg', label: 'Tomate cerise', size: [32, 50], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Red_chili_pepper.jpg/400px-Red_chili_pepper.jpg', label: 'Piment', size: [32, 54], shape: 'circle' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sardines_2.jpg/400px-Sardines_2.jpg', label: 'Anchois', size: [50, 66], shape: 'circle' },
    ];

    const particles: Particle[] = [];
    const COUNT = 50;

    let loadedCount = 0;

    const preload = (sources: Source[], onDone: () => void) => {
      sources.forEach((src) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          src.img = img;
          loadedCount++;
          setLoadProgress((loadedCount / sources.length) * 100);
          if (loadedCount === sources.length) {
            setTimeout(() => {
              setIsLoaded(true);
              onDone();
            }, 300);
          }
        };
        img.onerror = () => {
          src.img = null;
          loadedCount++;
          setLoadProgress((loadedCount / sources.length) * 100);
          if (loadedCount === sources.length) {
            setTimeout(() => {
              setIsLoaded(true);
              onDone();
            }, 300);
          }
        };
        img.src = src.url;
      });
    };

    const randomSrc = (): Source => {
      const valid = SOURCES.filter(s => s.img);
      if (!valid.length) return SOURCES[0];
      return valid[Math.floor(Math.random() * valid.length)];
    };

    const createParticle = (initial = false): Particle => {
      const src = randomSrc();
      const sMin = src.size[0], sMax = src.size[1];
      const size = sMin + Math.random() * (sMax - sMin);
      return {
        src,
        x: Math.random() * canvas.width,
        y: initial ? Math.random() * canvas.height : -size * 1.5,
        size,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0.5 + Math.random() * 1.6,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.03,
        opacity: 0.72 + Math.random() * 0.28,
        wobble: Math.random() * Math.PI * 2,
        wobbleA: 0.3 + Math.random() * 0.5,
        wobbleS: 0.015 + Math.random() * 0.02,
      };
    };

    const drawParticle = (p: Particle) => {
      if (!p.src.img) return;

      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity;

      ctx.shadowColor = 'rgba(0,0,0,0.55)';
      ctx.shadowBlur = s * 0.25;
      ctx.shadowOffsetX = s * 0.06;
      ctx.shadowOffsetY = s * 0.1;

      const shape = p.src.shape;

      if (shape === 'circle' || !shape) {
        ctx.beginPath();
        ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(p.src.img, -s / 2, -s / 2, s, s);
      } else if (shape === 'leaf') {
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.38, s / 2, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(p.src.img, -s * 0.4, -s / 2, s * 0.8, s);
      } else if (shape === 'pizza') {
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.55);
        ctx.lineTo(s * 0.48, s * 0.45);
        ctx.lineTo(-s * 0.48, s * 0.45);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(p.src.img, -s * 0.5, -s * 0.55, s, s);
      } else {
        ctx.beginPath();
        ctx.roundRect(-s * 0.45, -s * 0.45, s * 0.9, s * 0.9, s * 0.15);
        ctx.clip();
        ctx.drawImage(p.src.img, -s * 0.5, -s * 0.5, s, s);
      }

      ctx.restore();

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity * 0.12;
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.52, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,240,200,1)';
      ctx.fill();
      ctx.restore();
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(p.wobble) * p.wobbleA;
        p.y += p.vy;
        p.rot += p.rotV;
        p.wobble += p.wobbleS;

        if (p.y > canvas.height + p.size * 1.5) {
          particles[i] = createParticle(false);
          continue;
        }

        drawParticle(p);
      }

      animationId = requestAnimationFrame(animate);
    };

    preload(SOURCES, () => {
      for (let i = 0; i < COUNT; i++) particles.push(createParticle(true));
      animate();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1F110C] z-50 gap-5">
          <div className="text-6xl animate-spin">🍕</div>
          <p className="text-[#D7AA65] text-sm tracking-[3px] uppercase">
            Chargement des ingrédients…
          </p>
          <div className="w-52 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D7AA65] to-[#641208] rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s' }}
      />
    </>
  );
}
