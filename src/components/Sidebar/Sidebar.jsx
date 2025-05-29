"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Accueil", link: "/", icon: "/files.svg" },
  { name: "Profil", link: "/about", icon: "/code.svg" },
  { name: "Projets", link: "/projects", icon: "/source-control.svg" },
  { name: "Contact", link: "/contact", icon: "/email.svg" },
  { name: "CV", link: "/cv", icon: "/cv-sidebar.svg" },
  { name: "Comptes", icon: "/account.svg" },
  { name: "Settings", icon: "/settings-gear.svg" },
];

// Static links (no need to recalculate on every render)
const topLinks = navLinks.slice(0, 5);
const bottomLinks = navLinks.slice(5);

const Sidebar = () => {
  const currentRoute = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const itemsRef = useRef([]);

  useEffect(() => {
    const updateIndicatorStyle = () => {
      const activeIndex = topLinks.findIndex(
        (link) => link.link === currentRoute,
      );
      if (activeIndex !== -1 && itemsRef.current[activeIndex]) {
        const { top, height } =
          itemsRef.current[activeIndex].getBoundingClientRect();
        const containerTop =
          itemsRef.current[activeIndex].parentElement.getBoundingClientRect()
            .top;
        setIndicatorStyle({ top: top - containerTop, height });
      } else {
        setIndicatorStyle({ top: 0, height: 0 });
      }
    };

    updateIndicatorStyle();
    window.addEventListener("resize", updateIndicatorStyle);
    return () => window.removeEventListener("resize", updateIndicatorStyle);
  }, [currentRoute]);

  const renderLink = ({ name, link, icon }, index, isTopLink = true) => (
    <div
      key={name}
      ref={isTopLink ? (el) => (itemsRef.current[index] = el) : null}
      className={`${isTopLink && currentRoute === link ? "opacity-100" : "opacity-30"} relative flex items-center justify-center hover:opacity-100`}
    >
      <Tooltip tooltipText={name}>
        {link ? (
          <Link
            href={link}
            className="group flex h-11 w-full items-center justify-center"
          >
            <Image src={icon} width={24} height={24} alt={name} />
          </Link>
        ) : (
          <div className="group flex h-11 w-full items-center justify-center">
            <Image src={icon} width={24} height={24} alt={name} />
          </div>
        )}
      </Tooltip>
    </div>
  );

  return (
    <div className="bg-sidebar-bg hidden w-12 flex-col justify-between lg:flex">
      <div className="relative">
        {topLinks.map((link, index) => renderLink(link, index))}
        <div
          className="bg-accent absolute left-0 w-[2px] transition-all duration-300 ease-out"
          style={{
            top: `${indicatorStyle.top}px`,
            height: `${indicatorStyle.height}px`,
          }}
        />
      </div>
      <div>
        {bottomLinks.map((link, index) => renderLink(link, index, false))}
      </div>
    </div>
  );
};

export default Sidebar;
