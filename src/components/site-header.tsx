"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links: ReadonlyArray<readonly [string, string]> = [
  ["Portfolio", "/portfolio"],
  ["Services", "/services"],
  ["Print", "/print"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-[color:var(--line)] bg-[color:var(--background)]/92 backdrop-blur" : "border-transparent bg-[color:var(--background)]/65 backdrop-blur"
      }`}
    >
      <div className="container-wide flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center border border-[color:var(--foreground)] text-[color:var(--foreground)] display text-lg leading-none">E</span>
          <span className="flex flex-col leading-none">
            <strong className="display text-xl text-[color:var(--foreground)]">Eye in Studio</strong>
            <small className="mt-0.5 text-[9px] uppercase tracking-[.24em] text-[color:var(--muted)]">Kigali · Rwanda</small>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-[11px] font-semibold uppercase tracking-[.16em] text-[color:var(--foreground)] transition hover:text-[color:var(--accent)]"
            >
              {label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary !min-h-10 !px-5 !py-2 !text-[10px]">
            Book a session
          </Link>
        </nav>

        <button
          className="text-[color:var(--foreground)] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="container-wide flex flex-col gap-4 border-t border-[color:var(--line)] py-6 lg:hidden">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[13px] font-semibold uppercase tracking-[.16em] text-[color:var(--foreground)]"
            >
              {label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary mt-2" onClick={() => setOpen(false)}>
            Book a session
          </Link>
        </nav>
      )}
    </header>
  );
}
