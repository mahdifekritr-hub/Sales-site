"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bot, MessageSquare, Check, Bell, Clock, X, Cpu, Users } from "lucide-react";

const communicationTasks = [
  { name: "Building-wide water shut-off notice", match: 98, priority: "Urgent", channel: "All Channels" },
  { name: "Monthly newsletter distribution", match: 94, priority: "Normal", channel: "Email" },
  { name: "Community event reminder", match: 91, priority: "Normal", channel: "Push" },
];

export function CommunicationAIMatching() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [sent, setSent] = useState<string[]>([]);
  const [scheduled, setScheduled] = useState<string[]>([]);

  const conversationSteps = [
    { role: "ai", message: "Hi! I'm your communication AI assistant. How can I help you reach your residents today?" },
    { role: "user", message: "I need to notify residents about a water shut-off tomorrow" },
    { role: "ai", message: "I'll prepare an urgent announcement. For water shut-offs, I recommend using all channels (email, SMS, and push) to ensure maximum reach." },
    { role: "user", message: "What time should I send it?" },
    { role: "ai", message: "Based on engagement data, your residents are most active between 6-8 PM. I'd recommend sending at 6 PM today, with a follow-up reminder at 7 AM tomorrow." },
    { role: "user", message: "Perfect, schedule it" },
    { role: "ai", message: "Done! I've scheduled the announcement for 6 PM today via all channels (156 residents). A reminder will go out at 7 AM tomorrow. I'll track delivery and engagement for you." },
  ];

  const toggleSent = (name: string) => {
    setSent((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleScheduled = (name: string) => {
    setScheduled((prev) =>
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
              Community Assistant
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            Our intelligent AI assistant helps answer resident questions, provides information about rules and events, and actively participates in community discussions.
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
                  <p className="text-sm font-medium">Communication AI</p>
                  <p className="text-xs text-muted-foreground">Smart Resident Engagement</p>
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
                <h3 className="text-lg font-semibold">Pending Communications</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  AI Optimized
                </span>
              </div>
              <div className="space-y-4">
                {communicationTasks.map((task, index) => {
                  const isSent = sent.includes(task.name);
                  const isScheduled = scheduled.includes(task.name);

                  return (
                    <motion.div
                      key={task.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className={`group relative overflow-hidden rounded-xl border-2 bg-secondary/30 p-4 transition-all ${isSent
                          ? "border-primary bg-primary/5"
                          : isScheduled
                            ? "border-chart-5 bg-chart-5/5"
                            : "border-border/50 hover:border-primary/30 hover:bg-secondary/50"
                        }`}
                    >
                      {/* Status Badge */}
                      {(isSent || isScheduled) && (
                        <div className="absolute top-3 right-3">
                          {isSent && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              <Check className="h-3 w-3" />
                              Sent
                            </span>
                          )}
                          {isScheduled && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                              <Clock className="h-3 w-3" />
                              Scheduled
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                        <div className="flex gap-3 sm:gap-4">
                          <div className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${isScheduled ? "bg-chart-5/10" : "bg-primary/10"
                            }`}>
                            <MessageSquare className={`h-5 w-5 sm:h-6 sm:w-6 ${isScheduled ? "text-chart-5" : "text-primary"
                              }`} />
                          </div>
                          <div>
                            <p className={`font-medium ${isScheduled ? "line-through text-muted-foreground" : ""}`}>
                              {task.name}
                            </p>
                            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Bell className="h-3 w-3" />
                                {task.channel}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-xs ${
                                task.priority === "Urgent" 
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
                            <p className={`font-semibold ${isScheduled ? "line-through text-muted-foreground" : ""}`}>
                              {task.match}%
                            </p>
                            <div className="mt-1 flex items-center gap-1 text-sm">
                              <Users className="h-3 w-3 text-chart-4" />
                              <span className="text-chart-4">reach</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => toggleSent(task.name)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${isSent
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-border/50 text-muted-foreground hover:border-primary hover:text-primary"
                                }`}
                              title="Send Now"
                            >
                              <Check className={`h-4 w-4 ${isSent ? "fill-current" : ""}`} />
                            </button>
                            <button
                              onClick={() => toggleScheduled(task.name)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${isScheduled
                                  ? "bg-chart-5 text-primary-foreground"
                                  : "border border-border/50 text-muted-foreground hover:border-chart-5 hover:text-chart-5"
                                }`}
                              title="Schedule"
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
                          className={`h-full rounded-full ${isScheduled
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
            {(sent.length > 0 || scheduled.length > 0) && (
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
                    <p className="font-medium">AI Engagement Tracking</p>
                    <p className="text-sm text-muted-foreground">Optimizing delivery times</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 px-3 py-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {sent.length} sent
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 px-3 py-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                      {scheduled.length} scheduled
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
