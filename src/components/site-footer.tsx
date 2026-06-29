import Link from "next/link";
import { Camera, Mail, MapPin, Phone, Sparkles } from "lucide-react";

const columns = [
  {
    title: "Sessions",
    links: [
      ["Fashion", "/portfolio"],
      ["Headshots", "/services#headshots"],
      ["Branding", "/services#branding"],
      ["Events", "/services"],
    ],
  },
  {
    title: "Studio",
    links: [
      ["Gallery", "/portfolio"],
      ["Pricing", "/services#pricing"],
      ["Book now", "/booking"],
      ["Print order", "/print"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-[color:var(--line)] bg-[color:var(--foreground)] text-white">
      <div className="container-wide grid gap-12 py-20 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
        <div>
          <p className="display text-5xl tracking-[-.05em]">EyeinStudio</p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/66">
            Portrait, branding and event photography in Kigali — classic, image-first and calmly directed.
          </p>
          <Link href="/booking" className="mt-8 inline-flex border border-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[.2em] transition hover:bg-white hover:text-[color:var(--foreground)]">
            Book a session
          </Link>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/48">{column.title}</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/78">
              {column.links.map(([label, href]) => (
                <Link key={label} href={href} className="transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/48">Contact</p>
          <div className="mt-5 space-y-4 text-sm text-white/78">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 text-white/52" /> Remera, Kigali, Rwanda
            </p>
            <a className="flex gap-3 transition hover:text-white" href="tel:+250788000000">
              <Phone className="mt-0.5 size-4 text-white/52" /> +250 788 000 000
            </a>
            <a className="flex gap-3 transition hover:text-white" href="mailto:hello@eyeinstudio.com">
              <Mail className="mt-0.5 size-4 text-white/52" /> hello@eyeinstudio.com
            </a>
            <a
              className="flex gap-3 transition hover:text-white"
              href="https://www.flickr.com/photos/eyeinstudio/albums/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera className="mt-0.5 size-4 text-white/52" /> Flickr archive
            </a>
            <a className="flex gap-3 transition hover:text-white" href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <Sparkles className="mt-0.5 size-4 text-white/52" /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="container-wide flex flex-col gap-3 border-t border-white/12 py-7 text-xs text-white/48 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} EyeinStudio. All moments reserved.</span>
        <span>Designed for timeless photography, not disposable trends.</span>
      </div>
    </footer>
  );
}
