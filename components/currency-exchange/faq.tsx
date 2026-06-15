"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "آیا می‌توان پلتفرم را با نام و برند صرافی خودمان راه‌اندازی کرد؟",
    a: "بله. پلتفرم به‌صورت کامل قابل سفارشی‌سازی است و می‌تواند با لوگو، رنگ‌بندی و برند اختصاصی صرافی شما عرضه شود.",
  },
  {
    q: "نرخ ارزها چگونه به‌روزرسانی می‌شوند؟",
    a: "نرخ‌ها به‌صورت لحظه‌ای و خودکار به‌روزرسانی می‌شوند و مدیر صرافی نیز امکان تنظیم دستی نرخ‌ها را دارد.",
  },
  {
    q: "آیا کاربران می‌توانند درخواست خرید و فروش ثبت کنند؟",
    a: "بله. کاربران پس از ثبت‌نام می‌توانند درخواست خرید یا فروش ارز را ثبت کرده و وضعیت آن را پیگیری کنند.",
  },
  {
    q: "اطلاعات و داده‌های صرافی ما امن است؟",
    a: "امنیت اولویت ماست. تمام اطلاعات با رمزنگاری استاندارد محافظت می‌شوند و دسترسی کاربران به‌صورت سطح‌بندی‌شده کنترل می‌شود.",
  },
  {
    q: "آیا این پلتفرم روی موبایل هم کار می‌کند؟",
    a: "بله. پلتفرم کاملاً تحت وب و واکنش‌گرا است و روی موبایل، تبلت و دسکتاپ به‌خوبی نمایش داده می‌شود.",
  },
  {
    q: "امکان سفارشی‌سازی بر اساس نیاز ما وجود دارد؟",
    a: "بله. تیم توسعه ما می‌تواند امکانات و فرآیندهای پلتفرم را متناسب با نیاز اختصاصی صرافی شما توسعه دهد.",
  },
];

export function CurrencyFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            سوالات متداول
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            پاسخ پرسش‌های رایج درباره پلتفرم صرّاف‌یار.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/60"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
              >
                <span className="text-sm font-semibold sm:text-base">{faq.q}</span>
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
