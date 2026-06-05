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

export default function MaintenancePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
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
