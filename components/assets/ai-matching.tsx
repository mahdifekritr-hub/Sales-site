"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bot, Package, Check, AlertTriangle, Clock, X, Cpu, QrCode } from "lucide-react";

const assetTasks = [
  { name: "HVAC Unit Annual Inspection - Tower A", match: 98, priority: "High", dueDate: "Today" },
  { name: "Generator Fuel Level Check", match: 94, priority: "Medium", dueDate: "Tomorrow" },
  { name: "Elevator Safety Certification", match: 91, priority: "High", dueDate: "In 3 days" },
];

export function AssetsAIMatching() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [assigned, setAssigned] = useState<string[]>([]);
  const [deferred, setDeferred] = useState<string[]>([]);

  const conversationSteps = [
    { role: "ai", message: "Hi! I'm your asset management AI assistant. How can I help you today?" },
    { role: "user", message: "Show me assets with expiring warranties" },
    { role: "ai", message: "I found 12 assets with warranties expiring in the next 90 days. The most critical is the HVAC Unit in Tower A - warranty expires in 15 days." },
    { role: "user", message: "What's the replacement cost?" },
    { role: "ai", message: "The Carrier 50XC HVAC unit has an estimated replacement cost of $45,000. Current market value is $28,000 based on age and condition." },
    { role: "user", message: "Schedule an inspection before warranty expires" },
    { role: "ai", message: "Done! I've created a work order for HVAC inspection scheduled for next week. The certified technician John has been notified and will receive the asset documentation and maintenance history." },
  ];

  const toggleAssigned = (name: string) => {
    setAssigned((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleDeferred = (name: string) => {
    setDeferred((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <section id="ai-matching" className="relative py-16 sm:py-24 lg:py-15" ref={ref}>
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
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            AI-Powered
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Asset Intelligence Engine
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            Our AI analyzes asset data, warranty status, and maintenance history to provide proactive recommendations and automate asset management decisions.
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
                  <p className="text-sm font-medium">Asset AI</p>
                  <p className="text-xs text-muted-foreground">Smart Asset Management</p>
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
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${step.role === "user"
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
                      Continue conversation
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
                <h3 className="text-lg font-semibold">Asset Inspections Due</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  AI Prioritized
                </span>
              </div>
              <div className="space-y-4">
                {assetTasks.map((task, index) => {
                  const isAssigned = assigned.includes(task.name);
                  const isDeferred = deferred.includes(task.name);

                  return (
                    <motion.div
                      key={task.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className={`group relative overflow-hidden rounded-xl border-2 bg-secondary/30 p-4 transition-all ${isAssigned
                          ? "border-primary bg-primary/5"
                          : isDeferred
                            ? "border-chart-5 bg-chart-5/5"
                            : "border-border/50 hover:border-primary/30 hover:bg-secondary/50"
                        }`}
                    >
                      {/* Status Badge */}
                      {(isAssigned || isDeferred) && (
                        <div className="absolute top-3 right-3">
                          {isAssigned && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              <Check className="h-3 w-3" />
                              Scheduled
                            </span>
                          )}
                          {isDeferred && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                              <Clock className="h-3 w-3" />
                              Deferred
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                        <div className="flex gap-3 sm:gap-4">
                          <div className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${isDeferred ? "bg-chart-5/10" : "bg-primary/10"
                            }`}>
                            <Package className={`h-5 w-5 sm:h-6 sm:w-6 ${isDeferred ? "text-chart-5" : "text-primary"
                              }`} />
                          </div>
                          <div>
                            <p className={`font-medium ${isDeferred ? "line-through text-muted-foreground" : ""}`}>
                              {task.name}
                            </p>
                            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <QrCode className="h-3 w-3" />
                                {task.dueDate}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-xs ${
                                task.priority === "High" 
                                  ? "bg-destructive/10 text-destructive" 
                                  : "bg-chart-5/10 text-chart-5"
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="text-right">
                            <p className={`font-semibold ${isDeferred ? "line-through text-muted-foreground" : ""}`}>
                              {task.match}%
                            </p>
                            <div className="mt-1 flex items-center gap-1 text-sm">
                              <AlertTriangle className="h-3 w-3 text-chart-4" />
                              <span className="text-chart-4">match</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => toggleAssigned(task.name)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${isAssigned
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-border/50 text-muted-foreground hover:border-primary hover:text-primary"
                                }`}
                              title="Schedule"
                            >
                              <Check className={`h-4 w-4 ${isAssigned ? "fill-current" : ""}`} />
                            </button>
                            <button
                              onClick={() => toggleDeferred(task.name)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${isDeferred
                                  ? "bg-chart-5 text-primary-foreground"
                                  : "border border-border/50 text-muted-foreground hover:border-chart-5 hover:text-chart-5"
                                }`}
                              title="Defer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${task.match}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                          className={`h-full rounded-full ${isDeferred
                              ? "bg-gradient-to-r from-chart-5 to-yellow-400"
                              : "bg-gradient-to-r from-primary to-accent"
                            }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* AI Learning Section */}
            {(assigned.length > 0 || deferred.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">AI Learning Patterns</p>
                    <p className="text-sm text-muted-foreground">Optimizing asset schedules</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 px-3 py-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {assigned.length} scheduled
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 px-3 py-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                      {deferred.length} deferred
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
