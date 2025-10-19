import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">תודה על הרכישה!</h1>
      <p>האישור נשלח למייל שלך. ניצור קשר כשמשלוח יצא.</p>
      <Link href="/" className="underline">חזרה לחנות</Link>
    </div>
  );
}
