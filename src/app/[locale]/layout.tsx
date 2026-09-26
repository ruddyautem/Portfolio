import './globals.css';
import { Inconsolata, Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import Explorer from '@/components/Explorer/Explorer';
import Footer from '@/components/Footer/Footer';
import Menu from '@/components/Menu/Menu';
import Sidebar from '@/components/Sidebar/Sidebar';
import Tabsbar from '@/components/Tabsbar/Tabsbar';
import MobileNav from '@/components/MobileNav/MobileNav';
import SwipeNavigator from '@/components/SwipeNavigator/SwipeNavigator';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '../providers/ThemeProvider';
import { BackgroundBlobs } from '@/components/PageWrapper/PageWrapper';
import { THEME_OPTIONS } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Ruddy Autem | Développeur Full Stack'
    : 'Ruddy Autem | Full Stack Developer';
  const description = isFr
    ? 'Portfolio de Ruddy Autem - Développeur Full Stack spécialisé en React, Next.js, Node.js et TypeScript'
    : 'Portfolio of Ruddy Autem - Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s | Ruddy Autem',
    },
    description,
    keywords: [
      'Ruddy Autem',
      'Full Stack Developer',
      'Développeur Full Stack',
      'Web Development',
      'React',
      'Next.js',
      'Portfolio',
      'TypeScript',
      'Node.js',
    ],
    authors: [{ name: 'Ruddy Autem' }],
    creator: 'Ruddy Autem',
    icons: {
      icon: '/vsclogo.svg',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: isFr ? 'fr_FR' : 'en_US',
      url: `/${locale}`,
      siteName: 'Ruddy Autem Portfolio',
      title,
      description,
      images: [
        {
          url: '/profile.jpg',
          width: 800,
          height: 800,
          alt: 'Ruddy Autem - Full Stack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['/profile.jpg'],
    },
  };
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'swap',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const fontVariables = `${inter.variable} ${inconsolata.variable}`;

  const cookieStore = await cookies();
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const themeCookie = cookieStore.get('theme')?.value;
  const initialTheme = THEME_OPTIONS.includes(themeCookie as string)
    ? (themeCookie as string)
    : 'ayu';
  const glowCookie = cookieStore.get('backgroundGlow')?.value;
  const initialGlow = glowCookie !== 'false';

  const isFr = locale === 'fr';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Ruddy Autem',
        jobTitle: isFr ? 'Développeur Full Stack' : 'Full Stack Developer',
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpg`,
        sameAs: ['https://github.com/ruddyautem', 'https://www.linkedin.com/in/ruddy-autem/'],
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'Tailwind CSS',
          'PostgreSQL',
          'Elysia',
          'Full Stack Web Development',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Ruddy Autem Portfolio',
        author: {
          '@id': `${SITE_URL}/#person`,
        },
        inLanguage: ['en', 'fr'],
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${fontVariables} ${initialTheme} ${initialGlow ? '' : 'no-glow'}`}
      style={{ fontFamily: 'var(--font-system-ui)' }}
      suppressHydrationWarning
    >
      <body className="flex h-dvh flex-col overflow-hidden">
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99999]
            focus:px-4 focus:py-2 focus:bg-accent focus:text-slate-950 focus:font-bold
            focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          {isFr ? 'Passer au contenu principal' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <ThemeContextProvider initialTheme={initialTheme} initialGlow={initialGlow}>
            <ThemeProvider>
              <BackgroundBlobs />
              <Menu />

              <div className="flex flex-1 overflow-hidden">
                <div className="hidden lg:flex h-[calc(100dvh-60px)] shrink-0">
                  <Sidebar />
                  <Explorer />
                </div>

                <main
                  id="main-content"
                  tabIndex={-1}
                  className="flex flex-1 flex-col min-w-0 outline-none"
                >
                  <Tabsbar />
                  <SwipeNavigator
                    className="font-inconsolata text-light h-[calc(100dvh-88px)] lg:h-[calc(100dvh-80px)]
                      overflow-y-auto overflow-x-hidden p-0"
                  >
                    {children}
                  </SwipeNavigator>
                </main>
              </div>

              <Footer />
              <MobileNav />
            </ThemeProvider>
          </ThemeContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
