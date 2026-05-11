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
    tag: "Ai",
    title: "Let AI Handle it",
    description:
      "An intelligent AI sidebar is available in both Ask and Agent modes, acting as your always-on assistant within the platform. Simply describe what you need, and the AI will execute tasks, answer questions, and support your workflow instantly.From generating reports on staff performance to summarizing work orders, CRM, and tickets in any language, the AI turns complex operations into clear, actionable insights.It can also suggest responses, recommend next steps, and help you manage communication effortlessly.Send messages to customers, create reports, or generate automated greetings — all powered by AI.No need to navigate multiple sections; just ask, and it gets done.",
    features: [
      // "Multi-duration rental support",
      // "Automated request queuing",
      // "Smart opportunity routing",
      // "Availability management",
      // "Rental analytics",
    ],
    gradient: "from-accent to-chart-2",
  },
  {
    tag: "Visit a Unit",
    title: "Book an In-Person Tour",
    description:
      "Beyond virtual tours, buyers can now schedule a real in-person visit to explore the project firsthand. The system displays all available time slots, allowing interested buyers to easily choose the time that works best for them. Once a tour is booked, instant notifications are automatically sent to the assigned agent, presenter, and any authorized staff such as security or reception through their dedicated dashboard panels. Create a seamless and professional viewing experience — from scheduling to on-site coordination.",
    features: [
      // "Direct property listing",
      // "Request management dashboard",
      // "Interest tracking",
      // "Owner notifications",
      // "Performance insights",
    ],
    gradient: "from-chart-2 to-primary",
  },
  {
    tag: "Buyers Capability",
    title: "Hold a Unit",
    description:
      "This module is designed to manage both property sales and rentals (daily, annual). Users can easily reserve or purchase their preferred unit through a simple and intuitive process.Requests are automatically organized through a smart queue system. If a reservation or purchase is not completed, the next interested buyer is instantly notified and given the opportunity to proceed.by streamlining sales and rental operations, the system helps agencies and developers manage properties more efficiently while ensuring no opportunity is missed.",
    features: [
      // "Automated contract drafting",
      // "Digital signature support",
      // "Payment milestone tracking",
      // "Automated reminders",
      // "Compliance management",
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
      className={`flex flex-col items-center gap-12 lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"
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
              {solution.tag === "Visit a Unit" ? (
                <>
                  {/* Month navigation header */}
                  <div className="mb-4 flex items-center justify-center gap-4">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-base font-semibold text-foreground">May 2026</span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Week strip with day cards */}
                  <div className="mb-6 flex items-center gap-2">
                    <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex flex-1 justify-center gap-1">
                      {[
                        { day: "Sun", date: 10, selected: false },
                        { day: "Mon", date: 11, selected: false },
                        { day: "Tue", date: 12, selected: true },
                        { day: "Wed", date: 13, selected: false },
                        { day: "Thu", date: 14, selected: false },
                        { day: "Fri", date: 15, selected: false },
                        { day: "Sat", date: 16, selected: false },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`flex w-12 flex-col items-center rounded-xl py-2 transition-colors ${
                            item.selected
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-background/50 text-foreground hover:bg-muted"
                          }`}
                        >
                          <span className={`text-xs ${item.selected ? "text-primary-foreground" : "text-muted-foreground"}`}>{item.day}</span>
                          <span className="text-sm font-semibold">{item.date}</span>
                        </div>
                      ))}
                    </div>
                    <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Time slot section heading */}
                  <div className="mb-3 text-center text-sm font-medium text-foreground">
                    Select Hours for Tuesday, May 12
                  </div>

                  {/* Time slot grid - 4 columns */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      "09:00", "09:30", "10:00", "10:30",
                      "11:00", "11:30", "12:00", "12:30",
                      "13:00", "13:30", "14:00", "14:30",
                      "15:00", "15:30", "16:00", "16:30",
                    ].map((time, i) => {
                      const isSelected = time === "09:30";
                      return (
                        <button
                          key={i}
                          className={`rounded-xl py-2 text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-background/50 text-foreground hover:bg-muted"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selection summary */}
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    You selected time from <span className="font-semibold text-foreground">09:30</span> to <span className="font-semibold text-foreground">10:00</span>
                  </div>
                </>
              ) : solution.tag === "Buyers Capability" ? (
                <>
                  {/* Hold a Unit - Header with unit name and countdown */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      <span className="text-xs font-bold text-primary">A12</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">Unit A-1204</div>
                      <div className="text-xs text-muted-foreground">Tower A, Floor 12</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 px-3 py-1">
                      <span className="text-xs font-mono font-semibold text-primary">23:45:12</span>
                    </div>
                  </div>
                  {/* Buyer queue list */}
                  <div className="space-y-3">
                    {[
                      { initials: "JD", name: "John Davidson", time: "2 min ago", active: true },
                      { initials: "SM", name: "Sarah Miller", time: "15 min ago", active: false },
                      { initials: "AK", name: "Ahmed Khan", time: "1 hour ago", active: false },
                      { initials: "LC", name: "Lisa Chen", time: "3 hours ago", active: false },
                    ].map((buyer, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-background/50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <span className="text-sm font-semibold text-primary">{buyer.initials}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{buyer.name}</div>
                          <div className="text-xs text-muted-foreground">{buyer.time}</div>
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs font-medium ${buyer.active ? "bg-green-500/20 text-green-600" : "bg-muted text-muted-foreground"}`}>
                          {buyer.active ? "Active Hold" : "In Queue"}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Stats cards */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <div className="text-2xl font-bold text-primary">4</div>
                      <div className="mt-1 text-xs text-muted-foreground">In Queue</div>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="mt-1 text-xs text-muted-foreground">Holds Today</div>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <div className="text-2xl font-bold text-primary">18m</div>
                      <div className="mt-1 text-xs text-muted-foreground">Avg. Wait</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Default skeleton mockup for other solutions */}
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
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
