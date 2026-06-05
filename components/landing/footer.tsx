"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Building2, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinksData = {
  Products: {
    key: "products",
    links: [
      { key: "rentalSales", href: "#" },
      { key: "workOrders", href: "https://propertycareapp.com/maintenance/" },
      { key: "assetsParts", href: "https://propertycareapp.com/assets-parts/" },
      { key: "communication", href: "https://propertycareapp.com/communication/" },
      { key: "crmCustomerCare", href: "https://propertycareapp.com/crm/" },
      { key: "realStateFiling", href: "#" },
    ],
  },
  Company: {
    key: "company",
    links: [
      { key: "propertyManagers", href: "https://propertycareapp.com/ai-powered-property-management/" },
      { key: "salesRentalOffices", href: "https://propertycareapp.com/smart-property-sales-system/" },
      { key: "realStates", href: "https://propertycareapp.com/digital-marketing-strategies-that-drive-more-leads-for-real-estate-agencies/" },
      { key: "propertyOwners", href: "https://propertycareapp.com/improving-owner-tenant-communication-through-digital-property-management-tools/" },
      { key: "facilityManagers", href: "https://propertycareapp.com/predicting-and-preventing-failures-using-data-and-analytics-in-facility-management/" },
      { key: "securityManagers", href: "https://propertycareapp.com/integrating-security-systems-with-property-management-software-best-practices-for-monitoring-and-reporting/" },
      { key: "condosCoops", href: "https://propertycareapp.com/the-future-of-condo-co-op-management-how-digital-platforms-reduce-board-workload/" },
      { key: "hoasCommunities", href: "https://propertycareapp.com/improving-hoa-resident-communication-with-app-based-platforms/" },
    ],
  },
  Resources: {
    key: "resources",
    links: [
      { key: "documentation", href: "https://docs.propertycareapp.com/?lang=en" },
      { key: "apiReference", href: "https://docs.propertycareapp.com/api-reference" },
      { key: "changelog", href: "https://docs.propertycareapp.com/changelog?lang=en" },
      { key: "faqs", href: "#faq" },
      { key: "pricing", href: "https://pricing.propertycareapp.com/en" },
      { key: "contactUs", href: "https://propertycareapp.com/contact-us/" },
    ],
  },
  Platforms: {
    key: "platforms",
    links: [
      { key: "webAppSales", href: "https://site.propertycareapp.com/siraj/" },
      { key: "webAppMaintenance", href: "https://app.propertycareapp.com/pca/" },
      { key: "adminPanel", href: "https://admin.propertycareapp.com/" },
      { key: "iosManagement", href: "" },
      { key: "iosResidents", href: "https://apps.apple.com/us/app/propertycareapp/id6757750680" },
      { key: "androidManagement", href: "https://play.google.com/store/apps/details?id=admin.propertycareapp.com" },
      { key: "androidResidents", href: "#" },
    ],
  },
};

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/propertycareapp", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/propertycareapp?igsh=MTFkd3JxeTNwd2tuOA%3D%3D", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@PropertyCareApp", label: "YouTube" },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("footer");

  const footerLinks = Object.entries(footerLinksData).map(([category, data]) => ({
    category: t(`categories.${data.key}`),
    links: data.links.map(link => ({
      name: t(`${data.key}.${link.key}`),
      href: link.href,
    })),
  }));

  return (
    <footer className="relative border-t border-border/50 bg-secondary/20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 sm:gap-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="col-span-2 sm:col-span-3 lg:col-span-2"
          >
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">PropertyCare</span>
            </a>
            <p className="mt-3 sm:mt-4 max-w-xs text-sm sm:text-base text-muted-foreground">
              {t("description")}
            </p>
            <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider">{section.category}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:pt-8 sm:flex-row"
        >
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="https://propertycareapp.com/privacy-policy/" className="text-muted-foreground transition-colors hover:text-foreground">
              {t("privacyPolicy")}
            </a>
            <a href="https://propertycareapp.com/terms-conditions-propertycareapp/" className="text-muted-foreground transition-colors hover:text-foreground">
              {t("termsOfService")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
