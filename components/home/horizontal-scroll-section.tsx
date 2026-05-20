"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Building2, MapPin } from "lucide-react";

const CARDS = [
  {
    num: "01",
    title: "Seamless Selling Experience",
    desc: "Convert leads faster with a guided listing and inquiry flow built for modern renters and buyers.",
    pills: ["Lead capture", "Auto follow-up", "Pipeline view", "One-click proposals"],
    cta: "Explore Selling",
    mockup: <SellingMockup />,
  },
  {
    num: "02",
    title: "Work Orders",
    desc: "Track, assign, and resolve maintenance requests in one place. Never lose a task again.",
    pills: ["Quick assignment", "Status tracking", "Photo uploads", "Vendor management"],
    cta: "Explore Work Orders",
    mockup: <WorkOrderMockup />,
  },
  {
    num: "03",
    title: "AI Chat",
    desc: "Answer tenant and buyer questions instantly — 24/7 — with an AI assistant trained on your properties.",
    pills: ["Instant responses", "Lead qualification", "Handoff to agent", "Multi-language"],
    cta: "Explore AI Chat",
    mockup: <AIChatMockup />,
  },
  {
    num: "04",
    title: "Reservations",
    desc: "Let prospects book property tours directly from your listing — no back-and-forth required.",
    pills: ["Online booking", "Calendar sync", "Auto reminders", "Confirmation flow"],
    cta: "Explore Reservations",
    mockup: <ReservationMockup />,
  },
];

// Card width in pixels (will be calculated based on viewport)
const CARD_WIDTH_VW = 70;
const CARD_GAP_PX = 16;
const INITIAL_PADDING_VW = 30;

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track lock state with refs to avoid stale closures
  const isLockedRef = useRef(false);
  const scrollPositionRef = useRef(0);
  const horizontalProgressRef = useRef(0); // 0 = start, 1 = end
  const directionRef = useRef<"forward" | "backward" | null>(null);

  // Motion value for horizontal translation
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 40 });

  // Track scroll progress for dots (0-1)
  const progress = useMotionValue(0);

  // Calculate max scroll distance
  const getMaxScroll = useCallback(() => {
    if (typeof window === "undefined") return 0;
    const vw = window.innerWidth / 100;
    const cardWidth = CARD_WIDTH_VW * vw;
    const totalCardsWidth = CARDS.length * cardWidth + (CARDS.length - 1) * CARD_GAP_PX;
    const initialPadding = INITIAL_PADDING_VW * vw;
    return totalCardsWidth - window.innerWidth + initialPadding + 32;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let maxScroll = getMaxScroll();

    const lockBodyScroll = (scrollY: number) => {
      if (!isLockedRef.current) {
        scrollPositionRef.current = scrollY;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.touchAction = "none";
        isLockedRef.current = true;
      }
    };

    const unlockBodyScroll = () => {
      if (isLockedRef.current) {
        const scrollY = scrollPositionRef.current;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.touchAction = "";
        window.scrollTo(0, scrollY);
        isLockedRef.current = false;
      }
    };

    const handleResize = () => {
      maxScroll = getMaxScroll();
    };

    // Global wheel handler
    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;
      
      // Check if section is in viewport (allowing some tolerance)
      const sectionInView = sectionTop < viewportHeight - 50 && sectionBottom > 50;
      // Check if section top is near viewport top (entering/in the section)
      const sectionAtTop = sectionTop <= 100 && sectionTop >= -100;
      // Check if section bottom is near viewport bottom (re-entering from below)
      const sectionAtBottom = sectionBottom >= viewportHeight - 100 && sectionBottom <= viewportHeight + 100;
      
      const currentX = x.get();
      const atStart = currentX >= -5;
      const atEnd = currentX <= -maxScroll + 5;
      
      // Calculate current horizontal progress
      horizontalProgressRef.current = Math.abs(currentX) / maxScroll;

      // Scrolling DOWN (positive deltaY)
      if (e.deltaY > 0) {
        // If locked, handle horizontal scroll
        if (isLockedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          
          if (!atEnd) {
            const delta = Math.min(Math.abs(e.deltaY) * 1.2, 150);
            const newX = Math.max(currentX - delta, -maxScroll);
            x.set(newX);
            progress.set(Math.abs(newX) / maxScroll);
          } else {
            // Reached end, unlock and continue scrolling down
            directionRef.current = "forward";
            unlockBodyScroll();
          }
          return;
        }
        
        // Not locked - check if we should lock
        // Lock when section top reaches viewport top and we haven't scrolled through yet
        if (sectionAtTop && !atEnd) {
          e.preventDefault();
          e.stopPropagation();
          lockBodyScroll(window.scrollY);
          directionRef.current = "forward";
          return;
        }
      }
      
      // Scrolling UP (negative deltaY)
      else if (e.deltaY < 0) {
        // If locked, handle horizontal scroll
        if (isLockedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          
          if (!atStart) {
            const delta = Math.min(Math.abs(e.deltaY) * 1.2, 150);
            const newX = Math.min(currentX + delta, 0);
            x.set(newX);
            progress.set(Math.abs(newX) / maxScroll);
          } else {
            // Reached start, unlock and continue scrolling up
            directionRef.current = "backward";
            unlockBodyScroll();
          }
          return;
        }
        
        // Not locked - check if we should lock when scrolling back up
        // Lock when section bottom reaches viewport bottom and we're at the end
        if (sectionAtBottom && atEnd) {
          e.preventDefault();
          e.stopPropagation();
          lockBodyScroll(window.scrollY);
          directionRef.current = "backward";
          return;
        }
        
        // Also lock if section is in view and we're partially scrolled
        if (sectionInView && sectionTop <= 0 && !atStart && horizontalProgressRef.current > 0.05) {
          e.preventDefault();
          e.stopPropagation();
          lockBodyScroll(window.scrollY);
          directionRef.current = "backward";
          return;
        }
      }
    };

    // Touch handling for mobile
    let lastTouchY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;
      
      const sectionInView = sectionTop < viewportHeight - 50 && sectionBottom > 50;
      const sectionAtTop = sectionTop <= 100 && sectionTop >= -100;
      const sectionAtBottom = sectionBottom >= viewportHeight - 100 && sectionBottom <= viewportHeight + 100;

      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      lastTouchY = touchY;

      const currentX = x.get();
      const atStart = currentX >= -5;
      const atEnd = currentX <= -maxScroll + 5;

      // Scrolling down (finger moving up)
      if (deltaY > 3) {
        if (isLockedRef.current) {
          e.preventDefault();
          if (!atEnd) {
            const newX = Math.max(currentX - deltaY * 1.5, -maxScroll);
            x.set(newX);
            progress.set(Math.abs(newX) / maxScroll);
          } else {
            directionRef.current = "forward";
            unlockBodyScroll();
          }
          return;
        }
        
        if (sectionAtTop && !atEnd) {
          e.preventDefault();
          lockBodyScroll(window.scrollY);
          directionRef.current = "forward";
          return;
        }
      }
      
      // Scrolling up (finger moving down)
      else if (deltaY < -3) {
        if (isLockedRef.current) {
          e.preventDefault();
          if (!atStart) {
            const newX = Math.min(currentX + Math.abs(deltaY) * 1.5, 0);
            x.set(newX);
            progress.set(Math.abs(newX) / maxScroll);
          } else {
            directionRef.current = "backward";
            unlockBodyScroll();
          }
          return;
        }
        
        if (sectionAtBottom && atEnd) {
          e.preventDefault();
          lockBodyScroll(window.scrollY);
          directionRef.current = "backward";
          return;
        }
        
        if (sectionInView && sectionTop <= 0 && !atStart) {
          e.preventDefault();
          lockBodyScroll(window.scrollY);
          directionRef.current = "backward";
          return;
        }
      }
    };

    // Add global listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      // Ensure body scroll is restored on cleanup
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    };
  }, [x, progress, getMaxScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "100vh" }}
    >
      <div
        ref={containerRef}
        className="h-full overflow-hidden flex items-center"
      >
        {/* CARDS TRACK — translated horizontally */}
        <motion.div
          style={{ x: smoothX }}
          className="flex flex-row items-center gap-4 h-full pb-16"
          // Initial padding to start cards from ~30vw
          style={{ x: smoothX, paddingLeft: `${INITIAL_PADDING_VW}vw`, paddingRight: "2rem" }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: `${CARD_WIDTH_VW}vw`,
                height: "82vh",
                minHeight: "650px",
                maxHeight: "800px",
                backgroundColor: "#f0eef8",
              }}
            >
              <div className="flex flex-row items-stretch gap-10 h-full px-12 py-10">
                {/* LEFT: text */}
                <div className="flex-1 flex flex-col gap-4 justify-center max-w-[340px]">
                  {/* Section title - only show on first card */}
                  {i === 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium tracking-widest uppercase text-[#701951] mb-3">
                        Features
                      </p>
                      <h2 className="text-2xl font-medium text-[#3D0A2C] leading-tight">
                        A super-powered system, working together.
                      </h2>
                    </div>
                  )}
                  <span className="text-[10px] font-medium text-[#701951] bg-white/50 rounded-full px-2.5 py-1 w-fit">
                    {card.num} / 04
                  </span>
                  <h3 className="text-xl font-medium text-[#3D0A2C] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#701951] leading-relaxed">{card.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {card.pills.map((p) => (
                      <span
                        key={p}
                        className="text-[11px] text-[#701951] bg-white/60 border border-[#9E2A6E]/30 rounded-full px-3 py-1 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A6E] inline-block" />
                        {p}
                      </span>
                    ))}
                  </div>
                  <button className="mt-3 flex items-center gap-2 bg-[#701951] text-white text-sm font-medium px-5 py-2.5 rounded-full w-fit hover:bg-[#3D0A2C] transition-colors">
                    {card.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* RIGHT: mockup */}
                <div className="w-[720px] flex-shrink-0 bg-white rounded-xl p-4 overflow-hidden shadow-[0_4px_30px_rgba(112,25,81,0.08)] flex flex-col gap-2 self-center" style={{ maxHeight: "85%" }}>
                  {card.mockup}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress dots */}
        <ProgressDots progress={progress} count={4} />
      </div>
    </section>
  );
}

/* ─── Progress dots ─────────────────────────────────────── */
function ProgressDots({
  progress,
  count,
}: {
  progress: any;
  count: number;
}) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <DotItem key={i} index={i} count={count} progress={progress} />
      ))}
    </div>
  );
}

function DotItem({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: any;
}) {
  const [opacity, setOpacity] = useState(index === 0 ? 1 : 0.25);
  const [scale, setScale] = useState(index === 0 ? 1.5 : 1);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v: number) => {
      // Each dot corresponds to a card position
      const center = index / (count - 1);
      const radius = 0.5 / (count - 1);
      const distance = Math.abs(v - center);

      if (distance < radius) {
        const t = 1 - distance / radius;
        setOpacity(0.25 + 0.75 * t);
        setScale(1 + 0.5 * t);
      } else {
        setOpacity(0.25);
        setScale(1);
      }
    });

    return () => unsubscribe();
  }, [progress, index, count]);

  return (
    <motion.div
      animate={{ opacity, scale }}
      transition={{ duration: 0.2 }}
      className="w-2 h-2 rounded-full bg-[#701951]"
    />
  );
}

/* ─── Mockup components ──────────────────────────────────── */

function WorkOrderMockup() {
  const rows = [
    { unit: "Unit 4B", issue: "Leaky faucet", assignee: "John M.", due: "May 22", status: "In Progress", statusColor: "bg-amber-100 text-amber-800" },
    { unit: "Unit 2A", issue: "AC not cooling", assignee: "Sara K.", due: "May 20", status: "Completed", statusColor: "bg-green-100 text-green-800" },
    { unit: "Unit 7C", issue: "Broken lock", assignee: "—", due: "May 25", status: "Pending", statusColor: "bg-gray-100 text-gray-600" },
    { unit: "Unit 1D", issue: "Water heater", assignee: "John M.", due: "May 28", status: "Pending", statusColor: "bg-gray-100 text-gray-600" },
    { unit: "Unit 5F", issue: "Window seal", assignee: "Mike T.", due: "May 19", status: "Completed", statusColor: "bg-green-100 text-green-800" },
  ];
  return (
    <>
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-800">Work Orders</span>
        <button className="text-xs bg-[#701951] text-white rounded-full px-3 py-1">+ New Order</button>
      </div>
      <div className="grid grid-cols-5 text-xs text-gray-400 font-medium px-1">
        <span>Unit</span><span>Issue</span><span>Assigned To</span><span>Due Date</span><span>Status</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-5 text-xs text-gray-700 items-center py-2 border-b border-gray-50 px-1">
          <span className="font-medium">{r.unit}</span>
          <span>{r.issue}</span>
          <span>{r.assignee}</span>
          <span>{r.due}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${r.statusColor}`}>{r.status}</span>
        </div>
      ))}
    </>
  );
}

function SellingMockup() {
  return <TowerVisual />;
}

// Premium Tower Visual for Seamless Selling Experience
function TowerVisual() {
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

  // Calculate floor highlight position
  const getFloorPosition = (floorNum: number) => {
    const minFloor = 12;
    const maxFloor = 35;
    const normalized = (floorNum - minFloor) / (maxFloor - minFloor);
    return 78 - (normalized * 66);
  };

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      {/* Main content - side by side */}
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

              {/* Floor tooltip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFloorData.number}
                  className="absolute -right-2 flex items-center gap-1"
                  style={{ top: `${getFloorPosition(currentFloorData.number)}%`, transform: "translateY(-50%)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="h-px w-4 bg-gradient-to-r from-[#9E2A6E]/60 to-[#9E2A6E]" />
                  <div className="flex items-center gap-1 rounded-md border border-[#9E2A6E]/30 bg-white/95 px-1.5 py-0.5 shadow-sm backdrop-blur-sm">
                    <Building2 className="h-2.5 w-2.5 text-[#9E2A6E]" />
                    <span className="text-[8px] font-semibold text-[#3D0A2C]">Floor {currentFloorData.number}</span>
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
              className="absolute left-3 right-3 bottom-0 sm:left-auto sm:right-0 sm:top-4 sm:bottom-4 flex h-[260px] sm:h-[330px] w-auto sm:w-[290px] flex-col rounded-t-xl sm:rounded-xl border border-border/30 bg-card/95 sm:bg-card/90 backdrop-blur-xl overflow-hidden"
              style={{ boxShadow: "0 -10px 50px -10px rgba(0,0,0,0.2)" }}
            >
              {/* Panel header */}
              <motion.div
                className="flex items-center gap-1.5 border-b border-gray-100 px-2 py-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[#9E2A6E] to-[#701951]">
                  <MapPin className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-[9px] font-semibold text-[#3D0A2C]">Floor {currentFloorData.number}</div>
                  <div className="text-[7px] text-gray-500">{currentFloorData.units} units available</div>
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
                        transform: "skewX(-50deg) skewY(22deg)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={highlightedUnit > i ? {
                        opacity: [0, 0.8, 0.5],
                        boxShadow: [
                          "0 0 0 0 rgba(158, 42, 110, 0)",
                          "0 0 15px 3px rgba(158, 42, 110, 0.6)",
                          "0 0 10px 2px rgba(158, 42, 110, 0.4)"
                        ]
                      } : { opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="h-full w-full border-2 border-[#9E2A6E]/70 bg-[#9E2A6E]/20" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Unit list */}
              <motion.div
                className="border-t border-gray-100 p-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-1">
                  {["A1", "A2"].map((unit, i) => (
                    <motion.div
                      key={unit}
                      className={`flex items-center gap-1 rounded-md px-1.5 py-1 text-[7px] transition-colors ${highlightedUnit > i
                        ? "border border-[#9E2A6E]/30 bg-[#9E2A6E]/10"
                        : "border border-gray-100 bg-gray-50"
                        }`}
                      animate={highlightedUnit > i ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`h-1 w-1 rounded-full ${highlightedUnit > i ? "bg-[#9E2A6E]" : "bg-gray-300"}`} />
                      <span className="font-medium text-[#3D0A2C]">Unit {unit}</span>
                      <span className="ml-auto text-gray-400">
                        {highlightedUnit > i ? "Available" : "—"}
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

function AIChatMockup() {
  const messages = [
    { role: "ai", text: "Hi! I'm here to help you find your perfect home. What are you looking for?" },
    { role: "user", text: "Is Unit 3A still available?" },
    { role: "ai", text: "Yes! Unit 3A is a 2BR/1BA available June 1st at $2,400/mo. Want to schedule a viewing?" },
    { role: "user", text: "Yes please!" },
    { role: "ai", text: "Great! Connecting you with our team now. You'll get a confirmation shortly." },
  ];
  return (
    <>
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-800">AI Assistant</span>
        <span className="text-xs text-[#9E2A6E] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A6E] inline-block" /> Online
        </span>
      </div>
      <div className="flex flex-col gap-3 flex-1 overflow-hidden justify-end">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            {m.role === "ai" && (
              <div className="w-6 h-6 rounded-full bg-[#9E2A6E] flex items-center justify-center text-[9px] text-white font-semibold flex-shrink-0 mt-0.5">
                AI
              </div>
            )}
            <div
              className={`text-xs px-3 py-2 rounded-xl max-w-[75%] leading-relaxed ${m.role === "ai"
                ? "bg-gray-100 text-gray-800 rounded-tl-sm"
                : "bg-[#701951] text-white rounded-tr-sm"
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ReservationMockup() {
  const days = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
  ];
  const available = new Set([7, 9, 12, 14, 16, 20, 22]);
  const selected = 15;
  return (
    <>
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-800">Book a Tour — May 2026</span>
      </div>
      <div className="grid grid-cols-7 text-[10px] text-center text-gray-400 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
        {days.map((d, i) =>
          d === null ? (
            <span key={i} />
          ) : (
            <span
              key={i}
              className={`py-1.5 rounded-md font-medium ${d === selected
                ? "bg-[#701951] text-white"
                : available.has(d)
                  ? "bg-[#EAF3DE] text-[#701951] cursor-pointer"
                  : "text-gray-400"
                }`}
            >
              {d}
            </span>
          )
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">Available times — May 15</p>
      <div className="flex gap-2 flex-wrap">
        {["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"].map((t) => (
          <span
            key={t}
            className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer ${t === "11:30 AM"
              ? "bg-[#701951] text-white border-[#701951]"
              : "text-gray-500 border-gray-200"
              }`}
          >
            {t}
          </span>
        ))}
      </div>
      <button className="mt-auto flex items-center gap-2 bg-[#701951] text-white text-xs font-medium px-4 py-2 rounded-full w-fit">
        Confirm Booking
      </button>
    </>
  );
}
