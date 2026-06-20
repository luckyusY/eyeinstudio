import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
export function SiteFooter() {
  return <footer id="contact" className="border-t hairline bg-[#070706] py-16"><div className="container-shell grid gap-12 md:grid-cols-2 lg:grid-cols-4">
    <div><p className="display text-3xl">Eye in Studio</p><p className="mt-4 max-w-xs text-sm leading-7 text-stone-400">Photography, printing and finishing—crafted under one roof in the heart of Kigali.</p></div>
    <div><p className="eyebrow">Visit us</p><p className="mt-5 flex gap-3 text-sm text-stone-300"><MapPin className="size-4 text-gold" /> Remera, Kigali, Rwanda</p><p className="mt-3 text-sm text-stone-500">Mon–Sat · 8:00–19:00</p></div>
    <div><p className="eyebrow">Talk to us</p><a className="mt-5 flex gap-3 text-sm text-stone-300" href="tel:+250788000000"><Phone className="size-4 text-gold" /> +250 788 000 000</a><a className="mt-3 flex gap-3 text-sm text-stone-300" href="mailto:hello@eyeinstudio.com"><Mail className="size-4 text-gold" /> hello@eyeinstudio.com</a></div>
    <div><p className="eyebrow">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-stone-300"><Link href="/portfolio">Portfolio</Link><Link href="/booking">Book a session</Link><Link href="/print">Order prints</Link><a className="flex items-center gap-2" href="#"><Camera className="size-4"/> Instagram</a></div></div>
  </div><div className="container-shell mt-14 border-t hairline pt-7 text-xs text-stone-600">© {new Date().getFullYear()} Eye in Studio. All moments reserved.</div></footer>;
}
