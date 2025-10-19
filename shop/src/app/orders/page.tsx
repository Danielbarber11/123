import { getOrders } from "@/lib/ordersStore";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border rounded p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Order {o.id}</div>
                <div className="text-sm opacity-70">{new Date(o.createdAtISO).toLocaleString()}</div>
              </div>
              <div className="mt-2 text-sm">{o.email ?? "Unknown email"}</div>
              <div className="mt-2 text-sm">{o.shippingName ?? ""} {o.shippingCity ?? ""} {o.shippingCountry ?? ""}</div>
              <div className="mt-2">
                <div className="font-medium">Items:</div>
                <ul className="list-disc ml-5">
                  {o.lineItems.map((li, idx) => (
                    <li key={idx}>
                      {li.name} × {li.quantity} — {(Number(li.amountTotalCents ?? 0) / 100).toLocaleString(undefined, { style: "currency", currency: o.currency.toUpperCase() })}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 font-semibold">
                Total: {(o.amountTotalCents / 100).toLocaleString(undefined, { style: "currency", currency: o.currency.toUpperCase() })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
