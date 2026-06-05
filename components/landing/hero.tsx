"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-20">
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[400px] sm:h-[600px] sm:w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[80px] sm:blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-accent/15 blur-[60px] sm:blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[150px] w-[250px] sm:h-[300px] sm:w-[500px] rounded-full bg-primary/10 blur-[60px] sm:blur-[80px]" />
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
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
            <br />
            {t("titleLine3")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl px-2 sm:px-0"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 sm:flex-row px-4 sm:px-0"
          >
            <Link href="https://admin.propertycareapp.com/create-subscription/53/false/EN">
              <Button
                size="lg"
                className="group gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              >
                {t("startFreeTrial")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="https://fire.chilipiper.com/me/property-careapp/meeting-with-propertycare">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border bg-transparent text-foreground hover:bg-secondary hover:text-black"
              >
                <Play className="h-4 w-4" />
                {t("bookDemo")}
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              {t("integrations")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["FCM", "Apple", "Amazon Hub", "Google Analytics", "Google Calendar", "Zego", "Expert Texting", "Quick Books"].map(
                (company) => (
                  <span key={company} className="text-lg font-medium tracking-tight">
                    {company}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
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
