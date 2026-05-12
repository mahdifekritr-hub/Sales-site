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
  },
  {
    icon: Bot,
    title: "AI-Powered Platform",
    description: "Smart assistance at every step",
  },
  {
    icon: Tag,
    title: "White-Label Solution",
    description: "Fully branded under your name",
  },
  {
    icon: Wrench,
    title: "All-in-One Software",
    description: "Maintenance, CRM, Sales & more",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Arabic, Turkish, English & more",
  },
  {
    icon: Zap,
    title: "Fast Setup & Training",
    description: "From blueprint to go-live in no time",
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Support",
    description: "Always here via chat, phone & ticket",
  },
];

export function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
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

        {/* Cards grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Icon */}
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <reason.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="relative mb-2 text-lg font-semibold tracking-tight">
                {reason.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
