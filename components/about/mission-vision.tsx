"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Brain, Home, Lightbulb, TrendingUp } from "lucide-react";

const missionItems = [
  {
    icon: Target,
    title: "Streamlining Management",
    description: "We simplify property management with innovative, efficient, and user-friendly tools",
  },
  {
    icon: Users,
    title: "Empowering Communities",
    description: "Our mission is to foster stronger, more connected residential communities worldwide.",
  },
];

const visionItems = [
  {
    icon: Brain,
    title: "AI-Driven Future",
    description: "We aim to revolutionize property management through AI, automating tasks for effortless efficiency.",
  },
  {
    icon: Home,
    title: "Thriving Communities",
    description: "Our vision is to create vibrant, well-organized communities that turn living spaces into exceptional homes.",
  },
];

export function MissionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Lightbulb className="h-4 w-4" />
            Our Mission & Vision
          </span>
          <h2 className="mt-6 text-balance text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
            Shaping the Future with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Collective Innovation
            </span>
          </h2>
        </motion.div>

        {/* Mission & Vision Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Our Mission</h3>
            </div>
            <div className="space-y-4">
              {missionItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Our Vision</h3>
            </div>
            <div className="space-y-4">
              {visionItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-transform group-hover:scale-110">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
