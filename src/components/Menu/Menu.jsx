import Image from 'next/image';
import React from 'react';
import { Minimize, Restore, Close } from '../Icons/Icons';

const Menu = () => {
  const menuItems = [
    'File',
    'Edit',
    'Selection',
    'View',
    'Go',
    'Run',
    'Terminal',
    'Help',
  ];

  return (
    <div className='flex items-center h-8  z-50'>
      <div className='hidden text-xs font-semibold text-white lg:flex-1 lg:flex text-opacity-80 h-8'>
        <ul className='flex items-center'>
          <Image
            className='mx-2'
            src='vsclogo.svg'
            width={15}
            height={15}
            alt=''
          />
          {menuItems.map((item, index) => (
            <li
              key={index}
              className='cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-2 py-0.5'
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex items-center justify-center flex-1'>
        <div className='items-center justify-center hidden h-6 rounded-md cursor-pointer lg:flex hover:bg-white hover:bg-opacity-10 bg-opacity-5 w-7'>
          <Image
            className='cursor-pointer'
            src='/arrow-left.svg'
            width={15}
            height={15}
            alt=''
          />
        </div>
        <div className='hidden lg:flex'>
          <Image
            className='mx-2 mr-3 opacity-30 '
            src='/arrow-right.svg'
            width={15}
            height={15}
            alt=''
          />
        </div>
        <div className=' flex items-center justify-center w-4/6 h-6 text-xs font-semibold text-white bg-white border border-white rounded cursor-pointer border-opacity-10 bg-opacity-5 hover:bg-opacity-10 text-opacity-80'>
          <Image
            className='mr-1'
            src='/search.svg'
            width={15}
            height={15}
            alt=''
          />
          Ruddy Autem Portfolio
        </div>
      </div>

      <div className='items-center flex-1 hidden ml-auto text-white lg:flex'>
        <div className='px-3 py-2 ml-auto cursor-pointer hover:bg-white hover:bg-opacity-10'>
          <Minimize className='' />
        </div>
        <div className='px-3 py-2 cursor-pointer hover:bg-white hover:bg-opacity-10'>
          <Restore className='' />
        </div>
        <div className='px-3 py-2 cursor-pointer hover:bg-red-500'>
          <Close className='' />
        </div>
      </div>
    </div>
  );
};

export default Menu;
