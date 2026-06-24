import type { Metadata } from "next";
import Image from "next/image";
import { GalleryBrowser } from "@/components/gallery-browser";
import { albums, allPhotos } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Conference, corporate event, gala and training photography from Kigali by Eye in Studio.",
};

export default function PortfolioPage() {
  const heroPhoto = allPhotos[0]?.src ?? "";
  const totalPhotos = allPhotos.length;
  const totalAlbums = albums.filter((a) => a.photos.length > 0).length;

  return (
    <>
      <section className="relative flex min-h-[58vh] items-end overflow-hidden pb-14 pt-32">
        {heroPhoto && (
          <Image
            src={heroPhoto}
            alt="Recent work by Eye in Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,15,.25),rgba(20,18,15,.78))]" />
        <div className="container-shell relative">
          <p className="eyebrow !text-white/85">The archive</p>
          <h1 className="display mt-3 text-6xl text-white sm:text-8xl">Our work</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/90">
            {totalPhotos} photographs across {totalAlbums} {totalAlbums === 1 ? "album" : "albums"} — recent conferences,
            corporate events, galas and training sessions from Kigali and beyond.
          </p>
        </div>
      </section>
      <section className="bg-[color:var(--background)] pb-24 pt-8">
        <div className="container-shell">
          <GalleryBrowser />
        </div>
      </section>
    </>
  );
}
