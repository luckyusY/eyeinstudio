import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findStudioPage, packageCards, studioPages } from "@/lib/studio-pages";

type PageProps = {
  params: Promise<{ studioPage: string }>;
};

export function generateStaticParams() {
  return studioPages.map((page) => ({ studioPage: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { studioPage } = await params;
  const page = findStudioPage(studioPage);
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
  };
}

export default async function StudioCategoryPage({ params }: PageProps) {
  const { studioPage } = await params;
  const page = findStudioPage(studioPage);
  if (!page) notFound();

  return (
    <>
      <section className="bg-white px-4 pb-14 pt-3 sm:px-8 lg:px-12">
        <div className="grid min-h-[34rem] gap-4 md:grid-cols-3">
          {page.heroImages.map((image, index) => (
            <div key={image} className={`relative overflow-hidden bg-neutral-100 ${index === 0 ? "md:row-span-2" : ""}`}>
              <Image
                src={image}
                alt={`${page.title} reference ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[42rem] text-center">
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-none tracking-[-.04em]">{page.title}</h1>
          <p className="mt-6 text-[14px] font-bold leading-[1.5]">{page.intro}</p>
          <p className="mt-4 text-[13px] font-medium leading-[1.55] text-white/80">{page.body}</p>
          <Link href="/booking" className="mt-8 inline-flex border border-white px-12 py-4 text-[12px] font-medium text-white transition hover:bg-white hover:text-black">
            Learn more
          </Link>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {page.gridImages.map((image, index) => (
            <div key={`${image}-${index}`} className={`relative overflow-hidden bg-neutral-100 ${index % 5 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image src={image} alt={`${page.title} gallery image`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
          ))}
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

      <section className="bg-[#f4f4f4] px-4 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[34%_1fr]">
          <div>
            <h2 className="text-[28px] font-black uppercase tracking-[-.04em] text-black">Get in touch</h2>
            <p className="mt-6 max-w-[24rem] text-[13px] font-medium leading-[1.45] text-black">
              Booking your session is simple. Tell us the kind of shoot, date and delivery needs, and we will guide you to the
              right package.
            </p>
          </div>
          <Link href="/booking" className="inline-flex w-fit self-start border border-black px-12 py-5 text-[13px] font-medium text-black transition hover:bg-black hover:text-white">
            Book your session
          </Link>
        </div>
      </section>
    </>
  );
}
