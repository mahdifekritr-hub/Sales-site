"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-primary/10 blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Introducing AI-Powered Property Matching</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl text-balance text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            The future of
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              property management
            </span>
            <br />
            is here.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Transform property sales and rentals with AI-powered matching, immersive virtual tours, 
            and seamless contract management. Built for the modern real estate professional.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border bg-transparent text-foreground hover:bg-secondary"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["Skyline Towers", "Urban Living", "Metro Estates", "Prime Properties", "Vista Homes"].map(
                (company) => (
                  <span key={company} className="text-lg font-medium tracking-tight">
                    {company}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-20"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-2xl backdrop-blur-sm lg:rounded-3xl">
            <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/30 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-chart-4/60" />
              <div className="h-3 w-3 rounded-full bg-chart-2/60" />
              <span className="ml-4 text-xs text-muted-foreground">PropertyCare Dashboard</span>
            </div>
            <div className="p-6 lg:p-8">
              {/* Dashboard mockup content */}
              <div className="grid gap-4 lg:grid-cols-4">
                <DashboardCard title="Active Listings" value="247" change="+12%" />
                <DashboardCard title="Virtual Tours" value="1,842" change="+28%" />
                <DashboardCard title="Contracts Signed" value="89" change="+8%" />
                <DashboardCard title="Revenue" value="$2.4M" change="+15%" />
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="col-span-2 rounded-xl border border-border/50 bg-secondary/30 p-4">
                  <p className="mb-4 text-sm font-medium">Property Performance</p>
                  <div className="flex h-40 items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                  <p className="mb-4 text-sm font-medium">Recent Activity</p>
                  <div className="space-y-3">
                    {[
                      { text: "New booking request", time: "2m ago" },
                      { text: "Contract signed", time: "15m ago" },
                      { text: "Virtual tour completed", time: "1h ago" },
                      { text: "Payment received", time: "3h ago" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.text}</span>
                        <span className="text-xs text-muted-foreground/60">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-chart-2">{change}</span>
      </div>
    </div>
  );
}
