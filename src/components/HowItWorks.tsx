'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');

  const steps = [
    { id: 1, title: t('step1Title'), desc: t('step1Desc') },
    { id: 2, title: t('step2Title'), desc: t('step2Desc') },
    { id: 3, title: t('step3Title'), desc: t('step3Desc') },
    { id: 4, title: t('step4Title'), desc: t('step4Desc') },
  ];

  return (
    <section className="w-full bg-[#E8B04B] text-[#15171B] py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="font-archivo font-black text-5xl md:text-7xl uppercase tracking-tighter">
            {t('title')}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-[#15171B]/20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Node */}
                <div className="w-24 h-24 rounded-full bg-[#15171B] text-[#E8B04B] flex items-center justify-center font-archivo font-black text-4xl mb-8 relative z-10">
                  {step.id}
                </div>
                
                <h3 className="font-archivo font-bold text-2xl mb-4 pr-4">
                  {step.title}
                </h3>
                <p className="font-inter font-medium opacity-80 leading-relaxed pr-6">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
