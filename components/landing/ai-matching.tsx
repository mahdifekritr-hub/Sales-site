"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bot, Building, Heart, MapPin, MessageSquare, Sparkles, Star } from "lucide-react";

const conversationSteps = [
  { role: "ai", message: "Hi! I'm here to find your perfect property. What's your ideal location?" },
  { role: "user", message: "Downtown area, close to public transit" },
  { role: "ai", message: "Great choice! What's your budget range and preferred size?" },
  { role: "user", message: "Around $500K, 2-3 bedrooms" },
  { role: "ai", message: "Perfect. Any specific amenities you need?" },
  { role: "user", message: "Parking, balcony, and modern kitchen" },
  { role: "ai", message: "I found 12 matches with 3 perfect fits. Here are my top recommendations..." },
];

const matchedProperties = [
  { name: "Skyline Tower Unit 1204", match: 98, price: "$495,000", beds: 3 },
  { name: "Metro View Residence 8B", match: 94, price: "$510,000", beds: 2 },
  { name: "Urban Heights 15A", match: 91, price: "$485,000", beds: 3 },
];

export function AIMatching() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="ai-matching" className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered
          </span>
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            Intelligent Property
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Matching Engine
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            Our AI goes beyond basic filters. Through conversational understanding, it learns
            preferences, prioritizes needs, and delivers highly personalized property recommendations.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-20 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Conversation UI */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/30 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">PropertyCare AI</p>
                  <p className="text-xs text-muted-foreground">Smart Property Matching</p>
                </div>
              </div>
              <div className="h-[300px] sm:h-[400px] overflow-y-auto p-3 sm:p-4">
                <div className="space-y-4">
                  {conversationSteps.slice(0, activeStep + 1).map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${step.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          step.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm">{step.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border/50 bg-secondary/20 p-4">
                <div className="flex gap-2">
                  {activeStep < conversationSteps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep((prev) => prev + 1)}
                      className="flex-1 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary transition-colors hover:bg-primary/20"
                    >
                      Continue conversation →
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveStep(0)}
                      className="flex-1 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary transition-colors hover:bg-primary/20"
                    >
                      Restart demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results UI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Top Matches</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  AI Ranked
                </span>
              </div>
              <div className="space-y-4">
                {matchedProperties.map((property, index) => (
                  <motion.div
                    key={property.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl border border-border/50 bg-secondary/30 p-4 transition-all hover:border-primary/30 hover:bg-secondary/50"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary/10">
                          <Building className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{property.name}</p>
                          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Downtown
                            </span>
                            <span>{property.beds} beds</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{property.price}</p>
                        <div className="mt-1 flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-chart-4 text-chart-4" />
                          <span className="text-chart-4">{property.match}% match</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${property.match}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MessageSquare, label: "Conversational UI", value: "Natural language" },
                { icon: Heart, label: "Preference Learning", value: "Weighted priorities" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm"
                >
                  <item.icon className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
