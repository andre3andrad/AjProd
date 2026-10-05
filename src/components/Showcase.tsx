'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function Showcase() {
  const t = useTranslations('Showcase');
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const cases = [
    { 
      id: 1, 
      title: 'Marena Odontologia', 
      category: 'Institucional',
      videoSrc: '/videos/Marena Odontologia2.mp4',
      logoSrc: '/images/logo-marena.png',
      span: 'md:col-span-2',
      aspect: 'aspect-video md:aspect-[21/9]',
      invertLogo: true
    },
    { 
      id: 2, 
      title: 'JAGB - Eventos', 
      category: 'Cobertura',
      videoSrc: '/videos/Eventos JAGB.mp4',
      logoSrc: '/images/logo-jagb.png',
      span: 'md:col-span-1',
      aspect: 'aspect-video md:aspect-square',
      invertLogo: true
    },
    { 
      id: 3, 
      title: 'JAGB - Institucional', 
      category: 'Corporativo',
      videoSrc: '/videos/Institucional Empresa Jagb.mp4',
      logoSrc: '/images/logo-jagb.png',
      span: 'md:col-span-1',
      aspect: 'aspect-video md:aspect-square',
      invertLogo: true
    },
    { 
      id: 4, 
      title: 'London Café', 
      category: 'Comercial',
      videoSrc: '/videos/London Café (2).mp4',
      logoSrc: '/images/logo-londoncafe.png',
      span: 'md:col-span-1',
      aspect: 'aspect-video md:aspect-square',
      invertLogo: true,
      previewTime: 2
    },
    { 
      id: 5, 
      title: 'London Café B-Roll', 
      category: 'Gastronomia',
      videoSrc: '/videos/London café Broll.mp4',
      logoSrc: '/images/logo-londoncafe.png',
      span: 'md:col-span-1',
      aspect: 'aspect-video md:aspect-square',
      invertLogo: true,
      previewTime: 1
    },
    { 
      id: 6, 
      title: 'Videoclipe', 
      category: 'Videoclipe',
      youtubeId: 'sjmXpajR98o',
      videoSrc: '', // Not used for youtube
      logoSrc: '', // No logo for this one
      span: 'md:col-span-2',
      aspect: 'aspect-video md:aspect-[21/9]'
    },
  ];

  return (
    <section id="work" className="w-full bg-[#15171B] text-[#F4F2ED] py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#E8B04B] font-bold tracking-widest text-sm uppercase mb-4">{t('subtitle')}</p>
            <h2 className="font-archivo font-black text-5xl md:text-7xl uppercase tracking-tighter">
              {t('title')}
            </h2>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:inline-flex items-center gap-2 font-inter font-bold hover:text-[#E8B04B] transition-colors"
          >
            {t('viewAll')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((item, idx) => (
            <motion.div 
              key={item.id}
              layoutId={`case-container-${item.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group cursor-pointer flex flex-col ${item.span}`}
              onClick={() => setSelectedCase(item.id)}
            >
              <div className={`relative w-full ${item.aspect} bg-white/5 rounded-3xl overflow-hidden mb-6 flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[#15171B]/60 group-hover:bg-[#E8B04B]/20 mix-blend-color transition-colors duration-500 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171B] via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
                
                {/* Logo centered */}
                {item.logoSrc && (
                  <div className="absolute z-20 flex items-center justify-center p-8 w-1/2 max-w-[200px] transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4">
                    <img 
                      src={item.logoSrc} 
                      alt={item.title} 
                      className={`w-full h-auto object-contain drop-shadow-2xl ${(item as any).invertLogo ? 'brightness-0 invert' : 'rounded-2xl shadow-xl'}`} 
                    />
                  </div>
                )}

                {(item as any).youtubeId ? (
                  <div className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0 flex items-center justify-center bg-black">
                    <img 
                      src={`https://img.youtube.com/vi/${(item as any).youtubeId}/maxresdefault.jpg`} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute z-30 w-16 h-16 bg-[#E8B04B] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-[#15171B] ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <video 
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = (item as any).previewTime || 0; }}
                  >
                    <source src={`${item.videoSrc}#t=${(item as any).previewTime || 0.1}`} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                <h3 className="font-archivo font-bold text-2xl md:text-3xl group-hover:text-[#E8B04B] transition-colors">{item.title}</h3>
                <span className="font-inter text-xs md:text-sm font-bold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 uppercase tracking-wider self-start sm:self-auto whitespace-nowrap">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button className="md:hidden w-full mt-12 py-4 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-colors">
          {t('viewAll')}
        </button>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedCase !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-md"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              {cases.filter(c => c.id === selectedCase).map((item) => (
                <motion.div 
                  key={`modal-${item.id}`}
                  layoutId={`case-container-${item.id}`}
                  className="w-full max-w-6xl max-h-[90vh] bg-black border border-white/10 rounded-3xl overflow-hidden pointer-events-auto relative shadow-2xl flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-20">
                    <h3 className="font-archivo font-bold text-xl md:text-2xl ml-4">{item.title}</h3>
                    <button 
                      onClick={() => setSelectedCase(null)}
                      className="w-10 h-10 bg-black/50 hover:bg-[#E8B04B] hover:text-[#15171B] rounded-full flex items-center justify-center transition-colors"
                    >
                      <X />
                    </button>
                  </div>
                  
                  <div className="flex-1 w-full h-full flex items-center justify-center bg-black/50 p-0 md:p-4 mt-16 md:mt-0">
                    {(item as any).youtubeId ? (
                      <iframe 
                        className="w-full h-full max-h-[75vh] object-contain rounded-xl border-none shadow-2xl aspect-video"
                        src={`https://www.youtube.com/embed/${(item as any).youtubeId}?autoplay=1`} 
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video 
                        key={item.videoSrc}
                        autoPlay 
                        controls 
                        playsInline
                        className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                      >
                        <source src={item.videoSrc} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
