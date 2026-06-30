import Image from "next/image";
import Link from "next/link";

const heroImages = {
  main: "/portfolio/azam-dinner-feb-2025/55151721221.jpg",
  smallOne: "/portfolio/forever-success-day-2026/55150921707.jpg",
  smallTwo: "/portfolio/forever-trainings/55152028244.jpg",
} as const;

export function HeroSlider() {
  return (
    <section className="bg-white px-4 pb-14 pt-6 sm:px-8 lg:px-12">
      <div className="grid gap-7 lg:grid-cols-[31%_1fr] lg:items-start">
        <div className="max-w-[28rem]">
          <h1 className="max-w-[22rem] text-[clamp(1.5rem,2vw,2.25rem)] font-black leading-[1.28] tracking-[-.03em] text-black">
            Welcome to Eyein Studio — a premier photography studio in Kigali, where creativity, care and memorable photography come
            together.
          </h1>

          <div className="mt-6 space-y-5 text-[clamp(.98rem,1.3vw,1.12rem)] leading-[1.42] text-black">
            <p>
              We believe every person, brand and milestone has a story worth preserving. Our photography is calm, guided and made
              to feel natural while producing beautiful images with clarity and style.
            </p>
            <p>
              Whether you need elegant portraits, professional headshots, family moments, corporate coverage or branded imagery,
              our sessions are shaped around you.
            </p>
            <p className="font-bold">
              At Eyein Studio, we are passionate about creating images that feel polished, personal and timeless.
            </p>
          </div>

          <Link
            href="/booking"
            className="mt-4 inline-flex bg-black px-5 py-4 text-center text-[10px] font-extrabold uppercase leading-tight tracking-[.02em] text-white transition hover:bg-black/80"
          >
            Book your
            <br />
            session
          </Link>

          <div className="mt-5 grid gap-4 sm:max-w-[12.5rem]">
            <div className="relative aspect-[1/1.08] overflow-hidden bg-neutral-100">
              <Image
                src={heroImages.smallOne}
                alt="Eyein Studio colorful portrait moment"
                fill
                sizes="(max-width: 1024px) 45vw, 13vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[1/.72] overflow-hidden bg-neutral-100">
              <Image
                src={heroImages.smallTwo}
                alt="Eyein Studio people-focused portrait"
                fill
                sizes="(max-width: 1024px) 45vw, 13vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="relative min-h-[72vh] overflow-hidden bg-neutral-100 lg:min-h-[calc(100vh-10.5rem)]">
          <Image
            src={heroImages.main}
            alt="Eyein Studio portrait session"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 69vw"
            className="object-cover object-[center_22%]"
          />
        </div>
      </div>
    </section>
  );
}
