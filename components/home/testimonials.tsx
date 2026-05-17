"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Building2, Sparkles } from "lucide-react";

const testimonials = [
  {
    key: "testimonial1",
    author: "Michael Johnson",
    role: "Property Manager",
    company: "Emaar Properties",
    rating: 5,
    gradient: "from-primary to-[oklch(0.45_0.18_340)]",
  },
  {
    key: "testimonial2",
    author: "James Carter",
    role: "Tower Administrator",
    company: "Damac Towers",
    rating: 5,
    gradient: "from-[oklch(0.55_0.18_200)] to-[oklch(0.45_0.15_220)]",
  },
  {
    key: "testimonial3",
    author: "Sarah Ahmed",
    role: "Operations Director",
    company: "Nakheel",
    rating: 5,
    gradient: "from-chart-4 to-[oklch(0.5_0.14_140)]",
  },
  {
    key: "testimonial4",
    author: "David Chen",
    role: "Facilities Manager",
    company: "Meraas",
    rating: 5,
    gradient: "from-chart-5 to-[oklch(0.55_0.16_40)]",
  },
];

export function HomeTestimonials() {
  const t = useTranslations("homeTestimonials");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden bg-white">
      {/* Multi-layered background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        
        {/* Animated accent orbs */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.16 330 / 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.15 200 / 0.1) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.15, 1], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.18 40 / 0.05) 0%, transparent 50%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <Sparkles className="h-4 w-4" />
            {t("badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Featured testimonial with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl border border-border/40 bg-card/50 backdrop-blur-xl overflow-hidden">
            {/* Top gradient accent bar */}
            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${testimonials[activeIndex].gradient}`} />
            
            {/* Background glow */}
            <div className={`absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br ${testimonials[activeIndex].gradient} opacity-[0.05] blur-[80px] transition-all duration-500`} />
            <div className={`absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br ${testimonials[activeIndex].gradient} opacity-[0.03] blur-[80px] transition-all duration-500`} />
            
            <div className="relative p-8 sm:p-12">
              {/* Quote icon with gradient */}
              <div className="absolute -top-6 left-8 sm:left-12">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeIndex].gradient} blur-lg opacity-50`} />
                  <div className={`relative h-12 w-12 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].gradient} flex items-center justify-center shadow-lg`}>
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-4">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          i < testimonials[activeIndex].rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.blockquote
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed mb-8 text-foreground"
                >
                  &ldquo;{t(`items.${testimonials[activeIndex].key}.quote`)}&rdquo;
                </motion.blockquote>

                {/* Author with gradient avatar */}
                <motion.div
                  key={`author-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${testimonials[activeIndex].gradient} p-[2px] shadow-lg`}>
                    <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                      <span className="text-lg font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {testimonials[activeIndex].author.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-foreground">{testimonials[activeIndex].author}</div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <span>{testimonials[activeIndex].role}</span>
                      <span className="text-border">|</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {testimonials[activeIndex].company}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="h-11 w-11 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-card hover:border-primary/30 hover:scale-105 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots with gradient active state */}
            <div className="flex gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? `w-10 bg-gradient-to-r ${testimonial.gradient}` 
                      : "w-2.5 bg-border/50 hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="h-11 w-11 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-card hover:border-primary/30 hover:scale-105 shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Testimonial cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              className={`relative text-left p-5 rounded-2xl border transition-all duration-300 overflow-hidden ${
                index === activeIndex
                  ? "border-primary/50 bg-card shadow-lg shadow-primary/10"
                  : "border-border/40 bg-card/50 hover:border-border hover:bg-card"
              }`}
            >
              {/* Active gradient accent */}
              {index === activeIndex && (
                <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${testimonial.gradient}`} />
              )}
              
              <div className="relative">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <div className="font-semibold mb-1 text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.company}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
