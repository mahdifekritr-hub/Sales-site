import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Property Maintenance Software | PropertyCareApp',
  description:
    'Automate work orders, track technicians, and resolve property maintenance requests faster with AI. The smart solution for building management teams. Try free.',
  alternates: { canonical: '/maintenance' },
  openGraph: {
    title: 'Property Maintenance Software | PropertyCareApp',
    description:
      'Automate work orders, track technicians, and resolve property maintenance requests faster with AI.',
    url: 'https://propertycareapp.com/maintenance',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertycareapp.com/' },
    { '@type': 'ListItem', position: 2, name: 'Maintenance', item: 'https://propertycareapp.com/maintenance' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the work order management system work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Residents or staff submit a maintenance request through the app. The system automatically categorizes it, assigns it to the appropriate technician based on skills and availability, and sends real-time status updates to all parties.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can residents track the status of their maintenance requests?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Residents receive push notifications at every stage — from submission to assignment, in-progress updates, and completion. They can also view their request history and provide feedback through the app.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the platform support vendor and contractor management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can add external vendors to the platform, assign work orders to them, track their progress, and manage invoices — all without leaving PropertyCareApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I set up recurring preventive maintenance tasks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Define preventive maintenance schedules for any asset or common area. The system automatically creates work orders on schedule and notifies the responsible team member.',
      },
    },
    {
      '@type': 'Question',
      name: 'What reporting is available for maintenance operations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PropertyCareApp provides detailed reports on response times, resolution rates, technician performance, recurring issues, and cost breakdowns — helping you continuously improve operations.',
      },
    },
  ],
};

export default function MaintenancePage() {
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
      <MaintenanceBlogSection />
      <MaintenanceFAQSection />
      <MaintenanceCTA />
      <Footer />
    </main>
  );
}
