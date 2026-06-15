"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, TrendingUp, TrendingDown, Sparkles } from "lucide-react";

const rates = [
  { code: "USD", name: "دلار آمریکا", buy: "۵۸,۹۵۰", sell: "۵۹,۲۰۰", up: true },
  { code: "EUR", name: "یورو", buy: "۶۳,۴۰۰", sell: "۶۳,۷۵۰", up: true },
  { code: "AED", name: "درهم امارات", buy: "۱۶,۰۵۰", sell: "۱۶,۱۸۰", up: false },
  { code: "GBP", name: "پوند انگلیس", buy: "۷۴,۱۰۰", sell: "۷۴,۵۰۰", up: true },
];

export function CurrencyHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px] sm:h-[600px] sm:w-[800px]" />
        <div className="absolute left-0 top-1/3 h-[200px] w-[200px] rounded-full bg-accent/15 blur-[80px] sm:h-[400px] sm:w-[400px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Text column */}
        <div className="text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />
            پلتفرم آنلاین مدیریت صرافی
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-3xl font-bold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl"
          >
            صرافی خود را{" "}
            <span className="bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
              آنلاین و هوشمند
            </span>{" "}
            مدیریت کنید
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            نمایش لحظه‌ای نرخ ارز، ثبت و پیگیری درخواست‌های خرید و فروش و مدیریت کامل
            صرافی در یک پلتفرم امن، سریع و کاملاً تحت وب. ساخته‌شده توسط تیم توسعه
            نرم‌افزار ما برای صرافی‌ها و کسب‌وکارهای مالی.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="group gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              درخواست دموی رایگان
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border bg-transparent hover:bg-secondary"
            >
              <Play className="h-4 w-4" />
              مشاوره با کارشناسان
            </Button>
          </motion.div>
        </div>

        {/* Mockup column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">نرخ لحظه‌ای بازار</p>
                <p className="text-lg font-bold">داشبورد صرافی</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-chart-2/15 px-3 py-1 text-xs font-medium text-chart-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-chart-2" />
                به‌روزرسانی زنده
              </span>
            </div>

            <div className="space-y-2">
              {rates.map((rate, i) => (
                <motion.div
                  key={rate.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {rate.code}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{rate.name}</p>
                      <p className="text-xs text-muted-foreground">
                        خرید {rate.buy} • فروش {rate.sell}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      rate.up ? "text-chart-2" : "text-destructive"
                    }`}
                  >
                    {rate.up ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {rate.sell}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              ثبت درخواست خرید / فروش
            </Button>
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-6 left-2 hidden rounded-xl border border-border/60 bg-card p-4 shadow-xl sm:block"
          >
            <p className="text-xs text-muted-foreground">درخواست‌های امروز</p>
            <p className="text-2xl font-bold text-primary">۱,۲۴۸</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
