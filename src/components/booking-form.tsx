"use client";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const labelClass = "text-xs uppercase tracking-[.16em] text-[color:var(--muted)]";

export function BookingForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      form.reset();
      setState("done");
    } else setState("error");
  }

  if (state === "done")
    return (
      <div className="panel p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-[color:var(--accent)]" />
        <h2 className="display mt-5 text-3xl">Your request is in.</h2>
        <p className="mt-3 text-[color:var(--muted)]">Our team will confirm availability with you shortly.</p>
        <button className="btn-ghost mt-7" onClick={() => setState("idle")}>Make another booking</button>
      </div>
    );

  return (
    <form onSubmit={submit} className="panel grid gap-5 p-6 md:grid-cols-2 md:p-9">
      <label className={labelClass}>Full name<input required name="name" className="field mt-2" placeholder="Your name" /></label>
      <label className={labelClass}>Phone<input required name="phone" type="tel" className="field mt-2" placeholder="+250 ..." /></label>
      <label className={labelClass}>Email<input required name="email" type="email" className="field mt-2" placeholder="you@example.com" /></label>
      <label className={labelClass}>Service
        <select required name="service" className="field mt-2">
          <option value="">Choose a service</option>
          <option>Conference / summit</option>
          <option>Corporate event</option>
          <option>Gala or dinner</option>
          <option>Training / workshop</option>
          <option>Consultation</option>
        </select>
      </label>
      <label className={labelClass}>Preferred date<input required name="date" type="date" min={new Date().toISOString().split("T")[0]} className="field mt-2" /></label>
      <label className={labelClass}>Preferred time<input required name="time" type="time" className="field mt-2" /></label>
      <label className={`${labelClass} md:col-span-2`}>Tell us more
        <textarea name="notes" className="field mt-2 min-h-28 resize-y" placeholder="Event format, agenda, expected guests..." />
      </label>
      {state === "error" && (
        <p className="text-sm text-red-600 md:col-span-2">
          We couldn&apos;t save that request. Please check the details and try again.
        </p>
      )}
      <button disabled={state === "loading"} className="btn-primary md:col-span-2">
        {state === "loading" ? <Loader2 className="animate-spin" /> : <CalendarDays className="size-4" />}
        {state === "loading" ? "Sending..." : "Request your date"}
      </button>
    </form>
  );
}
