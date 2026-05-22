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

export default function CommunicationPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <CommunicationHero />
      <CommunicationVideoShowcase />
      <CommunicationSolutions />
      <CommunicationAIMatching />
      <CommunicationFeatures />
      <CommunicationWhyUs />
      <CommunicationTestimonials />
      <CommunicationBlogSection />
      <CommunicationFAQSection />
      <CommunicationCTA />
      <Footer />
    </main>
  );
}
