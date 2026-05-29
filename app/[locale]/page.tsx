import { setRequestLocale } from 'next-intl/server';
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HomeHero } from "@/components/home/hero";
import { ProductsSection } from "@/components/home/products-section";
import { HorizontalScrollSection } from "@/components/home/horizontal-scroll-section";
import { AIFeaturesSection } from "@/components/home/ai-features";
import { WorkflowSection } from "@/components/home/workflow-section";
import { HomeTestimonials } from "@/components/home/testimonials";
import { HomeCTA } from "@/components/home/cta";
import { HomeIntegrations } from "@/components/home/integrations";
import type { Locale } from '@/i18n/config';
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/',
    title: 'PropertyCareApp — All-in-One Property Management Platform',
    description:
      'Unify sales, maintenance, CRM, and operations in one AI-powered platform. Trusted by property companies worldwide. Start your free trial today.',
  });
}

export default async function Home({ params }: LocalePageProps) {
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
    ],
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <HomeHero />
      <ProductsSection />
      <HorizontalScrollSection />
      <AIFeaturesSection />
      <WorkflowSection />
      <HomeTestimonials />
      <HomeIntegrations />
      <HomeCTA />
      <Footer />
    </main>
  );
}
