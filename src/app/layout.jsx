import Menu from '@/components/Menu/Menu';
import './globals.css';
import { Inter, Inconsolata, Oswald } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';
import Explorer from '@/components/Explorer/Explorer';
import Tabsbar from '@/components/Tabsbar/Tabsbar';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
    display: 'swap',
});
const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
  weight: ['300', '400', '500', '700'],
    display: 'swap',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
    display: 'swap',
});

export const metadata = {
  title: 'Portfolio Ruddy Autem',
  description: 'Portfolio Ruddy Autem',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${inconsolata.variable} ${inter.variable} ${oswald.variable}`}>
      <body className='flex flex-col h-screen'>
        <ThemeProvider>
          <Menu className='' />
          <div className='flex flex-1'>
            <div className='flex '>
              <Sidebar className='' />
              <Explorer className='' />
            </div>
            <div className='flex flex-col flex-1 overflow-hidden '>
              <Tabsbar className='' />
              <div className='overflow-y-scroll h-[calc(100vh-80px)] p-4 font-inconsolata text-gray-300'>
                {children}
              </div>
            </div>
          </div>
          <Footer className='' />
        </ThemeProvider>
      </body>
    </html>
  );
}
