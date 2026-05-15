import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FluxOS — Closing the Execution Gap',
    short_name: 'FluxOS',
    description:
      'The fastest path from raw thought to completed action. No templates, no friction, just pure forward motion.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/image.png',
        sizes: '1366x768',
        type: 'image/png',
        form_factor: 'wide',
        label: 'FluxOS Desktop Interface',
      },
    ],
    categories: ['productivity', 'utilities'],
  };
}
