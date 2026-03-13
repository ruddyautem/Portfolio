'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr';
    // router.replace smoothly swaps the URL (e.g., /en/about -> /fr/about)
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="px-4 py-2 border rounded-md font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}