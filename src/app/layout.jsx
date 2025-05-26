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

// Font configurations - must be in module scope
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

// Layout Components
const MainContent = ({ children }) => (
  <div className="font-inconsolata text-light h-[calc(100vh-80px)] overflow-y-scroll p-4">
    {children}
  </div>
);

const SideSection = () => (
  <div className="flex">
    <Sidebar />
    <Explorer />
  </div>
);

const ContentSection = ({ children }) => (
  <div className="flex flex-1 flex-col overflow-hidden">
    <Tabsbar />
    <MainContent>{children}</MainContent>
  </div>
);

export default function RootLayout({ children }) {
  const fontVariables = `${inter.variable} ${oswald.variable} ${inconsolata.variable} ${dmMono.variable} ${comfortaa.variable}`;

  return (
    <html lang="en" className={fontVariables}>
      <body className="flex h-screen flex-col">
        <ThemeContextProvider>
          <ThemeProvider>
            <Menu />
            <div className="flex flex-1">
              <SideSection />
              <ContentSection>{children}</ContentSection>
            </div>
            <Footer />
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
