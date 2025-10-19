"use client";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import { getProductById } from "@/lib/products";

export default function CartPage() {
  const { items, totalCents, setQuantity, removeItem, clear } = useCart();
  const currency = "USD";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <div key={item.productId} className="flex items-center gap-4 border-b border-black/10 dark:border-white/10 pb-4">
                <div className="relative w-20 h-20 rounded overflow-hidden bg-black/5">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-black/60 dark:text-white/60">
                    {(product.priceCents / 100).toLocaleString(undefined, { style: "currency", currency })}
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => setQuantity(item.productId, Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1 bg-transparent"
                />
                <button className="text-red-600" onClick={() => removeItem(item.productId)}>
                  Remove
                </button>
              </div>
            );
          })}
          <div className="flex items-center justify-between pt-4">
            <div className="text-lg font-semibold">
              Total: {(totalCents / 100).toLocaleString(undefined, { style: "currency", currency })}
            </div>
            <div className="flex gap-3">
              <form action="/api/checkout" method="POST">
                <button className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black" type="submit">
                  Checkout with Stripe
                </button>
              </form>
              <button className="px-4 py-2 rounded border" onClick={clear}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
