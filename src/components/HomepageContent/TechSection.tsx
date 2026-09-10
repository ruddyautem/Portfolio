// TechSection.jsx
'use client';

import { useTranslations } from 'next-intl';
import { LogoCarousel } from '../ui/logo-carousel';

const TechSection = () => {
  const t = useTranslations('homepage');

  return (
    <div
      className="item-animate mt-4 flex w-full max-w-full flex-col items-center overflow-hidden
        border-t border-slate-700/50 pt-2.5 2xl:mt-4 2xl:pt-3 3xl:mt-10 3xl:pt-5"
    >
      <h3
        className="mb-2 w-full truncate text-center font-mono text-xs tracking-widest
          text-slate-500 2xl:text-xs 3xl:mb-4 3xl:text-base"
      >
        {t('technologies')}
      </h3>
      <div className="relative w-full max-w-full overflow-hidden">
        <LogoCarousel />
      </div>
    </div>
  );
};

export default TechSection;