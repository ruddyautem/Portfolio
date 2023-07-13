import Menu from '@/components/Menu/Menu';
import './globals.css';
import { Inter, Inconsolata } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';
import Explorer from '@/components/Explorer/Explorer';
import Tabsbar from '@/components/Tabsbar/Tabsbar';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
});

export const metadata = {
  title: 'Portfolio Ruddy Autem',
  description: 'Portfolio Ruddy Autem',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${inconsolata.variable} ${inter.variable}`}>
      <body className='h-screen flex flex-col'>
        <ThemeProvider>
          <Menu className='' />
          <div className='flex flex-1'>
            <div className='flex'>
              <Sidebar className='' />
              <Explorer className='' />
            </div>
            <div className='flex flex-col flex-1 overflow-hidden '>
              <Tabsbar className='' />
              <div className='overflow-y-scroll h-[calc(100vh-80px)] p-4 font-inconsolata '>
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
