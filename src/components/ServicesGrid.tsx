'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CirclePlay, MonitorPlay, Clapperboard, Lightbulb, Video, Focus } from 'lucide-react';

export default function ServicesGrid() {
  const t = useTranslations('Services');

  const services = [
    {
      id: 'youtube',
      icon: <CirclePlay className="w-12 h-12 text-[#E8B04B]" strokeWidth={1.5} />,
      title: t('youtube.title'),
      desc: t('youtube.desc')
    },
    {
      id: 'brands',
      icon: <MonitorPlay className="w-12 h-12 text-[#E8B04B]" strokeWidth={1.5} />,
      title: t('brands.title'),
      desc: t('brands.desc')
    },
    {
      id: 'motion',
      icon: <Clapperboard className="w-12 h-12 text-[#E8B04B]" strokeWidth={1.5} />,
      title: t('motion.title'),
      desc: t('motion.desc')
    },
    {
      id: 'strategy',
      icon: <Lightbulb className="w-12 h-12 text-[#E8B04B]" strokeWidth={1.5} />,
      title: t('strategy.title'),
      desc: t('strategy.desc')
    },
    {
      id: 'filmmaking',
      icon: <Video className="w-12 h-12 text-[#E8B04B]" strokeWidth={1.5} />,
      title: t('filmmaking.title'),
      desc: t('filmmaking.desc')
    },
    {
      id: 'aerial',
      icon: <Focus className="w-12 h-12 text-[#E8B04B]" strokeWidth={1.5} />,
      title: t('aerial.title'),
      desc: t('aerial.desc')
    }
  ];

  return (
    <section id="services" className="w-full bg-[#15171B] text-[#F4F2ED] py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-archivo font-black text-5xl md:text-7xl uppercase tracking-tighter">
            {t('title')}
          </h2>
          <div className="w-24 h-2 bg-[#E8B04B] mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((svc, idx) => (
            <motion.div 
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-8 md:p-12 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Hover background effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8B04B] opacity-0 group-hover:opacity-10 blur-[100px] rounded-full transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                  {svc.icon}
                </div>
                <h3 className="font-archivo font-bold text-2xl md:text-3xl mb-4">
                  {svc.title}
                </h3>
                <p className="font-inter text-lg text-[#F4F2ED]/70 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
