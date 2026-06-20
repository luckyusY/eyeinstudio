import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://eyeinstudio.com"),
  title: { default: "Eye in Studio | Photography & Printing in Kigali", template: "%s | Eye in Studio" },
  description: "Premium photography, photo printing, framing and lamination services in Remera, Kigali.",
  keywords: ["Photography studio Kigali", "Wedding photographer Rwanda", "Photo printing Kigali", "Photo framing Kigali"],
  openGraph: { title: "Eye in Studio", description: "Your moments, thoughtfully captured and beautifully finished.", type: "website", locale: "en_RW" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}>
    <body className="antialiased"><SiteHeader /><main>{children}</main><SiteFooter /></body>
  </html>;
}
