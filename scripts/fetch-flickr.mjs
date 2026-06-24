// Scrape eyeinstudio Flickr albums, download images locally, generate portfolio-data.ts.
// Usage: node scripts/fetch-flickr.mjs
// Idempotent: already-downloaded files are skipped.

import { mkdir, writeFile, stat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public", "portfolio");
const DATA_OUT = join(ROOT, "src", "lib", "portfolio-data.ts");

const FLICKR_USER = "eyeinstudio";

// Album list discovered from https://www.flickr.com/photos/eyeinstudio/albums/
const ALBUMS = [
  { id: "72177720332566812", title: "MOVE UP GLOBAL 2025", description: "World Neglected Tropical Diseases & Leprosy Day — “Unite, Act, Eliminate”." },
  { id: "72177720332559645", title: "FOREVER SUCCESS DAY 2026", description: "Annual recognition day celebrating partners and achievements." },
  { id: "72177720332581883", title: "FOREVER TRAININGS", description: "Skill-building sessions and team enablement workshops." },
  { id: "72177720332581543", title: "COMMON WEALTH DAY 2026", description: "Commonwealth Day commemoration in Kigali." },
  { id: "72177720332558780", title: "CENTER FOR DEVELOPMENT POLICY Feb 2026", description: "Policy convening and panel discussions." },
  { id: "72177720332592539", title: "AZAM DINNER Feb 2025", description: "Corporate dinner and partner appreciation evening." },
  { id: "72177720332581048", title: "AZAM'S STAFF HOUSING PROJECT 2025", description: "Project launch and ground-breaking coverage." },
  { id: "72177720332564387", title: "IAOM MEA 2025 Day 3", description: "Closing day of the IAOM Middle East & Africa conference." },
  { id: "72177720332591619", title: "IAOM MEA 2025 Day 2", description: "Day two of sessions, networking and exhibition floor." },
  { id: "72177720332591124", title: "IAOM MEA 2025 Day 1", description: "Opening day of the IAOM Middle East & Africa conference." },
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const SIZE_PRIORITY = ["h", "b", "c"]; // 1600, 1024, 800

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html,*/*" } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

// Extract unique photo identifiers from an album page HTML.
// Flickr embeds image URLs in <img> tags and inline modelExport JSON.
// We match the pattern: live.staticflickr.com/{server}/{id}_{secret}_{size}.jpg
function extractPhotos(html) {
  const seen = new Map(); // photoId -> { server, secret }
  const re = /live\.staticflickr\.com\/(\d+)\/(\d+)_([a-z0-9]{10})(?:_[a-z0-9])?\.(?:jpg|webp)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const [, server, photoId, secret] = m;
    if (!seen.has(photoId)) seen.set(photoId, { server, secret });
  }
  return seen;
}

async function downloadOne(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return true;
}

async function downloadPhoto({ server, photoId, secret, destDir }) {
  await mkdir(destDir, { recursive: true });
  const dest = join(destDir, `${photoId}.jpg`);
  if (existsSync(dest)) {
    const s = await stat(dest);
    if (s.size > 1024) return dest;
  }
  for (const size of SIZE_PRIORITY) {
    const url = `https://live.staticflickr.com/${server}/${photoId}_${secret}_${size}.jpg`;
    try {
      const ok = await downloadOne(url, dest);
      if (ok) return dest;
    } catch {
      // try next size
    }
  }
  return null;
}

async function processAlbum(album) {
  const slug = slugify(album.title);
  const destDir = join(PUBLIC_DIR, slug);
  console.log(`\n[${album.title}] → ${slug}`);

  // Flickr serves only the first ~25 photos per album to unauthenticated requests.
  // The album HTML embeds those in <img> tags + modelExport JSON; later photos require
  // an API key + flickr.photosets.getPhotos. We honour the no-key approach and accept the cap.
  const all = new Map();
  const url = `https://www.flickr.com/photos/${FLICKR_USER}/albums/${album.id}`;
  let html;
  try {
    html = await fetchText(url);
  } catch (err) {
    console.warn(`  fetch failed: ${err.message}`);
    return { ...album, slug, photos: [] };
  }
  for (const [id, meta] of extractPhotos(html)) {
    if (!all.has(id)) all.set(id, meta);
  }
  console.log(`  scraped ${all.size} photo refs from album page`);

  if (all.size === 0) {
    console.warn(`  ! no photos found for album ${album.id}`);
    return { ...album, slug, photos: [] };
  }

  // Download each photo and probe dimensions with sharp.
  const photos = [];
  for (const [photoId, meta] of all) {
    const dest = await downloadPhoto({ server: meta.server, photoId, secret: meta.secret, destDir });
    if (!dest) {
      console.warn(`    skip ${photoId} (all sizes failed)`);
      continue;
    }
    let width = 0;
    let height = 0;
    try {
      const m = await sharp(dest).metadata();
      width = m.width ?? 0;
      height = m.height ?? 0;
    } catch (err) {
      console.warn(`    metadata ${photoId}: ${err.message}`);
    }
    photos.push({
      id: photoId,
      src: `/portfolio/${slug}/${photoId}.jpg`,
      width,
      height,
    });
  }
  console.log(`  downloaded ${photos.length}/${all.size}`);
  return { ...album, slug, photos };
}

function toTsLiteral(albums) {
  const lines = [
    "// AUTO-GENERATED by scripts/fetch-flickr.mjs — do not edit by hand.",
    "// Source: https://www.flickr.com/photos/eyeinstudio/albums/",
    "",
    "export type PortfolioPhoto = { id: string; src: string; width: number; height: number };",
    "",
    "export type PortfolioAlbum = {",
    "  id: string;",
    "  title: string;",
    "  slug: string;",
    "  description: string;",
    "  cover: string;",
    "  photos: PortfolioPhoto[];",
    "};",
    "",
    "export const albums: PortfolioAlbum[] = " + JSON.stringify(albums, null, 2) + ";",
    "",
    "export const allPhotos: (PortfolioPhoto & { album: string; albumSlug: string })[] = albums.flatMap((a) =>",
    "  a.photos.map((p) => ({ ...p, album: a.title, albumSlug: a.slug }))",
    ");",
    "",
  ];
  return lines.join("\n");
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });
  const results = [];
  for (const album of ALBUMS) {
    const r = await processAlbum(album);
    const cover = r.photos[0]?.src ?? "";
    results.push({
      id: r.id,
      title: r.title,
      slug: r.slug,
      description: r.description,
      cover,
      photos: r.photos,
    });
  }
  await mkdir(dirname(DATA_OUT), { recursive: true });
  await writeFile(DATA_OUT, toTsLiteral(results), "utf8");
  console.log(`\nWrote ${DATA_OUT}`);
  const total = results.reduce((n, a) => n + a.photos.length, 0);
  console.log(`Total photos: ${total} across ${results.length} albums`);
  // Print per-album summary
  for (const r of results) console.log(`  ${r.slug.padEnd(40)} ${r.photos.length} photos`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
