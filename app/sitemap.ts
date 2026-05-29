import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { localizedPath } from '@/lib/locale-paths';

const BASE_URL = 'https://propertycareapp.com';

const paths = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/real-estate-software', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/facilities-maintenance-software', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/property-asset-part-management-software', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/communication-property-software', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/about-propertycareapp', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: '/contact-propertycareapp', changeFrequency: 'monthly' as const, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { path, changeFrequency, priority } of paths) {
      entries.push({
        url: `${BASE_URL}${localizedPath(locale, path)}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  return entries;
}
