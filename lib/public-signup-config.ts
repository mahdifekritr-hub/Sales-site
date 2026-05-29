export type SignupProduct = "sales" | "maintenance" | "assets" | "communication";

const SIGNUP_PRODUCTS: SignupProduct[] = ["sales", "maintenance", "assets", "communication"];

export function parseSignupProduct(value: unknown): SignupProduct {
  if (typeof value === "string" && SIGNUP_PRODUCTS.includes(value as SignupProduct)) {
    return value as SignupProduct;
  }
  return "sales";
}

function parsePositiveInt(name: string): number | null {
  const raw = process.env[name]?.trim();
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

const ROLE_ENV_BY_PRODUCT: Record<SignupProduct, { en: string; tr: string }> = {
  sales: {
    en: "PUBLIC_SIGNUP_ROLE_SALES_EN",
    tr: "PUBLIC_SIGNUP_ROLE_SALES_TR",
  },
  maintenance: {
    en: "PUBLIC_SIGNUP_ROLE_MAINTENANCE_EN",
    tr: "PUBLIC_SIGNUP_ROLE_MAINTENANCE_TR",
  },
  assets: {
    en: "PUBLIC_SIGNUP_ROLE_ASSETS_EN",
    tr: "PUBLIC_SIGNUP_ROLE_ASSETS_TR",
  },
  communication: {
    en: "PUBLIC_SIGNUP_ROLE_COMMUNICATION_EN",
    tr: "PUBLIC_SIGNUP_ROLE_COMMUNICATION_TR",
  },
};

function pickRole(product: SignupProduct, isTr: boolean): number | null {
  const keys = ROLE_ENV_BY_PRODUCT[product];
  const productRole = parsePositiveInt(isTr ? keys.tr : keys.en);
  if (productRole != null) return productRole;

  return parsePositiveInt(isTr ? "PUBLIC_SIGNUP_ROLE_TR" : "PUBLIC_SIGNUP_ROLE_EN");
}

function pickLanguage(isTr: boolean): number | null {
  return parsePositiveInt(
    isTr ? "PUBLIC_SIGNUP_LANGUAGE_ID_TR" : "PUBLIC_SIGNUP_LANGUAGE_ID_EN",
  );
}

export function resolveSignupRoleAndLanguage(
  product: SignupProduct,
  locale: string,
): { role: number; language: number } | null {
  const isTr = locale.toLowerCase().startsWith("tr");
  const role = pickRole(product, isTr);
  const language = pickLanguage(isTr);
  if (role == null || language == null) return null;
  return { role, language };
}
