export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ruddyautem.dev';
  const locales = ['en', 'fr'];
  const routes = ['', '/about', '/projects', '/contact', '/cv', '/settings'];

  const sitemapEntries = [];

  for (const route of routes) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/projects' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/projects' ? 0.9 : route === '/settings' ? 0.6 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fr: `${baseUrl}/fr${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}