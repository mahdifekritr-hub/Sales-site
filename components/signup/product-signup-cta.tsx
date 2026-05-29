"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Building2, Shield, Sparkles, Users, X, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SignupProduct } from "@/lib/public-signup-config";
import {
  PRODUCT_SIGNUP_OPEN_EVENT,
  type ProductSignupOpenDetail,
} from "@/lib/product-signup-events";

const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{2,14})[A-Za-z0-9]$/;

const SCHEDULE_DEMO_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SCHEDULE_DEMO_URL?.trim()) ||
  "https://fire.chilipiper.com/me/property-careapp/meeting-with-propertycare";

const ADMIN_PORTAL_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL?.trim()) ||
  "https://admin.propertycareapp.com";

type ProductSignupCTAProps = {
  product: SignupProduct;
  variant?: "section" | "modal";
};

function normalizeMobileForApi(raw: string): string {
  return raw.trim().replace(/\s+/g, "").replace(/[()]/g, "");
}

export function ProductSignupCTA({ product, variant = "section" }: ProductSignupCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    company?: string;
    mobile?: string;
  }>({});
  const t = useTranslations("ctaProducts");
  const tModal = useTranslations("cta");
  const locale = useLocale();
  const layoutId = `trial-modal-${product}-${variant}`;
  const fieldId = (name: string) => `cta-${product}-${variant}-${name}`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<ProductSignupOpenDetail>).detail;
      if (detail?.product === product) {
        setIsExpanded(true);
      }
    };

    window.addEventListener(PRODUCT_SIGNUP_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(PRODUCT_SIGNUP_OPEN_EVENT, handleOpen);
  }, [product]);

  const validateClient = (): boolean => {
    const next: typeof fieldErrors = {};
    if (!USERNAME_RE.test(username.trim())) {
      next.username = tModal("modal.errors.username");
    }
    if (!company.trim()) {
      next.company = tModal("modal.errors.company");
    }
    const mob = normalizeMobileForApi(mobileNumber);
    if (!mob.startsWith("+") || mob.length < 8) {
      next.mobile = tModal("modal.errors.mobile");
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateClient()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/public-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
          name: name.trim(),
          new_subscription: company.trim(),
          mobileNumber: normalizeMobileForApi(mobileNumber),
          email: email.trim(),
          locale,
          product,
        }),
      });

      const json = (await res.json().catch(() => ({}))) as { message?: string };

      if (!res.ok) {
        setSubmitError(
          typeof json.message === "string" && json.message.length > 0
            ? json.message
            : tModal("modal.errors.generic"),
        );
        setIsSubmitting(false);
        return;
      }

      window.location.assign(ADMIN_PORTAL_URL);
    } catch {
      setSubmitError(tModal("modal.errors.network"));
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Zap, text: tModal("modal.benefits.aiPowered") },
    { icon: Shield, text: tModal("modal.benefits.security") },
    { icon: Users, text: tModal("modal.benefits.support") },
    { icon: Building2, text: tModal("modal.benefits.multilingual") },
  ];

  return (
    <>
      {variant === "section" && (
        <section className="relative py-16 sm:py-24 lg:py-12" ref={ref}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm sm:rounded-3xl sm:p-12 lg:p-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent sm:mb-6 sm:h-16 sm:w-16 sm:rounded-2xl"
              >
                <Sparkles className="h-6 w-6 text-primary-foreground sm:h-8 sm:w-8" />
              </motion.div>

              <h2 className="text-balance text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                {t(`${product}.sectionTitle`)}{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t(`${product}.sectionTitleHighlight`)}
                </span>
                ?
              </h2>

              <p className="mx-auto mt-4 max-w-xl px-2 text-sm text-muted-foreground sm:mt-6 sm:px-0 sm:text-base lg:text-lg">
                {t(`${product}.subtitle`)}
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 px-4 sm:mt-8 sm:flex-row sm:gap-4 sm:px-0 lg:mt-10">
                <Button
                  size="lg"
                  onClick={() => setIsExpanded(true)}
                  className="group w-full gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-8"
                >
                  {t(`${product}.startFreeTrial`)}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-border bg-transparent text-foreground hover:bg-secondary sm:w-auto"
                  asChild
                >
                  <a href={SCHEDULE_DEMO_URL}>{t(`${product}.scheduleDemo`)}</a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground sm:mt-6 sm:text-sm">
                {t(`${product}.noCreditCard`)}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
              onClick={() => setIsExpanded(false)}
            />

            <motion.div
              layoutId={layoutId}
              className="fixed inset-4 z-50 m-auto flex max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl sm:inset-8 sm:rounded-3xl lg:inset-12"
              style={{ originX: 0.5, originY: 0.5 }}
            >
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
                      {tModal("modal.title")}{" "}
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {tModal("modal.titleHighlight")}
                      </span>
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
                      {tModal("modal.subtitle")}
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
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10"
                >
                  <h4 className="text-lg font-semibold sm:text-xl">{tModal("modal.formTitle")}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{tModal("modal.formSubtitle")}</p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id={fieldId("username")}
                        label={tModal("modal.fields.userName")}
                        autoComplete="username"
                        placeholder={tModal("modal.placeholders.userName")}
                        value={username}
                        onChange={(value) => {
                          setUsername(value);
                          if (fieldErrors.username) setFieldErrors((p) => ({ ...p, username: undefined }));
                        }}
                        error={fieldErrors.username}
                      />
                      <FormInput
                        id={fieldId("password")}
                        type="password"
                        label={tModal("modal.fields.password")}
                        autoComplete="new-password"
                        placeholder={tModal("modal.placeholders.password")}
                        value={password}
                        onChange={setPassword}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id={fieldId("name")}
                        label={tModal("modal.fields.name")}
                        autoComplete="name"
                        placeholder={tModal("modal.placeholders.name")}
                        value={name}
                        onChange={setName}
                      />
                      <FormInput
                        id={fieldId("company")}
                        label={tModal("modal.fields.company")}
                        autoComplete="organization"
                        placeholder={tModal("modal.placeholders.company")}
                        value={company}
                        onChange={(value) => {
                          setCompany(value);
                          if (fieldErrors.company) setFieldErrors((p) => ({ ...p, company: undefined }));
                        }}
                        error={fieldErrors.company}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput
                        id={fieldId("mobile")}
                        type="tel"
                        label={tModal("modal.fields.mobileNumber")}
                        autoComplete="tel"
                        placeholder={tModal("modal.placeholders.mobileNumber")}
                        value={mobileNumber}
                        onChange={(value) => {
                          setMobileNumber(value);
                          if (fieldErrors.mobile) setFieldErrors((p) => ({ ...p, mobile: undefined }));
                        }}
                        error={fieldErrors.mobile}
                      />
                      <FormInput
                        id={fieldId("email")}
                        type="email"
                        label={tModal("modal.fields.email")}
                        autoComplete="email"
                        placeholder={tModal("modal.placeholders.email")}
                        value={email}
                        onChange={setEmail}
                      />
                    </div>

                    {submitError && (
                      <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {submitError}
                      </p>
                    )}

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
                          {tModal("modal.redirecting")}
                        </>
                      ) : (
                        <>
                          {t(`${product}.startFreeTrial`)}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {tModal("modal.terms")}{" "}
                      <a
                        href="https://propertycareapp.com/terms-conditions-propertycareapp/"
                        className="underline hover:text-foreground"
                      >
                        {tModal("modal.termsOfService")}
                      </a>{" "}
                      {tModal("modal.and")}{" "}
                      <a href="https://propertycareapp.com/privacy-policy/" className="underline hover:text-foreground">
                        {tModal("modal.privacyPolicy")}
                      </a>
                    </p>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

type FormInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
  type?: string;
  error?: string;
};

function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  type = "text",
  error,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary"
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
