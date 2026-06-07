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
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAssetsBlogPosts } from "@/lib/blog-home-posts";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

const PAGE_PATH = '/property-asset-part-management-software';
const jsonLdFaqKeys = ["q1", "q2", "q3", "q4", "q5"] as const;

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "assetsPage.meta" });

  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: t("title"),
    description: t("description"),
  });
}

export default async function AssetsPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "assetsPage" });
  const blogPosts = await getAssetsBlogPosts(locale as Locale);

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
