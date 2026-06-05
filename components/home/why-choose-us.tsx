"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import {
  Shield,
  Zap,
  Globe,
  HeadphonesIcon,
  Layers,
  TrendingUp,
  Lock,
  Server,
  CheckCircle2,
} from "lucide-react";

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest * 10) / 10);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function WhyChooseUsSection() {
  const t = useTranslations("whyChooseUs");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden bg-white">
      {/* Multi-layered background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        
        {/* Animated accent orbs */}
        <motion.div
          className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.16 330 / 0.1) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.15 200 / 0.08) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.15, 1], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(oklch(0.38 0.16 330 / 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            {t("badge")}
          </motion.span>
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

        {/* Bento grid with enhanced visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {/* Large card - Security (spans 2 cols and 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:col-span-2 lg:row-span-2 group"
          >
            <div className="h-full rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
              {/* Background visual */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[oklch(0.55_0.15_200)]/10 rounded-full blur-[60px]" />
              </div>
              
              <div className="relative p-6 sm:p-8 h-full flex flex-col">
                {/* Icon with animated ring */}
                <div className="relative mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ width: 64, height: 64 }}
                  />
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">{t("items.security.title")}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{t("items.security.description")}</p>
                
                {/* Animated stat with glow */}
                <div className="mt-auto">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                    <div className="relative text-5xl sm:text-6xl font-bold bg-gradient-to-br from-primary to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent mb-2">
                      <AnimatedCounter value={99.9} suffix="%" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("items.security.stat")}</div>
                </div>

                {/* Security badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { icon: Lock, label: "SSL" },
                    { icon: Server, label: "SOC2" },
                    { icon: CheckCircle2, label: "GDPR" },
                  ].map((badge) => (
                    <span key={badge.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                      <badge.icon className="h-3 w-3" />
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medium card - Speed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group"
          >
            <div className="h-full rounded-3xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-chart-5/40 hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-chart-5/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-chart-5/20 to-chart-5/5 flex items-center justify-center mb-4 border border-chart-5/20">
                  <Zap className="h-6 w-6 text-chart-5" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("items.speed.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("items.speed.description")}</p>
                <div className="text-3xl font-bold text-chart-5">
                  {"<"}<AnimatedCounter value={50} suffix="ms" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medium card - Global */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group"
          >
            <div className="h-full rounded-3xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-[oklch(0.55_0.15_200)]/40 hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[oklch(0.55_0.15_200)]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.15_200)]/20 to-[oklch(0.55_0.15_200)]/5 flex items-center justify-center mb-4 border border-[oklch(0.55_0.15_200)]/20">
                  <Globe className="h-6 w-6 text-[oklch(0.55_0.15_200)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("items.global.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("items.global.description")}</p>
                <div className="text-3xl font-bold text-[oklch(0.55_0.15_200)]">
                  <AnimatedCounter value={8} suffix="+" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small card - Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group"
          >
            <div className="h-full rounded-3xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-chart-4/40 hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-chart-4/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-chart-4/20 to-chart-4/5 flex items-center justify-center border border-chart-4/20">
                    <HeadphonesIcon className="h-6 w-6 text-chart-4" />
                  </div>
                  <div className="text-2xl font-bold text-chart-4">24/7</div>
                </div>
                <h3 className="text-lg font-bold mb-1">{t("items.support.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("items.support.description")}</p>
              </div>
            </div>
          </motion.div>

          {/* Small card - Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="group"
          >
            <div className="h-full rounded-3xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-chart-2/40 hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-chart-2/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-2/5 flex items-center justify-center border border-chart-2/20">
                    <Layers className="h-6 w-6 text-chart-2" />
                  </div>
                  <div className="text-2xl font-bold text-chart-2">14+</div>
                </div>
                <h3 className="text-lg font-bold mb-1">{t("items.integrations.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("items.integrations.description")}</p>
              </div>
            </div>
          </motion.div>

          {/* Wide card - Growth (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="sm:col-span-2 group"
          >
            <div className="h-full rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-chart-4/40 hover:shadow-xl overflow-hidden">
              {/* Background growth chart visual */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="growthGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="oklch(0.55 0.18 150)" stopOpacity="0" />
                      <stop offset="100%" stopColor="oklch(0.55 0.18 150)" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,100 Q50,80 100,60 T200,40 T300,30 T400,20 T500,15 L500,100 Z"
                    fill="url(#growthGradient)"
                    transform="scale(1, -1) translate(0, -100)"
                  />
                </svg>
              </div>
              
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-chart-4/20 to-chart-4/5 flex items-center justify-center flex-shrink-0 border border-chart-4/20">
                    <TrendingUp className="h-7 w-7 text-chart-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{t("items.growth.title")}</h3>
                    <p className="text-muted-foreground">{t("items.growth.description")}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-chart-4/20 blur-2xl rounded-full" />
                    <div className="relative text-4xl sm:text-5xl font-bold bg-gradient-to-br from-chart-4 to-[oklch(0.55_0.15_150)] bg-clip-text text-transparent">
                      <AnimatedCounter value={300} suffix="%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
