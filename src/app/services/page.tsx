import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Portrait, branding, event and conference photography services in Kigali.",
};

const services = [
  {
    id: "headshots",
    title: "Headshots",
    copy: "Clean, directed portraits for teams, founders, speakers and professionals who need strong profile imagery.",
    image: "/portfolio/azam-dinner-feb-2025/55151721221.jpg",
  },
  {
    id: "branding",
    title: "Branding",
    copy: "Personal brand and campaign imagery for businesses, launches, proposals and everyday communication.",
    image: "/portfolio/center-for-development-policy-feb-2026/55152117310.jpg",
  },
  {
    id: "events",
    title: "Corporate Events",
    copy: "Discreet coverage of conferences, panels, launches, trainings, dinners and recognition moments.",
    image: "/portfolio/iaom-mea-2025-day-1/55151805584.jpg",
  },
  {
    id: "projects",
    title: "Projects",
    copy: "On-location visual stories for site visits, construction updates, donor reports and project documentation.",
    image: "/portfolio/azam-s-staff-housing-project-2025/55151919389.jpg",
  },
] as const;

const packages = [
  ["Portrait Session", "From RWF 150,000", "Guided session, one look, private gallery and edited selects."],
  ["Brand Story", "From RWF 350,000", "Half-day coverage with portraits, details and workspace/lifestyle imagery."],
  ["Event Day", "From RWF 450,000", "Full-day event coverage with same-day selects and an edited gallery."],
] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white px-4 pb-14 pt-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[34%_1fr]">
          <div>
            <h1 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[.82] tracking-[-.07em] text-black">
              Services
            </h1>
            <p className="mt-8 max-w-[24rem] text-[16px] font-bold leading-[1.35] text-black">
              Photography for people, brands and the rooms where important work happens.
            </p>
            <p className="mt-5 max-w-[25rem] text-[14px] font-medium leading-[1.45] text-black">
              Each shoot is planned around clarity: what you need the images for, where they will live, and how fast they need to
              be delivered.
            </p>
          </div>
          <div className="relative min-h-[430px] overflow-hidden bg-neutral-100">
            <Image
              src="/portfolio/forever-success-day-2026/55150920597.jpg"
              alt="Eyein Studio awards and event photography"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-black/25 bg-white px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {services.map((service) => (
            <article id={service.id} key={service.id} className="scroll-mt-8">
              <div className="relative aspect-[1.85/1] overflow-hidden bg-neutral-100">
                <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <h2 className="mt-5 text-[28px] font-black uppercase tracking-[-.04em] text-black">{service.title}</h2>
              <p className="mt-3 max-w-[34rem] text-[14px] font-medium leading-[1.45] text-black">{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-t border-black/25 bg-white px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[34%_1fr]">
          <div>
            <h2 className="text-[36px] font-black uppercase leading-none tracking-[-.05em] text-black">Pricing</h2>
            <p className="mt-5 max-w-[24rem] text-[14px] font-medium leading-[1.45] text-black">
              Use these as starting points. Final quotes depend on location, timing, delivery speed and team size.
            </p>
          </div>
          <div className="grid gap-px bg-black/25 md:grid-cols-3">
            {packages.map(([name, price, description]) => (
              <article key={name} className="bg-white p-6">
                <h3 className="text-[22px] font-black uppercase tracking-[-.04em] text-black">{name}</h3>
                <p className="mt-4 text-[13px] font-bold text-black">{price}</p>
                <p className="mt-5 min-h-20 text-[13px] font-medium leading-[1.45] text-black">{description}</p>
                <Link href="/booking" className="mt-7 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.08em] text-black">
                  Book this <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
