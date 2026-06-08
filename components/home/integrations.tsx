"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

const integrations = [
  {
    name: "QuickBooks",
    logo: "https://cdn.worldvectorlogo.com/logos/quickbooks-2.svg",
    rotation: -4,
  },
  {
    name: "Google Analytics",
    logo: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg",
    rotation: 3,
  },
  {
    name: "Google",
    logo: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
    rotation: -2,
  },
  {
    name: "ZEGO",
    logo: "/zego.png",
    rotation: 5,
  },
  {
    name: "Stripe",
    logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
    rotation: -3,
  },
  {
    name: "FCM",
    logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
    rotation: 4,
  },
  {
    name: "Amazon Hub",
    logo: "/amazon-hub.png",
    rotation: -5,
  },
  {
    name: "ExpertTexting",
    logo: "/expert-texting-logo.png",
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

interface IntegrationItemProps {
  name: string;
  logo: string;
  rotation: number;
}

function IntegrationItem({ name, logo, rotation }: IntegrationItemProps) {
  return (
    <div className="group flex-shrink-0 flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 lg:px-8">
      {/* Small rounded logo thumbnail with rotation */}
      <div
        className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-muted/50 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain p-1.5 sm:p-2"
          sizes="48px"
        />
      </div>

      {/* Integration name */}
      <span className="text-sm sm:text-base font-medium text-foreground/70 whitespace-nowrap transition-colors duration-300 group-hover:text-foreground">
        {name}
      </span>
    </div>
  );
}

function ScrollingRow({ items, direction = "left" }: { items: typeof integrations; direction?: "left" | "right" }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  const animate = useCallback(() => {
    if (!scrollRef.current || isPaused) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const container = scrollRef.current;
    const scrollWidth = container.scrollWidth;
    const singleSetWidth = scrollWidth / 3;

    // Scroll speed
    const speed = direction === "left" ? 0.3 : -0.3;
    scrollPositionRef.current += speed;

    // Reset position for seamless loop
    if (direction === "left" && scrollPositionRef.current >= singleSetWidth) {
      scrollPositionRef.current = 0;
    } else if (direction === "right" && scrollPositionRef.current <= 0) {
      scrollPositionRef.current = singleSetWidth;
    }

    container.scrollLeft = scrollPositionRef.current;
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, direction]);

  useEffect(() => {
    // Initialize scroll position for right-moving row
    if (scrollRef.current && direction === "right") {
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollPositionRef.current = singleSetWidth;
      scrollRef.current.scrollLeft = singleSetWidth;
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, direction]);

  return (
    <div className="relative">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        className="flex items-center overflow-x-hidden py-3 sm:py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedItems.map((integration, index) => (
          <IntegrationItem
            key={`${integration.name}-${index}`}
            name={integration.name}
            logo={integration.logo}
            rotation={integration.rotation}
          />
        ))}
      </div>
    </div>
  );
}

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
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
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
      </div>

      {/* Two scrolling rows - full width */}
      <div className="space-y-2 sm:space-y-4">
        {/* First row - scrolls left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ScrollingRow items={firstRow} direction="left" />
        </motion.div>

        {/* Second row - scrolls right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ScrollingRow items={secondRow} direction="right" />
        </motion.div>
      </div>
    </section>
  );
}
