import type { Metadata } from "next";
import Image from "next/image";
import { GalleryBrowser } from "@/components/gallery-browser";
import { albums, allPhotos } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portrait, corporate event and editorial photography from Kigali by Eyein Studio.",
};

export default function PortfolioPage() {
  const totalPhotos = allPhotos.length;
  const totalAlbums = albums.filter((a) => a.photos.length > 0).length;

  return (
    <>
      <section className="bg-white px-4 pb-16 pt-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[34%_1fr]">
          <div>
            <h1 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[.82] tracking-[-.07em] text-black">
              Our Gallery
            </h1>
            <p className="mt-8 max-w-[23rem] text-[16px] font-bold leading-[1.35] text-black">
              A clean archive of portraits, conferences, launches, trainings and corporate stories from Kigali and beyond.
            </p>
            <p className="mt-5 max-w-[25rem] text-[14px] font-medium leading-[1.45] text-black">
              {totalPhotos} photographs across {totalAlbums} {totalAlbums === 1 ? "album" : "albums"}, edited for teams who need
              imagery that works in reports, campaigns, social posts and press releases.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[.62fr_1fr]">
            <div className="relative min-h-[360px] overflow-hidden bg-neutral-100">
              <Image
                src="/portfolio/iaom-mea-2025-day-2/55151803273.jpg"
                alt="Eyein Studio portfolio portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 26vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative min-h-[360px] overflow-hidden bg-neutral-100">
              <Image
                src="/portfolio/common-wealth-day-2026/55151993144.jpg"
                alt="Eyein Studio formal event coverage"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/25 bg-white px-4 pb-24 pt-8 sm:px-8 lg:px-12">
        <GalleryBrowser />
      </section>
    </>
  );
}
