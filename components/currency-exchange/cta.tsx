"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck } from "lucide-react";

export function CurrencyCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute left-1/2 top-0 h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-accent blur-[80px]" />
          </div>

          <div className="relative">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              صرافی خود را وارد دنیای دیجیتال کنید
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
              همین حالا یک دموی رایگان از صرّاف‌یار درخواست کنید و ببینید چگونه می‌توانیم
              عملیات صرافی شما را سریع‌تر، شفاف‌تر و حرفه‌ای‌تر کنیم.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group gap-2 bg-background px-8 text-foreground hover:bg-background/90"
              >
                درخواست دموی رایگان
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <CalendarCheck className="h-4 w-4" />
                رزرو جلسه مشاوره
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
