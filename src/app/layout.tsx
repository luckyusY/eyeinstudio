import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Grain } from "@/components/grain";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://eyeinstudio.com"),
  title: { default: "Eye in Studio | Corporate Event Photography in Kigali", template: "%s | Eye in Studio" },
  description: "Conference, corporate event, gala and training photography by Patience Rucas — based in Kigali, Rwanda.",
  keywords: ["Corporate event photographer Kigali", "Conference photographer Rwanda", "Event photography Kigali", "Gala photography Rwanda"],
  openGraph: { title: "Eye in Studio", description: "Conference, corporate event and editorial photography from Kigali.", type: "website", locale: "en_RW" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}>
    <body className="antialiased">
      <SmoothScroll>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </SmoothScroll>
      <Grain />
    </body>
  </html>;
}
