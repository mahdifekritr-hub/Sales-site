"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import {
  FileText,
  Palette,
  Rocket,
  HeadphonesIcon,
  Check,
  Sparkles,
  MessageCircle,
  User,
} from "lucide-react";

const steps = [
  {
    key: "blueprint",
    icon: FileText,
    gradient: "from-primary to-[oklch(0.45_0.18_340)]",
    bgGlow: "primary",
  },
  {
    key: "design",
    icon: Palette,
    gradient: "from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)]",
    bgGlow: "[oklch(0.55_0.18_200)]",
  },
  {
    key: "delivery",
    icon: Rocket,
    gradient: "from-chart-4 to-[oklch(0.5_0.14_140)]",
    bgGlow: "chart-4",
  },
  {
    key: "support",
    icon: HeadphonesIcon,
    gradient: "from-chart-5 to-[oklch(0.55_0.16_40)]",
    bgGlow: "chart-5",
  },
];

// Animated Wireframe Mockup for Blueprint Design
function BlueprintMockup() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full rounded-lg bg-secondary/30 border border-dashed border-border/60 p-2 overflow-hidden">
      {/* Header placeholder */}
      <motion.div
        className="h-2 w-12 rounded-sm bg-border/40 mb-2"
        initial={{ width: 0 }}
        animate={{ width: animationPhase >= 0 ? 48 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* Grid layout */}
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-8 rounded-sm border border-dashed border-primary/30 bg-primary/5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: animationPhase >= 1 ? 1 : 0, 
              scale: animationPhase >= 1 ? 1 : 0.8 
            }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          />
        ))}
      </div>
      
      {/* Content blocks */}
      <div className="space-y-1.5">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="h-4 rounded-sm border border-dashed border-border/50 bg-border/20"
            initial={{ width: 0 }}
            animate={{ width: animationPhase >= 2 ? "100%" : 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          />
        ))}
      </div>
      
      {/* Footer element */}
      <motion.div
        className="absolute bottom-2 right-2 h-3 w-8 rounded-sm bg-primary/20 border border-dashed border-primary/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated drawing cursor */}
      <motion.div
        className="absolute h-1 w-1 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(var(--primary),0.4)]"
        animate={{
          x: [8, 60, 60, 8],
          y: [8, 8, 50, 50],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// Animated UI Preview for UI & UX Design
function UIDesignMockup() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full rounded-lg bg-card border border-border/40 overflow-hidden shadow-sm">
      {/* Mini nav bar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border/30 bg-secondary/20">
        <div className="h-1.5 w-1.5 rounded-full bg-destructive/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-chart-5/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-chart-4/60" />
        <div className="ml-2 h-1.5 flex-1 rounded-sm bg-border/30" />
      </div>
      
      {/* Tab navigation */}
      <div className="flex gap-1 px-2 py-1 border-b border-border/20">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-sm transition-all ${
              activeTab === i ? "w-6 bg-primary" : "w-4 bg-border/40"
            }`}
            animate={{ 
              backgroundColor: activeTab === i ? "var(--primary)" : "var(--border)"
            }}
          />
        ))}
      </div>
      
      {/* Content area with cards */}
      <div className="p-2 space-y-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1.5 p-1.5 rounded bg-secondary/40 border border-border/20"
            initial={{ opacity: 0, y: 5 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: activeTab === i ? 1.02 : 1,
              borderColor: activeTab === i ? "var(--primary)" : "var(--border)"
            }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <div className={`h-4 w-4 rounded ${
              i === 0 ? "bg-primary/20" : i === 1 ? "bg-chart-4/20" : "bg-chart-5/20"
            }`} />
            <div className="flex-1 space-y-0.5">
              <div className="h-1 w-8 rounded-sm bg-foreground/20" />
              <div className="h-1 w-12 rounded-sm bg-border/40" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Action button */}
      <motion.div
        className="absolute bottom-2 right-2 h-4 w-10 rounded bg-primary flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-1 w-6 rounded-sm bg-primary-foreground/80" />
      </motion.div>
    </div>
  );
}

// Animated Progress Tracker for Delivery & Training
function DeliveryMockup() {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) => (prev + 1) % 5);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const checklistItems = [
    "Setup complete",
    "Data migration",
    "Team training",
    "Go live"
  ];

  return (
    <div className="relative h-full w-full rounded-lg bg-card border border-border/40 p-2 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="h-3 w-3 rounded bg-chart-4/20 flex items-center justify-center">
          <Rocket className="h-2 w-2 text-chart-4" />
        </div>
        <div className="h-1.5 w-10 rounded-sm bg-foreground/20" />
      </div>
      
      {/* Progress bar */}
      <div className="relative h-1.5 w-full rounded-full bg-border/30 mb-2.5 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-chart-4 to-chart-4/70"
          animate={{ width: `${(completedSteps / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Checklist */}
      <div className="space-y-1.5">
        {checklistItems.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1.5"
            animate={{ 
              opacity: completedSteps > i ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`h-3 w-3 rounded-full border flex items-center justify-center ${
                completedSteps > i 
                  ? "bg-chart-4 border-chart-4" 
                  : "bg-transparent border-border/50"
              }`}
              animate={{ 
                scale: completedSteps === i + 1 ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {completedSteps > i && (
                <Check className="h-2 w-2 text-white" />
              )}
            </motion.div>
            <span className={`text-[8px] ${
              completedSteps > i ? "text-foreground" : "text-muted-foreground"
            }`}>
              {item}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Completion indicator */}
      {completedSteps === 4 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center gap-1 text-chart-4"
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Check className="h-4 w-4" />
            <span className="text-[10px] font-medium">Complete!</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Animated Chat Widget for Ongoing Support
function SupportMockup() {
  const [messages, setMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Reset
      setMessages([]);
      setIsTyping(false);
      
      // User message appears
      await new Promise(r => setTimeout(r, 800));
      setMessages([0]);
      
      // Typing indicator
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(true);
      
      // Support response
      await new Promise(r => setTimeout(r, 1200));
      setIsTyping(false);
      setMessages([0, 1]);
      
      // Second user message
      await new Promise(r => setTimeout(r, 1000));
      setMessages([0, 1, 2]);
      
      // Typing again
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(true);
      
      // Final response
      await new Promise(r => setTimeout(r, 1000));
      setIsTyping(false);
      setMessages([0, 1, 2, 3]);
      
      // Wait before restart
      await new Promise(r => setTimeout(r, 2000));
    };

    sequence();
    const interval = setInterval(sequence, 8000);
    return () => clearInterval(interval);
  }, []);

  const chatMessages = [
    { type: "user", text: "Need help!" },
    { type: "support", text: "Hi! How can I assist?" },
    { type: "user", text: "Dashboard issue" },
    { type: "support", text: "I'll help fix that now" },
  ];

  return (
    <div className="relative h-full w-full rounded-lg bg-card border border-border/40 overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-border/30 bg-chart-5/5">
        <div className="relative">
          <div className="h-4 w-4 rounded-full bg-chart-5/20 flex items-center justify-center">
            <MessageCircle className="h-2.5 w-2.5 text-chart-5" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-chart-4 border border-card" />
        </div>
        <div className="flex-1">
          <div className="h-1.5 w-8 rounded-sm bg-foreground/20" />
          <div className="h-1 w-5 rounded-sm bg-chart-4/40 mt-0.5" />
        </div>
      </div>
      
      {/* Messages */}
      <div className="p-1.5 space-y-1 h-[calc(100%-28px)] overflow-hidden">
        {chatMessages.map((msg, i) => (
          messages.includes(i) && (
            <motion.div
              key={i}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {msg.type === "support" && (
                <div className="h-3 w-3 rounded-full bg-chart-5/20 flex items-center justify-center mr-1 flex-shrink-0">
                  <User className="h-1.5 w-1.5 text-chart-5" />
                </div>
              )}
              <div className={`max-w-[70%] px-1.5 py-1 rounded-lg text-[7px] ${
                msg.type === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-secondary/60 text-foreground rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          )
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-3 w-3 rounded-full bg-chart-5/20 flex items-center justify-center mr-1">
              <User className="h-1.5 w-1.5 text-chart-5" />
            </div>
            <div className="bg-secondary/60 px-2 py-1 rounded-lg rounded-tl-sm flex gap-0.5">
              {[0, 0.15, 0.3].map((delay, i) => (
                <motion.div
                  key={i}
                  className="h-1 w-1 rounded-full bg-muted-foreground/60"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Map step keys to mockup components
const mockupComponents: Record<string, React.FC> = {
  blueprint: BlueprintMockup,
  design: UIDesignMockup,
  delivery: DeliveryMockup,
  support: SupportMockup,
};

export function WorkflowSection() {
  const t = useTranslations("workflow");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: '#F9F0F5' }}>
      {/* Background with gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Base soft tint */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F9F0F5' }} />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.16 330 / 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.15 200 / 0.08) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.18 40 / 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(oklch(0.38 0.16 330 / 0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          }}
        />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <Sparkles className="h-4 w-4" />
            {t("badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Timeline with enhanced visuals */}
        <div className="relative">
          {/* Connecting line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            {/* Animated progress line */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-[oklch(0.55_0.15_200)] to-chart-4 rounded-full"
              style={{ scaleX: lineProgress, transformOrigin: "left" }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/50 via-[oklch(0.55_0.15_200)]/50 to-chart-4/50 blur-sm rounded-full"
              style={{ scaleX: lineProgress, transformOrigin: "left" }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const MockupComponent = mockupComponents[step.key];
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="relative rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                    {/* Top gradient accent */}
                    <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${step.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    
                    {/* Background glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                    
                    {/* Step number badge */}
                    <div className="absolute -top-3 -left-3 z-10">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-lg opacity-50`} />
                        <div className={`relative h-10 w-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                          {(index + 1).toString().padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-8">
                      {/* Icon with gradient background */}
                      <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${step.gradient} p-[2px] mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <div className="h-full w-full rounded-[14px] bg-card flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-foreground" />
                        </div>
                        {/* Icon glow */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-3">{t(`steps.${step.key}.title`)}</h3>
                      <p className="text-muted-foreground text-sm mb-5">{t(`steps.${step.key}.description`)}</p>

                      {/* Features list */}
                      <ul className="space-y-2.5 mb-5">
                        {[1, 2, 3].map((i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center gap-2.5 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4 + index * 0.12 + i * 0.05 }}
                          >
                            <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${step.gradient} p-[1px] flex-shrink-0`}>
                              <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                                <Check className="h-3 w-3 text-foreground" />
                              </div>
                            </div>
                            <span className="text-muted-foreground">{t(`steps.${step.key}.features.${i}`)}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Animated UI Mockup Preview */}
                      <div className="h-28 w-full">
                        <MockupComponent />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats at bottom with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-[oklch(0.55_0.15_200)]/5" />
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-chart-4/10 rounded-full blur-[80px]" />
            
            <div className="relative py-8 sm:py-10 px-6 sm:px-8">
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 lg:gap-24">
                {[
                  { value: "500+", label: t("stats.projects"), gradient: "from-primary to-[oklch(0.55_0.15_200)]" },
                  { value: "2-4", label: t("stats.weeks"), gradient: "from-[oklch(0.55_0.15_200)] to-chart-4" },
                  { value: "100%", label: t("stats.satisfaction"), gradient: "from-chart-4 to-chart-5" },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
