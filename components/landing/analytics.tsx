"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";

export function Analytics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="analytics" className="relative py-32" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              Analytics
            </span>
            <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Data-driven insights for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                smarter decisions
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Gain deep visibility into your property portfolio with comprehensive analytics.
              Track performance, identify trends, and optimize revenue with real-time data.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: LineChart,
                  title: "Performance Tracking",
                  desc: "Monitor occupancy, revenue, and growth trends",
                },
                {
                  icon: BarChart3,
                  title: "Market Analysis",
                  desc: "Compare against market benchmarks",
                },
                {
                  icon: PieChart,
                  title: "Portfolio Breakdown",
                  desc: "Visualize asset distribution and health",
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Optimization",
                  desc: "Identify opportunities for growth",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard mockup */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />

            {/* Main dashboard */}
            <motion.div
              style={{ y: y1 }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/30 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-chart-4/60" />
                <div className="h-3 w-3 rounded-full bg-chart-2/60" />
                <span className="ml-4 text-xs text-muted-foreground">Analytics Dashboard</span>
              </div>
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold">$4.2M</p>
                  </div>
                  <div className="rounded-lg bg-chart-2/20 px-3 py-1 text-sm text-chart-2">
                    +23% vs last month
                  </div>
                </div>
                <div className="h-48">
                  <div className="flex h-full items-end gap-2">
                    {[65, 45, 78, 52, 88, 62, 95, 70, 85, 58, 92, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${h}%` } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -right-4 -bottom-8 w-64 overflow-hidden rounded-xl border border-border/50 bg-card/90 p-4 shadow-xl backdrop-blur-sm lg:-right-8"
            >
              <p className="text-sm font-medium">Occupancy Rate</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold">94.2%</span>
                <span className="text-sm text-chart-2">+5.4%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "94.2%" } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
