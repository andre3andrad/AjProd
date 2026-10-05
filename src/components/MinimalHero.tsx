'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function MinimalHero() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for subtle 3D tilt / parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

// Connected 3D Honeycomb Canvas Animation (All connected, expanding from "get in touch" across hero)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let waveRadius = 0;
    let globalFade = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Hexagon tessellation dimensions (Flat-topped honeycomb)
    const R = 38; // Radius of each hexagon
    const deltaX = 1.5 * R; // 57px between column centers
    const deltaY = Math.sqrt(3) * R; // ~65.8px between row centers
    const UNIFORM_HEIGHT = 16; // Uniform minimalist 3D height for all hexagons

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const maxRadius = Math.hypot(cx, cy) + 160;

      // Expand slowly when hovered; smoothly contract/fade when not hovered
      if (isHovered) {
        // Slow, majestic expansion: takes ~4-5 seconds to gently sweep across the screen
        waveRadius += (maxRadius - waveRadius) * 0.014 + 0.65;
        globalFade = Math.min(1, globalFade + 0.025);
      } else {
        waveRadius += (0 - waveRadius) * 0.035;
        globalFade = Math.max(0, globalFade - 0.03);
      }

      if (globalFade <= 0.001 || waveRadius <= 2) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Compute grid range
      const minCol = Math.floor(-R / deltaX) - 2;
      const maxCol = Math.ceil((w + R) / deltaX) + 2;
      const minRow = Math.floor(-R / deltaY) - 2;
      const maxRow = Math.ceil((h + R) / deltaY) + 2;

      // Collect all visible cells and sort them by row ascending (for proper 3D isometric occlusion)
      interface Cell {
        hx: number;
        hy: number;
        progress: number;
      }

      const visibleCells: Cell[] = [];
      const edgeWidth = 140; // Soft leading edge for the wave

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const hx = c * deltaX;
          const hy = r * deltaY + (c % 2 !== 0 ? deltaY / 2 : 0);

          const dist = Math.hypot(hx - cx, hy - cy);

          // If wave hasn't reached this cell yet, skip
          if (dist > waveRadius) continue;

          // Wave progress: 0 when just reached, 1 when fully emerged
          const p = Math.min(1, (waveRadius - dist) / edgeWidth);
          // Smoothstep
          const smoothP = p * p * (3 - 2 * p);

          visibleCells.push({
            hx,
            hy,
            progress: smoothP,
          });
        }
      }

      // Sort by row (hy) ascending: top rows first, bottom rows last
      // This creates authentic 3D overlap where lower cells cleanly sit in front of higher cells
      visibleCells.sort((a, b) => a.hy - b.hy);

      // Render each cell with single unified minimalist dark grey palette
      for (let i = 0; i < visibleCells.length; i++) {
        const cell = visibleCells[i];
        const scale = cell.progress;
        if (scale < 0.05) continue;

        const cellR = R * scale;
        const elevation = UNIFORM_HEIGHT * scale;
        const cellAlpha = cell.progress * globalFade;

        ctx.save();
        ctx.globalAlpha = Math.min(1, cellAlpha * 0.94);

        const x = cell.hx;
        const y = cell.hy;

        // Flat-topped hexagon top vertices
        const topPts: [number, number][] = [];
        const botPts: [number, number][] = [];

        for (let pt = 0; pt < 6; pt++) {
          const angle = (pt * Math.PI) / 3;
          const px = x + cellR * Math.cos(angle);
          const py = y + cellR * Math.sin(angle);
          topPts.push([px, py]);
          botPts.push([px, py + elevation]);
        }

        // Draw 3 downward-facing side faces (uniform dark grey isometric lighting)
        const drawSideQuad = (i1: number, i2: number, fillColor: string) => {
          ctx.beginPath();
          ctx.moveTo(topPts[i1][0], topPts[i1][1]);
          ctx.lineTo(topPts[i2][0], topPts[i2][1]);
          ctx.lineTo(botPts[i2][0], botPts[i2][1]);
          ctx.lineTo(botPts[i1][0], botPts[i1][1]);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        };

        // Uniform luxury dark grey sides
        drawSideQuad(1, 0, '#15171d'); // Front-right shadow
        drawSideQuad(2, 1, '#0e1014'); // Front-bottom darkest shadow
        drawSideQuad(3, 2, '#191c22'); // Front-left shadow

        // Draw Top Hexagon Face with uniform sleek dark grey gradient
        ctx.beginPath();
        ctx.moveTo(topPts[0][0], topPts[0][1]);
        for (let pt = 1; pt < 6; pt++) {
          ctx.lineTo(topPts[pt][0], topPts[pt][1]);
        }
        ctx.closePath();

        const grad = ctx.createLinearGradient(x - cellR, y - cellR, x + cellR, y + cellR);
        grad.addColorStop(0, '#272b33');
        grad.addColorStop(1, '#1b1d23');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.6;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-[#15171B] select-none"
    >
      {/* Canvas for Connected 3D Dark Grey Honeycomb Grid expanding from center */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.015] rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#15171B_90%)]" />
      </div>

      {/* Main Interactive Center Target */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-20 flex items-center justify-center cursor-pointer"
      >
        <a
          href="#final-cta"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center p-12 md:p-16 rounded-full group focus:outline-none"
          aria-label="AJ. — get in touch"
        >
          {/* AJ. Logo Letters with Falling Physics Animation */}
          <motion.div
            animate={{
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 0.8 : 1,
              filter: isHovered ? 'blur(10px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex items-baseline font-archivo font-black text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12rem] tracking-tighter leading-none select-none"
          >
            {/* Letter 'A' falling from top */}
            <motion.span
              initial={{ y: -450, opacity: 0, rotate: -8 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                damping: 12,
                stiffness: 110,
                mass: 1.1,
                delay: 0.2,
              }}
              className="text-[#E8B04B] inline-block drop-shadow-[0_15px_35px_rgba(232,176,75,0.35)]"
            >
              A
            </motion.span>

            {/* Letter 'J' falling right after */}
            <motion.span
              initial={{ y: -480, opacity: 0, rotate: 10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                damping: 12,
                stiffness: 110,
                mass: 1.1,
                delay: 0.48,
              }}
              className="text-[#E8B04B] inline-block drop-shadow-[0_15px_35px_rgba(232,176,75,0.35)] -ml-1 sm:-ml-2"
            >
              J
            </motion.span>

            {/* White square dot '.' falling right after */}
            <motion.span
              initial={{ y: -380, opacity: 0, scale: 0.3 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 14,
                stiffness: 130,
                delay: 0.75,
              }}
              className="inline-block bg-[#F4F2ED] w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-1.5 sm:ml-2.5 mb-2 sm:mb-3 md:mb-5 lg:mb-6 rounded-[2px] shadow-[0_0_20px_rgba(244,242,237,0.6)]"
            />
          </motion.div>

          {/* Pure "get in touch" Text (Refined smaller size, no box, no arrow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.9,
              filter: isHovered ? 'blur(0px)' : 'blur(6px)',
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="px-5 py-2.5 rounded-full bg-[#15171B]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
              <span className="font-archivo font-bold text-sm sm:text-base md:text-lg tracking-[0.28em] text-[#F4F2ED] group-hover:text-[#E8B04B] transition-colors duration-300 uppercase whitespace-nowrap">
                get in touch
              </span>
            </div>
          </motion.div>
        </a>
      </motion.div>

      {/* Corner Details (meinhardtaxer style) */}
      {/* Bottom Left: Studio Tagline */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-6 lg:left-12 z-20 pointer-events-none max-w-xs"
      >
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F4F2ED]/50 leading-relaxed">
          Audiovisual &amp; Creative Studio
        </p>
        <p className="text-[10px] font-mono tracking-wider text-[#E8B04B]/70 uppercase mt-0.5">
          São Paulo • Worldwide
        </p>
      </motion.div>

      {/* Bottom Right: Minimal Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 right-6 lg:right-12 z-20 pointer-events-none flex items-center gap-3"
      >
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F4F2ED]/50">
          scroll
        </span>
        <div className="w-[1px] h-7 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [-28, 28] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#E8B04B]"
          />
        </div>
      </motion.div>
    </section>
  );
}
