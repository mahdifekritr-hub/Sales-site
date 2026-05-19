"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // scrollYProgress goes 0 → 1 over the full height of the outer wrapper
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // translateX goes from 0 to -(3 * cardWidth) as user scrolls through the section
  // Each card is 70vw + 16px gap (~71vw). 3 steps × 71vw ≈ -213vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-213vw"]);

  return (
    /*
     * OUTER WRAPPER
     * Height = 100vh (the sticky window) + scroll distance needed to traverse 3 card-widths.
     * Each card is 100vw wide, we need to scroll through 3 gaps → 300vh is a good proxy
     * (you can tune this multiplier: more = slower scroll, less = faster).
     */
    <div ref={sectionRef} style={{ height: "500vh" }}>
      {/* STICKY CONTAINER — pins to the top of the viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#F9E8F2",
        }}
      >
        {/* Section heading */}
        <div className="px-16 pt-8 pb-4">
          <p className="text-xs font-medium tracking-widest uppercase text-[#701951] mb-2">
            Features
          </p>
          <h2 className="text-2xl font-medium text-[#3D0A2C]">
            A super-powered system, working together.
          </h2>
        </div>

        {/* CARDS TRACK — translated horizontally by scroll */}
        {/* px-8 on track + gap-5 between cards so first/last card peek at edges */}
        <motion.div
          style={{ x }}
          className="flex flex-row items-center gap-4 px-8"
        >
          {CARDS.map((card, i) => (
            /* Each card is a standalone rounded box — NOT full screen width.
               Width ~70vw and height ~55vh so cards are smaller like reference. */
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: "70vw",
                height: "55vh",
                minHeight: "420px",
                maxHeight: "520px",
                backgroundColor: "#EDD5E8",
              }}
            >
              <div className="flex flex-row items-center gap-8 h-full px-10 py-8">
                {/* LEFT: text */}
                <div className="flex-shrink-0 w-[280px] flex flex-col gap-3">
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
        <ProgressDots scrollYProgress={scrollYProgress} count={4} />
      </div>
    </div>
  );
}

/* ─── Progress dots ─────────────────────────────────────── */
function ProgressDots({
  scrollYProgress,
  count,
}: {
  scrollYProgress: any;
  count: number;
}) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <DotItem key={i} index={i} count={count} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

function DotItem({
  index,
  count,
  scrollYProgress,
}: {
  index: number;
  count: number;
  scrollYProgress: any;
}) {
  // Each dot is "active" when scrollYProgress is near index/(count-1)
  const center = index / (count - 1);
  const radius = 0.5 / (count - 1);
  // Clamp keyframes to [0, 1] to ensure monotonically increasing values
  const start = Math.max(0, center - radius);
  const end = Math.min(1, center + radius);
  const opacity = useTransform(
    scrollYProgress,
    [start, center, end],
    [0.25, 1, 0.25]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, center, end],
    [1, 1.5, 1]
  );
  return (
    <motion.div
      style={{ opacity, scale }}
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
                className={`bg-gray-50 rounded-xl p-3 text-xs ${
                  (c as any).active ? "border border-[#9E2A6E]" : ""
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
              className={`text-xs px-3 py-2 rounded-xl max-w-[75%] leading-relaxed ${
                m.role === "ai"
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
        {["M","T","W","T","F","S","S"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
        {days.map((d, i) =>
          d === null ? (
            <span key={i} />
          ) : (
            <span
              key={i}
              className={`py-1.5 rounded-md font-medium ${
                d === selected
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
            className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer ${
              t === "11:30 AM"
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
