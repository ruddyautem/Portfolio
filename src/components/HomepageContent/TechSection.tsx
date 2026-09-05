// TechSection.jsx
'use client';

import { useTranslations } from 'next-intl';
import { LogoCarousel } from '../ui/logo-carousel';

const TechSection = () => {
  const t = useTranslations('homepage');

  return (
    <div
      className="item-animate mt-6 flex w-full max-w-full flex-col items-center overflow-hidden
        border-t border-slate-700/50 pt-3"
    >
      <h3
        className="mb-2 w-full truncate text-center font-mono text-sm tracking-widest
          text-slate-500"
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