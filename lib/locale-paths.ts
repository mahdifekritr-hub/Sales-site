import { defaultLocale, locales, type Locale } from '@/i18n/config';

const BASE_URL = 'https://propertycareapp.com';

/** Path without locale prefix, e.g. `/real-estate-software` or `/` */
export function normalizePagePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function localizedPath(locale: Locale, path: string): string {
  const normalized = normalizePagePath(path);
  if (normalized === '/') return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function absoluteLocalizedUrl(locale: Locale, path: string): string {
  return `${BASE_URL}${localizedPath(locale, path)}`;
}

/** hreflang alternates for Next.js metadata.alternates.languages */
export function hreflangAlternates(path: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const locale of locales) {
    result[locale] = localizedPath(locale, path);
  }
  result['x-default'] = localizedPath(defaultLocale, path);
  return result;
}
