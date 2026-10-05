'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';

function CounterNumber({
  rawString,
  duration = 2,
  delay = 0
}: {
  rawString: string;
  duration?: number;
  delay?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: false, amount: 0.4 });
  const motionVal = useMotionValue(0);

  // Parse prefix, number, and suffix (ex: "+200", "200+", "+50", "50+")
  const match = rawString.match(/^([^\d]*)(\d+)([^\d]*)$/);

  useEffect(() => {
    if (!match) return;
    const target = parseInt(match[2], 10);
    const prefix = match[1] || '';
    const suffix = match[3] || '';

    if (isInView) {
      motionVal.set(0);
      const timeout = setTimeout(() => {
        const controls = animate(motionVal, target, {
          duration,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo suave
          onUpdate: (latest) => {
            if (spanRef.current) {
              spanRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
            }
          }
        });
        return () => controls.stop();
      }, delay * 1000);

      return () => clearTimeout(timeout);
    } else {
      if (spanRef.current) {
        spanRef.current.textContent = `${prefix}0${suffix}`;
      }
    }
  }, [isInView, rawString, duration, delay, match, motionVal]);

  if (!match) {
    return <span>{rawString}</span>;
  }

  const prefix = match[1] || '';
  const suffix = match[3] || '';

  return (
    <span ref={spanRef} className="tabular-nums inline-block">
      {prefix}{match[2]}{suffix}
    </span>
  );
}

export default function SocialProof() {
  const t = useTranslations('SocialProof');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax: os números sobem fisicamente no eixo Y conforme a rolagem avança
  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -20]);

  const items = [
    { raw: t('videos'), label: t('videosLabel'), duration: 2.0, delay: 0.1 },
    { raw: t('brands'), label: t('brandsLabel'), duration: 1.7, delay: 0.25 },
    { raw: t('global'), label: t('globalLabel'), duration: 0, delay: 0.4 }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="social-proof"
      className="w-full bg-[#E8B04B] text-[#15171B] py-16 md:py-24 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#15171B]/20">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              style={{ y: yParallax }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center pt-8 md:pt-0 group"
            >
              <h2 className="font-archivo font-black text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-2 transition-transform duration-300 group-hover:scale-105">
                <CounterNumber 
                  rawString={item.raw} 
                  duration={item.duration} 
                  delay={item.delay} 
                />
              </h2>
              <p className="font-inter font-bold uppercase tracking-widest text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

