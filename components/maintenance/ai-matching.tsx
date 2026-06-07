"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Bot, Wrench, Check, AlertTriangle, Clock, X, Cpu, Calendar } from "lucide-react";

const conversationStepKeys = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"] as const;
const taskKeys = ["task1", "task2", "task3"] as const;

export function MaintenanceAIMatching() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [assigned, setAssigned] = useState<string[]>([]);
  const [deferred, setDeferred] = useState<string[]>([]);
  const t = useTranslations("maintenancePage.aiMatching");

  const conversationSteps = useMemo(
    () =>
      conversationStepKeys.map((key, index) => ({
        role: index % 2 === 0 ? ("ai" as const) : ("user" as const),
        message: t(`conversation.${key}`),
      })),
    [t]
  );

  const maintenanceTasks = useMemo(
    () =>
      taskKeys.map((key) => ({
        name: t(`tasks.${key}.name`),
        match: key === "task1" ? 98 : key === "task2" ? 94 : 91,
        priority: t(`tasks.${key}.priority`),
        dueDate: t(`tasks.${key}.dueDate`),
      })),
    [t]
  );

  const toggleAssigned = (name: string) => {
    setAssigned((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleDeferred = (name: string) => {
    setDeferred((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <section id="ai-matching" className="relative py-16 sm:py-24 lg:py-15" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mt-6 text-balance text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
            {t("sectionTitle")}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t("sectionTitleHighlight")}
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-20 grid gap-6 sm:gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/30 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("assistantTitle")}</p>
                  <p className="text-xs text-muted-foreground">{t("assistantSubtitle")}</p>
                </div>
              </div>
              <div className="h-[300px] sm:h-[400px] overflow-y-auto p-3 sm:p-4">
                <div className="space-y-4">
                  {conversationSteps.slice(0, activeStep + 1).map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${step.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          step.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm">{step.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border/50 bg-secondary/20 p-4">
                <div className="flex gap-2">
                  {activeStep < conversationSteps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep((prev) => prev + 1)}
                      className="flex-1 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary transition-colors hover:bg-primary/20"
                    >
                      {t("continueConversation")}
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveStep(0)}
                      className="flex-1 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary transition-colors hover:bg-primary/20"
                    >
                      {t("restartDemo")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t("priorityTasks")}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {t("aiPrioritized")}
                </span>
              </div>
              <div className="space-y-4">
                {maintenanceTasks.map((task, index) => {
                  const isAssigned = assigned.includes(task.name);
                  const isDeferred = deferred.includes(task.name);
                  const isHighPriority = index !== 1;

                  return (
                    <motion.div
                      key={task.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className={`group relative overflow-hidden rounded-xl border-2 bg-secondary/30 p-4 transition-all ${
                        isAssigned
                          ? "border-primary bg-primary/5"
                          : isDeferred
                            ? "border-chart-5 bg-chart-5/5"
                            : "border-border/50 hover:border-primary/30 hover:bg-secondary/50"
                      }`}
                    >
                      {(isAssigned || isDeferred) && (
                        <div className="absolute top-3 right-3">
                          {isAssigned && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              <Check className="h-3 w-3" />
                              {t("assigned")}
                            </span>
                          )}
                          {isDeferred && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                              <Clock className="h-3 w-3" />
                              {t("deferred")}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                        <div className="flex gap-3 sm:gap-4">
                          <div
                            className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${
                              isDeferred ? "bg-chart-5/10" : "bg-primary/10"
                            }`}
                          >
                            <Wrench
                              className={`h-5 w-5 sm:h-6 sm:w-6 ${
                                isDeferred ? "text-chart-5" : "text-primary"
                              }`}
                            />
                          </div>
                          <div>
                            <p className={`font-medium ${isDeferred ? "line-through text-muted-foreground" : ""}`}>
                              {task.name}
                            </p>
                            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {task.dueDate}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-xs ${
                                  isHighPriority
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-chart-5/10 text-chart-5"
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="text-right">
                            <p className={`font-semibold ${isDeferred ? "line-through text-muted-foreground" : ""}`}>
                              {task.match}%
                            </p>
                            <div className="mt-1 flex items-center gap-1 text-sm">
                              <AlertTriangle className="h-3 w-3 text-chart-4" />
                              <span className="text-chart-4">{t("match")}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => toggleAssigned(task.name)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                                isAssigned
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-border/50 text-muted-foreground hover:border-primary hover:text-primary"
                              }`}
                              title={t("assignTitle")}
                            >
                              <Check className={`h-4 w-4 ${isAssigned ? "fill-current" : ""}`} />
                            </button>
                            <button
                              onClick={() => toggleDeferred(task.name)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                                isDeferred
                                  ? "bg-chart-5 text-primary-foreground"
                                  : "border border-border/50 text-muted-foreground hover:border-chart-5 hover:text-chart-5"
                              }`}
                              title={t("deferTitle")}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${task.match}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                          className={`h-full rounded-full ${
                            isDeferred
                              ? "bg-gradient-to-r from-chart-5 to-yellow-400"
                              : "bg-gradient-to-r from-primary to-accent"
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {(assigned.length > 0 || deferred.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("aiLearning")}</p>
                    <p className="text-sm text-muted-foreground">{t("optimizing")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 px-3 py-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {t("assignedCount", { count: assigned.length })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 px-3 py-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                      {t("deferredCount", { count: deferred.length })}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
