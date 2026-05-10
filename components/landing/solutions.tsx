"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  {
    tag: "Sales Module",
    title: "Seamless Selling Experience",
    description:
      "Our property sales module offers an interactive experience across web and mobile. Users navigate floors, explore units with virtual tours, book physical visits, or reserve instantly with a deposit.",
    features: [
      "Interactive floor navigation",
      "Immersive 360° virtual tours",
      "Instant unit reservation",
      "Integrated deposit payments",
      "Multi-platform support",
    ],
    gradient: "from-primary to-accent",
  },
  {
    tag: "Rental Module",
    title: "Flexible Rental Management",
    description:
      "Manage daily, annual, or long-term rentals with automated request queuing. If one prospect doesn't finalize, the next in line gets the opportunity automatically.",
    features: [
      "Multi-duration rental support",
      "Automated request queuing",
      "Smart opportunity routing",
      "Availability management",
      "Rental analytics",
    ],
    gradient: "from-accent to-chart-2",
  },
  {
    tag: "Owner Portal",
    title: "Empower Unit Owners",
    description:
      "Enable property owners to list their units for sale or rent directly within the platform. Track interested parties, manage requests, and oversee the entire process seamlessly.",
    features: [
      "Direct property listing",
      "Request management dashboard",
      "Interest tracking",
      "Owner notifications",
      "Performance insights",
    ],
    gradient: "from-chart-2 to-primary",
  },
  {
    tag: "Contract Management",
    title: "Streamlined Contracts",
    description:
      "Handle all stages of contract preparation, from drafting to e-signatures. Track payments with automated reminders ensuring all transactions complete on time.",
    features: [
      "Automated contract drafting",
      "Digital signature support",
      "Payment milestone tracking",
      "Automated reminders",
      "Compliance management",
    ],
    gradient: "from-primary to-chart-4",
  },
];

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="relative py-32" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            Solutions
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Comprehensive modules for
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              every workflow
            </span>
          </h2>
        </motion.div>

        {/* Solutions list */}
        <div className="mt-24 space-y-32">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.title} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center gap-12 lg:flex-row ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className="flex-1 lg:max-w-lg">
        <span
          className={`inline-block rounded-full bg-gradient-to-r ${solution.gradient} px-4 py-1.5 text-sm font-medium text-primary-foreground`}
        >
          {solution.tag}
        </span>
        <h3 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{solution.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{solution.description}</p>
        <ul className="mt-8 space-y-3">
          {solution.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <motion.div className="flex-1" style={{ y }}>
        <div className="relative">
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${solution.gradient} opacity-20 blur-3xl`}
          />
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-1 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl bg-secondary/50 p-6">
              {/* Mockup UI */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/20" />
                <div className="flex-1">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="mt-1 h-2 w-16 rounded bg-muted/60" />
                </div>
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-background/50 p-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10" />
                    <div className="flex-1">
                      <div className="h-3 w-full max-w-32 rounded bg-muted" />
                      <div className="mt-1 h-2 w-20 rounded bg-muted/60" />
                    </div>
                    <div className="h-6 w-16 rounded-full bg-primary/20" />
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-lg bg-background/50 p-3">
                    <div className="h-16 rounded bg-primary/10" />
                    <div className="mt-2 h-2 w-full rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
