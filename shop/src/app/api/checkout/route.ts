import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PRODUCTS, getProductById } from "@/lib/products";
import type { CartItem } from "@/lib/types";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();

    const formData = await req.formData();
    const rawItems = formData.get("items");
    let items: CartItem[] | null = null;
    if (typeof rawItems === "string") {
      try {
        const parsed = JSON.parse(rawItems) as CartItem[];
        if (Array.isArray(parsed)) items = parsed;
      } catch {}
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "http://localhost:3000";

    const selected = items && items.length > 0 ? items : PRODUCTS.map((p) => ({ productId: p.id, quantity: 1 }));

    const lineItems = selected
      .map((ci): Stripe.Checkout.SessionCreateParams.LineItem | null => {
        const p = getProductById(ci.productId);
        if (!p) return null;
        return {
          price_data: {
            currency: p.currency,
            product_data: { name: p.name, images: [p.image] },
            unit_amount: p.priceCents,
          },
          quantity: Math.max(1, ci.quantity),
        };
      })
      .filter((li): li is Stripe.Checkout.SessionCreateParams.LineItem => Boolean(li));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      shipping_address_collection: { allowed_countries: ["US", "IL", "GB", "DE", "FR", "CA", "AU"] },
      automatic_tax: { enabled: false },
    });

    return NextResponse.redirect(session.url as string, { status: 303 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
