import './globals.css';
import { Inconsolata, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import Explorer from '@/components/Explorer/Explorer';
import Footer from '@/components/Footer/Footer';
import Menu from '@/components/Menu/Menu';
import Sidebar from '@/components/Sidebar/Sidebar';
import Tabsbar from '@/components/Tabsbar/Tabsbar';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '../providers/ThemeProvider';
import { THEME_OPTIONS } from '@/lib/constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ruddyautem.dev';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const fontVariables = `${inter.variable} ${inconsolata.variable}`;

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  const initialTheme = THEME_OPTIONS.includes(themeCookie as string) ? (themeCookie as string) : 'ayu';
  const glowCookie = cookieStore.get('backgroundGlow')?.value;
  const initialGlow = glowCookie !== 'false';

  return (
    <html
      lang={locale}
      className={`${fontVariables} ${initialTheme} ${initialGlow ? '' : 'no-glow'}`}
      style={{ fontFamily: 'var(--font-system-ui)' }}
      suppressHydrationWarning
    >
      <body className="flex h-dvh flex-col overflow-hidden">
        <NextIntlClientProvider messages={messages}>
          <ThemeContextProvider initialTheme={initialTheme} initialGlow={initialGlow}>
            <ThemeProvider>
              <Menu />

              <div className="flex flex-1 overflow-hidden">
                <aside className="flex h-[calc(100dvh-60px)] shrink-0">
                  <Sidebar />
                  <Explorer />
                </aside>

                <main className="flex flex-1 flex-col min-w-0">
                  <Tabsbar />
                  <div
                    className="font-inconsolata text-light h-[calc(100dvh-80px)] overflow-y-auto
                      overflow-x-hidden p-4"
                  >
                    {children}
                  </div>
                </main>
              </div>

              <Footer />
            </ThemeProvider>
          </ThemeContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}