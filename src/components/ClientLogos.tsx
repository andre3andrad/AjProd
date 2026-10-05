'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const clientLogos = [
  { 
    id: 'marena', 
    src: '/images/logo-marena.png', 
    alt: 'Marena Odontologia', 
    className: 'h-16 md:h-20 scale-125',
    url: 'https://marenaodontologia.com.br'
  },
  { 
    id: 'jagb', 
    src: '/images/logo-jagb.png', 
    alt: 'JAGB', 
    className: 'h-10 md:h-13',
    url: 'https://jagb.com.br/'
  },
  { 
    id: 'londoncafe', 
    src: '/images/logo-londoncafe.png', 
    alt: 'London Café', 
    className: 'h-9 md:h-12',
    url: 'https://www.londoncoffeestation.com.br'
  },
];

// Repeat 6 times so each half has 18 items, ensuring zero blank space on any screen size (including 2560px and 4K)
const repeatedLogos = [
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
];

export default function ClientLogos() {
  const t = useTranslations('Clients');

  return (
    <section id="clients" className="w-full bg-[#15171B] text-[#F4F2ED] py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#E8B04B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 text-center mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#E8B04B] font-bold tracking-widest text-sm uppercase mb-4">
            {t('subtitle')}
          </p>
          <h2 className="font-archivo font-black text-5xl md:text-7xl uppercase tracking-tighter">
            {t('title')}
          </h2>
        </motion.div>
      </div>

      {/* Marquee Track with gradient fades */}
      <div className="relative w-full overflow-hidden flex py-8 border-y border-white/5 bg-white/[0.01]">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 w-32 md:w-56 h-full bg-gradient-to-r from-[#15171B] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-56 h-full bg-gradient-to-l from-[#15171B] to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* First Set */}
          <div className="flex shrink-0 items-center gap-16 md:gap-24 pr-16 md:pr-24">
            {repeatedLogos.map((logo, idx) => (
              <a
                key={`set1-${logo.id}-${idx}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visitar site de ${logo.alt}`}
                className="flex items-center justify-center shrink-0 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B04B] rounded-2xl p-2 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.className} object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 brightness-0 invert filter drop-shadow-[0_0_12px_rgba(232,176,75,0)] group-hover:drop-shadow-[0_0_16px_rgba(232,176,75,0.4)]`}
                />
              </a>
            ))}
          </div>

          {/* Second Set (Exact duplicate for seamless infinite loop) */}
          <div className="flex shrink-0 items-center gap-16 md:gap-24 pr-16 md:pr-24" aria-hidden="true">
            {repeatedLogos.map((logo, idx) => (
              <a
                key={`set2-${logo.id}-${idx}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visitar site de ${logo.alt}`}
                className="flex items-center justify-center shrink-0 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B04B] rounded-2xl p-2 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.className} object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 brightness-0 invert filter drop-shadow-[0_0_12px_rgba(232,176,75,0)] group-hover:drop-shadow-[0_0_16px_rgba(232,176,75,0.4)]`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



