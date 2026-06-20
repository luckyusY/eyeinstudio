"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [["Services", "/services"], ["Portfolio", "/portfolio"], ["Print", "/print"], ["About", "/#about"], ["Contact", "/#contact"]];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-[#090908]/88 backdrop-blur-xl">
    <div className="container-shell flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="grid size-10 place-items-center border border-gold text-gold display text-xl">E</span><span><strong className="display block text-xl leading-none">Eye in Studio</strong><small className="text-[9px] uppercase tracking-[.22em] text-stone-400">Kigali · Rwanda</small></span></Link>
      <nav className="hidden items-center gap-7 lg:flex">{links.map(([label, href]) => <Link className="text-xs uppercase tracking-[.13em] text-stone-300 transition hover:text-gold-light" href={href} key={label}>{label}</Link>)}<Link href="/booking" className="gold-button !min-h-10 !px-5">Book a session</Link></nav>
      <button className="text-gold lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="container-shell flex flex-col gap-5 border-t hairline py-7 lg:hidden">{links.map(([label, href]) => <Link href={href} key={label} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/booking" className="gold-button" onClick={() => setOpen(false)}>Book a session</Link></nav>}
  </header>;
}
