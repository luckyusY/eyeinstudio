import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book a Session",
  description: "Request photography coverage for your portrait, brand, conference or event shoot in Kigali.",
};

export default function BookingPage() {
  return (
    <section className="bg-white px-4 pb-20 pt-4 sm:px-8 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[34%_1fr]">
        <div>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[.82] tracking-[-.07em] text-black">
            Book Your Session
          </h1>
          <p className="mt-8 max-w-[24rem] text-[16px] font-bold leading-[1.35] text-black">
            Tell us what you are planning and we will shape the right photography coverage.
          </p>
          <p className="mt-5 max-w-[24rem] text-[14px] font-medium leading-[1.45] text-black">
            Share the date, location, number of guests or people to photograph, and how you plan to use the images. We will
            confirm availability and recommend the best package.
          </p>
          <div className="relative mt-8 aspect-[1/1.2] max-w-[20rem] overflow-hidden bg-neutral-100">
            <Image
              src="/portfolio/forever-trainings/55152028244.jpg"
              alt="Eyein Studio booking portrait reference"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 25vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="border-t border-black/25 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
