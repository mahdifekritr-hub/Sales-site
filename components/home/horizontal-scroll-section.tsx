"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Building2, MapPin, ArrowRight } from "lucide-react";

const CARDS = [
  {
    num: "01",
    title: "Seamless Selling Experience",
    desc: "A CRM that manages listings, tracks inquiries, sends proposals, and hands off smoothly to other teams without third-party tools.",
    pills: ["Higher conversions", "Fewer handoffs", "Less manual work", "Native to platform"],
    cta: "Explore Selling",
    bgColor: "#e8f5e9", // Mint green
    dotColor: "#2e7d32",
    btnColor: "#1b5e20",
    mockup: "selling",
  },
  {
    num: "02",
    title: "Work Orders That Flow",
    desc: "Track, assign, and resolve maintenance requests in one place with automated workflows and real-time status updates.",
    pills: ["Quick assignment", "Status tracking", "Photo uploads", "Vendor management"],
    cta: "Explore Work Orders",
    bgColor: "#e3f2fd", // Light blue
    dotColor: "#1565c0",
    btnColor: "#0d47a1",
    mockup: "workorder",
  },
  {
    num: "03",
    title: "AI Chat That Converts",
    desc: "Answer tenant and buyer questions instantly — 24/7 — with an AI assistant trained on your properties and policies.",
    pills: ["Instant responses", "Lead qualification", "Handoff to agent", "Multi-language"],
    cta: "Explore AI Chat",
    bgColor: "#fff3e0", // Peach
    dotColor: "#e65100",
    btnColor: "#bf360c",
    mockup: "aichat",
  },
  {
    num: "04",
    title: "Reservations Made Simple",
    desc: "Let prospects book property tours directly from your listing with automatic calendar sync and confirmation flow.",
    pills: ["Online booking", "Calendar sync", "Auto reminders", "Confirmation flow"],
    cta: "Explore Reservations",
    bgColor: "#f3e5f5", // Lavender
    dotColor: "#7b1fa2",
    btnColor: "#4a148c",
    mockup: "reservation",
  },
];

// Card dimensions
const CARD_WIDTH_VW = 85;
const CARD_GAP_PX = 24;
const INITIAL_PADDING_VW = 8;

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track lock state with refs to avoid stale closures
  const isLockedRef = useRef(false);
  const scrollPositionRef = useRef(0);
  const horizontalProgressRef = useRef(0);
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
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const visibleTop = Math.max(0, sectionTop);
      const visibleBottom = Math.min(viewportHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityRatio = visibleHeight / sectionHeight;

      const sectionMajorityVisible = visibilityRatio >= 0.8;
      const sectionTopAtViewportTop = sectionTop <= 50 && sectionTop >= -50;
      const sectionFillingViewport = sectionTop <= 0 && sectionBottom >= viewportHeight * 0.8;

      const currentX = x.get();
      const atStart = currentX >= -5;
      const atEnd = currentX <= -maxScroll + 5;

      horizontalProgressRef.current = Math.abs(currentX) / maxScroll;

      // Scrolling DOWN
      if (e.deltaY > 0) {
        if (isLockedRef.current) {
          e.preventDefault();
          e.stopPropagation();

          if (!atEnd) {
            const delta = Math.min(Math.abs(e.deltaY) * 1.2, 150);
            const newX = Math.max(currentX - delta, -maxScroll);
            x.set(newX);
            progress.set(Math.abs(newX) / maxScroll);
          } else {
            directionRef.current = "forward";
            unlockBodyScroll();
          }
          return;
        }

        if (sectionTopAtViewportTop && !atEnd) {
          e.preventDefault();
          e.stopPropagation();
          lockBodyScroll(window.scrollY);
          directionRef.current = "forward";
          return;
        }
      }

      // Scrolling UP
      else if (e.deltaY < 0) {
        if (isLockedRef.current) {
          e.preventDefault();
          e.stopPropagation();

          if (!atStart) {
            const delta = Math.min(Math.abs(e.deltaY) * 1.2, 150);
            const newX = Math.min(currentX + delta, 0);
            x.set(newX);
            progress.set(Math.abs(newX) / maxScroll);
          } else {
            directionRef.current = "backward";
            unlockBodyScroll();
          }
          return;
        }

        if (sectionMajorityVisible && sectionFillingViewport && atEnd) {
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
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const visibleTop = Math.max(0, sectionTop);
      const visibleBottom = Math.min(viewportHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityRatio = visibleHeight / sectionHeight;

      const sectionMajorityVisible = visibilityRatio >= 0.8;
      const sectionTopAtViewportTop = sectionTop <= 50 && sectionTop >= -50;
      const sectionFillingViewport = sectionTop <= 0 && sectionBottom >= viewportHeight * 0.8;

      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      lastTouchY = touchY;

      const currentX = x.get();
      const atStart = currentX >= -5;
      const atEnd = currentX <= -maxScroll + 5;

      // Scrolling down
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

        if (sectionTopAtViewportTop && !atEnd) {
          e.preventDefault();
          lockBodyScroll(window.scrollY);
          directionRef.current = "forward";
          return;
        }
      }

      // Scrolling up
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

        if (sectionMajorityVisible && sectionFillingViewport && atEnd) {
          e.preventDefault();
          lockBodyScroll(window.scrollY);
          directionRef.current = "backward";
          return;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
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
        {/* Cards track */}
        <motion.div
          className="flex flex-row items-center gap-6 h-full pb-12"
          style={{ x: smoothX, paddingLeft: `${INITIAL_PADDING_VW}vw`, paddingRight: "2rem" }}
        >
          {CARDS.map((card, i) => (
            <SolutionCard key={i} card={card} index={i} />
          ))}
        </motion.div>

        {/* Progress dots */}
        <ProgressDots progress={progress} count={4} />
      </div>
    </section>
  );
}

/* ─── Solution Card ─────────────────────────────────────── */
function SolutionCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 rounded-3xl overflow-hidden"
      style={{
        width: `${CARD_WIDTH_VW}vw`,
        maxWidth: "1200px",
        height: "85vh",
        minHeight: "600px",
        maxHeight: "750px",
        backgroundColor: card.bgColor,
      }}
    >
      <div className="flex flex-col lg:flex-row h-full p-8 lg:p-12 xl:p-16 gap-8 lg:gap-12">
        {/* LEFT: Text content - 40% */}
        <div className="flex flex-col justify-between lg:w-[38%] xl:w-[35%]">
          <div className="flex flex-col gap-5">
            {/* Section header - only on first card */}
            {index === 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: card.dotColor }}>
                  Features
                </p>
                <h2 className="text-xl lg:text-2xl font-medium text-gray-900 leading-tight">
                  A super-powered system, working together.
                </h2>
              </div>
            )}

            {/* Card number */}
            <span
              className="text-[10px] font-medium rounded-full px-3 py-1 w-fit"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", color: card.dotColor }}
            >
              {card.num} / 04
            </span>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-md">
              {card.desc}
            </p>

            {/* Pills - vertically stacked */}
            <div className="flex flex-col gap-2 mt-2">
              {card.pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 text-sm text-gray-700 bg-white/80 border border-gray-200/60 rounded-full px-4 py-2 w-fit shadow-sm"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: card.dotColor }}
                  />
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button - at bottom */}
          <button
            className="mt-8 flex items-center gap-2 text-white text-sm font-medium px-6 py-3 rounded-full w-fit transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: card.btnColor }}
          >
            {card.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT: Mockup - 60% */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[650px] h-full max-h-[550px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
            <MockupContent type={card.mockup} isInView={isInView} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Progress dots ─────────────────────────────────────── */
function ProgressDots({ progress, count }: { progress: any; count: number }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <DotItem key={i} index={i} count={count} progress={progress} />
      ))}
    </div>
  );
}

function DotItem({ index, count, progress }: { index: number; count: number; progress: any }) {
  const [opacity, setOpacity] = useState(index === 0 ? 1 : 0.25);
  const [scale, setScale] = useState(index === 0 ? 1.5 : 1);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v: number) => {
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
      className="w-2 h-2 rounded-full bg-gray-800"
    />
  );
}

/* ─── Mockup Content Router ──────────────────────────────── */
function MockupContent({ type, isInView, index }: { type: string; isInView: boolean; index: number }) {
  switch (type) {
    case "selling":
      return <SellingMockup isInView={isInView} />;
    case "workorder":
      return <WorkOrderMockup isInView={isInView} />;
    case "aichat":
      return <AIChatMockup isInView={isInView} />;
    case "reservation":
      return <ReservationMockup isInView={isInView} />;
    default:
      return null;
  }
}

/* ─── Mockup 1: Selling (CRM Kanban style like reference) ─ */
function SellingMockup({ isInView }: { isInView: boolean }) {
  const inquiries = [
    { name: "Alex Moreno", avatar: "AM", status: null },
    { name: "Daniel Cruz", avatar: "DC", status: null },
  ];

  const admitted = [
    { name: "Emma Smith", avatar: "ES", status: "Form completed" },
    { name: "Olivia Bennett", avatar: "OB", status: null },
  ];

  return (
    <div className="h-full p-6 lg:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <span className="text-base font-semibold text-gray-800">Sales Pipeline</span>
        <button className="text-xs bg-green-700 text-white rounded-full px-4 py-1.5 font-medium">
          + New Lead
        </button>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 grid grid-cols-2 gap-6 pt-6">
        {/* New Inquiry column */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">New Inquiry</h4>
          <div className="space-y-3">
            {inquiries.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-semibold">
                  {person.avatar}
                </div>
                <span className="font-medium text-gray-800">{person.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Admitted column */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Admitted</h4>
          <div className="space-y-3">
            {admitted.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                className="flex flex-col gap-2 p-4 bg-green-50 rounded-xl border border-green-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                    {person.avatar}
                  </div>
                  <span className="font-medium text-gray-800">{person.name}</span>
                </div>
                {person.status && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="flex items-center gap-2 ml-13"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-green-700 font-medium">{person.status}</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup 2: Work Orders (Slide-in animation) ─────────── */
function WorkOrderMockup({ isInView }: { isInView: boolean }) {
  const rows = [
    { unit: "Unit 4B", issue: "Leaky faucet", assignee: "John M.", due: "May 22", status: "In Progress", statusColor: "bg-amber-100 text-amber-700" },
    { unit: "Unit 2A", issue: "AC not cooling", assignee: "Sara K.", due: "May 20", status: "Completed", statusColor: "bg-green-100 text-green-700" },
    { unit: "Unit 7C", issue: "Broken lock", assignee: "—", due: "May 25", status: "Pending", statusColor: "bg-gray-100 text-gray-600" },
    { unit: "Unit 1D", issue: "Water heater", assignee: "John M.", due: "May 28", status: "Pending", statusColor: "bg-gray-100 text-gray-600" },
    { unit: "Unit 5F", issue: "Window seal", assignee: "Mike T.", due: "May 19", status: "Completed", statusColor: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="h-full p-6 lg:p-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center pb-4 border-b border-gray-100"
      >
        <span className="text-base font-semibold text-gray-800">Work Orders</span>
        <button className="text-xs bg-blue-700 text-white rounded-full px-4 py-1.5 font-medium">
          + New Order
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-5 text-xs text-gray-400 font-medium py-3 border-b border-gray-50"
      >
        <span>Unit</span>
        <span>Issue</span>
        <span>Assigned To</span>
        <span>Due Date</span>
        <span>Status</span>
      </motion.div>

      <div className="flex-1 overflow-hidden">
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="grid grid-cols-5 text-sm text-gray-700 items-center py-3 border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
          >
            <span className="font-medium">{r.unit}</span>
            <span className="text-gray-600">{r.issue}</span>
            <span className="text-gray-600">{r.assignee}</span>
            <span className="text-gray-600">{r.due}</span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${r.statusColor}`}>
              {r.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup 3: AI Chat (Typing animation) ───────────────── */
function AIChatMockup({ isInView }: { isInView: boolean }) {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    { role: "ai", text: "Hi! I'm here to help you find your perfect home. What are you looking for?" },
    { role: "user", text: "Is Unit 3A still available?" },
    { role: "ai", text: "Yes! Unit 3A is a 2BR/1BA available June 1st at $2,400/mo. Want to schedule a viewing?" },
    { role: "user", text: "Yes please!" },
    { role: "ai", text: "Great! Connecting you with our team. You'll get a confirmation shortly." },
  ];

  useEffect(() => {
    if (!isInView) {
      setVisibleMessages(0);
      setIsTyping(false);
      return;
    }

    let messageIndex = 0;
    const showNextMessage = () => {
      if (messageIndex < messages.length) {
        if (messages[messageIndex].role === "ai") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages(messageIndex + 1);
            messageIndex++;
            setTimeout(showNextMessage, 800);
          }, 1200);
        } else {
          setVisibleMessages(messageIndex + 1);
          messageIndex++;
          setTimeout(showNextMessage, 600);
        }
      }
    };

    const timer = setTimeout(showNextMessage, 500);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <div className="h-full p-6 lg:p-8 flex flex-col">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <span className="text-base font-semibold text-gray-800">AI Assistant</span>
        <span className="text-xs text-orange-600 flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Online
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-3 py-4 overflow-hidden justify-end">
        <AnimatePresence>
          {messages.slice(0, visibleMessages).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {m.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                  AI
                </div>
              )}
              <div
                className={`text-sm px-4 py-2.5 rounded-2xl max-w-[75%] leading-relaxed ${
                  m.role === "ai"
                    ? "bg-gray-100 text-gray-800 rounded-tl-md"
                    : "bg-orange-600 text-white rounded-tr-md"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                AI
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3 flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Mockup 4: Reservations (Staggered reveal) ──────────── */
function ReservationMockup({ isInView }: { isInView: boolean }) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
  ];
  const available = new Set([7, 9, 12, 14, 15, 16, 20, 22]);
  const times = ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"];

  useEffect(() => {
    if (!isInView) {
      setSelectedDay(null);
      setSelectedTime(null);
      return;
    }

    const timer1 = setTimeout(() => setSelectedDay(15), 1000);
    const timer2 = setTimeout(() => setSelectedTime("11:30 AM"), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isInView]);

  return (
    <div className="h-full p-6 lg:p-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center pb-4 border-b border-gray-100"
      >
        <span className="text-base font-semibold text-gray-800">Book a Tour — May 2026</span>
      </motion.div>

      {/* Calendar header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-7 text-xs text-center text-gray-400 font-medium py-3"
      >
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </motion.div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5 text-sm text-center">
        {days.map((d, i) =>
          d === null ? (
            <span key={i} />
          ) : (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.3 + (i % 7) * 0.03 + Math.floor(i / 7) * 0.05,
                duration: 0.3,
              }}
              className={`py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 ${
                d === selectedDay
                  ? "bg-purple-700 text-white scale-110 shadow-lg"
                  : available.has(d)
                  ? "bg-purple-50 text-purple-700 hover:bg-purple-100"
                  : "text-gray-300"
              }`}
            >
              {d}
            </motion.span>
          )
        )}
      </div>

      {/* Time slots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView && selectedDay ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4"
      >
        <p className="text-xs text-gray-500 mb-2">Available times — May {selectedDay}</p>
        <div className="flex gap-2 flex-wrap">
          {times.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView && selectedDay ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
              className={`text-sm px-4 py-2 rounded-full border cursor-pointer transition-all duration-200 ${
                t === selectedTime
                  ? "bg-purple-700 text-white border-purple-700 shadow-md"
                  : "text-gray-600 border-gray-200 hover:border-purple-300"
              }`}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Confirm button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={isInView && selectedTime ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-auto flex items-center gap-2 bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-full w-fit hover:bg-purple-800 transition-colors"
      >
        Confirm Booking
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
