"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  MessageSquare,
  Bell,
  Users,
  Video,
  Briefcase,
  Calendar,
  Mail,
  Smartphone,
  Globe,
  FileText,
  Shield,
  Zap,
  Heart,
  MessageCircle,
} from "lucide-react";

const featureItems = [
  { key: "messaging", icon: MessageSquare, title: "Direct Messaging", description: "Enable residents to communicate directly with each other and building management through secure messaging." },
  { key: "announcements", icon: Bell, title: "Announcements", description: "Send instant announcements via email, SMS, or push notifications to all residents or specific groups." },
  { key: "residentPortal", icon: Users, title: "Resident Portal", description: "A dedicated social network for building residents to share updates, posts, and connect with neighbors." },
  { key: "virtualEvents", icon: Video, title: "Virtual Events", description: "Host online community meetings, workshops, and gatherings with integrated video conferencing." },
  { key: "jobBoard", icon: Briefcase, title: "Job & Service Board", description: "Allow residents to share job opportunities, professional services, and skills with the community." },
  { key: "eventCalendar", icon: Calendar, title: "Event Calendar", description: "Centralized calendar for community events, meetings, and important building dates." },
  { key: "emailCampaigns", icon: Mail, title: "Email Campaigns", description: "Create and send beautiful email newsletters and updates to keep residents informed." },
  { key: "mobileApp", icon: Smartphone, title: "Mobile App", description: "Full-featured mobile app for residents to stay connected on the go." },
  { key: "communityFeed", icon: Globe, title: "Community Feed", description: "Dynamic social feed where residents can post updates, share news, and interact." },
  { key: "documents", icon: FileText, title: "Document Sharing", description: "Share building rules, policies, forms, and important documents with all residents." },
  { key: "privacy", icon: Shield, title: "Privacy Controls", description: "Robust privacy settings allowing residents to control their visibility and communication preferences." },
  { key: "aiAssistant", icon: Zap, title: "AI Assistant", description: "Intelligent AI that answers resident questions and provides information about rules and events." },
  { key: "surveys", icon: Heart, title: "Polls & Surveys", description: "Create polls and surveys to gather resident feedback and make community decisions." },
  { key: "chatGroups", icon: MessageCircle, title: "Chat Groups", description: "Create interest-based or location-based chat groups for residents to connect." },
];

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative flex-shrink-0 w-[280px] sm:w-[360px] h-[180px] sm:h-[200px] rounded-2xl border border-border/50 bg-card/50 p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
      <div className="mb-3 sm:mb-4 flex h-9 w-11 sm:h-10 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <h3 className="mb-1.5 sm:mb-2 text-base sm:text-lg font-semibold">{title}</h3>
      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

interface ScrollingRowProps {
  items: Array<{ icon: React.ElementType; title: string; description: string }>;
  direction: "left" | "right";
  speed?: number;
}

function ScrollingRow({ items, direction, speed = 0.5 }: ScrollingRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const initializedRef = useRef(false);

  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (!initializedRef.current) {
      const scrollWidth = container.scrollWidth;
      const singleSetWidth = scrollWidth / 3;

      if (direction === "right") {
        scrollPositionRef.current = singleSetWidth;
        container.scrollLeft = singleSetWidth;
      }
      initializedRef.current = true;
    }

    const animate = () => {
      if (!scrollRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isPausedRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const singleSetWidth = scrollWidth / 3;

        if (direction === "left") {
          scrollPositionRef.current += speed;
          if (scrollPositionRef.current >= singleSetWidth) {
            scrollPositionRef.current = 0;
          }
        } else {
          scrollPositionRef.current -= speed;
          if (scrollPositionRef.current <= 0) {
            scrollPositionRef.current = singleSetWidth;
          }
        }

        scrollRef.current.scrollLeft = scrollPositionRef.current;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, speed]);

  const handlePause = () => {
    isPausedRef.current = true;
  };

  const handleResume = () => {
    isPausedRef.current = false;
  };

  return (
    <div
      className="relative"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden py-2"
      >
        {duplicatedItems.map((feature, index) => (
          <FeatureCard
            key={`${feature.title}-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

export function CommunicationFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const row1Features = featureItems.slice(0, 7);
  const row2Features = featureItems.slice(7, 14);

  return (
    <section id="features" className="relative bg-[#e5e1e4]/50 py-16 sm:py-24 lg:py-20 overflow-hidden" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              build a connected community
            </span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 sm:mt-16 lg:mt-20 space-y-4 sm:space-y-6"
      >
        <ScrollingRow items={row1Features} direction="left" speed={0.5} />
        <ScrollingRow items={row2Features} direction="right" speed={0.5} />
      </motion.div>
    </section>
  );
}
