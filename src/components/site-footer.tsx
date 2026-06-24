import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-[color:var(--line)] bg-[color:var(--surface-muted)] py-20">
      <div className="container-wide grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="display text-3xl text-[color:var(--foreground)]">Eye in Studio</p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-[color:var(--muted)]">
            Corporate event, conference and editorial photography by Patience Rucas — crafted in Kigali, delivered worldwide.
          </p>
        </div>
        <div>
          <p className="eyebrow">Visit</p>
          <p className="mt-5 flex gap-3 text-sm text-[color:var(--foreground)]">
            <MapPin className="size-4 mt-0.5 text-[color:var(--accent)]" /> Remera, Kigali, Rwanda
          </p>
          <p className="mt-3 text-sm text-[color:var(--muted)]">Mon–Sat · 8:00–19:00</p>
        </div>
        <div>
          <p className="eyebrow">Talk to us</p>
          <a className="mt-5 flex gap-3 text-sm text-[color:var(--foreground)] hover:text-[color:var(--accent)]" href="tel:+250788000000">
            <Phone className="size-4 mt-0.5 text-[color:var(--accent)]" /> +250 788 000 000
          </a>
          <a className="mt-3 flex gap-3 text-sm text-[color:var(--foreground)] hover:text-[color:var(--accent)]" href="mailto:hello@eyeinstudio.com">
            <Mail className="size-4 mt-0.5 text-[color:var(--accent)]" /> hello@eyeinstudio.com
          </a>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[color:var(--foreground)]">
            <Link href="/portfolio" className="hover:text-[color:var(--accent)]">Portfolio</Link>
            <Link href="/services" className="hover:text-[color:var(--accent)]">Services</Link>
            <Link href="/booking" className="hover:text-[color:var(--accent)]">Book a session</Link>
            <Link href="/print" className="hover:text-[color:var(--accent)]">Order prints</Link>
            <a
              className="flex items-center gap-2 hover:text-[color:var(--accent)]"
              href="https://www.flickr.com/photos/eyeinstudio/albums/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera className="size-4" /> Flickr archive
            </a>
          </div>
        </div>
      </div>
      <div className="container-wide mt-14 flex flex-col gap-3 border-t border-[color:var(--line)] pt-7 text-xs text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Eye in Studio. All moments reserved.</span>
        <span>Photography by Patience Rucas</span>
      </div>
    </footer>
  );
}
