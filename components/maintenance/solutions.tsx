"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Bot, Sparkles, ChevronRight, User, Wrench, ClipboardList, Calendar, BarChart3, AlertTriangle, Settings, Package, Boxes, MessageSquare, Building2 } from "lucide-react";

const solutionKeys = ["workOrders", "workRequests", "workflowAutomation", "timeCostTracking", "allInOne"] as const;
const moduleKeys = ["m1", "m2", "m3", "m4", "m5"] as const;
const featureKeys = ["f1", "f2", "f3", "f4", "f5"] as const;
const workOrderKeys = ["wo1", "wo2", "wo3"] as const;
const checklistKeys = ["c1", "c2", "c3", "c4", "c5"] as const;
const vendorKeys = ["v1", "v2", "v3"] as const;
const scheduleKeys = ["s1", "s2", "s3"] as const;
const actionKeys = ["viewAll", "autoAssign", "sendReminders"] as const;
const statKeys = ["overdue", "inProgress", "completed"] as const;

function MaintenanceDashboardVisual() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("maintenancePage.solutions.dashboard");

  const fullPrompt = t("fullPrompt");

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
  }, [isInView, fullPrompt]);

  const sidebarItems = [
    { icon: Wrench, active: true },
    { icon: ClipboardList },
    { icon: Calendar },
    { icon: BarChart3 },
    { icon: AlertTriangle },
    { icon: Settings },
  ];

  const workOrders = workOrderKeys.map((key) => ({
    id: key === "wo1" ? "WO-2024-001" : key === "wo2" ? "WO-2024-002" : "WO-2024-003",
    title: t(`workOrders.${key}.title`),
    status: t(`workOrders.${key}.status`),
  }));

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl">
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

        <div className="relative flex h-[280px] sm:h-[320px]">
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

          <div className={`flex-1 overflow-hidden transition-all duration-300 ${showSidebar ? "opacity-30 blur-[2px]" : ""}`}>
            <div className="border-b border-border/50 px-3 py-2">
              <div className="text-xs font-semibold">{t("headerTitle")}</div>
              <div className="text-[10px] text-muted-foreground">{t("headerSubtitle")}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-2">
              {statKeys.map((key, i) => (
                <div key={key} className="rounded-lg bg-secondary/50 p-2 text-center">
                  <div className={`text-sm font-bold ${i === 0 ? "text-destructive" : i === 1 ? "text-primary" : "text-chart-4"}`}>
                    {i === 0 ? "5" : i === 1 ? "12" : "48"}
                  </div>
                  <div className="text-[9px] text-muted-foreground">{t(`stats.${key}`)}</div>
                </div>
              ))}
            </div>

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
                    <span className="rounded-full px-1.5 py-0.5 text-[8px] bg-destructive/10 text-destructive">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                    <div className="text-xs font-semibold">{t("aiTitle")}</div>
                    <div className="text-[9px] text-muted-foreground">{t("aiReady")}</div>
                  </div>
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </motion.div>

                <div className="flex-1 overflow-hidden p-2">
                  <div className="space-y-2">
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
                                  <div className="text-[10px] font-medium">{t("overdueTitle")}</div>
                                  <div className="text-[8px] text-muted-foreground">{t("overdueSubtitle")}</div>
                                </div>
                              </div>
                            </div>

                            <div className="p-2 text-[9px] leading-relaxed text-foreground/80">
                              {t("responseText", {
                                count: t("overdueCount"),
                                priority: t("priorityTask"),
                              })}
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mx-2 mb-2 rounded-lg border border-primary/20 bg-primary/5 p-1.5"
                            >
                              <div className="mb-1 flex items-center gap-1">
                                <Sparkles className="h-2.5 w-2.5 text-primary" />
                                <span className="text-[8px] font-medium text-primary">{t("recommendedAction")}</span>
                              </div>
                              <p className="text-[8px] leading-relaxed text-foreground/70">
                                {t("recommendedText")}
                              </p>
                            </motion.div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-1"
                          >
                            {actionKeys.map((action) => (
                              <motion.button
                                key={action}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-1 rounded-lg border border-border/50 bg-secondary/50 px-2 py-1 text-[8px] font-medium transition-colors hover:bg-secondary hover:border-primary/30"
                              >
                                {t(`actions.${action}`)}
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

function ChecklistVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const t = useTranslations("maintenancePage.solutions.checklist");

  const checklistItems = checklistKeys.map((key) => t(`items.${key}`));

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCompletedItems((prev) => {
          if (prev.length >= checklistItems.length) {
            return [];
          }
          return [...prev, prev.length];
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isInView, checklistItems.length]);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <ClipboardList className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{t("title")}</div>
            <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
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
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  completedItems.includes(index)
                    ? "border-chart-4 bg-chart-4"
                    : "border-muted-foreground/30"
                }`}
              >
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
            {t("complete", {
              completed: completedItems.length,
              total: checklistItems.length,
            })}
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

function VendorVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("maintenancePage.solutions.vendor");

  const vendors = vendorKeys.map((key, index) => ({
    name: t(`vendors.${key}.name`),
    rating: index === 0 ? 4.8 : index === 1 ? 4.6 : 4.9,
    jobs: index === 0 ? 24 : index === 1 ? 18 : 31,
    status: t(`vendors.${key}.status`),
  }));

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">{t("title")}</div>
              <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
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
                  <div className="text-[10px] text-muted-foreground">
                    {t("jobsCompleted", { count: vendor.jobs })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-chart-4">{vendor.rating}</div>
                <span className="text-[10px] text-chart-4">{vendor.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const moduleIcons = [Wrench, Package, Boxes, MessageSquare, Building2];

function AllInOneVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeModule, setActiveModule] = useState(0);
  const t = useTranslations("maintenancePage.solutions.allInOneVisual");

  const modules = moduleKeys.map((key, index) => ({
    key,
    icon: moduleIcons[index],
    name: t(`modules.${key}.name`),
    description: t(`modules.${key}.description`),
  }));

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % modules.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView, modules.length]);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">{t("title")}</div>
              <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
            </div>
          </div>
          <span className="rounded-full bg-chart-4/10 px-2 py-0.5 text-[10px] font-medium text-chart-4">
            {t("connected")}
          </span>
        </div>

        <div className="relative mb-4 flex items-center justify-center py-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full border border-primary/10" />
            <div className="absolute h-44 w-44 rounded-full border border-dashed border-primary/20" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20"
          >
            <span className="text-[9px] font-bold text-primary-foreground text-center leading-tight px-1">
              PCA
            </span>
          </motion.div>

          {modules.map((module, index) => {
            const angle = (index / modules.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * 88;
            const y = Math.sin(angle) * 72;
            const Icon = module.icon;

            return (
              <motion.div
                key={module.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="absolute"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                    activeModule === index
                      ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                      : "border-border/50 bg-secondary/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${activeModule === index ? "text-primary" : "text-muted-foreground"}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-2">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.key}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.08 }}
                className={`flex items-center gap-2 rounded-lg p-2 transition-colors ${
                  activeModule === index ? "bg-primary/5 border border-primary/20" : "bg-secondary/30"
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium">{module.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{module.description}</div>
                </div>
                {activeModule === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ScheduleVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("maintenancePage.solutions.schedule");

  const scheduleItems = scheduleKeys.map((key, index) => ({
    time: index === 0 ? "09:00" : index === 1 ? "11:30" : "14:00",
    task: t(`items.${key}.task`),
    location: t(`items.${key}.location`),
    type: t(`items.${key}.type`),
  }));

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">{t("title")}</div>
              <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{t("date")}</div>
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
  const t = useTranslations("maintenancePage.solutions");

  const solutionData = useMemo(
    () =>
      solutionKeys.map((key) => ({
        tag: t(`items.${key}.tag`),
        title: t(`items.${key}.title`),
        description: t(`items.${key}.description`),
        features: featureKeys.map((f) => t(`items.${key}.features.${f}`)),
      })),
    [t]
  );

  const visuals = [
    <MaintenanceDashboardVisual key="dashboard" />,
    <ChecklistVisual key="checklist" />,
    <VendorVisual key="vendor" />,
    <ScheduleVisual key="schedule" />,
    <AllInOneVisual key="allInOne" />,
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            {t("sectionTitle")}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("sectionTitleHighlight")}
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
