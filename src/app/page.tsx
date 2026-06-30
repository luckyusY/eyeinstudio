import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { Reveal } from "@/components/reveal";

const promoCards = [
  {
    title: "Brand Photoshoots",
    subtitle: "Corporate portraits, headshots and campaign imagery",
    image: "/portfolio/forever-success-day-2026/55151818926.jpg",
  },
  {
    title: "Event Photoshoots",
    subtitle: "Conferences, trainings, dinners and milestone moments",
    image: "/portfolio/iaom-mea-2025-day-1/55151805584.jpg",
  },
] as const;

export default function Home() {
  return (
    <>
      <HeroSlider />

      <section id="services-intro" className="border-t border-black/25 bg-white px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-7 lg:grid-cols-2">
          {promoCards.map((card) => (
            <Reveal key={card.title} className="group block">
              <Link href="/portfolio" className="block">
                <div className="relative aspect-[2.18/1] overflow-hidden bg-neutral-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-white/15" />
                  <div className="absolute left-8 top-7 text-[#ea8fb3]">
                    <p className="font-serif text-4xl italic leading-none">{card.title.split(" ")[0]}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[.16em] text-black/65">{card.title.split(" ").slice(1).join(" ")}</p>
                  </div>
                </div>
              </Link>
              <p className="mt-3 text-[13px] font-semibold leading-5 text-black">{card.subtitle}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-9 max-w-[62rem] text-[15px] font-medium leading-[1.38] text-black">
          <p>
            At <strong>Eyein Studio</strong>, our team is dedicated to delivering quality work that exceeds expectations. Whether
            it&apos;s capturing precise headshots, developing a personal branding portfolio, or covering an event with discretion,
            we make each photoshoot polished, comfortable and unmistakably yours.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-black/25 bg-white px-4 py-20 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[34%_1fr]">
          <Reveal>
            <p className="max-w-[23rem] text-[15px] font-medium leading-[1.42] text-black">
              Choosing the right <strong>photographer</strong> for your photoshoot matters. Our approach helps you feel relaxed
              in front of the camera while shaping images that are useful, beautiful and ready for your next launch, report,
              profile or celebration.
            </p>
            <Link href="/booking" className="mt-8 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.12em] text-black">
              Book your session <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal className="relative ml-auto min-h-[360px] w-full max-w-[42rem] overflow-hidden bg-neutral-100 lg:min-h-[430px]">
            <Image
              src="/portfolio/forever-trainings/55151957683.jpg"
              alt="Eyein Studio client portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[center_18%]"
            />
          </Reveal>
        </div>
      </section>

      <section className="min-h-[42vh] border-t border-black/25 bg-white" aria-hidden="true" />

      <section id="contact" className="border-t border-black/25 bg-white px-4 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[34%_1fr]">
          <Reveal>
            <h2 className="text-[22px] font-extrabold uppercase tracking-[-.02em] text-black">Get in touch</h2>
            <p className="mt-6 max-w-[24rem] text-[13px] font-medium leading-[1.45] text-black">
              Booking a session is simple. Share your date, location and the kind of imagery you need, and we&apos;ll respond
              with availability and the best package for your shoot.
            </p>
            <p className="mt-5 max-w-[24rem] text-[13px] font-bold leading-[1.45] text-black">
              If you&apos;d like a bespoke quote, tell us the story and we&apos;ll be in touch.
            </p>
          </Reveal>

          <Reveal className="grid gap-4 text-[12px] font-medium text-black sm:grid-cols-2">
            <Link href="/booking" className="border border-black/30 px-5 py-4 transition hover:bg-black hover:text-white">
              Book a session
            </Link>
            <a href="mailto:hello@eyeinstudio.com" className="border border-black/30 px-5 py-4 transition hover:bg-black hover:text-white">
              hello@eyeinstudio.com
            </a>
            <a href="tel:+250788000000" className="border border-black/30 px-5 py-4 transition hover:bg-black hover:text-white">
              +250 788 000 000
            </a>
            <Link href="/portfolio" className="border border-black/30 px-5 py-4 transition hover:bg-black hover:text-white">
              View portfolio
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
