import './globals.css';
import { Inconsolata, Inter, Oswald, DM_Mono, Comfortaa } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Explorer from '@/components/Explorer/Explorer';
import Footer from '@/components/Footer/Footer';
import Menu from '@/components/Menu/Menu';
import Sidebar from '@/components/Sidebar/Sidebar';
import Tabsbar from '@/components/Tabsbar/Tabsbar';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '../providers/ThemeProvider';

export const metadata = {
  title: 'Ruddy Autem | Full Stack Developer',
  description:
    'Portfolio of Ruddy Autem - Full Stack Developer specializing in modern web technologies',
  keywords: ['Full Stack Developer', 'Web Development', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Ruddy Autem' }],
  creator: 'Ruddy Autem',
  icons: {
    icon: '/vsclogo.svg',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
});

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const fontVariables = `${inter.variable} ${oswald.variable} ${inconsolata.variable} ${dmMono.variable} ${comfortaa.variable}`;

  return (
    <html lang={locale} className={fontVariables} style={{ fontFamily: 'var(--font-system-ui)' }}>
      <body className="flex h-dvh flex-col overflow-hidden">
        <NextIntlClientProvider messages={messages}>
          <ThemeContextProvider>
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