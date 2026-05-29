import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'PropertyCareApp — All-in-One Property Management Platform',
  description:
    'Unify sales, maintenance, CRM, and operations in one AI-powered platform. Trusted by property companies worldwide. Start your free trial today.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PropertyCareApp — All-in-One Property Management Platform',
    description:
      'Unify sales, maintenance, CRM, and operations in one AI-powered platform. Trusted by property companies worldwide.',
    url: 'https://propertycareapp.com/',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertycareapp.com/' },
  ],
};

export default function Home() {
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
