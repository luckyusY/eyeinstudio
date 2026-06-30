import type { Metadata } from "next";
import Image from "next/image";
import { PrintOrderForm } from "@/components/print-order-form";

export const metadata: Metadata = {
  title: "Order Photo Prints",
  description: "Upload and order photo, canvas and large-format prints in Kigali.",
};

export default function PrintPage() {
  return (
    <section className="bg-white px-4 pb-20 pt-4 sm:px-8 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[34%_1fr]">
        <div>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[.82] tracking-[-.07em] text-black">
            Order Prints
          </h1>
          <p className="mt-8 max-w-[24rem] text-[16px] font-bold leading-[1.35] text-black">
            Turn finished photographs and artwork into something physical.
          </p>
          <p className="mt-5 max-w-[24rem] text-[14px] font-medium leading-[1.45] text-black">
            Upload your image, choose the size and finish, and we will inspect every file before production. Custom frames and
            large formats can be quoted after review.
          </p>
          <div className="relative mt-8 aspect-[1.15/1] max-w-[22rem] overflow-hidden bg-neutral-100">
            <Image
              src="/portfolio/azam-s-staff-housing-project-2025/55151919389.jpg"
              alt="Eyein Studio print and project imagery"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 26vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="border-t border-black/25 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <PrintOrderForm />
        </div>
      </div>
    </section>
  );
}
