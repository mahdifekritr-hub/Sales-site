"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import type { SignupProduct } from "@/lib/public-signup-config";
import {
  PRODUCT_SIGNUP_OPEN_EVENT,
  type ProductSignupOpenDetail,
} from "@/lib/product-signup-events";

type ProductSignupTriggerProps = ComponentProps<typeof Button> & {
  product: SignupProduct;
};

export function ProductSignupTrigger({
  product,
  onClick,
  children,
  ...props
}: ProductSignupTriggerProps) {
  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        window.dispatchEvent(
          new CustomEvent<ProductSignupOpenDetail>(PRODUCT_SIGNUP_OPEN_EVENT, {
            detail: { product },
          }),
        );
      }}
    >
      {children}
    </Button>
  );
}
