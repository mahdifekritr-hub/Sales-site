"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  ClipboardList,
  UserCircle,
  LayoutDashboard,
  Bell,
  FileBarChart,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "نرخ لحظه‌ای ارز",
    desc: "نمایش زنده قیمت ارزها و طلا با به‌روزرسانی خودکار و نمودار تغییرات بازار.",
  },
  {
    icon: ClipboardList,
    title: "مدیریت درخواست‌ها",
    desc: "دریافت، بررسی و تایید درخواست‌های خرید و فروش به‌صورت متمرکز و منظم.",
  },
  {
    icon: UserCircle,
    title: "پنل کاربری",
    desc: "هر کاربر می‌تواند ثبت‌نام کند، درخواست بدهد و وضعیت سفارش‌های خود را پیگیری کند.",
  },
  {
    icon: LayoutDashboard,
    title: "داشبورد مدیریت",
    desc: "مدیر صرافی نرخ‌ها، درخواست‌ها و کاربران را از یک داشبورد قدرتمند کنترل می‌کند.",
  },
  {
    icon: Bell,
    title: "اعلان‌ها و هشدارها",
    desc: "اطلاع‌رسانی لحظه‌ای تغییر نرخ، ثبت درخواست جدید و تغییر وضعیت سفارش‌ها.",
  },
  {
    icon: FileBarChart,
    title: "ابزار گزارش‌گیری",
    desc: "گزارش‌های دقیق از حجم معاملات، عملکرد و درآمد برای تصمیم‌گیری بهتر.",
  },
  {
    icon: ShieldCheck,
    title: "امنیت و کنترل دسترسی",
    desc: "سطح‌بندی دسترسی کاربران و مدیران همراه با رمزنگاری استاندارد اطلاعات.",
  },
];

export function CurrencyFeatures() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            امکانات کامل برای یک صرافی مدرن
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            هر آنچه برای مدیریت حرفه‌ای یک صرافی نیاز دارید، در یک پلتفرم یکپارچه.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group rounded-2xl border border-border/60 bg-card/60 p-6 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
