import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterItem = ({ icon, label, alt = "" }) => (
  <>
    <Image
      className="h-3 opacity-60"
      src={icon}
      width={15}
      height={15}
      alt={alt}
    />
    {label && <p>{label}</p>}
  </>
);

const Footer = () => {
  const statusItems = [
    { icon: "/error.svg", label: "0" },
    { icon: "/warning.svg", label: "0" },
    { icon: "/info.svg", label: "0" },
  ];

  const rightSideItems = [
    { icon: "/prettier.svg", label: "Prettier" },
    { icon: "/bell.svg", label: null },
  ];

  const containerClasses =
    "flex h-5 cursor-pointer items-center rounded-xs px-1 hover:bg-white/10";
  const footerClasses =
    "bg-menu text-opacity-50 z-50 flex h-5 w-full items-center gap-1 text-[10px] relative";

  return (
    <div className={footerClasses}>
      <Link
        href="https://github.com/ruddyautem"
        className={`${containerClasses} ml-1`}
      >
        <FooterItem
          icon="/source-control.svg"
          label="main"
          alt="Source control"
        />
      </Link>

      <div className="hidden gap-2 sm:flex">
        <div className={containerClasses}>
          {statusItems.map((item, index) => (
            <FooterItem key={index} {...item} />
          ))}
        </div>
      </div>

      <span className="absolute left-1/2 ml-[-5px] -translate-x-1/2 lg:ml-[20px] xl:ml-[115px]">
        © 2025 Ruddy Autem
      </span>

      <div className="ml-auto flex gap-1 px-1">
        {rightSideItems.map((item, index) => (
          <div key={index} className={containerClasses}>
            <FooterItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
