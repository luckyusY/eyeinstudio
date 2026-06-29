import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description: "Event, conference, gala and training photography services in Kigali and across East Africa.",
};

const packages = [
  {
    name: "Half-day Event",
    price: "From RWF 250,000",
    items: ["Up to 4 hours coverage", "Single photographer", "Edited gallery within 72h", "150+ delivered images"],
  },
  {
    name: "Full Conference Day",
    price: "From RWF 450,000",
    items: ["8 hours coverage", "Multi-room rotation", "Same-day selects for press", "400+ delivered images"],
  },
  {
    name: "Multi-day Coverage",
    price: "Custom quote",
    items: ["Conferences & summits", "Second photographer optional", "Daily edits during the event", "Branded gallery handover"],
  },
];

export default function ServicesPage() {
  return (
    <section className="min-h-screen bg-[color:var(--background)] pb-24 pt-36">
      <div className="container-shell">
        <p className="eyebrow">Our services</p>
        <h1 className="display mt-4 max-w-4xl text-6xl leading-[.95] sm:text-7xl">
          One studio. Every room you need photographed.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
          We cover the full corporate and conference circuit in Kigali — from main-stage plenaries to closing-night dinners
          — with consistent editorial style across every deliverable.
        </p>

        <div className="mt-16 grid gap-px bg-[color:var(--line)] md:grid-cols-2">
          {services.map((s, index) => (
            <article
              id={index === 0 ? "headshots" : index === 1 ? "branding" : undefined}
              className="scroll-mt-28 bg-[color:var(--background)] p-8 sm:p-12"
              key={s.title}
            >
              <span className="font-mono text-xs text-[color:var(--accent)]">{s.icon}</span>
              <h2 className="display mt-12 text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-md leading-7 text-[color:var(--muted)]">{s.description}</p>
            </article>
          ))}
        </div>

        <div id="pricing" className="mt-24 scroll-mt-28">
          <p className="eyebrow">Starting points</p>
          <h2 className="display mt-4 text-5xl">Simple packages, tailored to you.</h2>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {packages.map((p, i) => (
              <article
                key={p.name}
                className={`panel p-8 ${i === 1 ? "border-[color:var(--foreground)]" : ""}`}
              >
                <h3 className="display text-3xl">{p.name}</h3>
                <p className="mt-3 text-[color:var(--accent)]">{p.price}</p>
                <ul className="my-8 space-y-3 text-sm text-[color:var(--muted)]">
                  {p.items.map((x) => (
                    <li key={x}>— {x}</li>
                  ))}
                </ul>
                <Link href={i === 2 ? "/booking" : "/booking"} className="btn-ghost w-full">
                  Get started <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
