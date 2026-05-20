"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Users,
  Globe,
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

const trustIndicators = [
  {
    icon: Building2,
    stat: "500+",
    label: "Properties Managed",
  },
  {
    icon: Users,
    stat: "10,000+",
    label: "Happy Users",
  },
  {
    icon: Globe,
    stat: "25+",
    label: "Countries Served",
  },
  {
    icon: Shield,
    stat: "99.9%",
    label: "Uptime SLA",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Management",
    description: "Agents that get smarter on their own.",
  },
  {
    icon: Clock,
    title: "Live in Weeks",
    description: "Not months. Rapid deployment guaranteed.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Support for 99+ languages worldwide.",
  },
];

const certifications = [
  { name: "SOC2", label: "SOC2 Type II" },
  { name: "ISO", label: "ISO 27001" },
  { name: "GDPR", label: "GDPR Compliant" },
];

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const formRef = useRef(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Two Column Layout */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Brand Message */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Brand Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-8 lg:p-10 text-primary-foreground">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-48 w-48 translate-y-1/2 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
                </div>

                {/* Logo */}
                <div className="relative mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Headline */}
                <div className="relative">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                    Property Management
                    <br />
                    <span className="italic opacity-90">reimagined</span>
                  </h1>

                  {/* Features List */}
                  <ul className="mt-8 space-y-4">
                    {features.map((feature, index) => (
                      <motion.li
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                          <feature.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{feature.title}</span>
                          <span className="text-sm opacity-80 ml-2">— {feature.description}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative mt-10 rounded-2xl bg-white/10 backdrop-blur-sm p-6 border border-white/20"
                >
                  <p className="text-sm leading-relaxed opacity-95">
                    &quot;PropertyCare has transformed how we manage our portfolio. The AI-powered features
                    have reduced our response time by <span className="font-semibold">60%</span> and increased
                    tenant satisfaction significantly.&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm font-medium">SM</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Mitchell</p>
                      <p className="text-xs opacity-70">Property Manager, Urban Living Co.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Logos */}
                <div className="relative mt-8">
                  <p className="text-xs uppercase tracking-wider opacity-70 mb-4">
                    Trusted by world-class innovators
                  </p>
                  <div className="flex flex-wrap gap-6 items-center opacity-80">
                    <span className="text-sm font-semibold tracking-wide">REMAX</span>
                    <span className="text-sm font-semibold tracking-wide">Century21</span>
                    <span className="text-sm font-semibold tracking-wide">Coldwell</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="relative mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 opacity-80" />
                    <span className="text-xs uppercase tracking-wider opacity-70">
                      Enterprise-grade security
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5"
                      >
                        <span className="text-xs font-medium">{cert.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 30 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Form Card */}
              <div className="rounded-3xl border border-border bg-card p-8 lg:p-10 shadow-sm">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
                    <p className="text-muted-foreground max-w-sm">
                      We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    {/* Form Header */}
                    <div className="mb-8">
                      <div className="h-1 w-16 bg-primary rounded-full mb-6" />
                      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Request a demo
                      </h2>
                      <p className="mt-2 text-muted-foreground">
                        Get started by connecting with our team
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Fields */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            required
                            className="h-12 rounded-xl border-border/60 bg-background focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            required
                            className="h-12 rounded-xl border-border/60 bg-background focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Work Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                          className="h-12 rounded-xl border-border/60 bg-background focus:border-primary"
                        />
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your company name"
                          className="h-12 rounded-xl border-border/60 bg-background focus:border-primary"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your property management needs..."
                          rows={4}
                          className="rounded-xl border-border/60 bg-background focus:border-primary resize-none"
                        />
                      </div>

                      {/* Terms Checkbox */}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                        >
                          By completing this form, I agree to receive communications from PropertyCare.
                          I can unsubscribe at any time. For more information, please review our{" "}
                          <a href="#" className="text-primary underline underline-offset-2 hover:no-underline">
                            Privacy Policy
                          </a>
                          .
                        </Label>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={!agreedToTerms || isSubmitting}
                        className="w-full h-14 rounded-xl text-base font-medium"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Continue
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>

              {/* Quick Contact Options */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:support@propertycare.com"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50 flex-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <HeadphonesIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Need help now?</p>
                    <p className="text-xs text-muted-foreground">Talk to support</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50 flex-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Schedule a call</p>
                    <p className="text-xs text-muted-foreground">Book a time slot</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 rounded-3xl border border-border bg-card/50 p-8 lg:p-12"
          >
            <div className="text-center mb-10">
              <h3 className="text-lg font-semibold mb-2">Trusted by property managers worldwide</h3>
              <p className="text-muted-foreground text-sm">
                Join thousands of companies already using PropertyCare
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {trustIndicators.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-3xl font-bold tracking-tight">{item.stat}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
