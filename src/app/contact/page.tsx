import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Eyein Studio for portrait, brand and event photography in Kigali.",
};

export default function ContactPage() {
  return (
    <section className="bg-[#f4f4f4] px-4 pb-28 pt-8 sm:px-8 lg:px-12">
      <h1 className="text-[clamp(3rem,6vw,4.8rem)] font-medium leading-none tracking-[-.05em] text-black">Get in touch</h1>
      <div className="mt-10 grid gap-14 lg:grid-cols-[52%_1fr]">
        <div>
          <div className="relative aspect-[1.28/1] overflow-hidden bg-neutral-200">
            <Image
              src="/portfolio/azam-dinner-feb-2025/55151721221.jpg"
              alt="Eyein Studio contact portrait"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div>
          <ContactForm />
          <div className="mt-14 text-black">
            <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-[-.05em]">Locations</h2>
            <div className="mt-8 space-y-7 text-[16px] leading-[1.6]">
              <div>
                <p className="font-black uppercase">Kigali Studio</p>
                <p>Remera, Kigali, Rwanda</p>
              </div>
              <div>
                <p className="font-black uppercase">Available across Rwanda</p>
                <p>Conferences, portraits, brand shoots and project documentation.</p>
              </div>
              <p className="font-black">Tel: +250 788 000 000</p>
              <p className="font-black">Email: hello@eyeinstudio.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
