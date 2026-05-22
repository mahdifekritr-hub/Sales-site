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

export default function AssetsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
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
