import type { Metadata } from 'next';
import { ContactPage } from "@/components/contact/contact-page";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: 'Contact PropertyCareApp | Book a Demo',
  description:
    'Get in touch with the PropertyCareApp team. Book a live demo, ask questions, or start your free 30-day trial. No credit card needed.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact PropertyCareApp | Book a Demo',
    description:
      'Get in touch with the PropertyCareApp team. Book a live demo or start your free 30-day trial.',
    url: 'https://propertycareapp.com/contact',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertycareapp.com/' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://propertycareapp.com/contact' },
  ],
};

export default function Contact() {
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
