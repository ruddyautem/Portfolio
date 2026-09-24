const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autem.dev';

export const SITE_URL = configuredSiteUrl.replace(/\/+$/, '');
