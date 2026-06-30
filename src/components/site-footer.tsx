import Link from "next/link";

const footerLinks = [
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Pricing", "/services#pricing"],
  ["Book a session", "/booking"],
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-[#777] px-4 py-10 text-white sm:px-8 lg:px-12">
      <div className="grid gap-10 text-[12px] leading-[1.35] lg:grid-cols-[1fr_1fr_1.4fr]">
        <div>
          <p className="font-extrabold uppercase">Kigali Studio</p>
          <p className="mt-3">Remera, Kigali, Rwanda</p>
          <p className="mt-3 font-bold">Tel: +250 788 000 000</p>
          <p className="mt-1 font-bold">Email: hello@eyeinstudio.com</p>
        </div>

        <div>
          <p className="font-extrabold uppercase">Navigation</p>
          <div className="mt-3 flex flex-col items-start gap-2 uppercase underline underline-offset-2">
            {footerLinks.map(([label, href]) => (
              <Link key={label} href={href} className="transition hover:text-black">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="ella-logo text-4xl uppercase leading-none tracking-[-.07em]">Eyein Studio</p>
          <p className="mt-5 max-w-md">
            Portrait, branding and event photography in Kigali. Classic, image-first and calmly directed.
          </p>
          <p className="mt-6 text-white/80">© {new Date().getFullYear()} Eyein Studio</p>
        </div>
      </div>
    </footer>
  );
}
