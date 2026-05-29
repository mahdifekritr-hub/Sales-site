import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Assets & Parts Management Software | PropertyCareApp',
  description:
    'Track, manage, and optimize building assets and parts inventory with AI. Reduce downtime, cut costs, and automate maintenance workflows. Try free.',
  alternates: { canonical: '/assets' },
  openGraph: {
    title: 'Assets & Parts Management Software | PropertyCareApp',
    description:
      'Track, manage, and optimize building assets and parts inventory with AI. Reduce downtime and maintenance costs.',
    url: 'https://propertycareapp.com/assets',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertycareapp.com/' },
    { '@type': 'ListItem', position: 2, name: 'Assets & Parts', item: 'https://propertycareapp.com/assets' },
  ],
};

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

export default function AssetsPage() {
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
      <AssetsBlogSection />
      <AssetsFAQSection />
      <AssetsCTA />
      <Footer />
    </main>
  );
}
