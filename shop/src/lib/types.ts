export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  priceCents: number;
  currency: "usd" | "ils";
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderLineItem = {
  productId?: string;
  name: string;
  quantity: number;
  amountSubtotalCents?: number;
  amountTotalCents?: number;
};

export type OrderRecord = {
  id: string;
  createdAtISO: string;
  email: string | null;
  currency: string;
  amountTotalCents: number;
  lineItems: OrderLineItem[];
  shippingName?: string | null;
  shippingCity?: string | null;
  shippingCountry?: string | null;
};
