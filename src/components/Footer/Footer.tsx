'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface FooterItemProps {
  icon: string;
  label?: string;
  alt?: string;
}

const FooterItem = ({ icon, label, alt = '' }: FooterItemProps) => (
  <>
    <Image className="h-3 opacity-60" src={icon} width={15} height={15} alt={alt} />
    {label && <p className="ml-1">{label}</p>}
  </>
);

const Footer = () => {
  const t = useTranslations('footer');

  const statusItems = [
    { icon: '/error.svg', label: '0' },
    { icon: '/warning.svg', label: '0' },
    { icon: '/info.svg', label: '0' },
  ];

  const rightSideItems = [
    { icon: '/prettier.svg', label: 'Prettier' },
    { icon: '/bell.svg', label: null },
  ];

  const containerClasses = 'flex h-5 cursor-pointer items-center rounded-xs px-1 hover:bg-white/10';
  const footerClasses =
    'bg-menu text-opacity-50 z-50 flex h-5 w-full items-center gap-1 text-[10px] relative select-none';

  return (
    <footer className={footerClasses}>
      <Link href="https://github.com/ruddyautem" className={cn(containerClasses, 'ml-1 hidden sm:flex')}>
        <FooterItem icon="/source-control.svg" label="main" alt="Source control" />
      </Link>

      <div className="hidden gap-2 sm:flex">
        <div className={containerClasses}>
          {statusItems.map((item, index) => (
            <FooterItem key={index} {...item} />
          ))}
        </div>
      </div>

      <span className="absolute left-1/2 -ml-1.25 -translate-x-1/2 lg:ml-5 xl:ml-28.75 whitespace-nowrap text-white/60">
        {t('rights', { year: new Date().getFullYear() })}
      </span>

      <div className="ml-auto flex items-center gap-1 px-1">
        {rightSideItems.map((item, index) => (
          <div key={index} className={cn(containerClasses, 'hidden sm:flex')}>
            <FooterItem {...item} />
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;