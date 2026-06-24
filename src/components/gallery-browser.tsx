"use client";

import Image from "next/image";
import { Expand, Grid2X2, LayoutGrid, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { albums, allPhotos } from "@/lib/portfolio-data";

type GalleryItem = (typeof allPhotos)[number];

const ALL = "all" as const;

export function GalleryBrowser() {
  const [albumSlug, setAlbumSlug] = useState<string>(ALL);
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const images = useMemo<GalleryItem[]>(
    () => (albumSlug === ALL ? allPhotos : allPhotos.filter((p) => p.albumSlug === albumSlug)),
    [albumSlug],
  );

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filterButtons: { value: string; label: string; count: number }[] = [
    { value: ALL, label: "All work", count: allPhotos.length },
    ...albums.map((a) => ({ value: a.slug, label: a.title, count: a.photos.length })),
  ];

  return (
    <>
      <div className="flex flex-col gap-6 border-y border-[color:var(--line)] py-5 md:flex-row md:items-start md:justify-between">
        <div role="group" aria-label="Filter by album" className="flex flex-wrap gap-2">
          {filterButtons.map(({ value, label, count }) => {
            const active = albumSlug === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setAlbumSlug(value)}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[.1em] transition ${
                  active
                    ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-white"
                    : "border-[color:var(--line-strong)] text-[color:var(--muted)] hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)]"
                }`}
              >
                {label} <span className={`ml-1 text-[10px] ${active ? "text-white/70" : "text-[color:var(--soft)]"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div role="group" aria-label="Gallery layout" className="flex shrink-0 items-center gap-1 self-end border border-[color:var(--line-strong)] p-1 md:self-auto">
          <button
            type="button"
            onClick={() => setLayout("masonry")}
            aria-label="Masonry layout"
            aria-pressed={layout === "masonry"}
            className={`p-2 transition ${layout === "masonry" ? "bg-[color:var(--foreground)] text-white" : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"}`}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setLayout("grid")}
            aria-label="Uniform grid layout"
            aria-pressed={layout === "grid"}
            className={`p-2 transition ${layout === "grid" ? "bg-[color:var(--foreground)] text-white" : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"}`}
          >
            <Grid2X2 className="size-4" />
          </button>
        </div>
      </div>

      <div
        aria-live="polite"
        className={`mt-7 ${
          layout === "masonry"
            ? "columns-1 gap-4 sm:columns-2 lg:columns-3"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {images.map((item) => {
          const aspect =
            layout === "grid"
              ? "aspect-[4/5]"
              : item.width && item.height
                ? item.width >= item.height
                  ? "aspect-[4/3]"
                  : "aspect-[3/4]"
                : "aspect-[4/3]";
          return (
            <article
              key={item.id}
              className={`group relative mb-4 overflow-hidden bg-[color:var(--surface-muted)] ${layout === "masonry" ? "break-inside-avoid" : "mb-0"}`}
            >
              <button
                type="button"
                onClick={() => setSelected(item)}
                aria-label={`View photo from ${item.album}`}
                className={`relative block w-full overflow-hidden text-left ${aspect}`}
              >
                <Image
                  src={item.src}
                  alt={`${item.album}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />
                <span className="absolute right-4 top-4 grid size-10 translate-y-2 place-items-center rounded-full border border-white/70 bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition group-hover:opacity-100">
                  <span className="eyebrow !text-white/90 block">{item.album}</span>
                </span>
              </button>
            </article>
          );
        })}
      </div>

      {images.length === 0 && (
        <p className="mt-12 text-center text-sm text-[color:var(--muted)]">
          No photos yet for this selection. Run <code className="font-mono">node scripts/fetch-flickr.mjs</code> to populate.
        </p>
      )}

      <p className="mt-8 text-center text-xs uppercase tracking-[.16em] text-[color:var(--soft)]">
        Showing {images.length} {images.length === 1 ? "photograph" : "photographs"}
      </p>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.album}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[color:var(--foreground)]/95 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 z-10 grid size-12 place-items-center rounded-full border border-white/30 text-white transition hover:border-white"
            aria-label="Close image"
          >
            <X />
          </button>
          <div className="relative h-[82vh] w-[94vw]">
            <Image src={selected.src} alt={selected.album} fill sizes="94vw" className="object-contain" />
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="eyebrow !text-white/80">{selected.album}</p>
          </div>
        </div>
      )}
    </>
  );
}
