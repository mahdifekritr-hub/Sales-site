"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Heart, Globe, Award, Sparkles } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We constantly push boundaries to deliver cutting-edge property management solutions.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Our platform maintains 99.9% uptime with enterprise-grade security and performance.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Every feature we build starts with understanding our customers' real needs.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Supporting multi-language and multi-currency operations across continents.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Automating repetitive tasks so property managers can focus on what matters.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to delivering the highest quality in everything we do.",
  },
];

export function CompanyValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-secondary/30" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Heart className="h-4 w-4" />
            Our Values
          </span>
          <h2 className="mt-6 text-balance text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
            What{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Drives Us
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg">
            Our core values guide every decision we make and every feature we build.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 transition-transform group-hover:scale-110">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
