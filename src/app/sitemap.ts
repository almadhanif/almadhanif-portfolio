import type { MetadataRoute } from 'next';
import { CONTENT_LAST_MODIFIED, PUBLIC_PAGES, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p === '/' ? '' : p}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: p === '/' ? 'monthly' : 'yearly',
    priority: p === '/' ? 1 : p.startsWith('/work') ? 0.8 : 0.6,
  }));
}
