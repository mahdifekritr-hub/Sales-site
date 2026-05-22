"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle2, Bot, Sparkles, ChevronRight, User, Wrench, ClipboardList, Calendar, BarChart3, AlertTriangle, Clock, Settings } from "lucide-react";

const solutionData = [
  {
    tag: "Work Orders",
    title: "Ensure Timely Tasks",
    description: "Work orders allow you to assign, monitor, and complete tasks efficiently, ensuring that the right work gets done on time. Create, assign, and prioritize work orders with real-time progress tracking and automated approval workflows.",
    features: [
      "Create, assign, and prioritize work orders",
      "Track progress in real-time with detailed reports",
      "Automate work order approval workflows",
      "Mobile-friendly task management",
      "Instant notifications to assigned technicians"
    ]
  },
  {
    tag: "Work Requests",
    title: "Online Request Approvals",
    description: "Streamline the request submission process with online approvals. Tenants and staff can submit maintenance requests that are automatically routed to the right team members for quick action and resolution.",
    features: [
      "Online request submission portal",
      "Automatic routing to appropriate teams",
      "Request prioritization and categorization",
      "Status tracking for requesters",
      "Approval workflow automation"
    ]
  },
  {
    tag: "Workflow Automation",
    title: "Streamline Your Workflows",
    description: "Automate repetitive workflows to save time, minimize errors, and keep processes running smoothly across your organization. Create custom workflows for task automation with seamless integration across modules.",
    features: [
      "Create custom workflows for task automation",
      "Automate approvals, notifications, and escalations",
      "Seamlessly integrate with other modules",
      "Reduce manual data entry",
      "Trigger-based automation rules"
    ]
  },
  {
    tag: "Time & Cost Tracking",
    title: "Budget Optimization",
    description: "Track time spent and expenses incurred on tasks or projects to improve financial control and efficiency. Log time and expenses, generate detailed reports, and monitor performance against budgets.",
    features: [
      "Log time and expenses for projects",
      "Generate detailed cost and time reports",
      "Set budgets and monitor performance",
      "Labor cost analysis",
      "Invoice generation from tracked time"
    ]
  }
];

// Maintenance Dashboard Visual
function MaintenanceDashboardVisual() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const fullPrompt = "Show overdue work orders";

  useEffect(() => {
    if (isInView) {
      const sidebarTimer = setTimeout(() => setShowSidebar(true), 300);

      const typingStart = setTimeout(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= fullPrompt.length) {
            setTypedPrompt(fullPrompt.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => setShowTyping(true), 200);
            setTimeout(() => {
              setShowTyping(false);
              setShowResponse(true);
            }, 1200);
          }
        }, 70);
        return () => clearInterval(typeInterval);
      }, 800);

      return () => {
        clearTimeout(sidebarTimer);
        clearTimeout(typingStart);
      };
    }
  }, [isInView]);

  const sidebarItems = [
    { icon: Wrench, active: true },
    { icon: ClipboardList },
    { icon: Calendar },
    { icon: BarChart3 },
    { icon: AlertTriangle },
    { icon: Settings },
  ];

  const workOrders = [
    { id: "WO-2024-001", title: "HVAC Filter Replacement", status: "overdue", priority: "high" },
    { id: "WO-2024-002", title: "Elevator Inspection", status: "pending", priority: "medium" },
    { id: "WO-2024-003", title: "Plumbing Repair - Unit 305", status: "in-progress", priority: "high" },
  ];

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl">
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/50 px-3 py-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-destructive/60" />
            <div className="h-2 w-2 rounded-full bg-chart-5/60" />
            <div className="h-2 w-2 rounded-full bg-chart-4/60" />
          </div>
          <div className="ml-2 flex-1 rounded bg-background/50 px-2 py-0.5 text-xs text-muted-foreground">
            app.propertycare.io/maintenance
          </div>
        </div>

        {/* Dashboard content */}
        <div className="relative flex h-[280px] sm:h-[320px]">
          {/* Mini sidebar */}
          <div className={`hidden sm:flex w-10 flex-col gap-1 border-r border-border/50 bg-secondary/30 py-2 transition-all duration-300 ${showSidebar ? "opacity-40 blur-[1px]" : ""}`}>
            {sidebarItems.map((item, i) => (
              <div
                key={i}
                className={`mx-1 flex h-7 w-7 items-center justify-center rounded-lg ${item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <item.icon className="h-3.5 w-3.5" />
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className={`flex-1 overflow-hidden transition-all duration-300 ${showSidebar ? "opacity-30 blur-[2px]" : ""}`}>
            {/* Header */}
            <div className="border-b border-border/50 px-3 py-2">
              <div className="text-xs font-semibold">Work Orders</div>
              <div className="text-[10px] text-muted-foreground">3 requiring attention</div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-2 p-2">
              {[
                { label: "Overdue", val: "5", color: "text-destructive" },
                { label: "In Progress", val: "12", color: "text-primary" },
                { label: "Completed", val: "48", color: "text-chart-4" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-secondary/50 p-2 text-center">
                  <div className={`text-sm font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-[9px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mini table */}
            <div className="px-2">
              <div className="rounded-lg border border-border/50 bg-secondary/20">
                {workOrders.map((order, i) => (
                  <div key={order.id} className={`flex items-center gap-2 px-2 py-1.5 ${i !== workOrders.length - 1 ? "border-b border-border/50" : ""}`}>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
                      <Wrench className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-[10px] font-medium">{order.title}</div>
                      <div className="text-[8px] text-muted-foreground">#{order.id}</div>
                    </div>
                    <span className={`rounded-full px-1.5 py-0.5 text-[8px] ${
                      order.status === "overdue" ? "bg-destructive/10 text-destructive" :
                      order.status === "pending" ? "bg-chart-5/10 text-chart-5" : 
                      "bg-primary/10 text-primary"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Sidebar overlay */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                initial={{ x: 260, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 260, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0 sm:left-auto sm:right-0 sm:top-0 flex h-full w-full sm:w-[260px] flex-col border-l border-primary/20 bg-card/95 backdrop-blur-xl"
                style={{ boxShadow: "-10px 0 40px -10px rgba(var(--primary), 0.15)" }}
              >
                {/* Sidebar header */}
                <motion.div
                  className="flex items-center gap-2 border-b border-border/50 px-3 py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                      <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <motion.div
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-card bg-chart-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">Maintenance AI</div>
                    <div className="text-[9px] text-muted-foreground">Ready to assist</div>
                  </div>
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </motion.div>

                {/* Chat area */}
                <div className="flex-1 overflow-hidden p-2">
                  <div className="space-y-2">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-end"
                    >
                      <div className="rounded-xl rounded-tr-sm bg-primary px-2.5 py-1.5 text-[10px] text-primary-foreground">
                        {typedPrompt}<span className="animate-pulse">|</span>
                      </div>
                    </motion.div>

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {showTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex justify-start"
                        >
                          <div className="rounded-xl rounded-tl-sm bg-secondary/80 px-2.5 py-1.5">
                            <div className="flex gap-0.5">
                              {[0, 0.1, 0.2].map((d, i) => (
                                <motion.div
                                  key={i}
                                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                                  animate={{ y: [0, -2, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.5, delay: d }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Response */}
                    <AnimatePresence>
                      {showResponse && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="overflow-hidden rounded-xl border border-border/50 bg-secondary/50"
                          >
                            <div className="border-b border-border/50 bg-secondary/80 px-2 py-1.5">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-destructive to-red-400 text-[8px] font-semibold text-primary-foreground">
                                  <AlertTriangle className="h-3 w-3" />
                                </div>
                                <div>
                                  <div className="text-[10px] font-medium">5 Overdue Work Orders</div>
                                  <div className="text-[8px] text-muted-foreground">Require immediate attention</div>
                                </div>
                              </div>
                            </div>

                            <div className="p-2 text-[9px] leading-relaxed text-foreground/80">
                              Found <span className="font-medium text-destructive">5 overdue work orders</span>. Highest priority: <span className="font-medium">HVAC Filter Replacement</span> (3 days overdue).
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mx-2 mb-2 rounded-lg border border-primary/20 bg-primary/5 p-1.5"
                            >
                              <div className="mb-1 flex items-center gap-1">
                                <Sparkles className="h-2.5 w-2.5 text-primary" />
                                <span className="text-[8px] font-medium text-primary">Recommended Action</span>
                              </div>
                              <p className="text-[8px] leading-relaxed text-foreground/70">
                                Assign to available technician John - has HVAC certification and is on-site.
                              </p>
                            </motion.div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-1"
                          >
                            {["View All", "Auto-Assign", "Send Reminders"].map((action) => (
                              <motion.button
                                key={action}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-1 rounded-lg border border-border/50 bg-secondary/50 px-2 py-1 text-[8px] font-medium transition-colors hover:bg-secondary hover:border-primary/30"
                              >
                                {action}
                                <ChevronRight className="h-2 w-2" />
                              </motion.button>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Checklist Visual
function ChecklistVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  const checklistItems = [
    "Inspect fire extinguishers",
    "Check emergency lighting",
    "Test smoke detectors",
    "Verify exit signage",
    "Document findings",
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCompletedItems(prev => {
          if (prev.length >= checklistItems.length) {
            return [];
          }
          return [...prev, prev.length];
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <ClipboardList className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Fire Safety Inspection</div>
            <div className="text-xs text-muted-foreground">Monthly Checklist</div>
          </div>
        </div>

        <div className="space-y-2">
          {checklistItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                completedItems.includes(index) ? "bg-chart-4/10" : "bg-secondary/30"
              }`}
            >
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                completedItems.includes(index) 
                  ? "border-chart-4 bg-chart-4" 
                  : "border-muted-foreground/30"
              }`}>
                {completedItems.includes(index) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                  </motion.div>
                )}
              </div>
              <span className={`text-xs ${completedItems.includes(index) ? "line-through text-muted-foreground" : ""}`}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {completedItems.length}/{checklistItems.length} Complete
          </span>
          <div className="h-2 flex-1 mx-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-chart-4"
              initial={{ width: 0 }}
              animate={{ width: `${(completedItems.length / checklistItems.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Vendor Management Visual
function VendorVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const vendors = [
    { name: "HVAC Pro Services", rating: 4.8, jobs: 24, status: "Available" },
    { name: "Quick Plumbing Co", rating: 4.6, jobs: 18, status: "On Job" },
    { name: "Elite Electric", rating: 4.9, jobs: 31, status: "Available" },
  ];

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Vendor Directory</div>
              <div className="text-xs text-muted-foreground">3 Active Vendors</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {vendors.map((vendor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-semibold">
                  {vendor.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-medium">{vendor.name}</div>
                  <div className="text-[10px] text-muted-foreground">{vendor.jobs} jobs completed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-chart-4">{vendor.rating}</div>
                <span className={`text-[10px] ${vendor.status === "Available" ? "text-chart-4" : "text-chart-5"}`}>
                  {vendor.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Schedule Visual
function ScheduleVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scheduleItems = [
    { time: "09:00", task: "HVAC Quarterly Service", location: "Building A", type: "Preventive" },
    { time: "11:30", task: "Elevator Inspection", location: "Tower B", type: "Compliance" },
    { time: "14:00", task: "Fire Alarm Testing", location: "All Buildings", type: "Safety" },
  ];

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Today&apos;s Schedule</div>
              <div className="text-xs text-muted-foreground">3 Scheduled Tasks</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">May 22</div>
        </div>

        <div className="relative">
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-border/50" />
          
          <div className="space-y-3">
            {scheduleItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-3"
              >
                <div className="text-xs text-muted-foreground w-10">{item.time}</div>
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-primary border-2 border-card" />
                </div>
                <div className="flex-1 p-2 rounded-lg bg-secondary/30">
                  <div className="text-xs font-medium">{item.task}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground">{item.location}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{item.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MaintenanceSolutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const visuals = [
    <MaintenanceDashboardVisual key="dashboard" />,
    <ChecklistVisual key="checklist" />,
    <VendorVisual key="vendor" />,
    <ScheduleVisual key="schedule" />,
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            Smart Modules for Modern{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Maintenance Management
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground">
            Comprehensive tools to streamline every aspect of your maintenance operations, from work orders to vendor management.
          </p>
        </motion.div>

        {/* Solutions tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {solutionData.map((solution, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {solution.tag}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Text content */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {solutionData[activeIndex].tag}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {solutionData[activeIndex].title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {solutionData[activeIndex].description}
            </p>
            <ul className="space-y-3">
              {solutionData[activeIndex].features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            key={`visual-${activeIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {visuals[activeIndex]}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
