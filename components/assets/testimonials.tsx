"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonialData = [
  {
    author: "Robert Martinez",
    company: "Gateway Properties",
    role: "Asset Manager",
    quote: "The asset tracking module has revolutionized how we manage our equipment. QR code scanning gives us instant access to maintenance history and warranty info - it's saved us thousands in replacement costs.",
    rating: 5,
    image: "/testimonials/robert-martinez.jpg",
  },
  {
    author: "Jennifer Lee",
    company: "Urban Living Management",
    role: "Inventory Controller",
    quote: "The parts inventory system is brilliant. Automatic low-stock alerts and purchase order integration have eliminated our emergency ordering costs and stockout situations.",
    rating: 5,
    image: "/testimonials/jennifer-lee.jpg",
  },
  {
    author: "Michael Thompson",
    company: "Premier Property Group",
    role: "Operations Director",
    quote: "We manage over 500 assets across 12 properties. This platform gives us complete visibility into every piece of equipment, its value, and its lifecycle. Essential for our operations.",
    rating: 5,
    image: "/testimonials/michael-thompson.jpg",
  },
];

export function AssetsTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#FAFAFB] py-16 sm:py-24 lg:py-10" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              asset managers
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            See what property managers and inventory professionals say about PropertyCare.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
            >
              <Quote className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-primary/30" />
              <div className="mb-6 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
                ))}
              </div>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-muted-foreground">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg font-semibold text-primary">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
