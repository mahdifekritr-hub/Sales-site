"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle2, Bot, Sparkles, ChevronRight, User, Home, Users, FileText, Calendar, BarChart3, MessageSquare, Building2, MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const solutionKeys = ["sales", "ai", "visit", "buyers"] as const;

// Background colors for each solution card (soft pastel tones)
const solutionBackgrounds = [
  "bg-[#e8f5e9]", // Soft mint green
  "bg-[#e3f2fd]", // Soft blue
  "bg-[#fff3e0]", // Soft peach/orange
  "bg-[#f3e5f5]", // Soft lavender
];

// CTA button colors matching backgrounds
const ctaColors = [
  "bg-[#2e7d32] hover:bg-[#1b5e20]", // Dark green
  "bg-[#1565c0] hover:bg-[#0d47a1]", // Dark blue
  "bg-[#e65100] hover:bg-[#bf360c]", // Dark orange
  "bg-[#7b1fa2] hover:bg-[#4a148c]", // Dark purple
];

// Feature pill dot colors
const dotColors = [
  "bg-[#4caf50]", // Green dot
  "bg-[#2196f3]", // Blue dot
  "bg-[#ff9800]", // Orange dot
  "bg-[#9c27b0]", // Purple dot
];

// Compact AI Dashboard Visual for Solutions Section
function AIHandleVisual({ t }: { t: (key: string) => string }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const fullPrompt = "Who is 5360220352?";

  useEffect(() => {
    if (isInView) {
      const sidebarTimer = setTimeout(() => setShowSidebar(true), 300);

      const typingStart = setTimeout(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= fullPrompt.length) {
            setTypedPrompt(fullPrompt.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => setShowTyping(true), 200);
            setTimeout(() => {
              setShowTyping(false);
              setShowResponse(true);
            }, 1200);
          }
        }, 70);
        return () => clearInterval(typeInterval);
      }, 800);

      return () => {
        clearTimeout(sidebarTimer);
        clearTimeout(typingStart);
      };
    }
  }, [isInView]);

  const sidebarItems = [
    { icon: Home, active: true },
    { icon: Users },
    { icon: FileText },
    { icon: Calendar },
    { icon: BarChart3 },
    { icon: MessageSquare },
  ];

  const requests = [
    { id: "5360220352", name: "Matt Fakri", statusKey: "pending" as const },
    { id: "5360220348", name: "Sarah Chen", statusKey: "active" as const },
    { id: "5360220341", name: "Omar Hassan", statusKey: "done" as const },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Mini dashboard mockup */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-500">
            app.propertycare.io/dashboard
          </div>
        </div>

        {/* Dashboard content */}
        <div className="relative flex h-[320px] sm:h-[380px]">
          {/* Mini sidebar */}
          <div className={`hidden sm:flex w-12 flex-col gap-1.5 border-r border-gray-100 bg-gray-50/50 py-3 transition-all duration-300 ${showSidebar ? "opacity-40 blur-[1px]" : ""}`}>
            {sidebarItems.map((item, i) => (
              <div
                key={i}
                className={`mx-1.5 flex h-8 w-8 items-center justify-center rounded-lg ${item.active ? "bg-primary text-white" : "text-gray-400"}`}
              >
                <item.icon className="h-4 w-4" />
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className={`flex-1 overflow-hidden transition-all duration-300 ${showSidebar ? "opacity-30 blur-[2px]" : ""}`}>
            {/* Header */}
            <div className="border-b border-gray-100 px-4 py-3">
              <div className="text-sm font-semibold text-gray-900">{t("dashboard.requests")}</div>
              <div className="text-xs text-gray-500">3 {t("dashboard.pending")}</div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 p-3">
              {[
                { label: t("dashboard.pending"), val: "3", color: "text-yellow-600" },
                { label: t("dashboard.active"), val: "12", color: "text-primary" },
                { label: t("dashboard.done"), val: "48", color: "text-green-600" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-gray-50 p-3 text-center">
                  <div className={`text-lg font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mini table */}
            <div className="px-3">
              <div className="rounded-xl border border-gray-100 bg-white">
                {requests.map((r, i) => (
                  <div key={r.id} className={`flex items-center gap-3 px-3 py-2.5 ${i !== requests.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                      <User className="h-3.5 w-3.5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-xs font-medium text-gray-900">{r.name}</div>
                      <div className="text-[10px] text-gray-400">#{r.id}</div>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.statusKey === "pending" ? "bg-yellow-100 text-yellow-700" :
                      r.statusKey === "active" ? "bg-primary/10 text-primary" : "bg-green-100 text-green-700"
                      }`}>
                      {t(`dashboard.${r.statusKey}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Sidebar overlay */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                initial={{ x: 280, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 280, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0 sm:left-auto sm:right-0 sm:top-0 flex h-full w-full sm:w-[280px] flex-col border-l border-primary/10 bg-white/98 backdrop-blur-xl"
                style={{ boxShadow: "-10px 0 40px -10px rgba(0,0,0,0.1)" }}
              >
                {/* Sidebar header */}
                <motion.div
                  className="flex items-center gap-3 border-b border-gray-100 px-4 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <motion.div
                      className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{t("dashboard.aiAssistant")}</div>
                    <div className="text-[10px] text-gray-500">{t("dashboard.readyToHelp")}</div>
                  </div>
                  <Sparkles className="h-4 w-4 text-primary" />
                </motion.div>

                {/* Chat area */}
                <div className="flex-1 overflow-hidden p-3">
                  <div className="space-y-3">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-end"
                    >
                      <div className="rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-xs text-white">
                        {typedPrompt}<span className="animate-pulse">|</span>
                      </div>
                    </motion.div>

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {showTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex justify-start"
                        >
                          <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2">
                            <div className="flex gap-1">
                              {[0, 0.1, 0.2].map((d, i) => (
                                <motion.div
                                  key={i}
                                  className="h-2 w-2 rounded-full bg-gray-400"
                                  animate={{ y: [0, -3, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.5, delay: d }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Response */}
                    <AnimatePresence>
                      {showResponse && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-3"
                        >
                          {/* Response card */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50"
                          >
                            {/* Client header */}
                            <div className="border-b border-gray-100 bg-white px-3 py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-[10px] font-semibold text-white">
                                  MF
                                </div>
                                <div>
                                  <div className="text-xs font-medium text-gray-900">Matt Fakri</div>
                                  <div className="text-[10px] text-gray-400">#5360220352</div>
                                </div>
                                <span className="ml-auto rounded-full bg-yellow-100 px-2 py-0.5 text-[9px] font-medium text-yellow-700">
                                  {t("dashboard.pending")}
                                </span>
                              </div>
                            </div>

                            <div className="p-3 text-[11px] leading-relaxed text-gray-600">
                              {t("dashboard.requestBelongsTo")} <span className="font-medium text-gray-900">Matt Fakri</span>, {t("dashboard.markedAs")} <span className="text-yellow-600 font-medium">{t("dashboard.pendingUnitInquiry")}</span>.
                            </div>

                            {/* Recommendation */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mx-3 mb-3 rounded-xl border border-primary/20 bg-primary/5 p-2.5"
                            >
                              <div className="mb-1 flex items-center gap-1">
                                <Sparkles className="h-3 w-3 text-primary" />
                                <span className="text-[10px] font-medium text-primary">{t("dashboard.recommended")}</span>
                              </div>
                              <p className="text-[10px] leading-relaxed text-gray-600">
                                {t("dashboard.assignTo")} - {t("dashboard.assignToAliReason")}.
                              </p>
                            </motion.div>
                          </motion.div>

                          {/* Action buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-1.5"
                          >
                            {[t("dashboard.assignTo"), t("dashboard.sendFollowUp"), t("dashboard.viewSummary")].map((action) => (
                              <motion.button
                                key={action}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-primary/30"
                              >
                                {action}
                                <ChevronRight className="h-2.5 w-2.5" />
                              </motion.button>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Premium Tower Visual for Seamless Selling Experience
function TowerVisual({ t }: { t: (key: string) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentFloor, setCurrentFloor] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [highlightedUnit, setHighlightedUnit] = useState(0);

  const floors = [
    { number: 35, units: 8 },
    { number: 28, units: 6 },
    { number: 20, units: 8 },
    { number: 12, units: 6 },
  ];

  useEffect(() => {
    if (!isInView) return;

    const floorInterval = setInterval(() => {
      setCurrentFloor((prev) => {
        const next = (prev + 1) % floors.length;
        setShowPanel(false);
        setHighlightedUnit(0);

        // Show panel after floor highlight
        setTimeout(() => setShowPanel(true), 600);

        // Animate unit highlights
        setTimeout(() => {
          let unitIndex = 0;
          const unitInterval = setInterval(() => {
            setHighlightedUnit(unitIndex + 1);
            unitIndex++;
            if (unitIndex >= 2) clearInterval(unitInterval);
          }, 400);
        }, 1200);

        return next;
      });
    }, 5000);

    // Initial animation
    setTimeout(() => setShowPanel(true), 800);
    setTimeout(() => {
      let unitIndex = 0;
      const unitInterval = setInterval(() => {
        setHighlightedUnit(unitIndex + 1);
        unitIndex++;
        if (unitIndex >= 4) clearInterval(unitInterval);
      }, 400);
    }, 1400);

    return () => clearInterval(floorInterval);
  }, [isInView]);

  const currentFloorData = floors[currentFloor];

  // Calculate floor highlight position (tower is ~400px tall in the visual)
  const getFloorPosition = (floorNum: number) => {
    // Map floor 12-35 to visual positions (higher floor = higher position)
    const minFloor = 12;
    const maxFloor = 35;
    const normalized = (floorNum - minFloor) / (maxFloor - minFloor);
    // Position from bottom: 78% to 12% of tower height
    return 78 - (normalized * 66);
  };

  return (
    <div ref={ref} className="relative h-[460px] sm:h-[420px] overflow-hidden">
      {/* Main content - stack on mobile, side by side on desktop */}
      <div className="relative flex flex-col sm:flex-row h-full">
        {/* Tower section - takes more space */}
        <div className="relative flex-shrink-0 sm:flex-1 flex items-end justify-center sm:justify-start">
          {/* Tower image container */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tower image - significantly larger */}
            <div className="relative h-[220px] w-[280px] sm:h-[450px] sm:w-[280px]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/borj3-GOVntnDxvMKrenVM4ZQgDXjbqZl2lU.png"
                alt="Luxury Tower"
                className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              />

              {/* Floor highlight overlay */}
              <motion.div
                className="absolute left-25 right-0 h-[14px] w-[0px] pointer-events-none"
                style={{ top: `${getFloorPosition(currentFloorData.number)}%` }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.5, 0.9, 0.5],
                  boxShadow: [
                    "0 0 15px 3px rgba(var(--primary), 0.4)",
                    "0 0 30px 6px rgba(var(--primary), 0.6)",
                    "0 0 15px 3px rgba(var(--primary), 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent rounded-full" />
              </motion.div>

              {/* Floor tooltip - hidden on mobile, shown on sm+ */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFloorData.number}
                  className="absolute -right-2 hidden sm:flex items-center gap-1.5"
                  style={{ top: `${getFloorPosition(currentFloorData.number)}%`, transform: "translateY(-50%)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="h-px w-6 bg-gradient-to-r from-primary/60 to-primary" />
                  <div className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-white px-2 py-1 shadow-lg">
                    <Building2 className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-semibold text-gray-900">{t("tower.floor")} {currentFloorData.number}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Floor plan panel */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-3 right-3 bottom-0 sm:left-auto sm:right-0 sm:top-4 sm:bottom-4 flex h-[260px] sm:h-[330px] w-auto sm:w-[290px] flex-col rounded-t-2xl sm:rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xl"
            >
              {/* Panel header */}
              <motion.div
                className="flex items-center gap-2 border-b border-gray-100 px-3 sm:px-4 py-2 sm:py-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">{t("tower.floor")} {currentFloorData.number}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{currentFloorData.units} {t("tower.units")} {t("tower.available")}</div>
                </div>
              </motion.div>

              {/* Floor plan image */}
              <div className="relative flex-1 p-2 sm:p-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative h-full w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final_unit-a4G7TxEW0vgXh4gdDQabkSgKeElGbs.jpg"
                    alt="Floor Plan"
                    className="h-full w-full object-cover"
                  />

                  {/* Unit highlight overlays */}
                  {[
                    { top: "9%", left: "35%", size: "15%" },
                    { top: "29%", left: "55%", size: "16%" },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute pointer-events-none"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        width: pos.size,
                        height: pos.size,
                        transform: "skewX(-50deg) skewY(22deg)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={highlightedUnit > i ? {
                        opacity: [0, 0.8, 0.5],
                        boxShadow: [
                          "0 0 0 0 rgba(var(--primary), 0)",
                          "0 0 15px 3px rgba(var(--primary), 0.6)",
                          "0 0 10px 2px rgba(var(--primary), 0.4)"
                        ]
                      } : { opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="h-full w-full border-2 border-primary/70 bg-primary/20" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Unit list */}
              <motion.div
                className="border-t border-gray-100 p-2 sm:p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-1.5">
                  {["A1", "A2"].map((unit, i) => (
                    <motion.div
                      key={unit}
                      className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs transition-colors ${highlightedUnit > i
                        ? "border border-primary/30 bg-primary/5"
                        : "border border-gray-100 bg-gray-50"
                        }`}
                      animate={highlightedUnit > i ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${highlightedUnit > i ? "bg-primary" : "bg-gray-300"
                        }`} />
                      <span className="font-medium text-gray-900">{t("tower.unit")} {unit}</span>
                      <span className="ml-auto text-gray-500 hidden sm:inline">
                        {highlightedUnit > i ? t("tower.available") : "—"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Visit Scheduling Visual with smooth reveal animation
function VisitScheduleVisual({ t }: { t: (key: string) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      className="overflow-hidden rounded-2xl bg-white shadow-xl"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-6">
        {/* Month navigation header */}
        <motion.div 
          className="mb-5 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-gray-900">May 2026</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* Week strip with day cards */}
        <motion.div 
          className="mb-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button className="flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-600">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-1 justify-center gap-1.5">
            {[
              { dayKey: "sun", date: 10, selected: false },
              { dayKey: "mon", date: 11, selected: false },
              { dayKey: "tue", date: 12, selected: true },
              { dayKey: "wed", date: 13, selected: false },
              { dayKey: "thu", date: 14, selected: false },
              { dayKey: "fri", date: 15, selected: false },
              { dayKey: "sat", date: 16, selected: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                className={`flex w-10 sm:w-12 flex-col items-center rounded-xl py-2 transition-all ${item.selected
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <span className={`text-[10px] ${item.selected ? "text-white/80" : "text-gray-400"}`}>{t(`calendar.${item.dayKey}`)}</span>
                <span className="text-sm font-semibold">{item.date}</span>
              </motion.div>
            ))}
          </div>
          <button className="flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-600">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* Time slot section heading */}
        <motion.div 
          className="mb-4 text-center text-sm font-medium text-gray-700"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {t("calendar.selectHoursFor")} {t("calendar.tue")}, May 12
        </motion.div>

        {/* Time slot grid - 4 columns */}
        <motion.div 
          className="grid grid-cols-4 gap-1.5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            "09:00", "09:30", "10:00", "10:30",
            "11:00", "11:30", "12:00", "12:30",
            "13:00", "13:30", "14:00", "14:30",
            "15:00", "15:30", "16:00", "16:30",
          ].map((time, i) => {
            const isSelected = time === "09:30";
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.02, duration: 0.3 }}
                className={`rounded-xl py-2.5 text-sm font-medium transition-all ${isSelected
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                {time}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Selection summary */}
        <motion.div 
          className="mt-5 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {t("calendar.selectedTimeFrom")} <span className="font-semibold text-gray-900">09:30</span> {t("calendar.to")} <span className="font-semibold text-gray-900">10:00</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Buyers Queue Visual with staggered card animations
function BuyersQueueVisual({ t }: { t: (key: string) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const buyers = [
    { initials: "JD", name: "John Davidson", timeKey: "2", timeUnit: "minAgo", active: true },
    { initials: "SM", name: "Sarah Miller", timeKey: "15", timeUnit: "minAgo", active: false },
    { initials: "AK", name: "Ahmed Khan", timeKey: "1", timeUnit: "hourAgo", active: false },
    { initials: "LC", name: "Lisa Chen", timeKey: "3", timeUnit: "hoursAgo", active: false },
  ];

  return (
    <motion.div 
      ref={ref}
      className="overflow-hidden rounded-2xl bg-white shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-6">
        {/* Hold a Unit - Header with unit name and countdown */}
        <motion.div 
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <span className="text-sm font-bold text-primary">A12</span>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900">{t("tower.unit")} A-1204</div>
            <div className="text-xs text-gray-500">Tower A, {t("tower.floor")} 12</div>
          </div>
          <motion.div 
            className="rounded-xl bg-primary/10 px-4 py-2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <span className="text-sm font-mono font-semibold text-primary">23:45:12</span>
          </motion.div>
        </motion.div>

        {/* Buyer queue list */}
        <div className="space-y-2.5">
          {buyers.map((buyer, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ 
                delay: 0.3 + i * 0.1, 
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.01, backgroundColor: "rgb(249, 250, 251)" }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <span className="text-sm font-semibold text-primary">{buyer.initials}</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{buyer.name}</div>
                <div className="text-xs text-gray-500">{buyer.timeKey} {t(`queue.${buyer.timeUnit}`)}</div>
              </div>
              <div className={`rounded-full px-3 py-1.5 text-xs font-medium ${buyer.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {buyer.active ? t("queue.activeHold") : t("queue.inQueue")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats cards */}
        <motion.div 
          className="mt-5 grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[
            { value: "4", label: t("queue.inQueue") },
            { value: "12", label: t("queue.holdsToday") },
            { value: "83%", label: t("queue.signed") },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              className="rounded-xl bg-gray-50 p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
            >
              <div className="text-xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const t = useTranslations("solutions");

  return (
    <section id="solutions" className="relative py-16 sm:py-24 lg:py-32" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            {t("sectionTitle")}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("sectionTitleHighlight")}
            </span>
          </h2>
        </motion.div>

        {/* Solutions list */}
        <div className="mt-12 sm:mt-24 space-y-8 sm:space-y-12">
          {solutionKeys.map((key, index) => (
            <SolutionCard key={key} solutionKey={key} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  solutionKey,
  index,
}: {
  solutionKey: typeof solutionKeys[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("solutions");

  const tag = t(`items.${solutionKey}.tag`);
  const title = t(`items.${solutionKey}.title`);
  const description = t(`items.${solutionKey}.description`);

  // Feature pills for each solution
  const featuresByKey: Record<string, string[]> = {
    sales: [
      t("items.sales.features.floorNav"),
      t("items.sales.features.virtualTours"),
      t("items.sales.features.reservation"),
      t("items.sales.features.payments"),
    ],
    ai: [
      t("dashboard.aiAssistant"),
      t("dashboard.recommended"),
      t("dashboard.requests"),
      t("dashboard.viewSummary"),
    ],
    visit: [
      t("calendar.selectHoursFor").split(" ")[0],
      "Online Booking",
      "Calendar Sync",
      "Reminders",
    ],
    buyers: [
      t("queue.activeHold"),
      t("queue.inQueue"),
      "Real-time Updates",
      "Priority Queue",
    ],
  };

  const features = featuresByKey[solutionKey] || [];

  // CTA text for each solution
  const ctaText: Record<string, string> = {
    sales: "Explore Sales",
    ai: "Try AI Assistant",
    visit: "Book a Visit",
    buyers: "Manage Queue",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl ${solutionBackgrounds[index]} p-6 sm:p-10 lg:p-14`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
        {/* Content - Left Side */}
        <div className="flex-1 lg:max-w-xl">
          {/* Title */}
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {description}
          </motion.p>

          {/* Feature Pills */}
          <motion.div 
            className="mt-8 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm text-gray-700 border border-white/50 shadow-sm"
              >
                <div className={`h-2 w-2 rounded-full ${dotColors[index]}`} />
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className={`mt-10 inline-flex items-center gap-2 rounded-full ${ctaColors[index]} px-6 py-3 text-sm font-medium text-white transition-all shadow-lg`}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.02, gap: "12px" }}
            whileTap={{ scale: 0.98 }}
          >
            {ctaText[solutionKey]}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Visual - Right Side */}
        <div className="mt-8 lg:mt-0 flex-1 flex justify-center lg:justify-end">
          <div className="w-full max-w-lg">
            {solutionKey === "sales" ? (
              <TowerVisual t={t} />
            ) : solutionKey === "ai" ? (
              <AIHandleVisual t={t} />
            ) : solutionKey === "visit" ? (
              <VisitScheduleVisual t={t} />
            ) : solutionKey === "buyers" ? (
              <BuyersQueueVisual t={t} />
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
