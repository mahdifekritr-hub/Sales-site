"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const days = [
  { day: "Sun", date: 10 },
  { day: "Mon", date: 11 },
  { day: "Tue", date: 12 },
  { day: "Wed", date: 13 },
  { day: "Thu", date: 14 },
  { day: "Fri", date: 15 },
  { day: "Sat", date: 16 },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

// Animation sequence config: day index, selected times, summary text
const sequence = [
  { dayIndex: 2, times: ["09:30"], summary: { from: "09:30", to: "10:00" } },
  { dayIndex: 2, times: ["09:30", "10:00"], summary: { from: "09:30", to: "10:00" } },
  { dayIndex: 3, times: ["11:00"], summary: { from: "11:00", to: "11:30" } },
  { dayIndex: 3, times: ["11:00", "11:30"], summary: { from: "11:00", to: "11:30" } },
  { dayIndex: 4, times: ["14:00"], summary: { from: "14:00", to: "14:30" } },
  { dayIndex: 4, times: ["14:00", "14:30"], summary: { from: "14:00", to: "14:30" } },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function BookingDemo() {
  const [step, setStep] = useState(0);
  const [gridKey, setGridKey] = useState(0);

  const currentState = sequence[step];
  const selectedDay = days[currentState.dayIndex];

  useEffect(() => {
    const timings = [1500, 2000, 1000, 2000, 1000, 2000];
    
    const timeout = setTimeout(() => {
      const nextStep = (step + 1) % sequence.length;
      
      // If day is changing, trigger grid re-render
      if (sequence[nextStep].dayIndex !== currentState.dayIndex) {
        setGridKey((k) => k + 1);
      }
      
      setStep(nextStep);
    }, timings[step]);

    return () => clearTimeout(timeout);
  }, [step, currentState.dayIndex]);

  return (
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
          {days.map((item, i) => {
            const isSelected = i === currentState.dayIndex;
            return (
              <motion.div
                key={i}
                animate={
                  isSelected
                    ? { scale: [0.85, 1.05, 1] }
                    : { scale: 1 }
                }
                transition={
                  isSelected
                    ? { type: "spring", stiffness: 400, damping: 15, duration: 0.4 }
                    : { duration: 0.2 }
                }
                className={`flex w-12 flex-col items-center rounded-xl py-2 transition-colors duration-300 ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background/50 text-foreground"
                }`}
              >
                <span className={`text-xs ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {item.day}
                </span>
                <span className="text-sm font-semibold">{item.date}</span>
              </motion.div>
            );
          })}
        </div>
        <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Time slot section heading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState.dayIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-3 text-center text-sm font-medium text-foreground"
        >
          Select Hours for {dayNames[currentState.dayIndex]}, May {selectedDay.date}
        </motion.div>
      </AnimatePresence>

      {/* Time slot grid - 4 columns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gridKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-4 gap-2"
        >
          {timeSlots.map((time, i) => {
            const isSelected = currentState.times.includes(time);
            return (
              <motion.div
                key={time}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isSelected ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  opacity: { delay: i * 0.04, duration: 0.2 },
                  y: { delay: i * 0.04, duration: 0.2 },
                  scale: { duration: 0.3 },
                }}
                className={`rounded-xl py-2 text-center text-sm font-medium transition-colors duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background/50 text-foreground"
                }`}
              >
                {time}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Selection summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentState.summary.from}-${currentState.summary.to}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          You selected time from{" "}
          <span className="font-semibold text-foreground">{currentState.summary.from}</span>{" "}
          to{" "}
          <span className="font-semibold text-foreground">{currentState.summary.to}</span>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
