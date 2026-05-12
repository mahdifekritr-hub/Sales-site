"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Bot,
  Tag,
  Wrench,
  Languages,
  Zap,
  Clock,
} from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "International & Trusted",
    description: "Registered in Canada · 8 Countries · 40K+ Users",
    stat: "40K+",
    statLabel: "Active Users",
  },
  {
    icon: Bot,
    title: "AI-Powered Platform",
    description: "Smart assistance at every step of your journey",
    stat: "24/7",
    statLabel: "AI Support",
  },
  {
    icon: Tag,
    title: "White-Label Solution",
    description: "Fully branded under your name with complete customization",
    stat: "100%",
    statLabel: "Customizable",
  },
  {
    icon: Wrench,
    title: "All-in-One Software",
    description: "Maintenance, CRM, Sales & more unified in one platform",
    stat: "15+",
    statLabel: "Modules",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Arabic, Turkish, English & more languages available",
    stat: "8+",
    statLabel: "Languages",
  },
  {
    icon: Zap,
    title: "Fast Setup & Training",
    description: "From blueprint to go-live in record time",
    stat: "48h",
    statLabel: "Avg Setup",
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Support",
    description: "Always here via chat, phone & ticket system",
    stat: "99.9%",
    statLabel: "Uptime",
  },
];

export function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
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
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            Trusted globally, built for scale, and designed to elevate your property management experience.
          </p>
        </motion.div>

        {/* Alternating spotlight layout with timeline */}
        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          {/* Central timeline line - hidden on mobile */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden lg:block w-px -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full w-full bg-gradient-to-b from-transparent via-primary/40 to-transparent origin-top"
            />
          </div>

          {/* Spotlight items */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-0">
            {reasons.map((reason, index) => {
              const isLeft = index % 2 === 0;
              const Icon = reason.icon;
              
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * index }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${
                    index !== 0 ? "lg:mt-20" : ""
                  }`}
                >
                  {/* Timeline node - hidden on mobile */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + 0.15 * index }}
                      className="relative"
                    >
                      {/* Outer ring */}
                      <div className="absolute inset-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-sm" />
                      {/* Inner node */}
                      <div className="relative h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`${
                      isLeft ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"
                    }`}
                  >
                    <div
                      className={`group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:border-primary/30 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 ${
                        isLeft ? "lg:ml-auto" : ""
                      } max-w-xl`}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Mobile number badge */}
                      <div className="lg:hidden absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className={`relative flex flex-col sm:flex-row gap-4 sm:gap-6 ${isLeft ? "lg:flex-row-reverse lg:text-left" : ""}`}>
                        {/* Icon container */}
                        <div className="flex-shrink-0">
                          <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary transition-colors duration-300 group-hover:text-accent" />
                          </div>
                        </div>

                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">
                            {reason.title}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                            {reason.description}
                          </p>
                          
                          {/* Stat badge */}
                          <div className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 ${isLeft ? "lg:ml-auto" : ""}`}>
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                              {reason.stat}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {reason.statLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Decorative corner accent */}
                      <div className={`absolute ${isLeft ? "right-0 top-0 rounded-tr-2xl rounded-bl-2xl" : "left-0 top-0 rounded-tl-2xl rounded-br-2xl"} w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={`hidden lg:block ${isLeft ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
