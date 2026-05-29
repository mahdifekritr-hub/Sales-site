import { NextRequest, NextResponse } from "next/server";
import { parseSignupProduct, resolveSignupRoleAndLanguage } from "@/lib/public-signup-config";

const DEFAULT_API_BASE = "https://api.propertycareapp.com";

function normalizeApiBase(): string {
  const base = process.env.API_BASE_URL?.trim() || DEFAULT_API_BASE;
  return base.replace(/\/+$/, "");
}

function apiKey(): string | null {
  return (
    process.env.PUBLIC_SIGNUP_X_API_KEY?.trim() ||
    process.env.SUBSCRIPTION_API_KEY?.trim() ||
    null
  );
}

type Body = {
  username?: string;
  name?: string;
  password?: string;
  mobileNumber?: string;
  email?: string;
  new_subscription?: string;
  locale?: string;
  product?: string;
};

const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{2,14})[A-Za-z0-9]$/;

export async function POST(req: NextRequest) {
  const key = apiKey();
  if (!key) {
    return NextResponse.json(
      { message: "Missing PUBLIC_SIGNUP_X_API_KEY or SUBSCRIPTION_API_KEY" },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const locale = typeof body.locale === "string" ? body.locale : "en";
  const product = parseSignupProduct(body.product);
  const picks = resolveSignupRoleAndLanguage(product, locale);
  if (!picks) {
    return NextResponse.json(
      {
        message:
          "Missing per-product PUBLIC_SIGNUP_ROLE_* env vars, legacy PUBLIC_SIGNUP_ROLE_EN/TR, or language id env vars",
      },
      { status: 500 },
    );
  }

  const username = String(body.username ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim();
  const password = String(body.password ?? "");
  const mobileNumber = String(body.mobileNumber ?? "").trim();
  const email = String(body.email ?? "").trim();
  const new_subscription = String(body.new_subscription ?? "").trim();

  if (!username || !USERNAME_RE.test(username)) {
    return NextResponse.json(
      { message: "Invalid username. Use 4–16 letters, numbers, underscores, or hyphens." },
      { status: 400 },
    );
  }
  if (!name || name.length > 50) {
    return NextResponse.json({ message: "Please enter a valid name." }, { status: 400 });
  }
  if (!password || password.length < 1 || password.length > 50) {
    return NextResponse.json({ message: "Please enter a valid password." }, { status: 400 });
  }
  if (!mobileNumber) {
    return NextResponse.json({ message: "Please enter a valid mobile number." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (!new_subscription || new_subscription.length > 80) {
    return NextResponse.json({ message: "Please enter a company name." }, { status: 400 });
  }

  const payload: Record<string, unknown> = {
    username,
    name,
    password,
    mobileNumber,
    email,
    new_subscription,
    role: picks.role,
    language: picks.language,
    status: "active",
    image: "",
  };

  const optionalTz = process.env.PUBLIC_SIGNUP_TIME_ZONE?.trim();
  if (optionalTz) {
    payload.timeZone = optionalTz;
  }

  const url = `${normalizeApiBase()}/user/create/public`;
  const acceptLanguage = locale.toLowerCase().startsWith("tr") ? "tr" : "en";

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": key,
        "accept-language": acceptLanguage,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("[public-signup] upstream fetch failed", e);
    return NextResponse.json({ message: "Registration service unavailable." }, { status: 502 });
  }

  const text = await upstream.text();
  let parsed: unknown;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { message: text || "Unexpected response" };
  }

  if (!upstream.ok) {
    const msg =
      typeof (parsed as { message?: unknown })?.message === "string"
        ? (parsed as { message: string }).message
        : Array.isArray((parsed as { message?: unknown })?.message)
          ? String((parsed as { message: string[] }).message[0])
          : `Registration failed (${upstream.status})`;
    return NextResponse.json({ message: msg }, { status: upstream.status });
  }

  return NextResponse.json({ ok: true, data: parsed }, { status: 201 });
}
