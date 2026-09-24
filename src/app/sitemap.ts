import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const locales = ['en', 'fr'] as const;
  const routes = ['', '/about', '/projects', '/contact', '/cv', '/settings'] as const;

  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => {
      const isHome = route === '';
      const isProjects = route === '/projects';
      const isSettings = route === '/settings';

      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: (isHome || isProjects ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority: isHome
          ? 1.0
          : isProjects
            ? 0.9
            : route === '/about' || route === '/cv'
              ? 0.8
              : route === '/contact'
                ? 0.7
                : isSettings
                  ? 0.5
                  : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fr: `${baseUrl}/fr${route}`,
            'x-default': `${baseUrl}/en${route}`,
          },
        },
      };
    }),
  );
}
