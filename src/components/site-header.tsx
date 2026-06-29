"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links: ReadonlyArray<readonly [string, string]> = [
  ["Fashion", "/portfolio"],
  ["Headshots", "/services#headshots"],
  ["Branding", "/services#branding"],
  ["Events", "/services"],
  ["Gallery", "/portfolio"],
  ["Pricing", "/services#pricing"],
  ["Print", "/print"],
  ["Contact", "/#contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[color:var(--background)]/94 shadow-[0_1px_0_var(--line)] backdrop-blur" : "bg-[color:var(--background)]/76 backdrop-blur"
      }`}
    >
      <div className="container-wide flex h-[86px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex flex-col leading-none">
            <strong className="display text-[1.7rem] tracking-[-.04em] text-[color:var(--foreground)]">EyeinStudio</strong>
            <small className="mt-1 text-[9px] uppercase tracking-[.32em] text-[color:var(--muted)]">Portraits · Events · Kigali</small>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-6 xl:flex">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="group relative text-[10px] font-semibold uppercase tracking-[.2em] text-[color:var(--foreground)]"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--foreground)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Link href="/booking" className="btn-primary hidden !min-h-10 !px-5 !py-2 !text-[10px] md:inline-flex">
          Book now
        </Link>

        <button
          className="text-[color:var(--foreground)] xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--background)] xl:hidden"
          >
            <div className="container-wide grid grid-cols-2 gap-4 py-6">
              {links.map(([label, href], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.04 }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-[12px] font-semibold uppercase tracking-[.18em] text-[color:var(--foreground)]"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/booking" className="btn-primary col-span-2 mt-2" onClick={() => setOpen(false)}>
                Book a session
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
