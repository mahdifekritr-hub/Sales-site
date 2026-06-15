"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, CheckCircle2, Hourglass } from "lucide-react";

const marketRows = [
  { code: "USD", name: "دلار", price: "۵۹,۲۰۰", change: "+۰.۸٪", up: true },
  { code: "EUR", name: "یورو", price: "۶۳,۷۵۰", change: "+۱.۲٪", up: true },
  { code: "GBP", name: "پوند", price: "۷۴,۵۰۰", change: "+۰.۴٪", up: true },
  { code: "AED", name: "درهم", price: "۱۶,۱۸۰", change: "-۰.۳٪", up: false },
  { code: "TRY", name: "لیر ترکیه", price: "۱,۸۴۰", change: "-۰.۶٪", up: false },
];

const requests = [
  { id: "#۱۰۲۴", user: "علی رضایی", type: "خرید دلار", status: "تایید شده", icon: CheckCircle2, color: "text-chart-2" },
  { id: "#۱۰۲۵", user: "مریم احمدی", type: "فروش یورو", status: "در انتظار", icon: Hourglass, color: "text-primary" },
  { id: "#۱۰۲۶", user: "سینا کریمی", type: "خرید درهم", status: "در حال بررسی", icon: Clock, color: "text-muted-foreground" },
];

export function CurrencyShowcase() {
  return (
    <section id="showcase" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            نگاهی به داشبورد صرّاف‌یار
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            رابط کاربری مدرن و حرفه‌ای، طراحی‌شده برای سرعت و سهولت استفاده.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Market table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-lg lg:col-span-3"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">جدول بازار</h3>
              <span className="flex items-center gap-1.5 rounded-full bg-chart-2/15 px-3 py-1 text-xs font-medium text-chart-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-chart-2" />
                زنده
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border/50">
              <table className="w-full text-right text-sm">
                <thead className="bg-secondary/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">ارز</th>
                    <th className="px-4 py-3 font-medium">قیمت (تومان)</th>
                    <th className="px-4 py-3 font-medium">تغییر</th>
                  </tr>
                </thead>
                <tbody>
                  {marketRows.map((row) => (
                    <tr key={row.code} className="border-t border-border/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                            {row.code}
                          </span>
                          <span className="font-medium">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold">{row.price}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 font-medium ${
                            row.up ? "text-chart-2" : "text-destructive"
                          }`}
                        >
                          {row.up ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {row.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Requests panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-lg lg:col-span-2"
          >
            <h3 className="mb-4 text-lg font-bold">آخرین درخواست‌ها</h3>
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{req.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {req.user} • {req.id}
                    </p>
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${req.color}`}>
                    <req.icon className="h-4 w-4" />
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-center">
                <p className="text-xs text-muted-foreground">معاملات امروز</p>
                <p className="text-xl font-bold text-primary">۳۴۲</p>
              </div>
              <div className="rounded-xl bg-chart-2/10 p-3 text-center">
                <p className="text-xs text-muted-foreground">نرخ تایید</p>
                <p className="text-xl font-bold text-chart-2">۹۶٪</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
