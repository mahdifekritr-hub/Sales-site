import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const geist = Geist({ subsets: ['latin'] });

const BASE_URL = 'https://propertycareapp.com';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PropertyCareApp',
  url: BASE_URL,
  description:
    'All-in-one AI-powered property management platform: sales, maintenance, CRM, and resident communication.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PropertyCareApp',
  url: BASE_URL,
  logo: `${BASE_URL}/Company-Logo.png`,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${BASE_URL}/en/contact-propertycareapp`,
    availableLanguage: ['English', 'Turkish'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'PropertyCareApp — All-in-One Property Management Platform',
    template: '%s | PropertyCareApp',
  },
  description:
    'AI-powered property management platform unifying sales, maintenance, CRM, and operations. Trusted by property companies worldwide. Start your free trial today.',
  keywords: [
    'property management software',
    'real estate sales software',
    'AI property platform',
    'sales software for developers',
    'building management system',
    'property care app',
  ],
  authors: [{ name: 'PropertyCareApp', url: BASE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'PropertyCareApp',
    title: 'PropertyCareApp — All-in-One Property Management Platform',
    description:
      'AI-powered property management platform unifying sales, maintenance, CRM, and operations. Trusted by property companies worldwide.',
    images: [
      {
        url: '/Company-Logo.png',
        width: 1200,
        height: 630,
        alt: 'PropertyCareApp — All-in-One Property Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropertyCareApp — All-in-One Property Management Platform',
    description:
      'AI-powered property management platform unifying sales, maintenance, CRM, and operations.',
    images: ['/Company-Logo.png'],
  },
  icons: {
    icon: [
      {
        url: '/property-favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="bg-background overflow-x-hidden">
      <body className={`${geist.className} antialiased bg-background text-foreground overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
