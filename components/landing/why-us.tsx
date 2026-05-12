"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Tag,
  Wrench,
  Languages,
  Zap,
  Clock,
} from "lucide-react";

// Canada Flag Icon Component
function CanadaFlag() {
  return (
    <svg
      viewBox="0 0 32 20"
      className="h-5 w-5 text-primary"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red left stripe */}
      <rect x="0" y="0" width="7.2" height="20" fill="currentColor" />
      
      {/* White middle section */}
      <rect x="7.2" y="0" width="17.6" height="20" fill="white" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Red right stripe */}
      <rect x="24.8" y="0" width="7.2" height="20" fill="currentColor" />
      
      {/* Maple leaf - simplified */}
      <path
        d="M16 4 L16.6 6.5 L19 7 L17.3 8.5 L17.8 11 L16 9.5 L14.2 11 L14.7 8.5 L13 7 L15.4 6.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const reasons = [
  { icon: CanadaFlag, title: "International & Trusted", stat: "40K+", statLabel: "Users" },
  { icon: Bot, title: "AI-Powered Platform", stat: "24/7", statLabel: "Support" },
  { icon: Tag, title: "White-Label Solution", stat: "100%", statLabel: "Custom" },
  { icon: Wrench, title: "All-in-One Software", stat: "15+", statLabel: "Modules" },
  { icon: Languages, title: "Multi-Language", stat: "8+", statLabel: "Languages" },
  { icon: Zap, title: "Fast Setup", stat: "48h", statLabel: "Go-Live" },
  { icon: Clock, title: "Dedicated Support", stat: "99.9%", statLabel: "Uptime" },
];

export function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="inline-block rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
            Why Us
          </span>
          <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
            Why choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PropertyCare
            </span>
          </h2>
        </motion.div>

        {/* Horizontal scrolling showcase */}
        <div className="relative">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-7 lg:overflow-visible lg:pb-0">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="group flex-shrink-0 snap-center w-[140px] sm:w-[160px] lg:w-auto"
                >
                  <div className="relative h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 text-center transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                    {/* Icon */}
                    <div className="mx-auto mb-3 h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    {/* Stat */}
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {reason.stat}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-2">
                      {reason.statLabel}
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-sm font-medium leading-tight">
                      {reason.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Scroll fade indicators for mobile */}
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none lg:hidden" />
        </div>
      </div>
    </section>
  );
}
