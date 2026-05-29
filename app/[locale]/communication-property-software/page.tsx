import { Navbar } from "@/components/landing/navbar";
import { CommunicationHero } from "@/components/communication/hero";
import { CommunicationVideoShowcase } from "@/components/communication/video-showcase";
import { CommunicationSolutions } from "@/components/communication/solutions";
import { CommunicationAIMatching } from "@/components/communication/ai-matching";
import { CommunicationFeatures } from "@/components/communication/features";
import { CommunicationWhyUs } from "@/components/communication/why-us";
import { CommunicationTestimonials } from "@/components/communication/testimonials";
import { CommunicationBlogSection } from "@/components/communication/blog-section";
import { CommunicationFAQSection } from "@/components/communication/faq-section";
import { CommunicationCTA } from "@/components/communication/cta";
import { Footer } from "@/components/landing/footer";
import { setRequestLocale } from "next-intl/server";
import { getCommunicationBlogPosts } from "@/lib/blog-home-posts";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

const PAGE_PATH = '/communication-property-software';

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: 'Resident Communication Software | PropertyCareApp',
    description:
      'Centralize all building communications — announcements, requests, and updates — in one AI-powered platform. Keep residents informed and engaged. Start free.',
  });
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What communication channels does PropertyCareApp support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PropertyCareApp supports push notifications (iOS & Android), in-app messaging, email broadcasts, SMS alerts, and community announcement boards — all managed from a single dashboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can residents submit requests or tickets through the communication platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Residents can submit service requests, maintenance tickets, and inquiries directly through the app. Managers receive instant notifications and can respond, assign, or escalate within the same platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the platform support multilingual communication?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. PropertyCareApp includes AI-powered automatic translation, enabling you to communicate with residents in their preferred language without any manual effort.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I schedule announcements and notifications in advance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. The platform lets you compose and schedule announcements to be sent at a specific date and time, ensuring residents always receive timely and relevant updates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is resident data kept private and secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All communications and resident data are protected with industry-standard encryption. Each building operates in a dedicated environment, and data is never shared between properties.',
      },
    },
  ],
};

export default async function CommunicationPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blogPosts = await getCommunicationBlogPosts(locale as Locale);

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
        name: 'Communication Property Software',
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
      <CommunicationVideoShowcase />
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
