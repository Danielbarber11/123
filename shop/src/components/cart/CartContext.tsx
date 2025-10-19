"use client";
import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import type { CartItem, Product } from "@/lib/types";
import { getProductById } from "@/lib/products";

export type CartContextValue = {
  items: CartItem[];
  totalCents: number;
  products: Record<string, Product>;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "shop_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const productsMap = useMemo(() => {
    const map: Record<string, Product> = {};
    for (const item of items) {
      const product = getProductById(item.productId);
      if (product) map[item.productId] = product;
    }
    return map;
  }, [items]);

  const totalCents = useMemo(
    () => items.reduce((sum, item) => {
      const p = getProductById(item.productId);
      return sum + (p ? p.priceCents * item.quantity : 0);
    }, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalCents,
      products: productsMap,
      addItem: (productId, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === productId);
          if (existing) {
            return prev.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
            );
          }
          return [...prev, { productId, quantity }];
        });
      },
      removeItem: (productId) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
      },
      setQuantity: (productId, quantity) => {
        setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
      },
      clear: () => setItems([]),
    }),
    [items, totalCents, productsMap]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
