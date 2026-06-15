"use client";

import { motion } from "framer-motion";
import { Eye, FilePlus2, BadgeCheck, Send } from "lucide-react";

const steps = [
  {
    icon: Eye,
    step: "۰۱",
    title: "نمایش نرخ‌های لحظه‌ای",
    desc: "کاربران قیمت زنده ارزها را مشاهده می‌کنند و بازار را در لحظه دنبال می‌کنند.",
  },
  {
    icon: FilePlus2,
    step: "۰۲",
    title: "ثبت درخواست توسط کاربر",
    desc: "کاربر پس از ثبت‌نام، درخواست خرید یا فروش ارز را در پنل کاربری ثبت می‌کند.",
  },
  {
    icon: BadgeCheck,
    step: "۰۳",
    title: "بررسی و تایید مدیر",
    desc: "مدیر صرافی درخواست را در داشبورد بررسی و بر اساس نرخ روز تایید می‌کند.",
  },
  {
    icon: Send,
    step: "۰۴",
    title: "پیگیری وضعیت",
    desc: "کاربر روند درخواست را تا تسویه نهایی به‌صورت لحظه‌ای پیگیری می‌کند.",
  },
];

export function CurrencyWorkflow() {
  return (
    <section id="workflow" className="relative bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            صرّاف‌یار چگونه کار می‌کند؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            یک فرآیند ساده و شفاف از نمایش نرخ تا تسویه نهایی درخواست.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl border border-border/60 bg-card p-6"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <span className="absolute left-6 top-6 text-2xl font-black text-primary/15">
                {s.step}
              </span>
              <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
