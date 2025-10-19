"use client";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="rounded border border-black/10 dark:border-white/10 p-3 flex flex-col">
      <div className="relative w-full h-48 bg-black/5 rounded overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="mt-3 flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-semibold">
          {(product.priceCents / 100).toLocaleString(undefined, {
            style: "currency",
            currency: product.currency.toUpperCase(),
          })}
        </span>
        <button
          onClick={() => addItem(product.id, 1)}
          className="px-3 py-1.5 rounded bg-black text-white dark:bg-white dark:text-black text-sm"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
