"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  FileText,
  Palette,
  Rocket,
  HeadphonesIcon,
  Check,
  MessageCircle,
  User,
  Bell,
  Home,
  Settings,
  Users,
  Calendar,
  BarChart3,
} from "lucide-react";

const ACCENT_COLOR = "#701951";

const STEP_KEYS = ["blueprint", "design", "delivery", "support"] as const;

const STEP_ICONS: Record<(typeof STEP_KEYS)[number], typeof FileText> = {
  blueprint: FileText,
  design: Palette,
  delivery: Rocket,
  support: HeadphonesIcon,
};

const SIDEBAR_KEYS = ["dashboard", "tenants", "bookings", "settings"] as const;
const SIDEBAR_ICONS = [Home, Users, Calendar, Settings] as const;

type WorkflowProperty = {
  name: string;
  statusKey: string;
  units: number;
  occupancy: number;
};

type WorkflowStep = {
  key: (typeof STEP_KEYS)[number];
  icon: typeof FileText;
  title: string;
  description: string;
  url: string;
};

type ChatMessage = { type: "user" | "support"; text: string };

function useWorkflowShared() {
  const t = useTranslations("workflow.mockups.shared");
  const properties = t.raw("properties") as WorkflowProperty[];
  const sidebarItems = SIDEBAR_KEYS.map((key, i) => ({
    icon: SIDEBAR_ICONS[i],
    label: t(`sidebar.${key}`),
  }));

  return { t, properties, sidebarItems };
}

// Tab 01 - Blueprint (Wireframe)
function BlueprintMockup() {
  const { sidebarItems, properties } = useWorkflowShared();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 1800),
      setTimeout(() => setPhase(5), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative h-full w-full flex overflow-hidden">
      {/* Sidebar wireframe */}
      <motion.div
        className="w-16 h-full border-r-2 border-dashed border-gray-300 bg-gray-100 p-2 flex flex-col gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -20 }}
        transition={{ duration: 0.4 }}
      >
        {sidebarItems.map((_, i) => (
          <motion.div
            key={i}
            className="h-8 w-full border-2 border-dashed border-gray-400 rounded bg-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        {/* Top nav wireframe */}
        <motion.div
          className="h-8 w-full border-2 border-dashed border-gray-300 rounded bg-gray-100 mb-4 flex items-center justify-between px-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-3 w-20 bg-gray-300 rounded" />
          <div className="flex gap-2">
            <div className="h-4 w-4 border-2 border-dashed border-gray-400 rounded" />
            <div className="h-4 w-4 border-2 border-dashed border-gray-400 rounded-full" />
          </div>
        </motion.div>

        {/* Page title wireframe */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
          <div className="h-2 w-48 bg-gray-200 rounded" />
        </motion.div>

        {/* Property cards wireframe - 3 cards in a row */}
        <div className="grid grid-cols-3 gap-3">
          {properties.map((_, i) => (
            <motion.div
              key={i}
              className="border-2 border-dashed border-gray-400 rounded-lg p-3 bg-gray-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: phase >= 4 ? 1 : 0, 
                scale: phase >= 4 ? 1 : 0.9 
              }}
              transition={{ duration: 0.3, delay: i * 0.15 }}
            >
              {/* Card header */}
              <div className="h-12 w-full border-2 border-dashed border-gray-300 rounded bg-gray-200 mb-2" />
              {/* Card content lines */}
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-300 rounded" />
                <div className="h-2 w-3/4 bg-gray-200 rounded" />
                <div className="flex gap-2 mt-3">
                  <div className="h-4 w-12 border-2 border-dashed border-gray-400 rounded" />
                  <div className="h-4 w-10 border-2 border-dashed border-gray-400 rounded" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row wireframe */}
        <motion.div
          className="mt-4 grid grid-cols-4 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 10 }}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-10 border-2 border-dashed border-gray-300 rounded bg-gray-100" />
          ))}
        </motion.div>
      </div>

      {/* Animated cursor */}
      <motion.div
        className="absolute h-4 w-4 pointer-events-none z-50"
        initial={{ x: 100, y: 50 }}
        animate={{
          x: [100, 60, 60, 150, 250, 350, 350],
          y: [50, 100, 180, 180, 180, 180, 280],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-full w-full drop-shadow-md">
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
            fill={ACCENT_COLOR}
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// Tab 02 - UI & UX Design (Fully designed dashboard)
function UIDesignMockup() {
  const t = useTranslations("workflow.mockups.design");
  const { t: tShared, properties, sidebarItems } = useWorkflowShared();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 800),
      setTimeout(() => setPhase(4), 1100),
      setTimeout(() => setPhase(5), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const statusColors: Record<string, { bg: string; text: string }> = {
    active: { bg: "#dcfce7", text: "#166534" },
    maintenance: { bg: "#fef3c7", text: "#92400e" },
    available: { bg: `${ACCENT_COLOR}15`, text: ACCENT_COLOR },
  };

  const statKeys = ["totalUnits", "occupancy", "revenue", "requests"] as const;

  return (
    <div className="relative h-full w-full flex overflow-hidden bg-gray-50 rounded-lg">
      {/* Colored sidebar */}
      <motion.div
        className="w-16 h-full border-r border-gray-200 bg-white p-2 flex flex-col gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -20 }}
        transition={{ duration: 0.4 }}
      >
        {sidebarItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              className={`h-10 w-full rounded-lg flex items-center justify-center transition-all ${
                i === 0 ? "text-white" : "text-gray-400 hover:bg-gray-100"
              }`}
              style={{ backgroundColor: i === 0 ? ACCENT_COLOR : "transparent" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Icon className="h-4 w-4" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* Top nav */}
        <motion.div
          className="h-10 w-full bg-white rounded-lg border border-gray-200 mb-4 flex items-center justify-between px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm font-semibold text-gray-800">{t("dashboardTitle")}</span>
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-gray-400" />
            <div className="h-6 w-6 rounded-full bg-gray-200" />
          </div>
        </motion.div>

        {/* Page header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-base font-bold text-gray-900">{t("pageTitle")}</h3>
          <p className="text-xs text-gray-500">{t("pageSubtitle")}</p>
        </motion.div>

        {/* Property cards - designed */}
        <div className="grid grid-cols-3 gap-3">
          {properties.map((card, i) => (
            <motion.div
              key={card.name}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Card header with color */}
              <div 
                className="h-10 w-full"
                style={{ backgroundColor: i === 0 ? ACCENT_COLOR : i === 1 ? "#6366f1" : "#10b981" }}
              />
              {/* Card content */}
              <div className="p-2.5">
                <h4 className="text-xs font-semibold text-gray-900 mb-1 truncate">{card.name}</h4>
                <div className="flex items-center gap-1.5 mb-2">
                  <span 
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ 
                      backgroundColor: statusColors[card.statusKey].bg,
                      color: statusColors[card.statusKey].text
                    }}
                  >
                    {tShared(`statuses.${card.statusKey}`)}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>{card.units} {tShared("units")}</span>
                  <span>{card.occupancy}{tShared("occupancyShort")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-4 grid grid-cols-4 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 10 }}
          transition={{ duration: 0.4 }}
        >
          {statKeys.map((key) => (
            <div key={key} className="bg-white rounded-lg border border-gray-200 p-2 text-center">
              <div className="text-sm font-bold text-gray-900">{t(`stats.${key}.value`)}</div>
              <div className="text-[9px] text-gray-500">{t(`stats.${key}.label`)}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Tab 03 - Delivery (Live & Working with maintenance panel)
function DeliveryMockup() {
  const t = useTranslations("workflow.mockups.delivery");
  const { sidebarItems } = useWorkflowShared();
  const [phase, setPhase] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setPhase(0);
    setProgressWidth(0);
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1000),
      setTimeout(() => { setPhase(4); setProgressWidth(75); }, 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const timelineSteps = [
    { label: t("timeline.reported"), done: true },
    { label: t("timeline.assigned"), done: true },
    { label: t("timeline.inProgress"), done: true },
    { label: t("timeline.complete"), done: false, pulsing: true },
  ];

  return (
    <div className="relative h-full w-full flex overflow-hidden bg-gray-50 rounded-lg">
      {/* Sidebar */}
      <motion.div
        className="w-16 h-full border-r border-gray-200 bg-white p-2 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {sidebarItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`h-10 w-full rounded-lg flex items-center justify-center ${
                i === 0 ? "text-white" : "text-gray-400"
              }`}
              style={{ backgroundColor: i === 0 ? ACCENT_COLOR : "transparent" }}
            >
              <Icon className="h-4 w-4" />
            </div>
          );
        })}
      </motion.div>

      {/* Main content with panel overlay */}
      <div className="flex-1 relative">
        {/* Background dashboard (dimmed) */}
        <div className="absolute inset-0 p-4 opacity-30">
          <div className="h-10 bg-white rounded-lg border mb-4" />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 bg-white rounded-lg border" />
            ))}
          </div>
        </div>

        {/* Maintenance request panel */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[75%] bg-white border-l border-gray-200 shadow-xl p-4 overflow-hidden"
          initial={{ x: "100%" }}
          animate={{ x: phase >= 2 ? 0 : "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Panel header with notification badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div 
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${ACCENT_COLOR}15` }}
              >
                <Settings className="h-4 w-4" style={{ color: ACCENT_COLOR }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{t("requestTitle")}</h4>
                <p className="text-[10px] text-gray-500">{t("requestId")}</p>
              </div>
            </div>
            {/* Notification badge */}
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: phase >= 3 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Bell className="h-5 w-5 text-gray-400" />
              <motion.span
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[9px] text-white flex items-center justify-center font-bold"
                style={{ backgroundColor: ACCENT_COLOR }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                3
              </motion.span>
            </motion.div>
          </div>

          {/* Issue details */}
          <motion.div
            className="bg-gray-50 rounded-lg p-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-medium text-gray-700">{t("issueTitle")}</p>
            <p className="text-[10px] text-gray-500 mt-1">{t("issueLocation")}</p>
          </motion.div>

          {/* Status timeline */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 4 ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[10px] font-semibold text-gray-500 uppercase mb-3">{t("progressLabel")}</p>
            <div className="flex items-center justify-between mb-2">
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`h-5 w-5 rounded-full flex items-center justify-center border-2 ${
                      step.done 
                        ? "border-transparent text-white" 
                        : "border-gray-300 bg-white"
                    }`}
                    style={{ backgroundColor: step.done ? ACCENT_COLOR : undefined }}
                    animate={step.pulsing ? { 
                      boxShadow: [`0 0 0 0px ${ACCENT_COLOR}40`, `0 0 0 8px ${ACCENT_COLOR}00`]
                    } : {}}
                    transition={step.pulsing ? { duration: 1.5, repeat: Infinity } : {}}
                  >
                    {step.done && <Check className="h-3 w-3" />}
                    {step.pulsing && !step.done && (
                      <motion.div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: ACCENT_COLOR }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span className="text-[8px] text-gray-500 mt-1 text-center">{step.label}</span>
                </div>
              ))}
            </div>
            {/* Connecting line */}
            <div className="relative h-1 bg-gray-200 rounded-full mx-6 -mt-6 mb-6">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: ACCENT_COLOR }}
                initial={{ width: 0 }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 4 ? 1 : 0 }}
          >
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-gray-500">{t("overallProgress")}</span>
              <span className="font-semibold" style={{ color: ACCENT_COLOR }}>{t("progressPercent")}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: ACCENT_COLOR }}
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Tab 04 - Ongoing Support (Chat widget)
function SupportMockup() {
  const t = useTranslations("workflow.mockups.support");
  const chatMessages = t.raw("messages") as ChatMessage[];
  const [messages, setMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const runSequence = async () => {
      if (!mounted) return;
      setMessages([]);
      setIsTyping(false);
      
      await new Promise(r => setTimeout(r, 500));
      if (!mounted) return;
      setMessages([0]);
      
      await new Promise(r => setTimeout(r, 600));
      if (!mounted) return;
      setIsTyping(true);
      
      await new Promise(r => setTimeout(r, 1000));
      if (!mounted) return;
      setIsTyping(false);
      setMessages([0, 1]);
      
      await new Promise(r => setTimeout(r, 800));
      if (!mounted) return;
      setMessages([0, 1, 2]);
      
      await new Promise(r => setTimeout(r, 500));
      if (!mounted) return;
      setIsTyping(true);
      
      await new Promise(r => setTimeout(r, 1200));
      if (!mounted) return;
      setIsTyping(false);
      setMessages([0, 1, 2, 3]);
    };

    runSequence();
    const interval = setInterval(runSequence, 7000);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative h-full w-full flex gap-4 p-2 overflow-hidden">
      {/* Chat widget */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Chat header */}
        <div 
          className="px-4 py-3 flex items-center gap-3 border-b border-gray-100"
          style={{ backgroundColor: ACCENT_COLOR }}
        >
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{t("chatTitle")}</p>
            <p className="text-[10px] text-white/70">{t("chatStatus")}</p>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 p-3 space-y-2.5 overflow-y-auto bg-gray-50">
          {chatMessages.map((msg, i) => (
            messages.includes(i) && (
              <motion.div
                key={i}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
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
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${
                    msg.type === "user" 
                      ? "text-white rounded-tr-sm" 
                      : "bg-white text-gray-800 rounded-tl-sm border border-gray-200"
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
              <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-sm border border-gray-200 flex gap-1">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-gray-400"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="w-32 flex flex-col gap-3">
        <motion.div
          className="flex-1 bg-white rounded-xl border border-gray-200 p-3 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div 
            className="h-10 w-10 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: `${ACCENT_COLOR}10` }}
          >
            <BarChart3 className="h-5 w-5" style={{ color: ACCENT_COLOR }} />
          </div>
          <span className="text-lg font-bold text-gray-900">{t("uptime.value")}</span>
          <span className="text-[10px] text-gray-500 text-center">{t("uptime.label")}</span>
        </motion.div>
        
        <motion.div
          className="flex-1 bg-white rounded-xl border border-gray-200 p-3 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className="h-10 w-10 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: `${ACCENT_COLOR}10` }}
          >
            <MessageCircle className="h-5 w-5" style={{ color: ACCENT_COLOR }} />
          </div>
          <span className="text-lg font-bold text-gray-900">{t("response.value")}</span>
          <span className="text-[10px] text-gray-500 text-center">{t("response.label")}</span>
        </motion.div>
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

  const steps = useMemo<WorkflowStep[]>(
    () =>
      STEP_KEYS.map((key) => ({
        key,
        icon: STEP_ICONS[key],
        title: t(`steps.${key}.title`),
        description: t(`steps.${key}.description`),
        url: t(`steps.${key}.url`),
      })),
    [t],
  );

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
            {t("badge")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg"
          >
            {t("subtitle")}
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
                  <div className="h-6 px-3 rounded-md bg-gray-200 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeTab}
                        className="text-xs text-gray-500"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {steps[activeTab].url}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="w-12" /> {/* Spacer for symmetry */}
              </div>
              
              {/* Content area */}
              <div className="h-[400px] bg-gray-100">
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
