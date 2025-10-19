import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dropshipping Shop",
  description: "Modern store with secure Stripe checkout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="mx-auto max-w-6xl px-4 py-6">
          <header className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-semibold">החנות</Link>
            <nav className="flex items-center gap-4">
              <Link href="/cart" className="underline">עגלה</Link>
              <Link href="/orders" className="underline">הזמנות</Link>
            </nav>
          </header>
          <CartProvider>
            <main>{children}</main>
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
