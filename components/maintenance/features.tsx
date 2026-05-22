"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  ClipboardList,
  Wrench,
  Calendar,
  DollarSign,
  Users,
  CheckSquare,
  Bell,
  BarChart3,
  FileText,
  Settings,
  Clock,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

const featureItems = [
  { key: "workOrders", icon: Wrench, title: "Work Orders", description: "Create, assign, and track work orders with real-time status updates and mobile notifications." },
  { key: "preventiveMaintenance", icon: Calendar, title: "Preventive Maintenance", description: "Automatic scheduling of maintenance tasks to prevent equipment failures and extend asset life." },
  { key: "checklists", icon: CheckSquare, title: "Checklists", description: "Customizable inspection checklists to ensure consistent and thorough maintenance procedures." },
  { key: "vendorManagement", icon: Users, title: "Vendor Management", description: "Track vendor performance, manage contracts, and streamline procurement processes." },
  { key: "costTracking", icon: DollarSign, title: "Cost Tracking", description: "Monitor maintenance expenses, labor costs, and budget allocation in real-time." },
  { key: "assetTracking", icon: ClipboardList, title: "Asset Tracking", description: "Complete asset lifecycle management with maintenance history and documentation." },
  { key: "notifications", icon: Bell, title: "Smart Notifications", description: "Automated alerts for overdue tasks, upcoming maintenance, and critical issues." },
  { key: "reporting", icon: BarChart3, title: "Advanced Reporting", description: "Comprehensive analytics dashboards with customizable reports and KPI tracking." },
  { key: "documentation", icon: FileText, title: "Documentation", description: "Store and access maintenance manuals, procedures, and compliance documents." },
  { key: "automation", icon: Settings, title: "Workflow Automation", description: "Automate routine tasks, approvals, and escalations to save time and reduce errors." },
  { key: "scheduling", icon: Clock, title: "Smart Scheduling", description: "AI-powered scheduling that optimizes technician routes and workload distribution." },
  { key: "compliance", icon: Shield, title: "Compliance Tracking", description: "Ensure regulatory compliance with audit trails and certification tracking." },
  { key: "mobileApp", icon: Smartphone, title: "Mobile App", description: "Full-featured mobile app for technicians to manage tasks on the go." },
  { key: "integration", icon: Zap, title: "Integrations", description: "Connect with your existing tools through powerful API and third-party integrations." },
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

export function MaintenanceFeatures() {
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
              streamline maintenance operations
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
