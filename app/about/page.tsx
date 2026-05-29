import type { Metadata } from 'next';
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { AboutHero } from "@/components/about/hero";
import { MissionVision } from "@/components/about/mission-vision";
import { CompanyValues } from "@/components/about/company-values";
import { Integrations } from "@/components/about/integrations";
import { Platforms } from "@/components/about/platforms";
import { AboutCTA } from "@/components/about/cta";

export const metadata: Metadata = {
  title: 'About PropertyCareApp | AI-Driven Real Estate Innovation',
  description:
    'Canada-based, operating internationally. Our mission: AI-driven tools that simplify property sales, CRM, and building management. Learn our story.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About PropertyCareApp | AI-Driven Real Estate Innovation',
    description:
      'Canada-based, operating internationally. AI-driven tools that simplify property sales, CRM, and building management.',
    url: 'https://propertycareapp.com/about',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertycareapp.com/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://propertycareapp.com/about' },
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

export default function AboutPage() {
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
