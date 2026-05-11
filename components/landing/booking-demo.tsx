"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const daysData = [
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

// Cycle config: day index -> selected times (both slots highlighted)
const cycleConfig = [
  { dayIndex: 2, selectedSlots: ["09:30", "10:00"], startTime: "09:30", endTime: "10:00" }, // Tue
  { dayIndex: 3, selectedSlots: ["11:00", "11:30"], startTime: "11:00", endTime: "11:30" }, // Wed
  { dayIndex: 4, selectedSlots: ["14:00", "14:30"], startTime: "14:00", endTime: "14:30" }, // Thu
];

export function BookingDemo() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [gridKey, setGridKey] = useState(0);

  const currentConfig = cycleConfig[cycleIndex];
  const selectedDayIndex = currentConfig.dayIndex;
  const selectedSlots = currentConfig.selectedSlots;
  const selectedDay = daysData[selectedDayIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleConfig.length);
      setGridKey((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
          {daysData.map((item, i) => {
            const isSelected = i === selectedDayIndex;
            return (
              <motion.div
                key={i}
                animate={isSelected ? { scale: [0.9, 1.05, 1] } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`flex w-12 flex-col items-center rounded-xl py-2 transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background/50 text-foreground hover:bg-muted"
                }`}
              >
                <span className={`text-xs ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}>{item.day}</span>
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
          key={`heading-${selectedDayIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-3 text-center text-sm font-medium text-foreground"
        >
          Select Hours for {selectedDay.day === "Tue" ? "Tuesday" : selectedDay.day === "Wed" ? "Wednesday" : "Thursday"}, May {selectedDay.date}
        </motion.div>
      </AnimatePresence>

      {/* Time slot grid - 4 columns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gridKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-4 gap-2"
        >
          {timeSlots.map((time, i) => {
            const isSelected = selectedSlots.includes(time);
            return (
              <motion.button
                key={i}
                animate={isSelected ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background/50 text-foreground hover:bg-muted"
                }`}
              >
                {time}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Selection summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`summary-${cycleIndex}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          You selected time from <span className="font-semibold text-foreground">{currentConfig.startTime}</span> to <span className="font-semibold text-foreground">{currentConfig.endTime}</span>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
