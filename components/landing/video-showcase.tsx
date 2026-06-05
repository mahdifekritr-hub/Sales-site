"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function VideoShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useTranslations("videoShowcase");

  const videoId = "yA8iXWZHHOQ";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section
      id="video"
      className="relative py-16 sm:py-24 lg:py-10 overflow-hidden"
      ref={ref}
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            {t("sectionTitle")}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("sectionTitleHighlight")}
            </span>
            <br />
            {t("sectionTitleEnd")}
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Outer glow effect */}
          <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-2xl opacity-60" />

          {/* Video frame with glassmorphism border */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-border/50 bg-card/30 p-1.5 sm:p-2 backdrop-blur-sm shadow-2xl shadow-primary/10">
            {/* Inner border glow */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />

            {/* Video wrapper */}
            <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-card">
              {!isPlaying ? (
                <>
                  {/* Custom thumbnail */}
                  <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                  {/* Play button */}
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    aria-label="Play video"
                  >
                    {/* Outer ring pulse animation */}
                    <div className="absolute">
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-primary/50"
                      />
                    </div>

                    {/* Second pulse ring with delay */}
                    <div className="absolute">
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-primary/30"
                      />
                    </div>

                    {/* Play button circle */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-shadow duration-300"
                    >
                      {/* Inner glow */}
                      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary-foreground/20 to-transparent" />
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary-foreground fill-primary-foreground ml-1" />
                    </motion.div>
                  </button>

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-sm px-3 py-1.5 border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs sm:text-sm text-foreground font-medium">
                          {t("productDemo")}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        3:42
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="PropFlow Product Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
          </div>

          {/* Floating decorative elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-border/30 hidden lg:flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-10 h-10 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm border border-border/30 hidden lg:flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
