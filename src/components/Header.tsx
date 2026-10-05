'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#15171B]/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo Placeholder */}
        <Link href="/" className="font-archivo font-black text-3xl tracking-tighter text-[#E8B04B]">
          AJ<span className="text-[#F4F2ED]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-inter text-sm font-medium">
          <Link href="#work" className="hover:text-[#E8B04B] transition-colors">{t('work')}</Link>
          <Link href="#services" className="hover:text-[#E8B04B] transition-colors">{t('services')}</Link>
          <Link href="#about" className="hover:text-[#E8B04B] transition-colors">{t('about')}</Link>
          <Link href="#contact" className="hover:text-[#E8B04B] transition-colors">{t('contact')}</Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 font-inter text-xs font-bold tracking-widest uppercase">
            <Link href={pathname} locale="pt" className={`${locale === 'pt' ? 'text-[#E8B04B]' : 'text-[#F4F2ED]/50 hover:text-[#F4F2ED]'} transition-colors`}>PT</Link>
            <span className="text-[#F4F2ED]/30">|</span>
            <Link href={pathname} locale="en" className={`${locale === 'en' ? 'text-[#E8B04B]' : 'text-[#F4F2ED]/50 hover:text-[#F4F2ED]'} transition-colors`}>EN</Link>
          </div>

          <Link href="#final-cta" className="px-5 py-2.5 bg-[#F4F2ED] text-[#15171B] font-bold text-sm rounded-full hover:bg-[#E8B04B] transition-colors">
            {t('cta')}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[#F4F2ED]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#15171B] border-t border-white/10 flex flex-col items-center py-8 gap-6 shadow-2xl">
          <Link href="#work" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold">{t('work')}</Link>
          <Link href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold">{t('services')}</Link>
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold">{t('about')}</Link>
          <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold">{t('contact')}</Link>
          
          <div className="flex items-center gap-4 mt-4 font-inter font-bold tracking-widest uppercase">
            <Link href={pathname} locale="pt" onClick={() => setIsMobileMenuOpen(false)} className={`${locale === 'pt' ? 'text-[#E8B04B]' : 'text-[#F4F2ED]/50'}`}>PT</Link>
            <span className="text-[#F4F2ED]/30">|</span>
            <Link href={pathname} locale="en" onClick={() => setIsMobileMenuOpen(false)} className={`${locale === 'en' ? 'text-[#E8B04B]' : 'text-[#F4F2ED]/50'}`}>EN</Link>
          </div>

          <Link href="#final-cta" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 px-8 py-3 bg-[#E8B04B] text-[#15171B] font-bold rounded-full">
            {t('cta')}
          </Link>
        </div>
      )}
    </header>
  );
}
