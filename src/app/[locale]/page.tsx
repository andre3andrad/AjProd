import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import MinimalHero from '@/components/MinimalHero';
import SocialProof from '@/components/SocialProof';
import ServicesGrid from '@/components/ServicesGrid';
import Showcase from '@/components/Showcase';
import TeamSection from '@/components/TeamSection';
import HowItWorks from '@/components/HowItWorks';
import ClientLogos from '@/components/ClientLogos';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import MouseParticles from '@/components/MouseParticles';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <MouseParticles />
      <MinimalHero />
      <SocialProof />
      <ServicesGrid />
      <Showcase />
      <TeamSection />
      <HowItWorks />
      <ClientLogos />
      <FinalCTA />
      <Footer />
    </main>
  );
}

