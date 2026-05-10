"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Products: [
    { name: "Sales Module", href: "#" },
    { name: "Rental Management", href: "#" },
    { name: "Virtual Tours", href: "#" },
    { name: "AI Matching", href: "#" },
    { name: "Analytics", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Support", href: "#" },
    { name: "Status", href: "#" },
  ],
  Platforms: [
    { name: "Web Application", href: "#" },
    { name: "iOS App", href: "#" },
    { name: "Android App", href: "#" },
    { name: "Admin Panel", href: "#" },
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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">PropertyCare</span>
            </a>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Simplify residential building management with our smart SaaS solution designed for
              seamless maintenance and communication.
            </p>
            <div className="mt-6 flex gap-4">
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
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
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
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PropertyCare. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Cookie Settings
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
