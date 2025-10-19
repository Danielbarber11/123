import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">התשלום בוטל</h1>
      <p>לא בוצע חיוב. אפשר לחזור לעגלה ולנסות שוב.</p>
      <Link href="/cart" className="underline">חזרה לעגלה</Link>
    </div>
  );
}
