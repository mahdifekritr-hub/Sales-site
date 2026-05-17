"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import {
  FileText,
  Palette,
  Rocket,
  HeadphonesIcon,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    key: "blueprint",
    icon: FileText,
    gradient: "from-primary to-[oklch(0.45_0.18_340)]",
    bgGlow: "primary",
  },
  {
    key: "design",
    icon: Palette,
    gradient: "from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)]",
    bgGlow: "[oklch(0.55_0.18_200)]",
  },
  {
    key: "delivery",
    icon: Rocket,
    gradient: "from-chart-4 to-[oklch(0.5_0.14_140)]",
    bgGlow: "chart-4",
  },
  {
    key: "support",
    icon: HeadphonesIcon,
    gradient: "from-chart-5 to-[oklch(0.55_0.16_40)]",
    bgGlow: "chart-5",
  },
];

export function WorkflowSection() {
  const t = useTranslations("workflow");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background with gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.12_0.01_330)] to-background" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.16 330 / 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.15 200 / 0.08) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.18 40 / 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(oklch(0.38 0.16 330 / 0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          }}
        />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
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

        {/* Timeline with enhanced visuals */}
        <div className="relative">
          {/* Connecting line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            {/* Animated progress line */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-[oklch(0.55_0.15_200)] to-chart-4 rounded-full"
              style={{ scaleX: lineProgress, transformOrigin: "left" }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/50 via-[oklch(0.55_0.15_200)]/50 to-chart-4/50 blur-sm rounded-full"
              style={{ scaleX: lineProgress, transformOrigin: "left" }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${step.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Background glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                  
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 z-10">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-lg opacity-50`} />
                      <div className={`relative h-10 w-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-8">
                    {/* Icon with gradient background */}
                    <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${step.gradient} p-[2px] mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <div className="h-full w-full rounded-[14px] bg-card flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-foreground" />
                      </div>
                      {/* Icon glow */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{t(`steps.${step.key}.title`)}</h3>
                    <p className="text-muted-foreground text-sm mb-5">{t(`steps.${step.key}.description`)}</p>

                    {/* Features list */}
                    <ul className="space-y-2.5">
                      {[1, 2, 3].map((i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center gap-2.5 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.12 + i * 0.05 }}
                        >
                          <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${step.gradient} p-[1px] flex-shrink-0`}>
                            <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                              <Check className="h-3 w-3 text-foreground" />
                            </div>
                          </div>
                          <span className="text-muted-foreground">{t(`steps.${step.key}.features.${i}`)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow connector - Desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.12 }}
                      className="h-8 w-8 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-lg"
                    >
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats at bottom with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-[oklch(0.55_0.15_200)]/5" />
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-chart-4/10 rounded-full blur-[80px]" />
            
            <div className="relative py-8 sm:py-10 px-6 sm:px-8">
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 lg:gap-24">
                {[
                  { value: "500+", label: t("stats.projects"), gradient: "from-primary to-[oklch(0.55_0.15_200)]" },
                  { value: "2-4", label: t("stats.weeks"), gradient: "from-[oklch(0.55_0.15_200)] to-chart-4" },
                  { value: "100%", label: t("stats.satisfaction"), gradient: "from-chart-4 to-chart-5" },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
