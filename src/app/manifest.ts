import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { SITE_DESCRIPTION } from '@/lib/seo';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: profile.shortName,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'browser',
    background_color: '#f6f7fa',
    theme_color: '#1e3a8a',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
