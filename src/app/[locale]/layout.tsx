import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajcreativestudio.site"),
  title: {
    default: "AJ Creative Studio | Produção Audiovisual de Alto Nível",
    template: "%s | AJ Creative Studio"
  },
  description: "Estúdio de produção audiovisual que ajuda marcas e criadores a se destacarem com vídeos de alto nível. Audiovisual e criação de conteúdos estratégicos para marcas e criadores.",
  keywords: [
    "produção audiovisual",
    "vídeos para marcas",
    "edição de vídeo",
    "creative studio",
    "AJ Studio",
    "motion design",
    "comerciais",
    "audiovisual creators"
  ],
  authors: [{ name: "AJ Creative Studio" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: "https://ajcreativestudio.site",
    siteName: "AJ Creative Studio",
    title: "AJ Creative Studio | Produção Audiovisual de Alto Nível",
    description: "Estúdio de produção audiovisual que ajuda marcas e criadores a se destacarem com vídeos de alto nível.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ Creative Studio | Produção Audiovisual",
    description: "Estúdio de produção audiovisual que ajuda marcas e criadores a se destacarem com vídeos de alto nível.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${archivo.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#15171B] text-[#F4F2ED] font-inter antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
