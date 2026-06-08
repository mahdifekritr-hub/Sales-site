import { Navbar } from "@/components/landing/navbar";
import { CommunicationHero } from "@/components/communication/hero";
import { CommunicationSolutions } from "@/components/communication/solutions";
import { CommunicationAIMatching } from "@/components/communication/ai-matching";
import { CommunicationFeatures } from "@/components/communication/features";
import { CommunicationWhyUs } from "@/components/communication/why-us";
import { CommunicationTestimonials } from "@/components/communication/testimonials";
import { CommunicationBlogSection } from "@/components/communication/blog-section";
import { CommunicationFAQSection } from "@/components/communication/faq-section";
import { CommunicationCTA } from "@/components/communication/cta";
import { Footer } from "@/components/landing/footer";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCommunicationBlogPosts } from "@/lib/blog-home-posts";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

const PAGE_PATH = '/communication-property-software';
const jsonLdFaqKeys = ["q1", "q2", "q3", "q4", "q5"] as const;

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "communicationPage.meta" });

  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: t("title"),
    description: t("description"),
  });
}

export default async function CommunicationPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "communicationPage" });
  const blogPosts = await getCommunicationBlogPosts(locale as Locale);

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
      <CommunicationHero />
      <CommunicationSolutions />
      <CommunicationAIMatching />
      <CommunicationFeatures />
      <CommunicationWhyUs />
      <CommunicationTestimonials />
      <CommunicationBlogSection posts={blogPosts} />
      <CommunicationFAQSection />
      <CommunicationCTA />
      <Footer />
    </main>
  );
}
