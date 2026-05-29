"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher, LanguageSwitcherInline } from "@/components/language-switcher";

const productItemsData = [
  { key: "maintenance", href: "/facilities-maintenance-software" },
  { key: "assetsParts", href: "/assets" },
  { key: "communication", href: "/communication" },
  { key: "salesRentals", href: "/real-estate-software" },
];

const companyItemsData = [
  { key: "aboutUs", href: "/about" },
  { key: "contactUs", href: "/contact" },
];

export function Navbar() {
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const productItems = productItemsData.map(item => ({
    name: t(`productItems.${item.key}`),
    href: item.href,
  }));

  const companyItems = companyItemsData.map(item => ({
    name: t(`companyItems.${item.key}`),
    href: item.href,
  }));

  const navLinks = [
    { name: t("pricing"), href: "https://pricing.propertycareapp.com/en" },
    { name: t("blog"), href: "https://blog.propertycareapp.com/" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-6 backdrop-blur-xl">
          <Link href="/" className="flex items-center" aria-label="PropertyCareApp home">
            <img
              src="/logo (2).png"
              alt="Company Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground focus:bg-secondary focus:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-foreground data-[state=open]:hover:bg-secondary data-[state=open]:focus:bg-secondary">
                    {t("products")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[180px] gap-1 p-2">
                      {productItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground inline-flex items-center justify-center"
              >
                {link.name}
              </a>
            ))}

            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground focus:bg-secondary focus:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-foreground data-[state=open]:hover:bg-secondary data-[state=open]:focus:bg-secondary">
                    {t("ourCompany")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[180px] gap-1 p-2">
                      {companyItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="https://admin.propertycareapp.com/create-subscription/53/false/EN">
                {t("getStarted")}
              </a>
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col p-4">
              {/* Language Switcher Mobile */}
              <div className="mb-4 flex justify-center">
                <LanguageSwitcherInline />
              </div>

              {/* Products Dropdown */}
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {t("products")}
                <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {productItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Regular Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Our Company Dropdown */}
              <button
                onClick={() => setCompanyOpen(!companyOpen)}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {t("ourCompany")}
                <ChevronDown className={`h-4 w-4 transition-transform ${companyOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {companyItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="ghost" className="justify-start text-muted-foreground">
                  {t("signIn")}
                </Button>
                <Button className="bg-primary text-primary-foreground" asChild>
                  <a href="https://admin.propertycareapp.com/create-subscription/53/false/EN">
                    {t("getStarted")}
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
