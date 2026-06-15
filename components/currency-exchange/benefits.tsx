"use client";

import { motion } from "framer-motion";
import { Gauge, Workflow, Eye, Zap } from "lucide-react";

const benefits = [
  {
    icon: Gauge,
    title: "کارایی بیشتر",
    desc: "تمام عملیات صرافی از نمایش نرخ تا ثبت و تسویه درخواست‌ها در یک پلتفرم یکپارچه انجام می‌شود.",
  },
  {
    icon: Workflow,
    title: "اتوماسیون فرآیندها",
    desc: "فرآیندهای تکراری مانند ثبت، تایید و اطلاع‌رسانی درخواست‌ها به‌صورت خودکار مدیریت می‌شوند.",
  },
  {
    icon: Eye,
    title: "شفافیت کامل",
    desc: "مشتریان و مدیران در هر لحظه به وضعیت دقیق نرخ‌ها و درخواست‌ها دسترسی شفاف دارند.",
  },
  {
    icon: Zap,
    title: "سرعت بالا",
    desc: "ثبت درخواست و دریافت پاسخ در کمترین زمان؛ تجربه‌ای سریع برای مشتری و کارمند صرافی.",
  },
];

export function CurrencyBenefits() {
  return (
    <section id="benefits" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            چرا صرافی‌ها به صرّاف‌یار نیاز دارند؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            صرّاف‌یار با حذف کارهای دستی و دیجیتالی‌کردن عملیات، صرافی شما را به یک
            کسب‌وکار مدرن و رقابتی تبدیل می‌کند.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-border/60 bg-card/60 p-6 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <b.icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-bold">{b.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
