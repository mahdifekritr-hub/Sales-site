"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Bot, Sparkles, ChevronRight, MessageSquare, Bell, Users, Video, Megaphone, Briefcase, Calendar, Settings } from "lucide-react";

const solutionKeys = ["residentLink", "announcements", "jobBoard", "virtualEvents"] as const;
const featureKeys = ["f1", "f2", "f3", "f4", "f5"] as const;
const conversationKeys = ["c1", "c2", "c3"] as const;
const statKeys = ["activeChats", "announcements", "events"] as const;
const actionKeys = ["email", "sms", "push", "allChannels"] as const;
const channelKeys = ["ch1", "ch2", "ch3", "ch4"] as const;
const postKeys = ["p1", "p2", "p3"] as const;
const eventKeys = ["e1", "e2", "e3"] as const;

const channelEmojis = ["📧", "📱", "🔔", "💬"];
const channelRecipientCounts = [156, 142, 134, 156];
const postEngagement = [
  { likes: 12, comments: 8 },
  { likes: 45, comments: 15 },
  { likes: 23, comments: 34 },
];
const eventAttendees = [45, 18, 12];

function MessagingDashboardVisual() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("communicationPage.solutions.dashboard");

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
    { icon: MessageSquare, active: true },
    { icon: Bell },
    { icon: Users },
    { icon: Video },
    { icon: Briefcase },
    { icon: Settings },
  ];

  const conversations = conversationKeys.map((key) => ({
    name: t(`conversations.${key}.name`),
    message: t(`conversations.${key}.message`),
    time: t(`conversations.${key}.time`),
    unread: Number(t(`conversations.${key}.unread`)),
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
            {t("browserUrl")}
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
                  <div className={`text-sm font-bold ${i === 0 ? "text-primary" : i === 1 ? "text-chart-5" : "text-chart-4"}`}>
                    {i === 0 ? "24" : i === 1 ? "8" : "3"}
                  </div>
                  <div className="text-[9px] text-muted-foreground">{t(`stats.${key}`)}</div>
                </div>
              ))}
            </div>

            <div className="px-2">
              <div className="rounded-lg border border-border/50 bg-secondary/20">
                {conversations.map((conv, i) => (
                  <div key={conv.name} className={`flex items-center gap-2 px-2 py-1.5 ${i !== conversations.length - 1 ? "border-b border-border/50" : ""}`}>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
                      <MessageSquare className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-[10px] font-medium">{conv.name}</div>
                      <div className="text-[8px] text-muted-foreground truncate">{conv.message}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[8px] text-muted-foreground">{conv.time}</span>
                      {conv.unread > 0 && (
                        <span className="rounded-full bg-primary px-1.5 py-0.5 text-[8px] text-primary-foreground">
                          {conv.unread}
                        </span>
                      )}
                    </div>
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
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[8px] font-semibold text-primary-foreground">
                                  <Megaphone className="h-3 w-3" />
                                </div>
                                <div>
                                  <div className="text-[10px] font-medium">{t("announcementReady")}</div>
                                  <div className="text-[8px] text-muted-foreground">{t("targetResidents")}</div>
                                </div>
                              </div>
                            </div>

                            <div className="p-2 text-[9px] leading-relaxed text-foreground/80">
                              {t("responseText")}
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mx-2 mb-2 rounded-lg border border-primary/20 bg-primary/5 p-1.5"
                            >
                              <div className="mb-1 flex items-center gap-1">
                                <Sparkles className="h-2.5 w-2.5 text-primary" />
                                <span className="text-[8px] font-medium text-primary">{t("aiSuggestion")}</span>
                              </div>
                              <p className="text-[8px] leading-relaxed text-foreground/70">
                                {t("aiSuggestionText")}
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

function AnnouncementVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [sentChannels, setSentChannels] = useState<number[]>([]);
  const t = useTranslations("communicationPage.solutions.announcement");

  const channels = channelKeys.map((key, index) => ({
    key,
    name: t(`channels.${key}.name`),
    recipients: channelRecipientCounts[index],
    icon: channelEmojis[index],
  }));

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setSentChannels((prev) => {
          if (prev.length >= channels.length) {
            return [];
          }
          return [...prev, prev.length];
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isInView, channels.length]);

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Megaphone className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{t("title")}</div>
            <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
          </div>
        </div>

        <div className="space-y-2">
          {channels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                sentChannels.includes(index) ? "bg-chart-4/10" : "bg-secondary/30"
              }`}
            >
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                sentChannels.includes(index)
                  ? "border-chart-4 bg-chart-4"
                  : "border-muted-foreground/30"
              }`}>
                {sentChannels.includes(index) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                  </motion.div>
                )}
              </div>
              <span className="text-sm">{channel.icon}</span>
              <span className={`text-xs flex-1 ${sentChannels.includes(index) ? "line-through text-muted-foreground" : ""}`}>
                {channel.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {t(`channels.${channel.key}.recipients`, { count: channel.recipients })}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {t("channelsSent", { sent: sentChannels.length, total: channels.length })}
          </span>
          <div className="h-2 flex-1 mx-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-chart-4"
              initial={{ width: 0 }}
              animate={{ width: `${(sentChannels.length / channels.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityFeedVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("communicationPage.solutions.communityFeed");

  const posts = postKeys.map((key, index) => ({
    author: t(`posts.${key}.author`),
    content: t(`posts.${key}.content`),
    time: t(`posts.${key}.time`),
    likes: postEngagement[index].likes,
    comments: postEngagement[index].comments,
  }));

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{t("title")}</div>
            <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
          </div>
        </div>

        <div className="space-y-3">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="rounded-lg bg-secondary/30 p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[10px] font-medium">
                  {post.author.charAt(0)}
                </div>
                <span className="text-xs font-medium">{post.author}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{post.time}</span>
              </div>
              <p className="text-xs text-foreground/80 mb-2">{post.content}</p>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VirtualEventVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("communicationPage.solutions.virtualEventsVisual");

  const events = eventKeys.map((key, index) => ({
    title: t(`events.${key}.title`),
    date: t(`events.${key}.date`),
    attendees: eventAttendees[index],
    isLive: index === 0,
  }));

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Video className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{t("title")}</div>
            <div className="text-xs text-muted-foreground">{t("subtitle")}</div>
          </div>
        </div>

        <div className="space-y-2">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                event.isLive ? "bg-destructive/10" : "bg-primary/10"
              }`}>
                <Calendar className={`h-4 w-4 ${event.isLive ? "text-destructive" : "text-primary"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{event.title}</div>
                <div className="text-[10px] text-muted-foreground">{event.date}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                  event.isLive
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                }`}>
                  {event.isLive ? t("statusLive") : t("statusUpcoming")}
                </span>
                <span className="text-[9px] text-muted-foreground mt-0.5">
                  {t("joined", { count: event.attendees })}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommunicationSolutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("communicationPage.solutions");

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
    <MessagingDashboardVisual key="dashboard" />,
    <AnnouncementVisual key="announcement" />,
    <CommunityFeedVisual key="community" />,
    <VirtualEventVisual key="events" />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutionData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [solutionData.length]);

  return (
    <section id="solutions" className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {solutionData.map((solution, index) => (
            <button
              key={solution.tag}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {solution.tag}
            </button>
          ))}
        </motion.div>

        <div className="mt-10 sm:mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            key={`visual-${activeIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            {visualComponents[activeIndex]}
          </motion.div>

          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              <Sparkles className="h-3 w-3" />
              {solutionData[activeIndex].tag}
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
              {solutionData[activeIndex].title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
              {solutionData[activeIndex].description}
            </p>
            <ul className="space-y-3">
              {solutionData[activeIndex].features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
