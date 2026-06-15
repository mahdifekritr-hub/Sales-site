"use client";

import { motion } from "framer-motion";
import { Award, Headphones, Maximize, Settings2 } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "تجربه و تخصص",
    desc: "تیم توسعه ما با سال‌ها تجربه در ساخت نرم‌افزارهای مالی و وب، این پلتفرم را طراحی کرده است.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی مطمئن",
    desc: "پشتیبانی فنی پیوسته و همراهی شما در تمام مراحل راه‌اندازی و استفاده.",
  },
  {
    icon: Maximize,
    title: "مقیاس‌پذیری",
    desc: "از یک صرافی کوچک تا کسب‌وکارهای بزرگ؛ پلتفرم همراه با رشد شما گسترش می‌یابد.",
  },
  {
    icon: Settings2,
    title: "سفارشی‌سازی",
    desc: "امکان شخصی‌سازی پلتفرم بر اساس نیاز، برند و فرآیندهای خاص صرافی شما.",
  },
];

export function CurrencyWhyUs() {
  return (
    <section className="relative overflow-hidden bg-secondary/30 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            توسعه‌دهنده پلتفرم
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            چرا ما را انتخاب کنید؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            ما این پلتفرم صرافی را به‌عنوان یک محصول نرم‌افزاری حرفه‌ای توسعه داده‌ایم
            و خدمات توسعه نرم‌افزار سفارشی نیز ارائه می‌دهیم.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center"
            >
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <r.icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-bold">{r.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
