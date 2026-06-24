"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { albums } from "@/lib/portfolio-data";

type Slide = {
  word: string;
  subhead: string;
  image: string;
  alt: string;
  position?: string;
};

function pickAlbumPhoto(slug: string, fallbackIndex: number): string {
  const exact = albums.find((a) => a.slug === slug);
  if (exact && exact.photos.length > 0) return exact.photos[0].src;
  const fallback = albums.find((a) => a.photos.length > 0)?.photos[fallbackIndex] ?? albums.flatMap((a) => a.photos)[fallbackIndex];
  return fallback?.src ?? "";
}

const slides: Slide[] = [
  {
    word: "Conferences",
    subhead: "From plenary stages to side-room conversations — every moment of your summit, documented with intent.",
    image: pickAlbumPhoto("iaom-mea-2025-day-1", 0),
    alt: "IAOM MEA conference plenary in Kigali",
    position: "center 38%",
  },
  {
    word: "Celebrations",
    subhead: "Galas, dinners and recognition nights — the energy and the quiet pride, both held in frame.",
    image: pickAlbumPhoto("azam-dinner-feb-2025", 1),
    alt: "Corporate dinner photographed by Eye in Studio",
    position: "center 45%",
  },
  {
    word: "Trainings",
    subhead: "Workshops, classrooms and team off-sites — work moments captured with editorial care.",
    image: pickAlbumPhoto("forever-trainings", 2),
    alt: "Training session in Kigali",
    position: "center 42%",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Eye in Studio highlights"
      className="relative min-h-[92svh] overflow-hidden bg-[color:var(--surface-muted)]"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.word}
          aria-hidden={active !== index}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ${active === index ? "opacity-100" : "opacity-0"}`}
        >
          {slide.image && (
            <Image
              src={slide.image}
              alt={active === index ? slide.alt : ""}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[7000ms] ease-out ${active === index ? "scale-105" : "scale-100"}`}
              style={{ objectPosition: slide.position ?? "center" }}
            />
          )}
        </div>
      ))}

      {/* Gentle light wash so type stays readable without darkening the photography */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,.20)_0%,rgba(255,253,248,0)_40%,rgba(20,18,15,.55)_100%)]" />

      <div className="container-shell relative flex min-h-[92svh] flex-col items-start justify-end pb-24 pt-36 text-left">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.32em] text-white/90">
          Eye in Studio · Kigali, Rwanda
        </p>

        <div className="grid w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.word}
              className={`col-start-1 row-start-1 transition-all duration-700 ${
                active === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <h1 className="display max-w-[14ch] text-white text-[16vw] leading-[.92] sm:text-[10vw] lg:text-[8rem]">
                {slide.word}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/95 sm:text-lg">
                {slide.subhead}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/booking" className="btn-primary min-w-44 !bg-white !text-[color:var(--foreground)] !border-white hover:!bg-[color:var(--accent)] hover:!text-white hover:!border-[color:var(--accent)]">
            Request a callback <ArrowRight className="size-4" />
          </Link>
          <Link href="/portfolio" className="btn-ghost min-w-44 !border-white/70 !text-white hover:!bg-white hover:!text-[color:var(--foreground)]">
            Explore our work
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-[min(30rem,calc(100%-3rem))] flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.word}
              type="button"
              aria-label={`Show ${slide.word.toLowerCase()} slide`}
              aria-current={active === index}
              onClick={() => setActive(index)}
              className={`h-1.5 w-8 rounded-full transition ${active === index ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      <a
        href="#services-intro"
        aria-label="Scroll to services"
        className="absolute bottom-7 right-6 hidden items-center gap-2 text-[10px] uppercase tracking-[.2em] text-white/85 md:flex"
      >
        Discover <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
