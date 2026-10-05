'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LegalModal from '@/components/LegalModal';

export default function Footer() {
  const t = useTranslations('Footer');
  const [legalModalDoc, setLegalModalDoc] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer id="contact" className="w-full bg-[#15171B] text-[#F4F2ED] py-16 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-archivo font-black text-4xl tracking-tighter text-[#E8B04B] mb-4">
                AJ<span className="text-[#F4F2ED]">.</span>
              </h2>
              <p className="font-inter opacity-70 max-w-sm">
                {t('description')}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">{t('linksTitle')}</h3>
              <ul className="space-y-2 opacity-70 font-medium">
                <li><a href="#work" className="hover:text-[#E8B04B] transition-colors">Work</a></li>
                <li><a href="#services" className="hover:text-[#E8B04B] transition-colors">Services</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">{t('socialTitle')}</h3>
              <a 
                href="https://www.instagram.com/ajproductions.lab/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-rose-950/40 group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="18" 
                  height="18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4 flex-shrink-0"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>@ajproductions.lab</span>
                <svg 
                  className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-sm opacity-60 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} AJ Studio. {t('rights')}</p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <button 
                onClick={() => setLegalModalDoc('privacy')} 
                className="hover:text-[#E8B04B] transition-colors cursor-pointer text-sm underline-offset-4 hover:underline"
              >
                {t('privacy')}
              </button>
              <button 
                onClick={() => setLegalModalDoc('terms')} 
                className="hover:text-[#E8B04B] transition-colors cursor-pointer text-sm underline-offset-4 hover:underline"
              >
                {t('terms')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy & Terms of Service Popup Modal */}
      <LegalModal
        isOpen={!!legalModalDoc}
        initialDoc={legalModalDoc || 'privacy'}
        onClose={() => setLegalModalDoc(null)}
      />
    </>
  );
}
