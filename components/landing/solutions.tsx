"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle2, Bot, Sparkles, ChevronRight, User, Home, Users, FileText, Calendar, BarChart3, MessageSquare, Building2, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const solutionKeys = ["sales", "ai", "visit", "buyers"] as const;
const solutionGradients = [
  "from-primary to-accent",
  "from-accent to-chart-2",
  "from-chart-2 to-primary",
  "from-primary to-chart-4",
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
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl">
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/50 px-3 py-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-destructive/60" />
            <div className="h-2 w-2 rounded-full bg-chart-5/60" />
            <div className="h-2 w-2 rounded-full bg-chart-4/60" />
          </div>
          <div className="ml-2 flex-1 rounded bg-background/50 px-2 py-0.5 text-xs text-muted-foreground">
            app.propertycare.io/dashboard
          </div>
        </div>

        {/* Dashboard content */}
        <div className="relative flex h-[280px] sm:h-[320px]">
          {/* Mini sidebar */}
          <div className={`hidden sm:flex w-10 flex-col gap-1 border-r border-border/50 bg-secondary/30 py-2 transition-all duration-300 ${showSidebar ? "opacity-40 blur-[1px]" : ""}`}>
            {sidebarItems.map((item, i) => (
              <div
                key={i}
                className={`mx-1 flex h-7 w-7 items-center justify-center rounded-lg ${item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <item.icon className="h-3.5 w-3.5" />
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className={`flex-1 overflow-hidden transition-all duration-300 ${showSidebar ? "opacity-30 blur-[2px]" : ""}`}>
            {/* Header */}
            <div className="border-b border-border/50 px-3 py-2">
              <div className="text-xs font-semibold">{t("dashboard.requests")}</div>
              <div className="text-[10px] text-muted-foreground">3 {t("dashboard.pending")}</div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-2 p-2">
              {[
                { label: t("dashboard.pending"), val: "3", color: "text-chart-5" },
                { label: t("dashboard.active"), val: "12", color: "text-primary" },
                { label: t("dashboard.done"), val: "48", color: "text-chart-4" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-secondary/50 p-2 text-center">
                  <div className={`text-sm font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-[9px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mini table */}
            <div className="px-2">
              <div className="rounded-lg border border-border/50 bg-secondary/20">
                {requests.map((r, i) => (
                  <div key={r.id} className={`flex items-center gap-2 px-2 py-1.5 ${i !== requests.length - 1 ? "border-b border-border/50" : ""}`}>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
                      <User className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-[10px] font-medium">{r.name}</div>
                      <div className="text-[8px] text-muted-foreground">#{r.id}</div>
                    </div>
                    <span className={`rounded-full px-1.5 py-0.5 text-[8px] ${r.statusKey === "pending" ? "bg-chart-5/10 text-chart-5" :
                      r.statusKey === "active" ? "bg-primary/10 text-primary" : "bg-chart-4/10 text-chart-4"
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
                initial={{ x: 260, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 260, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0 sm:left-auto sm:right-0 sm:top-0 flex h-full w-full sm:w-[260px] flex-col border-l border-primary/20 bg-card/95 backdrop-blur-xl"
                style={{ boxShadow: "-10px 0 40px -10px rgba(var(--primary), 0.15)" }}
              >
                {/* Sidebar header */}
                <motion.div
                  className="flex items-center gap-2 border-b border-border/50 px-3 py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                      <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <motion.div
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-card bg-chart-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{t("dashboard.aiAssistant")}</div>
                    <div className="text-[9px] text-muted-foreground">{t("dashboard.readyToHelp")}</div>
                  </div>
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </motion.div>

                {/* Chat area */}
                <div className="flex-1 overflow-hidden p-2">
                  <div className="space-y-2">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-end"
                    >
                      <div className="rounded-xl rounded-tr-sm bg-primary px-2.5 py-1.5 text-[10px] text-primary-foreground">
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
                          <div className="rounded-xl rounded-tl-sm bg-secondary/80 px-2.5 py-1.5">
                            <div className="flex gap-0.5">
                              {[0, 0.1, 0.2].map((d, i) => (
                                <motion.div
                                  key={i}
                                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                                  animate={{ y: [0, -2, 0] }}
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
                          className="space-y-2"
                        >
                          {/* Response card */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="overflow-hidden rounded-xl border border-border/50 bg-secondary/50"
                          >
                            {/* Client header */}
                            <div className="border-b border-border/50 bg-secondary/80 px-2 py-1.5">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-chart-1 to-chart-2 text-[8px] font-semibold text-primary-foreground">
                                  MF
                                </div>
                                <div>
                                  <div className="text-[10px] font-medium">Matt Fakri</div>
                                  <div className="text-[8px] text-muted-foreground">#5360220352</div>
                                </div>
                                <span className="ml-auto rounded-full bg-chart-5/10 px-1.5 py-0.5 text-[7px] text-chart-5">
                                  {t("dashboard.pending")}
                                </span>
                              </div>
                            </div>

                            <div className="p-2 text-[9px] leading-relaxed text-foreground/80">
                              {t("dashboard.requestBelongsTo")} <span className="font-medium">Matt Fakri</span>, {t("dashboard.markedAs")} <span className="text-chart-5 font-medium">{t("dashboard.pendingUnitInquiry")}</span>.
                            </div>

                            {/* Recommendation */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mx-2 mb-2 rounded-lg border border-primary/20 bg-primary/5 p-1.5"
                            >
                              <div className="mb-1 flex items-center gap-1">
                                <Sparkles className="h-2.5 w-2.5 text-primary" />
                                <span className="text-[8px] font-medium text-primary">{t("dashboard.recommended")}</span>
                              </div>
                              <p className="text-[8px] leading-relaxed text-foreground/70">
                                {t("dashboard.assignTo")} - {t("dashboard.assignToAliReason")}.
                              </p>
                            </motion.div>
                          </motion.div>

                          {/* Action buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-1"
                          >
                            {[t("dashboard.assignTo"), t("dashboard.sendFollowUp"), t("dashboard.viewSummary")].map((action, i) => (
                              <motion.button
                                key={action}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-1 rounded-lg border border-border/50 bg-secondary/50 px-2 py-1 text-[8px] font-medium transition-colors hover:bg-secondary hover:border-primary/30"
                              >
                                {action}
                                <ChevronRight className="h-2 w-2" />
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
    <div ref={ref} className="relative h-[520px] sm:h-[420px] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 h-32 w-1/2 bg-primary/5 blur-3xl" />
      </div>

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
                  <div className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-card/95 px-2 py-1 shadow-lg backdrop-blur-sm">
                    <Building2 className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-semibold text-foreground">{t("tower.floor")} {currentFloorData.number}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Base label */}
            {/* <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="text-[10px] font-medium text-muted-foreground tracking-wider">SKYLINE TOWER</div>
              <div className="text-[9px] text-muted-foreground/60">42 Floors • 280 Units</div>
            </motion.div> */}
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
              className="absolute left-3 right-3 bottom-0 sm:left-auto sm:right-0 sm:top-4 sm:bottom-4 flex h-[260px] sm:h-[330px] w-auto sm:w-[290px] flex-col rounded-t-xl sm:rounded-xl border border-border/30 bg-card/95 sm:bg-card/90 backdrop-blur-xl overflow-hidden"
              style={{ boxShadow: "0 -10px 50px -10px rgba(0,0,0,0.2)" }}
            >
              {/* Panel header */}
              <motion.div
                className="flex items-center gap-2 border-b border-border/50 px-2 sm:px-3 py-1.5 sm:py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] sm:text-xs font-semibold">{t("tower.floor")} {currentFloorData.number}</div>
                  <div className="text-[8px] sm:text-[9px] text-muted-foreground">{currentFloorData.units} {t("tower.units")} {t("tower.available")}</div>
                </div>
              </motion.div>

              {/* Floor plan image */}
              <div className="relative flex-1 p-2 sm:p-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative h-full w-full overflow-hidden rounded-lg border border-border/50 bg-secondary/30"
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
                        transform: "skewX(-50deg) skewY(22deg)", // ایزومتریک
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
                      <div className="h-full w-full  border-2 border-primary/70 bg-primary/20" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Unit list */}
              <motion.div
                className="border-t border-border/50 p-1.5 sm:p-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-1">
                  {["A1", "A2",].map((unit, i) => (
                    <motion.div
                      key={unit}
                      className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 text-[8px] sm:text-[9px] transition-colors ${highlightedUnit > i
                        ? "border border-primary/30 bg-primary/10"
                        : "border border-border/50 bg-secondary/30"
                        }`}
                      animate={highlightedUnit > i ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${highlightedUnit > i ? "bg-primary" : "bg-muted-foreground/50"
                        }`} />
                      <span className="font-medium">{t("tower.unit")} {unit}</span>
                      <span className="ml-auto text-muted-foreground hidden sm:inline">
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
        <div className="mt-12 sm:mt-24 space-y-16 sm:space-y-32">
          {solutionKeys.map((key, index) => (
            <SolutionCard key={key} solutionKey={key} gradient={solutionGradients[index]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  solutionKey,
  gradient,
  index,
}: {
  solutionKey: typeof solutionKeys[number];
  gradient: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const t = useTranslations("solutions");

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isEven = index % 2 === 0;

  const tag = t(`items.${solutionKey}.tag`);
  const title = t(`items.${solutionKey}.title`);
  const description = t(`items.${solutionKey}.description`);

  const features =
    solutionKey === "sales"
      ? [
          t("items.sales.features.floorNav"),
          t("items.sales.features.virtualTours"),
          t("items.sales.features.reservation"),
          t("items.sales.features.payments"),
          t("items.sales.features.multiPlatform"),
        ]
      : solutionKey === "ai"
        ? [
            t("items.ai.features.askAndDone"),
            t("items.ai.features.autoReports"),
            t("items.ai.features.multilingual"),
            t("items.ai.features.smartComms"),
            t("items.ai.features.noHunting"),
          ]
        : solutionKey === "visit"
          ? [
              t("items.visit.features.pickSlot"),
              t("items.visit.features.instantNotify"),
              t("items.visit.features.noManual"),
              t("items.visit.features.proExperience"),
            ]
          : [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center gap-8 md:gap-12 lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"
        }`}
    >
      {/* Content */}
      <div className="flex-1 lg:max-w-lg">
        <span
          className={`inline-block rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 text-sm font-medium text-primary-foreground`}
        >
          {tag}
        </span>
        <h3 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl">{title}</h3>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">{description}</p>
        {features.length > 0 && (
          <ul className="mt-8 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Visual */}
      <motion.div className="flex-1" style={{ y }}>
        <div className="relative">
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-20 blur-3xl`}
          />
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-1 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl bg-secondary/50 p-6">
              {/* Mockup UI */}
              {solutionKey === "sales" ? (
                <TowerVisual t={t} />
              ) : solutionKey === "ai" ? (
                <AIHandleVisual t={t} />
              ) : solutionKey === "visit" ? (
                <>
                  {/* Month navigation header */}
                  <div className="mb-4 flex items-center justify-center gap-4">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-base font-semibold text-foreground">May 2026</span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Week strip with day cards */}
                  <div className="mb-6 flex items-center gap-2">
                    <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex flex-1 justify-center gap-1">
                      {[
                        { dayKey: "sun", date: 10, selected: false },
                        { dayKey: "mon", date: 11, selected: false },
                        { dayKey: "tue", date: 12, selected: true },
                        { dayKey: "wed", date: 13, selected: false },
                        { dayKey: "thu", date: 14, selected: false },
                        { dayKey: "fri", date: 15, selected: false },
                        { dayKey: "sat", date: 16, selected: false },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`flex w-9 sm:w-12 flex-col items-center rounded-xl py-1.5 sm:py-2 transition-colors ${item.selected
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-background/50 text-foreground hover:bg-muted"
                            }`}
                        >
                          <span className={`text-xs ${item.selected ? "text-primary-foreground" : "text-muted-foreground"}`}>{t(`calendar.${item.dayKey}`)}</span>
                          <span className="text-sm font-semibold">{item.date}</span>
                        </div>
                      ))}
                    </div>
                    <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Time slot section heading */}
                  <div className="mb-3 text-center text-sm font-medium text-foreground">
                    {t("calendar.selectHoursFor")} {t("calendar.tue")}, May 12
                  </div>

                  {/* Time slot grid - 4 columns */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
                    {[
                      "09:00", "09:30", "10:00", "10:30",
                      "11:00", "11:30", "12:00", "12:30",
                      "13:00", "13:30", "14:00", "14:30",
                      "15:00", "15:30", "16:00", "16:30",
                    ].map((time, i) => {
                      const isSelected = time === "09:30";
                      return (
                        <button
                          key={i}
                          className={`rounded-xl py-2 text-sm font-medium transition-colors ${isSelected
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-background/50 text-foreground hover:bg-muted"
                            }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selection summary */}
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    {t("calendar.selectedTimeFrom")} <span className="font-semibold text-foreground">09:30</span> {t("calendar.to")} <span className="font-semibold text-foreground">10:00</span>
                  </div>
                </>
              ) : solutionKey === "buyers" ? (
                <>
                  {/* Hold a Unit - Header with unit name and countdown */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      <span className="text-xs font-bold text-primary">A12</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">{t("tower.unit")} A-1204</div>
                      <div className="text-xs text-muted-foreground">Tower A, {t("tower.floor")} 12</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 px-3 py-1">
                      <span className="text-xs font-mono font-semibold text-primary">23:45:12</span>
                    </div>
                  </div>
                  {/* Buyer queue list */}
                  <div className="space-y-3">
                    {[
                      { initials: "JD", name: "John Davidson", timeKey: "2", timeUnit: "minAgo", active: true },
                      { initials: "SM", name: "Sarah Miller", timeKey: "15", timeUnit: "minAgo", active: false },
                      { initials: "AK", name: "Ahmed Khan", timeKey: "1", timeUnit: "hourAgo", active: false },
                      { initials: "LC", name: "Lisa Chen", timeKey: "3", timeUnit: "hoursAgo", active: false },
                    ].map((buyer, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-background/50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <span className="text-sm font-semibold text-primary">{buyer.initials}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{buyer.name}</div>
                          <div className="text-xs text-muted-foreground">{buyer.timeKey} {t(`queue.${buyer.timeUnit}`)}</div>
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs font-medium ${buyer.active ? "bg-green-500/20 text-green-600" : "bg-muted text-muted-foreground"}`}>
                          {buyer.active ? t("queue.activeHold") : t("queue.inQueue")}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Stats cards */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <div className="text-2xl font-bold text-primary">4</div>
                      <div className="mt-1 text-xs text-muted-foreground">{t("queue.inQueue")}</div>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="mt-1 text-xs text-muted-foreground">{t("queue.holdsToday")}</div>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 text-center">
                      <div className="text-2xl font-bold text-primary">83%</div>
                      <div className="mt-1 text-xs text-muted-foreground">{t("queue.signed")}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Default skeleton mockup for other solutions */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/20" />
                    <div className="flex-1">
                      <div className="h-3 w-24 rounded bg-muted" />
                      <div className="mt-1 h-2 w-16 rounded bg-muted/60" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-background/50 p-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10" />
                        <div className="flex-1">
                          <div className="h-3 w-full max-w-32 rounded bg-muted" />
                          <div className="mt-1 h-2 w-20 rounded bg-muted/60" />
                        </div>
                        <div className="h-6 w-16 rounded-full bg-primary/20" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="rounded-lg bg-background/50 p-3">
                        <div className="h-16 rounded bg-primary/10" />
                        <div className="mt-2 h-2 w-full rounded bg-muted" />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
