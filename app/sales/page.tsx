import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Solutions } from "@/components/landing/solutions";
import { AIMatching } from "@/components/landing/ai-matching";
import { LetAIHandle } from "@/components/landing/let-ai-handle";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";
import { Analytics } from "@/components/landing/analytics";
import { BlogSection } from "@/components/landing/blog-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { WhyUs } from "@/components/landing/why-us";
import { VideoShowcase } from "@/components/landing/video-showcase";
import { Integrations } from "@/components/landing/integrations";

export default function SalesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <VideoShowcase />
      <Solutions />
      <AIMatching />
      <Features />
      <WhyUs />
      <Testimonials />
      <BlogSection />
      <FAQSection />
      <CTA />
      <Footer />
    </main>
  );
}
