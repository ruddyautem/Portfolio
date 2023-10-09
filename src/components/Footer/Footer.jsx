import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='flex items-center h-5 text-[10px] text-opacity-50 gap-1 w-full  z-50 bg-menu'>
      <a
        href='http://github.com/panderawan'
        className='flex items-center h-5 px-1 ml-1 rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-10'
      >
        <Image
          className='h-3 opacity-60'
          src='/source-control.svg'
          width={15}
          height={15}
          alt=''
        />
        <p>main</p>
      </a>
      <div className='flex flex-row gap-2'>
        <div className='flex items-center h-5 px-1 rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-10'>
          <Image
            className='h-3 opacity-60'
            src='/error.svg'
            width={15}
            height={15}
            alt=''
          />
          <p>0</p>

          <Image
            className='h-3 opacity-60'
            src='/warning.svg'
            width={15}
            height={15}
            alt=''
          />
          <p>0</p>
          <Image
            className='h-3 opacity-60'
            src='/info.svg'
            width={15}
            height={15}
            alt=''
          />
          <p>0</p>
        </div>
      </div>
      <div className='flex flex-row gap-1 px-1 ml-auto'>
        <div className='flex items-center h-5 gap-1 px-1 rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-10'>
          <Image
            className='h-3 opacity-60'
            src='/prettier.svg'
            width={15}
            height={15}
            alt=''
          />
          <p>Prettier</p>
        </div>
        <div className='flex items-center h-5 px-1 rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-10'>
          <Image
            className='h-3 opacity-60'
            src='/bell.svg'
            width={15}
            height={15}
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
