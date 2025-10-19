import type { Product } from "@/lib/types";

export const PRODUCTS: Product[] = [
  {
    id: "smartwatch",
    name: "Smartwatch Pro",
    description: "Fitness tracking, notifications, and sleek design.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200&auto=format&fit=crop&q=60",
    priceCents: 12900,
    currency: "usd",
  },
  {
    id: "wireless-earbuds",
    name: "Wireless Earbuds",
    description: "Noise isolation and 24h battery life with case.",
    image: "https://images.unsplash.com/photo-1585386959984-a4155223168f?w=1200&auto=format&fit=crop&q=60",
    priceCents: 5900,
    currency: "usd",
  },
  {
    id: "travel-backpack",
    name: "Travel Backpack",
    description: "Carry-on friendly with laptop sleeve and organizers.",
    image: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=1200&auto=format&fit=crop&q=60",
    priceCents: 8900,
    currency: "usd",
  },
  {
    id: "insulated-bottle",
    name: "Insulated Bottle",
    description: "Keeps drinks cold 24h or hot 12h.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&auto=format&fit=crop&q=60",
    priceCents: 2900,
    currency: "usd",
  },
  {
    id: "action-camera",
    name: "Action Camera 4K",
    description: "Stabilized 4K video with waterproof housing.",
    image: "https://images.unsplash.com/photo-1526178612305-8b7b2b3c71ff?w=1200&auto=format&fit=crop&q=60",
    priceCents: 17900,
    currency: "usd",
  },
  {
    id: "drone-mini",
    name: "Mini Drone",
    description: "Lightweight drone with HD camera and GPS.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&auto=format&fit=crop&q=60",
    priceCents: 23900,
    currency: "usd",
  },
];

export function getProductById(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}
