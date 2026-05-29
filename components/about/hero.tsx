"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Globe } from "lucide-react";
import { ProductSignupTrigger } from "@/components/signup/product-signup-trigger";

export function AboutHero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-20">
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[400px] sm:h-[600px] sm:w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[80px] sm:blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-accent/15 blur-[60px] sm:blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[150px] w-[250px] sm:h-[300px] sm:w-[500px] rounded-full bg-primary/10 blur-[60px] sm:blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Building2 className="h-4 w-4" />
              About Us
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Revolutionizing{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              PM SaaS
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl px-2 sm:px-0"
          >
            Since 2013, we&apos;ve been at the forefront of property management innovation. 
            Now serving clients in over five countries, we specialize in creating transformative 
            solutions that simplify management and enhance community living globally.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 sm:flex-row px-4 sm:px-0"
          >
            <ProductSignupTrigger
              product="sales"
              size="lg"
              className="group gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ProductSignupTrigger>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 sm:mt-20 grid grid-cols-2 gap-8 sm:gap-16"
          >
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                80+
              </div>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Modules for Seamless Management
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                10+
              </div>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Years of Expertise
              </p>
            </div>
          </motion.div>

          {/* Global presence indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center gap-3 text-muted-foreground"
          >
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-sm sm:text-base">Serving clients in 5+ countries worldwide</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
