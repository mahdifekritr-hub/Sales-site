"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Settings, Apple, Play } from "lucide-react";

const platforms = [
  {
    category: "Web Applications",
    items: [
      { name: "Web Application (Sales)", icon: Monitor, description: "Full-featured sales management portal" },
      { name: "Web Application (Maintenance)", icon: Monitor, description: "Comprehensive maintenance tracking" },
      { name: "Admin Panel", icon: Settings, description: "Central administration dashboard" },
    ],
  },
  {
    category: "iOS Applications",
    items: [
      { name: "iOS App for Management", icon: Apple, description: "Mobile management on the go" },
      { name: "iOS App for Residents & Owners", icon: Apple, description: "Resident self-service portal" },
    ],
  },
  {
    category: "Android Applications",
    items: [
      { name: "Android App for Management", icon: Play, description: "Full management capabilities" },
      { name: "Android App for Residents & Owners", icon: Play, description: "Community access anywhere" },
    ],
  },
];

export function Platforms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-secondary/30" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
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
            <Smartphone className="h-4 w-4" />
            Platforms
          </span>
          <h2 className="mt-6 text-balance text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
            Available on{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              All Platforms
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg">
            Access your property management tools from any device, anywhere, anytime.
          </p>
        </motion.div>

        {/* Platforms Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {platforms.map((platform, categoryIndex) => (
            <motion.div
              key={platform.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-center lg:text-left">{platform.category}</h3>
              <div className="space-y-3">
                {platform.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + index * 0.05 }}
                    className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
