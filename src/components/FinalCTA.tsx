'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, MessageSquare, Mail, ArrowUpRight, Sparkles, Check, Copy } from 'lucide-react';

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function FinalCTA() {
  const t = useTranslations('FinalCTA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined' && navigator?.clipboard) {
      navigator.clipboard.writeText('aj.prodinc@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="final-cta" className="w-full bg-[#E8B04B] text-[#15171B] py-32 md:py-48 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#15171B]/5 mix-blend-overlay" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-archivo font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter max-w-4xl uppercase leading-[0.9]"
        >
          {t('title')}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-inter text-xl md:text-2xl font-medium max-w-2xl mt-8 mb-12 opacity-80"
        >
          {t('subtitle')}
        </motion.p>
        
        <motion.button 
          onClick={() => setIsModalOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative px-10 py-5 bg-[#15171B] text-[#F4F2ED] font-bold text-xl rounded-full overflow-hidden transition-all hover:scale-105 shadow-2xl cursor-pointer"
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
          <span className="relative z-10 flex items-center gap-2">
            {t('button')}
            <Sparkles className="w-5 h-5 text-[#E8B04B] group-hover:rotate-12 transition-transform" />
          </span>
        </motion.button>
      </div>

      {/* Contact Choice Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-[#15171B] text-[#F4F2ED] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E8B04B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="pr-8 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B04B]/10 border border-[#E8B04B]/20 text-[#E8B04B] text-xs font-bold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#E8B04B] animate-pulse" />
                  {t('modal.badge')}
                </div>
                <h3 className="font-archivo font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white mb-3">
                  {t('modal.title')}
                </h3>
                <p className="font-inter text-white/70 text-sm sm:text-base leading-relaxed">
                  {t('modal.message')}
                </p>
              </div>

              {/* Contact Options Grid */}
              <div className="space-y-4">
                {/* WhatsApp André */}
                <a 
                  href="https://wa.me/5511992874209?text=Ol%C3%A1%20Andr%C3%A9,%20vim%20pelo%20site%20da%20AJ%20e%20gostaria%20de%20iniciar%20um%20projeto!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-white/[0.03] to-white/[0.01] border border-emerald-500/30 hover:border-emerald-500/70 hover:bg-emerald-500/10 transition-all shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-archivo font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors">
                          {t('modal.whatsappAndre')}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 hidden sm:inline-block">
                          WhatsApp
                        </span>
                      </div>
                      <p className="text-xs text-white/60 font-inter">
                        {t('modal.whatsappAndreRole')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                      {t('modal.chat')}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-emerald-500 text-[#15171B] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 font-bold" />
                    </div>
                  </div>
                </a>

                {/* WhatsApp João Henrique */}
                <a 
                  href="https://wa.me/554398724110?text=Ol%C3%A1%20Jo%C3%A3o,%20vim%20pelo%20site%20da%20AJ%20e%20gostaria%20de%20iniciar%20um%20projeto!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-white/[0.03] to-white/[0.01] border border-emerald-500/30 hover:border-emerald-500/70 hover:bg-emerald-500/10 transition-all shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-archivo font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors">
                          {t('modal.whatsappJoao')}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 hidden sm:inline-block">
                          WhatsApp
                        </span>
                      </div>
                      <p className="text-xs text-white/60 font-inter">
                        {t('modal.whatsappJoaoRole')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                      {t('modal.chat')}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-emerald-500 text-[#15171B] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 font-bold" />
                    </div>
                  </div>
                </a>

                {/* Instagram Oficial da Produtora */}
                <a 
                  href="https://www.instagram.com/ajproductions.lab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/20 to-white/[0.01] border border-rose-500/30 hover:border-rose-500/70 hover:bg-rose-500/10 transition-all shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform flex-shrink-0">
                      <InstagramIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-archivo font-bold text-base sm:text-lg text-white group-hover:text-rose-300 transition-colors">
                          {t('modal.instagramHandle')}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 hidden sm:inline-block">
                          Instagram
                        </span>
                      </div>
                      <p className="text-xs text-white/60 font-inter">
                        {t('modal.instagramDesc')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-rose-400 group-hover:translate-x-0.5 transition-transform">
                      {t('modal.visit')}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 font-bold" />
                    </div>
                  </div>
                </a>

                {/* E-mail Corporativo */}
                <div className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#E8B04B]/15 via-white/[0.03] to-white/[0.01] border border-[#E8B04B]/30 hover:border-[#E8B04B]/70 hover:bg-[#E8B04B]/10 transition-all shadow-lg hover:scale-[1.01]">
                  <a 
                    href="mailto:aj.prodinc@gmail.com?subject=Novo%20Projeto%20-%20AJ%20Produtora"
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#E8B04B]/20 border border-[#E8B04B]/30 flex items-center justify-center text-[#E8B04B] group-hover:scale-110 transition-transform flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-archivo font-bold text-base sm:text-lg text-white group-hover:text-[#E8B04B] transition-colors truncate">
                          {t('modal.emailAddress')}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8B04B] bg-[#E8B04B]/10 px-2 py-0.5 rounded border border-[#E8B04B]/20 hidden sm:inline-block flex-shrink-0">
                          E-mail
                        </span>
                      </div>
                      <p className="text-xs text-white/60 font-inter truncate">
                        {t('modal.emailDesc')}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <button
                      onClick={handleCopyEmail}
                      title={t('modal.copy')}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all flex items-center justify-center relative cursor-pointer"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-[#E8B04B]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copiedEmail && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#E8B04B] text-[#15171B] text-[10px] font-bold rounded shadow pointer-events-none whitespace-nowrap">
                          {t('modal.copied')}
                        </span>
                      )}
                    </button>
                    <a
                      href="mailto:aj.prodinc@gmail.com?subject=Novo%20Projeto%20-%20AJ%20Produtora"
                      className="w-9 h-9 rounded-full bg-[#E8B04B] text-[#15171B] flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4 font-bold" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
