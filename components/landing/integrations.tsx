"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
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
];

interface IntegrationItemProps {
  name: string;
  logo: string;
  rotation: number;
}

function IntegrationItem({ name, logo, rotation }: IntegrationItemProps) {
  return (
    <div
      className="group flex-shrink-0 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8"
    >
      {/* Small rounded logo thumbnail with rotation */}
      <div
        className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105"
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

      {/* Integration name text */}
      <span className="text-sm sm:text-base font-medium text-foreground/80 whitespace-nowrap transition-colors duration-300 group-hover:text-foreground">
        {name}
      </span>
    </div>
  );
}

function ScrollingLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);

  // Duplicate items for seamless loop
  const duplicatedItems = [...integrations, ...integrations, ...integrations];

  const animate = useCallback(() => {
    if (!scrollRef.current || isPaused) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const container = scrollRef.current;
    const scrollWidth = container.scrollWidth;
    const singleSetWidth = scrollWidth / 3;

    // Very slow speed for elegant movement
    scrollPositionRef.current += 0.3;
    if (scrollPositionRef.current >= singleSetWidth) {
      scrollPositionRef.current = 0;
    }

    container.scrollLeft = scrollPositionRef.current;
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="relative">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        className="flex items-center overflow-x-hidden py-4 sm:py-5"
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

export function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-background"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic tracking-tight text-foreground">
            Seamless integrations
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
            Connect with the tools you already use and love
          </p>
        </motion.div>
      </div>

      {/* Scrolling logos - full width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ScrollingLogos />
      </motion.div>
    </section>
  );
}
