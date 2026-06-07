import { Navbar } from "@/components/landing/navbar";
import { MaintenanceHero } from "@/components/maintenance/hero";
import { MaintenanceVideoShowcase } from "@/components/maintenance/video-showcase";
import { MaintenanceSolutions } from "@/components/maintenance/solutions";
import { MaintenanceAIMatching } from "@/components/maintenance/ai-matching";
import { MaintenanceFeatures } from "@/components/maintenance/features";
import { MaintenanceWhyUs } from "@/components/maintenance/why-us";
import { MaintenanceTestimonials } from "@/components/maintenance/testimonials";
import { MaintenanceBlogSection } from "@/components/maintenance/blog-section";
import { MaintenanceFAQSection } from "@/components/maintenance/faq-section";
import { MaintenanceCTA } from "@/components/maintenance/cta";
import { Footer } from "@/components/landing/footer";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMaintenanceBlogPosts } from "@/lib/blog-home-posts";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

const PAGE_PATH = '/facilities-maintenance-software';
const jsonLdFaqKeys = ["q1", "q2", "q3", "q4", "q5"] as const;

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "maintenancePage.meta" });

  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: t("title"),
    description: t("description"),
  });
}

export default async function MaintenancePage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "maintenancePage" });
  const blogPosts = await getMaintenanceBlogPosts(locale as Locale);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: jsonLdFaqKeys.map((key) => ({
      '@type': 'Question',
      name: t(`jsonLd.faq.${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`jsonLd.faq.${key}.answer`),
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('meta.breadcrumbHome'),
        item: absoluteLocalizedUrl(locale as Locale, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('meta.breadcrumbPage'),
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
      <MaintenanceHero />
      <MaintenanceVideoShowcase />
      <MaintenanceSolutions />
      <MaintenanceAIMatching />
      <MaintenanceFeatures />
      <MaintenanceWhyUs />
      <MaintenanceTestimonials />
      <MaintenanceBlogSection posts={blogPosts} />
      <MaintenanceFAQSection />
      <MaintenanceCTA />
      <Footer />
    </main>
  );
}
