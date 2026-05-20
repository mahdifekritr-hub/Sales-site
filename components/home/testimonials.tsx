"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    key: "testimonial1",
    quote: "A Game-Changer for Building Operations!",
    content: "This platform has completely transformed how we manage our building operations. The intuitive features and seamless communication tools have made our lives so much easier. The AI assistant is a game-changer—it's like having an expert always on call!",
    author: "Michael Johnson",
    role: "Property Manager",
    rating: 5,
  },
  {
    key: "testimonial2",
    quote: "Exceptional Design and Unmatched Support!",
    content: "From the moment we started using this app, we saw a significant improvement in how we handle property transactions and resident communications. The custom design perfectly matches our brand, and the 24/7 support is truly exceptional!",
    author: "James Carter",
    role: "Tower Administrator",
    rating: 5,
  },
];

export function HomeTestimonials() {
  const t = useTranslations("homeTestimonials");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 lg:py-32 bg-[#faf9fc] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            {t("title")}
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="w-16 h-16" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote Title */}
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {`"${testimonial.quote}"`}
              </h3>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {`"${testimonial.content}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
