// TechSection.jsx
'use client';

import { useTranslations } from 'next-intl';
import { LogoCarousel } from '../ui/logo-carousel';

const TechSection = () => {
  const t = useTranslations('homepage');

  return (
    <div
      data-tech-carousel="true"
      className="item-animate mt-2 flex w-full max-w-full flex-col items-center overflow-hidden border-t border-slate-700/50 pt-1.5 lg:mt-1.5 lg:pt-1.5 xl:mt-2 xl:pt-2 2xl:mt-2.5 2xl:pt-2.5 3xl:mt-10 3xl:pt-5"
    >
      <h3 className="mb-1 w-full truncate text-center font-mono text-[11px] font-semibold tracking-widest text-slate-400 lg:mb-1 lg:text-xs xl:mb-1.5 xl:text-xs 2xl:text-sm 3xl:mb-4 3xl:text-base">
        {t('technologies')}
      </h3>
      <div className="relative w-full max-w-full overflow-hidden">
        <LogoCarousel />
      </div>
    </div>
  );
};

export default TechSection;
