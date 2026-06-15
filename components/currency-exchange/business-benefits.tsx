"use client";

import { motion } from "framer-motion";
import { MinusCircle, Rocket, Smile, Network, CheckCircle2 } from "lucide-react";

const items = [
  {
    icon: MinusCircle,
    title: "کاهش کارهای دستی",
    desc: "حذف دفترهای کاغذی و ثبت دستی؛ همه چیز خودکار و دیجیتال.",
  },
  {
    icon: Rocket,
    title: "عملیات سریع‌تر",
    desc: "پردازش درخواست‌ها در چند ثانیه و کاهش زمان انتظار مشتری.",
  },
  {
    icon: Smile,
    title: "تجربه بهتر مشتری",
    desc: "دسترسی آسان به نرخ‌ها و پیگیری شفاف سفارش‌ها از هر دستگاه.",
  },
  {
    icon: Network,
    title: "مدیریت متمرکز",
    desc: "کنترل کامل نرخ‌ها، کاربران و درخواست‌ها از یک داشبورد واحد.",
  },
];

const checklist = [
  "افزایش بهره‌وری تیم صرافی",
  "کاهش خطای انسانی در ثبت معاملات",
  "گزارش‌گیری دقیق و تصمیم‌گیری داده‌محور",
  "مقیاس‌پذیری برای رشد کسب‌وکار",
];

export function CurrencyBusinessBenefits() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border/60 bg-card/60 p-6"
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mb-1.5 text-base font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Text + checklist */}
          <div className="text-center lg:text-right">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              مزایای کسب‌وکاری برای صرافی شما
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              صرّاف‌یار فقط یک نرم‌افزار نیست؛ ابزاری برای رشد، نظم و افزایش سودآوری
              صرافی شماست.
            </motion.p>

            <ul className="mx-auto mt-8 max-w-md space-y-3 lg:mx-0">
              {checklist.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center justify-center gap-3 text-sm font-medium lg:justify-start"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-chart-2" />
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
