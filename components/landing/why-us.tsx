"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Globe,
  Bot,
  Tag,
  Wrench,
  Languages,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "International & Trusted",
    description: "Registered in Canada with presence across 8 countries and trusted by over 40,000 users worldwide.",
    stats: "40K+ Users",
  },
  {
    icon: Bot,
    title: "AI-Powered Platform",
    description: "Smart AI assistance at every step, from lead management to automated responses and insights.",
    stats: "24/7 AI",
  },
  {
    icon: Tag,
    title: "White-Label Solution",
    description: "Fully branded under your company name with complete customization options.",
    stats: "100% Yours",
  },
  {
    icon: Wrench,
    title: "All-in-One Software",
    description: "Complete suite including Maintenance, CRM, Sales, Rentals, and more in one unified platform.",
    stats: "20+ Modules",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Native support for Arabic, Turkish, English, and many more languages out of the box.",
    stats: "10+ Languages",
  },
  {
    icon: Zap,
    title: "Fast Setup & Training",
    description: "From blueprint to go-live in record time with dedicated onboarding support.",
    stats: "< 2 Weeks",
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Support",
    description: "Always here for you via chat, phone, and ticket system around the clock.",
    stats: "< 1hr Response",
  },
];

export function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            Why Us
          </span>
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            Why choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PropertyCare
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground">
            Trusted globally, built for scale, and designed to elevate your property management experience.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={() => setActiveIndex(0)}
            onMouseLeave={() => setActiveIndex(null)}
            className="group relative sm:col-span-2 lg:col-span-2 lg:row-span-2 overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Floating orbs */}
            <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-transform duration-700 group-hover:translate-x-4 group-hover:scale-110" />
            <div className="absolute bottom-12 left-12 h-24 w-24 rounded-full bg-accent/20 blur-2xl transition-transform duration-700 group-hover:-translate-y-4 group-hover:scale-110" />

            <div className="relative z-10 flex h-full flex-col">
              {/* Icon with animated ring */}
              <div className="relative mb-6 sm:mb-8">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20">
                  <Globe className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                  animate={activeIndex === 0 ? { scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="flex-1">
                <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
                  {reasons[0].title}
                </h3>
                <p className="mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-lg">
                  {reasons[0].description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {[
                    { label: "Countries", value: "8+" },
                    { label: "Active Users", value: "40K+" },
                    { label: "Since", value: "2018" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="text-center sm:text-left">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Trusted by leading real estate companies</span>
              </div>
            </div>
          </motion.div>

          {/* Smaller cards */}
          {reasons.slice(1).map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
              onMouseEnter={() => setActiveIndex(index + 1)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Header row */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3">
                    <reason.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    {reason.stats}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-base sm:text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1">
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
