"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Bot,
  Languages,
  Lightbulb,
  Zap,
  MessageSquare,
  FileText,
  TrendingUp,
  Send,
  CheckCircle2,
  Brain,
  FilePlus2,
  UserCheck,
  Calendar,
  Wrench,
} from "lucide-react";

const aiFeatures = [
  { key: "assistant", icon: Bot, gradient: "from-primary to-[oklch(0.45_0.18_340)]" },
  { key: "translation", icon: Languages, gradient: "from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)]" },
  { key: "insights", icon: Lightbulb, gradient: "from-chart-5 to-[oklch(0.55_0.16_40)]" },
  { key: "automation", icon: Zap, gradient: "from-chart-4 to-[oklch(0.5_0.14_140)]" },
  { key: "summaries", icon: FileText, gradient: "from-[oklch(0.5_0.16_280)] to-[oklch(0.4_0.14_300)]" },
  { key: "predictions", icon: TrendingUp, gradient: "from-chart-4 to-[oklch(0.55_0.15_150)]" },
];

export function AIFeaturesSection() {
  const t = useTranslations("aiFeatures");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  // Simulated chat messages
  const chatMessages = [
    { role: "user", text: "Summarize my last negotiation with Mr. Johnson" },
    { role: "ai", text: "Client is interested in unit 12F. Main concerns: parking availability and early handover. Last session was close to agreement." },
  ];

  // Workflow steps shown in the second AI response card
  const workflowSteps = [
    { icon: FilePlus2, text: "Resident submits maintenance request" },
    { icon: UserCheck, text: "Owner reviews and approves" },
    { icon: Calendar, text: "Resident is asked for available time slots" },
    { icon: Wrench, text: "Request assigned to technician" },
  ];

  // Typing animation
  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true);
      const text = chatMessages[0].text;
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowResponse(true), 500);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % aiFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Subtle background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft gradient orbs */}
        <motion.div
          className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.45 0.2 330 / 0.08) 0%, oklch(0.38 0.16 330 / 0.02) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.18 200 / 0.06) 0%, oklch(0.5 0.15 200 / 0.01) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.5 0.18 330 / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.5 0.18 330 / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/30"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary mb-6 shadow-lg shadow-primary/10"
          >
            <Brain className="h-4 w-4" />
            {t("badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground"
          >
            {t("title")}
            <br />
            <span className="bg-gradient-to-r from-primary via-[oklch(0.55_0.18_200)] to-[oklch(0.55_0.16_350)] bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* AI Chat Preview with enhanced visuals */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Main chat card */}
            <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/10">
              {/* Chat header with gradient */}
              <div className="flex items-center gap-3 border-b border-border/40 px-4 py-3 bg-gradient-to-r from-secondary/50 to-secondary/20">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.15_200)] flex items-center justify-center shadow-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <motion.div
                    className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-chart-4 border-2 border-card"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Assistant</div>
                  <div className="text-xs text-muted-foreground">{t("alwaysReady")}</div>
                </div>
                <div className="ml-auto flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-4 animate-pulse" />
                </div>
              </div>

              {/* Chat messages area */}
              <div className="p-4 space-y-4 h-[440px] overflow-y-auto bg-gradient-to-b from-transparent to-secondary/10">
                {/* User message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-primary to-[oklch(0.45_0.18_340)] px-4 py-3 text-primary-foreground text-sm shadow-lg">
                    {typedText}
                    {!showResponse && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-0.5 h-4 bg-primary-foreground ml-0.5 align-middle"
                      />
                    )}
                  </div>
                </motion.div>

                {/* AI response */}
                {showResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-4">
                      {/* Negotiation summary card */}
                      <div className="rounded-2xl rounded-tl-md bg-card/80 border border-border/30 px-4 py-3 shadow-md">
                        <div className="text-xs font-semibold text-primary mb-1.5">Summary — 4 sessions</div>
                        <p className="text-sm text-foreground">{chatMessages[1].text}</p>
                        {/* Quick action buttons */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {["Send as reply", "Next steps"].map((action, i) => (
                            <motion.button
                              key={action}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              {action}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Deal probability card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl rounded-tl-md bg-card/80 border border-border/30 px-4 py-3 shadow-md"
                      >
                        <div className="text-xs font-semibold text-primary mb-2">Deal probability</div>
                        <div className="rounded-xl border border-border/30 bg-secondary/20 px-3 py-3">
                          <div className="text-sm text-foreground mb-2">Based on negotiation history</div>
                          <div className="h-2 w-full rounded-full bg-secondary/60 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "74%" }}
                              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.45_0.18_340)]"
                            />
                          </div>
                          <div className="text-sm font-semibold text-primary mt-2">74% likely to close</div>
                        </div>
                      </motion.div>

                      {/* Second user message */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[90%] rounded-2xl rounded-br-md bg-gradient-to-r from-primary to-[oklch(0.45_0.18_340)] px-4 py-3 text-primary-foreground text-sm shadow-lg">
                          Update the maintenance request workflow — after owner approval, ask the resident for available time slots, then assign to a technician.
                        </div>
                      </motion.div>

                      {/* Workflow updated card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="rounded-2xl rounded-tl-md bg-card/80 border border-border/30 px-4 py-3 shadow-md"
                      >
                        <div className="text-xs font-semibold text-primary mb-3">Workflow updated</div>
                        <div className="space-y-1">
                          {workflowSteps.map((step, i) => (
                            <div key={step.text}>
                              <div className="flex items-center gap-3">
                                <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 border border-primary/20">
                                  <step.icon className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-sm text-foreground">{step.text}</span>
                              </div>
                              {i < workflowSteps.length - 1 && (
                                <div className="ml-[13px] h-3 w-px bg-border/60" />
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Workflow action buttons */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {["Activate", "Edit steps"].map((action, i) => (
                            <motion.button
                              key={action}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + i * 0.1 }}
                              className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              {action}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input area */}
              <div className="border-t border-border/40 p-3 bg-secondary/20">
                <div className="flex items-center gap-2 rounded-xl bg-card/80 border border-border/40 px-3 py-2.5 shadow-inner">
                  <input
                    type="text"
                    placeholder={t("askAnything")}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    readOnly
                  />
                  <button className="h-9 w-9 rounded-lg bg-gradient-to-r from-primary to-[oklch(0.45_0.18_340)] flex items-center justify-center text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating accent cards */}
            <motion.div
              className="absolute -top-4 -right-4 rounded-xl border border-border/40 bg-card/90 p-3 shadow-xl backdrop-blur-xl"
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)] flex items-center justify-center shadow-md">
                  <Languages className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold">12 Languages</div>
                  <div className="text-[10px] text-muted-foreground">Auto-translate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 rounded-xl border border-border/40 bg-card/90 p-3 shadow-xl backdrop-blur-xl"
              animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-chart-4 to-[oklch(0.5_0.14_140)] flex items-center justify-center shadow-md">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold">Instant</div>
                  <div className="text-[10px] text-muted-foreground">{"<"}100ms response</div>
                </div>
              </div>
            </motion.div>

            {/* Glow effect behind chat */}
            <div className="absolute inset-0 -z-10 opacity-50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-primary/10 rounded-full blur-[80px]" />
            </div>
          </motion.div>

          {/* Features list with enhanced cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.08 }}
                onClick={() => setActiveFeature(index)}
                className={`relative group cursor-pointer rounded-xl border p-4 transition-all duration-300 overflow-hidden ${
                  activeFeature === index
                    ? "border-primary/50 shadow-lg shadow-primary/10"
                    : "border-border/40 hover:border-primary/30"
                }`}
                style={{ backgroundColor: 'rgba(112,25,81,0.05)' }}
              >
                {/* Active gradient accent */}
                {activeFeature === index && (
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient}`} />
                )}
                
                {/* Background glow on active */}
                {activeFeature === index && (
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.gradient} opacity-[0.08] blur-2xl`} />
                )}
                
                <div className="relative flex items-start gap-4">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-[2px] transition-all shadow-md ${
                      activeFeature === index ? "shadow-lg" : ""
                    }`}
                  >
                    <div className="h-full w-full rounded-[10px] bg-card flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-foreground">{t(`features.${feature.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                  
                  {/* Checkmark for active */}
                  {activeFeature === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </motion.div>
                  )}
                </div>

                {/* Active indicator bar */}
                {activeFeature === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${feature.gradient} rounded-r-full`}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
