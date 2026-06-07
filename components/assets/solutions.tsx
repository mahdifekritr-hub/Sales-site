"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Bot, Sparkles, ChevronRight, Package, QrCode, MapPin, BarChart3, DollarSign, Settings, Boxes } from "lucide-react";

const solutionKeys = ["assetTracking", "partsInventory", "purchaseOrders", "locationManagement"] as const;
const featureKeys = ["f1", "f2", "f3", "f4", "f5"] as const;
const assetKeys = ["a1", "a2", "a3"] as const;
const statKeys = ["active", "maintenance", "retired"] as const;
const actionKeys = ["viewDetails", "maintenanceHistory", "generateQr"] as const;
const inventoryKeys = ["i1", "i2", "i3"] as const;
const locationKeys = ["l1", "l2", "l3"] as const;

const assetIds: Record<(typeof assetKeys)[number], string> = {
  a1: "AST-2024-001",
  a2: "AST-2024-002",
  a3: "AST-2024-003",
};

const assetStatusKeys: Record<(typeof assetKeys)[number], "active" | "maintenance"> = {
  a1: "active",
  a2: "maintenance",
  a3: "active",
};

const inventoryMeta = [
  { min: 10, max: 50 },
  { min: 5, max: 20 },
  { min: 15, max: 100 },
];

const locationMeta = [
  { assets: 45, floors: 12 },
  { assets: 38, floors: 10 },
  { assets: 12, floors: 3 },
];

function AssetDashboardVisual() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("assetsPage.solutions.dashboard");

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
    { icon: Package, active: true },
    { icon: Boxes },
    { icon: MapPin },
    { icon: BarChart3 },
    { icon: DollarSign },
    { icon: Settings },
  ];

  const assets = assetKeys.map((key) => ({
    id: assetIds[key],
    name: t(`assets.${key}.name`),
    location: t(`assets.${key}.location`),
    statusKey: assetStatusKeys[key],
    status: t(`statusLabels.${assetStatusKeys[key]}`),
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
            app.propertycare.io/assets
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
                  <div className={`text-sm font-bold ${i === 0 ? "text-chart-4" : i === 1 ? "text-primary" : "text-muted-foreground"}`}>
                    {i === 0 ? "142" : i === 1 ? "8" : "6"}
                  </div>
                  <div className="text-[9px] text-muted-foreground">{t(`stats.${key}`)}</div>
                </div>
              ))}
            </div>

            <div className="px-2">
              <div className="rounded-lg border border-border/50 bg-secondary/20">
                {assets.map((asset, i) => (
                  <div key={asset.id} className={`flex items-center gap-2 px-2 py-1.5 ${i !== assets.length - 1 ? "border-b border-border/50" : ""}`}>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
                      <Package className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-[10px] font-medium">{asset.name}</div>
                      <div className="text-[8px] text-muted-foreground">{asset.location}</div>
                    </div>
                    <span className={`rounded-full px-1.5 py-0.5 text-[8px] ${
                      asset.statusKey === "active" ? "bg-chart-4/10 text-chart-4" :
                      asset.statusKey === "maintenance" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {asset.status}
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
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-chart-4 to-green-400 text-[8px] font-semibold text-primary-foreground">
                                  <Package className="h-3 w-3" />
                                </div>
                                <div>
                                  <div className="text-[10px] font-medium">{t("assetFoundTitle")}</div>
                                  <div className="text-[8px] text-muted-foreground">{t("assetFoundName")}</div>
                                </div>
                              </div>
                            </div>

                            <div className="p-2 text-[9px] leading-relaxed text-foreground/80">
                              {t("responseText", {
                                location: t("responseLocation"),
                                warranty: t("responseWarranty"),
                                lastMaintenance: t("responseLastMaintenance"),
                              })}
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mx-2 mb-2 rounded-lg border border-primary/20 bg-primary/5 p-1.5"
                            >
                              <div className="mb-1 flex items-center gap-1">
                                <QrCode className="h-2.5 w-2.5 text-primary" />
                                <span className="text-[8px] font-medium text-primary">{t("quickAccess")}</span>
                              </div>
                              <p className="text-[8px] leading-relaxed text-foreground/70">
                                {t("quickAccessText")}
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

function InventoryVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [quantities, setQuantities] = useState([45, 12, 78]);
  const t = useTranslations("assetsPage.solutions.inventory");

  const inventoryItems = inventoryKeys.map((key, index) => ({
    name: t(`items.${key}.name`),
    unit: t(`items.${key}.unit`),
    min: inventoryMeta[index].min,
    max: inventoryMeta[index].max,
  }));

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setQuantities((prev) =>
          prev.map((q, i) => {
            const { min, max } = inventoryMeta[i];
            const change = Math.random() > 0.5 ? -Math.floor(Math.random() * 5) : Math.floor(Math.random() * 3);
            return Math.max(0, Math.min(max + 10, q + change));
          })
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Boxes className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{t("title")}</div>
            <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
          </div>
        </div>

        <div className="space-y-3">
          {inventoryItems.map((item, index) => {
            const qty = quantities[index];
            const isLow = qty <= item.min;
            const isHigh = qty >= item.max;
            const percentage = Math.min(100, (qty / item.max) * 100);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg transition-colors ${
                  isLow ? "bg-destructive/10 border border-destructive/30" :
                  isHigh ? "bg-chart-5/10 border border-chart-5/30" :
                  "bg-secondary/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${
                      isLow ? "text-destructive" : isHigh ? "text-chart-5" : "text-foreground"
                    }`}>
                      {qty} {item.unit}
                    </span>
                    {isLow && (
                      <span className="text-[8px] bg-destructive/20 text-destructive px-1.5 py-0.5 rounded">
                        {t("lowStock")}
                      </span>
                    )}
                    {isHigh && (
                      <span className="text-[8px] bg-chart-5/20 text-chart-5 px-1.5 py-0.5 rounded">
                        {t("overstocked")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      isLow ? "bg-destructive" : isHigh ? "bg-chart-5" : "bg-primary"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[9px] text-muted-foreground">
                  <span>{t("min", { count: item.min })}</span>
                  <span>{t("max", { count: item.max })}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function QRCodeVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [scanned, setScanned] = useState(false);
  const t = useTranslations("assetsPage.solutions.qrcode");

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setScanned(true), 1500);
      const resetTimer = setTimeout(() => setScanned(false), 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <QrCode className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{t("title")}</div>
            <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <motion.div
            className="relative w-32 h-32 bg-white rounded-lg p-2 mb-4"
            animate={scanned ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"
                  }`}
                />
              ))}
            </div>

            {!scanned && (
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-primary"
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}

            <AnimatePresence>
              {scanned && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-chart-4/20 rounded-lg flex items-center justify-center"
                >
                  <CheckCircle2 className="h-8 w-8 text-chart-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            {!scanned ? (
              <motion.p
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground"
              >
                {t("scanning")}
              </motion.p>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-xs font-medium text-chart-4">{t("identified")}</p>
                <p className="text-[10px] text-muted-foreground">{t("resultName")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LocationMapVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("assetsPage.solutions.location");

  const locations = locationKeys.map((key, index) => ({
    name: t(`items.${key}.name`),
    assets: locationMeta[index].assets,
    floors: locationMeta[index].floors,
  }));

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{t("title")}</div>
            <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
          </div>
        </div>

        <div className="space-y-2">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{location.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-xs font-medium">{location.name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {t("floors", { count: location.floors })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-primary">{location.assets}</div>
                <div className="text-[9px] text-muted-foreground">{t("assetsLabel")}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{t("totalAssets")}</span>
          <span className="text-sm font-bold text-primary">95</span>
        </div>
      </div>
    </div>
  );
}

export function AssetsSolutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("assetsPage.solutions");

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

  const visualComponents = [
    <AssetDashboardVisual key="dashboard" />,
    <InventoryVisual key="inventory" />,
    <QRCodeVisual key="qrcode" />,
    <LocationMapVisual key="location" />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutionData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [solutionData.length]);

  return (
    <section id="solutions" className="relative py-16 sm:py-24 lg:py-15" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
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

        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {solutionData.map((solution, index) => (
              <motion.button
                key={solution.tag}
                onClick={() => setActiveIndex(index)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {solution.tag}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            key={`visual-${activeIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            {visualComponents[activeIndex]}
          </motion.div>

          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                {solutionData[activeIndex].tag}
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                {solutionData[activeIndex].title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {solutionData[activeIndex].description}
              </p>
            </div>

            <ul className="space-y-3">
              {solutionData[activeIndex].features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
