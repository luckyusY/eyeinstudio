import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Mic2, Sparkles, Users } from "lucide-react";
import { services, stats } from "@/lib/site-data";
import { albums, allPhotos } from "@/lib/portfolio-data";
import { HeroSlider } from "@/components/hero-slider";
import { Reveal } from "@/components/reveal";

const serviceIcons = [Mic2, Camera, Sparkles, Users];

function pickFeatured(count: number) {
  // One photo per album, then top up from any album.
  const seen = new Set<string>();
  const picks: { src: string; album: string; albumSlug: string; id: string; width: number; height: number }[] = [];
  for (const album of albums) {
    const p = album.photos[0];
    if (!p) continue;
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    picks.push({ ...p, album: album.title, albumSlug: album.slug });
    if (picks.length >= count) return picks;
  }
  for (const p of allPhotos) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    picks.push(p);
    if (picks.length >= count) return picks;
  }
  return picks;
}

export default function Home() {
  const featured = pickFeatured(5);
  const aboutImage = featured[3]?.src ?? "";

  return (
    <>
      <HeroSlider />

      {/* Service intro strip */}
      <section
        id="services-intro"
        className="scroll-mt-20 border-b border-[color:var(--line)] bg-[color:var(--surface)] py-7"
      >
        <div className="container-shell grid grid-cols-2 gap-5 text-[color:var(--muted)] md:grid-cols-4">
          {[
            [Mic2, "Conferences"],
            [Camera, "Corporate events"],
            [Sparkles, "Galas & dinners"],
            [Users, "Trainings"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Mic2;
            return (
              <div key={String(label)} className="flex items-center gap-3 text-xs uppercase tracking-[.16em]">
                <I className="size-4 text-[color:var(--accent)]" />
                {String(label)}
              </div>
            );
          })}
        </div>
      </section>

      {/* Welcome / services intro */}
      <section className="bg-[color:var(--background)] py-24 lg:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">What we cover</p>
            <h2 className="display mt-4 text-5xl leading-[.95] sm:text-6xl">
              Welcome to the home<br />of event photography.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-[color:var(--muted)]">
              We transform conferences, corporate moments and milestone gatherings into a calm, editorial record — so your team
              isn&apos;t left scrolling through someone&apos;s phone the next morning.
            </p>
            <Link href="/services" className="btn-link mt-8">
              All services <ArrowRight className="size-3" />
            </Link>
          </Reveal>
          <Reveal stagger className="grid gap-px bg-[color:var(--line)] sm:grid-cols-2">
            {services.map((s, i) => {
              const Icon = serviceIcons[i] ?? Camera;
              return (
                <article key={s.title} className="group bg-[color:var(--background)] p-8 transition hover:bg-[color:var(--surface)]">
                  <Icon className="size-6 text-[color:var(--accent)]" />
                  <h3 className="display mt-8 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{s.description}</p>
                  <Link
                    href="/services"
                    className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[.14em] text-[color:var(--foreground)] transition group-hover:text-[color:var(--accent)]"
                  >
                    Discover <ArrowRight className="size-3 transition group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--surface-muted)] py-14">
        <Reveal stagger className="container-shell grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="display text-5xl text-[color:var(--foreground)] sm:text-6xl">{s.value}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[.18em] text-[color:var(--muted)]">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Featured portfolio grid */}
      <section className="bg-[color:var(--background)] py-24 lg:py-32">
        <div className="container-shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected stories</p>
              <h2 className="display mt-4 text-5xl sm:text-6xl">Through our eyes.</h2>
            </div>
            <Link href="/portfolio" className="btn-ghost">
              Full portfolio <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal stagger className="mt-12 grid auto-rows-[260px] gap-3 md:grid-cols-3">
            {featured.slice(0, 5).map((item, index) => (
              <Link
                href="/portfolio"
                key={item.id}
                className={`group relative overflow-hidden bg-[color:var(--surface-muted)] ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                {item.src && (
                  <Image
                    src={item.src}
                    fill
                    alt={item.album}
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 p-5">
                  <p className="eyebrow !text-white/85">{item.album}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-[color:var(--surface)] py-24 lg:py-32">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative min-h-[560px]">
            {aboutImage && (
              <Image
                src={aboutImage}
                alt="Eye in Studio at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <div className="absolute -bottom-6 -right-3 border border-[color:var(--foreground)] bg-[color:var(--surface)] p-7 sm:right-8">
              <strong className="display block text-5xl text-[color:var(--accent)]">10+</strong>
              <span className="text-xs uppercase tracking-[.16em] text-[color:var(--muted)]">Years of craft</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">The studio</p>
            <h2 className="display mt-4 text-5xl leading-[.95] sm:text-6xl">
              A patient eye.<br />A complete record.
            </h2>
            <p className="mt-7 leading-8 text-[color:var(--muted)]">
              Eye in Studio is the working name of Patience Rucas — a Kigali-based photographer trusted by conference
              organisers, agencies and corporate teams across East Africa.
            </p>
            <p className="mt-4 leading-8 text-[color:var(--muted)]">
              The work is calm, observational and brand-ready: edited galleries that read well in a deck, a press release
              and a year-in-review video, all from the same shoot.
            </p>
            <Link href="/booking" className="btn-primary mt-8">
              Plan your shoot <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--foreground)] py-16 text-white">
        <div className="container-shell flex flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/70">Your story starts here</p>
            <h2 className="display mt-2 text-4xl sm:text-5xl">Let&apos;s make something worth keeping.</h2>
          </div>
          <Link
            href="/booking"
            className="inline-flex min-h-12 items-center gap-2 border border-white bg-transparent px-7 text-xs font-semibold uppercase tracking-[.14em] text-white transition hover:bg-white hover:text-[color:var(--foreground)]"
          >
            Check availability <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
