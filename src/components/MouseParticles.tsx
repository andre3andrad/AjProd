'use client';
import { useEffect, useRef } from 'react';

export default function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const lastSpawn = { x: -1000, y: -1000 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const dx = event.clientX - lastSpawn.x;
      const dy = event.clientY - lastSpawn.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Emite apenas 1 partícula quando o mouse se desloca significativamente (evita acumular em um ponto)
      if (distance > 24) {
        if (particlesArray.length < 20) {
          particlesArray.push(new Particle(event.clientX, event.clientY));
        } else {
          // Remove a mais antiga se passar do limite máximo
          particlesArray.shift();
          particlesArray.push(new Particle(event.clientX, event.clientY));
        }
        lastSpawn.x = event.clientX;
        lastSpawn.y = event.clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      decay: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.3 + 0.7;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.025; // Desaparece rápido e suave
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size = Math.max(0, this.size - 0.012);
      }

      draw() {
        if (!ctx || this.life <= 0) return;
        ctx.fillStyle = `rgba(232, 176, 75, ${this.life * 0.55})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawLines() {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 45) {
            const alpha = (1 - distance / 45) * Math.min(particlesArray[i].life, particlesArray[j].life) * 0.2;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(232, 176, 75, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx!.stroke();
            ctx!.closePath();
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.1) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    }

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 w-full h-full pointer-events-none mix-blend-screen opacity-50"
    />
  );
}

