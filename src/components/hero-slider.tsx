"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { Autoplay, EffectFade } from "swiper/modules";
import { gsap } from "gsap";
import { albums } from "@/lib/portfolio-data";
import { prefersReducedMotion, useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

import "swiper/css";
import "swiper/css/effect-fade";

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
  const fallback = albums.flatMap((a) => a.photos)[fallbackIndex];
  return fallback?.src ?? "";
}

const slides: Slide[] = [
  {
    word: "Portraits",
    subhead: "Studio-polished portraits for founders, teams and creatives — directed gently, edited with restraint.",
    image: pickAlbumPhoto("iaom-mea-2025-day-1", 0),
    alt: "Portrait-style photography by EyeinStudio",
    position: "center 38%",
  },
  {
    word: "Branding",
    subhead: "Image sets for businesses and personal brands that need to look considered, confident and timeless.",
    image: pickAlbumPhoto("azam-dinner-feb-2025", 1),
    alt: "Brand and corporate photography by EyeinStudio",
    position: "center 45%",
  },
  {
    word: "Events",
    subhead: "From keynote stages to quiet conversations, your event is captured with a calm editorial eye.",
    image: pickAlbumPhoto("forever-trainings", 2),
    alt: "Event photography by EyeinStudio",
    position: "center 42%",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = introRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll("[data-intro]"), { autoAlpha: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-intro]"),
        { y: 36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", stagger: 0.14, delay: 0.2 },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline();
    if (wordRef.current) {
      tl.fromTo(
        wordRef.current,
        { yPercent: 45, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.85, ease: "power4.out" },
        0,
      );
    }
    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
        0.12,
      );
    }
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="EyeinStudio highlights"
      className="relative min-h-[94svh] overflow-hidden bg-[color:var(--surface-muted)]"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="absolute inset-0 !h-full !w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.word}>
            <div className="relative h-full w-full overflow-hidden">
              {slide.image && (
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="kenburns object-cover"
                  style={{ objectPosition: slide.position ?? "center" }}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.05)_35%,rgba(17,17,17,.62)_100%)]" />

      <div
        ref={introRef}
        className="container-wide pointer-events-none relative flex min-h-[94svh] flex-col items-center justify-end pb-24 pt-36 text-center"
      >
        <p data-intro className="mb-5 text-[10px] font-semibold uppercase tracking-[.34em] text-white/90">
          EyeinStudio · Kigali photography studio
        </p>

        <h1 ref={wordRef} className="display max-w-[14ch] text-[17vw] leading-[.86] tracking-[-.06em] text-white sm:text-[12vw] lg:text-[9.5rem]">
          {slides[active].word}
        </h1>
        <p ref={subRef} className="mt-6 max-w-xl text-base leading-7 text-white/95 sm:text-lg">
          {slides[active].subhead}
        </p>

        <div data-intro className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/booking"
            className="btn-primary min-w-44 !border-white !bg-white !text-[color:var(--foreground)] hover:!bg-white/80"
          >
            Book your shoot <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/portfolio"
            className="btn-ghost min-w-44 !border-white/70 !text-white hover:!bg-white hover:!text-[color:var(--foreground)]"
          >
            View gallery
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-[min(30rem,calc(100%-3rem))] items-center justify-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.word}
            type="button"
            aria-label={`Show ${slide.word.toLowerCase()} slide`}
            aria-current={active === index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              active === index ? "w-10 bg-white" : "w-5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
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
