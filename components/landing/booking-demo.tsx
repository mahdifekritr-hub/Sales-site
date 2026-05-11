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

const animationSequence = [
  { dayIndex: 2, times: ["09:30", "10:00"], dayName: "Tuesday" },
  { dayIndex: 3, times: ["11:00", "11:30"], dayName: "Wednesday" },
  { dayIndex: 4, times: ["14:00", "14:30"], dayName: "Thursday" },
];

export function BookingDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2);
  const [selectedTime, setSelectedTime] = useState("09:30");
  const [endTime, setEndTime] = useState("10:00");
  const [showGrid, setShowGrid] = useState(true);
  const [gridKey, setGridKey] = useState(0);
  const [pulsingTime, setPulsingTime] = useState<string | null>(null);

  useEffect(() => {
    const sequence = animationSequence[currentStep % animationSequence.length];
    
    // Initial state
    setSelectedDayIndex(sequence.dayIndex);
    setSelectedTime(sequence.times[0]);
    setEndTime(sequence.times[1]);
    setShowGrid(true);
    setPulsingTime(null);

    const timeouts: NodeJS.Timeout[] = [];

    // After 1.5s - pulse the end time
    timeouts.push(setTimeout(() => {
      setPulsingTime(sequence.times[1]);
    }, 1500));

    // After 2s - stop pulse
    timeouts.push(setTimeout(() => {
      setPulsingTime(null);
    }, 2300));

    // After 3.5s - fade out grid, change day
    timeouts.push(setTimeout(() => {
      setShowGrid(false);
    }, 3500));

    // After 4s - update to next day, fade grid back in
    timeouts.push(setTimeout(() => {
      const nextStep = (currentStep + 1) % animationSequence.length;
      const nextSequence = animationSequence[nextStep];
      setSelectedDayIndex(nextSequence.dayIndex);
      setSelectedTime(nextSequence.times[0]);
      setEndTime(nextSequence.times[1]);
      setGridKey(prev => prev + 1);
      setShowGrid(true);
    }, 4200));

    // After 5.5s - pulse the first time slot
    timeouts.push(setTimeout(() => {
      const nextStep = (currentStep + 1) % animationSequence.length;
      const nextSequence = animationSequence[nextStep];
      setPulsingTime(nextSequence.times[0]);
    }, 5200));

    // After 5.8s - stop pulse
    timeouts.push(setTimeout(() => {
      setPulsingTime(null);
    }, 5800));

    // After 7s - move to next step
    timeouts.push(setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 7000));

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [currentStep]);

  const currentDayName = days[selectedDayIndex].day === "Tue" ? "Tuesday" 
    : days[selectedDayIndex].day === "Wed" ? "Wednesday"
    : days[selectedDayIndex].day === "Thu" ? "Thursday"
    : days[selectedDayIndex].day;

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
            const isSelected = i === selectedDayIndex;
            return (
              <motion.div
                key={i}
                animate={isSelected ? {
                  scale: [0.85, 1.05, 1],
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                } : { scale: 1 }}
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
          key={currentDayName}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-3 text-center text-sm font-medium text-foreground"
        >
          Select Hours for {currentDayName}, May {days[selectedDayIndex].date}
        </motion.div>
      </AnimatePresence>

      {/* Time slot grid - 4 columns */}
      <AnimatePresence mode="wait">
        {showGrid && (
          <motion.div
            key={gridKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-4 gap-2"
          >
            {timeSlots.map((time, i) => {
              const isSelected = time === selectedTime;
              const isPulsing = time === pulsingTime;
              return (
                <motion.button
                  key={`${gridKey}-${time}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: isPulsing ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ 
                    delay: i * 0.04,
                    duration: 0.3,
                    scale: { duration: 0.3 }
                  }}
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
        )}
      </AnimatePresence>

      {/* Selection summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedTime}-${endTime}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          You selected time from <span className="font-semibold text-foreground">{selectedTime}</span> to <span className="font-semibold text-foreground">{endTime}</span>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
