export const PRODUCT_NAV_ITEMS = [
  { key: "maintenance", href: "/facilities-maintenance-software" },
  { key: "assetsParts", href: "/property-asset-part-management-software" },
  { key: "communication", href: "/communication-property-software" },
  { key: "salesRentals", href: "/real-estate-software" },
] as const;

export type ProductNavKey = (typeof PRODUCT_NAV_ITEMS)[number]["key"];
