"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

const CARDS = [
  {
    num: "01",
    title: "Work Orders",
    desc: "Track, assign, and resolve maintenance requests in one place. Never lose a task again.",
    pills: ["Quick assignment", "Status tracking", "Photo uploads", "Vendor management"],
    cta: "Explore Work Orders",
    mockup: <WorkOrderMockup />,
  },
  {
    num: "02",
    title: "Seamless Selling Experience",
    desc: "Convert leads faster with a guided listing and inquiry flow built for modern renters and buyers.",
    pills: ["Lead capture", "Auto follow-up", "Pipeline view", "One-click proposals"],
    cta: "Explore Selling",
    mockup: <SellingMockup />,
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
  const [isLocked, setIsLocked] = useState(false);
  const [hasCompletedForward, setHasCompletedForward] = useState(false);
  const [hasCompletedBackward, setHasCompletedBackward] = useState(true); // Start at beginning
  
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
    // Max scroll = total width - viewport + initial padding
    return totalCardsWidth - window.innerWidth + initialPadding + 32; // 32px for right padding
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let maxScroll = getMaxScroll();
    
    const handleResize = () => {
      maxScroll = getMaxScroll();
    };

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;
      
      // Check if section is in view (vertically centered or taking most of viewport)
      const isSectionInView = sectionTop <= 100 && sectionBottom >= viewportHeight - 100;
      
      // Get current x position
      const currentX = x.get();
      
      // Scrolling down (positive deltaY)
      if (e.deltaY > 0) {
        // If section is in view and we haven't scrolled all cards yet
        if (isSectionInView && currentX > -maxScroll) {
          e.preventDefault();
          setIsLocked(true);
          setHasCompletedBackward(false);
          
          // Calculate new position
          const newX = Math.max(currentX - e.deltaY * 1.5, -maxScroll);
          x.set(newX);
          progress.set(Math.abs(newX) / maxScroll);
          
          // Check if we've reached the end
          if (newX <= -maxScroll) {
            setHasCompletedForward(true);
            setIsLocked(false);
          }
        } else if (sectionTop > 100) {
          // Section hasn't been reached yet, normal scroll
          setIsLocked(false);
        } else if (currentX <= -maxScroll) {
          // Already scrolled through all cards, allow normal scroll
          setIsLocked(false);
        }
      }
      // Scrolling up (negative deltaY)
      else if (e.deltaY < 0) {
        // If section is in view and we've scrolled some cards
        if (isSectionInView && currentX < 0) {
          e.preventDefault();
          setIsLocked(true);
          setHasCompletedForward(false);
          
          // Calculate new position
          const newX = Math.min(currentX - e.deltaY * 1.5, 0);
          x.set(newX);
          progress.set(Math.abs(newX) / maxScroll);
          
          // Check if we've reached the beginning
          if (newX >= 0) {
            setHasCompletedBackward(true);
            setIsLocked(false);
          }
        } else if (sectionBottom < viewportHeight - 100) {
          // Section is above viewport, normal scroll
          setIsLocked(false);
        } else if (currentX >= 0) {
          // Already at beginning, allow normal scroll
          setIsLocked(false);
        }
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;
      
      const isSectionInView = sectionTop <= 100 && sectionBottom >= viewportHeight - 100;
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const currentX = x.get();
      
      // Scrolling down
      if (deltaY > 0 && isSectionInView && currentX > -maxScroll) {
        e.preventDefault();
        const newX = Math.max(currentX - deltaY * 2, -maxScroll);
        x.set(newX);
        progress.set(Math.abs(newX) / maxScroll);
        touchStartY = touchY;
        
        if (newX <= -maxScroll) {
          setHasCompletedForward(true);
        }
      }
      // Scrolling up
      else if (deltaY < 0 && isSectionInView && currentX < 0) {
        e.preventDefault();
        const newX = Math.min(currentX - deltaY * 2, 0);
        x.set(newX);
        progress.set(Math.abs(newX) / maxScroll);
        touchStartY = touchY;
        
        if (newX >= 0) {
          setHasCompletedBackward(true);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
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
                height: "55vh",
                minHeight: "420px",
                maxHeight: "520px",
                backgroundColor: "#EDD5E8",
              }}
            >
              <div className="flex flex-row items-center gap-8 h-full px-10 py-8">
                {/* LEFT: text */}
                <div className="flex-shrink-0 w-[280px] flex flex-col gap-3">
                  {/* Section title - only show on first card */}
                  {i === 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium tracking-widest uppercase text-[#701951] mb-2">
                        Features
                      </p>
                      <h2 className="text-2xl font-medium text-[#3D0A2C]">
                        A super-powered system, working together.
                      </h2>
                    </div>
                  )}
                  <span className="text-[10px] font-medium text-[#701951] bg-white/50 rounded-full px-2.5 py-0.5 w-fit">
                    {card.num} / 04
                  </span>
                  <h3 className="text-xl font-medium text-[#3D0A2C] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#701951] leading-relaxed">{card.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.pills.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] text-[#701951] bg-white/60 border border-[#9E2A6E]/30 rounded-full px-2.5 py-0.5 flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#9E2A6E] inline-block" />
                        {p}
                      </span>
                    ))}
                  </div>
                  <button className="mt-1 flex items-center gap-2 bg-[#701951] text-white text-xs font-medium px-4 py-2 rounded-full w-fit hover:bg-[#3D0A2C] transition-colors">
                    {card.cta}
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* RIGHT: mockup */}
                <div className="flex-1 h-full bg-white rounded-xl p-4 overflow-hidden shadow-[0_4px_30px_rgba(112,25,81,0.08)] flex flex-col gap-2">
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
  const cols = [
    {
      title: "NEW LEAD",
      cards: [
        { initials: "AM", name: "Alex Moreno", tag: "Studio · Downtown" },
        { initials: "DC", name: "Daniel Cruz", tag: "2BR · Midtown" },
      ],
    },
    {
      title: "IN CONVERSATION",
      cards: [
        { initials: "ES", name: "Emma Smith", tag: "1BR · West Side", active: true },
        { initials: "OB", name: "Olivia Bennett", tag: "3BR · Uptown" },
      ],
    },
    {
      title: "OFFER SENT",
      cards: [{ initials: "PP", name: "Priya Patel", tag: "2BR · East End" }],
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-800">Lead Pipeline</span>
        <span className="text-xs text-gray-400">6 active leads</span>
      </div>
      <div className="flex gap-3 flex-1 overflow-hidden">
        {cols.map((col) => (
          <div key={col.title} className="flex-1 flex flex-col gap-2">
            <p className="text-[10px] font-semibold text-gray-400 tracking-wider">{col.title}</p>
            {col.cards.map((c) => (
              <div
                key={c.name}
                className={`bg-gray-50 rounded-xl p-3 text-xs ${(c as any).active ? "border border-[#9E2A6E]" : ""
                  }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#F2C4DF] flex items-center justify-center text-[9px] font-semibold text-[#701951]">
                    {c.initials}
                  </div>
                  <span className="font-medium text-gray-800">{c.name}</span>
                </div>
                <p className="text-gray-400 text-[11px]">{c.tag}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
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
