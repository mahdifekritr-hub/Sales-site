import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HomeHero } from "@/components/home/hero";
import type { Locale } from '@/i18n/config';
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

// Below-fold sections: code-split so their JS doesn't block the initial page load.
// ssr:true keeps server-rendered HTML identical — no flash, no layout shift.
const ProductsSection = dynamic(() =>
  import("@/components/home/products-section").then((m) => m.ProductsSection),
);
const HorizontalScrollSection = dynamic(() =>
  import("@/components/home/horizontal-scroll-section").then((m) => m.HorizontalScrollSection),
);
const AIFeaturesSection = dynamic(() =>
  import("@/components/home/ai-features").then((m) => m.AIFeaturesSection),
);
const WorkflowSection = dynamic(() =>
  import("@/components/home/workflow-section").then((m) => m.WorkflowSection),
);
const HomeTestimonials = dynamic(() =>
  import("@/components/home/testimonials").then((m) => m.HomeTestimonials),
);
const HomeIntegrations = dynamic(() =>
  import("@/components/home/integrations").then((m) => m.HomeIntegrations),
);
const HomeCTA = dynamic(() =>
  import("@/components/home/cta").then((m) => m.HomeCTA),
);

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
