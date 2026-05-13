"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Before this platform, we were managing unit reservations across spreadsheets and dealing with double-bookings almost every week. Three months in — not a single conflict. Our contract closing time has been cut in half.",
    author: "Ali Heydari",
    role: "Sales Management",
    company: "Aseman Tower",
    rating: 5,
    image: "/testimonials/ali-heydari.jpg",
  },
  {
    quote:
      "We have a 240-unit development and a sales team of eight. This software keeps everyone on the same page. The real-time dashboards have genuinely changed how I make decisions — I can see exactly where every unit stands at any moment.",
    author: "Michael Johnson",
    role: "Project Owner",
    company: "Reyes Development Group",
    rating: 5,
    image: "/testimonials/michael-johnson.jpg",
  },
  {
    quote:
      "We represent multiple developers simultaneously and needed one system that could handle all of them. The multi-project view is a lifesaver. Buyers get instant confirmation, and our agents spend less time on admin and more time closing.",
    author: "Marcus Liu",
    role: "Real Estate Agency",
    company: "Apex Towers",
    rating: 5,
    image: "/testimonials/marcus-liu.jpg",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative  bg-[#FAFAFB] py-16 sm:py-24 lg:py-10" ref={ref}>
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
          {/* <span className="inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            Testimonials
          </span> */}
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              industry leaders
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            See what property management professionals say about PropertyCare.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
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
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
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
