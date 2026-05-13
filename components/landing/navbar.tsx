"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Wrench, Package, MessageSquare, Users, ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const productItems = [
  { name: "Maintenance", href: "#", icon: Wrench, description: "Streamline your maintenance operations" },
  { name: "Assets & Parts", href: "#", icon: Package, description: "Track and manage your inventory" },
  { name: "Communication", href: "#", icon: MessageSquare, description: "Connect with your team seamlessly" },
  { name: "CRM", href: "#", icon: Users, description: "Manage customer relationships" },
  { name: "Sales & Rentals", href: "#", icon: ShoppingCart, description: "Handle sales and rental processes" },
];

const companyItems = [
  { name: "About Us", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Partners", href: "#" },
];

const navLinks = [
  { name: "Pricing", href: "https://pricing.propertycareapp.com/en" },
  { name: "Blog", href: "https://propertycareapp.com/blog/" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-6 backdrop-blur-xl">
          <a href="#" className="flex items-center">
            <img
              src="/Company-Logo.png"
              alt="Company Logo"
              className="h-13 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2">
                      {productItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="flex items-center gap-3 rounded-md p-3 hover:bg-secondary transition-colors"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <item.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">{item.name}</div>
                                <div className="text-xs text-muted-foreground">{item.description}</div>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <a
                      href={link.href}
                      className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground inline-flex items-center justify-center"
                    >
                      {link.name}
                    </a>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary">
                    Our Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {companyItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                            >
                              {item.name}
                            </a>
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
            {/* <Button variant="ghost" size="sm" className="text-muted-foreground">
              Sign in
            </Button> */}
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="https://admin.propertycareapp.com/create-subscription/53/false/EN">
                Get Started
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
              {/* Products Dropdown */}
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Products
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
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4 text-primary" />
                        {item.name}
                      </a>
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
                Our Company
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
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="ghost" className="justify-start text-muted-foreground">
                  Sign in
                </Button>
                <Button className="bg-primary text-primary-foreground" asChild>
                  <a href="https://admin.propertycareapp.com/create-subscription/53/false/EN">
                    Get Started
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
