import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { packageCards } from "@/lib/studio-pages";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Eyein Studio portrait, brand and event photography packages.",
};

export default function PricingPage() {
  return (
    <>
      <section className="grid bg-black text-white lg:grid-cols-[51%_49%]">
        <div className="px-4 py-16 sm:px-8 lg:px-12">
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-[-.05em]">Prices</h1>
          <h2 className="mt-8 max-w-[34rem] text-[22px] font-black leading-[1.25]">
            Choose the photography package that fits your shoot, story and delivery needs.
          </h2>
          <p className="mt-6 max-w-[36rem] text-[15px] font-medium leading-[1.5] text-white/85">
            We keep packages simple and adapt them to portraits, branding, events, reports and campaigns. If your shoot needs a
            custom crew, fast delivery or multiple locations, we will quote it clearly before production.
          </p>
          <Link href="/booking" className="mt-10 inline-flex border border-white px-16 py-5 text-[13px] transition hover:bg-white hover:text-black">
            Learn more
          </Link>
        </div>
        <div className="relative min-h-[34rem] bg-neutral-800">
          <Image
            src="/portfolio/azam-dinner-feb-2025/55151721221.jpg"
            alt="Eyein Studio pricing portrait"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 49vw"
            className="object-cover object-top"
          />
        </div>
      </section>

      <section className="bg-black px-4 py-16 text-white sm:px-8 lg:px-12">
        <h2 className="text-center text-[clamp(2rem,4vw,3.2rem)] font-medium tracking-[-.04em]">Photoshoot Pricing & Packages</h2>
        <div className="mx-auto mt-12 grid max-w-6xl gap-3 md:grid-cols-4">
          {packageCards.map(([name, price, included, description]) => (
            <article key={name} className="grid bg-[#858585] text-center text-white">
              <h3 className="bg-white px-4 py-7 text-[20px] font-medium text-black">{name}</h3>
              <div className="px-4 py-8">
                <p className="text-4xl font-medium">{price}</p>
                <p className="mt-7 text-[13px] font-extrabold">{included}</p>
                <p className="mt-5 text-[13px] font-medium leading-[1.5]">{description}</p>
              </div>
              <Link href="/booking" className="border border-white/70 px-4 py-4 text-[12px] font-medium uppercase transition hover:bg-white hover:text-black">
                Book now
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
