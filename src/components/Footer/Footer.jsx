import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="z-50 flex h-5 w-full items-center gap-1 bg-menu text-[10px] text-opacity-50">
      <a
        href="http://github.com/panderawan"
        className="ml-1 flex h-5 cursor-pointer items-center rounded-sm px-1 hover:bg-white hover:bg-opacity-10"
      >
        <Image
          className="h-3 opacity-60"
          src="/source-control.svg"
          width={15}
          height={15}
          alt=""
        />
        <p>main</p>
      </a>
      <div className="flex flex-row gap-2">
        <div className="flex h-5 cursor-pointer items-center rounded-sm px-1 hover:bg-white hover:bg-opacity-10">
          <Image
            className="h-3 opacity-60"
            src="/error.svg"
            width={15}
            height={15}
            alt=""
          />
          <p>0</p>

          <Image
            className="h-3 opacity-60"
            src="/warning.svg"
            width={15}
            height={15}
            alt=""
          />
          <p>0</p>
          <Image
            className="h-3 opacity-60"
            src="/info.svg"
            width={15}
            height={15}
            alt=""
          />
          <p>0</p>
        </div>
      </div>
      <div className="ml-auto flex flex-row gap-1 px-1">
        <div className="flex h-5 cursor-pointer items-center gap-1 rounded-sm px-1 hover:bg-white hover:bg-opacity-10">
          <Image
            className="h-3 opacity-60"
            src="/prettier.svg"
            width={15}
            height={15}
            alt=""
          />
          <p>Prettier</p>
        </div>
        <div className="flex h-5 cursor-pointer items-center rounded-sm px-1 hover:bg-white hover:bg-opacity-10">
          <Image
            className="h-3 opacity-60"
            src="/bell.svg"
            width={15}
            height={15}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
