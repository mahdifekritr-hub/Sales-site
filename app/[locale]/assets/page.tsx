import { Navbar } from "@/components/landing/navbar";
import { AssetsHero } from "@/components/assets/hero";
import { AssetsVideoShowcase } from "@/components/assets/video-showcase";
import { AssetsSolutions } from "@/components/assets/solutions";
import { AssetsAIMatching } from "@/components/assets/ai-matching";
import { AssetsFeatures } from "@/components/assets/features";
import { AssetsWhyUs } from "@/components/assets/why-us";
import { AssetsTestimonials } from "@/components/assets/testimonials";
import { AssetsBlogSection } from "@/components/assets/blog-section";
import { AssetsFAQSection } from "@/components/assets/faq-section";
import { AssetsCTA } from "@/components/assets/cta";
import { Footer } from "@/components/landing/footer";
import { setRequestLocale } from "next-intl/server";
import { getAssetsBlogPosts } from "@/lib/blog-home-posts";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

const PAGE_PATH = '/assets';

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: 'Assets & Parts Management Software | PropertyCareApp',
    description:
      'Track, manage, and optimize building assets and parts inventory with AI. Reduce downtime, cut costs, and automate maintenance workflows. Try free.',
  });
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of assets can I manage with PropertyCareApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PropertyCareApp supports all building assets including HVAC systems, elevators, electrical equipment, plumbing fixtures, furniture, and any custom asset category you define. You can track location, condition, warranty, and service history for every item.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track spare parts and inventory levels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Assets & Parts module includes full parts inventory management with stock level alerts, automatic reorder triggers, supplier management, and cost tracking so you always have the right parts on hand.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the platform support preventive maintenance scheduling for assets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. You can set up recurring maintenance schedules based on time intervals, usage meters, or condition thresholds. The system automatically generates work orders and assigns them to the appropriate technicians.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate reports on asset performance and costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. PropertyCareApp provides detailed asset lifecycle reports including total cost of ownership, maintenance history, downtime records, and depreciation tracking — giving you the data to make informed replacement decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it possible to integrate the assets module with the maintenance module?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Assets & Parts module is fully integrated with the Maintenance module. When a work order is created for an asset, the system automatically links it to the asset record, updates service history, and deducts used parts from inventory.',
      },
    },
  ],
};

export default async function AssetsPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blogPosts = await getAssetsBlogPosts(locale as Locale);

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
        name: 'Assets & Parts',
        item: absoluteLocalizedUrl(locale as Locale, PAGE_PATH),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <AssetsHero />
      <AssetsVideoShowcase />
      <AssetsSolutions />
      <AssetsAIMatching />
      <AssetsFeatures />
      <AssetsWhyUs />
      <AssetsTestimonials />
      <AssetsBlogSection posts={blogPosts} />
      <AssetsFAQSection />
      <AssetsCTA />
      <Footer />
    </main>
  );
}
