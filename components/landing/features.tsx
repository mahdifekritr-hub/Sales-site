"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  Building2,
  CalendarCheck,
  FileText,
  Home,
  Key,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Property Sales",
    description:
      "Seamlessly manage property listings with immersive floor navigation and instant unit booking capabilities.",
  },
  {
    icon: Key,
    title: "Rental Management",
    description:
      "Handle daily, annual, or long-term rentals with automated queuing and opportunity management.",
  },
  {
    icon: Video,
    title: "Virtual Tours",
    description:
      "Offer immersive 360° virtual experiences, allowing prospects to explore properties from anywhere.",
  },
  {
    icon: Sparkles,
    title: "AI Matching",
    description:
      "Intelligent property recommendations based on multi-step conversations and weighted preferences.",
  },
  {
    icon: Users,
    title: "Owner Portal",
    description:
      "Empower owners to list properties, manage requests, and track interested parties effortlessly.",
  },
  {
    icon: FileText,
    title: "Smart Contracts",
    description:
      "Automated contract preparation, e-signatures, and compliance tracking in one unified system.",
  },
  {
    icon: Wallet,
    title: "Payment Tracking",
    description:
      "Automated reminders, follow-ups, and comprehensive financial transaction management.",
  },
  {
    icon: MessageSquare,
    title: "Tenant Relations",
    description:
      "Streamlined communication platform for maintenance requests and issue resolution.",
  },
  {
    icon: CalendarCheck,
    title: "Visit Scheduling",
    description:
      "Smart booking system for physical inspections with automated confirmations and reminders.",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description:
      "Centralized view of all operations, metrics, and activities across your entire portfolio.",
  },
  {
    icon: TrendingUp,
    title: "Analytics Suite",
    description:
      "Deep insights into performance metrics, market trends, and revenue optimization opportunities.",
  },
  {
    icon: Home,
    title: "Multi-Platform",
    description:
      "Seamless experience across web, iOS, and Android for both management and residents.",
  },
];

// Split features into 2 rows
const row1Features = features.slice(0, 6);
const row2Features = features.slice(6, 12);

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative flex-shrink-0 w-[320px] sm:w-[360px] h-[200px] rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
      <div className="mb-4 flex h-10 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

interface ScrollingRowProps {
  items: typeof features;
  direction: "left" | "right";
  speed?: number;
}

function ScrollingRow({ items, direction, speed = 0.5 }: ScrollingRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);

  const duplicatedItems = [...items, ...items, ...items];

  const animate = useCallback(() => {
    if (!scrollRef.current || isPaused) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const container = scrollRef.current;
    const scrollWidth = container.scrollWidth;
    const singleSetWidth = scrollWidth / 3;

    if (direction === "left") {
      scrollPositionRef.current += speed;
      if (scrollPositionRef.current >= singleSetWidth) {
        scrollPositionRef.current = 0;
      }
    } else {
      scrollPositionRef.current -= speed;
      if (scrollPositionRef.current <= 0) {
        scrollPositionRef.current = singleSetWidth;
      }
    }

    container.scrollLeft = scrollPositionRef.current;
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, direction, speed]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initialize scroll position
    const scrollWidth = container.scrollWidth;
    const singleSetWidth = scrollWidth / 3;

    if (direction === "right") {
      scrollPositionRef.current = singleSetWidth;
      container.scrollLeft = singleSetWidth;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, direction]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <div className="relative">
      {/* Left fade gradient */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-r from-background to-transparent" />

      {/* Right fade gradient */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden py-2"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        {duplicatedItems.map((feature, index) => (
          <FeatureCard
            key={`${feature.title}-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            Capabilities
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              transform property management
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A comprehensive suite of tools designed to streamline every aspect of property sales,
            rentals, and tenant management.
          </p>
        </motion.div>
      </div>

      {/* Scrolling feature rows - full width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 space-y-6"
      >
        {/* Row 1 - scrolls left */}
        <ScrollingRow items={row1Features} direction="left" speed={0.5} />

        {/* Row 2 - scrolls right */}
        <ScrollingRow items={row2Features} direction="right" speed={0.5} />
      </motion.div>
    </section>
  );
}
