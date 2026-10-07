'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/beui-tooltip';

interface FooterItemProps {
  icon: string;
  label?: string | null;
  alt?: string;
}

const FooterItem = ({ icon, label, alt = '' }: FooterItemProps) => (
  <>
    <Image className="h-3 w-auto opacity-60" src={icon} width={15} height={15} alt={alt} />
    {label && <p className="ml-1">{label}</p>}
  </>
);

const Footer = () => {
  const t = useTranslations('footer');

  const statusItems = [
    { icon: '/error.svg', label: '0', alt: '0 errors' },
    { icon: '/warning.svg', label: '0', alt: '0 warnings' },
    { icon: '/info.svg', label: '0', alt: '0 info messages' },
  ];

  const rightSideItems = [
    { icon: '/prettier.svg', label: 'Prettier', alt: 'Prettier code formatter active' },
    { icon: '/bell.svg', label: null, alt: 'Notifications' },
  ];

  const containerClasses =
    'flex h-5 cursor-pointer items-center rounded-xs px-1 leading-none hover:bg-white/10';
  const footerClasses =
    'bg-menu text-opacity-50 z-50 hidden lg:flex h-5 w-full items-center gap-1 text-[10px] leading-none relative select-none';

  return (
    <footer className={footerClasses} aria-label="Status bar">
      <Tooltip content="GitHub Profile (branch: main)" side="top">
        <Link
          href="https://github.com/ruddyautem"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile (branch main)"
          className={cn(containerClasses, 'ml-1 hidden lg:flex')}
        >
          <FooterItem icon="/source-control.svg" label="main" alt="Source control" />
        </Link>
      </Tooltip>

      <div className="hidden gap-2 sm:flex" aria-label="Editor diagnostics">
        <Tooltip content="0 errors, 0 warnings, 0 info messages" side="top">
          <div className={containerClasses}>
            {statusItems.map((item, index) => (
              <FooterItem key={index} {...item} />
            ))}
          </div>
        </Tooltip>
      </div>

      <span className="absolute top-1/2 left-1/2 -ml-1.25 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white/60 lg:ml-5 xl:ml-28.75">
        {t('rights', { year: new Date().getFullYear() })}
      </span>

      <div className="ml-auto flex items-center gap-1 px-1">
        {rightSideItems.map((item, index) => (
          <Tooltip key={index} content={item.alt} side="top" align="end">
            <div className={cn(containerClasses, 'hidden sm:flex')} aria-label={item.alt}>
              <FooterItem {...item} />
            </div>
          </Tooltip>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
