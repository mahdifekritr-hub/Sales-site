"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "This platform has completely transformed our building management. Its user-friendly features and seamless communication tools have made our lives so much easier. The AI assistant is a true game-changer — it's like having an expert join our team at all times!",
    author: "Michael Johnson",
    role: "Property Manager",
    rating: 5,
  },
  {
    quote: "Since we started using this application, we've seen significant improvements in property operations and communication with residents. Our customized design perfectly matches our brand, and the 24/7 support is truly outstanding!",
    author: "James Carter",
    role: "Residence Manager",
    rating: 5,
  },
];

export function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute left-0 bottom-1/3 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Integration
          </span>
          <h2 className="mt-6 text-balance text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Integrations
            </span>
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
            >
              <Quote className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-primary/30" />
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
                ))}
              </div>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-muted-foreground">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed"
        >
          Simplify residential building management with Property Care App – a smart SaaS solution 
          designed for seamless maintenance, resident communication, and service request tracking. 
          Stay organized, enhance efficiency, and ensure hassle-free property care with our innovative platform.
        </motion.p>
      </div>
    </section>
  );
}
