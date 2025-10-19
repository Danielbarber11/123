import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { appendOrder } from "@/lib/ordersStore";
import type { OrderRecord, OrderLineItem } from "@/lib/types";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const rawBody = await req.text();

  let event: unknown;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  if ((event as Stripe.Event).type === "checkout.session.completed") {
    const session = (event as Stripe.Event).data.object as Stripe.Checkout.Session;
    const sessionId: string = session.id;
    const customerEmail: string | null = session.customer_details?.email ?? null;
    const currency: string = session.currency ?? "usd";
    const amountTotalCents: number = session.amount_total ?? 0;

    // Retrieve line items
    const lineItemsResp = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
    const lineItems: OrderLineItem[] = lineItemsResp.data.map((li) => ({
      name: li.description ?? "Item",
      quantity: li.quantity ?? 1,
      amountSubtotalCents: li.amount_subtotal ?? undefined,
      amountTotalCents: li.amount_total ?? undefined,
    }));

    const order: OrderRecord = {
      id: sessionId,
      createdAtISO: new Date().toISOString(),
      email: customerEmail,
      currency,
      amountTotalCents,
      lineItems,
      shippingName: session.customer_details?.name ?? null,
      shippingCity: session.customer_details?.address?.city ?? null,
      shippingCountry: session.customer_details?.address?.country ?? null,
    };

    await appendOrder(order);
  }

  return NextResponse.json({ received: true });
}

export const dynamic = "force-dynamic";