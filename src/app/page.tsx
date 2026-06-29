import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Check, Sparkles } from "lucide-react";
import { services, stats } from "@/lib/site-data";
import { albums, allPhotos } from "@/lib/portfolio-data";
import { HeroSlider } from "@/components/hero-slider";
import { Reveal } from "@/components/reveal";

const studioServices = [
  {
    id: "headshots",
    label: "01",
    title: "Headshots & portraits",
    copy: "Clean portraits for founders, speakers, teams and creatives — guided, flattering and ready for web, press and LinkedIn.",
    imageSlug: "iaom-mea-2025-day-1",
  },
  {
    id: "branding",
    label: "02",
    title: "Personal branding",
    copy: "Editorial-looking image sets for campaigns, launches, proposals and the everyday visual language of your business.",
    imageSlug: "center-for-development-policy-feb-2026",
  },
  {
    id: "events",
    label: "03",
    title: "Events & conferences",
    copy: "A full visual record of the room: keynotes, guests, candid interactions, details and fast selects for live communications.",
    imageSlug: "iaom-mea-2025-day-2",
  },
] as const;

const packages = [
  ["Essential", "Studio portrait session", "Guided shoot, 8 edited images, private online gallery"],
  ["Brand Story", "Personal brand coverage", "Half-day shoot, multiple looks, 35 edited images"],
  ["Event Day", "Corporate event coverage", "Up to 8 hours, same-day selects, full edited gallery"],
] as const;

function photoFromAlbum(slug: string, fallback: number) {
  return albums.find((album) => album.slug === slug)?.photos[0]?.src ?? allPhotos[fallback]?.src ?? "";
}

function pickFeatured(count: number) {
  const seen = new Set<string>();
  const picks: typeof allPhotos = [];
  for (const album of albums) {
    const photo = album.photos[0];
    if (!photo || seen.has(photo.id)) continue;
    seen.add(photo.id);
    picks.push({ ...photo, album: album.title, albumSlug: album.slug });
    if (picks.length >= count) return picks;
  }
  return picks;
}

export default function Home() {
  const featured = pickFeatured(8);
  const welcomeImage = featured[2]?.src ?? allPhotos[0]?.src ?? "";

  return (
    <>
      <HeroSlider />

      <section className="border-y border-[color:var(--line)] bg-[color:var(--background)] py-4">
        <div className="container-wide flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] font-semibold uppercase tracking-[.22em] text-[color:var(--muted)]">
          {["Fashion-inspired portraits", "Corporate events", "Branding imagery", "Studio-quality edits", "Kigali based"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section id="services-intro" className="bg-[color:var(--background)] py-24 lg:py-32">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Welcome to EyeinStudio</p>
            <h2 className="display mt-5 max-w-3xl text-5xl leading-[.98] sm:text-7xl">
              A refined photography studio for people, brands and unforgettable rooms.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              Inspired by the clean, image-first polish of premium portrait studios, EyeinStudio blends calm direction with
              documentary instinct: expressive portraits, brand imagery and event coverage that feels timeless rather than trendy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/booking" className="btn-primary">
                Book a session <ArrowRight className="size-4" />
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                View gallery
              </Link>
            </div>
          </Reveal>

          <Reveal className="relative min-h-[620px] overflow-hidden bg-[color:var(--surface-muted)]">
            {welcomeImage && (
              <Image
                src={welcomeImage}
                alt="EyeinStudio portrait and event photography"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <div className="absolute bottom-6 left-6 right-6 border border-white/40 bg-white/84 p-6 backdrop-blur">
              <p className="display text-3xl">Classic light. Modern direction.</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">Portrait polish with documentary honesty.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--surface-muted)] py-20">
        <Reveal stagger className="container-shell grid grid-cols-2 gap-px bg-[color:var(--line)] md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[color:var(--surface)] p-7 text-center">
              <p className="display text-5xl text-[color:var(--foreground)] sm:text-6xl">{s.value}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[.2em] text-[color:var(--muted)]">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="bg-[color:var(--background)] py-24 lg:py-32">
        <div className="container-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Photography sessions</p>
            <h2 className="display mt-4 text-5xl leading-none sm:text-7xl">Choose your story.</h2>
            <p className="mt-5 leading-8 text-[color:var(--muted)]">
              A studio-style service menu for portraits and brands, plus the event expertise EyeinStudio is known for.
            </p>
          </Reveal>

          <div className="mt-16 space-y-14">
            {studioServices.map((item, index) => {
              const image = photoFromAlbum(item.imageSlug, index);
              return (
                <Reveal
                  key={item.title}
                  id={item.id}
                  className={`grid items-center gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="relative min-h-[560px] overflow-hidden bg-[color:var(--surface-muted)]">
                    {image && (
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-700 hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="px-0 lg:px-10">
                    <span className="font-mono text-xs text-[color:var(--soft)]">{item.label}</span>
                    <h3 className="display mt-5 text-5xl leading-none sm:text-6xl">{item.title}</h3>
                    <p className="mt-6 max-w-lg text-base leading-8 text-[color:var(--muted)]">{item.copy}</p>
                    <Link href="/services" className="btn-link mt-8">
                      Discover more <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[color:var(--foreground)] py-24 text-white lg:py-32">
        <div className="container-shell">
          <Reveal className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="eyebrow !text-white/60">Sessions & packages</p>
              <h2 className="display mt-4 text-5xl leading-none sm:text-6xl">Simple starting points.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/72">
              Packages are intentionally flexible. Start with the closest option, then we tailor coverage, retouching and delivery
              to your project.
            </p>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-px bg-white/18 lg:grid-cols-3">
            {packages.map(([name, title, description]) => (
              <article key={name} className="bg-[color:var(--foreground)] p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/52">{name}</p>
                <h3 className="display mt-8 text-4xl">{title}</h3>
                <p className="mt-4 min-h-16 text-sm leading-7 text-white/68">{description}</p>
                <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[.16em] text-white/82">
                  <Check className="size-4" /> Tailored quote
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--background)] py-24 lg:py-32">
        <div className="container-wide">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 px-0 md:px-6">
            <div>
              <p className="eyebrow">Recent gallery</p>
              <h2 className="display mt-4 text-5xl sm:text-7xl">The archive, styled simply.</h2>
            </div>
            <Link href="/portfolio" className="btn-ghost">
              Open gallery <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal stagger className="mt-12 grid auto-rows-[220px] gap-3 md:grid-cols-4 lg:auto-rows-[270px]">
            {featured.slice(0, 8).map((item, index) => (
              <Link
                href="/portfolio"
                key={item.id}
                className={`group relative overflow-hidden bg-[color:var(--surface-muted)] ${
                  index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Image
                  src={item.src}
                  fill
                  alt={item.album}
                  sizes={index === 0 || index === 5 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/22" />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="about" className="border-y border-[color:var(--line)] bg-[color:var(--surface-muted)] py-20">
        <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">The studio approach</p>
            <h2 className="display mt-4 text-5xl leading-none sm:text-6xl">Soft direction. Sharp delivery.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="flex gap-4 border-t border-[color:var(--line)] pt-5">
                  <Camera className="mt-1 size-4 shrink-0 text-[color:var(--foreground)]" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[.12em]">{service.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="bg-[color:var(--background)] py-24 text-center lg:py-32">
        <Reveal className="container-shell">
          <Sparkles className="mx-auto size-6 text-[color:var(--soft)]" />
          <p className="eyebrow mt-5">Ready when you are</p>
          <h2 className="display mx-auto mt-4 max-w-4xl text-5xl leading-none sm:text-7xl">
            Let’s make imagery that still feels beautiful years from now.
          </h2>
          <Link href="/booking" className="btn-primary mt-9">
            Start your booking <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
