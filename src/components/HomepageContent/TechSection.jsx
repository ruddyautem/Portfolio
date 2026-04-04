'use client';

import { useTranslations } from 'next-intl';
import { LogoCarousel } from '../ui/logo-carousel';

const TechSection = () => {
  const t = useTranslations('homepage');

  return (
    <div
      className="item-animate mt-3 flex w-full max-w-full flex-col items-center overflow-hidden
        border-t border-slate-700/50 pt-2 lg:mt-2 lg:pt-1.5 xl:mt-3 xl:pt-2 2xl:mt-4 2xl:pt-2.5"
    >
      <h3
        className="mb-1 w-full truncate text-center font-mono text-[10px] tracking-widest
          text-slate-500 lg:text-[9px] xl:text-[10px] 2xl:mb-2 2xl:text-xs 3xl:mb-3 3xl:text-sm"
      >
        {t('technologies')}
      </h3>
      <div
        className="relative w-full max-w-full overflow-hidden [&_div]:py-1 lg:[&_div]:py-0.5
          xl:[&_div]:py-1 2xl:[&_div]:py-1.5"
      >
        <LogoCarousel />
      </div>
    </div>
  );
};

export default TechSection;
