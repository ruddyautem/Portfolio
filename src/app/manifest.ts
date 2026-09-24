import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ruddy Autem - Full Stack Developer Portfolio',
    short_name: 'Ruddy Autem',
    description:
      'Portfolio of Ruddy Autem - Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/vsclogo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
