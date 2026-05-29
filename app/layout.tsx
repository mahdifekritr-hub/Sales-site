import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

// Wire next/font to the CSS variables used by Tailwind's font-sans / font-mono utilities.
// This enables automatic font subsetting, preload link tags, and eliminates FOUT.
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
    url: `${BASE_URL}/contact`,
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
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'tr': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'PropertyCareApp',
    title: 'PropertyCareApp — All-in-One Property Management Platform',
    description:
      'AI-powered property management platform unifying sales, maintenance, CRM, and operations. Trusted by property companies worldwide.',
    url: BASE_URL,
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
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
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale();
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
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
