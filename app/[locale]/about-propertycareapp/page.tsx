import { setRequestLocale } from 'next-intl/server';
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { AboutHero } from "@/components/about/hero";
import { MissionVision } from "@/components/about/mission-vision";
import { CompanyValues } from "@/components/about/company-values";
import { Integrations } from "@/components/about/integrations";
import { Platforms } from "@/components/about/platforms";
import { AboutCTA } from "@/components/about/cta";
import type { Locale } from '@/i18n/config';
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

const PAGE_PATH = '/about-propertycareapp';

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: 'About PropertyCareApp | AI-Driven Real Estate Innovation',
    description:
      'Canada-based, operating internationally. Our mission: AI-driven tools that simplify property sales, CRM, and building management. Learn our story.',
  });
}

export default async function AboutPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteLocalizedUrl(locale as Locale, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About PropertyCareApp',
        item: absoluteLocalizedUrl(locale as Locale, PAGE_PATH),
      },
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PropertyCareApp',
    url: 'https://propertycareapp.com',
    logo: 'https://propertycareapp.com/Company-Logo.png',
    description:
      'Canada-based property management SaaS providing AI-powered tools for sales, maintenance, CRM, and resident communication.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <AboutHero />
      <MissionVision />
      <CompanyValues />
      <Integrations />
      <Platforms />
      <AboutCTA />
      <Footer />
    </main>
  );
}
