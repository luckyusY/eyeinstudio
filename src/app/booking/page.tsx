import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book a Session",
  description: "Request photography coverage for your conference, event or training in Kigali.",
};

export default function BookingPage() {
  return (
    <section className="min-h-screen bg-[color:var(--background)] px-4 pb-24 pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-center">Reserve your date</p>
        <h1 className="display mt-4 text-center text-6xl">Let&apos;s create together.</h1>
        <p className="mx-auto mb-10 mt-5 max-w-xl text-center leading-7 text-[color:var(--muted)]">
          Tell us what you&apos;re planning. We&apos;ll confirm availability, shape the right package and guide you from there.
        </p>
        <BookingForm />
      </div>
    </section>
  );
}
