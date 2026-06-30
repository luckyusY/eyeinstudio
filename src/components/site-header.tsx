"use client";

import Link from "next/link";
import { Camera, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const links: ReadonlyArray<readonly [string, string]> = [
  ["Fashion", "/portfolio"],
  ["Modelling", "/portfolio"],
  ["Headshots", "/services#headshots"],
  ["Branding", "/services#branding"],
  ["Maternity", "/portfolio"],
  ["Family", "/portfolio"],
  ["Corporate", "/services"],
  ["Pricing", "/services#pricing"],
  ["Contact", "/#contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white px-4 pb-8 pt-7 sm:px-8 lg:px-12">
      <div className="flex items-start justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="ella-logo whitespace-nowrap text-[clamp(2.4rem,5.9vw,5.35rem)] uppercase leading-[.74] tracking-[-.085em] text-black"
          aria-label="Eyein Studio home"
        >
          Eyein Studio
        </Link>

        <div className="flex items-start gap-5">
          <nav className="hidden max-w-[44rem] flex-wrap items-start justify-end gap-x-6 gap-y-2 pt-2 text-right lg:flex">
            {links.map(([label, href]) => (
              <Link key={`${label}-${href}`} href={href} className="text-[15px] font-medium leading-none text-black transition hover:opacity-55">
                {label}
              </Link>
            ))}
          </nav>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden pt-1 text-black transition hover:opacity-55 lg:block"
          >
            <Camera className="size-7 stroke-[2.2]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="pt-1 text-black lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-8" /> : <Menu className="size-8" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-black/15 pt-6 text-[17px] font-medium text-black">
              {links.map(([label, href]) => (
                <Link key={`${label}-mobile`} href={href} onClick={() => setOpen(false)} className="transition hover:opacity-55">
                  {label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
