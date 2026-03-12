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

// Metadata configuration
export const metadata = {
  title: "Ruddy Autem | Full Stack Developer",
  description:
    "Portfolio of Ruddy Autem - Full Stack Developer specializing in modern web technologies",
  keywords: [
    "Full Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Ruddy Autem" }],
  creator: "Ruddy Autem",
  icons: {
    icon: "/vsclogo.svg",
  },
};

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const fontVariables = `${inter.variable} ${oswald.variable} ${inconsolata.variable} ${dmMono.variable} ${comfortaa.variable}`;

  return (
    <html
      lang="en"
      className={fontVariables}
      style={{ fontFamily: "var(--font-system-ui)" }}
    >
      {/* Remplacement de h-screen (vh) par h-[100dvh] */}
      <body className="flex h-dvh flex-col overflow-hidden">
        <ThemeContextProvider>
          <ThemeProvider>
            {/* Header */}
            <Menu />

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* Left sidebar area : Remplacement de vh par dvh */}
              <aside className="flex h-[calc(100dvh-60px)] shrink-0">
                <Sidebar />
                <Explorer />
              </aside>

              {/* Main content with tabsbar */}
              <main className="flex flex-1 flex-col min-w-0">
                <Tabsbar />
                {/* 
                  Remplacement de vh par dvh : Le scroll se fait nativement et parfaitement.
                  Aucun changement sur vos classes de couleurs ou de font. 
                */}
                <div className="font-inconsolata text-light h-[calc(100dvh-80px)] overflow-y-auto overflow-x-hidden p-4">
                  {children}
                </div>
              </main>
            </div>

            {/* Footer */}
            <Footer />
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}