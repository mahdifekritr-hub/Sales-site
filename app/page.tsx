import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HomeHero } from "@/components/home/hero";
import { PlatformOverview } from "@/components/home/platform-overview";
import { ProductsSection } from "@/components/home/products-section";
import { AIFeaturesSection } from "@/components/home/ai-features";
import { WhyChooseUsSection } from "@/components/home/why-choose-us";
import { WorkflowSection } from "@/components/home/workflow-section";
import { HomeTestimonials } from "@/components/home/testimonials";
import { HomeCTA } from "@/components/home/cta";
import { HomeIntegrations } from "@/components/home/integrations";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HomeHero />
      <PlatformOverview />
      <ProductsSection />
      <AIFeaturesSection />
      <WhyChooseUsSection />
      <WorkflowSection />
      <HomeTestimonials />
      <HomeIntegrations />
      <HomeCTA />
      <Footer />
    </main>
  );
}
