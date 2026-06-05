"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import {
  Building2,
  Users,
  Wrench,
  BarChart3,
  Sparkles,
  Home,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Image from "next/image";

const modules = [
  { key: "sales", icon: Building2, color: "from-primary to-[oklch(0.45_0.18_340)]", bgGlow: "primary" },
  { key: "crm", icon: Users, color: "from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)]", bgGlow: "[oklch(0.55_0.18_200)]" },
  { key: "maintenance", icon: Wrench, color: "from-chart-5 to-[oklch(0.5_0.15_40)]", bgGlow: "chart-5" },
  { key: "accounting", icon: BarChart3, color: "from-chart-4 to-[oklch(0.45_0.12_130)]", bgGlow: "chart-4" },
  { key: "property", icon: Home, color: "from-[oklch(0.5_0.15_280)] to-[oklch(0.4_0.12_300)]", bgGlow: "[oklch(0.5_0.15_280)]" },
  { key: "ai", icon: Sparkles, color: "from-[oklch(0.55_0.2_350)] to-primary", bgGlow: "primary" },
];

export function PlatformOverview() {
  const t = useTranslations("platformOverview");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden bg-white">
      {/* Multi-layered background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Base - pure white */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Accent orbs */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.16 330 / 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.15 200 / 0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(oklch(0.38 0.16 330 / 0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            <Zap className="h-4 w-4" />
            {t("badge")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {t("title")}
            <br />
            <span className="bg-gradient-to-r from-primary via-[oklch(0.55_0.18_200)] to-[oklch(0.5_0.15_280)] bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
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

        {/* Platform visual - Hub and spoke design */}
        <div className="relative mb-16 sm:mb-20">
          {/* Central hub with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-12 sm:mb-16"
          >
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[oklch(0.55_0.15_200)]/20"
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />

            {/* Central glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />

            {/* Central circle with glass effect */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-card/90 to-card/50 border border-primary/40 flex items-center justify-center backdrop-blur-xl shadow-2xl shadow-primary/20">
              <div className="text-center">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.18_200)] flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent">PropertyCare</span>
              </div>
            </div>
          </motion.div>

          {/* Module cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {modules.map((module, index) => (
              <motion.div
                key={module.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                onMouseEnter={() => setHoveredModule(index)}
                onMouseLeave={() => setHoveredModule(null)}
                className="group relative"
              >
                {/* Card with hover effects */}
                <div className={`relative h-full rounded-2xl border bg-card/60 p-4 sm:p-5 backdrop-blur-sm transition-all duration-500 overflow-hidden ${
                  hoveredModule === index 
                    ? "border-primary/50 shadow-xl shadow-primary/10 -translate-y-2" 
                    : "border-border/40 hover:border-border"
                }`}>
                  {/* Background glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Top glow accent */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-${module.bgGlow}/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                  {/* Icon with gradient background */}
                  <div className={`relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${module.color} p-0.5 mb-3 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <div className="h-full w-full rounded-[10px] bg-card/90 flex items-center justify-center backdrop-blur-sm">
                      <module.icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-sm sm:text-base mb-1.5">{t(`modules.${module.key}.title`)}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {t(`modules.${module.key}.description`)}
                  </p>

                  {/* Hover arrow */}
                  <div className="flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span>{t("learnMore")}</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection lines - visual only */}
          <svg
            className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 pointer-events-none -z-10"
            style={{ marginTop: "-20px" }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.38 0.16 330)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="oklch(0.38 0.16 330)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Stats row with enhanced visuals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { value: "40K+", label: t("stats.users"), color: "primary" },
            { value: "8", label: t("stats.countries"), color: "[oklch(0.55_0.15_200)]" },
            { value: "14+", label: t("stats.integrations"), color: "chart-4" },
            { value: "99.9%", label: t("stats.uptime"), color: "chart-4" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative text-center p-5 sm:p-6 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all"
            >
              {/* Background glow */}
              <div className={`absolute inset-0 bg-${stat.color}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-${stat.color}/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`relative text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-${stat.color} to-${stat.color}/70 bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="relative text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
