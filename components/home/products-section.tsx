"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import {
  Building2,
  Users,
  Wrench,
  BarChart3,
  Home,
  MessageSquare,
  ArrowRight,
  Check,
  Play,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    key: "sales",
    icon: Building2,
    gradient: "from-primary via-[oklch(0.45_0.16_320)] to-[oklch(0.4_0.14_340)]",
    accentColor: "primary",
    features: ["virtualTours", "inventory", "analytics", "agents"],
    mockupType: "dashboard",
  },
  {
    key: "crm",
    icon: Users,
    gradient: "from-[oklch(0.55_0.18_200)] via-[oklch(0.5_0.15_210)] to-[oklch(0.45_0.12_220)]",
    accentColor: "[oklch(0.55_0.18_200)]",
    features: ["leads", "pipeline", "automation", "reports"],
    mockupType: "pipeline",
  },
  {
    key: "maintenance",
    icon: Wrench,
    gradient: "from-chart-5 via-[oklch(0.55_0.16_35)] to-[oklch(0.5_0.14_50)]",
    accentColor: "chart-5",
    features: ["workOrders", "assets", "scheduling", "vendors"],
    mockupType: "tickets",
  },
  {
    key: "accounting",
    icon: BarChart3,
    gradient: "from-chart-4 via-[oklch(0.5_0.14_140)] to-[oklch(0.45_0.12_160)]",
    accentColor: "chart-4",
    features: ["invoicing", "payments", "budgets", "reports"],
    mockupType: "charts",
  },
  {
    key: "property",
    icon: Home,
    gradient: "from-[oklch(0.5_0.16_280)] via-[oklch(0.45_0.14_290)] to-[oklch(0.4_0.12_300)]",
    accentColor: "[oklch(0.5_0.16_280)]",
    features: ["units", "tenants", "leases", "amenities"],
    mockupType: "units",
  },
  {
    key: "communication",
    icon: MessageSquare,
    gradient: "from-[oklch(0.6_0.16_190)] via-[oklch(0.55_0.14_200)] to-[oklch(0.5_0.12_210)]",
    accentColor: "[oklch(0.6_0.16_190)]",
    features: ["notifications", "announcements", "chat", "surveys"],
    mockupType: "chat",
  },
];

// Mini mockup components for visual interest
function DashboardMockup() {
  return (
    <div className="absolute top-4 right-4 w-24 h-16 rounded-lg bg-secondary/50 border border-border/30 overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity">
      <div className="h-2 bg-primary/30 m-1.5 rounded" />
      <div className="flex gap-1 px-1.5">
        <div className="h-6 w-6 rounded bg-primary/20" />
        <div className="flex-1 space-y-1">
          <div className="h-1.5 bg-border rounded w-full" />
          <div className="h-1.5 bg-border rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

function PipelineMockup() {
  return (
    <div className="absolute top-4 right-4 flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
      {[3, 2, 4, 1].map((count, i) => (
        <div key={i} className="w-5 rounded-md bg-secondary/50 border border-border/30 p-0.5">
          {[...Array(count)].map((_, j) => (
            <div key={j} className="h-1.5 rounded-sm bg-[oklch(0.55_0.18_200)]/30 mb-0.5 last:mb-0" />
          ))}
        </div>
      ))}
    </div>
  );
}

function ChartMockup() {
  return (
    <div className="absolute top-4 right-4 w-20 h-12 flex items-end gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-chart-4/60 to-chart-4/20"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function ProductsSection() {
  const t = useTranslations("productsSection");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background with multiple layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Base dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.12_0.01_330)] to-background" />
        
        {/* Accent orbs */}
        <motion.div
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.16 330 / 0.1) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.15 200 / 0.08) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.18 40 / 0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <Sparkles className="h-4 w-4" />
            {t("badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Products grid with staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              onMouseEnter={() => setActiveProduct(index)}
              className="group relative"
            >
              <div
                className={`relative h-full rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-500 overflow-hidden ${
                  activeProduct === index 
                    ? "border-primary/40 shadow-2xl shadow-primary/10" 
                    : "border-border/40 hover:border-border/60"
                }`}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${product.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                
                {/* Hover background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${product.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-full`} />

                <div className="relative p-6 sm:p-7">
                  {/* Mini mockup visual */}
                  {product.mockupType === "dashboard" && <DashboardMockup />}
                  {product.mockupType === "pipeline" && <PipelineMockup />}
                  {product.mockupType === "charts" && <ChartMockup />}

                  {/* Icon with gradient ring */}
                  <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${product.gradient} p-[2px] mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <div className="h-full w-full rounded-[14px] bg-card flex items-center justify-center">
                      <product.icon className="h-6 w-6 text-foreground" />
                    </div>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">
                    {t(`products.${product.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base mb-5 line-clamp-3">
                    {t(`products.${product.key}.description`)}
                  </p>

                  {/* Features list with icons */}
                  <ul className="space-y-2.5 mb-6">
                    {product.features.map((feature, i) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-center gap-2.5 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.08 + i * 0.05 }}
                      >
                        <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${product.gradient} p-[1px]`}>
                          <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                            <Check className="h-3 w-3 text-foreground" />
                          </div>
                        </div>
                        <span className="text-muted-foreground">{t(`products.${product.key}.features.${feature}`)}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 font-medium text-sm transition-all group-hover:gap-3`}>
                    <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all">
                      {t("exploreModule")}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-8 sm:p-12 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-[oklch(0.55_0.15_200)]/5" />
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[oklch(0.55_0.15_200)]/10 rounded-full blur-[100px]" />
            
            <div className="relative text-center">
              <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">{t("customSolution")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://admin.propertycareapp.com/create-subscription/53/false/EN">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    {t("startTrial")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://fire.chilipiper.com/me/property-careapp/meeting-with-propertycare">
                  <Button size="lg" variant="outline" className="gap-2 bg-card/50 hover:bg-card">
                    <Play className="h-4 w-4" />
                    {t("contactSales")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
