"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import {
  FileText,
  Palette,
  Rocket,
  HeadphonesIcon,
  Check,
  MessageCircle,
  User,
} from "lucide-react";

const ACCENT_COLOR = "#1D9E75";

const steps = [
  {
    key: "blueprint",
    icon: FileText,
    title: "Blueprint Design",
    description: "We analyze your needs and create a detailed plan",
  },
  {
    key: "design",
    icon: Palette,
    title: "UI & UX Design",
    description: "Beautiful, intuitive interfaces tailored to you",
  },
  {
    key: "delivery",
    icon: Rocket,
    title: "Delivery & Training",
    description: "Seamless deployment with comprehensive training",
  },
  {
    key: "support",
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "24/7 assistance to keep everything running smoothly",
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
    <div className="relative h-full w-full rounded-lg bg-gray-50 border border-dashed border-gray-300 p-4 overflow-hidden">
      {/* Header placeholder */}
      <motion.div
        className="h-3 w-20 rounded bg-gray-300 mb-4"
        initial={{ width: 0 }}
        animate={{ width: animationPhase >= 0 ? 80 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* Grid layout */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-16 rounded border border-dashed border-gray-400 bg-gray-100"
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
      <div className="space-y-3">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="h-6 rounded border border-dashed border-gray-300 bg-gray-100"
            initial={{ width: 0 }}
            animate={{ width: animationPhase >= 2 ? "100%" : 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          />
        ))}
      </div>
      
      {/* Footer element */}
      <motion.div
        className="absolute bottom-4 right-4 h-5 w-16 rounded"
        style={{ backgroundColor: ACCENT_COLOR }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated drawing cursor */}
      <motion.div
        className="absolute h-2 w-2 rounded-full"
        style={{ backgroundColor: ACCENT_COLOR, boxShadow: `0 0 8px 2px ${ACCENT_COLOR}40` }}
        animate={{
          x: [16, 120, 120, 16],
          y: [16, 16, 100, 100],
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
    <div className="relative h-full w-full rounded-lg bg-white border border-gray-200 overflow-hidden">
      {/* Mini nav bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <div className="ml-3 h-2.5 flex-1 max-w-32 rounded bg-gray-200" />
      </div>
      
      {/* Tab navigation */}
      <div className="flex gap-2 px-4 py-2 border-b border-gray-100">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2.5 rounded transition-all"
            style={{
              width: activeTab === i ? 32 : 20,
              backgroundColor: activeTab === i ? ACCENT_COLOR : "#e5e7eb"
            }}
          />
        ))}
      </div>
      
      {/* Content area with cards */}
      <div className="p-4 space-y-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border transition-all"
            animate={{ 
              borderColor: activeTab === i ? ACCENT_COLOR : "#e5e7eb",
              scale: activeTab === i ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="h-8 w-8 rounded"
              style={{ backgroundColor: activeTab === i ? `${ACCENT_COLOR}20` : "#f3f4f6" }}
            />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-16 rounded bg-gray-300" />
              <div className="h-2 w-24 rounded bg-gray-200" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Action button */}
      <motion.div
        className="absolute bottom-4 right-4 h-8 w-20 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: ACCENT_COLOR }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-2 w-12 rounded bg-white/80" />
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
    <div className="relative h-full w-full rounded-lg bg-white border border-gray-200 p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="h-8 w-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${ACCENT_COLOR}15` }}
        >
          <Rocket className="h-4 w-4" style={{ color: ACCENT_COLOR }} />
        </div>
        <div className="h-3 w-24 rounded bg-gray-200" />
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2.5 w-full rounded-full bg-gray-100 mb-5 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: ACCENT_COLOR }}
          animate={{ width: `${(completedSteps / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Checklist */}
      <div className="space-y-3">
        {checklistItems.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3"
            animate={{ opacity: completedSteps > i ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-5 w-5 rounded-full border-2 flex items-center justify-center"
              style={{
                backgroundColor: completedSteps > i ? ACCENT_COLOR : "transparent",
                borderColor: completedSteps > i ? ACCENT_COLOR : "#d1d5db"
              }}
              animate={{ scale: completedSteps === i + 1 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {completedSteps > i && (
                <Check className="h-3 w-3 text-white" />
              )}
            </motion.div>
            <span className={`text-sm ${completedSteps > i ? "text-gray-900" : "text-gray-400"}`}>
              {item}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Completion indicator */}
      {completedSteps === 4 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center gap-2"
            style={{ color: ACCENT_COLOR }}
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Check className="h-6 w-6" />
            <span className="text-base font-semibold">Complete!</span>
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
      setMessages([]);
      setIsTyping(false);
      
      await new Promise(r => setTimeout(r, 800));
      setMessages([0]);
      
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(true);
      
      await new Promise(r => setTimeout(r, 1200));
      setIsTyping(false);
      setMessages([0, 1]);
      
      await new Promise(r => setTimeout(r, 1000));
      setMessages([0, 1, 2]);
      
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(true);
      
      await new Promise(r => setTimeout(r, 1000));
      setIsTyping(false);
      setMessages([0, 1, 2, 3]);
      
      await new Promise(r => setTimeout(r, 2000));
    };

    sequence();
    const interval = setInterval(sequence, 8000);
    return () => clearInterval(interval);
  }, []);

  const chatMessages = [
    { type: "user", text: "Need help with setup!" },
    { type: "support", text: "Hi! Happy to assist you." },
    { type: "user", text: "Dashboard not loading" },
    { type: "support", text: "Let me fix that for you now" },
  ];

  return (
    <div className="relative h-full w-full rounded-lg bg-white border border-gray-200 overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100" style={{ backgroundColor: `${ACCENT_COLOR}08` }}>
        <div className="relative">
          <div 
            className="h-8 w-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${ACCENT_COLOR}15` }}
          >
            <MessageCircle className="h-4 w-4" style={{ color: ACCENT_COLOR }} />
          </div>
          <div 
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white"
            style={{ backgroundColor: ACCENT_COLOR }}
          />
        </div>
        <div className="flex-1">
          <div className="h-2.5 w-16 rounded bg-gray-300" />
          <div className="h-2 w-10 rounded mt-1" style={{ backgroundColor: `${ACCENT_COLOR}40` }} />
        </div>
      </div>
      
      {/* Messages */}
      <div className="p-3 space-y-2.5 h-[calc(100%-52px)] overflow-hidden">
        {chatMessages.map((msg, i) => (
          messages.includes(i) && (
            <motion.div
              key={i}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {msg.type === "support" && (
                <div 
                  className="h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                  style={{ backgroundColor: `${ACCENT_COLOR}15` }}
                >
                  <User className="h-3 w-3" style={{ color: ACCENT_COLOR }} />
                </div>
              )}
              <div 
                className={`max-w-[75%] px-3 py-2 rounded-xl text-xs ${
                  msg.type === "user" 
                    ? "text-white rounded-tr-sm" 
                    : "bg-gray-100 text-gray-800 rounded-tl-sm"
                }`}
                style={msg.type === "user" ? { backgroundColor: ACCENT_COLOR } : {}}
              >
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
            <div 
              className="h-6 w-6 rounded-full flex items-center justify-center mr-2"
              style={{ backgroundColor: `${ACCENT_COLOR}15` }}
            >
              <User className="h-3 w-3" style={{ color: ACCENT_COLOR }} />
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded-xl rounded-tl-sm flex gap-1">
              {[0, 0.15, 0.3].map((delay, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-gray-400"
                  animate={{ y: [0, -3, 0] }}
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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: '#F5F5F0' }}>
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            From Idea to Implementation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg"
          >
            Our streamlined process takes your vision from concept to reality with precision and care.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          {/* Left column - Tab list */}
          <div className="lg:w-[35%] space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeTab === index;
              
              return (
                <motion.button
                  key={step.key}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? "border-gray-300 bg-white" 
                      : "border-gray-200 bg-white/50 hover:bg-white hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Number label */}
                  <span className="text-xs font-medium text-gray-400 mb-2 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    {/* Icon box */}
                    <div 
                      className="h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{ 
                        backgroundColor: isActive ? ACCENT_COLOR : "#f3f4f6",
                      }}
                    >
                      <Icon 
                        className="h-5 w-5 transition-colors duration-300" 
                        style={{ color: isActive ? "white" : "#9ca3af" }}
                      />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        isActive ? "text-gray-900" : "text-gray-700"
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right column - Browser mockup */}
          <div className="lg:w-[65%]">
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              {/* Browser top bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="h-6 w-64 rounded-md bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400">propease.app/dashboard</span>
                  </div>
                </div>
                <div className="w-12" /> {/* Spacer for symmetry */}
              </div>
              
              {/* Content area */}
              <div className="p-6 h-[400px] bg-gray-50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {(() => {
                      const MockupComponent = mockupComponents[steps[activeTab].key];
                      return <MockupComponent />;
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
