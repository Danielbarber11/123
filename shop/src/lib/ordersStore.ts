import { promises as fs } from "fs";
import path from "path";
import type { OrderRecord } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const ordersFile = path.join(dataDir, "orders.json");

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(ordersFile);
  } catch {
    await fs.writeFile(ordersFile, JSON.stringify([]), "utf8");
  }
}

export async function getOrders(): Promise<OrderRecord[]> {
  await ensureDataFile();
  const raw = await fs.readFile(ordersFile, "utf8");
  try {
    const parsed = JSON.parse(raw) as OrderRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function appendOrder(order: OrderRecord): Promise<void> {
  await ensureDataFile();
  const existing = await getOrders();
  existing.unshift(order);
  await fs.writeFile(ordersFile, JSON.stringify(existing, null, 2), "utf8");
}
