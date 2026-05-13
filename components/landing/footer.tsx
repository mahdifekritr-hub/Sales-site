"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Products: [
    { name: "Rental & Sales Software", href: "#" },
    { name: "Work Orders", href: "https://propertycareapp.com/maintenance/" },
    { name: "Assets & Parts", href: "https://propertycareapp.com/assets-parts/" },
    { name: "Communication", href: "https://propertycareapp.com/communication/" },
    { name: "CRM & Customer Care", href: "https://propertycareapp.com/crm/" },
    { name: "Real State Filing", href: "#" },

  ],
  Company: [
    { name: "Property managers", href: "https://propertycareapp.com/ai-powered-property-management/" },
    { name: "Sales and rental offices", href: "https://propertycareapp.com/smart-property-sales-system/" },
    { name: "Real-States", href: "https://propertycareapp.com/digital-marketing-strategies-that-drive-more-leads-for-real-estate-agencies/" },
    { name: "Property Owners", href: "https://propertycareapp.com/improving-owner-tenant-communication-through-digital-property-management-tools/" },
    { name: "Facility managers", href: "https://propertycareapp.com/predicting-and-preventing-failures-using-data-and-analytics-in-facility-management/" },
    { name: "Security managers", href: "https://propertycareapp.com/integrating-security-systems-with-property-management-software-best-practices-for-monitoring-and-reporting/" },
    { name: "Condos & Co-ops", href: "https://propertycareapp.com/the-future-of-condo-co-op-management-how-digital-platforms-reduce-board-workload/" },
    { name: "HOAs & Communities", href: "https://propertycareapp.com/improving-hoa-resident-communication-with-app-based-platforms/" },
  ],
  Resources: [
    { name: "Documentation", href: "https://docs.propertycareapp.com/?lang=en" },
    { name: "API Reference", href: "https://docs.propertycareapp.com/api-reference" },
    { name: "Changelog", href: "https://docs.propertycareapp.com/changelog?lang=en" },
    { name: "FAQs", href: "#faq" },
    { name: "Pricing", href: "https://pricing.propertycareapp.com/en" },
    { name: "Contact us", href: "https://propertycareapp.com/contact-us/" },

  ],
  Platforms: [
    { name: "Web Application (Sales)", href: "https://site.propertycareapp.com/siraj/" },
    { name: "Web Application (Maintenance)", href: "https://app.propertycareapp.com/pca/" },
    { name: "Admin Panel", href: "https://admin.propertycareapp.com/" },
    { name: "iOS App for Management", href: "" },
    { name: "iOS App for Residents & owners", href: "https://apps.apple.com/us/app/propertycareapp/id6757750680" },
    { name: "Android App for Management", href: "https://play.google.com/store/apps/details?id=admin.propertycareapp.com" },
    { name: "Android app for residents & owners", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
              Simplify residential building management with Property Care App – a smart SaaS solution designed for seamless maintenance, resident communication, and service request tracking. Stay organized, enhance efficiency, and ensure hassle-free property care with our innovative platform.
            </p>
            <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
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
            {new Date().getFullYear()} Copyright © 2024 All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="https://propertycareapp.com/privacy-policy/" className="text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="https://propertycareapp.com/terms-conditions-propertycareapp/" className="text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </a>
            {/* <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Cookie Settings
            </a> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
