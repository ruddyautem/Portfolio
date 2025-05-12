import "./globals.css";

import {
  Inconsolata,
  Inter,
  Oswald,
  DM_Mono,
  Comfortaa,
} from "next/font/google";

import Explorer from "@/components/Explorer/Explorer";
import Footer from "@/components/Footer/Footer";
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import Tabsbar from "@/components/Tabsbar/Tabsbar";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "./providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa",
});
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inconsolata",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "Portfolio Ruddy Autem",
  description: "Portfolio Ruddy Autem",
  icons: {
    icon: "/vsclogo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${inconsolata.variable} ${inter.variable} ${oswald.variable} ${dmMono.variable} ${comfortaa.variable}`}
    >
      <body className='flex flex-col h-screen'>
        <ThemeContextProvider>
          <ThemeProvider>
            <Menu className='' />
            <div className='flex flex-1'>
              <div className='flex '>
                <Sidebar className='' />
                <Explorer className='' />
              </div>
              <div className='flex flex-col flex-1 overflow-hidden '>
                <Tabsbar className='' />
                <div className='h-[calc(100vh-80px)] p-4 font-inconsolata text-light overflow-y-scroll'>
                  {children}
                </div>
              </div>
            </div>
            <Footer className='' />
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
