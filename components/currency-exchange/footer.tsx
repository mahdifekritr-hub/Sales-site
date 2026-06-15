"use client";

import { Coins, Heart } from "lucide-react";

const columns = [
  {
    title: "محصول",
    links: ["ویژگی‌ها", "مزایا", "نحوه کار", "نمونه داشبورد"],
  },
  {
    title: "شرکت",
    links: ["درباره ما", "خدمات توسعه نرم‌افزار", "تماس با ما", "وبلاگ"],
  },
  {
    title: "پشتیبانی",
    links: ["سوالات متداول", "راهنمای استفاده", "مرکز پشتیبانی", "حریم خصوصی"],
  },
];

export function CurrencyFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Coins className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight">صرّاف‌یار</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              پلتفرم آنلاین مدیریت صرافی، توسعه‌یافته توسط تیم نرم‌افزاری ما برای
              صرافی‌ها و کسب‌وکارهای مالی.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © ۱۴۰۴ صرّاف‌یار. تمامی حقوق محفوظ است.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            ساخته‌شده با
            <Heart className="h-4 w-4 fill-primary text-primary" />
            توسط تیم توسعه نرم‌افزار ما
          </p>
        </div>
      </div>
    </footer>
  );
}
