"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { AboutHero } from "@/components/about/hero";
import { MissionVision } from "@/components/about/mission-vision";
import { CompanyValues } from "@/components/about/company-values";
import { Integrations } from "@/components/about/integrations";
import { Platforms } from "@/components/about/platforms";
import { AboutCTA } from "@/components/about/cta";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AboutHero />
      <MissionVision />
      <CompanyValues />
      <Integrations />
      <Platforms />
      <AboutCTA />
      <Footer />
    </main>
  );
}
