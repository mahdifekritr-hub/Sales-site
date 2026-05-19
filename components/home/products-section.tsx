"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import {
  Building2,
  Users,
  Wrench,
  ClipboardList,
  ArrowRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    key: "sales",
    icon: Building2,
    title: "Sales & Rentals",
    description: "Manage property sales, rentals, listings and customer operations from one platform.",
    bgColor: "bg-[#f5f5f0]",
    mockupSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-18%20152707-V7Pfstru7FK5WO2XxFh9RdsmSs71ej.png",
    position: "left-top",
  },
  {
    key: "crm",
    icon: Users,
    title: "CRM",
    description: "Choose talent and collaborate with your team effectively.",
    bgColor: "bg-[#f0eef8]",
    mockupSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-18%20152654-0U1P4BklrtrHUy7VxLW08JP5gowguk.png",
    position: "right-top",
  },
  {
    key: "maintenance",
    icon: Wrench,
    title: "Maintenance",
    description: "All DMs are finally in one app. Streamline communication.",
    bgColor: "bg-[#f0f5f5]",
    mockupSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-18%20152707-V7Pfstru7FK5WO2XxFh9RdsmSs71ej.png",
    position: "left-bottom",
  },
  {
    key: "requests",
    icon: ClipboardList,
    title: "Maintenance Requests",
    description: "Choose talent on rating and reviews. Build trust with transparency.",
    bgColor: "bg-[#faf5f5]",
    mockupSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-18%20152654-0U1P4BklrtrHUy7VxLW08JP5gowguk.png",
    position: "right-bottom",
  },
];

// Product card mockup components
function CreateProjectMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-end pr-4">
      {/* Left info panel */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-4 w-40 space-y-3 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Austin</span>
        </div>
        <div className="text-[10px] text-muted-foreground">TX, USA</div>
        <div className="flex items-center gap-2 pt-2 border-t">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-xs">Sunday, 28 Mar</span>
        </div>
        <div className="text-[10px] text-primary font-medium">Expires in 3 days</div>
        <div className="text-[9px] text-muted-foreground">Close applications 3 days before the start of the project</div>
      </div>
      
      {/* Phone mockup */}
      <div className="relative w-36 h-64 bg-white rounded-[2rem] shadow-xl border-4 border-gray-200 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-b-xl" />
        <div className="p-3 pt-6 h-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] text-muted-foreground">9:41</span>
            <span className="text-[8px] font-medium">Create Project</span>
            <span className="text-[8px]">×</span>
          </div>
          <div className="text-[8px] text-muted-foreground mb-2">References (4)</div>
          <div className="grid grid-cols-2 gap-1">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-100 to-amber-200" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-rose-100 to-rose-200" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-sky-100 to-sky-200" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200" />
          </div>
          <button className="mt-3 text-[8px] flex items-center gap-1 text-muted-foreground">
            + Add more
          </button>
        </div>
      </div>
    </div>
  );
}

function HireTalentMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Main image card */}
      <div className="relative w-48 h-56 rounded-2xl overflow-hidden shadow-xl rotate-2">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-200 to-pink-300" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/80" />
          <div>
            <div className="text-[10px] font-semibold">James Smith</div>
            <div className="text-[8px] text-muted-foreground flex items-center gap-1">
              <span className="text-amber-500">5.0★</span> • Photographer
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-3 rounded-t-2xl">
          <p className="text-[9px] text-muted-foreground">Hi, I can give you 15 edited images for $220</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px]">💰</span>
            <span className="text-[11px] font-semibold">$220</span>
          </div>
        </div>
      </div>
      
      {/* Floating secondary images */}
      <div className="absolute top-4 right-4 w-20 h-24 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 shadow-lg -rotate-6" />
      <div className="absolute bottom-8 left-4 w-16 h-20 rounded-xl bg-gradient-to-br from-sky-100 to-sky-200 shadow-lg rotate-3" />
    </div>
  );
}

function CommunicationMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Phone mockup - inbox */}
      <div className="relative w-52 h-72 bg-white rounded-[2rem] shadow-xl border-4 border-gray-200 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-b-xl" />
        <div className="p-4 pt-8 h-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-muted-foreground">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 bg-muted rounded-sm" />
              <div className="w-3 h-2 bg-muted rounded-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Inbox</h3>
            <div className="w-4 h-4 rounded bg-muted" />
          </div>
          
          <div className="flex gap-2 mb-4">
            <span className="text-[9px] px-2 py-1 bg-foreground text-background rounded-full">Active</span>
            <span className="text-[9px] px-2 py-1 text-muted-foreground">Completed</span>
            <span className="text-[9px] px-2 py-1 text-muted-foreground">Archive</span>
          </div>
          
          {/* Message items */}
          <div className="space-y-3">
            <div className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium">James Smith</span>
                  <span className="text-[8px] text-muted-foreground">09:00 AM</span>
                </div>
                <p className="text-[8px] text-muted-foreground truncate">Portrait Photo Shoot • Sun, 16 Apr...</p>
                <p className="text-[8px] text-muted-foreground">I can arrive at 8 am</p>
              </div>
              <div className="w-4 h-4 rounded-full bg-primary text-[8px] text-white flex items-center justify-center">1</div>
            </div>
            
            <div className="flex items-start gap-2 p-2 rounded-lg opacity-60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium">James Smith</span>
                  <span className="text-[8px] text-muted-foreground">09:00 AM</span>
                </div>
                <p className="text-[8px] text-muted-foreground truncate">Portrait Photo Shoot • Sun, 16 Apr...</p>
                <p className="text-[8px] text-muted-foreground">I can arrive at 8 am</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Main project card */}
      <div className="relative bg-white rounded-2xl shadow-xl p-4 w-44 -rotate-2">
        <div className="text-sm font-semibold mb-1">Portrait photo shoot</div>
        <div className="text-primary text-xs italic mb-2">28 Mar</div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] px-2 py-0.5 bg-muted rounded-full flex items-center gap-1">
            ❤️ 123
          </span>
          <span className="text-[9px] px-2 py-0.5 bg-muted rounded-full flex items-center gap-1">
            🔗 13
          </span>
        </div>
        <p className="text-[8px] text-muted-foreground leading-relaxed">
          Captured the essence of elegance. Stunning dresses was styled for...
        </p>
        <div className="text-[8px] font-medium mt-2">$2,500 • Austin, Texas • 28 Mar</div>
        <div className="text-[8px] text-muted-foreground">293k views</div>
      </div>
      
      {/* Review card */}
      <div className="absolute top-6 right-2 bg-white rounded-xl shadow-lg p-3 w-40 rotate-3">
        <div className="flex text-amber-400 text-xs mb-1">★★★★☆</div>
        <p className="text-[8px] text-muted-foreground mb-2">
          Loved working together — the photos turned out even better than expected!
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-300 to-rose-400" />
          <div>
            <div className="text-[9px] font-medium">Linda White</div>
            <div className="text-[7px] text-muted-foreground">5.0★ • Photographer</div>
          </div>
        </div>
      </div>
      
      {/* Heart counter */}
      <div className="absolute bottom-4 right-4 bg-rose-50 rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md">
        <span className="text-rose-500">❤️</span>
        <span className="text-xs font-semibold text-rose-600">123</span>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: typeof products[0];
  index: number;
  scrollProgress: any;
  isInView: boolean;
}

function ProductCard({ product, index, scrollProgress, isInView }: ProductCardProps) {
  // Calculate initial offsets based on position
  const getInitialOffset = () => {
    switch (product.position) {
      case "left-top":
        return { x: -60, y: -40 };
      case "right-top":
        return { x: 60, y: -30 };
      case "left-bottom":
        return { x: -50, y: 40 };
      case "right-bottom":
        return { x: 50, y: 50 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();
  
  // Scroll-based transforms
  const x = useTransform(scrollProgress, [0, 0.5, 1], [initialOffset.x, initialOffset.x * 0.3, 0]);
  const y = useTransform(scrollProgress, [0, 0.5, 1], [initialOffset.y, initialOffset.y * 0.3, 0]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.92, 0.96, 1]);
  const opacity = useTransform(scrollProgress, [0, 0.3, 1], [0.7, 0.9, 1]);

  const getMockup = () => {
    switch (index) {
      case 0:
        return <CreateProjectMockup />;
      case 1:
        return <HireTalentMockup />;
      case 2:
        return <CommunicationMockup />;
      case 3:
        return <TrustMockup />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="group relative"
    >
      <div
        className={`relative h-[380px] sm:h-[420px] lg:h-[460px] rounded-3xl ${product.bgColor} overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
      >
        {/* Content */}
        <div className="absolute top-6 left-6 z-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground max-w-[200px]">
            {product.description}
          </p>
        </div>

        {/* Mockup area */}
        <div className="absolute inset-0 pt-24">
          {getMockup()}
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsSection() {
  const t = useTranslations("productsSection");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"hirer" | "talent">("hirer");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-background"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight text-foreground mb-4"
          >
            We&apos;ve done the hard part,
            <br />
            now it&apos;s your turn to create
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl mx-auto text-muted-foreground text-sm sm:text-base mb-8"
          >
            Whether you&apos;re looking for work or finding talent,
            <br />
            everything is designed to flow effortlessly.
          </motion.p>

          {/* Toggle tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card"
          >
            <button
              onClick={() => setActiveTab("hirer")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === "hirer"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Hirer
            </button>
            <button
              onClick={() => setActiveTab("talent")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === "talent"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Talent
            </button>
          </motion.div>
        </div>

        {/* 2x2 Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* Top row */}
          <div className="md:mt-0">
            <ProductCard
              product={products[0]}
              index={0}
              scrollProgress={scrollYProgress}
              isInView={isInView}
            />
          </div>
          <div className="md:mt-12 lg:mt-16">
            <ProductCard
              product={products[1]}
              index={1}
              scrollProgress={scrollYProgress}
              isInView={isInView}
            />
          </div>

          {/* Bottom row */}
          <div className="md:-mt-8 lg:-mt-12">
            <ProductCard
              product={products[2]}
              index={2}
              scrollProgress={scrollYProgress}
              isInView={isInView}
            />
          </div>
          <div className="md:mt-4 lg:mt-8">
            <ProductCard
              product={products[3]}
              index={3}
              scrollProgress={scrollYProgress}
              isInView={isInView}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://admin.propertycareapp.com/create-subscription/53/false/EN">
              <Button size="lg" className="gap-2">
                {t("startTrial")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://fire.chilipiper.com/me/property-careapp/meeting-with-propertycare">
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-4 w-4" />
                {t("contactSales")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
