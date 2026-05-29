import type { Metadata } from 'next';
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Solutions } from "@/components/landing/solutions";
import { AIMatching } from "@/components/landing/ai-matching";
import { Testimonials } from "@/components/landing/testimonials";
import { BlogSection } from "@/components/landing/blog-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { WhyUs } from "@/components/landing/why-us";
import { VideoShowcase } from "@/components/landing/video-showcase";
import { getLocale } from "next-intl/server";
import { getHomeBlogPosts } from "@/lib/blog-home-posts";
import type { Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: 'Real Estate Sales Software | PropertyCareApp',
  description:
    'AI-powered property sales platform with virtual tours, unit reservation, smart queues, and automated contracts. Close deals faster — try free.',
  alternates: { canonical: '/sales' },
  openGraph: {
    title: 'Real Estate Sales Software | PropertyCareApp',
    description:
      'AI-powered property sales platform with virtual tours, unit reservation, smart queues, and automated contracts. Close deals faster.',
    url: 'https://propertycareapp.com/sales',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertycareapp.com/' },
    { '@type': 'ListItem', position: 2, name: 'Sales Software', item: 'https://propertycareapp.com/sales' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can we launch the platform under our own tower\'s name and brand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Our solution is fully white-labeled. The mobile apps (iOS & Android) and the desktop platform will feature your tower\'s logo, colors, and unique branding, ensuring a premium experience for your clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we use our own custom domain for the web platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Your Sales & Rental portal will run on your own domain (e.g., sales.yourtowername.com), maintaining full brand consistency across the web.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which platforms is the software available on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The platform is cross-platform and fully synchronized. It runs natively on iOS, Android, and all modern Desktop browsers, allowing potential buyers and renters to browse your property from any device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who handles the technical updates and App Store submissions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We handle the heavy lifting. Our team manages all technical maintenance, security updates, and the process of publishing your branded apps to the Apple App Store and Google Play Store.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do we manage the available units for sale or rent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You will have access to a centralized management dashboard. From there, you can easily add unit details, high-resolution galleries, 3D virtual tours, and pricing information in real-time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are inquiries from potential buyers or renters handled?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All leads are captured directly through your branded platform. Your sales team will receive instant notifications via the dashboard and email, allowing for immediate follow-up with prospective clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is our building\'s data secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Security is our priority. We provide dedicated database environments and industry-standard encryption to ensure that all your tower\'s information and client data remain private and protected.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this platform be integrated with other management features?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Sales & Rental module can work seamlessly with our broader property management ecosystem, including move-in/move-out coordination and resident communication tools.',
      },
    },
  ],
};

export default async function SalesPage() {
  const locale = (await getLocale()) as Locale;
  const blogPosts = await getHomeBlogPosts(locale);

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
      <Hero />
      <VideoShowcase />
      <Solutions />
      <AIMatching />
      <Features />
      <WhyUs />
      <Testimonials />
      <BlogSection posts={blogPosts} />
      <FAQSection />
      <CTA />
      <Footer />
    </main>
  );
}
