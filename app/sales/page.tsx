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

export default async function SalesPage() {
  const locale = (await getLocale()) as Locale;
  const blogPosts = await getHomeBlogPosts(locale);

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
      <BlogSection posts={blogPosts} />
      <FAQSection />
      <CTA />
      <Footer />
    </main>
  );
}
