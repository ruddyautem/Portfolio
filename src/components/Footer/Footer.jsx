import Image from "next/image";
import Link from "next/link";
import React from "react";

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

  return (
    <div className="bg-menu text-opacity-50 z-50 flex h-5 w-full items-center gap-1 text-[10px]">
      <Link
        href="https://github.com/ruddyautem"
        className="ml-1 flex h-5 cursor-pointer items-center rounded-xs px-1 hover:bg-white/10"
      >
        <Image
          className="h-3 opacity-60"
          src="/source-control.svg"
          width={15}
          height={15}
          alt="Source control"
        />
        <p>main</p>
      </Link>
      <div className="flex gap-2">
        <div className="flex h-5 cursor-pointer items-center rounded-xs px-1 hover:bg-white/10">
          {statusItems.map((item, index) => (
            <React.Fragment key={index}>
              <Image
                className="h-3 opacity-60"
                src={item.icon}
                width={15}
                height={15}
                alt=""
              />
              <p>{item.label}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="ml-auto flex gap-1 px-1">
        {rightSideItems.map((item, index) => (
          <div
            key={index}
            className="flex h-5 cursor-pointer items-center rounded-xs px-1 hover:bg-white/10"
          >
            <Image
              className="h-3 opacity-60"
              src={item.icon}
              width={15}
              height={15}
              alt=""
            />
            {item.label && <p>{item.label}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
