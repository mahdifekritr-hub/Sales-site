"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, X, Check, Package, Users, Shield, Zap } from "lucide-react";

export function AssetsCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsSubmitted(false);
    }, 2000);
  };

  const benefits = [
    { icon: Zap, text: "AI-powered automation" },
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Users, text: "Dedicated support team" },
    { icon: Package, text: "Complete asset suite" },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-12" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm sm:p-12 lg:p-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mb-4 sm:mb-6 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent"
          >
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
          </motion.div>

          <h2 className="text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
            Ready to transform your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              asset management
            </span>
            ?
          </h2>

          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-muted-foreground px-2 sm:px-0">
            Say goodbye to spreadsheets and lost equipment. Take control with AI-powered tools that track assets, manage inventory, and optimize your equipment lifecycle.
          </p>

          <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-4 sm:px-0">
            <div className="relative w-full sm:w-auto">
              <AnimatePresence>
                {!isExpanded && (
                  <motion.div layoutId="trial-modal" className="relative">
                    <Button
                      size="lg"
                      onClick={() => setIsExpanded(true)}
                      className="group gap-2 bg-primary px-6 sm:px-8 text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                    >
                      Start Free Trial
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-transparent text-foreground hover:bg-secondary w-full sm:w-auto"
              asChild
            >
              <a href="https://fire.chilipiper.com/me/property-careapp/meeting-with-propertycare">
                Schedule a Demo
              </a>
            </Button>
          </div>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
            No credit card required - 14-day free trial - Cancel anytime
          </p>
        </motion.div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
              onClick={() => setIsExpanded(false)}
            />

            {/* Modal */}
            <motion.div
              layoutId="trial-modal"
              className="fixed inset-4 z-50 m-auto flex max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl sm:inset-8 lg:inset-12"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={() => setIsExpanded(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/80 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </motion.button>

              <div className="flex w-full flex-col overflow-y-auto lg:flex-row">
                {/* Left Side - Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.15 }}
                  className="relative flex flex-col justify-center bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-6 sm:p-8 lg:w-2/5 lg:p-10"
                >
                  <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-[80px]" />
                  <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/20 blur-[80px]" />

                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent sm:mb-6 sm:h-14 sm:w-14"
                    >
                      <Sparkles className="h-6 w-6 text-primary-foreground sm:h-7 sm:w-7" />
                    </motion.div>

                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                      Start your{" "}
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        free trial
                      </span>
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
                      Join thousands of property managers who have transformed their asset management with our platform.
                    </p>

                    <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit.text}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <benefit.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm text-foreground sm:text-base">{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm sm:mt-8">
                      <p className="text-sm italic text-muted-foreground">
                        &ldquo;This platform transformed how we track our 500+ assets. QR scanning alone has saved us hours every week.&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                        <div>
                          <p className="text-xs font-medium text-foreground sm:text-sm">Robert Martinez</p>
                          <p className="text-xs text-muted-foreground">Asset Manager, Gateway Properties</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10"
                >
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent"
                      >
                        <Check className="h-8 w-8 text-primary-foreground" />
                      </motion.div>
                      <h4 className="text-xl font-bold sm:text-2xl">Thank you!</h4>
                      <p className="mt-2 text-muted-foreground">We&apos;ll be in touch within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <>
                      <h4 className="text-lg font-semibold sm:text-xl">Complete your registration</h4>
                      <p className="mt-1 text-sm text-muted-foreground">Fill out the form below to get started.</p>

                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">User Name</label>
                            <Input
                              placeholder="johndoe123"
                              required
                              className="h-11 rounded-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Password</label>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              required
                              className="h-11 rounded-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Name</label>
                            <Input
                              placeholder="John Doe"
                              required
                              className="h-11 rounded-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Company</label>
                            <Input
                              placeholder="Acme Inc."
                              required
                              className="h-11 rounded-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Mobile Number</label>
                            <Input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              required
                              className="h-11 rounded-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <Input
                              type="email"
                              placeholder="john@company.com"
                              required
                              className="h-11 rounded-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                              />
                              Processing...
                            </>
                          ) : (
                            <>
                              Start Free Trial
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>

                        <p className="text-center text-xs text-muted-foreground">
                          By signing up, you agree to our{" "}
                          <a href="https://propertycareapp.com/terms-conditions-propertycareapp/" className="underline hover:text-foreground">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="https://propertycareapp.com/privacy-policy/" className="underline hover:text-foreground">
                            Privacy Policy
                          </a>
                        </p>
                      </form>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
