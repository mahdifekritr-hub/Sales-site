import { Vazirmatn } from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, type LocalePageProps } from "@/lib/page-metadata";
import { CurrencyNavbar } from "@/components/currency-exchange/navbar";
import { CurrencyHero } from "@/components/currency-exchange/hero";
import { CurrencyBenefits } from "@/components/currency-exchange/benefits";
import { CurrencyFeatures } from "@/components/currency-exchange/features";
import { CurrencyWorkflow } from "@/components/currency-exchange/workflow";
import { CurrencyShowcase } from "@/components/currency-exchange/showcase";
import { CurrencyBusinessBenefits } from "@/components/currency-exchange/business-benefits";
import { CurrencyWhyUs } from "@/components/currency-exchange/why-us";
import { CurrencyFAQ } from "@/components/currency-exchange/faq";
import { CurrencyCTA } from "@/components/currency-exchange/cta";
import { CurrencyFooter } from "@/components/currency-exchange/footer";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

const PAGE_PATH = "/currency-exchange-software";

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: PAGE_PATH,
    title: "نرم‌افزار صرافی آنلاین صرّاف‌یار | پلتفرم مدیریت صرافی",
    description:
      "پلتفرم آنلاین مدیریت صرافی با نمایش لحظه‌ای نرخ ارز، ثبت و پیگیری درخواست‌های خرید و فروش، پنل کاربری و داشبورد مدیریت. درخواست دموی رایگان.",
  });
}

export default async function CurrencyExchangeSoftwarePage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div dir="rtl" lang="fa" className={`${vazirmatn.className} min-h-screen overflow-x-hidden bg-background text-foreground`}>
      <CurrencyNavbar />
      <main>
        <CurrencyHero />
        <CurrencyBenefits />
        <CurrencyFeatures />
        <CurrencyWorkflow />
        <CurrencyShowcase />
        <CurrencyBusinessBenefits />
        <CurrencyWhyUs />
        <CurrencyFAQ />
        <CurrencyCTA />
      </main>
      <CurrencyFooter />
    </div>
  );
}
