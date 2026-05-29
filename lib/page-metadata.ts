import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { absoluteLocalizedUrl, hreflangAlternates, localizedPath } from '@/lib/locale-paths';

type PageMetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteLocalizedUrl(locale, path),
    },
  };
}

export type LocalePageProps = {
  params: Promise<{ locale: string }>;
};
