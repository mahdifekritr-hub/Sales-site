import { setRequestLocale } from 'next-intl/server';
import { ContactPage } from "@/components/contact/contact-page";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import type { Locale } from '@/i18n/config';
import { buildPageMetadata, type LocalePageProps } from '@/lib/page-metadata';
import { absoluteLocalizedUrl } from '@/lib/locale-paths';

const PAGE_PATH = '/contact';

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: 'Contact PropertyCareApp | Book a Demo',
    description:
      'Get in touch with the PropertyCareApp team. Book a live demo, ask questions, or start your free 30-day trial. No credit card needed.',
  });
}

export default async function Contact({ params }: LocalePageProps) {
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
        name: 'Contact',
        item: absoluteLocalizedUrl(locale as Locale, PAGE_PATH),
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  );
}
