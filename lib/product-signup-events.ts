import type { SignupProduct } from "@/lib/public-signup-config";

export const PRODUCT_SIGNUP_OPEN_EVENT = "product-signup:open";

export type ProductSignupOpenDetail = {
  product: SignupProduct;
};
