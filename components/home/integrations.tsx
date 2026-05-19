"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Image from "next/image";

const integrations = [
  {
    name: "QuickBooks",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-2-8PSkcqrlTnNijwQpOoLFeYDQ7G300O.png",
    rotation: -4,
  },
  {
    name: "Google Analytics",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-2-9RZs7XDSrhvlLlfXETeCoiXIm8zXHv.png",
    rotation: 3,
  },
  {
    name: "Google",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-1-Yqr0RYdUAhsPQNsusuhu8veBjXWPTZ.png",
    rotation: -2,
  },
  {
    name: "ZEGO",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-1-5NBzuJvOCtdE0LpJBNTBhxaD8Ikkks.png",
    rotation: 5,
  },
  {
    name: "Stripe",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-gYbSAAi2SLfLqfOnYEahccNjsWb0d6.png",
    rotation: -3,
  },
  {
    name: "FCM",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2-e1736105602199-Vz3RjfJ4XeZ6vIVmsemJ2J5fs0L9Xq.png",
    rotation: 4,
  },
  {
    name: "Amazon Hub",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-design-11-lQdkTG42lMFb16NshA5xQAsfMTCxt3.png",
    rotation: -5,
  },
  {
    name: "ExpertTexting",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-1-FxONxPL802t3rXVZUOwSMJosr5myBK.png",
    rotation: 2,
  },
  {
    name: "Zapier",
    logo: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
    rotation: -3,
  },
  {
    name: "Twilio",
    logo: "https://cdn.worldvectorlogo.com/logos/twilio-2.svg",
    rotation: 4,
  },
  {
    name: "SendGrid",
    logo: "https://cdn.worldvectorlogo.com/logos/sendgrid-1.svg",
    rotation: -2,
  },
  {
    name: "Slack",
    logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
    rotation: 3,
  },
];

export function HomeIntegrations() {
  const t = useTranslations("homeIntegrations");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const firstRow = integrations.slice(0, 6);
  const secondRow = integrations.slice(6);

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif italic tracking-tight text-foreground"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-xl mx-auto mt-4 text-sm sm:text-base text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Two rows of floating integration items */}
        <div className="space-y-6 sm:space-y-8">
          {/* First row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 lg:gap-x-14"
          >
            {firstRow.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="group flex items-center gap-2.5 sm:gap-3"
              >
                {/* Small rounded logo thumbnail with rotation */}
                <div
                  className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-muted/50 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105"
                  style={{ transform: `rotate(${integration.rotation}deg)` }}
                >
                  <Image
                    src={integration.logo}
                    alt={integration.name}
                    fill
                    className="object-contain p-1.5 sm:p-2"
                    sizes="48px"
                  />
                </div>

                {/* Integration name */}
                <span className="text-sm sm:text-base font-medium text-foreground/70 whitespace-nowrap transition-colors duration-300 group-hover:text-foreground">
                  {integration.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 lg:gap-x-14"
          >
            {secondRow.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="group flex items-center gap-2.5 sm:gap-3"
              >
                {/* Small rounded logo thumbnail with rotation */}
                <div
                  className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-muted/50 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105"
                  style={{ transform: `rotate(${integration.rotation}deg)` }}
                >
                  <Image
                    src={integration.logo}
                    alt={integration.name}
                    fill
                    className="object-contain p-1.5 sm:p-2"
                    sizes="48px"
                  />
                </div>

                {/* Integration name */}
                <span className="text-sm sm:text-base font-medium text-foreground/70 whitespace-nowrap transition-colors duration-300 group-hover:text-foreground">
                  {integration.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
