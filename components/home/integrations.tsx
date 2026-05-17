"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { 
  Layers, 
  Zap,
  Smartphone,
  Cloud,
  CreditCard,
  Mail,
  MessageSquare,
  Calendar,
  BarChart3,
  ShoppingBag,
  Bell,
  FileText,
  Link as LinkIcon,
  Settings,
} from "lucide-react";

const integrations = [
  { name: "FCM", icon: Bell, gradient: "from-chart-5 to-[oklch(0.55_0.16_35)]" },
  { name: "Apple", icon: Smartphone, gradient: "from-foreground to-muted-foreground" },
  { name: "Amazon Hub", icon: ShoppingBag, gradient: "from-chart-5 to-[oklch(0.5_0.14_50)]" },
  { name: "Google Analytics", icon: BarChart3, gradient: "from-chart-4 to-[oklch(0.5_0.14_140)]" },
  { name: "Google Calendar", icon: Calendar, gradient: "from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)]" },
  { name: "Zego", icon: CreditCard, gradient: "from-primary to-[oklch(0.45_0.18_340)]" },
  { name: "Expert Texting", icon: MessageSquare, gradient: "from-chart-4 to-[oklch(0.5_0.12_130)]" },
  { name: "QuickBooks", icon: FileText, gradient: "from-chart-4 to-[oklch(0.55_0.15_150)]" },
  { name: "Stripe", icon: CreditCard, gradient: "from-[oklch(0.5_0.16_280)] to-[oklch(0.4_0.14_300)]" },
  { name: "Zapier", icon: Zap, gradient: "from-chart-5 to-[oklch(0.55_0.18_50)]" },
  { name: "Twilio", icon: Smartphone, gradient: "from-chart-5 to-[oklch(0.5_0.15_30)]" },
  { name: "SendGrid", icon: Mail, gradient: "from-[oklch(0.55_0.18_200)] to-[oklch(0.5_0.15_210)]" },
  { name: "Slack", icon: MessageSquare, gradient: "from-[oklch(0.5_0.15_280)] to-primary" },
  { name: "Microsoft", icon: Cloud, gradient: "from-[oklch(0.55_0.15_200)] to-[oklch(0.45_0.12_220)]" },
];

export function HomeIntegrations() {
  const t = useTranslations("homeIntegrations");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Multi-layered background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        
        {/* Animated accent orbs */}
        <motion.div
          className="absolute top-[30%] left-[5%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.16 330 / 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.15 200 / 0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <LinkIcon className="h-4 w-4" />
            {t("badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl mx-auto text-muted-foreground text-sm sm:text-base"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Scrolling integrations with cards */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background via-background/90 to-transparent z-10" />

          {/* First row - scrolling right */}
          <div className="flex overflow-hidden mb-4">
            <motion.div
              className="flex gap-4"
              animate={{ x: [0, -1200] }}
              transition={{
                x: {
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {[...integrations.slice(0, 7), ...integrations.slice(0, 7)].map((integration, index) => (
                <motion.div
                  key={`row1-${integration.name}-${index}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex-shrink-0 group"
                >
                  <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 hover:shadow-lg transition-all duration-300">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${integration.gradient} p-[1.5px] shadow-md`}>
                      <div className="h-full w-full rounded-[10px] bg-card flex items-center justify-center">
                        <integration.icon className="h-5 w-5 text-foreground" />
                      </div>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                      {integration.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second row - scrolling left */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: [-1200, 0] }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {[...integrations.slice(7), ...integrations.slice(7)].map((integration, index) => (
                <motion.div
                  key={`row2-${integration.name}-${index}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex-shrink-0 group"
                >
                  <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 hover:shadow-lg transition-all duration-300">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${integration.gradient} p-[1.5px] shadow-md`}>
                      <div className="h-full w-full rounded-[10px] bg-card flex items-center justify-center">
                        <integration.icon className="h-5 w-5 text-foreground" />
                      </div>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                      {integration.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Integration stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "14+", label: "Integrations" },
            { value: "API", label: "Access" },
            { value: "24/7", label: "Sync" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
