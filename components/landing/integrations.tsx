"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

const integrations = [
  {
    name: "QuickBooks",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-2-8PSkcqrlTnNijwQpOoLFeYDQ7G300O.png",
  },
  {
    name: "Google Analytics",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-2-9RZs7XDSrhvlLlfXETeCoiXIm8zXHv.png",
  },
  {
    name: "Google",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-1-Yqr0RYdUAhsPQNsusuhu8veBjXWPTZ.png",
  },
  {
    name: "ZEGO",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-1-5NBzuJvOCtdE0LpJBNTBhxaD8Ikkks.png",
  },
  {
    name: "Stripe",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-gYbSAAi2SLfLqfOnYEahccNjsWb0d6.png",
  },
  {
    name: "FCM",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2-e1736105602199-Vz3RjfJ4XeZ6vIVmsemJ2J5fs0L9Xq.png",
  },
  {
    name: "Amazon Hub",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-design-11-lQdkTG42lMFb16NshA5xQAsfMTCxt3.png",
  },
  {
    name: "ExpertTexting",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-1-FxONxPL802t3rXVZUOwSMJosr5myBK.png",
  },
];

interface IntegrationCardProps {
  name: string;
  logo: string;
}

function IntegrationCard({ name, logo }: IntegrationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Logo container */}
      <div className="relative h-12 sm:h-14 lg:h-16 w-28 sm:w-36 lg:w-44 flex items-center justify-center">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 brightness-0 invert"
          sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
        />
      </div>

      {/* Name reveal on hover */}
      <motion.span
        className="mt-3 text-xs sm:text-sm font-medium text-foreground/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {name}
      </motion.span>
    </motion.div>
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
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 sm:w-32 lg:w-48 bg-gradient-to-r from-[#0a0a0a] to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 sm:w-32 lg:w-48 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

      <div
        ref={scrollRef}
        className="flex items-center overflow-x-hidden py-6 sm:py-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedItems.map((integration, index) => (
          <IntegrationCard
            key={`${integration.name}-${index}`}
            name={integration.name}
            logo={integration.logo}
          />
        ))}
      </div>
    </div>
  );
}

// Animated particles for cinematic background
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 w-0.5 rounded-full bg-primary/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * 100 + "%"],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Cinematic dark background with subtle texture */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a0a] to-background" />
        
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glow effects */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[120px]" />

        {/* Animated particles */}
        <ParticleField />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          {/* Label with decorative lines */}
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
              Integration
            </span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Integrations
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
            Seamlessly connect with the tools you already use and love
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
