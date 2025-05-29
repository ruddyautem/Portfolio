"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";

const Tabsbar = () => {
  const currentRoute = usePathname();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);
  const { theme } = useContext(ThemeContext);

  const navLinks = [
    { name: "accueil.jsx", link: "/", icon: "jsx.svg" },
    { name: "profil.html", link: "/about", icon: "html5.svg" },
    { name: "projets.js", link: "/projects", icon: "js.svg" },
    { name: "contact.css", link: "/contact", icon: "css.svg" },
    { name: "cv.json", link: "/cv", icon: "cv.svg" },
  ];

  const activeStyles = {
    bg: theme === "dracula" || theme === "oneDarkPro" ? "bg-active-tab-bg" : "",
    pos: ["ayu", "oneDarkPro", "poimandres"].includes(theme)
      ? "bottom-0"
      : "top-0",
  };

  const updateUnderlineStyle = () => {
    const activeIndex = navLinks.findIndex(
      (link) => link.link === currentRoute,
    );
    if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
      const { left, width } =
        tabsRef.current[activeIndex].getBoundingClientRect();
      const containerLeft =
        tabsRef.current[activeIndex].parentElement.getBoundingClientRect().left;
      setUnderlineStyle({ left: left - containerLeft, width });
    }
  };

  useEffect(() => {
    updateUnderlineStyle();
    const handleResize = () => updateUnderlineStyle();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentRoute]);

  return (
    <div className="bg-menu text-darker h-7">
      <div className="relative flex flex-row items-center justify-center lg:justify-start">
        {navLinks.map(({ name, link, icon }, index) => {
          const isActive = currentRoute === link;
          const baseName = name.replace(/\..+$/, "");

          return (
            <Link
              href={link}
              key={name}
              ref={(el) => (tabsRef.current[index] = el)}
              className={`relative flex cursor-pointer items-center justify-center px-[2px] sm:px-3 ${isActive ? activeStyles.bg : ""}`}
            >
              <div className="my-1.5 flex w-full gap-1 px-2 text-xs sm:my-1 sm:text-sm">
                <Image src={icon} width={16} height={16} alt="" />
                <span className="sm:hidden">{baseName}</span>
                <span className="hidden sm:inline">{name}</span>
              </div>
            </Link>
          );
        })}

        <div
          className={`absolute ${activeStyles.pos} bg-accent h-px transition-all duration-300 ease-out`}
          style={{
            left: `${underlineStyle.left}px`,
            width: `${underlineStyle.width}px`,
          }}
        />
      </div>
    </div>
  );
};

export default Tabsbar;
