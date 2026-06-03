"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play, Building2, Users, Wrench, BarChart3, Sparkles, Calendar, TrendingUp, Bell, CheckCircle2 } from "lucide-react";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { ProductSignupTrigger } from "@/components/signup/product-signup-trigger";

const DASHBOARD_STAT_KEYS = ["properties", "tenants", "workOrders", "revenue"] as const;

const DASHBOARD_STAT_CONFIG: Record<
  (typeof DASHBOARD_STAT_KEYS)[number],
  { icon: typeof Building2; color: string; gradient: string }
> = {
  properties: { icon: Building2, color: "primary", gradient: "from-primary/20 to-primary/5" },
  tenants: {
    icon: Users,
    color: "chart-2",
    gradient: "from-[oklch(0.55_0.15_200)]/20 to-[oklch(0.55_0.15_200)]/5",
  },
  workOrders: { icon: Wrench, color: "chart-5", gradient: "from-chart-5/20 to-chart-5/5" },
  revenue: { icon: BarChart3, color: "chart-4", gradient: "from-chart-4/20 to-chart-4/5" },
};

export function HomeHero() {
  const t = useTranslations("homeHero");
  const trustedCompanies = t.raw("trustedCompanies") as string[];
  const chartPeriods = t.raw("dashboard.periods") as string[];
  const aiInsightItems = t.raw("floatingCards.aiInsights.items") as string[];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Stable particle positions/timings — computed once, never changes between renders
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        // Seeded-like distribution: spread particles evenly across the canvas
        const col = i % 5;
        const row = Math.floor(i / 5);
        return {
          left: col * 20 + 2 + ((i * 7) % 16),   // 0-100%, varied
          top: row * 25 + 3 + ((i * 11) % 18),    // 0-100%, varied
          duration: 4 + (i % 5),                   // 4–8s range, same as before
          delay: (i % 5) * 0.8,                    // 0–4s range, same as before
        };
      }),
    [],
  );

  return (
    <section ref={containerRef} className="relative min-h-[100vh] overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-20">
      {/* Multi-layered animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary gradient orb — CSS: scale 1→1.1→1, opacity 0.4→0.5→0.4, 8s easeInOut */}
        <div
          className="hero-orb-primary absolute left-1/2 top-0 h-[600px] w-[800px] sm:h-[900px] sm:w-[1400px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, oklch(0.38 0.16 330 / 0.4) 0%, oklch(0.38 0.16 330 / 0.1) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Cyan accent orb - right — CSS: x 0→60→0, y 0→-40→0, scale 1→1.15→1, 12s easeInOut */}
        <div
          className="hero-orb-cyan absolute right-[-10%] top-[20%] h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.18 200 / 0.25) 0%, oklch(0.55 0.15 200 / 0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Pink/magenta accent orb - left — CSS: x 0→-40→0, y 0→50→0, scale 1→1.1→1, 10s delay 1s easeInOut */}
        <div
          className="hero-orb-pink absolute left-[-5%] top-[40%] h-[350px] w-[450px] sm:h-[500px] sm:w-[700px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, oklch(0.55 0.2 350 / 0.2) 0%, oklch(0.45 0.18 340 / 0.05) 50%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Warm gold accent - bottom — CSS: x 0→30→0, opacity 0.15→0.25→0.15, 8s delay 2s easeInOut */}
        <div
          className="hero-orb-gold absolute bottom-[10%] left-[30%] h-[300px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, oklch(0.7 0.15 80 / 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Animated grid pattern with glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.38 0.16 330 / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.38 0.16 330 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      {/* Floating particles/dots — CSS: y 0→-30px→0, opacity 0.2→0.6→0.2, easeInOut */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero-particle absolute h-1 w-1 rounded-full bg-primary/40"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge with glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm shadow-lg shadow-primary/10">
              <Sparkles className="h-3.5 w-3.5" />
              {t("badge")}
            </span>
          </motion.div>

          {/* Main heading with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-primary via-[oklch(0.55_0.18_200)] to-[oklch(0.5_0.2_350)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t("titleLine2")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl px-2 sm:px-0"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA buttons with glow effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 sm:flex-row px-4 sm:px-0"
          >
            <ProductSignupTrigger
              product="sales"
              size="lg"
              className="group relative gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary to-[oklch(0.45_0.18_200)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                {t("startFreeTrial")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </ProductSignupTrigger>

            <Link href="https://fire.chilipiper.com/me/property-careapp/meeting-with-propertycare">
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-4 w-4" />
                {t("bookDemo")}
              </Button>
            </Link>
          </motion.div>

          {/* Hero Visual - Floating Dashboard Composition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 sm:mt-20 relative w-full max-w-6xl"
          >
            {/* Main Dashboard Preview with glass effect */}
            <div className="relative mx-auto rounded-2xl border border-border/30 bg-card/60 p-1.5 shadow-2xl shadow-primary/10 backdrop-blur-xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-chart-5/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-chart-5/40" />
                  <div className="h-2.5 w-2.5 rounded-full bg-chart-4/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-5 rounded-md bg-secondary/50 max-w-xs mx-auto" />
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-secondary/40 via-secondary/20 to-background/50 p-4 sm:p-6">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.18_200)] flex items-center justify-center shadow-lg shadow-primary/20">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t("dashboard.title")}</div>
                      <div className="text-xs text-muted-foreground">{t("dashboard.subtitle")}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* bell pulse: scale 1→1.1→1, 2s linear infinite */}
                    <div className="hero-bell h-8 w-8 rounded-lg bg-chart-4/10 flex items-center justify-center">
                      <Bell className="h-4 w-4 text-chart-4" />
                    </div>
                  </div>
                </div>

                {/* Stats Grid with varied colors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {DASHBOARD_STAT_KEYS.map((statKey, i) => {
                    const stat = DASHBOARD_STAT_CONFIG[statKey];
                    const change = t(`dashboard.stats.${statKey}.change`);
                    return (
                    <motion.div
                      key={statKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className={`relative rounded-xl border border-border/30 bg-gradient-to-br ${stat.gradient} p-3 sm:p-4 backdrop-blur-sm overflow-hidden group hover:border-${stat.color}/30 transition-colors`}
                    >
                      <div className={`absolute top-0 right-0 w-16 h-16 bg-${stat.color}/10 rounded-full blur-2xl group-hover:bg-${stat.color}/20 transition-colors`} />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                          <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                          <span className="text-xs text-muted-foreground">{t(`dashboard.stats.${statKey}.label`)}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-xl font-bold">{t(`dashboard.stats.${statKey}.value`)}</span>
                          <span className={`text-xs ${change.startsWith("+") ? "text-chart-4" : "text-chart-5"}`}>
                            {change}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    );
                  })}
                </div>

                {/* Activity Chart Placeholder */}
                <div className="rounded-xl border border-border/30 bg-card/40 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">{t("dashboard.revenueTrend")}</span>
                    <div className="flex gap-2">
                      {chartPeriods.map((period, i) => (
                        <button
                          key={period}
                          className={`px-2 py-0.5 rounded text-xs ${i === 1 ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Chart visualization */}
                  <div className="h-32 flex items-end gap-1">
                    {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 100].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 1 + i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/60 to-primary/20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards - AI Insights — CSS: y 0→-12px→0, rotate 0→-1deg→0, 5s easeInOut */}
            <div className="hero-card-insights absolute -left-4 sm:-left-12 top-[15%] rounded-xl border border-border/30 bg-card/90 p-3 sm:p-4 shadow-xl backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)] flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold">{t("floatingCards.aiInsights.title")}</div>
                  <div className="text-[10px] text-muted-foreground">{t("floatingCards.aiInsights.subtitle")}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                {aiInsightItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-chart-4" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Cards - Appointments — CSS: y 0→10px→0, rotate 0→1deg→0, 6s delay 1s easeInOut */}
            <div className="hero-card-appointments absolute -right-4 sm:-right-8 top-[25%] rounded-xl border border-border/30 bg-card/90 p-3 sm:p-4 shadow-xl backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-chart-4 to-chart-4/70 flex items-center justify-center shadow-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold">{t("floatingCards.schedule.title")}</div>
                  <div className="text-[10px] text-muted-foreground">{t("floatingCards.schedule.subtitle")}</div>
                </div>
              </div>
            </div>

            {/* Floating Cards - Growth — CSS: y 0→-8px→0, 4s delay 2s easeInOut */}
            <div className="hero-card-growth absolute right-[10%] -bottom-4 sm:-bottom-8 rounded-xl border border-border/30 bg-card/90 p-3 sm:p-4 shadow-xl backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-chart-4/80 to-[oklch(0.55_0.15_150)] flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-chart-4">{t("floatingCards.growth.value")}</div>
                  <div className="text-[10px] text-muted-foreground">{t("floatingCards.growth.subtitle")}</div>
                </div>
              </div>
            </div>

            {/* Glow effects behind dashboard */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 rounded-full blur-[100px]" />
              <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-[oklch(0.55_0.15_200)]/10 rounded-full blur-[80px]" />
            </div>
          </motion.div>

          {/* Trust badges with logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 sm:mt-24 flex flex-col items-center gap-6"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              {t("trustedBy")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {trustedCompanies.map((company, i) => (
                <motion.span
                  key={company}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className="text-base sm:text-lg font-semibold tracking-tight transition-all cursor-default"
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CSS for gradient + orb animations (replaces repeat:Infinity motion.div orbs) */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }

        /* Primary orb: scale 1→1.1→1, opacity 0.4→0.5→0.4, 8s easeInOut */
        @keyframes orb-primary {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.4; }
          50%       { transform: translateX(-50%) scale(1.1); opacity: 0.5; }
        }
        .hero-orb-primary {
          animation: orb-primary 8s ease-in-out infinite;
        }

        /* Cyan orb: x 0→60px→0, y 0→-40px→0, scale 1→1.15→1, 12s easeInOut */
        @keyframes orb-cyan {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(60px, -40px) scale(1.15); }
        }
        .hero-orb-cyan {
          animation: orb-cyan 12s ease-in-out infinite;
        }

        /* Pink orb: x 0→-40px→0, y 0→50px→0, scale 1→1.1→1, 10s delay 1s easeInOut */
        @keyframes orb-pink {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-40px, 50px) scale(1.1); }
        }
        .hero-orb-pink {
          animation: orb-pink 10s ease-in-out 1s infinite;
        }

        /* Gold orb: x 0→30px→0, opacity 0.15→0.25→0.15, 8s delay 2s easeInOut */
        @keyframes orb-gold {
          0%, 100% { transform: translateX(0px); opacity: 0.15; }
          50%       { transform: translateX(30px); opacity: 0.25; }
        }
        .hero-orb-gold {
          animation: orb-gold 8s ease-in-out 2s infinite;
        }

        /* Particles: y 0→-30px→0, opacity 0.2→0.6→0.2, easeInOut; duration & delay set inline */
        @keyframes hero-particle-float {
          0%, 100% { transform: translateY(0px); opacity: 0.2; }
          50%       { transform: translateY(-30px); opacity: 0.6; }
        }
        .hero-particle {
          animation: hero-particle-float ease-in-out infinite;
        }

        /* Bell icon: scale 1→1.1→1, 2s linear infinite */
        @keyframes hero-bell-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.1); }
        }
        .hero-bell {
          animation: hero-bell-pulse 2s linear infinite;
        }

        /* AI Insights card: y 0→-12px→0, rotate 0→-1deg→0, 5s easeInOut infinite */
        @keyframes hero-card-insights-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(-1deg); }
        }
        .hero-card-insights {
          animation: hero-card-insights-float 5s ease-in-out infinite;
        }

        /* Appointments card: y 0→10px→0, rotate 0→1deg→0, 6s delay 1s easeInOut infinite */
        @keyframes hero-card-appointments-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(10px) rotate(1deg); }
        }
        .hero-card-appointments {
          animation: hero-card-appointments-float 6s ease-in-out 1s infinite;
        }

        /* Growth card: y 0→-8px→0, 4s delay 2s easeInOut infinite */
        @keyframes hero-card-growth-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .hero-card-growth {
          animation: hero-card-growth-float 4s ease-in-out 2s infinite;
        }
      `}</style>
    </section>
  );
}
